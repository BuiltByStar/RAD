import Link from "next/link";

import { DivisionsShowcase } from "@/components/divisions-showcase";
import {
  aboutSummary,
  contactChannels,
  partners,
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

  return (
    <main className="page-main" style={{ position: "relative", overflow: "hidden", zIndex: 2 }}>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="at-hero">
        <div className="at-hero-overlay" style={{ background: 'linear-gradient(to top, #010101 0%, transparent 60%)' }} />

        <ScrollReveal className="at-hero-content" delay={0.2}>
          <p className="at-hero-kicker text-[#ff3333] font-bold tracking-[0.3em]">
            Multi-title Esports Organization &nbsp;·&nbsp; Est. 2025
          </p>
          <img
            src="/assets/RadNewLogoWordmarkWhite.png"
            alt="RAD Esports"
            className="at-hero-brand"
            style={{ filter: "drop-shadow(0 0 20px rgba(255,50,50,0.3))" }}
          />
          <div className="at-hero-sub" style={{ marginTop: "2rem", display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <p className="at-hero-tagline max-w-2xl text-xl font-bold" style={{ textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>
              {siteTagline}
            </p>
            
            {/* Integrated Stats into Hero */}
            <div className="at-stats-grid" style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap',  background: 'rgba(0,0,0,0.3)', padding: '1.5rem 2.5rem', borderRadius: '16px 0 16px 0', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
              {stats.map((s, idx) => (
                <div key={s.label} className="at-stat-block" style={{ margin: 0 }}>
                  <div className="at-stat-value" style={{ fontSize: '3rem', lineHeight: 0.8, color: 'var(--red-hi)' }}>{s.value}</div>
                  <div className="at-stat-label" style={{ fontSize: '0.65rem', marginTop: '0.5rem', color: '#fff' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── TICKER ────────────────────────────────────────────────── */}
      <div className="at-ticker-wrap" style={{ transform: 'rotate(-2deg) scale(1.05)', marginTop: '-3rem', zIndex: 10 }}>
        <div className="at-ticker-inner">
          <span className="at-ticker-item"><span>✦</span> UNTAMED</span>
          <span className="at-ticker-item"><span>✦</span> UNSTOPPABLE</span>
          <span className="at-ticker-item"><span>✦</span> NEVER BY THE BOOK</span>
          <span className="at-ticker-item"><span>✦</span> RAD ESPORTS</span>
          <span className="at-ticker-item"><span>✦</span> WORLD CHAMPIONS</span>
          <span className="at-ticker-item"><span>✦</span> #RADWIN</span>
          <span className="at-ticker-item"><span>✦</span> PURE PRESTIGE</span>
          <span className="at-ticker-item"><span>✦</span> THE NEXT STAGE</span>
          {/* Loop duplication */}
          <span className="at-ticker-item"><span>✦</span> UNTAMED</span>
          <span className="at-ticker-item"><span>✦</span> UNSTOPPABLE</span>
          <span className="at-ticker-item"><span>✦</span> NEVER BY THE BOOK</span>
          <span className="at-ticker-item"><span>✦</span> RAD ESPORTS</span>
          <span className="at-ticker-item"><span>✦</span> WORLD CHAMPIONS</span>
          <span className="at-ticker-item"><span>✦</span> #RADWIN</span>
          <span className="at-ticker-item"><span>✦</span> PURE PRESTIGE</span>
          <span className="at-ticker-item"><span>✦</span> THE NEXT STAGE</span>
        </div>
      </div>

      {/* ── NAVIGATION HUB ────────────────────────────────────────── */}
      <div style={{ marginTop: '3rem', position: 'relative', zIndex: 5 }}>
        <NavHub />
      </div>

      {/* ── STATEMENT ─────────────────────────────────────────────── */}
      <section className="at-statement" style={{ marginTop: '-5rem', paddingTop: '10rem', clipPath: 'polygon(0 8%, 100% 0, 100% 100%, 0 100%)', background: 'linear-gradient(180deg, #020205 0%, var(--bg) 100%)' }}>
        <div className="at-statement-inner">
          <p className="at-statement-text at-hover-sheen-text" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', WebkitTextStroke: '1px rgba(255,255,255,0.1)', color: 'transparent', backgroundImage: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0.2))', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
            Built for pressure.<br />
            Wired for competition.<br />
            Ready to scale.
          </p>
          <ScrollReveal delay={0.2} className="at-statement-aside">
            <div style={{ background: 'var(--surface-md)', padding: '2rem', borderRadius: '0 24px 0 24px', borderLeft: '3px solid var(--red)' }}>
              <p>
                {aboutSummary}
              </p>
              <Link href="/about" className="at-link-arrow">
                About RAD →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ACTIVE DIVISIONS ──────────────────────────────────────── */}
      <DivisionsShowcase teams={teams} />

      {/* STATS REMOVED FROM HERE (INTEGRATED INTO HERO) */}

      {/* ── ABOUT ─────────────────────────────────────────────────── */}
      <section className="at-roster">
        <div className="container">
          <div className="at-section-row" data-reveal>
            <p className="at-section-label">Roster</p>
            <Link href="/roster" className="at-link-arrow">Open roster page →</Link>
          </div>
          <ScrollReveal delay={0.2}>
            <div className="at-roster-list">
              <div className="at-roster-item" data-reveal>
                <span className="at-roster-idx">01</span>
                <div className="at-roster-info">
                  <h3 className="at-roster-name">Featured Division</h3>
                  <span className="at-roster-role">Championship Core</span>
                </div>
                <span className="at-roster-desc">
                  The current lineup is anchored by RAD's world-title roster while the brand scales across future titles and activations.
                </span>
                <span className="at-roster-team">Lineup</span>
              </div>
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
