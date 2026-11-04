import type { CSSProperties } from "react";

/*
  Shared layout + type tokens for the AJC Hospitality page (Figma "AJC Web
  Page" → frame "AJC Hospitality", 1920 x 9134).

  The page has two layouts in one DOM:
    - xl and up (>= 1280px): the Figma frame as a scaled canvas, the same
      technique as the About page. `--u` (set on the page) is 1 Figma px, and
      elements sit at their Figma coordinates via `AT` + `at(x, y)`.
    - below xl: the same elements in normal document flow, stacked, with
      readable fixed sizes. (The design has no mobile frame.)
*/

/** Figma px → CSS length at the canvas scale (`--u` is set on the page). */
export const u = (px: number) => `calc(${px} * var(--u))`;

/**
 * Canvas placement at Figma (x, y), with an optional width. Returns CSS
 * variables read by `AT` / `AT_W`, so they only take effect at xl and up.
 * Always pass `w` when using `AT_W`: custom properties inherit, so a missing
 * `--w` would silently pick up an ancestor's.
 */
export const at = (x: number, y: number, w?: number): CSSProperties =>
  ({ "--x": u(x), "--y": u(y), ...(w !== undefined && { "--w": u(w) }) }) as CSSProperties;

/** Absolute at the `at()` coordinates, xl and up. */
export const AT = "xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y)";
/** `AT` plus the `at()` width. */
export const AT_W = `${AT} xl:w-(--w)`;

// --- Type styles (below xl → xl canvas) -----------------------------------
// Values fitted against the Figma render with the shipped fonts.

/**
 * Regular-weight Helvetica for this page. Plain Helvetica comes first because
 * the design's text widths match it; the shared `font-helvetica-regular` token
 * leads with Helvetica Neue, which sets every line about 1.5% wider and would
 * move the line breaks in Our Process. (`font-helvetica` can't be used: it
 * leads with a Bold-only face.)
 */
export const HELV = "[font-family:Helvetica,'Helvetica_Neue',Arial,sans-serif]";

/** Section title: Cormorant 104 / -6%. The 96px line box seats the glyphs where Figma draws them. */
export const TITLE =
  "font-cormorant font-normal text-[#7d7062] tracking-[-0.06em] text-[2.75rem] leading-[1.05] md:text-[3.5rem] xl:text-[length:calc(104*var(--u))] xl:leading-[calc(96*var(--u))]";

/** Sub-heading / statement: Cormorant 50 / -6%. */
export const SUB =
  "font-cormorant font-normal text-[#7d7062] tracking-[-0.06em] text-[1.625rem] leading-[1.2] md:text-[2rem] xl:text-[length:calc(50*var(--u))] xl:leading-[calc(66*var(--u))]";

/** Body: Helvetica Regular 22 / 25 / +2%, #8b7f73 at 79%. */
export const BODY =
  "[font-family:Helvetica,'Helvetica_Neue',Arial,sans-serif] text-[#8b7f73] opacity-[0.79] tracking-[0.02em] text-[0.9375rem] leading-[1.6] xl:text-[length:calc(22*var(--u))] xl:leading-[calc(25*var(--u))]";

/** Uppercase list type: Helvetica 27 / +4%, #7d7062 (inactive rows add 59% opacity). No line height. */
export const LIST_TYPE =
  "[font-family:Helvetica,'Helvetica_Neue',Arial,sans-serif] uppercase text-[#7d7062] tracking-[0.04em] text-[0.875rem] xl:text-[length:calc(27*var(--u))]";

/** Uppercase list rows on the design's 44px pitch. */
export const LIST = `${LIST_TYPE} leading-[1.9] xl:leading-[calc(44*var(--u))]`;

/** Small uppercase label (READ MORE): Helvetica 22 / 25 / +1%. */
export const SMALL_CAPS =
  "[font-family:Helvetica,'Helvetica_Neue',Arial,sans-serif] uppercase tracking-[0.01em] text-[0.8125rem] leading-[1.6] xl:text-[length:calc(22*var(--u))] xl:leading-[calc(25*var(--u))]";

/**
 * Lines broken where the design breaks them: one block per line at xl, normal
 * flowing text below xl (the trailing space keeps words apart when inline).
 */
export const PINNED_LINE = "xl:block xl:whitespace-nowrap";
