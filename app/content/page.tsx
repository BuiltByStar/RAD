import type { Metadata } from "next";

import { FeaturedMediaSection } from "@/components/featured-media-section";
import { PageShell } from "@/components/page-shell";
import { PageRail, PageRailSection } from "@/components/ui";

export const metadata: Metadata = {
  title: "Content",
  description: "RAD videos, creator streams, and editorial updates."
};

export const dynamic = "force-dynamic";

export default function ContentPage() {
  return (
    <PageShell
      variant="content"
      compact
      eyebrow="Content"
      title="Media"
      description="Videos and creator streams from RAD."
    >
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection className="py-8 md:py-10">
          <FeaturedMediaSection />
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
