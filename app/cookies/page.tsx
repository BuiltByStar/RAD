import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Cookies",
  description: "RAD Esports cookies policy."
};

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookies Policy."
      description="How RAD Esports uses cookies to enhance your browsing experience."
      background="black"
    >
      <section className="section">
        <div className="container legal-shell">
          <div className="legal-copy">
            <h3>1. What are Cookies?</h3>
            <p>Cookies are small text files placed on your device when you browse websites. They are widely used to make websites work more efficiently and to provide statistical information to the site owners.</p>
            
            <h3>2. How We Use Cookies</h3>
            <p>RAD Esports uses essential cookies for site functionality (like preserving your session when you log into the admin dashboard) and analytical cookies to understand how our community interacts with our content.</p>
            
            <h3>3. Third-Party Cookies</h3>
            <p>Some of our pages may display content from external providers (like YouTube or Twitch streaming embeds). These third-party services may set their own cookies according to their policies.</p>

            <h3>4. Managing Cookies</h3>
            <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. Note that disabling cookies may affect the functionality of our website.</p>
            
            <p className="legal-note">Last Updated: {new Date().getFullYear()}</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
