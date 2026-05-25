"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type HostsTab = "all-hosts" | "verified-hosts" | "pending-hosts";

type HostRow = {
  host: string;
  org: string;
  email: string;
  venue: string;
  location: string;
  source: "Direct" | "Referral" | "Partner" | "Organic";
  modalities: string[];
  rating: string;
  reviews: string;
  status: "VIP" | "Verified" | "Pending" | "New" | "Inactive";
  lastActive: string;
};

const allHosts: HostRow[] = [
  {
    host: "Emma Carter",
    org: "Sacred Flow Retreats",
    email: "emma@sacredflow.com",
    venue: "Byron Coast Sanctuary",
    location: "Byron Bay, NSW",
    source: "Direct",
    modalities: ["Yoga", "Meditation", "Breathwork"],
    rating: "4.9",
    reviews: "128",
    status: "VIP",
    lastActive: "Today",
  },
  {
    host: "Noah Williams",
    org: "Inner Path Collective",
    email: "noah@innerpath.co",
    venue: "Mountain Light Retreat",
    location: "Blue Mountains, NSW",
    source: "Referral",
    modalities: ["Wellness", "Meditation"],
    rating: "4.7",
    reviews: "76",
    status: "Verified",
    lastActive: "Yesterday",
  },
  {
    host: "Sophia Chen",
    org: "Serenity Programs",
    email: "sophia@serenityprograms.au",
    venue: "Lakeside Sanctuary",
    location: "Noosa, QLD",
    source: "Partner",
    modalities: ["Yoga", "Corporate"],
    rating: "4.6",
    reviews: "44",
    status: "Verified",
    lastActive: "2 days ago",
  },
  {
    host: "Liam Patel",
    org: "Still Point Wellness",
    email: "liam@stillpointwellness.com",
    venue: "Urban Restore House",
    location: "Melbourne, VIC",
    source: "Organic",
    modalities: ["Sound", "Breathwork"],
    rating: "4.3",
    reviews: "18",
    status: "Pending",
    lastActive: "Pending verification",
  },
  {
    host: "Mia Torres",
    org: "Earth Rhythm Retreats",
    email: "mia@earthrhythm.com",
    venue: "Riverstone Escape",
    location: "Margaret River, WA",
    source: "Referral",
    modalities: ["Yoga", "Meditation", "Wellness"],
    rating: "4.8",
    reviews: "92",
    status: "New",
    lastActive: "Today",
  },
];

const tabs: Array<{
  key: HostsTab;
  label: string;
  count: number;
  stats: Array<{ value: string; label: string; tone?: "success" | "warning" | "info" }>;
  rows: HostRow[];
}> = [
  {
    key: "all-hosts",
    label: "All Hosts",
    count: 156,
    stats: [
      { value: "156", label: "Total Hosts" },
      { value: "42", label: "Verified", tone: "success" },
      { value: "8", label: "Pending Verification", tone: "warning" },
      { value: "24", label: "VIP Hosts", tone: "info" },
      { value: "4.7", label: "Avg Rating", tone: "success" },
      { value: "18", label: "New This Month", tone: "success" },
    ],
    rows: allHosts,
  },
  {
    key: "verified-hosts",
    label: "Verified Hosts",
    count: 42,
    stats: [
      { value: "42", label: "Verified Hosts", tone: "success" },
      { value: "24", label: "VIP Hosts", tone: "info" },
      { value: "4.8", label: "Avg Rating", tone: "success" },
      { value: "296", label: "Retreats Hosted" },
      { value: "86%", label: "Response Rate", tone: "success" },
      { value: "94%", label: "Completion Rate", tone: "success" },
    ],
    rows: allHosts.filter((host) => host.status === "VIP" || host.status === "Verified"),
  },
  {
    key: "pending-hosts",
    label: "Pending Verification",
    count: 8,
    stats: [
      { value: "8", label: "Pending Review", tone: "warning" },
      { value: "3", label: "Docs Missing", tone: "warning" },
      { value: "5", label: "Ready To Verify", tone: "info" },
      { value: "2.4d", label: "Avg Review Time" },
      { value: "12", label: "New Applications" },
      { value: "91%", label: "Approval Rate", tone: "success" },
    ],
    rows: allHosts.filter((host) => host.status === "Pending" || host.status === "New"),
  },
];

const sourceClass: Record<HostRow["source"], string> = {
  Direct: "bg-[#E8F4EA] text-[#4A7C59]",
  Referral: "bg-[#E8EFF9] text-[#6B8EC9]",
  Partner: "bg-[#FEF9E7] text-[#D4A853]",
  Organic: "bg-[#F7F5F1] text-[#B8B8B8]",
};

const statusClass: Record<HostRow["status"], string> = {
  VIP: "bg-gradient-to-r from-[#E8F4EA] to-[#FEF9E7] text-[#4A7C59] border border-[#4A7C59]/40",
  Verified: "bg-[#E8F4EA] text-[#4A7C59]",
  Pending: "bg-[#FEF9E7] text-[#D4A853]",
  New: "bg-[#E8EFF9] text-[#6B8EC9]",
  Inactive: "bg-[#F7F5F1] text-[#B8B8B8]",
};

export default function PortalRetreatHostsDashboardPage() {
  const [activeTab, setActiveTab] = useState<HostsTab>("all-hosts");
  const [query, setQuery] = useState("");

  const tab = useMemo(() => tabs.find((item) => item.key === activeTab) ?? tabs[0], [activeTab]);

  const visibleRows = useMemo(() => {
    if (!query.trim()) return tab.rows;
    const q = query.toLowerCase();
    return tab.rows.filter(
      (row) =>
        row.host.toLowerCase().includes(q) ||
        row.venue.toLowerCase().includes(q) ||
        row.location.toLowerCase().includes(q) ||
        row.org.toLowerCase().includes(q),
    );
  }, [query, tab.rows]);

  return (
    <div className="min-h-screen bg-[#FDFCF9] font-[Montserrat,sans-serif] text-[#313131]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[260px] shrink-0 bg-[#313131] text-white lg:block">
          <div className="border-b border-white/10 px-6 py-8">
            <p className="font-[Cormorant_Garamond,serif] text-xl font-semibold uppercase tracking-[0.1em]">The Global Sanctum</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Internal Portal</p>
          </div>
          <nav className="py-6 text-[13px]">
            <p className="px-6 pb-2 pt-2 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Hosts</p>
            <Link
              href="/portal/tgs-internal-portal---retreat-host-general-dashboard"
              className="block border-r-[3px] border-white bg-white/10 px-6 py-3 text-white"
            >
              Retreat Hosts
            </Link>
            <Link href="/portal/tgs-internal-portal-users" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">
              Users
            </Link>
            <Link href="/portal/tgs-internal-portal-analytics" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">
              Analytics
            </Link>
          </nav>
        </aside>

        <main className="w-full px-5 py-8 lg:px-8">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#B8B8B8]/20 bg-white px-6 py-5">
            <h1 className="font-[Cormorant_Garamond,serif] text-[32px] font-semibold">Retreat Hosts</h1>
            <div className="flex gap-3">
              <button type="button" className="rounded-md border border-[#B8B8B8]/40 bg-white px-4 py-2.5 text-[13px]">
                Import
              </button>
              <button type="button" className="rounded-md border border-[#B8B8B8]/40 bg-white px-4 py-2.5 text-[13px]">
                Export
              </button>
              <button type="button" className="rounded-md bg-[#313131] px-4 py-2.5 text-[13px] text-white">
                Add Retreat Host
              </button>
            </div>
          </header>

          <nav className="mb-5 flex overflow-x-auto border-b border-[#B8B8B8]/30">
            {tabs.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveTab(item.key)}
                className={`-mb-px border-b-2 px-5 py-3 text-sm font-medium ${
                  activeTab === item.key ? "border-[#313131] text-[#313131]" : "border-transparent text-[#B8B8B8] hover:text-[#313131]"
                }`}
              >
                {item.label}
                <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] ${activeTab === item.key ? "bg-[#313131] text-white" : "bg-[#F7F5F1] text-[#313131]"}`}>
                  {item.count}
                </span>
              </button>
            ))}
          </nav>

          <section className="mb-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {tab.stats.map((stat) => (
              <article key={stat.label} className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center">
                <p
                  className={`font-[Cormorant_Garamond,serif] text-[32px] ${
                    stat.tone === "success" ? "text-[#4A7C59]" : stat.tone === "warning" ? "text-[#D4A853]" : stat.tone === "info" ? "text-[#6B8EC9]" : ""
                  }`}
                >
                  {stat.value}
                </p>
                <p className="text-[11px] uppercase tracking-[0.04em] text-[#B8B8B8]">{stat.label}</p>
              </article>
            ))}
          </section>

          <section className="mb-5 flex flex-wrap items-center gap-3">
            <select className="rounded-md border border-[#B8B8B8]/30 bg-white px-3 py-2 text-[13px]">
              <option>All Modalities</option>
              <option>Yoga</option>
              <option>Meditation</option>
              <option>Breathwork</option>
              <option>Corporate</option>
            </select>
            <select className="rounded-md border border-[#B8B8B8]/30 bg-white px-3 py-2 text-[13px]">
              <option>All Sources</option>
              <option>Direct</option>
              <option>Referral</option>
              <option>Partner</option>
              <option>Organic</option>
            </select>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full max-w-[320px] rounded-md border border-[#B8B8B8]/30 bg-white px-3 py-2 text-[13px]"
              placeholder="Search hosts, venue, organisation..."
            />
            <button type="button" className="ml-auto rounded-md border border-[#B8B8B8]/40 bg-white px-3 py-2 text-[12px]">
              Clear Filters
            </button>
          </section>

          <section className="overflow-hidden rounded-xl border border-[#B8B8B8]/20 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-[1200px] w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#F7F5F1] text-[10px] uppercase tracking-[0.05em] text-[#B8B8B8]">
                    <th className="px-4 py-3">Host</th>
                    <th className="px-4 py-3">Primary Venue</th>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3">Modalities</th>
                    <th className="px-4 py-3">Rating</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Last Active</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row) => (
                    <tr key={row.email} className="border-t border-[#B8B8B8]/10 text-[13px] hover:bg-[#F7F5F1]">
                      <td className="px-4 py-4">
                        <p className="font-medium">{row.host}</p>
                        <p className="text-xs text-[#B8B8B8]">{row.org}</p>
                        <p className="text-xs text-[#B8B8B8]">{row.email}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium">{row.venue}</p>
                        <p className="text-xs text-[#B8B8B8]">{row.location}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`rounded px-2.5 py-1 text-[10px] font-semibold uppercase ${sourceClass[row.source]}`}>{row.source}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex max-w-[240px] flex-wrap gap-1">
                          {row.modalities.map((modality) => (
                            <span key={modality} className="rounded-full bg-[#F7F5F1] px-2 py-0.5 text-[10px]">
                              {modality}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-[#D4A853]">{row.rating} ★</p>
                        <p className="text-xs text-[#B8B8B8]">{row.reviews} reviews</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] ${statusClass[row.status]}`}>{row.status}</span>
                      </td>
                      <td className="px-4 py-4">
                        <p className={row.lastActive === "Today" ? "text-[#4A7C59]" : row.lastActive.includes("Pending") ? "text-[#D4A853]" : ""}>{row.lastActive}</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button type="button" className="rounded border border-[#B8B8B8]/40 px-3 py-1.5 text-xs">
                            View
                          </button>
                          <button type="button" className="rounded bg-[#313131] px-3 py-1.5 text-xs text-white">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-[#B8B8B8]/20 bg-[#F7F5F1] px-4 py-3 text-sm text-[#B8B8B8]">
              <p>
                Showing 1-{visibleRows.length} of {tab.rows.length} hosts
              </p>
              <div className="flex gap-2">
                <button type="button" className="rounded border border-[#B8B8B8]/40 bg-white px-3 py-1 text-xs">
                  Previous
                </button>
                <button type="button" className="rounded border border-[#313131] bg-[#313131] px-3 py-1 text-xs text-white">
                  1
                </button>
                <button type="button" className="rounded border border-[#B8B8B8]/40 bg-white px-3 py-1 text-xs">
                  Next
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
