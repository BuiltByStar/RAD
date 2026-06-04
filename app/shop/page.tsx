import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { ShopPageClient } from "@/components/shop/shop-page-client";
import { PageRail } from "@/components/ui";
import { merchItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Shop | RAD Esports",
  description:
    "Official RAD Esports merch — team jerseys, hoodies, sweatshirts, and tees. Browse the full lineup and check out securely on Emerge Apparel.",
  openGraph: {
    title: "Shop | RAD Esports",
    description: "Official RAD Esports merch — jerseys, hoodies, and tees, shipped from Emerge Apparel.",
    type: "website"
  }
};

export default function ShopPage() {
  return (
    <PageShell variant="merch" hideHero eyebrow="Merch" title="Shop" route="/shop">
      <PageRail className="pb-14 sm:pb-16">
        <ShopPageClient items={merchItems} />
      </PageRail>
    </PageShell>
  );
}
