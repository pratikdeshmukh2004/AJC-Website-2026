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
      <div className="relative aspect-[1710/880] w-full overflow-hidden bg-cream-dark">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1536px) 1440px, 100vw"
          className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2 md:items-start">
        <h2 className="font-display text-4xl text-ink md:text-5xl">{project.title}</h2>
        <p className="max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
          {project.description}
        </p>
      </div>
    </article>
  );
}
