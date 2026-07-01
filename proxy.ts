import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, isProtectedPath } from "@/lib/access/config";
import { verifySessionToken } from "@/lib/access/crypto";

/**
 * Server-side route protection (Next 16's replacement for middleware).
 *
 * For every protected route, we require a valid, signed device-session cookie.
 * Without one, the request is *rewritten* to `/locked` — the URL the visitor
 * typed stays in the address bar, but they see the lock screen instead of the
 * lesson. Because this runs on the server before rendering, protected content is
 * never sent to an unauthorized browser and the URL can't be bypassed by hand.
 *
 * Proxy runs on the Node.js runtime by default in Next 16, so the Node `crypto`
 * used to verify the token's signature is available here.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (verifySessionToken(token)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/locked";
  return NextResponse.rewrite(url);
}

export const config = {
  // Run on page routes only — skip API, Next internals and static assets.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
