"use client";

import { useState } from "react";
import Link from "next/link";
import { AjcLogo, ApekshaJainWordmark } from "@/components/brand";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { MenuPanel } from "@/components/layout/MenuPanel";

/**
 * Header for the /our-work route, matching the Figma design:
 *   left   — secondary brand wordmark "APEKSHA JAIN"
 *   center — the "AJC" logo
 *   right  — the two-dot menu toggle (hollow + filled circle)
 *
 * The two circles open the shared slide-in {@link MenuPanel} — the same menu
 * used on the home and about pages. No primary nav links appear here; the
 * category filter row (rendered by WorkGallery) sits directly beneath.
 */
export function WorkHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-cream pt-20 md:pt-32">
        <Container className="grid grid-cols-3 items-center">
          {/* Left — secondary brand wordmark (reusable brand component, inherits
              the brand taupe via text-ink). Size matches the shared HeroHeader. */}
          <ApekshaJainWordmark title="Apeksha Jain" className="text-ink h-4 md:h-5" />

          {/* Center — AJC logo (reusable brand component). */}
          <Link href="/" aria-label={`${siteConfig.name} — home`} className="justify-self-center">
            <AjcLogo className="text-ink h-6 md:h-7" />
          </Link>

          {/* Right — two-dot menu toggle (hollow + filled circle), opens the
              shared slide-in MenuPanel (same as home / about). */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-label="Open menu"
            className="flex cursor-pointer items-center gap-2.5 justify-self-end transition-opacity hover:opacity-80"
          >
            <span
              className="border-ink/60 h-6 w-6 rounded-full border bg-transparent"
              aria-hidden
            />
            <span className="bg-ink h-6 w-6 rounded-full" aria-hidden />
          </button>
        </Container>
      </header>

      <MenuPanel open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
