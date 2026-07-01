import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/access/config";
import { verifySessionToken } from "@/lib/access/crypto";

export const runtime = "nodejs";

/**
 * Lightweight check of whether THIS browser currently holds a valid session.
 * Used by the client to decide whether to show the logout control. Never
 * returns anything sensitive — just a boolean.
 */
export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const authorized = verifySessionToken(token) !== null;
  return NextResponse.json(
    { authorized },
    { headers: { "Cache-Control": "no-store" } },
  );
}
