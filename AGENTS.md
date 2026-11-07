# AJC web: code standards

Static Next.js 16 site (`output: "export"`), React 19, TypeScript strict, Tailwind v4.
Read this before changing code. Match what already exists; do not introduce new patterns.

## Commands

- `npm run typecheck`, `npm run lint`: must both pass.
- `npm run build`: optimizes images, builds, prunes originals from `out/`. Must pass.
- `npm run build:vercel`: same, with no GitHub Pages base path (drag `out/` onto Vercel).
- `npm run test:e2e`: Playwright. Do not add tests unless asked.

## Styling: Tailwind only, written on the element

- Put every Tailwind class directly on the tag that uses it.
- Colours: use the existing colour tokens defined in `globals.css` `@theme`
  (`text-taupe`, `text-sage`, `bg-cream`, `bg-cream-dark`, `text-ink`, `text-ink-muted`,
  `text-ink-soft`, `text-brown`, `text-brown-dark`, `bg-brand`, ...). Never remove or
  rename an existing token, and never replace a token class with a raw hex value.
  If the design needs a colour that has no token, write it as an arbitrary value on the
  tag (`text-[#836b43]`) rather than inventing a new token.
- Everything else (sizes, spacing, tracking, line height, fonts) is written as the real
  value on the tag: `text-[length:calc(50*var(--u))]`, `tracking-[-0.06em]`,
  `font-cormorant`. Do not add new `@theme` entries for these.
- Do NOT create: shared class-string constants (`const BODY = "..."`), `tw = {}`
  style objects, `@utility` / `@apply` / component classes in CSS, or a `design.ts`
  of styles.
- `cn()` (from `@/lib/utils`) is fine for conditional classes.
- `globals.css` holds the existing `@theme` tokens, `@font-face`, base styles, keyframes
  and pseudo-elements Tailwind cannot express (range thumbs, view transitions). Do not
  delete tokens from it, even if they look unused.
- Class order and formatting come from Prettier (`npm run format`).

## Text and content

- Write text directly inside the tag that shows it (`<h2>Our Process</h2>`,
  `<p>...paragraph...</p>`, `alt="..."` on the image). Do not store page copy,
  headings, labels, alt text or paragraph arrays in module-level variables or constants
  and map over them.
- Shared data that several pages read already lives in `src/config/site.ts` and
  `src/config/projects.ts`; keep using those. Do not create new copy/data constants
  inside a page or component file.
- A list may be mapped only when its items are genuinely data-driven (for example the
  project list); even then the markup and classes for one item stay on its tags.

## Sizing from Figma

- Flow pages (Contact, Philosophy): `fig(px, min)` from `@/lib/utils` inline in `style`.
- Pixel-faithful canvas pages (About, Hospitality, project case studies): the page
  root sets `@container ... [--u:calc(100cqw/1920)]`; write sizes as
  `calc(<px>*var(--u))`. For per-element coordinates use `u(px)` / `at(x, y, w)`
  from `@/lib/utils` with `xl:left-(--x) xl:top-(--y) xl:w-(--w)`.
- Never write a local copy of `u`, `v` or `fig`. Reuse the shared ones.

## Files and components

- Server components by default. Add `"use client"` only for state, effects or event
  handlers. A page that exports `metadata` stays a server component.
- Reuse before creating. Search `src/components` first. Existing pieces include:
  `HeroHeader` (+ `MenuPanel`), `Footer` (rendered in the root layout, hides itself on
  `/`), `ScriptCycle`, the brand SVGs in `@/components/brand`, `OptimizedImage`,
  `ReadMoreCopy`. Do not make a page-specific copy of one of these.
- If the same piece of UI appears more than once (on one page or across pages) and no
  component exists, create ONE reusable component for it in `src/components/` and use
  it everywhere. Its Tailwind classes live on the tag inside that component; text and
  position come in as props or children. Do not paste the same markup and class list
  onto each instance, and do not build a separate near-duplicate per page.
- Do not create a component or file for something used exactly once. Merge single-use
  markup into the page. Put small shared functions in `src/lib/utils.ts`, not in a new
  tiny file.
- Keep one canonical implementation of any behaviour. If a second page needs the
  same logic, extract it instead of copy-pasting.
- Comments say why (Figma node, ticket, constraint), not what. Name magic numbers.

## Images and media

- Raster photos in `public/images/{about,our_work,projects,hospitality}` MUST use
  `OptimizedImage` (`@/components/ui/OptimizedImage`) with `assetPath("/images/...")`.
  Plain `next/image` on these paths breaks after deploy: the build prunes the
  originals from `out/` and only the `_opt/*.webp` variants ship.
- A new image folder: add it to `dirs` in `src/config/images.json`. The build then
  generates WebP variants and blur previews. Do not commit `public/images/_opt/`.
  Do commit `src/generated/image-blur.json` (code imports it).
- Small assets (SVG, icons, posters, small JPGs) use static imports with
  `next/image`; no pipeline needed.
- `priority` only for above-the-fold images (the LCP hero). Everything else lazy-loads.
  Use `priority`, never `preload`, on images.
- Prefix raw string paths with `assetPath()` (GitHub Pages serves under a subpath).
- Videos are large. Say so when adding one (current deploy size matters for Vercel
  drag-and-drop and GitHub Pages).

## Pages and routing

- Project case studies: build the page in `src/components/work/` and register its
  slug in `CASE_STUDIES` in `src/app/work/[slug]/page.tsx`. Do not add `if (slug === ...)`
  chains. Unregistered slugs fall back to the generic scaffold.
- Project data lives in `src/config/projects.ts`; site info in `src/config/site.ts`.
  Do not import page components into config files (the gallery is a client bundle).

## Working rules

- Read the existing code of the closest similar page first and follow it.
- Do not commit unless asked. Do not write tests unless asked.
- Never print or commit secrets. `.env` is gitignored (`FIGMA_TOKEN` lives there).
- Remove temporary scripts, screenshots and background servers when done.
