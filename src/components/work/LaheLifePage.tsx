"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { HeroHeader } from "@/components/home/HeroHeader";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { assetPath, at, cn } from "@/lib/utils";

/*
  Lahé Life — reproduction of the Figma project-page frame "Lahe"
  (node 2823:1808, 1920 wide) for AJC-29.

  Same technique as Hospitality: from xl up the frame is a scaled canvas where
  `--u` = 1 Figma px = 100cqw / 1920 and each element sits at its Figma
  coordinates (`at(x, y, w)` + `xl:left-(--x) xl:top-(--y)`). Below xl the same
  elements stack in normal flow (the design has no mobile frame).

  The brand-pillar tiles, logo lockup, icon and mockup are supplied artwork in
  public/images/projects/lahe-life, so they are placed as images. The colour
  swatches are drawn here with the hex values sampled from the Figma frame.
*/

// String srcs are not basePath-prefixed by next/image, so prefix them here
// (required on GitHub Pages, which serves the site under a subpath).
const IMG = assetPath("/images/projects/lahe-life");

/** Section title (Cormorant 97 / 76, tracking -6%) at a Figma coordinate. */
function Heading({ children, y, x = 108 }: { children: ReactNode; y: number; x?: number }) {
  return (
    <h2
      className="font-cormorant text-taupe mt-10 px-6 text-5xl leading-none tracking-[-0.06em] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:p-0 xl:text-[length:calc(97*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-5.82*var(--u))] xl:whitespace-nowrap"
      style={at(x, y)}
    >
      {children}
    </h2>
  );
}

/** Body copy block (Helvetica 20 / 23, sage) at a Figma coordinate. */
function Copy({
  children,
  x,
  y,
  w,
  className,
}: {
  children: ReactNode;
  x: number;
  y: number;
  w: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-helvetica-regular text-sage text-base leading-[1.45] tracking-[0.02em] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(20*var(--u))] xl:leading-[1.15] xl:tracking-[calc(0.4*var(--u))] [&_p+p]:mt-[1.15em]",
        className,
      )}
      style={at(x, y, w)}
    >
      {children}
    </div>
  );
}

/** One "ROLE  Name" pair in the Team row. `w` is the role column width. */
function Credit({ role, name, x, w }: { role: string; name: string; x: number; w: number }) {
  return (
    <p
      className="text-sage text-sm tracking-[0.02em] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:text-[length:calc(20*var(--u))] xl:leading-[normal] xl:tracking-[calc(0.4*var(--u))] xl:whitespace-nowrap"
      style={at(x, 10945, w)}
    >
      <span className="font-helvetica mr-3 font-bold xl:mr-0 xl:inline-block xl:w-(--w)">
        {role}
      </span>
      <span className="font-helvetica-regular">{name}</span>
    </p>
  );
}

export function LaheLifePage() {
  const [introExpanded, setIntroExpanded] = useState(false);

  return (
    <div className="bg-cream @container relative mx-auto w-full max-w-[1920px] overflow-hidden [--u:calc(100cqw/1920)]">
      {/* Overlay chrome (menu toggle), same as About/home */}
      <HeroHeader menuOnly />

      <div className="relative flex flex-col gap-6 pb-20 xl:block xl:h-[calc(11500*var(--u))] xl:pb-0">
        {/* ============ HERO (1920 x 1104) ============ */}
        <section className="relative h-svh w-full xl:absolute xl:top-0 xl:left-0 xl:h-[calc(1104*var(--u))]">
          <OptimizedImage
            src={`${IMG}/1.png`}
            alt="A cargo ship crossing the water, seen through a ship's window"
            width={1920}
            height={1104}
            priority
            sizes="(min-width: 1920px) 1920px, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <p className="font-helvetica absolute bottom-6 left-6 text-sm font-bold tracking-[0.04em] text-white uppercase opacity-80 xl:top-[calc(499*var(--u))] xl:bottom-auto xl:left-[calc(103*var(--u))] xl:w-[calc(348*var(--u))] xl:text-[length:calc(28*var(--u))] xl:tracking-[calc(0.56*var(--u))]">
            2026 / ২০২৬
          </p>
          <p className="font-helvetica absolute right-6 bottom-14 text-right text-sm font-bold tracking-[0.04em] text-white uppercase opacity-80 sm:bottom-6 xl:top-[calc(499*var(--u))] xl:right-auto xl:bottom-auto xl:left-[calc(1469*var(--u))] xl:w-[calc(348*var(--u))] xl:text-[length:calc(28*var(--u))] xl:tracking-[calc(0.56*var(--u))]">
            AJC in Assam / অসম
          </p>
        </section>

        {/* ============ TITLE + INTRO ============ */}
        <h1
          className="font-cormorant text-taupe mt-10 px-6 text-6xl leading-none tracking-[-0.06em] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:p-0 xl:text-[length:calc(97*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-5.82*var(--u))] xl:whitespace-nowrap"
          style={at(108, 1231)}
        >
          Lahé Life
        </h1>
        <p
          className="font-helvetica-regular text-taupe px-6 text-lg tracking-[0.02em] uppercase opacity-80 xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:p-0 xl:text-[length:calc(28*var(--u))] xl:leading-[0.9976] xl:tracking-[calc(0.56*var(--u))]"
          style={at(109, 1435, 523)}
        >
          Brand Identity Narrative
        </p>
        <Copy x={981} y={1440} w={677} className="px-6 xl:px-0">
          <div className="relative">
            <p>
              Lahé Life is a conscious collection defined by the philosophy of the slow and the
              stewardship of the land. Born from the Assamese way of life where time moves gently,
              it is a crossover of heritage hospitality with the modern sensibility of the present
              day.
            </p>
            <p>
              With roots in a forty-year legacy of exploration, the brand pairs a deep-seated
              regional soul with a collection of ventures that feel familiar and easy to return to.
              From the unhurried journeys of Assam Bengal Navigation along the Ganges and
              Brahmaputra rivers to the immersive sanctuary on land of Diphlu River Lodge, every
              experience is shaped by a quiet intimacy with the surroundings.
            </p>
            {introExpanded && (
              <>
                <p>
                  This culture of presence is carried forward by Jungle Travels India through
                  decades of regional knowledge, and preserved by Lahé Looms through a contemporary
                  approach to sustainable craft. In spaces like Laheké Cafe, this rhythm is brought
                  into an urban setting, bridging the local supply chain with a refined, considered
                  aesthetic.
                </p>
                <p>
                  The best experiences of Lahé are the ones that are rooted; they offer a way of
                  experiencing Eastern India – thoughtfully, slowly, and with a profound sense of
                  place.
                </p>
              </>
            )}
            {/* Figma "Rectangle 22": cream veil that fades the last lines while collapsed */}
            {!introExpanded && (
              <div
                aria-hidden
                className="bg-cream/66 pointer-events-none absolute inset-x-0 bottom-0 h-[3.5em]"
              />
            )}
          </div>
          <button
            type="button"
            onClick={() => setIntroExpanded((prev) => !prev)}
            aria-expanded={introExpanded}
            className="font-helvetica text-sage mt-3 block cursor-pointer text-left font-bold xl:mt-[calc(30*var(--u))]"
          >
            {introExpanded ? "Read less" : "Read more"}
          </button>
        </Copy>

        {/* ============ IDENTITY ============ */}
        <Heading y={2049}>Identity</Heading>
        <OptimizedImage
          src={`${IMG}/2.png`}
          alt="The Lahé Life logo: a cluster of curved reeds above the wordmark, shown on its construction grid"
          width={625}
          height={513}
          sizes="(min-width: 1920px) 623px, 60vw"
          className="mx-auto h-auto w-72 xl:absolute xl:top-(--y) xl:left-(--x) xl:mx-0 xl:w-(--w)"
          style={at(648, 2285, 623)}
        />

        {/* ============ ICONOGRAPHY ============ */}
        <Heading y={3087}>Iconography</Heading>
        <OptimizedImage
          src={`${IMG}/3.png`}
          alt="The Lahé Life symbol: curved reed stems rising from a shared root"
          width={303}
          height={265}
          sizes="(min-width: 1920px) 303px, 40vw"
          className="mx-auto h-auto w-40 xl:absolute xl:top-(--y) xl:left-(--x) xl:mx-0 xl:w-(--w)"
          style={at(391, 3395, 303)}
        />
        <Copy x={981} y={3406} w={712} className="px-6 xl:px-0">
          <p>
            The Logo draws inspiration from young bamboo shoots and river reeds, where multiple
            stems rise from a shared root system. It reflects a quiet, continuous growth that is
            resilient and deeply connected to its origin. Each form grows upward with intention,
            suggesting expansion while remaining anchored, much like the different brands within
            Lahé Life that evolve individually yet belong to a larger whole.
          </p>
          <p>
            The softness of the lines keeps the symbol organic, while its structure brings a sense
            of balance and clarity. It is not a literal depiction, but an interpretation of growth
            as a living system, one that is grounded, adaptive, and enduring.
          </p>
        </Copy>

        {/* ============ COLOUR PALETTE: sea band with swatches (Figma y4023, 1080 tall) ============ */}
        <section className="relative mt-10 w-full py-16 xl:absolute xl:top-[calc(4023*var(--u))] xl:left-0 xl:m-0 xl:h-[calc(1080*var(--u))] xl:p-0">
          <OptimizedImage
            src={`${IMG}/4.png`}
            alt="Dark, rippling water"
            width={1920}
            height={1080}
            sizes="(min-width: 1920px) 1920px, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Figma "Group 50": 992 wide, 6-column grid so the three rows line up */}
          <div className="relative mx-6 grid grid-cols-6 xl:absolute xl:top-[calc(364*var(--u))] xl:left-[calc(464*var(--u))] xl:m-0 xl:w-[calc(992*var(--u))]">
            <div className="col-span-3 h-24 rounded-t-[4px] bg-[#776d63] xl:h-[calc(169*var(--u))]" />
            <div className="col-span-3 h-24 rounded-t-[4px] bg-[#706851] xl:h-[calc(169*var(--u))]" />
            <div className="col-span-6 h-12 bg-[#fff6ed] xl:h-[calc(84*var(--u))]" />
            <div className="col-span-2 h-16 rounded-bl-[4px] bg-[#4d4645] xl:h-[calc(105*var(--u))]" />
            <div className="col-span-2 h-16 bg-[#3863a3] xl:h-[calc(105*var(--u))]" />
            <div className="col-span-2 h-16 rounded-br-[4px] bg-[#836541] xl:h-[calc(105*var(--u))]" />
          </div>
        </section>

        <Heading y={5384} x={109}>
          Colour Palette
        </Heading>
        <Copy x={981} y={5472} w={712} className="px-6 xl:px-0">
          <p>
            Slowly, by Nature
            <br />
            Our palette is an echo of the landscape, moving slowly by nature.
            <br />
            Browns and greys anchor the brand in the quiet weight of soil and stone – grounded,
            tactile, and enduring. In the spaces between, blue and ivory white introduce movement,
            drawing from the breath of open water and the clarity of unhurried air. Muted greens
            complete the narrative, reflecting the forests and the layered wilderness that reveals
            itself softly, one detail at a time.
          </p>
          <p>
            Together, these tones form a visual language that is felt before it is seen, rooted
            deeply in the place and its slowness.
          </p>
        </Copy>

        {/* ============ BRAND PILLARS (3 x 4 tiles of 536 x 807) ============ */}
        <Heading y={6049} x={109}>
          Brand Pillars
        </Heading>
        <div
          className="mx-6 grid grid-cols-2 gap-3 xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:grid-cols-3 xl:gap-x-[calc(33*var(--u))] xl:gap-y-[calc(30*var(--u))] [&>img]:h-auto [&>img]:w-full"
          style={at(109, 6200, 1674)}
        >
          <OptimizedImage
            src={`${IMG}/5-1.png`}
            alt="A hill rising above lines of still water, on olive green"
            width={536}
            height={807}
            sizes="(min-width: 1920px) 536px, 50vw"
          />
          <OptimizedImage
            src={`${IMG}/5-2.png`}
            alt="A mirror-like river encircling a quiet hill captures gentleness and meditative calm. It reflects ‘Lahe’, the soft footprint we leave and the peace we offer our guests."
            width={536}
            height={807}
            sizes="(min-width: 1920px) 536px, 50vw"
          />
          <OptimizedImage
            src={`${IMG}/5-3.png`}
            alt="From the Land, Lahe Looms: a grey hillside above a still lake"
            width={536}
            height={807}
            sizes="(min-width: 1920px) 536px, 50vw"
          />
          <OptimizedImage
            src={`${IMG}/5-4.png`}
            alt="The river’s rhythmic ripples represent a constant, graceful flow. As the brand's lifeblood, it is the pulse from which everything grows."
            width={536}
            height={807}
            sizes="(min-width: 1920px) 536px, 50vw"
          />
          <OptimizedImage
            src={`${IMG}/5-5.png`}
            alt="On the River, Assam Bengal Navigation: rippling dark water"
            width={536}
            height={807}
            sizes="(min-width: 1920px) 536px, 50vw"
          />
          <OptimizedImage
            src={`${IMG}/5-6.png`}
            alt="Rows of small hills above lines of water, on olive green"
            width={536}
            height={807}
            sizes="(min-width: 1920px) 536px, 50vw"
          />
          <OptimizedImage
            src={`${IMG}/5-7.png`}
            alt="On the Land, Diphlu River Lodge: birds over the water at sunset"
            width={544}
            height={815}
            sizes="(min-width: 1920px) 536px, 50vw"
          />
          <OptimizedImage
            src={`${IMG}/5-8.png`}
            alt="A sun above hills reflected in water, on taupe"
            width={536}
            height={807}
            sizes="(min-width: 1920px) 536px, 50vw"
          />
          <OptimizedImage
            src={`${IMG}/5-9.png`}
            alt="Mountains and depths reflect a perfect harmony where earth and water meet. This balance captures the totality of our ecosystem beneath the sun."
            width={536}
            height={807}
            sizes="(min-width: 1920px) 536px, 50vw"
          />
          <OptimizedImage
            src={`${IMG}/5-10.png`}
            alt="The ‘Wild’ captures the river’s raw energy and the mountain’s jagged strength. It honors the unpolished beauty and silent power of the natural world."
            width={536}
            height={807}
            sizes="(min-width: 1920px) 536px, 50vw"
          />
          <OptimizedImage
            src={`${IMG}/5-11.png`}
            alt="In the Wild, JTI Holidays: a misty, forested mountain"
            width={536}
            height={807}
            sizes="(min-width: 1920px) 536px, 50vw"
          />
          <OptimizedImage
            src={`${IMG}/5-12.png`}
            alt="Rows of small hills above lines of water, on olive green"
            width={536}
            height={807}
            sizes="(min-width: 1920px) 536px, 50vw"
          />
        </div>

        <p
          className="font-helvetica-regular text-sage px-6 text-center text-base tracking-[0.02em] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:p-0 xl:text-[length:calc(28*var(--u))] xl:leading-[normal] xl:tracking-[calc(0.56*var(--u))]"
          style={at(413, 9654, 1067)}
        >
          From the wild heart of Eastern India
        </p>

        {/* ============ BRAND ASSETS ============ */}
        <Heading y={9808}>Brand Assets</Heading>
        <OptimizedImage
          src={`${IMG}/6.png`}
          alt="Lahé Life website mockup: the logo over a misty golden lake, with the Assam Bengal Navigation, Diphlu River Lodge, JTI Holidays and Lahe Looms marks below"
          width={1140}
          height={840}
          sizes="(min-width: 1920px) 1140px, 100vw"
          className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
          style={at(390, 9946, 1140)}
        />

        {/* ============ TEAM ============ */}
        <Heading y={10894} x={109}>
          Team
        </Heading>
        <div className="flex flex-col gap-2 px-6 xl:contents">
          <Credit role="Design Lead" name="Saksham Khanna" x={640} w={221} />
          <Credit role="Graphic Design" name="Guna M" x={1131} w={240} />
        </div>

        {/* ============ NEXT PROJECT ============ */}
        <div className="mt-10 flex flex-col items-center text-center xl:contents">
          <p
            aria-hidden
            className="font-cormorant text-taupe text-5xl leading-none font-bold xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-4.8*var(--u))]"
            style={at(905, 11066, 110)}
          >
            &gt;
          </p>
          <Link
            href="/work/assam-bengal-navigation"
            className="font-cormorant text-taupe block text-5xl leading-none tracking-[-0.06em] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-4.8*var(--u))]"
            style={at(654, 11154, 612)}
          >
            Next Project
          </Link>
          <p
            className="font-helvetica-regular text-sage mt-3 text-sm tracking-[0.02em] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:mt-0 xl:w-(--w) xl:text-[length:calc(20*var(--u))] xl:leading-[normal] xl:tracking-[calc(0.4*var(--u))] xl:whitespace-nowrap"
            style={at(817, 11271, 291)}
          >
            Assam Bengal Navigation
          </p>
        </div>
      </div>
    </div>
  );
}
