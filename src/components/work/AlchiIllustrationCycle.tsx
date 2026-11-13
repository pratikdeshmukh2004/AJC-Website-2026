"use client";

import { useEffect, useState } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";

/*
  Alchi Kitchen illustrations (AJC-19). Figma comment: "Illustrations to
  change every 0.5 seconds." All frames stay mounted (stacked) so swapping is
  an opacity change with no loading flicker. Users who prefer reduced motion
  get the first illustration only.
*/

export type CycleImage = { src: string; alt: string; width: number; height: number };

const INTERVAL_MS = 500;

export function AlchiIllustrationCycle({ images }: { images: CycleImage[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || images.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % images.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <div className="relative h-full w-full">
      {images.map((image, i) => (
        <OptimizedImage
          key={image.src}
          src={image.src}
          alt={i === index ? image.alt : ""}
          aria-hidden={i === index ? undefined : true}
          width={image.width}
          height={image.height}
          loading="eager"
          sizes="(min-width: 1920px) 600px, 31vw"
          className="absolute inset-0 h-full w-full object-contain"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
