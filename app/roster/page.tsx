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

  return (
    <PageShell
      variant="roster"
      eyebrow="Roster"
      title="The championship core."
      description="RAD's featured lineup is built around role clarity, depth, and the kind of pressure-tested structure that holds up on the biggest stages."
      heroImage="/assets/RadPlayerBannerPNG8.png"
      status={team.status}
      note={
        <NoteStack
          items={[
            { label: "Featured Division", value: team.name },
            { label: "Live Status", value: "Active lineup" }
          ]}
        />
      }
    >
      <Section padding="sm">
        <Container>
          <SectionHeading
            eyebrow="Division Overview"
            title={`${team.name} is the current front line.`}
            description={team.description}
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
            title="Seven names carrying the standard."
            description="Each role in the lineup has a clear job, a distinct identity, and a reason it belongs in the current core."
          />

          <CardGrid cols={3}>
            {teamRoster.map((player) => (
              <PlayerCard
                key={player.slug}
                id={player.slug}
                name={player.name}
                role={player.role}
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
            eyebrow="Support System"
            title="Management and coaching behind the lineup."
            description="The roster is stronger when the support structure is visible too: management, coaching, and the people keeping the standard intact."
            actionHref="/staff"
            actionLabel="Open staff page"
          />

          <CardGrid cols={3}>
            {supportStaff.map((member) => (
              <Card key={member.slug}>
                <CardEyebrow>{member.group}</CardEyebrow>
                <CardTitle size="sm">{member.name}</CardTitle>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--color-rad-hi)]/90">
                  {member.role}
                </p>
                <CardBody>{member.bio ?? member.descriptor}</CardBody>
              </Card>
            ))}
          </CardGrid>
        </Container>
      </Section>
    </PageShell>
  );
}
