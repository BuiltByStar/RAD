import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import { ContactGrid, SectionHeading } from "@/components/sections";
import { hasSupabaseServiceEnv } from "@/lib/env";
import { contactChannels } from "@/lib/site-data";

export default function ContactPage() {
  const hasSubmissionPipeline = hasSupabaseServiceEnv();

  return (
    <PageShell
      eyebrow="Contact"
      title="Get in Touch."
      description="Direct channels for partnerships, talent, and community."
      background="black"
    >
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Reach Out"
            title="Direct contact and submissions."
            description="Use the public channels now or send a structured inquiry through the form."
          />
          <ContactGrid channels={contactChannels} />
          <div className="contact-form-shell">
            <div className="contact-form-copy">
              <p className="eyebrow">Supabase Intake</p>
              <h2>Structured submissions for sponsors, tryouts, talent, and media.</h2>
              <p className="section-copy">
                This form posts to a server route and stores submissions in
                Supabase once the deployment environment is connected.
              </p>
            </div>
            <ContactForm enabled={hasSubmissionPipeline} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
