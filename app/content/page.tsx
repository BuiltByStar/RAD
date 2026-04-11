import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { PostGrid, SectionHeading } from "@/components/sections";
import { TwitchCreators } from "@/components/twitch-creators";
import { YouTubeFeatured } from "@/components/youtube-featured";
import { YouTubeLibrary } from "@/components/youtube-library";
import { getFeaturedPost, getPostMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Content",
  description: "RAD's content hub for featured stories, recent broadcasts, and creator activity."
};

export default async function ContentPage() {
  const featuredPost = await getFeaturedPost();
  const posts = await getPostMeta();
  const remainingPosts = posts.filter((post) => post.slug !== featuredPost?.slug);

  return (
    <PageShell
      eyebrow="Content"
      title="The editorial layer behind the org."
      description="RAD's site should support articles, broadcasts, and creator-facing content without turning into a cluttered media dump."
      heroImage={featuredPost?.cover ?? "/assets/RadBannerNewTest300ppi.png"}
      heroNote={
        <div className="rad-note-card">
          <p className="rad-kicker">Coverage model</p>
          <p className="rad-copy">
            Use this page for featured stories, recent uploads, long-form recaps, and live creator visibility when those integrations are configured.
          </p>
        </div>
      }
    >
      <section className="rad-section">
        <div className="container">
          <SectionHeading
            eyebrow="Featured Story"
            title="Lead with one high-signal editorial piece."
            description="The hero story keeps the page focused while still leaving room for YouTube and live creator modules below."
          />

          {featuredPost ? (
            <Link href={`/content/${featuredPost.slug}`} className="rad-featured-post" data-reveal>
              <div className="rad-featured-post__media">
                <Image
                  src={featuredPost.cover}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rad-featured-post__image"
                />
              </div>
              <div className="rad-featured-post__body">
                <p className="rad-kicker">{featuredPost.category}</p>
                <h2 className="rad-section__title rad-section__title--compact">{featuredPost.title}</h2>
                <p className="rad-copy">{featuredPost.summary}</p>
                <span className="rad-text-link">Read feature</span>
              </div>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="rad-section rad-section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="YouTube"
            title="Latest long-form upload."
            description="If the API is configured, this pulls the newest long-form YouTube video. If not, the component falls back to curated placeholder media."
          />
          <YouTubeFeatured />
        </div>
      </section>

      <section className="rad-section">
        <div className="container">
          <SectionHeading
            eyebrow="Recent Media"
            title="Broadcasts, VODs, and platform content."
            description="The library grid stays useful whether the YouTube API is live or still falling back to local content references."
          />
          <YouTubeLibrary />
        </div>
      </section>

      <section className="rad-section rad-section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Creators"
            title="Live Twitch status."
            description="These cards degrade cleanly when Twitch credentials are missing, so the page never breaks just because the external integration is offline."
          />
          <TwitchCreators />
        </div>
      </section>

      <section className="rad-section">
        <div className="container">
          <SectionHeading
            eyebrow="Articles"
            title="Supporting editorial."
            description="MDX-backed article pages keep announcements, recaps, and roadmaps organized without requiring a CMS on day one."
          />
          <PostGrid posts={remainingPosts} />
        </div>
      </section>
    </PageShell>
  );
}
