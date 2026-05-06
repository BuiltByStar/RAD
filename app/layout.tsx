import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";

import { ScrollRevealInit } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublicSiteUrl } from "@/lib/env";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap"
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: "#fcfcfc",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export const metadata: Metadata = {
  metadataBase: new URL(getPublicSiteUrl()),
  title: {
    default: "RAD Esports — The Wild Ones",
    template: "%s | RAD Esports"
  },
  description:
    "RAD Esports is a competitive org built for pressure, content, and the next stage of competition. #GoWild",
  openGraph: {
    title: "RAD Esports",
    description:
      "A competitive esports brand built for pressure, content, and future growth.",
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
        className={`${inter.variable} ${outfit.variable} bg-[var(--bg)] text-[var(--text)] antialiased selection:bg-[color:var(--color-rad)]/20`}
      >
        <ScrollRevealInit />
        <SiteHeader />

        <div className="subpage-wrapper relative min-h-screen pt-16 sm:pt-[4.5rem]">
          <div className="relative z-10">{children}</div>
        </div>

        <SiteFooter />
      </body>
    </html>
  );
}
