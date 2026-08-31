"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteNavItems } from "@/lib/site-data";
import logo from "@/assets/logo.svg";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled || menuOpen ? "border-b border-line bg-(--header-bg) shadow-sm backdrop-blur-xl" : "border-b border-transparent bg-bg/70 backdrop-blur-md"}`}>
      <div className="mx-auto flex max-w-7xl 4xl:max-w-[90rem] items-center justify-between gap-4 px-4 py-2 sm:gap-6 sm:px-5 lg:px-8">
        <Link
          href="/"
          aria-label="The Pavillion Hotel home"
          className="relative block h-16 w-18 shrink-0 overflow-hidden rounded-sm border border-forest/10 bg-[#f6f6f6] shadow-[0_3px_14px_rgba(20,38,30,0.10)] transition-transform duration-300 hover:scale-[1.03] sm:h-18 sm:w-20"
        >
          <Image src={logo} alt="The Pavillion Hotel" fill priority className="object-contain p-1" sizes="80px" />
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

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-fg transition hover:border-gold hover:text-gold sm:h-9 sm:w-9"
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
          menuOpen
            ? "max-h-[min(85dvh,26rem)] overflow-y-auto"
            : "max-h-0"
        } transition-[max-height] duration-300 ease-out`}
      >
        <nav className="mx-auto flex max-w-7xl 4xl:max-w-[90rem] flex-col px-4 py-3 sm:px-5">
          {siteNavItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-2 py-3 text-[12px] uppercase tracking-[0.28em] transition sm:px-3 ${
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