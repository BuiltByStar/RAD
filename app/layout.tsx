import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";

import { ScrollRevealInit } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { IntroAnimation } from "@/components/intro-animation";
import { getPublicSiteUrl } from "@/lib/env";

import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(getPublicSiteUrl()),
  title: {
    default: "RAD Esports",
    template: "%s | RAD Esports"
  },
  description:
    "RAD Esports is a prestige-driven esports org built for competitive growth, content, and community.",
  openGraph: {
    title: "RAD Esports",
    description:
      "Competitive divisions, roster depth, premium content, and a flexible brand system ready to scale.",
    images: ["/assets/RadRivals_Wallpaper_Red.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${barlowCondensed.variable}`}>
        <div className="site-background" />
        <div className="noise-overlay" />
        <IntroAnimation />
        <ScrollRevealInit />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
