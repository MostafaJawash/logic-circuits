import { NextResponse, type NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/access/config";
import {
  hashCode,
  hashFingerprint,
  createSessionToken,
} from "@/lib/access/crypto";
import { isValidCodeHash, activateOrGet } from "@/lib/access/store";

// Talks to Redis over REST and uses Node crypto; run on the Node.js runtime.
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: { code?: unknown; fingerprint?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }

  const code = typeof body.code === "string" ? body.code : "";
  const fingerprint =
    typeof body.fingerprint === "string" ? body.fingerprint : "";

  if (!code.trim()) {
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  }

  // If the fingerprint couldn't be computed, deny rather than risk binding a
  // code to an unstable/unknown identity (per spec).
  if (!fingerprint || fingerprint.length < 16) {
    return NextResponse.json({ error: "no-fingerprint" }, { status: 400 });
  }

  const codeHash = hashCode(code);
  const deviceHash = hashFingerprint(fingerprint);

  // Unknown code.
  if (!isValidCodeHash(codeHash)) {
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  }

  // Atomically bind on first use; otherwise read the existing binding.
  let record: Awaited<ReturnType<typeof activateOrGet>>;
  try {
    record = await activateOrGet(codeHash, deviceHash);
  } catch {
    // e.g. Redis is unreachable / not configured.
    return NextResponse.json({ error: "generic" }, { status: 500 });
  }

  // Bound to a different device.
  if (!record.justActivated && record.record.deviceHash !== deviceHash) {
    return NextResponse.json({ error: "device" }, { status: 403 });
  }

  // Success — issue the signed device session cookie.
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(codeHash, deviceHash), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
