"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="rad-page">
      <section className="rad-section">
        <div className="container">
          <div className="rad-empty-state">
            <p className="rad-kicker">Error</p>
            <h1 className="rad-section__title">Something went wrong.</h1>
            <p className="rad-copy">
              The page hit an unexpected runtime error. You can retry the route without leaving the site.
            </p>
            <div className="rad-action-row">
              <button type="button" className="rad-button" onClick={reset}>
                Try again
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
