import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardBody,
  CardEyebrow,
  CardTitle,
  ContactGrid,
  Container,
  Section,
  SectionHeading
} from "@/components/ui";
import { hasSupabaseServiceEnv } from "@/lib/env";
import { contactChannels } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Direct contact and structured inquiry intake for RAD Esports."
};

export default function ContactPage() {
  return (
    <PageShell
      variant="contact"
      eyebrow="Contact"
      title="Contact"
      description="Partnership, talent, media, and business inquiries start here."
      heroImage="/assets/rad-bg-red.png"
      status="Inquiries open"
    >
      <Section padding="sm">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/24 to-transparent" />
              <SectionHeading eyebrow="Inquiry Form" title="Inquiry Form" compact className="mb-6" />
              <ContactForm enabled={hasSupabaseServiceEnv()} />
            </div>

            <div className="flex flex-col gap-5">
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/24 to-transparent" />
                <SectionHeading eyebrow="Direct Contact" title="Direct Contact" compact className="mb-0" />
                <ContactGrid channels={contactChannels} />
              </div>

              <Card spotlight>
                <CardEyebrow>Tips</CardEyebrow>
                <CardTitle size="sm">What to include</CardTitle>
                <CardBody>
                  Include the request type, brand or org name, best contact path, and the decision RAD needs to make.
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
