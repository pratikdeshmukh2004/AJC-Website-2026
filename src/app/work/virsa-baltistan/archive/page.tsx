import type { Metadata } from "next";
import { VirsaArchivePage } from "@/components/work/VirsaArchivePage";
import { optimizedPath } from "@/lib/image-paths";

const title = "Archive of Virsa Baltistan";
// The Our Work card copy for this visual archive ("The Virsa Archive").
const description =
  "The fabric of digital experience is in photographs and films. For a land unknown to most, AJC did the creative direction for the visual archive of a hotel, and a history.";
// The Virsa Baltistan card photo that opens this page. The original PNGs are
// pruned from the deployed output, so share the WebP.
const shareImage = "/images/our_work/1-left.png";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: optimizedPath(shareImage, 1280) ?? shareImage }],
  },
};

/**
 * /work/virsa-baltistan/archive — the visual archive of Virsa Baltistan
 * (AJC-16), opened from the left photo of its Our Work card. The project's
 * main page, /work/virsa-baltistan, is served by the [slug] route.
 */
export default function VirsaArchiveRoute() {
  return <VirsaArchivePage />;
}
