import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { RosterRevolver } from "@/components/roster/roster-revolver";
import { PageRail, PageRailSection } from "@/components/ui";
import { players, teams } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Team",
  description: "RAD competitive lineup, player profiles, and championship roster."
};

export default function RosterPage() {
  const team = teams[0];
  const teamRoster = players.filter((player) => player.group === team.name);

  return (
    <PageShell
      variant="roster"
      compact
      eyebrow="Team"
      title={team.game}
      description={team.status}
      headerMeta={
        <>
          <span className="inline-flex border border-neutral-800 bg-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-300">
            {teamRoster.length} players
          </span>
          <span className="inline-flex border border-[var(--color-blood)]/40 bg-[var(--color-blood)]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-blood)]">
            Active roster
          </span>
        </>
      }
    >
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection className="py-8 md:py-10">
          <RosterRevolver players={teamRoster} />
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
