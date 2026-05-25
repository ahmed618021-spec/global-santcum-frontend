"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type GuestStatus = "VIP" | "Active" | "New" | "Inactive";

type GuestRow = {
  initials: string;
  name: string;
  email: string;
  location: string;
  preferences: string[];
  bookings: number;
  spend: string;
  lastVisit: string;
  status: GuestStatus;
};

const guests: GuestRow[] = [
  {
    initials: "EW",
    name: "Emily Watson",
    email: "emily.watson@email.com",
    location: "Sydney, Australia",
    preferences: ["massage", "yoga", "nutrition"],
    bookings: 7,
    spend: "$1,840",
    lastVisit: "3 days ago",
    status: "VIP",
  },
  {
    initials: "JK",
    name: "James Kim",
    email: "james.kim@email.com",
    location: "Melbourne, Australia",
    preferences: ["fitness", "meditation"],
    bookings: 4,
    spend: "$960",
    lastVisit: "Yesterday",
    status: "Active",
  },
  {
    initials: "SP",
    name: "Sophie Patel",
    email: "sophie.patel@email.com",
    location: "Brisbane, Australia",
    preferences: ["detox", "yoga"],
    bookings: 1,
    spend: "$145",
    lastVisit: "First booking",
    status: "New",
  },
  {
    initials: "MT",
    name: "Maria Torres",
    email: "maria.torres@email.com",
    location: "Perth, Australia",
    preferences: ["spa", "massage", "meditation"],
    bookings: 3,
    spend: "$780",
    lastVisit: "5 days ago",
    status: "Active",
  },
  {
    initials: "AN",
    name: "Akiko Nakamura",
    email: "akiko.n@email.com",
    location: "Tokyo, Japan",
    preferences: ["thermal", "nutrition"],
    bookings: 9,
    spend: "$2,420",
    lastVisit: "2 days ago",
    status: "VIP",
  },
  {
    initials: "DH",
    name: "David Henderson",
    email: "d.henderson@email.com",
    location: "Auckland, New Zealand",
    preferences: ["fitness"],
    bookings: 2,
    spend: "$320",
    lastVisit: "67 days ago",
    status: "Inactive",
  },
];

const statusClass: Record<GuestStatus, string> = {
  VIP: "bg-[#FEF9E7] text-[#D4A853]",
  Active: "bg-[#E8F4EA] text-[#4A7C59]",
  New: "bg-[#E8EFF9] text-[#6B8EC9]",
  Inactive: "bg-[#F7F5F1] text-[#B8B8B8]",
};

const preferenceClass: Record<string, string> = {
  massage: "bg-[#F3E8F9] text-[#8B5A8B]",
  yoga: "bg-[#E8F4EA] text-[#4A7C59]",
  meditation: "bg-[#E8EFF9] text-[#6B8EC9]",
  thermal: "bg-[#FCE8EC] text-[#C45C5C]",
  nutrition: "bg-[#FEF9E7] text-[#D4A853]",
  fitness: "bg-[#E8F0E8] text-[#5A7C5A]",
  detox: "bg-[#F0E8F9] text-[#7C5A8B]",
  spa: "bg-[#FFF0E8] text-[#C47A4A]",
};

export default function PortalWellnessGuestsDashboardPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "VIP" | "Active" | "New" | "Inactive">("all");

  const filteredGuests = useMemo(() => {
    return guests.filter((guest) => {
      const matchesQuery =
        query.trim().length === 0 ||
        guest.name.toLowerCase().includes(query.toLowerCase()) ||
        guest.email.toLowerCase().includes(query.toLowerCase()) ||
        guest.location.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "all" || guest.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div className="min-h-screen bg-[#FDFCF9] font-[Montserrat,sans-serif] text-[#313131]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[260px] shrink-0 bg-[#313131] text-white lg:block">
          <div className="border-b border-white/10 px-6 py-8">
            <p className="font-[Cormorant_Garamond,serif] text-xl font-semibold uppercase tracking-[0.1em]">The Global Sanctum</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Internal Portal</p>
          </div>
          <nav className="py-6 text-[13px]">
            <p className="px-6 pb-2 pt-2 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Guests</p>
            <Link
              href="/portal/tgs-internal-portal---wellness-guest-general-dashboard"
              className="block border-r-[3px] border-white bg-white/10 px-6 py-3 text-white"
            >
              Wellness Guests
            </Link>
            <Link href="/portal/tgs-internal-portal---retreat-host-general-dashboard" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">
              Retreat Hosts
            </Link>
            <Link href="/portal/tgs-internal-portal-users" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">
              Users
            </Link>
          </nav>
        </aside>

        <main className="w-full px-5 py-8 lg:px-8">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#B8B8B8]/20 bg-white px-6 py-5">
            <h1 className="font-[Cormorant_Garamond,serif] text-[32px] font-semibold">Wellness Guests</h1>
            <div className="flex gap-3">
              <button type="button" className="rounded-md border border-[#B8B8B8]/40 bg-white px-4 py-2.5 text-[13px]">
                Export
              </button>
              <button type="button" className="rounded-md bg-[#313131] px-4 py-2.5 text-[13px] text-white">
                Add Guest
              </button>
            </div>
          </header>

          <section className="mb-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center">
              <p className="font-[Cormorant_Garamond,serif] text-[32px]">755</p>
              <p className="text-[10px] uppercase tracking-[0.1em] text-[#B8B8B8]">Total Guests</p>
            </article>
            <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center">
              <p className="font-[Cormorant_Garamond,serif] text-[32px] text-[#4A7C59]">612</p>
              <p className="text-[10px] uppercase tracking-[0.1em] text-[#B8B8B8]">Active</p>
            </article>
            <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center">
              <p className="font-[Cormorant_Garamond,serif] text-[32px] text-[#6B8EC9]">87</p>
              <p className="text-[10px] uppercase tracking-[0.1em] text-[#B8B8B8]">New This Month</p>
            </article>
            <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center">
              <p className="font-[Cormorant_Garamond,serif] text-[32px] text-[#D4A853]">143</p>
              <p className="text-[10px] uppercase tracking-[0.1em] text-[#B8B8B8]">Repeat Guests</p>
            </article>
            <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center">
              <p className="font-[Cormorant_Garamond,serif] text-[32px]">$42,850</p>
              <p className="text-[10px] uppercase tracking-[0.1em] text-[#B8B8B8]">Total Spend</p>
            </article>
            <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center">
              <p className="font-[Cormorant_Garamond,serif] text-[32px]">2.4</p>
              <p className="text-[10px] uppercase tracking-[0.1em] text-[#B8B8B8]">Avg Bookings</p>
            </article>
          </section>

          <section className="mb-5 flex flex-wrap items-center gap-3">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full max-w-[340px] rounded-md border border-[#B8B8B8]/30 bg-white px-3 py-2 text-[13px]"
              placeholder="Search by name, email, location..."
            />
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as "all" | "VIP" | "Active" | "New" | "Inactive")}
                className="rounded-md border border-[#B8B8B8]/30 bg-white px-3 py-2 text-[12px]"
              >
                <option value="all">All Statuses</option>
                <option value="VIP">VIP</option>
                <option value="Active">Active</option>
                <option value="New">New</option>
                <option value="Inactive">Inactive</option>
              </select>
              <select className="rounded-md border border-[#B8B8B8]/30 bg-white px-3 py-2 text-[12px]">
                <option>All Preferences</option>
                <option>Massage</option>
                <option>Yoga</option>
                <option>Meditation</option>
                <option>Nutrition</option>
              </select>
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-[#B8B8B8]/20 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-[1120px] w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#F7F5F1] text-[10px] uppercase tracking-[0.1em] text-[#B8B8B8]">
                    <th className="px-4 py-3">Guest</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Preferences</th>
                    <th className="px-4 py-3">Bookings</th>
                    <th className="px-4 py-3">Total Spend</th>
                    <th className="px-4 py-3">Last Visit</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuests.map((guest) => (
                    <tr key={guest.email} className="border-t border-[#B8B8B8]/10 text-[13px] hover:bg-[#F7F5F1]">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F5F1] text-xs font-semibold">{guest.initials}</div>
                          <div>
                            <p className="font-medium">{guest.name}</p>
                            <p className="text-xs text-[#B8B8B8]">{guest.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">{guest.location}</td>
                      <td className="px-4 py-4">
                        <div className="flex max-w-[240px] flex-wrap gap-1">
                          {guest.preferences.map((item) => (
                            <span key={item} className={`rounded px-2 py-0.5 text-[10px] font-medium ${preferenceClass[item]}`}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4">{guest.bookings}</td>
                      <td className="px-4 py-4 font-medium">{guest.spend}</td>
                      <td className="px-4 py-4">{guest.lastVisit}</td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] ${statusClass[guest.status]}`}>{guest.status}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button type="button" className="rounded border border-[#B8B8B8]/40 px-3 py-1.5 text-xs">
                            View
                          </button>
                          <button type="button" className="rounded bg-[#313131] px-3 py-1.5 text-xs text-white">
                            Message
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-[#B8B8B8]/20 bg-[#F7F5F1] px-4 py-3 text-sm text-[#B8B8B8]">
              <span>Showing 1-{filteredGuests.length} of 755 guests</span>
              <div className="flex gap-1">
                <button type="button" className="h-8 w-8 rounded border border-[#B8B8B8]/30 bg-white text-xs">
                  1
                </button>
                <button type="button" className="h-8 w-8 rounded border border-[#B8B8B8]/30 bg-white text-xs">
                  2
                </button>
                <button type="button" className="h-8 w-8 rounded border border-[#313131] bg-[#313131] text-xs text-white">
                  3
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
