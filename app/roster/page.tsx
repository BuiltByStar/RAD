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
      <Section padding="sm" className="overflow-hidden bg-[#050102]">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_56%_at_50%_6%,rgba(220,20,60,0.22),transparent_64%),linear-gradient(180deg,rgba(67,4,12,0.18),rgba(5,1,2,0.92)_48%,rgba(5,1,2,1))]" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#dc143c]/45 to-transparent" />
        <Container className="relative z-10">
          <SectionHeading
            eyebrow={team.name}
            title="Player Cards"
            description="Swipe, drag, or use the arrows to move through the competitive core."
            compact
            className="max-w-3xl"
          />
          <RosterRevolver players={teamRoster} />
        </Container>
      </Section>

      <Section padding="sm" className="overflow-hidden bg-[#050102] pt-0">
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(220,20,60,0.06),transparent_36%),radial-gradient(58%_46%_at_50%_0%,rgba(220,20,60,0.13),transparent_70%)]" />
        <Container className="relative z-10">
          <SectionHeading
            eyebrow="Quick Select"
            title="Lineup Index"
            description="Jump points for the same roster stage above."
            compact
            className="max-w-3xl"
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {teamRoster.map((player, index) => (
              <article
                key={player.slug}
                id={player.slug}
                className="group roster-index-card relative min-h-[168px] overflow-hidden rounded-[1.15rem] border border-[#dc143c]/14 bg-[linear-gradient(145deg,rgba(220,20,60,0.08),rgba(255,255,255,0.03)_34%,rgba(0,0,0,0.48))] p-4 shadow-[0_18px_70px_-62px_rgba(220,20,60,0.52)] backdrop-blur-xl transition duration-500 hover:-translate-y-1.5 hover:border-[#ff3057]/55 hover:bg-white/[0.06] hover:shadow-[0_0_0_1px_rgba(255,48,87,0.18),0_26px_90px_-42px_rgba(220,20,60,0.86)]"
              >
                <span
                  aria-hidden
                  className="absolute right-3 top-3 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-none text-white/[0.05] transition duration-500 group-hover:text-[#dc143c]/22"
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
        </Container>
      </Section>
    </PageShell>
  );
}
