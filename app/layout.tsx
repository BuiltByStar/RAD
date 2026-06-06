import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";

import { CustomCursor } from "@/components/custom-cursor";
import { RadShellAmbient } from "@/components/rad-shell-ambient";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteIntro } from "@/components/site-intro";
import { BRAND_INTRO_BLOCKING_SCRIPT } from "@/lib/brand-intro";
import { getPublicSiteUrl } from "@/lib/env";
import { RAD_OG_IMAGE, RAD_TWITTER_IMAGE } from "@/lib/social-metadata";

import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display"
});

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export const metadata: Metadata = {
  metadataBase: new URL(getPublicSiteUrl()),
  title: {
    default: "RAD Esports",
    template: "%s — RAD Esports"
  },
  description:
    "RAD Esports — competitive Marvel Rivals roster, content, and community. World and EMEA champions since 2023.",
  applicationName: "RAD Esports",
  keywords: ["RAD Esports", "Marvel Rivals", "esports", "RAD", "competitive gaming", "Marvel Rivals roster"],
  openGraph: {
    type: "website",
    siteName: "RAD Esports",
    title: "RAD Esports",
    description: "Built around players. Remembered through history. Welcome to the wild.",
    locale: "en_US",
    url: "/",
    images: RAD_OG_IMAGE
  },
  twitter: {
    card: "summary_large_image",
    title: "RAD Esports",
    description: "Built around players. Remembered through history.",
    site: "@RADesport",
    creator: "@RADesport",
    images: RAD_TWITTER_IMAGE
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BRAND_INTRO_BLOCKING_SCRIPT }} />
      </head>
      <body className="bg-black font-[family-name:var(--font-body)] text-white antialiased selection:bg-[color:var(--color-blood)]/35">
        <SiteIntro />
        <div className="rad-site-chrome">
          <RadShellAmbient />
          <CustomCursor />
          <SiteHeader />
          <div className="relative min-h-screen pt-14 sm:pt-16">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
