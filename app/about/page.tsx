import type { Metadata } from "next";

import { MilestoneWheel, type WheelMilestone } from "@/components/about/milestone-wheel";
import { PageShell } from "@/components/page-shell";
import { Card, CardBody, PageRail, PageRailSection } from "@/components/ui";
import { igniteSchedule } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "Identity, milestones, and the operating standard behind RAD Esports."
};

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
      compact
      eyebrow="About"
      title="About RAD"
      description="Competitive esports org — Marvel Rivals world and EMEA champions."
    >
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection className="py-8 md:py-10">
          <Card tone="lead" accent={false} className="border border-neutral-900 bg-black">
            <CardBody className="mt-0 text-base leading-relaxed text-neutral-400 sm:text-lg">
              RAD has been turning heads since 2023. The org became the inaugural Marvel Rivals Ignite:
              Mid-Season World Champions and later secured the Season 6 EMEA PC title.
            </CardBody>
          </Card>
        </PageRailSection>

        <PageRailSection borderTop className="py-8 md:py-10">
          <MilestoneWheel items={milestoneWheelItems} />
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
