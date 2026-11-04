"use client";

import { optimizedPath } from "./image-paths";

/**
 * Custom next/image loader for the static export.
 *
 * Next's built-in optimizer needs a server, so it is unavailable here. Instead
 * `scripts/optimize-images.mjs` pre-generates resized WebP files at build time
 * (public/images/_opt/<dir>/<name>@<width>.webp) and this loader points each
 * `srcset` entry at the matching one. The browser then downloads a file sized
 * for its viewport instead of a multi-megabyte original.
 *
 * Anything outside the optimized folders (static imports, SVGs, posters) is
 * returned unchanged.
 */
export default function imageLoader({ src, width }: { src: string; width: number }): string {
  // `?w=` is ignored by static hosts; it only tells Next the loader honours width.
  return optimizedPath(src, width) ?? `${src}?w=${width}`;
}
