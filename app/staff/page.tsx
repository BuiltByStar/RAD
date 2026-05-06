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
  Container,
  Section,
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
      heroImage="/assets/RadBanner1920_1080.png"
      status="Support team"
    >
      <Section padding="sm">
        <Container>
          <SectionHeading eyebrow="Brand & Media" title="Brand Team" />

          <CardGrid cols={3}>
            {brandStaff.map((member) => (
              <Card key={member.slug} spotlight className="min-h-[260px]">
                <CardEyebrow>{member.group}</CardEyebrow>
                <CardTitle size="sm">{member.name}</CardTitle>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--color-rad-hi)]/90">
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
        </Container>
      </Section>

      <Section padding="sm" className="bg-white/[.015]">
        <Container>
          <SectionHeading eyebrow="Operations & Performance" title="Performance Team" description="Management, analytics, and coaching support." />

          <CardGrid cols={3}>
            {operationsStaff.map((member) => (
              <Card key={member.slug} spotlight className="min-h-[260px]">
                <CardEyebrow>{member.group}</CardEyebrow>
                <CardTitle size="sm">{member.name}</CardTitle>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--color-rad-hi)]/90">
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
        </Container>
      </Section>
    </PageShell>
  );
}
