import type { Metadata } from "next";
import { CinematicHero } from "@/components/cinematic-hero";

export const metadata: Metadata = {
  title: "Service Protocol",
  description: "RAD Esports terms of service and user conduct protocols."
};

export default function TermsPage() {
  return (
    <main className="cinematic-main">
      <CinematicHero 
        eyebrow="Legal"
        title="Service Protocol."
        description="The governing framework for engagement with RAD Esports platforms and services."
        imageSrc="/assets/RadRivals_Wallpaper_Black.png"
        statusText="GOVERNANCE_CODE // ACTIVE"
      />

      <section className="cinematic-section">
        <div className="max-w-4xl">
          <div className="space-y-16">
            <div className="group border-l-2 border-white/10 hover:border-red-600 pl-8 transition-colors">
              <span className="cinematic-mono text-xs mb-4 block text-red-600">01 // ACCEPTANCE</span>
              <h3 className="cinematic-item-title text-2xl mb-4">Agreement of Conduct</h3>
              <p className="cinematic-desc text-white/70">
                By accessing RAD platforms, you agree to follow our protocols. Any breach of conduct may result in termination of service or temporary suspension of access to RAD H.Q. systems.
              </p>
            </div>

            <div className="group border-l-2 border-white/10 hover:border-red-600 pl-8 transition-colors">
              <span className="cinematic-mono text-xs mb-4 block text-red-600">02 // INTELLECTUAL_PROPERTY</span>
              <h3 className="cinematic-item-title text-2xl mb-4">RAD Assets</h3>
              <p className="cinematic-desc text-white/70">
                All branding, visuals, videos, and code remain the exclusive property of RAD Esports. Unauthorized reproduction of the "CHILE20" aesthetic or official trademarks is strictly prohibited.
              </p>
            </div>

            <div className="group border-l-2 border-white/10 hover:border-red-600 pl-8 transition-colors">
              <span className="cinematic-mono text-xs mb-4 block text-red-600">03 // TERMINATION</span>
              <h3 className="cinematic-item-title text-2xl mb-4">Protocol Termination</h3>
              <p className="cinematic-desc text-white/70">
                We reserve the right to disconnect any user who compromises the security, performance, or competitive integrity of our community.
              </p>
            </div>
            
            <div className="pt-12 border-t border-white/5">
              <p className="cinematic-mono text-[10px] opacity-40">
                PROTOCOL_ID: TOS_5.0 // GLOBAL_ENFORCED
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
