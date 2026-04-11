import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import { ContactGrid, SectionHeading } from "@/components/sections";
import { contactChannels } from "@/lib/site-data";
import { hasSupabaseServiceEnv } from "@/lib/env";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out to RAD Esports for activations, talent, media, or general inquiries."
};

export default function ContactPage() {
  const submissionsEnabled = hasSupabaseServiceEnv();

  return (
    <PageShell
      eyebrow="Contact"
      title="Direct lines for serious inquiries."
      description="The site now supports structured intake through Supabase when configured, with direct channels still visible so no legitimate inquiry hits a dead end."
      heroImage="/assets/RadBannerNewTest300ppi.png"
      heroNote={
        <div className="rad-note-card">
          <p className="rad-kicker">Best use</p>
          <p className="rad-copy">
            Partnerships, press, roster opportunities, and general business contact should all route through the same polished intake surface.
          </p>
        </div>
      }
    >
      <section className="rad-section">
        <div className="container rad-contact-layout">
          <div className="rad-surface">
            <SectionHeading
              eyebrow="Inquiries"
              title="Send a clear message."
              description="Use the form for structured submissions. If Supabase is not configured in the environment yet, direct channels remain available on the right."
              align="stacked"
            />
            <ContactForm enabled={submissionsEnabled} />
          </div>

          <div className="rad-contact-sidebar">
            <div className="rad-surface">
              <SectionHeading
                eyebrow="Channels"
                title="Direct contact channels."
                description="These stay visible even when the backend pipeline is offline, so the page remains useful in every environment."
                align="stacked"
              />
              <ContactGrid channels={contactChannels} />
            </div>

            <div className="rad-note-card">
              <p className="rad-kicker">Response quality</p>
              <p className="rad-copy">
                Include the reason for contact, the brand or org name if applicable, and any social handles or deck links that help RAD evaluate the inquiry quickly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
