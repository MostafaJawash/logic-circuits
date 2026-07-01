import {
  createHmac,
  timingSafeEqual,
  randomUUID,
} from "node:crypto";
import { ACCESS_SECRET } from "./config";

/**
 * Cryptographic helpers for the access system. Node's `crypto` is used directly;
 * both route handlers and `proxy.ts` run on the Node.js runtime in Next 16, so
 * this module is safe in either place.
 */

/** Constant-time comparison of two hex/base64 strings. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** Normalize a user-entered code so formatting/casing never causes a mismatch. */
export function normalizeCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

/**
 * Peppered, one-way hash of an access code. This is what we persist — the raw
 * codes never touch `data/accessCodes.json`.
 */
export function hashCode(rawCode: string): string {
  return createHmac("sha256", ACCESS_SECRET)
    .update(`code:${normalizeCode(rawCode)}`)
    .digest("hex");
}

/** One-way hash of a device fingerprint, bound to this app via the secret. */
export function hashFingerprint(fingerprint: string): string {
  return createHmac("sha256", ACCESS_SECRET)
    .update(`fp:${fingerprint}`)
    .digest("hex");
}

export interface SessionPayload {
  /** Hash of the code this session was issued for. */
  c: string;
  /** Hash of the device the code is bound to. */
  d: string;
  /** Issued-at (ms) plus a nonce, so tokens aren't trivially guessable. */
  t: number;
  n: string;
}

function sign(data: string): string {
  return createHmac("sha256", ACCESS_SECRET).update(data).digest("base64url");
}

/**
 * Build a tamper-proof session token: `base64url(payload).signature`. It is
 * stored in an httpOnly cookie, so the browser can't read or forge it and the
 * proxy can validate it server-side without a database round-trip.
 */
export function createSessionToken(codeHash: string, deviceHash: string): string {
  const payload: SessionPayload = {
    c: codeHash,
    d: deviceHash,
    t: Date.now(),
    n: randomUUID(),
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

/** Verify a session token's signature and return its payload, or null. */
export function verifySessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;

  const body = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  if (!safeEqual(signature, sign(body))) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as SessionPayload;
    if (!payload?.c || !payload?.d) return null;
    return payload;
  } catch {
    return null;
  }
}
