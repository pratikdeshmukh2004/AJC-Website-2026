# AJC: Kiro working rules

The full code standards are in `AGENTS.md` at the repo root. Follow them on every
change. In short:

- Tailwind classes go directly on the tag. Use the existing colour tokens
  (`text-taupe`, `text-sage`, `bg-cream`, ...) and never remove or replace them with hex.
  Write other values (sizes, tracking, spacing) directly on the tag. No new tokens, no
  shared class constants, no custom CSS.
- Text goes directly inside the tag. No copy, labels or alt text stored in variables or
  arrays.
- If a UI piece repeats and no component exists, create one reusable component and use
  it everywhere. Do not copy it onto each instance, and do not create a component for
  something used once.
- Use the shared `u()` / `at()` / `fig()` helpers, `OptimizedImage` for photos in the
  optimized folders, the `CASE_STUDIES` registry for project pages, and existing
  components before new ones.

When a request conflicts with `AGENTS.md`, say so before doing it. If the user gives a
new standard, add it to `AGENTS.md` so the next session remembers it.

## Before saying a task is done

1. `npx tsc --noEmit` and `npx eslint <changed paths>` pass.
2. `npm run build:vercel` passes. The build prunes original images from `out/`, so it
   catches image paths that only work in dev.
3. For layout or visual work, open it in a browser and look. Serve the build with
   `python3 -m http.server <port> --directory out` and screenshot with Playwright
   (`@playwright/test` is installed). Check desktop (1440 and 1920) and phone (390).
4. Delete any temporary scripts and screenshots you created. Stop servers you started.

## Pitfalls seen in this repo

- A dev server may already be running on port 3000 from an earlier session. Next will
  not start a second one for the same folder. If the browser looks stale, hard-refresh
  (Cmd+Shift+R) or confirm which server you are looking at before changing code again.
- `fs_write` on a very large file can abort. Prefer targeted `str_replace` edits.
- Long shell commands can wedge the terminal. Start builds with
  `control_bash_process` and read them with `get_process_output`.
- zsh errors on unmatched globs (`--include=*.html`). Quote patterns or use the search tool.

## Jira and Figma

- Jira project key `AJC`, cloud `dverse-new.atlassian.net`. `editJiraIssue` replaces the
  whole description, so send the full markdown. Change status with the transitions tools.
- Figma file key `Mxq9OSh2Y8NhO8n1ahF4FJ`. The Figma REST API and MCP are rate limited,
  so prefer assets and measurements already in the repo. Never print `FIGMA_TOKEN`.
- When finishing a ticketed page, update its Jira story with what was built and what
  is still open (for example interim assets).
