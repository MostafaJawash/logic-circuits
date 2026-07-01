/**
 * Client-safe list of protected routes. Contains NO secrets or codes, so it can
 * be imported from both server code and client components.
 *
 * Public (never locked): `/` (Home) and `/chapter-1`.
 */
export const PROTECTED_PATHS = [
  "/chapter-2",
  "/chapter-3",
  "/chapter-4",
  "/chapter-5",
  "/chapter-6",
  "/quizzes",
  "/past-questions",
] as const;

/** True when `pathname` points at (or inside) a protected route. */
export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}
