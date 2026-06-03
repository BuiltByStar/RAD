import type { Metadata } from "next";

import { ContactSocialSection } from "@/components/contact/contact-social-section";
import { PageShell } from "@/components/page-shell";
import { PageRail, PageRailSection } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach RAD via Discord ticket or team email — partnerships, talent, media, and business inquiries."
};

export default function ContactPage() {
  return (
    <PageShell
      variant="contact"
      compact
      eyebrow="Contact"
      title="Contact"
      description="Discord ticket or team email — we respond fastest in-server."
    >
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection className="py-8 md:py-10">
          <ContactSocialSection />
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
