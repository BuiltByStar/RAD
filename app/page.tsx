import { HomeChampionsStrip } from "@/components/home/home-champions-strip";
import { HomeEsportsFeed } from "@/components/home/home-esports-feed";
import { HomeFollowStrip } from "@/components/home/home-follow-strip";
import { HomeHero } from "@/components/home/home-hero";
import { HomeIntro } from "@/components/home/home-intro";
import { HomeMerchSpotlight } from "@/components/home/home-merch-spotlight";
import { HomeWhoWeAre } from "@/components/home/home-who-we-are";
import { HomeWhereWeCompete } from "@/components/home/home-where-we-compete";
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
      <HomeWhoWeAre />
      <HomeWhereWeCompete />
      <HomeChampionsStrip />
      <HomeMerchSpotlight />
      <HomeFollowStrip />
      <HomeEsportsFeed items={contentItems} />
    </main>
  );
}
