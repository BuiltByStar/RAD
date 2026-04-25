import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardBody,
  CardEyebrow,
  CardGrid,
  CardMetric,
  CardTitle,
  Container,
  Chip,
  ChipRow,
  NoteStack,
  PlayerCard,
  Section,
  SectionHeading
} from "@/components/ui";
import { players, staff, teams } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Roster",
  description: "The current competitive core, roster depth, and support structure behind RAD."
};

export default function RosterPage() {
  const team = teams[0];
  const teamRoster = players.filter((player) => player.group === team.name);
  const supportStaff = staff.filter(
    (member) => member.group === "Competitive" || member.group === "Operations"
  );
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
      description="The roster page is built around the people first: PFP-ready player profiles, clear roles, and enough context to understand what each name brings to RAD."
      heroImage="/assets/RadPlayerBannerPNG8.png"
      status={team.status}
      note={
        <NoteStack
          items={[
            { label: "Player Profiles", value: "PFP-ready" },
            { label: "Featured Division", value: team.name }
          ]}
        />
      }
    >
      <Section padding="sm">
        <Container>
          <SectionHeading
            eyebrow="Active Lineup"
            title="Seven player profiles. One competitive identity."
            description="Profile images can be added per player later through the same data field without rebuilding the page. Until then, each card uses a branded RAD PFP treatment with initials."
          />

          <CardGrid cols={3}>
            <Card tone="metric">
              <CardMetric>{String(teamRoster.length).padStart(2, "0")}</CardMetric>
              <CardEyebrow className="mt-2">Active Players</CardEyebrow>
            </Card>
            <Card tone="metric">
              <CardMetric>01</CardMetric>
              <CardEyebrow className="mt-2">World Title</CardEyebrow>
            </Card>
            <Card tone="metric">
              <CardMetric>01</CardMetric>
              <CardEyebrow className="mt-2">Regional Title</CardEyebrow>
            </Card>
          </CardGrid>
        </Container>
      </Section>

      <Section padding="sm" className="bg-white/[.015]">
        <Container>
          <SectionHeading
            eyebrow="Players"
            title="Profiles built for the players."
            description="Each card leads with the player image area, then role, identity, socials, and strengths. This keeps the page focused on the people who make up the roster."
          />

          <CardGrid cols={3} className="gap-5 lg:gap-6">
            {teamRoster.map((player) => (
              <PlayerCard
                key={player.slug}
                id={player.slug}
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
          </CardGrid>
        </Container>
      </Section>

      <Section padding="sm">
        <Container>
          <SectionHeading
            eyebrow="Role Map"
            title="How the lineup is shaped."
            description="A simple role breakdown gives the roster structure without pulling attention away from the player profiles."
          />

          <CardGrid cols={3}>
            {roleGroups.map((group) => (
              <Card key={group.label} tone="lead">
                <CardEyebrow>{group.players.length} Players</CardEyebrow>
                <CardTitle size="sm">{group.label}</CardTitle>
                <CardBody>{group.description}</CardBody>
                <ChipRow>
                  {group.players.map((player) => (
                    <Chip key={player.slug}>{player.name}</Chip>
                  ))}
                </ChipRow>
              </Card>
            ))}
          </CardGrid>
        </Container>
      </Section>

      <Section padding="sm" className="bg-white/[.015]">
        <Container>
          <div className="grid gap-5 rounded-xl border border-white/10 bg-black/30 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <CardEyebrow>Competitive Staff</CardEyebrow>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[0.95] tracking-normal text-white">
                Support stays connected, not louder than the players.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
                Coaching and operations still matter, but this page now keeps them as a supporting handoff so the roster remains player-focused.
              </p>
            </div>
            <div className="grid gap-3 sm:min-w-[280px]">
              {supportStaff.slice(0, 3).map((member) => (
                <div
                  key={member.slug}
                  className="rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3"
                >
                  <p className="font-semibold text-white">{member.name}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--color-rad-hi)]/80">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
