"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type JournalTab = "editions" | "subscribers" | "template";

type Edition = {
  title: string;
  category: string;
  status: "Sent" | "Scheduled" | "Planning";
  audience: string;
  openRate: string;
  clickRate: string;
};

const editions: Edition[] = [
  {
    title: "Issue #42 - The Art of the Japanese Onsen",
    category: "Destinations",
    status: "Scheduled",
    audience: "All Subscribers",
    openRate: "--",
    clickRate: "--",
  },
  {
    title: "Issue #41 - Wellness Architecture for Healing",
    category: "Architecture",
    status: "Sent",
    audience: "All Subscribers",
    openRate: "47.8%",
    clickRate: "11.2%",
  },
  {
    title: "Issue #40 - Finding Stillness in Bali",
    category: "Experiences",
    status: "Sent",
    audience: "All Subscribers",
    openRate: "45.9%",
    clickRate: "10.6%",
  },
  {
    title: "Issue #43 - March Edition Curation",
    category: "Editorial",
    status: "Planning",
    audience: "Segmented",
    openRate: "--",
    clickRate: "--",
  },
];

const subscribers = [
  ["Emma Watson", "emma.watson@email.com", "Wellness Traveler", "Active", "Jan 2026"],
  ["James Kim", "james.kim@email.com", "Retreat Explorer", "Active", "Dec 2025"],
  ["Sophie Patel", "sophie.patel@email.com", "Mindfulness Reader", "Active", "Dec 2025"],
  ["Maria Torres", "maria.torres@email.com", "Luxury Wellness", "Paused", "Nov 2025"],
  ["Akiko Nakamura", "akiko.n@email.com", "Wellness Traveler", "Active", "Oct 2025"],
];

const statusClass: Record<Edition["status"], string> = {
  Sent: "bg-[#E8F4EA] text-[#4A7C59]",
  Scheduled: "bg-[#E8EFF9] text-[#6B8EC9]",
  Planning: "bg-[#F3E8F9] text-[#8B5A8B]",
};

export default function PortalSanctumJournalPage() {
  const [activeTab, setActiveTab] = useState<JournalTab>("editions");
  const [query, setQuery] = useState("");

  const filteredEditions = useMemo(() => {
    if (!query.trim()) return editions;
    const q = query.toLowerCase();
    return editions.filter((edition) => edition.title.toLowerCase().includes(q) || edition.category.toLowerCase().includes(q));
  }, [query]);

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
            <Link href="/portal/tgs-internal-portal-the-wellness-edit" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">The Wellness Edit</Link>
            <Link href="/portal/tgs-internal-portal-sanctum-journal" className="block border-r-[3px] border-white bg-white/10 px-6 py-3 text-white">Sanctum Journal</Link>
          </nav>
        </aside>

        <main className="w-full px-5 py-8 lg:px-8">
          <header className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="font-[Cormorant_Garamond,serif] text-[32px] font-semibold">Sanctum Journal</h1>
              <span className="rounded-full bg-gradient-to-br from-[#F3E8F9] to-[#E8EFF9] px-3 py-1.5 text-[11px] font-medium text-[#8B5A8B]">Weekly Newsletter</span>
            </div>
            <div className="flex gap-3">
              <button type="button" className="rounded-md border border-[#B8B8B8]/40 bg-white px-4 py-2.5 text-[13px]">Sync Now</button>
              <button type="button" className="rounded-md bg-[#8B5A8B] px-4 py-2.5 text-[13px] text-white">New Edition</button>
            </div>
          </header>

          <section className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#8B5A8B]/40 bg-gradient-to-br from-[#F3E8F9] to-[#E8EFF9] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[#8B5A8B]">BEEHIIV</div>
              <div>
                <p className="text-sm font-medium text-[#8B5A8B]">Beehiiv Connected</p>
                <p className="text-xs text-[#B8B8B8]">Last synced: 5 minutes ago • Subscribers and analytics auto-sync hourly</p>
              </div>
            </div>
            <p className="text-xs text-[#8B5A8B]">2,847 subscribers</p>
          </section>

          <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-gradient-to-br from-[#8B5A8B] to-[#6B4A6B] p-6 text-white"><p className="text-[11px] uppercase opacity-80">Total Subscribers</p><p className="font-[Cormorant_Garamond,serif] text-[38px]">2,847</p><p className="text-xs text-[#C8E6C9]">+132 this month</p></article>
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white p-6"><p className="text-[11px] uppercase text-[#B8B8B8]">Open Rate</p><p className="font-[Cormorant_Garamond,serif] text-[38px]">46.8%</p><p className="text-xs text-[#4A7C59]">+2.1%</p></article>
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white p-6"><p className="text-[11px] uppercase text-[#B8B8B8]">Click Rate</p><p className="font-[Cormorant_Garamond,serif] text-[38px]">10.9%</p><p className="text-xs text-[#4A7C59]">+0.9%</p></article>
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white p-6"><p className="text-[11px] uppercase text-[#B8B8B8]">Editions Sent</p><p className="font-[Cormorant_Garamond,serif] text-[38px]">42</p><p className="text-xs text-[#4A7C59]">Steady growth</p></article>
          </section>

          <nav className="mb-5 flex overflow-x-auto border-b border-[#B8B8B8]/30">
            {[
              ["editions", "Editions", "42"],
              ["subscribers", "Subscribers", "2,847"],
              ["template", "Template", "12 sections"],
            ].map(([key, label, count]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key as JournalTab)}
                className={`-mb-px border-b-2 px-5 py-3 text-sm ${activeTab === key ? "border-[#313131] text-[#313131]" : "border-transparent text-[#B8B8B8] hover:text-[#313131]"}`}
              >
                {label}
                <span className="ml-2 rounded-full bg-[#F7F5F1] px-2 py-0.5 text-[11px]">{count}</span>
              </button>
            ))}
          </nav>

          {activeTab === "editions" ? (
            <>
              <section className="mb-4 flex flex-wrap items-center gap-3">
                <select className="rounded-md border border-[#B8B8B8]/30 bg-white px-3 py-2 text-[13px]"><option>All Status</option><option>Sent</option><option>Scheduled</option><option>Planning</option></select>
                <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full max-w-[300px] rounded-md border border-[#B8B8B8]/30 bg-white px-3 py-2 text-[13px]" placeholder="Search editions..." />
              </section>
              <section className="overflow-hidden rounded-xl border border-[#B8B8B8]/20 bg-white">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-[#F7F5F1] text-[10px] uppercase tracking-[0.05em] text-[#B8B8B8]"><th className="px-4 py-3">Edition</th><th className="px-4 py-3">Audience</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Open</th><th className="px-4 py-3">Click</th><th className="px-4 py-3">Actions</th></tr>
                  </thead>
                  <tbody>
                    {filteredEditions.map((edition) => (
                      <tr key={edition.title} className="border-t border-[#B8B8B8]/10">
                        <td className="px-4 py-4"><p className="font-medium">{edition.title}</p><p className="text-xs text-[#B8B8B8]">{edition.category}</p></td>
                        <td className="px-4 py-4">{edition.audience}</td>
                        <td className="px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-[11px] ${statusClass[edition.status]}`}>{edition.status}</span></td>
                        <td className="px-4 py-4">{edition.openRate}</td>
                        <td className="px-4 py-4">{edition.clickRate}</td>
                        <td className="px-4 py-4"><button className="rounded border border-[#B8B8B8]/40 px-3 py-1 text-xs">Open</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </>
          ) : null}

          {activeTab === "subscribers" ? (
            <section className="overflow-hidden rounded-xl border border-[#B8B8B8]/20 bg-white">
              <table className="w-full border-collapse text-left text-sm">
                <thead><tr className="bg-[#F7F5F1] text-[10px] uppercase tracking-[0.05em] text-[#B8B8B8]"><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Segment</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Joined</th></tr></thead>
                <tbody>
                  {subscribers.map((row) => (
                    <tr key={row[1]} className="border-t border-[#B8B8B8]/10">{row.map((cell, idx) => (<td key={`${row[1]}-${idx}`} className="px-4 py-4">{cell}</td>))}</tr>
                  ))}
                </tbody>
              </table>
            </section>
          ) : null}

          {activeTab === "template" ? (
            <section className="rounded-xl border border-[#B8B8B8]/20 bg-white p-6">
              <h3 className="mb-3 font-[Cormorant_Garamond,serif] text-[22px] font-semibold">Newsletter Sections</h3>
              <p className="mb-4 text-sm text-[#B8B8B8]">Consistent sections help readers know what to expect. Edit these in Beehiiv template builder.</p>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  ["Featured Article", "Hero article from this week"],
                  ["Destinations", "Curated location stories"],
                  ["Experiences", "Immersive practices and retreats"],
                  ["Architecture", "Spaces designed for healing"],
                ].map(([title, desc]) => (
                  <article key={title} className="rounded-lg bg-[#F7F5F1] p-4"><p className="font-medium">{title}</p><p className="text-xs text-[#B8B8B8]">{desc}</p></article>
                ))}
              </div>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}
