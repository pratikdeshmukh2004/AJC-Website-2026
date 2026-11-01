"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
// Static imports: Next fingerprints the files and applies the basePath itself.
import gurmukhi from "../../../public/images/brand/scripts/gurmukhi.svg";
import bengali from "../../../public/images/brand/scripts/bengali.svg";
import devanagari from "../../../public/images/brand/scripts/devanagari.svg";
import tibetan from "../../../public/images/brand/scripts/tibetan.svg";
import urdu from "../../../public/images/brand/scripts/urdu.svg";
import primaryMark from "../../../public/images/brand/scripts/primary-mark.svg";

/**
 * "Apeksha Jain" as the primary mark plus the five script signatures (Figma:
 * Branding System, node 2936:1959). All share one 228x76 canvas with the mark
 * centred, in cream #F8F7F2 for use over photos.
 */
export const BRAND_SCRIPTS: StaticImageData[] = [
  gurmukhi,
  bengali,
  devanagari,
  tibetan,
  urdu,
  primaryMark,
];

/**
 * Swaps the primary mark and script signatures every `intervalMs` (Figma: "The scripts will
 * change as a GIF with a gap of 0.5 seconds"). Size it with a width class.
 *
 * Purely decorative: the name is already in the page header, so the whole
 * block is hidden from assistive tech. With a single script, or when the
 * visitor prefers reduced motion, the first script stays still.
 */
export function ScriptCycle({
  scripts = BRAND_SCRIPTS,
  intervalMs = 500,
  className,
}: {
  scripts?: StaticImageData[];
  intervalMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (scripts.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % scripts.length), intervalMs);
    return () => clearInterval(t);
  }, [scripts.length, intervalMs]);

  return (
    <div className={cn("relative", className)} aria-hidden>
      {scripts.map((src, i) => (
        // All scripts stay mounted (stacked) so swapping never waits on a load.
        <Image
          key={src.src}
          src={src}
          alt=""
          loading="eager"
          className={cn(
            "h-auto w-full",
            i === 0 ? "relative" : "absolute inset-0",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </div>
  );
}
