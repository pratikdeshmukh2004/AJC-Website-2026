import NextImage, { type ImageProps } from "next/image";
import { blurFor } from "@/lib/image-blur";

/**
 * Drop-in replacement for `next/image` for the heavy photography.
 *
 * Resizing and WebP conversion come from the custom loader
 * (src/lib/image-loader.ts) plus `scripts/optimize-images.mjs`. This wrapper
 * adds the one thing the loader can't: a tiny inline blur preview, so large
 * images fade in over a soft version of themselves instead of a blank box.
 *
 * Lazy loading is next/image's default; pass `priority` only for above-the-fold
 * images (the LCP hero). Images without a generated preview render as before.
 */
export default function OptimizedImage(props: ImageProps) {
  const { src, placeholder } = props;

  if (typeof src === "string" && placeholder === undefined) {
    const blurDataURL = blurFor(src);
    if (blurDataURL) {
      return <NextImage {...props} placeholder="blur" blurDataURL={blurDataURL} />;
    }
  }

  return <NextImage {...props} />;
}
