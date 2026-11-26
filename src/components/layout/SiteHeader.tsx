"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AjcLogo, ApekshaJainWordmark } from "@/components/brand";
import { getEntryChoice, subscribeEntry } from "@/components/home/entry-session";
import { MenuPanel } from "@/components/layout/MenuPanel";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/*
  The one site header — Figma: Header (node 3834:14), 1920 x 141, transparent.
    left   "APEKSHA JAIN" wordmark (x101, 42px tall)
    centre "AJC" logo (42px tall)
    right  two-circle menu toggle, hollow + filled (49px each, 10px apart, ends x1811)
  Sizes use fig(px): exact at 1920px wide, scaled down below it. The marks are drawn
  a little smaller than the frame (38px / 45px instead of 42px / 50px) by request;
  positions and the 141px bar are unchanged.

  Rendered once from the root layout, so every page has it, Home included. It
  sits at the top of the page (not fixed) and has no background: the marks are
  white over photo heroes and taupe on the paper-coloured pages.

  Home opens on the landing gate, so the header stays out until the visitor has
  chosen an option there.
*/
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const entered = useSyncExternalStore(
    subscribeEntry,
    () => getEntryChoice() !== null,
    () => false,
  );

  if (pathname === "/" && !entered) return null;

  // Paper-coloured pages need taupe marks; everything else has a photo or film
  // behind the header and takes white. Every project now has its own case-study
  // page with a photo hero; a project added to config/projects.ts without one
  // falls back to a paper scaffold, which would need adding here.
  const onPaper = ["/contact", "/terms", "/privacy", "/our-work"].some((route) =>
    pathname.startsWith(route),
  );

  // Mobile frames "About us (Mob)" and "Alchi Kitchen (Mob)" draw the header as a
  // solid white bar with taupe marks over the hero photo. md and up is unchanged.
  const whiteBar = pathname.startsWith("/about") || pathname.startsWith("/work/alchi-kitchen");

  return (
    <>
      <header
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-30 [--u:clamp(0.9px,calc(100vw/390),1.5px)] md:[--u:initial]",
          whiteBar
            ? "text-taupe bg-white md:bg-transparent md:text-white"
            : onPaper
              ? "text-taupe"
              : "text-white",
        )}
      >
        <div className="mx-auto grid h-[calc(62*var(--u))] max-w-[1920px] grid-cols-[1fr_auto_1fr] items-center pr-[calc(24*var(--u))] pl-[calc(14*var(--u))] md:h-[clamp(5.5rem,7.344vw,141px)] md:pr-[clamp(1.5rem,5.677vw,109px)] md:pl-[clamp(1.5rem,5.26vw,101px)]">
          <ApekshaJainWordmark
            title="Apeksha Jain"
            className="h-[calc(9*var(--u))] justify-self-start md:h-[clamp(0.9375rem,1.979vw,38px)]"
          />
          {/* Mobile frame places the logo at x187, 9px right of the centred column. */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="pointer-events-auto flex translate-x-[calc(6*var(--u))] justify-self-center md:translate-x-0"
          >
            <AjcLogo className="h-[calc(18*var(--u))] md:h-[clamp(1.375rem,1.979vw,38px)]" />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-label="Open menu"
            className="pointer-events-auto flex cursor-pointer items-center gap-[calc(3*var(--u))] justify-self-end transition-opacity hover:opacity-80 md:gap-[clamp(0.45rem,0.469vw,9px)]"
          >
            <span
              aria-hidden
              className="size-[calc(16*var(--u))] rounded-full border-[length:calc(1.5*var(--u))] border-solid border-current md:size-[clamp(0.8125rem,2.344vw,45px)] md:border-[length:clamp(1px,0.143vw,2.75px)]"
            />
            <span
              aria-hidden
              className="size-[calc(16*var(--u))] rounded-full bg-current md:size-[clamp(0.8125rem,2.344vw,45px)]"
            />
          </button>
        </div>
      </header>

      <MenuPanel open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
