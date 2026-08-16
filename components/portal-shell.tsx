"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Logo } from "@/components/logo";

export function PortalShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="bg-app-grid min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <div className="sticky top-0 hidden h-screen w-72 shrink-0 lg:block">
          <Sidebar />
        </div>

        {open ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-brand-navy/50 backdrop-blur-sm animate-fade-in"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-[min(20rem,88vw)] shadow-elevated animate-fade-up">
              <Sidebar onNavigate={() => setOpen(false)} />
            </div>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border/80 bg-surface/85 px-4 py-3 backdrop-blur-md lg:hidden">
            <Logo href="/home" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-brand-navy shadow-sm transition hover:bg-brand-blue-soft"
              aria-label="Open navigation"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
