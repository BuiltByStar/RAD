import type { Metadata } from "next";
import { CinematicHero } from "@/components/cinematic-hero";
import { contactChannels } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Link Up",
  description: "Secure a line to RAD Esports for partnerships, press, or recruitment."
};

export default function ContactPage() {
  return (
    <main className="cinematic-main">
      <CinematicHero 
        eyebrow="Link Up"
        title="Secure the Connection."
        description="Establish a direct line to RAD H.Q. for strategic alliances, media inquiries, or competitive scouting."
        imageSrc="/assets/RadRivals_Wallpaper_Red.png"
        statusText="COMMS_CHANNEL // ACTIVE"
      />

      <section className="cinematic-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Transmission Channel Info */}
          <div>
            <span className="cinematic-item-eyebrow">Terminal Data</span>
            <h2 className="cinematic-item-title text-4xl mb-8">Direct Channels</h2>
            
            <div className="space-y-8">
              {contactChannels.map((channel) => (
                <a 
                  key={channel.label} 
                  href={channel.href} 
                  className="group flex items-center justify-between p-6 border border-white/10 hover:border-red-600 transition-all duration-300"
                >
                  <div>
                    <span className="cinematic-mono text-red-600 block mb-1">[{channel.label}]</span>
                    <span className="text-xl font-bold uppercase tracking-widest">{channel.value}</span>
                  </div>
                  <div className="h-2 w-2 bg-red-600 group-hover:scale-150 transition-transform" />
                </a>
              ))}
            </div>

            <div className="mt-12 p-8 bg-neutral-900/50 border-l-2 border-red-600">
              <span className="cinematic-mono text-xs opacity-60 block mb-4 underline">NOTICE://</span>
              <p className="cinematic-desc text-sm leading-relaxed italic">
                All transmissions are logged. Response times vary based on urgency and priority of alliance.
              </p>
            </div>
          </div>

          {/* Terminal Form */}
          <div className="bg-black p-8 md:p-12 border border-white/5 relative">
            {/* Form HUD Accents */}
            <div className="absolute top-0 right-12 h-px w-24 bg-red-600/30" />
            <div className="absolute top-12 right-0 h-24 w-px bg-red-600/30" />
            
            <span className="cinematic-mono text-red-600 block mb-8 underline">TRANSMISSION_FORM</span>
            
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="cinematic-mono text-[10px] opacity-40 block mb-2">IDENTIFIER</label>
                  <input type="text" placeholder="YOUR NAME" className="cinematic-input m-0" />
                </div>
                <div>
                  <label className="cinematic-mono text-[10px] opacity-40 block mb-2">RETURN_SIGNAL</label>
                  <input type="email" placeholder="EMAIL ADDRESS" className="cinematic-input m-0" />
                </div>
              </div>
              
              <div>
                <label className="cinematic-mono text-[10px] opacity-40 block mb-2">SUBJECT_HEADER</label>
                <input type="text" placeholder="PURPOSE OF CONTACT" className="cinematic-input m-0" />
              </div>

              <div>
                <label className="cinematic-mono text-[10px] opacity-40 block mb-2">MESSAGE_BODY</label>
                <textarea 
                  placeholder="ENTER DATA..." 
                  className="cinematic-input m-0 min-h-[150px] resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-red-600 text-white cinematic-mono font-bold tracking-[0.5em] hover:bg-red-700 transition-colors uppercase"
              >
                Send Transmission
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Security Footer */}
      <section className="cinematic-section border-t border-white/5 opacity-30 pointer-events-none">
        <div className="flex justify-between items-center text-[10px] cinematic-mono tracking-widest">
          <span>SECURE_LINK_ENCRYPTION_ACTIVE</span>
          <span>TERMINAL_ID: RAD_HQ_0412</span>
          <span>BITRATE: 128.4 KBPS</span>
        </div>
      </section>
    </main>
  );
}
