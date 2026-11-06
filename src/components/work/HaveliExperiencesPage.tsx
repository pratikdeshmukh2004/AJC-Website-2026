"use client";

import { useLayoutEffect, useRef, useState } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { HeroHeader } from "@/components/home/HeroHeader";
import { HaveliIntro } from "@/components/work/HaveliIntro";
import { assetPath, u } from "@/lib/utils";

/*
  Haveli Experiences — pixel-faithful reproduction of the Figma project-page
  frame "Haveli Dharampura" (node 2823:1952, 1920px wide). Per AJC-22, this
  project has no dedicated frame yet, so it reuses that project-page design 1:1.

  Technique (same as the About page): an absolutely-positioned canvas where
  `--u` = 1 Figma px = 100cqw / 1920. Every Figma coordinate is written
  `calc(<px> * var(--u))` (via u()), so the whole layout scales proportionally
  with the viewport — exact at 1920px wide, smaller below. Tailwind is applied
  directly to each element; only the varying Figma offsets are set inline via
  u().

  Figma palette: background #fdfbf4 (= cream token), headings #7d7062 (taupe),
  body #9b9484 (sage), subsection bg #d3cebf.
*/

const IMG = assetPath("/images/projects/haveli-experiences");

/** White play triangle (Figma Polygon), rotated to point right. */
function PlayTriangle({ left, top, size }: { left: number; top: number; size: number }) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ left: u(left), top: u(top), width: u(size), height: u(size) }}
    >
      <svg viewBox="0 0 56.2917 48.75" className="h-full w-full rotate-90" fill="white" aria-hidden>
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
    <OptimizedImage
      src={`${IMG}/${src}`}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes="(min-width: 1920px) 1920px, 100vw"
    />
  );
  return (
    <div
      className="absolute overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
      style={{ left: u(left), top: u(top), width: u(width), height: u(height) }}
    >
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
    <div className="@container relative mx-auto w-full max-w-[1920px] overflow-hidden bg-[#fdfbf4] [--u:calc(100cqw/1920)]">
      {/* Overlay chrome (menu toggle), same as About/home */}
      <HeroHeader menuOnly />

      {/* Canvas height trimmed to the last element (Haveli Experiences label at
          y18074) plus breathing room. */}
      <div className="relative h-[calc(18320*var(--u))] w-full">
        {/* ============ HERO ============ */}
        {/* Full-bleed entrance image (Figma y -146..1106, 2001 wide centered) */}
        <div
          className="absolute overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
          style={{ left: u(-41), top: u(-146), width: u(2001), height: u(1252) }}
        >
          <OptimizedImage
            src={`${IMG}/imgTheEntranceOfHaveliDharampura21.png`}
            alt="The entrance of Haveli Dharampura"
            width={2001}
            height={1252}
            priority
            sizes="100vw"
          />
        </div>

        {/* Eyebrow row over the hero */}
        <p
          className="font-helvetica absolute text-[length:calc(28*var(--u))] font-bold tracking-[calc(0.56*var(--u))] text-white uppercase opacity-80"
          style={{ left: u(103), top: u(504), width: u(348) }}
        >
          2025 / २०२५
        </p>
        <p
          className="font-helvetica absolute text-right text-[length:calc(28*var(--u))] font-bold tracking-[calc(0.56*var(--u))] text-white uppercase opacity-80"
          style={{ left: u(1374), top: u(504), width: u(443) }}
        >
          AJC in Old Delhi / दिल्ली
        </p>

        {/* Title + credits + intro */}
        <h1
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(100), top: u(1217), width: u(868) }}
        >
          Haveli Dharampura
        </h1>
        <div
          className="font-helvetica-regular absolute text-[length:calc(28*var(--u))] leading-[0.9976] tracking-[calc(0.56*var(--u))] text-[#7d7062] uppercase opacity-80"
          style={{ left: u(100), top: u(1437), width: u(523) }}
        >
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
          style={{ transform: `translateY(${u(portraitShift)})` }}
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
          className="font-cormorant absolute text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))] text-[#7d7062]"
          style={{ left: u(302), top: u(4509), width: u(827) }}
        >
          Boutique
        </h2>
        <Pic
          src="imgDsc0071516.png"
          alt="Boutique interior"
          left={302}
          top={4641}
          width={858}
          height={686}
        />
        <Pic
          src="imgDsc0847440.png"
          alt="Boutique detail"
          left={1184}
          top={4641}
          width={458}
          height={686}
        />
        <Pic
          src="imgDsc0847441.png"
          alt="Boutique corridor"
          left={302}
          top={5345}
          width={661}
          height={931}
        />
        <Pic
          src="img0D3A80821.png"
          alt="Boutique room"
          left={984}
          top={5344}
          width={669}
          height={930}
        />

        {/* ============ COCKTAILS ============ */}
        <h2
          className="font-cormorant absolute text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))] text-[#7d7062]"
          style={{ left: u(302), top: u(6451), width: u(827) }}
        >
          Cocktails
        </h2>
        <div
          className="font-helvetica-regular absolute text-[length:calc(20*var(--u))] leading-[1.25] tracking-[calc(0.4*var(--u))] text-[#9b9484]"
          style={{ left: u(300), top: u(6895), width: u(652) }}
        >
          <p>
            Cocktails in a Haveli is a visual narrative where our lens turns toward the quiet
            corners of a 200-year-old haveli, where the pour of cocktails echoes softly against
            centuries-old arches. Through shifting light and stillness, our photographer sought to
            distill the mood of a haveli afternoon, where the past meets the modern.
          </p>
          <p className="mt-[1em]">
            &ldquo;In capturing each frame, we lingered on the silhouettes of cut glass, the shadows
            cast by filigree balconies, and the alchemy of spirits stirred amidst sandstone
            walls.&rdquo;
          </p>
        </div>
        <div
          className="absolute bg-[rgba(253,251,244,0.66)]"
          style={{ left: u(265), top: u(7057), width: u(747), height: u(80) }}
        />
        <p
          className="font-helvetica absolute text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] text-[#9b9484]"
          style={{ left: u(300), top: u(7150), width: u(677) }}
        >
          Read more
        </p>
        <Pic
          src="imgDsc0847440.png"
          alt="Cocktail glassware"
          left={1184}
          top={6451}
          width={458}
          height={722}
        />
        <Pic
          src="imgCocktails2.png"
          alt="Cocktails on a tray"
          left={302}
          top={7202}
          width={858}
          height={686}
        />
        <Pic
          src="imgDsc0847416.png"
          alt="Cocktail detail"
          left={1184}
          top={7202}
          width={458}
          height={686}
        />
        <Pic
          src="imgMockup13V41.png"
          alt="Printed menu mockup"
          left={302}
          top={7937}
          width={646}
          height={966}
        />

        {/* Prev / next arrows for the cocktails set */}
        <div
          className="font-helvetica absolute text-[length:calc(46*var(--u))] leading-none font-bold text-[#9b9484]"
          style={{ left: u(215), top: u(8388) }}
        >
          &lt;
        </div>
        <div
          className="font-helvetica absolute text-[length:calc(46*var(--u))] leading-none font-bold text-[#9b9484]"
          style={{ left: u(1017), top: u(8388) }}
        >
          &gt;
        </div>
        <PlayTriangle left={670} top={8355} size={65} />

        {/* Shaam & Champagne subsection */}
        <h3
          className="font-cormorant absolute text-[length:calc(50*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-3*var(--u))] text-[#7d7062]"
          style={{ left: u(1000), top: u(8690), width: u(642) }}
        >
          Shaam &amp; Champagne
        </h3>
        <p
          className="font-helvetica-regular absolute text-[length:calc(20*var(--u))] leading-[1.25] tracking-[calc(0.4*var(--u))] text-[#9b9484]"
          style={{ left: u(1000), top: u(8788), width: u(668) }}
        >
          A bottle rests in its bucket, flanked by fluted glasses catching the last light of day. On
          the balcony of a 200-year-old haveli, champagne meets the stillness of Old Delhi&rsquo;s
          grey alleys, where it is now often poured. A solemn staff member stands by — upright,
          composed, embodying the quiet tension between heritage and hedonism, service and
          celebration.
        </p>
        {/* Tinted plate behind the portrait */}
        <div
          className="absolute bg-[#d3cebf]"
          style={{ left: u(1171), top: u(9032), width: u(483), height: u(711) }}
        />
        <Pic
          src="imgDsc0847415.png"
          alt="Champagne on the balcony"
          left={1172}
          top={9026}
          width={481}
          height={722}
        />

        {/* ============ FOOD ============ */}
        <h2
          className="font-cormorant absolute text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))] text-[#7d7062]"
          style={{ left: u(302), top: u(9026), width: u(827) }}
        >
          Food
        </h2>
        <div
          className="font-helvetica-regular absolute text-[length:calc(20*var(--u))] leading-[1.25] tracking-[calc(0.4*var(--u))] text-[#9b9484]"
          style={{ left: u(300), top: u(9547), width: u(677) }}
        >
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
        <div
          className="absolute bg-[rgba(253,251,244,0.66)]"
          style={{ left: u(265), top: u(9680), width: u(747), height: u(80) }}
        />
        <p
          className="font-helvetica absolute text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] text-[#9b9484]"
          style={{ left: u(300), top: u(9773), width: u(677) }}
        >
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
          className="font-helvetica absolute text-[length:calc(46*var(--u))] leading-none font-bold text-[#9b9484]"
          style={{ left: u(254), top: u(10598) }}
        >
          &lt;
        </div>
        <div
          className="font-helvetica absolute text-[length:calc(46*var(--u))] leading-none font-bold text-[#9b9484]"
          style={{ left: u(1591), top: u(10598) }}
        >
          &gt;
        </div>
        <PlayTriangle left={960} top={10616} size={65} />

        {/* ============ ARTISTS OF HAVELI ============ */}
        <h2
          className="font-cormorant absolute text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))] text-[#7d7062]"
          style={{ left: u(302), top: u(11320), width: u(827) }}
        >
          Artists of Haveli
        </h2>
        <Pic
          src="imgDsc007151.png"
          alt="Artist at work"
          left={302}
          top={11446}
          width={858}
          height={686}
        />
        <Pic
          src="imgDsc084742.png"
          alt="Artist portrait"
          left={1184}
          top={11446}
          width={458}
          height={686}
        />
        <Pic
          src="imgDsc0847411.png"
          alt="Artist detail"
          left={302}
          top={12150}
          width={661}
          height={931}
        />
        <Pic
          src="imgDsc0847412.png"
          alt="Artist detail"
          left={985}
          top={12150}
          width={661}
          height={931}
        />
        <Pic
          src="img0D3A82611.png"
          alt="Artisans of the haveli"
          left={302}
          top={13099}
          width={1344}
          height={884}
        />
        <Pic
          src="imgDsc0847413.png"
          alt="Artist detail"
          left={302}
          top={14001}
          width={661}
          height={931}
        />
        <Pic
          src="imgDsc0847414.png"
          alt="Artist detail"
          left={985}
          top={14001}
          width={661}
          height={931}
        />

        {/* ============ FROM THE ROYAL COURTS ============ */}
        <h2
          className="font-cormorant absolute text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))] text-[#7d7062]"
          style={{ left: u(302), top: u(15084), width: u(827) }}
        >
          From the Royal Courts
        </h2>
        <Pic
          src="img0D3A82612.png"
          alt="From the royal courts"
          left={302}
          top={15213}
          width={1344}
          height={884}
        />
        <Pic
          src="imgDsc0847442.png"
          alt="Royal court detail"
          left={302}
          top={16115}
          width={661}
          height={931}
        />
        <Pic
          src="imgDsc0847443.png"
          alt="Royal court detail"
          left={985}
          top={16115}
          width={661}
          height={931}
        />

        {/* ============ FEATURES ============ */}
        <h2
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(133), top: u(17189), width: u(612) }}
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
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(133), top: u(17642), width: u(612) }}
        >
          Team
        </h2>
        {/* Role labels (bold) */}
        <p
          className="font-helvetica absolute text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] text-[#9b9484] uppercase"
          style={{ left: u(407), top: u(17658), width: u(228) }}
        >
          videography
        </p>
        <p
          className="font-helvetica absolute text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] text-[#9b9484]"
          style={{ left: u(937), top: u(17658), width: u(192) }}
        >
          PHOTOGRAPHY
        </p>
        <p
          className="font-helvetica absolute text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] text-[#9b9484] uppercase"
          style={{ left: u(1389), top: u(17658), width: u(192) }}
        >
          direction
        </p>
        <p
          className="font-helvetica absolute text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] text-[#9b9484] uppercase"
          style={{ left: u(407), top: u(17694), width: u(184) }}
        >
          videography
        </p>
        <p
          className="font-helvetica absolute text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] text-[#9b9484]"
          style={{ left: u(937), top: u(17694), width: u(184) }}
        >
          PHOTOGRAPHY
        </p>
        {/* Names (regular) */}
        <p
          className="font-helvetica-regular absolute text-[length:calc(20*var(--u))] leading-[1.25] tracking-[calc(0.4*var(--u))] text-[#9b9484] uppercase"
          style={{ left: u(635), top: u(17658), width: u(248) }}
        >
          Pulkit Khandelwal
        </p>
        <p
          className="font-helvetica-regular absolute text-[length:calc(20*var(--u))] leading-[1.25] tracking-[calc(0.4*var(--u))] text-[#9b9484] uppercase"
          style={{ left: u(1165), top: u(17658), width: u(203) }}
        >
          Nishant
        </p>
        <p
          className="font-helvetica-regular absolute text-[length:calc(20*var(--u))] leading-[1.25] tracking-[calc(0.4*var(--u))] text-[#9b9484] uppercase"
          style={{ left: u(1545), top: u(17658), width: u(203) }}
        >
          saksham KHANNA
        </p>
        <p
          className="font-helvetica-regular absolute text-[length:calc(20*var(--u))] leading-[1.25] tracking-[calc(0.4*var(--u))] text-[#9b9484] uppercase"
          style={{ left: u(635), top: u(17694), width: u(233) }}
        >
          Sarthak Panwar
        </p>
        <p
          className="font-helvetica-regular absolute text-[length:calc(20*var(--u))] leading-[1.25] tracking-[calc(0.4*var(--u))] text-[#9b9484] uppercase"
          style={{ left: u(1165), top: u(17694), width: u(233) }}
        >
          IDRIS M
        </p>

        {/* ============ NEXT PROJECT ============ */}
        <Link
          href="/work/haveli-experiences"
          className="font-cormorant absolute block text-center text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))] text-[#7d7062]"
          style={{ left: u(654), top: u(17944), width: u(612) }}
        >
          Next Project
        </Link>
        <div
          className="font-cormorant absolute text-center text-[length:calc(80*var(--u))] leading-none font-bold text-[#7d7062]"
          style={{ left: u(905), top: u(17856), width: u(110) }}
        >
          &gt;
        </div>
        <p
          className="font-helvetica-regular absolute text-center text-[length:calc(20*var(--u))] leading-[1.25] tracking-[calc(0.4*var(--u))] text-[#9b9484] uppercase"
          style={{ left: u(848), top: u(18051), width: u(225) }}
        >
          Haveli Experiences
        </p>
      </div>
    </div>
  );
}
