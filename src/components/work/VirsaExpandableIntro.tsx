"use client";

import { useId, useState, type ReactNode } from "react";
import { u } from "@/lib/utils";

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
}) {
  const [expanded, setExpanded] = useState(false);
  const copyId = useId();

  return (
    <div
      style={{ marginLeft: u(x), paddingTop: u(y), paddingBottom: u(gapBelow), width: u(width) }}
    >
      <div
        id={copyId}
        // Paragraphs follow on the next line with no extra space, as in Figma.
        className="font-helvetica-regular relative text-[length:calc(20*var(--u))] leading-[1.25] tracking-[calc(0.4*var(--u))] text-[#9b9484]"
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
        className="font-helvetica block cursor-pointer text-left text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] font-bold tracking-[calc(0.4*var(--u))] text-[#9b9484] transition-opacity hover:opacity-70"
        style={{ marginLeft: u(toggle.x) }}
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
