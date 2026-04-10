import Link from "next/link";

import { DiscordSection } from "@/components/discord-section";
import { ContactGrid, SectionHeading } from "@/components/sections";
import { getFeaturedPost, getPostMeta } from "@/lib/posts";
import {
  aboutSummary,
  contactChannels,
  partners,
  players,
  siteTagline,
  staff,
  stats,
  teams
} from "@/lib/site-data";

export default async function HomePage() {
  const [featuredPost, latestPosts] = await Promise.all([
    getFeaturedPost(),
    getPostMeta()
  ]);

  const featuredTeam = teams[0];
  const rosterPreview = players.slice(0, 4);
  const staffPreview = staff.slice(0, 3);
  const secondaryPosts = latestPosts
    .filter((post) => post.slug !== featuredPost.slug)
    .slice(0, 2);

  return (
    <main className="page-main home-page">
      <section className="home-hero">
        <div className="home-hero__media" />
        <div className="home-hero__overlay" />

        <div className="container home-hero__inner">
          <p className="section-kicker home-hero__kicker">
            Multi-title esports organization
          </p>

          <img
            src="/assets/RadNewLogoWordmarkWhite.png"
            alt="RAD Esports"
            className="home-hero__logo"
          />

          <div className="home-hero__content">
            <div className="home-hero__copy">
              <p className="home-hero__tagline">{siteTagline}</p>
              <p className="home-hero__body">
                Forged in competition. Powered by an unrelenting drive to dominate the highest tiers of global esports.
              </p>
            </div>

            <div className="home-hero__actions">
              <Link href="/roster" className="btn btn-primary">
                View roster
              </Link>
              <Link href="/about" className="btn btn-secondary">
                About RAD
              </Link>
            </div>
          </div>

          <div className="home-hero__stats">
            {stats.map((item) => (
              <div key={item.label} className="home-stat">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="home-ticker" aria-hidden="true">
        <div className="home-ticker__track">
          <span>Untamed</span>
          <span>Unstoppable</span>
          <span>Never By The Book</span>
          <span>RAD.GG</span>
          <span>#GoWild</span>
          <span>World Champions</span>
          <span>Content First</span>
          <span>Untamed</span>
          <span>Unstoppable</span>
          <span>Never By The Book</span>
          <span>RAD.GG</span>
          <span>#GoWild</span>
          <span>World Champions</span>
          <span>Content First</span>
        </div>
      </div>

      <section className="section home-signal">
        <div className="container">
          <div className="home-signal__grid asymmetric-grid">
            <article className="home-signal__feature rad-card asym-item-wide">
              <div className="rad-card__body">
                <p className="section-kicker section-kicker--tight">Featured Division</p>
                <div className="card-topline">
                  <span className="card-status">{featuredTeam.status}</span>
                  <span>{featuredTeam.game}</span>
                </div>
                <h2>{featuredTeam.name}</h2>
                <p className="section-copy" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                  {featuredTeam.description}
                </p>
                <div className="home-signal__feature-actions">
                  <Link href="/roster" className="text-link">
                    Explore lineup
                  </Link>
                  <Link href="/content" className="text-link">
                    Watch content
                  </Link>
                </div>
              </div>
            </article>

            <div className="home-signal__rail asym-item-narrow">
              <Link href="/about" className="home-mini-panel">
                <p className="section-kicker section-kicker--tight">Culture</p>
                <h3>What RAD stands for.</h3>
                <p>Titles, culture, and the org story behind the current rise to the top.</p>
              </Link>

              <Link href="/content" className="home-mini-panel">
                <p className="section-kicker section-kicker--tight">Media</p>
                <h3>The editorial layer.</h3>
                <p>Highlights, stories, uploads, and raw moments that define our players.</p>
              </Link>

              <Link href="/contact" className="home-mini-panel">
                <p className="section-kicker section-kicker--tight">Connect</p>
                <h3>Start a conversation.</h3>
                <p>Partnerships, talent, press, and brand inquiries.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHeading
            eyebrow="The Legacy"
            title="A brand built to dominate."
            description="We exist to win, plain and simple. RAD is engineered to outpace the competition across every title we touch."
            actionHref="/about"
            actionLabel="Read the story"
          />

          <div className="home-story">
            <article className="home-story__lead">
              <p>{aboutSummary}</p>
            </article>

            <div className="home-story__cards asymmetric-grid">
              <article className="rad-card asym-item-narrow">
                <div className="rad-card__body">
                  <p className="section-kicker section-kicker--tight">Execution</p>
                  <h3 className="card-title">Championship Pedigree.</h3>
                  <p className="card-desc">Trophies aren't given, they're taken. Our flagship rosters already yield absolute results.</p>
                </div>
              </article>
              <article className="rad-card asym-item-narrow">
                <div className="rad-card__body">
                  <p className="section-kicker section-kicker--tight">Aesthetics</p>
                  <h3 className="card-title">Aggressive Identity.</h3>
                  <p className="card-desc">Unapologetic design. Black, white, and red pulse at the core of everything we build.</p>
                </div>
              </article>
              <article className="rad-card asym-item-narrow">
                <div className="rad-card__body">
                  <p className="section-kicker section-kicker--tight">Future</p>
                  <h3 className="card-title">Built to Scale.</h3>
                  <p className="card-desc">We aren't stopping at one title. Our infrastructure supports a global footprint.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Vanguard"
            title="The competitive core."
            description="World-class talent operating at the absolute peak of competition. Meet the names carrying the org right now."
            actionHref="/roster"
            actionLabel="Open full roster"
          />

          <div className="home-roster-preview split-layout">
            <div className="home-roster-preview__grid" style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
              {rosterPreview.map((player) => (
                <article key={player.slug} className="rad-card">
                  <div className="rad-card__body">
                    <div className="people-card__top">
                      <p className="section-kicker section-kicker--tight">{player.group}</p>
                      {typeof player.number === "number" ? (
                        <span className="people-card__index" style={{ color: 'var(--red)', fontWeight: 'bold' }}>#{String(player.number).padStart(2, "0")}</span>
                      ) : null}
                    </div>
                    <div className="people-card__body" style={{ marginTop: '1rem' }}>
                      <h3 className="people-card__name" style={{ fontSize: '1.4rem' }}>{player.name}</h3>
                      <p className="people-card__role" style={{ color: 'var(--text)', opacity: 0.8 }}>{player.role}</p>
                      <p className="people-card__desc" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>{player.descriptor}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="home-roster-preview__sidebar rad-card">
              <div className="rad-card__body">
                <p className="section-kicker section-kicker--tight">Infrastructure</p>
                <h3 style={{ fontSize: '1.8rem', margin: '0.5rem 0' }}>The Foundation.</h3>
                <p className="section-copy" style={{ marginBottom: '1.5rem' }}>
                  Elite players require elite backing. Our deep support staff guarantees the talent can perform when it matters most.
                </p>
                <ul className="home-list" style={{ listStyle: 'none', padding: 0 }}>
                  {staffPreview.map((member) => (
                    <li key={member.slug} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0', borderBottom: '1px solid var(--border-md)' }}>
                      <strong style={{ color: 'var(--text)' }}>{member.name}</strong>
                      <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{member.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container">
          <SectionHeading
            eyebrow="Media"
            title="The editorial lens."
            description="We don't just win; we tell the story of how we did it. Explore the moments that define RAD."
            actionHref="/content"
            actionLabel="Browse content"
          />

          <div className="home-editorial content-showcase">
            <Link href={`/content/${featuredPost.slug}`} className="featured-article">
              <img src={featuredPost.cover} alt={featuredPost.title} />
              <div className="featured-article-copy">
                <p className="section-kicker section-kicker--tight">{featuredPost.category}</p>
                <h3>{featuredPost.title}</h3>
                <p>{featuredPost.summary}</p>
                <span className="text-link">Open article</span>
              </div>
            </Link>

            <div className="post-stack">
              {secondaryPosts.map((post) => (
                <Link key={post.slug} href={`/content/${post.slug}`} className="post-card">
                  <p className="section-kicker section-kicker--tight">{post.category}</p>
                  <h3>{post.title}</h3>
                  <p>{post.summary}</p>
                  <span className="text-link">Read more</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DiscordSection />

      <section className="section section-dark">
        <div className="container">
          <SectionHeading
            eyebrow="Alliances"
            title="Brand synergy."
            description="We partner with organizations that align with our unrelenting drive. Activations and sponsorships are open."
            actionHref="/partners"
            actionLabel="View activations page"
          />

          <div className="feature-grid asymmetric-grid">
            {partners.map((partner) => (
              <article key={partner.name} className="partner-card rad-card asym-item-standard" style={{ display: 'grid', gridTemplateColumns: '80px 1fr' }}>
                <div className="partner-mark">
                  <span>{partner.name.substring(0,2)}</span>
                </div>
                <div className="partner-info rad-card__body" style={{ padding: '0 1rem' }}>
                  <p className="section-kicker section-kicker--tight">{partner.tier}</p>
                  <h3 className="card-title" style={{ margin: '0.4rem 0' }}>{partner.name}</h3>
                  <p className="card-desc">{partner.description}</p>
                  <Link href={partner.href} className="text-link" style={{ marginTop: '0.8rem' }}>
                    Contact RAD
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container community-inner">
          <div style={{ gridColumn: '1 / -1' }}>
            <SectionHeading
              eyebrow="Comms"
              title="Direct lines."
              description="No dead ends. Reach out directly for partnerships, talent queries, or community feedback."
              actionHref="/contact"
              actionLabel="Open contact page"
            />
            <ContactGrid channels={contactChannels} />
          </div>
        </div>
      </section>
    </main>
  );
}
