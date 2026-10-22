import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Required for `output: export` — emit sitemap.xml as a static file at build time.
export const dynamic = "force-static";

/**
 * Minimal sitemap. Add routes here as the site grows, or generate them
 * from your content source.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
    },
  ];
}
