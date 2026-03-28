import { PageShell } from "@/components/page-shell";
import { PartnerGrid, SectionHeading } from "@/components/sections";
import { partners } from "@/lib/site-data";

export default function PartnersPage() {
  return (
    <PageShell
      eyebrow="Partners"
      title="Brand-ready placements built into the system from the start."
      description="RAD's partner layer is ready for launch sponsors now and can expand into deeper activations later without reworking the page structure."
      background="red"
    >
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Sponsorship"
            title="A premium shell for future commercial growth."
            description="The partner page gives category sponsors, apparel partners, and campaign collaborators a clear entry point."
          />
          <PartnerGrid partners={partners} />
        </div>
      </section>
    </PageShell>
  );
}
