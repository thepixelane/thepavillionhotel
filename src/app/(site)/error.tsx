"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Site error boundary caught:", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60svh] w-full max-w-3xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
      <p className="text-[11px] uppercase tracking-[0.32em] text-fg-muted">The Pavillion Hotel</p>
      <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">Something went wrong</h1>
      <p className="mt-4 max-w-xl text-fg-muted">
        We could not load this page right now. Please try again in a moment, or reach out to our
        reception team.
      </p>
      {error.digest ? (
        <p className="mt-3 text-xs text-fg-muted/70">Reference: {error.digest}</p>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-forest-deep px-6 py-3 text-sm text-offwhite transition hover:bg-emerald focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-line px-6 py-3 text-sm text-fg transition hover:bg-surface-2"
        >
          Back to home
        </Link>
        <a
          href="tel:+919665599999"
          className="rounded-full border border-line px-6 py-3 text-sm text-fg transition hover:bg-surface-2"
        >
          Call reception
        </a>
      </div>
    </main>
  );
}
