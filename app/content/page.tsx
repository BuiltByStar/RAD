import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/sections";
import { getPostMeta } from "@/lib/posts";

export default async function ContentPage() {
  const posts = await getPostMeta();

  return (
    <PageShell
      eyebrow="Content"
      title="Editorial space for announcements, recaps, and org momentum."
      description="RAD content is powered by local MDX at launch so new posts can ship quickly while the structure stays ready for future upgrades."
      background="red"
    >
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Latest"
            title="Structured publishing, launch-speed workflow."
            description="The current site keeps content local to the repo for fast iteration, with article pages and list views already in place."
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
