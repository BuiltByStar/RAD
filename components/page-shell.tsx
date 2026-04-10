import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  background?: string;
  heroImage?: string;
  heroType?: string;
  children: ReactNode;
};

export function PageShell({
  title,
  eyebrow,
  description,
  heroImage = "/assets/RadPlayerBannerPNG8.png",
  children
}: PageShellProps) {
  return (
    <main className="cinematic-main">
      <section className="cinematic-hero">
        <div 
          className="cinematic-hero-bg" 
          style={{ backgroundImage: `url('${heroImage}')` }} 
        />
        <div className="cinematic-hero-overlay" />
        <div className="cinematic-hero-content">
          <p className="cinematic-eyebrow">{eyebrow}</p>
          <h1 className="cinematic-title">{title}</h1>
          <p className="cinematic-desc">{description}</p>
        </div>
      </section>

      <div className="cinematic-section" style={{ borderTop: 'none' }}>
        {children}
      </div>
    </main>
  );
}
