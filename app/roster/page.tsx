import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { PersonGrid, SectionHeading, TeamSpotlight } from "@/components/sections";
import { players, staff, teams } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Roster",
  description: "RAD's current competitive core, active lineup, and support staff."
};

export default function RosterPage() {
  const featuredTeam = teams[0];
  const competitiveStaff = staff.filter((member) => member.group === "Competitive" || member.role.includes("Coach"));

  return (
    <PageShell
      eyebrow="Roster"
      title="The current competitive core."
      description="RAD's active lineup is presented as a featured division inside a broader org framework, so the page works now and still scales when new titles arrive."
      heroImage="/assets/RadPlayerBannerPNG8.png"
      heroNote={
        <div className="rad-note-card">
          <p className="rad-kicker">Current flagship</p>
          <p className="rad-copy">
            Marvel Rivals is the live competitive focus today. The structure around it is already built for expansion, content, and operations.
          </p>
        </div>
      }
    >
      <section className="rad-section">
        <div className="container">
          <TeamSpotlight team={featuredTeam} />
        </div>
      </section>

      <section className="rad-section rad-section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Players"
            title="Seven players. One championship-standard lineup."
            description="Each card is structured to support richer profile data later without needing a redesign."
          />
          <PersonGrid people={players} mode="player" />
        </div>
      </section>

      <section className="rad-section">
        <div className="container">
          <SectionHeading
            eyebrow="Competitive Support"
            title="Coaching, management, and analytical support."
            description="The roster page includes the staff closest to match-day operations so the competitive story reads as a full system, not just a list of player handles."
            actionHref="/staff"
            actionLabel="Open full staff page"
          />
          <PersonGrid people={competitiveStaff} mode="staff" />
        </div>
      </section>
    </PageShell>
  );
}
