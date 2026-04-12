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
  const signalPanels = [
    {
      eyebrow: "About RAD",
      title: "What the org stands for.",
      description: "A sharper org story, championship proof, and a brand platform designed to scale.",
      href: "/about"
    },
    {
      eyebrow: "Content",
      title: "Editorial that keeps moving.",
      description: "Uploads, features, launch stories, and content infrastructure that support the roster.",
      href: "/content"
    },
    {
      eyebrow: "Contact",
      title: "A direct business path.",
      description: "Press, partnerships, talent, and community-facing inquiries all route to the same intake surface.",
      href: "/contact"
    }
  ];
  const narrativeCards = [
    {
      eyebrow: "Competition",
      title: "Championship pedigree, not fake launch energy.",
      description:
        "RAD already has results strong enough to anchor the brand, so the site can speak with proof instead of placeholder ambition."
    },
    {
      eyebrow: "Content",
      title: "A site built to publish, not just sit there.",
      description:
        "The platform is structured for recaps, announcements, features, and future campaign content without forcing a redesign."
    },
    {
      eyebrow: "Scale",
      title: "Prepared for more than one title.",
      description:
        "Marvel Rivals is the flagship right now, but the architecture stays ready for future divisions, activations, and creator-led expansion."
    }
  ];
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

      <section className="rad-home__signal-band">
        <div className="container">
          <div className="rad-home__signal-grid">
            <article className="rad-home__signal-feature" data-reveal>
              <div className="rad-home__signal-media">
                <Image
                  src="/assets/RadPlayerBannerPNG8.png"
                  alt="RAD roster banner"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="rad-home__signal-image"
                />
              </div>
              <div className="rad-home__signal-body">
                <p className="rad-kicker">Featured Division</p>
                <h2 className="rad-section__title rad-section__title--compact">{featuredTeam.name}</h2>
                <p className="rad-copy">
                  {featuredTeam.description}
                </p>
                <div className="rad-inline-meta">
                  <span className="rad-badge">{featuredTeam.status}</span>
                  <Link href="/roster" className="rad-text-link">
                    Explore the lineup
                  </Link>
                </div>
                <div className="rad-home__signal-stats">
                  <StatStrip items={stats} />
                </div>
              </div>
            </article>

            <div className="rad-home__signal-rail">
              {signalPanels.map((panel) => (
                <Link key={panel.title} href={panel.href} className="rad-home__signal-card" data-reveal>
                  <p className="rad-kicker">{panel.eyebrow}</p>
                  <h3 className="rad-card__title">{panel.title}</h3>
                  <p className="rad-copy">{panel.description}</p>
                  <span className="rad-text-link">Open section</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rad-home__scroll-band">
        <div className="container">
          <div className="rad-home__scroll-grid">
            <div className="rad-home__scroll-copy">
              <p className="rad-kicker">About RAD</p>
              <h2 className="rad-section__title">A cleaner system with more of the long-scroll feel back in place.</h2>
              <p className="rad-copy">{aboutSummary}</p>
              <div className="rad-action-row">
                <Link href="/about" className="rad-button">
                  Read the full story
                </Link>
              </div>
            </div>

            <div className="rad-home__scroll-track">
              {narrativeCards.map((card) => (
                <article key={card.title} className="rad-home__story-card" data-reveal>
                  <p className="rad-kicker">{card.eyebrow}</p>
                  <h3 className="rad-card__title">{card.title}</h3>
                  <p className="rad-copy">{card.description}</p>
                </article>
              ))}
              <article className="rad-home__story-card rad-home__story-card--media" data-reveal>
                <div className="rad-home__story-card-media">
                  <Image
                    src="/assets/RadBannerNewTest300ppi.png"
                    alt="RAD banner"
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="rad-home__story-card-image"
                  />
                </div>
                <div className="rad-home__story-card-copy">
                  <p className="rad-kicker">Brand Surface</p>
                  <h3 className="rad-card__title">Visual identity that can carry more than one page.</h3>
                  <p className="rad-copy">
                    The new layout keeps the more cinematic scroll rhythm, but the actual system underneath is cleaner, faster to maintain, and more usable on smaller screens.
                  </p>
                </div>
              </article>
            </div>
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

      <section className="rad-home__editorial-band">
        <div className="container">
          <div className="rad-home__editorial-grid">
            <div className="rad-home__editorial-copy">
              <p className="rad-kicker">Content</p>
              <h2 className="rad-section__title">The site still needs a stronger editorial pulse than a basic org page.</h2>
              <p className="rad-copy">
                This section stays image-heavy and scroll-friendly so the homepage feels alive even before a full content pipeline is populated.
              </p>
              <div className="rad-action-row">
                <Link href="/content" className="rad-button rad-button--ghost">
                  Browse content
                </Link>
              </div>
            </div>

            <div className="rad-home__editorial-stack">
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

              <PostGrid posts={recentPosts} compact />
            </div>
          </div>
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
