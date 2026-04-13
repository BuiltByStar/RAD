import type { Metadata } from "next";
import { CinematicHero } from "@/components/cinematic-hero";
import { players, teams } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Vanguard",
  description: "RAD's elite competitive lineup and championship core."
};

export default function RosterPage() {
  const team = teams[0];
  const teamRoster = players.filter((player) => player.group === team.name);

  return (
    <main className="cinematic-main">
      <CinematicHero 
        eyebrow="Vanguard"
        title="The Championship Core."
        description="RAD's primary title contenders, world-class individual talent, and the backbone of the organization's competitive presence."
        imageSrc="/assets/RadRivals_Wallpaper_Black.png"
        statusText="ROSTER_ACCESS // AUTHORIZED"
      />

      <section className="cinematic-section">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="cinematic-item-eyebrow">Active Division</span>
            <h2 className="cinematic-item-title text-5xl mb-6">{team.name}</h2>
            <p className="cinematic-desc text-white/70">{team.description}</p>
          </div>
          <div className="bg-red-600/10 border border-red-600/20 p-6 backdrop-blur-sm">
            <span className="cinematic-mono text-red-600 block mb-2">Current Status</span>
            <span className="text-xl font-bold uppercase tracking-widest">{team.status}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamRoster.map((player) => (
            <div key={player.name} className="cinematic-roster-card group">
              <div 
                className="cinematic-roster-bg opacity-30 group-hover:opacity-70 transition-opacity duration-700" 
                style={{ backgroundImage: `url('/assets/RadPlayerBannerPNG8.png')` }} 
              />
              
              {/* Tactical Overlay Elements */}
              <div className="absolute top-4 right-4 z-20 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="cinematic-mono text-[8px] block">SIGNAL_STRENGTH</span>
                <div className="flex gap-1 justify-end mt-1">
                  <div className="w-1 h-3 bg-red-600" />
                  <div className="w-1 h-3 bg-red-600" />
                  <div className="w-1 h-3 bg-red-600" />
                  <div className="w-1 h-3 bg-red-600/30" />
                </div>
              </div>

              <div className="cinematic-roster-content relative z-20">
                <div className="mb-4">
                  <span className="cinematic-roster-role text-red-600 text-xs font-bold">{player.role}</span>
                  <h3 className="cinematic-roster-name text-4xl mt-1 group-hover:tracking-tighter transition-all duration-500">{player.name}</h3>
                </div>

                <div className="space-y-4 overflow-hidden max-h-0 group-hover:max-h-60 transition-all duration-700 ease-in-out">
                  <div className="h-[1px] w-full bg-white/10" />
                  <p className="cinematic-mono text-[10px] text-white/50 leading-relaxed italic">
                    "{player.descriptor}"
                  </p>
                  
                  {player.specialties && (
                    <div className="flex flex-wrap gap-2">
                      {player.specialties.map(s => (
                        <span key={s} className="text-[9px] px-2 py-1 border border-white/20 uppercase tracking-widest">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {player.socials?.length ? (
                    <div className="flex gap-4 pt-4">
                      {player.socials.map((social) => (
                        <a 
                          key={social.label} 
                          href={social.href} 
                          className="cinematic-mono text-[10px] hover:text-red-600 transition-colors"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {social.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Card Footer Decor */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 group-hover:bg-red-600 transition-colors duration-500" />
              <div className="absolute top-2 left-2 cinematic-mono text-[8px] opacity-20 group-hover:opacity-100">ID://{player.name.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Roster Call to Action */}
      <section className="cinematic-section text-center border-b border-white/5">
        <span className="cinematic-item-eyebrow">Recruitment</span>
        <h2 className="cinematic-item-title text-4xl mb-8">Want to join the vanguard?</h2>
        <a href="/contact" className="inline-block px-12 py-4 border-2 border-white hover:bg-white hover:text-black transition-all duration-300 cinematic-mono font-bold tracking-[0.3em]">
          Submit Credentials
        </a>
      </section>
    </main>
  );
}
