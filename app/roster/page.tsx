import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { RosterRevolver } from "@/components/roster/roster-revolver";
import { PageRail, PageRailSection } from "@/components/ui";
import { getManagedRosterState } from "@/lib/roster-data.server";
import { teams } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Team",
  description: "RAD competitive lineup, player profiles, and championship roster."
};

export default async function RosterPage() {
  const team = teams[0];
  const { players: teamRoster } = await getManagedRosterState(team.name);

  return (
    <PageShell variant="roster" hideHero eyebrow="Team" title="Team">
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection className="py-6 md:py-8">
          <RosterRevolver
            players={teamRoster}
            game={team.game}
            teamStatus={team.status}
          />
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
