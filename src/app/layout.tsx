import type { Metadata } from "next";
import { cormorant } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

/**
 * Root layout — owns <html>/<body>, fonts, and global metadata only.
 * Shared chrome (Header/Footer) lives in the (site) route group so the
 * full-bleed home hero can opt out of it.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.locale} className={cormorant.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
