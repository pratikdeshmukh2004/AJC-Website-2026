import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { Project } from "@/config/projects";
import { assetPath } from "@/lib/utils";
/**
 * Single portfolio entry.
 *
 * Each project image file is a pre-composed wide pair (two photos side by side
 * in one asset), so it renders as one full-width block. Beneath it sits a row
 * with the serif title on the left and the narrative on the right — mirroring
 * the Figma "OUR WORK - ALL PROJECTS" layout.
 */
export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  /** Preload the image — set for the first card only (above the fold). Others lazy-load. */
  priority?: boolean;
}) {
  return (
    <article className="group flex flex-col">
      {/* The whole card opens the project's case-study page at /work/<slug>. */}
      <Link
        href={`/work/${project.slug}`}
        aria-label={`View project: ${project.title}`}
        className="focus-visible:ring-ink/40 flex flex-col outline-none focus-visible:ring-2"
      >
        <div className="bg-cream-dark w-full overflow-hidden">
          {/* Render at the asset's intrinsic ratio so nothing is cropped — each
              composed image has a different native height, so there is no single
              fixed aspect. The width/height props make next/image reserve the
              correct ratio; `h-auto w-full` lets it scale fluidly.
              next/image does NOT basePath-prefix a raw string src under static
              export, so prefix it manually — required on GitHub Pages, which
              serves the site under a subpath (/AJC-Website-2026). */}
          <OptimizedImage
            src={assetPath(project.image)}
            alt={project.title}
            width={project.width}
            height={project.height}
            priority={priority}
            sizes="(min-width: 1536px) 1440px, 100vw"
            className="ease-editorial h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
        {/* Figma: ~52px gap below the image, then a top-aligned two-column row —
            title on the left, narrative on the right — collapsing to one column
            on mobile. */}
        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-3 md:mt-[52px] md:grid-cols-2 md:items-start">
          {/* Figma: Cormorant Garamond 80px, line-height 65px, tracking -4.8px (-0.06em), taupe */}
          <h2 className="font-cormorant text-ink text-4xl leading-[1.05] tracking-[-0.06em] md:text-[80px] md:leading-[65px]">
            {project.title}
          </h2>
          {/* Figma: Cormorant Garamond 30px, line-height 30px, tracking -1.8px (-0.06em), taupe.
              Block width ~849px in the design. */}
          <p className="font-cormorant text-ink-soft max-w-[849px] text-xl leading-[1.1] tracking-[-0.06em] md:text-[30px] md:leading-[30px]">
            {project.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
