import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { VirsaExpandableIntro } from "@/components/work/VirsaExpandableIntro";
import { VirsaFilmPlayer } from "@/components/work/VirsaFilmPlayer";
import { assetPath, at, cn, u } from "@/lib/utils";

/*
  Virsa Experiences — project page at /work/virsa-experiences (AJC-21), from the
  Figma frame "Virsa Experiences" (node 2823:2054, 1920px wide). Opened from the
  project card on Our Work; "Next Project" on Virsa Baltistan leads here.

  Same technique as Alchi Kitchen: from xl up the frame is a scaled canvas where
  `--u` = 1 Figma px = 100cqw / 1920 and each element sits at its Figma
  coordinates (`at(x, y, w)` + `xl:left-(--x) xl:top-(--y)`). Below xl the same
  elements stack in normal flow (the design has no mobile frame): photos fill the
  width at their own aspect ratio, and portrait pairs sit two to a row.
  Palette: background #fdfbf4, headings #7d7062, body #9b9484.

  Layout: the two "Read more" intros expand in normal flow and push the content
  below them down, so the canvas is split at them:
    A. Hero, title and intro            Figma y 0–1920     (flow)
    B. Second photo                     Figma y 1920–3189  (absolute)
    C. Curating the Experiences intro   Figma y 3189–3579  (flow)
    D. The seven experiences … Next     Figma y 3579–END   (absolute, rebased by d())

  Videos (3.7, 5.6, 7.4 in the source folder) are re-encoded for the web under
  public/videos/virsa-experiences; the originals are up to 1.1 GB.
*/

const IMG = assetPath("/images/projects/virsa-experiences");
const VIDEO = assetPath("/videos/virsa-experiences");

const D_TOP = 3579;
const END = 29240;
const d = (y: number) => y - D_TOP;

/** Section title (Cormorant 97 / 76, tracking -6%) at a Figma coordinate. */
function Heading({
  children,
  x,
  y,
  level = 2,
  id,
  w = 868,
  mobile = "text-5xl leading-none",
  className,
}: {
  children: ReactNode;
  x: number;
  y: number;
  level?: 1 | 2;
  id?: string;
  w?: number;
  /** Size below xl (the mobile frame sets section titles smaller, beside the copy). */
  mobile?: string;
  className?: string;
}) {
  const Tag = level === 1 ? "h1" : "h2";
  return (
    <Tag
      id={id}
      className={cn(
        "font-cormorant scroll-mt-6 tracking-[-0.06em] text-[#7d7062] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(97*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-5.82*var(--u))]",
        mobile,
        "max-md:col-span-5 max-md:mb-[16px] max-md:max-w-[289px] max-md:pl-[49px] max-md:text-[45px] max-md:leading-[50px]",
        className,
      )}
      style={at(x, y, w)}
    >
      {children}
    </Tag>
  );
}

/** Body copy (Helvetica 20, tracking +2%, #9b9484) at a Figma coordinate. */
function Copy({ children, x, y, w }: { children: ReactNode; x: number; y: number; w: number }) {
  return (
    <p
      className="font-helvetica-regular pt-4 pb-6 text-xs leading-[1.6] tracking-[0.02em] text-[#9b9484] max-md:col-start-2 max-md:col-end-3 max-md:self-end max-md:p-0 max-md:text-[10px] max-md:leading-[11px] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:p-0 xl:text-[length:calc(20*var(--u))] xl:leading-[1.25] xl:tracking-[calc(0.4*var(--u))]"
      style={at(x, y, w)}
    >
      {children}
    </p>
  );
}

/**
 * A photo at Figma (x, y) with its Figma size; `top` is already rebased.
 * Below xl it fills its container at its own aspect ratio.
 */
function Pic({
  file,
  alt,
  x,
  top,
  w,
  h,
  priority,
  className,
  lead,
  mobileAspect,
  m,
}: {
  file: string;
  alt: string;
  x: number;
  top: number;
  w: number;
  h: number;
  priority?: boolean;
  className?: string;
  /** First photo of a section: sits beside the title and copy below xl (two columns). */
  lead?: boolean;
  /** Crop below xl (the mobile frame shows the full-width photos as portraits). */
  mobileAspect?: string;
  /** Aspect ratio (w / h) of the 390px mobile frame's crop, below md only. */
  m?: string;
}) {
  return (
    <div
      className={cn(
        lead
          ? "col-start-2 row-span-2 row-start-1 self-start max-md:col-start-4 max-md:col-end-5 max-md:row-span-1 max-md:row-start-2"
          : "col-span-2 max-md:col-span-5",
        m && "max-md:aspect-(--arm)",
        "relative aspect-(--ar) w-full overflow-hidden xl:absolute xl:top-(--y) xl:left-(--x) xl:aspect-auto xl:h-(--h) xl:w-(--w) [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover",
        className,
      )}
      style={
        {
          ...at(x, top, w),
          "--h": u(h),
          "--ar": mobileAspect ?? `${w} / ${h}`,
          "--arm": m,
        } as CSSProperties
      }
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

/**
 * Photos side by side below xl, widths in the Figma ratio (e.g. 896 : 458), with
 * the thin gutter the mobile frame uses. Dissolves at xl, where each sits on the canvas.
 */
function Row({
  cols,
  children,
  className,
}: {
  cols: number[];
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "col-span-2 grid gap-0.5 max-md:col-span-5 max-md:gap-[3px] xl:contents [&>div]:col-span-1",
        className,
      )}
      style={{ gridTemplateColumns: cols.map((c) => `${c}fr`).join(" ") }}
    >
      {children}
    </div>
  );
}

/** A press-logo link at Figma (x, y, w, h); below xl the logos wrap in a row. */
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
  /** Mobile frame position inside the logo group. */
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "block h-10 w-24 transition-opacity duration-300 hover:opacity-70 xl:absolute xl:top-(--y) xl:left-(--x) xl:h-(--h) xl:w-(--w)",
        className,
      )}
      style={{ ...at(x, d(y), w), "--h": u(h) } as CSSProperties}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        width={w}
        height={h}
        sizes={`(min-width: 1920px) ${w}px, 96px`}
        className={cn("h-full w-full", cover ? "object-cover" : "object-contain")}
      />
    </a>
  );
}

/** One team row: bold role, then the name beside it at its Figma x. */
function TeamRow({
  role,
  name,
  x,
  nameX,
  y,
}: {
  role: string;
  name: string;
  x: number;
  nameX: number;
  y: number;
}) {
  return (
    <p
      className="text-sm tracking-[0.02em] text-[#9b9484] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))] xl:whitespace-nowrap"
      style={at(x, d(y), nameX - x)}
    >
      <span className="font-helvetica mr-3 font-bold xl:mr-0 xl:inline-block xl:w-(--w)">
        {role}
      </span>
      <span className="font-helvetica-regular">{name}</span>
    </p>
  );
}

/**
 * One experience: title across the top, copy left and the lead photo right
 * (mobile frame columns x59 / x192), then the rest of the photos full width.
 */
function ExperienceSection({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-0.5 max-md:grid-cols-[59px_105px_28px_163px_35px] max-md:gap-x-0 max-md:gap-y-[3px] xl:contents",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function VirsaExperiencesPage() {
  return (
    <div className="@container relative mx-auto w-full max-w-[1920px] overflow-hidden bg-[#fdfbf4] [--u:calc(100cqw/1920)]">
      {/* ============ A. HERO + INTRO (Figma y 0–1920) ============ */}
      <section className="relative flex flex-col gap-8 max-md:gap-0 xl:block xl:min-h-[calc(1920*var(--u))] xl:gap-0">
        {/* Wrapper holds the photo and its labels; at xl it dissolves so both sit on the canvas. */}
        <div className="relative xl:contents">
          <Pic
            file="hero.png"
            alt="Hands passing a wooden shuttle wound with wool across a hand-woven rug"
            x={0}
            top={0}
            w={1920}
            h={1080}
            mobileAspect="9 / 16"
            m="390 / 700"
            priority
          />
          <p
            className="font-helvetica absolute bottom-10 left-0 w-full text-center text-sm font-bold tracking-[0.04em] text-white uppercase opacity-80 max-md:bottom-[64px] max-md:text-[15px] xl:top-(--y) xl:bottom-auto xl:left-(--x) xl:w-(--w) xl:text-left xl:text-[length:calc(28*var(--u))] xl:tracking-[calc(0.56*var(--u))]"
            style={at(103, 507, 348)}
          >
            2025 / ۲۰۲۵
          </p>
          <p
            className="font-helvetica absolute top-24 left-0 w-full text-center text-sm font-bold tracking-[0.04em] text-white uppercase opacity-80 max-md:top-[88px] max-md:text-[15px] xl:top-(--y) xl:right-auto xl:bottom-auto xl:left-(--x) xl:w-(--w) xl:text-right xl:text-[length:calc(28*var(--u))] xl:tracking-[calc(0.56*var(--u))]"
            style={at(1469, 507, 348)}
          >
            AJC in Ladakh / لداخ
          </p>
        </div>

        <div className="px-6 max-md:px-0 max-md:pt-[62px] xl:contents">
          <Heading
            level={1}
            x={113}
            y={1231}
            w={600}
            mobile="text-4xl leading-none"
            className="max-md:leading-[46px]!"
          >
            Experiences at
            <br />
            Virsa Baltistan
          </Heading>
          <ul
            className="font-helvetica-regular mt-6 text-xs leading-[1.5] tracking-[0.02em] text-[#7d7062] uppercase opacity-80 max-md:mt-[47px] max-md:ml-[59px] max-md:leading-[19px] max-md:opacity-60 xl:absolute xl:top-(--y) xl:left-(--x) xl:mt-0 xl:w-(--w) xl:text-[length:calc(28*var(--u))] xl:leading-[calc(32*var(--u))] xl:tracking-[calc(0.56*var(--u))]"
            style={at(109, 1576, 523)}
          >
            <li>Strategy</li>
            <li>Narrative</li>
            <li>Experience Design</li>
            <li>Photography &amp; Film</li>
            <li>Creative Direction</li>
          </ul>
        </div>

        {/* Mobile: the copy sits at x81 in 11px type, 13px between paragraphs. */}
        <div className="max-md:mt-[70px] max-md:pr-[54px] max-md:pl-[81px] xl:contents max-md:[&>div]:px-0 max-md:[&>div>button]:mt-[19px] max-md:[&>div>button]:text-[11px] max-md:[&>div>div]:text-[11px] max-md:[&>div>div]:leading-[1.18] max-md:[&>div>div.overflow-hidden]:max-h-[17.7em]!">
          <VirsaExpandableIntro
            responsive
            x={981}
            y={1438}
            width={677}
            full={
              <div className="flex flex-col gap-4 max-md:gap-[13px] xl:gap-[calc(20*var(--u))]">
                <p>
                  Virsa Baltistan rises as a modern-day fortress reviving the forgotten culture and
                  royal legacy of Baltistan.
                </p>
                <p>
                  To build the world within these walls, we explored every raw, unvarnished thread
                  of the land, restoring lost traditions and borrowing directly from the untamed
                  nature around us. We consciously moved past the boundaries of conventional
                  hospitality, treating the stark, beautiful geography of India’s last village as a
                  living theater of history, culture, and lineage.
                </p>
                <p>
                  Our strategy was to architect an unexpected epitome of luxury and culinary
                  excellence, set precisely where you’d least expect it. By designing a multi-tiered
                  ecosystem of sensory guest rituals—spanning dramatic frontier dining, royal
                  heritage, and indigenous craftsmanship—we transformed heritage preservation into
                  an active, breathing luxury experience.
                </p>
              </div>
            }
            toggle={{ x: 0, y: 272 }}
            gapBelow={187}
          />
        </div>
      </section>

      {/* ============ B. SECOND PHOTO (Figma y 1920–3189) ============ */}
      <div className="relative mt-8 max-md:mt-[70px] xl:mt-0 xl:h-[calc(1269*var(--u))]">
        <Pic
          file="intro.png"
          alt="A hand painting in an open travel journal beside a glass of brushes"
          x={0}
          top={0}
          w={1920}
          h={1080}
          mobileAspect="3 / 5"
          m="390 / 654"
        />
      </div>

      {/* ============ C. CURATING THE EXPERIENCES (Figma y 3189–3579) ============ */}
      <section className="relative flex flex-col gap-6 py-10 max-md:gap-0 max-md:pt-[74px] max-md:pb-[83px] xl:block xl:min-h-[calc(390*var(--u))] xl:py-0">
        <p
          className="font-helvetica px-6 text-sm font-bold tracking-[0.04em] text-[#9b9484] uppercase max-md:mt-[35px] max-md:px-0 max-md:pl-[81px] max-md:text-[10px] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:p-0 xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
          style={at(185, 0, 677)}
        >
          <span className="max-md:hidden">Curating the Experiences</span>
          <span className="md:hidden">Curated Experiences</span>
        </p>
        <div className="max-md:mt-[7px] max-md:pr-[54px] max-md:pl-[81px] xl:contents max-md:[&>div]:px-0 max-md:[&>div>button]:mt-[19px] max-md:[&>div>button]:text-[11px] max-md:[&>div>div]:text-[11px] max-md:[&>div>div]:leading-[1.18] max-md:[&>div>div.overflow-hidden]:max-h-[17.7em]!">
          <VirsaExpandableIntro
            responsive
            x={189}
            y={57}
            width={677}
            full={
              <div className="flex flex-col gap-4 max-md:gap-[13px] xl:gap-[calc(20*var(--u))]">
                <p>
                  Our time in Turtuk, Ladakh was not ear-marked for a corporate wavelength. It was
                  where we discovered, day in, and day out, the rhythms of a mountain village.
                </p>
                <p>
                  We heard stories, countless of them, from the kindest people you could meet. The
                  Baltis. ‘Bal’ means soft as cotton, and ‘Ti’ means those who live on the bank of a
                  river.
                </p>
                <p>
                  We came not to remake this land of the Baltis, but to listen to its stream. Virsa
                  Baltistan stands as our promise – a lineage of mountain warmth, ensuring that the
                  stories written into these borderlands are never lost to time, but lived anew with
                  every guest who enters its gates.
                </p>
              </div>
            }
            toggle={{ x: 0, y: 226 }}
            gapBelow={84}
          />
        </div>
        <nav
          aria-label="The experiences"
          className="font-helvetica-regular -order-1 px-6 text-xs leading-[1.9] tracking-[0.02em] text-[#9b9484] uppercase max-md:px-0 max-md:pl-[59px] max-md:leading-[19px] max-md:opacity-80 xl:absolute xl:top-(--y) xl:left-(--x) xl:order-none xl:w-(--w) xl:p-0 xl:text-[length:calc(28*var(--u))] xl:leading-[calc(33*var(--u))] xl:tracking-[calc(0.56*var(--u))]"
          style={at(1096, 0, 862)}
        >
          <a href="#royal-welcome" className="block transition-opacity hover:opacity-70">
            The Royal Welcome
          </a>
          <a href="#mountain-beach-picnic" className="block transition-opacity hover:opacity-70">
            The Mountain-Beach Picnic
          </a>
          <a href="#dine-with-dynasty" className="block transition-opacity hover:opacity-70">
            Dine with Dynasty
          </a>
          <a href="#dinner-on-the-dunes" className="block transition-opacity hover:opacity-70">
            Dinner on the Dunes
          </a>
          <a href="#recreation-in-baltistan" className="block transition-opacity hover:opacity-70">
            Recreation in Baltistan
          </a>
          <a
            href="#lunch-with-a-local-family"
            className="block transition-opacity hover:opacity-70"
          >
            Lunch with a Local Family
          </a>
          <a href="#ramdan-glacier-trek" className="block transition-opacity hover:opacity-70">
            Ramdan Glacier Trek
          </a>
        </nav>
      </section>

      {/* ============ D. THE EXPERIENCES … NEXT PROJECT (Figma y 3579 onward) ============ */}
      <div
        className="relative flex flex-col gap-16 px-6 pt-6 pb-16 max-md:gap-0 max-md:px-0 max-md:pt-0 max-md:pb-[83px] xl:block xl:h-(--end) xl:gap-0 xl:p-0"
        style={{ "--end": u(END - D_TOP) } as CSSProperties}
      >
        {/* ---- The Royal Welcome ---- */}
        <ExperienceSection>
          <Heading id="royal-welcome" mobile="text-3xl leading-[1.05]" x={269} y={d(3629)}>
            The Royal Welcome
          </Heading>
          <Copy x={273} y={d(4183)} w={501}>
            In the land once ruled by kings, from the Yabgo rulers of Khaplu to the Maqpons of
            Skardu, whose courts shaped the culture, architecture, and traditions of this Himalayan
            kingdom, every welcome carried the dignity of royalty. <br className="md:hidden" />
            <br className="md:hidden" />
            At Virsa, within our modern fortress, we honoured and revived Baltistan’s grandeur with
            a welcome as regal as the land itself. With drums that beat to culture, our horse mascot
            and a Virsa flag, we welcome guests with a salaam in the hotel.
          </Copy>
          <Pic
            lead
            file="royal-welcome-1.png"
            m="163 / 275"
            alt="A Balti man on horseback in traditional dress, among poplar trees"
            x={1193}
            top={d(3719)}
            w={458}
            h={712}
          />
          <Row cols={[896, 458]} className="max-md:mt-[73px]">
            <Pic
              file="royal-welcome-2.png"
              m="256 / 205"
              alt="The Royal Welcome at Virsa Baltistan, guests greeted at the hotel"
              x={273}
              top={d(4487)}
              w={896}
              h={716}
            />
            <Pic
              file="royal-welcome-3.png"
              m="131 / 205"
              alt="The Royal Welcome at Virsa Baltistan, a detail from the ceremony"
              x={1193}
              top={d(4487)}
              w={458}
              h={716}
            />
          </Row>
          <Row cols={[1, 1]}>
            <Pic
              file="royal-welcome-4.png"
              m="194 / 274"
              alt="The Royal Welcome at Virsa Baltistan, drummers and the Virsa flag"
              x={272}
              top={d(5221)}
              w={678}
              h={955}
            />
            <Pic
              file="royal-welcome-5.png"
              m="193 / 274"
              alt="The Royal Welcome at Virsa Baltistan, the horse mascot"
              x={973}
              top={d(5221)}
              w={678}
              h={955}
            />
          </Row>
          <Pic
            file="royal-welcome-6.png"
            m="390 / 362"
            alt="The Royal Welcome at Virsa Baltistan, the welcome within the fortress"
            x={273}
            top={d(6194)}
            w={1378}
            h={777}
          />
          <div className="col-span-2 max-md:col-span-5 max-md:mt-[27px] max-md:px-[5px] max-md:*:aspect-[379/214]! xl:contents">
            <VirsaFilmPlayer
              responsive
              src={`${VIDEO}/royal-welcome.mp4`}
              poster={`${IMG}/royal-welcome-video-poster.jpg`}
              title="the Royal Welcome film"
              box={{ x: 273, y: d(7140), w: 1378, h: 777 }}
              triangle={{ x: 0, y: 0, size: 65 }}
            />
          </div>
        </ExperienceSection>

        {/* ---- The Mountain-Beach Picnic ---- */}
        <ExperienceSection className="max-md:mt-[67px]">
          <Heading id="mountain-beach-picnic" mobile="text-3xl leading-[1.05]" x={269} y={d(8057)}>
            The Mountain-Beach Picnic
          </Heading>
          <Copy x={270} y={d(8642)} w={501}>
            By the secluded banks of the Shyok, a hidden beach becomes your table. A live chef cooks
            fine global cuisine for your lunch or sundowner, as guests prefer. Kombucha is poured by
            the river, and an intimate picnic is quietly shared, away from city life.
          </Copy>
          <Pic
            lead
            file="beach-picnic-1.png"
            m="164 / 251"
            alt="The Mountain-Beach Picnic on the banks of the Shyok"
            x={1177}
            top={d(8057)}
            w={472}
            h={722}
          />
          <Pic
            file="beach-picnic-2.png"
            className="max-md:mt-[60px]"
            m="390 / 199"
            alt="A picnic table laid on the hidden beach by the river"
            x={266}
            top={d(8817)}
            w={1382}
            h={706}
          />
          <Row cols={[681, 679]}>
            <Pic
              file="beach-picnic-3.png"
              m="193 / 269"
              alt="Food and drink served at the beach picnic"
              x={266}
              top={d(9544)}
              w={681}
              h={955}
            />
            <Pic
              file="beach-picnic-4.png"
              m="194 / 269"
              alt="Kombucha poured by the river at the beach picnic"
              x={970}
              top={d(9544)}
              w={679}
              h={955}
            />
          </Row>
          <Pic
            file="beach-picnic-5.png"
            m="390 / 199"
            alt="The Shyok riverbank at the Mountain-Beach Picnic"
            x={266}
            top={d(10520)}
            w={1382}
            h={706}
          />
        </ExperienceSection>

        {/* ---- Dine with Dynasty ---- */}
        <ExperienceSection className="max-md:mt-[75px]">
          <Heading id="dine-with-dynasty" mobile="text-3xl leading-[1.05]" x={269} y={d(11353)}>
            Dine With Dynasty
          </Heading>
          <Copy x={264} y={d(11963)} w={501}>
            A table that breaks history, as guests dine with the royal descendant, the king of Yabgo
            dynasty in the courtyard of their summer palace. A multi-course local-menu reveals with
            it the conversations that span centuries. The Virsa Flagship experience!
          </Copy>
          <Pic
            lead
            file="dine-with-dynasty-1.png"
            m="164 / 251"
            alt="Dine with Dynasty, the royal descendant at the summer palace"
            x={1184}
            top={d(11353)}
            w={458}
            h={722}
          />
          <Row cols={[896, 458]} className="max-md:mt-[51px]">
            <Pic
              file="dine-with-dynasty-2.png"
              m="256 / 210"
              alt="Dine with Dynasty, the courtyard of the summer palace"
              x={264}
              top={d(12126)}
              w={896}
              h={716}
            />
            <Pic
              file="dine-with-dynasty-3.png"
              m="131 / 210"
              alt="Dine with Dynasty, a detail of the table"
              x={1184}
              top={d(12126)}
              w={458}
              h={716}
            />
          </Row>
          <Row cols={[458, 896]}>
            <Pic
              file="dine-with-dynasty-4.png"
              m="131 / 210"
              alt="Dine with Dynasty, a multi-course local menu"
              x={264}
              top={d(12863)}
              w={458}
              h={716}
            />
            <Pic
              file="dine-with-dynasty-5.png"
              m="256 / 210"
              alt="Dine with Dynasty, conversations across the table"
              x={746}
              top={d(12863)}
              w={896}
              h={716}
            />
          </Row>
          <div className="col-span-2 max-md:col-span-5 max-md:mt-[23px] max-md:*:aspect-[390/207]! xl:contents">
            <VirsaFilmPlayer
              responsive
              src={`${VIDEO}/dine-with-dynasty.mp4`}
              poster={`${IMG}/dine-with-dynasty-video-poster.jpg`}
              title="the Dine with Dynasty film"
              box={{ x: 268, y: d(13713), w: 1383, h: 706 }}
              triangle={{ x: 0, y: 0, size: 65 }}
            />
          </div>
        </ExperienceSection>

        {/* ---- Dinner on the Dunes ---- */}
        <ExperienceSection className="max-md:mt-[77px]">
          <Heading id="dinner-on-the-dunes" mobile="text-3xl leading-[1.05]" x={269} y={d(14553)}>
            Dinner On The Dunes
          </Heading>
          <Copy x={268} y={d(15178)} w={501}>
            Set upon the earth’s own table, with burning torches, The Dune Dinner is set on a vast
            stretch of sand, under the stars, where a multi-course menu takes stage in an intimate
            meal.
          </Copy>
          <Pic
            lead
            file="dune-dinner-1.png"
            m="162 / 249"
            alt="Dinner on the Dunes, torches burning on the sand"
            x={1179}
            top={d(14553)}
            w={463}
            h={712}
          />
          <Pic
            file="dune-dinner-2.png"
            className="max-md:mt-[31px]"
            m="390 / 201"
            alt="Dinner on the Dunes, a long table under the stars"
            x={264}
            top={d(15304)}
            w={1383}
            h={706}
          />
          <Row cols={[1, 1]}>
            <Pic
              file="dune-dinner-3.png"
              m="194 / 274"
              alt="Dinner on the Dunes, a plated course"
              x={267}
              top={d(16031)}
              w={678}
              h={955}
            />
            <Pic
              file="dune-dinner-4.png"
              m="193 / 274"
              alt="Dinner on the Dunes, an intimate meal on the sand"
              x={968}
              top={d(16031)}
              w={678}
              h={955}
            />
          </Row>
        </ExperienceSection>

        {/* ---- Recreation in Baltistan ---- */}
        <ExperienceSection className="max-md:mt-[68px]">
          <Heading
            id="recreation-in-baltistan"
            mobile="text-3xl leading-[1.05]"
            x={269}
            y={d(17078)}
          >
            Recreation In Baltistan
          </Heading>
          <Copy x={271} y={d(17663)} w={501}>
            Born from generations of isolation and mountain ingenuity, we bring you directly into
            Turtuk’s quiet workshops. Here, you sit beside master artisans to learn stone-masonry,
            wood-carving, and loom-weaving.. feeling the raw weight of ancestral tools and deep
            patience, keeping these traditions alive.
          </Copy>
          <Pic
            lead
            file="recreation-1.png"
            m="158 / 250"
            alt="Recreation in Baltistan, an artisan’s workshop in Turtuk"
            x={1191}
            top={d(17078)}
            w={455}
            h={722}
          />
          <Row cols={[896, 458]} className="max-md:mt-[33px]">
            <Pic
              file="recreation-2.png"
              m="256 / 205"
              alt="Recreation in Baltistan, learning beside a master artisan"
              x={271}
              top={d(17851)}
              w={896}
              h={716}
            />
            <Pic
              file="recreation-3.png"
              m="131 / 205"
              alt="Recreation in Baltistan, hands at work with ancestral tools"
              x={1191}
              top={d(17851)}
              w={458}
              h={716}
            />
          </Row>
          <Row cols={[1, 1]}>
            <div className="max-md:*:aspect-[194/274]! xl:contents">
              <VirsaFilmPlayer
                responsive
                src={`${VIDEO}/recreation.mp4`}
                poster={`${IMG}/recreation-video-poster.jpg`}
                title="the Recreation in Baltistan film"
                box={{ x: 270, y: d(18585), w: 678, h: 955 }}
                triangle={{ x: 0, y: 0, size: 65 }}
              />
            </div>
            <Pic
              file="recreation-5.png"
              m="196 / 274"
              alt="Recreation in Baltistan, wood-carving in the workshop"
              x={971}
              top={d(18585)}
              w={678}
              h={955}
            />
          </Row>
          <Pic
            file="recreation-6.png"
            m="390 / 225"
            alt="Recreation in Baltistan, stone-masonry and loom-weaving"
            x={271}
            top={d(19558)}
            w={1378}
            h={777}
          />
        </ExperienceSection>

        {/* ---- Lunch with a Local Family ---- */}
        <ExperienceSection className="max-md:mt-[80px]">
          <Heading
            id="lunch-with-a-local-family"
            mobile="text-3xl leading-[1.05]"
            x={269}
            y={d(20484)}
          >
            Lunch With A Local Family
          </Heading>
          <Copy x={278} y={d(21041)} w={501}>
            In Turtuk, every home shares its culture around the Bukhari. Recipes are passed down
            unchanged, beginning with a traditional barley welcome at the door, preserved over
            generations. We created this experience to bring you into a family home—to sit on
            traditional carpets, break bread together, and enter the fabric of local hospitality.
          </Copy>
          <Pic
            lead
            file="local-family-1.png"
            m="157 / 242"
            alt="Lunch with a Local Family, a couple at breakfast"
            x={1189}
            top={d(20484)}
            w={460}
            h={711}
          />
          <Pic
            file="local-family-2.png"
            className="max-md:mt-[38px]"
            m="390 / 207"
            alt="Lunch with a Local Family, a meal around the Bukhari"
            x={278}
            top={d(21242)}
            w={1378}
            h={705}
          />
          <Row cols={[669, 679]}>
            <Pic
              file="local-family-3.png"
              m="192 / 281"
              alt="Lunch with a Local Family, bread shared on traditional carpets"
              x={278}
              top={d(21973)}
              w={669}
              h={958}
            />
            <Pic
              file="local-family-4.png"
              m="195 / 281"
              alt="Lunch with a Local Family, the family at home in Turtuk"
              x={976}
              top={d(21973)}
              w={679}
              h={958}
            />
          </Row>
          <Pic
            file="local-family-5.png"
            m="390 / 207"
            alt="Lunch with a Local Family, the table in a Turtuk home"
            x={278}
            top={d(22950)}
            w={1378}
            h={706}
          />
        </ExperienceSection>

        {/* ---- Ramdan Glacier Trek ---- */}
        <ExperienceSection className="max-md:mt-[90px]">
          <Heading id="ramdan-glacier-trek" mobile="text-3xl leading-[1.05]" x={269} y={d(23768)}>
            Ramdan Glacier Trek
          </Heading>
          <Copy x={274} y={d(24369)} w={471}>
            Along the glacial stream, under a clear blue sky – a path that’s shared, with silence
            simply there. A journey that stops being yours alone, alongside a 3 hour trail of water
            channels &amp; wildflowers, that now runs quietly through your soul.
          </Copy>
          <Pic
            lead
            file="glacier-trek-1.png"
            m="158 / 249"
            alt="Ramdan Glacier Trek, the start of the trail"
            x={1194}
            top={d(23784)}
            w={458}
            h={722}
          />
          <Row cols={[896, 458]} className="max-md:mt-[56px]">
            <Pic
              file="glacier-trek-2.png"
              m="256 / 203"
              alt="Ramdan Glacier Trek, a path along the glacial stream"
              x={274}
              top={d(24557)}
              w={896}
              h={716}
            />
            <Pic
              file="glacier-trek-3.png"
              m="131 / 203"
              alt="Ramdan Glacier Trek, wildflowers along the water channels"
              x={1194}
              top={d(24557)}
              w={458}
              h={716}
            />
          </Row>
          <Pic
            file="glacier-trek-4.png"
            m="390 / 202"
            alt="Ramdan Glacier Trek, under a clear blue sky"
            x={270}
            top={d(25292)}
            w={1383}
            h={706}
          />
          <Row cols={[669, 679]}>
            <Pic
              file="glacier-trek-5.png"
              m="194 / 271"
              alt="Ramdan Glacier Trek, the canyon leading to the glacier"
              x={278}
              top={d(26024)}
              w={669}
              h={958}
            />
            <Pic
              file="glacier-trek-6.png"
              m="193 / 271"
              alt="Ramdan Glacier Trek, the glacial stream"
              x={976}
              top={d(26024)}
              w={679}
              h={958}
            />
          </Row>
        </ExperienceSection>

        {/* ---- Features ---- */}
        <section className="flex flex-col gap-8 max-md:mt-[54px] max-md:gap-0 xl:contents">
          {/* The mobile frame splits this in two: "PR & Media" over the banner, "Features" over the logos. */}
          <Heading x={102} y={d(27148)} className="hidden xl:block">
            Features
          </Heading>
          <h2 className="font-cormorant text-3xl leading-none tracking-[-0.06em] text-[#7d7062] max-md:pl-[49px] max-md:text-[45px] max-md:leading-[42px] xl:hidden">
            PR &amp; Media
          </h2>
          {/* Award banner (Figma y27322), linked to the Travel + Leisure award story. */}
          <a
            href="https://www.travelandleisureasia.com/in/news/best-domestic-hotels-iba-2025/"
            target="_blank"
            rel="noopener noreferrer"
            className="-mx-6 block transition-opacity duration-300 hover:opacity-90 max-md:mx-0 max-md:mt-[60px] xl:contents"
          >
            <Pic
              file="award.png"
              alt="Travel + Leisure India’s Best Awards 2025: Best Boutique Stay"
              x={0}
              top={d(27322)}
              w={1920}
              h={1080}
              mobileAspect="3 / 5"
              m="390 / 627"
            />
          </a>
          <h2 className="font-cormorant text-3xl leading-none tracking-[-0.06em] text-[#7d7062] max-md:mt-[34px] max-md:pl-[49px] max-md:text-[45px] max-md:leading-[42px] xl:hidden">
            Features
          </h2>
          {/* Mobile: the logo group is a 290x64 box at x46; each logo sits at its Figma offset. */}
          <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-5 max-md:relative max-md:mt-[27px] max-md:ml-[46px] max-md:block max-md:h-[64px] max-md:w-[290px] xl:contents">
            <PressLogo
              src={assetPath("/images/projects/virsa-baltistan/press/architectural-digest.png")}
              alt="Read about Virsa Baltistan in Architectural Digest"
              href="https://www.architecturaldigest.in/story/a-well-curated-regional-meal-awaits-you-in-ladakhs-prettiest-village-turtuk-best-restaurants-leh-where-to-eat/"
              x={110}
              y={28526}
              w={116}
              h={75}
              className="max-md:absolute max-md:top-[5px] max-md:left-[2px] max-md:h-[19px] max-md:w-[30px]"
            />
            <PressLogo
              src={assetPath("/images/projects/ranjits-svaasa/press-robb.png")}
              alt="Read about Virsa Baltistan in Robb Report"
              cover
              href="https://www.robbreportindia.com/travel/india/best-of-the-best-hotels-india-raffles-ran-baas-fairmont-lotus-palace"
              x={366}
              y={28543}
              w={278}
              h={59}
              className="max-md:absolute max-md:top-[1px] max-md:left-[72px] max-md:h-[29px] max-md:w-[137px]"
            />
            <PressLogo
              src={assetPath("/images/projects/virsa-baltistan/press/conde-nast-traveller.png")}
              alt="Read about Virsa Baltistan in Condé Nast Traveller"
              href="https://www.cntraveller.in/story/the-best-hotels-in-ladakh/"
              x={784}
              y={28538}
              w={193}
              h={69}
              className="max-md:absolute max-md:top-[5px] max-md:left-[236px] max-md:h-[19px] max-md:w-[54px]"
            />
            <PressLogo
              src={assetPath("/images/projects/virsa-baltistan/press/travel-leisure.png")}
              alt="Read the Travel + Leisure feature on Turtuk and Virsa"
              href="https://www.virsaladakh.com/_files/ugd/6168af_d99bffa269a54f488bb2da2d01a9aa50.pdf"
              x={1135}
              y={28543}
              w={246}
              h={57}
              className="max-md:absolute max-md:top-[47px] max-md:left-[30px] max-md:h-[19px] max-md:w-[82px]"
            />
            {/* No logo file was supplied for Brown History, so its name is set in type. */}
            <a
              href="https://www.instagram.com/p/DRczqw0AU6L/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-helvetica text-center text-lg font-bold tracking-[-0.02em] text-black transition-opacity duration-300 hover:opacity-70 max-md:absolute max-md:top-[49px] max-md:left-[179px] max-md:w-[82px] max-md:text-[11px] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(28*var(--u))] xl:leading-[calc(28*var(--u))]"
              style={at(1557, d(28558), 197)}
            >
              Brown History
            </a>
          </div>
        </section>

        {/* ---- Team ---- */}
        <section className="flex flex-col gap-4 max-md:mt-[48px] max-md:gap-0 xl:contents">
          <Heading x={106} y={d(28714)} mobile="text-3xl leading-none" className="max-md:mb-0!">
            Team
          </Heading>
          {/* Mobile frame: roles grouped, names stacked beside them. */}
          <dl className="font-helvetica-regular grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 text-xs tracking-[0.02em] text-[#9b9484] uppercase max-md:mt-[28px] max-md:ml-[62px] max-md:grid-cols-[139px_1fr] max-md:grid-rows-[36px_36px_69px_41px_auto] max-md:gap-0 max-md:leading-[14px] xl:hidden">
            <dt className="font-helvetica font-bold">Concept</dt>
            <dd>Rashidullah Khan</dd>
            <dt className="font-helvetica font-bold">Community</dt>
            <dd>Turtuk Village</dd>
            <dt className="font-helvetica font-bold">Photography</dt>
            <dd>
              Alex Buzolic
              <br />
              Marie-Eve
              <br />
              Ansen Antony
            </dd>
            <dt className="font-helvetica font-bold">Visual Design</dt>
            <dd>
              Beth
              <br />
              Praneet Selva
            </dd>
            <dt className="font-helvetica font-bold">Cinematography</dt>
            <dd>Shivanshu Negi</dd>
          </dl>
          <div className="hidden xl:contents">
            <TeamRow role="Cinematography" name="Shivanshu Negi" x={384} nameX={631} y={28730} />
            <TeamRow role="Photography" name="Ansen Antony" x={384} nameX={631} y={28766} />
            <TeamRow role="Photography" name="Alex Buzolic" x={900} nameX={1111} y={28730} />
            <TeamRow role="Photography" name="Marie-Eve" x={900} nameX={1111} y={28766} />
            <TeamRow
              role="Creative Partner"
              name="Rashidullah Khan"
              x={1366}
              nameX={1627}
              y={28730}
            />
            <TeamRow role="Support Team" name="Virsa Baltistan" x={1366} nameX={1627} y={28766} />
          </div>
        </section>

        {/* ---- Next project ---- */}
        <div className="mt-6 flex flex-col items-center text-center max-md:mt-[73px] xl:contents">
          <div
            aria-hidden
            className="font-cormorant text-5xl leading-none font-bold text-[#7d7062] max-md:text-[40px] max-md:font-normal xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(80*var(--u))]"
            style={at(905, d(28881), 110)}
          >
            &gt;
          </div>
          <Link
            href="/work/virsa-archive"
            className="font-cormorant block text-5xl leading-none tracking-[-0.06em] text-[#7d7062] max-md:mt-[8px] max-md:text-[40px] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-4.8*var(--u))]"
            style={at(654, d(28969), 612)}
          >
            Next Project
          </Link>
          <p
            className="font-helvetica-regular mt-3 text-sm tracking-[0.02em] whitespace-nowrap text-[#9b9484] uppercase max-md:mt-[14px] max-md:text-[11px] xl:absolute xl:top-(--y) xl:left-(--x) xl:mt-0 xl:w-(--w) xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
            style={at(858, d(29078), 205)}
          >
            The Virsa Archive
          </p>
        </div>
      </div>
    </div>
  );
}
