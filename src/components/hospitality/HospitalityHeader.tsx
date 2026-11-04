"use client";

import { useState } from "react";
import Link from "next/link";
import { AjcLogo, ApekshaJainWordmark } from "@/components/brand";
import { MenuPanel } from "@/components/layout/MenuPanel";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { AT, at } from "./design";

/**
 * Hero header for the Hospitality page: Apeksha Jain wordmark (left), AJC logo
 * (centre) and the two-circle menu toggle (right). Owns the menu open/close
 * state; the slide-in MenuPanel is shared.
 *
 * Below xl it is the same flex row as the shared HeroHeader. At xl the marks
 * sit at their Figma coordinates and scale with the canvas (they are 42px tall
 * at 1920px, much larger than HeroHeader's fixed sizes).
 */
export function HospitalityHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 text-[#f8f7f2]">
        <div className="flex items-center justify-between px-6 py-8 md:px-12 md:py-10 xl:block xl:p-0">
          <ApekshaJainWordmark
            title="Apeksha Jain"
            className={cn("h-4 md:h-5 xl:h-[calc(42*var(--u))]", AT)}
            style={at(105, 147)}
          />

          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className={cn("pointer-events-auto flex", AT)}
            style={at(913, 147)}
          >
            <AjcLogo className="h-6 md:h-7 xl:h-[calc(42*var(--u))]" />
          </Link>

          {/* Two-circle menu toggle (hollow + filled), per the design */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-label="Open menu"
            className={cn(
              "pointer-events-auto flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80 xl:gap-[calc(13*var(--u))]",
              AT,
            )}
            style={at(1704, 140)}
          >
            <span
              aria-hidden
              className="h-3.5 w-3.5 rounded-full border border-solid border-current xl:h-[calc(49*var(--u))] xl:w-[calc(49*var(--u))] xl:border-[length:calc(3*var(--u))]"
            />
            <span
              aria-hidden
              className="h-3.5 w-3.5 rounded-full bg-current xl:h-[calc(49*var(--u))] xl:w-[calc(49*var(--u))]"
            />
          </button>
        </div>
      </header>

      <MenuPanel open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
