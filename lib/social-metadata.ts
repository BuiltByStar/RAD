import type { Metadata } from "next";

/**
 * Canonical RAD Esports social-embed image references.
 *
 * Files live at `app/opengraph-image.png` and `app/twitter-image.png` via the
 * Next.js Metadata file convention. The root layout's metadata picks them up
 * automatically, but pages that override `openGraph` or `twitter` replace the
 * inherited block entirely (Next.js does not deep-merge those fields), so the
 * image references have to be reapplied.
 *
 * Reference these constants from any per-page metadata that overrides
 * `openGraph` or `twitter` to keep the unfurl preview consistent.
 */

export const RAD_OG_IMAGE: NonNullable<NonNullable<Metadata["openGraph"]>["images"]> = [
  {
    url: "/opengraph-image.png",
    width: 1200,
    height: 630,
    alt: "RAD Esports"
  }
];

export const RAD_TWITTER_IMAGE: NonNullable<NonNullable<Metadata["twitter"]>["images"]> = [
  "/twitter-image.png"
];
