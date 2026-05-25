"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type EnquiryTab = "all" | "new" | "in-progress" | "resolved" | "closed";

const tabs: Array<{ key: EnquiryTab; label: string; count: number }> = [
  { key: "all", label: "All Enquiries", count: 0 },
  { key: "new", label: "New", count: 0 },
  { key: "in-progress", label: "In Progress", count: 0 },
  { key: "resolved", label: "Resolved", count: 0 },
  { key: "closed", label: "Closed", count: 0 },
];

export default function PortalEnquiriesDashboardPage() {
  const [activeTab, setActiveTab] = useState<EnquiryTab>("all");
  const [query, setQuery] = useState("");

  const selectedTab = useMemo(() => tabs.find((tab) => tab.key === activeTab) ?? tabs[0], [activeTab]);

  return (
    <div className="min-h-screen bg-[#f5f4f1] font-[Montserrat,sans-serif] text-[#2f2f2a]">
      <div className="flex min-h-screen max-[760px]:block">
        <aside className="w-[304px] shrink-0 border-r border-white/10 bg-gradient-to-b from-[#32353a] to-[#2b2d31] text-white max-[980px]:w-[240px] max-[760px]:w-full">
          <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-white/10 px-7 py-7">
            <div>
              <p className="max-w-[220px] font-[Cormorant_Garamond,serif] text-[19px] uppercase tracking-[0.12em] leading-[1.06]">The Global Sanctum</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[#c6c0b4]">Internal Portal</p>
            </div>
            <button
              type="button"
              aria-label="Collapse sidebar"
              className="h-[38px] w-[38px] cursor-default rounded-xl border border-white/15 bg-white/5 text-[#bdb8ac]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="4" width="18" height="16" rx="3" />
                <path d="M9 8l-3 4 3 4" />
                <line x1="12" y1="8" x2="12" y2="16" />
              </svg>
            </button>
          </div>

          <nav className="px-0 py-4 text-[14px]">
            <p className="px-[30px] py-2 text-[10px] uppercase tracking-[0.22em] text-[#8b8f96]">Content</p>
            <Link href="/portal/tgs-internal-portal-venues-page-v2" className="block px-[30px] py-3 text-white/80 hover:bg-white/10 hover:text-white">
              Venues
            </Link>
            <Link href="/portal/tgs-internal-portal---bookings-dashboard" className="block px-[30px] py-3 text-white/80 hover:bg-white/10 hover:text-white">
              Bookings
            </Link>
            <Link
              href="/portal/tgs-internal-portal-enquiries-dashboard"
              className="block border-l-[3px] border-white bg-white/15 px-[27px] py-3 text-white"
            >
              Enquiries
            </Link>

            <p className="px-[30px] py-2 pt-4 text-[10px] uppercase tracking-[0.22em] text-[#8b8f96]">Insights</p>
            <Link href="/portal/tgs-internal-portal-analytics" className="block px-[30px] py-3 text-white/80 hover:bg-white/10 hover:text-white">
              Analytics
            </Link>

            <p className="px-[30px] py-2 pt-4 text-[10px] uppercase tracking-[0.22em] text-[#8b8f96]">Team</p>
            <Link href="/portal/tgs-internal-portal-users" className="block px-[30px] py-3 text-white/80 hover:bg-white/10 hover:text-white">
              Users
            </Link>
            <Link href="/portal/tgs-internal-portal-settings" className="block px-[30px] py-3 text-white/80 hover:bg-white/10 hover:text-white">
              Settings
            </Link>
          </nav>

          <div className="mt-auto border-t border-white/10 bg-[#1d1e22]/95 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#cbc7bd] font-bold text-[#2d2f33]">K</div>
              <div>
                <p className="text-base font-semibold text-[#f4f2ee]">Kate</p>
                <p className="text-[13px] text-[#b0aaa0]">Administrator</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="w-[calc(100%-304px)] px-7 pb-8 pt-7 max-[980px]:w-[calc(100%-240px)] max-[760px]:w-full">
          <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="mb-2 font-[Cormorant_Garamond,serif] text-[56px] leading-[0.95] max-[980px]:text-[44px] max-[760px]:text-[40px]">Enquiries</h1>
              <p className="text-lg text-[#9f998e] max-[980px]:text-base">Manage guest enquiries and communications</p>
            </div>
            <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[#ccc5b9] px-5 py-2.5 text-base text-[#34332e] hover:bg-[#f2f0eb]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="M7 10l5-5 5 5" />
                <line x1="12" y1="5" x2="12" y2="16" />
              </svg>
              Export
            </button>
          </header>

          <section className="mb-5 grid gap-4 [grid-template-columns:repeat(4,minmax(0,1fr))] max-[1280px]:grid-cols-2 max-[760px]:grid-cols-1" aria-label="Enquiries summary">
            <article className="grid min-h-[150px] content-start gap-3 rounded-2xl border border-[#e8e4dc] bg-[#faf9f6] px-5 py-5">
              <p className="text-lg uppercase tracking-[0.06em] text-[#b0aa9f]">Total Enquiries</p>
              <p className="font-[Cormorant_Garamond,serif] text-[56px] leading-[0.9] text-[#1e3f66]">0</p>
              <p className="border-t border-[#e8e4dc] pt-3 text-base text-[#2a7f64]">0 awaiting response</p>
            </article>
            <article className="grid min-h-[150px] content-start gap-3 rounded-2xl border border-[#e8e4dc] bg-[#faf9f6] px-5 py-5">
              <p className="text-lg uppercase tracking-[0.06em] text-[#b0aa9f]">New (Unread)</p>
              <p className="font-[Cormorant_Garamond,serif] text-[56px] leading-[0.9] text-[#1e3f66]">0</p>
              <p className="border-t border-[#e8e4dc] pt-3 text-base text-[#a6a094]">Awaiting first response</p>
            </article>
            <article className="grid min-h-[150px] content-start gap-3 rounded-2xl border border-[#e8e4dc] bg-[#faf9f6] px-5 py-5">
              <p className="text-lg uppercase tracking-[0.06em] text-[#b0aa9f]">In Progress</p>
              <p className="font-[Cormorant_Garamond,serif] text-[56px] leading-[0.9] text-[#c9a14d]">0</p>
              <p className="border-t border-[#e8e4dc] pt-3 text-base text-[#a6a094]">Active conversations</p>
            </article>
            <article className="grid min-h-[150px] content-start gap-3 rounded-2xl border border-[#e8e4dc] bg-[#faf9f6] px-5 py-5">
              <p className="text-lg uppercase tracking-[0.06em] text-[#b0aa9f]">Resolution Rate</p>
              <p className="font-[Cormorant_Garamond,serif] text-[56px] leading-[0.9] text-[#2a7f64]">0%</p>
              <p className="border-t border-[#e8e4dc] pt-3 text-base text-[#a6a094]">0 resolved or closed</p>
            </article>
          </section>

          <nav className="mb-5 flex gap-2 overflow-x-auto border-b border-[#e8e4dc]" aria-label="Enquiry status tabs">
            {tabs.map((tab) => {
              const active = tab.key === selectedTab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`mb-[-1px] inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-1 pb-3 text-[15px] font-medium ${
                    active ? "border-[#2f2e29] text-[#2b2a26]" : "border-transparent text-[#9b958b]"
                  }`}
                >
                  {tab.label}
                  <span className={`inline-flex h-[22px] min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold ${active ? "bg-[#343434] text-[#f5f3ef]" : "bg-[#eceae5] text-[#b2aca2]"}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>

          <section className="mb-4 grid grid-cols-[1fr_auto] gap-3 max-[760px]:grid-cols-1" aria-label="Enquiries controls">
            <label className="flex h-[52px] max-w-[500px] items-center gap-2 rounded-xl border border-[#e8e4dc] bg-white px-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-[#b0aa9f]" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.65" y1="16.65" x2="21" y2="21" />
              </svg>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search enquiries"
                placeholder="Search by name, email, venue, or type..."
                className="w-full bg-transparent text-base text-[#2f2f2a] outline-none placeholder:text-[#aea89c]"
              />
            </label>
            <button type="button" className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border border-[#e8e4dc] bg-white px-4 text-base font-medium text-[#35342f] hover:bg-[#f5f3ee]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <polygon points="22,3 2,3 10,12.5 10,20.5 14,18.2 14,12.5" />
              </svg>
              Filters
            </button>
          </section>

          <section className="flex min-h-[260px] items-center justify-center rounded-[14px] border border-[#e8e4dc] bg-white text-[17px] text-[#8f8a80]" aria-label="Enquiries results">
            No enquiries found.
          </section>
        </main>
      </div>
    </div>
  );
}
