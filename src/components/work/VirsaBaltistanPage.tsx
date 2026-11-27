import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { VirsaExpandableIntro } from "@/components/work/VirsaExpandableIntro";
import {
  VirsaExperienceCarousel,
  type Experience,
} from "@/components/work/VirsaExperienceCarousel";
import { VirsaFilmPlayer } from "@/components/work/VirsaFilmPlayer";
import { VirsaSlideCarousel } from "@/components/work/VirsaSlideCarousel";
import { assetPath, at, cn, u } from "@/lib/utils";

/*
  Virsa Baltistan — the project's identity page at /work/virsa-baltistan
  (AJC-16). Opened from the right photo and the text of the Virsa Baltistan
  card on Our Work.

  Desktop (xl up), Figma frame "Virsa Baltistan" (node 2823:1389, 1920px):
  a scaled canvas where `--u` = 1 Figma px = 100cqw / 1920 and each element
  sits at its Figma coordinates (`at(x, y, w)` + `xl:left-(--x) xl:top-(--y)`),
  as on Virsa Experiences.

  Below xl, Figma frame "Virsa Baltistan(Mob)" (node 3995:1393, 390px): the
  same elements stack in normal flow with the mobile frame's sizes and gaps.

  Palette: background #fdfbf4, headings #7d7062 (#8b7f73 on mobile),
  body #9b9484.

  The canvas is split at the intro, whose "Read more" expands in normal flow:
    1. Hero, title, credits and intro   Figma y 0–1966      (flow)
    2. The rest                          Figma y 1966 to END (absolute, rebased by r())
*/

const IMG = assetPath("/images/projects/virsa-baltistan");

/** Every "Discover" link on the experience tiles opens this page. */
const EXPERIENCES_HREF = "/work/virsa-experiences";
/** "View Image Gallery" opens the visual-archive (creative direction) page. */
const ARCHIVE_HREF = "/work/virsa-archive";

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
  "In the creative world, there are works that inspire and ignite, but\nseldom are there projects that invent an entirely new parallel. In them, you discover yourself.. your true abilities, your profound shortcomings, and your core potential. For AJC, Virsa Baltistan was precisely that.",
  "A hotel situated in India’s last village, its story is bound to a modern border that brought the land of Turtuk from Baltistan into Ladakh, India, during the skirmish of 1971. It is a place where lines on a map shifted, but the ancestral soul, language, and culture of the Balti people remained proudly intact.",
  "To build the launch identity for Virsa Baltistan was not to merely design a brand for a luxury boutique stay; it was an exercise in preserving an isolated living legacy. It required an approach that respects the deep, untamed history of the land, while translating its poignant geopolitical narrative into a luxury format for the world.",
  "We did not design this brand from a desk in Delhi. We arrived and stationed ourselves in Ladakh for nearly six months, completely immersing our lives and our practice into the Baltistan we were preparing to share with the world. We lived the narrative, directed the visuals, and breathed life into the physical hotel and its identity from the ground up.",
  "What followed was the launch of India’s Best Boutique Stay (Travel + Leisure 2025)—a definitive flagship project, and a place to which we remain deeply, unalterably ingrained.",
];

/**
 * Section title. Mobile: Cormorant 45, tracking -6%, #8b7f73, at x49.
 * Desktop: 97 / 76 at its Figma coordinate. `className` sets the mobile gap.
 */
function Heading({
  children,
  x,
  y,
  w = 868,
  level = 2,
  className,
}: {
  children: ReactNode;
  x: number;
  y: number;
  w?: number;
  level?: 1 | 2;
  className?: string;
}) {
  const Tag = level === 1 ? "h1" : "h2";
  return (
    <Tag
      className={cn(
        "font-cormorant px-[49px] text-[45px] leading-[42px] tracking-[-0.06em] text-[#8b7f73] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:p-0 xl:text-[length:calc(97*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-5.82*var(--u))] xl:text-[#7d7062]",
        className,
      )}
      style={at(x, y, w)}
    >
      {children}
    </Tag>
  );
}

/**
 * Body copy. Mobile: Helvetica 10, 214px wide at x59. Desktop: 20 / 23 at
 * its Figma coordinate; its line breaks follow the desktop frame only.
 */
function Copy({
  children,
  x,
  y,
  w,
  mobile = "ml-[59px]",
  className,
}: {
  children: ReactNode;
  x: number;
  y: number;
  w: number;
  /** Mobile left margin (Figma x). */
  mobile?: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        mobile,
        "font-helvetica-regular max-w-[214px] text-[10px] leading-[1.2] tracking-[0.02em] text-[#9b9484] opacity-80 xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:max-w-none xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))] xl:opacity-100 [&_br]:hidden xl:[&_br]:inline",
        className,
      )}
      style={at(x, y, w)}
    >
      {children}
    </p>
  );
}

/**
 * A photo at Figma (x, top) with its Figma size; `top` is already rebased.
 * Below xl it fills its container at `ar` (the mobile frame's crop), else at
 * its desktop aspect ratio. `className` sets the mobile gap.
 */
function Pic({
  file,
  alt,
  x,
  top,
  w,
  h,
  ar,
  priority,
  className,
}: {
  file: string;
  alt: string;
  x: number;
  top: number;
  w: number;
  h: number;
  ar?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-(--ar) w-full overflow-hidden xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:aspect-auto xl:h-(--h) xl:w-(--w) [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover",
        className,
      )}
      style={{ ...at(x, top, w), "--h": u(h), "--ar": ar ?? `${w} / ${h}` } as CSSProperties}
    >
      <OptimizedImage
        src={`${IMG}/${file}`}
        alt={alt}
        width={w}
        height={h}
        priority={priority}
        sizes={`(min-width: 1920px) ${w}px, (min-width: 1280px) ${+((w / 1920) * 100).toFixed(2)}vw, 100vw`}
      />
    </div>
  );
}

/** A press-logo link at Figma (x, y, w, h); `className` gives its mobile size. */
function PressLogo({
  src,
  alt,
  href,
  x,
  y,
  w,
  h,
  cover,
  className,
}: {
  src: string;
  alt: string;
  href: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** For a file with transparent padding around the logo: crop to the box instead of fitting. */
  cover?: boolean;
  className: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "block transition-opacity duration-300 hover:opacity-70 xl:absolute xl:top-(--y) xl:left-(--x) xl:h-(--h) xl:w-(--w)",
        className,
      )}
      style={{ ...at(x, r(y), w), "--h": u(h) } as CSSProperties}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        width={w}
        height={h}
        sizes={`(min-width: 1920px) ${w}px, 140px`}
        className={cn("h-full w-full", cover ? "object-cover" : "object-contain")}
      />
    </a>
  );
}

export function VirsaBaltistanPage() {
  return (
    <div className="@container relative mx-auto w-full max-w-[1920px] overflow-hidden bg-[#fdfbf4] [--u:calc(100cqw/1920)]">
      {/* ============ 1. HERO + INTRO (Figma y 0–1966) ============ */}
      <section className="relative flex flex-col xl:block xl:min-h-[calc(1966*var(--u))]">
        {/* Holds the photo and its labels; at xl it dissolves so both sit on the canvas. */}
        <div className="relative xl:contents">
          <Pic
            file="hero.png"
            alt="A rider on horseback outside Virsa Baltistan, framed by leaves"
            x={0}
            top={0}
            w={1920}
            h={1104}
            ar="390 / 700"
            priority
            // Mobile frame: the photo is a 1307x699 plate at x-97 (node 175-DSC06192).
            className="max-md:[&_img]:left-[-97px]! max-md:[&_img]:w-[1307px]! max-md:[&_img]:max-w-none!"
          />
          <p
            className="font-helvetica absolute inset-x-0 top-[90px] text-center text-[15px] font-bold tracking-[0.02em] text-white uppercase opacity-80 xl:inset-x-auto xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-right xl:text-[length:calc(28*var(--u))] xl:tracking-[calc(0.56*var(--u))]"
            style={at(1477, 523, 348)}
          >
            AJC in Ladakh / لداخ
          </p>
          <p
            className="font-helvetica absolute inset-x-0 bottom-[67px] text-center text-[15px] font-bold tracking-[0.02em] text-white uppercase opacity-80 xl:inset-x-auto xl:top-(--y) xl:bottom-auto xl:left-(--x) xl:w-(--w) xl:text-left xl:text-[length:calc(28*var(--u))] xl:tracking-[calc(0.56*var(--u))]"
            style={at(111, 523, 348)}
          >
            2024 – 2026
          </p>
        </div>

        <Heading level={1} x={117} y={1231} className="mt-[70px]">
          Virsa Baltistan
        </Heading>
        <ul
          className="font-helvetica-regular mt-[36px] ml-[56px] text-[12px] leading-[19px] tracking-[0.02em] text-[#7d7062] uppercase opacity-60 max-md:mt-[42px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:text-[length:calc(28*var(--u))] xl:leading-[0.9976] xl:tracking-[calc(0.56*var(--u))] xl:opacity-80"
          style={at(117, 1437, 523)}
        >
          <li>Strategy</li>
          <li>Brand Identity</li>
          <li>Narrative</li>
          <li>Website Design &amp; Dev</li>
          <li>Social Media &amp; PR</li>
          <li>Hotel Launch</li>
        </ul>

        <div className="mt-[51px] pr-[57px] pl-[82px] max-md:mt-[50px] xl:contents">
          <VirsaExpandableIntro
            responsive
            compact
            // Mobile frame shows 17.7em of copy (to y1210) before "Read more".
            clamp="max-h-[17em] max-md:max-h-[17.7em]"
            x={989}
            y={1437}
            width={677}
            full={INTRO.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="max-md:mb-[13px] max-md:whitespace-pre-line"
              >
                {paragraph}
              </p>
            ))}
            toggle={{ x: 3, y: 273 }}
            gapBelow={233}
          />
        </div>
      </section>

      {/* ============ 2. THE REST (Figma y 1966 onward) ============ */}
      <div
        className="relative flex flex-col pb-[80px] xl:block xl:h-(--end) xl:pb-0"
        style={{ "--end": u(END - SPLIT) } as CSSProperties}
      >
        <Pic
          file="landscape.png"
          alt="A rider at the gate of Virsa Baltistan"
          x={0}
          top={r(1966)}
          w={1920}
          h={1129}
          ar="390 / 650"
          // Mobile crop: keeps the rider and flag in the middle of the frame.
          className="mt-[60px] max-md:mt-[68px] [&_img]:object-[36%_50%] max-md:[&_img]:object-[32%_50%] xl:[&_img]:object-center"
        />

        {/* ---- Identity: the logo on its construction grid ---- */}
        <Heading x={117} y={r(3182)} className="mt-[68px]">
          Identity
        </Heading>
        <div className="mx-auto mt-[76px] w-[207px] xl:contents">
          <Pic
            file="logo-construction.png"
            alt="The Virsa Baltistan logo on its construction grid"
            x={658}
            top={r(3494)}
            w={620}
            h={336}
          />
        </div>
        {/* K2, with the Virsa mark set over it (part of the image) */}
        <Pic
          file="k2.png"
          alt="K2, the mountain the Virsa logo is drawn from, with the Virsa mark"
          x={0}
          top={r(4228)}
          w={1920}
          h={1133}
          ar="390 / 423"
          // Mobile plate is 743 wide at x-176 (node 2Chogori 1).
          className="mt-[74px] max-md:[&_img]:left-[-176px]! max-md:[&_img]:w-[743px]! max-md:[&_img]:max-w-none!"
        />
        {/* Mobile: the two sketches side by side, then the artisan full width. */}
        <div className="grid grid-cols-[189fr_201fr] xl:contents">
          <Pic
            file="identity-2.png"
            alt="A hand sketching the logo"
            x={647}
            top={r(5362)}
            w={641}
            h={1133}
            ar="189 / 132"
          />
          <Pic
            file="identity-1.png"
            alt="A pencil sketch of the K2 summit line"
            x={8}
            top={r(5362)}
            w={641}
            h={1133}
            ar="201 / 132"
          />
        </div>
        <Pic
          file="identity-3.png"
          alt="A Balti artisan at work"
          x={1287}
          top={r(5362)}
          w={633}
          h={1133}
          ar="390 / 207"
        />

        {/* ---- Iconography ---- */}
        <Heading x={130} y={r(6636)} className="mt-[69px]">
          Iconography
        </Heading>
        <Copy x={989} y={r(7059)} w={712} className="mt-[42px]">
          Conceptualized by hotel-founder Rashidullah Khan, the logo draws <br />
          directly from K2, the defining mountain of the regional landscape. <br />
          The letter A in Virsa integrates two intentional design details: <br />a snow-capped top
          representing the summit, and a sharp 45-degree angle referencing the steep slopes of the
          mountain&rsquo;s high-altitude Death Zone.
        </Copy>
        <div className="mt-[14px] ml-[242px] w-[97px] max-md:mt-[39px] xl:contents">
          <Pic file="mark.png" alt="The Virsa mark" x={409} top={r(6948)} w={240} h={225} />
        </div>

        {/* ---- Colour Palette ---- */}
        <Heading x={130} y={r(7506)} className="mt-[85px]">
          <span className="md:hidden">Color</span>
          <span className="max-md:hidden">Colour</span> Palette
        </Heading>
        <div className="relative mt-[30px] xl:contents">
          <Pic
            file="palette.png"
            alt="The Turtuk valley in autumn, the landscape the palette is drawn from"
            x={0}
            top={r(7641)}
            w={1920}
            h={946}
            ar="390 / 286"
            // Mobile plate is 590 wide at x-132 (node Harsh_Surti_3 2).
            className="md:aspect-[1920/946] max-md:[&_img]:left-[-132px]! max-md:[&_img]:w-[590px]! max-md:[&_img]:max-w-none!"
          />
          {/* Swatches: vectors in Figma, not part of the photo. Two rows of four on
              mobile (x70 y113, 251x60), one row of eight from md up (x292 y8075 as % of the photo). */}
          <div
            aria-hidden
            className="absolute top-[113px] left-[70px] grid h-[60px] w-[251px] grid-cols-4 md:top-[45.88%] md:left-[15.21%] md:h-[8.25%] md:w-[68.96%] md:grid-cols-8 xl:top-(--y) xl:left-(--x) xl:h-[calc(78*var(--u))] xl:w-(--w) xl:grid-cols-8"
            style={at(292, r(8075), 1324)}
          >
            <div className="bg-[#5d6f5b]" />
            <div className="bg-[#789475]" />
            <div className="bg-[#fff4ee]" />
            <div className="bg-[#fdfbf4]" />
            <div className="bg-[#7f5f47]" />
            <div className="bg-[#4f4644]" />
            <div className="bg-[#666769]" />
            <div className="bg-black" />
          </div>
        </div>
        <Copy x={989} y={r(8697)} w={712} className="mt-[73px]">
          Baltistan is defined by its breathtaking terrain, and Virsa&rsquo;s palette is <br />
          directly borrowed from the landscapes of Turtuk. The deep green mirrors <br />
          the resilient farmlands that sustain the valley, while grey reflects the ancient,
          weathered riverbeds. Warm brown for the local timber foundational to <br />
          Balti architecture, and beige captures the fleeting cloud shadows that continuously shift
          across the mountain slopes.
        </Copy>

        {/* ---- Mascot of the Mountains ---- */}
        <Heading x={130} y={r(9074)} className="mt-[68px] max-md:mt-[62px] max-md:leading-[46px]">
          Mascot of the
          <br />
          Mountains
        </Heading>
        {/* Mobile: the ibex and its copy on the left, the film on the right. */}
        <div className="mt-[36px] ml-[49px] grid grid-cols-[111px_197px] gap-x-[23px] max-md:mt-[34px] xl:contents">
          <div className="flex flex-col xl:contents">
            <div className="mt-[61px] ml-[6px] w-[84px] xl:contents">
              <Pic
                file="ibex.png"
                alt="The Virsa ibex mascot"
                x={340}
                top={r(9579)}
                w={309}
                h={404}
              />
            </div>
            <p
              className="font-helvetica-regular mt-[50px] text-[9px] leading-[1.2] tracking-[0.02em] text-[#9b9484] opacity-80 xl:absolute xl:top-(--y) xl:left-(--x) xl:mt-0 xl:w-(--w) xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))] xl:opacity-100"
              style={at(130, r(10283), 679)}
            >
              Rugged terrains &amp; craggy mountains, the shadow of Ibex leering in motion &amp; the
              wind gushing by. Mirroring the strength of the poised navigator of our mountains,
              Virsa stands tall &amp; untamed in the wild.
            </p>
          </div>
          <div className="max-md:*:aspect-[197/309]! xl:contents">
            <VirsaFilmPlayer
              responsive
              src={assetPath("/videos/virsa-ibex.mp4")}
              poster={`${IMG}/ibex-film-poster.jpg`}
              title="the Virsa ibex film"
              box={{ x: 980, y: r(9316), w: 913, h: 1061 }}
              // Figma: the triangle is centred on the film (x1404 y9814, 65px).
              triangle={{ x: 424, y: 498, size: 65 }}
            />
          </div>
        </div>

        {/* ---- Website Design ---- */}
        <Heading x={130} y={r(10581)} className="mt-[59px]">
          Website Design
        </Heading>
        <div className="mt-[53px] max-md:mt-[57px] xl:contents">
          <VirsaSlideCarousel
            responsive
            label="Website pages"
            slides={WEBSITE}
            box={{ x: 261, y: r(10753), w: 1414, h: 884 }}
            arrows={{ y: r(11094), left: 90, right: 1773 }}
            fit="contain"
            // Opens on website-5, the page the client wants seen first.
            start={4}
          />
        </div>

        {/* ---- Brand Assets ---- */}
        <Heading x={130} y={r(11805)} className="mt-[75px]">
          Brand Assets
        </Heading>
        <div className="mt-[46px] flex flex-col gap-[7px] px-[11px] max-md:mt-[47px] xl:contents">
          <Pic
            file="assets-3.png"
            alt="Virsa brochures laid on autumn leaves"
            x={20}
            top={r(12927)}
            w={1900}
            h={1079}
            ar="369 / 207"
          />
          <div className="grid grid-cols-[202fr_159fr] gap-[8px] xl:contents">
            <Pic
              file="assets-1.png"
              alt="A Virsa welcome letter with the ibex on a bed"
              x={43}
              top={r(11939)}
              w={911}
              h={893}
              ar="202 / 226"
            />
            <Pic
              file="assets-2.png"
              alt="The Virsa Baltistan guest information card"
              x={1148}
              top={r(11977)}
              w={522}
              h={739}
              ar="159 / 226"
            />
          </div>
        </div>
        <div className="mx-auto mt-[40px] grid w-[204px] grid-cols-2 gap-[7px] xl:contents">
          <Pic
            file="directory-1.png"
            alt="Guest directory: Welcome to Virsa"
            x={235}
            top={r(14268)}
            w={358}
            h={507}
          />
          <Pic
            file="directory-2.png"
            alt="Guest directory: the Shyok river at Turtuk"
            x={604}
            top={r(14268)}
            w={358}
            h={507}
          />
          <Pic
            file="directory-3.png"
            alt="Guest directory: location and history"
            x={974}
            top={r(14268)}
            w={358}
            h={507}
          />
          <Pic
            file="directory-4.png"
            alt="Guest directory: transportation"
            x={1343}
            top={r(14269)}
            w={358}
            h={507}
          />
        </div>
        <div className="mt-[28px] px-[11px] xl:contents">
          <Pic
            file="assets-4.png"
            alt="A Virsa brochure on a rock"
            x={43}
            top={r(15105)}
            w={913}
            h={1061}
            ar="368 / 428"
          />
        </div>
        {/* Postcard close-ups. Mobile frame 3995:1393 overlaps them in a 229px
            band, the address side on top. */}
        <div className="relative mt-[63px] h-[229px] xl:contents">
          <div className="absolute top-[99px] left-[122px] z-10 w-[194px] max-md:left-[124px] xl:contents">
            <Pic
              file="card-1.png"
              alt="The Virsa Postale postcard, address side"
              x={1168}
              top={r(16468)}
              w={425}
              h={284}
            />
          </div>
          <div className="absolute top-0 left-[74px] w-[194px] xl:contents">
            <Pic
              file="card-2.png"
              alt="The Virsa Postale postcard: The land of Baltistan"
              x={1278}
              top={r(16684)}
              w={425}
              h={284}
            />
          </div>
        </div>
        <Pic
          file="assets-5.png"
          alt="Open Virsa brochures on a rock"
          x={979}
          top={r(15105)}
          w={913}
          h={1061}
          ar="390 / 451"
          className="mt-[67px] max-md:mt-[63px]"
        />
        <Pic
          file="assets-6.png"
          alt="A Virsa Postale postcard among dried grass"
          x={43}
          top={r(16187)}
          w={913}
          h={1061}
          ar="390 / 455"
          className="mt-[4px]"
        />
        <div className="mt-[5px] grid grid-cols-3 xl:contents">
          <Pic
            file="assets-7.png"
            alt="A Virsa tote bag hanging from a tree"
            x={3}
            top={r(17269)}
            w={639}
            h={962}
            ar="130 / 196"
          />
          <Pic
            file="assets-8.png"
            alt="Hands holding a Virsa menu"
            x={642}
            top={r(17269)}
            w={639}
            h={962}
            ar="130 / 196"
          />
          <Pic
            file="assets-9.png"
            alt="Virsa table cards in a guest room"
            x={1277}
            top={r(17269)}
            w={643}
            h={962}
            ar="130 / 196"
          />
        </div>

        {/* ---- Social Media ---- */}
        <Heading x={130} y={r(18353)} className="mt-[65px] max-md:mt-[59px] max-md:pl-[54px]">
          Social Media
        </Heading>
        <Copy
          x={989}
          y={r(18412)}
          w={663}
          mobile="ml-[64px]"
          className="mt-[30px] max-md:mt-[36px]"
        >
          Built entirely on organic growth, Virsa&rsquo;s digital presence serves <br />
          as an authentic window into daily life at the property. Rather than <br />
          treating Instagram as isolated media, every visual contributes to <br />a unified
          narrative: the story of a modern Baltistan fortress. <br />
          Through professional photography and intentional curation, <br />
          the grid balances royalty, unhurried leisure, and spatial presence. <br />
          For the brand, we adhere to a simple ethos: less is more.
        </Copy>
        <div className="mt-[97px] px-[21px] xl:contents">
          <VirsaSlideCarousel
            responsive
            label="Instagram grid"
            slides={SOCIAL}
            box={{ x: 711, y: r(19048), w: 542, h: 1075 }}
            arrows={{ y: r(19518), left: 436, right: 1384 }}
          />
        </div>

        {/* ---- Creative Direction: links to the visual-archive page ---- */}
        <Heading x={138} y={r(20650)} className="mt-[72px] max-md:mt-[68px] max-md:pl-[54px]">
          Creative
          <br className="xl:hidden" /> Direction
        </Heading>
        <div className="mx-auto mt-[41px] grid w-[313px] grid-cols-2 gap-[7px] max-md:mt-[38px] xl:contents">
          <Pic
            file="creative-1.jpg"
            alt="Timber balconies above a stone lane at Virsa"
            x={91}
            top={r(20810)}
            w={420}
            h={630}
            ar="153 / 229"
          />
          <Pic
            file="creative-2.jpg"
            alt="A guest reading on loungers by the pool"
            x={530}
            top={r(20810)}
            w={420}
            h={630}
            ar="153 / 229"
          />
          <Pic
            file="creative-3.jpg"
            alt="Mountain light through a window at Virsa"
            x={969}
            top={r(20810)}
            w={420}
            h={630}
            ar="153 / 229"
          />
          <Pic
            file="creative-4.jpg"
            alt="A polo player readying his horse"
            x={1409}
            top={r(20810)}
            w={420}
            h={630}
            ar="153 / 229"
          />
        </div>
        <Link
          href={ARCHIVE_HREF}
          className="font-helvetica-regular xl:font-helvetica mt-[25px] self-center text-[9px] tracking-[0.02em] whitespace-nowrap text-[#836b43] uppercase underline transition-opacity hover:opacity-70 xl:absolute xl:top-(--y) xl:left-(--x) xl:mt-0 xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:font-bold xl:tracking-[calc(0.4*var(--u))] xl:text-[#9b9484] xl:no-underline"
          style={at(847, r(21491))}
        >
          View Image Gallery
        </Link>

        {/* ---- Experience Design ---- */}
        <Heading x={139} y={r(21619)} className="mt-[53px] max-md:mt-[50px] max-md:pl-[54px]">
          Experience
          <br className="xl:hidden" /> Design
        </Heading>
        <div className="mt-[50px] max-md:mt-[51px] xl:contents">
          <VirsaExperienceCarousel
            responsive
            className="aspect-[390/523]"
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
        </div>

        {/* ---- PR & Media ---- */}
        <Heading x={129} y={r(23017)} className="mt-[57px]">
          PR &amp; Media
        </Heading>
        <a
          href="https://www.travelandleisureasia.com/in/news/best-domestic-hotels-iba-2025/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[42px] block transition-opacity duration-300 hover:opacity-90 xl:contents"
        >
          <Pic
            file="award-banner.png"
            alt="Travel + Leisure India’s Best Awards 2025: Best Boutique Stay"
            x={0}
            top={r(23189)}
            w={1920}
            h={1080}
            ar="390 / 619"
          />
        </a>

        {/* ---- Features (press logos) ---- */}
        <h2 className="font-cormorant mt-[57px] px-[49px] text-[45px] leading-[42px] tracking-[-0.06em] text-[#8b7f73] xl:hidden">
          Features
        </h2>
        {/* Mobile: the logo group is a 290x64 box at x49; each logo sits at its Figma offset. */}
        <div className="relative mt-[13px] ml-[49px] flex h-[64px] w-[290px] flex-wrap items-center justify-center gap-x-[36px] gap-y-[16px] max-md:block md:mx-0 md:ml-0 md:h-auto md:w-auto md:px-[49px] xl:contents">
          <PressLogo
            src={`${IMG}/press/architectural-digest.png`}
            alt="Read about Virsa Baltistan in Architectural Digest"
            href="https://www.architecturaldigest.in/story/a-well-curated-regional-meal-awaits-you-in-ladakhs-prettiest-village-turtuk-best-restaurants-leh-where-to-eat/"
            x={117}
            y={24510}
            w={116}
            h={75}
            className="h-[19px] w-[30px] max-md:absolute max-md:top-[5px] max-md:left-0"
          />
          <PressLogo
            src={assetPath("/images/projects/ranjits-svaasa/press-robb.png")}
            alt="Read about Virsa Baltistan in Robb Report"
            cover
            href="https://www.robbreportindia.com/travel/india/best-of-the-best-hotels-india-raffles-ran-baas-fairmont-lotus-palace"
            x={381}
            y={24532}
            w={278}
            h={59}
            className="h-[29px] w-[137px] max-md:absolute max-md:top-0 max-md:left-[66px]"
          />
          <PressLogo
            src={`${IMG}/press/conde-nast-traveller.png`}
            alt="Read about Virsa Baltistan in Condé Nast Traveller"
            href="https://www.cntraveller.in/story/the-best-hotels-in-ladakh/"
            x={791}
            y={24522}
            w={193}
            h={69}
            className="h-[19px] w-[54px] max-md:absolute max-md:top-[5px] max-md:left-[236px]"
          />
          <PressLogo
            src={`${IMG}/press/travel-leisure.png`}
            alt="Read the Travel + Leisure feature on Turtuk and Virsa"
            href="https://www.virsaladakh.com/_files/ugd/6168af_d99bffa269a54f488bb2da2d01a9aa50.pdf"
            x={1142}
            y={24527}
            w={246}
            h={57}
            className="h-[19px] w-[82px] max-md:absolute max-md:top-[45px] max-md:left-[30px]"
          />
          {/* No logo file was supplied for Brown History, so its name is set in type. */}
          <a
            href="https://www.instagram.com/p/DRczqw0AU6L/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-helvetica text-center text-[11px] font-bold tracking-[-0.02em] text-black transition-opacity duration-300 hover:opacity-70 max-md:absolute max-md:top-[49px] max-md:left-[179px] max-md:w-[82px] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(28*var(--u))] xl:leading-[calc(28*var(--u))]"
            style={at(1564, r(24542), 197)}
          >
            Brown History
          </a>
        </div>

        {/* ---- Team ---- */}
        <Heading x={130} y={r(24705)} className="mt-[56px] max-md:mt-[54px]">
          Team
        </Heading>
        {/* Mobile: one row per role, names stacked beside it. */}
        <dl className="mt-[31px] ml-[62px] grid grid-cols-[139px_1fr] gap-y-[18px] text-[12px] leading-[17px] tracking-[0.02em] text-[#9b9484] uppercase max-md:mt-[34px] max-md:grid-rows-[36px_36px_69px_41px_auto] max-md:gap-y-0 max-md:leading-[14px] xl:hidden">
          <dt className="font-helvetica font-bold">Concept</dt>
          <dd className="font-helvetica-regular">Rashidullah Khan</dd>
          <dt className="font-helvetica font-bold">Community</dt>
          <dd className="font-helvetica-regular">Turtuk Village</dd>
          <dt className="font-helvetica font-bold">Photography</dt>
          <dd className="font-helvetica-regular">
            <span className="max-md:hidden">
              Avani Rai
              <br />
            </span>
            Alex Buzolic
            <br />
            Marie-Eve
            <br />
            Ansen Antony
          </dd>
          <dt className="font-helvetica font-bold">Visual Design</dt>
          <dd className="font-helvetica-regular">
            Beth
            <br />
            Praneet Selva
          </dd>
          <dt className="font-helvetica font-bold">Cinematography</dt>
          <dd className="font-helvetica-regular">Shivanshu Negi</dd>
        </dl>
        {/* Desktop: three columns of role / name rows, 36px apart. */}
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
          const rowY = r(24714) + (i % 3) * 36;
          return (
            <div key={`${roleX}-${role}-${name}`} className="hidden xl:contents">
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
        <div className="mt-[46px] flex flex-col items-center text-center max-md:mt-[68px] xl:contents">
          <div
            aria-hidden
            className="font-cormorant text-[40px] leading-none font-bold text-[#7d7062] max-md:font-normal xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(80*var(--u))]"
            style={at(905, r(24925), 110)}
          >
            &gt;
          </div>
          <Link
            href={EXPERIENCES_HREF}
            className="font-cormorant mt-[8px] block text-[40px] leading-none tracking-[-0.06em] text-[#7d7062] xl:absolute xl:top-(--y) xl:left-(--x) xl:mt-0 xl:w-(--w) xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-4.8*var(--u))]"
            style={at(654, r(25013), 612)}
          >
            Next Project
          </Link>
          <p
            className="font-helvetica-regular mt-[14px] text-[11px] tracking-[0.02em] whitespace-nowrap text-[#9b9484] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:mt-0 xl:w-(--w) xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
            style={at(853, r(25115), 214)}
          >
            Virsa Experiences
          </p>
        </div>
      </div>
    </div>
  );
}
