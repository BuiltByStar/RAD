import { PageShell } from "@/components/page-shell";
import { SectionHeading, TeamGrid } from "@/components/sections";
import { teams } from "@/lib/site-data";

export default function TeamsPage() {
  return (
    <PageShell
      eyebrow="Teams"
      title="Current divisions and future-ready slots."
      description="RAD's team layer is built to stay coherent while competitive titles and lineups evolve."
      background="black"
    >
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Divisions"
            title="Organized for expansion."
            description="Game cards carry the identity now, while future roster specifics can be added later without changing the page model."
          />
          <TeamGrid teams={teams} />
        </div>
      </section>
    </PageShell>
  );
}
