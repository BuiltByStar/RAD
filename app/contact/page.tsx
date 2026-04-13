import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import { ContactGrid, SectionHeading } from "@/components/sections";
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
      title="Open a direct line."
      description="The contact page should feel credible and business-ready: clean intake, visible fallback channels, and enough structure that real inquiries know where to go."
      heroImage="/assets/RadRivals_Wallpaper_Red.png"
      status="Public inquiry channels // online"
      note={
        <div className="rad-subpage-note__stack">
          <div>
            <span className="rad-subpage-note__label">Best For</span>
            <strong>Partnerships / Talent / Media</strong>
          </div>
          <div>
            <span className="rad-subpage-note__label">Response Path</span>
            <strong>Form + direct channels</strong>
          </div>
        </div>
      }
    >
      <section className="rad-subpage-section">
        <div className="container rad-subpage-grid rad-subpage-grid--2">
          <div className="rad-subpage-surface">
            <SectionHeading
              eyebrow="Inquiry Form"
              title="Send a clear message."
              description="This form is designed for structured business outreach, talent contact, and legitimate organizational inquiries."
              compact
            />
            <ContactForm enabled={hasSupabaseServiceEnv()} />
          </div>

          <div className="rad-subpage-stack">
            <div className="rad-subpage-surface">
              <SectionHeading
                eyebrow="Direct Channels"
                title="Use the channel that fits the ask."
                description="The page should still work when backend services are offline, so direct contact remains visible at all times."
                compact
              />
              <ContactGrid channels={contactChannels} />
            </div>

            <article className="rad-subpage-card">
              <p className="rad-subpage-card__eyebrow">What helps</p>
              <h3 className="rad-subpage-card__title">Send context, not just a name.</h3>
              <p className="rad-subpage-body">
                Include the type of request, any relevant brand or org name, the best return channel, and enough context for RAD to assess priority quickly.
              </p>
            </article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
