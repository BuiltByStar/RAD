import Image from "next/image";
import { notFound } from "next/navigation";

import { getPostBySlug, getPostMeta, getPostSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getPostMeta();
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.cover]
    }
  };
}

export default async function PostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);

    return (
      <main className="rad-page rad-post-page">
        <section className="rad-post-hero">
          <div className="rad-post-hero__media">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="rad-post-hero__image"
            />
          </div>
          <div className="rad-post-hero__overlay" />
          <div className="container rad-post-hero__copy">
            <p className="rad-kicker">{post.category}</p>
            <h1 className="rad-display rad-display--page">{post.title}</h1>
            <p className="rad-lead">{post.summary}</p>
            <span className="rad-post-hero__date">{post.date}</span>
          </div>
        </section>

        <section className="rad-section">
          <div className="container">
            <article className="rad-post-body">
              <div className="rad-mdx">{post.content}</div>
            </article>
          </div>
        </section>
      </main>
    );
  } catch {
    notFound();
  }
}
