import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMenuBySlug, getMenus } from "@/lib/sanity-content";
import { siteUrl } from "@/lib/public-env";

export const revalidate = 3600;
export const dynamicParams = true;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const menus = await getMenus();
  return menus.map((menu) => ({ slug: menu.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const menu = await getMenuBySlug(slug);
  if (!menu) return {};
  return {
    title: `${menu.title} Menu`,
    alternates: { canonical: new URL(`/menu/${menu.slug}`, siteUrl).toString() },
    robots: { index: false, follow: false },
  };
}

// Bundled PDFs are served from /public, so confirm the file is actually there.
function isAvailable(fileUrl: string | null): fileUrl is string {
  if (!fileUrl) return false;
  if (!fileUrl.startsWith("/")) return true;
  return fs.existsSync(path.join(process.cwd(), "public", fileUrl));
}

export default async function MenuPage({ params }: PageProps) {
  const { slug } = await params;
  const menu = await getMenuBySlug(slug);
  if (!menu) notFound();

  const available = isAvailable(menu.fileUrl);
  // Fit-to-width so the first page isn't cropped in desktop PDF viewers.
  const viewerUrl = available ? `${menu.fileUrl}#view=FitH&toolbar=1` : null;

  return (
    <div className="mx-auto flex min-h-[70svh] w-full max-w-6xl flex-col gap-5 px-4 py-8 sm:gap-6 sm:px-6 sm:py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-2xl text-fg sm:text-3xl">{menu.title}</h1>
        {available ? (
          <a
            href={menu.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden border border-forest px-5 py-3 text-xs uppercase tracking-[0.22em] text-forest transition hover:bg-forest hover:text-white sm:inline-block dark:border-fresh dark:text-fresh"
          >
            Open PDF
          </a>
        ) : null}
      </div>

      {!available ? (
        <p className="rounded-2xl border border-line bg-surface p-6 text-sm text-fg-muted">
          Menu coming soon.
        </p>
      ) : (
        <>
          {/* Mobile browsers can't render PDFs in an iframe, so hand off to the
              device's native viewer instead. */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-10 text-center sm:hidden">
            <p className="text-sm leading-6 text-fg-muted">
              Tap below to open the menu in your phone&rsquo;s PDF viewer.
            </p>
            <a
              href={menu.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-xs bg-forest px-6 py-4 text-xs uppercase tracking-[0.22em] text-white"
            >
              View {menu.title}
            </a>
            <a
              href={menu.fileUrl}
              download
              className="text-[11px] uppercase tracking-[0.22em] text-fg-muted underline underline-offset-4"
            >
              Download PDF
            </a>
          </div>

          <iframe
            src={viewerUrl ?? undefined}
            title={`${menu.title} PDF`}
            className="hidden h-[80svh] w-full rounded-2xl border border-line bg-white sm:block"
          />
        </>
      )}
    </div>
  );
}
