import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getOffers } from "@/lib/sanity-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Hotel & Dining Offers",
  description:
    "Explore current hotel offers, festival celebrations, restaurant updates, and announcements from The Pavillion Hotel in Kolhapur.",
  path: "/offers",
});

function typeLabel(type: string): string {
  switch (type) {
    case "offer":
      return "Hotel Offer";
    case "festival":
      return "Festival Celebration";
    case "restaurantUpdate":
      return "Restaurant Update";
    case "announcement":
      return "Announcement";
    default:
      return "Update";
  }
}

export default async function OffersPage() {
  const { posts } = await getOffers({ limit: 18 });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-14 lg:px-8 lg:py-20">
      <header className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Offers & Updates</p>
        <h1 className="mt-4 text-4xl leading-tight text-fg sm:text-5xl lg:text-6xl">Campaigns worth planning around</h1>
        <p className="mt-5 text-base leading-8 text-fg-muted sm:text-lg">
          Time-sensitive offers, festival moments, and dining updates are grouped here for quick discovery.
        </p>
      </header>

      {posts.length > 0 ? (
        <section className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_20px_60px_rgba(20,38,30,0.08)]"
            >
              <div className="relative h-52 bg-forest-deep">
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
                  {typeLabel(post.contentType)}
                </p>
                <h2 className="mt-3 text-xl leading-snug text-fg">{post.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-fg-muted">{post.excerpt}</p>
                <div className="mt-5">
                  <Link
                    href="/contact"
                    className="inline-flex rounded-full bg-forest px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-offwhite transition hover:bg-gold"
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="mt-10 rounded-3xl border border-dashed border-line bg-surface p-8 text-center sm:mt-12">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">No Active Offers</p>
          <p className="mt-3 text-sm text-fg-muted">
            Add offer or festival posts in Studio and set them to Published.
          </p>
        </section>
      )}
    </main>
  );
}
