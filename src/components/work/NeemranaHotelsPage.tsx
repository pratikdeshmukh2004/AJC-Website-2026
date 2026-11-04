import Image from "next/image";
import Link from "next/link";
import { HeroHeader } from "@/components/home/HeroHeader";
import { assetPath } from "@/lib/utils";

/*
  Neemrana Hotels — reproduction of the Figma project-page frame "Neemrana"
  (node 2823:2442, 1920px wide) for AJC-23.

  Same technique as the Haveli and About pages: an absolutely-positioned canvas
  where `--u` = 1 Figma px = 100cqw / 1920, so the layout scales proportionally
  with the viewport (exact at 1920px, smaller below).

  Palette: background #fdfbf4, headings #7d7062 (taupe), body #9b9484 (sage).
*/

const IMG = assetPath("/images/projects/neemrana-hotels");

// Figma px → canvas units.
const v = (px: number) => `calc(${px} * var(--u))`;

const tw = {
  page: "@container relative mx-auto w-full max-w-[1920px] overflow-hidden bg-[#fdfbf4] [--u:calc(100cqw/1920)]",
  // Content ends at the "Ranjit's Svaasa" label (y4915) plus breathing room.
  canvas: "relative w-full h-[calc(5150*var(--u))]",
  abs: "absolute",

  bigTitle:
    "font-cormorant text-[#7d7062] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]",
  sectionTitle:
    "font-cormorant text-[#7d7062] text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]",

  body: "font-helvetica-regular text-[#9b9484] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]",
  bodyBold:
    "font-helvetica font-bold text-[#9b9484] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]",

  // Credits / film captions — Helvetica, taupe, 28px, 80% opacity, uppercase.
  caption:
    "font-helvetica-regular uppercase text-[#7d7062] opacity-80 text-[length:calc(28*var(--u))] leading-[0.9976] tracking-[calc(0.56*var(--u))]",

  eyebrow:
    "font-helvetica font-bold uppercase text-white opacity-80 text-[length:calc(28*var(--u))] tracking-[calc(0.56*var(--u))]",
};

/** Crop offsets (percent of the frame) copied from the Figma image fills. */
type Crop = { w: number; h: number; left: number; top: number };

/** Image placed in an absolute Figma box, cropped the way the design crops it. */
function CroppedPic({
  src,
  alt,
  left,
  top,
  width,
  height,
  crop,
  priority = false,
}: {
  src: string;
  alt: string;
  left: number;
  top: number;
  width: number;
  height: number;
  crop: Crop;
  priority?: boolean;
}) {
  return (
    <div
      className={`${tw.abs} overflow-hidden`}
      style={{ left: v(left), top: v(top), width: v(width), height: v(height) }}
    >
      <Image
        src={`${IMG}/${src}`}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(min-width: 1920px) 1920px, 100vw"
        className="absolute max-w-none"
        style={{
          width: `${crop.w}%`,
          height: `${crop.h}%`,
          left: `${crop.left}%`,
          top: `${crop.top}%`,
        }}
      />
    </div>
  );
}

/** Dark translucent circle with a white play triangle (Figma Group 37/38). */
function PlayButton({ top }: { top: number }) {
  return (
    // Decorative: the film itself is not yet linked in the design.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${IMG}/play-ring.svg`}
      alt=""
      aria-hidden
      className={tw.abs}
      style={{ left: v(911), top: v(top), width: v(98), height: v(98) }}
    />
  );
}

/** Press logo that links out to the article. */
function PressLogo({
  src,
  alt,
  href,
  left,
  top,
  width,
  height,
}: {
  src: string;
  alt: string;
  href: string;
  left: number;
  top: number;
  width: number;
  height: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={alt}
      className={`${tw.abs} block overflow-hidden transition-opacity duration-300 hover:opacity-70`}
      style={{ left: v(left), top: v(top), width: v(width), height: v(height) }}
    >
      <Image
        src={`${IMG}/${src}`}
        alt={alt}
        width={width}
        height={height}
        className="h-full w-full object-cover"
        sizes="(min-width: 1920px) 400px, 25vw"
      />
    </a>
  );
}

/**
 * Neemrana Hotels project page — reproduces the Figma "Neemrana" case-study
 * layout (AJC-23).
 */
export function NeemranaHotelsPage() {
  return (
    <div className={tw.page}>
      {/* Overlay chrome (menu toggle), same as About/home */}
      <HeroHeader menuOnly />

      <div className={tw.canvas}>
        {/* ============ HERO ============ */}
        <CroppedPic
          src="hero.png"
          alt="Frescoed gateway at Neemrana Fort-Palace"
          left={-148}
          top={-107}
          width={2215}
          height={1186}
          crop={{ w: 111.65, h: 117.15, left: -5.25, top: 9.03 }}
          priority
        />
        <p className={`${tw.abs} ${tw.eyebrow}`} style={{ left: v(103), top: v(543), width: v(348) }}>
          2026 / ২০২৬
        </p>
        <p
          className={`${tw.abs} ${tw.eyebrow} text-right`}
          style={{ left: v(1384), top: v(543), width: v(433) }}
        >
          AJC in Rajasthan / राजस्थान
        </p>

        {/* ============ TITLE + CREDITS + INTRO ============ */}
        <h1 className={`${tw.abs} ${tw.bigTitle}`} style={{ left: v(109), top: v(1190), width: v(1088) }}>
          Neemrana
          <br />
          Fort-Palace
        </h1>
        <div className={`${tw.abs} ${tw.caption}`} style={{ left: v(109), top: v(1436), width: v(523) }}>
          <p>Brand Film</p>
          <p>Creative Direction</p>
        </div>

        <div className={`${tw.abs} ${tw.body} space-y-[1.2em]`} style={{ left: v(981), top: v(1335), width: v(677) }}>
          <p>
            Eight years ago, in 2017, we stayed at Neemrana Fort Palace for the very first time. Two
            years later, we found ourselves at the Ramgarh Bungalows. As young travelers, what began
            as a simple choice of stay completely opened our world to a new philosophy of heritage:
            a living fort hotel, a colonial bungalow where Rabindranath Tagore once penned his
            thoughts, and a hospitality experience that became far greater than the physical space
            itself.
          </p>
          <p>
            Almost a decade later, the narrative came full circle when we got in touch with Sonavi.
            We spoke about a film they were looking to reimagine &ndash; a piece that would capture
            the essence of their Art Deco architecture, the meticulous restoration of ruins
            pioneered by Mr. Aman Nath and his team, and the quiet luxury that makes Neemrana a
            singular, sought-after experience in the vast landscape of Indian hospitality.
          </p>
          <p>
            Our creative process took us deep into the architecture of restoration, unearthing the
            unique tale of each room. We constructed a cinematic arc that spans from the very first
            light of sunrise over the ramparts to the intimate dusk performances at Kesroli.
          </p>
          <p>
            The result was a duo of cinematic brand films designed to reintroduce Neemrana&rsquo;s
            flagship properties to the modern traveler.
          </p>
        </div>

        {/* ============ FILM 1 — NEEMRANA FORT-PALACE ============ */}
        <CroppedPic
          src="film-fort-palace.png"
          alt="Neemrana Fort-Palace brand film"
          left={109}
          top={2025}
          width={1701}
          height={891}
          crop={{ w: 103.13, h: 110.8, left: -1.03, top: -4.94 }}
        />
        <PlayButton top={2422} />
        <p className={`${tw.abs} ${tw.caption}`} style={{ left: v(109), top: v(2950), width: v(391) }}>
          Neemrana Fort-Palace
        </p>
        <p
          className={`${tw.abs} ${tw.caption} text-right`}
          style={{ left: v(1244), top: v(2950), width: v(566) }}
        >
          A Piece of Livable History
        </p>

        {/* ============ FILM 2 — HILL FORT KESROLI ============ */}
        <CroppedPic
          src="film-kesroli.png"
          alt="Hill Fort Kesroli brand film"
          left={109}
          top={3088}
          width={1701}
          height={891}
          crop={{ w: 115.99, h: 124.48, left: -7.39, top: -2.3 }}
        />
        <PlayButton top={3485} />
        <p className={`${tw.abs} ${tw.caption}`} style={{ left: v(109), top: v(4013), width: v(391) }}>
          Hill Fort Kesroli
        </p>
        <p
          className={`${tw.abs} ${tw.caption} text-right`}
          style={{ left: v(1244), top: v(4013), width: v(566) }}
        >
          The Oldest Living Fort Hotel
        </p>

        {/* ============ FEATURES ============ */}
        <h2 className={`${tw.abs} ${tw.bigTitle}`} style={{ left: v(109), top: v(4218), width: v(1088) }}>
          Features
        </h2>
        <PressLogo
          src="press-ad.png"
          alt="Read the Neemrana feature in Architectural Digest"
          href="https://www.architecturaldigest.in/story/tijara-fort-palace-in-rajasthan-has-a-newly-launched-suite-inspired-by-cannons/"
          left={109}
          top={4389}
          width={116}
          height={75}
        />
        <PressLogo
          src="press-cnt.png"
          alt="Read the Neemrana feature in Condé Nast Traveller"
          href="https://www.cntraveller.in/story/10-best-hotels-for-a-weekend-getaway-from-delhi/"
          left={348}
          top={4395}
          width={193}
          height={69}
        />
        <PressLogo
          src="press-outlook.png"
          alt="Read the Neemrana feature in Outlook Traveller"
          href="https://www.outlooktraveller.com/stay/head-north-with-neemrana"
          left={664}
          top={4396}
          width={269}
          height={68}
        />
        <PressLogo
          src="press-forbes.png"
          alt="Read the Neemrana feature in Forbes India"
          href="https://www.forbesindia.com/amp/article/lifes/deserts-paradox-when-water-built-an-empire/95084/1"
          left={1056}
          top={4396}
          width={269}
          height={68}
        />

        {/* ============ TEAM ============ */}
        <h2 className={`${tw.abs} ${tw.bigTitle}`} style={{ left: v(109), top: v(4577), width: v(1088) }}>
          Team
        </h2>
        <p className={`${tw.abs} ${tw.bodyBold}`} style={{ left: v(965), top: v(4634), width: v(400) }}>
          POST PRODUCTION
        </p>
        <p className={`${tw.abs} ${tw.body} uppercase`} style={{ left: v(1452), top: v(4634), width: v(260) }}>
          Pulkit Khandelwal
        </p>

        {/* ============ NEXT PROJECT ============ */}
        <div
          className={`${tw.abs} font-cormorant font-bold text-[#7d7062] text-[length:calc(80*var(--u))] leading-none text-center`}
          style={{ left: v(905), top: v(4723), width: v(110) }}
          aria-hidden
        >
          &gt;
        </div>
        <Link
          href="/work/ranjits-svaasa"
          className={`${tw.abs} ${tw.sectionTitle} block text-center`}
          style={{ left: v(654), top: v(4811), width: v(612) }}
        >
          Next Project
        </Link>
        <p
          className={`${tw.abs} ${tw.body} uppercase text-center`}
          style={{ left: v(810), top: v(4915), width: v(300) }}
        >
          Ranjit&rsquo;s Svaasa
        </p>
      </div>
    </div>
  );
}
