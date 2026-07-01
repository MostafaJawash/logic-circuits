import { Redis } from "@upstash/redis";
import codesData from "@/data/accessCodes.json";

/**
 * Access-code store.
 *
 * Split into two layers so it works on serverless platforms (Vercel) where the
 * filesystem is read-only and ephemeral:
 *
 *  1. The set of VALID code hashes is static and ships bundled in
 *     `data/accessCodes.json` (imported, not read via `fs`, so it's always
 *     available at runtime). It contains only peppered hashes — no plaintext.
 *
 *  2. The MUTABLE per-code activation state (which device claimed it, when) lives
 *     in Upstash Redis, keyed by the code hash. This is what needs to persist
 *     across serverless invocations.
 */

export interface ActivationRecord {
  /** Peppered hash of the device the code is bound to. */
  deviceHash: string;
  /** ISO timestamp of activation. */
  activationDate: string;
}

const VALID_HASHES = new Set(
  (codesData as { codeHash: string }[]).map((c) => c.codeHash),
);

let client: Redis | null = null;

/** Lazily build a Redis client from whichever env var convention is present. */
function redis(): Redis {
  if (client) return client;
  // Vercel's Upstash/KV integration sets KV_REST_API_*, the standalone Upstash
  // integration sets UPSTASH_REDIS_REST_*. Support both.
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    throw new Error(
      "Missing Redis credentials: set UPSTASH_REDIS_REST_URL/TOKEN (or KV_REST_API_URL/TOKEN).",
    );
  }
  client = new Redis({ url, token });
  return client;
}

const key = (codeHash: string) => `access:${codeHash}`;

/** True when this hash corresponds to one of the generated codes. */
export function isValidCodeHash(codeHash: string): boolean {
  return VALID_HASHES.has(codeHash);
}

/** Current activation for a code, or null if it hasn't been activated yet. */
export async function getActivation(
  codeHash: string,
): Promise<ActivationRecord | null> {
  return (await redis().get<ActivationRecord>(key(codeHash))) ?? null;
}

export interface ActivateResult {
  record: ActivationRecord;
  /** True if THIS call performed the activation (vs. it already existed). */
  justActivated: boolean;
}

/**
 * Atomically bind a code to a device on first use. Uses Redis `SET … NX` so two
 * devices racing on the same fresh code can never both win — exactly one gets
 * `justActivated: true`; the other reads the existing record and is compared
 * against it by the caller.
 */
export async function activateOrGet(
  codeHash: string,
  deviceHash: string,
): Promise<ActivateResult> {
  const record: ActivationRecord = {
    deviceHash,
    activationDate: new Date().toISOString(),
  };

  const res = await redis().set(key(codeHash), record, { nx: true });
  if (res === "OK") {
    return { record, justActivated: true };
  }

  // Someone already activated it — return the stored record for comparison.
  const existing = await getActivation(codeHash);
  return {
    record: existing ?? record,
    justActivated: false,
  };
}
