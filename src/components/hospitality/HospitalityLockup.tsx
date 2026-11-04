import type { CSSProperties } from "react";
import { AjcLogo } from "@/components/brand";
import { cn } from "@/lib/utils";

/**
 * "AJC HOSPITALITY" hero lockup, rendered as the page's <h1>.
 *
 * A 327 x 34 box (the design's ink spans x 798 to 1125, y 683 to 717 at
 * 1920px); size it with a width and its contents scale with it. "AJC" is the
 * real logo. "HOSPITALITY" is a STAND-IN: in the design it is a custom monoline
 * vector in the Apeksha Jain wordmark's letterforms (the S is drawn as a slash),
 * and that vector is not in the repo yet. It is set as live text, with
 * `textLength` pinning it to the design's span whichever fallback font renders.
 *
 * To use the real mark: export Figma node 3468:244 ("Group 190") as SVG, add it
 * beside AjcLogo as a BrandSvg component, and render it in place of the <svg>
 * below. Keep the `sr-only` text so the heading still reads "AJC Hospitality".
 */
export function HospitalityLockup({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <h1 className={cn("relative m-0 aspect-[327/34] text-[#f8f7f2]", className)} style={style}>
      <span className="sr-only">AJC Hospitality</span>
      <AjcLogo aria-hidden className="absolute top-[5.9%] left-0 h-[86.2%]" />
      <svg
        aria-hidden
        focusable="false"
        viewBox="0 0 240 34"
        className="absolute top-0 left-[26.6%] h-full w-[73.4%] overflow-visible"
      >
        <text
          x="0"
          y="29"
          textLength="239"
          lengthAdjust="spacing"
          fill="currentColor"
          fontSize="41"
          fontWeight="400"
          fontFamily="'Josefin Sans', 'Avenir Next', 'Century Gothic', Futura, 'Trebuchet MS', sans-serif"
        >
          HO/PITALITY
        </text>
      </svg>
    </h1>
  );
}
