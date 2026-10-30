import { test, expect, type Locator, type Page } from "@playwright/test";

// Run serially — like about.spec, all specs share one static web server and
// the hero film; serial execution keeps media/timing behaviour stable.
test.describe.configure({ mode: "serial" });

// Design-system colours (AJC Website Design Materials).
const WHITE = "rgb(255, 255, 255)"; // home page uses pure white, not cream
const TAUPE = "rgb(125, 112, 98)"; // #7D7062

// ---- Locators & helpers ------------------------------------------------------

const gate = (page: Page) => page.getByRole("dialog", { name: "Enter the AJC website" });
const withAudioButton = (page: Page) => page.getByRole("button", { name: "Continue with audio" });
const withoutAudioButton = (page: Page) =>
  page.getByRole("button", { name: "Continue without audio" });
const landingVideo = (page: Page) => page.locator('video[src$="/videos/landing-home.mp4"]');
const heroVideo = (page: Page) => page.locator('video:has(source[src$="/videos/hero.mp4"])');
const menuPanel = (page: Page) => page.getByRole("dialog", { name: "Site menu" });

type VideoState = { paused: boolean; muted: boolean; time: number };
const videoState = (video: Locator) =>
  video.evaluate((v: HTMLVideoElement): VideoState => ({
    paused: v.paused,
    muted: v.muted,
    time: v.currentTime,
  }));

/** Pick a gate option and wait until the gate has faded out and unmounted. */
async function enter(page: Page, { withAudio }: { withAudio: boolean }) {
  await (withAudio ? withAudioButton(page) : withoutAudioButton(page)).click();
  await expect(gate(page)).toHaveCount(0, { timeout: 5000 });
}

/** The hero control bar is the direct parent of the play/pause button. */
const controlBar = (page: Page) =>
  page.getByRole("button", { name: /^(Play|Pause)$/ }).locator("xpath=..");

/** A deliberate scroll: a firm swipe followed by trackpad-style momentum. */
async function firmScroll(page: Page) {
  await page.mouse.move(700, 450);
  for (let i = 0; i < 10; i++) {
    await page.mouse.wheel(0, 80);
    await page.waitForTimeout(16);
  }
  for (let i = 0; i < 30; i++) {
    await page.mouse.wheel(0, Math.max(2, 60 - i * 2));
    await page.waitForTimeout(16);
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

// ---- Entry gate --------------------------------------------------------------

test.describe("entry gate", () => {
  test("shows the logo and both audio choices over the landing clip", async ({ page }) => {
    await expect(gate(page)).toBeVisible();
    await expect(gate(page).getByRole("img", { name: "Apeksha Jain" })).toBeVisible();
    // The wordmark over the landing clip is pure white.
    await expect(gate(page).getByRole("img", { name: "Apeksha Jain" })).toHaveCSS("fill", WHITE);
    await expect(withAudioButton(page)).toBeVisible();
    await expect(withoutAudioButton(page)).toBeVisible();

    // "With audio" sits above "without audio", both below the logo.
    const logo = await gate(page).getByRole("img", { name: "Apeksha Jain" }).boundingBox();
    const first = await withAudioButton(page).boundingBox();
    const second = await withoutAudioButton(page).boundingBox();
    expect(logo!.y).toBeLessThan(first!.y);
    expect(first!.y).toBeLessThan(second!.y);
  });

  test("buttons follow the design system", async ({ page }) => {
    for (const button of [withAudioButton(page), withoutAudioButton(page)]) {
      await expect(button).toHaveCSS("background-color", WHITE);
      await expect(button).toHaveCSS("color", TAUPE);
      await expect(button).toHaveCSS("text-transform", "uppercase");
      await expect(button).toHaveCSS("cursor", "pointer");
    }
  });

  test("does not auto-focus a button (no focus ring on load)", async ({ page }) => {
    await expect(gate(page)).toBeVisible();
    expect(await page.evaluate(() => document.activeElement?.tagName)).toBe("BODY");
  });

  test("the landing clip loops silently in the background", async ({ page }) => {
    const clip = landingVideo(page);
    await expect(clip).toHaveJSProperty("muted", true);
    await expect(clip).toHaveJSProperty("loop", true);
    await expect.poll(async () => (await videoState(clip)).time).toBeGreaterThan(0);
  });

  test("the home film is held back and inert until a choice is made", async ({ page }) => {
    await page.waitForTimeout(800);
    const state = await videoState(heroVideo(page));
    expect(state.paused).toBe(true);
    expect(state.time).toBe(0);
    // Hero (and its menu toggle) can't be reached behind the gate.
    await expect(page.getByRole("button", { name: "Open menu" })).toHaveCount(0);
  });

  test("continue with audio fades into Home and plays the film with sound", async ({ page }) => {
    await enter(page, { withAudio: true });
    const film = heroVideo(page);
    await expect.poll(async () => (await videoState(film)).time).toBeGreaterThan(0);
    const state = await videoState(film);
    expect(state.paused).toBe(false);
    expect(state.muted).toBe(false);
  });

  test("continue without audio plays the film muted", async ({ page }) => {
    await enter(page, { withAudio: false });
    const film = heroVideo(page);
    await expect.poll(async () => (await videoState(film)).time).toBeGreaterThan(0);
    const state = await videoState(film);
    expect(state.paused).toBe(false);
    expect(state.muted).toBe(true);
  });

  test("the gate shows again after a reload", async ({ page }) => {
    await enter(page, { withAudio: false });
    await page.reload();
    await expect(gate(page)).toBeVisible();
  });
});

// ---- Header & menu -----------------------------------------------------------

test.describe("header and menu", () => {
  test.beforeEach(async ({ page }) => {
    await enter(page, { withAudio: false });
  });

  test("header shows the name, the AJC home link and the menu toggle", async ({ page }) => {
    const header = page.locator("header");
    await expect(header.getByRole("img", { name: "Apeksha Jain" })).toBeVisible();
    await expect(header.getByRole("link", { name: /AJC — home/ })).toBeVisible();
    await expect(header.getByRole("button", { name: "Open menu" })).toBeVisible();
  });

  test("brand marks are inline SVGs coloured by the text colour", async ({ page }) => {
    const header = page.locator("header");
    const marks = [
      header.locator('svg[aria-label="Apeksha Jain"]'),
      header.getByRole("link", { name: /AJC — home/ }).locator("svg"),
    ];
    for (const svg of marks) {
      await expect(svg).toBeVisible();
      // Fills with currentColor → white over the film.
      await expect(svg).toHaveAttribute("fill", "currentColor");
      await expect(svg).toHaveCSS("fill", WHITE);
      const box = (await svg.boundingBox())!;
      expect(box.width).toBeGreaterThan(box.height * 2); // keeps the wide logo ratio

      // Changing the text colour recolours the mark.
      await svg.evaluate((el) => ((el as unknown as HTMLElement).style.color = "rgb(255, 0, 0)"));
      await expect(svg).toHaveCSS("fill", "rgb(255, 0, 0)");
    }
  });

  test("menu opens with the quote and links, and marks Home as current", async ({ page }) => {
    await expect(menuPanel(page)).toBeHidden();
    await page.getByRole("button", { name: "Open menu" }).click();

    const menu = menuPanel(page);
    await expect(menu).toBeVisible();
    await expect(menu).toBeInViewport();
    await expect(menu.getByText(/Living in India means living/)).toBeVisible();

    const links = menu.getByRole("navigation", { name: "Primary" }).getByRole("link");
    // Only the current page (Home) carries the ">" active arrow.
    await expect(links).toHaveText([
      "Home>",
      "About Us",
      "Our Work",
      "Philosophy",
      "AJC Hospitality",
      "Contact Us",
    ]);
    await expect(links.first()).toHaveAttribute("aria-current", "page");
    await expect(menu.locator('[aria-current="page"]')).toHaveCount(1);
  });

  test("menu closes with the × button and with Escape", async ({ page }) => {
    const open = page.getByRole("button", { name: "Open menu" });

    await open.click();
    await expect(menuPanel(page)).toBeVisible();
    await menuPanel(page).getByRole("button", { name: "Close menu" }).click();
    await expect(menuPanel(page)).toBeHidden();

    await open.click();
    await expect(menuPanel(page)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menuPanel(page)).toBeHidden();
  });

  test("the closed menu cannot be reached with the keyboard", async ({ page }) => {
    // Tab through the whole page; focus must never land inside the closed panel.
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press("Tab");
      const inPanel = await page.evaluate(
        () => !!document.activeElement?.closest('[aria-label="Site menu"]'),
      );
      expect(inPanel).toBe(false);
    }
  });
});

// ---- Player controls ---------------------------------------------------------

test.describe("film player controls", () => {
  test.beforeEach(async ({ page }) => {
    await enter(page, { withAudio: false });
  });

  test("controls are hidden by default, appear on mouse move, then auto-hide", async ({ page }) => {
    const bar = controlBar(page);
    await expect(bar).toHaveCSS("opacity", "0", { timeout: 5000 });

    await page.mouse.move(500, 400);
    await page.mouse.move(520, 420);
    await expect(bar).toHaveCSS("opacity", "1");

    // Idle for longer than the 2.5s auto-hide.
    await expect(bar).toHaveCSS("opacity", "0", { timeout: 5000 });
  });

  test("play/pause toggles playback", async ({ page }) => {
    const film = heroVideo(page);
    await expect.poll(async () => (await videoState(film)).paused).toBe(false);

    await page.mouse.move(500, 400);
    await page.getByRole("button", { name: "Pause" }).click();
    await expect.poll(async () => (await videoState(film)).paused).toBe(true);
    await expect(page.getByRole("button", { name: "Play" })).toBeVisible();

    await page.getByRole("button", { name: "Play" }).click();
    await expect.poll(async () => (await videoState(film)).paused).toBe(false);
  });

  test("mute button toggles sound", async ({ page }) => {
    const film = heroVideo(page);
    await page.mouse.move(500, 400);

    // Entered without audio → offered "Unmute".
    await page.getByRole("button", { name: "Unmute" }).click();
    await expect.poll(async () => (await videoState(film)).muted).toBe(false);

    await page.getByRole("button", { name: "Mute" }).click();
    await expect.poll(async () => (await videoState(film)).muted).toBe(true);
  });

  test("the timecode tooltip only shows while hovering the scrubber", async ({ page }) => {
    const seek = page.getByRole("slider", { name: "Seek" });
    const tooltip = seek.locator("xpath=preceding-sibling::div[1]");

    await page.mouse.move(500, 400);
    await expect(tooltip).toHaveCSS("opacity", "0");

    await seek.hover();
    await expect(tooltip).toHaveCSS("opacity", "1");
    await expect(tooltip).toHaveText(/^\d+:\d{2}$/);
  });
});

// ---- Scroll to About ---------------------------------------------------------

test.describe("scroll to About", () => {
  test.beforeEach(async ({ page }) => {
    await enter(page, { withAudio: false });
  });

  test("a single light scroll stays on Home", async ({ page }) => {
    await page.mouse.move(700, 450);
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(1500);
    expect(new URL(page.url()).pathname).toBe("/");
  });

  test("a firm scroll slides to About, landing at the top with the menu-only header", async ({
    page,
  }) => {
    await firmScroll(page);
    await page.waitForURL("**/about/");

    // Wait for the transition + momentum lock to finish.
    await expect
      .poll(() => page.evaluate(() => document.documentElement.style.overflow), {
        timeout: 5000,
      })
      .toBe("");
    expect(await page.evaluate(() => scrollY)).toBe(0);

    const header = page.locator("header");
    expect((await header.boundingBox())!.y).toBe(0);
    await expect(header.getByRole("button", { name: "Open menu" })).toBeVisible();
    await expect(header.getByRole("img", { name: "Apeksha Jain" })).toHaveCount(0);
    await expect(header.getByRole("link", { name: /AJC — home/ })).toHaveCount(0);

    // About scrolls normally once the lock is released.
    await page.mouse.move(700, 450);
    for (let i = 0; i < 5; i++) await page.mouse.wheel(0, 120);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0);
  });

  test("About scrolls straight away when the visitor keeps scrolling", async ({ page }) => {
    await firmScroll(page);
    await page.waitForURL("**/about/");
    const landedAt = Date.now();

    // Keep wheeling with fresh, steady notches right after landing.
    let scrolled = false;
    while (!scrolled && Date.now() - landedAt < 3000) {
      await page.mouse.wheel(0, 120);
      await page.waitForTimeout(60);
      scrolled = (await page.evaluate(() => scrollY)) > 0;
    }
    expect(scrolled).toBe(true);
    // Unlocked shortly after the 600ms slide, not seconds later.
    expect(Date.now() - landedAt).toBeLessThan(1500);
  });

  test("scrolling does not navigate while the menu is open", async ({ page }) => {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(menuPanel(page)).toBeVisible();
    await firmScroll(page);
    await page.waitForTimeout(1500);
    expect(new URL(page.url()).pathname).toBe("/");
  });

  test("returning Home in the same session skips the gate", async ({ page }) => {
    await firmScroll(page);
    await page.waitForURL("**/about/");

    await page.getByRole("button", { name: "Open menu" }).click();
    await menuPanel(page).getByRole("link", { name: /^Home/ }).click();
    await page.waitForURL((url) => url.pathname === "/");

    await expect(gate(page)).toHaveCount(0);
    const film = heroVideo(page);
    await expect.poll(async () => (await videoState(film)).time).toBeGreaterThan(0);
    // Keeps the earlier "without audio" choice.
    expect((await videoState(film)).muted).toBe(true);
  });
});

// ---- Assets ------------------------------------------------------------------

test("all home media, fonts, styles and scripts load without errors", async ({ page }) => {
  const failed: string[] = [];
  page.on("response", (res) => {
    const type = res.request().resourceType();
    if (["image", "media", "font", "stylesheet", "script"].includes(type) && res.status() >= 400) {
      failed.push(`${res.status()} ${res.url()}`);
    }
  });

  await page.goto("/");
  await expect(gate(page)).toBeVisible();
  await enter(page, { withAudio: false });
  await expect.poll(async () => (await videoState(heroVideo(page))).time).toBeGreaterThan(0);

  expect(failed).toEqual([]);
});
