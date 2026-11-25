"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { ArrowButton } from "@/components/work/VirsaSlideCarousel";
import { cn, u } from "@/lib/utils";

/*
  Experience tiles (AJC-16): two photo tiles at a time, each with a title,
  copy and a "Discover" link over a dark fade at the bottom. The "<" / ">"
  arrows beside them step through the rest in a loop. Every "Discover" opens
  the Virsa Experiences page (Figma comment).

  Positioned in Figma px inside the page canvas (`--u` = 1 Figma px); `y` is
  the tiles' top edge.

  With `responsive`, below xl it follows the Virsa Baltistan mobile frame
  (node 3995:1393): one full-width tile, white arrows over its sides, the text
  stacked at its bottom. The tile's height comes from `className` (its
  aspect ratio).
*/

export type Experience = { title: string; body: string; image: string; alt: string };

/** `sizes` for an image drawn `width` Figma px wide in the 1920 canvas. */
const sizesFor = (width: number, responsive = false) =>
  responsive
    ? `(min-width: 1920px) ${Math.ceil(width)}px, (min-width: 1280px) ${+((width / 1920) * 100).toFixed(2)}vw, 100vw`
    : `(min-width: 1920px) ${Math.ceil(width)}px, ${+((width / 1920) * 100).toFixed(2)}vw`;

type Slot = { x: number; w: number };

export function VirsaExperienceCarousel({
  items,
  y,
  h,
  slots,
  text,
  arrows,
  href,
  responsive = false,
  className,
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
  responsive?: boolean;
  /** Below xl (with `responsive`): the tile's size, e.g. its aspect ratio. */
  className?: string;
}) {
  const [offset, setOffset] = useState(0);
  // Which way the last step went, and the offset we left (its edge tile slides out).
  const [direction, setDirection] = useState(1);
  const [leavingOffset, setLeavingOffset] = useState<number | null>(null);
  const n = items.length;
  const step = (delta: number) => {
    setDirection(delta);
    setLeavingOffset(offset);
    setOffset((o) => (o + delta + n) % n);
  };
  // Tiles travel one slot: from where the neighbouring slot sits.
  const pitch = slots[1].x - slots[0].x;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Experiences"
      className={
        responsive
          ? cn(
              "relative w-full overflow-hidden xl:absolute xl:top-(--y) xl:left-0 xl:h-(--h) xl:overflow-visible",
              className,
            )
          : "absolute left-0 w-full"
      }
      style={
        responsive ? ({ "--y": u(y), "--h": u(h) } as CSSProperties) : { top: u(y), height: u(h) }
      }
    >
      {leavingOffset !== null && leavingOffset !== offset
        ? // The tile that leaves: the left one going next, the right one going back.
          (() => {
            const slotIndex = direction > 0 ? 0 : 1;
            const slot = slots[slotIndex];
            const item = items[(leavingOffset + slotIndex) % n];
            return (
              <article
                key={`leaving-${item.title}-${leavingOffset}`}
                aria-hidden
                inert
                onAnimationEnd={() => setLeavingOffset(null)}
                className={cn(
                  "ajc-slide-out absolute overflow-hidden bg-[#9b9484]",
                  // One tile on mobile: the incoming tile slides over it, so skip this one.
                  responsive && "hidden xl:block",
                )}
                style={
                  {
                    left: u(slot.x),
                    top: 0,
                    width: u(slot.w),
                    height: u(h),
                    "--slide-to": u(direction * -pitch),
                  } as CSSProperties
                }
              >
                <OptimizedImage
                  src={item.image}
                  alt=""
                  width={slot.w}
                  height={h}
                  sizes={sizesFor(slot.w, responsive)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </article>
            );
          })()
        : null}
      {slots.map((slot, i) => {
        const index = (offset + i) % n;
        const item = items[index];
        return (
          <article
            // Keyed by offset too, so each step remounts the tile and slides it in.
            key={`${item.title}-${offset}`}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${n}`}
            className={cn(
              "absolute overflow-hidden bg-[#9b9484]",
              leavingOffset !== null && "ajc-slide-in",
              responsive &&
                "inset-0 [--slide-from:var(--from-m)] xl:inset-auto xl:top-0 xl:left-(--sx) xl:h-full xl:w-(--sw) xl:[--slide-from:var(--from-xl)]",
              responsive && i === 1 && "hidden xl:block",
            )}
            style={
              responsive
                ? ({
                    "--sx": u(slot.x),
                    "--sw": u(slot.w),
                    "--from-m": `${direction * 100}%`,
                    "--from-xl": u(direction * pitch),
                  } as CSSProperties)
                : ({
                    left: u(slot.x),
                    top: 0,
                    width: u(slot.w),
                    height: u(h),
                    "--slide-from": u(direction * pitch),
                  } as CSSProperties)
            }
          >
            <OptimizedImage
              src={item.image}
              alt={item.alt}
              width={slot.w}
              height={h}
              sizes={sizesFor(slot.w, responsive)}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Figma: a 667px dark plate over the bottom of each tile (329 of 523 on mobile). */}
            <div
              aria-hidden
              className={cn(
                "absolute inset-x-0 bottom-0 bg-linear-to-b from-black/0 to-black/60",
                responsive && "h-[63%] xl:h-[calc(667*var(--u))]",
              )}
              style={responsive ? undefined : { height: u(667) }}
            />
            {responsive ? (
              <div
                className="absolute inset-x-0 bottom-0 flex flex-col px-[41px] pb-[37px] xl:contents"
                style={
                  {
                    "--tx": u(text.titleX),
                    "--tb": u(h - text.titleBottom),
                    "--tw": u(slot.w - text.titleX - 40),
                    "--bx": u(text.bodyX),
                    "--by": u(text.bodyY),
                    "--bw": u(text.bodyW),
                    "--ly": u(text.linkY),
                  } as CSSProperties
                }
              >
                <h3 className="font-cormorant max-w-[240px] text-[35px] leading-[42px] tracking-[0.02em] text-[#fdfbf4] [font-variant-caps:small-caps] xl:absolute xl:bottom-(--tb) xl:left-(--tx) xl:w-(--tw) xl:max-w-none xl:text-[length:calc(55*var(--u))] xl:leading-[normal] xl:tracking-[calc(-3.3*var(--u))] xl:text-white xl:[font-variant-caps:normal]">
                  {item.title}
                </h3>
                <p className="font-helvetica-regular mt-[10px] max-w-[255px] text-[10px] leading-[1.2] tracking-[0.02em] text-[#fdfbf4] xl:absolute xl:top-(--by) xl:left-(--bx) xl:mt-0 xl:w-(--bw) xl:max-w-none xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))] xl:text-white">
                  {item.body}
                </p>
                <Link
                  href={href}
                  aria-label={`Discover ${item.title}`}
                  className="font-helvetica mt-[29px] self-start text-[10px] font-bold tracking-[0.02em] text-[#fdfbf4] underline transition-opacity hover:opacity-70 xl:absolute xl:top-(--ly) xl:left-(--bx) xl:mt-0 xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))] xl:text-white xl:no-underline"
                >
                  Discover
                </Link>
              </div>
            ) : (
              <>
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
              </>
            )}
          </article>
        );
      })}

      <ArrowButton
        label="Previous experience"
        x={arrows.left}
        y={arrows.y - y}
        onClick={() => step(-1)}
        responsive={responsive && "left"}
        light
      >
        &lt;
      </ArrowButton>
      <ArrowButton
        label="Next experience"
        x={arrows.right}
        y={arrows.y - y}
        onClick={() => step(1)}
        responsive={responsive && "right"}
        light
      >
        &gt;
      </ArrowButton>
    </section>
  );
}
