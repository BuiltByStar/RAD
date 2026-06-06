import { HomeCommunityBanner } from "@/components/home/home-community-banner";
import { HomeSocialsSection } from "@/components/home/home-socials-section";
import { HomeProductCarousel } from "@/components/home/home-product-carousel";
import { HomeTeamsBanner } from "@/components/home/home-teams-banner";
import { PageReadySignal } from "@/components/page-ready-signal";

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-black text-white">
      <PageReadySignal route="/" delayMs={40} />
      <HomeProductCarousel />
      <HomeCommunityBanner />
      <HomeTeamsBanner />
      <HomeSocialsSection />
    </main>
  );
}
