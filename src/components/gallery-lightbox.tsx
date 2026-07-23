"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export type GalleryImage = {
  category: string;
  caption: string;
  src: string;
  alt: string;
};

type GalleryLightboxProps = {
  images: readonly GalleryImage[];
};

const filters = ["All", "Property", "Rooms", "Dining", "Events", "Gardens"] as const;

export function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (activeFilter === "All") {
      return images;
    }

    return images.filter((image) => image.category === activeFilter);
  }, [activeFilter, images]);

  const selectedImage = selectedIndex === null ? null : filteredImages[selectedIndex] ?? null;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition ${
              filter === activeFilter
                ? "bg-forest-deep text-offwhite"
                : "border border-forest-deep/15 text-forest-deep/70 hover:text-forest-deep"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredImages.map((image, index) => (
          <button
            key={`${image.src}-${image.caption}`}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-forest-deep text-left"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/55 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute bottom-4 left-4 right-4 text-sm text-offwhite opacity-0 transition group-hover:opacity-100">
              {image.caption}
            </span>
          </button>
        ))}
      </div>

      {selectedImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-deep/85 p-4 backdrop-blur-md">
          <button
            type="button"
            aria-label="Close gallery preview"
            onClick={() => setSelectedIndex(null)}
            className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-offwhite text-3xl text-forest-deep"
          >
            ×
          </button>
          <figure className="w-full max-w-5xl overflow-hidden rounded-[2rem] bg-forest-deep shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="relative aspect-[16/10]">
              <Image src={selectedImage.src} alt={selectedImage.alt} fill sizes="100vw" className="object-cover" />
            </div>
            <figcaption className="p-5 text-sm text-offwhite/80">{selectedImage.caption}</figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}