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
                RAD is building a prestige-first esports brand around competition, content, and the next stage of org growth.
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
          <div className="home-signal__grid">
            <article className="home-signal__feature">
              <p className="section-kicker section-kicker--tight">Featured division</p>
              <div className="card-topline">
                <span className="card-status">{featuredTeam.status}</span>
                <span>{featuredTeam.game}</span>
              </div>
              <h2>{featuredTeam.name}</h2>
              <p className="section-copy">{featuredTeam.description}</p>
              <div className="home-signal__feature-actions">
                <Link href="/roster" className="text-link">
                  Explore lineup
                </Link>
                <Link href="/content" className="text-link">
                  Watch content
                </Link>
              </div>
            </article>

            <div className="home-signal__rail">
              <Link href="/about" className="home-mini-panel">
                <p className="section-kicker section-kicker--tight">About</p>
                <h3>What RAD stands for.</h3>
                <p>Titles, culture, and the org story behind the current rise.</p>
              </Link>

              <Link href="/content" className="home-mini-panel">
                <p className="section-kicker section-kicker--tight">Content</p>
                <h3>The editorial layer.</h3>
                <p>Highlights, stories, uploads, and media that keep the brand moving.</p>
              </Link>

              <Link href="/contact" className="home-mini-panel">
                <p className="section-kicker section-kicker--tight">Contact</p>
                <h3>Start a conversation.</h3>
                <p>Partnerships, talent, press, and community-facing inquiries.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="About RAD"
            title="A brand built to scale."
            description="RAD needs to read like a serious org now, while still leaving room for future titles, better media, and deeper storytelling."
            actionHref="/about"
            actionLabel="Read the story"
          />

          <div className="home-story">
            <article className="home-story__lead">
              <p>{aboutSummary}</p>
            </article>

            <div className="home-story__cards">
              <article className="feature-card">
                <div className="feature-card__body">
                  <p className="section-kicker section-kicker--tight">Competition</p>
                  <h3 className="card-title">Championship pedigree.</h3>
                  <p className="card-desc">RAD's flagship roster already gives the org a real proof point instead of launch-stage fluff.</p>
                </div>
              </article>
              <article className="feature-card">
                <div className="feature-card__body">
                  <p className="section-kicker section-kicker--tight">Identity</p>
                  <h3 className="card-title">Aggressive visual direction.</h3>
                  <p className="card-desc">Black, white, and red stay at the center so the site feels branded instead of template-driven.</p>
                </div>
              </article>
              <article className="feature-card">
                <div className="feature-card__body">
                  <p className="section-kicker section-kicker--tight">Expansion</p>
                  <h3 className="card-title">Built beyond one title.</h3>
                  <p className="card-desc">The information architecture is ready for more divisions without forcing a redesign later.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHeading
            eyebrow="Roster"
            title="The current competitive core."
            description="The roster page is the main competitive destination, but the home page should still give a quick read on the names carrying the org right now."
            actionHref="/roster"
            actionLabel="Open full roster"
          />

          <div className="home-roster-preview">
            <div className="home-roster-preview__grid">
              {rosterPreview.map((player) => (
                <article key={player.slug} className="people-card">
                  <div className="people-card__top">
                    <p className="section-kicker section-kicker--tight">{player.group}</p>
                    {typeof player.number === "number" ? (
                      <span className="people-card__index">#{String(player.number).padStart(2, "0")}</span>
                    ) : null}
                  </div>
                  <div className="people-card__body">
                    <h3 className="people-card__name">{player.name}</h3>
                    <p className="people-card__role">{player.role}</p>
                    <p className="people-card__desc">{player.descriptor}</p>
                  </div>
                </article>
              ))}
            </div>

            <aside className="home-roster-preview__sidebar">
              <p className="section-kicker section-kicker--tight">Support layer</p>
              <h3>Players backed by real infrastructure.</h3>
              <p className="section-copy">
                RAD already has design, ops, coaching, and social support in place, which makes the org feel credible beyond the headline results.
              </p>
              <ul className="home-list">
                {staffPreview.map((member) => (
                  <li key={member.slug}>
                    <strong>{member.name}</strong>
                    <span>{member.role}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Content"
            title="A real editorial layer."
            description="The site should not feel like a static team page. It needs stories, uploads, and editorial signals that keep the org alive between match days."
            actionHref="/content"
            actionLabel="Browse content"
          />

          <div className="home-editorial">
            <Link href={`/content/${featuredPost.slug}`} className="home-editorial__featured">
              <img src={featuredPost.cover} alt={featuredPost.title} />
              <div className="home-editorial__featured-copy">
                <p className="section-kicker section-kicker--tight">{featuredPost.category}</p>
                <h3>{featuredPost.title}</h3>
                <p>{featuredPost.summary}</p>
                <span className="text-link">Open article</span>
              </div>
            </Link>

            <div className="home-editorial__stack">
              {secondaryPosts.map((post) => (
                <Link key={post.slug} href={`/content/${post.slug}`} className="feature-card feature-card--article">
                  <div className="feature-card__body">
                    <p className="section-kicker section-kicker--tight">{post.category}</p>
                    <h3 className="card-title">{post.title}</h3>
                    <p className="card-desc">{post.summary}</p>
                    <span className="text-link">Read more</span>
                  </div>
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
            eyebrow="Activations"
            title="Open for the right brand partners."
            description="RAD does not need fake sponsor logos. The site should clearly state that activations, sponsorships, and campaigns are open now."
            actionHref="/partners"
            actionLabel="View activations page"
          />

          <div className="feature-grid">
            {partners.map((partner) => (
              <article key={partner.name} className="feature-card feature-card--partner">
                <div className="feature-card__body">
                  <p className="section-kicker section-kicker--tight">{partner.tier}</p>
                  <h3 className="card-title">{partner.name}</h3>
                  <p className="card-desc">{partner.description}</p>
                  <Link href={partner.href} className="text-link">
                    Contact RAD
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Connect"
            title="Direct channels that actually matter."
            description="The public-facing contact options should be easy to find, consistent, and free of dead routes or fake CTAs."
            actionHref="/contact"
            actionLabel="Open contact page"
          />
          <ContactGrid channels={contactChannels} />
        </div>
      </section>
    </main>
  );
}
