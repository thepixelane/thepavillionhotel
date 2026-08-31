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
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label={`Previous ${name} photograph`}
            className="grid h-11 w-11 place-items-center bg-white text-forest sm:h-10 sm:w-10"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label={`Next ${name} photograph`}
            className="grid h-11 w-11 place-items-center bg-white text-forest sm:h-10 sm:w-10"
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}