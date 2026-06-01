import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";

import { CustomCursor } from "@/components/custom-cursor";
import { LayoutShell } from "@/components/layout-shell";
import { RadShellAmbient } from "@/components/rad-shell-ambient";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { assets } from "@/lib/assets";
import { getPublicSiteUrl } from "@/lib/env";

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
    template: "%s | RAD Esports"
  },
  description:
    "The home of champions — RAD Esports competes in Marvel Rivals with world and EMEA titles.",
  openGraph: {
    title: "RAD Esports",
    description: "Built around players. Remembered through history. Welcome to the wild.",
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
    <html lang="en" data-scroll-behavior="smooth" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="bg-black font-[family-name:var(--font-body)] text-white antialiased selection:bg-[color:var(--color-blood)]/35">
        <RadShellAmbient />
        <CustomCursor />
        <LayoutShell>
          <SiteHeader />
          <div className="relative min-h-screen pt-14 sm:pt-16">{children}</div>
          <SiteFooter />
        </LayoutShell>
      </body>
    </html>
  );
}
