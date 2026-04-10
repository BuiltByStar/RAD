import type { Metadata } from "next";

import { getPostMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Media",
  description: "Clips, documentaries, match highlights, and the editorial side of the organization."
};

export default async function ContentPage() {
  const posts = await getPostMeta();
  const featured = posts[0];
  const feed = posts.slice(1);

  return (
    <main className="cinematic-main">
      <section className="cinematic-hero">
        <div 
          className="cinematic-hero-bg" 
          style={{ backgroundImage: `url(${featured?.cover || '/assets/RadBannerNewTest300ppi.png'})` }} 
        />
        <div className="cinematic-hero-overlay" />
        <div className="cinematic-hero-content">
          <p className="cinematic-eyebrow">Media & Content</p>
          <h1 className="cinematic-title">The Editorial Lens.</h1>
          <p className="cinematic-desc">
            We don't just win; we document the entire path to the top.
          </p>
        </div>
      </section>

      {/* Featured Video Edge to Edge */}
      {featured && (
        <section className="cinematic-section" style={{ padding: '0 0 5rem 0', maxWidth: 'none', borderTop: 'none' }}>
           <a href={`/content/${featured.slug}`} style={{ display: 'block', position: 'relative', height: '60vh', overflow: 'hidden' }}>
             <div className="cinematic-hero-bg" style={{ backgroundImage: `url(${featured.cover})`, opacity: 0.6, filter: 'none' }} />
             <div className="cinematic-hero-overlay" style={{ background: 'linear-gradient(0deg, #000 0%, transparent 100%)' }} />
             <div style={{ position: 'absolute', bottom: '3rem', left: '2rem', right: '2rem', zIndex: 2 }}>
               <span className="cinematic-item-eyebrow">{featured.category}</span>
               <h2 className="cinematic-item-title" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}>{featured.title}</h2>
               <p className="cinematic-desc">{featured.summary}</p>
             </div>
           </a>
        </section>
      )}

      {/* Masonry Feed */}
      <section className="cinematic-section">
        <span className="cinematic-item-eyebrow">Recent Uploads</span>
        <h2 className="cinematic-item-title" style={{ marginBottom: '3rem' }}>Latest Broadcasts.</h2>
        
        <div className="cinematic-grid">
          {feed.map((post) => (
            <a key={post.slug} href={`/content/${post.slug}`} className="cinematic-roster-card" style={{ padding: '1.5rem', aspectRatio: '16/9' }}>
               <div className="cinematic-roster-bg" style={{ backgroundImage: `url(${post.cover})` }} />
               <div className="cinematic-roster-content">
                 <span className="cinematic-roster-role">{post.category}</span>
                 <h3 className="cinematic-item-title" style={{ fontSize: '1.5rem', margin: '0.25rem 0' }}>{post.title}</h3>
                 <p className="cinematic-item-desc" style={{ fontSize: '0.8rem', opacity: 0.8 }}>{post.summary}</p>
               </div>
            </a>
          ))}
        </div>
      </section>

    </main>
  );
}
