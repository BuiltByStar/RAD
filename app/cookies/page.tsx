import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { CardGrid, LegalCard, PageRail, PageRailSection } from "@/components/ui";

export const metadata: Metadata = {
  title: "Cookies",
  description: "How RAD uses cookies across the site."
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
      compact
      eyebrow="Legal"
      title="Cookies"
      description="How RAD uses cookies and similar tools across the site."
    >
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection className="py-8 md:py-10">
          <CardGrid cols={1} className="max-w-3xl">
            {cookieBlocks.map((block) => (
              <LegalCard key={block.title} label={block.label} title={block.title} copy={block.copy} />
            ))}
          </CardGrid>
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
