import { HomeChampionsStrip } from "@/components/home/home-champions-strip";
import { HomeHero } from "@/components/home/home-hero";
import { HomePillars } from "@/components/home/home-pillars";
import { HomeWorldsPortal } from "@/components/home/home-worlds-portal";

export default function HomePage() {
  return (
    <main className="relative isolate">
      <HomeHero />
      <HomeChampionsStrip />
      <HomeWorldsPortal />
      <HomePillars />
    </main>
  );
}
