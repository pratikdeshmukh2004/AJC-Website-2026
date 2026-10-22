/**
 * Font loading via next/font. Self-hosted, zero layout shift.
 * The CSS variables map to the --font-display / --font-sans theme tokens
 * declared in globals.css.
 *
 * - Cormorant Garamond: elegant serif for editorial display headings.
 * - Inter: clean grotesque for body and UI.
 */
import { Cormorant_Garamond, Inter } from "next/font/google";

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
