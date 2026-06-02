import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardBody,
  CardEyebrow,
  CardTitle,
  ContactGrid,
  PageRail,
  PageRailSection,
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
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection>
          <div className="grid gap-px border border-neutral-900 bg-neutral-900 lg:grid-cols-2">
            <div className="bg-black p-5 sm:p-6 md:p-8">
              <SectionHeading eyebrow="Inquiry Form" title="Inquiry Form" compact className="mb-6" />
              <ContactForm enabled={hasSupabaseServiceEnv()} />
            </div>

            <div className="grid gap-px bg-neutral-900">
              <div className="bg-black p-5 sm:p-6 md:p-8">
                <SectionHeading eyebrow="Direct Contact" title="Direct Contact" compact className="mb-4" />
                <ContactGrid channels={contactChannels} />
              </div>
              <Card accent={false} className="border-0 bg-black">
                <CardEyebrow>Tips</CardEyebrow>
                <CardTitle size="sm">What to include</CardTitle>
                <CardBody>
                  Include the request type, brand or org name, best contact path, and the decision RAD needs to make.
                </CardBody>
              </Card>
            </div>
          </div>
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
