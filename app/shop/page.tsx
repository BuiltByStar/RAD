import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { ShopPageClient } from "@/components/shop/shop-page-client";
import { PageRail } from "@/components/ui";
import { merchItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Shop",
  description: "RAD Esports merch storefront with jersey, hoodie, sweatshirt, and tee previews linking to external checkout."
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
