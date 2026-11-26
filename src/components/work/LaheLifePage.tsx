"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { ReadMoreLabel } from "@/components/ui/ReadMoreLabel";
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

/** The 12 brand-pillar tiles; desktop and mobile only differ in the grid classes passed in. */
function PillarGrid({ className, style }: { className: string; style?: CSSProperties }) {
  return (
    <div className={className} style={style}>
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
  );
}

/** Mobile section title (Figma mobile frame, Cormorant, tracking -6%) at a mobile-frame y. */
function MobileHeading({ children, y }: { children: ReactNode; y: number }) {
  return (
    <h2
      className="font-cormorant text-taupe absolute top-(--y) left-(--x) text-[length:calc(45*var(--u))] leading-[calc(45*var(--u))] tracking-[-0.06em] whitespace-nowrap"
      style={at(47, y)}
    >
      {children}
    </h2>
  );
}

/** Mobile body copy (Helvetica, sage); the intro runs larger than the other blocks. */
function MobileCopy({
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
        "font-helvetica-regular text-sage absolute top-(--y) left-(--x) w-(--w) text-[length:calc(10*var(--u))] leading-[calc(11*var(--u))] tracking-[0.02em] [&_p+p]:mt-[calc(11*var(--u))]",
        className,
      )}
      style={at(x, y, w)}
    >
      {children}
    </div>
  );
}

/** Mobile "ROLE  Name" credit; the role column is fixed so names line up. */
function MobileCredit({ role, name, y }: { role: ReactNode; name: string; y: number }) {
  return (
    <p
      className="font-helvetica-regular text-sage absolute top-(--y) left-(--x) w-(--w) text-[length:calc(12*var(--u))] leading-[calc(14*var(--u))] tracking-[0.02em] uppercase"
      style={at(62, y, 300)}
    >
      <span className="font-helvetica absolute top-0 left-0 font-bold">{role}</span>
      <span className="ml-[calc(139*var(--u))] block">{name}</span>
    </p>
  );
}

/*
  Mobile frame (390 wide). Below md the page is two stacked canvases at
  1 Figma px = 100cqw / 390: the hero + intro (which grows when "Read more" is
  opened, pushing the second canvas down) and everything below it. From md up
  the existing flow / xl canvas layout is used unchanged.
*/
function LaheLifeMobile() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="@container md:hidden">
      <div className="relative [--u:calc(100cqw/390)]">
        {/* ============ HERO + INTRO (mobile y 0 - 1200) ============ */}
        <section className="relative pt-[calc(929*var(--u))] pb-[calc(36*var(--u))]">
          <div className="absolute top-0 left-0 h-[calc(700*var(--u))] w-full overflow-hidden bg-black">
            {/* The mobile hero is taller than the landscape asset: it keeps the asset's scale and the black frame fills the rest. */}
            <OptimizedImage
              src={`${IMG}/1.png`}
              alt="A cargo ship crossing the water, seen through a ship's window"
              width={1920}
              height={1104}
              priority
              sizes="100vw"
              className="absolute top-[calc(17*var(--u))] left-[calc(-336*var(--u))] h-auto w-[calc(985*var(--u))] max-w-none"
            />
            <p className="font-helvetica absolute top-[calc(91*var(--u))] w-full text-center text-[length:calc(15*var(--u))] leading-[calc(18*var(--u))] font-bold tracking-[0.02em] text-white uppercase opacity-80">
              AJC in Assam / অসম
            </p>
            <p className="font-helvetica absolute top-[calc(616*var(--u))] w-full text-center text-[length:calc(15*var(--u))] leading-[calc(18*var(--u))] font-bold tracking-[0.05em] text-white uppercase opacity-80">
              2026 / ২০২৬
            </p>
          </div>
          <h1
            className="font-cormorant text-taupe absolute top-(--y) left-(--x) text-[length:calc(45*var(--u))] leading-[calc(45*var(--u))] tracking-[-0.06em] whitespace-nowrap"
            style={at(47, 778)}
          >
            Lahé Life
          </h1>
          <p
            className="font-helvetica-regular text-taupe absolute top-(--y) left-(--x) w-(--w) text-[length:calc(12*var(--u))] leading-[calc(14*var(--u))] tracking-[0.02em] uppercase opacity-80"
            style={at(55, 864, 150)}
          >
            Brand Identity Narrative
          </p>
          <div className="relative ml-[calc(81*var(--u))] w-[calc(252*var(--u))]">
            <div className="font-helvetica-regular text-sage relative text-[length:calc(11*var(--u))] leading-[calc(13*var(--u))] tracking-[0.01em] [&_p+p]:mt-[calc(13*var(--u))]">
              <p>
                Lahé Life is a conscious collection defined by the philosophy of the slow and the
                stewardship of the land. Born from the Assamese way of life where time moves gently,
                it is a crossover of heritage hospitality with the modern sensibility of the present
                day.
              </p>
              <p>
                With roots in a forty-year legacy of exploration, the brand pairs a deep-seated
                regional soul with a collection of ventures that feel familiar and
                <br />
                easy to return to. From the unhurried journeys of Assam Bengal Navigation along the
                Ganges and Brahmaputra rivers to the immersive sanctuary on land of Diphlu River
                Lodge, every experience is shaped by a quiet intimacy with the surroundings.
              </p>
              {expanded && (
                <>
                  <p>
                    This culture of presence is carried forward by Jungle Travels India through
                    decades of regional knowledge, and preserved by Lahé Looms through a
                    contemporary approach to sustainable craft. In spaces like Laheké Cafe, this
                    rhythm is brought into an urban setting, bridging the local supply chain with a
                    refined, considered aesthetic.
                  </p>
                  <p>
                    The best experiences of Lahé are the ones that are rooted; they offer a way of
                    experiencing Eastern India – thoughtfully, slowly, and with a profound sense of
                    place.
                  </p>
                </>
              )}
              {/* Same cream veil as desktop: fades the last three collapsed lines */}
              {!expanded && (
                <div
                  aria-hidden
                  className="bg-cream/66 pointer-events-none absolute inset-x-0 bottom-0 h-[calc(39*var(--u))]"
                />
              )}
            </div>
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              className="group/readmore font-helvetica text-sage mt-[calc(26*var(--u))] block cursor-pointer text-left text-[length:calc(11*var(--u))] leading-[calc(14*var(--u))] font-bold tracking-[0.02em]"
            >
              <ReadMoreLabel expanded={expanded} />
            </button>
          </div>
        </section>

        {/* ============ EVERYTHING BELOW (mobile y 1200 - 4656; y values below are minus 1200) ============ */}
        <section className="relative h-[calc(3456*var(--u))]">
          <MobileHeading y={51}>Identity</MobileHeading>
          <OptimizedImage
            src={`${IMG}/2.png`}
            alt="The Lahé Life logo: a cluster of curved reeds above the wordmark, shown on its construction grid"
            width={625}
            height={513}
            sizes="100vw"
            className="absolute top-(--y) left-(--x) h-auto w-(--w)"
            style={at(86, 175, 220)}
          />

          <MobileHeading y={458}>Iconography</MobileHeading>
          <MobileCopy x={59} y={544} w={216}>
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
          </MobileCopy>
          <OptimizedImage
            src={`${IMG}/3.png`}
            alt="The Lahé Life symbol: curved reed stems rising from a shared root"
            width={303}
            height={265}
            sizes="115px"
            className="absolute top-(--y) left-(--x) h-auto w-(--w)"
            style={at(215, 778, 115)}
          />

          <MobileHeading y={980}>Color Palette</MobileHeading>
          <div className="absolute top-[calc(1095*var(--u))] left-0 h-[calc(281*var(--u))] w-full overflow-hidden">
            <OptimizedImage
              src={`${IMG}/4.png`}
              alt="Dark, rippling water"
              width={1920}
              height={1080}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="absolute top-[calc(1198*var(--u))] left-[calc(33*var(--u))] grid w-[calc(324*var(--u))] grid-cols-6">
            <div className="col-span-3 h-[calc(38*var(--u))] rounded-t-[3px] bg-[#776d63]" />
            <div className="col-span-3 h-[calc(38*var(--u))] rounded-t-[3px] bg-[#706851]" />
            <div className="col-span-6 h-[calc(18*var(--u))] bg-[#fff6ed]" />
            <div className="col-span-2 h-[calc(23*var(--u))] rounded-bl-[3px] bg-[#4d4645]" />
            <div className="col-span-2 h-[calc(23*var(--u))] bg-[#3863a3]" />
            <div className="col-span-2 h-[calc(23*var(--u))] rounded-br-[3px] bg-[#836541]" />
          </div>
          <MobileCopy x={59} y={1437} w={216}>
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
          </MobileCopy>

          <MobileHeading y={1679}>Brand Pillars</MobileHeading>
          <PillarGrid className="absolute top-[calc(1794*var(--u))] left-0 grid w-full grid-cols-3 gap-[calc(7*var(--u))] [&>img]:h-[calc(190*var(--u))] [&>img]:w-full [&>img]:object-cover" />

          <MobileHeading y={2647}>Brand Assets</MobileHeading>
          <OptimizedImage
            src={`${IMG}/6.png`}
            alt="Lahé Life website mockup: the logo over a misty golden lake, with the Assam Bengal Navigation, Diphlu River Lodge, JTI Holidays and Lahe Looms marks below"
            width={1140}
            height={840}
            sizes="100vw"
            className="absolute top-[calc(2755*var(--u))] left-0 h-[calc(290*var(--u))] w-full object-cover"
          />

          <MobileHeading y={3098}>Team</MobileHeading>
          <MobileCredit role="Design Lead" name="Saksham Khanna" y={3175} />
          <MobileCredit
            role={
              <>
                Graphic
                <br />
                Design
              </>
            }
            name="Guna M"
            y={3211}
          />

          <p
            aria-hidden
            className="font-cormorant text-taupe absolute top-[calc(3270*var(--u))] w-full pr-[calc(10*var(--u))] text-center text-[length:calc(40*var(--u))] leading-[calc(40*var(--u))] font-bold"
          >
            &gt;
          </p>
          <Link
            href="/work/assam-bengal-navigation"
            className="font-cormorant text-taupe absolute top-[calc(3318*var(--u))] w-full text-center text-[length:calc(40*var(--u))] leading-[calc(40*var(--u))] tracking-[-0.06em]"
          >
            Next Project
          </Link>
          <p className="font-helvetica-regular text-sage absolute top-[calc(3375*var(--u))] w-full text-center text-[length:calc(11*var(--u))] leading-[calc(14*var(--u))] tracking-[0.02em] uppercase">
            Assam Bengal Navigation
          </p>
        </section>
      </div>
    </div>
  );
}

export function LaheLifePage() {
  const [introExpanded, setIntroExpanded] = useState(false);

  return (
    <div className="bg-cream @container relative mx-auto w-full max-w-[1920px] overflow-hidden [--u:calc(100cqw/1920)]">
      <LaheLifeMobile />

      <div className="relative hidden flex-col gap-6 pb-20 md:flex xl:block xl:h-[calc(11500*var(--u))] xl:pb-0">
        {/* ============ HERO (1920 x 1104) ============ */}
        <section className="relative aspect-[1920/1104] w-full xl:absolute xl:top-0 xl:left-0 xl:aspect-auto xl:h-[calc(1104*var(--u))]">
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
          <p className="font-helvetica absolute right-6 bottom-6 text-right text-sm font-bold tracking-[0.04em] text-white uppercase opacity-80 xl:top-[calc(499*var(--u))] xl:right-auto xl:bottom-auto xl:left-[calc(1469*var(--u))] xl:w-[calc(348*var(--u))] xl:text-[length:calc(28*var(--u))] xl:tracking-[calc(0.56*var(--u))]">
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
            className="group/readmore font-helvetica text-sage mt-3 block cursor-pointer text-left font-bold xl:mt-[calc(30*var(--u))]"
          >
            <ReadMoreLabel expanded={introExpanded} />
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
        <PillarGrid
          className="mx-6 grid grid-cols-2 gap-3 xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:grid-cols-3 xl:gap-x-[calc(33*var(--u))] xl:gap-y-[calc(30*var(--u))] [&>img]:h-auto [&>img]:w-full"
          style={at(109, 6200, 1674)}
        />

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
