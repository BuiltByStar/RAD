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
      eyebrow="Team"
      title="The lineup"
      description={team.description}
      heroImage="/assets/rad-bg-red.png"
      status={team.status}
    >
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection>
          <header className="grid gap-4 border-b border-neutral-900 pb-6 md:grid-cols-[1fr_auto] md:items-end md:gap-8 md:pb-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-blood)]">
                {team.game}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase tracking-normal text-white md:text-3xl">
                Competitive roster
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-500">
                {teamRoster.length} players on the active Marvel Rivals squad. Drag the deck or use the
                arrows to move through profiles.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-px border border-neutral-900 bg-neutral-900 text-center sm:min-w-[14rem]">
              <div className="bg-black px-4 py-3">
                <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Players</dt>
                <dd className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">
                  {String(teamRoster.length).padStart(2, "0")}
                </dd>
              </div>
              <div className="bg-black px-4 py-3">
                <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Title</dt>
                <dd className="mt-1 text-[10px] font-bold uppercase leading-snug tracking-[0.12em] text-[var(--color-blood)]">
                  World
                </dd>
              </div>
            </dl>
          </header>

          <div className="pt-6 md:pt-8">
            <RosterRevolver players={teamRoster} />
          </div>
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
