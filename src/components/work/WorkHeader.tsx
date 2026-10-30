import Image from "next/image";
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
    <header className="bg-cream pt-20 md:pt-32">
      <Container className="grid grid-cols-3 items-center">
        {/* Left — secondary brand wordmark. In Figma this is custom vector
            lettering (not a font), so we use the exact exported SVG. Its paths
            are filled with the brand taupe (#7D7062 = --color-taupe). */}
        <Image
          src="/images/brand/apeksha-jain-wordmark.svg"
          alt="Apeksha Jain"
          width={385}
          height={42}
          priority
          className="h-5 w-auto md:h-6"
        />

        {/* Center — AJC logo. Like the wordmark, the logo in Figma is custom
            vector lettering, so we use the exact exported SVG (taupe #7D7062). */}
        <Link href="/" aria-label={`${siteConfig.name} — home`} className="justify-self-center">
          <Image
            src="/images/brand/ajc-logo.svg"
            alt={siteConfig.name}
            width={96}
            height={42}
            priority
            className="h-6 w-auto md:h-7"
          />
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
