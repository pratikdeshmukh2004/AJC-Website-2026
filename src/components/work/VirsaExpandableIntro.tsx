"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { ReadMoreLabel } from "@/components/ui/ReadMoreLabel";
import { cn, u } from "@/lib/utils";

/*
  Intro copy with "Read more" (AJC-16).

  Collapsed, it matches the Figma frame: the copy the frame shows, a
  translucent cream plate fading its last lines, and "Read more" beneath.
  Expanded, it shows the full copy from the Figma comments and "Read less".

  It sits in normal flow (placed with margin/padding in Figma px) inside the
  page's top section, so expanding it grows that section and pushes the rest
  of the page down instead of overlapping it. `gapBelow` is the space from the
  toggle to the next section in the design.
*/

type Box = { x: number; y: number; width: number; height: number };

export function VirsaExpandableIntro({
  x,
  y,
  width,
  preview,
  full,
  fade,
  toggle,
  gapBelow,
  responsive = false,
  compact = false,
}: {
  /** Figma position and width of the intro copy within its section. */
  x: number;
  y: number;
  width: number;
  /** The copy as the Figma frame shows it (collapsed). */
  preview: ReactNode;
  /** The full copy (expanded), as paragraphs. */
  full: ReactNode;
  /** The fade plate, relative to the copy's top-left. */
  fade: Box;
  /** "Read more" position, relative to the copy's top-left. */
  toggle: { x: number; y: number };
  gapBelow: number;
  /**
   * Flow layout below xl (full-width text at a readable size, a 3.5em fade),
   * and the Figma canvas geometry from xl up. Off by default: the pages that
   * are still canvas-only scale the whole frame instead.
   */
  responsive?: boolean;
  /**
   * With `responsive`: the small mobile type of a page that has its own
   * mobile frame (Virsa Baltistan, node 3995:1393: Helvetica 11). The page
   * sets the side padding around it.
   */
  compact?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const copyId = useId();

  if (responsive) {
    // Canvas geometry as CSS variables, read by the xl: classes below.
    const vars = {
      "--ix": u(x),
      "--iy": u(y),
      "--iw": u(width),
      "--ib": u(gapBelow),
      "--ty": u(toggle.y),
      "--tx": u(toggle.x),
      "--fx": u(fade.x),
      "--fy": u(fade.y),
      "--fw": u(fade.width),
      "--fh": u(fade.height),
    } as CSSProperties;

    return (
      <div
        className={cn(
          !compact && "px-6",
          "xl:ml-(--ix) xl:w-(--iw) xl:px-0 xl:pt-(--iy) xl:pb-(--ib)",
        )}
        style={vars}
      >
        <div
          id={copyId}
          className={cn(
            compact ? "text-[11px] leading-[1.18]" : "text-base leading-[1.45]",
            "font-helvetica-regular relative tracking-[0.02em] text-[#9b9484] xl:text-[length:calc(20*var(--u))] xl:leading-[1.25] xl:tracking-[calc(0.4*var(--u))]",
            expanded
              ? "xl:pb-[calc(32*var(--u))]"
              : "max-h-[17em] overflow-hidden xl:h-(--ty) xl:max-h-none",
          )}
        >
          {expanded ? full : preview}
          {expanded ? null : (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[3.5em] bg-[rgba(253,251,244,0.66)] xl:inset-x-auto xl:top-(--fy) xl:bottom-auto xl:left-(--fx) xl:h-(--fh) xl:w-(--fw)"
            />
          )}
        </div>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={copyId}
          onClick={() => setExpanded((open) => !open)}
          className={cn(
            compact ? "mt-[10px] text-[11px]" : "mt-3 text-base",
            "group/readmore font-helvetica block cursor-pointer text-left font-bold text-[#9b9484] transition-opacity hover:opacity-70 xl:mt-0 xl:ml-(--tx) xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))]",
          )}
        >
          <ReadMoreLabel expanded={expanded} />
        </button>
      </div>
    );
  }

  return (
    <div
      style={{ marginLeft: u(x), paddingTop: u(y), paddingBottom: u(gapBelow), width: u(width) }}
    >
      <div
        id={copyId}
        // Paragraphs follow on the next line with no extra space, as in Figma.
        className={cn(
          "font-helvetica-regular relative text-[length:calc(20*var(--u))] leading-[1.25] tracking-[calc(0.4*var(--u))] text-[#9b9484]",
        )}
        // Collapsed: the copy box ends where the design puts "Read more".
        style={expanded ? { paddingBottom: u(32) } : { height: u(toggle.y) }}
      >
        {expanded ? full : preview}
        {expanded ? null : (
          <div
            aria-hidden
            className="pointer-events-none absolute bg-[rgba(253,251,244,0.66)]"
            style={{
              left: u(fade.x),
              top: u(fade.y),
              width: u(fade.width),
              height: u(fade.height),
            }}
          />
        )}
      </div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={copyId}
        onClick={() => setExpanded((open) => !open)}
        className="group/readmore font-helvetica block cursor-pointer text-left text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] font-bold tracking-[calc(0.4*var(--u))] text-[#9b9484] transition-opacity hover:opacity-70"
        style={{ marginLeft: u(toggle.x) }}
      >
        <ReadMoreLabel expanded={expanded} />
      </button>
    </div>
  );
}
