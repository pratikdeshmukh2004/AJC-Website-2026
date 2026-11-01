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
    { label: "Our Work", href: "/our-work" },
    { label: "Philosophy", href: "/philosophy" },
    { label: "AJC Hospitality", href: "/hospitality" },
    { label: "Contact Us", href: "/contact" },
  ],
  // Quote shown at the top of the menu panel.
  menuQuote: {
    text: "Living in India means living simultaneously in several cultures and times. One often walks into medieval situations and runs into primitive people. The past exists as a living entity alongside the present, each illuminating and sustaining the other.",
    author: "Gulam Mohammed Sheikh",
  },
  // Footer social links (Figma comments on the Footer frame).
  social: {
    linkedin: "https://www.linkedin.com/in/apeksha-jain-92994814a",
    whatsapp: "https://wa.me/919411924464",
    instagram: "https://www.instagram.com/apekshajain.in",
  },
  phone: "+91 94119 24464",
  // Footer link columns (order and labels match the Figma footer).
  footer: {
    discover: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Our Work", href: "/our-work" },
      { label: "Philosophy", href: "/philosophy" },
    ],
    resources: [
      { label: "AJC Hospitality", href: "/hospitality" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  contactEmail: "apeksha@apekshajain.in",
  location: "New Delhi, India",
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
