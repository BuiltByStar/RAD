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
  NoteStack,
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
      title="Open the right line."
      description="For partnerships, talent inquiries, media requests, and other serious outreach, RAD keeps both structured intake and direct channels visible."
      heroImage="/assets/RadRivals_Wallpaper_Red.png"
      status="Public inquiry channels // online"
      note={
        <NoteStack
          items={[
            { label: "Best For", value: "Partnerships / Talent / Media" },
            { label: "Response Path", value: "Form + direct channels" }
          ]}
        />
      }
    >
      <Section padding="sm">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01)),rgba(6,6,6,0.82)] p-5 sm:p-6 [clip-path:polygon(0_0,calc(100%-18px)_0,100%_18px,100%_100%,18px_100%,0_calc(100%-18px))]">
              <SectionHeading
                eyebrow="Inquiry Form"
                title="Send a clear message."
                description="Use the form when the request needs context, routing, and a direct response path."
                compact
                className="mb-6"
              />
              <ContactForm enabled={hasSupabaseServiceEnv()} />
            </div>

            <div className="flex flex-col gap-5">
              <div className="border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01)),rgba(6,6,6,0.82)] p-5 sm:p-6 [clip-path:polygon(0_0,calc(100%-18px)_0,100%_18px,100%_100%,18px_100%,0_calc(100%-18px))]">
                <SectionHeading
                  eyebrow="Direct Channels"
                  title="Use the channel that fits the ask."
                  description="Direct contact stays visible so the page remains useful even when backend services are unavailable."
                  compact
                  className="mb-0"
                />
                <ContactGrid channels={contactChannels} />
              </div>

              <Card>
                <CardEyebrow>What helps</CardEyebrow>
                <CardTitle size="sm">Send context, not just a name.</CardTitle>
                <CardBody>
                  Include the type of request, any relevant brand or org name, the best return channel, and enough context for RAD to assess priority quickly.
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
