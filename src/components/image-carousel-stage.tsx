import Image from "next/image";

type CarouselStageImage = {
  src: string;
  alt: string;
};

type ImageCarouselStageProps = {
  images: readonly CarouselStageImage[];
  activeIndex: number;
  sizes: string;
  imageClassName?: string;
};

export function ImageCarouselStage({
  images,
  activeIndex,
  sizes,
  imageClassName = "object-cover",
}: ImageCarouselStageProps) {
  if (images.length === 0) return null;

  const imageIndices = Array.from(
    new Set([
      (activeIndex - 1 + images.length) % images.length,
      activeIndex,
      (activeIndex + 1) % images.length,
    ]),
  );

  return (
    <>
      {imageIndices.map((index) => {
        const image = images[index];
        if (!image) return null;

        return (
          <Image
            key={`${image.src}-${index}`}
            src={image.src}
            alt={image.alt}
            fill
            loading="eager"
            sizes={sizes}
            className={`${imageClassName} transition-opacity duration-200 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          />
        );
      })}
    </>
  );
}