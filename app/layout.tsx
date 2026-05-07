import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";

import { AmbientBackground } from "@/components/ambient-background";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublicSiteUrl } from "@/lib/env";

import "./globals.css";
import "./cinematic.css";

const localFontVars: CSSProperties = {
  "--font-body": "\"Segoe UI\", Inter, Arial, sans-serif",
  "--font-display":
    "\"Arial Narrow\", \"Franklin Gothic Medium Cond\", Bahnschrift, Impact, Haettenschweiler, sans-serif"
} as CSSProperties;

export const viewport: Viewport = {
  themeColor: "#050505",
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
    "RAD Esports is a competitive org focused on roster, content, merch, and future growth.",
  openGraph: {
    title: "RAD Esports",
    description:
      "A competitive esports brand focused on roster, content, merch, and future growth.",
    images: ["/assets/RadPlayerBannerPNG8.png"],
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

        <div className="subpage-wrapper relative min-h-screen pt-16 sm:pt-[4.5rem] lg:pt-20">
          <div className="relative z-10">{children}</div>
        </div>

        <SiteFooter />
      </body>
    </html>
  );
}
