"use client";

import { useState, type CSSProperties } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { VirsaFilmPlayer } from "@/components/work/VirsaFilmPlayer";
import { cn, place, u } from "@/lib/utils";

/*
  One image at a time in a Figma box, with the design's "<" / ">" arrows
  beside it stepping through the set in a loop (AJC-16: website screenshots,
  Instagram screens). Positioned in Figma px inside the page canvas, where
  `--u` = 1 Figma px (see the Virsa page files).

  Pages with a 390px mobile Figma frame (Haveli Dharampura, AJC-17) also pass
  `mobile`: the box and arrows in that frame, used below xl. Virsa Baltistan
  (AJC-16) passes `responsive` instead: below xl it sits in normal flow.
*/

type Box = { x: number; y: number; w: number; h: number };
type Arrows = { y: number; left: number; right: number };

/** `sizes` for an image drawn `width` Figma px wide in the 1920 canvas. */
const sizesFor = (width: number) =>
  `(min-width: 1920px) ${Math.ceil(width)}px, ${+((width / 1920) * 100).toFixed(2)}vw`;

/** Same, for a slider that also has a mobile box (`mobileWidth` px of the 390 frame). */
const sizesForBoth = (width: number, mobileWidth: number) =>
  `(min-width: 1920px) ${Math.ceil(width)}px, (min-width: 80rem) ${+((width / 1920) * 100).toFixed(2)}vw, ${+((mobileWidth / 390) * 100).toFixed(2)}vw`;

/** Figma play triangle size on the project pages (65 x 65). */
const PLAY_SIZE = 65;

/** `video` turns the slide into a film: `src` is then its poster frame. */
export type Slide = { src: string; alt: string; video?: string };

export function VirsaSlideCarousel({
  label,
  slides,
  box,
  arrows,
  fit = "cover",
  mobile,
  responsive = false,
  start = 0,
}: {
  label: string;
  slides: Slide[];
  /** The image box. */
  box: Box;
  /** The arrows' top edge and x positions. */
  arrows: Arrows;
  /** `contain` keeps whole screenshots in view, top-aligned in the box. */
  fit?: "cover" | "contain";
  /**
   * The box, arrows (top-left of each arrow's tap area) and play-triangle
   * size in the 390px mobile frame. `arrowsOnImage` draws the arrows white,
   * for frames that place them over the photo.
   */
  mobile?: { box: Box; arrows: Arrows; play: number; arrowsOnImage?: boolean };
  /**
   * Below xl: in normal flow, full width at the box's aspect ratio, with the
   * arrows over its sides (Virsa Baltistan mobile frame, node 3995:1393).
   * From xl up: the Figma canvas geometry. Off by default.
   */
  responsive?: boolean;
  /** Index of the slide shown first. */
  start?: number;
}) {
  const [index, setIndex] = useState(start);
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
  const sizes = mobile
    ? sizesForBoth(box.w, mobile.box.w)
    : responsive
      ? sizesForBoth(box.w, 390)
      : sizesFor(box.w);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={cn(
        responsive
          ? "relative aspect-(--ar) w-full md:aspect-auto md:h-(--h) xl:absolute xl:top-(--y) xl:left-0"
          : "absolute left-0 w-full",
        mobile && "top-(--my) h-(--mh) xl:top-(--y) xl:h-(--h)",
      )}
      style={
        responsive
          ? ({
              "--y": u(box.y),
              "--h": u(box.h),
              "--ar": `${box.w} / ${box.h}`,
              "--bx": u(box.x),
              "--bw": u(box.w),
            } as CSSProperties)
          : mobile
            ? place({ x: 0, y: box.y, h: box.h }, { x: 0, y: mobile.box.y, h: mobile.box.h })
            : { top: u(box.y), height: u(box.h) }
      }
    >
      <div
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${n}`}
        className={cn(
          "absolute overflow-hidden",
          responsive && "inset-0 md:right-auto md:left-(--bx) md:w-(--bw)",
          mobile && "top-0 left-(--mx) h-(--mh) w-(--mw) xl:left-(--x) xl:h-(--h) xl:w-(--w)",
        )}
        style={
          responsive
            ? undefined
            : mobile
              ? place(
                  { x: box.x, y: 0, w: box.w, h: box.h },
                  { x: mobile.box.x, y: 0, w: mobile.box.w, h: mobile.box.h },
                )
              : { left: u(box.x), top: 0, width: u(box.w), height: u(box.h) }
        }
      >
        {leaving !== null && leaving !== index ? (
          <OptimizedImage
            key={`leaving-${slides[leaving].src}`}
            src={slides[leaving].src}
            alt=""
            aria-hidden
            width={Math.round(box.w)}
            height={Math.round(box.h)}
            sizes={sizes}
            onAnimationEnd={() => setLeaving(null)}
            className={`ajc-slide-out absolute inset-0 h-full w-full ${fitClass} ${
              direction > 0 ? "[--slide-to:-100%]" : "[--slide-to:100%]"
            }`}
          />
        ) : null}
        {slide.video ? (
          // A film slide: the image is its poster, and the shared film player
          // plays it in place. Keyed by src so stepping away stops the film.
          <div
            key={slide.src}
            className={`absolute inset-0 ${
              leaving === null
                ? ""
                : `ajc-slide-in ${direction > 0 ? "[--slide-from:100%]" : "[--slide-from:-100%]"}`
            }`}
          >
            <VirsaFilmPlayer
              fill
              src={slide.video}
              poster={slide.src}
              title={slide.alt}
              box={{ x: 0, y: 0, w: box.w, h: box.h }}
              triangle={{ x: 0, y: 0, size: PLAY_SIZE }}
              mobile={mobile && { box: { ...mobile.box, x: 0, y: 0 }, triangle: mobile.play }}
            />
          </div>
        ) : (
          <OptimizedImage
            // Keyed by src so each step remounts the image and slides it in.
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={Math.round(box.w)}
            height={Math.round(box.h)}
            sizes={sizes}
            className={`absolute inset-0 h-full w-full ${fitClass} ${
              leaving === null
                ? ""
                : `ajc-slide-in ${direction > 0 ? "[--slide-from:100%]" : "[--slide-from:-100%]"}`
            }`}
          />
        )}
      </div>

      <ArrowButton
        label={`Previous: ${label}`}
        x={arrows.left}
        y={arrows.y - box.y}
        mobile={
          mobile && {
            x: mobile.arrows.left,
            y: mobile.arrows.y - mobile.box.y,
            onImage: mobile.arrowsOnImage,
          }
        }
        responsive={responsive && "left"}
        onClick={() => step(-1)}
      >
        &lt;
      </ArrowButton>
      <ArrowButton
        label={`Next: ${label}`}
        x={arrows.right}
        y={arrows.y - box.y}
        mobile={
          mobile && {
            x: mobile.arrows.right,
            y: mobile.arrows.y - mobile.box.y,
            onImage: mobile.arrowsOnImage,
          }
        }
        responsive={responsive && "right"}
        onClick={() => step(1)}
      >
        &gt;
      </ArrowButton>
    </section>
  );
}

/**
 * A Figma "<" / ">" glyph as a button (73x63 box). With `mobile`, below xl it
 * sits at that spot in the 390 frame as a 12px glyph in a 28px tap area.
 */
export function ArrowButton({
  label,
  x,
  y,
  mobile,
  responsive = false,
  light = false,
  onClick,
  children,
}: {
  label: string;
  x: number;
  y: number;
  mobile?: { x: number; y: number; onImage?: boolean };
  /**
   * Below md: over that side of its carousel, vertically centred (Virsa
   * Baltistan). `light` makes it white there, for arrows over a photo.
   */
  responsive?: false | "left" | "right";
  light?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "group font-helvetica hover:text-taupe absolute cursor-pointer text-center font-bold text-[#9b9484] transition-colors",
        responsive
          ? cn(
              "top-1/2 h-[63px] w-[73px] -translate-y-1/2 text-[20px] leading-[63px] md:top-(--ay) md:right-auto md:left-(--ax) md:h-[calc(63*var(--u))] md:w-[calc(73*var(--u))] md:translate-y-0 md:text-[length:calc(46*var(--u))] md:leading-[calc(63*var(--u))]",
              responsive === "left" ? "left-0" : "right-0",
            )
          : mobile
            ? "top-(--my) left-(--mx) size-[calc(28*var(--u))] text-[length:calc(12*var(--u))] leading-[calc(28*var(--u))] xl:top-(--y) xl:left-(--x) xl:h-[calc(63*var(--u))] xl:w-[calc(73*var(--u))] xl:text-[length:calc(46*var(--u))] xl:leading-[calc(63*var(--u))]"
            : "text-[length:calc(46*var(--u))] leading-[calc(63*var(--u))]",
        (mobile?.onImage || (responsive && light)) && "max-md:text-white max-md:hover:text-white",
      )}
      style={
        responsive
          ? ({ "--ax": u(x), "--ay": u(y) } as CSSProperties)
          : mobile
            ? place({ x, y }, { x: mobile.x, y: mobile.y })
            : { left: u(x), top: u(y), width: u(73), height: u(63) }
      }
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
