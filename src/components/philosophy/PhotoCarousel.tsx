"use client";

import { useState } from "react";
import Image from "next/image";
import { cn, fig } from "@/lib/utils";
// Static imports: Next fingerprints the files and applies the basePath itself.
import mountain from "../../../public/images/philosophy/carousel-mountain.jpg";
import firstLetter from "../../../public/images/philosophy/carousel-first-letter.jpg";
import leh from "../../../public/images/philosophy/carousel-leh.jpg";
import typewriter from "../../../public/images/philosophy/carousel-typewriter.jpg";

/*
  Photo carousel — Figma: PHILOSOPHY, y3777 (1920 frame).
  Three slides, 138px apart and centred: a portrait mountain (297 x 383), a
  stacked pair (375 wide: 107 card, 34 gap, 251 photo) and a typewriter
  (389 x 383). The arrows (x149 / x1743) rotate the slides in a loop.
  On phones one slide shows at a time.
*/
const SLIDES = [
  {
    key: "mountain",
    width: 297,
    body: (
      <Image
        src={mountain}
        alt="Snow on a mountain ridge under heavy clouds, in black and white."
        className="h-auto w-full"
      />
    ),
  },
  {
    key: "letter",
    width: 375,
    body: (
      <div className="flex flex-col" style={{ gap: fig(34, "1rem") }}>
        <Image
          src={firstLetter}
          alt="A typed card that reads “Apeksha Jain’s first letter”."
          className="h-auto w-full"
        />
        <Image
          src={leh}
          alt="An old street in Leh with the palace on the hill behind, in black and white."
          className="h-auto w-full"
        />
      </div>
    ),
  },
  {
    key: "typewriter",
    width: 389,
    body: (
      <Image
        src={typewriter}
        alt="A vintage typewriter with a sheet of paper in it."
        className="h-auto w-full"
      />
    ),
  },
];

export function PhotoCarousel() {
  const [offset, setOffset] = useState(0);
  const n = SLIDES.length;
  const order = SLIDES.map((_, i) => SLIDES[(i + offset) % n]);
  const step = (d: number) => setOffset((o) => (o + d + n) % n);

  return (
    <section aria-roledescription="carousel" aria-label="Photographs" className="relative">
      <div
        className="flex items-center justify-center px-14 md:px-0"
        style={{ gap: fig(138, "1rem") }}
      >
        {order.map((s, i) => (
          <figure
            // Keyed by position too, so each rotation remounts and fades in.
            key={`${s.key}-${offset}`}
            aria-roledescription="slide"
            aria-label={`${((i + offset) % n) + 1} of ${n}`}
            className={cn("ajc-fade-in shrink-0", i > 0 && "hidden md:block")}
            style={{ width: fig(s.width, "14rem") }}
          >
            {s.body}
          </figure>
        ))}
      </div>

      <ArrowButton side="left" label="Previous photos" onClick={() => step(-1)} />
      <ArrowButton side="right" label="Next photos" onClick={() => step(1)} />
    </section>
  );
}

function ArrowButton({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="hover:text-taupe absolute top-1/2 -translate-y-1/2 cursor-pointer p-2 text-[#9b9484] transition-colors"
      style={{ [side]: `calc(${fig(149, "0.75rem")} - 0.5rem)` }}
    >
      <svg
        viewBox="0 0 26 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        aria-hidden
        style={{ width: fig(26, "1.1rem") }}
      >
        <path d={side === "left" ? "M23 2 4 12l19 10" : "M3 2l19 10L3 22"} strokeLinejoin="miter" />
      </svg>
    </button>
  );
}
