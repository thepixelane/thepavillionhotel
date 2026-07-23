"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type RoomImageCarouselProps = {
  images: readonly string[];
  roomName: string;
};

export function RoomImageCarousel({ images, roomName }: RoomImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = useMemo(() => images[activeIndex] ?? images[0], [activeIndex, images]);

  const goPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <div className="bg-beige/50 p-3">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-forest-deep">
        <div className="relative aspect-[4/3] min-h-72">
          <Image
            src={activeImage}
            alt={`${roomName} image ${activeIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition duration-500"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-forest-deep/80 to-transparent p-4">
          <p className="text-[11px] uppercase tracking-[0.3em] text-offwhite/80">
            {activeIndex + 1} / {images.length}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={goPrevious}
              aria-label={`Previous image for ${roomName}`}
              className="grid h-10 w-10 place-items-center rounded-full border border-offwhite/20 bg-white/10 text-offwhite transition hover:border-gold hover:text-gold"
            >
              ←
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={`Next image for ${roomName}`}
              className="grid h-10 w-10 place-items-center rounded-full border border-offwhite/20 bg-white/10 text-offwhite transition hover:border-gold hover:text-gold"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}