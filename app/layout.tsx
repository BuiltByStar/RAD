import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";

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

export const metadata: Metadata = {
  metadataBase: new URL(getPublicSiteUrl()),
  title: {
    default: "RAD Esports",
    template: "%s | RAD Esports"
  },
  description:
    "RAD Esports is a prestige-driven esports org built for competitive growth.",
  openGraph: {
    title: "RAD Esports",
    description: "Multi-title competitive division.",
    images: ["/assets/RadPlayerBannerPNG8.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${barlowCondensed.variable} bg-black text-white selection:bg-red-600/30`}>
        <ScrollRevealInit />
        <SiteHeader />
        
        <div className="subpage-wrapper relative min-h-screen">
          <div className="cinematic-noise" />
          <div className="cinematic-vignette" />
          
          <div className="relative z-10">
            {children}
          </div>
        </div>
        
        <SiteFooter />
      </body>
    </html>
  );
}
