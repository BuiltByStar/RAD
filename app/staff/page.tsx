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
  NoteStack,
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
      title="The system behind the roster."
      description="RAD's support team shapes the competitive product, the public brand, and the day-to-day standard behind the org."
      heroImage="/assets/RadBanner1920_1080.png"
      status="Creative + competitive support online"
      note={
        <NoteStack
          items={[
            { label: "Visible Roles", value: String(staff.length) },
            { label: "Coverage", value: "Brand / Ops / Coaching" }
          ]}
        />
      }
    >
      <Section padding="sm">
        <Container>
          <SectionHeading
            eyebrow="Brand & Media"
            title="Creative output and public-facing execution."
            description="These roles shape how RAD looks, how content ships, and how the org carries itself in public."
          />

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
          <SectionHeading
            eyebrow="Operations & Performance"
            title="Management, analytics, and coaching support."
            description="This is the layer that turns a lineup into a functioning competitive unit with structure, accountability, and support."
          />

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
