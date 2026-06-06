import { HomeCommunityBanner } from "@/components/home/home-community-banner";
import { HomeSocialsSection } from "@/components/home/home-socials-section";
import { HomeProductCarousel } from "@/components/home/home-product-carousel";
import { HomeTeamsBanner } from "@/components/home/home-teams-banner";
import { PageReadySignal } from "@/components/page-ready-signal";
import { getManagedRosterState } from "@/lib/roster-data.server";
import { teams } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const team = teams[0];
  const { players } = await getManagedRosterState(team.name);

  return (
    <main className="overflow-hidden bg-black text-white">
      <PageReadySignal route="/" delayMs={40} />
      <HomeProductCarousel />
      <HomeCommunityBanner />
      <HomeTeamsBanner
        players={players}
        teamDescription={team.description}
        teamStatus={team.status}
      />
      <HomeSocialsSection />
    </main>
  );
}
