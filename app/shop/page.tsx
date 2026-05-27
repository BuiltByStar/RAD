import type { Metadata } from "next";

import { PageReadySignal } from "@/components/page-ready-signal";
import { ShopPageClient } from "@/components/shop/shop-page-client";
import { merchItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Shop",
  description: "RAD Esports merch storefront with jersey, hoodie, sweatshirt, and tee previews linking to external checkout."
};

export default function ShopPage() {
  return (
    <main className="relative isolate overflow-hidden bg-[#030304]">
      <PageReadySignal route="/shop" delayMs={32} />
      <ShopPageClient items={merchItems} />
    </main>
  );
}
