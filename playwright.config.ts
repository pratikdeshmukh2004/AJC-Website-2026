import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright runs against the production static export (`out/`) served on
 * port 3100. `npm run test:e2e` builds the site and serves it automatically.
 * Using the static build (not `next dev`) avoids Next's single-dev-server lock
 * and tests the real deployed output. Tests live in ./tests/e2e.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  // One worker: Python's stock http.server has a tiny connection backlog, and
  // parallel workers streaming the home videos overflow it (connection resets).
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3100",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run build && python3 -m http.server 3100 --directory out",
    url: "http://localhost:3100/about/",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
