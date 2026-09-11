import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "portfolio_super_secure_jwt_secret_key_2026_x89";
const TOKEN_NAME = "admin_auth_token";

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export function signAdminToken(payload: TokenPayload): string {
  // 12-hour maximum JWT validity
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
}

export function verifyAdminToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function getAuthSession(): Promise<TokenPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export function getAuthFromRequest(req: NextRequest): TokenPayload | null {
  const token = req.cookies.get(TOKEN_NAME)?.value;
  if (!token) {
    // Check Authorization header fallback
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return verifyAdminToken(authHeader.substring(7));
    }
    return null;
  }
  return verifyAdminToken(token);
}

// Session cookie configuration:
// Without maxAge or expires, browser destroys this cookie automatically when window/tab is closed
export const AUTH_COOKIE_OPTIONS = {
  name: TOKEN_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};
