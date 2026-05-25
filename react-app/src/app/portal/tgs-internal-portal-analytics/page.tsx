"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type AnalyticsTab = "overview" | "revenue" | "venues" | "bookings" | "users" | "content" | "geographic";

const tabs: Array<{ key: AnalyticsTab; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "revenue", label: "Revenue" },
  { key: "venues", label: "Venues" },
  { key: "bookings", label: "Bookings" },
  { key: "users", label: "Users" },
  { key: "content", label: "Content" },
  { key: "geographic", label: "Geographic" },
];

const dateRanges = ["Today", "7D", "30D", "90D", "YTD", "Custom"];

const goalCards = [
  { label: "Venues", target: "Target: 1,500", pct: "7.9%", current: "118 (7.9%)", remaining: "1,382 to go", color: "info" },
  {
    label: "Annual Revenue",
    target: "Target: $5.74M",
    pct: "18.7%",
    current: "$1.07M (18.7%)",
    remaining: "$4.67M to go",
    color: "success",
  },
  {
    label: "Retreat Hosts",
    target: "Target: 500",
    pct: "31.2%",
    current: "156 (31.2%)",
    remaining: "344 to go",
    color: "warning",
  },
  {
    label: "Journal Subscribers",
    target: "Target: 10,000",
    pct: "28.5%",
    current: "2,847 (28.5%)",
    remaining: "7,153 to go",
    color: "info",
  },
];

function StatTile({ value, label, change }: { value: string; label: string; change?: string }) {
  return (
    <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center">
      <p className="font-[Cormorant_Garamond,serif] text-[28px] font-semibold">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.05em] text-[#B8B8B8]">{label}</p>
      {change ? <p className="mt-2 text-[11px] text-[#4A7C59]">{change}</p> : null}
    </article>
  );
}

function Leaderboard({ rows }: { rows: Array<{ rank: string; name: string; detail: string; value: string; sub: string }> }) {
  return (
    <div>
      {rows.map((row, idx) => (
        <div key={`${row.rank}-${row.name}`} className={`flex items-center gap-4 py-4 ${idx === 0 ? "" : "border-t border-[#B8B8B8]/10"}`}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F5F1] text-xs font-semibold">{row.rank}</div>
          <div className="flex-1">
            <p className="text-sm font-medium">{row.name}</p>
            <p className="text-[11px] text-[#B8B8B8]">{row.detail}</p>
          </div>
          <div className="text-right">
            <p className="text-base font-semibold">{row.value}</p>
            <p className="text-[11px] text-[#4A7C59]">{row.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PortalAnalyticsPage() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>("overview");
  const [activeRange, setActiveRange] = useState("30D");

  const tabContent = useMemo(() => {
    if (activeTab === "revenue") {
      return (
        <>
          <section className="mb-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            <StatTile value="$89,450" label="Total Revenue" change="↑ 23% MoM" />
            <StatTile value="$18,450" label="Subscription Revenue" change="↑ 12% MoM" />
            <StatTile value="$6,240" label="Commission Revenue" change="↑ 15% MoM" />
            <StatTile value="$342,500" label="GMV" change="↑ 28% MoM" />
            <StatTile value="$156" label="ARPU" change="↑ $12" />
            <StatTile value="7.2%" label="Take Rate" change="Healthy" />
          </section>
          <section className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white">
              <header className="border-b border-[#B8B8B8]/10 px-6 py-5 font-[Cormorant_Garamond,serif] text-[18px] font-semibold">Revenue by Source</header>
              <div className="p-6">
                <div className="flex h-[220px] items-center justify-center rounded-lg bg-gradient-to-br from-[#F7F5F1] to-[#E8E4E0] text-center text-sm text-[#B8B8B8]">
                  🥧 Pie Chart: Subscriptions (79%) vs Commission (21%)
                </div>
              </div>
            </article>
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white">
              <header className="border-b border-[#B8B8B8]/10 px-6 py-5 font-[Cormorant_Garamond,serif] text-[18px] font-semibold">MRR Growth</header>
              <div className="p-6">
                <div className="flex h-[220px] items-center justify-center rounded-lg bg-gradient-to-br from-[#F7F5F1] to-[#E8E4E0] text-center text-sm text-[#B8B8B8]">
                  📈 Line Chart: MRR from $0 to $18,450
                </div>
              </div>
            </article>
          </section>
        </>
      );
    }

    if (activeTab === "venues") {
      return (
        <>
          <section className="mb-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            <StatTile value="118" label="Active Venues" change="↑ 14 this month" />
            <StatTile value="78" label="Retreat Venues" />
            <StatTile value="40" label="Wellness Venues" />
            <StatTile value="15" label="Founders" change="8 Super, 7 Regular" />
            <StatTile value="2.3%" label="Churn Rate" change="↓ 0.5%" />
            <StatTile value="3,047" label="Database Total" change="Curated globally" />
          </section>
          <section className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white">
              <header className="border-b border-[#B8B8B8]/10 px-6 py-5 font-[Cormorant_Garamond,serif] text-[18px] font-semibold">Venues by Plan</header>
              <div className="p-6">
                <div className="flex h-[220px] items-center justify-center rounded-lg bg-gradient-to-br from-[#F7F5F1] to-[#E8E4E0] text-center text-sm text-[#B8B8B8]">
                  📊 Basic (24), Standard (38), Featured (22), Premium (12), Founder (15), Trial (7)
                </div>
              </div>
            </article>
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white">
              <header className="border-b border-[#B8B8B8]/10 px-6 py-5 font-[Cormorant_Garamond,serif] text-[18px] font-semibold">Venue Growth</header>
              <div className="p-6">
                <div className="flex h-[220px] items-center justify-center rounded-lg bg-gradient-to-br from-[#F7F5F1] to-[#E8E4E0] text-center text-sm text-[#B8B8B8]">
                  📈 Venue signups over time
                </div>
              </div>
            </article>
          </section>
        </>
      );
    }

    if (activeTab === "bookings") {
      return (
        <>
          <section className="mb-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            <StatTile value="89" label="Bookings This Month" change="↑ 34% MoM" />
            <StatTile value="$342,500" label="Total GMV" />
            <StatTile value="$3,848" label="Avg Booking Value" />
            <StatTile value="247" label="Enquiries" change="36% conversion" />
            <StatTile value="4.2" label="Avg Days to Book" />
            <StatTile value="5" label="Cancellations" change="5.6% rate" />
          </section>
          <section className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white">
              <header className="border-b border-[#B8B8B8]/10 px-6 py-5 font-[Cormorant_Garamond,serif] text-[18px] font-semibold">Bookings by Type</header>
              <div className="grid gap-4 p-6 md:grid-cols-2">
                <div className="rounded-xl bg-[#F7F5F1] p-5">
                  <p className="text-[11px] uppercase tracking-[0.1em] text-[#B8B8B8]">Retreat Bookings</p>
                  <p className="mt-2 font-[Cormorant_Garamond,serif] text-[32px] font-semibold">67</p>
                  <p className="text-xs text-[#B8B8B8]">75% of total • $298,400 GMV</p>
                </div>
                <div className="rounded-xl bg-[#F7F5F1] p-5">
                  <p className="text-[11px] uppercase tracking-[0.1em] text-[#B8B8B8]">Wellness Bookings</p>
                  <p className="mt-2 font-[Cormorant_Garamond,serif] text-[32px] font-semibold">22</p>
                  <p className="text-xs text-[#B8B8B8]">25% of total • $44,100 GMV</p>
                </div>
              </div>
            </article>
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white">
              <header className="border-b border-[#B8B8B8]/10 px-6 py-5 font-[Cormorant_Garamond,serif] text-[18px] font-semibold">Booking Timeline</header>
              <div className="p-6">
                <div className="flex h-[220px] items-center justify-center rounded-lg bg-gradient-to-br from-[#F7F5F1] to-[#E8E4E0] text-center text-sm text-[#B8B8B8]">
                  📈 Bookings per week over time
                </div>
              </div>
            </article>
          </section>
        </>
      );
    }

    if (activeTab === "users") {
      return (
        <>
          <section className="mb-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            <StatTile value="118" label="Venue Owners" change="↑ 14 this month" />
            <StatTile value="156" label="Retreat Hosts" change="↑ 18 this month" />
            <StatTile value="2,847" label="Journal Subscribers" change="↑ 124 this month" />
            <StatTile value="42" label="Verified Hosts" />
            <StatTile value="12" label="VIP Partners" />
            <StatTile value="68%" label="Host Activation" change="Made 1+ booking" />
          </section>
          <section className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white">
              <header className="border-b border-[#B8B8B8]/10 px-6 py-5 font-[Cormorant_Garamond,serif] text-[18px] font-semibold">Top Retreat Hosts by GMV</header>
              <div className="p-6">
                <Leaderboard
                  rows={[
                    { rank: "1", name: "Tom Cronin", detail: "The Stillness Project • VIP", value: "$127,500", sub: "12 bookings" },
                    { rank: "2", name: "Anna Roberts", detail: "Sacred Wellness", value: "$72,000", sub: "8 bookings" },
                    { rank: "3", name: "Marcus Lee", detail: "Breathe Deep", value: "$47,500", sub: "5 bookings" },
                  ]}
                />
              </div>
            </article>
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white">
              <header className="border-b border-[#B8B8B8]/10 px-6 py-5 font-[Cormorant_Garamond,serif] text-[18px] font-semibold">User Growth</header>
              <div className="p-6">
                <div className="flex h-[220px] items-center justify-center rounded-lg bg-gradient-to-br from-[#F7F5F1] to-[#E8E4E0] text-center text-sm text-[#B8B8B8]">
                  📈 User growth by type over time
                </div>
              </div>
            </article>
          </section>
        </>
      );
    }

    if (activeTab === "content") {
      return (
        <>
          <section className="mb-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            <StatTile value="24,850" label="Blog Page Views" change="↑ 32% MoM" />
            <StatTile value="47" label="Articles Published" />
            <StatTile value="4:32" label="Avg Time on Page" />
            <StatTile value="52.4%" label="Newsletter Open Rate" change="vs 21.5% industry" />
            <StatTile value="8.7%" label="Newsletter Click Rate" change="vs 2.3% industry" />
            <StatTile value="342" label="Newsletter Signups" change="18% conversion" />
          </section>
          <section className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white">
              <header className="border-b border-[#B8B8B8]/10 px-6 py-5 font-[Cormorant_Garamond,serif] text-[18px] font-semibold">Top Articles by Views</header>
              <div className="p-6">
                <Leaderboard
                  rows={[
                    { rank: "1", name: "The Art of the Japanese Onsen", detail: "Destinations • Jan 15", value: "3,240", sub: "views" },
                    { rank: "2", name: "Finding Stillness in Bali", detail: "Experiences • Jan 22", value: "2,890", sub: "views" },
                    { rank: "3", name: "Wellness Architecture", detail: "Architecture • Feb 1", value: "2,450", sub: "views" },
                  ]}
                />
              </div>
            </article>
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white">
              <header className="border-b border-[#B8B8B8]/10 px-6 py-5 font-[Cormorant_Garamond,serif] text-[18px] font-semibold">Content Performance</header>
              <div className="p-6">
                <div className="flex h-[220px] items-center justify-center rounded-lg bg-gradient-to-br from-[#F7F5F1] to-[#E8E4E0] text-center text-sm text-[#B8B8B8]">
                  📊 Views and engagement over time
                </div>
              </div>
            </article>
          </section>
        </>
      );
    }

    if (activeTab === "geographic") {
      return (
        <section className="grid gap-6">
          <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white">
            <header className="border-b border-[#B8B8B8]/10 px-6 py-5 font-[Cormorant_Garamond,serif] text-[18px] font-semibold">Global Distribution</header>
            <div className="p-6">
              <div className="flex h-[280px] items-center justify-center rounded-lg bg-gradient-to-br from-[#F7F5F1] to-[#E8E4E0] text-center text-sm text-[#B8B8B8]">
                🗺️ World Map with venue markers<br />3,047 venues curated • 118 active • 6 continents
              </div>
            </div>
          </article>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white p-6">
              <h3 className="mb-3 font-[Cormorant_Garamond,serif] text-[18px] font-semibold">Venues by Country</h3>
              <div className="space-y-3 text-sm">
                {[
                  "Australia — 1,047",
                  "Japan — 574",
                  "New Zealand — 312",
                  "Indonesia — 287",
                  "Thailand — 198",
                  "United States — 156",
                ].map((item) => (
                  <p key={item} className="border-b border-[#B8B8B8]/10 pb-2 last:border-b-0">
                    {item}
                  </p>
                ))}
              </div>
            </article>
            <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white p-6">
              <h3 className="mb-3 font-[Cormorant_Garamond,serif] text-[18px] font-semibold">Active Venues by Region</h3>
              <div className="space-y-3 text-sm">
                {["NSW — 42", "QLD — 28", "VIC — 22", "Japan — 12", "New Zealand — 8", "Other — 6"].map((item) => (
                  <p key={item} className="border-b border-[#B8B8B8]/10 pb-2 last:border-b-0">
                    {item}
                  </p>
                ))}
              </div>
            </article>
          </div>
        </section>
      );
    }

    return (
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white lg:col-span-2">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#B8B8B8]/10 px-6 py-5">
            <h3 className="font-[Cormorant_Garamond,serif] text-[18px] font-semibold">Revenue Trend</h3>
            <div className="flex gap-2 text-xs">
              <button type="button" className="rounded border border-[#B8B8B8]/40 px-3 py-1.5">Subscriptions</button>
              <button type="button" className="rounded border border-[#B8B8B8]/40 px-3 py-1.5">Commission</button>
              <button type="button" className="rounded bg-[#313131] px-3 py-1.5 text-white">Total</button>
            </div>
          </header>
          <div className="p-6">
            <div className="flex h-[300px] items-center justify-center rounded-lg bg-gradient-to-br from-[#F7F5F1] to-[#E8E4E0] text-center text-sm text-[#B8B8B8]">
              📈 Revenue Chart (Aug 2025 - Feb 2026)<br />Subscriptions: $18,450/mo | Commission: $6,240/mo
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white">
          <header className="border-b border-[#B8B8B8]/10 px-6 py-5 font-[Cormorant_Garamond,serif] text-[18px] font-semibold">Booking Funnel</header>
          <div className="space-y-4 p-6 text-sm">
            {[
              ["Website Visits", "12,450", "100%"],
              ["Venue Views", "8,964", "72%"],
              ["Enquiries", "247", "2.8%"],
              ["Bookings", "89", "36%"],
            ].map(([label, value, rate], idx) => (
              <div key={label} className="grid grid-cols-[130px_1fr_60px] items-center gap-3">
                <span className="text-right text-xs">{label}</span>
                <div className="rounded-lg bg-gradient-to-r from-[#6B8EC9] to-[#4A7C59] px-4 py-2 text-white" style={{ width: `${[100, 72, 18, 7][idx]}%` }}>
                  {value}
                </div>
                <span className="text-xs text-[#B8B8B8]">{rate}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-[#B8B8B8]/20 bg-white">
          <header className="border-b border-[#B8B8B8]/10 px-6 py-5 font-[Cormorant_Garamond,serif] text-[18px] font-semibold">Top Venues by GMV</header>
          <div className="p-6">
            <Leaderboard
              rows={[
                { rank: "1", name: "Moraea Farm", detail: "Hunter Valley, NSW", value: "$127,500", sub: "↑ 18%" },
                { rank: "2", name: "Serenity Retreat Centre", detail: "Blue Mountains, NSW", value: "$89,200", sub: "↑ 24%" },
                { rank: "3", name: "Mountain Sanctuary", detail: "Byron Hinterland, NSW", value: "$64,800", sub: "↑ 31%" },
                { rank: "4", name: "The Wellness Collective", detail: "Byron Bay, NSW", value: "$42,500", sub: "↑ 12%" },
              ]}
            />
          </div>
        </article>
      </section>
    );
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#FDFCF9] font-[Montserrat,sans-serif] text-[#313131]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[260px] shrink-0 bg-[#313131] text-white lg:block">
          <div className="border-b border-white/10 px-6 py-8">
            <p className="font-[Cormorant_Garamond,serif] text-xl font-semibold uppercase tracking-[0.1em]">The Global Sanctum</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Internal Portal</p>
          </div>
          <nav className="py-6 text-[13px]">
            <p className="px-6 pb-2 pt-2 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Content</p>
            <Link href="/portal/tgs-internal-portal-venues-page-v2" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">Venues</Link>
            <Link href="/portal/tgs-internal-portal---bookings-dashboard" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">Bookings</Link>
            <Link href="/portal/tgs-internal-portal-enquiries-dashboard" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">Enquiries</Link>
            <p className="px-6 pb-2 pt-4 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">System</p>
            <Link href="/portal/tgs-internal-portal-analytics" className="block border-r-[3px] border-white bg-white/10 px-6 py-3 text-white">Analytics</Link>
            <Link href="/portal/tgs-internal-portal-settings" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">Settings</Link>
          </nav>
        </aside>

        <main className="w-full px-5 py-8 lg:px-8">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="font-[Cormorant_Garamond,serif] text-[32px] font-semibold">Analytics</h1>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F4EA] px-3 py-1.5 text-[11px] font-medium text-[#4A7C59]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#4A7C59]" />
                Live Data
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex overflow-hidden rounded-lg border border-[#B8B8B8]/30 bg-white text-xs">
                {dateRanges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setActiveRange(range)}
                    className={`px-3 py-2 ${activeRange === range ? "bg-[#313131] text-white" : "hover:bg-[#F7F5F1]"}`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <button type="button" className="rounded-md border border-[#B8B8B8]/40 bg-white px-4 py-2.5 text-[13px] hover:border-[#313131]">
                Export
              </button>
            </div>
          </header>

          <section className="mb-6 rounded-xl border border-[#B8B8B8]/20 bg-white px-6 py-4">
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <span className="text-[11px] uppercase tracking-[0.1em] text-[#B8B8B8]">Live Activity</span>
              <span>New booking: Moraea Farm <span className="text-xs text-[#B8B8B8]">2m ago</span></span>
              <span>Venue signup: Zen Gardens <span className="text-xs text-[#B8B8B8]">8m ago</span></span>
              <span>Enquiry: Mountain Sanctuary <span className="text-xs text-[#B8B8B8]">15m ago</span></span>
              <span>Journal subscriber: +1 <span className="text-xs text-[#B8B8B8]">22m ago</span></span>
            </div>
          </section>

          <section className="mb-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Total GMV (Feb)", "$342,500", "↑ 28% vs Jan", "Gross Merchandise Value", "primary"],
              ["TGS Revenue (Feb)", "$89,450", "↑ 23% vs Jan", "Subscriptions + Commission", "success"],
              ["Active Venues", "118", "↑ 14 this month", "Paying subscribers", "info"],
              ["Bookings (Feb)", "89", "↑ 34% vs Jan", "Confirmed retreats", "warning"],
            ].map(([label, value, change, sublabel, tone]) => (
              <article
                key={label}
                className={`rounded-2xl border border-[#B8B8B8]/20 p-6 text-white ${
                  tone === "primary"
                    ? "bg-gradient-to-br from-[#313131] to-[#4a4a4a]"
                    : tone === "success"
                      ? "bg-gradient-to-br from-[#4A7C59] to-[#3d6b4a]"
                      : tone === "info"
                        ? "bg-gradient-to-br from-[#6B8EC9] to-[#5a7db8]"
                        : "bg-gradient-to-br from-[#D4A853] to-[#b8923a]"
                }`}
              >
                <p className="text-[11px] uppercase tracking-[0.1em] text-white/80">{label}</p>
                <p className="mt-2 font-[Cormorant_Garamond,serif] text-[42px] leading-none">{value}</p>
                <p className="mt-2 text-xs text-[#90EE90]">{change}</p>
                <p className="mt-1 text-[11px] text-white/75">{sublabel}</p>
              </article>
            ))}
          </section>

          <h3 className="mb-4 font-[Cormorant_Garamond,serif] text-[20px] font-semibold">Year 1 Goals Progress</h3>
          <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {goalCards.map((goal) => (
              <article key={goal.label} className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <p className="text-sm font-medium">{goal.label}</p>
                  <p className="text-[11px] text-[#B8B8B8]">{goal.target}</p>
                </div>
                <div className="mb-2 h-2 w-full overflow-hidden rounded bg-[#F7F5F1]">
                  <div
                    className={`h-full rounded ${goal.color === "success" ? "bg-[#4A7C59]" : goal.color === "warning" ? "bg-[#D4A853]" : "bg-[#6B8EC9]"}`}
                    style={{ width: goal.pct }}
                  />
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="font-semibold">{goal.current}</span>
                  <span className="text-[#B8B8B8]">{goal.remaining}</span>
                </div>
              </article>
            ))}
          </section>

          <nav className="mb-6 flex overflow-x-auto border-b border-[#B8B8B8]/30">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`-mb-px border-b-2 px-5 py-3 text-sm font-medium ${
                  activeTab === tab.key ? "border-[#313131] text-[#313131]" : "border-transparent text-[#B8B8B8] hover:text-[#313131]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {tabContent}
        </main>
      </div>
    </div>
  );
}
