import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

/**
 * Header for the /our-work route, matching the Figma design:
 *   left   — secondary brand wordmark "APEKSHA JAIN"
 *   center — the "AJC" logo
 *   right  — a light/dark theme toggle (two circles)
 *
 * No primary nav links appear here — the category filter row (rendered by
 * WorkGallery) sits directly beneath this header.
 */
export function WorkHeader() {
  return (
    <header className="bg-cream pt-10 md:pt-16">
      <Container className="grid grid-cols-3 items-center">
        {/* Left — secondary brand */}
        <p className="font-display text-xl tracking-[0.18em] text-ink md:text-2xl">
          APEKSHA JAIN
        </p>

        {/* Center — AJC logo */}
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="justify-self-center font-display text-2xl tracking-[0.12em] text-ink md:text-3xl"
        >
          {siteConfig.name}
        </Link>

        {/* Right — theme toggle (visual, mirrors the design) */}
        <div className="justify-self-end">
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}

/**
 * Two separate circles forming a light/dark toggle, matching the design:
 * an outlined (empty) circle for light and a solid taupe circle for dark,
 * sitting side by side with a gap. The dark circle is shown active.
 */
function ThemeToggle() {
  return (
    <div role="group" aria-label="Theme" className="flex items-center gap-2.5">
      <button
        type="button"
        aria-label="Light theme"
        aria-pressed="false"
        className="h-6 w-6 cursor-pointer rounded-full border border-ink/50 bg-transparent transition-colors hover:border-ink"
      />
      <button
        type="button"
        aria-label="Dark theme"
        aria-pressed="true"
        className="h-6 w-6 cursor-pointer rounded-full bg-ink transition-colors"
      />
    </div>
  );
}
