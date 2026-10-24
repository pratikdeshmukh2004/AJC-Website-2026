"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MenuPanel } from "@/components/layout/MenuPanel";

/**
 * Hero header overlay + menu. Owns the menu open/close state.
 * Stays in position over the film (per design comments). The "Menu" button
 * opens the slide-in {@link MenuPanel}.
 */
export function HeroHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex w-full max-w-container items-center justify-between px-6 py-8 md:px-12 md:py-10">
          <span className="font-cormorant text-lg tracking-[0.25em] text-white md:text-xl">
            APEKSHA JAIN
          </span>

          <Link
            href="/"
            className="pointer-events-auto font-cormorant text-xl tracking-[0.2em] text-white md:text-2xl"
            aria-label={`${siteConfig.name} — home`}
          >
            {siteConfig.name}
          </Link>

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
