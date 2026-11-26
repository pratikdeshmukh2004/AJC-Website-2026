import type { Metadata } from "next";
import Image from "next/image";
import { CopyEmail } from "@/components/philosophy/CopyEmail";
import { PhotoCarousel } from "@/components/philosophy/PhotoCarousel";
import { StagedPanel, StagedPanelMobile, type Stage } from "@/components/philosophy/StagedPanel";
import { siteConfig } from "@/config/site";
import { fig, u } from "@/lib/utils";
// Static imports: Next fingerprints the files and applies the basePath itself.
import heroValley from "../../../public/images/philosophy/hero-valley.jpg";
import family from "../../../public/images/philosophy/family.jpg";
import boxClosed from "../../../public/images/philosophy/box-1-closed.png";
import boxKey from "../../../public/images/philosophy/box-2-key.png";
import boxOpen from "../../../public/images/philosophy/box-3-open.png";
import boxOverflowing from "../../../public/images/philosophy/box-4-overflowing.png";

export const metadata: Metadata = {
  title: "Philosophy",
  description:
    "We are custodians of stories and kindness is our fabric. The steel-box at the heart of AJC Creative Consultancy.",
};

/*
  Figma: PHILOSOPHY (node 2984:63), 1920 x 6261.
  Sizes use fig(px): exact at 1920px wide, scaled down below it.
    - hero photo 1920 x 903 with the Rochelle Pinto quote
    - one pinned panel: the steel-box opens over four stages as you scroll
    - photo carousel, closing quote, family photo with "write to us"
    - colours: headings #7d7062, body #8b7f73, background #f8f7f2
*/

const STAGES: Stage[] = [
  {
    image: boxClosed,
    mobile: { x: 101, w: 190, mt: 88, textMt: 49, dotsMt: 29 },
    content: (
      <div>
        <h2
          className="font-cormorant text-taupe"
          style={{ fontSize: fig(62, "2.1rem"), lineHeight: 1.02, letterSpacing: "-0.06em" }}
        >
          We are all very old,
          <br />
          and we are made with
          <br />
          all that came before us.
        </h2>
        <p
          className="font-cormorant text-[#8b7f73]"
          style={{
            marginTop: fig(22, "0.75rem"),
            fontSize: fig(24, "1.05rem"),
            letterSpacing: "-0.02em",
          }}
        >
          Our home, our families, our land and our cultures.
        </p>
      </div>
    ),
  },
  {
    image: boxKey,
    mobile: { x: 97, w: 204, mt: 64.5, textMt: 24.4, dotsMt: 26.6 },
    content: (
      <div
        className="font-helvetica-regular text-[#8b7f73] [&_p+p]:mt-[1.275em]"
        style={{ fontSize: fig(20, "0.95rem"), lineHeight: 1.275, letterSpacing: "0.01em" }}
      >
        <p>
          When I was younger, my grandmother passed away and left me a steel-box that held her
          life’s pieces. I didn’t get it till she was gone, so there was no meaning in asking her
          what to do with this.
        </p>
        <p>
          So I did what I could. I kept all my travel tickets, my antiques, the coins I found inside
          that box, intact. It became my box of memories,
          <br className="md:hidden" />
          of my life’s pieces.
        </p>
      </div>
    ),
  },
  {
    image: boxOpen,
    mobile: { x: 97, w: 193, mt: 96, textMt: 49.4, dotsMt: 40.6 },
    content: (
      <div
        className="font-helvetica-regular text-[#8b7f73] [&_p+p]:mt-[1.275em]"
        style={{ fontSize: fig(20, "0.95rem"), lineHeight: 1.275, letterSpacing: "0.01em" }}
      >
        <p>
          I believe every person on this planet has their steel-box within them. When they create
          their life’s work, that steel box opens and overflows.
        </p>
        <p>
          If they’re able to hand it over to someone who can unpack it and hold the pieces, then
          they create spaces for partnership &amp; progression.
        </p>
        <p>That box, is our entry into your world.</p>
      </div>
    ),
  },
  {
    image: boxOverflowing,
    mobile: { x: 71, w: 246, mt: 108, textMt: 70.1, dotsMt: 26.6 },
    content: (
      <div
        className="font-helvetica-regular text-[#8b7f73] [&_p+p]:mt-[1.275em]"
        style={{ fontSize: fig(20, "0.95rem"), lineHeight: 1.275, letterSpacing: "0.01em" }}
      >
        <p>
          AJC is all of us—
          <br />
          our team, their souls,
          <br />
          their deeply intentional eyes.
          <br />
          Our driving force is to create what
          <br className="md:hidden" />
          doesn’t yet exist, and to tell stories
          <br className="md:hidden" />
          that outlive all of us.
        </p>
        <p>
          We give you a place to put your life’s pieces in,
          <br className="md:hidden" />
          by slowing down enough to
          <br className="md:hidden" />
          hear it.
        </p>
      </div>
    ),
  },
];

export default function PhilosophyPage() {
  return (
    <>
      <PhilosophyMobile />
      <div className="hidden md:block">
        <PhilosophyDesktop />
      </div>
    </>
  );
}
function PhilosophyDesktop() {
  return (
    // Bottom padding is the paper-coloured gap between the family photo and the
    // site footer (the photo is full-bleed, so it would otherwise sit on it).
    <div className="relative bg-[#f8f7f2]" style={{ paddingBottom: fig(160, "4rem") }}>
      <main>
        {/* Hero: valley photo with the quote */}
        <section className="relative flex min-h-[70svh] w-full items-center justify-center overflow-hidden md:aspect-[1920/903] md:min-h-0">
          <Image src={heroValley} alt="" fill priority sizes="100vw" className="object-cover" />
          <figure
            className="relative px-6 text-center text-[#f8f7f2]"
            style={{ paddingTop: fig(76, "2rem") }}
          >
            <blockquote>
              <h1
                className="font-cormorant"
                style={{
                  fontSize: fig(104, "2.75rem"),
                  lineHeight: 0.86,
                  letterSpacing: "-0.06em",
                }}
              >
                To create is
                <br />
                to be vulnerable.
              </h1>
            </blockquote>
            <figcaption
              className="font-helvetica-regular uppercase"
              style={{
                marginTop: fig(26, "1rem"),
                fontSize: fig(20, "0.8rem"),
                letterSpacing: "0.02em",
              }}
            >
              Rochelle Pinto
            </figcaption>
          </figure>
        </section>

        {/* The steel-box, in four stages */}
        <StagedPanel stages={STAGES} />

        <div style={{ marginTop: fig(150, "3rem") }}>
          <PhotoCarousel />
        </div>

        {/* Closing quote */}
        <p
          className="font-cormorant mx-auto px-6 text-center text-[#8b7f73]"
          style={{
            marginTop: fig(201, "4rem"),
            maxWidth: `min(100%, ${fig(1010, "36rem")})`,
            fontSize: fig(40, "1.6rem"),
            lineHeight: 1.18,
            letterSpacing: "-0.01em",
          }}
        >
          We are custodians of stories and kindness is our fabric. To work with us, you have to be
          humane enough, for this is a very human process – to bare your soul, your life, and your
          land to us.
        </p>

        {/* Family photo with "write to us" */}
        <section
          aria-label="Write to us"
          className="relative min-h-[70svh] w-full overflow-hidden md:aspect-[1920/1156] md:min-h-0"
          style={{ marginTop: fig(125, "3rem") }}
        >
          <Image
            src={family}
            alt="Apeksha Jain as a child, with her grandparents."
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-x-0 flex flex-col items-center px-6 text-center text-[#f8f7f2] uppercase"
            style={{ top: "46.7%" }}
          >
            <p
              className="font-helvetica font-bold"
              style={{ fontSize: fig(32, "1.1rem"), letterSpacing: "0.02em" }}
            >
              Write to us on
            </p>
            <CopyEmail
              email={siteConfig.contactEmail}
              className="font-helvetica-regular normal-case"
              style={{ fontSize: fig(30, "1.05rem"), letterSpacing: "0.02em" }}
            />
            <p
              className="font-helvetica-regular"
              style={{
                marginTop: fig(38, "1rem"),
                fontSize: fig(20, "0.8rem"),
                letterSpacing: "0.02em",
              }}
            >
              {siteConfig.location}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

/*
  Figma: PHILOSOPHY mobile frame, 390 x 3559. Flow layout measured from the PNG
  (1 design px = var(--u)). The valley photo is the 1920 asset enlarged to
  1000px wide so the peak sits where the frame has it; the sky above it is a
  gradient (the asset has no more sky), faded into the photo's top edge.
*/
function PhilosophyMobile() {
  return (
    <div className="@container bg-[#f8f7f2] [--u:calc(100cqw/390)] md:hidden">
      <main>
        <section
          className="relative w-full overflow-hidden bg-[linear-gradient(to_bottom,#f0eee9_0%,#f3f0eb_12%,#dcdad3_30%,#c2c0b8_46%,#b9b6ae_100%)]"
          style={{ height: u(859) }}
        >
          <Image
            src={heroValley}
            alt=""
            priority
            sizes="100vw"
            className="absolute max-w-none [mask-image:linear-gradient(to_bottom,transparent,black_20%)]"
            style={{ left: u(-163), top: u(402), width: u(1000), height: "auto" }}
          />
          <figure className="absolute inset-x-0 text-center text-[#f8f7f2]" style={{ top: u(606) }}>
            <blockquote>
              <h1
                className="font-cormorant tracking-[-0.06em]"
                style={{ fontSize: u(40), lineHeight: u(47) }}
              >
                To create is
                <br />
                to be vulnerable.
              </h1>
            </blockquote>
            <figcaption
              className="font-helvetica-regular uppercase"
              style={{
                marginTop: u(15.5),
                fontSize: u(8),
                lineHeight: u(10),
                letterSpacing: "0.02em",
              }}
            >
              Rochelle Pinto
            </figcaption>
          </figure>
        </section>
        <StagedPanelMobile stages={STAGES} />
        <div style={{ marginTop: u(58) }}>
          <PhotoCarousel mobile />
        </div>
        <p
          className="font-cormorant mx-auto text-center text-[#8b7f73]"
          style={{
            marginTop: u(57),
            width: u(216),
            fontSize: u(20),
            lineHeight: u(21),
            letterSpacing: "-0.01em",
          }}
        >
          We are custodians of stories and kindness is our fabric. To work with us, you have to be
          humane enough, for this is a very human process – to bare your soul, your life, and your
          land to us.
        </p>
        <section
          aria-label="Write to us"
          className="relative w-full overflow-hidden"
          style={{ marginTop: u(59), height: u(318) }}
        >
          <Image
            src={family}
            alt="Apeksha Jain as a child, with her grandparents."
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-x-0 flex flex-col items-center text-center text-[#f8f7f2] uppercase"
            style={{ top: u(83.2) }}
          >
            <p
              className="font-helvetica font-bold"
              style={{ fontSize: u(15), lineHeight: u(17), letterSpacing: "0.02em" }}
            >
              Write to us on
            </p>
            <CopyEmail
              email={siteConfig.contactEmail}
              className="font-helvetica-regular normal-case"
              style={{ fontSize: u(15.3), lineHeight: u(19), letterSpacing: "0.02em" }}
            />
            <p
              className="font-helvetica-regular"
              style={{
                marginTop: u(11),
                fontSize: u(12.2),
                lineHeight: u(14),
                letterSpacing: "0.02em",
              }}
            >
              {siteConfig.location}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
