import Link from "next/link";

import { DivisionsShowcase } from "@/components/divisions-showcase";
import {
  aboutSummary,
  contactChannels,
  partners,
  players,
  siteTagline,
  stats,
  teams
} from "@/lib/site-data";
import { getPostMeta } from "@/lib/posts";
import { ScrollReveal } from "@/components/scroll-effects";
import { DiscordSection } from "@/components/discord-section";
import { NavHub } from "@/components/nav-hub";

export default async function HomePage() {
  const latestPosts = await getPostMeta();
  const rosterPreview = players.slice(0, 5);

  return (
    <main style={{ position: "relative", overflow: "hidden" }}>
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

      {/* ── NAVIGATION HUB ────────────────────────────────────────── */}
      <NavHub />

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
            <Link href="/teams" className="at-link-arrow">View team →</Link>
          </div>
          <ScrollReveal delay={0.2}>
            <div className="at-roster-list">
              {rosterPreview.map((player, i) => (
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

      {/* ── DISCORD ──────────────────────────────────────────────── */}
      <DiscordSection />

      {/* ── CONNECT ──────────────────────────────────────────────── */}
      <section className="section section-dark">
        <div className="container">
          <div className="at-section-row" data-reveal>
            <p className="at-section-label">Connect</p>
            <Link href="/contact" className="at-link-arrow">Contact RAD →</Link>
          </div>
          <div className="contact-grid">
            {contactChannels.map((channel) => (
              <a key={channel.label} href={channel.href} className="contact-tile">
                <p className="eyebrow">{channel.label}</p>
                <strong>{channel.value}</strong>
              </a>
            ))}
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
