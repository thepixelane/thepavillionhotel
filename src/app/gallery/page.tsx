import { GalleryLightbox } from "@/components/gallery-lightbox";
import { galleryImages } from "@/lib/site-data";

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Gallery</p>
      <h1 className="mt-4 text-5xl text-forest-deep sm:text-6xl">The Gallery</h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
        Browse the property, rooms, events, dining, and gardens. Tap any image to open a full-screen preview.
      </p>

      <div className="mt-12">
        <GalleryLightbox images={galleryImages} />
      </div>
    </main>
  );
}