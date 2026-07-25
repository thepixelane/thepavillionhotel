"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteNavItems } from "@/lib/site-data";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-(--header-bg) backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:gap-6 sm:px-5 sm:py-4 lg:px-8">
        <Link
          href="/"
          className="font-serif text-xl tracking-[0.18em] text-fg transition hover:text-gold sm:text-2xl sm:tracking-[0.2em]"
        >
          The Pavillion<span className="text-gold">.</span>
        </Link>

        <nav className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.3em] md:flex">
          {siteNavItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 transition ${
                  active ? "text-gold" : "text-fg/75 hover:text-fg"
                }`}
              >
                {item.label}
                <span
                  className={`pointer-events-none absolute inset-x-1 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-fg transition hover:border-gold hover:text-gold md:hidden"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-line bg-(--header-bg) backdrop-blur-xl md:hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        } transition-[max-height] duration-300 ease-out`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-5 py-3">
          {siteNavItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-3 py-3 text-[12px] uppercase tracking-[0.28em] transition ${
                  active
                    ? "bg-surface-2 text-gold"
                    : "text-fg/80 hover:bg-surface-2 hover:text-fg"
                }`}
              >
                <span>{item.label}</span>
                {active ? <span className="text-gold">•</span> : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}