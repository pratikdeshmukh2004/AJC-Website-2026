import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { AlchiIllustrationCycle } from "@/components/work/AlchiIllustrationCycle";
import { VirsaExpandableIntro } from "@/components/work/VirsaExpandableIntro";
import { assetPath, at, cn, u } from "@/lib/utils";

/*
  Alchi Kitchen — project page at /work/alchi-kitchen (AJC-19), from the Figma
  frame "Alchi Kitchen" (node 2823:2994, 1920px wide). Opened from the project
  card on Our Work.

  Same technique as Hospitality and Lahé Life: from xl up the frame is a scaled
  canvas where `--u` = 1 Figma px = 100cqw / 1920 and each element sits at its
  Figma coordinates (`at(x, y, w)` + `xl:left-(--x) xl:top-(--y)`). Below xl the
  same elements stack in normal flow (the design has no mobile frame).
  Palette: background #fdfbf4, headings #7d7062, body #9b9484.

  Layout: four stacked blocks. The two "Read more" intros expand in normal flow
  and push the content below them down, so the canvas is split at them:
    A. Hero, title and intro        Figma y 0–1962   (flow)
    B. Identity … The Menu title    Figma y 1962–9611 (absolute, rebased by b())
    C. The Menu intro               Figma y 9611–10196 (flow)
    D. Menu design … Next Project   Figma y 10196–END (absolute, rebased by d())

  Figma comment: the illustrations change every 0.5 seconds
  (AlchiIllustrationCycle).
*/

const IMG = assetPath("/images/projects/alchi-kitchen");

const B_TOP = 1962;
const D_TOP = 10196;
const b = (y: number) => y - B_TOP;
const d = (y: number) => y - D_TOP;

/** Section title (Cormorant 97 / 76, tracking -6%) at a Figma coordinate; `small` = 76 / 60. */
function Heading({
  children,
  x,
  y,
  level = 2,
  small,
}: {
  children: ReactNode;
  x: number;
  y: number;
  level?: 1 | 2;
  small?: boolean;
}) {
  const Tag = level === 1 ? "h1" : "h2";
  return (
    <Tag
      className={cn(
        "font-cormorant px-6 text-5xl leading-none tracking-[-0.06em] text-[#7d7062] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:p-0",
        small
          ? "xl:text-[length:calc(76*var(--u))] xl:leading-[calc(60*var(--u))] xl:tracking-[calc(-4.56*var(--u))]"
          : "xl:text-[length:calc(97*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-5.82*var(--u))]",
      )}
      style={at(x, y, 1088)}
    >
      {children}
    </Tag>
  );
}

/** Body copy (Helvetica 20, tracking +2%, #9b9484) at a Figma coordinate. */
function Copy({ children, x, y, w }: { children: ReactNode; x: number; y: number; w: number }) {
  return (
    <p
      className="font-helvetica-regular px-6 text-base leading-[1.45] tracking-[0.02em] text-[#9b9484] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:p-0 xl:text-[length:calc(20*var(--u))] xl:leading-[1.25] xl:tracking-[calc(0.4*var(--u))]"
      style={at(x, y, w)}
    >
      {children}
    </p>
  );
}

/**
 * A photo at Figma (x, y) with its Figma size; `top` is already rebased.
 * Below xl it fills the width at its own aspect ratio. `overlay` leaves the placement below xl to `className`, and
 * `children` render on top of the photo.
 */
function Pic({
  file,
  alt,
  x,
  top,
  w,
  h,
  priority,
  contain,
  overlay,
  className,
  children,
}: {
  file: string;
  alt: string;
  x: number;
  top: number;
  w: number;
  h: number;
  priority?: boolean;
  contain?: boolean;
  overlay?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "xl:absolute xl:top-(--y) xl:left-(--x) xl:h-(--h) xl:w-(--w)",
        !overlay && "relative w-full",
        "aspect-(--ar) xl:aspect-auto",
        !contain &&
          "overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover",
        className,
      )}
      style={{ ...at(x, top, w), "--h": u(h), "--ar": `${w} / ${h}` } as CSSProperties}
    >
      <OptimizedImage
        src={`${IMG}/${file}`}
        alt={alt}
        width={w}
        height={h}
        priority={priority}
        sizes={`(min-width: 1920px) ${w}px, (min-width: 1280px) ${+((w / 1920) * 100).toFixed(2)}vw, 100vw`}
        className={contain ? "h-full w-full object-contain" : undefined}
      />
      {children}
    </div>
  );
}

/** Colour tiles laid over a photo, placed by percentage so they follow it at any size. */
function Swatches({
  pic,
  tiles,
}: {
  pic: { x: number; y: number; w: number; h: number };
  tiles: [number, number, string][];
}) {
  return (
    <>
      {tiles.map(([x, y, color]) => (
        <div
          key={`${x}-${y}`}
          role="img"
          aria-label={`Palette colour ${color}`}
          className="absolute"
          style={{
            left: `${(((x - pic.x) / pic.w) * 100).toFixed(3)}%`,
            top: `${(((y - pic.y) / pic.h) * 100).toFixed(3)}%`,
            width: `${((165 / pic.w) * 100).toFixed(3)}%`,
            height: `${((78 / pic.h) * 100).toFixed(3)}%`,
            backgroundColor: color,
          }}
        />
      ))}
    </>
  );
}

/** Collapsed intro: paragraph 1, then paragraph 2 faded after its first line. */
const ABOUT_PREVIEW = [
  "In Ladakh’s culinary landscape, restaurants are formed by the land, as is the cuisine itself. Within this space, a few names resound deeply – the pioneers, the preservationists, the legacy holders. Locally speaking, these culture-keepers have witnessed a revival of century-old recipes passed down carefully through families, from grandmothers to mothers, and down to daughters and sons.",
  "This purview of the land is exactly where Alchi Kitchen was born. As one of the earliest restaurants in Ladakh dedicated to reviving the region’s rich culinary heritage, it was started in 2016 by Nilza Wangmo, a Nari Shakti Awardee.",
];
/** Expanded intro (first "Read more"): the story, then Identity, Iconography and The Menu. */
const ABOUT_SECTIONS: { heading?: string; paragraphs: string[] }[] = [
  {
    paragraphs: [
      "In Ladakh’s culinary landscape, restaurants are formed by the land, as is the cuisine itself. Within this space, a few names resound deeply – the pioneers, the preservationists, the legacy holders. Locally speaking, these culture-keepers have witnessed a revival of century-old recipes passed down carefully through families, from grandmothers to mothers, and down to daughters and sons.",
      "This purview of the land is exactly where Alchi Kitchen was born. As one of the earliest restaurants in Ladakh dedicated to reviving the region’s rich culinary heritage, it was started in 2016 by Nilza Wangmo, a Nari Shakti Awardee. Situated just above her own family home, the space embodies the raw warmth, energy, and intimacy of a true Ladakhi hearth. Built around a traditional stone stove (Thap) with heirloom brass utensils lining the wooden shelves, the kitchen breathes life into generations of ancestral recipes.",
      "When you sit there, the room makes you feel as though you could just paint the entire space. And so, we did.",
      "Our redesign of Alchi Kitchen’s identity and menu was inspired by this precise essence: a kitchen that feels entirely like home, where every detail.. from the low floor seating to the orchard resting just outside.. tells a story. The new identity honors its humble beginnings, celebrates Ladakh’s culinary traditions, and creates a visual language that communicates authenticity, warmth, and storytelling to travelers from across the world.",
    ],
  },
  {
    heading: "Identity",
    paragraphs: [
      "The Alchi wordmark is crafted in a custom ink-pen script, directly inspired by the lines and curves found in the calligraphy of ancient regional literature and Buddhist manuscripts. In contrast, Kitchen is typeset in a structured, locally adapted script. This pairing grounds the logo, balancing a reverence for ancient history with a sharp, modern clarity.",
    ],
  },
  {
    heading: "Iconography",
    paragraphs: [
      "The building structure embedded in the identity is more than an icon; it is the living heart of Alchi Kitchen. This house represents the literal home of Chef Nilza, framing the restaurant as an intimate extension of her hearth where every dish carries the memory of the women who cooked before her.",
      "Resting atop the home, the sun is positioned thoughtfully to the left. This symbolizes the very first rays of morning light that touch the Ladakhi valleys, bringing warmth to the kitchen’s stone stove (Thap) even before the firewood is lit.",
      "Just as every traditional Ladakhi home is adorned with prayer flags fluttering in the wind at its threshold, the logo mimics this visual entryway, welcoming every traveling guest into the space like family.",
    ],
  },
  {
    heading: "The Menu",
    paragraphs: [
      "The Menu for Alchi Kitchen draws inspiration from a modern storybook, each page telling the story of Ladakhi cuisine through hand-painted illustrations, evocative descriptions, and dishes that carry the legacy of the mountains.",
      "The design journey began with a single, black-and-white photograph of an archival Ladakhi kitchen, setting a historic visual baseline to mirror the heirloom recipes.",
      "To build the narrative text, we immersed ourselves in the cultural rituals behind the food, the warmth of sharing gur-gur cha (butter tea) cup after cup, and the memories of generational meals. These anecdotes find their way into the descriptions, bringing the culture along on the dining journey.",
      "Because Ladakhi food often comes without a visual reference for travelers, we created a series of clean, accurate watercolor illustrations for the menu. Each painting serves as an introduction to a culture served on a plate, allowing guests to visualise the legendary dishes before ever taking a bite.",
    ],
  },
];

/** Paragraphs with a blank line between them, and bold sub-headings. */
const aboutFull = (
  <div className="flex flex-col gap-4 xl:gap-[calc(20*var(--u))]">
    {ABOUT_SECTIONS.map(({ heading, paragraphs }) => (
      <section key={heading ?? "story"} className="flex flex-col gap-4 xl:gap-[calc(20*var(--u))]">
        {heading ? (
          <h3 className="font-helvetica font-bold tracking-[calc(0.4*var(--u))] text-[#7d7062] uppercase">
            {heading}
          </h3>
        ) : null}
        {paragraphs.map((text) => (
          <p key={text.slice(0, 24)}>{text}</p>
        ))}
      </section>
    ))}
  </div>
);

const MENU_PREVIEW =
  "The Menu for Alchi Kitchen draws inspiration from a modern storybook, each page telling the story of Ladakhi cuisine through hand-painted illustrations, evocative descriptions, and dishes that carry the legacy of the mountains. The design journey began with a single, black-and-white photograph of an archival Ladakhi kitchen, setting a historic visual baseline to mirror the heirloom recipes. To build the narrative text, we immersed ourselves in the cultural rituals behind the food, the warmth of sharing gur-gur cha (butter tea) cup after cup, and the";
const MENU_PARAGRAPHS = [
  "The Menu for Alchi Kitchen draws inspiration from a modern storybook, each page telling the story of Ladakhi cuisine through hand-painted illustrations, evocative descriptions, and dishes that carry the legacy of the mountains.",
  "The design journey began with a single, black-and-white photograph of an archival Ladakhi kitchen, setting a historic visual baseline to mirror the heirloom recipes.",
  "To build the narrative text, we immersed ourselves in the cultural rituals behind the food, the warmth of sharing gur-gur cha (butter tea) cup after cup, and the memories of generational meals. These anecdotes find their way into the descriptions, bringing the culture along on the dining journey.",
  "Because Ladakhi food often comes without a visual reference for travelers, we created a series of clean, accurate watercolor illustrations for the menu. Each painting serves as an introduction to a culture served on a plate, allowing guests to visualise the legendary dishes before ever taking a bite.",
];

const SERVICES = [
  "Strategy",
  "Brand Identity",
  "Narrative",
  "Menu Design",
  "Illustrations",
  "Packaging Design",
];

/** Menu-art illustrations, in cycle order (7-1 … 7-9). */
const ILLUSTRATIONS = [
  { n: 1, alt: "Illustration of a red thermos and a cup of butter tea", w: 217, h: 283 },
  { n: 2, alt: "Illustration of a brass plate of Ladakhi stew", w: 434, h: 290 },
  { n: 3, alt: "Illustration of khambir bread and stuffed flatbread", w: 466, h: 311 },
  { n: 4, alt: "Illustration of a brass plate of thukpa noodle soup", w: 463, h: 309 },
  { n: 5, alt: "Illustration of a plate of mok mok dumplings", w: 434, h: 290 },
  { n: 6, alt: "Illustration of a brass plate of vegetable skyu", w: 433, h: 289 },
  { n: 7, alt: "Illustration of fried pastries with a bowl of curd", w: 487, h: 329 },
  { n: 8, alt: "Illustration of a glass of herbal tea with spices", w: 434, h: 290 },
  { n: 9, alt: "Illustration of a bowl of sweet rice with almonds", w: 218, h: 290 },
].map(({ n, alt, w, h }) => ({ src: `${IMG}/7-${n}.png`, alt, width: w, height: h }));

/**
 * Press & references (ticket "References & press links"): logo links, placed at
 * the Figma coordinates (x, y, width, height).
 */
/** Logos are shown at this fraction of their Figma size. */
const FEATURE_SCALE = 0.75;

const FEATURES = [
  {
    file: "national-geographic.png",
    alt: "Watch the National Geographic feature on Alchi Kitchen",
    href: "https://www.youtube.com/watch?v=6V3r6WnU2so",
    x: 118,
    y: 16318,
    w: 232,
    h: 130,
  },
  {
    file: "conde-nast-traveller.png",
    alt: "Read about Alchi Kitchen in Condé Nast Traveller",
    href: "https://www.cntraveller.in/story/leh-ladakh-food-restaurants-alchi-turtuk-nubra-valley-saboo/",
    x: 499,
    y: 16348,
    w: 193,
    h: 69,
  },
  {
    file: "elle.png",
    alt: "Read about Alchi Kitchen in ELLE",
    href: "https://elle.in/lost-found-rushina-munshaw-ghildiyal-smita-deo-and-nilza-wangmo-on-reviving-their-respective-regional-cuisines/",
    x: 841,
    y: 16348,
    w: 231,
    h: 69,
  },
  {
    file: "travel-leisure.png",
    alt: "Read about Alchi Kitchen in Travel + Leisure",
    href: "https://www.travelandleisureasia.com/in/dining/how-indian-tribal-cuisine-set-global-trends/",
    x: 1218,
    y: 16348,
    w: 296,
    h: 69,
  },
  {
    file: "and-beyond.png",
    alt: "Read about Alchi Kitchen in &Beyond",
    href: "https://www.andbeyond.com/magazine/unmissable-meals-in-ladakh/",
    x: 1660,
    y: 16307,
    w: 145,
    h: 110,
  },
];

const TEAM: [string, string][] = [
  ["Visual Design", "Praneet Selva"],
  ["Illustrations", "Guna M"],
];

/** Colour-palette tiles laid over the two material photos (Figma 165 x 78). */
const SWATCHES_LEATHER: [number, number, string][] = [
  [249, 5748, "#3a260d"],
  [414, 5748, "#53350f"],
  [580, 5748, "#6e4a1c"],
];
const SWATCHES_BRASS: [number, number, string][] = [
  [1436, 5826, "#8d6c43"],
  [1601, 5826, "#c9a45f"],
];

export function AlchiKitchenPage() {
  return (
    <div className="@container relative mx-auto w-full max-w-[1920px] overflow-hidden bg-[#fdfbf4] [--u:calc(100cqw/1920)]">

      {/* ============ A. HERO + INTRO (Figma y 0–1962) ============ */}
      <section className="relative flex flex-col gap-8 xl:block xl:min-h-[calc(1962*var(--u))] xl:gap-0">
        {/* Wrapper holds the photo and its labels; at xl it dissolves so both sit on the canvas. */}
        <div className="relative xl:contents">
          <Pic
            file="1.png"
            alt="A hand holding an Alchi Kitchen menu card, ‘Ladakhi through cuisine’, over a spread of cards"
            x={0}
            top={0}
            w={1920}
            h={1080}
            priority
          />
          <p
            className="font-helvetica absolute bottom-6 left-6 text-sm font-bold tracking-[0.04em] text-white uppercase opacity-80 xl:top-(--y) xl:bottom-auto xl:left-(--x) xl:w-(--w) xl:text-[length:calc(28*var(--u))] xl:tracking-[calc(0.56*var(--u))]"
            style={at(103, 507, 348)}
          >
            2025 / ۲۰۲۵
          </p>
          <p
            className="font-helvetica absolute right-6 bottom-6 text-right text-sm font-bold tracking-[0.04em] text-white uppercase opacity-80 xl:top-(--y) xl:right-auto xl:bottom-auto xl:left-(--x) xl:w-(--w) xl:text-[length:calc(28*var(--u))] xl:tracking-[calc(0.56*var(--u))]"
            style={at(1469, 507, 348)}
          >
            AJC in Ladakh / لداخ
          </p>
        </div>

        <Heading level={1} x={109} y={1230}>
          Alchi Kitchen
        </Heading>
        <ul
          className="font-helvetica-regular px-6 text-lg tracking-[0.02em] text-[#7d7062] uppercase opacity-80 xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:p-0 xl:text-[length:calc(28*var(--u))] xl:leading-[calc(32*var(--u))] xl:tracking-[calc(0.56*var(--u))]"
          style={at(109, 1390, 348)}
        >
          {SERVICES.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>

        <VirsaExpandableIntro
          responsive
          x={981}
          y={1350}
          width={677}
          preview={
            <div className="flex flex-col gap-4 xl:gap-[calc(20*var(--u))]">
              {ABOUT_PREVIEW.map((text) => (
                <p key={text.slice(0, 24)}>{text}</p>
              ))}
            </div>
          }
          full={aboutFull}
          // Figma: plate at x946 y1536 (747x80), "Read more" at x981 y1629.
          fade={{ x: -35, y: 195, width: 747, height: 82 }}
          toggle={{ x: 0, y: 310 }}
          gapBelow={279}
        />
      </section>

      {/* ============ B. IDENTITY … THE MENU (Figma y 1962–9611) ============ */}
      <div className="relative flex flex-col gap-10 pb-10 xl:block xl:h-[calc(7649*var(--u))] xl:gap-0 xl:pb-0">
        <Pic
          file="2.png"
          alt="An Alchi Kitchen brass-toned card resting on tree bark"
          x={0}
          top={b(1962)}
          w={1920}
          h={1080}
        />

        {/* ---- Identity ---- */}
        <Heading x={109} y={b(3196)}>
          Identity
        </Heading>
        <Pic
          file="3.png"
          alt="The Alchi wordmark and its Tibetan-script companion on a construction grid"
          x={701}
          top={b(3423)}
          w={517}
          h={289}
          className="mx-auto max-w-xs px-6 xl:max-w-none xl:px-0"
        />
        <Pic
          file="4.png"
          alt="Hand-lettered Tibetan calligraphy on aged paper"
          x={38}
          top={b(4200)}
          w={917}
          h={926}
        />
        <Pic
          file="4-1.png"
          alt="The Alchi Kitchen wordmark in Tibetan script"
          x={981}
          top={b(4859)}
          w={492}
          h={82}
          contain
          className="mx-auto max-w-xs px-6 xl:max-w-none xl:px-0"
        />
        <Copy x={981} y={b(4993)} w={584}>
          The Alchi wordmark is crafted in a custom ink-pen script, directly inspired by the lines
          and curves found in the calligraphy of ancient regional literature and Buddhist
          manuscripts. In contrast, Kitchen is typeset in a structured, locally adapted script. This
          pairing grounds the logo, balancing a reverence for ancient history with a sharp, modern
          clarity.
        </Copy>

        {/* ---- Colour palette ---- */}
        <Heading x={109} y={b(5245)}>
          Colour Palette
        </Heading>
        <Pic
          file="5-1.png"
          alt="A sheet of dark brown leather"
          x={40}
          top={b(5438)}
          w={915}
          h={697}
        >
          <Swatches pic={{ x: 40, y: 5438, w: 915, h: 697 }} tiles={SWATCHES_LEATHER} />
        </Pic>
        <Pic
          file="5-2.png"
          alt="A brushed brass bar on a pale surface"
          x={979}
          top={b(5438)}
          w={915}
          h={697}
        >
          <Swatches pic={{ x: 979, y: 5438, w: 915, h: 697 }} tiles={SWATCHES_BRASS} />
        </Pic>

        {/* ---- Iconography ---- */}
        <Heading x={109} y={b(6393)}>
          Iconography
        </Heading>
        <Copy x={981} y={b(6467)} w={712}>
          The building structure embedded in the identity is more than an icon; it is the living
          heart of Alchi Kitchen. This house represents the literal home of Chef Nilza, framing the
          restaurant as an intimate extension of her hearth where every dish carries the memory of
          the women who cooked before her. Resting atop the home, the sun is positioned thoughtfully
          to the left. This symbolizes the very first rays of morning light that touch the Ladakhi
          valleys, bringing warmth to the kitchen’s stone stove (Thap) even before the firewood is
          lit. Just as every traditional Ladakhi home is adorned with prayer flags fluttering in the
          wind at its threshold, the logo mimics this visual entryway, welcoming every traveling
          guest into the space like family.
        </Copy>
        {/* Photo and logo share a wrapper below xl so the logo sits on the photo, as in the design. */}
        <div className="relative xl:contents">
          <Pic
            file="6-1.png"
            alt="The flat rooftops of Ladakhi homes in sepia"
            x={0}
            top={b(7106)}
            w={1920}
            h={1073}
          />
          <Pic
            file="6-Layer.png"
            alt="The Alchi Kitchen logo: a Ladakhi house with the morning sun above it"
            x={816}
            top={b(7508)}
            w={326}
            h={269}
            contain
            className="absolute top-1/2 left-1/2 w-2/5 -translate-x-1/2 -translate-y-1/2 xl:translate-x-0 xl:translate-y-0"
            overlay
          />
        </div>

        {/* ---- The Menu: illustrations (0.5s cycle) beside the card spread ---- */}
        <div
          className="relative mx-6 aspect-[600/520] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:aspect-auto xl:h-(--h) xl:w-(--w)"
          style={{ ...at(170, b(8420), 600), "--h": u(520) } as CSSProperties}
        >
          <AlchiIllustrationCycle images={ILLUSTRATIONS} />
        </div>
        <Pic
          file="8.png"
          alt="Alchi Kitchen menu cards scattered among dry leaves"
          x={981}
          top={b(8176)}
          w={939}
          h={1075}
        />
        <Heading x={109} y={b(9397)}>
          The Menu
        </Heading>
      </div>

      {/* ============ C. THE MENU INTRO (Figma y 9611–10196) ============ */}
      <VirsaExpandableIntro
        responsive
        x={981}
        y={0}
        width={748}
        preview={<p>{MENU_PREVIEW}</p>}
        full={
          <div className="flex flex-col gap-4 xl:gap-[calc(20*var(--u))]">
            {MENU_PARAGRAPHS.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </div>
        }
        // Figma: plate at x946 y9778 (780x80), "Read more" at x981 y9871.
        fade={{ x: -35, y: 167, width: 780, height: 80 }}
        toggle={{ x: 0, y: 260 }}
        gapBelow={302}
      />

      {/* ============ D. MENU DESIGN … NEXT PROJECT (Figma y 10196–END) ============ */}
      <div className="relative flex flex-col gap-10 pt-10 pb-20 xl:block xl:h-[calc(7134*var(--u))] xl:gap-0 xl:p-0">
        <div className="grid grid-cols-2 gap-3 px-6 xl:contents">
          <Pic
            file="9-1.png"
            alt="Menu cards with illustrated dishes among autumn leaves"
            x={23}
            top={d(10196)}
            w={913}
            h={1061}
          />
          <Pic
            file="9-2.png"
            alt="Menu cards with illustrated dishes among autumn leaves, seen from above"
            x={972}
            top={d(10196)}
            w={913}
            h={1061}
          />
        </div>

        <Heading x={109} y={d(11394)}>
          Design &amp; Illustrations
        </Heading>
        <Pic
          file="10.png"
          alt="An archival black-and-white photograph of a Ladakhi kitchen"
          x={23}
          top={d(11601)}
          w={913}
          h={1120}
        />
        <p
          className="font-cormorant px-6 text-3xl leading-[1.05] tracking-[-0.06em] text-[#7d7062] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:p-0 xl:text-[length:calc(48*var(--u))] xl:leading-[calc(46*var(--u))] xl:tracking-[calc(-2.88*var(--u))]"
          style={at(1123, d(12097), 610)}
        >
          Inspired from the Ancient Kitchens of Ladakh
        </p>

        <div className="grid grid-cols-2 gap-3 px-6 xl:contents">
          {(
            [
              ["11-1.png", "The Alchi Kitchen digital menu cover", 350],
              ["11-2.png", "A digital menu page of soups", 659],
              ["11-3.png", "A digital menu page with Thukpa", 968],
              ["11-4.png", "A digital menu page with Tain Tain and Khambir", 1277],
            ] as [string, string, number][]
          ).map(([file, alt, x]) => (
            <Pic key={file} file={file} alt={alt} x={x} top={d(13099)} w={292} h={413} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 px-6 xl:contents">
          <Pic
            file="12-1.png"
            alt="A hand holding the printed Alchi Kitchen menu in an autumn orchard"
            x={23}
            top={d(13888)}
            w={913}
            h={1061}
          />
          <Pic
            file="12-2.png"
            alt="An open Alchi Kitchen menu showing Mok Mok, Skyu, Chutagi and O-Skyu"
            x={972}
            top={d(13888)}
            w={913}
            h={1061}
          />
        </div>

        <Pic
          file="14.png"
          alt="The Alchi Kitchen placard standing on a stone ledge"
          x={972}
          top={d(14978)}
          w={913}
          h={1061}
        />
        <div className="grid grid-cols-2 gap-3 px-6 xl:contents">
          <Pic
            file="13-1.png"
            alt="The illustrated menu cover showing Chef Nilza at the stove"
            x={161}
            top={d(15182)}
            w={357}
            h={505}
            contain
          />
          <Pic
            file="13-2.png"
            alt="The printed welcome note and QR code for the menu"
            x={438}
            top={d(15330)}
            w={359}
            h={505}
            contain
          />
        </div>

        {/* ---- Features ---- */}
        <Heading x={109} y={d(16162)}>
          Features
        </Heading>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 px-6 xl:contents">
          {FEATURES.map(({ file, alt, href, x: fx, y: fy, w: fw, h: fh }) => {
            // Shown smaller than the Figma size, kept centred on the same spot.
            const w = Math.round(fw * FEATURE_SCALE);
            const h = Math.round(fh * FEATURE_SCALE);
            const x = Math.round(fx + (fw - w) / 2);
            const y = Math.round(fy + (fh - h) / 2);
            return (
              <a
                key={file}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-12 w-32 transition-opacity duration-300 hover:opacity-70 xl:absolute xl:top-(--y) xl:left-(--x) xl:h-(--h) xl:w-(--w)"
                style={{ ...at(x, d(y), w), "--h": u(h) } as CSSProperties}
              >
                <OptimizedImage
                  src={`${IMG}/press/${file}`}
                  alt={alt}
                  width={w}
                  height={h}
                  sizes={`(min-width: 1920px) ${w}px, 128px`}
                  className="h-full w-full object-contain"
                />
              </a>
            );
          })}
        </div>

        {/* ---- Team ---- */}
        <Heading x={109} y={d(16552)} small>
          Team
        </Heading>
        <div className="flex flex-col gap-2 px-6 xl:contents">
          {TEAM.map(([role, name], i) => (
            <p
              key={role}
              className="text-sm tracking-[0.02em] text-[#9b9484] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:text-[length:calc(16*var(--u))] xl:leading-[calc(20*var(--u))] xl:tracking-[calc(0.32*var(--u))] xl:whitespace-nowrap"
              style={at(499, d(16561) + i * 30, 241)}
            >
              <span className="font-helvetica mr-3 font-bold xl:mr-0 xl:inline-block xl:w-(--w)">
                {role}
              </span>
              <span className="font-helvetica-regular">{name}</span>
            </p>
          ))}
        </div>

        {/* ---- Next project ---- */}
        <div className="mt-6 flex flex-col items-center text-center xl:contents">
          <div
            aria-hidden
            className="font-cormorant text-5xl leading-none font-bold text-[#7d7062] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(80*var(--u))]"
            style={at(900, d(16869), 110)}
          >
            &gt;
          </div>
          <Link
            href="/work/silk-route-atelier"
            className="font-cormorant block text-5xl leading-none tracking-[-0.06em] text-[#7d7062] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-4.8*var(--u))]"
            style={at(654, d(16957), 612)}
          >
            Next Project
          </Link>
          <p
            className="font-helvetica-regular mt-3 text-sm tracking-[0.02em] whitespace-nowrap text-[#9b9484] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:mt-0 xl:w-(--w) xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
            style={at(830, d(17063), 260)}
          >
            The Silk Route Atelier
          </p>
        </div>
      </div>
    </div>
  );
}
