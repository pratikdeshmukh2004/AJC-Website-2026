"use client";

import { forwardRef } from "react";

/*
  Expandable body copy with the "Read more" translucent pill used on the
  project pages (Figma: cream pill rgba(253,251,244,0.66), 747 x 80, Helvetica
  Bold 20px). Collapsed: `lead` + optional `collapsedTail`. Expanded: `lead` +
  `expandedTail`; the pill flips to "Read less".

  State is owned by the parent (`expanded` / `onToggle`) so it can reflow
  content below. The block is forwardRef'd so the parent can measure it.
*/

const v = (px: number) => `calc(${px} * var(--u))`;

const body =
  "font-helvetica-regular text-[#9b9484] text-[length:calc(20*var(--u))] leading-[1.25] tracking-[calc(0.4*var(--u))]";
const bodyBold =
  "font-helvetica font-bold text-[#9b9484] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]";

type Props = {
  left: number;
  top: number;
  width: number;
  /** Paragraphs always shown. */
  lead: string[];
  /** Truncated last paragraph shown only while collapsed. */
  collapsedTail?: string;
  /** Paragraphs shown only while expanded. */
  expandedTail: string[];
  expanded: boolean;
  onToggle: () => void;
};

export const ReadMoreCopy = forwardRef<HTMLDivElement, Props>(function ReadMoreCopy(
  { left, top, width, lead, collapsedTail, expandedTail, expanded, onToggle },
  ref,
) {
  const paragraphs = expanded
    ? [...lead, ...expandedTail]
    : collapsedTail
      ? [...lead, collapsedTail]
      : lead;

  return (
    <div ref={ref} className={`absolute ${body}`} style={{ left: v(left), top: v(top), width: v(width) }}>
      {paragraphs.map((text, i) => (
        <p key={i} className={i > 0 ? "mt-[1em]" : undefined}>
          {text}
        </p>
      ))}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className={`${bodyBold} relative mt-[calc(16*var(--u))] block cursor-pointer bg-[rgba(253,251,244,0.66)] text-left`}
        style={{
          width: v(747),
          marginLeft: v(-35),
          paddingTop: v(28),
          paddingBottom: v(28),
          paddingLeft: v(35),
        }}
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
});
