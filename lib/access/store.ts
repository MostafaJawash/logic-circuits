import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * File-backed store for access codes. Codes are persisted as peppered hashes —
 * never in plaintext — in `data/accessCodes.json`.
 */

export interface AccessCodeRecord {
  /** Peppered HMAC of the code (see `hashCode`). The lookup key. */
  codeHash: string;
  /** "available" until first used, then "used". */
  status: "available" | "used";
  /** Whether the code has been bound to a device yet. */
  activated: boolean;
  /** Peppered hash of the bound device fingerprint, or null before activation. */
  deviceHash: string | null;
  /** ISO timestamp of activation, or null before activation. */
  activationDate: string | null;
}

const STORE_PATH = join(process.cwd(), "data", "accessCodes.json");

/**
 * Serialize writes within a single server process so two concurrent
 * activations can't clobber each other's changes.
 */
let writeChain: Promise<void> = Promise.resolve();

export async function readStore(): Promise<AccessCodeRecord[]> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    return JSON.parse(raw) as AccessCodeRecord[];
  } catch {
    return [];
  }
}

async function writeStore(records: AccessCodeRecord[]): Promise<void> {
  await writeFile(STORE_PATH, `${JSON.stringify(records, null, 2)}\n`, "utf8");
}

export async function findByCodeHash(
  codeHash: string,
): Promise<AccessCodeRecord | undefined> {
  const records = await readStore();
  return records.find((r) => r.codeHash === codeHash);
}

/**
 * Atomically update the record matching `codeHash` via `mutate`, persisting the
 * whole store. Returns the updated record, or null if not found. Updates are
 * queued so overlapping requests apply on top of each other's writes.
 */
export function updateRecord(
  codeHash: string,
  mutate: (record: AccessCodeRecord) => void,
): Promise<AccessCodeRecord | null> {
  const run = writeChain.then(async () => {
    const records = await readStore();
    const record = records.find((r) => r.codeHash === codeHash);
    if (!record) return null;
    mutate(record);
    await writeStore(records);
    return record;
  });

  // Keep the chain alive even if this update rejects.
  writeChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}
