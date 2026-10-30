"use client";

import { useState } from "react";
import Link from "next/link";
import { AjcLogo, ApekshaJainWordmark } from "@/components/brand";
import { siteConfig } from "@/config/site";
import { MenuPanel } from "@/components/layout/MenuPanel";

/**
 * Hero header overlay + menu. Owns the menu open/close state.
 * Stays in position over the film (per design comments). The "Menu" button
 * opens the slide-in {@link MenuPanel}.
 */
export function HeroHeader({
  menuOnly = false,
}: {
  /** Show only the menu toggle (no "Apeksha Jain" / "AJC" logos), e.g. on About. */
  menuOnly?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30">
        <div
          className={`max-w-container mx-auto flex w-full items-center px-6 py-8 md:px-12 md:py-10 ${
            menuOnly ? "justify-end" : "justify-between"
          }`}
        >
          {menuOnly ? null : (
            <>
              {/* Brand marks take the text colour — change `text-white` to recolour. */}
              <ApekshaJainWordmark title="Apeksha Jain" className="h-4 text-white md:h-5" />

              <Link
                href="/"
                className="pointer-events-auto flex text-white"
                aria-label={`${siteConfig.name} — home`}
              >
                <AjcLogo className="h-6 md:h-7" />
              </Link>
            </>
          )}

          {/* Two-dot menu toggle (hollow + filled circle), per the design */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-label="Open menu"
            className="pointer-events-auto flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80"
          >
            <span className="h-3.5 w-3.5 rounded-full border border-white" aria-hidden />
            <span className="h-3.5 w-3.5 rounded-full bg-white" aria-hidden />
          </button>
        </div>
      </header>

      <MenuPanel open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
