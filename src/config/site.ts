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
  // Menu panel navigation (order and labels match the design).
  // `hasSubmenu` renders the ">" affordance seen next to "Our Work".
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Work", href: "/work" },
    { label: "Philosophy", href: "/philosophy" },
    { label: "AJC Hospitality", href: "/hospitality" },
    { label: "Contact Us", href: "/contact" },
  ],
  // Quote shown at the top of the menu panel.
  menuQuote: {
    text: "Living in India means living simultaneously in several cultures and times. One often walks into medieval situations and runs into primitive people. The past exists as a living entity alongside the present, each illuminating and sustaining the other.",
    author: "Gulam Mohammed Sheikh",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
  contactEmail: "hello@ajc.example.com",
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
