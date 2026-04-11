import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Terms",
  description: "RAD Esports terms of service."
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service."
      description="The rules and guidelines for using RAD Esports platforms and services."
    >
      <section className="rad-section">
        <div className="container legal-shell">
          <div className="legal-copy">
            <h3>1. Agreement to Terms</h3>
            <p>By accessing or using the RAD Esports website, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.</p>
            
            <h3>2. Intellectual Property</h3>
            <p>The service and its original content, features, branding, and functionality are owned by RAD Esports and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
            
            <h3>3. User Conduct</h3>
            <p>You agree not to engage in any activity that interferes with or disrupts the services. Harassment, abusive language, or unsportsmanlike conduct in affiliated communities (such as our Discord) will result in termination of access.</p>

            <h3>4. Updates</h3>
            <p>We reserve the right to modify or replace these Terms at any time. We will provide reasonable notice of any significant changes.</p>
            
            <p className="legal-note">Last Updated: {new Date().getFullYear()}</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
