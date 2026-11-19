
/**
 * Layout for the /our-work route: the paper background, with the category
 * filter row leading the page. The site header is global (root layout) and
 * floats over the top, so the top padding keeps the room the old in-flow
 * header used to take.
 */
export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-cream pt-[6.75rem] md:pt-[9.75rem]">
      <main className="flex-1">{children}</main>
    </div>
  );
}
