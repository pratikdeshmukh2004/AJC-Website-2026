"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { cn, fig, u } from "@/lib/utils";
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
      <div className="flex flex-col gap-(--stack-gap)">
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

/**
 * `mobile` sizes it from the 390px frame (needs `--u` from the page): one slide
 * at a time, starting on the letter + Leh pair.
 */
export function PhotoCarousel({ mobile = false }: { mobile?: boolean }) {
  const [offset, setOffset] = useState(mobile ? 1 : 0);
  // Slide width: Figma 1920 px scaled, or the mobile frame (218px for the 375px pair).
  const slideW = (w: number) => (mobile ? u((w * 218) / 375) : fig(w, "14rem"));
  // Which way the last step went (0 until the first click), so photos slide in from that side.
  const [direction, setDirection] = useState(0);
  const n = SLIDES.length;
  const order = SLIDES.map((_, i) => SLIDES[(i + offset) % n]);
  const step = (d: number) => {
    setDirection(d);
    setOffset((o) => (o + d + n) % n);
  };

  return (
    <section aria-roledescription="carousel" aria-label="Photographs" className="relative">
      <div
        className="flex items-center justify-center px-14 md:px-0"
        style={{ gap: fig(138, "1rem"), ...(mobile && { paddingLeft: 0, paddingRight: u(6) }) }}
      >
        {order.map((s, i) => (
          <figure
            // Keyed by position too, so each rotation remounts and slides in.
            key={`${s.key}-${offset}`}
            aria-roledescription="slide"
            aria-label={`${((i + offset) % n) + 1} of ${n}`}
            className={cn(
              "shrink-0",
              direction !== 0 && "ajc-slide-in",
              i > 0 && "hidden md:block",
            )}
            style={
              {
                width: slideW(s.width),
                "--stack-gap": mobile ? u(19) : fig(34, "1rem"),
                // Each photo travels one place: its own width plus the gap.
                "--slide-from": `calc(${direction} * (${slideW(s.width)} + ${fig(138, "1rem")}))`,
              } as CSSProperties
            }
          >
            {s.body}
          </figure>
        ))}
      </div>

      <ArrowButton side="left" label="Previous photos" mobile={mobile} onClick={() => step(-1)} />
      <ArrowButton side="right" label="Next photos" mobile={mobile} onClick={() => step(1)} />
    </section>
  );
}

function ArrowButton({
  side,
  label,
  mobile,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  mobile: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="group hover:text-taupe absolute top-1/2 -translate-y-1/2 cursor-pointer p-2 text-[#9b9484] transition-colors"
      // Mobile arrows are 9px wide, centred 49px from each edge (46 + 5 of padding).
      style={{
        [side]: `calc(${mobile ? u(side === "left" ? 44.5 : 51) : fig(149, "0.75rem")} - 0.5rem)`,
      }}
    >
      <svg
        viewBox="0 0 26 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        aria-hidden
        className="transition-transform duration-300 group-hover:scale-125 group-active:scale-90"
        style={{ width: mobile ? u(9) : fig(26, "1.1rem") }}
      >
        <path d={side === "left" ? "M23 2 4 12l19 10" : "M3 2l19 10L3 22"} strokeLinejoin="miter" />
      </svg>
    </button>
  );
}
