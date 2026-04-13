import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Cookie disclosure for the RAD Esports website."
};

const cookieBlocks = [
  {
    label: "01 // Essential",
    title: "Core cookies",
    copy:
      "Essential cookies support authentication, session handling, security, and other functions required for the website to operate correctly."
  },
  {
    label: "02 // Performance",
    title: "Analytics and performance",
    copy:
      "Performance-oriented tracking may be used to understand traffic, site behavior, and technical bottlenecks so the experience can improve over time."
  },
  {
    label: "03 // Preferences",
    title: "Experience settings",
    copy:
      "Preference-related cookies may be used to remember non-sensitive settings that improve returning visits and reduce friction."
  }
];

export default function CookiesPage() {
  return (
    <PageShell
      variant="legal"
      eyebrow="Legal"
      title="Cookie disclosure."
      description="This page explains the role of cookies and related tracking in a way that matches the rest of the site's tone and quality level."
      heroImage="/assets/RadRivals_Wallpaper_Black.png"
      status="Cookie notice // published"
    >
      <section className="rad-subpage-section">
        <div className="container">
          <div className="rad-legal-stack">
            {cookieBlocks.map((block) => (
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
