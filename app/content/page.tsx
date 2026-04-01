import { PageShell } from "@/components/page-shell";
import { YouTubeFeatured } from "@/components/youtube-featured";
import { YouTubeLibrary } from "@/components/youtube-library";
import { TwitchCreators } from "@/components/twitch-creators";

export default function ContentPage() {
  return (
    <PageShell
      eyebrow="Content"
      title="Content Hub."
      description="Latest videos, streams, and media from RAD Esports."
      background="red"
    >
      {/* ── Featured Video ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="at-section-row" style={{ marginBottom: "2rem" }}>
            <p className="at-section-label">Featured Video</p>
            <a
              href="https://www.youtube.com/@RadEsport"
              target="_blank"
              rel="noopener noreferrer"
              className="at-link-arrow"
            >
              Visit YouTube →
            </a>
          </div>
          <YouTubeFeatured />
        </div>
      </section>

      {/* ── Video Library ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="at-section-row" style={{ marginBottom: "2rem" }}>
            <p className="at-section-label">Recent Uploads</p>
          </div>
          <YouTubeLibrary />
        </div>
      </section>

      {/* ── Twitch Creators ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="at-section-row" style={{ marginBottom: "2rem" }}>
            <p className="at-section-label">RAD Creators</p>
            <span className="at-section-label" style={{ color: "var(--dim)" }}>
              Twitch Live Status
            </span>
          </div>
          <TwitchCreators />
        </div>
      </section>
    </PageShell>
  );
}
