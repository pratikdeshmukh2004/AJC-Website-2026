"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AT, BODY, SMALL_CAPS, SUB, at, u } from "./design";

export type ProcessStageProps = {
  title: string;
  /** The stage's full copy. */
  children: ReactNode;
  /** Lines shown while collapsed, as in the design. */
  lines: number;
  /** Canvas geometry, in Figma px (xl and up). */
  geometry: {
    /** Heading position. */
    x: number;
    y: number;
    /** Body: left offset from the heading, gap below the heading's line box, width. */
    body: { dx: number; gap: number; width: number };
    /** READ MORE: left offset from the heading, gap below the body. */
    more: { dx: number; gap: number };
    /** The cream wash over lines 2+, relative to the body's top-left. */
    wash: { dx: number; dy: number };
  };
};

const vars = (v: Record<string, string>) => v as CSSProperties;

/**
 * One "Our Process" stage. Collapsed, it shows the first lines of its copy with
 * the lines after the first washed out (the design's 68% cream overlay); READ
 * MORE reveals the rest and turns into READ LESS.
 *
 * Body widths are chosen so the full copy wraps exactly where the design breaks
 * its lines, so the collapsed state matches Figma at 1920px.
 */
export function ProcessStage({ title, children, lines, geometry: g }: ProcessStageProps) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();

  return (
    <div className={AT} style={at(g.x, g.y)}>
      <h3 className={cn(SUB, "xl:whitespace-nowrap")}>{title}</h3>

      <div
        className="relative mt-3 xl:mt-(--gap) xl:ml-(--dx)"
        style={vars({ "--gap": u(g.body.gap), "--dx": u(g.body.dx), "--bw": u(g.body.width) })}
      >
        <p
          id={bodyId}
          className={cn(
            BODY,
            "xl:w-(--bw)",
            !open &&
              "overflow-hidden [mask-image:linear-gradient(#000_1lh,rgb(0_0_0/0.32)_1lh)] xl:[mask-image:none]",
          )}
          style={open ? undefined : { maxHeight: `${lines}lh` }}
        >
          {children}
        </p>
        {open ? null : (
          // Canvas only: the design's wash is a 523 x 62 cream rectangle at 68%.
          <div
            aria-hidden
            className="pointer-events-none absolute hidden bg-[#fdfbf4]/[0.68] xl:top-(--wy) xl:left-(--wx) xl:block xl:h-[calc(62*var(--u))] xl:w-[calc(523*var(--u))]"
            style={vars({ "--wx": u(g.wash.dx), "--wy": u(g.wash.dy) })}
          />
        )}
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          SMALL_CAPS,
          "mt-3 block cursor-pointer border-0 bg-transparent p-0 text-left text-[#8b7f73] opacity-[0.79] transition-opacity hover:opacity-100",
          "xl:mt-(--gap) xl:ml-(--dx)",
        )}
        style={vars({ "--gap": u(g.more.gap), "--dx": u(g.more.dx) })}
      >
        {open ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
