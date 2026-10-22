/**
 * Central site configuration — single source of truth for metadata,
 * navigation, and global strings. Imported by layout, nav, and footer.
 */

export const siteConfig = {
  name: "AJC",
  title: "AJC — Creative Studio",
  description:
    "AJC is a creative studio crafting brand identities and experiences rooted in culture, heritage, and considered design.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ajc.example.com",
  locale: "en",
  nav: [
    { label: "Work", href: "/work" },
    { label: "Studio", href: "/studio" },
    { label: "Contact", href: "/contact" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
  contactEmail: "hello@ajc.example.com",
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
