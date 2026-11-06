"use client";

import { useRef, useState } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { optimizedPath } from "@/lib/image-paths";
import { u } from "@/lib/utils";

/*
  A film in a Figma box (AJC-16: the ibex mascot film). Shows the poster
  frame with the design's white play triangle; clicking plays the film in
  place with sound and native controls. play() runs inside the click, which is
  what lets browsers start it unmuted.

  Positioned in Figma px inside the page canvas (`--u` = 1 Figma px).
*/

/** `sizes` for an image drawn `width` Figma px wide in the 1920 canvas. */
const sizesFor = (width: number) =>
  `(min-width: 1920px) ${Math.ceil(width)}px, ${+((width / 1920) * 100).toFixed(2)}vw`;

export function VirsaFilmPlayer({
  src,
  poster,
  title,
  box,
  triangle,
}: {
  src: string;
  /** Poster frame (an optimized image path). */
  poster: string;
  /** Names the film for the play button. */
  title: string;
  box: { x: number; y: number; w: number; h: number };
  /** The play triangle, relative to the box's top-left. */
  triangle: { x: number; y: number; size: number };
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    void video.play().catch(() => setStarted(false));
  };

  return (
    <div
      className="absolute overflow-hidden bg-[#9b9484]"
      style={{ left: u(box.x), top: u(box.y), width: u(box.w), height: u(box.h) }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={optimizedPath(poster, 1280) ?? poster}
        preload="none"
        playsInline
        controls={started}
        aria-label={title}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      {started ? null : (
        <button
          type="button"
          onClick={play}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 cursor-pointer"
        >
          <OptimizedImage
            src={poster}
            alt=""
            width={Math.round(box.w)}
            height={Math.round(box.h)}
            sizes={sizesFor(box.w)}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <svg
            viewBox="0 0 56.2917 48.75"
            fill="white"
            aria-hidden
            className="absolute rotate-90 transition-transform duration-300 group-hover:scale-110"
            style={{
              left: u(triangle.x),
              top: u(triangle.y),
              width: u(triangle.size),
              height: u(triangle.size),
            }}
          >
            <path d="M28.1458 0L56.2917 48.75H0L28.1458 0Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
