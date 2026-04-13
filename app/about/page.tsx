import type { Metadata } from "next";
import { CinematicHero } from "@/components/cinematic-hero";
import { aboutSummary, orgTimeline, orgValues, igniteSchedule } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "The Standard",
  description: "Identity, milestones, and the roadmap of RAD Esports."
};

export default function AboutPage() {
  return (
    <main className="cinematic-main">
      <CinematicHero 
        eyebrow="The Standard"
        title="Redefining the Elite."
        description="World champions. EMEA title holders. Built from the ground up to redefine the competitive landscape."
        videoSrc="/assets/DiscordRadBannerAnimated.mp4"
        statusText="CORE_IDENTITY // ACTIVE"
      />

      {/* Identity Section - Asymmetrical Layout */}
      <section className="cinematic-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="cinematic-item-eyebrow">Identity</span>
            <h2 className="cinematic-item-title text-4xl lg:text-5xl leading-tight mb-8">
              RAD didn't wait for <span className="text-red-600">permission.</span>
            </h2>
            <div className="h-[1px] w-24 bg-red-600 mb-8" />
          </div>
          <div className="space-y-6">
            <p className="cinematic-desc text-xl text-white leading-relaxed">
              {aboutSummary}
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <span className="cinematic-mono block mb-2">Primary Title</span>
                <span className="text-2xl font-bold uppercase tracking-tighter">Marvel Rivals</span>
              </div>
              <div>
                <span className="cinematic-mono block mb-2">HQ Location</span>
                <span className="text-2xl font-bold uppercase tracking-tighter">EMEA / Global</span>
              </div>
            </div>
          </div>
        </div>

        <div className="cinematic-grid mt-24">
          <div className="cinematic-item group">
            <div className="cinematic-red-accent group-hover:h-16 transition-all duration-500" />
            <h3 className="cinematic-item-title text-2xl text-red-600">World Champions</h3>
            <p className="cinematic-item-desc">
              Inaugural Marvel Rivals Ignite Mid-Season World Champions. A legacy cemented in the first wave.
            </p>
          </div>
          <div className="cinematic-item group">
            <div className="cinematic-red-accent group-hover:h-16 transition-all duration-500" />
            <h3 className="cinematic-item-title text-2xl text-red-600">EMEA Dominance</h3>
            <p className="cinematic-item-desc">
              Season 6 EMEA PC Champions. Solidifying our position as the region's absolute powerhouse.
            </p>
          </div>
          <div className="cinematic-item group">
            <div className="cinematic-red-accent group-hover:h-16 transition-all duration-500" />
            <h3 className="cinematic-item-title text-2xl text-red-600">The #GoWild Creed</h3>
            <p className="cinematic-item-desc">
              Aggressive by nature. Untamed by choice. Welcome to the new era of competitive culture.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars - Visual Grid */}
      <section className="cinematic-section bg-white/[0.02]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="cinematic-item-eyebrow">Our Pillars</span>
            <h2 className="cinematic-item-title mb-0">Foundational Standards.</h2>
          </div>
          <span className="cinematic-mono text-red-600">04 // CORE_VALUES</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {orgValues.map((value) => (
            <div key={value.title} className="bg-black p-8 hover:bg-neutral-900 transition-colors group">
              <span className="text-3xl mb-6 block group-hover:scale-110 transition-transform duration-500">{value.icon}</span>
              <h3 className="cinematic-item-title text-xl mb-4">{value.title}</h3>
              <p className="cinematic-item-desc text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline - Terminal Feed Style */}
      <section className="cinematic-section">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-[2px] w-12 bg-red-600" />
          <h2 className="cinematic-item-title mb-0">Evolution Log</h2>
        </div>
        
        <div className="space-y-12">
          {orgTimeline.map((event, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-8 group">
              <div className="md:w-32 flex-shrink-0">
                <span className="cinematic-mono text-red-600 group-hover:translate-x-2 transition-transform inline-block">
                  [{event.date}]
                </span>
              </div>
              <div className="flex-1 pb-12 border-b border-white/10">
                <h4 className="cinematic-item-title text-2xl mb-4 group-hover:text-red-600 transition-colors">
                  {event.title}
                </h4>
                <p className="cinematic-item-desc max-w-2xl">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap - Grid Data */}
      <section className="cinematic-section">
        <div className="mb-16">
          <span className="cinematic-item-eyebrow">2026 Transmission</span>
          <h2 className="cinematic-item-title">Roadmap to Dominance.</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {igniteSchedule.map((item, i) => (
            <div key={i} className="relative p-6 border-l border-red-600/30 hover:border-red-600 transition-colors">
              <span className="cinematic-item-eyebrow text-[10px] opacity-40">{item.dates}</span>
              <h3 className="cinematic-item-title text-lg mt-2 tracking-widest">{item.stage}</h3>
              <div className="absolute top-2 right-2 cinematic-mono text-[8px]">STG_{i+1}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
