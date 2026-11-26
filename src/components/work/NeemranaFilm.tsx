"use client";

import { useRef, useState, type ReactNode } from "react";
import { assetPath, cn, u } from "@/lib/utils";

type Box = { x: number; y: number; w: number; h: number };

/*
  A Neemrana brand film in its Figma box (AJC-23). Shows the page's own poster
  (passed as children, so each layout keeps its Figma crop) under the ringed
  play button (Figma Group 37/38). Clicking plays the film in place with sound
  and native controls. play() runs inside the click, which is what lets
  browsers start it unmuted. Needs `--u` from the page canvas.

  The films are 1080p H.264 at 5 Mbit/s (57 MB and 42 MB), re-encoded from the
  delivered masters; preload="none" so neither downloads until it is played.
*/
export function NeemranaFilm({
  src,
  title,
  box,
  ring,
  children,
}: {
  /** Film path under /public. */
  src: string;
  /** Names the film for the play button and the video. */
  title: string;
  /** Film box on the page canvas, in Figma px. */
  box: Box;
  /** Play ring, relative to the box's top-left: x, y and diameter. */
  ring: { x: number; y: number; size: number };
  /** The poster, filling the box. */
  children: ReactNode;
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
      className="absolute overflow-hidden bg-black"
      style={{ left: u(box.x), top: u(box.y), width: u(box.w), height: u(box.h) }}
    >
      {children}
      <video
        ref={videoRef}
        src={assetPath(src)}
        preload="none"
        playsInline
        controls={started}
        aria-label={title}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          !started && "pointer-events-none invisible",
        )}
      />
      {started ? null : (
        <button
          type="button"
          onClick={play}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 cursor-pointer"
        >
          <svg
            viewBox="0 0 98 98"
            aria-hidden
            className="absolute transition-transform duration-300 group-hover:scale-110"
            style={{ left: u(ring.x), top: u(ring.y), width: u(ring.size), height: u(ring.size) }}
          >
            <circle cx="49" cy="49" r="49" fill="#1A1919" fillOpacity="0.61" />
            <path d="M73 48.5L34.75 70.5836L34.75 26.4164L73 48.5Z" fill="white" />
          </svg>
        </button>
      )}
    </div>
  );
}
