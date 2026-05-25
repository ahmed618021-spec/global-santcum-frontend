"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type OwnersTab = "all-owners" | "retreat-owners" | "wellness-owners";

type OwnerRow = {
  owner: string;
  email: string;
  phone: string;
  venue: string;
  location: string;
  venueCount: string;
  tier: string;
  tierClass: "basic" | "standard" | "featured" | "premium";
  status: "Active" | "Onboarding" | "Pending" | "Paused";
  revenue: string;
  revenuePeriod: string;
  lastActive: string;
  commission: string;
};

type TabConfig = {
  key: OwnersTab;
  label: string;
  count: number;
  stats: Array<{ value: string; label: string; tone?: "success" | "warning" | "info" }>;
  rows: OwnerRow[];
};

const allRows: OwnerRow[] = [
  {
    owner: "Michael Torres",
    email: "michael@serenityretreat.com",
    phone: "+61 412 433 812",
    venue: "Serenity Retreat",
    location: "Byron Bay, NSW",
    venueCount: "2 venues",
    tier: "Featured",
    tierClass: "featured",
    status: "Active",
    revenue: "$4,250",
    revenuePeriod: "Lifetime",
    lastActive: "Today",
    commission: "5%",
  },
  {
    owner: "Sarah Chen",
    email: "sarah@bodhiday.com",
    phone: "+61 433 118 702",
    venue: "Bodhi Day Spa",
    location: "Melbourne, VIC",
    venueCount: "1 venue",
    tier: "Standard",
    tierClass: "standard",
    status: "Onboarding",
    revenue: "$2,150",
    revenuePeriod: "Lifetime",
    lastActive: "2 days ago",
    commission: "7%",
  },
  {
    owner: "Rachel Wong",
    email: "rachel@mountainsanctuary.co",
    phone: "+61 401 007 300",
    venue: "Mountain Sanctuary",
    location: "Blue Mountains, NSW",
    venueCount: "1 venue",
    tier: "Basic",
    tierClass: "basic",
    status: "Paused",
    revenue: "$890",
    revenuePeriod: "Lifetime",
    lastActive: "14 Jan",
    commission: "7%",
  },
  {
    owner: "Daniel Hart",
    email: "daniel@lakesideretreat.co",
    phone: "+61 422 876 109",
    venue: "Lakeside Retreat",
    location: "Noosa, QLD",
    venueCount: "1 venue",
    tier: "Premium",
    tierClass: "premium",
    status: "Active",
    revenue: "$3,580",
    revenuePeriod: "Lifetime",
    lastActive: "Yesterday",
    commission: "5%",
  },
  {
    owner: "Elena Cruz",
    email: "elena@zenmeadow.com",
    phone: "+61 429 118 620",
    venue: "Zen Meadow",
    location: "Perth, WA",
    venueCount: "1 venue",
    tier: "Standard",
    tierClass: "standard",
    status: "Pending",
    revenue: "$237",
    revenuePeriod: "Lifetime",
    lastActive: "Pending verification",
    commission: "7%",
  },
];

const retreatRows: OwnerRow[] = [
  {
    owner: "Alicia Brown",
    email: "alicia@sunrise-retreat.com",
    phone: "+61 410 772 102",
    venue: "Sunrise Retreat",
    location: "Margaret River, WA",
    venueCount: "4 retreat packages",
    tier: "Premium",
    tierClass: "premium",
    status: "Active",
    revenue: "$127,000",
    revenuePeriod: "YTD",
    lastActive: "Today",
    commission: "5%",
  },
  {
    owner: "Nora Ellis",
    email: "nora@evergreenretreats.com",
    phone: "+61 490 115 771",
    venue: "Evergreen Retreat",
    location: "Adelaide Hills, SA",
    venueCount: "3 retreat packages",
    tier: "Featured",
    tierClass: "featured",
    status: "Active",
    revenue: "$89,500",
    revenuePeriod: "YTD",
    lastActive: "Yesterday",
    commission: "5%",
  },
  {
    owner: "Liam Stewart",
    email: "liam@saltforestretreat.au",
    phone: "+61 455 211 804",
    venue: "Salt Forest Retreat",
    location: "Sunshine Coast, QLD",
    venueCount: "2 retreat packages",
    tier: "Standard",
    tierClass: "standard",
    status: "Active",
    revenue: "$45,000",
    revenuePeriod: "YTD",
    lastActive: "3 days ago",
    commission: "7%",
  },
];

const wellnessRows: OwnerRow[] = [
  {
    owner: "Maya Patel",
    email: "maya@urbanwellnesshub.com",
    phone: "+61 421 911 670",
    venue: "Urban Wellness Hub",
    location: "Sydney, NSW",
    venueCount: "1 venue",
    tier: "Standard",
    tierClass: "standard",
    status: "Onboarding",
    revenue: "$0",
    revenuePeriod: "MTD",
    lastActive: "Onboarding step 3",
    commission: "7%",
  },
  {
    owner: "Chris Bloom",
    email: "chris@seasidehealing.com",
    phone: "+61 488 766 954",
    venue: "Seaside Healing",
    location: "Gold Coast, QLD",
    venueCount: "1 venue",
    tier: "Featured",
    tierClass: "featured",
    status: "Active",
    revenue: "$8,450",
    revenuePeriod: "MTD",
    lastActive: "Today",
    commission: "5%",
  },
  {
    owner: "Ivy Lam",
    email: "ivy@stillnessstudio.au",
    phone: "+61 402 907 114",
    venue: "Stillness Studio",
    location: "Canberra, ACT",
    venueCount: "1 venue",
    tier: "Basic",
    tierClass: "basic",
    status: "Active",
    revenue: "$1,800",
    revenuePeriod: "MTD",
    lastActive: "2 days ago",
    commission: "7%",
  },
];

const tabs: TabConfig[] = [
  {
    key: "all-owners",
    label: "All Owners",
    count: 56,
    stats: [
      { value: "56", label: "Total Owners" },
      { value: "43", label: "Active", tone: "success" },
      { value: "6", label: "Onboarding", tone: "info" },
      { value: "4", label: "Pending", tone: "warning" },
      { value: "$11.3K", label: "MRR", tone: "success" },
      { value: "6.2%", label: "Avg Commission" },
    ],
    rows: allRows,
  },
  {
    key: "retreat-owners",
    label: "Retreat Owners",
    count: 24,
    stats: [
      { value: "24", label: "Retreat Owners" },
      { value: "18", label: "Active", tone: "success" },
      { value: "3", label: "Onboarding", tone: "info" },
      { value: "2", label: "Pending", tone: "warning" },
      { value: "$261.5K", label: "Revenue (YTD)", tone: "success" },
      { value: "$20.1K", label: "Booking Revenue", tone: "success" },
    ],
    rows: retreatRows,
  },
  {
    key: "wellness-owners",
    label: "Wellness Owners",
    count: 32,
    stats: [
      { value: "32", label: "Wellness Owners" },
      { value: "25", label: "Active", tone: "success" },
      { value: "3", label: "Onboarding", tone: "info" },
      { value: "2", label: "Pending", tone: "warning" },
      { value: "$20.6K", label: "Revenue (MTD)", tone: "success" },
      { value: "$1.5K", label: "Booking Revenue", tone: "success" },
    ],
    rows: wellnessRows,
  },
];

const alerts = [
  {
    title: "Serenity Retreat - Payment failed",
    meta: "Michael Torres • Failed 3 days ago • Featured tier",
    actionA: "Retry Billing",
    actionB: "Contact Owner",
  },
  {
    title: "Bodhi Day Spa - Onboarding incomplete",
    meta: "Sarah Chen • Started 5 days ago • Missing photos and pricing",
    actionA: "View Profile",
    actionB: "Send Reminder",
  },
  {
    title: "Mountain Sanctuary - No activity in 30 days",
    meta: "Rachel Wong • Last login: 14 Jan • Standard tier",
    actionA: "Reach Out",
    actionB: "View Account",
  },
];

const statusClass: Record<OwnerRow["status"], string> = {
  Active: "bg-[#E8F4EA] text-[#4A7C59]",
  Onboarding: "bg-[#E8EFF9] text-[#6B8EC9]",
  Pending: "bg-[#FEF9E7] text-[#D4A853]",
  Paused: "bg-[#F7F5F1] text-[#B8B8B8]",
};

const tierClass: Record<OwnerRow["tierClass"], string> = {
  basic: "bg-[#F0E6E6] text-[#8B5A5A]",
  standard: "bg-[#E8EFF9] text-[#6B8EC9]",
  featured: "bg-[#FEF9E7] text-[#B8860B]",
  premium: "bg-[#E8F4EA] text-[#4A7C59]",
};

export default function PortalVenueOwnersDashboardPage() {
  const [activeTab, setActiveTab] = useState<OwnersTab>("all-owners");
  const [query, setQuery] = useState("");

  const tab = useMemo(() => tabs.find((item) => item.key === activeTab) ?? tabs[0], [activeTab]);
  const visibleRows = useMemo(() => {
    if (!query.trim()) return tab.rows;
    const q = query.toLowerCase();
    return tab.rows.filter((row) => row.owner.toLowerCase().includes(q) || row.venue.toLowerCase().includes(q) || row.location.toLowerCase().includes(q));
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
            <p className="px-6 pb-2 pt-2 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Venues</p>
            <Link href="/portal/tgs-internal-portal-venues-page-v2" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">
              Venues
            </Link>
            <Link
              href="/portal/tgs-internal-portal-venue-owners-general-dashboard"
              className="block border-r-[3px] border-white bg-white/10 px-6 py-3 text-white"
            >
              Venue Owners
            </Link>
            <Link href="/portal/tgs-internal-portal-users" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">
              Users
            </Link>
          </nav>
        </aside>

        <main className="w-full px-5 py-8 lg:px-8">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#B8B8B8]/20 bg-white px-6 py-5">
            <div>
              <h1 className="font-[Cormorant_Garamond,serif] text-[32px] font-semibold">Venue Owners</h1>
              <p className="text-[13px] text-[#B8B8B8]">Overview and performance of all venue owner accounts</p>
            </div>
            <div className="flex gap-3">
              <button type="button" className="rounded-md border border-[#B8B8B8]/40 bg-white px-4 py-2.5 text-[13px]">
                Export
              </button>
              <button type="button" className="rounded-md bg-[#313131] px-4 py-2.5 text-[13px] text-white">
                Add Owner
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
              <option>All Tiers</option>
              <option>Basic</option>
              <option>Standard</option>
              <option>Featured</option>
              <option>Premium</option>
            </select>
            <select className="rounded-md border border-[#B8B8B8]/30 bg-white px-3 py-2 text-[13px]">
              <option>All Status</option>
              <option>Active</option>
              <option>Onboarding</option>
              <option>Pending</option>
              <option>Paused</option>
            </select>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full max-w-[320px] rounded-md border border-[#B8B8B8]/30 bg-white px-3 py-2 text-[13px]"
              placeholder="Search owner, venue, location..."
            />
            <div className="ml-auto flex gap-3">
              <button type="button" className="rounded-md border border-[#B8B8B8]/40 bg-white px-3 py-2 text-[12px]">
                Bulk Actions
              </button>
              <button type="button" className="rounded-md bg-[#4A7C59] px-3 py-2 text-[12px] text-white">
                Verify Selected
              </button>
            </div>
          </section>

          {activeTab === "all-owners" ? (
            <section className="mb-6 rounded-xl border border-[#D4A853] bg-[#FEF9E7] p-5">
              <header className="mb-4 flex items-center justify-between">
                <h3 className="font-[Cormorant_Garamond,serif] text-[18px] font-semibold text-[#B8860B]">Attention Required</h3>
                <button type="button" className="rounded border border-[#D4A853]/50 bg-white px-3 py-1.5 text-xs text-[#B8860B]">
                  Review All
                </button>
              </header>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <article key={alert.title} className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white px-4 py-3">
                    <div>
                      <p className="text-[13px] font-medium">{alert.title}</p>
                      <p className="text-xs text-[#B8B8B8]">{alert.meta}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" className="rounded border border-[#B8B8B8]/40 bg-white px-3 py-1.5 text-xs">
                        {alert.actionA}
                      </button>
                      <button type="button" className="rounded bg-[#313131] px-3 py-1.5 text-xs text-white">
                        {alert.actionB}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className="overflow-hidden rounded-xl border border-[#B8B8B8]/20 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-[1200px] w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#F7F5F1] text-[10px] uppercase tracking-[0.05em] text-[#B8B8B8]">
                    <th className="px-4 py-3">Owner</th>
                    <th className="px-4 py-3">Venue</th>
                    <th className="px-4 py-3">Tier</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Last Activity</th>
                    <th className="px-4 py-3">Commission</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row) => (
                    <tr key={`${row.email}-${row.venue}`} className="border-t border-[#B8B8B8]/10 text-[13px] hover:bg-[#F7F5F1]">
                      <td className="px-4 py-4">
                        <p className="font-medium">{row.owner}</p>
                        <p className="text-xs text-[#B8B8B8]">{row.email}</p>
                        <p className="text-xs text-[#B8B8B8]">{row.phone}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium">{row.venue}</p>
                        <p className="text-xs text-[#B8B8B8]">{row.location}</p>
                        <p className="text-xs text-[#6B8EC9]">{row.venueCount}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-block rounded px-2.5 py-1 text-[10px] font-semibold uppercase ${tierClass[row.tierClass]}`}>{row.tier}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] ${statusClass[row.status]}`}>{row.status}</span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-[Cormorant_Garamond,serif] text-[20px] font-semibold">{row.revenue}</p>
                        <p className="text-[10px] uppercase tracking-[0.05em] text-[#B8B8B8]">{row.revenuePeriod}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p>{row.lastActive}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-[#4A7C59]">{row.commission}</p>
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
                Showing 1-{visibleRows.length} of {tab.rows.length} owners
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
