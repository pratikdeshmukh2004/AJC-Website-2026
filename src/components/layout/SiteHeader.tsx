"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AjcLogo, ApekshaJainWordmark } from "@/components/brand";
import { getEntryChoice, subscribeEntry } from "@/components/home/entry-session";
import { MenuPanel } from "@/components/layout/MenuPanel";
import { siteConfig } from "@/config/site";
import { cn, fig } from "@/lib/utils";

/*
  The one site header — Figma: Header (node 3834:14), 1920 x 141, transparent.
    left   "APEKSHA JAIN" wordmark (x101, 42px tall)
    centre "AJC" logo (42px tall)
    right  two-circle menu toggle, hollow + filled (49px each, 10px apart, ends x1811)
  Sizes use fig(px): exact at 1920px wide, scaled down below it.

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
  // behind the header and takes white. `/work/virsa-archive` is the project
  // scaffold (no case study yet), which is paper too.
  const onPaper = ["/contact", "/terms", "/privacy", "/our-work", "/work/virsa-archive"].some(
    (route) => pathname.startsWith(route),
  );

  return (
    <>
      <header
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-30",
          onPaper ? "text-taupe" : "text-white",
        )}
      >
        <div
          className="mx-auto flex max-w-[1920px] items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]"
          style={{
            height: fig(141, "5.5rem"),
            paddingLeft: fig(101, "1.5rem"),
            paddingRight: fig(109, "1.5rem"),
          }}
        >
          <ApekshaJainWordmark
            title="Apeksha Jain"
            className="md:justify-self-start"
            style={{ height: fig(42, "1rem") }}
          />

          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="pointer-events-auto flex md:justify-self-center"
          >
            <AjcLogo style={{ height: fig(42, "1.5rem") }} />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-label="Open menu"
            className="pointer-events-auto flex cursor-pointer items-center transition-opacity hover:opacity-80 md:justify-self-end"
            style={{ gap: fig(10, "0.5rem") }}
          >
            <span
              aria-hidden
              className="rounded-full border border-solid border-current"
              style={{
                width: fig(50, "0.875rem"),
                height: fig(50, "0.875rem"),
                borderWidth: fig(3, "1px"),
              }}
            />
            <span
              aria-hidden
              className="rounded-full bg-current"
              style={{ width: fig(50, "0.875rem"), height: fig(50, "0.875rem") }}
            />
          </button>
        </div>
      </header>

      <MenuPanel open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
