import type { Metadata } from "next";

import { MilestoneWheel, type WheelMilestone } from "@/components/about/milestone-wheel";
import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardBody,
  CardEyebrow,
  CardGrid,
  CardTitle,
  NoteStack,
  PageRail,
  PageRailSection,
  SectionHeading
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

const milestones: WheelMilestone[] = [
  {
    date: "Sept 2023",
    title: "RAD Founded",
    description: "The org launches with a competitive-first direction.",
    kind: "history"
  },
  {
    date: "Dec 2024",
    title: "Competitive roster",
    description: "RAD enters the scene with a roster built around pressure and pace.",
    kind: "history"
  },
  {
    date: "Aug 2025",
    title: "World Champions",
    description: "RAD wins the inaugural Marvel Rivals Ignite: Mid-Season title.",
    kind: "history"
  },
  {
    date: "March 2026",
    title: "EMEA Champions",
    description: "The team adds a regional title and proves the system can repeat.",
    kind: "history"
  },
  {
    date: "2026",
    title: "Next Stage",
    description: "RAD starts building the structure for content, activations, and growth.",
    kind: "history"
  }
];

const milestoneWheelItems: WheelMilestone[] = [
  ...milestones,
  ...igniteSchedule.map((item) => ({
    date: item.dates,
    title: item.stage,
    description: `Upcoming season stage: ${item.dates}.`,
    kind: "future" as const
  }))
];

export default function AboutPage() {
  return (
    <PageShell
      variant="about"
      eyebrow="About RAD"
      title="About RAD"
      description="RAD is a competitive esports org built around strong results, clear identity, and steady growth."
      heroImage="/assets/rad-bg-red.png"
      status="World title // EMEA title"
      note={
        <NoteStack
          items={[
            { label: "Current Division", value: "Marvel Rivals" },
            { label: "Region", value: "EMEA / Global" }
          ]}
        />
      }
    >
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection>
          <SectionHeading eyebrow="Overview" title="Who We Are" />
          <div className="grid gap-px border border-neutral-900 bg-neutral-900 lg:grid-cols-2">
            <Card tone="lead" accent={false} className="border-0 bg-black">
              <CardBody className="mt-0 text-base leading-relaxed text-neutral-400 sm:text-lg">
                RAD has been turning heads since 2023. The org became the inaugural Marvel Rivals Ignite: Mid-Season World Champions and later secured the Season 6 EMEA PC title. The goal now is simple: keep winning, keep building, and keep the identity unmistakably RAD.
              </CardBody>
            </Card>
            <div className="grid gap-px bg-neutral-900 sm:grid-cols-2 lg:grid-cols-1">
              <Card accent={false} className="border-0 bg-black">
                <CardEyebrow>Proof</CardEyebrow>
                <CardTitle size="sm">Results matter.</CardTitle>
                <CardBody>
                  The site does not need to oversell the org. The results already give the identity weight.
                </CardBody>
              </Card>
              <Card accent={false} className="border-0 bg-black">
                <CardEyebrow>Direction</CardEyebrow>
                <CardTitle size="sm">Built to grow.</CardTitle>
                <CardBody>
                  RAD should feel consistent across rosters, content, activations, and whatever division comes next.
                </CardBody>
              </Card>
            </div>
          </div>
        </PageRailSection>

        <PageRailSection borderTop>
          <SectionHeading eyebrow="Standards" title="Standards" />
          <CardGrid cols={4}>
            {standards.map((value) => (
              <Card key={value.title} accent={false}>
                <CardTitle size="sm">{value.title}</CardTitle>
                <CardBody>{value.description}</CardBody>
              </Card>
            ))}
          </CardGrid>
        </PageRailSection>

        <PageRailSection borderTop>
          <SectionHeading eyebrow="Timeline" title="Milestones" />
          <MilestoneWheel items={milestoneWheelItems} />
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
