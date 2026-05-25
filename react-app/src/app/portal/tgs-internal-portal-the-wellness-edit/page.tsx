"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type EditTab = "all-articles" | "published" | "drafts";

type ArticleStatus = "Published" | "Draft" | "Scheduled";

type Article = {
  title: string;
  excerpt: string;
  category: string;
  status: ArticleStatus;
  views: string;
  author: string;
};

const articles: Article[] = [
  {
    title: "The Art of the Japanese Onsen: A Journey Through Tradition",
    excerpt: "Exploring ancient rituals and modern interpretations of Japan's sacred bathing culture.",
    category: "Destinations",
    status: "Published",
    views: "3,240",
    author: "Kate Morrison",
  },
  {
    title: "Finding Stillness in Bali's Sacred Valleys",
    excerpt: "Where ancient spirituality meets modern wellness in Ubud's hidden retreats.",
    category: "Experiences",
    status: "Published",
    views: "2,890",
    author: "Sarah Chen",
  },
  {
    title: "Wellness Architecture: Designing Spaces for Healing",
    excerpt: "How contemporary architects create environments that nurture body and mind.",
    category: "Architecture",
    status: "Published",
    views: "2,450",
    author: "Dan Wright",
  },
  {
    title: "The Science of Sound Healing",
    excerpt: "From Tibetan singing bowls to modern frequency therapy.",
    category: "Experiences",
    status: "Scheduled",
    views: "--",
    author: "Sarah Chen",
  },
  {
    title: "Tom Cronin on Meditation, Finance, and Finding Purpose",
    excerpt: "An intimate conversation with the founder of The Stillness Project.",
    category: "Interviews",
    status: "Draft",
    views: "draft",
    author: "Kate Morrison",
  },
];

const statusClass: Record<ArticleStatus, string> = {
  Published: "bg-[#E8F4EA] text-[#4A7C59]",
  Draft: "bg-[#FEF9E7] text-[#D4A853]",
  Scheduled: "bg-[#E8EFF9] text-[#6B8EC9]",
};

export default function PortalWellnessEditPage() {
  const [activeTab, setActiveTab] = useState<EditTab>("all-articles");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const byTab =
      activeTab === "all-articles"
        ? articles
        : activeTab === "published"
          ? articles.filter((item) => item.status === "Published")
          : articles.filter((item) => item.status === "Draft");

    if (!query.trim()) return byTab;
    const q = query.toLowerCase();
    return byTab.filter((item) => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q));
  }, [activeTab, query]);

  return (
    <div className="min-h-screen bg-[#FDFCF9] font-[Montserrat,sans-serif] text-[#313131]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[260px] shrink-0 bg-[#313131] text-white lg:block">
          <div className="border-b border-white/10 px-6 py-8">
            <p className="font-[Cormorant_Garamond,serif] text-xl font-semibold uppercase tracking-[0.1em]">The Global Sanctum</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Internal Portal</p>
          </div>
          <nav className="py-6 text-[13px]">
            <p className="px-6 pb-2 pt-2 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Editorial</p>
            <Link href="/portal/tgs-internal-portal-the-wellness-edit" className="block border-r-[3px] border-white bg-white/10 px-6 py-3 text-white">The Wellness Edit</Link>
            <Link href="/portal/tgs-internal-portal-sanctum-journal" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">Sanctum Journal</Link>
          </nav>
        </aside>

        <main className="w-full px-5 py-8 lg:px-8">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="font-[Cormorant_Garamond,serif] text-[32px] font-semibold">The Wellness Edit</h1>
              <span className="rounded-full bg-gradient-to-br from-[#E8F4EA] to-[#FEF9E7] px-3 py-1.5 text-[11px] font-medium text-[#4A7C59]">Editorial Blog</span>
            </div>
            <div className="flex gap-3">
              <button type="button" className="rounded-md border border-[#B8B8B8]/40 bg-white px-4 py-2.5 text-[13px]">Export</button>
              <button type="button" className="rounded-md bg-[#313131] px-4 py-2.5 text-[13px] text-white">New Article</button>
            </div>
          </header>

          <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-gradient-to-br from-[#313131] to-[#4a4a4a] p-6 text-white"><p className="text-[11px] uppercase opacity-80">Total Page Views (Feb)</p><p className="font-[Cormorant_Garamond,serif] text-[38px]">28,450</p><p className="text-xs text-[#C8E6C9]">+14.2%</p></article>
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white p-6"><p className="text-[11px] uppercase text-[#B8B8B8]">Total Articles</p><p className="font-[Cormorant_Garamond,serif] text-[38px]">47</p></article>
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white p-6"><p className="text-[11px] uppercase text-[#B8B8B8]">Published</p><p className="font-[Cormorant_Garamond,serif] text-[38px] text-[#4A7C59]">38</p></article>
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white p-6"><p className="text-[11px] uppercase text-[#B8B8B8]">Drafts</p><p className="font-[Cormorant_Garamond,serif] text-[38px] text-[#D4A853]">5</p></article>
          </section>

          <nav className="mb-5 flex overflow-x-auto border-b border-[#B8B8B8]/30">
            {[
              ["all-articles", "All Articles", "47"],
              ["published", "Published", "38"],
              ["drafts", "Drafts", "5"],
            ].map(([key, label, count]) => (
              <button key={key} type="button" onClick={() => setActiveTab(key as EditTab)} className={`-mb-px border-b-2 px-5 py-3 text-sm ${activeTab === key ? "border-[#313131] text-[#313131]" : "border-transparent text-[#B8B8B8] hover:text-[#313131]"}`}>
                {label}
                <span className="ml-2 rounded-full bg-[#F7F5F1] px-2 py-0.5 text-[11px]">{count}</span>
              </button>
            ))}
          </nav>

          {activeTab === "all-articles" ? (
            <section className="mb-5 grid gap-3 md:grid-cols-3">
              {[
                ["#1 This Month", "The Art of the Japanese Onsen", "3,240 views"],
                ["#2 This Month", "Finding Stillness in Bali's Sacred Valleys", "2,890 views"],
                ["#3 This Month", "Wellness Architecture: Designing for Healing", "2,450 views"],
              ].map(([rank, title, views]) => (
                <article key={title} className="rounded-xl border border-[#B8B8B8]/20 bg-white p-4"><p className="text-xs text-[#6B8EC9]">{rank}</p><p className="font-medium">{title}</p><p className="text-xs text-[#B8B8B8]">{views}</p></article>
              ))}
            </section>
          ) : null}

          <section className="mb-4 flex flex-wrap items-center gap-3">
            <select className="rounded-md border border-[#B8B8B8]/30 bg-white px-3 py-2 text-[13px]"><option>All Categories</option><option>Destinations</option><option>Experiences</option><option>Architecture</option><option>Interviews</option></select>
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full max-w-[320px] rounded-md border border-[#B8B8B8]/30 bg-white px-3 py-2 text-[13px]" placeholder="Search articles..." />
          </section>

          <section className="overflow-hidden rounded-xl border border-[#B8B8B8]/20 bg-white">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#F7F5F1] text-[10px] uppercase tracking-[0.05em] text-[#B8B8B8]"><th className="px-4 py-3">Article</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Views</th><th className="px-4 py-3">Author</th><th className="px-4 py-3">Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map((article) => (
                  <tr key={article.title} className="border-t border-[#B8B8B8]/10">
                    <td className="px-4 py-4"><p className="font-medium">{article.title}</p><p className="text-xs text-[#B8B8B8]">{article.excerpt}</p></td>
                    <td className="px-4 py-4">{article.category}</td>
                    <td className="px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-[11px] ${statusClass[article.status]}`}>{article.status}</span></td>
                    <td className="px-4 py-4">{article.views}</td>
                    <td className="px-4 py-4">{article.author}</td>
                    <td className="px-4 py-4"><button className="rounded border border-[#B8B8B8]/40 px-3 py-1 text-xs">Open</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}
