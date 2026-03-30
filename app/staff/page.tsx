import { PageShell } from "@/components/page-shell";
import { PeopleGrid, SectionHeading } from "@/components/sections";
import { staff } from "@/lib/site-data";

export default function StaffPage() {
  return (
    <PageShell
      eyebrow="Staff"
      title="Staff & Support."
      description="The people behind RAD's brand, ops, and competitive structure."
      background="black"
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
