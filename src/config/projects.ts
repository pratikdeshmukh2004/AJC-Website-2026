/**
 * "Our Work" portfolio data — single source of truth for the /our-work route.
 *
 * Mirrors the Figma design "OUR WORK - ALL PROJECTS". Each project pairs an
 * image (public/images/our_work/<n>.png) with a title and short narrative,
 * and is tagged with a category used by the filter row.
 *
 * Image order follows the Figma project order (1.png … 15.png).
 */

export const workCategories = [
  "All Projects",
  "Identity & Design",
  "Creative Direction",
  "Experiences",
  "Hospitality",
] as const;

export type WorkCategory = (typeof workCategories)[number];

export type Project = {
  /** Stable slug (also used as React key). */
  slug: string;
  title: string;
  description: string;
  /** Path under /public — resolved through next/image. */
  image: string;
  /** Categories this project belongs to (excluding "All Projects"). */
  categories: Exclude<WorkCategory, "All Projects">[];
};

export const projects: Project[] = [
  {
    slug: "virsa-baltistan",
    title: "Virsa Baltistan",
    description:
      "Launch identity for a boutique luxury hotel in India. Virsa Baltistan rises as a modern-day fortress reviving the forgotten culture and royal legacy of Baltistan.",
    image: "/images/our_work/1.png",
    categories: ["Identity & Design", "Hospitality"],
  },
  {
    slug: "haveli-dharampura",
    title: "Haveli Dharampura",
    description:
      "A 19th-century luxury hotel in Old Delhi, through the labyrinthine lanes of Chandni Chowk. Here, Mughal frescoes and history host travelers from the world.",
    image: "/images/our_work/2.png",
    categories: ["Hospitality", "Creative Direction"],
  },
  {
    slug: "silk-route-atelier",
    title: "The Silk Route Atelier",
    description:
      "A proprietary case study by AJC exploring the cultural narrative and design identity, drawn from history & developed for an ultra-luxury Himalayan fashion house.",
    image: "/images/our_work/3.png",
    categories: ["Identity & Design", "Creative Direction"],
  },
  {
    slug: "alchi-kitchen",
    title: "Alchi Kitchen",
    description:
      "Alchi Kitchen is a humble yet iconic Ladakhi-cuisine restaurant for which travelers make the drive. AJC elevated the brand standards to match its growing acclaim.",
    image: "/images/our_work/4.png",
    categories: ["Identity & Design", "Hospitality"],
  },
  {
    slug: "ranjits-svaasa",
    title: "Ranjit’s Svaasa",
    description:
      "A 200-year-old haveli in Amritsar, Svaasa is run by a family with 7-generation roots in the city. Carefully archived into an enduring narrative, the history is now shared.",
    image: "/images/our_work/5.png",
    categories: ["Hospitality", "Creative Direction"],
  },
  {
    slug: "virsa-experiences",
    title: "Virsa Experiences",
    description:
      "To live on a land and breathe its air for 2 years opens you to local life and folklore, that forms the experience of being a guest there. AJC formed this into a flagship program.",
    image: "/images/our_work/6.png",
    categories: ["Experiences", "Hospitality"],
  },
  {
    slug: "haveli-experiences",
    title: "Haveli Experiences",
    description:
      "To experience Mughal’s Old Delhi, the journey goes through labyrinthine lanes, that open to a 200-year-old heritage experience, narrated by AJC for the modern traveler.",
    image: "/images/our_work/7.png",
    categories: ["Experiences", "Hospitality"],
  },
  {
    slug: "neemrana-hotels",
    title: "Neemrana Hotels",
    description:
      "Two films brought centuries of history and decades of restoration together, as AJC defined the overarching narrative for Neemrana's evolving guest demographic.",
    image: "/images/our_work/8.png",
    categories: ["Creative Direction", "Hospitality"],
  },
  {
    slug: "assam-bengal-navigation",
    title: "Assam Bengal Navigation",
    description:
      "For the pioneers of river cruising in Eastern India, we captured a moving ship on the Hooghly River as a visual reverie of how Bengal lives and moves along its waters.",
    image: "/images/our_work/9.png",
    categories: ["Creative Direction", "Experiences"],
  },
  {
    slug: "farmers-house-cafe",
    title: "Farmers’ House Cafe",
    description:
      "Where AJC was born — among coffee, cuisine, and conversation. Farmers' House is the mountain cafe you don't forget. Through raw and real design, it comes alive.",
    image: "/images/our_work/10.png",
    categories: ["Identity & Design", "Hospitality"],
  },
  {
    slug: "laheke-cafe",
    title: "Laheké Cafe",
    description:
      "A cafe in the wild of Assam, Laheké is defined by the slow rituals of the kettle. Inspired by the hornbill, it has a deliberate sensibility, reflecting across the brand.",
    image: "/images/our_work/11.png",
    categories: ["Identity & Design", "Hospitality"],
  },
  {
    slug: "hill-tribe",
    title: "Hill Tribe",
    description:
      "Rooted in the story of a man traversing high peaks for Shilajit, Hill Tribe has evolved into a mountain lifestyle store, for which inspiration came from the original journey.",
    image: "/images/our_work/12.png",
    categories: ["Identity & Design", "Creative Direction"],
  },
  {
    slug: "virsa-archive",
    title: "The Virsa Archive",
    description:
      "The fabric of digital experience is in photographs and films. For a land unknown to most, AJC did the creative direction for the visual archive of a hotel, and a history.",
    image: "/images/our_work/13.png",
    categories: ["Creative Direction"],
  },
  {
    slug: "lahe-life",
    title: "Lahé Life",
    description:
      "Born from the Assamese philosophy of lahe-lahe, slowly, Lahé Life is a hospitality collection built on the art of conscious travel for which AJC created a master identity.",
    image: "/images/our_work/14.png",
    categories: ["Identity & Design", "Hospitality"],
  },
  {
    slug: "balti-kitchen",
    title: "Balti Kitchen",
    description:
      "A garden-restaurant reviving the ancient culinary heritage of Baltistan through generational recipes, served as our understudy for an identity and menu refresh.",
    image: "/images/our_work/15.png",
    categories: ["Identity & Design", "Hospitality"],
  },
];
