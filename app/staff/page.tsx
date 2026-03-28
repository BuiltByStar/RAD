import { PageShell } from "@/components/page-shell";
import { PeopleGrid, SectionHeading } from "@/components/sections";
import { staff } from "@/lib/site-data";

export default function StaffPage() {
  return (
    <PageShell
      eyebrow="Staff"
      title="Infrastructure behind the brand, roster, and community."
      description="RAD's staff page makes the org feel real even before the final leadership list and portraits are fully locked."
      background="black"
    >
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Operations"
            title="Support roles that make the org credible."
            description="Competitive staff, creative leadership, and community management give the site more depth than a simple launch page."
          />
          <PeopleGrid people={staff} variant="staff" />
        </div>
      </section>
    </PageShell>
  );
}
