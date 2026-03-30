import Link from "next/link";

import { InteractiveNavHub } from "@/components/interactive-nav-hub";
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

export default async function HomePage() {
  const latestPosts = await getPostMeta();
  const featuredTeam = teams[0];
  const rosterPreview = players.slice(0, 6);

  return (
    <main className="ig-home">
      <section className="ig-hero">
        <div className="container ig-hero-grid">
          <div className="ig-hero-copy">
            <p className="ig-kicker">RAD Esports · Marvel Rivals Champions</p>
            <h1 className="ig-hero-title">
              Clean pressure.
              <br />
              Loud results.
            </h1>
            <p className="ig-hero-tagline">{siteTagline}</p>
            <p className="ig-hero-body">{aboutSummary}</p>

            <div className="ig-hero-actions">
              <Link href="/teams" className="ig-btn ig-btn-primary">
                Explore Team
              </Link>
              <Link href="/content" className="ig-btn ig-btn-secondary">
                Read Content
              </Link>
            </div>

            <div className="ig-login-note">
              Member access runs through Discord login in the header.
            </div>
          </div>

          <div className="ig-hero-model-shell">
            <div className="ig-hero-model-frame">
              <InteractiveNavHub />
            </div>
            <div className="ig-hero-model-caption">
              Interactive hub for team, content, and brand discovery.
            </div>
          </div>
        </div>
      </section>

      <section className="ig-proof">
        <div className="container ig-proof-grid">
          <article className="ig-feature-panel">
            <p className="ig-section-label">Featured Division</p>
            <h2>{featuredTeam.name}</h2>
            <p>{featuredTeam.description}</p>
            <div className="ig-feature-meta">
              <span>{featuredTeam.status}</span>
              <span>{featuredTeam.game}</span>
            </div>
          </article>

          <div className="ig-stats-grid">
            {stats.map((stat) => (
              <article key={stat.label} className="ig-stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ig-team-section">
        <div className="container">
          <div className="ig-section-head">
            <div>
              <p className="ig-section-label">Teams</p>
              <h2>Roster lives with the team.</h2>
            </div>
            <Link href="/teams" className="ig-text-link">
              Full team page
            </Link>
          </div>

          <div className="ig-team-surface">
            <article className="ig-team-card">
              <div className="ig-team-card-top">
                <span className="ig-badge">{featuredTeam.status}</span>
                <span className="ig-team-title">{featuredTeam.game}</span>
              </div>
              <h3>{featuredTeam.name}</h3>
              <p>{featuredTeam.description}</p>
            </article>

            <div className="ig-roster-preview-grid">
              {rosterPreview.map((player) => (
                <article key={player.name} className="ig-player-card">
                  <div className="ig-player-topline">
                    <span>{player.group}</span>
                    <span>{player.role}</span>
                  </div>
                  <h3>{player.name}</h3>
                  <p>{player.descriptor}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ig-content-section">
        <div className="container">
          <div className="ig-section-head">
            <div>
              <p className="ig-section-label">Content</p>
              <h2>Editorial surface, not filler.</h2>
            </div>
            <Link href="/content" className="ig-text-link">
              All posts
            </Link>
          </div>

          <div className="ig-content-grid">
            {latestPosts.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/content/${post.slug}`} className="ig-post-card">
                <span className="ig-post-meta">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <span className="ig-post-date">{post.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ig-contacts-section">
        <div className="container ig-contacts-surface">
          <div>
            <p className="ig-section-label">Connect</p>
            <h2>Direct lines only.</h2>
          </div>

          <div className="ig-contact-rail">
            {contactChannels.map((channel) => (
              <a key={channel.label} href={channel.href} className="ig-contact-pill">
                <span>{channel.label}</span>
                <strong>{channel.value}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="ig-partners-section">
        <div className="container">
          <div className="ig-section-head">
            <div>
              <p className="ig-section-label">Partners</p>
              <h2>Ready for brand alignment.</h2>
            </div>
            <Link href="/partners" className="ig-text-link">
              Partnership page
            </Link>
          </div>

          <div className="ig-partner-strip">
            {partners.map((partner) => (
              <a key={partner.name} href={partner.href} className="ig-partner-pill">
                <span className="ig-partner-tier">{partner.tier}</span>
                <strong>{partner.name}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
