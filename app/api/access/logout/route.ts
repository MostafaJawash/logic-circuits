import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/access/config";

export const runtime = "nodejs";

/**
 * Logs the browser out by clearing the session cookie ONLY.
 *
 * The code stays permanently bound to its original device in the store — we
 * never touch `data/accessCodes.json` here — so logging out does not free the
 * code for a different device.
 */
export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
