import type { Metadata } from "next";
import { CinematicHero } from "@/components/cinematic-hero";

export const metadata: Metadata = {
  title: "Data Protocol",
  description: "RAD Esports privacy policy and data handling procedures."
};

export default function PrivacyPage() {
  return (
    <main className="cinematic-main">
      <CinematicHero 
        eyebrow="Legal"
        title="Privacy Protocol."
        description="How RAD Esports collects, uses, and protects your personal information."
        imageSrc="/assets/RadRivals_Wallpaper_Black.png"
        statusText="SECURE_DOCUMENT // v2.0"
      />

      <section className="cinematic-section">
        <div className="max-w-4xl">
          <div className="space-y-16">
            <div className="group border-l-2 border-white/10 hover:border-red-600 pl-8 transition-colors">
              <span className="cinematic-mono text-red-600 text-xs mb-4 block">01 // COLLECTION</span>
              <h3 className="cinematic-item-title text-2xl mb-4 uppercase">Information We Collect</h3>
              <p className="cinematic-desc text-white/70 leading-relaxed">
                We collect information you provide directly to us when you create an account, participate in our communities, sign up for a newsletter, or request support. This remains encrypted within our primary data nodes.
              </p>
            </div>

            <div className="group border-l-2 border-white/10 hover:border-red-600 pl-8 transition-colors">
              <span className="cinematic-mono text-red-600 text-xs mb-4 block">02 // UTILIZATION</span>
              <h3 className="cinematic-item-title text-2xl mb-4 uppercase">How We Use Information</h3>
              <p className="cinematic-desc text-white/70 leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you regarding updates, security alerts, and administrative messages.
              </p>
            </div>

            <div className="group border-l-2 border-white/10 hover:border-red-600 pl-8 transition-colors">
              <span className="cinematic-mono text-red-600 text-xs mb-4 block">03 // DISTRIBUTION</span>
              <h3 className="cinematic-item-title text-2xl mb-4 uppercase">Information Sharing</h3>
              <p className="cinematic-desc text-white/70 leading-relaxed">
                We do not share your personal information with third parties except as described in this privacy policy (e.g., with service providers acting on our behalf who are bound by confidentiality agreements).
              </p>
            </div>

            <div className="group border-l-2 border-white/10 hover:border-red-600 pl-8 transition-colors">
              <span className="cinematic-mono text-red-600 text-xs mb-4 block">04 // DEFENSE</span>
              <h3 className="cinematic-item-title text-2xl mb-4 uppercase">Security Data</h3>
              <p className="cinematic-desc text-white/70 leading-relaxed">
                We employ standard industry measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
              </p>
            </div>
            
            <div className="pt-12 border-t border-white/5">
              <p className="cinematic-mono text-xs opacity-40 italic">
                LAST_UPDATED: APRIL 2026 // END_OF_LOG
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
