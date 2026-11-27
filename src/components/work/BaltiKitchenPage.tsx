"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { ReadMoreLabel } from "@/components/ui/ReadMoreLabel";
import { assetPath, at, cn, u } from "@/lib/utils";

/*
  Balti Kitchen — reproduction of the Figma project-page frame "Balti Kitchen"
  (node 2823:2478, 1920 wide) for AJC-30.

  Same technique as Lahé Life / Hospitality: from xl up the frame is a scaled
  canvas where `--u` = 1 Figma px = 100cqw / 1920 and each element sits at its
  Figma coordinates (`at(x, y, w)` + `xl:left-(--x) xl:top-(--y)`). Below xl the
  same elements stack in normal flow (the design has no mobile frame).

  Figma note "Illustrations to change every 0.5 seconds": the five line
  illustrations (illus-1..5) cycle in the slot beside the shelf photo.
*/

// String srcs are not basePath-prefixed by next/image, so prefix them here
// (required on GitHub Pages, which serves the site under a subpath).
const IMG = assetPath("/images/projects/balti-kitchen");

/** Figma note: illustrations change every 0.5 seconds. */
const CYCLE_MS = 500;

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
        "font-helvetica-regular px-6 text-base leading-[1.45] tracking-[0.02em] text-[#9b8866] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:px-0 xl:text-[length:calc(20*var(--u))] xl:leading-[1.15] xl:tracking-[calc(0.4*var(--u))] [&_p+p]:mt-[1.15em]",
        className,
      )}
      style={at(x, y, w)}
    >
      {children}
    </div>
  );
}

/** One "ROLE  Name" pair in the Team block. `y` differs per row. */
function Credit({ role, name, y }: { role: string; name: string; y: number }) {
  return (
    <p
      className="text-sm tracking-[0.02em] text-[#9b8866] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:text-[length:calc(20*var(--u))] xl:leading-[normal] xl:tracking-[calc(0.4*var(--u))] xl:whitespace-nowrap"
      style={at(954, y, 205)}
    >
      <span className="font-helvetica mr-3 font-bold xl:mr-0 xl:inline-block xl:w-(--w)">
        {role}
      </span>
      <span className="font-helvetica-regular">{name}</span>
    </p>
  );
}

/** The cycling line illustrations (Figma node "Illustrations", ~210 x 190). */
function CyclingIllustration({
  className = "relative mx-auto my-6 h-36 w-40 xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-[calc(190*var(--u))] xl:w-(--w)",
  style = at(1306, 4845, 210),
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Respect reduced-motion: keep the first illustration still.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % 5), CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div aria-hidden className={className} style={style}>
      {[1, 2, 3, 4, 5].map((n, i) => (
        <OptimizedImage
          key={n}
          src={`${IMG}/illus-${n}.png`}
          alt=""
          width={250}
          height={190}
          sizes="(min-width: 1920px) 210px, 160px"
          className={cn(
            "absolute inset-0 h-full w-full object-contain",
            i === active ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </div>
  );
}

/** Mobile section title (Cormorant 45, tracking -6%) at a mobile-frame (x, y). */
function MobileHeading({ children, x = 50, y }: { children: ReactNode; x?: number; y: number }) {
  return (
    <h2
      className="font-cormorant text-taupe absolute top-(--y) left-(--x) text-[length:calc(45*var(--u))] leading-[calc(45*var(--u))] tracking-[-0.06em] whitespace-nowrap"
      style={at(x, y)}
    >
      {children}
    </h2>
  );
}

/** Mobile body copy (Helvetica 11 / 13, #a69576) at a mobile-frame (x, y). */
function MobileCopy({ children, y, w = 268 }: { children: ReactNode; y: number; w?: number }) {
  return (
    <p
      className="font-helvetica-regular absolute top-(--y) left-(--x) w-(--w) text-[length:calc(11*var(--u))] leading-[calc(13*var(--u))] tracking-[0.02em] text-[#a69576]"
      style={at(81, y, w)}
    >
      {children}
    </p>
  );
}

/** A photo cropped to a mobile box: `img` is the rendered photo width and its offset inside the box. */
function MobilePic({
  file,
  alt,
  box: [x, y, w, h],
  img: [iw, ix = 0, iy = 0],
  intrinsic,
  priority,
}: {
  file: string;
  alt: string;
  box: [x: number, y: number, w: number, h: number];
  img: [w: number, x?: number, y?: number];
  intrinsic: [w: number, h: number];
  priority?: boolean;
}) {
  return (
    <div
      className="absolute top-(--y) left-(--x) h-(--h) w-(--w) overflow-hidden"
      style={{ ...at(x, y, w), "--h": u(h) } as CSSProperties}
    >
      <OptimizedImage
        src={`${IMG}/${file}`}
        alt={alt}
        width={intrinsic[0]}
        height={intrinsic[1]}
        priority={priority}
        sizes="100vw"
        className="absolute top-(--iy) left-(--ix) h-auto w-(--iw) max-w-none"
        style={{ "--iw": u(iw), "--ix": u(ix), "--iy": u(iy) } as CSSProperties}
      />
    </div>
  );
}

/*
  Mobile frame "Balti Kitchen mob" (390 wide). Below md the page is two
  stacked canvases at 1 Figma px = 100cqw / 390: the hero + intro (which grows
  when "Read more" opens, pushing the rest down) and everything below it
  (mobile y 1231–5571; the y values there are rebased by mb()).
*/
const MB_TOP = 1231;
const mb = (y: number) => y - MB_TOP;

function BaltiKitchenMobile() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="@container md:hidden">
      <div className="relative [--u:calc(100cqw/390)]">
        {/* ============ HERO + INTRO ============ */}
        <section className="relative pt-[calc(978*var(--u))] pb-[calc(71*var(--u))]">
          {/* The mobile hero is portrait; the landscape asset is scaled to its height and centred on the woman. */}
          <MobilePic
            file="1.png"
            alt="A woman in a red shawl reaching for apples in an orchard, a woven basket on her arm"
            box={[0, 0, 390, 700]}
            img={[1241, -388, 0]}
            intrinsic={[1920, 1083]}
            priority
          />
          <p className="font-helvetica absolute top-[calc(86*var(--u))] w-full text-center text-[length:calc(15*var(--u))] leading-[calc(18*var(--u))] font-bold tracking-[0.02em] whitespace-pre text-white uppercase opacity-80">
            AJC in Ladakh{"  /  "}لداخ
          </p>
          <p className="font-helvetica absolute top-[calc(630*var(--u))] w-full text-center text-[length:calc(15*var(--u))] leading-[calc(18*var(--u))] font-bold tracking-[0.02em] text-white uppercase opacity-80">
            2025 / ٢٠٢٥
          </p>
          <h1
            className="font-cormorant text-taupe absolute top-(--y) left-(--x) text-[length:calc(45*var(--u))] leading-[calc(45*var(--u))] tracking-[-0.06em] whitespace-nowrap"
            style={at(49, 802)}
          >
            Balti Kitchen
          </h1>
          <p
            className="font-helvetica-regular absolute top-(--y) left-(--x) w-(--w) text-[length:calc(12*var(--u))] leading-[calc(14*var(--u))] tracking-[0.02em] text-[#836b43] uppercase"
            style={at(55, 875, 200)}
          >
            Brand Identity
            <br />
            Narrative
            <br />
            Menu Design
          </p>
          <div className="relative ml-[calc(81*var(--u))] w-[calc(262*var(--u))]">
            <div className="font-helvetica-regular text-sage relative text-[length:calc(11*var(--u))] leading-[calc(13*var(--u))] tracking-[0.02em] [&_p+p]:mt-[calc(13*var(--u))]">
              <p>
                Ladakh’s Turtuk village was our home for the latter half of 2024. Turtuk is a lush
                land of greens cradled between the stark, colossal mountains of Ladakh. There, you
                see buckwheat fields swaying at the slightest breeze and local farmer-women at work,
                beautifully unbothered by the summer sun.
              </p>
              <p className={cn(!expanded && "max-h-[calc(52*var(--u))] overflow-hidden")}>
                In a parallel vision, there was I, who would often be tempted to take a walk up the
                mountain paths to reach the village. Knowing me, my walks invariably led me to Balti
                Kitchen, where the finest local cuisine in town was to be found. Run by Hajira Khan,
                the first female entrepreneur from the village, Balti Kitchen is a space where the
                ancient recipes of Baltistan live on through the day. Cooked to this day in
                traditional stone pots, her herbed, mellow, yet deeply flavorful food became the
                very birthplace of Balti Kitchen’s new identity.
              </p>
              {/* Same cream veil as desktop, over the four preview lines of paragraph 2 */}
              {!expanded && (
                <div
                  aria-hidden
                  className="bg-cream/66 pointer-events-none absolute inset-x-0 bottom-0 h-[calc(52*var(--u))]"
                />
              )}
            </div>
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              className="group/readmore font-helvetica text-sage mt-[calc(26*var(--u))] block cursor-pointer text-left text-[length:calc(11*var(--u))] leading-[calc(13*var(--u))] font-bold tracking-[0.02em]"
            >
              <ReadMoreLabel expanded={expanded} />
            </button>
          </div>
        </section>

        {/* ============ MENU COVER … NEXT PROJECT ============ */}
        <section className="relative h-[calc(4340*var(--u))]">
          <MobilePic
            file="2.png"
            alt="The Balti Kitchen menu cover, an arched frame with the logo, resting on a wooden table"
            box={[0, mb(1231), 390, 291]}
            img={[517, -60, 0]}
            intrinsic={[1920, 1080]}
          />

          <MobileHeading y={mb(1609)}>Identity</MobileHeading>
          <OptimizedImage
            src={`${IMG}/3.png`}
            alt="The Balti Kitchen logo: a scalloped Mehrab arch over a shelf of kitchen utensils, shown on its construction grid"
            width={531}
            height={471}
            sizes="186px"
            className="absolute top-(--y) left-(--x) h-auto w-(--w)"
            style={at(102, mb(1695), 186)}
          />
          <MobileCopy y={mb(1909)}>
            Borrowed from ancient traditions, the identity is as symbolic as it is literal. Drawing
            from the historic kitchens and traditional utensils of Baltistan, the logo comes
            together beneath a Mehrab – an arch native to Islamic architecture often used on
            entryways. Here, it acts as a visual gateway, welcoming everyone into a world of revived
            ancient culinary traditions within modern-day Ladakh.
          </MobileCopy>
          <CyclingIllustration
            className="absolute top-(--y) left-(--x) h-[calc(56*var(--u))] w-(--w)"
            style={at(165, mb(2072), 62)}
          />
          <MobilePic
            file="4.png"
            alt="Brass and clay pots stacked on weathered wooden shelves"
            box={[0, mb(2185), 390, 200]}
            img={[390, 0, -100]}
            intrinsic={[917, 1030]}
          />

          <MobileHeading y={mb(2438)}>Color Palette</MobileHeading>
          <MobilePic
            file="5.png"
            alt="A terracotta tile set into a plaster wall"
            box={[11, mb(2526), 368, 226]}
            img={[368, 0, -27]}
            intrinsic={[915, 697]}
          />
          <div className="absolute top-[calc(1387*var(--u))] left-[calc(65*var(--u))] flex h-[calc(41*var(--u))] w-[calc(266*var(--u))]">
            <div className="w-[calc(88*var(--u))] bg-[#9a796a]" />
            <div className="w-[calc(90*var(--u))] bg-[#e0d0c7]" />
            <div className="w-[calc(88*var(--u))] border border-[#836b43] bg-[#fbfbf9]" />
          </div>
          <MobilePic
            file="6.png"
            alt="Earthen water pots lined up against a sunlit mud wall"
            box={[0, mb(2771), 390, 299]}
            img={[393, -1, 0]}
            intrinsic={[915, 697]}
          />
          <MobileCopy y={mb(3105)}>
            Forming the color palette were the earthen pots made of mud, rock, and clay from a time
            when women ruled the hearth and men crafted the intricate woodwork for which the region
            is famous. Because the natural hue of mud coincides beautifully with the deep tones of
            oak and native timber, the visual inspiration came together seamlessly – paying homage
            to the collective ancestral skills that brought Balti Kitchen to the world.
          </MobileCopy>
          <MobilePic
            file="7.png"
            alt="Hands cupping a stone mortar filled with dried apricots"
            box={[0, mb(3278), 390, 497]}
            img={[880, -329, 0]}
            intrinsic={[1914, 1081]}
          />
          <OptimizedImage
            src={`${IMG}/7-logo.png`}
            alt="The Balti Kitchen logo: a carved double door under a Mehrab arch, in white"
            width={406}
            height={426}
            sizes="153px"
            className="absolute top-(--y) left-(--x) h-auto w-(--w)"
            style={at(120, mb(3445), 153)}
          />

          <MobileHeading y={mb(3846)}>Menu Design</MobileHeading>
          <OptimizedImage
            src={`${IMG}/8.png`}
            alt="Menu card “Our Story”: Nestled in the lush green Himalayas lies The Balti Kitchen in Turtuk"
            width={441}
            height={624}
            sizes="93px"
            className="absolute top-(--y) left-(--x) h-auto w-(--w)"
            style={at(41, mb(3947), 93)}
          />
          <OptimizedImage
            src={`${IMG}/9.png`}
            alt="Menu card “Fayoul-lee-Chonma, Fresh from the Farm”, listing farm salads and a seasonal fruit bowl"
            width={442}
            height={625}
            sizes="93px"
            className="absolute top-(--y) left-(--x) h-auto w-(--w)"
            style={at(142, mb(3947), 93)}
          />
          <OptimizedImage
            src={`${IMG}/10.png`}
            alt="Menu card “Zann-Tohn, Baltistani Cuisine”, listing Moskot, Mamtu, Squu and other dishes"
            width={441}
            height={624}
            sizes="93px"
            className="absolute top-(--y) left-(--x) h-auto w-(--w)"
            style={at(243, mb(3947), 93)}
          />
          <MobileCopy y={mb(4119)}>
            The menu came through with many conversations and some very filling meals. The
            descriptions were key for an entirely tourist audience, and hence, we did tastings; what
            we ate is what we wrote. When it all came together, there it was, a quiet, defining
            essence on the footer: ‘With love from Baltistan’.
          </MobileCopy>
          <MobilePic
            file="11.png"
            alt="A hand turning a printed menu on a wooden table"
            box={[0, mb(4250), 195, 318]}
            img={[292, -48, 0]}
            intrinsic={[936, 1020]}
          />
          <MobilePic
            file="12.png"
            alt="The Zann-Tohn menu card lying on a sunlit wooden table"
            box={[200, mb(4250), 190, 318]}
            img={[273, -41, 0]}
            intrinsic={[875, 1020]}
          />

          <MobileHeading y={mb(4638)}>Features</MobileHeading>
          <a
            href="https://www.architecturaldigest.in/story/a-well-curated-regional-meal-awaits-you-in-ladakhs-prettiest-village-turtuk-best-restaurants-leh-where-to-eat/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-[calc(3493*var(--u))] left-0 block h-[calc(474*var(--u))] w-full overflow-hidden"
          >
            <OptimizedImage
              src={`${IMG}/13.png`}
              alt=""
              width={1897}
              height={1121}
              sizes="100vw"
              className="absolute top-0 left-[calc(-191*var(--u))] h-auto w-[calc(802*var(--u))] max-w-none"
            />
            {/* Same drawn-on Architectural Digest card as desktop, at the mobile coordinates. */}
            <span
              aria-hidden
              className="font-cormorant absolute top-[calc(30*var(--u))] left-[calc(41*var(--u))] text-[length:calc(54*var(--u))] leading-[calc(54*var(--u))] tracking-[-0.2em] text-white"
            >
              AD
            </span>
            <span className="absolute top-[calc(338*var(--u))] left-[calc(31*var(--u))] block w-[calc(270*var(--u))] text-white">
              <span className="font-cormorant block text-[length:calc(19*var(--u))] leading-[calc(22*var(--u))]">
                A well-curated regional meal awaits
                <br />
                you in Ladakh’s prettiest village, Turtuk
              </span>
              <span className="font-helvetica mt-[calc(25*var(--u))] block text-[length:calc(12*var(--u))] leading-[calc(14*var(--u))] font-bold">
                Read more
              </span>
            </span>
          </a>

          <MobileHeading y={mb(5233)}>Team</MobileHeading>
          <p className="text-sage absolute top-[calc(4079*var(--u))] left-[calc(62*var(--u))] text-[length:calc(12*var(--u))] leading-[calc(14*var(--u))] tracking-[0.02em] whitespace-nowrap uppercase">
            <span className="font-helvetica inline-block w-[calc(138*var(--u))] font-bold">
              Photography
            </span>
            <span className="font-helvetica-regular">Avani Rai</span>
          </p>
          <p className="text-sage absolute top-[calc(4112*var(--u))] left-[calc(60*var(--u))] text-[length:calc(12*var(--u))] leading-[calc(14*var(--u))] tracking-[0.02em] whitespace-nowrap uppercase">
            <span className="font-helvetica inline-block w-[calc(140*var(--u))] font-bold">
              Visual Design
            </span>
            <span className="font-helvetica-regular">Praneet Selva</span>
          </p>

          <p
            aria-hidden
            className="font-cormorant text-taupe absolute top-[calc(4159*var(--u))] w-full pr-[calc(10*var(--u))] text-center text-[length:calc(40*var(--u))] leading-[calc(40*var(--u))]"
          >
            &gt;
          </p>
          <Link
            href="/work/virsa-baltistan"
            className="font-cormorant text-taupe absolute top-[calc(4208*var(--u))] w-full text-center text-[length:calc(40*var(--u))] leading-[calc(40*var(--u))] tracking-[-0.06em]"
          >
            Next Project
          </Link>
          <p className="font-helvetica-regular text-sage absolute top-[calc(4265*var(--u))] w-full text-center text-[length:calc(11*var(--u))] leading-[calc(13*var(--u))] tracking-[0.02em] uppercase">
            Virsa Baltistan
          </p>
        </section>
      </div>
    </div>
  );
}

export function BaltiKitchenPage() {
  const [introExpanded, setIntroExpanded] = useState(false);

  return (
    <div className="bg-cream @container relative mx-auto w-full max-w-[1920px] overflow-hidden [--u:calc(100cqw/1920)]">
      <BaltiKitchenMobile />

      <div className="relative hidden flex-col gap-6 pb-20 md:flex xl:block xl:h-[calc(12225*var(--u))] xl:pb-0">
        {/* ============ HERO (1920 x 1083) ============ */}
        <section className="relative aspect-[1920/1083] w-full xl:absolute xl:top-0 xl:left-0 xl:aspect-auto xl:h-[calc(1083*var(--u))]">
          <OptimizedImage
            src={`${IMG}/1.png`}
            alt="A woman in a red shawl reaching for apples in an orchard, a woven basket on her arm"
            width={1920}
            height={1083}
            priority
            sizes="(min-width: 1920px) 1920px, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <p className="font-helvetica absolute bottom-6 left-6 text-sm font-bold tracking-[0.04em] text-white uppercase opacity-80 xl:top-[calc(508*var(--u))] xl:bottom-auto xl:left-[calc(103*var(--u))] xl:w-[calc(348*var(--u))] xl:text-[length:calc(28*var(--u))] xl:tracking-[calc(0.56*var(--u))]">
            2025 / ٢٠٢٥
          </p>
          <p className="font-helvetica absolute right-6 bottom-6 text-right text-sm font-bold tracking-[0.04em] text-white uppercase opacity-80 xl:top-[calc(508*var(--u))] xl:right-auto xl:bottom-auto xl:left-[calc(1469*var(--u))] xl:w-[calc(348*var(--u))] xl:text-[length:calc(28*var(--u))] xl:tracking-[calc(0.56*var(--u))]">
            AJC in Ladakh / لداخ
          </p>
        </section>

        {/* ============ TITLE + INTRO ============ */}
        <h1
          className="font-cormorant text-taupe mt-10 px-6 text-6xl leading-none tracking-[-0.06em] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:p-0 xl:text-[length:calc(97*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-5.82*var(--u))] xl:whitespace-nowrap"
          style={at(108, 1225)}
        >
          Balti Kitchen
        </h1>
        <p
          className="font-helvetica-regular px-6 text-lg tracking-[0.02em] text-[#9b8866] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:p-0 xl:text-[length:calc(28*var(--u))] xl:leading-[calc(32*var(--u))] xl:tracking-[calc(0.56*var(--u))]"
          style={at(109, 1357, 523)}
        >
          Brand Identity
          <br />
          Narrative
          <br />
          Menu Design
        </p>
        <Copy x={960} y={1357} w={570}>
          <div className="relative">
            <p
              className={cn(
                !introExpanded && "xl:max-h-[calc(230*var(--u))] xl:overflow-hidden",
                !introExpanded && "max-h-[9.5em] overflow-hidden",
              )}
            >
              Ladakh’s Turtuk village was our home for the latter half of 2024. Turtuk is a lush
              land of greens cradled between the stark, colossal mountains of Ladakh. There, you see
              buckwheat fields swaying at the slightest breeze and local farmer-women at work,
              beautifully unbothered by the summer sun. In a parallel vision, there was I, who would
              often be tempted to take a walk up the mountain paths to reach the village. Knowing
              me, my walks invariably led me to Balti Kitchen, where the finest local cuisine in
              town was to be found. Run by Hajira Khan, the first female entrepreneur from the
              village, Balti Kitchen is a space where the ancient recipes of Baltistan live on
              through the day. Cooked to this day in traditional stone pots, her herbed, mellow, yet
              deeply flavorful food became the very birthplace of Balti Kitchen’s new identity.
            </p>
            {/* Figma veil: cream fade over the last lines while collapsed */}
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
            className="group/readmore font-helvetica text-sage mt-3 block cursor-pointer text-left font-bold xl:mt-[calc(40*var(--u))]"
          >
            <ReadMoreLabel expanded={introExpanded} />
          </button>
        </Copy>

        {/* ============ MENU COVER PHOTO (1920 x 1080) ============ */}
        <OptimizedImage
          src={`${IMG}/2.png`}
          alt="The Balti Kitchen menu cover, an arched frame with the logo, resting on a wooden table"
          width={1920}
          height={1080}
          sizes="(min-width: 1920px) 1920px, 100vw"
          className="h-auto w-full xl:absolute xl:top-(--y) xl:left-0 xl:w-(--w)"
          style={at(0, 1981, 1920)}
        />

        {/* ============ IDENTITY ============ */}
        <Heading y={3155}>Identity</Heading>
        <OptimizedImage
          src={`${IMG}/3.png`}
          alt="The Balti Kitchen logo: a scalloped Mehrab arch over a shelf of kitchen utensils, shown on its construction grid"
          width={531}
          height={471}
          sizes="(min-width: 1920px) 531px, 70vw"
          className="mx-auto h-auto w-64 xl:absolute xl:top-(--y) xl:left-(--x) xl:mx-0 xl:w-(--w)"
          style={at(697, 3412, 531)}
        />
        <Copy x={975} y={4003} w={590}>
          <p>
            Borrowed from ancient traditions, the identity is as symbolic as it is literal. Drawing
            from the historic kitchens and traditional utensils of Baltistan, the logo comes
            together beneath a Mehrab – an arch native to Islamic architecture often used on
            entryways. Here, it acts as a visual gateway, welcoming everyone into a world of revived
            ancient culinary traditions within modern-day Ladakh.
          </p>
        </Copy>

        {/* ============ KITCHEN PHOTOS + CYCLING ILLUSTRATION ============ */}
        <OptimizedImage
          src={`${IMG}/4.png`}
          alt="Brass and clay pots stacked on weathered wooden shelves"
          width={917}
          height={1030}
          sizes="(min-width: 1920px) 917px, 100vw"
          className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
          style={at(36, 4425, 917)}
        />
        <CyclingIllustration />
        <OptimizedImage
          src={`${IMG}/5.png`}
          alt="A terracotta tile set into a plaster wall"
          width={915}
          height={697}
          sizes="(min-width: 1920px) 915px, 100vw"
          className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
          style={at(36, 5493, 915)}
        />
        {/* Figma "Group 52": three-tone strip over the tile photo */}
        <div
          className="mx-auto flex h-12 w-64 xl:absolute xl:top-(--y) xl:left-(--x) xl:mx-0 xl:h-[calc(78*var(--u))] xl:w-(--w)"
          style={at(245, 5802, 495)}
        >
          <div className="w-1/3 bg-[#9a796a]" />
          <div className="w-1/3 bg-[#e0d0c7]" />
          <div className="w-1/3 border border-[#b59a62] bg-[#fbfbf9]" />
        </div>
        <OptimizedImage
          src={`${IMG}/6.png`}
          alt="Earthen water pots lined up against a sunlit mud wall"
          width={915}
          height={697}
          sizes="(min-width: 1920px) 915px, 100vw"
          className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
          style={at(975, 5493, 915)}
        />

        {/* ============ COLOUR PALETTE ============ */}
        <Heading y={6275} x={104}>
          Colour Palette
        </Heading>
        <Copy x={975} y={6340} w={590}>
          <p>
            Forming the color palette were the earthen pots made of mud, rock, and clay from a time
            when women ruled the hearth and men crafted the intricate woodwork for which the region
            is famous. Because the natural hue of mud coincides beautifully with the deep tones of
            oak and native timber, the visual inspiration came together seamlessly – paying homage
            to the collective ancestral skills that brought Balti Kitchen to the world.
          </p>
        </Copy>
        <OptimizedImage
          src={`${IMG}/7.png`}
          alt="Hands cupping a stone mortar filled with dried apricots"
          width={1914}
          height={1081}
          sizes="(min-width: 1920px) 1914px, 100vw"
          className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
          style={at(3, 6625, 1914)}
        />
        <OptimizedImage
          src={`${IMG}/7-logo.png`}
          alt="The Balti Kitchen logo: a carved double door under a Mehrab arch, in white"
          width={406}
          height={426}
          sizes="(min-width: 1920px) 406px, 50vw"
          className="mx-auto -mt-[60%] h-auto w-48 xl:absolute xl:top-(--y) xl:left-(--x) xl:mx-0 xl:mt-0 xl:w-(--w)"
          style={at(757, 6955, 406)}
        />

        {/* ============ MENU DESIGN ============ */}
        <div className="mx-6 mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 xl:contents">
          <OptimizedImage
            src={`${IMG}/8.png`}
            alt="Menu card “Our Story”: Nestled in the lush green Himalayas lies The Balti Kitchen in Turtuk"
            width={441}
            height={624}
            sizes="(min-width: 1920px) 441px, 33vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(268, 7964, 441)}
          />
          <OptimizedImage
            src={`${IMG}/9.png`}
            alt="Menu card “Fayoul-lee-Chonma, Fresh from the Farm”, listing farm salads and a seasonal fruit bowl"
            width={442}
            height={625}
            sizes="(min-width: 1920px) 442px, 33vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(739, 7964, 442)}
          />
          <OptimizedImage
            src={`${IMG}/10.png`}
            alt="Menu card “Zann-Tohn, Baltistani Cuisine”, listing Moskot, Mamtu, Squu and other dishes"
            width={441}
            height={624}
            sizes="(min-width: 1920px) 441px, 33vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(1211, 7964, 441)}
          />
        </div>
        <Heading y={8760}>Menu Design</Heading>
        <Copy x={975} y={8830} w={590}>
          <p>
            The menu came through with many conversations and some very filling meals. The
            descriptions were key for an entirely tourist audience, and hence, we did tastings; what
            we ate is what we wrote. When it all came together, there it was, a quiet, defining
            essence on the footer: ‘With love from Baltistan’.
          </p>
        </Copy>
        <OptimizedImage
          src={`${IMG}/11.png`}
          alt="A hand turning a printed menu on a wooden table"
          width={936}
          height={1020}
          sizes="(min-width: 1920px) 936px, 100vw"
          className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
          style={at(36, 9122, 936)}
        />
        <OptimizedImage
          src={`${IMG}/12.png`}
          alt="The Zann-Tohn menu card lying on a sunlit wooden table"
          width={875}
          height={1020}
          sizes="(min-width: 1920px) 875px, 100vw"
          className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
          style={at(1015, 9122, 875)}
        />

        {/* ============ FEATURES ============ */}
        <Heading y={10240} x={104}>
          Features
        </Heading>
        <a
          href="https://www.architecturaldigest.in/story/a-well-curated-regional-meal-awaits-you-in-ladakhs-prettiest-village-turtuk-best-restaurants-leh-where-to-eat/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative mx-6 block xl:absolute xl:top-(--y) xl:left-(--x) xl:mx-0 xl:w-(--w)"
          style={at(12, 10420, 1897)}
        >
          <OptimizedImage
            src={`${IMG}/13.png`}
            alt=""
            width={1897}
            height={1121}
            sizes="(min-width: 1920px) 1897px, 100vw"
            className="h-auto w-full"
          />
          {/* Architectural Digest card: the supplied photo has no text, so the
              wordmark, headline and link label are drawn here (Figma 2823:2478). */}
          <span
            aria-hidden
            className="font-cormorant absolute top-3 left-4 text-6xl leading-none tracking-[-0.08em] text-white xl:top-[calc(80*var(--u))] xl:left-[calc(96*var(--u))] xl:text-[length:calc(170*var(--u))]"
          >
            AD
          </span>
          <span className="absolute right-4 bottom-4 left-4 block text-white xl:top-[calc(842*var(--u))] xl:right-auto xl:bottom-auto xl:left-[calc(96*var(--u))] xl:w-[calc(830*var(--u))]">
            <span className="font-cormorant block text-xl leading-tight xl:text-[length:calc(56*var(--u))] xl:leading-[calc(56*var(--u))]">
              A well-curated regional meal awaits <br className="hidden xl:inline" />
              you in Ladakh’s prettiest village, Turtuk
            </span>
            <span className="font-helvetica mt-2 block text-sm font-bold xl:mt-[calc(21*var(--u))] xl:text-[length:calc(20*var(--u))]">
              Read more
            </span>
          </span>
        </a>

        {/* ============ TEAM ============ */}
        <Heading y={11650} x={104}>
          Team
        </Heading>
        <div className="flex flex-col gap-2 px-6 xl:contents">
          <Credit role="Photography" name="Avani Rai" y={11650} />
          <Credit role="Visual Design" name="Praneet Selva" y={11684} />
        </div>

        {/* ============ NEXT PROJECT ============ */}
        <div className="mt-10 flex flex-col items-center text-center xl:contents">
          <p
            aria-hidden
            className="font-cormorant text-taupe text-5xl leading-none font-bold xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-4.8*var(--u))]"
            style={at(905, 11815, 110)}
          >
            &gt;
          </p>
          <Link
            href="/work/virsa-baltistan"
            className="font-cormorant text-taupe block text-5xl leading-none tracking-[-0.06em] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-4.8*var(--u))]"
            style={at(654, 11885, 612)}
          >
            Next Project
          </Link>
          <p
            className="font-helvetica-regular text-sage mt-3 text-sm tracking-[0.02em] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:mt-0 xl:w-(--w) xl:text-[length:calc(20*var(--u))] xl:leading-[normal] xl:tracking-[calc(0.4*var(--u))] xl:whitespace-nowrap"
            style={at(817, 11994, 291)}
          >
            Virsa Baltistan
          </p>
        </div>
      </div>
    </div>
  );
}
