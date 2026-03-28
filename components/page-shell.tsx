import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  background?: "red" | "black";
  children: ReactNode;
};

export function PageShell({
  title,
  eyebrow,
  description,
  background = "black",
  children
}: PageShellProps) {
  return (
    <main className="page-main">
      <section className={`page-hero page-hero-${background}`}>
        <div className="page-overlay" />
        <div className="container page-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="section-copy">{description}</p>
        </div>
      </section>
      <div className="page-content">{children}</div>
    </main>
  );
}
