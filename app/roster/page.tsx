import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { RosterRevolver } from "@/components/roster/roster-revolver";
import {
  Card,
  CardEyebrow,
  CardTitle,
  Container,
  Chip,
  ChipRow,
  Section,
  SectionHeading
} from "@/components/ui";
import { players, teams } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Roster",
  description: "RAD player lineup, role architecture, and competitive structure."
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
      title="Roster"
      description="Current player lineup, roles, socials, and roster focus."
      heroImage="/assets/RadPlayerBannerPNG8.png"
      status={team.status}
    >
      <Section padding="sm">
        <Container>
          <SectionHeading
            eyebrow={team.name}
            title="Current Roster"
            description="Swipe, drag, or use the arrows to move through player cards."
            compact
          />
          <RosterRevolver players={teamRoster} />
        </Container>
      </Section>

      <Section padding="sm" className="bg-white/[.01]">
        <Container>
          <SectionHeading eyebrow="Roles" title="Lineup Roles" compact />

          <div className="grid gap-3 lg:grid-cols-3">
            {roleGroups.map((group) => (
              <Card key={group.label} tone="compact">
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
