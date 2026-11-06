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
  tone = "light",
}: {
  /** Show only the menu toggle (no "Apeksha Jain" / "AJC" logos), e.g. on About. */
  menuOnly?: boolean;
  /** `light` = white marks over the film; `dark` = taupe marks on paper pages. */
  tone?: "light" | "dark";
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ink = tone === "dark" ? "text-taupe" : "text-white";

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
              {/* Brand marks take the text colour (set by `tone`). */}
              <ApekshaJainWordmark title="Apeksha Jain" className={`h-4 md:h-5 ${ink}`} />

              <Link
                href="/"
                className={`pointer-events-auto flex ${ink}`}
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
            className={`pointer-events-auto flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80 ${ink}`}
          >
            <span className="h-3.5 w-3.5 rounded-full border border-current" aria-hidden />
            <span className="h-3.5 w-3.5 rounded-full bg-current" aria-hidden />
          </button>
        </div>
      </header>

      <MenuPanel open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
