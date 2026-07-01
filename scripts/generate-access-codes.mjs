/**
 * Generates 100 unique, hard-to-guess access codes.
 *
 * Outputs:
 *   - data/accessCodes.json  → runtime store (peppered HASHES only, no plaintext)
 *   - access-codes.csv       → admin file with the plaintext codes + status columns
 *   - access-codes.txt       → human-readable version of the same admin list
 *
 * Run with:  node scripts/generate-access-codes.mjs
 *
 * ⚠️ The secret below MUST match `ACCESS_SECRET` in lib/access/config.ts, and the
 * hashing scheme MUST match `hashCode` in lib/access/crypto.ts. If you change the
 * secret, re-run this script so the stored hashes stay valid.
 */
import { createHmac, randomInt } from "node:crypto";
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const SECRET =
  process.env.ACCESS_CODE_SECRET ??
  "WhN-Nswy4o5aksKy01JNP2ytyhwbVWU6R3GuJWrTV3G_sCiDMZsaF8EM49AZ4Zzj";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const COUNT = 100;

// Unambiguous alphabet — no 0/O/1/I/L to avoid transcription mistakes.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function normalizeCode(raw) {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

function hashCode(rawCode) {
  return createHmac("sha256", SECRET)
    .update(`code:${normalizeCode(rawCode)}`)
    .digest("hex");
}

function randomBlock(len) {
  let out = "";
  for (let i = 0; i < len; i++) out += ALPHABET[randomInt(ALPHABET.length)];
  return out;
}

// Format: LGC-XXXX-XXXX  (e.g. LGC-48FJ-91A2)
function makeCode() {
  return `LGC-${randomBlock(4)}-${randomBlock(4)}`;
}

const codes = new Set();
while (codes.size < COUNT) codes.add(makeCode());
const codeList = [...codes];

// 1) Runtime store — hashes only.
const store = codeList.map((code) => ({
  codeHash: hashCode(code),
  status: "available",
  activated: false,
  deviceHash: null,
  activationDate: null,
}));

mkdirSync(join(ROOT, "data"), { recursive: true });
writeFileSync(
  join(ROOT, "data", "accessCodes.json"),
  `${JSON.stringify(store, null, 2)}\n`,
  "utf8",
);

// 2) Admin CSV — plaintext codes + status columns.
const header = "Code,Status,Activated,Device ID,Activation Date";
const csvRows = codeList.map((code) => `${code},Available,No,,`);
writeFileSync(
  join(ROOT, "access-codes.csv"),
  `${[header, ...csvRows].join("\n")}\n`,
  "utf8",
);

// 3) Admin TXT — human-readable table.
const txtRows = codeList.map(
  (code, i) =>
    `${String(i + 1).padStart(3, " ")}. ${code}   | Status: Available | Activated: No | Device ID: - | Activation Date: -`,
);
writeFileSync(
  join(ROOT, "access-codes.txt"),
  `Logic Circuits — Access Codes (${COUNT})\n` +
    `Generated once. Keep this file private — do not commit or share publicly.\n` +
    `${"=".repeat(72)}\n${txtRows.join("\n")}\n`,
  "utf8",
);

console.log(`Generated ${COUNT} codes.`);
console.log(" - data/accessCodes.json (hashed store)");
console.log(" - access-codes.csv (admin)");
console.log(" - access-codes.txt (admin)");
