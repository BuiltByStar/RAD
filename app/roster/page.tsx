import { PageShell } from "@/components/page-shell";
import { PeopleGrid, SectionHeading } from "@/components/sections";
import { players } from "@/lib/site-data";

export default function RosterPage() {
  return (
    <PageShell
      eyebrow="Roster"
      title="Player cards designed to feel complete before final media arrives."
      description="The roster experience uses branded placeholder treatments now and is ready for future portraits and full player data later."
      background="red"
    >
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Lineup"
            title="Featured talent and flexible placeholders."
            description="This layout supports missing portraits, updated handles, new signings, and refreshed competitive copy without breaking the visual rhythm."
          />
          <PeopleGrid people={players} />
        </div>
      </section>
    </PageShell>
  );
}
