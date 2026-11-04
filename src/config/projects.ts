/**
 * "Our Work" portfolio data — single source of truth for the /our-work route.
 *
 * Mirrors the Figma design "OUR WORK - ALL PROJECTS". Each project is a pair of
 * separate photos (left + right) shown side by side with a gutter, plus a title
 * and short narrative. Filter membership and display order live in
 * `categoryOrder` below.
 *
 * Image assets live in public/images/our_work/ as `<n>-left.*` and
 * `<n>-right.*` (order follows the Figma project order, 1 … 15).
 */

export const workCategories = [
  "All Projects",
  "Identity & Design",
  "Creative Direction",
  "Experiences",
  "Hospitality",
] as const;

export type WorkCategory = (typeof workCategories)[number];

/** A single photo with its intrinsic pixel dimensions (drives next/image). */
export type ProjectImage = {
  /** Path under /public — resolved through next/image (prefix via assetPath). */
  src: string;
  /** Intrinsic pixel size, so next/image reserves the right ratio (uncropped). */
  width: number;
  height: number;
};

export type Project = {
  /** Stable slug (also used as React key). */
  slug: string;
  title: string;
  description: string;
  /**
   * The two separate photos for this project, rendered side by side (left +
   * right) with a gutter — matching the Figma two-slot layout. Each keeps its
   * own native aspect ratio.
   */
  images: { left: ProjectImage; right: ProjectImage };
};

export const projects: Project[] = [
  {
    slug: "virsa-baltistan",
    title: "Virsa Baltistan",
    description:
      "Launch identity for a boutique luxury hotel in India. Virsa Baltistan rises as a modern-day fortress reviving the forgotten culture and royal legacy of Baltistan.",
    images: {
      left: { src: "/images/our_work/1-left.png", width: 851, height: 880 },
      right: { src: "/images/our_work/1-right.png", width: 850, height: 880 },
    },
  },
  {
    slug: "haveli-dharampura",
    title: "Haveli Dharampura",
    description:
      "A 19th-century luxury hotel in Old Delhi, through the labyrinthine lanes of Chandni Chowk. Here, Mughal frescoes and history host travelers from the world.",
    images: {
      left: { src: "/images/our_work/2-left.png", width: 850, height: 880 },
      right: { src: "/images/our_work/2-right.png", width: 850, height: 880 },
    },
  },
  {
    slug: "silk-route-atelier",
    title: "The Silk Route Atelier",
    description:
      "A proprietary case study by AJC exploring the cultural narrative and design identity, drawn from history & developed for an ultra-luxury Himalayan fashion house.",
    images: {
      left: { src: "/images/our_work/3-left.png", width: 850, height: 903 },
      right: { src: "/images/our_work/3-right.png", width: 850, height: 903 },
    },
  },
  {
    slug: "alchi-kitchen",
    title: "Alchi Kitchen",
    description:
      "Alchi Kitchen is a humble yet iconic Ladakhi-cuisine restaurant for which travelers make the drive. AJC elevated the brand standards to match its growing acclaim.",
    images: {
      left: { src: "/images/our_work/4-left.png", width: 850, height: 903 },
      right: { src: "/images/our_work/4-right.png", width: 850, height: 903 },
    },
  },
  {
    slug: "ranjits-svaasa",
    title: "Ranjit’s Svaasa",
    description:
      "A 200-year-old haveli in Amritsar, Svaasa is run by a family with 7-generation roots in the city. Carefully archived into an enduring narrative, the history is now shared.",
    images: {
      left: { src: "/images/our_work/5-left.png", width: 850, height: 902 },
      right: { src: "/images/our_work/5-right.png", width: 850, height: 903 },
    },
  },
  {
    slug: "virsa-experiences",
    title: "Virsa Experiences",
    description:
      "To live on a land and breathe its air for 2 years opens you to local life and folklore, that forms the experience of being a guest there. AJC formed this into a flagship program.",
    images: {
      left: { src: "/images/our_work/6-left.png", width: 850, height: 881 },
      right: { src: "/images/our_work/6-right.png", width: 850, height: 881 },
    },
  },
  {
    slug: "haveli-experiences",
    title: "Haveli Experiences",
    description:
      "To experience Mughal’s Old Delhi, the journey goes through labyrinthine lanes, that open to a 200-year-old heritage experience, narrated by AJC for the modern traveler.",
    images: {
      left: { src: "/images/our_work/7-left.png", width: 850, height: 881 },
      right: { src: "/images/our_work/7-right.png", width: 850, height: 881 },
    },
  },
  {
    slug: "neemrana-hotels",
    title: "Neemrana Hotels",
    description:
      "Two films brought centuries of history and decades of restoration together, as AJC defined the overarching narrative for Neemrana's evolving guest demographic.",
    images: {
      left: { src: "/images/our_work/8-left.png", width: 850, height: 912 },
      right: { src: "/images/our_work/8-right.png", width: 850, height: 912 },
    },
  },
  {
    slug: "assam-bengal-navigation",
    title: "Assam Bengal Navigation",
    description:
      "For the pioneers of river cruising in Eastern India, we captured a moving ship on the Hooghly River as a visual reverie of how Bengal lives and moves along its waters.",
    images: {
      left: { src: "/images/our_work/9-left.jpg", width: 850, height: 905 },
      right: { src: "/images/our_work/9-right.png", width: 850, height: 905 },
    },
  },
  {
    slug: "farmers-house-cafe",
    title: "Farmers’ House Cafe",
    description:
      "Where AJC was born — among coffee, cuisine, and conversation. Farmers' House is the mountain cafe you don't forget. Through raw and real design, it comes alive.",
    images: {
      left: { src: "/images/our_work/10-left.png", width: 850, height: 905 },
      right: { src: "/images/our_work/10-right.png", width: 850, height: 905 },
    },
  },
  {
    slug: "laheke-cafe",
    title: "Laheké Cafe",
    description:
      "A cafe in the wild of Assam, Laheké is defined by the slow rituals of the kettle. Inspired by the hornbill, it has a deliberate sensibility, reflecting across the brand.",
    images: {
      left: { src: "/images/our_work/11-left.png", width: 850, height: 903 },
      right: { src: "/images/our_work/11-right.png", width: 850, height: 903 },
    },
  },
  {
    slug: "hill-tribe",
    title: "Hill Tribe",
    description:
      "Rooted in the story of a man traversing high peaks for Shilajit, Hill Tribe has evolved into a mountain lifestyle store, for which inspiration came from the original journey.",
    images: {
      left: { src: "/images/our_work/12-left.png", width: 850, height: 911 },
      right: { src: "/images/our_work/12-right.png", width: 850, height: 911 },
    },
  },
  {
    slug: "virsa-archive",
    title: "The Virsa Archive",
    description:
      "The fabric of digital experience is in photographs and films. For a land unknown to most, AJC did the creative direction for the visual archive of a hotel, and a history.",
    images: {
      left: { src: "/images/our_work/13-left.png", width: 850, height: 905 },
      right: { src: "/images/our_work/13-right.png", width: 850, height: 905 },
    },
  },
  {
    slug: "lahe-life",
    title: "Lahé Life",
    description:
      "Born from the Assamese philosophy of lahe-lahe, slowly, Lahé Life is a hospitality collection built on the art of conscious travel for which AJC created a master identity.",
    images: {
      left: { src: "/images/our_work/14-left.png", width: 850, height: 905 },
      right: { src: "/images/our_work/14-right.png", width: 851, height: 908 },
    },
  },
  {
    slug: "balti-kitchen",
    title: "Balti Kitchen",
    description:
      "A garden-restaurant reviving the ancient culinary heritage of Baltistan through generational recipes, served as our understudy for an identity and menu refresh.",
    images: {
      left: { src: "/images/our_work/15-left.png", width: 850, height: 905 },
      right: { src: "/images/our_work/15-right.png", width: 850, height: 905 },
    },
  },
];

/** Look up a single project by its slug. Returns undefined when not found. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Which projects appear under each filter, IN DISPLAY ORDER (per Figma).
 * The order here is the order shown on the page — it is not the order of the
 * `projects` array. Numbers in the comments are the 1–15 project numbers.
 */
const categoryOrder: Record<Exclude<WorkCategory, "All Projects">, string[]> = {
  // 1, 3, 4, 10, 11, 12, 14, 15
  "Identity & Design": [
    "virsa-baltistan",
    "silk-route-atelier",
    "alchi-kitchen",
    "farmers-house-cafe",
    "laheke-cafe",
    "hill-tribe",
    "lahe-life",
    "balti-kitchen",
  ],
  // 13, 5, 8, 2, 9, 12, 10
  "Creative Direction": [
    "virsa-archive",
    "ranjits-svaasa",
    "neemrana-hotels",
    "haveli-dharampura",
    "assam-bengal-navigation",
    "hill-tribe",
    "farmers-house-cafe",
  ],
  // 6, 7
  Experiences: ["virsa-experiences", "haveli-experiences"],
  // 1, 2, 5, 8, 14
  Hospitality: [
    "virsa-baltistan",
    "haveli-dharampura",
    "ranjits-svaasa",
    "neemrana-hotels",
    "lahe-life",
  ],
};

/** The filter categories a project appears under (derived from `categoryOrder`). */
export function getCategoriesForProject(slug: string): Exclude<WorkCategory, "All Projects">[] {
  return (Object.keys(categoryOrder) as Exclude<WorkCategory, "All Projects">[]).filter(
    (category) => categoryOrder[category].includes(slug),
  );
}

/** Projects to show for a filter, in the Figma-defined order. */
export function getProjectsByCategory(category: WorkCategory): Project[] {
  if (category === "All Projects") return projects;
  return categoryOrder[category].map((slug) => {
    const project = projects.find((p) => p.slug === slug);
    if (!project) throw new Error(`Unknown project slug in categoryOrder: ${slug}`);
    return project;
  });
}
