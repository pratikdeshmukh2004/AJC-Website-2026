import config from "../config/images.json";

/**
 * Where the pre-generated WebP variants live. Shared by the next/image loader
 * (client) and server code such as page metadata, so it has no "use client".
 * The files themselves are produced by `scripts/optimize-images.mjs`.
 *
 * Only the folders listed in src/config/images.json are optimized.
 */
const SOURCE = new RegExp(`^(.*)/images/((?:${config.dirs.join("|")})/.+)\\.(?:png|jpe?g)$`, "i");

/** Smallest generated width that covers `width` (or the largest, if none do). */
function pickWidth(width: number): number {
  return config.widths.find((w) => w >= width) ?? config.widths[config.widths.length - 1];
}

/** Optimized WebP path for a source image, or null if it isn't optimized. */
export function optimizedPath(src: string, width: number): string | null {
  const match = SOURCE.exec(src);
  if (!match) return null;
  const [, base, name] = match;
  return `${base}/images/_opt/${name}@${pickWidth(width)}.webp`;
}
