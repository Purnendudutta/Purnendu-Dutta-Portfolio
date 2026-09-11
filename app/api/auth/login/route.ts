import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { signAdminToken, AUTH_COOKIE_OPTIONS } from "@/lib/auth";

// In-memory rate limiting tracker
interface RateLimitRecord {
  attempts: number;
  lockedUntil: number | null;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const now = Date.now();

    // Check rate limit status
    const limitRecord = rateLimitMap.get(ip) || { attempts: 0, lockedUntil: null };

    if (limitRecord.lockedUntil && now < limitRecord.lockedUntil) {
      const remainingMinutes = Math.ceil((limitRecord.lockedUntil - now) / 60000);
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Login locked for ${remainingMinutes} more minute(s) for security.`,
        },
        { status: 429 }
      );
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const inputEmail = String(email).trim().toLowerCase();
    const inputPassword = String(password).trim();

    // Read configured environment variables
    const envAdminEmail = (process.env.ADMIN_EMAIL || "admin@portfolio.com").trim().toLowerCase();
    const envAdminPass = (process.env.ADMIN_PASSWORD || "admin123456").trim();

    // Default backup credentials
    const defaultBackupEmail = "admin@portfolio.com";
    const defaultBackupPass = "admin123456";

    let isValid = false;
    let userId = "admin_default_id";
    let userEmail = inputEmail;
    let userName = "Purnendu Dutta";

    // 1. First check environment credentials match directly (instant & offline-resilient)
    if (
      (inputEmail === envAdminEmail && inputPassword === envAdminPass) ||
      (inputEmail === defaultBackupEmail && inputPassword === defaultBackupPass)
    ) {
      isValid = true;
    }

    // 2. If not matched yet, check MongoDB if database is available
    if (!isValid) {
      try {
        const db = await connectDB();
        if (db) {
          const user = await User.findOne({ email: inputEmail });
          if (user && user.passwordHash) {
            isValid = await bcrypt.compare(inputPassword, user.passwordHash);
            if (isValid) {
              userId = user._id.toString();
              userEmail = user.email;
              userName = user.name || "Purnendu Dutta";
            }
          }
        }
      } catch (dbErr) {
        // Fallback silently without throwing
      }
    }

    // If still invalid, increment rate limiting
    if (!isValid) {
      limitRecord.attempts += 1;
      if (limitRecord.attempts >= MAX_FAILED_ATTEMPTS) {
        limitRecord.lockedUntil = now + LOCKOUT_DURATION_MS;
        rateLimitMap.set(ip, limitRecord);
        return NextResponse.json(
          {
            error: `Maximum login attempts exceeded. Access locked for 15 minutes for security.`,
          },
          { status: 429 }
        );
      } else {
        rateLimitMap.set(ip, limitRecord);
        const remaining = MAX_FAILED_ATTEMPTS - limitRecord.attempts;
        return NextResponse.json(
          {
            error: `Invalid email or password. (${remaining} attempt${remaining === 1 ? "" : "s"} remaining)`,
          },
          { status: 401 }
        );
      }
    }

    // Reset rate limit on success
    rateLimitMap.delete(ip);

    const token = signAdminToken({
      userId,
      email: userEmail,
      role: "admin",
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: userId,
        email: userEmail,
        name: userName,
        role: "admin",
      },
    });

    // Set true session cookie (omits maxAge so browser clears it on window close)
    response.cookies.set(AUTH_COOKIE_OPTIONS.name, token, {
      httpOnly: AUTH_COOKIE_OPTIONS.httpOnly,
      secure: AUTH_COOKIE_OPTIONS.secure,
      sameSite: AUTH_COOKIE_OPTIONS.sameSite,
      path: AUTH_COOKIE_OPTIONS.path,
    });

    return response;
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
