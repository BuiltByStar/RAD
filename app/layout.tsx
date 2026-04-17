import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";

import { AmbientBackground } from "@/components/ambient-background";
import { ScrollRevealInit } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublicSiteUrl } from "@/lib/env";

import "./globals.css";
import "./cinematic.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap"
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap"
});

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
    default: "RAD Esports — Marvel Rivals World & EMEA Champions",
    template: "%s | RAD Esports"
  },
  description:
    "RAD Esports is the inaugural Marvel Rivals Ignite: Mid-Season World Champions and reigning Season 6: EMEA PC title holders. Built for pressure. #GoWild",
  openGraph: {
    title: "RAD Esports",
    description:
      "Marvel Rivals World & EMEA Champions. Untamed, unstoppable, and never by the book.",
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
    <html lang="en">
      <body
        className={`${barlow.variable} ${barlowCondensed.variable} bg-black text-white selection:bg-[color:var(--color-rad)]/30 antialiased`}
      >
        <ScrollRevealInit />
        <AmbientBackground />
        <SiteHeader />

        <div className="subpage-wrapper relative min-h-screen pt-16 sm:pt-18 lg:pt-20">
          <div className="cinematic-noise" />
          <div className="cinematic-vignette" />

          <div className="relative z-10">{children}</div>
        </div>

        <SiteFooter />
      </body>
    </html>
  );
}
