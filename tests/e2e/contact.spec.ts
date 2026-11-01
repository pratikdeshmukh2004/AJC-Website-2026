import { test, expect, type Page } from "@playwright/test";

// Serial, like the other specs: they share one static web server.
test.describe.configure({ mode: "serial" });

const TAUPE = "rgb(125, 112, 98)"; // #7D7062 headings
const BROWN = "rgb(131, 107, 67)"; // #836B43 button + email
const PAPER = "rgb(248, 247, 242)"; // #F8F7F2 background

const field = (page: Page, name: RegExp) => page.getByRole("textbox", { name });

test.beforeEach(async ({ page }) => {
  await page.goto("/contact/");
  await page.evaluate(() => document.fonts.ready);
});

test("renders the headline, eyebrow and contact details", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /You’re in our\s*sitting room now\./,
  );
  await expect(page.getByText("This is where we begin conversations")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Say Hello!" })).toBeVisible();
  await expect(page.getByText("New Delhi, India")).toBeVisible();

  const email = page.getByRole("link", { name: "apeksha@apekshajain.in" });
  await expect(email).toHaveAttribute("href", "mailto:apeksha@apekshajain.in");
  await expect(email).toHaveCSS("color", BROWN);
});

test("follows the design colours and fonts", async ({ page }) => {
  // The page wrapper around <main> carries the paper background.
  await expect(page.locator("main").locator("xpath=..")).toHaveCSS("background-color", PAPER);
  for (const heading of [
    page.getByRole("heading", { level: 1 }),
    page.getByRole("heading", { name: "Say Hello!" }),
  ]) {
    await expect(heading).toHaveCSS("font-family", /Cormorant Garamond/);
    await expect(heading).toHaveCSS("color", TAUPE);
  }
  const send = page.getByRole("button", { name: "Send" });
  await expect(send).toHaveCSS("background-color", BROWN);
  await expect(send).toHaveCSS("text-transform", "uppercase");
});

test("matches the Figma layout at 1920px", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  const top = (locator: ReturnType<Page["locator"]>) =>
    locator.evaluate((el) => Math.round(el.getBoundingClientRect().top + scrollY));

  // Figma (CONTACT US, 1920 x 2159): headline y593, "Say Hello!" y1247, name field y1408.
  expect(Math.abs((await top(page.getByRole("heading", { level: 1 }))) - 593)).toBeLessThanOrEqual(
    4,
  );
  expect(
    Math.abs((await top(page.getByRole("heading", { name: "Say Hello!" }))) - 1247),
  ).toBeLessThanOrEqual(4);
  expect(Math.abs((await top(field(page, /name/i))) - 1408)).toBeLessThanOrEqual(4);
  // Page height without the site footer (the Figma frame doesn't include it).
  const height = await page.evaluate(
    () =>
      document.documentElement.scrollHeight -
      (document.querySelector("footer")?.getBoundingClientRect().height ?? 0),
  );
  expect(Math.abs(height - 2159)).toBeLessThanOrEqual(6);

  // Form column on the left, photo on the right.
  const form = (await page.getByRole("form", { name: "Say hello" }).boundingBox())!;
  const photo = (await page.getByRole("img", { name: /pine tree/ }).boundingBox())!;
  expect(form.x + form.width).toBeLessThan(photo.x);
});

test("stacks the photo below the form on phones", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const form = (await page.getByRole("form", { name: "Say hello" }).boundingBox())!;
  const photo = (await page.getByRole("img", { name: /pine tree/ }).boundingBox())!;
  expect(photo.y).toBeGreaterThan(form.y + form.height);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
});

test("the rocking chair rocks, unless reduced motion is on", async ({ page, browser }) => {
  const chair = page.locator("img.ajc-rock");
  await expect(chair).toHaveCSS("animation-name", "ajc-rock");
  await expect(chair).toHaveCSS("animation-iteration-count", "infinite");

  const calm = await browser.newPage({ reducedMotion: "reduce" });
  await calm.goto("/contact/");
  await expect(calm.locator("img.ajc-rock")).toHaveCSS("animation-iteration-count", "1");
  await calm.close();
});

test("every field has an accessible name and is required", async ({ page }) => {
  for (const name of [/name/i, /message/i, /contact details/i]) {
    await expect(field(page, name)).toBeVisible();
    await expect(field(page, name)).toHaveAttribute("required", "");
  }
});

test("an empty form is not sent", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (r) => r.method() === "POST" && requests.push(r.url()));

  await page.getByRole("button", { name: "Send" }).click();
  // The browser flags the first empty field and nothing is posted.
  expect(
    await field(page, /name/i).evaluate((el: HTMLInputElement) => el.validity.valueMissing),
  ).toBe(true);
  await page.waitForTimeout(300);
  expect(requests).toEqual([]);
  expect(new URL(page.url()).pathname).toBe("/contact/");
});

test("the message field grows with long text", async ({ page }) => {
  const message = field(page, /message/i);
  const before = (await message.boundingBox())!.height;
  await message.fill("A longer note.\nWith a second line.\nAnd a third.");
  expect((await message.boundingBox())!.height).toBeGreaterThan(before);
});

test("the photo, chair and script load without errors", async ({ page }) => {
  const failed: string[] = [];
  page.on("response", (res) => {
    if (
      ["image", "font", "stylesheet", "script"].includes(res.request().resourceType()) &&
      res.status() >= 400
    ) {
      failed.push(`${res.status()} ${res.url()}`);
    }
  });
  await page.reload();
  for (const img of await page.locator("main img").all()) {
    await expect
      .poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0))
      .toBe(true);
  }
  expect(failed).toEqual([]);
});

test("the menu marks Contact Us as the current page", async ({ page }) => {
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Site menu" });
  await expect(menu.getByRole("link", { name: /^Contact Us/ })).toHaveAttribute(
    "aria-current",
    "page",
  );
});
