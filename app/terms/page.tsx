import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { PageRail, PageRailSection } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms",
  description: "The rules for using the RAD website and connected services."
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
      compact
      eyebrow="Legal"
      title="Terms"
      description="Rules for using RAD's public website and connected services."
    >
      <PageRail className="pb-20 sm:pb-28">
        <PageRailSection className="py-12 md:py-16">
          <div className="mx-auto max-w-2xl space-y-12 sm:space-y-14">
            {termsBlocks.map((block) => (
              <section key={block.title}>
                <p className="rad-kicker">{block.label}</p>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-xl uppercase leading-[1.1] tracking-normal text-white sm:text-2xl">
                  {block.title}
                </h2>
                <p className="mt-4 text-base leading-[1.7] text-neutral-400 sm:text-[1.0625rem]">
                  {block.copy}
                </p>
              </section>
            ))}
          </div>
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
