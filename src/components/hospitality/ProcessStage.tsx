"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { at, cn, u } from "@/lib/utils";

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
    <div className="xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y)" style={at(g.x, g.y)}>
      <h3 className="font-cormorant text-taupe text-[1.625rem] leading-[1.2] font-normal tracking-[-0.06em] md:text-[2rem] xl:text-[length:calc(50*var(--u))] xl:leading-[calc(66*var(--u))] xl:whitespace-nowrap">
        {title}
      </h3>

      <div
        className="relative mt-3 xl:mt-(--gap) xl:ml-(--dx)"
        style={vars({ "--gap": u(g.body.gap), "--dx": u(g.body.dx), "--bw": u(g.body.width) })}
      >
        <p
          id={bodyId}
          className={cn(
            "font-helvetica-ui text-sage text-[0.9375rem] leading-[1.6] tracking-[0.02em] opacity-[0.79] xl:text-[length:calc(22*var(--u))] xl:leading-[calc(25*var(--u))]",
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
          "font-helvetica-ui text-[0.8125rem] leading-[1.6] tracking-[0.01em] uppercase xl:text-[length:calc(22*var(--u))] xl:leading-[calc(25*var(--u))]",
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
