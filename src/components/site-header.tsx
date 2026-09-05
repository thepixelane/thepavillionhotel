"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteNavItems } from "@/lib/site-data";
import logo from "@/assets/logo.svg";

const HERO_ROUTES = new Set<string>(["/", "/stay"]);

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

  const isHeroRoute = HERO_ROUTES.has(pathname);
  const isTransparent = isHeroRoute && !scrolled && !menuOpen;
  const isCompact = scrolled && !menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex items-center justify-between gap-3 transition-all duration-500 ease-out sm:gap-4 ${
          isCompact
            ? "mt-3 w-[calc(100%-1.5rem)] max-w-3xl rounded-full border border-line bg-(--header-bg) px-3 py-1.5 shadow-[0_12px_40px_rgba(20,38,30,0.18)] backdrop-blur-xl sm:mt-4 sm:w-auto sm:px-4 md:max-w-4xl"
            : `mt-0 w-full max-w-7xl 4xl:max-w-[90rem] px-4 py-2 sm:px-5 lg:px-8 ${
                isTransparent
                  ? "border-b border-transparent bg-transparent"
                  : "border-b border-line bg-(--header-bg) backdrop-blur-xl"
              }`
        }`}
      >
        <Link
          href="/"
          aria-label="The Pavillion Hotel home"
          className={`relative block shrink-0 overflow-hidden rounded-sm border bg-[#f6f6f6] shadow-[0_3px_14px_rgba(20,38,30,0.10)] transition-all duration-500 ease-out hover:scale-[1.03] ${
            isCompact
              ? "h-11 w-12 border-forest/10 sm:h-12 sm:w-14"
              : "h-16 w-18 border-forest/10 sm:h-18 sm:w-20"
          }`}
        >
          <Image src={logo} alt="The Pavillion Hotel" fill priority className="object-contain p-1" sizes="80px" />
        </Link>

        <nav
          className={`hidden items-center text-[11px] uppercase tracking-[0.3em] transition-colors md:flex ${
            isCompact ? "gap-4 lg:gap-5" : "gap-6"
          } ${isTransparent ? "text-white" : "text-fg/85"}`}
        >
          {siteNavItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 transition ${
                  active
                    ? "text-gold"
                    : isTransparent
                      ? "text-white/85 hover:text-white"
                      : "text-fg/75 hover:text-fg"
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
            className={`grid h-10 w-10 place-items-center rounded-full border transition sm:h-9 sm:w-9 ${
              isTransparent
                ? "border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/15"
                : "border-line bg-surface text-fg hover:border-gold hover:text-gold"
            }`}
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
        className={`mx-auto overflow-hidden border-b border-line bg-(--header-bg) backdrop-blur-xl transition-[max-height,margin] duration-300 ease-out md:hidden ${
          menuOpen
            ? "mt-2 max-h-[min(85dvh,26rem)] w-[calc(100%-1.5rem)] max-w-lg overflow-y-auto rounded-3xl border shadow-[0_18px_50px_rgba(20,38,30,0.2)]"
            : "mt-0 max-h-0 w-full"
        }`}
      >
        <nav className="flex flex-col px-3 py-3">
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