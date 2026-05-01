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
      title="The lineup."
      description="A cleaner roster surface built around role clarity, identity, and high-pressure performance."
      heroImage="/assets/RadPlayerBannerPNG8.png"
      status={team.status}
    >
      <Section padding="sm" className="bg-white/[.01]">
        <Container>
          <SectionHeading
            eyebrow="Players"
            title="The current competitive core."
            description="Seven players, each with defined responsibilities across engagement, pressure, utility, and finish."
            compact
          />
          <div className="grid gap-5 xl:grid-cols-[1.15fr_1fr]">
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black">
              <Image
                src="/assets/RadPlayerBannerPNG8.png"
                alt="RAD roster banner"
                width={1600}
                height={900}
                priority
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,8,0.15)_0%,rgba(5,5,8,0.92)_100%)]"
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
                <div className="rounded-md border border-white/10 bg-black/35 p-3 text-center">
                  <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-none text-white">07</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">Players</p>
                </div>
                <div className="rounded-md border border-white/10 bg-black/35 p-3 text-center">
                  <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-none text-white">01</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">World</p>
                </div>
                <div className="rounded-md border border-white/10 bg-black/35 p-3 text-center">
                  <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-none text-white">01</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">EMEA</p>
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
          <SectionHeading
            eyebrow="Player profiles"
            title="Roster revolver."
            compact
          />
          <RosterRevolver players={teamRoster} />
        </Container>
      </Section>

      <Section padding="sm" className="bg-white/[.01]">
        <Container>
          <SectionHeading
            eyebrow="Role Map"
            title="How the lineup is shaped."
            compact
          />

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
