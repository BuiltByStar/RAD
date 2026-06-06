#!/usr/bin/env node
// Composes the social-embed OG/Twitter card and the Apple touch icon
// from existing brand assets in public/assets/. Run with:
//   node scripts/generate-og-image.mjs
// Outputs:
//   app/opengraph-image.png   (1200x630)
//   app/twitter-image.png     (1200x630, same content)
//   app/icon.png              (180x180)
//   app/apple-icon.png        (180x180)

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const assets = path.join(root, "public", "assets");
const appDir = path.join(root, "app");

const OG_W = 1200;
const OG_H = 630;

const BRAND_RED = "#DC143C";

async function build() {
  await mkdir(appDir, { recursive: true });

  // Left "stamp": pre-rendered white wolf head on the red textured spike bg.
  // Square asset cropped down to 600x630 (covers full height of the OG card).
  const leftPanel = await sharp(path.join(assets, "rad-pfp-red.png"))
    .resize({ width: 630, height: 630, fit: "cover", position: "center" })
    .extract({ left: 15, top: 0, width: 600, height: 630 })
    .toBuffer();

  // Wordmark (red on transparent). Trim the alpha padding first so the
  // resulting buffer reflects the tight glyph bbox — this makes vertical
  // positioning predictable.
  const wordmarkW = 460;
  const wordmark = await sharp(path.join(assets, "rad-wordmark.png"))
    .trim()
    .resize({ width: wordmarkW, fit: "contain" })
    .toBuffer();
  const wordmarkMeta = await sharp(wordmark).metadata();
  const wordmarkH = wordmarkMeta.height ?? 0;

  // Right panel text — rendered via SVG so it stays crisp. Coordinates are
  // local to the 600x630 right panel; we composite it at left=600 below.
  // Hardcoded uppercase because librsvg ignores CSS text-transform.
  const textOverlaySvg = `
    <svg width="600" height="630" xmlns="http://www.w3.org/2000/svg">
      <style>
        .subtitle {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-weight: 800;
          letter-spacing: 12px;
          fill: #ffffff;
        }
        .tag {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-weight: 500;
          letter-spacing: 0.5px;
          fill: #d0d0d0;
        }
      </style>
      <rect x="60" y="350" width="64" height="3" fill="${BRAND_RED}" />
      <text class="subtitle" x="60" y="408" font-size="44">ESPORTS</text>
      <text class="tag" x="60" y="486" font-size="22">Built around players.</text>
      <text class="tag" x="60" y="518" font-size="22">Remembered through history.</text>
    </svg>`;

  // Subtle red accent line between the two halves.
  const accent = await sharp({
    create: {
      width: 4,
      height: OG_H,
      channels: 4,
      background: BRAND_RED
    }
  })
    .png()
    .toBuffer();

  const og = await sharp({
    create: {
      width: OG_W,
      height: OG_H,
      channels: 4,
      background: "#000000"
    }
  })
    .composite([
      { input: leftPanel, left: 0, top: 0 },
      { input: accent, left: 600, top: 0 },
      // Wordmark centered horizontally within the right panel (x: 600..1200),
      // sitting in the upper third so the ESPORTS subtitle and tagline can
      // stack cleanly below.
      {
        input: wordmark,
        left: 600 + Math.round((600 - wordmarkW) / 2),
        top: Math.round(220 - wordmarkH / 2)
      },
      { input: Buffer.from(textOverlaySvg), left: 600, top: 0 }
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  await sharp(og).toFile(path.join(appDir, "opengraph-image.png"));
  await sharp(og).toFile(path.join(appDir, "twitter-image.png"));

  // Apple touch icon — square crop of the pfp at 180x180.
  const icon = await sharp(path.join(assets, "rad-pfp-red.png"))
    .resize({ width: 180, height: 180, fit: "cover", position: "center" })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await sharp(icon).toFile(path.join(appDir, "icon.png"));
  await sharp(icon).toFile(path.join(appDir, "apple-icon.png"));

  console.log("Generated:");
  console.log("  app/opengraph-image.png");
  console.log("  app/twitter-image.png");
  console.log("  app/icon.png");
  console.log("  app/apple-icon.png");
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
