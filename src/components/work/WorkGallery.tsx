"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";
import { projects, workCategories, type WorkCategory } from "@/config/projects";

/**
 * Filterable portfolio grid for the /our-work route.
 *
 * The filter row mirrors the Figma categories (All Projects · Identity & Design
 * · Creative Direction · Experiences · Hospitality). Projects render in a
 * two-column editorial grid that collapses to one column on small screens.
 */
export function WorkGallery() {
  const [active, setActive] = useState<WorkCategory>("All Projects");

  const visible = useMemo(() => {
    if (active === "All Projects") return projects;
    return projects.filter((p) => p.categories.includes(active));
  }, [active]);

  return (
    <Container className="pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Filter row — centered, mirrors the design's category nav */}
      <nav
        aria-label="Filter projects by category"
        className="mb-16 flex justify-center md:mb-24"
      >
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {workCategories.map((category) => {
            const isActive = category === active;
            return (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={isActive}
                  className={cn(
                    "cursor-pointer text-[11px] uppercase tracking-[0.18em] transition-colors",
                    isActive ? "text-ink" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {category}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Project stack — one full-width project block per row */}
      {visible.length > 0 ? (
        <div className="flex flex-col gap-20 md:gap-28">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-ink-muted">No projects in this category yet.</p>
      )}
    </Container>
  );
}
