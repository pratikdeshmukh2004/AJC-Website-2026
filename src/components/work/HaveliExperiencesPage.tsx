import type { CSSProperties, ReactNode } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { assetPath, cn, place, u, type FrameBox } from "@/lib/utils";

/*
  Haveli Experiences — pixel-faithful reproduction of the Figma project-page
  frame "Haveli Dharampura" (node 2823:1952, 1920px wide) and its mobile frame
  "Haveli Dharampura (mob)" (node 4036:2000, 390px wide). Per AJC-22, this
  project has no dedicated frames yet, so it reuses that design 1:1.

  Technique (same as HaveliDharampuraPage): an absolutely-positioned canvas
  where `--u` = 1 Figma px of whichever frame is showing (100cqw / 1920 from
  xl, 100cqw / 390 below). Every element carries its position in both frames
  via place(desktop, mobile). Below xl the canvas is capped at 640px so tablets
  get a centred phone layout. Mobile positions are the Dharampura mobile
  frame's; the Read more links are desktop-only (they do nothing here), so the
  full copy shows on mobile.

  Figma palette: background #fdfbf4 (= cream token), headings #7d7062 (taupe),
  body #9b9484 (sage), subsection bg #d3cebf.
*/

const IMG = assetPath("/images/projects/haveli-experiences");

/** `sizes` for an image `d` px wide in the 1920 frame and `m` px wide in the 390 one. */
const sizesFor = (d: number, m: number) =>
  `(min-width: 1920px) ${Math.ceil(d)}px, (min-width: 80rem) ${+((d / 1920) * 100).toFixed(2)}vw, ${Math.ceil((m / 390) * 640)}px`;

type Box = Required<FrameBox>;

/** White play triangle (Figma Polygon), rotated to point right. */
function PlayTriangle({ d, m }: { d: FrameBox; m: FrameBox }) {
  return (
    <div
      className="absolute top-(--my) left-(--mx) flex size-(--mw) items-center justify-center xl:top-(--y) xl:left-(--x) xl:size-(--w)"
      style={place(d, m)}
    >
      <svg viewBox="0 0 56.2917 48.75" className="h-full w-full rotate-90" fill="white" aria-hidden>
        <path d="M28.1458 0L56.2917 48.75H0L28.1458 0Z" />
      </svg>
    </div>
  );
}

/** A cover photo at its box in both frames; `href` makes it an external link. */
function Pic({
  src,
  alt,
  d,
  m,
  priority = false,
  href,
  imgClassName,
}: {
  src: string;
  alt: string;
  d: Box;
  m: Box;
  priority?: boolean;
  /** When set, the image becomes an external link (press feature, etc.). */
  href?: string;
  /** Extra classes for the image, e.g. a mobile-only crop. */
  imgClassName?: string;
}) {
  const image = (
    <OptimizedImage
      src={`${IMG}/${src}`}
      alt={alt}
      width={d.w}
      height={d.h}
      priority={priority}
      sizes={sizesFor(d.w, m.w)}
      className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
    />
  );
  return (
    <div
      className="absolute top-(--my) left-(--mx) h-(--mh) w-(--mw) overflow-hidden xl:top-(--y) xl:left-(--x) xl:h-(--h) xl:w-(--w)"
      style={place(d, m)}
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
 * Section title. Mobile: Cormorant 45 / 46. Desktop: 80 / 76 (`lg`: 97 / 76).
 * Mobile `y` is the first line's top.
 */
function Heading({
  children,
  d,
  m,
  lg = false,
  as: Tag = "h2",
}: {
  children: ReactNode;
  d: FrameBox;
  m: FrameBox;
  lg?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <Tag
      className={cn(
        "font-cormorant absolute top-(--my) left-(--mx) w-(--mw) text-[length:calc(45*var(--u))] leading-[calc(46*var(--u))] tracking-[calc(-2.7*var(--u))] text-[#7d7062] xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:leading-[calc(76*var(--u))]",
        lg
          ? "xl:text-[length:calc(97*var(--u))] xl:tracking-[calc(-5.82*var(--u))]"
          : "xl:text-[length:calc(80*var(--u))] xl:tracking-[calc(-4.8*var(--u))]",
      )}
      style={place(d, m)}
    >
      {children}
    </Tag>
  );
}

/** Body copy block: 20px on desktop, 10px (or 11px with `large`) on mobile. */
function Body({
  children,
  d,
  m,
  large = false,
  right = false,
}: {
  children: ReactNode;
  d: FrameBox;
  m: FrameBox;
  large?: boolean;
  /** Right-aligned on mobile (the Shaam & Champagne copy beside the photo). */
  right?: boolean;
}) {
  return (
    <div
      className={cn(
        "font-helvetica-regular absolute top-(--my) left-(--mx) w-(--mw) leading-[1.25] text-[#9b9484] xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-left xl:text-[length:calc(20*var(--u))] xl:tracking-[calc(0.4*var(--u))]",
        large
          ? "text-[length:calc(11*var(--u))] tracking-[calc(0.22*var(--u))]"
          : "text-[length:calc(10*var(--u))] tracking-[calc(0.2*var(--u))]",
        right && "text-right",
      )}
      style={place(d, m)}
    >
      {children}
    </div>
  );
}

/** Prev / next arrow beside a slider. Mobile: white, over the photo. */
function Arrow({
  children,
  d,
  m,
  onImage = false,
}: {
  children: ReactNode;
  d: FrameBox;
  m: FrameBox;
  /** White arrow on the photo (mobile Cocktails) rather than beside it. */
  onImage?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "font-helvetica absolute top-(--my) left-(--mx) text-[length:calc(12*var(--u))] leading-none font-bold xl:top-(--y) xl:left-(--x) xl:text-[length:calc(46*var(--u))] xl:text-[#9b9484]",
        onImage ? "text-white" : "text-[#9b9484]",
      )}
      style={place(d, m)}
    >
      {children}
    </div>
  );
}

/** Team role (bold) or name (regular). Mobile 12px, desktop 20px. */
function TeamText({
  children,
  d,
  m,
  bold = false,
}: {
  children: ReactNode;
  d: FrameBox;
  /** Omit to hide below xl (the mobile frame lists each role once). */
  m?: FrameBox;
  bold?: boolean;
}) {
  return (
    <p
      className={cn(
        "absolute top-(--my) left-(--mx) w-(--mw) text-[length:calc(12*var(--u))] leading-[normal] tracking-[calc(0.24*var(--u))] text-[#9b9484] uppercase xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(20*var(--u))] xl:tracking-[calc(0.4*var(--u))]",
        bold ? "font-helvetica font-bold" : "font-helvetica-regular xl:leading-[1.25]",
        !m && "max-xl:hidden",
      )}
      style={place(d, m ?? d)}
    >
      {children}
    </p>
  );
}

/** Desktop-only "Read more" plate + label under a copy block (no action here). */
function ReadMoreLabel({ plateY, labelY }: { plateY: number; labelY: number }) {
  return (
    <>
      <div
        className="absolute bg-[rgba(253,251,244,0.66)] max-xl:hidden"
        style={{ left: u(265), top: u(plateY), width: u(747), height: u(80) }}
      />
      <p
        className="font-helvetica absolute text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] text-[#9b9484] max-xl:hidden"
        style={{ left: u(300), top: u(labelY), width: u(677) }}
      >
        Read more
      </p>
    </>
  );
}

/** Mobile canvas height: last element (Next Project label) plus breathing room. */
const DESKTOP_HEIGHT = 18320;
const MOBILE_HEIGHT = 6830;

/**
 * Haveli Experiences project page: the Figma "Haveli Dharampura" desktop and
 * mobile case-study layouts (AJC-22).
 */
export function HaveliExperiencesPage() {
  return (
    <div className="@container relative mx-auto w-full max-w-[40rem] overflow-hidden bg-[#fdfbf4] [--u:calc(100cqw/390)] xl:max-w-[1920px] xl:[--u:calc(100cqw/1920)]">
      <div
        className="relative h-(--canvas-mh) w-full xl:h-(--canvas-h)"
        style={
          {
            "--canvas-h": u(DESKTOP_HEIGHT),
            "--canvas-mh": u(MOBILE_HEIGHT),
          } as CSSProperties
        }
      >
        {/* ============ HERO ============ */}
        <Pic
          src="imgTheEntranceOfHaveliDharampura21.png"
          alt="The entrance of Haveli Dharampura"
          d={{ x: -41, y: -146, w: 2001, h: 1252 }}
          m={{ x: 0, y: 4, w: 390, h: 696 }}
          imgClassName="max-xl:object-[61%_50%]"
          priority
        />
        <p
          className="font-helvetica absolute top-(--my) left-(--mx) w-(--mw) text-center text-[length:calc(15*var(--u))] font-bold tracking-[calc(0.3*var(--u))] text-white uppercase opacity-80 xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-left xl:text-[length:calc(28*var(--u))] xl:tracking-[calc(0.56*var(--u))]"
          style={place({ x: 103, y: 504, w: 348 }, { x: 21, y: 615, w: 348 })}
        >
          2025 / २०२५
        </p>
        <p
          className="font-helvetica absolute top-(--my) left-(--mx) w-(--mw) text-center text-[length:calc(15*var(--u))] font-bold tracking-[calc(0.3*var(--u))] text-white uppercase opacity-80 xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-right xl:text-[length:calc(28*var(--u))] xl:tracking-[calc(0.56*var(--u))]"
          style={place({ x: 1374, y: 504, w: 443 }, { x: 33, y: 90, w: 348 })}
        >
          AJC in Old Delhi / दिल्ली
        </p>

        {/* Title + credits + intro */}
        <Heading as="h1" lg d={{ x: 100, y: 1217, w: 868 }} m={{ x: 48, y: 761, w: 358 }}>
          Haveli <br className="xl:hidden" />
          Experiences
        </Heading>
        <div
          className="font-helvetica-regular absolute top-(--my) left-(--mx) w-(--mw) text-[length:calc(12*var(--u))] leading-[1.56] tracking-[calc(0.24*var(--u))] text-[#7d7062] uppercase opacity-60 xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(28*var(--u))] xl:leading-[0.9976] xl:tracking-[calc(0.56*var(--u))] xl:opacity-80"
          style={place({ x: 100, y: 1437, w: 523 }, { x: 55, y: 900, w: 227 })}
        >
          <p>Creative Direction</p>
          <p>Photography</p>
          <p>Videography</p>
        </div>
        {/* Intro: the project description from config/projects.ts. */}
        <Body large d={{ x: 1000, y: 1217, w: 668 }} m={{ x: 81, y: 1009, w: 252 }}>
          To experience Mughal&rsquo;s Old Delhi, the journey goes through labyrinthine lanes, that
          open to a 200-year-old heritage experience, narrated by AJC for the modern traveler.
        </Body>

        {/* Centered portrait + play triangle */}
        <Pic
          src="imgScreenshot20260618At61204Pm1.png"
          alt="Haveli interior portrait"
          d={{ x: 719, y: 1937, w: 481, h: 859 }}
          m={{ x: 103, y: 1296, w: 184, h: 329 }}
        />
        <PlayTriangle d={{ x: 945, y: 2351, w: 31 }} m={{ x: 189, y: 1454, w: 12 }} />

        {/* ============ FULL-BLEED PATTERN ============ */}
        <Pic
          src="img0D3A82892.png"
          alt="Haveli frescoed wall and figure"
          d={{ x: -10, y: 3105, w: 1940, h: 1236 }}
          m={{ x: -3, y: 1686, w: 393, h: 265 }}
        />

        {/* ============ BOUTIQUE ============ */}
        <Heading d={{ x: 302, y: 4509, w: 827 }} m={{ x: 48, y: 2004, w: 358 }}>
          Boutique
        </Heading>
        <Pic
          src="imgDsc0071516.png"
          alt="Boutique interior"
          d={{ x: 302, y: 4641, w: 858, h: 686 }}
          m={{ x: 0, y: 2094, w: 251, h: 198 }}
        />
        <Pic
          src="imgDsc0847440.png"
          alt="Boutique detail"
          d={{ x: 1184, y: 4641, w: 458, h: 686 }}
          m={{ x: 255, y: 2094, w: 132, h: 198 }}
        />
        <Pic
          src="imgDsc0847441.png"
          alt="Boutique corridor"
          d={{ x: 302, y: 5345, w: 661, h: 931 }}
          m={{ x: 0, y: 2294, w: 191, h: 269 }}
        />
        <Pic
          src="img0D3A80821.png"
          alt="Boutique room"
          d={{ x: 984, y: 5344, w: 669, h: 930 }}
          m={{ x: 194, y: 2294, w: 196, h: 268 }}
        />

        {/* ============ COCKTAILS ============ */}
        <Heading d={{ x: 302, y: 6451, w: 827 }} m={{ x: 48, y: 2613, w: 358 }}>
          Cocktails
        </Heading>
        <Body d={{ x: 300, y: 6895, w: 652 }} m={{ x: 59, y: 2700, w: 112 }}>
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
        </Body>
        <ReadMoreLabel plateY={7057} labelY={7150} />
        <Pic
          src="imgDsc0847440.png"
          alt="Cocktail glassware"
          d={{ x: 1184, y: 6451, w: 458, h: 722 }}
          m={{ x: 187, y: 2696, w: 166, h: 277 }}
        />
        <Pic
          src="imgCocktails2.png"
          alt="Cocktails on a tray"
          d={{ x: 302, y: 7202, w: 858, h: 686 }}
          m={{ x: 30, y: 3022, w: 221, h: 177 }}
        />
        <Pic
          src="imgDsc0847416.png"
          alt="Cocktail detail"
          d={{ x: 1184, y: 7202, w: 458, h: 686 }}
          m={{ x: 257, y: 3022, w: 118, h: 177 }}
        />
        <Pic
          src="imgMockup13V41.png"
          alt="Printed menu mockup"
          d={{ x: 302, y: 7937, w: 646, h: 966 }}
          m={{ x: 30, y: 3230, w: 164, h: 245 }}
        />

        {/* Prev / next arrows for the cocktails set */}
        <Arrow onImage d={{ x: 215, y: 8388 }} m={{ x: 36, y: 3338 }}>
          &lt;
        </Arrow>
        <Arrow onImage d={{ x: 1017, y: 8388 }} m={{ x: 163, y: 3338 }}>
          &gt;
        </Arrow>
        <PlayTriangle d={{ x: 670, y: 8355, w: 65 }} m={{ x: 102, y: 3343, w: 20 }} />

        {/* Shaam & Champagne: right-aligned beside the photo on mobile */}
        <h3
          className="font-cormorant absolute top-(--my) left-(--mx) w-(--mw) text-right text-[length:calc(25*var(--u))] leading-[calc(24*var(--u))] tracking-[calc(-1.5*var(--u))] text-[#7d7062] xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-left xl:text-[length:calc(50*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-3*var(--u))]"
          style={place({ x: 1000, y: 8690, w: 642 }, { x: 194, y: 3228, w: 159 })}
        >
          Shaam &amp; Champagne
        </h3>
        <Body right d={{ x: 1000, y: 8788, w: 668 }} m={{ x: 216, y: 3318, w: 137 }}>
          A bottle rests in its bucket, flanked by fluted glasses catching the last light of day. On
          the balcony of a 200-year-old haveli, champagne meets the stillness of Old Delhi&rsquo;s
          grey alleys, where it is now often poured. A solemn staff member stands by — upright,
          composed, embodying the quiet tension between heritage and hedonism, service and
          celebration.
        </Body>
        {/* Tinted plate behind the portrait (desktop frame only) */}
        <div
          className="absolute bg-[#d3cebf] max-xl:hidden"
          style={{ left: u(1171), top: u(9032), width: u(483), height: u(711) }}
        />
        {/* Desktop: beside Shaam & Champagne. Mobile: beside the Food copy. */}
        <Pic
          src="imgDsc0847415.png"
          alt="Champagne on the balcony"
          d={{ x: 1172, y: 9026, w: 481, h: 722 }}
          m={{ x: 187, y: 3613, w: 165, h: 277 }}
        />

        {/* ============ FOOD ============ */}
        <Heading d={{ x: 302, y: 9026, w: 827 }} m={{ x: 48, y: 3530, w: 358 }}>
          Food
        </Heading>
        <Body d={{ x: 300, y: 9547, w: 677 }} m={{ x: 59, y: 3617, w: 112 }}>
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
        </Body>
        <ReadMoreLabel plateY={9680} labelY={9773} />
        {/* Centered portrait with arrows + play triangle */}
        <Pic
          src="imgScreenshot20260618At63357Pm1.png"
          alt="Dish under the arches"
          d={{ x: 701, y: 10187, w: 517, h: 924 }}
          m={{ x: 113, y: 3936, w: 165, h: 294 }}
        />
        <Arrow d={{ x: 254, y: 10598 }} m={{ x: 67, y: 4073 }}>
          &lt;
        </Arrow>
        <Arrow d={{ x: 1591, y: 10598 }} m={{ x: 311, y: 4073 }}>
          &gt;
        </Arrow>
        <PlayTriangle d={{ x: 960, y: 10616, w: 65 }} m={{ x: 185, y: 4073, w: 20 }} />

        {/* ============ ARTISTS OF HAVELI ============ */}
        <Heading d={{ x: 302, y: 11320, w: 827 }} m={{ x: 48, y: 4293, w: 358 }}>
          Artists of Haveli
        </Heading>
        <Pic
          src="imgDsc007151.png"
          alt="Artist at work"
          d={{ x: 302, y: 11446, w: 858, h: 686 }}
          m={{ x: 0, y: 4392, w: 249, h: 199 }}
        />
        <Pic
          src="imgDsc084742.png"
          alt="Artist portrait"
          d={{ x: 1184, y: 11446, w: 458, h: 686 }}
          m={{ x: 252, y: 4392, w: 137, h: 199 }}
        />
        <Pic
          src="imgDsc0847411.png"
          alt="Artist detail"
          d={{ x: 302, y: 12150, w: 661, h: 931 }}
          m={{ x: 0, y: 4594, w: 195, h: 270 }}
        />
        <Pic
          src="imgDsc0847412.png"
          alt="Artist detail"
          d={{ x: 985, y: 12150, w: 661, h: 931 }}
          m={{ x: 198, y: 4594, w: 192, h: 270 }}
        />
        <Pic
          src="img0D3A82611.png"
          alt="Artisans of the haveli"
          d={{ x: 302, y: 13099, w: 1344, h: 884 }}
          m={{ x: 0, y: 4868, w: 390, h: 257 }}
        />
        <Pic
          src="imgDsc0847413.png"
          alt="Artist detail"
          d={{ x: 302, y: 14001, w: 661, h: 931 }}
          m={{ x: 0, y: 5128, w: 192, h: 270 }}
        />
        <Pic
          src="imgDsc0847414.png"
          alt="Artist detail"
          d={{ x: 985, y: 14001, w: 661, h: 931 }}
          m={{ x: 195, y: 5128, w: 195, h: 270 }}
        />

        {/* ============ FROM THE ROYAL COURTS ============ */}
        <Heading d={{ x: 302, y: 15084, w: 827 }} m={{ x: 48, y: 5464, w: 358 }}>
          From the <br className="xl:hidden" />
          Royal Courts
        </Heading>
        <Pic
          src="img0D3A82612.png"
          alt="From the royal courts"
          d={{ x: 302, y: 15213, w: 1344, h: 884 }}
          m={{ x: -8, y: 5600, w: 398, h: 262 }}
        />
        <Pic
          src="imgDsc0847442.png"
          alt="Royal court detail"
          d={{ x: 302, y: 16115, w: 661, h: 931 }}
          m={{ x: -8, y: 5865, w: 196, h: 276 }}
        />
        <Pic
          src="imgDsc0847443.png"
          alt="Royal court detail"
          d={{ x: 985, y: 16115, w: 661, h: 931 }}
          m={{ x: 191, y: 5865, w: 199, h: 276 }}
        />

        {/* ============ FEATURES ============ */}
        <Heading lg d={{ x: 133, y: 17189, w: 612 }} m={{ x: 48, y: 6197, w: 358 }}>
          Features
        </Heading>
        <Pic
          src="imgImage16.png"
          alt="Read the Haveli Dharampura feature in Architectural Digest"
          href="https://www.architecturaldigest.in/story/11-restaurants-in-india-that-are-housed-in-iconic-heritage-structures/"
          d={{ x: 133, y: 17382, w: 145, h: 94 }}
          m={{ x: 49, y: 6296, w: 40, h: 26 }}
        />
        <Pic
          src="imgImage4.png"
          alt="Read the Haveli Dharampura feature in Condé Nast Traveller"
          href="https://www.cntraveller.in/story/a-restored-haveli-in-chandni-chowk-is-a-peek-into-the-neighbourhoods-past-and-future/"
          d={{ x: 532, y: 17396, w: 227, h: 80 }}
          m={{ x: 114, y: 6296, w: 68, h: 24 }}
        />
        <Pic
          src="imgImage15.png"
          alt="Read the Haveli Dharampura feature in Travel + Leisure Asia"
          href="https://www.travelandleisureasia.com/in/hotels/india-hotels/check-in-haveli-dharampura-chandni-chowk-old-delhi/"
          d={{ x: 1013, y: 17408, w: 308, h: 72 }}
          m={{ x: 207, y: 6298, w: 85, h: 20 }}
        />
        <Pic
          src="imgImage21.png"
          alt="Read the Haveli Dharampura feature in South China Morning Post"
          href="https://www.scmp.com/magazines/style/travel-food/article/3010133/welcome-havelie-dharampura-rare-oasis-amid-chaos-old"
          d={{ x: 1575, y: 17340, w: 143, h: 136 }}
          m={{ x: 317, y: 6293, w: 31, h: 29 }}
        />

        {/* ============ TEAM ============ */}
        {/* Desktop: two rows of role + name. Mobile: one row per role, names
            stacked (Figma 4036:2018–2023). */}
        <Heading lg d={{ x: 133, y: 17642, w: 612 }} m={{ x: 49, y: 6393, w: 358 }}>
          Team
        </Heading>
        <TeamText bold d={{ x: 407, y: 17658, w: 228 }} m={{ x: 62, y: 6470, w: 98 }}>
          videography
        </TeamText>
        <TeamText bold d={{ x: 937, y: 17658, w: 192 }} m={{ x: 62, y: 6522, w: 106 }}>
          Photography
        </TeamText>
        <TeamText bold d={{ x: 1389, y: 17658, w: 192 }} m={{ x: 62, y: 6566, w: 129 }}>
          direction
        </TeamText>
        <TeamText bold d={{ x: 407, y: 17694, w: 184 }}>
          videography
        </TeamText>
        <TeamText bold d={{ x: 937, y: 17694, w: 184 }}>
          Photography
        </TeamText>
        <TeamText d={{ x: 635, y: 17658, w: 248 }} m={{ x: 201, y: 6470, w: 135 }}>
          Pulkit Khandelwal
        </TeamText>
        <TeamText d={{ x: 635, y: 17694, w: 233 }} m={{ x: 201, y: 6484, w: 135 }}>
          Sarthak Panwar
        </TeamText>
        <TeamText d={{ x: 1165, y: 17658, w: 203 }} m={{ x: 201, y: 6522, w: 124 }}>
          Nishant
        </TeamText>
        <TeamText d={{ x: 1165, y: 17694, w: 233 }} m={{ x: 201, y: 6536, w: 124 }}>
          IDRIS M
        </TeamText>
        <TeamText d={{ x: 1545, y: 17658, w: 203 }} m={{ x: 201, y: 6566, w: 124 }}>
          saksham KHANNA
        </TeamText>

        {/* ============ NEXT PROJECT ============ */}
        <Link
          href="/work/neemrana-hotels"
          className="font-cormorant absolute top-(--my) left-(--mx) block w-(--mw) text-center text-[length:calc(40*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-2.4*var(--u))] text-[#7d7062] xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(80*var(--u))] xl:tracking-[calc(-4.8*var(--u))]"
          style={place({ x: 654, y: 17944, w: 612 }, { x: -111, y: 6677, w: 612 })}
        >
          Next Project
        </Link>
        <div
          aria-hidden
          className="font-cormorant absolute top-(--my) left-(--mx) w-(--mw) text-center text-[length:calc(40*var(--u))] leading-[calc(76*var(--u))] font-bold text-[#7d7062] xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(80*var(--u))] xl:leading-none"
          style={place({ x: 905, y: 17856, w: 110 }, { x: 135, y: 6629, w: 110 })}
        >
          &gt;
        </div>
        <p
          className="font-helvetica-regular absolute top-(--my) left-(--mx) w-(--mw) text-center text-[length:calc(11*var(--u))] leading-[normal] tracking-[calc(0.22*var(--u))] text-[#9b9484] uppercase xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(20*var(--u))] xl:leading-[1.25] xl:tracking-[calc(0.4*var(--u))]"
          style={place({ x: 848, y: 18051, w: 225 }, { x: 131, y: 6753, w: 127 })}
        >
          Neemrana Hotels
        </p>
      </div>
    </div>
  );
}
