import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_OPTIONS } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.delete(AUTH_COOKIE_OPTIONS.name);
  return response;
}
