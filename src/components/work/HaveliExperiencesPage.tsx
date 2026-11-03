"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroHeader } from "@/components/home/HeroHeader";
import { HaveliIntro } from "@/components/work/HaveliIntro";
import { assetPath } from "@/lib/utils";

/*
  Haveli Experiences — pixel-faithful reproduction of the Figma project-page
  frame "Haveli Dharampura" (node 2823:1952, 1920px wide). Per AJC-22, this
  project has no dedicated frame yet, so it reuses that project-page design 1:1.

  Technique (same as the About page): an absolutely-positioned canvas where
  `--u` = 1 Figma px = 100cqw / 1920. Every Figma coordinate is written
  `calc(<px> * var(--u))`, so the whole layout scales proportionally with the
  viewport — exact at 1920px wide, smaller below.

  Figma palette: background #fdfbf4 (= cream token), headings #7d7062 (taupe),
  body #9b9484 (sage), subsection bg #d3cebf.
*/

const IMG = assetPath("/images/projects/haveli-experiences");

// Figma px → canvas units.
const v = (px: number) => `calc(${px} * var(--u))`;

// Absolute box helper: returns inline style for left/top/width/height in --u.
const box = (left: number, top: number, width: number, height: number) => ({
  left: v(left),
  top: v(top),
  width: v(width),
  height: v(height),
});

const tw = {
  // 1920-wide container; --u is the per-px unit. Content height trimmed to the
  // last element (Haveli Experiences label at y18074) plus breathing room.
  page: "@container relative mx-auto w-full max-w-[1920px] overflow-hidden bg-[#fdfbf4] [--u:calc(100cqw/1920)]",
  canvas: "relative w-full h-[calc(18320*var(--u))]",
  abs: "absolute",
  // object-cover image fill inside an absolute box.
  imgFit: "overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover",

  // Headings — Cormorant Garamond, taupe.
  // Section title: 80px / 76px line / -4.8px tracking.
  sectionTitle:
    "font-cormorant text-[#7d7062] text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]",
  // Large title / Features / Team: 97px / 76px / -5.82px.
  bigTitle:
    "font-cormorant text-[#7d7062] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]",

  // Body copy — Helvetica, sage, 20px / 0.4px tracking.
  body: "font-helvetica-regular text-[#9b9484] text-[length:calc(20*var(--u))] leading-[1.25] tracking-[calc(0.4*var(--u))]",
  bodyBold:
    "font-helvetica font-bold text-[#9b9484] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]",

  // Credits under the hero title — Helvetica, taupe, 28px, 80% opacity, uppercase.
  // Figma per-line leading is 99.76% of the 28px size (node 2823:1963).
  credits:
    "font-helvetica-regular uppercase text-[#7d7062] opacity-80 text-[length:calc(28*var(--u))] leading-[0.9976] tracking-[calc(0.56*var(--u))]",

  // Eyebrow row over the hero — white, uppercase, 28px.
  eyebrow:
    "font-helvetica font-bold uppercase text-white opacity-80 text-[length:calc(28*var(--u))] tracking-[calc(0.56*var(--u))]",

  // Translucent cream pill behind "Read more".
  pill: "bg-[rgba(253,251,244,0.66)]",
};

/** White play triangle (Figma Polygon), rotated to point right. */
function PlayTriangle({
  left,
  top,
  size,
}: {
  left: number;
  top: number;
  size: number;
}) {
  return (
    <div className={`${tw.abs} flex items-center justify-center`} style={{ ...box(left, top, size, size) }}>
      <svg
        viewBox="0 0 56.2917 48.75"
        className="h-full w-full rotate-90"
        fill="white"
        aria-hidden
      >
        <path d="M28.1458 0L56.2917 48.75H0L28.1458 0Z" />
      </svg>
    </div>
  );
}

/** Convenience: an absolutely-positioned cover image. */
function Pic({
  src,
  alt,
  left,
  top,
  width,
  height,
  priority = false,
  href,
}: {
  src: string;
  alt: string;
  left: number;
  top: number;
  width: number;
  height: number;
  priority?: boolean;
  /** When set, the image becomes an external link (press feature, etc.). */
  href?: string;
}) {
  const image = (
    <Image
      src={`${IMG}/${src}`}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes="(min-width: 1920px) 1920px, 100vw"
    />
  );
  return (
    <div className={`${tw.abs} ${tw.imgFit}`} style={{ ...box(left, top, width, height) }}>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={alt}
          className="block h-full w-full transition-opacity duration-300 hover:opacity-70"
        >
          {image}
        </a>
      ) : (
        image
      )}
    </div>
  );
}

/**
 * Haveli Experiences project page — reproduces the Figma "Haveli Dharampura"
 * case-study layout (AJC-22).
 */
export function HaveliExperiencesPage() {
  // Expand/collapse state for the hero intro's "Read more".
  const [introExpanded, setIntroExpanded] = useState(false);
  // Measured ref of the intro block, and how far (in canvas px) the portrait
  // group below must shift down so the expanded copy never overlaps it.
  const introRef = useRef<HTMLDivElement>(null);
  const [portraitShift, setPortraitShift] = useState(0);

  // After layout, measure the intro's rendered bottom. If the expanded copy
  // runs past where the portrait begins (Figma y1937), push the portrait +
  // play triangle down by the overflow (plus a small gap) so nothing collides.
  useLayoutEffect(() => {
    const el = introRef.current;
    if (!el) return;

    const measure = () => {
      const canvas = el.offsetParent as HTMLElement | null;
      if (!canvas) return;
      // Per-canvas-px unit in real px: canvas is 1920 Figma px wide.
      const unit = canvas.clientWidth / 1920;
      const introBottomPx = el.offsetTop + el.offsetHeight; // real px from canvas top
      const introBottomFigma = introBottomPx / unit; // back to Figma px
      const portraitTopFigma = 1937;
      const gapFigma = 64; // breathing room before the portrait
      const overflow = introBottomFigma + gapFigma - portraitTopFigma;
      setPortraitShift(introExpanded && overflow > 0 ? overflow : 0);
    };

    measure();
    // Re-measure on resize (text rewraps → height changes).
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const parent = el.offsetParent as HTMLElement | null;
    if (parent) ro.observe(parent);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [introExpanded]);

  return (
    <div className={tw.page}>
      {/* Overlay chrome (menu toggle), same as About/home */}
      <HeroHeader menuOnly />

      <div className={tw.canvas}>
        {/* ============ HERO ============ */}
        {/* Full-bleed entrance image (Figma y -146..1106, 2001 wide centered) */}
        <div
          className={`${tw.abs} ${tw.imgFit}`}
          style={{ left: v(-41), top: v(-146), width: v(2001), height: v(1252) }}
        >
          <Image
            src={`${IMG}/imgTheEntranceOfHaveliDharampura21.png`}
            alt="The entrance of Haveli Dharampura"
            width={2001}
            height={1252}
            priority
            sizes="100vw"
          />
        </div>

        {/* Eyebrow row over the hero */}
        <p className={`${tw.abs} ${tw.eyebrow}`} style={{ left: v(103), top: v(504), width: v(348) }}>
          2025 / २०२५
        </p>
        <p
          className={`${tw.abs} ${tw.eyebrow} text-right`}
          style={{ left: v(1374), top: v(504), width: v(443) }}
        >
          AJC in Old Delhi / दिल्ली
        </p>

        {/* Title + credits + intro */}
        <h1
          className={`${tw.abs} ${tw.bigTitle}`}
          style={{ left: v(100), top: v(1217), width: v(868) }}
        >
          Haveli Dharampura
        </h1>
        <div className={`${tw.abs} ${tw.credits}`} style={{ left: v(100), top: v(1437), width: v(523) }}>
          <p>Creative Direction</p>
          <p>Photography</p>
          <p>Videography</p>
        </div>
        {/* Intro body + expandable "Read more" (client-interactive) */}
        <HaveliIntro
          ref={introRef}
          expanded={introExpanded}
          onToggle={() => setIntroExpanded((prev) => !prev)}
        />

        {/* Centered portrait + play triangle. Grouped so they shift down
            together when the intro is expanded, keeping clear of the copy.
            The transform is animated for a smooth reflow. */}
        <div
          className="pointer-events-none absolute inset-0 transition-transform duration-500 ease-out"
          style={{ transform: `translateY(${v(portraitShift)})` }}
        >
          <Pic
            src="imgScreenshot20260618At61204Pm1.png"
            alt="Haveli interior portrait"
            left={719}
            top={1937}
            width={481}
            height={859}
          />
          <PlayTriangle left={945} top={2351} size={31} />
        </div>

        {/* ============ FULL-BLEED PATTERN ============ */}
        <Pic
          src="img0D3A82892.png"
          alt="Haveli frescoed wall and figure"
          left={-10}
          top={3105}
          width={1940}
          height={1236}
        />

        {/* ============ BOUTIQUE ============ */}
        <h2
          className={`${tw.abs} ${tw.sectionTitle}`}
          style={{ left: v(302), top: v(4509), width: v(827) }}
        >
          Boutique
        </h2>
        <Pic src="imgDsc0071516.png" alt="Boutique interior" left={302} top={4641} width={858} height={686} />
        <Pic src="imgDsc0847440.png" alt="Boutique detail" left={1184} top={4641} width={458} height={686} />
        <Pic src="imgDsc0847441.png" alt="Boutique corridor" left={302} top={5345} width={661} height={931} />
        <Pic src="img0D3A80821.png" alt="Boutique room" left={984} top={5344} width={669} height={930} />

        {/* ============ COCKTAILS ============ */}
        <h2
          className={`${tw.abs} ${tw.sectionTitle}`}
          style={{ left: v(302), top: v(6451), width: v(827) }}
        >
          Cocktails
        </h2>
        <div className={`${tw.abs} ${tw.body}`} style={{ left: v(300), top: v(6895), width: v(652) }}>
          <p>
            Cocktails in a Haveli is a visual narrative where our lens turns toward the quiet corners
            of a 200-year-old haveli, where the pour of cocktails echoes softly against
            centuries-old arches. Through shifting light and stillness, our photographer sought to
            distill the mood of a haveli afternoon, where the past meets the modern.
          </p>
          <p className="mt-[1em]">
            &ldquo;In capturing each frame, we lingered on the silhouettes of cut glass, the shadows
            cast by filigree balconies, and the alchemy of spirits stirred amidst sandstone
            walls.&rdquo;
          </p>
        </div>
        <div className={`${tw.abs} ${tw.pill}`} style={{ ...box(265, 7057, 747, 80) }} />
        <p className={`${tw.abs} ${tw.bodyBold}`} style={{ left: v(300), top: v(7150), width: v(677) }}>
          Read more
        </p>
        <Pic src="imgDsc0847440.png" alt="Cocktail glassware" left={1184} top={6451} width={458} height={722} />
        <Pic src="imgCocktails2.png" alt="Cocktails on a tray" left={302} top={7202} width={858} height={686} />
        <Pic src="imgDsc0847416.png" alt="Cocktail detail" left={1184} top={7202} width={458} height={686} />
        <Pic src="imgMockup13V41.png" alt="Printed menu mockup" left={302} top={7937} width={646} height={966} />

        {/* Prev / next arrows for the cocktails set */}
        <div
          className={`${tw.abs} font-helvetica font-bold text-[#9b9484] text-[length:calc(46*var(--u))] leading-none`}
          style={{ left: v(215), top: v(8388) }}
        >
          &lt;
        </div>
        <div
          className={`${tw.abs} font-helvetica font-bold text-[#9b9484] text-[length:calc(46*var(--u))] leading-none`}
          style={{ left: v(1017), top: v(8388) }}
        >
          &gt;
        </div>
        <PlayTriangle left={670} top={8355} size={65} />

        {/* Shaam & Champagne subsection */}
        <h3
          className={`${tw.abs} font-cormorant text-[#7d7062] text-[length:calc(50*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-3*var(--u))]`}
          style={{ left: v(1000), top: v(8690), width: v(642) }}
        >
          Shaam &amp; Champagne
        </h3>
        <p className={`${tw.abs} ${tw.body}`} style={{ left: v(1000), top: v(8788), width: v(668) }}>
          A bottle rests in its bucket, flanked by fluted glasses catching the last light of day. On
          the balcony of a 200-year-old haveli, champagne meets the stillness of Old Delhi&rsquo;s
          grey alleys, where it is now often poured. A solemn staff member stands by — upright,
          composed, embodying the quiet tension between heritage and hedonism, service and
          celebration.
        </p>
        {/* Tinted plate behind the portrait */}
        <div className={`${tw.abs} bg-[#d3cebf]`} style={{ ...box(1171, 9032, 483, 711) }} />
        <Pic src="imgDsc0847415.png" alt="Champagne on the balcony" left={1172} top={9026} width={481} height={722} />

        {/* ============ FOOD ============ */}
        <h2
          className={`${tw.abs} ${tw.sectionTitle}`}
          style={{ left: v(302), top: v(9026), width: v(827) }}
        >
          Food
        </h2>
        <div className={`${tw.abs} ${tw.body}`} style={{ left: v(300), top: v(9547), width: v(677) }}>
          <p>
            Dine under the Arches is a continuation of the visual narrative where our lens turned
            toward the culinary legacy of Dharampura, where the food draws inspiration from the two
            sides of Old Delhi; one where Jains resided and the chaat gali thrived, and another
            where, closer to Jama Masjid, Mughlai aromas filled the air.
          </p>
          <p className="mt-[1em]">
            Through shifting light and stillness, we sought to echo the origins of this food within
            the frame of the photograph.
          </p>
        </div>
        <div className={`${tw.abs} ${tw.pill}`} style={{ ...box(265, 9680, 747, 80) }} />
        <p className={`${tw.abs} ${tw.bodyBold}`} style={{ left: v(300), top: v(9773), width: v(677) }}>
          Read more
        </p>
        {/* Centered oval portrait with arrows + play triangle */}
        <Pic
          src="imgScreenshot20260618At63357Pm1.png"
          alt="Dish under the arches"
          left={701}
          top={10187}
          width={517}
          height={924}
        />
        <div
          className={`${tw.abs} font-helvetica font-bold text-[#9b9484] text-[length:calc(46*var(--u))] leading-none`}
          style={{ left: v(254), top: v(10598) }}
        >
          &lt;
        </div>
        <div
          className={`${tw.abs} font-helvetica font-bold text-[#9b9484] text-[length:calc(46*var(--u))] leading-none`}
          style={{ left: v(1591), top: v(10598) }}
        >
          &gt;
        </div>
        <PlayTriangle left={960} top={10616} size={65} />

        {/* ============ ARTISTS OF HAVELI ============ */}
        <h2
          className={`${tw.abs} ${tw.sectionTitle}`}
          style={{ left: v(302), top: v(11320), width: v(827) }}
        >
          Artists of Haveli
        </h2>
        <Pic src="imgDsc007151.png" alt="Artist at work" left={302} top={11446} width={858} height={686} />
        <Pic src="imgDsc084742.png" alt="Artist portrait" left={1184} top={11446} width={458} height={686} />
        <Pic src="imgDsc0847411.png" alt="Artist detail" left={302} top={12150} width={661} height={931} />
        <Pic src="imgDsc0847412.png" alt="Artist detail" left={985} top={12150} width={661} height={931} />
        <Pic src="img0D3A82611.png" alt="Artisans of the haveli" left={302} top={13099} width={1344} height={884} />
        <Pic src="imgDsc0847413.png" alt="Artist detail" left={302} top={14001} width={661} height={931} />
        <Pic src="imgDsc0847414.png" alt="Artist detail" left={985} top={14001} width={661} height={931} />

        {/* ============ FROM THE ROYAL COURTS ============ */}
        <h2
          className={`${tw.abs} ${tw.sectionTitle}`}
          style={{ left: v(302), top: v(15084), width: v(827) }}
        >
          From the Royal Courts
        </h2>
        <Pic src="img0D3A82612.png" alt="From the royal courts" left={302} top={15213} width={1344} height={884} />
        <Pic src="imgDsc0847442.png" alt="Royal court detail" left={302} top={16115} width={661} height={931} />
        <Pic src="imgDsc0847443.png" alt="Royal court detail" left={985} top={16115} width={661} height={931} />

        {/* ============ FEATURES ============ */}
        <h2
          className={`${tw.abs} ${tw.bigTitle}`}
          style={{ left: v(133), top: v(17189), width: v(612) }}
        >
          Features
        </h2>
        <Pic
          src="imgImage16.png"
          alt="Read the Haveli Dharampura feature in Architectural Digest"
          href="https://www.architecturaldigest.in/story/11-restaurants-in-india-that-are-housed-in-iconic-heritage-structures/"
          left={133}
          top={17382}
          width={145}
          height={94}
        />
        <Pic
          src="imgImage4.png"
          alt="Read the Haveli Dharampura feature in Condé Nast Traveller"
          href="https://www.cntraveller.in/story/a-restored-haveli-in-chandni-chowk-is-a-peek-into-the-neighbourhoods-past-and-future/"
          left={532}
          top={17396}
          width={227}
          height={80}
        />
        <Pic
          src="imgImage15.png"
          alt="Read the Haveli Dharampura feature in Travel + Leisure Asia"
          href="https://www.travelandleisureasia.com/in/hotels/india-hotels/check-in-haveli-dharampura-chandni-chowk-old-delhi/"
          left={1013}
          top={17408}
          width={308}
          height={72}
        />
        <Pic
          src="imgImage21.png"
          alt="Read the Haveli Dharampura feature in South China Morning Post"
          href="https://www.scmp.com/magazines/style/travel-food/article/3010133/welcome-havelie-dharampura-rare-oasis-amid-chaos-old"
          left={1575}
          top={17340}
          width={143}
          height={136}
        />

        {/* ============ TEAM ============ */}
        <h2
          className={`${tw.abs} ${tw.bigTitle}`}
          style={{ left: v(133), top: v(17642), width: v(612) }}
        >
          Team
        </h2>
        {/* Role labels (bold) */}
        <p className={`${tw.abs} ${tw.bodyBold} uppercase`} style={{ left: v(407), top: v(17658), width: v(228) }}>
          videography
        </p>
        <p className={`${tw.abs} ${tw.bodyBold}`} style={{ left: v(937), top: v(17658), width: v(192) }}>
          PHOTOGRAPHY
        </p>
        <p className={`${tw.abs} ${tw.bodyBold} uppercase`} style={{ left: v(1389), top: v(17658), width: v(192) }}>
          direction
        </p>
        <p className={`${tw.abs} ${tw.bodyBold} uppercase`} style={{ left: v(407), top: v(17694), width: v(184) }}>
          videography
        </p>
        <p className={`${tw.abs} ${tw.bodyBold}`} style={{ left: v(937), top: v(17694), width: v(184) }}>
          PHOTOGRAPHY
        </p>
        {/* Names (regular) */}
        <p className={`${tw.abs} ${tw.body} uppercase`} style={{ left: v(635), top: v(17658), width: v(248) }}>
          Pulkit Khandelwal
        </p>
        <p className={`${tw.abs} ${tw.body} uppercase`} style={{ left: v(1165), top: v(17658), width: v(203) }}>
          Nishant
        </p>
        <p className={`${tw.abs} ${tw.body} uppercase`} style={{ left: v(1545), top: v(17658), width: v(203) }}>
          saksham KHANNA
        </p>
        <p className={`${tw.abs} ${tw.body} uppercase`} style={{ left: v(635), top: v(17694), width: v(233) }}>
          Sarthak Panwar
        </p>
        <p className={`${tw.abs} ${tw.body} uppercase`} style={{ left: v(1165), top: v(17694), width: v(233) }}>
          IDRIS M
        </p>

        {/* ============ NEXT PROJECT ============ */}
        <Link
          href="/work/haveli-experiences"
          className={`${tw.abs} ${tw.sectionTitle} block text-center`}
          style={{ left: v(654), top: v(17944), width: v(612) }}
        >
          Next Project
        </Link>
        <div
          className={`${tw.abs} font-cormorant font-bold text-[#7d7062] text-[length:calc(80*var(--u))] leading-none text-center`}
          style={{ left: v(905), top: v(17856), width: v(110) }}
        >
          &gt;
        </div>
        <p
          className={`${tw.abs} ${tw.body} uppercase text-center`}
          style={{ left: v(848), top: v(18051), width: v(225) }}
        >
          Haveli Experiences
        </p>
      </div>
    </div>
  );
}
