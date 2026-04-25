"use client";

// Inline Discord SVG
const DiscordIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 127.14 96.36" 
    style={{ width: '48px', height: '48px', fill: '#5865F2', marginBottom: '1.5rem' }}
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a67.58,67.58,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.1,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

export function DiscordSection() {
  return (
    <section className="cinematic-section" style={{ borderTop: 'none', padding: '0 2rem 5rem' }}>
      <div style={{ background: '#18191c', padding: '4rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Aggressive radial glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(88,101,242,0.15) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
          <DiscordIcon />
          <h2 className="cinematic-item-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Join the vanguard.</h2>
          <p className="cinematic-desc" style={{ margin: '0 auto 2.5rem' }}>
            The official RAD Esports server. Scrims, community brackets, and direct lines to the roster.
          </p>
          <a
            href="https://discord.com/invite/radgg"
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
