import { HomeCommunityBanner } from "@/components/home/home-community-banner";
import { HomeSocialsSection } from "@/components/home/home-socials-section";
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
      <HomeProductCarousel />
      <HomeCommunityBanner />
      <HomeTeamsBanner />
      <HomeVideosSection items={contentItems} />
      <HomeSocialsSection />
    </main>
  );
}
