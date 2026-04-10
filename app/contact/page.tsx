import type { Metadata } from "next";
import { contactChannels } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out to RAD Esports for partnerships, talent queries, or community feedback."
};

export default function ContactPage() {
  return (
    <main className="cinematic-main">
      <section className="cinematic-hero">
        <div 
          className="cinematic-hero-bg" 
          style={{ backgroundImage: "url('/assets/RadBannerNewTest300ppi.png')" }} 
        />
        <div className="cinematic-hero-overlay" />
        <div className="cinematic-hero-content">
          <p className="cinematic-eyebrow">Comms</p>
          <h1 className="cinematic-title">Direct lines.</h1>
          <p className="cinematic-desc">
            No dead ends. Reach out directly for partnerships, talent queries, or community feedback.
          </p>
        </div>
      </section>

      <section className="cinematic-section" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '4rem' }}>
        
        {/* Contact Form */}
        <div>
          <span className="cinematic-item-eyebrow">Inquiries</span>
          <h2 className="cinematic-item-title" style={{ marginBottom: '3rem' }}>Send a strictly business message.</h2>
          
          <form className="cinematic-form">
            <input type="text" className="cinematic-input" placeholder="Your Name" required />
            <input type="email" className="cinematic-input" placeholder="Your Email" required />
            <select className="cinematic-input" required>
              <option value="" disabled selected>Select Inquiry Type</option>
              <option value="partnership">Partnership & Sponsorship</option>
              <option value="talent">Talent & Scouting</option>
              <option value="press">Press & Media</option>
              <option value="other">General</option>
            </select>
            <textarea className="cinematic-input" placeholder="Your Message" rows={4} required></textarea>
            
            <button type="submit" className="hud-action" style={{ width: '100%', marginTop: '1rem', cursor: 'pointer' }}>
              Submit Inquiry
            </button>
          </form>
        </div>

        {/* Channels */}
        <div>
          <span className="cinematic-item-eyebrow">Channels</span>
          <h2 className="cinematic-item-title" style={{ marginBottom: '3rem' }}>Direct emails.</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {contactChannels.map((channel) => (
              <div key={channel.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
                <h3 className="cinematic-item-title" style={{ fontSize: '1.4rem', color: 'var(--red)', marginBottom: '0.2rem' }}>{channel.title}</h3>
                <p className="cinematic-item-desc" style={{ marginBottom: '0.5rem' }}>{channel.description}</p>
                <div style={{ display: 'flex', gap: '0.5rem', color: '#fff', fontSize: '0.9rem', opacity: 0.8 }}>
                  <span>{channel.icon}</span> <span>{channel.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
