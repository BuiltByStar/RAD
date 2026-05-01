import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardBody,
  CardEyebrow,
  CardGrid,
  CardTitle,
  Container,
  NoteStack,
  Section,
  SectionHeading,
  Timeline,
  TimelineItem
} from "@/components/ui";
import { igniteSchedule } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "Identity, milestones, and the operating standard behind RAD Esports."
};

const standards = [
  {
    title: "Competition first",
    description: "Build around performance, preparation, and players who can handle pressure."
  },
  {
    title: "Raw energy",
    description: "Keep the brand sharp, loud, and recognisable without dressing it up too much."
  },
  {
    title: "Community",
    description: "Treat fans as part of the story, not a number attached to it."
  },
  {
    title: "Built to scale",
    description: "Make systems that can support new titles, partners, and content without starting over."
  }
];

const milestones = [
  {
    date: "Sept 2023",
    title: "RAD Founded",
    description: "The org launches with a competitive-first direction."
  },
  {
    date: "Dec 2024",
    title: "Marvel Rivals",
    description: "RAD enters the scene with a roster built around pressure and pace."
  },
  {
    date: "Aug 2025",
    title: "World Champions",
    description: "RAD wins the inaugural Marvel Rivals Ignite: Mid-Season title."
  },
  {
    date: "March 2026",
    title: "EMEA Champions",
    description: "The team adds a regional title and proves the system can repeat."
  },
  {
    date: "2026",
    title: "Next Stage",
    description: "RAD starts building the structure for content, activations, and growth."
  }
];

export default function AboutPage() {
  return (
    <PageShell
      variant="about"
      eyebrow="About RAD"
      title="Built for pressure."
      description="RAD is a competitive esports org with real results, a sharp identity, and room to grow without losing its edge."
      heroImage="/assets/RadBannerNewTest300ppi.png"
      status="World title // EMEA title"
      note={
        <NoteStack
          items={[
            { label: "Division", value: "Marvel Rivals" },
            { label: "Region", value: "EMEA / Global" }
          ]}
        />
      }
    >
      <Section padding="sm">
        <Container>
          <SectionHeading
            eyebrow="Identity"
            title="Who RAD is."
          />

          <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
            <Card tone="lead" spotlight>
              <CardBody className="mt-0 text-base leading-relaxed text-white/75 sm:text-lg">
                RAD has been turning heads since 2023. The org became the inaugural Marvel Rivals Ignite: Mid-Season World Champions and later secured the Season 6 EMEA PC title. The goal now is simple: keep winning, keep building, and keep the identity unmistakably RAD.
              </CardBody>
            </Card>

            <div className="grid gap-4 sm:gap-5">
              <Card spotlight>
                <CardEyebrow>Proof</CardEyebrow>
                <CardTitle size="sm">Titles back the brand.</CardTitle>
                <CardBody>
                  The site does not need to oversell the org. The results already give the identity weight.
                </CardBody>
              </Card>
              <Card spotlight>
                <CardEyebrow>Direction</CardEyebrow>
                <CardTitle size="sm">Ready for more.</CardTitle>
                <CardBody>
                  RAD should feel consistent across rosters, content, activations, and whatever division comes next.
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="sm" className="bg-white/[.015]">
        <Container>
          <SectionHeading
            eyebrow="Standards"
            title="How RAD operates."
          />

          <CardGrid cols={4}>
            {standards.map((value) => (
              <Card key={value.title} spotlight>
                <CardTitle size="sm">{value.title}</CardTitle>
                <CardBody>{value.description}</CardBody>
              </Card>
            ))}
          </CardGrid>
        </Container>
      </Section>

      <Section padding="sm">
        <Container>
          <SectionHeading
            eyebrow="Proof"
            title="Milestones."
          />

          <Timeline>
            {milestones.map((event) => (
              <TimelineItem
                key={`${event.date}-${event.title}`}
                date={event.date}
                title={event.title}
                description={event.description}
              />
            ))}
          </Timeline>
        </Container>
      </Section>

      <Section padding="sm" className="bg-white/[.015]">
        <Container>
          <SectionHeading
            eyebrow="Next"
            title="What comes next."
          />

          <CardGrid cols={3}>
            {igniteSchedule.map((item, index) => (
              <Card key={`${item.stage}-${item.dates}`} tone="compact" spotlight>
                <CardEyebrow>Stage {String(index + 1).padStart(2, "0")}</CardEyebrow>
                <CardTitle size="sm">{item.stage}</CardTitle>
                <CardBody>{item.dates}</CardBody>
              </Card>
            ))}
          </CardGrid>
        </Container>
      </Section>
    </PageShell>
  );
}
