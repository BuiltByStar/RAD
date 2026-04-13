import type { Metadata } from "next";
import { CinematicHero } from "@/components/cinematic-hero";

export const metadata: Metadata = {
  title: "Trackers",
  description: "RAD Esports cookie policy and tracking disclosure."
};

export default function CookiesPage() {
  return (
    <main className="cinematic-main">
      <CinematicHero 
        eyebrow="Legal"
        title="Cookie Disclosure."
        description="How we use edge-data and trackers to optimize the RAD experience."
        imageSrc="/assets/RadRivals_Wallpaper_Black.png"
        statusText="CACHE_LOG // DATA_NODES"
      />

      <section className="cinematic-section">
        <div className="max-w-4xl">
          <div className="space-y-16">
            <div className="group border-l-2 border-white/10 hover:border-red-600 pl-8 transition-colors">
              <span className="cinematic-mono text-xs mb-4 block text-red-600">01 // ESSENTIALS</span>
              <h3 className="cinematic-item-title text-2xl mb-4">Core Cookies</h3>
              <p className="cinematic-desc text-white/70">
                These are necessary for the website to function (authentication, security, session management). They cannot be disabled in our systems as they form the backbone of the terminal connection.
              </p>
            </div>

            <div className="group border-l-2 border-white/10 hover:border-red-600 pl-8 transition-colors">
              <span className="cinematic-mono text-xs mb-4 block text-red-600">02 // PERFORMANCE</span>
              <h3 className="cinematic-item-title text-2xl mb-4">Analytics Tracking</h3>
              <p className="cinematic-desc text-white/70">
                We use performance trackers to measure traffic, identify bottlenecks, and optimize site speed. This data is anonymized and aggregated for org-wide optimization.
              </p>
            </div>

            <div className="group border-l-2 border-white/10 hover:border-red-600 pl-8 transition-colors">
              <span className="cinematic-mono text-xs mb-4 block text-red-600">03 // PREFERENCES</span>
              <h3 className="cinematic-item-title text-2xl mb-4">Experience Markers</h3>
              <p className="cinematic-desc text-white/70">
                These allow us to remember your settings (like dark mode or language) to provide a more personalized interface.
              </p>
            </div>
            
            <div className="pt-12 border-t border-white/5">
              <p className="cinematic-mono text-[10px] opacity-40">
                LOG_VER: 1.4 // SYSTEM_WIDE_DISCLOSURE
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
