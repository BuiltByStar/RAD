import { HomeChampionsStrip } from "@/components/home/home-champions-strip";
import { HomeEsportsFeed } from "@/components/home/home-esports-feed";
import { HomeHero } from "@/components/home/home-hero";
import { HomeIntro } from "@/components/home/home-intro";
import { HomeWorldsPortal } from "@/components/home/home-worlds-portal";
import { MarqueeStrip } from "@/components/home/marquee-strip";
import { PageReadySignal } from "@/components/page-ready-signal";

export default function HomePage() {
  return (
    <main className="relative isolate">
      <PageReadySignal route="/" delayMs={40} />
      <HomeIntro />
      <HomeHero />
      <MarqueeStrip />
      <HomeWorldsPortal />
      <HomeEsportsFeed />
      <HomeChampionsStrip />
    </main>
  );
}
