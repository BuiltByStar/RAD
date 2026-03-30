import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/sections";
import { getPostMeta } from "@/lib/posts";

export default async function ContentPage() {
  const posts = await getPostMeta();

  return (
    <PageShell
      eyebrow="Content"
      title="Latest Content."
      description="Announcements, updates, and recaps from RAD."
      background="red"
    >
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Latest"
            title="News and updates."
            description="A clean feed for recent posts, announcements, and features."
          />
          <div className="post-grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/content/${post.slug}`} className="post-card post-card-rich">
                <img src={post.cover} alt={post.title} />
                <div>
                  <p className="eyebrow">{post.category}</p>
                  <h3>{post.title}</h3>
                  <p>{post.summary}</p>
                  <span>{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
