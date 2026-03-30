import { PageShell } from "@/components/page-shell";
import { PeopleGrid, SectionHeading } from "@/components/sections";
import { players } from "@/lib/site-data";

export default function RosterPage() {
  return (
    <PageShell
      eyebrow="Roster"
      title="Marvel Rivals Roster."
      description="The current lineup, roles, and active sub."
      background="red"
    >
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Lineup"
            title="Seven-player lineup."
            description="Current championship roster with role, socials, and team context."
          />
          <PeopleGrid people={players} />
        </div>
      </section>
    </PageShell>
  );
}
