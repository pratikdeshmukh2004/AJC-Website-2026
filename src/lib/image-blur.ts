import manifest from "../generated/image-blur.json";

const blurs = manifest as Record<string, string>;

/**
 * Tiny inline WebP preview for an optimized image, or undefined if there is
 * none. Accepts a src with or without the basePath prefix.
 */
export function blurFor(src: string): string | undefined {
  const at = src.indexOf("/images/");
  return at === -1 ? undefined : blurs[src.slice(at)];
}
