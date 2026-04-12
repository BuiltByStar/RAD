import Image from "next/image";
import Link from "next/link";

import {
  aboutSummary,
  activationsSummary,
  communitySummary,
  contactChannels,
  featuredPlayers,
  featuredStaff,
  partners,
  siteDescription,
  siteTagline,
  stats,
  teams
} from "@/lib/site-data";
import { getFeaturedPost, getPostMeta } from "@/lib/posts";
import { Scene as HomeScene } from "@/components/three-scene";
import {
  ContactGrid,
  PartnerGrid,
  PersonGrid,
  PostGrid,
  SectionHeading,
  StatStrip,
  TeamSpotlight
} from "@/components/sections";

export default async function HomePage() {
  const featuredPost = await getFeaturedPost();
  const recentPosts = (await getPostMeta())
    .filter((post) => post.slug !== featuredPost?.slug)
    .slice(0, 3);
  const featuredTeam = teams[0];
  const tickerItems = [
    "Ignite Mid-Season World Champions",
    "Season 6 EMEA PC Champions",
    "#GoWild",
    "Premium content pipeline",
    "Open for activations"
  ];

  return (
    <main className="rad-home">
      <section className="rad-home__hero">
        <div className="container rad-home__hero-grid">
          <div className="rad-home__hero-copy">
            <p className="rad-kicker">RAD Esports</p>
            <h1 className="rad-display">
              Built for pressure.
              <span>Prepared for the next stage.</span>
            </h1>
            <p className="rad-lead">{siteTagline}</p>
            <p className="rad-copy rad-copy--wide">{siteDescription}</p>

            <div className="rad-action-row">
              <Link href="/about" className="rad-button">
                Learn the story
              </Link>
              <Link href="/roster" className="rad-button rad-button--ghost">
                View roster
              </Link>
              <Link href="/contact" className="rad-button rad-button--ghost">
                Contact RAD
              </Link>
            </div>

            <div className="rad-chip-row">
              <span className="rad-badge">World Champions</span>
              <span className="rad-badge">EMEA Title Holders</span>
              <span className="rad-badge">Content + Activations Ready</span>
            </div>
          </div>

          <div className="rad-home__hero-media">
            <HomeScene />
          </div>
        </div>
      </section>

      <section className="rad-home__ticker" aria-label="Organization highlights">
        <div className="rad-home__ticker-track">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <section className="rad-section">
        <div className="container">
          <StatStrip items={stats} />
        </div>
      </section>

      <section className="rad-section">
        <div className="container">
          <SectionHeading
            eyebrow="About RAD"
            title="A brand built to scale without losing competitive edge."
            description={aboutSummary}
            actionHref="/about"
            actionLabel="Read the full story"
          />

          <div className="rad-feature-grid">
            <article className="rad-card" data-reveal>
              <div className="rad-card__body">
                <p className="rad-kicker">Competitive</p>
                <h3 className="rad-card__title">High-standard rosters.</h3>
                <p className="rad-copy">
                  RAD is built around elite lineups, disciplined support staff, and a structure that can expand into new titles without losing quality.
                </p>
              </div>
            </article>
            <article className="rad-card" data-reveal>
              <div className="rad-card__body">
                <p className="rad-kicker">Content</p>
                <h3 className="rad-card__title">Always publishable.</h3>
                <p className="rad-copy">
                  Matches, roster moves, broadcasts, and campaign moments are treated like media assets, not afterthoughts.
                </p>
              </div>
            </article>
            <article className="rad-card" data-reveal>
              <div className="rad-card__body">
                <p className="rad-kicker">Growth</p>
                <h3 className="rad-card__title">Activation ready.</h3>
                <p className="rad-copy">
                  The site, brand system, and contact flow are structured for future sponsors, creator campaigns, and partner-facing storytelling.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="rad-section rad-section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Competitive Core"
            title="One featured division now. Built for more later."
            description="RAD is not framed as a single-title org. The current flagship roster leads the brand today while the platform stays ready for future expansion."
            actionHref="/roster"
            actionLabel="Open the roster"
          />
          <TeamSpotlight team={featuredTeam} />
          <div className="rad-section__spacer" />
          <PersonGrid people={featuredPlayers} mode="player" linkToRoster />
        </div>
      </section>

      <section className="rad-section">
        <div className="container">
          <SectionHeading
            eyebrow="Content"
            title="Editorial that supports the org, not placeholder noise."
            description="The media layer is built for match recaps, roster announcements, documentaries, and long-form campaign storytelling."
            actionHref="/content"
            actionLabel="View content"
          />

          {featuredPost ? (
            <Link href={`/content/${featuredPost.slug}`} className="rad-featured-post" data-reveal>
              <div className="rad-featured-post__media">
                <Image
                  src={featuredPost.cover}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="rad-featured-post__image"
                />
              </div>
              <div className="rad-featured-post__body">
                <p className="rad-kicker">{featuredPost.category}</p>
                <h3 className="rad-card__title">{featuredPost.title}</h3>
                <p className="rad-copy">{featuredPost.summary}</p>
                <span className="rad-text-link">Read feature</span>
              </div>
            </Link>
          ) : null}

          <div className="rad-section__spacer" />
          <PostGrid posts={recentPosts} compact />
        </div>
      </section>

      <section className="rad-section rad-section--alt">
        <div className="container rad-home__community-grid">
          <div>
            <SectionHeading
              eyebrow="Community"
              title="Stay close to the next move."
              description={communitySummary}
              actionHref="/contact"
              actionLabel="Reach out directly"
            />
            <ContactGrid channels={contactChannels} />
          </div>

          <aside className="rad-community-panel" data-reveal>
            <div className="rad-community-panel__media">
              <Image
                src="/assets/RadBanner1920_1080.png"
                alt="RAD community banner"
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                className="rad-community-panel__image"
              />
            </div>
            <div className="rad-community-panel__body">
              <p className="rad-kicker">Enter the wild</p>
              <h3 className="rad-card__title">Built for updates, launches, and community traffic.</h3>
              <p className="rad-copy">
                The Discord, YouTube, and X presence are already wired into the site so new drops can move cleanly between content, community, and contact.
              </p>
              <div className="rad-link-row">
                <Link href="/contact" className="rad-button">
                  Contact RAD
                </Link>
                <a href="https://x.com/RADesport" target="_blank" rel="noopener noreferrer" className="rad-button rad-button--ghost">
                  Follow on X
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="rad-section">
        <div className="container">
          <SectionHeading
            eyebrow="Activations"
            title="No fake sponsor wall. Just a clear brand entry point."
            description={activationsSummary}
            actionHref="/partners"
            actionLabel="Open activations"
          />
          <PartnerGrid items={partners} />
        </div>
      </section>

      <section className="rad-section rad-section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Support Staff"
            title="Creative and competitive support behind the roster."
            description="RAD's backend matters too: design, management, analytics, and coaching are part of what makes the org presentable and scalable."
            actionHref="/staff"
            actionLabel="View staff"
          />
          <PersonGrid people={featuredStaff} mode="staff" />
        </div>
      </section>
    </main>
  );
}
