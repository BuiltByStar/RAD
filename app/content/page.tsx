import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/sections";
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
          <SectionHeading
            eyebrow="Featured Video"
            title="Lead with the strongest RAD story."
            description="A hero slot for the biggest release, championship recap, or announcement so the content page opens with a clear priority."
            actionHref="https://www.youtube.com/@RadEsport"
            actionLabel="Visit YouTube"
          />
          <YouTubeFeatured />
        </div>
      </section>

      {/* ── Video Library ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Recent Uploads"
            title="Everything RAD is publishing."
            description="A cleaner archive for videos, highlights, and story-driven media without the page turning into a long undifferentiated feed."
          />
          <YouTubeLibrary />
        </div>
      </section>

      {/* ── Twitch Creators ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="RAD Creators"
            title="Live presence across stream and socials."
            description="Track the org's creator-facing side in one place, with live Twitch status and room for future creator expansion."
          />
          <TwitchCreators />
        </div>
      </section>
    </PageShell>
  );
}
