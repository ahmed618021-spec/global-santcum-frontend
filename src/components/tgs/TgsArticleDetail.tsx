"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TgsNavDrawer from "@/components/tgs/TgsNavDrawer";
import { allArticles, type Article } from "@/components/tgs/wellnessEditData";

const styles = `
.article-detail {
  --warm-white: #FDFCF9;
  --warm-cream: #F7F5F1;
  --charcoal: #313131;
  --charcoal-70: rgba(49,49,49,0.7);
  --charcoal-50: rgba(49,49,49,0.5);
  --gold: #C4A265;
  --gold-dark: #7A644F;
  --light-rule: #E0D8CC;
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Montserrat', system-ui, sans-serif;
  background: var(--warm-white);
  color: var(--charcoal);
  font-family: var(--font-sans);
}

.article-detail .ad-nav {
  position: sticky; top: 0; z-index: 100;
  background: var(--warm-white); border-bottom: 1px solid var(--light-rule);
}
.article-detail .ad-nav-inner {
  max-width: 1100px; margin: 0 auto; padding: 18px 40px;
  display: flex; align-items: center; justify-content: space-between;
}
.article-detail .ad-nav-left { display: flex; align-items: center; gap: 14px; cursor: pointer; }
.article-detail .ad-hamburger { width: 22px; height: 14px; position: relative; background: none; border: none; padding: 0; cursor: pointer; }
.article-detail .ad-hamburger span { position: absolute; left: 0; width: 100%; height: 1.5px; background: var(--charcoal); transition: transform 0.3s, opacity 0.3s; }
.article-detail .ad-hamburger span:nth-child(1) { top: 0; }
.article-detail .ad-hamburger span:nth-child(2) { top: 6px; }
.article-detail .ad-hamburger span:nth-child(3) { top: 12px; }
.article-detail .ad-hamburger-label { font-size: 11px; font-weight: 500; letter-spacing: 1px; color: var(--charcoal); }
.article-detail .ad-brand { font-family: var(--font-serif); font-size: 18px; font-weight: 400; letter-spacing: 1px; color: var(--charcoal); text-decoration: none; }

.article-detail .ad-main { max-width: 760px; margin: 0 auto; padding: 56px 40px 24px; }
.article-detail .ad-back {
  font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
  color: var(--gold-dark); text-decoration: none; display: inline-block; margin-bottom: 32px;
}
.article-detail .ad-back:hover { color: var(--charcoal); }
.article-detail .ad-category {
  font-size: 9px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;
  color: var(--gold); margin-bottom: 18px;
}
.article-detail .ad-title {
  font-family: var(--font-serif); font-size: 44px; font-weight: 300; line-height: 1.15;
  color: var(--charcoal); margin: 0 0 22px;
}
.article-detail .ad-meta {
  display: flex; align-items: center; gap: 12px; font-size: 11px; color: var(--charcoal-50);
  padding-bottom: 28px; border-bottom: 1px solid var(--light-rule); margin-bottom: 36px;
}
.article-detail .ad-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--gold); }

.article-detail .ad-hero {
  height: 360px; border-radius: 2px; margin-bottom: 40px;
  background: linear-gradient(135deg, #ECE6DC 0%, #DED5C6 100%);
  display: flex; align-items: center; justify-content: center;
}
.article-detail .ad-hero span {
  font-size: 9px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: var(--charcoal-50);
}

.article-detail .ad-lead {
  font-family: var(--font-serif); font-size: 22px; font-weight: 300; font-style: italic;
  line-height: 1.5; color: var(--charcoal-70); margin: 0 0 32px;
}
.article-detail .ad-body p {
  font-size: 15px; font-weight: 300; line-height: 1.9; color: var(--charcoal); margin: 0 0 22px;
}

.article-detail .ad-related {
  max-width: 1100px; margin: 0 auto; padding: 24px 40px 80px;
  border-top: 1px solid var(--light-rule); margin-top: 48px;
}
.article-detail .ad-related-label {
  font-size: 9px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;
  color: var(--charcoal-50); margin: 40px 0 24px;
}
.article-detail .ad-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.article-detail .ad-related-card { text-decoration: none; display: block; }
.article-detail .ad-related-card .ad-rc-cat {
  font-size: 8.5px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 8px;
}
.article-detail .ad-related-card .ad-rc-title {
  font-family: var(--font-serif); font-size: 19px; font-weight: 400; line-height: 1.3; color: var(--charcoal); margin: 0;
  transition: color 0.2s;
}
.article-detail .ad-related-card:hover .ad-rc-title { color: var(--gold-dark); }

@media (max-width: 768px) {
  .article-detail .ad-main { padding: 40px 24px 16px; }
  .article-detail .ad-title { font-size: 32px; }
  .article-detail .ad-hero { height: 220px; }
  .article-detail .ad-related-grid { grid-template-columns: 1fr; gap: 24px; }
  .article-detail .ad-nav-inner { padding: 16px 24px; }
}
`;

export default function TgsArticleDetail({ article }: { article: Article }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && drawerOpen) setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  const related = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="article-detail">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <nav className="ad-nav" aria-label="Primary">
        <div className="ad-nav-inner">
          <div
            className="ad-nav-left"
            onClick={() => setDrawerOpen((open) => !open)}
          >
            <button
              className="ad-hamburger"
              type="button"
              aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={drawerOpen ? "true" : "false"}
            >
              <span />
              <span />
              <span />
            </button>
            <span className="ad-hamburger-label" aria-hidden="true">
              Menu
            </span>
          </div>
          <Link href="/global-santcum/web" className="ad-brand">
            The Global Sanctum
          </Link>
          <span style={{ width: 60 }} aria-hidden="true" />
        </div>
      </nav>

      <TgsNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="ad-main">
        <Link href="/global-santcum/the-wellness-edit" className="ad-back">
          ← The Wellness Edit
        </Link>

        <p className="ad-category">{article.categoryLabel}</p>
        <h1 className="ad-title">{article.title}</h1>
        <div className="ad-meta">
          <span>{article.date}</span>
          <span className="ad-meta-dot" aria-hidden="true" />
          <span>{article.read}</span>
        </div>

        <div className="ad-hero" aria-hidden="true">
          <span>{article.categoryLabel}</span>
        </div>

        <p className="ad-lead">{article.excerpt}</p>
        <div className="ad-body">
          {article.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </main>

      <section className="ad-related" aria-label="More from The Wellness Edit">
        <p className="ad-related-label">More from The Wellness Edit</p>
        <div className="ad-related-grid">
          {related.map((a) => (
            <Link
              key={a.slug}
              href={`/global-santcum/the-wellness-edit/${a.slug}`}
              className="ad-related-card"
            >
              <p className="ad-rc-cat">{a.categoryLabel}</p>
              <h3 className="ad-rc-title">{a.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
