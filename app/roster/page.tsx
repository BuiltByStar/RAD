import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { RosterRevolver } from "@/components/roster/roster-revolver";
import {
  Container,
  Chip,
  ChipRow,
  Section,
  SectionHeading
} from "@/components/ui";
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
      title="The lineup."
      description="World and EMEA champions. Player cards, roles, socials, and the competitive core behind RAD."
      heroImage="/assets/rad-bg-red.png"
      status={team.status}
    >
      <Section padding="sm">
        <Container>
          <SectionHeading
            eyebrow={team.name}
            title="Player Cards"
            description="Swipe, drag, or use the arrows to switch through the lineup."
            compact
          />
          <RosterRevolver players={teamRoster} />
        </Container>
      </Section>

      <Section padding="sm" className="bg-white/[.01]">
        <Container>
          <SectionHeading eyebrow="Quick Select" title="Lineup Index" compact />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {teamRoster.map((player) => (
              <article
                key={player.slug}
                className="group rounded-[1.45rem] border border-white/10 bg-black/30 p-4 shadow-[0_18px_60px_-52px_rgba(0,0,0,0.95)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[color:var(--color-rad)]/40 hover:bg-white/[0.055]"
              >
                <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white">
                  {player.name}
                </p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/44">
                  {player.role}
                </p>
                <ChipRow>
                  {(player.specialties ?? []).slice(0, 2).map((specialty) => (
                    <Chip key={specialty}>{specialty}</Chip>
                  ))}
                </ChipRow>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
