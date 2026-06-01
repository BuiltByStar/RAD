import { HomeCommunityBanner } from "@/components/home/home-community-banner";
import { HomeNewsSection } from "@/components/home/home-news-section";
import { HomeProductCarousel } from "@/components/home/home-product-carousel";
import { HomeProofStrip } from "@/components/home/home-proof-strip";
import { HomeTeamsBanner } from "@/components/home/home-teams-banner";
import { HomeVideosSection } from "@/components/home/home-videos-section";
import { PageReadySignal } from "@/components/page-ready-signal";
import { getManagedContentItems } from "@/lib/content-data.server";

export default async function HomePage() {
  const contentItems = await getManagedContentItems();

  return (
    <main className="overflow-hidden bg-black text-white">
      <PageReadySignal route="/" delayMs={40} />
      <HomeProductCarousel />
      <HomeProofStrip />
      <HomeCommunityBanner />
      <HomeVideosSection items={contentItems} />
      <HomeTeamsBanner />
      <HomeNewsSection items={contentItems} />
    </main>
  );
}
