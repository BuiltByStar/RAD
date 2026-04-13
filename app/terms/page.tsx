import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of service for the RAD Esports website."
};

const termsBlocks = [
  {
    label: "01 // Use",
    title: "Use of the site",
    copy:
      "By accessing RAD's website or related public services, you agree to use them lawfully and in a way that does not interfere with platform stability, community safety, or organizational operations."
  },
  {
    label: "02 // IP",
    title: "Brand and content ownership",
    copy:
      "RAD branding, site visuals, editorial content, video, and related materials remain the property of RAD Esports unless otherwise stated."
  },
  {
    label: "03 // Conduct",
    title: "Community-facing behavior",
    copy:
      "Harassment, abuse, or behavior that compromises affiliated RAD spaces may result in restriction from site-connected services or community access."
  }
];

export default function TermsPage() {
  return (
    <PageShell
      variant="legal"
      eyebrow="Legal"
      title="Terms of use."
      description="A cleaner legal surface keeps these pages readable and consistent with the rest of the site."
      heroImage="/assets/RadRivals_Wallpaper_Black.png"
      status="Terms // active"
    >
      <section className="rad-subpage-section">
        <div className="container">
          <div className="rad-legal-stack">
            {termsBlocks.map((block) => (
              <article key={block.title} className="rad-legal-card">
                <p className="rad-subpage-card__eyebrow">{block.label}</p>
                <h2 className="rad-subpage-card__title">{block.title}</h2>
                <p className="rad-subpage-body">{block.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
