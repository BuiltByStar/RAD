import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import { ContactGrid, PageRail, PageRailSection, SectionHeading } from "@/components/ui";
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
      compact
      eyebrow="Contact"
      title="Contact"
      description="Partnership, talent, media, and business inquiries."
    >
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection className="py-8 md:py-10">
          <div className="grid gap-px border border-neutral-900 bg-neutral-900 lg:grid-cols-2">
            <div className="bg-black p-5 sm:p-6 md:p-8">
              <SectionHeading title="Inquiry" compact className="mb-6" />
              <ContactForm enabled={hasSupabaseServiceEnv()} />
            </div>

            <div className="bg-black p-5 sm:p-6 md:p-8">
              <SectionHeading title="Direct" compact className="mb-4" />
              <ContactGrid channels={contactChannels} />
            </div>
          </div>
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
