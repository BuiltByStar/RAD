import Link from "next/link";

import {
  ContactSection,
  PartnerSection,
  PeopleSection,
  SectionHead,
  TeamSection
} from "@/components/sections";
import { contactChannels, partners, players, staff, stats, teams } from "@/lib/site-data";
import { getFeaturedPost, getPostMeta } from "@/lib/posts";

export default async function HomePage() {
  const featuredPost = await getFeaturedPost();
  const latestPosts = await getPostMeta();

  return (
    <main className="page-main">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="hero-section">
        {/* Video background */}
        <div className="hero-video-shell">
          <video
            autoPlay muted loop playsInline
            poster="/assets/RadRivals_Wallpaper_Red.png"
            className="hero-video"
          >
            <source src="/assets/DiscordRadBannerAnimated_960.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Overlay layers */}
        <div className="hero-overlay" />
        <div className="hero-sweep" />
        <div className="hero-dots" />
        <div className="hero-noise" />

        <div className="container hero-grid">
          {/* ── Copy column ── */}
          <div className="hero-copy">
            {/* Live badge */}
            <div className="hero-live-badge hero-anim hero-anim-1">
              <span className="hero-live-dot" />
              V1 Live
            </div>

            <p className="eyebrow hero-anim hero-anim-2">RAD Esports</p>

            <h1 className="hero-h1 hero-anim hero-anim-3">
              Built for pressure, content, and the next stage of competition.
            </h1>

            <p className="hero-copy-text hero-anim hero-anim-4">
              RAD launches with a cinematic brand shell, a flexible roster system,
              and a real editorial layer that scales as better media and new divisions arrive.
            </p>

            <div className="hero-actions hero-anim hero-anim-5">
              <Link className="btn btn-primary" href="/content">
                Explore Content
              </Link>
              <Link className="btn btn-ghost" href="/roster">
                View Roster
              </Link>
            </div>

            <div className="stats-row hero-anim hero-anim-5">
              {stats.map((s) => (
                <div key={s.label} className="stat-block">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Brand visual ── */}
          <div className="hero-brand-wrap hero-anim hero-anim-6">
            <div className="hero-brand-glow" />
            <div className="hero-brand-ring-outer" />
            <div className="hero-brand-ring-inner" />
            <img
              src="/assets/RadNewLogoWordmarkRed.png"
              alt="RAD Esports"
              className="hero-logo"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" data-reveal>
        <div className="container">
          <SectionHead
            eyebrow="About"
            title="A launch-ready org shell with room to grow."
            description="Built so rosters, sponsors, and premium media can all improve later without a structural rebuild."
            actionHref="/about"
            actionLabel="More on RAD"
          />
          <div className="about-strip">
            <p>
              This v1 release uses the current RAD asset pack while keeping the media layer
              modular. Logos, wallpapers, videos, and roster shots can all be replaced later
              without changing site layout or code structure.
            </p>
            <p>
              The tone stays prestige-first: sharp typography, high contrast, controlled
              motion, and an editorial structure that makes the org feel credible on day one
              and professional as it scales.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TEAMS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section section-tinted" data-reveal>
        <div className="container">
          <SectionHead
            eyebrow="Teams"
            title="Flexible competitive infrastructure."
            description="RAD is staged around current and future divisions so the site remains stable while lineups change."
            actionHref="/teams"
            actionLabel="All teams"
          />
          <TeamSection teams={teams.filter((t) => t.featured)} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ROSTER
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" data-reveal>
        <div className="container split-layout">
          <div>
            <SectionHead
              eyebrow="Roster"
              title="Player cards that work now and scale later."
              description="Without relying on finished player portraits, the roster grid still feels intentional and premium."
              actionHref="/roster"
              actionLabel="Full roster"
            />
            <PeopleSection people={players.slice(0, 3)} />
          </div>
          <aside className="promo-card">
            <img src="/assets/SkinTeasePic.png" alt="RAD featured promotional visual" />
            <div className="promo-copy">
              <p className="eyebrow">Featured Visual</p>
              <h3>Launch with current media. Upgrade without redesign.</h3>
              <p className="section-copy">
                The art direction is wired for higher-end renders, but the current
                pack is strong enough to ship v1 with real confidence.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTENT
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section section-dark" data-reveal>
        <div className="container">
          <SectionHead
            eyebrow="Content"
            title="A real editorial layer, not just a news strip."
            description="RAD content lives in local MDX now, with a structure ready for future CMS migration."
            actionHref="/content"
            actionLabel="Browse content"
          />
          <div className="content-showcase">
            <article className="featured-article">
              <img src={featuredPost.cover} alt={featuredPost.title} />
              <div className="featured-article-copy">
                <p className="eyebrow">{featuredPost.category}</p>
                <h3>{featuredPost.title}</h3>
                <p>{featuredPost.summary}</p>
                <Link className="btn btn-primary" href={`/content/${featuredPost.slug}`}>
                  Read feature
                </Link>
              </div>
            </article>
            <div className="post-stack">
              {latestPosts.slice(0, 3).map((post) => (
                <Link key={post.slug} href={`/content/${post.slug}`} className="post-card">
                  <p className="eyebrow">{post.category}</p>
                  <h3>{post.title}</h3>
                  <p>{post.summary}</p>
                  <span className="post-date">{post.date}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          STAFF
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" data-reveal>
        <div className="container">
          <SectionHead
            eyebrow="Staff"
            title="Leadership, performance, and brand support."
            description="Staff cards clarify the infrastructure behind the org even before the final personnel list is locked."
            actionHref="/staff"
            actionLabel="Meet the staff"
          />
          <PeopleSection people={staff} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PARTNERS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section section-tinted" data-reveal>
        <div className="container">
          <SectionHead
            eyebrow="Partners"
            title="Structured for brand collaborations."
            description="The site already supports sponsor space, partner callouts, and category expansion."
            actionHref="/partners"
            actionLabel="Partner with RAD"
          />
          <PartnerSection partners={partners} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          COMMUNITY
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section community-section" data-reveal>
        <div className="community-media">
          <video autoPlay muted loop playsInline poster="/assets/RadRivals_Wallpaper_Black.png">
            <source src="/assets/DiscordRadPFPAnimated.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container community-inner">
          <div>
            <p className="eyebrow">Community</p>
            <h2>Discord-ready motion, site-ready atmosphere.</h2>
            <p className="section-copy">
              Current animated assets are used selectively so RAD feels live now without
              forcing the entire site to depend on lower-quality motion files.
            </p>
          </div>
          <ContactSection channels={contactChannels} />
        </div>
      </section>

    </main>
  );
}
