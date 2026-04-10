import type { Metadata } from "next";

import { aboutSummary, orgTimeline, orgValues, igniteSchedule } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "The RAD Esports story, milestones, values, and competitive identity."
};

export default function AboutPage() {
  return (
    <main className="cinematic-main">
      {/* Hero Section */}
      <section className="cinematic-hero">
        <div 
          className="cinematic-hero-bg" 
          style={{ backgroundImage: "url('/assets/RadBannerNewTest300ppi.png')" }} 
        />
        <div className="cinematic-hero-overlay" />
        <div className="cinematic-hero-content">
          <p className="cinematic-eyebrow">About RAD</p>
          <h1 className="cinematic-title">The Standard of Excellence.</h1>
          <p className="cinematic-desc">
            World champions. EMEA title holders. Built from the ground up to redefine the competitive landscape.
          </p>
        </div>
      </section>

      {/* Identity */}
      <section className="cinematic-section">
        <span className="cinematic-item-eyebrow">Identity</span>
        <h2 className="cinematic-item-title" style={{ maxWidth: '800px', fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '3rem' }}>
          RAD didn't wait for permission.
        </h2>
        <p className="cinematic-desc" style={{ maxWidth: '800px', fontSize: '1.25rem', color: '#fff', marginBottom: '4rem' }}>
          {aboutSummary}
        </p>

        <div className="cinematic-grid">
          <div className="cinematic-item">
            <h3 className="cinematic-item-title" style={{ fontSize: '1.8rem', color: 'var(--red)' }}>World Champions</h3>
            <p className="cinematic-item-desc">
              RAD cemented its place as the inaugural Marvel Rivals Ignite: Mid-Season World Champions.
            </p>
          </div>
          <div className="cinematic-item">
            <h3 className="cinematic-item-title" style={{ fontSize: '1.8rem', color: 'var(--red)' }}>EMEA Champions</h3>
            <p className="cinematic-item-desc">
              The org most recently added the EMEA Regional Champions title to its record.
            </p>
          </div>
          <div className="cinematic-item">
            <h3 className="cinematic-item-title" style={{ fontSize: '1.8rem', color: 'var(--red)' }}>#GoWild</h3>
            <p className="cinematic-item-desc">
              You've seen RAD do it before. Get ready to see it again. Welcome to the wild.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="cinematic-section">
        <span className="cinematic-item-eyebrow">Our Pillars</span>
        <h2 className="cinematic-item-title" style={{ marginBottom: '4rem' }}>Standards that shape the org.</h2>
        
        <div className="cinematic-grid">
          {orgValues.map((value) => (
            <div key={value.title} className="cinematic-item">
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>{value.icon}</span>
              <h3 className="cinematic-item-title" style={{ fontSize: '1.5rem' }}>{value.title}</h3>
              <p className="cinematic-item-desc">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="cinematic-section">
        <span className="cinematic-item-eyebrow">Timeline</span>
        <h2 className="cinematic-item-title">How RAD moved fast.</h2>
        
        <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {orgTimeline.map((event, i) => (
            <div key={i} style={{ borderLeft: '2px solid var(--red)', paddingLeft: '2rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: '-6px', width: '10px', height: '10px', background: 'var(--red)', borderRadius: '50%' }} />
              <span style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{event.date}</span>
              <h4 className="cinematic-item-title" style={{ fontSize: '1.4rem', margin: '0.5rem 0' }}>{event.title}</h4>
              <p className="cinematic-item-desc" style={{ maxWidth: '600px' }}>{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="cinematic-section">
        <span className="cinematic-item-eyebrow">2026 Roadmap</span>
        <h2 className="cinematic-item-title">The road to Ignite.</h2>
        
        <div className="cinematic-grid">
          {igniteSchedule.map((item, i) => (
            <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
              <span className="cinematic-item-eyebrow" style={{ color: 'var(--muted)' }}>{item.dates}</span>
              <h3 className="cinematic-item-title" style={{ fontSize: '1.4rem' }}>{item.stage}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
