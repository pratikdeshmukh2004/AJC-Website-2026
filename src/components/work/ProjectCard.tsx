import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { Project, ProjectImage } from "@/config/projects";
import { assetPath } from "@/lib/utils";
/**
 * Single portfolio entry.
 *
 * Each project is a pair of separate photos shown side by side with a thin
 * gutter (matching the Figma two-slot layout), each rendered at its own native
 * aspect ratio (uncropped). Beneath the pair sits a top-aligned row with the
 * serif title on the left and the narrative on the right.
 */
export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  /** Preload the images — set for the first card only (above the fold). Others lazy-load. */
  priority?: boolean;
}) {
  const { left, right } = project.images;
  return (
    <article className="group flex flex-col">
      {/* The whole card opens the project's case-study page at /work/<slug>. */}
      <Link
        href={`/work/${project.slug}`}
        aria-label={`View project: ${project.title}`}
        className="focus-visible:ring-ink/40 flex flex-col outline-none focus-visible:ring-2"
      >
        {/* Two separate photos, side by side with a central gutter. */}
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <Photo image={left} alt={project.title} priority={priority} />
          <Photo image={right} alt={project.title} priority={priority} />
        </div>

        {/* Figma: ~52px gap below the images, then a top-aligned two-column row —
            title on the left, narrative on the right — collapsing to one column
            on mobile. */}
        <div className="mt-8 grid grid-cols-1 gap-y-3 md:mt-[52px] md:grid-cols-2 md:items-start md:gap-x-3">
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

/**
 * One photo in the pair. Renders at the asset's intrinsic ratio so nothing is
 * cropped (`h-auto w-full`). The src is wrapped in assetPath() because
 * next/image does NOT basePath-prefix a raw string src under static export —
 * required on GitHub Pages, which serves the site under a subpath.
 */
function Photo({ image, alt, priority }: { image: ProjectImage; alt: string; priority: boolean }) {
  return (
    <div className="bg-cream-dark w-full overflow-hidden">
      <OptimizedImage
        src={assetPath(image.src)}
        alt={alt}
        width={image.width}
        height={image.height}
        priority={priority}
        sizes="(min-width: 1536px) 720px, 50vw"
        className="ease-editorial h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
      />
    </div>
  );
}
