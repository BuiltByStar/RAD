import type { Metadata } from "next";

import { PartnerWall } from "@/components/partners/partner-wall";
import { PageShell } from "@/components/page-shell";
import { Button, PageRail, PageRailSection } from "@/components/ui";
import { getManagedPartnersState } from "@/lib/partners-data.server";

export const metadata: Metadata = {
  title: "Partners",
  description: "RAD partner wall — logos, tiers, and partnership slots."
};

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const { partners } = await getManagedPartnersState();

  return (
    <PageShell
      variant="partners"
      compact
      eyebrow="Partners"
      title="Partners"
      description="Brand partners and open activation slots."
    >
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection className="py-8 md:py-10">
          <PartnerWall partners={partners} />

          <div className="mt-10 border-t border-neutral-900 pt-8 md:mt-12 md:pt-10">
            <p className="max-w-xl text-sm text-neutral-500">
              Launch-era visibility across competitive content, roster storytelling, and community activations.
            </p>
            <div className="mt-5">
              <Button href="/contact" size="sm">
                Partner with RAD
              </Button>
            </div>
          </div>
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
