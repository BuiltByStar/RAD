import type { Metadata } from "next";

import { partners } from "@/lib/site-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Activations",
  description: "RAD's brand partnership, activation, and sponsorship entry point."
};

export default function PartnersPage() {
  return (
    <main className="cinematic-main">
      <section className="cinematic-hero">
        <div 
          className="cinematic-hero-bg" 
          style={{ backgroundImage: "url('/assets/RadBanner1920_1080.png')" }} 
        />
        <div className="cinematic-hero-overlay" />
        <div className="cinematic-hero-content">
          <p className="cinematic-eyebrow">Activations</p>
          <h1 className="cinematic-title">Open for the right partners.</h1>
          <p className="cinematic-desc">
            RAD does not need fake sponsor walls. This page clearly communicates what kinds of collaborations are open right now.
          </p>
        </div>
      </section>

      <section className="cinematic-section">
        <span className="cinematic-item-eyebrow">Sponsorship</span>
        <h2 className="cinematic-item-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem' }}>Brand-ready without fake logos.</h2>
        <p className="cinematic-desc" style={{ marginBottom: '3rem' }}>
          RAD is currently positioning for activations, sponsorships, and creator-facing campaigns. This operates as an invitation into our highly engaged demographic, not a placeholder graveyard.
        </p>
        
        <Link href="/contact" className="hud-action" style={{ marginBottom: '4rem' }}>
          Contact RAD
        </Link>
        
        <div className="cinematic-grid">
          {partners.map((partner) => (
            <div key={partner.name} className="cinematic-item" style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2rem' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#000' }}>
                {partner.name.substring(0, 2).toUpperCase()}
              </div>
              <div style={{ alignSelf: 'center' }}>
                <span className="cinematic-item-eyebrow" style={{ color: 'var(--muted)' }}>{partner.tier}</span>
                <h3 className="cinematic-item-title" style={{ fontSize: '1.6rem', margin: '0.2rem 0' }}>{partner.name}</h3>
                <p className="cinematic-item-desc">{partner.description}</p>
                <Link href={partner.href} style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--red)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }} target="_blank" rel="noopener noreferrer">
                  Contact
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
