"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

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
  const captionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousTriggerRef = useRef<HTMLButtonElement | null>(null);
  const previousOverflow = useRef<string>("");

  const filteredImages = useMemo(() => {
    if (activeFilter === "All") {
      return images;
    }

    return images.filter((image) => image.category === activeFilter);
  }, [activeFilter, images]);

  const selectedImage = selectedIndex === null ? null : filteredImages[selectedIndex] ?? null;

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    if (selectedImage === null) return;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow.current;
      window.removeEventListener("keydown", onKey);
      previousTriggerRef.current?.focus();
    };
  }, [selectedImage, closeLightbox]);

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
                : "border border-line text-fg/70 hover:text-fg"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-3">
        {filteredImages.map((image, index) => (
          <button
            key={`${image.src}-${image.caption}`}
            type="button"
            onClick={(event) => {
              previousTriggerRef.current = event.currentTarget;
              setSelectedIndex(index);
            }}
            className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-forest-deep text-left sm:rounded-3xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-forest-deep/70 via-forest-deep/10 to-transparent opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100" />
            <span className="pointer-events-none absolute inset-x-3 bottom-3 line-clamp-2 text-xs text-offwhite opacity-100 transition sm:inset-x-4 sm:bottom-4 sm:text-sm sm:opacity-0 sm:group-hover:opacity-100">
              {image.caption}
            </span>
          </button>
        ))}
      </div>

      {selectedImage ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={captionId}
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest-deep/90 p-3 backdrop-blur-md sm:p-6"
          onClick={closeLightbox}
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close gallery preview"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-offwhite text-2xl leading-none text-forest-deep shadow-lg transition hover:bg-gold hover:text-offwhite sm:right-6 sm:top-6 sm:h-12 sm:w-12 sm:text-3xl"
          >
            ×
          </button>
          <figure
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl overflow-hidden rounded-2xl bg-forest-deep shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:rounded-4xl"
          >
            <div className="relative aspect-16/10">
              <Image src={selectedImage.src} alt={selectedImage.alt} fill sizes="100vw" className="object-cover" />
            </div>
            <figcaption id={captionId} className="p-4 text-xs text-offwhite/80 sm:p-5 sm:text-sm">
              {selectedImage.caption}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}