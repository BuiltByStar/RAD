import Image from "next/image";
import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  heroImage?: string;
  heroNote?: ReactNode;
  children: ReactNode;
};

export function PageShell({
  title,
  eyebrow,
  description,
  heroImage = "/assets/RadBanner1920_1080.png",
  heroNote,
  children
}: PageShellProps) {
  return (
    <main className="rad-page">
      <section className="rad-page__banner" aria-hidden="true">
        <div className="rad-page__media">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="rad-page__image"
          />
        </div>
        <div className="rad-page__overlay" />
      </section>

      <section className="rad-page__intro">
        <div className="container rad-page__intro-grid">
          <div className="rad-page__intro-copy">
            <p className="rad-kicker">{eyebrow}</p>
            <h1 className="rad-display rad-display--page">{title}</h1>
            <p className="rad-lead">{description}</p>
          </div>
          {heroNote ? <aside className="rad-page__intro-note">{heroNote}</aside> : null}
        </div>
      </section>

      {children}
    </main>
  );
}
