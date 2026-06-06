import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { RosterRevolver } from "@/components/roster/roster-revolver";
import { PageRail, PageRailSection } from "@/components/ui";
import { getManagedRosterState } from "@/lib/roster-data.server";
import { teams } from "@/lib/site-data";
import { RAD_OG_IMAGE, RAD_TWITTER_IMAGE } from "@/lib/social-metadata";

export const metadata: Metadata = {
  title: "Team",
  description: "The competitive Marvel Rivals roster of RAD Esports — player profiles, lineup, and championship history.",
  openGraph: {
    type: "website",
    siteName: "RAD Esports",
    title: "Team — RAD Esports",
    description: "The competitive Marvel Rivals roster of RAD Esports.",
    images: RAD_OG_IMAGE
  },
  twitter: {
    card: "summary_large_image",
    title: "Team — RAD Esports",
    description: "The competitive Marvel Rivals roster of RAD Esports.",
    images: RAD_TWITTER_IMAGE
  }
};

export const dynamic = "force-dynamic";

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
