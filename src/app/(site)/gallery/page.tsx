import type { Metadata } from "next";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { getGalleryImages } from "@/lib/sanity-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Hotel, Rooms & Event Gallery",
  description:
    "View photos of The Pavillion Hotel's rooms, restaurants, gardens, wedding venues, and event spaces in Kolhapur.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const galleryImages = await getGalleryImages();

  return (
    <main className="mx-auto max-w-7xl 4xl:max-w-[90rem] px-4 py-10 sm:px-5 sm:py-14 lg:px-8 lg:py-20">
      <header className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Gallery</p>
        <h1 className="mt-4 text-4xl leading-tight text-fg sm:text-5xl lg:text-6xl">The Gallery</h1>
        <p className="mt-5 text-base leading-8 text-fg-muted sm:text-lg">
          Browse the property, rooms, events, dining, and gardens. Tap any image to open a full-screen preview.
        </p>
      </header>

      <div className="mt-10 sm:mt-12">
        <GalleryLightbox images={galleryImages} />
      </div>
    </main>
  );
}