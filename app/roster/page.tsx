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
      <Section
        padding="sm"
        className="overflow-hidden border-y border-[#dc143c]/18 bg-[#050102]"
      >
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(72%_58%_at_50%_0%,rgba(220,20,60,0.24),transparent_62%),linear-gradient(180deg,rgba(67,4,12,0.32),rgba(5,1,2,0.92)_48%,rgba(5,1,2,1))]" />
        <Container className="relative z-10">
          <div className="rounded-[2.4rem] border border-[#dc143c]/28 bg-[linear-gradient(145deg,rgba(220,20,60,0.14),rgba(0,0,0,0.5)_34%,rgba(13,0,3,0.9))] p-3 shadow-[0_36px_140px_-82px_rgba(220,20,60,0.82)] sm:p-5">
            <SectionHeading
              eyebrow={team.name}
              title="Player Cards"
              description="Swipe, drag, or use the arrows to move through the competitive core."
              compact
              className="px-2 pt-2 sm:px-3"
            />
            <RosterRevolver players={teamRoster} />
          </div>
        </Container>
      </Section>

      <Section padding="sm" className="overflow-hidden bg-[#050102] pt-0">
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(220,20,60,0.08),transparent_36%),radial-gradient(58%_46%_at_50%_0%,rgba(220,20,60,0.16),transparent_70%)]" />
        <Container className="relative z-10">
          <div className="rounded-[2rem] border border-[#dc143c]/18 bg-black/40 p-4 shadow-[0_24px_100px_-80px_rgba(220,20,60,0.65)] backdrop-blur-xl sm:p-5">
            <SectionHeading
              eyebrow="Quick Select"
              title="Lineup Index"
              description="Jump points for the same roster stage above."
              compact
            />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {teamRoster.map((player, index) => (
                <article
                  key={player.slug}
                  id={player.slug}
                  className="group relative overflow-hidden rounded-[1.15rem] border border-[#dc143c]/18 bg-[linear-gradient(145deg,rgba(220,20,60,0.12),rgba(255,255,255,0.035)_34%,rgba(0,0,0,0.5))] p-4 shadow-[0_18px_70px_-58px_rgba(220,20,60,0.55)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#dc143c]/42 hover:bg-white/[0.06]"
                >
                  <span
                    aria-hidden
                    className="absolute right-3 top-3 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-none text-white/[0.05] transition group-hover:text-[#dc143c]/20"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="relative max-w-[8ch] font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white">
                    {player.name}
                  </p>
                  <p className="relative mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ff6f88]">
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
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
