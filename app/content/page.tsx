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
      eyebrow="Content"
      title="The editorial side of the org."
      description="This page should feel like a real media surface, not an afterthought bolted onto a team site. Articles, video, and creator visibility all need to coexist cleanly."
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
            description="The hero article needs to read like a flagship post rather than just the first item in a list."
          />

          {featured ? (
            <Link href={`/content/${featured.slug}`} className="rad-editorial-feature">
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
            description="The card system is designed to hold article growth cleanly, even while the content library is still small."
          />

          <div className="rad-subpage-grid rad-subpage-grid--3">
            {feed.map((post) => (
              <Link key={post.slug} href={`/content/${post.slug}`} className="rad-post-card">
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
            description="The page remains useful even when APIs are not configured by falling back gracefully instead of collapsing the layout."
          />

          <div className="rad-subpage-grid rad-subpage-grid--2">
            <div className="rad-subpage-surface">
              <p className="rad-subpage-card__eyebrow">Featured Video</p>
              <YouTubeFeatured />
            </div>
            <div className="rad-subpage-surface">
              <p className="rad-subpage-card__eyebrow">Creator Status</p>
              <TwitchCreators />
            </div>
          </div>

          <div className="rad-subpage-surface rad-subpage-surface--spaced">
            <p className="rad-subpage-card__eyebrow">Library</p>
            <YouTubeLibrary />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
