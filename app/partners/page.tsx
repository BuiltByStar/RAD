import { PageShell } from "@/components/page-shell";
import { PartnerGrid, SectionHeading } from "@/components/sections";
import { partners } from "@/lib/site-data";

export default function PartnersPage() {
  return (
    <PageShell
      eyebrow="Partners"
      title="The network."
      description="Collaborating with industry-leading brands and partners who share RAD's vision for the future of competitive gaming."
      background="black"
      heroType="partners"
      heroImage="/assets/SkinTeasePic.png"
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
