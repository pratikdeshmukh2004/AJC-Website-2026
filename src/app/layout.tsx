import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { RouteTransitionListener } from "@/components/layout/RouteTransitionListener";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
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
 * Root layout — owns <html>/<body>, global metadata and the shared chrome.
 * Fonts are self-hosted via @font-face in globals.css (files in /public/fonts).
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-scroll-behavior: we use `scroll-behavior: smooth` globally; this tells
    // Next to make its own route-change scroll resets instant instead of smooth.
    <html lang={siteConfig.locale} data-scroll-behavior="smooth">
      <body className="min-h-screen">
        <RouteTransitionListener />
        {/* On every page, Home included (it waits for the landing gate). */}
        <SiteHeader />
        {children}
        {/* On every page except Home (the footer hides itself on "/"). */}
        <Footer />
      </body>
    </html>
  );
}
