import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublicSiteUrl } from "@/lib/env";

import "./globals.css";

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
      <body>
        <div className="site-background" />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
