import { test, expect } from "@playwright/test";

// Run serially — all specs share one static web server and a tall canvas;
// serial execution keeps layout measurements stable.
test.describe.configure({ mode: "serial" });

const RGB = "rgb(139, 127, 115)"; // #8B7F73
const CREAM = "rgb(248, 247, 242)"; // #F8F7F2

test.beforeEach(async ({ page }) => {
  await page.goto("/about/");
  await page.evaluate(() => document.fonts.ready);
});

test("renders the key headings and copy", async ({ page }) => {
  await expect(page.getByText("AJC is a creative consultancy")).toBeVisible();
  await expect(page.getByText("worlds within worlds")).toBeVisible();
  await expect(page.getByText("What We Do")).toBeVisible();
  await expect(page.getByText("Our Work", { exact: true })).toBeVisible();
  await expect(page.getByRole("img", { name: /pine forest/ })).toBeVisible();
});

test("shows all seven Our Work regions in order", async ({ page }) => {
  const regions = [
    "In Bhutan",
    "In Ladakh",
    "In Punjab",
    "In Assam",
    "In Bengal",
    "In Delhi",
    "In Rajasthan",
  ];
  for (const name of regions) {
    await expect(page.getByText(name, { exact: true })).toBeVisible();
  }
});

test("loads the self-hosted fonts from /fonts", async ({ page }) => {
  const fonts = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts].map((f) => `${f.family}|${f.weight}|${f.status}`);
  });
  expect(fonts).toContain("Cormorant Garamond|400|loaded");
  expect(fonts).toContain("Helvetica Neue AJC|700|loaded");

  // No failed font requests.
  const fontRequests = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .map((e) => (e as PerformanceResourceTiming).name)
      .filter((n) => n.includes("/fonts/")),
  );
  expect(fontRequests.some((u) => u.includes(".woff2"))).toBeTruthy();
});

test("headings use Cormorant, body uses Helvetica, text color is #8B7F73", async ({ page }) => {
  const heading = page.getByText("Our Work", { exact: true });
  await expect(heading).toHaveCSS("font-family", /Cormorant Garamond/);
  await expect(heading).toHaveCSS("color", RGB);

  const body = page.getByText("It is where the past and the present");
  await expect(body).toHaveCSS("font-family", /Helvetica Neue AJC/);
  await expect(body).toHaveCSS("color", RGB);
});

test("band headline is cream and semibold over the image", async ({ page }) => {
  const headline = page.getByText("worlds within worlds");
  await expect(headline).toHaveCSS("color", CREAM);
  await expect(headline).toHaveCSS("font-weight", "600");
});

test("Ladakh clients render as three side-by-side two-line columns", async ({ page }) => {
  const names = [
    "VIRSA BALTISTAN",
    "farmers’ house",
    "HILL TRIBE",
    "silk route",
    "balti kitchen",
    "ALCHI KITCHEN",
  ];
  const boxes: Record<string, { x: number; y: number }> = {};
  for (const n of names) {
    const el = page.getByText(n, { exact: true });
    await el.scrollIntoViewIfNeeded();
    const box = await el.boundingBox();
    expect(box, `bounding box for "${n}"`).not.toBeNull();
    boxes[n] = { x: Math.round(box!.x), y: Math.round(box!.y) };
  }

  // Three distinct columns (by x), each left-aligned pair shares an x.
  expect(boxes["VIRSA BALTISTAN"].x).toBe(boxes["farmers’ house"].x);
  expect(boxes["HILL TRIBE"].x).toBe(boxes["silk route"].x);
  expect(boxes["balti kitchen"].x).toBe(boxes["ALCHI KITCHEN"].x);

  // Columns are ordered left -> right.
  expect(boxes["VIRSA BALTISTAN"].x).toBeLessThan(boxes["HILL TRIBE"].x);
  expect(boxes["HILL TRIBE"].x).toBeLessThan(boxes["balti kitchen"].x);

  // Second line sits below the first within each column.
  expect(boxes["farmers’ house"].y).toBeGreaterThan(boxes["VIRSA BALTISTAN"].y);
});

test("region images sit to the right of their text", async ({ page }) => {
  const headingEl = page.getByText("In Bhutan", { exact: true });
  await headingEl.scrollIntoViewIfNeeded();
  const heading = await headingEl.boundingBox();
  const image = await page.getByRole("img", { name: /Bhutan/ }).boundingBox();
  expect(heading).not.toBeNull();
  expect(image).not.toBeNull();
  expect(image!.x).toBeGreaterThan(heading!.x + heading!.width - 1);
});
