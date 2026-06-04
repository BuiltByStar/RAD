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
    <PageShell variant="contact" hideHero eyebrow="Contact" title="Contact" route="/contact">
      <PageRail className="pb-16 sm:pb-20">
        <PageRailSection className="flex min-h-[70vh] items-center justify-center py-16 md:py-20">
          <ContactSocialSection />
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
