import type { NextConfig } from "next";

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

  // next/image optimization requires a server, so disable it for static export.
  images: {
    unoptimized: true,
  },

  // Emit trailing-slash URLs so routes map cleanly to folders on static hosts.
  trailingSlash: true,

  reactStrictMode: true,
};

export default nextConfig;
