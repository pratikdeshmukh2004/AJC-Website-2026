/**
 * Font loading via next/font. Self-hosted, zero layout shift.
 *
 * Per the AJC design system:
 * - Headings / sub-headings: Cormorant Garamond (loaded here).
 * - Body: Helvetica Regular — a system font, so it needs no web-font load;
 *   it's set directly in the --font-sans token in globals.css.
 */
import { Cormorant_Garamond } from "next/font/google";

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});
