"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AjcLogo, ApekshaJainWordmark, ScriptCycle } from "@/components/brand";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/*
  Site footer, two layouts in one DOM.
    - md and up: Figma Footer (node 3279:1082), 1920 x 649. Values are
      `clamp(min, px / 19.2 vw, px)` written as classes: exact at 1920px wide,
      scaled down below it.
        band #9b9484; headings, body and icons #f8f7f2; links #e2dfd8
        left column x239: cycling script, Apeksha Jain + AJC marks, tagline
        right columns x1232 (Discover) and x1456 (Resources), social icons
    - below md: Figma Footer mobile (node 4101:980), 390 x 679. One centred
      column: marks row (wordmark | script | AJC), the two link groups (label
      left, links from x199), social icons, tagline. Horizontal measures are in
      vw so it holds from 320px to 430px; type and vertical rhythm are fixed px.
  The left/right wrappers and the marks row are `display: contents` below md so
  their children can sit on the mobile grid in the Figma order.
  Rendered from the root layout on every page except Home, whose full-screen
  film has no footer.
*/
export function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="bg-[#9b9484] pt-[calc(70*var(--u))] pb-[calc(55*var(--u))] text-[#f8f7f2] uppercase [--u:clamp(0.95px,calc(100vw/390),1.5px)] md:pt-[clamp(3.5rem,10.4167vw,200px)] md:pb-[clamp(3rem,6.0938vw,117px)]">
      <div className="mx-auto grid max-w-[1920px] grid-cols-[1fr_auto_1fr] items-center px-[11vw] md:flex md:items-stretch md:justify-between md:gap-10 md:pr-[clamp(1.5rem,12.1875vw,234px)] md:pl-[clamp(1.5rem,12.3438vw,237px)]">
        {/* Left: marks and tagline */}
        <div className="contents md:block">
          {/* Desktop canvas starts 2.5px above the headings' line box, as in Figma. */}
          <ScriptCycle
            align="start-md"
            intervalMs={1500}
            className="col-start-2 row-start-1 w-[min(calc(96*var(--u)),26vw)] md:-mt-[3px] md:w-[clamp(8.5rem,11.875vw,228px)]"
          />
          <div className="contents md:mt-[clamp(1.25rem,2.6042vw,50px)] md:flex md:items-center md:gap-[clamp(2.5rem,5.8854vw,113px)]">
            <ApekshaJainWordmark className="col-start-1 row-start-1 h-[calc(9*var(--u))] justify-self-start md:h-[clamp(0.8rem,0.9896vw,19px)]" />
            <AjcLogo className="col-start-3 row-start-1 mr-[2.3vw] h-[calc(11*var(--u))] justify-self-end md:mr-0 md:h-[clamp(0.9rem,1.0938vw,21px)]" />
          </div>
          <p className="font-helvetica-regular col-span-3 row-start-4 -mx-[4vw] mt-[calc(49*var(--u))] text-center text-[length:calc(11*var(--u))] leading-[calc(22*var(--u))] tracking-[0.02em] md:mx-0 md:mt-[clamp(1.75rem,4.1667vw,80px)] md:text-left md:text-[length:clamp(0.875rem,1.0417vw,20px)] md:leading-[clamp(1.9rem,2.1354vw,41px)]">
            A creative consultancy based in India
            <br />© Apeksha Jain {new Date().getFullYear()}
          </p>
        </div>

        {/* Right: link columns and social icons */}
        <div className="contents md:block">
          <nav
            aria-label="Footer"
            className="font-helvetica col-span-3 row-start-2 mt-[calc(91*var(--u))] flex flex-col font-bold md:mt-0 md:flex-row"
          >
            <FooterColumn
              title="Discover"
              links={siteConfig.footer.discover}
              className="md:w-[clamp(9rem,11.6667vw,224px)]"
            />
            <FooterColumn title="Resources" links={siteConfig.footer.resources} />
          </nav>

          <ul className="col-span-3 row-start-3 mt-[calc(68*var(--u))] flex items-center justify-center gap-[calc(18*var(--u))] md:mt-[clamp(1.25rem,2.2917vw,44px)] md:justify-start md:gap-[clamp(1.25rem,1.9792vw,38px)]">
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

/**
 * One link group. Mobile: the label on the left and the links in a column
 * starting at x199 (40vw of 390), groups 51px apart. Desktop: the label stacked
 * above its links. Line metrics sit on each `li` so every row is a full line.
 */
function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={cn("mt-[calc(51*var(--u))] flex first:mt-0 md:mt-0 md:block", className)}>
      <h2 className="font-helvetica w-[40vw] shrink-0 text-[length:calc(12*var(--u))] leading-[calc(25*var(--u))] font-bold tracking-[0.02em] md:w-auto md:text-[length:clamp(0.875rem,1.0417vw,20px)] md:leading-[clamp(1.9rem,2.1354vw,41px)]">
        {title}
      </h2>
      <ul className="md:mt-[clamp(1rem,2.3438vw,45px)]">
        {links.map((l) => (
          <li
            key={l.href}
            className="text-[length:calc(12*var(--u))] leading-[calc(25*var(--u))] tracking-[0.02em] md:text-[length:clamp(0.875rem,1.0417vw,20px)] md:leading-[clamp(1.9rem,2.1354vw,41px)]"
          >
            <Link
              href={l.href}
              className="whitespace-nowrap text-[#e2dfd8] transition-colors hover:text-[#f8f7f2]"
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
        className="block size-[calc(18*var(--u))] transition-opacity hover:opacity-80 md:size-[clamp(1.75rem,1.9792vw,38px)]"
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
