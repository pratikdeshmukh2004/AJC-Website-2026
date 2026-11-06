"use client";

import Link from "next/link";
import { useState } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { ArrowButton } from "@/components/work/VirsaSlideCarousel";
import { u } from "@/lib/utils";

/*
  Experience tiles (AJC-16): two photo tiles at a time, each with a title,
  copy and a "Discover" link over a dark fade at the bottom. The "<" / ">"
  arrows beside them step through the rest in a loop. Every "Discover" opens
  the Virsa Experiences page (Figma comment).

  Positioned in Figma px inside the page canvas (`--u` = 1 Figma px); `y` is
  the tiles' top edge.
*/

export type Experience = { title: string; body: string; image: string; alt: string };

/** `sizes` for an image drawn `width` Figma px wide in the 1920 canvas. */
const sizesFor = (width: number) =>
  `(min-width: 1920px) ${Math.ceil(width)}px, ${+((width / 1920) * 100).toFixed(2)}vw`;

type Slot = { x: number; w: number };

export function VirsaExperienceCarousel({
  items,
  y,
  h,
  slots,
  text,
  arrows,
  href,
}: {
  items: Experience[];
  y: number;
  /** Tile height. */
  h: number;
  /** The two visible tiles' x and width. */
  slots: [Slot, Slot];
  /**
   * Text placement inside a tile, from its top-left: the title's bottom edge
   * (titles grow upward if they wrap), the copy box, and "Discover".
   */
  text: {
    titleX: number;
    titleBottom: number;
    bodyX: number;
    bodyY: number;
    bodyW: number;
    linkY: number;
  };
  /** The arrows' top edge and x positions. */
  arrows: { y: number; left: number; right: number };
  href: string;
}) {
  const [offset, setOffset] = useState(0);
  const n = items.length;
  const step = (delta: number) => setOffset((o) => (o + delta + n) % n);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Experiences"
      className="absolute left-0 w-full"
      style={{ top: u(y), height: u(h) }}
    >
      {slots.map((slot, i) => {
        const index = (offset + i) % n;
        const item = items[index];
        return (
          <article
            // Keyed by offset too, so each step remounts the tile and fades it in.
            key={`${item.title}-${offset}`}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${n}`}
            className="ajc-fade-in absolute overflow-hidden bg-[#9b9484]"
            style={{ left: u(slot.x), top: 0, width: u(slot.w), height: u(h) }}
          >
            <OptimizedImage
              src={item.image}
              alt={item.alt}
              width={slot.w}
              height={h}
              sizes={sizesFor(slot.w)}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Figma: a 667px dark plate over the bottom of each tile. */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 bg-linear-to-b from-black/0 to-black/60"
              style={{ height: u(667) }}
            />
            <h3
              className="font-cormorant absolute text-[length:calc(55*var(--u))] leading-[normal] tracking-[calc(-3.3*var(--u))] text-white"
              style={{
                left: u(text.titleX),
                bottom: u(h - text.titleBottom),
                width: u(slot.w - text.titleX - 40),
              }}
            >
              {item.title}
            </h3>
            <p
              className="font-helvetica-regular absolute text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] tracking-[calc(0.4*var(--u))] text-white"
              style={{ left: u(text.bodyX), top: u(text.bodyY), width: u(text.bodyW) }}
            >
              {item.body}
            </p>
            <Link
              href={href}
              aria-label={`Discover ${item.title}`}
              className="font-helvetica absolute text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] font-bold tracking-[calc(0.4*var(--u))] text-white transition-opacity hover:opacity-70"
              style={{ left: u(text.bodyX), top: u(text.linkY) }}
            >
              Discover
            </Link>
          </article>
        );
      })}

      <ArrowButton
        label="Previous experience"
        x={arrows.left}
        y={arrows.y - y}
        onClick={() => step(-1)}
      >
        &lt;
      </ArrowButton>
      <ArrowButton
        label="Next experience"
        x={arrows.right}
        y={arrows.y - y}
        onClick={() => step(1)}
      >
        &gt;
      </ArrowButton>
    </section>
  );
}
