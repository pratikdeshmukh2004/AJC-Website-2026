import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroHeader } from "@/components/home/HeroHeader";
import { BandDots } from "@/components/home/BandDots";
import { assetPath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AJC is a creative consultancy shaped by stories, spaces, cultures, and the subtle art of observation.",
};

// String srcs are not basePath-prefixed by next/image, so prefix them here
// (required on GitHub Pages, which serves the site under a subpath).
const IMG = assetPath("/images/about");

/*
  Layout: pixel-faithful absolutely-positioned canvas (Figma frame
  "ABOUT US 22nd July 2026", width 1920). `--u` = 1 Figma px = 100cqw / 1920,
  so every Figma px is written `calc(<px>*var(--u))` and the whole layout
  scales proportionally with the viewport.
  Colors (Figma): cream #f8f7f2, body #8b7f73, wordmark #887a6c,
  services/clients #7d7062, divider/dots #978c7f.

  STICKY-TRACK PIN (Option 2 — why the page is split into three flow siblings):
  -------------------------------------------------------------------------
  The requested interaction PINS the river band in the viewport while the 7
  dots converge into a horizontal row, then releases to normal scrolling.
  `position: sticky` does nothing on an absolutely-positioned element (there is
  no in-flow box to stick within), so the band cannot stay an absolute child of
  one monolithic canvas and also be pinned. Instead the former single canvas is
  split into THREE flow siblings inside the `.page` container:

    1. TOP canvas  — Figma y 0..2397 (hero, intro lead, portrait, body copy).
       Height = calc(2397*var(--u)). Tops UNCHANGED from the original canvas.
    2. BAND TRACK  — a normal-flow <section data-band-track> taller than the
       viewport. Inside it a <div data-band-pin> is `position: sticky; top: 0`
       and holds a 1920x1080 "stage" with the band image, the headline and
       <BandDots/>. Scrolling through the track's extra height keeps the stage
       pinned while BandDots reads the track rect to drive dot progress 0->1.
    3. BOTTOM canvas — everything from Figma y 3477 downward (statement, wordmark,
       What We Do, Our Work, divider + dots, all 7 regions), with EVERY `top`
       rebased by -3477. Because every element below the band is rebased by the
       SAME constant, their mutual spacing, left offsets, widths and ordering
       are byte-for-byte identical to the original canvas — only their absolute
       document offset shifts (which is invisible: it was always `canvasTop +
       figmaY*u`, and the band track simply supplies that leading offset now via
       real flow instead of a fixed canvas height). All Playwright assertions
       (ordering, image-right-of-text, 3-column Ladakh, fonts/colors, headline)
       are relative/ordering checks and stay green.

  The band stage reuses the band's exact old box (1920x1080 at --u). The
  headline and dots keep their same visual placement over the band because they
  are re-expressed relative to the stage (old Figma top - 2397).
*/

// Per-region offset helper (Figma px → canvas units), set inline.
// `--u` is itself a length (100cqw/1920), so the Figma number is multiplied
// as a plain scalar: `calc(<n> * var(--u))`. Writing `<n>px * var(--u)` would
// be length×length and CSS calc() rejects it (resolving to 0).
const v = (px: number) => `calc(${px} * var(--u))`;

// The band spans Figma y 2397..3477; everything below is rebased by this.
const BAND_BOTTOM_FY = 3477;

// Dot markers on the Our Work divider line (Figma y), rebased to the bottom
// canvas (−BAND_BOTTOM_FY).
const DOT_TOPS = [5883, 6966, 8049, 9132, 10215, 11298, 12255, 13356].map(
  (t) => t - BAND_BOTTOM_FY,
);

// --- Shared Tailwind class fragments -------------------------------------
const BODY = "text-[#8b7f73]";
// Cormorant 47px / 48px line-height / -1% tracking, centered.
const DISPLAY_47 =
  "font-cormorant font-normal text-[#8b7f73] text-[length:calc(47*var(--u))] leading-[calc(48*var(--u))] tracking-[-0.01em]";
const CENTER_X = "left-1/2 -translate-x-1/2";
const SQUARE = `${CENTER_X} w-[calc(310*var(--u))] h-[calc(322*var(--u))]`;

// Extra scroll distance (beyond the pinned viewport height) the user travels
// while the band stays pinned and the dots converge. Larger = slower, more
// deliberate line-up. Tuned in the manual visual check.
const PIN_TRAVEL = "120vh";

const tw = {
  page: "@container mx-auto w-full max-w-[1920px] bg-[#f8f7f2] [--u:calc(100cqw/1920)]",
  // Top slice: Figma y 0..2397 (hero → body copy). Tops unchanged.
  canvasTop: "relative w-full h-[calc(2397*var(--u))]",
  // Bottom slice: Figma y 3477..14619 ⇒ height (14619-3477).
  canvasBottom: "relative w-full h-[calc((14619-3477)*var(--u))]",
  abs: "absolute",
  imgFit: "overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover",

  // Sticky band track + pinned stage.
  bandPin: "sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden",
  bandStage: "relative w-full h-[calc(1080*var(--u))]",

  // Hero (full-width 1920x1080) — top of the top slice.
  hero: "left-0 top-0 w-[calc(1920*var(--u))] h-[calc(1080*var(--u))]",
  // Band image fills the stage (stage is the band's old 1920x1080 box).
  band: "left-0 top-0 w-[calc(1920*var(--u))] h-[calc(1080*var(--u))]",

  // Intro lead (Cormorant 47px, centered)
  lead: `${CENTER_X} top-[calc(1225*var(--u))] w-[calc(610*var(--u))] text-center ${DISPLAY_47}`,

  // Portrait / What We Do square (310x322, centered)
  portrait: `${SQUARE} top-[calc(1490*var(--u))]`,
  wwdImage: `${SQUARE} top-[calc((4688-3477)*var(--u))]`,

  // Body copy (Helvetica 22px, +2% tracking, opacity 79%). Figma's text boxes
  // are sized for a 24px line box (120px box ≈ 5 lines), so wrapped lines use a
  // 24px line-height rather than the browser's looser "normal".
  body: `font-helvetica ${BODY} opacity-[0.79] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em]`,
  // Box widths widened a few px over the Figma box so the system-font fallback
  // reproduces Figma's exact line breaks (real Helvetica is slightly narrower).
  // Breaks are also pinned with <br/> in the JSX.
  bodyLeft: "left-[calc(239*var(--u))] top-[calc(1985*var(--u))] w-[calc(430*var(--u))]",
  bodyQuote: "left-[calc(768*var(--u))] top-[calc(1990*var(--u))] w-[calc(420*var(--u))]",
  bodyClosing: "left-[calc(768*var(--u))] top-[calc(2165*var(--u))] w-[calc(400*var(--u))]",
  bodyNote: "left-[calc(1195*var(--u))] top-[calc((4804-3477)*var(--u))] w-[calc(523*var(--u))]",

  // "worlds within worlds" (Cormorant SemiBold 55px, cream, over band). Now
  // stage-relative: old Figma top 2897 − band top 2397 = 500.
  bandHeadline: `${CENTER_X} top-[calc(500*var(--u))] w-[calc(632*var(--u))] text-center font-cormorant font-semibold text-[#f8f7f2] text-[length:calc(55*var(--u))] tracking-[calc(1.1*var(--u))]`,

  // Statement (Cormorant 47px, centered). 3918 − 3477 = 441.
  statement: `${CENTER_X} top-[calc((3918-3477)*var(--u))] w-[calc(946*var(--u))] text-center ${DISPLAY_47}`,

  // "ajc" wordmark (Helvetica 20px uppercase, centered, #887a6c). 4091 − 3477 = 614.
  wordmark: `${CENTER_X} top-[calc((4091-3477)*var(--u))] text-center uppercase font-helvetica text-[#887a6c] text-[length:calc(20*var(--u))] tracking-[calc(0.4*var(--u))]`,

  // Section titles (Cormorant 104px / 152px line-height / -6% tracking)
  sectionTitle: `w-[calc(610*var(--u))] font-cormorant font-normal ${BODY} text-[length:calc(104*var(--u))] leading-[calc(152*var(--u))] tracking-[-0.06em]`,
  whatWeDoTitle: "left-[calc(209*var(--u))] top-[calc((4511-3477)*var(--u))]",
  ourWorkTitle: "left-[calc(209*var(--u))] top-[calc((5620-3477)*var(--u))]",

  // Services list (Helvetica 28px uppercase / 156% line-height / +2% tracking, #7d7062, opacity 59%)
  services: `left-[calc(209*var(--u))] top-[calc((4766-3477)*var(--u))] w-[calc(523*var(--u))] uppercase font-helvetica text-[#7d7062] opacity-[0.59] text-[length:calc(28*var(--u))] leading-[1.56] tracking-[0.02em]`,

  // Discover More + underline (Helvetica 18px uppercase / 156% / +2%, #7d7062)
  discover: `left-[calc(1195*var(--u))] top-[calc((4990-3477)*var(--u))] uppercase font-helvetica text-[#7d7062] text-[length:calc(18*var(--u))] leading-[1.56] tracking-[0.02em]`,
  discoverRule:
    "left-[calc(1195*var(--u))] top-[calc((5016-3477)*var(--u))] w-[calc(163*var(--u))] h-[calc(2*var(--u))] bg-[#7d7062]",

  // Our Work divider + dots (#978c7f). 5892 − 3477 = 2415.
  divider:
    "left-[calc(50%_-_74.5*var(--u))] top-[calc((5892-3477)*var(--u))] w-[calc(1*var(--u))] h-[calc(7464*var(--u))] bg-[#978c7f] opacity-[0.52]",
  dot: "left-[calc(50%_-_82.5*var(--u))] w-[calc(16*var(--u))] h-[calc(16*var(--u))] rounded-full bg-[#978c7f]",

  // Region headings (Cormorant 85px, left column x 147)
  regionHeading: `left-[calc(147*var(--u))] w-[calc(610*var(--u))] font-cormorant font-normal ${BODY} text-[length:calc(85*var(--u))] leading-[calc(111*var(--u))] tracking-[calc(-3.4*var(--u))]`,

  // Region body (left column x 147, width 576)
  regionBody: "left-[calc(147*var(--u))] w-[calc(576*var(--u))]",

  // Region image (right column x 957, 900x975)
  regionImage: "left-[calc(957*var(--u))] w-[calc(900*var(--u))] h-[calc(975*var(--u))]",

  // Client groups (Helvetica ~22.85px uppercase, #7d7062, opacity 99%)
  clients: `uppercase font-helvetica text-[#7d7062] opacity-[0.99] text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap`,
};

/**
 * About Us — pixel-faithful reproduction of the Figma frame
 * "ABOUT US 22nd July 2026". Styled with Tailwind; only the varying
 * per-region offsets are set inline.
 */
export default function AboutPage() {
  return (
    <div className={`relative ${tw.page}`}>
      {/* Overlay chrome (APEKSHA JAIN · AJC · menu), same as the home hero */}
      <HeroHeader />

      {/* ---- Top slice: Figma y 0..2397 (tops unchanged) ---- */}
      <div className={tw.canvasTop}>
        {/* Hero image */}
        <div className={`${tw.abs} ${tw.imgFit} ${tw.hero}`}>
          <Image
            src={`${IMG}/1.png`}
            alt="Himalayan pine forest in soft mist"
            width={1920}
            height={1080}
            priority
            sizes="100vw"
          />
        </div>
        {/* Intro lead */}
        <div className={`${tw.abs} ${tw.lead}`}>
          <p>AJC is a creative consultancy</p>
          <p>shaped by stories, spaces, cultures, and the subtle art of observation.</p>
        </div>
        {/* Portrait */}
        <div className={`${tw.abs} ${tw.imgFit} ${tw.portrait}`}>
          <Image
            src={`${IMG}/2.png`}
            alt="Mountain ridge framed by evergreens"
            width={310}
            height={322}
          />
        </div>
        {/* Left body — Figma line breaks pinned with <br/> */}
        <p className={`${tw.abs} ${tw.body} ${tw.bodyLeft}`}>
          It is where the past and the present
          <br />
          cross over in a modern-day India-Asia,
          <br />
          where our lens turns toward the
          <br />
          overlooked.. the quiet details,
          <br />
          the folklore of regions, the threads
          <br />
          where history and heritage meet.
        </p>
        {/* Right quote — Figma line breaks pinned with <br/> */}
        <p className={`${tw.abs} ${tw.body} ${tw.bodyQuote}`}>
          &ldquo;In each project, we linger on the
          <br />
          silhouettes that define a brand, the
          <br />
          stories etched in its people,and the
          <br />
          alchemy that happens when creativity
          <br />
          meets cultural depth.&rdquo;
        </p>
        {/* Right closing — Figma line breaks pinned with <br/> */}
        <p className={`${tw.abs} ${tw.body} ${tw.bodyClosing}`}>
          The result is more than design…
          <br />
          it is an invitation into a world where
          <br />
          strategy is steeped in story, and
          <br />
          every identity is shaped by our eye.
        </p>
      </div>

      {/* ---- Band track: sticky-pinned stage, extra scroll height drives
          BandDots. The pin wrapper holds the band's exact old 1920x1080 box
          (the "stage"); the track is taller than the viewport so scrolling
          through it keeps the stage pinned while the dots converge. ---- */}
      <section
        data-band-track
        className="relative w-full"
        style={{ height: `calc(100svh + ${PIN_TRAVEL})` }}
      >
        <div data-band-pin className={tw.bandPin}>
          <div className={tw.bandStage}>
            {/* The band stage interior — base intro image, 8-tile cross-fade
                carousel, headline and the 8 marker dots / carousel indicators
                — is owned by BandDots so progress, active slide and the
                autoplay timer stay a single source of truth. The band image
                box keeps its exact classes via `bandClass`; the headline keeps
                its cream/semibold classes via `headlineClass`. */}
            <BandDots
              imgBase={IMG}
              bandClass={`${tw.imgFit} ${tw.band}`}
              headlineClass={tw.bandHeadline}
            />
          </div>
        </div>
      </section>

      {/* ---- Bottom slice: Figma y 3477..14619 (every top rebased by -3477) ---- */}
      <div className={tw.canvasBottom}>
        {/* Statement */}
        <div className={`${tw.abs} ${tw.statement}`}>
          <p>Our work is the crossover of the past</p>
          <p>into the present. When done right, it</p>
          <p>belongs back to the place where we started.</p>
        </div>
        {/* Wordmark */}
        <p className={`${tw.abs} ${tw.wordmark}`}>ajc</p>
        {/* What We Do */}
        <p className={`${tw.abs} ${tw.sectionTitle} ${tw.whatWeDoTitle}`}>What We Do</p>
        <div className={`${tw.abs} ${tw.imgFit} ${tw.wwdImage}`}>
          <Image
            src={`${IMG}/4.png`}
            alt="Boat crossing still water at dusk"
            width={310}
            height={322}
          />
        </div>
        <div className={`${tw.abs} ${tw.services}`}>
          <p>Brand Strategy &amp; Narrative</p>
          <p>Identity &amp; Design</p>
          <p>Creative Direction</p>
          <p>Experience Design</p>
          <p>Hospitality Consulting</p>
        </div>
        <div className={`${tw.abs} ${tw.body} ${tw.bodyNote}`}>
          <p>
            We step into the critical window after physical construction ends and before operational
            launch begins – defining the core narrative, digital and design identity, global
            perception, and guest experience journey to ensure memorable guest delight while
            maximizing long-term asset valuation.
          </p>
        </div>
        <Link href="/work" className={`${tw.abs} ${tw.discover}`}>
          Discover More
        </Link>
        <div className={`${tw.abs} ${tw.discoverRule}`} />
        {/* Our Work */}
        <p className={`${tw.abs} ${tw.sectionTitle} ${tw.ourWorkTitle}`}>Our Work</p>
        <div className={`${tw.abs} ${tw.divider}`} />
        {DOT_TOPS.map((top) => (
          <div key={top} className={`${tw.abs} ${tw.dot}`} style={{ top: v(top) }} />
        ))}
        {/* Region: In Bhutan */}
        <div className={`${tw.abs} ${tw.imgFit} ${tw.regionImage}`} style={{ top: v(5883 - 3477) }}>
          <Image
            src={`${IMG}/5.png`}
            alt="Bhutan — prayer flags over the valley"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p className={`${tw.abs} ${tw.regionHeading}`} style={{ top: v(6381 - 3477) }}>
          In Bhutan
        </p>
        <div className={`${tw.abs} ${tw.body} ${tw.regionBody}`} style={{ top: v(6539 - 3477) }}>
          <p>
            There are journeys that transform human perspective; As you descend into the land of the
            Thunder Dragon, whose belly has the slow-moving towns of Bhutan, you enter the world’s
            last Shangri-La—protected by Himalayan mountains and dense forests. Here, the 21st
            century comes to a hold and Buddhist prophecies still live in the air. Here, a life of
            balance is their spirituality.
          </p>
        </div>
        <div className={`${tw.abs} ${tw.clients}`} style={{ left: v(147), top: v(6806 - 3477) }}>
          <p>raé by zhiwaling</p>
          <p>Ascent by ZHIWALING</p>
        </div>
        {/* Region: In Ladakh */}
        <div className={`${tw.abs} ${tw.imgFit} ${tw.regionImage}`} style={{ top: v(6966 - 3477) }}>
          <Image
            src={`${IMG}/6.png`}
            alt="Ladakh — K2 under cloud"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p className={`${tw.abs} ${tw.regionHeading}`} style={{ top: v(7406 - 3477) }}>
          In Ladakh
        </p>
        <div className={`${tw.abs} ${tw.body} ${tw.regionBody}`} style={{ top: v(7564 - 3477) }}>
          <p>
            Our home for all of two years, Ladakh is an ancient land in the shadows of the Himalayas
            and the Karakoram. It is where one feels small in front of the mountains, and giant in
            the realm of possibilities. Some say, it is the last wilderness left wild, each relic
            still breathing, from the generations that traversed these mountains long before us. As
            keepers of history, and tellers of story, we entered Ladakh to never leave.
          </p>
        </div>
        <div className={`${tw.abs} ${tw.clients}`} style={{ left: v(147), top: v(7856 - 3477) }}>
          <p>VIRSA BALTISTAN</p>
          <p>farmers’ house</p>
        </div>
        <div className={`${tw.abs} ${tw.clients}`} style={{ left: v(394.96), top: v(7856 - 3477) }}>
          <p>HILL TRIBE</p>
          <p>silk route</p>
        </div>
        <div className={`${tw.abs} ${tw.clients}`} style={{ left: v(577.63), top: v(7856 - 3477) }}>
          <p>balti kitchen</p>
          <p>ALCHI KITCHEN</p>
        </div>
        {/* Region: In Punjab */}
        <div className={`${tw.abs} ${tw.imgFit} ${tw.regionImage}`} style={{ top: v(8049 - 3477) }}>
          <Image
            src={`${IMG}/7.png`}
            alt="Punjab — the Golden Temple"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p className={`${tw.abs} ${tw.regionHeading}`} style={{ top: v(8550 - 3477) }}>
          In Punjab
        </p>
        <div className={`${tw.abs} ${tw.body} ${tw.regionBody}`} style={{ top: v(8708 - 3477) }}>
          <p>
            Punjab is soul—it is Khatirdari, a spirit that loosely translates to absolute
            hospitality and warmth for guests. As you walk through, you find what we call
            &apos;alive archives&apos;— in local people, some old stories, folk music, and purani
            Havelis where history is as present as shared laughter and a lot of food. That feeling
            of coming home is native to here, and it is one place where we truly felt ‘taken care
            of’.
          </p>
        </div>
        <div className={`${tw.abs} ${tw.clients}`} style={{ left: v(147), top: v(8998 - 3477) }}>
          <p>ranjit’s svaasa</p>
        </div>
        {/* Region: In Assam */}
        <div className={`${tw.abs} ${tw.imgFit} ${tw.regionImage}`} style={{ top: v(9132 - 3477) }}>
          <Image
            src={`${IMG}/8.png`}
            alt="Assam — river temple on the Brahmaputra"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p className={`${tw.abs} ${tw.regionHeading}`} style={{ top: v(9630 - 3477) }}>
          In Assam
        </p>
        <div className={`${tw.abs} ${tw.body} ${tw.regionBody}`} style={{ top: v(9788 - 3477) }}>
          <p>
            Assam is the wild heart of eastern India, that can be entered through land, through
            water, through loom and through the wild. Under its dense green canopy and along the
            Brahmaputra&apos;s sweeping banks, time softens. Tea is sipped slowly, always out of a
            kettle. Life is lived patiently, often in coexistence, where birds and a gentle breeze
            carry the forests across the land.
          </p>
        </div>
        <div className={`${tw.abs} ${tw.clients}`} style={{ left: v(147), top: v(10055 - 3477) }}>
          <p>laheké cafe</p>
          <p>lahé life</p>
        </div>
        {/* Region: In Bengal */}
        <div
          className={`${tw.abs} ${tw.imgFit} ${tw.regionImage}`}
          style={{ top: v(10215 - 3477) }}
        >
          <Image
            src={`${IMG}/9.png`}
            alt="Bengal — the Howrah Bridge"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p className={`${tw.abs} ${tw.regionHeading}`} style={{ top: v(10739 - 3477) }}>
          In Bengal
        </p>
        <div className={`${tw.abs} ${tw.body} ${tw.regionBody}`} style={{ top: v(10897 - 3477) }}>
          <p>
            Most people look at Bengal and see soil; we looked at the Hooghly and saw a living,
            breathing artery. On those river banks, life unfolds without a stage—raw, rooted, and
            completely indifferent to modern speed. We had never seen how differently waterways move
            before, carrying daily rituals, old trade routes, and silent dignity, that now reflects
            in our visuals of them.
          </p>
        </div>
        <div className={`${tw.abs} ${tw.clients}`} style={{ left: v(147), top: v(11164 - 3477) }}>
          <p>assam bengal navigation</p>
        </div>
        {/* Region: In Delhi */}
        <div
          className={`${tw.abs} ${tw.imgFit} ${tw.regionImage}`}
          style={{ top: v(11298 - 3477) }}
        >
          <Image
            src={`${IMG}/10.png`}
            alt="Delhi — the Red Fort"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p className={`${tw.abs} ${tw.regionHeading}`} style={{ top: v(11799 - 3477) }}>
          In Delhi
        </p>
        <div className={`${tw.abs} ${tw.body} ${tw.regionBody}`} style={{ top: v(11957 - 3477) }}>
          <p>
            Delhi is our cultural chaos, our curiosity. Home to many communities and India’s
            greatest historic events, it is a city that reciprocates love in its own kind ways.
            Walking the soul of Purani Dilli’s labyrinthine lanes, the said chaos led us to
            Dharampura, where Mughal history resides in a 200-year-old Haveli. Century-old locals
            still tell its story, opening a world of living history within their own.
          </p>
        </div>
        <div className={`${tw.abs} ${tw.clients}`} style={{ left: v(147), top: v(12247 - 3477) }}>
          <p>haveli dharampura</p>
        </div>
        {/* Region: In Rajasthan */}
        <div
          className={`${tw.abs} ${tw.imgFit} ${tw.regionImage}`}
          style={{ top: v(12381 - 3477) }}
        >
          <Image
            src={`${IMG}/11.png`}
            alt="Rajasthan — the Lake Palace"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p className={`${tw.abs} ${tw.regionHeading}`} style={{ top: v(12899 - 3477) }}>
          In Rajasthan
        </p>
        <div className={`${tw.abs} ${tw.body} ${tw.regionBody}`} style={{ top: v(13057 - 3477) }}>
          <p>
            In Rajasthan, royalty was once a rule of India, written into fort walls, golden sands,
            and generations of lineage. Standing within architecture that has witnessed centuries
            turn, we felt the monumental weight of living history that refuses to become a memory.
            Here, heritage survives, as does the hospitality, now shaped regally, for the modern
            traveler.
          </p>
        </div>
        <div className={`${tw.abs} ${tw.clients}`} style={{ left: v(147), top: v(13324 - 3477) }}>
          <p>NEEMRANA HOTELs</p>
        </div>
      </div>
    </div>
  );
}
