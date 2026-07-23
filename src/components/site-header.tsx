import Link from "next/link";
import { siteNavItems } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-[rgba(250,247,241,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <Link href="/" className="font-serif text-2xl tracking-[0.2em] text-forest-deep">
          The Pavillion<span className="text-gold">.</span>
        </Link>
        <nav className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.3em] text-forest-deep/80 md:flex">
          {siteNavItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-gold">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}