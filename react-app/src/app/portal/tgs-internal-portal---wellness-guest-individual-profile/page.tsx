"use client";

import Link from "next/link";
import { useState } from "react";

type GuestTab = "overview" | "bookings" | "communications" | "notes";

const guestTabs: Array<{ key: GuestTab; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "bookings", label: "Booking History" },
  { key: "communications", label: "Communications" },
  { key: "notes", label: "Internal Notes" },
];

export default function PortalWellnessGuestIndividualProfilePage() {
  const [activeTab, setActiveTab] = useState<GuestTab>("overview");

  return (
    <div className="min-h-screen bg-[#FDFCF9] p-4 font-[Montserrat,sans-serif] text-[#313131] lg:p-8">
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-2xl border border-[#B8B8B8]/25 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B8B8B8]/20 bg-[#F7F5F1] px-6 py-5 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#313131] font-[Cormorant_Garamond,serif] text-2xl font-semibold text-white">EW</div>
            <div>
              <h1 className="font-[Cormorant_Garamond,serif] text-[30px] font-semibold leading-none">Emily Watson</h1>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#B8B8B8]">
                <span>Guest since August 2025</span>
                <span>•</span>
                <span>Sydney, Australia</span>
                <span>•</span>
                <span className="rounded-full bg-[#FEF9E7] px-2 py-0.5 text-[#D4A853]">VIP</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" className="rounded-md border border-[#B8B8B8]/40 bg-white px-4 py-2 text-sm">Send Email</button>
            <button type="button" className="rounded-md bg-[#313131] px-4 py-2 text-sm text-white">Edit Guest</button>
            <Link href="/portal/tgs-internal-portal---wellness-guest-general-dashboard" className="rounded-md border border-[#B8B8B8]/40 bg-white px-4 py-2 text-sm">
              Back
            </Link>
          </div>
        </header>

        <div className="grid min-h-[700px] lg:grid-cols-[320px_1fr]">
          <aside className="border-r border-[#B8B8B8]/20 bg-[#FDFCF9] p-6">
            <section className="mb-6 border-b border-[#B8B8B8]/20 pb-5">
              <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B8B8B8]">Guest Information</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#B8B8B8]">Email</span><span>emily.watson@email.com</span></div>
                <div className="flex justify-between"><span className="text-[#B8B8B8]">Phone</span><span>+61 411 332 980</span></div>
                <div className="flex justify-between"><span className="text-[#B8B8B8]">Membership</span><span className="rounded bg-[#E8F4EA] px-2 py-0.5 text-xs text-[#4A7C59]">Active</span></div>
                <div className="flex justify-between"><span className="text-[#B8B8B8]">Loyalty Tier</span><span className="rounded bg-[#FEF9E7] px-2 py-0.5 text-xs text-[#D4A853]">VIP</span></div>
              </div>
            </section>

            <section className="mb-6 border-b border-[#B8B8B8]/20 pb-5">
              <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B8B8B8]">Preferences</h2>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded bg-[#F3E8F9] px-2 py-1 text-[#8B5A8B]">Massage</span>
                <span className="rounded bg-[#E8F4EA] px-2 py-1 text-[#4A7C59]">Yoga</span>
                <span className="rounded bg-[#E8EFF9] px-2 py-1 text-[#6B8EC9]">Meditation</span>
                <span className="rounded bg-[#FEF9E7] px-2 py-1 text-[#D4A853]">Nutrition</span>
                <span className="rounded bg-[#FCE8EC] px-2 py-1 text-[#C45C5C]">Thermal</span>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B8B8B8]">Guest Stats</h2>
              <div className="grid grid-cols-2 gap-2 text-center">
                <article className="rounded-lg bg-white p-3"><p className="font-[Cormorant_Garamond,serif] text-2xl">7</p><p className="text-[10px] text-[#B8B8B8]">Bookings</p></article>
                <article className="rounded-lg bg-white p-3"><p className="font-[Cormorant_Garamond,serif] text-2xl text-[#4A7C59]">$1,840</p><p className="text-[10px] text-[#B8B8B8]">Total Spend</p></article>
                <article className="rounded-lg bg-white p-3"><p className="font-[Cormorant_Garamond,serif] text-2xl">$263</p><p className="text-[10px] text-[#B8B8B8]">Avg Visit</p></article>
                <article className="rounded-lg bg-white p-3"><p className="font-[Cormorant_Garamond,serif] text-2xl">4</p><p className="text-[10px] text-[#B8B8B8]">Venues Visited</p></article>
              </div>
            </section>
          </aside>

          <section className="flex flex-col p-6">
            <nav className="mb-5 flex overflow-x-auto border-b border-[#B8B8B8]/20">
              {guestTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`-mb-px border-b-2 px-4 py-3 text-sm ${activeTab === tab.key ? "border-[#313131] text-[#313131]" : "border-transparent text-[#B8B8B8] hover:text-[#313131]"}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {activeTab === "overview" ? (
              <div className="space-y-4">
                <h3 className="font-[Cormorant_Garamond,serif] text-2xl font-semibold">Wellness Preferences</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <article className="rounded-lg border border-[#B8B8B8]/20 bg-[#F7F5F1] p-4"><p className="text-[10px] uppercase tracking-[0.1em] text-[#B8B8B8]">Massage Pressure</p><p className="text-sm font-medium">Firm</p></article>
                  <article className="rounded-lg border border-[#B8B8B8]/20 bg-[#F7F5F1] p-4"><p className="text-[10px] uppercase tracking-[0.1em] text-[#B8B8B8]">Dietary</p><p className="text-sm font-medium">Vegetarian + Gluten Free</p></article>
                  <article className="rounded-lg border border-[#B8B8B8]/20 bg-[#F7F5F1] p-4"><p className="text-[10px] uppercase tracking-[0.1em] text-[#B8B8B8]">Health Notes</p><p className="text-sm font-medium">Lower back sensitivity</p></article>
                  <article className="rounded-lg border border-[#B8B8B8]/20 bg-[#F7F5F1] p-4"><p className="text-[10px] uppercase tracking-[0.1em] text-[#B8B8B8]">Preferred Time</p><p className="text-sm font-medium">Morning sessions</p></article>
                </div>
              </div>
            ) : null}

            {activeTab === "bookings" ? (
              <div className="overflow-hidden rounded-xl border border-[#B8B8B8]/20">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-[#F7F5F1] text-[10px] uppercase tracking-[0.08em] text-[#B8B8B8]">
                      <th className="px-3 py-2">Venue</th>
                      <th className="px-3 py-2">Service</th>
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Amount</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Moraea Farm", "Holistic Day Package", "Feb 22, 2026", "$320", "Upcoming"],
                      ["Urban Wellness Hub", "Deep Tissue Massage", "Jan 18, 2026", "$180", "Completed"],
                      ["Seaside Healing", "Thermal + Yoga", "Dec 07, 2025", "$240", "Completed"],
                    ].map((row) => (
                      <tr key={row[0]} className="border-t border-[#B8B8B8]/10">
                        {row.map((cell, i) => (
                          <td key={`${row[0]}-${i}`} className="px-3 py-3">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            {activeTab === "communications" ? (
              <div className="space-y-3">
                <article className="rounded-lg border border-[#B8B8B8]/20 p-4"><p className="font-medium">Email • Booking confirmation</p><p className="text-sm text-[#B8B8B8]">Sent Feb 02, 2026</p></article>
                <article className="rounded-lg border border-[#B8B8B8]/20 p-4"><p className="font-medium">SMS • Appointment reminder</p><p className="text-sm text-[#B8B8B8]">Sent Jan 17, 2026</p></article>
                <article className="rounded-lg border border-[#B8B8B8]/20 p-4"><p className="font-medium">Phone • Feedback call</p><p className="text-sm text-[#B8B8B8]">Completed Dec 10, 2025</p></article>
              </div>
            ) : null}

            {activeTab === "notes" ? (
              <div>
                <textarea className="mb-4 w-full rounded-lg border border-[#B8B8B8]/30 p-3 text-sm" rows={4} placeholder="Add an internal note for this guest..." />
                <div className="space-y-3 text-sm">
                  <article className="rounded-lg border border-[#B8B8B8]/20 p-4">VIP guest, prefers premium services and private treatment rooms.</article>
                  <article className="rounded-lg border border-[#B8B8B8]/20 p-4">Dietary requirements are consistent across bookings; notify venues in advance.</article>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}
