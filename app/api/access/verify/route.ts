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
import { updateRecord } from "@/lib/access/store";

// Reads/writes the JSON store, so this must run on the Node.js runtime.
export const runtime = "nodejs";

type Outcome = "activated" | "same-device" | "other-device";

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

  // Single serialized read-modify-write so two devices racing on the same fresh
  // code can't both activate it.
  let outcome: Outcome | null = null;
  const record = await updateRecord(codeHash, (r) => {
    if (!r.activated) {
      r.activated = true;
      r.status = "used";
      r.deviceHash = deviceHash;
      r.activationDate = new Date().toISOString();
      outcome = "activated";
    } else if (r.deviceHash === deviceHash) {
      outcome = "same-device";
    } else {
      outcome = "other-device";
    }
  });

  // No such code.
  if (record === null || outcome === null) {
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  }

  // Code is already bound to a different device.
  if (outcome === "other-device") {
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
