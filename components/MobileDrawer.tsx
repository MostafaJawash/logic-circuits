"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { X, Settings, Zap } from "lucide-react";
import { sidebarLinks } from "@/lib/site-data";
import { getIcon } from "@/lib/icons";

export function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col glass-strong lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border-soft/60 px-5 py-4">
              <span className="flex items-center gap-2 font-extrabold">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
                  <Zap className="h-4 w-4 text-accent" />
                </span>
                الدارات المنطقية
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق القائمة"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border-soft text-muted transition-colors hover:text-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto p-3">
              {sidebarLinks.map((link) => {
                const Icon = link.icon ? getIcon(link.icon) : null;
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                      active
                        ? "bg-primary/15 text-white ring-1 ring-primary/40"
                        : "text-muted hover:bg-card/60 hover:text-white"
                    }`}
                  >
                    {Icon && (
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-card/50 text-muted-2 group-hover:text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-border-soft/60 p-3">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted transition-colors hover:bg-card/60 hover:text-white"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-card/50 text-muted-2">
                  <Settings className="h-4 w-4" />
                </span>
                الإعدادات
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
