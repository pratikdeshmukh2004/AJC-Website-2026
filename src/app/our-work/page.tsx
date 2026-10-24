import type { Metadata } from "next";
import { WorkGallery } from "@/components/work/WorkGallery";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "A selection of AJC projects across identity & design, creative direction, experiences, and hospitality — rooted in culture, heritage, and considered design.",
};

/**
 * /our-work — the "All Projects" portfolio page.
 * Mirrors the Figma "OUR WORK - ALL PROJECTS" frame: an editorial page title
 * followed by a category-filterable grid of project case studies.
 */
export default function OurWorkPage() {
  return (
    <>
      <h1 className="sr-only">Our Work — All Projects</h1>
      <WorkGallery />
    </>
  );
}
