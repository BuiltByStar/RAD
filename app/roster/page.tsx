import type { Metadata } from "next";
import Image from "next/image";

import { PageShell } from "@/components/page-shell";
import { RosterRevolver } from "@/components/roster/roster-revolver";
import {
  Card,
  CardBody,
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
      description="Current lineup, player cards, and role breakdown."
      heroImage="/assets/RadPlayerBannerPNG8.png"
      status={team.status}
    >
      <Section padding="sm" className="bg-[var(--bg-alt)]">
        <Container>
          <SectionHeading eyebrow="Lineup" title="Current Team" description="Seven players across vanguard, duelist, and strategist roles." compact />
          <div className="grid gap-5 xl:grid-cols-[1.15fr_1fr]">
            <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-white">
              <Image
                src="/assets/RadPlayerBannerPNG8.png"
                alt="RAD roster banner"
                width={1600}
                height={900}
                priority
                className="h-full w-full object-cover opacity-80"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,250,0.1)_0%,rgba(21,31,33,0.62)_100%)]"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/52">
                  Featured division
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,4rem)] font-extrabold uppercase leading-[0.86] text-white">
                  {team.name}
                </h3>
                <p className="mt-4 max-w-xl text-sm text-white/66 sm:text-base">
                  The current lineup is built around role discipline, fast adaptation, and composure under pressure.
                </p>
              </div>
            </div>

            <Card tone="lead">
              <CardEyebrow>Competitive profile</CardEyebrow>
              <CardTitle size="sm">World + EMEA champions</CardTitle>
              <CardBody className="mt-3">
                RAD competes with a compact, high-clarity system: durable frontline, sharp mid-fight execution,
                and strong support coordination.
              </CardBody>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-md border border-[var(--border)] bg-[var(--bg-alt)] p-3 text-center">
                  <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-none text-[var(--text)]">07</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Players</p>
                </div>
                <div className="rounded-md border border-[var(--border)] bg-[var(--bg-alt)] p-3 text-center">
                  <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-none text-[var(--text)]">01</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">World</p>
                </div>
                <div className="rounded-md border border-[var(--border)] bg-[var(--bg-alt)] p-3 text-center">
                  <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-none text-[var(--text)]">01</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">EMEA</p>
                </div>
              </div>
              <div className="mt-6">
                <ChipRow>
                  {["Structure", "Execution", "Pressure", "Comms"].map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </ChipRow>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section padding="sm">
        <Container>
          <SectionHeading eyebrow="Players" title="Current Roster" compact />
          <RosterRevolver players={teamRoster} />
        </Container>
      </Section>

      <Section padding="sm" className="bg-[var(--bg-alt)]">
        <Container>
          <SectionHeading eyebrow="Roles" title="Role Breakdown" compact />

          <div className="grid gap-3 lg:grid-cols-3">
            {roleGroups.map((group) => (
              <Card key={group.label} tone="compact">
                <CardEyebrow>{String(group.players.length).padStart(2, "0")}</CardEyebrow>
                <CardTitle size="sm">{group.label}</CardTitle>
                <CardBody className="mt-2">{group.description}</CardBody>
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
