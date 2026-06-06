import type { Metadata } from "next";

import { MilestoneWheel, type WheelMilestone } from "@/components/about/milestone-wheel";
import { PageShell } from "@/components/page-shell";
import { PageRail, PageRailSection } from "@/components/ui";
import { igniteSchedule, orgTimeline } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "Identity, milestones, and the operating standard behind RAD Esports."
};

const milestoneWheelItems: WheelMilestone[] = [
  ...orgTimeline.map((item) => ({
    date: item.date,
    title: item.title,
    description: item.description,
    kind: "history" as const
  })),
  ...igniteSchedule.map((item) => ({
    date: item.dates,
    title: item.stage,
    description: `Upcoming season stage — ${item.dates}.`,
    kind: "future" as const
  }))
];

export default function AboutPage() {
  return (
    <PageShell
      variant="about"
      compact
      eyebrow="About"
      title="World & EMEA champions since 2023"
    >
      <PageRail className="pb-14 sm:pb-20">
        <PageRailSection className="py-6 md:py-8">
          <blockquote className="max-w-3xl border-l-2 border-[var(--color-blood)] pl-5 sm:pl-6">
            <p className="font-[family-name:var(--font-display)] text-[clamp(1.35rem,3.2vw,2rem)] font-extrabold uppercase leading-[1.05] tracking-normal text-white">
              Untamed, unstoppable, never by the book.
            </p>
            <footer className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-blood)]">
              #GoWild
            </footer>
          </blockquote>
        </PageRailSection>

        <PageRailSection borderTop className="py-8 md:py-12">
          <MilestoneWheel items={milestoneWheelItems} />
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
