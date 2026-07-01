import type { Metadata } from "next";
import { LockScreen } from "@/components/access/LockScreen";

export const metadata: Metadata = {
  title: "محتوى محمي",
  description: "أدخل رمز الدخول للوصول إلى هذا المحتوى.",
  robots: { index: false, follow: false },
};

/**
 * The lock screen. `proxy.ts` rewrites protected routes here (keeping the
 * original URL) whenever the visitor has no valid device session, so this page
 * is what an unauthorized user sees in place of the lesson.
 */
export default function LockedPage() {
  return <LockScreen />;
}
