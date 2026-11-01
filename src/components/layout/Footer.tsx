"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AjcLogo, ApekshaJainWordmark, ScriptCycle } from "@/components/brand";
import { siteConfig } from "@/config/site";
import { fig } from "@/lib/utils";

/*
  Site footer — Figma: Footer (node 3279:1082), 1920 x 649.
  Sizes use fig(px): exact at 1920px wide, scaled down below it.
    - band #9b9484; headings, body and icons #f8f7f2; links #e2dfd8
    - left column x239: cycling script, Apeksha Jain + AJC marks, tagline
    - right columns x1232 (Discover) and x1456 (Resources), social icons
  Rendered from the root layout on every page except Home, whose full-screen
  film has no footer.
*/

const CREAM = "#f8f7f2";
const LINK = "#e2dfd8";

/** 20px Helvetica on a 41px line, +2% tracking (all footer text). */
const text = {
  fontSize: fig(20, "0.875rem"),
  lineHeight: fig(41, "1.9rem"),
  letterSpacing: "0.02em",
};

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer
      className="bg-[#9b9484] uppercase"
      style={{ color: CREAM, paddingBlock: `${fig(200, "3.5rem")} ${fig(117, "3rem")}` }}
    >
      <div
        className="mx-auto flex max-w-[1920px] flex-col gap-14 md:flex-row md:justify-between md:gap-10"
        style={{ paddingLeft: fig(237, "1.5rem"), paddingRight: fig(234, "1.5rem") }}
      >
        {/* Left: marks and tagline */}
        <div>
          {/* Canvas starts 2.5px above the headings' line box, as in Figma. */}
          <ScriptCycle
            align="start"
            style={{ width: fig(228, "8.5rem"), marginTop: fig(-3, "-3px") }}
          />
          <div
            aria-hidden
            className="flex items-center"
            style={{ marginTop: fig(50, "1.25rem"), gap: fig(113, "2.5rem") }}
          >
            <ApekshaJainWordmark style={{ height: fig(19, "0.8rem") }} />
            <AjcLogo style={{ height: fig(21, "0.9rem") }} />
          </div>
          <p className="font-helvetica-regular" style={{ ...text, marginTop: fig(80, "1.75rem") }}>
            A creative consultancy based in India
            <br />© Apeksha Jain {new Date().getFullYear()}
          </p>
        </div>

        {/* Right: link columns and social icons */}
        <div>
          <nav aria-label="Footer" className="font-helvetica flex font-bold">
            <FooterColumn
              title="Discover"
              links={siteConfig.footer.discover}
              width={fig(224, "9rem")}
            />
            <FooterColumn title="Resources" links={siteConfig.footer.resources} />
          </nav>

          <ul
            className="flex items-center"
            style={{ marginTop: fig(44, "1.25rem"), gap: fig(38, "1.25rem") }}
          >
            <SocialLink href={siteConfig.social.linkedin} label="Apeksha Jain on LinkedIn">
              <LinkedInIcon />
            </SocialLink>
            <SocialLink href={siteConfig.social.whatsapp} label={`WhatsApp ${siteConfig.phone}`}>
              <WhatsAppIcon />
            </SocialLink>
            <SocialLink href={siteConfig.social.instagram} label="Apeksha Jain on Instagram">
              <InstagramIcon />
            </SocialLink>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  width,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  width?: string;
}) {
  return (
    <div style={{ width }}>
      <h2 className="font-helvetica font-bold" style={text}>
        {title}
      </h2>
      <ul style={{ marginTop: fig(45, "1rem") }}>
        {links.map((l) => (
          // Line metrics on the <li> so each row is the full 41px line.
          <li key={l.href} style={text}>
            <Link
              href={l.href}
              className="whitespace-nowrap transition-colors hover:text-[#f8f7f2]"
              style={{ color: LINK }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="block transition-opacity hover:opacity-80"
        style={{ width: fig(38, "1.75rem"), height: fig(38, "1.75rem") }}
      >
        {children}
      </a>
    </li>
  );
}

/* Social icons, drawn on a 38px grid to match the Figma glyphs. */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 38 38" fill="currentColor" className="h-full w-full" aria-hidden>
      <circle cx="4.6" cy="4.6" r="4.6" />
      <rect x="0.6" y="12.2" width="8" height="25.8" />
      <path d="M13.6 12.2h7.7v3.5c1.1-2 3.7-4.1 7.6-4.1 8.1 0 9.1 5.3 9.1 12.2V38h-8V25.3c0-3-.1-6.9-4.2-6.9-4.2 0-4.8 3.3-4.8 6.7V38h-7.4Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 38 38" className="h-full w-full" aria-hidden>
      <path
        d="M19 2.5A16.5 16.5 0 0 0 4.7 27.2L2.5 35.5l8.5-2.2A16.5 16.5 0 1 0 19 2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        fill="currentColor"
        d="M13.4 10.4c.6-.5 1.4-.4 1.8.2l2.1 3.8c.3.6.2 1.2-.3 1.7l-1.4 1.3c1 2.2 2.8 4 5 5l1.3-1.4c.5-.5 1.1-.6 1.7-.3l3.8 2.1c.6.4.7 1.2.2 1.8l-1.7 2.1c-.7.8-1.8 1.1-2.8.8-5.6-1.8-9.9-6.1-11.7-11.7-.3-1 0-2.1.8-2.8Z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 38 38"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      className="h-full w-full"
      aria-hidden
    >
      <rect x="1.5" y="1.5" width="35" height="35" rx="9.5" />
      <circle cx="19" cy="19" r="8" />
      <circle cx="28.9" cy="9.1" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
