import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { WorkHeader } from "@/components/work/WorkHeader";
import { HaveliExperiencesPage } from "@/components/work/HaveliExperiencesPage";
import { getProjectBySlug, projects } from "@/config/projects";
import { assetPath } from "@/lib/utils";

type Params = { slug: string };

/**
 * Pre-render one static page per project at build time. Required under
 * `output: export` (there is no server to resolve dynamic params at runtime).
 */
export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

/**
 * Project case-study page at /work/<slug> — opened from a card on Our Work.
 *
 * The Figma file has no dedicated frame for these project pages yet (see
 * AJC-22), so this is an on-brand editorial scaffold: the design-specific
 * WorkHeader chrome, a back link to Our Work, the project's hero image, its
 * serif title, category tags, and the narrative from the portfolio data.
 * The detailed project sections drop in here once the design lands.
 */
export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Haveli Experiences has a full, pixel-faithful case-study design (AJC-22),
  // reproduced from the Figma project-page frame. Other projects fall back to
  // the editorial scaffold below until their own designs land.
  if (slug === "haveli-experiences") {
    return <HaveliExperiencesPage />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <WorkHeader />

      <main className="flex-1">
        <Container className="pt-16 pb-16 md:pt-28 md:pb-24">
          {/* Back to the portfolio grid */}
          <Link
            href="/our-work"
            className="font-helvetica text-ink-muted hover:text-ink inline-flex items-center gap-2 text-sm tracking-[0.02em] uppercase transition-colors"
          >
            <span aria-hidden>&larr;</span> Back to Our Work
          </Link>

          {/* Title + narrative */}
          <header className="mt-10 grid grid-cols-1 gap-x-10 gap-y-4 md:mt-14 md:grid-cols-2 md:items-end">
            <h1 className="font-display text-ink text-4xl leading-[1.05] tracking-[-0.06em] md:text-[80px] md:leading-[65px]">
              {project.title}
            </h1>
            <p className="font-cormorant text-ink-soft max-w-xl text-xl leading-[1.1] tracking-[-0.06em] md:text-[30px] md:leading-[30px]">
              {project.description}
            </p>
          </header>

          {/* Category tags */}
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
            {project.categories.map((category) => (
              <li
                key={category}
                className="font-helvetica text-ink-muted text-xs tracking-[0.02em] uppercase md:text-sm"
              >
                {category}
              </li>
            ))}
          </ul>

          {/* Hero image */}
          <div className="bg-cream-dark relative mt-12 aspect-[1710/880] w-full overflow-hidden md:mt-16">
            <Image
              src={assetPath(project.image)}
              alt={project.title}
              fill
              priority
              sizes="(min-width: 1536px) 1440px, 100vw"
              className="object-cover"
            />
          </div>

          {/* Design-pending note — the full case-study sections land here once
              the Figma frame for this project exists (AJC-22). */}
          <p className="font-cormorant text-ink-muted mt-16 max-w-xl text-lg leading-[1.3] tracking-[-0.03em] md:text-2xl">
            A fuller story of this project is on its way.
          </p>
        </Container>
      </main>
    </div>
  );
}
