import type { Ref } from "react";
import { assetPath } from "@/lib/utils";
import { VideoPlayer, type VideoPlayerHandle } from "./VideoPlayer";
import { HeroHeader } from "./HeroHeader";

/**
 * Full-screen home hero.
 * - The AJC brand film plays full-bleed with custom player controls. Playback
 *   is started by the landing gate via `playerRef` (see HomeExperience).
 * - The header stays in position while the film plays (per design comments):
 *   "Apeksha Jain" wordmark (left), "AJC" logo (center), menu (right).
 *
 * Media:
 *   /public/videos/hero.mp4             — the AJC brand film
 *   /public/images/home/hero-poster.jpg — first-paint poster (frame from the film)
 */
export function Hero({ playerRef }: { playerRef?: Ref<VideoPlayerHandle> }) {
  return (
    <section className="relative h-dvh w-full overflow-hidden bg-white">
      <VideoPlayer
        ref={playerRef}
        src={assetPath("/videos/hero.mp4")}
        poster={assetPath("/images/home/hero-poster.jpg")}
      />
      <HeroHeader />
    </section>
  );
}
