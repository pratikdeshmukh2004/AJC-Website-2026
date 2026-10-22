# AJC — Website

Static marketing / portfolio site for AJC, built with Next.js (App Router).

## Stack

- **Next.js 16** (App Router, Turbopack) — configured for **static export** (`output: "export"`)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first theme, design tokens in `src/styles/globals.css`)
- **ESLint + Prettier**
- Fonts via `next/font`: Cormorant Garamond (display) + Inter (body)

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

## Scripts

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the dev server                          |
| `npm run build`     | Production build → static site in `out/`      |
| `npm run start`     | Serve the production build                    |
| `npm run lint`      | ESLint                                         |
| `npm run typecheck` | TypeScript check (no emit)                    |
| `npm run format`    | Prettier write                                 |

## Project structure

```
src/
├── app/                  # App Router: routes, layouts, metadata
│   ├── layout.tsx        # Root layout (fonts, header, footer, metadata)
│   ├── page.tsx          # Home
│   ├── not-found.tsx     # 404
│   ├── robots.ts         # robots.txt (static)
│   └── sitemap.ts        # sitemap.xml (static)
├── components/
│   ├── layout/           # Header, Footer
│   └── ui/               # Container, Button, SectionHeading
├── config/
│   ├── site.ts           # Site metadata + nav (single source of truth)
│   └── fonts.ts          # next/font setup
├── lib/
│   └── utils.ts          # Helpers (cn)
└── styles/
    └── globals.css       # Tailwind import + design tokens (@theme)

public/
└── images/               # Static imagery (see images/README.md)
```

## Theme

Design tokens live in `src/styles/globals.css` under `@theme` and are derived
from the Figma design (editorial / luxury palette). They surface as Tailwind
utilities, e.g. `bg-brand`, `text-cream`, `font-display`, `max-w-container`.

Edit the tokens there to re-theme the whole site.

## Building out pages

The header nav (`src/config/site.ts`) points at `/work`, `/studio`, `/contact`.
Add route folders under `src/app/` (e.g. `src/app/work/page.tsx`) as you build
those sections out. Add imagery under `public/images/`.

## Deployment

`npm run build` emits a fully static site to `out/`. Host it on any static
host (Vercel, Netlify, S3 + CloudFront, GitHub Pages).
