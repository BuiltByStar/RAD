import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Privacy",
  description: "RAD Esports privacy policy."
};

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy."
      description="How RAD Esports collects, uses, and protects your personal information."
      background="black"
    >
      <section className="section">
        <div className="container legal-shell">
          <div className="legal-copy">
            <h3>1. Information We Collect</h3>
            <p>We collect information you provide directly to us when you create an account, participate in our communities, sign up for a newsletter, or request support.</p>
            
            <h3>2. How We Use Information</h3>
            <p>We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you regarding updates, security alerts, and administrative messages.</p>
            
            <h3>3. Information Sharing</h3>
            <p>We do not share your personal information with third parties except as described in this privacy policy (e.g., with service providers acting on our behalf who are bound by confidentiality agreements).</p>

            <h3>4. Security Data</h3>
            <p>We employ standard industry measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
            
            <p className="legal-note">Last Updated: {new Date().getFullYear()}</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
