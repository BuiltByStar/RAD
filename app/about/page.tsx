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
import { aboutSummary, igniteSchedule, orgTimeline, orgValues } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "Identity, milestones, and the operating standard behind RAD Esports."
};

export default function AboutPage() {
  return (
    <PageShell
      variant="about"
      eyebrow="About RAD"
      title="Pressure made the identity."
      description="RAD turned heads early with real wins and a clear point of view. The org is being built to grow into new titles, bigger stories, and stronger stages without losing its edge."
      heroImage="/assets/RadBannerNewTest300ppi.png"
      status="World title secured // EMEA pressure-tested"
      note={
        <NoteStack
          items={[
            { label: "Primary Division", value: "Marvel Rivals" },
            { label: "Operating Region", value: "EMEA / Global" }
          ]}
        />
      }
    >
      <Section padding="sm">
        <Container>
          <SectionHeading
            eyebrow="Identity"
            title="An org story with proof behind it."
            description="RAD did not wait for an invitation to matter. The identity already has championships behind it, which gives the brand a real foundation."
          />

          <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
            <Card tone="lead" spotlight>
              <CardBody className="mt-0 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                {aboutSummary}
              </CardBody>
            </Card>

            <div className="grid gap-4 sm:gap-5">
              <Card spotlight>
                <CardEyebrow>Competitive Position</CardEyebrow>
                <CardTitle size="sm">Pressure-tested on the biggest stages.</CardTitle>
                <CardBody>
                  The public identity works because there are real results underneath it, not because the site is trying to oversell the org.
                </CardBody>
              </Card>
              <Card spotlight>
                <CardEyebrow>Brand Direction</CardEyebrow>
                <CardTitle size="sm">A brand built to move across titles.</CardTitle>
                <CardBody>
                  RAD needs to stay recognisable whether it is presenting a roster, an activation, or the next division added to the org.
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="sm" className="bg-[var(--bg-alt)]">
        <Container>
          <SectionHeading
            eyebrow="Standards"
            title="The values that shape the public product."
            description="Results matter, but the long-term standard is what turns a winning roster into a real organization."
          />

          <CardGrid cols={4}>
            {orgValues.map((value) => (
              <Card key={value.title} spotlight>
                <span
                  aria-hidden
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-alt)] text-lg text-[color:var(--color-rad-hi)]"
                >
                  {value.icon}
                </span>
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
            eyebrow="Timeline"
            title="How RAD established credibility."
            description="The key moments below show how the org earned credibility early and why the brand already carries weight."
          />

          <Timeline>
            {orgTimeline.map((event) => (
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

      <Section padding="sm" className="bg-[var(--bg-alt)]">
        <Container>
          <SectionHeading
            eyebrow="Roadmap"
            title="Structured for the next competitive cycle."
            description="The story does not stop at titles already won. The next stage is about expanding the org without lowering the standard."
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
