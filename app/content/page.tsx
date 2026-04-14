import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/sections";
import { TwitchCreators } from "@/components/twitch-creators";
import { YouTubeFeatured } from "@/components/youtube-featured";
import { YouTubeLibrary } from "@/components/youtube-library";
import { getFeaturedPost, getPostMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Content",
  description: "RAD's editorial layer across articles, video, and live creator surfaces."
};

export default async function ContentPage() {
  const featured = await getFeaturedPost();
  const posts = await getPostMeta();
  const feed = posts.filter((post) => post.slug !== featured?.slug);

  return (
    <PageShell
      variant="content"
      eyebrow="Content"
      title="Stories, drops, and org signals."
      description="RAD's content surface brings together articles, video, and creator visibility without treating media like an afterthought."
      heroImage={featured?.cover ?? "/assets/RadBannerNewTest300ppi.png"}
      status="Editorial surface // active"
      note={
        <div className="rad-subpage-note__stack">
          <div>
            <span className="rad-subpage-note__label">Featured Story</span>
            <strong>{featured?.category ?? "Org Update"}</strong>
          </div>
          <div>
            <span className="rad-subpage-note__label">Archive Count</span>
            <strong>{posts.length}</strong>
          </div>
        </div>
      }
    >
      <section className="rad-subpage-section">
        <div className="container">
          <SectionHeading
            eyebrow="Feature"
            title="Lead with the strongest story."
            description="The lead story should set the tone for the org, not just fill the first slot in the archive."
          />

          {featured ? (
            <Link href={`/content/${featured.slug}`} className="rad-editorial-feature" data-reveal="true" data-delay="1">
              <div className="rad-editorial-feature__media">
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 48vw"
                  className="rad-editorial-feature__image"
                />
              </div>
              <div className="rad-editorial-feature__body">
                <p className="rad-subpage-card__eyebrow">{featured.category}</p>
                <h2 className="rad-subpage-card__title">{featured.title}</h2>
                <p className="rad-subpage-body">{featured.summary}</p>
                <span className="rad-subpage-link">Open article</span>
              </div>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="rad-subpage-section rad-subpage-section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Archive"
            title="Recent stories and update drops."
            description="Announcements, recaps, and org updates need enough structure to scale as the editorial library grows."
          />

          <div className="rad-subpage-grid rad-subpage-grid--3">
            {feed.map((post, index) => (
              <Link
                key={post.slug}
                href={`/content/${post.slug}`}
                className="rad-post-card"
                data-reveal="true"
                data-delay={String((index % 3) + 1)}
              >
                <div className="rad-post-card__media">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 31vw"
                    className="rad-post-card__image"
                  />
                </div>
                <div className="rad-post-card__body">
                  <p className="rad-subpage-card__eyebrow">{post.category}</p>
                  <h3 className="rad-subpage-card__title">{post.title}</h3>
                  <p className="rad-subpage-body">{post.summary}</p>
                  <span className="rad-post-card__date">{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rad-subpage-section">
        <div className="container">
          <SectionHeading
            eyebrow="Live Surfaces"
            title="Video and creator touchpoints."
            description="Video and creator visibility give the org another public layer beyond match results and written updates."
          />

          <div className="rad-subpage-grid rad-subpage-grid--2">
            <div className="rad-subpage-surface" data-reveal="true" data-delay="1">
              <p className="rad-subpage-card__eyebrow">Featured Video</p>
              <YouTubeFeatured />
            </div>
            <div className="rad-subpage-surface" data-reveal="true" data-delay="2">
              <p className="rad-subpage-card__eyebrow">Creator Status</p>
              <TwitchCreators />
            </div>
          </div>

          <div className="rad-subpage-surface rad-subpage-surface--spaced" data-reveal="true" data-delay="3">
            <p className="rad-subpage-card__eyebrow">Library</p>
            <YouTubeLibrary />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
