"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Where on the screen the line's leading edge sits, as a fraction of the
 * viewport height: the fill reaches a point on the line once that point has
 * scrolled up to 60% of the way down the screen, so the line stays just ahead
 * of what you are reading.
 */
const FRONT = 0.6;

/**
 * The vertical rail down the "Our Work" section of the About page. The faint
 * line from the design is the track; a darker line grows down
 * over it as you scroll, ending at the bottom of the rail when you reach the
 * last region.
 *
 * Size and position come from `className` / `style`, so the same component
 * serves the desktop canvas and the mobile frame. The fill is moved with a
 * transform written straight to the element (no React re-render per scroll),
 * and is read from the track's real position, so it works at any width. With
 * `prefers-reduced-motion` it stays off and the rail looks exactly as designed.
 */
export function ScrollLine({ className, style }: { className?: string; style?: CSSProperties }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Dots on this rail are marked data-rail-dot in the same layout.
    const dots = track.parentElement?.querySelectorAll<HTMLElement>("[data-rail-dot]") ?? [];
    let raf = 0;
    const update = () => {
      raf = 0;
      const { top, height } = track.getBoundingClientRect();
      // The other layout (desktop vs mobile) is display:none and measures 0.
      if (height === 0) return;
      const progress = Math.min(1, Math.max(0, (window.innerHeight * FRONT - top) / height));
      fill.style.transform = `scaleY(${progress})`;
      // Dots darken once the fill has reached their centre.
      const front = top + progress * height;
      dots.forEach((dot) => {
        const r = dot.getBoundingClientRect();
        dot.toggleAttribute(
          "data-reached",
          progress > 0 && (progress === 1 || r.top + r.height / 2 <= front),
        );
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      aria-hidden
      className={cn("absolute -translate-x-1/2 bg-[#978c7f]/[0.52]", className)}
      style={style}
    >
      <div
        ref={fillRef}
        className="h-full w-full origin-top bg-[#7d7062] will-change-transform"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  );
}
