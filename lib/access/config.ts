/**
 * Server-only access-control configuration.
 *
 * This module (and everything under `lib/access/` that imports it) must NEVER be
 * pulled into a client bundle — it is only ever imported from route handlers and
 * `proxy.ts`, which run exclusively on the server. That keeps the secret and the
 * code hashes off the wire entirely.
 */

// The protected-route list lives in a client-safe module so it can be shared
// with client components without dragging the secret along.
export { PROTECTED_PATHS, isProtectedPath } from "./paths";

/** Name of the httpOnly cookie that carries the signed device session. */
export const SESSION_COOKIE = "lgc_access";

/** How long an authorized device stays logged in (1 year, in seconds). */
export const SESSION_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Server secret used to (a) pepper the stored code hashes and (b) sign session
 * cookies. Override it in production via the `ACCESS_CODE_SECRET` environment
 * variable. The literal fallback keeps the project working out-of-the-box after
 * a clean clone.
 *
 * ⚠️ The generator script (`scripts/generate-access-codes.mjs`) hardcodes the
 * SAME fallback literal. If you change one, change the other and re-run the
 * generator, otherwise the stored hashes will no longer match.
 */
export const ACCESS_SECRET =
  process.env.ACCESS_CODE_SECRET ??
  "WhN-Nswy4o5aksKy01JNP2ytyhwbVWU6R3GuJWrTV3G_sCiDMZsaF8EM49AZ4Zzj";
