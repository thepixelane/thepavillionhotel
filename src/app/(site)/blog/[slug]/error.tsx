"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog post error boundary caught:", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60svh] w-full max-w-3xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
      <p className="text-[11px] uppercase tracking-[0.32em] text-fg-muted">Journal</p>
      <h1 className="mt-4 text-3xl sm:text-4xl">We could not load this article</h1>
      <p className="mt-4 max-w-xl text-fg-muted">
        Something went wrong while fetching the story. Please try again, or browse the rest of the
        journal.
      </p>
      {error.digest ? (
        <p className="mt-3 text-xs text-fg-muted/70">Reference: {error.digest}</p>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-forest-deep px-6 py-3 text-sm text-offwhite transition hover:bg-emerald"
        >
          Try again
        </button>
        <Link
          href="/blog"
          className="rounded-full border border-line px-6 py-3 text-sm text-fg transition hover:bg-surface-2"
        >
          Back to journal
        </Link>
      </div>
    </main>
  );
}
