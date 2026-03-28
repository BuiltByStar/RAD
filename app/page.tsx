import Link from "next/link";

import {
  ContactGrid,
  PartnerGrid,
  PeopleGrid,
  SectionHeading,
  TeamGrid
} from "@/components/sections";
import { contactChannels, partners, players, staff, stats, teams } from "@/lib/site-data";
import { getFeaturedPost, getPostMeta } from "@/lib/posts";

export default async function HomePage() {
  const featuredPost = await getFeaturedPost();
  const latestPosts = await getPostMeta();

  return (
    <main className="page-main">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-video-shell">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/RadRivals_Wallpaper_Red.png"
            className="hero-video"
          >
            <source src="/assets/DiscordRadBannerAnimated_960.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay" />
        <div className="hero-lights" />
        <div className="hero-noise" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">RAD Esports</p>
            <h1>Built for pressure, content, and the next stage of competition.</h1>
            <p className="hero-copy-text">
              RAD launches with a cinematic brand shell, a flexible roster system,
              and a real editorial layer that scales as better media and new divisions arrive.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/content">
                Explore Content
              </Link>
              <Link className="button button-secondary" href="/roster">
                View Roster
              </Link>
            </div>
            <div className="stats-row">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-block">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-brand-stack">
            <div className="hero-brand-glow" />
            <div className="hero-brand-ring" />
            <img
              src="/assets/RadNewLogoWordmarkRed.png"
              alt="RAD Esports"
              className="hero-logo"
            />
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section className="section" data-reveal>
        <div className="container">
          <SectionHeading
            eyebrow="About"
            title="A launch-ready org shell with room to grow."
            description="Built so rosters, sponsors, and premium media can improve later without a structural rebuild."
            actionHref="/about"
            actionLabel="More on RAD"
          />
          <div className="about-strip">
            <p>
              This v1 release uses the current RAD asset pack now, while keeping
              the media layer modular. Logos, wallpapers, videos, and roster
              shots can all be replaced later without changing the site layout.
            </p>
            <p>
              The tone stays prestige-first: sharp typography, high contrast,
              controlled motion, and an editorial structure that makes the org
              feel credible on day one.
            </p>
          </div>
        </div>
      </section>

      {/* ── Teams ─────────────────────────────────────────────────────────── */}
      <section className="section section-tinted" data-reveal>
        <div className="container">
          <SectionHeading
            eyebrow="Teams"
            title="Flexible competitive infrastructure."
            description="RAD is staged around current and future divisions so the site remains stable while lineups change."
            actionHref="/teams"
            actionLabel="All teams"
          />
          <TeamGrid teams={teams.filter((team) => team.featured)} />
        </div>
      </section>

      {/* ── Roster ────────────────────────────────────────────────────────── */}
      <section className="section" data-reveal>
        <div className="container split-highlight">
          <div>
            <SectionHeading
              eyebrow="Roster"
              title="Player cards that work now and scale later."
              description="Without relying on finished player portraits, the roster grid still feels intentional and premium."
              actionHref="/roster"
              actionLabel="Full roster"
            />
            <PeopleGrid people={players.slice(0, 3)} />
          </div>
          <aside className="promo-card promo-card-red">
            <img src="/assets/SkinTeasePic.png" alt="RAD featured promotional artwork" />
            <div className="promo-copy">
              <p className="eyebrow">Featured Visual</p>
              <h3>Launch with current media. Upgrade without redesign.</h3>
              <p className="section-copy">
                The art direction is wired for higher-end renders, but the current
                pack is strong enough to ship v1 with confidence.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <section className="section section-dark" data-reveal>
        <div className="container">
          <SectionHeading
            eyebrow="Content"
            title="A real editorial layer, not just a news strip."
            description="RAD content lives in local MDX now, with a structure ready for future CMS migration if needed."
            actionHref="/content"
            actionLabel="Browse content"
          />
          <div className="content-showcase">
            <article className="featured-post">
              <img src={featuredPost.cover} alt={featuredPost.title} />
              <div className="featured-post-copy">
                <p className="eyebrow">{featuredPost.category}</p>
                <h3>{featuredPost.title}</h3>
                <p>{featuredPost.summary}</p>
                <Link className="button button-primary" href={`/content/${featuredPost.slug}`}>
                  Read feature
                </Link>
              </div>
            </article>
            <div className="post-list">
              {latestPosts.slice(0, 3).map((post) => (
                <Link key={post.slug} href={`/content/${post.slug}`} className="post-card">
                  <p className="eyebrow">{post.category}</p>
                  <h3>{post.title}</h3>
                  <p>{post.summary}</p>
                  <span>{post.date}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Staff ─────────────────────────────────────────────────────────── */}
      <section className="section" data-reveal>
        <div className="container">
          <SectionHeading
            eyebrow="Staff"
            title="Leadership, performance, and brand support."
            description="Staff cards clarify the infrastructure behind the org even before the final personnel list is locked."
            actionHref="/staff"
            actionLabel="Meet the staff"
          />
          <PeopleGrid people={staff} variant="staff" />
        </div>
      </section>

      {/* ── Partners ──────────────────────────────────────────────────────── */}
      <section className="section section-tinted" data-reveal>
        <div className="container">
          <SectionHeading
            eyebrow="Partners"
            title="Structured for brand collaborations."
            description="The site already supports sponsor space, partner callouts, and category expansion."
            actionHref="/partners"
            actionLabel="Partner with RAD"
          />
          <PartnerGrid partners={partners} />
        </div>
      </section>

      {/* ── Community ─────────────────────────────────────────────────────── */}
      <section className="section community-section" data-reveal>
        <div className="community-media">
          <video autoPlay muted loop playsInline poster="/assets/RadRivals_Wallpaper_Black.png">
            <source src="/assets/DiscordRadPFPAnimated.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container community-grid">
          <div>
            <p className="eyebrow">Community</p>
            <h2>Discord-ready motion, site-ready atmosphere.</h2>
            <p className="section-copy">
              The current animated assets are used selectively so RAD feels live
              now without forcing the entire site to depend on lower-quality
              motion files.
            </p>
          </div>
          <ContactGrid channels={contactChannels} />
        </div>
      </section>

    </main>
  );
}
