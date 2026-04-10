"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

export function DiscordSection() {
  return (
    <section className="cinematic-section" style={{ borderTop: 'none', padding: '0 2rem 5rem' }}>
      <div style={{ background: '#18191c', padding: '4rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Aggressive radial glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(88,101,242,0.15) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
          <FontAwesomeIcon icon={faDiscord} style={{ fontSize: '3rem', color: '#5865F2', marginBottom: '1.5rem' }} />
          <h2 className="cinematic-item-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Join the vanguard.</h2>
          <p className="cinematic-desc" style={{ margin: '0 auto 2.5rem' }}>
            The official RAD Esports server. Scrims, community brackets, and direct lines to the roster.
          </p>
          <a
            href="https://discord.gg/RADesports"
            target="_blank"
            rel="noopener noreferrer"
            className="hud-action"
            style={{ 
              borderColor: '#5865F2', 
              color: '#fff', 
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#5865F2';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(88,101,242,0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Enter the Server
          </a>
        </div>
      </div>
    </section>
  );
}
