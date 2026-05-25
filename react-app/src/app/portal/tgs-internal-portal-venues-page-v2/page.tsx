"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type VenueType = "Retreat" | "Wellness";
type VenueStatus = "Active" | "Draft" | "Inactive";
type Subscription = "Essentials" | "Standard" | "Featured" | "Premium";

type Venue = {
  id: string;
  name: string;
  locationText: string;
  locationShort: string;
  type: VenueType;
  capacity: number;
  status: VenueStatus;
  subscription: Subscription;
  added: string;
};

const venues: Venue[] = [
  {
    id: "moraea-farm",
    name: "Moraea Farm",
    locationText: "Berry, NSW, Australia",
    locationShort: "Berry, NSW",
    type: "Retreat",
    capacity: 12,
    status: "Active",
    subscription: "Featured",
    added: "Feb 8, 2026",
  },
  {
    id: "curraweena-house",
    name: "Curraweena House",
    locationText: "Kangaroo Valley, NSW, Australia",
    locationShort: "Kangaroo Valley, NSW",
    type: "Retreat",
    capacity: 14,
    status: "Active",
    subscription: "Standard",
    added: "Feb 6, 2026",
  },
  {
    id: "soak-wellness",
    name: "Soak Wellness",
    locationText: "West End, QLD, Australia",
    locationShort: "West End, QLD",
    type: "Wellness",
    capacity: 40,
    status: "Active",
    subscription: "Premium",
    added: "Feb 4, 2026",
  },
  {
    id: "byron-bay-retreat-house",
    name: "Byron Bay Retreat House",
    locationText: "Byron Bay, NSW, Australia",
    locationShort: "Byron Bay, NSW",
    type: "Retreat",
    capacity: 20,
    status: "Draft",
    subscription: "Essentials",
    added: "Feb 2, 2026",
  },
  {
    id: "hakone-onsen-ryokan",
    name: "Hakone Onsen Ryokan",
    locationText: "Hakone, Kanagawa, Japan",
    locationShort: "Hakone, Japan",
    type: "Wellness",
    capacity: 24,
    status: "Active",
    subscription: "Featured",
    added: "Jan 28, 2026",
  },
  {
    id: "ubud-healing-centre",
    name: "Ubud Healing Centre",
    locationText: "Ubud, Bali, Indonesia",
    locationShort: "Ubud, Bali",
    type: "Retreat",
    capacity: 18,
    status: "Active",
    subscription: "Standard",
    added: "Jan 25, 2026",
  },
  {
    id: "merse-wellness-brisbane",
    name: "Merse Wellness Brisbane",
    locationText: "Brisbane, QLD, Australia",
    locationShort: "Brisbane, QLD",
    type: "Wellness",
    capacity: 35,
    status: "Inactive",
    subscription: "Essentials",
    added: "Jan 20, 2026",
  },
  {
    id: "riverstone-hinterland-house",
    name: "Riverstone Hinterland House",
    locationText: "Sunshine Coast, QLD, Australia",
    locationShort: "Sunshine Coast, QLD",
    type: "Retreat",
    capacity: 22,
    status: "Active",
    subscription: "Premium",
    added: "Jan 16, 2026",
  },
  {
    id: "sora-sanctuary",
    name: "Sora Sanctuary",
    locationText: "Kyoto, Japan",
    locationShort: "Kyoto, Japan",
    type: "Wellness",
    capacity: 28,
    status: "Active",
    subscription: "Standard",
    added: "Jan 11, 2026",
  },
  {
    id: "ocean-cedar-retreat",
    name: "Ocean Cedar Retreat",
    locationText: "Byron Bay, NSW, Australia",
    locationShort: "Byron Bay, NSW",
    type: "Retreat",
    capacity: 16,
    status: "Draft",
    subscription: "Essentials",
    added: "Jan 9, 2026",
  },
];

type TabKey = "all" | "retreat" | "wellness" | "active" | "draft" | "inactive";

const tabMeta: Array<{ key: TabKey; label: string }> = [
  { key: "all", label: "All Venues" },
  { key: "retreat", label: "Retreat Venues" },
  { key: "wellness", label: "Wellness Venues" },
  { key: "active", label: "Active" },
  { key: "draft", label: "Draft" },
  { key: "inactive", label: "Inactive" },
];

function filterByTab(list: Venue[], tab: TabKey) {
  if (tab === "all") return list;
  if (tab === "retreat") return list.filter((v) => v.type === "Retreat");
  if (tab === "wellness") return list.filter((v) => v.type === "Wellness");
  if (tab === "active") return list.filter((v) => v.status === "Active");
  if (tab === "draft") return list.filter((v) => v.status === "Draft");
  return list.filter((v) => v.status === "Inactive");
}

function countForTab(tab: TabKey) {
  return filterByTab(venues, tab).length;
}

export default function PortalVenuesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(7);

  const filtered = useMemo(() => {
    const byTab = filterByTab(venues, activeTab);
    const q = query.trim().toLowerCase();
    if (!q) return byTab;
    return byTab.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.locationText.toLowerCase().includes(q) ||
        v.locationShort.toLowerCase().includes(q),
    );
  }, [activeTab, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * perPage;
  const pageRows = filtered.slice(start, start + perPage);

  const allOnPageSelected = pageRows.length > 0 && pageRows.every((v) => selectedIds.includes(v.id));

  const toggleSelectPage = () => {
    if (allOnPageSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageRows.some((v) => v.id === id)));
      return;
    }
    setSelectedIds((prev) => {
      const next = new Set(prev);
      pageRows.forEach((v) => next.add(v.id));
      return Array.from(next);
    });
  };

  const onTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setPage(1);
  };

  const onPerPageChange = (value: number) => {
    setPerPage(value);
    setPage(1);
  };

  const firstItem = filtered.length === 0 ? 0 : start + 1;
  const lastItem = Math.min(start + perPage, filtered.length);

  return (
    <div className="min-h-screen bg-[#FDFCF9] font-[Montserrat,sans-serif] text-[#313131]">
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col justify-between bg-[#313131] text-white lg:flex">
          <div>
            <div className="border-b border-white/10 px-6 py-8">
              <p className="font-[Cormorant_Garamond,serif] text-xl font-semibold uppercase tracking-[0.1em]">The Global Sanctum</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Internal Portal</p>
            </div>
            <nav className="px-0 py-6 text-[13px]">
              <p className="px-6 pb-2 pt-2 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Content</p>
              <Link href="/portal/tgs-internal-portal-venues-page-v2" className="block border-l-[3px] border-white bg-white/10 px-[21px] py-3 text-white">
                Venues
              </Link>
              <Link href="/portal/tgs-internal-portal---bookings-dashboard" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">
                Bookings
              </Link>
              <Link href="/portal/tgs-internal-portal-enquiries-dashboard" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">
                Enquiries
              </Link>
              <p className="px-6 pb-2 pt-4 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Insights</p>
              <Link href="/portal/tgs-internal-portal-analytics" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">
                Analytics
              </Link>
              <p className="px-6 pb-2 pt-4 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Team</p>
              <Link href="/portal/tgs-internal-portal-users" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">
                Users
              </Link>
              <Link href="/portal/tgs-internal-portal-settings" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">
                Settings
              </Link>
            </nav>
          </div>
          <div className="border-t border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B8B8B8] font-semibold text-[#313131]">K</div>
              <div>
                <p className="text-[13px] text-white">Kate</p>
                <p className="text-[11px] text-[#B8B8B8]">Administrator</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="w-full px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
          <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-[Cormorant_Garamond,serif] text-[32px] font-semibold">Venues</h1>
              <p className="text-sm text-[#B8B8B8]">Manage all venue listings across the platform</p>
            </div>
            <div className="flex gap-3">
              <button type="button" className="rounded-[20px] border border-[#B8B8B8] px-5 py-2.5 text-[13px] font-medium hover:bg-[#F7F5F1]">
                Export
              </button>
              <button type="button" className="rounded-[20px] bg-[#313131] px-5 py-2.5 text-[13px] font-medium text-white hover:bg-[#4a4a4a]">
                Add Venue
              </button>
            </div>
          </header>

          <div className="mb-6 overflow-x-auto border-b border-[#B8B8B8]/30">
            <div className="flex min-w-max gap-0">
              {tabMeta.map((tab) => {
                const active = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => onTabChange(tab.key)}
                    className={`-mb-px border-b-2 px-5 py-3 text-[13px] font-medium ${
                      active ? "border-[#313131] text-[#313131]" : "border-transparent text-[#B8B8B8] hover:text-[#313131]"
                    }`}
                  >
                    {tab.label}
                    <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] ${active ? "bg-[#313131] text-white" : "bg-[#F7F5F1] text-[#313131]"}`}>
                      {countForTab(tab.key)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <label className="flex w-full max-w-[420px] items-center rounded-lg border border-[#B8B8B8]/30 bg-white px-4 py-2.5 focus-within:border-[#313131]">
              <span className="mr-3 text-[#B8B8B8]">⌕</span>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search venues by name, location, or owner..."
                className="w-full bg-transparent text-[13px] outline-none placeholder:text-[#B8B8B8]"
              />
            </label>
            <div className="flex items-center gap-3">
              <button type="button" className="rounded-lg border border-[#B8B8B8]/30 bg-white px-4 py-2.5 text-[13px] hover:border-[#313131]">
                Filters
              </button>
              <button type="button" className="rounded-lg border border-[#B8B8B8]/30 bg-white px-4 py-2.5 text-[13px] hover:border-[#313131]">
                Columns
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#B8B8B8]/20 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] border-collapse">
                <thead>
                  <tr className="border-b border-[#B8B8B8]/20 bg-[#F7F5F1] text-left text-[11px] uppercase tracking-[0.05em] text-[#B8B8B8]">
                    <th className="w-10 px-5 py-4">
                      <input
                        type="checkbox"
                        checked={allOnPageSelected}
                        onChange={toggleSelectPage}
                        className="h-[18px] w-[18px] cursor-pointer rounded border-2 border-[#B8B8B8]"
                      />
                    </th>
                    <th className="px-5 py-4">Venue Name</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4">Location</th>
                    <th className="px-5 py-4">Capacity</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Subscription</th>
                    <th className="px-5 py-4">Added</th>
                    <th className="w-12 px-5 py-4" />
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((venue) => {
                    const checked = selectedIds.includes(venue.id);
                    return (
                      <tr key={venue.id} className="border-b border-[#B8B8B8]/10 text-[13px] hover:bg-[#F7F5F1]">
                        <td className="px-5 py-4">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              setSelectedIds((prev) => (checked ? prev.filter((id) => id !== venue.id) : [...prev, venue.id]));
                            }}
                            className="h-[18px] w-[18px] cursor-pointer rounded border-2 border-[#B8B8B8]"
                          />
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-medium text-[#313131]">{venue.name}</p>
                          <p className="text-xs text-[#B8B8B8]">{venue.locationText}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                              venue.type === "Retreat" ? "bg-[#4A7C59]/10 text-[#4A7C59]" : "bg-[#6B8EC9]/10 text-[#6B8EC9]"
                            }`}
                          >
                            {venue.type}
                          </span>
                        </td>
                        <td className="px-5 py-4">{venue.locationShort}</td>
                        <td className="px-5 py-4 font-medium">{venue.capacity}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-2 text-xs">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                venue.status === "Active"
                                  ? "bg-[#4A7C59]"
                                  : venue.status === "Draft"
                                    ? "bg-[#D4A853]"
                                    : "bg-[#B8B8B8]"
                              }`}
                            />
                            {venue.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded px-2.5 py-1 text-[11px] font-medium ${
                              venue.subscription === "Featured"
                                ? "bg-[#D4A853]/15 text-[#9A7B3C]"
                                : venue.subscription === "Premium"
                                  ? "bg-[#313131]/10 text-[#313131]"
                                  : venue.subscription === "Standard"
                                    ? "bg-[#B8B8B8]/20 text-[#313131]"
                                    : "bg-[#F7F5F1] text-[#B8B8B8]"
                            }`}
                          >
                            {venue.subscription}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-[#B8B8B8]">{venue.added}</td>
                        <td className="px-5 py-4 text-center">
                          <button type="button" className="rounded-md p-1.5 text-[#B8B8B8] hover:bg-[#F7F5F1] hover:text-[#313131]" aria-label="Venue row actions">
                            •••
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#B8B8B8]/20 bg-[#F7F5F1] px-5 py-4">
              <p className="text-[13px] text-[#B8B8B8]">Showing {firstItem}-{lastItem} of {filtered.length} venues</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safePage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="h-9 w-9 rounded-lg border border-[#B8B8B8]/30 bg-white text-[13px] disabled:opacity-40"
                >
                  ←
                </button>
                {Array.from({ length: pageCount }).slice(0, 6).map((_, idx) => {
                  const n = idx + 1;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPage(n)}
                      className={`h-9 w-9 rounded-lg border text-[13px] ${
                        safePage === n ? "border-[#313131] bg-[#313131] text-white" : "border-[#B8B8B8]/30 bg-white"
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
                {pageCount > 6 ? <span className="px-1 text-sm text-[#B8B8B8]">...</span> : null}
                <button
                  type="button"
                  disabled={safePage >= pageCount}
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  className="h-9 w-9 rounded-lg border border-[#B8B8B8]/30 bg-white text-[13px] disabled:opacity-40"
                >
                  →
                </button>
                <label className="ml-4 flex items-center gap-2 text-[13px] text-[#B8B8B8]">
                  <span>Show</span>
                  <select
                    value={perPage}
                    onChange={(e) => onPerPageChange(Number(e.target.value))}
                    className="rounded-md border border-[#B8B8B8]/30 bg-white px-2 py-1 text-[#313131]"
                  >
                    <option value={7}>7</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
