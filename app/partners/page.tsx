import { PageShell } from "@/components/page-shell";
import { PartnerGrid, SectionHeading } from "@/components/sections";
import { partners } from "@/lib/site-data";

export default function PartnersPage() {
  return (
    <PageShell
      eyebrow="Partners"
      title="Partner With RAD."
      description="Brand-ready space for activations, sponsors, and collaborations."
      background="red"
    >
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Sponsorship"
            title="Open for activations."
            description="A clear entry point for campaigns, category sponsors, and brand partnerships."
          />
          <PartnerGrid partners={partners} />
        </div>
      </section>
    </PageShell>
  );
}
