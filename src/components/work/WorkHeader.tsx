import Link from "next/link";
import { AjcLogo, ApekshaJainWordmark } from "@/components/brand";
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
    <header className="bg-cream pt-20 md:pt-32">
      <Container className="grid grid-cols-3 items-center">
        {/* Left — secondary brand wordmark (reusable brand component, inherits
            the brand taupe via text-ink). */}
        <ApekshaJainWordmark title="Apeksha Jain" className="text-ink h-5 md:h-6" />

        {/* Center — AJC logo (reusable brand component). */}
        <Link href="/" aria-label={`${siteConfig.name} — home`} className="justify-self-center">
          <AjcLogo className="text-ink h-6 md:h-7" />
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
        className="border-ink/50 hover:border-ink h-6 w-6 cursor-pointer rounded-full border bg-transparent transition-colors"
      />
      <button
        type="button"
        aria-label="Dark theme"
        aria-pressed="true"
        className="bg-ink h-6 w-6 cursor-pointer rounded-full transition-colors"
      />
    </div>
  );
}
