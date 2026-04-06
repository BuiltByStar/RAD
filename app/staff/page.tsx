import { PageShell } from "@/components/page-shell";
import { PeopleGrid, SectionHeading } from "@/components/sections";
import { staff } from "@/lib/site-data";

export default function StaffPage() {
  return (
    <PageShell
      eyebrow="Rad House"
      title="The foundation."
      description="The operations, leadership, and management layer that keeps RAD's competitive engine running at the highest level."
      background="black"
      heroType="staff"
      heroImage="/assets/RadPlayerBannerPNG8.png"
    >
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Operations"
            title="The people behind the org."
            description="Creative, operational, and competitive support roles across RAD."
          />
          <PeopleGrid people={staff} variant="staff" />
        </div>
      </section>
    </PageShell>
  );
}
