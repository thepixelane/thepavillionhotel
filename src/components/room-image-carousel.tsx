"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

type RoomImageCarouselProps = {
  images: readonly string[];
  roomName: string;
};

export function RoomImageCarousel({ images, roomName }: RoomImageCarouselProps) {
  const validImages = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = validImages[activeIndex] ?? null;

  const goPrevious = useCallback(() => {
    if (validImages.length === 0) return;
    setActiveIndex((current) => (current - 1 + validImages.length) % validImages.length);
  }, [validImages.length]);

  const goNext = useCallback(() => {
    if (validImages.length === 0) return;
    setActiveIndex((current) => (current + 1) % validImages.length);
  }, [validImages.length]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <div
      className="bg-surface-2 p-2 sm:p-3"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${roomName} image gallery`}
      onKeyDown={onKeyDown}
    >
      <div className="relative overflow-hidden rounded-2xl bg-forest-deep sm:rounded-3xl">
        <div className="relative aspect-4/3 min-h-64 sm:min-h-72">
          {activeImage ? (
            <Image
              src={activeImage}
              alt={`${roomName} image ${activeIndex + 1} of ${validImages.length}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-[11px] uppercase tracking-[0.3em] text-offwhite/40">
                Image coming soon
              </p>
            </div>
          )}
        </div>

        {validImages.length > 1 && (
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-linear-to-t from-forest-deep/85 to-transparent p-3 sm:p-4">
            <p
              className="text-[10px] uppercase tracking-[0.3em] text-offwhite/80 sm:text-[11px]"
              aria-live="polite"
              aria-atomic="true"
            >
              {activeIndex + 1} / {validImages.length}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={goPrevious}
                aria-label={`Previous image for ${roomName}`}
                className="grid h-11 w-11 place-items-center rounded-full border border-offwhite/20 bg-white/10 text-offwhite transition hover:border-gold hover:text-gold sm:h-10 sm:w-10"
              >
                ←
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label={`Next image for ${roomName}`}
                className="grid h-11 w-11 place-items-center rounded-full border border-offwhite/20 bg-white/10 text-offwhite transition hover:border-gold hover:text-gold sm:h-10 sm:w-10"
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}