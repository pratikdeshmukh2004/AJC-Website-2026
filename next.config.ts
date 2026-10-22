import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — this is a static marketing/portfolio site with no server runtime.
  // Produces a fully static `out/` directory that can be hosted anywhere (S3, Vercel, Netlify, GitHub Pages).
  output: "export",

  // next/image optimization requires a server, so disable it for static export.
  // Images are served as-is from /public.
  images: {
    unoptimized: true,
  },

  // Emit trailing-slash URLs so routes map cleanly to folders on static hosts.
  trailingSlash: true,

  reactStrictMode: true,
};

export default nextConfig;
