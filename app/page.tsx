import Link from "next/link";

import { DivisionsShowcase } from "@/components/divisions-showcase";
import { MarqueeStrip } from "@/components/marquee-strip";
import {
  aboutSummary,
  contactChannels,
  discordInviteUrl,
  discordWidgetUrl,
  partners,
  players,
  siteTagline,
  stats,
  teams
} from "@/lib/site-data";
import { getPostMeta } from "@/lib/posts";
import { ScrollReveal, ParallaxBackgroundText } from "@/components/scroll-effects";
import { InteractiveNavHub } from "@/components/interactive-nav-hub";

export default async function HomePage() {
  const latestPosts = await getPostMeta();

  return (
    <main style={{ position: "relative", overflow: "hidden" }}>
      {/* Background Parallax Typography */}
      <ParallaxBackgroundText text="PRESSURE" speed={0.8} top="25%" left="-5%" />
      <ParallaxBackgroundText text="OBSIDIAN" speed={1.2} top="55%" left="10%" />
      <ParallaxBackgroundText text="COMPETE" speed={1.0} top="85%" left="-2%" />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="at-hero">
        <div className="at-hero-overlay" style={{ background: 'linear-gradient(to top, #010101 0%, transparent 60%)' }} />

        <div className="at-hero-content">
          <p className="at-hero-kicker">
            Competitive Esports Organization &nbsp;·&nbsp; Est. 2025
          </p>
          <h1 className="at-hero-title">
            RAD<br />
            <span className="at-red">Esports</span>
          </h1>
          <div className="at-hero-sub">
            <p className="at-hero-tagline">
              {siteTagline}
            </p>
            <div className="at-hero-scroll-hint">
              <span className="at-scroll-line" />
              <span>Scroll</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE 3D NAV ────────────────────────────────────── */}
      <InteractiveNavHub />

      {/* ── MARQUEE ───────────────────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── STATEMENT ─────────────────────────────────────────────── */}
      <section className="at-statement">
        <div className="at-statement-inner">
          <p className="at-statement-text">
            Built for <em>pressure</em>.<br />
            Wired for <em>competition</em>.<br />
            Ready to scale.
          </p>
          <ScrollReveal delay={0.2} className="at-statement-aside">
            <p>
              {aboutSummary}
            </p>
            <Link href="/about" className="at-link-arrow">
              About RAD →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ACTIVE DIVISIONS ──────────────────────────────────────── */}
      <DivisionsShowcase teams={teams} />

      {/* ── MARQUEE (reversed) ────────────────────────────────────── */}
      <MarqueeStrip reverse />

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="at-stats">
        <div className="container">
          <ScrollReveal delay={0.1}>
            <div className="at-stats-grid">
              {stats.map((s, idx) => (
                <div key={s.label} className="at-stat-block" data-reveal data-delay={idx + 1}>
                  <div className="at-stat-value">{s.value}</div>
                  <div className="at-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ROSTER ────────────────────────────────────────────────── */}
      <section className="at-roster">
        <div className="container">
          <div className="at-section-row" data-reveal>
            <p className="at-section-label">Active Roster</p>
            <Link href="/roster" className="at-link-arrow">View all →</Link>
          </div>
          <ScrollReveal delay={0.2}>
            <div className="at-roster-list">
              {players.map((player, i) => (
                <div key={player.name} className="at-roster-item" data-reveal>
                  <span className="at-roster-idx">0{i + 1}</span>
                  <div className="at-roster-info">
                    <h3 className="at-roster-name">{player.name}</h3>
                    <span className="at-roster-role">{player.role}</span>
                  </div>
                  <span className="at-roster-desc">{player.descriptor}</span>
                  <span className="at-roster-team">{player.group}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CONTENT ───────────────────────────────────────────────── */}
      <section className="at-content">
        <div className="container">
          <div className="at-section-row" data-reveal>
            <p className="at-section-label">Latest Content</p>
            <Link href="/content" className="at-link-arrow">Browse all →</Link>
          </div>
          <ScrollReveal delay={0.2}>
            <div className="at-content-grid">
              {latestPosts.slice(0, 3).map((post, idx) => (
                <Link
                  key={post.slug}
                  href={`/content/${post.slug}`}
                  className="at-post-tile"
                  data-reveal
                  data-delay={idx + 1}
                >
                  <span className="at-post-cat">{post.category}</span>
                  <h3 className="at-post-title">{post.title}</h3>
                  <p className="at-post-summary">{post.summary}</p>
                  <span className="at-post-date">{post.date}</span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── COMMUNITY CTA ─────────────────────────────────────────── */}
      <section className="at-community">
        <div className="at-community-video">
          <video autoPlay muted loop playsInline>
            <source src="/assets/DiscordRadPFPAnimated.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="at-community-shell">
          <div className="at-community-content">
            <p className="at-section-label">Discord</p>
            <h2 className="at-community-title">
              Join<br />The<br /><em>Community.</em>
            </h2>
            <p className="at-community-body">
              The RAD server is live now. Get in early for announcements,
              clips, team conversation, and the direct community pulse while the
              org keeps building upward.
            </p>
            <div className="at-community-channels">
              {contactChannels.map((ch) => (
                <a key={ch.label} href={ch.href} className="at-channel-item">
                  <span className="at-channel-label">{ch.label}</span>
                  <span className="at-channel-value">{ch.value}</span>
                </a>
              ))}
            </div>
            <div className="at-community-actions">
              <a className="btn btn-primary" href={discordInviteUrl}>
                Join Discord
              </a>
              <a className="btn btn-secondary" href="https://x.com/RADesport">
                Follow on X
              </a>
            </div>
          </div>

          <div className="at-discord-panel">
            <div className="at-discord-panel-head">
              <span className="at-discord-dot" />
              <p>Live Server Widget</p>
            </div>
            <iframe
              src={discordWidgetUrl}
              title="RAD Discord Server"
              width="100%"
              height="420"
              allowTransparency={true}
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              className="at-discord-widget"
            />
          </div>
        </div>
      </section>

      {/* ── PARTNERS ──────────────────────────────────────────────── */}
      <section className="at-partners">
        <div className="container">
          <div className="at-partners-inner">
            <span className="at-section-label" style={{ marginBottom: 0 }} data-reveal>
              Partners
            </span>
            <div className="at-partners-logos">
              {partners.map((p, idx) => (
                <a key={p.name} href={p.href} className="at-partner-item" data-reveal data-delay={idx + 1}>
                  {p.name === "GoWild" ? (
                    <img
                      src="/assets/Gowild.png"
                      alt="GoWild"
                      className="at-partner-logo-img"
                    />
                  ) : (
                    <span className="at-partner-name">{p.name}</span>
                  )}
                  <span className="at-partner-tier">{p.tier}</span>
                </a>
              ))}
            </div>
            <Link href="/partners" className="at-link-arrow">
              Partner with RAD →
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
