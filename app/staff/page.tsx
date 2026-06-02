import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardBody,
  CardEyebrow,
  CardGrid,
  CardTitle,
  Chip,
  ChipRow,
  PageRail,
  PageRailSection,
  SectionHeading
} from "@/components/ui";
import { staff } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Staff",
  description: "The creative, operational, and competitive support structure behind RAD."
};

export default function StaffPage() {
  const brandStaff = staff.filter((member) => member.group === "Brand");
  const operationsStaff = staff.filter((member) => member.group !== "Brand");

  return (
    <PageShell
      variant="staff"
      eyebrow="Staff"
      title="Staff"
      description="The people behind RAD's competition, content, and day-to-day work."
      heroImage="/assets/rad-brand-board.png"
      status="Support team"
    >
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection>
          <SectionHeading eyebrow="Brand & Media" title="Brand Team" />
          <CardGrid cols={3}>
            {brandStaff.map((member) => (
              <Card key={member.slug} accent={false} className="min-h-[240px]">
                <CardEyebrow>{member.group}</CardEyebrow>
                <CardTitle size="sm">{member.name}</CardTitle>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-blood)]">
                  {member.role}
                </p>
                <CardBody>{member.bio ?? member.descriptor}</CardBody>
                {member.tags?.length ? (
                  <ChipRow>
                    {member.tags.map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </ChipRow>
                ) : null}
              </Card>
            ))}
          </CardGrid>
        </PageRailSection>

        <PageRailSection borderTop>
          <SectionHeading
            eyebrow="Operations & Performance"
            title="Performance Team"
            description="Management, analytics, and coaching support."
          />
          <CardGrid cols={3}>
            {operationsStaff.map((member) => (
              <Card key={member.slug} accent={false} className="min-h-[240px]">
                <CardEyebrow>{member.group}</CardEyebrow>
                <CardTitle size="sm">{member.name}</CardTitle>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-blood)]">
                  {member.role}
                </p>
                <CardBody>{member.bio ?? member.descriptor}</CardBody>
                {member.tags?.length ? (
                  <ChipRow>
                    {member.tags.map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </ChipRow>
                ) : null}
              </Card>
            ))}
          </CardGrid>
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
