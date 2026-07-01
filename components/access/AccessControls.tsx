"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { LogOut, Loader2 } from "lucide-react";
import { isProtectedPath } from "@/lib/access/paths";

/**
 * Floating "تسجيل الخروج" control. Appears only on protected pages that the
 * current browser is actually authorized to view. Logging out clears the
 * session cookie for this browser only — the code stays bound to the device.
 */
export function AccessControls() {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [busy, setBusy] = useState(false);

  const onProtected = isProtectedPath(pathname);

  useEffect(() => {
    // On non-protected routes the control is never rendered, so there's nothing
    // to check or reset here.
    if (!onProtected) return;
    let active = true;
    fetch("/api/access/status", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { authorized?: boolean }) => {
        if (active) setAuthorized(Boolean(d?.authorized));
      })
      .catch(() => {
        if (active) setAuthorized(false);
      });
    return () => {
      active = false;
    };
  }, [pathname, onProtected]);

  async function onLogout() {
    if (busy) return;
    setBusy(true);
    try {
      await fetch("/api/access/logout", { method: "POST" });
      setAuthorized(false);
      // Re-render current route → proxy now shows the lock screen.
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {onProtected && authorized && (
        <motion.button
          type="button"
          onClick={onLogout}
          disabled={busy}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="glass-strong fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full py-2.5 pr-4 pl-5 text-sm font-medium text-[var(--color-muted)] shadow-lg transition hover:text-white hover:border-red-500/40"
          aria-label="تسجيل الخروج"
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          تسجيل الخروج
        </motion.button>
      )}
    </AnimatePresence>
  );
}
