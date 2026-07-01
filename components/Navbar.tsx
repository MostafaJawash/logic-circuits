"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Menu, Zap } from "lucide-react";
import { navLinks } from "@/lib/site-data";

export function Navbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong sticky top-0 z-50 border-b border-border-soft/60"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30 transition-transform group-hover:scale-110">
            <Zap className="h-5 w-5 text-accent" />
            <span className="absolute inset-0 rounded-xl bg-accent/20 blur-md transition-opacity group-hover:opacity-100 opacity-0" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            الدارات <span className="text-accent">المنطقية</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = link.href === pathname;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-accent ${
                    active ? "text-accent" : "text-muted"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-accent"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA + mobile trigger */}
        <div className="flex items-center gap-2">
          <Link
            href="/#الفصول"
            className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-primary/40 sm:inline-block"
          >
            ابدأ التعلم
          </Link>
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="فتح القائمة"
            className="grid h-10 w-10 place-items-center rounded-lg border border-border-soft text-muted transition-colors hover:text-accent lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
