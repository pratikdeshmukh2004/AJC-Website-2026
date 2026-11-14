"use client";

import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Reflow helper for a <ReadMoreCopy> that sits above other canvas content.
 * Attach `ref` to the block; when `expanded`, `shift` is how many Figma px
 * (canvas units) the content below must move down so the longer copy never
 * overlaps whatever starts at `nextTop` (Figma y), keeping `gap` clear.
 */
export function useExpandReflow(expanded: boolean, nextTop: number, gap = 64) {
  const ref = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const canvas = el.offsetParent as HTMLElement | null;
      if (!canvas) return;
      const unit = canvas.clientWidth / 1920;
      const bottom = (el.offsetTop + el.offsetHeight) / unit;
      const overflow = bottom + gap - nextTop;
      setShift(expanded && overflow > 0 ? overflow : 0);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const parent = el.offsetParent as HTMLElement | null;
    if (parent) ro.observe(parent);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [expanded, nextTop, gap]);

  return [ref, shift] as const;
}

/*
  Expandable body copy with the "Read more" translucent pill used on the
  project pages (Figma: cream pill rgba(253,251,244,0.66), 747 x 80, Helvetica
  Bold 20px). Collapsed: `lead` + optional `collapsedTail`. Expanded: `lead` +
  `expandedTail`; the pill flips to "Read less".

  Sizes use the page canvas unit `--u` (1 Figma px = 100cqw / 1920), so this
  must render inside a canvas that defines it. Position it with `className`
  (e.g. `left-[calc(971*var(--u))] top-[calc(1438*var(--u))] w-[calc(652*var(--u))]`).

  State is owned by the parent (`expanded` / `onToggle`) so it can reflow
  content below. The block is forwardRef'd so the parent can measure it.
*/

type Props = {
  /** Absolute position + width of the block, in canvas units. */
  className?: string;
  /** Body-copy colour class (the "Read more" pill stays sage). */
  textClassName?: string;
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
  { className, textClassName = "text-sage", lead, collapsedTail, expandedTail, expanded, onToggle },
  ref,
) {
  const paragraphs = expanded
    ? [...lead, ...expandedTail]
    : collapsedTail
      ? [...lead, collapsedTail]
      : lead;

  return (
    <div
      ref={ref}
      className={cn(
        "font-helvetica-regular absolute text-[length:calc(20*var(--u))] leading-[1.25] tracking-[calc(0.4*var(--u))]",
        textClassName,
        className,
      )}
    >
      {paragraphs.map((text, i) => (
        <p key={i} className={cn(i > 0 && "mt-[1em]")}>
          {text}
        </p>
      ))}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="font-helvetica text-sage bg-cream/66 relative mt-[calc(16*var(--u))] ml-[calc(-35*var(--u))] block w-[calc(747*var(--u))] cursor-pointer py-[calc(28*var(--u))] pl-[calc(35*var(--u))] text-left text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))]"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
});
