"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";
import { sidebarLinks } from "@/lib/site-data";
import { getIcon } from "@/lib/icons";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-16 bottom-0 right-0 z-30 hidden w-72 flex-col border-l border-border-soft/60 glass-strong lg:flex">
      <div className="flex items-center gap-2 px-6 py-5">
        <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-2">
          محتوى المقرر
        </p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {sidebarLinks.map((link) => {
          const Icon = link.icon ? getIcon(link.icon) : null;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-primary/15 text-white ring-1 ring-primary/40"
                  : "text-muted hover:bg-card/60 hover:text-white"
              }`}
            >
              {Icon && (
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${
                    active
                      ? "bg-primary/25 text-accent"
                      : "bg-card/50 text-muted-2 group-hover:text-accent"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
              )}
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border-soft/60 p-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-card/60 hover:text-white"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-card/50 text-muted-2">
            <Settings className="h-4 w-4" />
          </span>
          الإعدادات
        </button>
      </div>
    </aside>
  );
}
