/**
 * Shared helpers.
 */

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
