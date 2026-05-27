import { HomeChampionsStrip } from "@/components/home/home-champions-strip";
import { HomeEsportsFeed } from "@/components/home/home-esports-feed";
import { HomeHero } from "@/components/home/home-hero";
import { HomeIntro } from "@/components/home/home-intro";
import { HomeMerchSpotlight } from "@/components/home/home-merch-spotlight";
import { HomeTeamShowcase } from "@/components/home/home-team-showcase";
import { HomeWorldsPortal } from "@/components/home/home-worlds-portal";
import { MarqueeStrip } from "@/components/home/marquee-strip";
import { PageReadySignal } from "@/components/page-ready-signal";
import { getManagedContentItems } from "@/lib/content-data.server";

export default async function HomePage() {
  const contentItems = await getManagedContentItems();

  return (
    <main className="relative isolate">
      <PageReadySignal route="/" delayMs={40} />
      <HomeIntro />
      <HomeHero />
      <MarqueeStrip />
      <HomeWorldsPortal />
      <HomeTeamShowcase />
      <HomeChampionsStrip />
      <HomeMerchSpotlight />
      <HomeEsportsFeed items={contentItems} />
    </main>
  );
}
