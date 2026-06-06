import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { PageRail, PageRailSection } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How RAD handles information shared through the site."
};

const privacyBlocks = [
  {
    label: "01 // Collection",
    title: "What gets collected",
    copy:
      "RAD collects information submitted through website forms, account flows, or direct contact when that information is needed to respond or operate the service."
  },
  {
    label: "02 // Use",
    title: "How information is used",
    copy:
      "Collected information is used to provide responses, operate the site, improve performance, and support administrative or security-related communication."
  },
  {
    label: "03 // Sharing",
    title: "When information is shared",
    copy:
      "RAD does not sell personal information. Data may be processed by service providers acting on RAD's behalf where required for site operation or communications."
  }
];

export default function PrivacyPage() {
  return (
    <PageShell
      variant="legal"
      compact
      eyebrow="Legal"
      title="Privacy"
      description="How RAD handles information shared through the site."
    >
      <PageRail className="pb-20 sm:pb-28">
        <PageRailSection className="py-12 md:py-16">
          <div className="mx-auto max-w-2xl space-y-12 sm:space-y-14">
            {privacyBlocks.map((block) => (
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
