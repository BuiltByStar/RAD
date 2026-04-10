import Link from "next/link";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  actionHref?: string;
  actionLabel?: string;
}

export function SectionHeading({
  title,
  eyebrow,
  description,
  actionHref,
  actionLabel
}: SectionHeadingProps) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      {eyebrow && <span className="cinematic-item-eyebrow">{eyebrow}</span>}
      <h2 className="cinematic-item-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1rem' }}>
        {title}
      </h2>
      {description && (
        <p className="cinematic-item-desc" style={{ maxWidth: '800px', fontSize: '1.25rem', color: '#fff' }}>
          {description}
        </p>
      )}
      {actionHref && actionLabel && (
        <div style={{ marginTop: '2rem' }}>
          <Link href={actionHref} className="hud-action">
            {actionLabel}
          </Link>
        </div>
      )}
    </div>
  );
}

// Keep ContactGrid around for contact-page if it's imported there
export function ContactGrid({ channels }: { channels: any[] }) {
  return (
    <div className="cinematic-grid">
      {channels.map((ch) => (
        <div key={ch.id} className="cinematic-item" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
          <h3 className="cinematic-item-title" style={{ fontSize: '1.4rem', color: 'var(--red)', marginBottom: '0.2rem' }}>{ch.title}</h3>
          <p className="cinematic-item-desc">{ch.description}</p>
          <div style={{ marginTop: '0.5rem', opacity: 0.8 }}>{ch.value}</div>
        </div>
      ))}
    </div>
  );
}
