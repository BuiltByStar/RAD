import { PageShell } from "@/components/page-shell";
import { SectionHeading, TeamGrid } from "@/components/sections";
import { teams } from "@/lib/site-data";

export default function TeamsPage() {
  return (
    <PageShell
      eyebrow="Teams"
      title="Competitive Division."
      description="RAD's active title and current championship focus."
      background="black"
    >
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Divisions"
            title="Current title."
            description="Marvel Rivals leads the org right now, with room for future expansion."
          />
          <TeamGrid teams={teams} />
        </div>
      </section>
    </PageShell>
  );
}
