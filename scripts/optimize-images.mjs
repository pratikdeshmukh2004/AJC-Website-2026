#!/usr/bin/env node
/**
 * Pre-build image pipeline for the static export.
 *
 * `output: "export"` has no server, so Next's on-demand image optimizer isn't
 * available (it needs a Node runtime, which GitHub Pages / Vercel static
 * hosting doesn't give a static export). Several of this site's source PNGs
 * are 6-12MB. This script does the resizing "by hand" at build time instead:
 *
 *   public/images/<dir>/<name>.png
 *     -> public/images/_opt/<dir>/<name>@640.webp
 *     -> public/images/_opt/<dir>/<name>@960.webp
 *     -> public/images/_opt/<dir>/<name>@1280.webp
 *     -> public/images/_opt/<dir>/<name>@1920.webp
 *     -> public/images/_opt/<dir>/<name>@2560.webp   (HD / retina screens)
 *
 * Sources are never upscaled: a tier wider than the source is the source at
 * its native size. Tiers come from src/config/images.json.
 *
 * `src/lib/image-loader.ts` (wired as next.config.ts `images.loader`) maps a
 * requested `(src, width)` to the nearest generated file, so next/image's
 * normal `sizes`/`srcset` behavior picks the right one per viewport — the
 * browser only downloads a file sized for its own screen, instead of the
 * full-resolution original every time. It also lazy-loads by default.
 *
 * It also writes src/generated/image-blur.json: a tiny (~20px) base64 WebP
 * per source image, used as the next/image `blurDataURL` placeholder so
 * large hero/gallery images don't pop in on a blank background while they
 * load.
 *
 * Idempotent and incremental: a source file is only re-encoded when it is
 * newer than its largest existing output, so repeat builds are fast.
 *
 * Usage:
 *   node scripts/optimize-images.mjs           generate variants (before build)
 *   node scripts/optimize-images.mjs --prune   drop originals from out/ (after build)
 */
import { readdir, mkdir, stat, readFile, writeFile, copyFile, rm } from "node:fs/promises";
import { join, extname, basename, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import config from "../src/config/images.json" with { type: "json" };

// fileURLToPath (not URL.pathname) so the path is valid on Windows too.
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PUBLIC_IMAGES = join(ROOT, "public", "images");
const OUT_DIR = join(PUBLIC_IMAGES, "_opt");
const BLUR_MANIFEST = join(ROOT, "src", "generated", "image-blur.json");

const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg"]);
const WIDTHS = config.widths;
// WebP quality: 82 is visually lossless for photography at these sizes while
// cutting file size by roughly 70-90% versus the source PNGs/JPEGs.
const QUALITY = 82;

/** Recursively list source rasters under `abs` (project folders are nested). */
async function listSourceFiles(abs) {
  let entries;
  try {
    entries = await readdir(abs, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const e of entries) {
    const full = join(abs, e.name);
    if (e.isDirectory()) files.push(...(await listSourceFiles(full)));
    else if (SOURCE_EXT.has(extname(e.name).toLowerCase())) files.push(full);
  }
  return files;
}

async function newestOutputMtime(outBase) {
  let newest = 0;
  for (const w of WIDTHS) {
    try {
      const s = await stat(`${outBase}@${w}.webp`);
      if (s.mtimeMs > newest) newest = s.mtimeMs;
    } catch {
      // Missing output — treat as stale so it gets (re)generated below.
    }
  }
  return newest;
}

async function processFile(filePath, blurManifest) {
  // Path of the file relative to public/images, e.g. "projects/x/y.png".
  const rel = relative(PUBLIC_IMAGES, filePath);
  const relDir = rel.slice(0, rel.length - basename(rel).length);
  const name = basename(filePath, extname(filePath));
  const outDir = join(OUT_DIR, relDir);
  await mkdir(outDir, { recursive: true });
  const outBase = join(outDir, name);

  const srcStat = await stat(filePath);
  const existingNewest = await newestOutputMtime(outBase);
  const publicKey = `/images/${rel.split("\\").join("/")}`;
  const needsBlur = blurManifest[publicKey] === undefined;

  if (srcStat.mtimeMs <= existingNewest && !needsBlur) {
    return { skipped: true };
  }

  const meta = await sharp(filePath, { failOn: "none" }).metadata();
  const srcWidth = meta.width ?? Math.max(...WIDTHS);

  // Never upscale. Tiers wider than the source are the source at native size;
  // they are still written (the loader asks for every tier, so each file must
  // exist) but encoded only once and copied.
  let written = 0;
  let nativeFile = null;
  for (const width of WIDTHS) {
    const dest = `${outBase}@${width}.webp`;
    if (width >= srcWidth && nativeFile) {
      await copyFile(nativeFile, dest);
    } else {
      await sharp(filePath, { failOn: "none" })
        .resize({ width: Math.min(width, srcWidth), withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(dest);
      if (width >= srcWidth) nativeFile = dest;
    }
    written++;
  }

  if (needsBlur) {
    const blurBuffer = await sharp(filePath, { failOn: "none" })
      .resize({ width: 20 })
      .webp({ quality: 40 })
      .toBuffer();
    blurManifest[publicKey] = `data:image/webp;base64,${blurBuffer.toString("base64")}`;
  }

  return { skipped: false, written };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  let blurManifest = {};
  try {
    blurManifest = JSON.parse(await readFile(BLUR_MANIFEST, "utf8"));
  } catch {
    // First run — start with an empty manifest.
  }

  let processed = 0;
  let skipped = 0;
  for (const dir of config.dirs) {
    const files = await listSourceFiles(join(PUBLIC_IMAGES, dir));
    for (const filePath of files) {
      const result = await processFile(filePath, blurManifest);
      if (result.skipped) {
        skipped++;
      } else {
        processed++;
        console.log(`  optimized ${relative(ROOT, filePath)} (${result.written} sizes)`);
      }
    }
  }

  await mkdir(join(ROOT, "src", "generated"), { recursive: true });
  await writeFile(BLUR_MANIFEST, JSON.stringify(blurManifest, null, 2) + "\n");

  console.log(`Image optimization: ${processed} file(s) processed, ${skipped} up to date.`);
}

/**
 * `--prune`: run AFTER `next build`. The static export copies every file in
 * public/ into out/, including the multi-megabyte originals that nothing
 * references any more (pages only ever request the _opt WebP variants). Delete
 * each original from out/ — but only if all of its optimized variants made it
 * into out/ too, so a failed optimize step can never leave a broken image.
 * Sources in public/ are never touched.
 */
async function pruneOutput() {
  const outImages = join(ROOT, "out", "images");
  let removed = 0;
  let freed = 0;
  for (const dir of config.dirs) {
    for (const filePath of await listSourceFiles(join(outImages, dir))) {
      const rel = relative(outImages, filePath);
      const base = join(outImages, "_opt", rel.slice(0, rel.length - extname(rel).length));
      const variants = WIDTHS.map((w) => `${base}@${w}.webp`);
      const complete = (await Promise.all(variants.map((v) => stat(v).then(() => true, () => false)))).every(Boolean);
      if (!complete) {
        console.warn(`  kept ${relative(ROOT, filePath)} (optimized variants missing)`);
        continue;
      }
      freed += (await stat(filePath)).size;
      await rm(filePath);
      removed++;
    }
  }
  console.log(`Pruned ${removed} original image(s) from out/ (${(freed / 1048576).toFixed(0)}MB).`);
}

(process.argv.includes("--prune") ? pruneOutput() : main()).catch((err) => {
  console.error(err);
  process.exit(1);
});
