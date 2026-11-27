import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { NeemranaFilm } from "@/components/work/NeemranaFilm";
import { assetPath, u } from "@/lib/utils";

/*
  Neemrana Hotels — reproduction of the Figma project-page frame "Neemrana"
  (node 2823:2442, 1920px wide) for AJC-23.

  Same technique as the Haveli and About pages: an absolutely-positioned canvas
  where `--u` = 1 Figma px = 100cqw / 1920, so the layout scales proportionally
  with the viewport (exact at 1920px, smaller below). Tailwind is applied
  directly to each element (the About-page convention); only the varying Figma
  offsets are set inline via u().

  Palette: background #fdfbf4, headings #7d7062 (taupe), body #9b9484 (sage).
*/

const IMG = assetPath("/images/projects/neemrana-hotels");

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
      className="absolute overflow-hidden"
      style={{ left: u(left), top: u(top), width: u(width), height: u(height) }}
    >
      <OptimizedImage
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
      className="absolute block overflow-hidden transition-opacity duration-300 hover:opacity-70"
      style={{ left: u(left), top: u(top), width: u(width), height: u(height) }}
    >
      <OptimizedImage
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
    <>
      <NeemranaMobile />
      <div className="hidden md:block">
        <NeemranaDesktop />
      </div>
    </>
  );
}

/**
 * Mobile layout (<768px) from the 390px-wide Figma frame: `--u` = 1 mobile px.
 * Coordinates are measured from the mobile design image.
 */
function NeemranaMobile() {
  return (
    <div className="@container relative w-full overflow-hidden bg-[#fdfbf4] [--u:calc(100cqw/390)] md:hidden">
      <div className="relative w-full" style={{ height: u(2599) }}>
        {/* Hero is the same still, zoomed on the fresco arch. */}
        <div
          className="absolute overflow-hidden"
          style={{ left: 0, top: 0, width: u(390), height: u(698) }}
        >
          <OptimizedImage
            src={`${IMG}/hero.png`}
            alt="Frescoed gateway at Neemrana Fort-Palace"
            width={1310}
            height={736}
            priority
            sizes="100vw"
            className="absolute max-w-none"
            style={{ left: u(-459), top: u(-40), width: u(1310), height: u(736) }}
          />
        </div>
        <p
          className="font-helvetica absolute text-center text-[length:calc(15*var(--u))] leading-[calc(17*var(--u))] font-bold tracking-[0.02em] text-white uppercase opacity-80"
          style={{ left: 0, top: u(90), width: u(390) }}
        >
          AJC in Rajasthan / राजस्थान
        </p>
        <p
          className="font-helvetica absolute text-center text-[length:calc(15*var(--u))] leading-[calc(17*var(--u))] font-bold tracking-[0.02em] text-white uppercase opacity-80"
          style={{ left: 0, top: u(615), width: u(390) }}
        >
          2026 / ২০২৬
        </p>

        <h1
          className="font-cormorant text-taupe absolute text-[length:calc(44*var(--u))] leading-[calc(46*var(--u))] tracking-[-0.06em]"
          style={{ left: u(50), top: u(760), width: u(300) }}
        >
          Neemrana
          <br />
          Fort-Palace
        </h1>
        <div
          className="font-helvetica-regular text-taupe absolute text-[length:calc(12*var(--u))] leading-[calc(14*var(--u))] tracking-[0.02em] uppercase opacity-80"
          style={{ left: u(55), top: u(900), width: u(250) }}
        >
          <p>Brand Film</p>
          <p>Creative Direction</p>
        </div>
        <div
          className="font-helvetica-regular text-sage absolute space-y-[calc(13*var(--u))] text-[length:calc(11*var(--u))] leading-[calc(13*var(--u))] tracking-[0.02em]"
          style={{ left: u(81), top: u(972), width: u(259) }}
        >
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

        <NeemranaFilm
          src="/videos/neemrana-hotels/fort-palace.mp4"
          title="the Neemrana Fort-Palace brand film"
          box={{ x: 0, y: 1449, w: 390, h: 206 }}
          ring={{ x: 175, y: 83, size: 40 }}
        >
          <OptimizedImage
            src={`${IMG}/film-fort-palace.png`}
            alt="Neemrana Fort-Palace brand film"
            width={390}
            height={206}
            sizes="100vw"
            className="h-full w-full object-cover object-[60%_50%]"
          />
        </NeemranaFilm>
        <p
          className="font-helvetica-regular text-sage absolute text-[length:calc(10*var(--u))] leading-[calc(11*var(--u))] tracking-[0.02em] uppercase"
          style={{ left: u(35), top: u(1668), width: u(100) }}
        >
          Neemrana
          <br />
          Fort-Palace
        </p>
        <p
          className="font-helvetica-regular text-sage absolute text-right text-[length:calc(10*var(--u))] leading-[calc(11*var(--u))] tracking-[0.02em] uppercase"
          style={{ left: u(223), top: u(1668), width: u(130) }}
        >
          A Piece of
          <br />
          Livable History
        </p>

        <NeemranaFilm
          src="/videos/neemrana-hotels/kesroli.mp4"
          title="the Hill Fort Kesroli brand film"
          box={{ x: 0, y: 1759, w: 390, h: 206 }}
          ring={{ x: 175, y: 77, size: 40 }}
        >
          <OptimizedImage
            src={`${IMG}/film-kesroli.png`}
            alt="Hill Fort Kesroli brand film"
            width={390}
            height={206}
            sizes="100vw"
            className="h-full w-full object-cover object-[50%_50%]"
          />
        </NeemranaFilm>
        <p
          className="font-helvetica-regular text-sage absolute text-[length:calc(10*var(--u))] leading-[calc(11*var(--u))] tracking-[0.02em] uppercase"
          style={{ left: u(38), top: u(1985), width: u(130) }}
        >
          Hill Fort Kesroli
        </p>
        <p
          className="font-helvetica-regular text-sage absolute text-right text-[length:calc(10*var(--u))] leading-[calc(11*var(--u))] tracking-[0.02em] uppercase"
          style={{ left: u(223), top: u(1985), width: u(130) }}
        >
          The Oldest Living
          <br />
          Fort Hotel
        </p>

        <h2
          className="font-cormorant text-taupe absolute text-[length:calc(44*var(--u))] leading-[calc(46*var(--u))] tracking-[-0.06em]"
          style={{ left: u(50), top: u(2084), width: u(300) }}
        >
          Features
        </h2>
        <PressLogo
          src="press-ad.png"
          alt="Read the Neemrana feature in Architectural Digest"
          href="https://www.architecturaldigest.in/story/tijara-fort-palace-in-rajasthan-has-a-newly-launched-suite-inspired-by-cannons/"
          left={54}
          top={2158}
          width={29}
          height={19}
        />
        <PressLogo
          src="press-outlook.png"
          alt="Read the Neemrana feature in Outlook Traveller"
          href="https://www.outlooktraveller.com/stay/head-north-with-neemrana"
          left={103}
          top={2160}
          width={67}
          height={17}
        />
        <PressLogo
          src="press-forbes.png"
          alt="Read the Neemrana feature in Forbes India"
          href="https://www.forbesindia.com/amp/article/lifes/deserts-paradox-when-water-built-an-empire/95084/1"
          left={193}
          top={2160}
          width={67}
          height={17}
        />
        <PressLogo
          src="press-cnt.png"
          alt="Read the Neemrana feature in Condé Nast Traveller"
          href="https://www.cntraveller.in/story/10-best-hotels-for-a-weekend-getaway-from-delhi/"
          left={283}
          top={2160}
          width={48}
          height={17}
        />

        <h2
          className="font-cormorant text-taupe absolute text-[length:calc(44*var(--u))] leading-[calc(46*var(--u))] tracking-[-0.06em]"
          style={{ left: u(50), top: u(2256), width: u(300) }}
        >
          Team
        </h2>
        <p
          className="font-helvetica text-sage absolute text-[length:calc(12*var(--u))] leading-[calc(14*var(--u))] font-bold tracking-[0.02em]"
          style={{ left: u(62), top: u(2333), width: u(90) }}
        >
          POST PRODUCTION
        </p>
        <p
          className="font-helvetica-regular text-sage absolute text-[length:calc(12*var(--u))] leading-[calc(14*var(--u))] tracking-[0.02em] uppercase"
          style={{ left: u(201), top: u(2333), width: u(150) }}
        >
          Pulkit Khandelwal
        </p>

        <div
          className="font-cormorant text-taupe absolute text-center text-[length:calc(32*var(--u))] leading-none"
          style={{ left: u(165), top: u(2391), width: u(50) }}
          aria-hidden
        >
          &gt;
        </div>
        <Link
          href="/work/ranjits-svaasa"
          className="font-cormorant text-taupe absolute block text-center text-[length:calc(40*var(--u))] leading-[calc(44*var(--u))] tracking-[-0.06em]"
          style={{ left: 0, top: u(2462), width: u(390) }}
        >
          Next Project
        </Link>
        <p
          className="font-helvetica-regular text-sage absolute text-center text-[length:calc(11*var(--u))] leading-[calc(13*var(--u))] tracking-[0.02em] uppercase"
          style={{ left: 0, top: u(2520), width: u(390) }}
        >
          Ranjit&rsquo;s Svaasa
        </p>
      </div>
    </div>
  );
}

function NeemranaDesktop() {
  return (
    <div className="@container relative mx-auto w-full max-w-[1920px] overflow-hidden bg-[#fdfbf4] [--u:calc(100cqw/1920)]">
      {/* Canvas height ends at the "Ranjit's Svaasa" label (y4915) plus breathing room. */}
      <div className="relative h-[calc(5150*var(--u))] w-full">
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
        <p
          className="font-helvetica absolute text-[length:calc(28*var(--u))] font-bold tracking-[calc(0.56*var(--u))] text-white uppercase opacity-80"
          style={{ left: u(103), top: u(543), width: u(348) }}
        >
          2026 / ২০২৬
        </p>
        <p
          className="font-helvetica absolute text-right text-[length:calc(28*var(--u))] font-bold tracking-[calc(0.56*var(--u))] text-white uppercase opacity-80"
          style={{ left: u(1384), top: u(543), width: u(433) }}
        >
          AJC in Rajasthan / राजस्थान
        </p>

        {/* ============ TITLE + CREDITS + INTRO ============ */}
        <h1
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(109), top: u(1190), width: u(1088) }}
        >
          Neemrana
          <br />
          Fort-Palace
        </h1>
        <div
          className="font-helvetica-regular absolute text-[length:calc(28*var(--u))] leading-[0.9976] tracking-[calc(0.56*var(--u))] text-[#7d7062] uppercase opacity-80"
          style={{ left: u(109), top: u(1436), width: u(523) }}
        >
          <p>Brand Film</p>
          <p>Creative Direction</p>
        </div>

        <div
          className="font-helvetica-regular absolute space-y-[1.2em] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] text-[#9b9484]"
          style={{ left: u(981), top: u(1335), width: u(677) }}
        >
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
        <NeemranaFilm
          src="/videos/neemrana-hotels/fort-palace.mp4"
          title="the Neemrana Fort-Palace brand film"
          box={{ x: 109, y: 2025, w: 1701, h: 891 }}
          ring={{ x: 802, y: 397, size: 98 }}
        >
          <CroppedPic
            src="film-fort-palace.png"
            alt="Neemrana Fort-Palace brand film"
            left={0}
            top={0}
            width={1701}
            height={891}
            crop={{ w: 103.13, h: 110.8, left: -1.03, top: -4.94 }}
          />
        </NeemranaFilm>
        <p
          className="font-helvetica-regular absolute text-[length:calc(28*var(--u))] leading-[0.9976] tracking-[calc(0.56*var(--u))] text-[#7d7062] uppercase opacity-80"
          style={{ left: u(109), top: u(2950), width: u(391) }}
        >
          Neemrana Fort-Palace
        </p>
        <p
          className="font-helvetica-regular absolute text-right text-[length:calc(28*var(--u))] leading-[0.9976] tracking-[calc(0.56*var(--u))] text-[#7d7062] uppercase opacity-80"
          style={{ left: u(1244), top: u(2950), width: u(566) }}
        >
          A Piece of Livable History
        </p>

        {/* ============ FILM 2 — HILL FORT KESROLI ============ */}
        <NeemranaFilm
          src="/videos/neemrana-hotels/kesroli.mp4"
          title="the Hill Fort Kesroli brand film"
          box={{ x: 109, y: 3088, w: 1701, h: 891 }}
          ring={{ x: 802, y: 397, size: 98 }}
        >
          <CroppedPic
            src="film-kesroli.png"
            alt="Hill Fort Kesroli brand film"
            left={0}
            top={0}
            width={1701}
            height={891}
            crop={{ w: 115.99, h: 124.48, left: -7.39, top: -2.3 }}
          />
        </NeemranaFilm>
        <p
          className="font-helvetica-regular absolute text-[length:calc(28*var(--u))] leading-[0.9976] tracking-[calc(0.56*var(--u))] text-[#7d7062] uppercase opacity-80"
          style={{ left: u(109), top: u(4013), width: u(391) }}
        >
          Hill Fort Kesroli
        </p>
        <p
          className="font-helvetica-regular absolute text-right text-[length:calc(28*var(--u))] leading-[0.9976] tracking-[calc(0.56*var(--u))] text-[#7d7062] uppercase opacity-80"
          style={{ left: u(1244), top: u(4013), width: u(566) }}
        >
          The Oldest Living Fort Hotel
        </p>

        {/* ============ FEATURES ============ */}
        <h2
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(109), top: u(4218), width: u(1088) }}
        >
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
        <h2
          className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
          style={{ left: u(109), top: u(4577), width: u(1088) }}
        >
          Team
        </h2>
        <p
          className="font-helvetica absolute text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] text-[#9b9484]"
          style={{ left: u(965), top: u(4634), width: u(400) }}
        >
          POST PRODUCTION
        </p>
        <p
          className="font-helvetica-regular absolute text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] text-[#9b9484] uppercase"
          style={{ left: u(1452), top: u(4634), width: u(260) }}
        >
          Pulkit Khandelwal
        </p>

        {/* ============ NEXT PROJECT ============ */}
        <div
          className="font-cormorant absolute text-center text-[length:calc(80*var(--u))] leading-none font-bold text-[#7d7062]"
          style={{ left: u(905), top: u(4723), width: u(110) }}
          aria-hidden
        >
          &gt;
        </div>
        <Link
          href="/work/ranjits-svaasa"
          className="font-cormorant absolute block text-center text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))] text-[#7d7062]"
          style={{ left: u(654), top: u(4811), width: u(612) }}
        >
          Next Project
        </Link>
        <p
          className="font-helvetica-regular absolute text-center text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] text-[#9b9484] uppercase"
          style={{ left: u(810), top: u(4915), width: u(300) }}
        >
          Ranjit&rsquo;s Svaasa
        </p>
      </div>
    </div>
  );
}
