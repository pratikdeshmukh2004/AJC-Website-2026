import type { Metadata } from "next";
import Image from "next/image";
import { HeroHeader } from "@/components/home/HeroHeader";
import { AjcLogo, ApekshaJainWordmark, ScriptCycle } from "@/components/brand";
import { ContactForm } from "@/components/contact/ContactForm";
import { fig } from "@/lib/utils";
import { siteConfig } from "@/config/site";
// Static imports: Next fingerprints the files and applies the basePath itself.
import rockingChair from "../../../public/images/contact/rocking-chair.svg";
import sittingRoom from "../../../public/images/contact/sitting-room.jpg";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "You're in our sitting room now. This is where we begin conversations: write to AJC Creative Consultancy, New Delhi.",
};

/*
  Figma: CONTACT US (node 2823:3089), 1920 x 2159.
  Sizes use fig(px): exact at 1920px wide, scaled down below it.
    - background #f8f7f2; headings Cormorant #7d7062; body Helvetica
    - rocking chair 235 wide at y325, rocks continuously (comment: "Rocking
      chair will be in motion")
    - lower band: form column (981) | photo (939 x 1080) with the script and
      the Apeksha Jain / AJC marks over it
*/
export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#f8f7f2]">
      <HeroHeader tone="dark" />

      <main>
        {/* Intro: chair, headline, eyebrow */}
        <section
          className="flex flex-col items-center px-6 text-center"
          style={{ paddingTop: fig(325, "8rem") }}
        >
          <Image
            src={rockingChair}
            alt=""
            aria-hidden
            priority
            className="ajc-rock h-auto"
            // 268px tall in Figma; the exported SVG is 225x261, so 231 wide.
            style={{ width: fig(231, "7rem") }}
          />
          <h1
            className="font-cormorant text-taupe"
            style={{
              fontSize: fig(97, "2.6rem"),
              lineHeight: 0.784,
              letterSpacing: "-0.06em",
              paddingBlock: "0.12em",
            }}
          >
            You’re in our
            <br />
            sitting room now.
          </h1>
          <p
            className="font-helvetica-regular text-[#a2988e] uppercase"
            style={{
              marginTop: fig(175, "3rem"),
              fontSize: fig(20, "0.8rem"),
              letterSpacing: "0.02em",
            }}
          >
            This is where we begin conversations
          </p>
        </section>

        {/* Lower band: form | photo */}
        <section
          className="grid grid-cols-1 md:grid-cols-[981fr_939fr]"
          style={{ marginTop: fig(106, "3.5rem") }}
        >
          <div className="flex flex-col items-center px-6 pb-16 text-center md:pb-0">
            <h2
              className="font-cormorant text-taupe"
              style={{
                marginTop: fig(168, "2rem"),
                fontSize: fig(80, "2.25rem"),
                lineHeight: 0.7,
                letterSpacing: "-0.06em",
              }}
            >
              Say Hello!
            </h2>

            <ContactForm />

            <div
              className="font-helvetica-regular text-[#9b9484] uppercase"
              style={{ fontSize: fig(23, "0.95rem"), letterSpacing: "0.02em" }}
            >
              <p style={{ marginTop: fig(93, "2.5rem"), lineHeight: fig(29, "1.4rem") }}>
                Or write to us on
                <br />
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="hover:text-taupe-dark text-[#836b43] normal-case transition-colors"
                >
                  {siteConfig.contactEmail}
                </a>
              </p>
              <p
                style={{
                  marginTop: fig(95, "2.5rem"),
                  marginBottom: fig(93, "2rem"),
                  lineHeight: fig(34, "1.5rem"),
                }}
              >
                {siteConfig.location}
              </p>
            </div>
          </div>

          {/* Photo with the cycling script and brand marks laid over it */}
          <div className="relative aspect-[939/1080] w-full overflow-hidden">
            <Image
              src={sittingRoom}
              alt="A pine tree on a hillside above misty mountain ridges, in sepia."
              fill
              sizes="(min-width: 768px) 49vw, 100vw"
              className="object-cover"
            />
            <ScriptCycle
              // Centred where Figma puts the script (1466, 1625 on the 939x1080
              // photo); 228px canvas scaled 1.357x to match its 304px width.
              className="absolute top-[50.56%] left-[51.65%] w-[32.9%] -translate-x-1/2 -translate-y-1/2"
            />
            <div aria-hidden className="absolute inset-x-0 top-[88.98%] h-[1.574%] text-[#f8f7f2]">
              <ApekshaJainWordmark className="absolute left-[35.46%] h-full" />
              <AjcLogo className="absolute left-[62.94%] h-full" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
