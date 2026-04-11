import Link from "next/link";

export default function NotFound() {
  return (
    <main className="rad-page">
      <section className="rad-section">
        <div className="container">
          <div className="rad-empty-state">
            <p className="rad-kicker">404</p>
            <h1 className="rad-section__title">That page does not exist.</h1>
            <p className="rad-copy">
              The route was not found. Use the main navigation or jump back to the homepage.
            </p>
            <div className="rad-action-row">
              <Link href="/" className="rad-button">
                Back to home
              </Link>
              <Link href="/content" className="rad-button rad-button--ghost">
                Browse content
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
