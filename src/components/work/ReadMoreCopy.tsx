"use client";

import { forwardRef, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Expandable } from "@/components/ui/Expandable";
import { ReadMoreLabel } from "@/components/ui/ReadMoreLabel";
import { cn } from "@/lib/utils";

/** Figma frame widths: the desktop canvas, and the mobile frame shown below xl. */
const DESKTOP_FRAME = 1920;
const MOBILE_FRAME = 390;
/** Tailwind's `xl` breakpoint (80rem), where the desktop canvas takes over. */
const XL_QUERY = "(min-width: 80rem)";
/** How long `Expandable` takes to slide (its duration-700), plus a little. */
const SLIDE_MS = 800;

/**
 * True while `expanded`, and for the time the copy takes to slide shut after it
 * turns false. A page that moves content below a Read more block by its overflow
 * gates that shift on this, so the content below follows the text up instead of
 * jumping ahead of it.
 */
export function useFollowsSlide(expanded: boolean) {
  const [previous, setPrevious] = useState(expanded);
  const [sliding, setSliding] = useState(false);

  // Closing starts the slide-shut window (adjusted during render, not in an effect).
  if (previous !== expanded) {
    setPrevious(expanded);
    setSliding(!expanded);
  }

  useEffect(() => {
    if (!sliding) return undefined;
    const timer = setTimeout(() => setSliding(false), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [sliding]);

  return expanded || sliding;
}

/**
 * Reflow helper for a <ReadMoreCopy> that sits above other canvas content.
 * Attach `ref` to the block; when `expanded`, `shift` is how many Figma px
 * (canvas units) the content below must move down so the longer copy never
 * overlaps whatever starts at `nextTop` (Figma y), keeping `gap` clear.
 */
export function useExpandReflow(
  expanded: boolean,
  nextTop: number,
  gap = 64,
  /**
   * For pages that also have a 390px mobile frame (shown below xl): the Figma
   * y, in that frame, of what starts below the block. The shift is then
   * measured in mobile-frame px on small screens.
   */
  mobileNextTop?: number,
) {
  const ref = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  const open = useFollowsSlide(expanded);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const canvas = el.offsetParent as HTMLElement | null;
      if (!canvas) return;
      const mobile = mobileNextTop !== undefined && !window.matchMedia(XL_QUERY).matches;
      const frame = mobile ? MOBILE_FRAME : DESKTOP_FRAME;
      const unit = canvas.clientWidth / frame;
      const bottom = (el.offsetTop + el.offsetHeight) / unit;
      const overflow = bottom + (gap * frame) / DESKTOP_FRAME - (mobile ? mobileNextTop : nextTop);
      setShift(open && overflow > 0 ? overflow : 0);
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
  }, [open, nextTop, gap, mobileNextTop]);

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
  The pill's spacing is in `em` of the body size (20px Figma: 16 / 35 / 28 px
  = 0.8 / 1.75 / 1.4em, 747px = 37.35em), so a page with a mobile frame can
  pass a responsive `sizeClassName` and the pill scales with it.

  State is owned by the parent (`expanded` / `onToggle`) so it can reflow
  content below. The block is forwardRef'd so the parent can measure it.
*/

type Props = {
  /** Absolute position + width of the block, in canvas units. */
  className?: string;
  /** Body-copy colour class (the "Read more" pill stays sage). */
  textClassName?: string;
  /** Body font-size class; the pill and its spacing scale with it. Default: 20px Figma. */
  sizeClassName?: string;
  /** Paragraphs always shown. */
  lead: string[];
  /** Truncated last paragraph shown only while collapsed. */
  collapsedTail?: string;
  /** Paragraphs shown only while expanded. */
  expandedTail: string[];
  expanded: boolean;
  onToggle: () => void;
  /**
   * Mobile-frame copy style below xl (Haveli Dharampura, Figma 4036:2016):
   * normal line height, no gap between paragraphs, and
   * a tighter pill.
   */
  compactBelowXl?: boolean;
};

export const ReadMoreCopy = forwardRef<HTMLDivElement, Props>(function ReadMoreCopy(
  {
    className,
    textClassName = "text-sage",
    sizeClassName = "text-[length:calc(20*var(--u))]",
    lead,
    collapsedTail,
    expandedTail,
    expanded,
    onToggle,
    compactBelowXl = false,
  },
  ref,
) {
  const paragraphClass = (i: number) => cn(i > 0 && "mt-[1em]", compactBelowXl && "max-xl:mt-0");
  const preview = collapsedTail ? [...lead, collapsedTail] : lead;
  const bodyId = useId();

  return (
    <div
      ref={ref}
      className={cn(
        "font-helvetica-regular absolute leading-[1.25] tracking-[0.02em]",
        compactBelowXl && "max-xl:leading-[normal]",
        sizeClassName,
        textClassName,
        className,
      )}
    >
      {/* The copy slides open; collapsed, its last lines fade out. */}
      <Expandable
        id={bodyId}
        expanded={expanded}
        collapsed={preview.map((text, i) => (
          <p key={i} className={paragraphClass(i)}>
            {text}
          </p>
        ))}
      >
        {[...lead, ...expandedTail].map((text, i) => (
          <p key={i} className={paragraphClass(i)}>
            {text}
          </p>
        ))}
      </Expandable>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={bodyId}
        className={cn(
          "group/readmore font-helvetica text-sage bg-cream/66 relative mt-[0.8em] ml-[-1.75em] block w-[37.35em] cursor-pointer py-[1.4em] pl-[1.75em] text-left leading-[normal] font-bold tracking-[0.02em] max-xl:max-w-[calc(100%+1.75em)]",
          compactBelowXl && "max-xl:mt-[0.6em] max-xl:py-[0.3em]",
        )}
      >
        <ReadMoreLabel expanded={expanded} />
      </button>
    </div>
  );
});
