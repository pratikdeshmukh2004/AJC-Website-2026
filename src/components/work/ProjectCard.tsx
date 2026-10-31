import Image from "next/image";
import type { Project } from "@/config/projects";

/**
 * Single portfolio entry.
 *
 * Each project image file is a pre-composed wide pair (two photos side by side
 * in one asset), so it renders as one full-width block. Beneath it sits a row
 * with the serif title on the left and the narrative on the right — mirroring
 * the Figma "OUR WORK - ALL PROJECTS" layout.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col">
      <div className="bg-cream-dark relative aspect-[1710/880] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1536px) 1440px, 100vw"
          className="ease-editorial object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2 md:items-start">
        {/* Figma: Cormorant Garamond 80px, line-height 65px, tracking -4.8px (-0.06em) */}
        <h2 className="font-display text-ink text-4xl leading-[1.05] tracking-[-0.06em] md:text-[80px] md:leading-[65px]">
          {project.title}
        </h2>
        {/* Figma: Cormorant Garamond 30px, line-height 30px, tracking -1.8px (-0.06em) */}
        <p className="font-cormorant text-ink-soft max-w-xl text-xl leading-[1.1] tracking-[-0.06em] md:text-[30px] md:leading-[30px]">
          {project.description}
        </p>
      </div>
    </article>
  );
}
