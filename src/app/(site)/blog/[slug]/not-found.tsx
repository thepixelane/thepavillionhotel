import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Article not found",
  description: "The journal article you are looking for could not be found.",
  robots: { index: false, follow: true },
};

export default function BlogPostNotFound() {
  return (
    <main className="mx-auto flex min-h-[60svh] w-full max-w-3xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
      <p className="text-[11px] uppercase tracking-[0.32em] text-fg-muted">Journal &mdash; 404</p>
      <h1 className="mt-4 text-3xl sm:text-4xl">This article could not be found</h1>
      <p className="mt-4 max-w-xl text-fg-muted">
        The article may have been unpublished or the URL may have changed. Browse the rest of the
        journal below.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/blog"
          className="rounded-full bg-forest-deep px-6 py-3 text-sm text-offwhite transition hover:bg-emerald"
        >
          Back to journal
        </Link>
        <Link
          href="/"
          className="rounded-full border border-line px-6 py-3 text-sm text-fg transition hover:bg-surface-2"
        >
          Home
        </Link>
      </div>
    </main>
  );
}
