import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { TwitchCreators } from "@/components/twitch-creators";
import { YouTubeFeatured } from "@/components/youtube-featured";
import { YouTubeLibrary } from "@/components/youtube-library";
import { Button, PageRail, PageRailSection, SectionHeading } from "@/components/ui";
import { getManagedContentItemsState } from "@/lib/content-data.server";
import { contactChannels } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Content",
  description: "RAD videos, creator streams, and editorial updates."
};

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const { items: managedContent, usingDashboardItems } = await getManagedContentItemsState();
  const featuredDrop = managedContent.find((item) => item.featured) ?? managedContent[0];
  const youtube = contactChannels.find((channel) => channel.label === "YouTube");

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
          <YouTubeFeatured featuredItem={featuredDrop} preferManaged={usingDashboardItems} />
        </PageRailSection>

        <PageRailSection borderTop className="py-8 md:py-10">
          <SectionHeading title="Creators" compact className="mb-6" />
          <TwitchCreators />
        </PageRailSection>

        <PageRailSection borderTop id="latest-videos" className="py-8 md:py-10">
          <SectionHeading
            title="Library"
            compact
            className="mb-6"
            actionHref={youtube?.href ?? "https://www.youtube.com/@RadEsport"}
            actionLabel="YouTube"
          />
          <YouTubeLibrary fallbackItems={managedContent} preferManaged={usingDashboardItems} />
          {youtube ? (
            <div className="mt-6">
              <Button href={youtube.href} size="sm" variant="outline">
                Open channel
              </Button>
            </div>
          ) : null}
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
