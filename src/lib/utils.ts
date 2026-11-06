/**
 * Shared helpers.
 */
import type { CSSProperties } from "react";

/**
 * Join conditional class names. Lightweight alternative to clsx —
 * filters out falsy values and joins with a space.
 *
 * @example cn("btn", isActive && "btn--active")
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format seconds as m:ss (or h:mm:ss for long media).
 * @example formatTime(8) -> "0:08"
 */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const ss = String(s).padStart(2, "0");
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${ss}`;
  return `${m}:${ss}`;
}

/**
 * Prefix a public asset path with the configured base path.
 *
 * Raw string paths in attributes like <video src> / poster are NOT rewritten
 * by Next's basePath (only next/image, next/link, next/font are). Use this for
 * any such asset so it resolves correctly under the GitHub Pages subpath.
 *
 * @example assetPath("/videos/hero.mp4")
 */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}

/**
 * Size from a 1920px-wide Figma frame, scaled with the viewport.
 *
 * Returns `clamp(min, px/1920 of the viewport, px)`: exact at 1920px, smaller
 * on narrower screens (never below `min`), and capped at the design size on
 * wider ones.
 *
 * @example fig(97, "2.5rem") // heading font size
 */
export function fig(px: number, min: string): string {
  return `clamp(${min}, ${+(px / 19.2).toFixed(3)}vw, ${px}px)`;
}

/**
 * Figma px → CSS length on a scaled canvas, where `--u` (set on the page) is
 * 1 Figma px (e.g. `[--u:calc(100cqw/1920)]`). Used by pages that reproduce a
 * Figma frame at its exact coordinates, like Hospitality.
 *
 * @example style={{ height: u(905) }}
 */
export function u(px: number): string {
  return `calc(${px} * var(--u))`;
}

/**
 * Canvas placement at Figma (x, y), with an optional width, as inline CSS
 * variables. Read by the classes `xl:left-(--x) xl:top-(--y)` / `xl:w-(--w)`,
 * so placement only takes effect at the canvas breakpoint. Always pass `w`
 * when the element uses `xl:w-(--w)`: custom properties inherit, so a missing
 * `--w` would silently pick up an ancestor's.
 *
 * @example style={at(146, 7956, 647)}
 */
export function at(x: number, y: number, w?: number): CSSProperties {
  return { "--x": u(x), "--y": u(y), ...(w !== undefined && { "--w": u(w) }) } as CSSProperties;
}
