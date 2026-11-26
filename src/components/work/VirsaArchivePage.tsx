import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { VirsaExpandableIntro } from "@/components/work/VirsaExpandableIntro";
import {
  VirsaExperienceCarousel,
  type Experience,
} from "@/components/work/VirsaExperienceCarousel";
import { assetPath, u } from "@/lib/utils";

/*
  Archive of Virsa Baltistan — the visual archive (creative direction) page
  at /work/virsa-archive (AJC-16), from the Figma frame "Virsa
  Baltistan" (node 2823:865, 1920px wide). Opened from "View Image Gallery" on
  the Virsa Baltistan page (the Our Work card opens Virsa Baltistan itself).

  Same technique as the About / Haveli / Neemrana pages: inside a 1920-wide
  `@container`, `--u` = 1 Figma px = 100cqw / 1920, so every Figma coordinate
  is written `calc(<px>*var(--u))` (via u()) and the layout scales with the
  viewport. Tailwind is applied directly to each element; only the varying
  per-element offsets are set inline via u(). Palette: background #fdfbf4,
  headings #7d7062 (taupe), body #9b9484 (sage).

  Layout: two stacked canvases in Figma px.
    1. Top section, Figma y 0–1991: hero, title, credits and the intro. The
       intro's "Read more" expands in normal flow, growing this section.
    2. The rest, Figma y 1991 to the end. Every top is written as r(<figma y>),
       i.e. rebased by -1991, so the numbers still read as Figma coordinates.

  The only extracted pieces are the interactive ones (the "Read more" intro and
  the experience carousel), which own client state — everything static is
  inline JSX below.
*/

/*
  Photos live under this folder. String srcs are prefixed with the base path
  here because next/image does not prefix them under static export.
*/
const VIRSA_IMG = assetPath("/images/projects/virsa-baltistan");
const IMG = `${VIRSA_IMG}/archive`;

const EXPERIENCES_HREF = "/work/virsa-experiences";

const SPLIT = 1991;
// Last element: the "Haveli Dharampura" label at y22821, plus breathing room.
const END = 23061;
const r = (y: number) => y - SPLIT;

/** Experience tiles, in carousel order (shared with the identity page). */
const EXPERIENCES: Experience[] = [
  {
    title: "The Dune Dinner",
    body: "Set upon the earth’s own table, with burning torches, The Dune Dinner is set on a vast stretch of sand, under the stars, where a multi-course Italian menu takes stage in an intimate meal.",
    image: `${VIRSA_IMG}/experiences/dune-dinner.png`,
    alt: "Guests at a torch-lit dinner on the sand dunes at night",
  },
  {
    title: "The Beach Picnic",
    body: "By the secluded banks of the Shyok, a hidden beach becomes your table. A live chef cooks fine global cuisine for your lunch or sundowner, as guests prefer. Kombucha is poured by the river, and an intimate picnic is quietly shared, away from city life.",
    image: `${VIRSA_IMG}/experiences/beach-picnic.png`,
    alt: "A picnic table laid with plates, drinks and sushi",
  },
  {
    title: "Recreation in Baltistan",
    body: "Born from generations of isolation and mountain ingenuity, we bring you directly into Turtuk’s quiet workshops. Here, you sit beside master artisans to learn stone-masonry, wood-carving, and loom-weaving.",
    image: `${VIRSA_IMG}/experiences/recreation-in-baltistan.png`,
    alt: "Hands working a traditional wooden loom",
  },
  {
    title: "Dine With Dynasty",
    body: "A table that breaks history, as guests dine with the royal descendant, the king of Yabgo dynasty in the courtyard of their summer palace.",
    image: `${VIRSA_IMG}/experiences/dine-with-dynasty.png`,
    alt: "An elder in a Balti cap holding a torch at a stone doorway",
  },
  {
    title: "Lunch With A Local Family",
    body: "In Turtuk, every home shares its culture around the Bukhari. Recipes are passed down unchanged, beginning with a traditional barley welcome at the door, preserved over generations.",
    image: `${VIRSA_IMG}/experiences/lunch-with-a-local-family.png`,
    alt: "Grapes ripening on the vine",
  },
  {
    title: "The Royal Welcome",
    body: "In the land once ruled by kings, from the Yabgo rulers of Khaplu to the Maqpons of Skardu, whose courts shaped the culture, architecture, and traditions of this Himalayan kingdom, every welcome is as regal as the land itself.",
    image: `${VIRSA_IMG}/experiences/royal-welcome.png`,
    alt: "A Balti man with a horse in traditional tack",
  },
  {
    title: "Ramdan Glacier Trek",
    body: "Along the glacial stream, under a clear blue sky – a path that’s shared, with silence simply there. A journey that stops being yours alone, alongside a 3 hour trail of water channels & wildflowers.",
    image: `${VIRSA_IMG}/experiences/ramdan-glacier-trek.png`,
    alt: "A rocky canyon leading up towards the Ramdan glacier",
  },
];

/**
 * Photo galleries, top to bottom: each section's title (x284) and photos as
 * [file, x, y, width, height, alt] in Figma px. Files are in IMG, imported
 * from the frame's exports ("The Virsa Archive" folder: 2.x Rooms & Suites
 * through 7.x The Balti Farm, numbered in reading order within each section).
 */
const GALLERIES: {
  title: string;
  titleY: number;
  titleW: number;
  photos: [file: string, x: number, y: number, w: number, h: number, alt: string][];
}[] = [
  {
    title: "Rooms & Suites",
    titleY: 2005,
    titleW: 1088,
    photos: [
      [
        "rooms-1.png",
        1166,
        1991,
        458,
        712,
        "A carved timber window open to the trees, beside a bed",
      ],
      ["rooms-2.png", 284, 2725, 1340, 686, "A suite with a timber headboard lit from behind"],
      ["rooms-3.png", 284, 3434, 858, 716, "A platter of fruit and flowers on a made bed"],
      ["rooms-4.png", 1166, 3434, 458, 716, "Bathrobes hanging in an open timber wardrobe"],
      ["rooms-5.png", 284, 4176, 1340, 686, "A couple laughing together on a bed in their suite"],
      ["rooms-6.png", 284, 4885, 658, 928, "A balcony with a woven lamp and cane screens"],
      ["rooms-7.png", 966, 4885, 658, 928, "A staff member preparing the bed"],
    ],
  },
  {
    title: "Culinary",
    titleY: 5921,
    titleW: 1025,
    photos: [
      ["culinary-1.png", 1180, 5921, 444, 690, "A table laid in the orchard"],
      ["culinary-2.png", 284, 6633, 1340, 646, "Plates of berries and figs on a timber table"],
      ["culinary-3.png", 284, 7299, 793, 694, "A meal laid out on the garden terrace"],
      ["culinary-4.png", 1096, 7299, 528, 694, "A menu card and a water glass on the table"],
      ["culinary-5.png", 284, 8015, 1340, 646, "Grapes ripening on the vine"],
    ],
  },
  {
    title: "Yoga",
    titleY: 8768,
    titleW: 1025,
    photos: [
      ["yoga-1.png", 1180, 8768, 444, 690, "A woman meditating on a mat on the riverbank"],
      ["yoga-2.png", 284, 9481, 1340, 646, "A warrior pose on the river rocks, mountains behind"],
      ["yoga-3.png", 284, 10152, 793, 694, "A yoga pose under a clear mountain sky"],
      ["yoga-4.png", 1104, 10152, 520, 694, "A standing balance pose by the river"],
    ],
  },
  {
    title: "Wellness",
    titleY: 10942,
    titleW: 1088,
    photos: [
      ["wellness-1.png", 1166, 10942, 458, 712, "Sunlight across mats in the wellness studio"],
      [
        "wellness-2.png",
        284,
        11675,
        1340,
        686,
        "Cork mats, blocks and a roller on the timber floor",
      ],
      ["wellness-3.png", 284, 12385, 858, 716, "Virsa cork blocks stacked in the sun"],
      ["wellness-4.png", 1166, 12385, 458, 716, "A cork block and roller on a mat"],
      ["wellness-5.png", 284, 13125, 1340, 686, "The wellness studio with two mats laid out"],
    ],
  },
  {
    title: "Architecture",
    titleY: 13918,
    titleW: 1088,
    photos: [
      ["architecture-1.png", 1166, 13918, 458, 712, "A stone-paved passage between timber doors"],
      [
        "architecture-2.png",
        284,
        14651,
        1340,
        686,
        "The hotel’s timber balconies above the pool and pergola",
      ],
      ["architecture-3.png", 284, 15361, 858, 716, "A timber porch beside the stone walls"],
      ["architecture-4.png", 1166, 15361, 458, 716, "Loungers and trailing plants around the pool"],
    ],
  },
  {
    title: "The Balti Farm",
    titleY: 16183,
    titleW: 1088,
    photos: [
      ["farm-1.png", 1166, 16183, 458, 712, "A Balti woman cooking at a wood-fired stove"],
      ["farm-2.png", 284, 16916, 1340, 686, "A farm lunch served on a woven tray"],
      ["farm-3.png", 284, 17626, 858, 716, "Farm-to-table dishes, seen from above"],
      ["farm-4.png", 1166, 17623, 458, 712, "A daybed and table in a shaded timber pavilion"],
      [
        "farm-5.png",
        284,
        18366,
        1340,
        686,
        "A server in white beside a table laid under the trees",
      ],
    ],
  },
];

/**
 * Intro copy. The frame shows the first paragraph; the rest is from the
 * Figma comment and appears on "Read more".
 */
const INTRO = [
  "There is a quiet violence in trying to capture a place before you have earned the right to see it. Most hospitality imagery is an exercise in staging: polishing surfaces, chasing artificial golden hours, and stripping a space of the very humanity that gave it life. For AJC, directing the visual archive for Virsa Baltistan was never about commercial perfection. It was an uncompromising creative direction that demanded we put down our preconceptions, sit in the high-altitude cold, and wait.",
  "Through months of a slow, lived-in residency in Turtuk, we embedded different photographers and cinematographers inside this breathing mountain land. We didn’t give them shot lists; we gave them time. We directed them to look for the unscripted truth: the dust motes suspended in timber-beamed rooms, the weathered hands of master Balti artisans, and the silent tension where ancestral stone meets modern welcome.",
  "What emerged across our photography and film is not collateral for a hotel. It is a raw, visceral record of endurance, a visual archive that doesn’t just document an architecture, but shows a guest a hotel that is lived in, and very... very real.",
];

/*
  Mobile layout (under md), from the 390px Figma frame "Virsa Baltistan Archive
  (Mob)". Each gallery shows its first photo as a 236x240 centred crop, then
  the rest full width or in pairs, scaled from the desktop photo sizes
  (390 / 1340) so the heights follow the frame.
*/
const MOBILE_SCALE = 390 / 1340;
/** Space under each gallery's lead photo, as drawn in the frame (Rooms first). */
const LEAD_GAPS = [62, 76, 75, 76, 75, 71];
/** Space above each gallery title, as drawn in the frame. */
const TITLE_GAPS = [68, 66, 66, 62, 64, 69];

function VirsaArchiveMobile() {
  return (
    <div className="@container relative w-full overflow-hidden bg-[#fdfbf4] [--u:calc(100cqw/390)] md:hidden">
      {/* ---- Hero ---- */}
      <div className="relative h-[700px] overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:object-[44%_50%]">
        <OptimizedImage
          src={`${IMG}/hero.png`}
          alt="Hands clasped behind the back of a man in a traditional Balti wool robe"
          width={1920}
          height={1077}
          priority
          sizes="100vw"
        />
        <p className="font-helvetica absolute inset-x-0 top-[88px] text-center text-[15px] font-bold tracking-[0.02em] text-white uppercase opacity-80">
          AJC in Ladakh / لداخ
        </p>
        <p className="font-helvetica absolute inset-x-0 bottom-[64px] text-center text-[15px] font-bold tracking-[0.02em] text-white uppercase opacity-80">
          2025 / ۲۰۲۵
        </p>
      </div>
      <h1 className="font-cormorant pt-[62px] pl-[49px] text-[45px] leading-[46px] tracking-[-0.06em] text-[#7d7062]">
        Archive of
        <br />
        Virsa Baltistan
      </h1>
      <div className="font-helvetica-regular mt-[46px] ml-[55px] text-[12px] leading-[19px] tracking-[0.02em] text-[#7d7062] uppercase opacity-60">
        <p>Creative Direction</p>
        <p>Photography</p>
        <p>Videography</p>
      </div>
      {/* The frame breaks the first paragraph after "see it." and again before the faded closing lines and sets it at x81. */}
      <div className="mt-[51px] pr-[59px] pl-[81px] [&_button]:mt-[45px]!">
        <VirsaExpandableIntro
          responsive
          compact
          clamp="max-h-[16.6em]"
          x={981}
          y={1389}
          width={677}
          preview={INTRO[0].split(/(?<=see it\.) |(?<=perfection\.) /).map((paragraph, i) => (
            <p key={paragraph.slice(0, 24)} className={i === 1 ? "mb-[3px]" : "mb-[13px]"}>
              {paragraph}
            </p>
          ))}
          full={INTRO.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mb-[13px]">
              {paragraph}
            </p>
          ))}
          fade={{ x: -35, y: 184, width: 747, height: 80 }}
          toggle={{ x: 0, y: 280 }}
          gapBelow={299}
        />
      </div>

      {/* ---- Galleries ---- */}
      {GALLERIES.map((gallery, gi) => {
        const [lead, ...rest] = gallery.photos;
        // Wide photos run full width; narrower ones pair up with the next one.
        const groups: (typeof gallery.photos)[] = [];
        for (const photo of rest) {
          const last = groups[groups.length - 1];
          if (photo[3] < 1300 && last && last.length === 1 && last[0][3] < 1300) last.push(photo);
          else groups.push([photo]);
        }
        return (
          <section key={gallery.title}>
            <h2
              className="font-cormorant pl-[51px] text-[45px] leading-[50px] tracking-[-0.06em] text-[#7d7062]"
              style={{ marginTop: TITLE_GAPS[gi] }}
            >
              {gallery.title}
            </h2>
            <div
              className={`relative mx-auto h-[240px] w-[236px] overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover ${gi === 0 ? "mt-[49px]" : "mt-[67px]"}`}
            >
              <OptimizedImage
                src={`${IMG}/${lead[0]}`}
                alt={lead[5]}
                width={lead[3]}
                height={lead[4]}
                sizes="236px"
              />
            </div>
            {groups.map((group, ri) => (
              <div
                key={group[0][0]}
                className="grid gap-x-[4px]"
                style={{
                  gridTemplateColumns: group.map((photo) => `${photo[3]}fr`).join(" "),
                  marginTop: ri === 0 ? LEAD_GAPS[gi] : ri === 1 && gi === 0 ? 62 : 4,
                }}
              >
                {group.map((photo) => (
                  <div
                    key={photo[0]}
                    className="relative overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
                    style={{ height: Math.round(photo[4] * MOBILE_SCALE) }}
                  >
                    <OptimizedImage
                      src={`${IMG}/${photo[0]}`}
                      alt={photo[5]}
                      width={photo[3]}
                      height={photo[4]}
                      sizes="100vw"
                    />
                  </div>
                ))}
              </div>
            ))}
          </section>
        );
      })}

      {/* ---- The Experiences ---- */}
      <h2 className="font-cormorant mt-[65px] pl-[33px] text-[45px] leading-[50px] tracking-[-0.06em] text-[#7d7062]">
        The Experiences
      </h2>
      <div className="mt-[26px]">
        <VirsaExperienceCarousel
          responsive
          className="aspect-[390/498]"
          items={EXPERIENCES}
          y={r(19399)}
          h={1061}
          slots={[
            { x: 116, w: 843 },
            { x: 977, w: 839 },
          ]}
          text={{ titleX: 86, titleBottom: 812, bodyX: 91, bodyY: 812, bodyW: 517, linkY: 979 }}
          arrows={{ y: r(19898), left: 13, right: 1836 }}
          href={EXPERIENCES_HREF}
        />
      </div>

      {/* ---- Features: the award, then the press logos ---- */}
      <h2 className="font-cormorant mt-[62px] pl-[57px] text-[45px] leading-[50px] tracking-[-0.06em] text-[#7d7062]">
        Features
      </h2>
      <a
        href="https://www.travelandleisureasia.com/in/news/best-domestic-hotels-iba-2025/"
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-[42px] block aspect-[390/627] overflow-hidden transition-opacity duration-300 hover:opacity-90"
      >
        <OptimizedImage
          src={`${VIRSA_IMG}/award-banner.png`}
          alt="Travel + Leisure India’s Best Awards 2025: Best Boutique Stay"
          width={1920}
          height={1387}
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </a>
      <h2 className="font-cormorant mt-[65px] pl-[51px] text-[45px] leading-[50px] tracking-[-0.06em] text-[#7d7062]">
        Features
      </h2>
      <div className="relative mt-[36px] h-[90px]">
        <a
          href="https://www.architecturaldigest.in/story/a-well-curated-regional-meal-awaits-you-in-ladakhs-prettiest-village-turtuk-best-restaurants-leh-where-to-eat/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-0 left-[22px] block h-[29px] w-[45px] transition-opacity duration-300 hover:opacity-70"
        >
          <OptimizedImage
            src={`${VIRSA_IMG}/press/architectural-digest.png`}
            alt="Read about Virsa Baltistan in Architectural Digest"
            width={116}
            height={75}
            sizes="45px"
            className="h-full w-full object-contain"
          />
        </a>
        <a
          href="https://www.robbreportindia.com/travel/india/best-of-the-best-hotels-india-raffles-ran-baas-fairmont-lotus-palace"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-[10px] left-[125px] block h-[25px] w-[117px] transition-opacity duration-300 hover:opacity-70"
        >
          <OptimizedImage
            src={assetPath("/images/projects/ranjits-svaasa/press-robb.png")}
            alt="Read about Virsa Baltistan in Robb Report"
            width={278}
            height={59}
            sizes="117px"
            className="h-full w-full object-cover"
          />
        </a>
        <a
          href="https://www.cntraveller.in/story/the-best-hotels-in-ladakh/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-[5px] left-[291px] block h-[28px] w-[79px] transition-opacity duration-300 hover:opacity-70"
        >
          <OptimizedImage
            src={`${VIRSA_IMG}/press/conde-nast-traveller.png`}
            alt="Read about Virsa Baltistan in Condé Nast Traveller"
            width={193}
            height={69}
            sizes="79px"
            className="h-full w-full object-contain"
          />
        </a>
        <a
          href="https://www.virsaladakh.com/_files/ugd/6168af_d99bffa269a54f488bb2da2d01a9aa50.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-[61px] left-[66px] block h-[23px] w-[99px] transition-opacity duration-300 hover:opacity-70"
        >
          <OptimizedImage
            src={`${VIRSA_IMG}/press/travel-leisure.png`}
            alt="Read the Travel + Leisure feature on Turtuk and Virsa"
            width={246}
            height={57}
            sizes="99px"
            className="h-full w-full object-contain"
          />
        </a>
        {/* No logo file was supplied for Brown History, so its name is set in type. */}
        <a
          href="https://www.instagram.com/p/DRczqw0AU6L/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-helvetica absolute top-[65px] left-[236px] w-[82px] text-center text-[11px] font-bold tracking-[-0.02em] text-black transition-opacity duration-300 hover:opacity-70"
        >
          Brown History
        </a>
      </div>

      {/* ---- Team ---- */}
      <h2 className="font-cormorant mt-[100px] pl-[51px] text-[45px] leading-[50px] tracking-[-0.06em] text-[#7d7062]">
        Team
      </h2>
      <dl className="font-helvetica-regular mt-[29px] ml-[62px] grid grid-cols-[139px_1fr] grid-rows-[36px_36px_64px_auto] text-[12px] leading-[14px] tracking-[0.02em] text-[#9b9484] uppercase">
        <dt className="font-helvetica max-w-[100px] font-bold">Creative Partner</dt>
        <dd>Rashidullah Khan</dd>
        <dt className="font-helvetica font-bold">Support Team</dt>
        <dd>Virsa Baltistan</dd>
        <dt className="font-helvetica font-bold">Photography</dt>
        <dd>
          Alex Buzolic
          <br />
          Marie-Eve
          <br />
          Ansen Antony
        </dd>
        <dt className="font-helvetica font-bold">Cinematography</dt>
        <dd>Shivanshu Negi</dd>
      </dl>

      {/* ---- Next project ---- */}
      <div className="flex flex-col items-center pt-[68px] pb-[77px] text-center">
        <div aria-hidden className="font-cormorant text-[40px] leading-none text-[#7d7062]">
          &gt;
        </div>
        <Link
          href="/work/haveli-dharampura"
          className="font-cormorant mt-[8px] block text-[40px] leading-none tracking-[-0.06em] text-[#7d7062]"
        >
          Next Project
        </Link>
        <p className="font-helvetica-regular mt-[14px] text-[11px] tracking-[0.02em] whitespace-nowrap text-[#9b9484] uppercase">
          Haveli Dharampura
        </p>
      </div>
    </div>
  );
}

export function VirsaArchivePage() {
  return (
    <>
      <VirsaArchiveMobile />
      <div className="@container relative mx-auto hidden w-full max-w-[1920px] overflow-hidden bg-[#fdfbf4] [--u:calc(100cqw/1920)] md:block">
        {/* ============ HERO + INTRO (Figma y 0–1991) ============ */}
        <section className="relative" style={{ minHeight: u(SPLIT) }}>
          <div
            className="absolute overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
            style={{ left: 0, top: 0, width: u(1920), height: u(1077) }}
          >
            <OptimizedImage
              src={`${IMG}/hero.png`}
              alt="Hands clasped behind the back of a man in a traditional Balti wool robe"
              width={1920}
              height={1077}
              priority
              sizes="100vw"
            />
          </div>
          <p
            className="font-helvetica absolute text-[length:calc(28*var(--u))] font-bold tracking-[calc(0.56*var(--u))] text-white uppercase opacity-80"
            style={{ left: u(87), top: u(526), width: u(348) }}
          >
            2025 / ۲۰۲۵
          </p>
          <p
            className="font-helvetica absolute text-right text-[length:calc(28*var(--u))] font-bold tracking-[calc(0.56*var(--u))] text-white uppercase opacity-80"
            style={{ left: u(1447), top: u(526), width: u(348) }}
          >
            AJC in Ladakh / لداخ
          </p>

          {/* Figma sets the title on two lines (its box is 2 x 76px tall). */}
          <h1
            className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
            style={{ left: u(88), top: u(1213), width: u(1088) }}
          >
            Archive of
            <br />
            Virsa Baltistan
          </h1>
          <div
            className="font-helvetica-regular absolute text-[length:calc(28*var(--u))] leading-[0.9976] tracking-[calc(0.56*var(--u))] text-[#7d7062] uppercase opacity-80"
            style={{ left: u(109), top: u(1461), width: u(523) }}
          >
            <p>Creative Direction</p>
            <p>Photography</p>
            <p>Videography</p>
          </div>

          <VirsaExpandableIntro
            x={981}
            y={1389}
            width={677}
            preview={<p>{INTRO[0]}</p>}
            full={INTRO.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            // Figma: plate at x946 y1573 (747x80), "Read more" at x981 y1669.
            fade={{ x: -35, y: 184, width: 747, height: 80 }}
            toggle={{ x: 0, y: 280 }}
            gapBelow={299}
          />
        </section>

        {/* ============ THE REST (Figma y 1991 onward) ============ */}
        <div className="relative" style={{ height: u(END - SPLIT) }}>
          {GALLERIES.map((gallery) => (
            <div key={gallery.title} className="contents">
              <h2
                className="font-cormorant absolute text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))] text-[#7d7062]"
                style={{ left: u(284), top: u(r(gallery.titleY)), width: u(gallery.titleW) }}
              >
                {gallery.title}
              </h2>
              {gallery.photos.map(([file, x, y, w, h, alt]) => (
                <div
                  key={file}
                  className="absolute overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
                  style={{ left: u(x), top: u(r(y)), width: u(w), height: u(h) }}
                >
                  <OptimizedImage
                    src={`${IMG}/${file}`}
                    alt={alt}
                    width={w}
                    height={h}
                    sizes={`(min-width: 1920px) ${w}px, ${+((w / 1920) * 100).toFixed(2)}vw`}
                  />
                </div>
              ))}
            </div>
          ))}

          {/* ---- The Experiences ---- */}
          <h2
            className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
            style={{ left: u(116), top: u(r(19245)), width: u(534) }}
          >
            The Experiences
          </h2>
          <VirsaExperienceCarousel
            items={EXPERIENCES}
            y={r(19399)}
            h={1061}
            slots={[
              { x: 116, w: 843 },
              { x: 977, w: 839 },
            ]}
            // Figma: title y20144 (67 tall), copy y20211, "Discover" y20378.
            text={{ titleX: 86, titleBottom: 812, bodyX: 91, bodyY: 812, bodyW: 517, linkY: 979 }}
            arrows={{ y: r(19898), left: 13, right: 1836 }}
            href={EXPERIENCES_HREF}
          />

          {/* ---- Features ---- */}
          <h2
            className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
            style={{ left: u(116), top: u(r(20654)), width: u(868) }}
          >
            Features
          </h2>
          {/* The award photo again, taller here: it fills the 1387px frame, as in
            Figma, where the badge and caption sit larger. */}
          <a
            href="https://www.travelandleisureasia.com/in/news/best-domestic-hotels-iba-2025/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute block overflow-hidden transition-opacity duration-300 hover:opacity-90"
            style={{ left: 0, top: u(r(20793)), width: u(1920), height: u(1387) }}
          >
            <OptimizedImage
              src={`${VIRSA_IMG}/award-banner.png`}
              alt="Travel + Leisure India’s Best Awards 2025: Best Boutique Stay"
              width={1920}
              height={1387}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </a>
          {(
            [
              [
                "press/architectural-digest.png",
                "Read about Virsa Baltistan in Architectural Digest",
                "https://www.architecturaldigest.in/story/a-well-curated-regional-meal-awaits-you-in-ladakhs-prettiest-village-turtuk-best-restaurants-leh-where-to-eat/",
                115,
                22302,
                116,
                75,
              ],
              [
                "press/conde-nast-traveller.png",
                "Read about Virsa Baltistan in Condé Nast Traveller",
                "https://www.cntraveller.in/story/the-best-hotels-in-ladakh/",
                789,
                22314,
                193,
                69,
              ],
              [
                "press/travel-leisure.png",
                "Read the Travel + Leisure feature on Turtuk and Virsa",
                "https://www.virsaladakh.com/_files/ugd/6168af_d99bffa269a54f488bb2da2d01a9aa50.pdf",
                1140,
                22319,
                246,
                57,
              ],
            ] as [string, string, string, number, number, number, number][]
          ).map(([file, alt, href, x, y, w, h]) => (
            <a
              key={file}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute block transition-opacity duration-300 hover:opacity-70"
              style={{ left: u(x), top: u(r(y)), width: u(w), height: u(h) }}
            >
              <OptimizedImage
                src={`${VIRSA_IMG}/${file}`}
                alt={alt}
                width={w}
                height={h}
                sizes={`(min-width: 1920px) ${w}px, ${+((w / 1920) * 100).toFixed(2)}vw`}
                className="h-full w-full object-contain"
              />
            </a>
          ))}
          {/* Robb Report logo, same spot as on the Virsa Baltistan page (x379 y22324). */}
          <a
            href="https://www.robbreportindia.com/travel/india/best-of-the-best-hotels-india-raffles-ran-baas-fairmont-lotus-palace"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute block transition-opacity duration-300 hover:opacity-70"
            style={{ left: u(379), top: u(r(22324)), width: u(278), height: u(59) }}
          >
            <OptimizedImage
              src={assetPath("/images/projects/ranjits-svaasa/press-robb.png")}
              alt="Read about Virsa Baltistan in Robb Report"
              width={278}
              height={59}
              sizes="(min-width: 1920px) 278px, 14.48vw"
              className="h-full w-full object-cover"
            />
          </a>
          {/* No logo file was supplied for Brown History, so its name is set in type. */}
          <a
            href="https://www.instagram.com/p/DRczqw0AU6L/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-helvetica absolute text-center font-bold tracking-[-0.02em] text-black transition-opacity duration-300 hover:opacity-70"
            style={{
              left: u(1562),
              top: u(r(22334)),
              width: u(197),
              fontSize: u(28),
              lineHeight: u(28),
            }}
          >
            Brown History
          </a>

          {/* ---- Team ---- (role label, then name beside it; rows 36px apart) */}
          <h2
            className="font-cormorant absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] text-[#7d7062]"
            style={{ left: u(115), top: u(r(22488)), width: u(868) }}
          >
            Team
          </h2>
          {(
            [
              [398, 645, "Cinematography", "Shivanshu Negi"],
              [398, 645, "Photography", "Ansen Antony"],
              [914, 1125, "Photography", "Alex Buzolic"],
              [914, 1125, "Photography", "Marie-Eve"],
              [1380, 1641, "Creative Partner", "Rashidullah Khan"],
              [1380, 1641, "Support Team", "Virsa Baltistan"],
            ] as [number, number, string, string][]
          ).map(([roleX, nameX, role, name], i) => {
            // Three columns of two rows; rows step 36px down within a column.
            const rowY = r(22506) + (i % 2) * 36;
            return (
              <div key={`${roleX}-${role}-${name}`} className="contents">
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
          <div
            aria-hidden
            className="font-cormorant absolute text-center text-[length:calc(80*var(--u))] leading-none font-bold text-[#7d7062]"
            style={{ left: u(896), top: u(r(22626)), width: u(110) }}
          >
            &gt;
          </div>
          <Link
            href="/work/haveli-dharampura"
            className="font-cormorant absolute block text-center text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))] text-[#7d7062]"
            style={{ left: u(654), top: u(r(22714)), width: u(612) }}
          >
            Next Project
          </Link>
          <p
            className="font-helvetica-regular absolute text-center text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] tracking-[calc(0.4*var(--u))] whitespace-nowrap text-[#9b9484] uppercase"
            style={{ left: u(848), top: u(r(22821)), width: u(224) }}
          >
            Haveli Dharampura
          </p>
        </div>
      </div>
    </>
  );
}
