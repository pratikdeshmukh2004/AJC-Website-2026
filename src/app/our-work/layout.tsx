import { WorkHeader } from "@/components/work/WorkHeader";

/**
 * Layout for the /our-work route. Uses the design-specific WorkHeader
 * (APEKSHA JAIN · AJC · theme toggle) instead of the global site Header,
 * and renders no primary nav bar — the category filter row leads the page.
 */
export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <WorkHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
