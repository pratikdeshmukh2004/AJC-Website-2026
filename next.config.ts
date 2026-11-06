import type { NextConfig } from "next";
import imageConfig from "./src/config/images.json";

/**
 * GitHub Pages serves this repo under a subpath, so the app needs a basePath.
 *   production (master/main) -> /AJC-Website-2026
 *   preview    (develop)     -> /AJC-Website-2026/preview
 *
 * The CI workflows set NEXT_PUBLIC_BASE_PATH accordingly. Locally it's empty,
 * so `npm run dev` serves from "/".
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export — no server runtime. Produces a static `out/` directory.
  output: "export",

  // Serve under the Pages subpath when set (prod root or /preview).
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,

  // next/image's built-in optimizer requires a server, which a static export
  // doesn't have. `images.loader: "custom"` hands resizing to our own loader
  // (src/lib/image-loader.ts) instead, which points at WebP files pre-built by
  // `scripts/optimize-images.mjs` (see `npm run build`). Images outside the
  // optimized folders (SVGs, static imports) pass through unchanged.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    // Keep srcset widths identical to the tiers the script generates
    // (src/config/images.json) so each descriptor matches a real file.
    deviceSizes: imageConfig.widths,
    imageSizes: [320],
  },

  // Emit trailing-slash URLs so routes map cleanly to folders on static hosts.
  trailingSlash: true,

  reactStrictMode: true,
};

export default nextConfig;
