import type { CSSProperties, ReactNode } from "react";

type PageShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  background?: "red" | "black";
  heroImage?: string;
  heroType?: string;
  children: ReactNode;
};

export function PageShell({
  title,
  eyebrow,
  description,
  background = "black",
  heroImage,
  heroType = "standard",
  children
}: PageShellProps) {
  const heroStyle = heroImage
    ? ({ backgroundImage: `url(${heroImage})` } satisfies CSSProperties)
    : undefined;

  return (
    <main className="page-main">
      <section
        className={`page-hero page-hero-${background} page-hero--${heroType}`}
        style={heroStyle}
        aria-hidden="true"
      >
        <div className="page-overlay" />
      </section>

      <section className="page-hero-intro">
        <div className="container page-hero-copy">
          <p className="section-kicker">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="section-copy page-hero-description">{description}</p>
        </div>
      </section>

      <div className="page-content">{children}</div>
    </main>
  );
}
