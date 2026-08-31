import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for could not be found on The Pavillion Hotel website.",
  robots: { index: false, follow: true },
};

export default function SiteNotFound() {
  return (
    <main className="mx-auto flex min-h-[60svh] w-full max-w-3xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
      <p className="text-[11px] uppercase tracking-[0.32em] text-fg-muted">404 &mdash; Not found</p>
      <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">This page could not be found</h1>
      <p className="mt-4 max-w-xl text-fg-muted">
        The link may be outdated or the page may have moved. Explore the sections below or head back
        to our homepage.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-forest-deep px-6 py-3 text-sm text-offwhite transition hover:bg-emerald"
        >
          Back to home
        </Link>
        <Link
          href="/stay"
          className="rounded-full border border-line px-6 py-3 text-sm text-fg transition hover:bg-surface-2"
        >
          Rooms &amp; suites
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-line px-6 py-3 text-sm text-fg transition hover:bg-surface-2"
        >
          Contact us
        </Link>
      </div>
    </main>
  );
}
