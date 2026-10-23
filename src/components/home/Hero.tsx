import { assetPath } from "@/lib/utils";
import { VideoPlayer } from "./VideoPlayer";
import { HeroHeader } from "./HeroHeader";

/**
 * Full-screen home hero.
 * - The AJC brand film plays full-bleed with full player controls
 *   (play/pause, scrub, volume, mute, PiP, fullscreen) — see VideoPlayer.
 * - The header stays in position while the film plays (per design comments):
 *   "APEKSHA JAIN" (left), "AJC" wordmark (center), menu (right).
 * - "Menu" opens a slide-in side panel (see MenuPanel via HeroHeader).
 *
 * Media:
 *   /public/videos/hero.mp4        — the AJC brand film
 *   /public/images/hero-poster.jpg — first-paint poster (frame from the film)
 */
export function Hero() {
  return (
    <section className="relative h-dvh w-full overflow-hidden bg-cream">
      <VideoPlayer src={assetPath("/videos/hero.mp4")} poster={assetPath("/images/hero-poster.jpg")} />
      <HeroHeader />
    </section>
  );
}
