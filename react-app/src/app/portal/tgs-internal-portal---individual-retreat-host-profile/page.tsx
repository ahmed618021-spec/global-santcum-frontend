"use client";

import Link from "next/link";
import { useState } from "react";

type HostTab = "activity" | "retreats" | "bookings" | "communications" | "notes";

const hostTabs: Array<{ key: HostTab; label: string }> = [
  { key: "activity", label: "Activity" },
  { key: "retreats", label: "Retreats" },
  { key: "bookings", label: "Bookings" },
  { key: "communications", label: "Communications" },
  { key: "notes", label: "Notes" },
];

export default function PortalIndividualRetreatHostProfilePage() {
  const [activeTab, setActiveTab] = useState<HostTab>("activity");

  return (
    <div className="min-h-screen bg-[#FDFCF9] p-4 font-[Montserrat,sans-serif] text-[#313131] lg:p-8">
      <div className="mx-auto max-w-[1320px] overflow-hidden rounded-2xl border border-[#B8B8B8]/25 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B8B8B8]/20 bg-white px-6 py-5 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#4A7C59] to-[#B8860B] text-xl font-semibold text-white">TC</div>
            <div>
              <h1 className="font-[Cormorant_Garamond,serif] text-[30px] font-semibold leading-none">Tom Cronin</h1>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#B8B8B8]">
                <span>Retreat Host Profile</span>
                <span>•</span>
                <span>Sydney, Australia</span>
                <span>•</span>
                <span className="rounded-full border border-[#4A7C59]/50 bg-gradient-to-r from-[#E8F4EA] to-[#FEF9E7] px-2 py-0.5 text-[#4A7C59]">VIP</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" className="rounded-md border border-[#B8B8B8]/40 bg-white px-4 py-2 text-sm">Message</button>
            <button type="button" className="rounded-md bg-[#313131] px-4 py-2 text-sm text-white">Edit Host</button>
            <Link href="/portal/tgs-internal-portal---retreat-host-general-dashboard" className="rounded-md border border-[#B8B8B8]/40 bg-white px-4 py-2 text-sm">
              Back
            </Link>
          </div>
        </header>

        <div className="grid min-h-[740px] lg:grid-cols-[360px_1fr]">
          <aside className="border-r border-[#B8B8B8]/20 bg-[#F7F5F1] p-6">
            <section className="mb-6 border-b border-[#B8B8B8]/20 pb-5">
              <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B8B8B8]">Identity</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#B8B8B8]">Organisation</span><span>The Stillness Project</span></div>
                <div className="flex justify-between"><span className="text-[#B8B8B8]">Email</span><span>tom@stillnessproject.com</span></div>
                <div className="flex justify-between"><span className="text-[#B8B8B8]">Phone</span><span>+61 412 662 880</span></div>
                <div className="flex justify-between"><span className="text-[#B8B8B8]">Status</span><span className="rounded bg-[#E8F4EA] px-2 py-0.5 text-xs text-[#4A7C59]">Verified</span></div>
              </div>
            </section>

            <section className="mb-6 border-b border-[#B8B8B8]/20 pb-5">
              <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B8B8B8]">Specialties</h2>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-[#6B8EC9]/40 bg-[#E8EFF9] px-3 py-1 text-[#6B8EC9]">Meditation</span>
                <span className="rounded-full border border-[#4A7C59]/40 bg-[#E8F4EA] px-3 py-1 text-[#4A7C59]">Mindfulness</span>
                <span className="rounded-full border border-[#8B5A8B]/40 bg-[#F3E8F9] px-3 py-1 text-[#8B5A8B]">Breathwork</span>
                <span className="rounded-full border border-[#D4A853]/40 bg-[#FEF9E7] px-3 py-1 text-[#D4A853]">Corporate</span>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B8B8B8]">Performance Snapshot</h2>
              <div className="grid grid-cols-2 gap-2 text-center">
                <article className="rounded-lg bg-white p-3"><p className="font-[Cormorant_Garamond,serif] text-2xl">12</p><p className="text-[10px] text-[#B8B8B8]">Retreats</p></article>
                <article className="rounded-lg bg-white p-3"><p className="font-[Cormorant_Garamond,serif] text-2xl text-[#4A7C59]">4.9</p><p className="text-[10px] text-[#B8B8B8]">Rating</p></article>
                <article className="rounded-lg bg-white p-3"><p className="font-[Cormorant_Garamond,serif] text-2xl">286</p><p className="text-[10px] text-[#B8B8B8]">Guests</p></article>
                <article className="rounded-lg bg-white p-3"><p className="font-[Cormorant_Garamond,serif] text-2xl text-[#4A7C59]">$98K</p><p className="text-[10px] text-[#B8B8B8]">Revenue</p></article>
              </div>
            </section>
          </aside>

          <section className="flex flex-col">
            <nav className="flex overflow-x-auto border-b border-[#B8B8B8]/20 px-5">
              {hostTabs.map((tab) => (
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

            <div className="p-6">
              {activeTab === "activity" ? (
                <div>
                  <h3 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#B8B8B8]">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      ["Today", "New booking confirmed", "Women's Wellness Retreat • Feb 20-23 • $18,000"],
                      ["Yesterday", "Client enquiry", "Corporate retreat enquiry from Zenith Consulting • $28,000 potential"],
                      ["Jan 15, 2026", "Payment settled", "Host payout processed • $6,350"],
                      ["Dec 20, 2025", "Profile updated", "Added new media and retreat outcomes"],
                    ].map(([date, title, text]) => (
                      <article key={`${date}-${title}`} className="rounded-lg border border-[#B8B8B8]/20 bg-white p-4">
                        <p className="text-xs text-[#B8B8B8]">{date}</p>
                        <p className="font-medium">{title}</p>
                        <p className="text-sm text-[#B8B8B8]">{text}</p>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              {activeTab === "retreats" ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["Silent Meditation Retreat", "4 days", "4.9★", "$13,500"],
                    ["Women's Wellness Retreat", "3 days", "4.8★", "$18,000"],
                    ["Corporate Mind Reset", "2 days", "4.7★", "$22,400"],
                  ].map(([name, duration, rating, revenue]) => (
                    <article key={name} className="rounded-lg border border-[#B8B8B8]/20 p-4">
                      <p className="font-medium">{name}</p>
                      <p className="text-xs text-[#B8B8B8]">{duration}</p>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-[#D4A853]">{rating}</span>
                        <span className="font-semibold text-[#4A7C59]">{revenue}</span>
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}

              {activeTab === "bookings" ? (
                <div className="overflow-hidden rounded-xl border border-[#B8B8B8]/20">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-[#F7F5F1] text-[10px] uppercase tracking-[0.08em] text-[#B8B8B8]">
                        <th className="px-3 py-2">Guest</th>
                        <th className="px-3 py-2">Retreat</th>
                        <th className="px-3 py-2">Dates</th>
                        <th className="px-3 py-2">Amount</th>
                        <th className="px-3 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Emma Davis", "Women's Wellness Retreat", "Feb 20-23", "$18,000", "Confirmed"],
                        ["Sam Collins", "Silent Meditation Retreat", "Jan 7-10", "$13,500", "Completed"],
                        ["James Chen", "Corporate Mind Reset", "Mar 15-18", "$28,000", "Pending"],
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
                  <article className="rounded-lg border border-[#B8B8B8]/20 p-4"><p className="font-medium">Email • Welcome sequence</p><p className="text-sm text-[#B8B8B8]">Opened Dec 15, 2025</p></article>
                  <article className="rounded-lg border border-[#B8B8B8]/20 p-4"><p className="font-medium">Call • Monthly check-in</p><p className="text-sm text-[#B8B8B8]">Completed Jan 22, 2026</p></article>
                  <article className="rounded-lg border border-[#B8B8B8]/20 p-4"><p className="font-medium">Message • Media update reminder</p><p className="text-sm text-[#B8B8B8]">Sent Feb 02, 2026</p></article>
                </div>
              ) : null}

              {activeTab === "notes" ? (
                <div>
                  <textarea className="mb-4 w-full rounded-lg border border-[#B8B8B8]/30 p-3 text-sm" rows={4} placeholder="Add a note about this retreat host..." />
                  <div className="space-y-3 text-sm">
                    <article className="rounded-lg border border-[#B8B8B8]/20 p-4">Tom has excellent post-retreat feedback and very high referral conversion from corporate clients.</article>
                    <article className="rounded-lg border border-[#B8B8B8]/20 p-4">Priority partner for Sydney and Byron Bay high-value wellness events in Q2.</article>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
