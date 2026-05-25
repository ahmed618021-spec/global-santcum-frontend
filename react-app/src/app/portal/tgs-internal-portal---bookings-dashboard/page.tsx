"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type TopTab = "all" | "retreat" | "wellness";
type BookingStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled" | "No Show";

type ActionItem = {
  title: string;
  meta: string;
  actions: string[];
};

type BookingRow = {
  date: string;
  dateMeta: string;
  title: string;
  type: string;
  typeBadge?: "retreat" | "wellness";
  venue: string;
  venueLocation: string;
  guest: string;
  guestDetail: string;
  status: BookingStatus;
  amount: string;
  amountMeta: string;
  tier: "Basic" | "Standard" | "Featured" | "Premium";
  commission: string;
  extraAction?: string;
};

type TabConfig = {
  key: TopTab;
  label: string;
  count: number;
  subtitle: string;
  stats: Array<{ value: string; label: string; tone?: "success" | "warning" | "error" | "info" }>;
  filters: string[];
  searchPlaceholder: string;
  actionTitle: string;
  actionItems: ActionItem[];
  rows: BookingRow[];
  paginationLabel: string;
};

const allRows: BookingRow[] = [
  {
    date: "Feb 14",
    dateMeta: "2:00 PM",
    title: "Couples Day Spa Package",
    type: "3 hours",
    typeBadge: "wellness",
    venue: "Bodhi Day Spa",
    venueLocation: "Surry Hills, Sydney",
    guest: "Michael & Emma Roberts",
    guestDetail: "2 guests",
    status: "Confirmed",
    amount: "$550",
    amountMeta: "Net: $495",
    tier: "Featured",
    commission: "7% • $38.50",
  },
  {
    date: "Feb 20-23",
    dateMeta: "4 nights",
    title: "Women's Wellness Retreat",
    type: "Full board",
    typeBadge: "retreat",
    venue: "Moraea Farm",
    venueLocation: "Berry, NSW",
    guest: "Emma Davis",
    guestDetail: "Stillness Project • 10 guests",
    status: "Confirmed",
    amount: "$18,000",
    amountMeta: "Net: $17,100",
    tier: "Premium",
    commission: "5% • $900",
  },
  {
    date: "Feb 27-Mar 1",
    dateMeta: "2 nights",
    title: "Corporate Mindfulness Workshop",
    type: "Day rates",
    typeBadge: "retreat",
    venue: "Moraea Farm",
    venueLocation: "Berry, NSW",
    guest: "James Chen",
    guestDetail: "Zenith Consulting • 8 guests",
    status: "Pending",
    amount: "$9,000",
    amountMeta: "Net: $8,550",
    tier: "Premium",
    commission: "5% • $450",
    extraAction: "Accept",
  },
  {
    date: "Jan 25-28",
    dateMeta: "3 nights",
    title: "Silent Meditation Retreat",
    type: "Full board",
    typeBadge: "retreat",
    venue: "Moraea Farm",
    venueLocation: "Berry, NSW",
    guest: "Tom Cronin",
    guestDetail: "The Stillness Project • 8 guests",
    status: "Completed",
    amount: "$13,500",
    amountMeta: "Net: $12,825",
    tier: "Premium",
    commission: "5% • $675",
  },
];

const retreatRows: BookingRow[] = [
  {
    date: "Feb 20-23",
    dateMeta: "4 nights",
    title: "Women's Wellness Retreat",
    type: "Full board inclusive",
    venue: "Moraea Farm",
    venueLocation: "Berry, NSW",
    guest: "Emma Davis",
    guestDetail: "Stillness Project • 10 of 12",
    status: "Confirmed",
    amount: "$18,000",
    amountMeta: "Net: $17,100",
    tier: "Premium",
    commission: "5% • $900",
  },
  {
    date: "Feb 27-Mar 1",
    dateMeta: "2 nights",
    title: "Corporate Mindfulness Workshop",
    type: "Day rates + accommodation",
    venue: "Moraea Farm",
    venueLocation: "Berry, NSW",
    guest: "James Chen",
    guestDetail: "Zenith Consulting • 8 of 12",
    status: "Pending",
    amount: "$9,000",
    amountMeta: "Net: $8,550",
    tier: "Premium",
    commission: "5% • $450",
    extraAction: "Accept",
  },
  {
    date: "Mar 15-22",
    dateMeta: "7 nights",
    title: "Yoga Teacher Training Intensive",
    type: "Full board inclusive",
    venue: "Moraea Farm",
    venueLocation: "Berry, NSW",
    guest: "Anna Richardson",
    guestDetail: "Soul Yoga • 12 of 12",
    status: "Confirmed",
    amount: "$28,000",
    amountMeta: "Net: $26,600",
    tier: "Premium",
    commission: "5% • $1,400",
  },
  {
    date: "Apr 5-9",
    dateMeta: "4 nights",
    title: "Breathwork & Cold Exposure",
    type: "Full board inclusive",
    venue: "Serenity Retreat",
    venueLocation: "Blue Mountains, NSW",
    guest: "Marcus Lee",
    guestDetail: "Primal Wellness • 15 of 20",
    status: "Confirmed",
    amount: "$22,500",
    amountMeta: "Net: $20,925",
    tier: "Featured",
    commission: "7% • $1,575",
  },
  {
    date: "Mar 1-4",
    dateMeta: "3 nights",
    title: "Executive Leadership Retreat",
    type: "Full board inclusive",
    venue: "Mountain Sanctuary",
    venueLocation: "Kangaroo Valley, NSW",
    guest: "Rachel Wong",
    guestDetail: "Mindful Leaders Co • 6 of 10",
    status: "Cancelled",
    amount: "$15,000",
    amountMeta: "Cancelled 5 Feb",
    tier: "Standard",
    commission: "No commission",
  },
];

const wellnessRows: BookingRow[] = [
  {
    date: "Feb 13",
    dateMeta: "10:00 AM",
    title: "Signature Relaxation Massage",
    type: "Massage Therapy",
    venue: "Bodhi Day Spa",
    venueLocation: "Surry Hills, Sydney",
    guest: "Sarah Thompson",
    guestDetail: "Returning guest • 90 mins",
    status: "Pending",
    amount: "$195",
    amountMeta: "Net: $181.35",
    tier: "Featured",
    commission: "7% • $13.65",
    extraAction: "Confirm",
  },
  {
    date: "Feb 14",
    dateMeta: "2:00 PM",
    title: "Couples Day Spa Package",
    type: "Spa Packages",
    venue: "Bodhi Day Spa",
    venueLocation: "Surry Hills, Sydney",
    guest: "Michael & Emma Roberts",
    guestDetail: "2 guests • 3 hours",
    status: "Confirmed",
    amount: "$550",
    amountMeta: "Net: $511.50",
    tier: "Featured",
    commission: "7% • $38.50",
  },
  {
    date: "Feb 15",
    dateMeta: "11:30 AM",
    title: "Hydrating Facial Treatment",
    type: "Facial Treatments",
    venue: "Bodhi Day Spa",
    venueLocation: "Surry Hills, Sydney",
    guest: "Jennifer Liu",
    guestDetail: "New guest • 60 mins",
    status: "Confirmed",
    amount: "$165",
    amountMeta: "Net: $153.45",
    tier: "Featured",
    commission: "7% • $11.55",
  },
  {
    date: "Feb 16",
    dateMeta: "4:00 PM",
    title: "Hot Stone Therapy",
    type: "Massage Therapy",
    venue: "Bodhi Day Spa",
    venueLocation: "Surry Hills, Sydney",
    guest: "David Kim",
    guestDetail: "Returning guest • 75 mins",
    status: "Pending",
    amount: "$185",
    amountMeta: "Net: $172.05",
    tier: "Featured",
    commission: "7% • $12.95",
    extraAction: "Confirm",
  },
  {
    date: "Feb 12",
    dateMeta: "2:30 PM",
    title: "Swedish Relaxation Massage",
    type: "Massage Therapy",
    venue: "Bodhi Day Spa",
    venueLocation: "Surry Hills, Sydney",
    guest: "Andrew Peters",
    guestDetail: "Returning guest • 60 mins",
    status: "Cancelled",
    amount: "$145",
    amountMeta: "Cancelled 11 Feb",
    tier: "Featured",
    commission: "No charge",
  },
];

const tabs: TabConfig[] = [
  {
    key: "all",
    label: "All Bookings",
    count: 156,
    subtitle: "Manage all retreat bookings and wellness appointments across venues",
    stats: [
      { value: "156", label: "Total Bookings" },
      { value: "12", label: "Pending Action", tone: "warning" },
      { value: "47", label: "Confirmed", tone: "success" },
      { value: "97", label: "Completed" },
      { value: "$284,500", label: "Total Revenue" },
    ],
    filters: ["All Statuses", "All Venues", "All Time"],
    searchPlaceholder: "Search guest, host, or booking ID...",
    actionTitle: "Action Required (4)",
    actionItems: [
      {
        title: "Corporate Mindfulness Workshop enquiry expiring",
        meta: "Moraea Farm • Expires in 12 hours • $9,000",
        actions: ["Accept", "Decline"],
      },
      {
        title: "Signature Relaxation Massage awaiting confirmation",
        meta: "Bodhi Day Spa • Sarah Thompson • $195",
        actions: ["Confirm", "Reschedule"],
      },
    ],
    rows: allRows,
    paginationLabel: "Showing 1-4 of 156 bookings",
  },
  {
    key: "retreat",
    label: "Retreat Bookings",
    count: 23,
    subtitle: "Retreat bookings with venue-level occupancy, payment and commission tracking",
    stats: [
      { value: "23", label: "Total Retreats" },
      { value: "3", label: "Pending Enquiries", tone: "warning" },
      { value: "12", label: "Confirmed", tone: "success" },
      { value: "8", label: "Completed" },
      { value: "$276,500", label: "Retreat Revenue" },
    ],
    filters: ["All Statuses", "All Retreat Venues", "All Time"],
    searchPlaceholder: "Search facilitator, retreat name, or ID...",
    actionTitle: "Enquiries Requiring Response (2)",
    actionItems: [
      {
        title: "Corporate Mindfulness Workshop enquiry expiring",
        meta: "Moraea Farm • James Chen • Zenith Consulting • Expires in 12 hours",
        actions: ["Accept", "Decline", "Message"],
      },
      {
        title: "Women's Retreat Weekend payment issue",
        meta: "Serenity Retreat • Card declined • $4,500",
        actions: ["Contact Facilitator", "View Details"],
      },
    ],
    rows: retreatRows,
    paginationLabel: "Showing 1-7 of 23 retreat bookings",
  },
  {
    key: "wellness",
    label: "Wellness Appointments",
    count: 133,
    subtitle: "Wellness service bookings with therapist scheduling and payment status",
    stats: [
      { value: "133", label: "Total Appointments" },
      { value: "9", label: "Pending Confirmation", tone: "warning" },
      { value: "35", label: "Upcoming", tone: "success" },
      { value: "89", label: "Completed" },
      { value: "$18,450", label: "Service Revenue" },
    ],
    filters: ["All Statuses", "All Wellness Venues", "All Services", "All Time"],
    searchPlaceholder: "Search guest name or booking ID...",
    actionTitle: "Awaiting Confirmation (3)",
    actionItems: [
      {
        title: "Signature Relaxation Massage • Tomorrow 10:00 AM",
        meta: "Bodhi Day Spa • Sarah Thompson • 90 mins • $195",
        actions: ["Confirm", "Reschedule"],
      },
      {
        title: "Hot Stone Therapy • Feb 16, 4:00 PM",
        meta: "Bodhi Day Spa • David Kim • 75 mins • $185",
        actions: ["Confirm", "Reschedule"],
      },
    ],
    rows: wellnessRows,
    paginationLabel: "Showing 1-8 of 133 appointments",
  },
];

function statusClass(status: BookingStatus) {
  if (status === "Confirmed") return "bg-[#E8F4EA] text-[#4A7C59]";
  if (status === "Pending") return "bg-[#FEF9E7] text-[#D4A853]";
  if (status === "Completed") return "bg-[#F7F5F1] text-[#B8B8B8]";
  return "bg-[#FCE8E8] text-[#C45C5C]";
}

function tierClass(tier: BookingRow["tier"]) {
  if (tier === "Premium") return "bg-[#E8F4EA] text-[#4A7C59]";
  if (tier === "Featured") return "bg-[#FEF9E7] text-[#B8860B]";
  if (tier === "Standard") return "bg-[#E8EFF9] text-[#6B8EC9]";
  return "bg-[#F0E6E6] text-[#8B5A5A]";
}

export default function PortalBookingsDashboardPage() {
  const [active, setActive] = useState<TopTab>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const activeTab = tabs.find((tab) => tab.key === active) ?? tabs[0];

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return activeTab.rows;
    return activeTab.rows.filter((row) => {
      return (
        row.title.toLowerCase().includes(q) ||
        row.guest.toLowerCase().includes(q) ||
        row.guestDetail.toLowerCase().includes(q) ||
        row.venue.toLowerCase().includes(q)
      );
    });
  }, [activeTab, query]);

  const rowsPerPage = 8;
  const pageCount = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * rowsPerPage;
  const visibleRows = filteredRows.slice(start, start + rowsPerPage);

  const onChangeTab = (tab: TopTab) => {
    setActive(tab);
    setQuery("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] font-[Montserrat,sans-serif] text-[#313131]">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col justify-between bg-[#313131] text-white lg:flex">
          <div>
            <div className="border-b border-white/10 px-6 py-8">
              <p className="font-[Cormorant_Garamond,serif] text-xl font-semibold uppercase tracking-[0.1em]">The Global Sanctum</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Internal Portal</p>
            </div>
            <nav className="py-6 text-[13px]">
              <p className="px-6 pb-2 pt-2 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Content</p>
              <Link href="/portal/tgs-internal-portal-venues-page-v2" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">
                Venues
              </Link>
              <Link href="/portal/tgs-internal-portal---bookings-dashboard" className="block border-l-[3px] border-white bg-white/10 px-[21px] py-3 text-white">
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

        <main className="w-full bg-[#FDFCF9]">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B8B8B8]/20 bg-white px-5 py-7 sm:px-8 lg:px-12">
            <div>
              <h1 className="font-[Cormorant_Garamond,serif] text-[32px] font-semibold">Bookings</h1>
              <p className="text-[13px] text-[#B8B8B8]">{activeTab.subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" className="rounded-md border border-[#B8B8B8]/40 bg-white px-4 py-2.5 text-[13px] hover:border-[#313131]">
                Export
              </button>
              <button type="button" className="rounded-md bg-[#313131] px-4 py-2.5 text-[13px] text-white hover:bg-[#4a4a4a]">
                Add Booking
              </button>
            </div>
          </header>

          <nav className="flex overflow-x-auto border-b border-[#B8B8B8]/20 bg-white px-5 sm:px-8 lg:px-12">
            {tabs.map((tab) => {
              const isActive = tab.key === active;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => onChangeTab(tab.key)}
                  className={`whitespace-nowrap border-b-2 px-5 py-4 text-sm font-medium ${
                    isActive ? "border-[#313131] text-[#313131]" : "border-transparent text-[#B8B8B8] hover:text-[#313131]"
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] ${isActive ? "bg-[#313131] text-white" : "bg-[#F7F5F1] text-[#313131]"}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="px-5 py-8 sm:px-8 lg:px-12">
            <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {activeTab.stats.map((stat) => (
                <article key={stat.label} className="rounded-xl border border-[#B8B8B8]/20 bg-white px-5 py-4">
                  <p
                    className={`mb-1 font-[Cormorant_Garamond,serif] text-[31px] font-semibold ${
                      stat.tone === "success"
                        ? "text-[#4A7C59]"
                        : stat.tone === "warning"
                          ? "text-[#D4A853]"
                          : stat.tone === "error"
                            ? "text-[#C45C5C]"
                            : stat.tone === "info"
                              ? "text-[#6B8EC9]"
                              : "text-[#313131]"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.05em] text-[#B8B8B8]">{stat.label}</p>
                </article>
              ))}
            </section>

            <section className="mb-6 flex flex-wrap items-center gap-3">
              {activeTab.filters.map((filter) => (
                <select key={filter} className="rounded-md border border-[#B8B8B8]/40 bg-white px-3 py-2 text-[13px] text-[#313131]">
                  <option>{filter}</option>
                </select>
              ))}
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder={activeTab.searchPlaceholder}
                className="min-w-[260px] flex-1 rounded-md border border-[#B8B8B8]/40 bg-white px-3 py-2 text-[13px] placeholder:text-[#B8B8B8]"
              />
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setPage(1);
                }}
                className="rounded-md border border-[#B8B8B8]/40 bg-white px-3 py-2 text-[12px]"
              >
                Clear Filters
              </button>
            </section>

            <section className="mb-6 rounded-xl border border-[#D4A853] bg-[#FEF9E7] p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{activeTab.actionTitle}</p>
                <button type="button" className="rounded-md border border-[#B8B8B8]/40 bg-white px-3 py-1.5 text-xs">
                  View All
                </button>
              </div>
              <div className="grid gap-3">
                {activeTab.actionItems.map((item) => (
                  <article key={item.title} className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white px-4 py-3">
                    <div>
                      <p className="text-[13px] font-medium">{item.title}</p>
                      <p className="text-[11px] text-[#B8B8B8]">{item.meta}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {item.actions.map((action) => (
                        <button
                          key={action}
                          type="button"
                          className={`rounded-md px-3 py-1.5 text-xs ${
                            action === "Accept" || action === "Confirm" ? "bg-[#313131] text-white" : "border border-[#B8B8B8]/40 bg-white"
                          }`}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-xl border border-[#B8B8B8]/20 bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-[1100px] w-full border-collapse">
                  <thead>
                    <tr className="bg-[#F7F5F1] text-left text-[11px] uppercase tracking-[0.05em] text-[#B8B8B8]">
                      <th className="px-5 py-4">Date</th>
                      <th className="px-5 py-4">Booking / Service</th>
                      <th className="px-5 py-4">Venue</th>
                      <th className="px-5 py-4">Guest / Host</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Amount</th>
                      <th className="px-5 py-4">Commission</th>
                      <th className="px-5 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((row) => (
                      <tr key={`${row.date}-${row.title}-${row.guest}`} className="border-t border-[#B8B8B8]/10 text-[13px] hover:bg-[#F7F5F1]">
                        <td className="px-5 py-4">
                          <p className="font-medium">{row.date}</p>
                          <p className="text-[11px] text-[#B8B8B8]">{row.dateMeta}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-medium">{row.title}</p>
                          <p className="mt-0.5 flex items-center gap-2 text-[11px] text-[#B8B8B8]">
                            {row.typeBadge ? (
                              <span
                                className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${
                                  row.typeBadge === "retreat" ? "bg-[#E8F4EA] text-[#4A7C59]" : "bg-[#E8EFF9] text-[#6B8EC9]"
                                }`}
                              >
                                {row.typeBadge}
                              </span>
                            ) : null}
                            {row.type}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-medium">{row.venue}</p>
                          <p className="text-[11px] text-[#B8B8B8]">{row.venueLocation}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-medium">{row.guest}</p>
                          <p className="text-[11px] text-[#B8B8B8]">{row.guestDetail}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${statusClass(row.status)}`}>{row.status}</span>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-[Cormorant_Garamond,serif] text-lg font-semibold">{row.amount}</p>
                          <p className="text-[11px] text-[#B8B8B8]">{row.amountMeta}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${tierClass(row.tier)}`}>{row.tier}</span>
                          <p className="text-[11px] text-[#B8B8B8]">{row.commission}</p>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            {row.extraAction ? (
                              <button type="button" className="rounded px-2.5 py-1.5 text-[12px] text-white bg-[#313131]">
                                {row.extraAction}
                              </button>
                            ) : null}
                            <button type="button" className="rounded border border-[#B8B8B8]/40 px-2.5 py-1.5 text-[12px]">
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#B8B8B8]/20 bg-[#F7F5F1] px-5 py-4">
                <p className="text-xs text-[#B8B8B8]">{query ? `Showing ${visibleRows.length} results` : activeTab.paginationLabel}</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={safePage <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="rounded border border-[#B8B8B8]/40 bg-white px-3 py-1.5 text-xs disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button type="button" className="rounded border border-[#313131] bg-[#313131] px-3 py-1.5 text-xs text-white">
                    {safePage}
                  </button>
                  {pageCount > 1 ? (
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                      className="rounded border border-[#B8B8B8]/40 bg-white px-3 py-1.5 text-xs"
                    >
                      {Math.min(safePage + 1, pageCount)}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    disabled={safePage >= pageCount}
                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                    className="rounded border border-[#B8B8B8]/40 bg-white px-3 py-1.5 text-xs disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
