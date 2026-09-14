"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { ContentImage } from "@/lib/site-data";

export function DiningGallery({ images, name }: { images: ContentImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const move = useCallback(
    (direction: number) => {
      if (images.length === 0) return;
      setActive((current) => (current + direction + images.length) % images.length);
    },
    [images.length],
  );
  const image = images[active];
  if (!image) return <div className="min-h-72 bg-forest-deep" aria-label={`${name} imagery coming soon`} role="img" />;

  return (
    <div
      className="relative min-h-72 overflow-hidden bg-forest-deep sm:min-h-96"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${name} photo gallery`}
    >
      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      {images.length > 1 ? (
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-forest-deep/85 to-transparent p-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-offwhite/80" aria-live="polite">
            {active + 1} / {images.length}
          </p>
          <div className="flex gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label={`Previous ${name} photograph`}
            className="image-nav-button sm:h-10 sm:w-10"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label={`Next ${name} photograph`}
            className="image-nav-button sm:h-10 sm:w-10"
          >
            →
          </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}