import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { HeroHeader } from "@/components/home/HeroHeader";
import { VirsaExpandableIntro } from "@/components/work/VirsaExpandableIntro";
import {
  VirsaExperienceCarousel,
  type Experience,
} from "@/components/work/VirsaExperienceCarousel";
import { VirsaFilmPlayer } from "@/components/work/VirsaFilmPlayer";
import { VirsaSlideCarousel } from "@/components/work/VirsaSlideCarousel";
import { assetPath, u } from "@/lib/utils";

/*
  Virsa Baltistan — the project's identity page at /work/virsa-baltistan
  (AJC-16), from the Figma frame "Virsa Baltistan" (node 2823:1389, 1920px
  wide). Opened from the right photo and the text of the Virsa Baltistan card
  on Our Work. Images are the frame's exports, clipped to the 1920 frame.

  Same technique as the About / Haveli / Neemrana pages: inside a 1920-wide
  `@container`, `--u` = 1 Figma px = 100cqw / 1920, so every Figma coordinate
  is written `calc(<px>*var(--u))` (via u()) and the layout scales with the
  viewport (exact at 1920px wide, smaller below). Tailwind is applied directly
  to each element — repeated type/box styles are written out on every tag so
  each one is self-describing, and only the varying per-element offsets are set
  inline via u(). Palette: background #fdfbf4, headings #7d7062 (taupe), body
  #9b9484 (sage).

  Layout: two stacked canvases in Figma px.
    1. Top section, Figma y 0–1966: hero, title, credits and the intro. The
       intro's "Read more" expands in normal flow, growing this section.
    2. The rest, Figma y 1966 to the end. Every top is written as r(<figma y>),
       i.e. rebased by -1966, so the numbers still read as Figma coordinates.

  The only extracted pieces are the interactive ones (the "Read more" intro,
  the slide / experience carousels and the ibex film player), which own client
  state — everything static is inline JSX below.
*/

/*
  Photos live under this folder. String srcs are prefixed with the base path
  here because next/image does not prefix them under static export (GitHub
  Pages).
*/
const IMG = assetPath("/images/projects/virsa-baltistan");

/** Every "Discover" link on the experience tiles opens this page. */
const EXPERIENCES_HREF = "/work/virsa-experiences";
/** "View Image Gallery" opens the visual-archive (creative direction) page. */
const ARCHIVE_HREF = "/work/virsa-baltistan/archive";

const SPLIT = 1966;
// Last element: the "Virsa Experiences" label at y25115, plus breathing room.
const END = 25355;
const r = (y: number) => y - SPLIT;

const WEBSITE = Array.from({ length: 9 }, (_, i) => ({
  src: `${IMG}/website-${i + 1}.png`,
  alt: `The Virsa Baltistan website, page ${i + 1} of 9`,
}));

const SOCIAL = [1, 2, 3].map((i) => ({
  src: `${IMG}/social-${i}.png`,
  alt: "The Virsa Baltistan Instagram grid",
}));

/**
 * Experience tiles, in carousel order. The frames show the first two; the
 * other five sit beside the frames in Figma, waiting to be scrolled in.
 */
const EXPERIENCES: Experience[] = [
  {
    title: "The Dune Dinner",
    body: "Set upon the earth’s own table, with burning torches, The Dune Dinner is set on a vast stretch of sand, under the stars, where a multi-course Italian menu takes stage in an intimate meal.",
    image: `${IMG}/experiences/dune-dinner.png`,
    alt: "Guests at a torch-lit dinner on the sand dunes at night",
  },
  {
    title: "The Beach Picnic",
    body: "By the secluded banks of the Shyok, a hidden beach becomes your table. A live chef cooks fine global cuisine for your lunch or sundowner, as guests prefer. Kombucha is poured by the river, and an intimate picnic is quietly shared, away from city life.",
    image: `${IMG}/experiences/beach-picnic.png`,
    alt: "A picnic table laid with plates, drinks and sushi",
  },
  {
    title: "Recreation in Baltistan",
    body: "Born from generations of isolation and mountain ingenuity, we bring you directly into Turtuk’s quiet workshops. Here, you sit beside master artisans to learn stone-masonry, wood-carving, and loom-weaving.",
    image: `${IMG}/experiences/recreation-in-baltistan.png`,
    alt: "Hands working a traditional wooden loom",
  },
  {
    title: "Dine With Dynasty",
    body: "A table that breaks history, as guests dine with the royal descendant, the king of Yabgo dynasty in the courtyard of their summer palace.",
    image: `${IMG}/experiences/dine-with-dynasty.png`,
    alt: "An elder in a Balti cap holding a torch at a stone doorway",
  },
  {
    title: "Lunch With A Local Family",
    body: "In Turtuk, every home shares its culture around the Bukhari. Recipes are passed down unchanged, beginning with a traditional barley welcome at the door, preserved over generations.",
    image: `${IMG}/experiences/lunch-with-a-local-family.png`,
    alt: "Grapes ripening on the vine",
  },
  {
    title: "The Royal Welcome",
    body: "In the land once ruled by kings, from the Yabgo rulers of Khaplu to the Maqpons of Skardu, whose courts shaped the culture, architecture, and traditions of this Himalayan kingdom, every welcome is as regal as the land itself.",
    image: `${IMG}/experiences/royal-welcome.png`,
    alt: "A Balti man with a horse in traditional tack",
  },
  {
    title: "Ramdan Glacier Trek",
    body: "Along the glacial stream, under a clear blue sky – a path that’s shared, with silence simply there. A journey that stops being yours alone, alongside a 3 hour trail of water channels & wildflowers.",
    image: `${IMG}/experiences/ramdan-glacier-trek.png`,
    alt: "A rocky canyon leading up towards the Ramdan glacier",
  },
];

/**
 * Intro copy ("0 _ Text for Identity"). The frame shows the first two
 * paragraphs; the rest appears on "Read more".
 */
const INTRO = [
  "In the creative world, there are works that inspire and ignite, but seldom are there projects that invent an entirely new parallel. In them, you discover yourself.. your true abilities, your profound shortcomings, and your core potential. For AJC, Virsa Baltistan was precisely that.",
  "A hotel situated in India’s last village, its story is bound to a modern border that brought the land of Turtuk from Baltistan into Ladakh, India, during the skirmish of 1971. It is a place where lines on a map shifted, but the ancestral soul, language, and culture of the Balti people remained proudly intact.",
  "To build the launch identity for Virsa Baltistan was not to merely design a brand for a luxury boutique stay; it was an exercise in preserving an isolated living legacy. It required an approach that respects the deep, untamed history of the land, while translating its poignant geopolitical narrative into a luxury format for the world.",
  "We did not design this brand from a desk in Delhi. We arrived and stationed ourselves in Ladakh for nearly six months, completely immersing our lives and our practice into the Baltistan we were preparing to share with the world. We lived the narrative, directed the visuals, and breathed life into the physical hotel and its identity from the ground up.",
  "What followed was the launch of India’s Best Boutique Stay (Travel + Leisure 2025)—a definitive flagship project, and a place to which we remain deeply, unalterably ingrained.",
];

export function VirsaBaltistanPage() {
  return (
    <div className="@container relative mx-auto w-full max-w-[1920px] overflow-hidden bg-[#fdfbf4] [--u:calc(100cqw/1920)]">
      {/* Overlay chrome (menu toggle), as on the other project pages */}
      <HeroHeader menuOnly />

      {/* ============ HERO + INTRO (Figma y 0–1966) ============ */}
      <section className="relative" style={{ minHeight: u(SPLIT) }}>
        <div
          className="absolute overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
          style={{ left: 0, top: 0, width: u(1920), height: u(1104) }}
        >
          <OptimizedImage
            src={`${IMG}/hero.png`}
            alt="A rider on horseback outside Virsa Baltistan, framed by leaves"
            width={1920}
            height={1104}
            priority
            sizes="100vw"
          />
        </div>
        <p
          className="font-helvetica absolute text-[length:calc(28*var(--u))] font-bold tracking-[calc(0.56*var(--u))] text-white uppercase opacity-80"
          style={{ left: u(111), top: u(523), width: u(348) }}
        >
          2024 – 2026
        </p>
        <p
          className="font-helvetica absolute text-right text-[length:calc(28*var(--u))] font-bold tracking-[calc(0.56*var(--u))] text-white uppercase opacity-80"
          style={{ left: u(1477), top: u(523), width: u(348) }}
        >
          AJC in Ladakh / لداخ
        </p>

        <h1
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(117), top: u(1231), width: u(868) }}
        >
          Virsa Baltistan
        </h1>
        <div
          className="font-helvetica-regular absolute text-[length:calc(28*var(--u))] leading-[0.9976] tracking-[calc(0.56*var(--u))] text-[#7d7062] uppercase opacity-80"
          style={{ left: u(117), top: u(1437), width: u(523) }}
        >
          <p>Strategy</p>
          <p>Brand Identity</p>
          <p>Narrative</p>
          <p>Website Design &amp; Dev</p>
          <p>Social Media &amp; PR</p>
          <p>Hotel Launch</p>
        </div>

        <VirsaExpandableIntro
          x={989}
          y={1437}
          width={677}
          preview={INTRO.slice(0, 2).map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          full={INTRO.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          // Figma: plate at x957 y1617 (747x80), "Read more" at x992 y1710.
          fade={{ x: -32, y: 180, width: 747, height: 80 }}
          toggle={{ x: 3, y: 273 }}
          gapBelow={233}
        />
      </section>

      {/* ============ THE REST (Figma y 1966 onward) ============ */}
      <div className="relative" style={{ height: u(END - SPLIT) }}>
        <div
          className="absolute overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
          style={{ left: 0, top: u(r(1966)), width: u(1920), height: u(1129) }}
        >
          <OptimizedImage
            src={`${IMG}/landscape.png`}
            alt="A rider at the gate of Virsa Baltistan"
            width={1920}
            height={1129}
            sizes="100vw"
          />
        </div>

        {/* ---- Identity: the logo on its construction grid ---- */}
        <h2
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(117), top: u(r(3182)), width: u(868) }}
        >
          Identity
        </h2>
        <div
          className="absolute overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
          style={{ left: u(658), top: u(r(3494)), width: u(620), height: u(336) }}
        >
          <OptimizedImage
            src={`${IMG}/logo-construction.png`}
            alt="The Virsa Baltistan logo on its construction grid"
            width={620}
            height={336}
            sizes="(min-width: 1920px) 620px, 32.29vw"
          />
        </div>

        {/* K2, with the Virsa mark set over it (part of the image) */}
        <div
          className="absolute overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
          style={{ left: 0, top: u(r(4228)), width: u(1920), height: u(1133) }}
        >
          <OptimizedImage
            src={`${IMG}/k2.png`}
            alt="K2, the mountain the Virsa logo is drawn from, with the Virsa mark"
            width={1920}
            height={1133}
            sizes="100vw"
          />
        </div>
        <div
          className="absolute overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
          style={{ left: u(8), top: u(r(5362)), width: u(641), height: u(1133) }}
        >
          <OptimizedImage
            src={`${IMG}/identity-1.png`}
            alt="A pencil sketch of the K2 summit line"
            width={641}
            height={1133}
            sizes="(min-width: 1920px) 641px, 33.39vw"
          />
        </div>
        <div
          className="absolute overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
          style={{ left: u(647), top: u(r(5362)), width: u(641), height: u(1133) }}
        >
          <OptimizedImage
            src={`${IMG}/identity-2.png`}
            alt="A hand sketching the logo"
            width={641}
            height={1133}
            sizes="(min-width: 1920px) 641px, 33.39vw"
          />
        </div>
        <div
          className="absolute overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
          style={{ left: u(1287), top: u(r(5362)), width: u(633), height: u(1133) }}
        >
          <OptimizedImage
            src={`${IMG}/identity-3.png`}
            alt="A Balti artisan at work"
            width={633}
            height={1133}
            sizes="(min-width: 1920px) 633px, 32.97vw"
          />
        </div>

        {/* ---- Iconography ---- */}
        <h2
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(130), top: u(r(6636)), width: u(868) }}
        >
          Iconography
        </h2>
        <div
          className="absolute overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
          style={{ left: u(409), top: u(r(6948)), width: u(240), height: u(225) }}
        >
          <OptimizedImage
            src={`${IMG}/mark.png`}
            alt="The Virsa mark"
            width={240}
            height={225}
            sizes="(min-width: 1920px) 240px, 12.5vw"
          />
        </div>
        <p
          className="font-helvetica-regular absolute text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] tracking-[calc(0.4*var(--u))] text-[#9b9484]"
          style={{ left: u(989), top: u(r(7059)), width: u(712) }}
        >
          Conceptualized by hotel-founder Rashidullah Khan, the logo draws
          <br />
          directly from K2, the defining mountain of the regional landscape.
          <br />
          The letter A in Virsa integrates two intentional design details:
          <br />a snow-capped top representing the summit, and a sharp 45-degree angle referencing
          the steep slopes of the mountain&rsquo;s high-altitude Death Zone.
        </p>

        {/* ---- Colour Palette ---- */}
        <h2
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(130), top: u(r(7506)), width: u(868) }}
        >
          Colour Palette
        </h2>
        <div
          className="absolute overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
          style={{ left: 0, top: u(r(7641)), width: u(1920), height: u(946) }}
        >
          <OptimizedImage
            src={`${IMG}/palette.png`}
            alt="The Turtuk valley in autumn, the landscape the palette is drawn from"
            width={1920}
            height={946}
            sizes="100vw"
          />
        </div>
        <p
          className="font-helvetica-regular absolute text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] tracking-[calc(0.4*var(--u))] text-[#9b9484]"
          style={{ left: u(989), top: u(r(8697)), width: u(712) }}
        >
          Baltistan is defined by its breathtaking terrain, and Virsa&rsquo;s palette is
          <br />
          directly borrowed from the landscapes of Turtuk. The deep green mirrors
          <br />
          the resilient farmlands that sustain the valley, while grey reflects the ancient,
          weathered riverbeds. Warm brown for the local timber foundational to
          <br />
          Balti architecture, and beige captures the fleeting cloud shadows that continuously shift
          across the mountain slopes.
        </p>

        {/* ---- Mascot of the Mountains ---- */}
        <h2
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(130), top: u(r(9074)), width: u(868) }}
        >
          Mascot of the
          <br />
          Mountains
        </h2>
        <div
          className="absolute overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
          style={{ left: u(340), top: u(r(9579)), width: u(309), height: u(404) }}
        >
          <OptimizedImage
            src={`${IMG}/ibex.png`}
            alt="The Virsa ibex mascot"
            width={309}
            height={404}
            sizes="(min-width: 1920px) 309px, 16.09vw"
          />
        </div>
        <VirsaFilmPlayer
          src={assetPath("/videos/virsa-ibex.mp4")}
          poster={`${IMG}/ibex-film-poster.jpg`}
          title="the Virsa ibex film"
          box={{ x: 980, y: r(9316), w: 913, h: 1061 }}
          // Figma: the triangle is centred on the film (x1404 y9814, 65px).
          triangle={{ x: 424, y: 498, size: 65 }}
        />
        <p
          className="font-helvetica-regular absolute text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] tracking-[calc(0.4*var(--u))] text-[#9b9484]"
          style={{ left: u(130), top: u(r(10283)), width: u(679) }}
        >
          Rugged terrains &amp; craggy mountains, the shadow of Ibex leering in motion &amp; the
          wind gushing by. Mirroring the strength of the poised navigator of our mountains, Virsa
          stands tall &amp; untamed in the wild.
        </p>

        {/* ---- Website Design ---- */}
        <h2
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(130), top: u(r(10581)), width: u(868) }}
        >
          Website Design
        </h2>
        <VirsaSlideCarousel
          label="Website pages"
          slides={WEBSITE}
          box={{ x: 261, y: r(10753), w: 1414, h: 884 }}
          arrows={{ y: r(11094), left: 90, right: 1773 }}
          fit="contain"
        />

        {/* ---- Brand Assets ---- */}
        <h2
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(130), top: u(r(11805)), width: u(868) }}
        >
          Brand Assets
        </h2>
        {(
          [
            ["assets-1.png", 43, 11939, 911, 893, "A Virsa welcome letter with the ibex on a bed"],
            ["assets-2.png", 1148, 11977, 522, 739, "The Virsa Baltistan guest information card"],
            ["assets-3.png", 20, 12927, 1900, 1079, "Virsa brochures laid on autumn leaves"],
            ["directory-1.png", 235, 14268, 358, 507, "Guest directory: Welcome to Virsa"],
            ["directory-2.png", 604, 14268, 358, 507, "Guest directory: the Shyok river at Turtuk"],
            ["directory-3.png", 974, 14268, 358, 507, "Guest directory: location and history"],
            ["directory-4.png", 1343, 14269, 358, 507, "Guest directory: transportation"],
            ["assets-4.png", 43, 15105, 913, 1061, "A Virsa brochure on a rock"],
            ["assets-5.png", 979, 15105, 913, 1061, "Open Virsa brochures on a rock"],
            ["assets-6.png", 43, 16187, 913, 1061, "A Virsa Postale postcard among dried grass"],
            ["card-1.png", 1168, 16468, 425, 284, "The Virsa Postale postcard, address side"],
            [
              "card-2.png",
              1278,
              16684,
              425,
              284,
              "The Virsa Postale postcard: The land of Baltistan",
            ],
            ["assets-7.png", 3, 17269, 639, 962, "A Virsa tote bag hanging from a tree"],
            ["assets-8.png", 642, 17269, 639, 962, "Hands holding a Virsa menu"],
            ["assets-9.png", 1277, 17269, 643, 962, "Virsa table cards in a guest room"],
          ] as [string, number, number, number, number, string][]
        ).map(([file, x, y, w, h, alt]) => (
          <div
            key={file}
            className="absolute overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
            style={{ left: u(x), top: u(r(y)), width: u(w), height: u(h) }}
          >
            <OptimizedImage
              src={`${IMG}/${file}`}
              alt={alt}
              width={w}
              height={h}
              sizes={`(min-width: 1920px) ${w}px, ${+((w / 1920) * 100).toFixed(2)}vw`}
            />
          </div>
        ))}

        {/* ---- Social Media ---- */}
        <h2
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(130), top: u(r(18353)), width: u(868) }}
        >
          Social Media
        </h2>
        <p
          className="font-helvetica-regular absolute text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] tracking-[calc(0.4*var(--u))] text-[#9b9484]"
          style={{ left: u(989), top: u(r(18412)), width: u(663) }}
        >
          Built entirely on organic growth, Virsa&rsquo;s digital presence serves
          <br />
          as an authentic window into daily life at the property. Rather than
          <br />
          treating Instagram as isolated media, every visual contributes to
          <br />
          a unified narrative: the story of a modern Baltistan fortress.
          <br />
          Through professional photography and intentional curation,
          <br />
          the grid balances royalty, unhurried leisure, and spatial presence.
          <br />
          For the brand, we adhere to a simple ethos: less is more.
        </p>
        <VirsaSlideCarousel
          label="Instagram grid"
          slides={SOCIAL}
          box={{ x: 536, y: r(18707), w: 889, h: 1756 }}
          arrows={{ y: r(19518), left: 262, right: 1599 }}
        />

        {/* ---- Creative Direction: links to the visual-archive page ---- */}
        <h2
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(138), top: u(r(20650)), width: u(868) }}
        >
          Creative Direction
        </h2>
        {(
          [
            ["creative-1.jpg", 91, "Timber balconies above a stone lane at Virsa"],
            ["creative-2.jpg", 530, "A guest reading on loungers by the pool"],
            ["creative-3.jpg", 969, "Mountain light through a window at Virsa"],
            ["creative-4.jpg", 1409, "A polo player readying his horse"],
          ] as [string, number, string][]
        ).map(([file, x, alt]) => (
          <div
            key={file}
            className="absolute overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
            style={{ left: u(x), top: u(r(20810)), width: u(420), height: u(630) }}
          >
            <OptimizedImage
              src={`${IMG}/${file}`}
              alt={alt}
              width={420}
              height={630}
              sizes="(min-width: 1920px) 420px, 21.88vw"
            />
          </div>
        ))}
        <Link
          href={ARCHIVE_HREF}
          className="font-helvetica absolute text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] font-bold tracking-[calc(0.4*var(--u))] whitespace-nowrap text-[#9b9484] uppercase transition-opacity hover:opacity-70"
          style={{ left: u(847), top: u(r(21491)) }}
        >
          View Image Gallery
        </Link>

        {/* ---- Experience Design ---- */}
        <h2
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(139), top: u(r(21619)), width: u(868) }}
        >
          Experience Design
        </h2>
        <VirsaExperienceCarousel
          items={EXPERIENCES}
          y={r(21791)}
          h={1061}
          slots={[
            { x: 115, w: 843 },
            { x: 981, w: 839 },
          ]}
          // Figma: title y22536 (67 tall), copy y22603, "Discover" y22754.
          text={{ titleX: 86, titleBottom: 812, bodyX: 91, bodyY: 812, bodyW: 517, linkY: 963 }}
          arrows={{ y: r(22280), left: 19, right: 1843 }}
          href={EXPERIENCES_HREF}
        />

        {/* ---- PR & Media ---- */}
        <h2
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(129), top: u(r(23017)), width: u(868) }}
        >
          PR &amp; Media
        </h2>
        <a
          href="https://www.travelandleisureasia.com/in/news/best-domestic-hotels-iba-2025/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute block overflow-hidden transition-opacity duration-300 hover:opacity-90"
          style={{ left: 0, top: u(r(23189)), width: u(1920), height: u(1080) }}
        >
          <OptimizedImage
            src={`${IMG}/award-banner.png`}
            alt="Travel + Leisure India’s Best Awards 2025: Best Boutique Stay"
            width={1920}
            height={1080}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </a>
        {(
          [
            [
              "press/architectural-digest.png",
              "Read about Virsa Baltistan in Architectural Digest",
              "https://www.architecturaldigest.in/story/a-well-curated-regional-meal-awaits-you-in-ladakhs-prettiest-village-turtuk-best-restaurants-leh-where-to-eat/",
              117,
              24510,
              116,
              75,
            ],
            [
              "press/conde-nast-traveller.png",
              "Read about Virsa Baltistan in Condé Nast Traveller",
              "https://www.cntraveller.in/story/the-best-hotels-in-ladakh/",
              791,
              24522,
              193,
              69,
            ],
            [
              "press/travel-leisure.png",
              "Read the Travel + Leisure feature on Turtuk and Virsa",
              "https://www.virsaladakh.com/_files/ugd/6168af_d99bffa269a54f488bb2da2d01a9aa50.pdf",
              1142,
              24527,
              246,
              57,
            ],
          ] as [string, string, string, number, number, number, number][]
        ).map(([file, alt, href, x, y, w, h]) => (
          <a
            key={file}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute block transition-opacity duration-300 hover:opacity-70"
            style={{ left: u(x), top: u(r(y)), width: u(w), height: u(h) }}
          >
            <OptimizedImage
              src={`${IMG}/${file}`}
              alt={alt}
              width={w}
              height={h}
              sizes={`(min-width: 1920px) ${w}px, ${+((w / 1920) * 100).toFixed(2)}vw`}
              className="h-full w-full object-contain"
            />
          </a>
        ))}

        {/* ---- Team ---- (role label, then name beside it; rows 36px apart) */}
        <h2
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(130), top: u(r(24705)), width: u(868) }}
        >
          Team
        </h2>
        {(
          [
            [423, 619, "Concept", "Rashidullah Khan"],
            [423, 619, "Community", "Turtuk Village"],
            [423, 619, "Photography", "Avani Rai"],
            [913, 1141, "Photography", "Alex Buzolic"],
            [913, 1141, "Photography", "Marie-Eve"],
            [913, 1141, "Photography", "Ansen Antony"],
            [1373, 1601, "Visual Design", "Beth"],
            [1373, 1601, "Visual Design", "Praneet Selva"],
            [1373, 1601, "Cinematography", "Shivanshu Negi"],
          ] as [number, number, string, string][]
        ).map(([roleX, nameX, role, name], i) => {
          // Three columns of three rows; rows step 36px down within a column.
          const rowY = r(24714) + (i % 3) * 36;
          return (
            <div key={`${roleX}-${role}-${name}`} className="contents">
              <p
                className="font-helvetica absolute text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] font-bold tracking-[calc(0.4*var(--u))] text-[#9b9484] uppercase"
                style={{ left: u(roleX), top: u(rowY) }}
              >
                {role}
              </p>
              <p
                className="font-helvetica-regular absolute text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] tracking-[calc(0.4*var(--u))] text-[#9b9484] uppercase"
                style={{ left: u(nameX), top: u(rowY) }}
              >
                {name}
              </p>
            </div>
          );
        })}

        {/* ---- Next project ---- */}
        <div
          aria-hidden
          className="font-cormorant absolute text-center text-[length:calc(80*var(--u))] leading-none font-bold text-[#7d7062]"
          style={{ left: u(905), top: u(r(24925)), width: u(110) }}
        >
          &gt;
        </div>
        <Link
          href={EXPERIENCES_HREF}
          className="font-cormorant absolute block text-center text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))] text-[#7d7062]"
          style={{ left: u(654), top: u(r(25013)), width: u(612) }}
        >
          Next Project
        </Link>
        <p
          className="font-helvetica-regular absolute text-center text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] tracking-[calc(0.4*var(--u))] whitespace-nowrap text-[#9b9484] uppercase"
          style={{ left: u(853), top: u(r(25115)), width: u(214) }}
        >
          Virsa Experiences
        </p>
      </div>
    </div>
  );
}
