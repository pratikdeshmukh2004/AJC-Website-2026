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

/**
 * Where site enquiries are sent: a Google Apps Script web app that appends a
 * row to a Google Sheet and emails the studio. Empty when not configured, in
 * which case the forms fall back to opening the visitor's mail app.
 */
export const ENQUIRY_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "";

/**
 * POST an enquiry (plus the page it came from) to {@link ENQUIRY_ENDPOINT}.
 * Shared by the Contact and Hospitality forms.
 *
 * Apps Script answers a POST with a 302 to script.googleusercontent.com, and
 * that redirect carries no CORS headers, so a normal fetch is blocked even
 * though the script ran. "no-cors" sends the same request (text/plain keeps it a
 * simple request, so there is no preflight) and skips reading the reply. The
 * response is opaque, so only a network failure rejects.
 */
export async function submitEnquiry(values: Record<string, string>): Promise<void> {
  await fetch(ENQUIRY_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...values, page: window.location.href }),
  });
}

/** A box in Figma frame px: position, plus width / height when the element has one. */
export type FrameBox = { x: number; y: number; w?: number; h?: number };

/**
 * Placement on a page that has both a desktop (1920) and a mobile (390) Figma
 * frame. The page sets `--u` to 1 px of whichever frame is showing
 * (`[--u:calc(100cqw/390)] xl:[--u:calc(100cqw/1920)]`), so each value here
 * resolves against the right frame.
 *
 * Sets `--x/--y/--w/--h` (desktop, read by `xl:left-(--x)` …) and
 * `--mx/--my/--mw/--mh` (mobile, read by `left-(--mx)` …). A width or height
 * left out on one side is set to `auto`, so it never inherits an ancestor's.
 *
 * @example style={place({ x: 302, y: 4641, w: 858, h: 686 }, { x: 0, y: 2094, w: 251, h: 198 })}
 */
export function place(desktop: FrameBox, mobile: FrameBox): CSSProperties {
  const len = (px?: number) => (px === undefined ? "auto" : u(px));
  return {
    "--x": u(desktop.x),
    "--y": u(desktop.y),
    "--w": len(desktop.w),
    "--h": len(desktop.h),
    "--mx": u(mobile.x),
    "--my": u(mobile.y),
    "--mw": len(mobile.w),
    "--mh": len(mobile.h),
  } as CSSProperties;
}

/**
 * Keyboard navigation for a vertical ARIA tab list: the tab index a key moves
 * to (arrows wrap; Home / End jump to the ends), or null for any other key.
 *
 * @example const next = tabKeyTarget(e.key, i, tabs.length)
 */
export function tabKeyTarget(key: string, index: number, count: number): number | null {
  if (key === "ArrowDown") return (index + 1) % count;
  if (key === "ArrowUp") return (index - 1 + count) % count;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  return null;
}
