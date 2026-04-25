import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardEyebrow,
  CardTitle,
  Container,
  Chip,
  ChipRow,
  PlayerCard,
  Section,
  SectionHeading
} from "@/components/ui";
import { players, teams } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Roster",
  description: "RAD player profiles and competitive lineup."
};

export default function RosterPage() {
  const team = teams[0];
  const teamRoster = players.filter((player) => player.group === team.name);
  const roleGroups = [
    {
      label: "Vanguard",
      description: "Space makers and frontline pressure.",
      players: teamRoster.filter((player) => player.role.toLowerCase().includes("vanguard"))
    },
    {
      label: "Duelist",
      description: "Damage, picks, and flexible hero pools.",
      players: teamRoster.filter((player) => player.role.toLowerCase().includes("duelist"))
    },
    {
      label: "Strategist",
      description: "Tempo control, healing, and late-fight calls.",
      players: teamRoster.filter((player) => player.role.toLowerCase().includes("strategist"))
    }
  ];

  return (
    <PageShell
      variant="roster"
      eyebrow="Roster"
      title="Meet the players."
      description="A player-first look at the current RAD lineup, built for profile images now and upgraded portraits later."
      heroImage="/assets/RadPlayerBannerPNG8.png"
      status={team.status}
    >
      <Section padding="xs" className="bg-white/[.015]">
        <Container>
          <SectionHeading
            eyebrow="Players"
            title="Profiles built around PFPs."
            compact
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {teamRoster.map((player) => (
              <PlayerCard
                key={player.slug}
                id={player.slug}
                className={player.featured ? "xl:col-span-2" : undefined}
                name={player.name}
                role={player.role}
                image={player.image}
                number={typeof player.number === "number" ? player.number : undefined}
                descriptor={player.descriptor}
                bio={player.bio ?? player.descriptor}
                specialties={player.specialties}
                socials={player.socials}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section padding="xs">
        <Container>
          <SectionHeading
            eyebrow="Role Map"
            title="Lineup shape."
            compact
          />

          <div className="grid gap-3 lg:grid-cols-3">
            {roleGroups.map((group) => (
              <Card key={group.label} tone="compact" className="role-rail-card">
                <CardEyebrow>{String(group.players.length).padStart(2, "0")}</CardEyebrow>
                <CardTitle size="sm">{group.label}</CardTitle>
                <ChipRow>
                  {group.players.map((player) => (
                    <Chip key={player.slug}>{player.name}</Chip>
                  ))}
                </ChipRow>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
