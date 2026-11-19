"use client";

import { useState } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { u } from "@/lib/utils";

/*
  One image at a time in a Figma box, with the design's "<" / ">" arrows
  beside it stepping through the set in a loop (AJC-16: website screenshots,
  Instagram screens). Positioned in Figma px inside the page canvas, where
  `--u` = 1 Figma px (see the Virsa page files).
*/

/** `sizes` for an image drawn `width` Figma px wide in the 1920 canvas. */
const sizesFor = (width: number) =>
  `(min-width: 1920px) ${Math.ceil(width)}px, ${+((width / 1920) * 100).toFixed(2)}vw`;

export type Slide = { src: string; alt: string };

export function VirsaSlideCarousel({
  label,
  slides,
  box,
  arrows,
  fit = "cover",
}: {
  label: string;
  slides: Slide[];
  /** The image box. */
  box: { x: number; y: number; w: number; h: number };
  /** The arrows' top edge and x positions. */
  arrows: { y: number; left: number; right: number };
  /** `contain` keeps whole screenshots in view, top-aligned in the box. */
  fit?: "cover" | "contain";
}) {
  const [index, setIndex] = useState(0);
  // Which way the last step went, and the slide that is still sliding out.
  const [direction, setDirection] = useState(1);
  const [leaving, setLeaving] = useState<number | null>(null);
  const n = slides.length;
  const step = (delta: number) => {
    setDirection(delta);
    setLeaving(index);
    setIndex((i) => (i + delta + n) % n);
  };
  const slide = slides[index];
  const fitClass = fit === "contain" ? "object-contain object-top" : "object-cover";

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className="absolute left-0 w-full"
      style={{ top: u(box.y), height: u(box.h) }}
    >
      <div
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${n}`}
        className="absolute overflow-hidden"
        style={{ left: u(box.x), top: 0, width: u(box.w), height: u(box.h) }}
      >
        {leaving !== null && leaving !== index ? (
          <OptimizedImage
            key={`leaving-${slides[leaving].src}`}
            src={slides[leaving].src}
            alt=""
            aria-hidden
            width={Math.round(box.w)}
            height={Math.round(box.h)}
            sizes={sizesFor(box.w)}
            onAnimationEnd={() => setLeaving(null)}
            className={`ajc-slide-out absolute inset-0 h-full w-full ${fitClass} ${
              direction > 0 ? "[--slide-to:-100%]" : "[--slide-to:100%]"
            }`}
          />
        ) : null}
        <OptimizedImage
          // Keyed by src so each step remounts the image and slides it in.
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          width={Math.round(box.w)}
          height={Math.round(box.h)}
          sizes={sizesFor(box.w)}
          className={`absolute inset-0 h-full w-full ${fitClass} ${
            leaving === null
              ? ""
              : `ajc-slide-in ${direction > 0 ? "[--slide-from:100%]" : "[--slide-from:-100%]"}`
          }`}
        />
      </div>

      <ArrowButton
        label={`Previous: ${label}`}
        x={arrows.left}
        y={arrows.y - box.y}
        onClick={() => step(-1)}
      >
        &lt;
      </ArrowButton>
      <ArrowButton
        label={`Next: ${label}`}
        x={arrows.right}
        y={arrows.y - box.y}
        onClick={() => step(1)}
      >
        &gt;
      </ArrowButton>
    </section>
  );
}

/** A Figma "<" / ">" glyph as a button (73x63 box). */
export function ArrowButton({
  label,
  x,
  y,
  onClick,
  children,
}: {
  label: string;
  x: number;
  y: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="group font-helvetica hover:text-taupe absolute cursor-pointer text-center text-[length:calc(46*var(--u))] leading-[calc(63*var(--u))] font-bold text-[#9b9484] transition-colors"
      style={{ left: u(x), top: u(y), width: u(73), height: u(63) }}
    >
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 group-hover:scale-125 group-active:scale-90"
      >
        {children}
      </span>
    </button>
  );
}
