import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardBody,
  CardEyebrow,
  CardGrid,
  CardTitle,
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
      compact
      eyebrow="Staff"
      title="Staff"
      description="People behind competition, content, and operations."
    >
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection className="py-8 md:py-10">
          <SectionHeading title="Brand" compact className="mb-6" />
          <CardGrid cols={3}>
            {brandStaff.map((member) => (
              <Card key={member.slug} accent={false}>
                <CardEyebrow>{member.group}</CardEyebrow>
                <CardTitle size="sm">{member.name}</CardTitle>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-blood)]">
                  {member.role}
                </p>
                <CardBody>{member.bio ?? member.descriptor}</CardBody>
              </Card>
            ))}
          </CardGrid>
        </PageRailSection>

        <PageRailSection borderTop className="py-8 md:py-10">
          <SectionHeading title="Operations" compact className="mb-6" />
          <CardGrid cols={3}>
            {operationsStaff.map((member) => (
              <Card key={member.slug} accent={false}>
                <CardEyebrow>{member.group}</CardEyebrow>
                <CardTitle size="sm">{member.name}</CardTitle>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-blood)]">
                  {member.role}
                </p>
                <CardBody>{member.bio ?? member.descriptor}</CardBody>
              </Card>
            ))}
          </CardGrid>
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
