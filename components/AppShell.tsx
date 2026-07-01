"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { MobileDrawer } from "./MobileDrawer";
import { Footer } from "./Footer";
import { AccessControls } from "./access/AccessControls";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <Sidebar />
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Content is offset by the sidebar width on desktop (RTL → margin-right). */}
      <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:mr-72">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>

      <AccessControls />
    </>
  );
}
