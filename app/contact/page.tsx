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
      title="Direct lanes for partners, recruitment, and community."
      description="Contact entry points are organized so the site can handle sponsor outreach, roster inquiries, and fan/community activation cleanly."
      background="black"
    >
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Reach Out"
            title="Direct channels plus a backend-ready inquiry pipeline."
            description="The page keeps direct contact visible, while Vercel route handling and Supabase storage now support structured inquiries when env vars are configured."
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
