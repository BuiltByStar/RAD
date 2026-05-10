import type { Metadata } from "next";

import { PageReadySignal } from "@/components/page-ready-signal";
import { ShopPageClient } from "@/components/shop/shop-page-client";
import { merchCollection, merchItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Shop",
  description: "RAD merchandise storefront, featured drops, and future product lanes."
};

export default function ShopPage() {
  return (
    <main className="relative isolate overflow-hidden bg-[#050505]">
      <PageReadySignal route="/shop" delayMs={32} />
      <ShopPageClient items={merchItems} />

      <section className="border-t border-white/10 bg-[#111113] px-6 py-12 text-center sm:px-8 lg:px-12">
        <p className="mx-auto max-w-2xl text-[11px] font-black uppercase tracking-[0.18em] text-white/42">
          {merchCollection.title} / {merchCollection.status}
        </p>
      </section>
    </main>
  );
}
