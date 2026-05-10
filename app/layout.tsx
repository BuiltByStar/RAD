import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";

import { AmbientBackground } from "@/components/ambient-background";
import { KeepScrolling } from "@/components/keep-scrolling";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { assets } from "@/lib/assets";
import { getPublicSiteUrl } from "@/lib/env";

import "./globals.css";
import "./cinematic.css";

const localFontVars: CSSProperties = {
  "--font-body": "\"Segoe UI\", Inter, Arial, sans-serif",
  "--font-display":
    "\"Arial Narrow\", \"Franklin Gothic Medium Cond\", Bahnschrift, Impact, Haettenschweiler, sans-serif"
} as CSSProperties;

export const viewport: Viewport = {
  themeColor: "#340106",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export const metadata: Metadata = {
  metadataBase: new URL(getPublicSiteUrl()),
  title: {
    default: "RAD Esports - Competitive Esports",
    template: "%s | RAD Esports"
  },
  description:
    "RAD Esports is built around players, remembered through history, and ready for the next stage of competition.",
  openGraph: {
    title: "RAD Esports",
    description:
      "Built around players. Remembered through history. Welcome to the wild.",
    images: [assets.bgRed],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@RADesport",
    creator: "@RADesport"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className="bg-black text-white selection:bg-[color:var(--color-rad)]/30 antialiased"
        style={localFontVars}
      >
        <AmbientBackground />
        <SiteHeader />
        <KeepScrolling />

        <div className="subpage-wrapper relative min-h-screen pt-16 sm:pt-[4.5rem] lg:pt-20">
          <div className="relative z-10">{children}</div>
        </div>

        <SiteFooter />
      </body>
    </html>
  );
}
