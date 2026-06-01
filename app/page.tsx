import { HomeBrandIntro } from "@/components/home/home-brand-intro";
import { HomeCommunityBanner } from "@/components/home/home-community-banner";
import { HomeNewsSection } from "@/components/home/home-news-section";
import { HomeProductCarousel } from "@/components/home/home-product-carousel";
import { HomeTeamsBanner } from "@/components/home/home-teams-banner";
import { HomeVideosSection } from "@/components/home/home-videos-section";
import { PageReadySignal } from "@/components/page-ready-signal";
import { getManagedContentItems } from "@/lib/content-data.server";

export default async function HomePage() {
  const contentItems = await getManagedContentItems();

  return (
    <main className="overflow-hidden bg-black text-white">
      <PageReadySignal route="/" delayMs={40} />
      <HomeBrandIntro />
      <HomeProductCarousel />
      <HomeCommunityBanner />
      <HomeTeamsBanner />
      <HomeVideosSection items={contentItems} />
      <HomeNewsSection items={contentItems} />
    </main>
  );
}
