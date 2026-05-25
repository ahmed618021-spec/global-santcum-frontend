"use client";

import Link from "next/link";
import { useState } from "react";

type PanelTab = "activity" | "communications" | "bookings" | "notes" | "documents";

const panelTabs: Array<{ key: PanelTab; label: string }> = [
  { key: "activity", label: "Activity" },
  { key: "communications", label: "Communications" },
  { key: "bookings", label: "Bookings" },
  { key: "notes", label: "Notes" },
  { key: "documents", label: "Documents" },
];

export default function PortalIndividualVenueOwnerProfilePage() {
  const [activeTab, setActiveTab] = useState<PanelTab>("activity");

  return (
    <div className="min-h-screen bg-[#FDFCF9] font-[Montserrat,sans-serif] text-[#313131] p-4 lg:p-8">
      <div className="mx-auto max-w-[1280px] overflow-hidden rounded-2xl border border-[#B8B8B8]/25 bg-white shadow-[0_24px_64px_rgba(0,0,0,0.12)]">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B8B8B8]/20 bg-[#F7F5F1] px-6 py-5 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#313131] text-2xl font-semibold text-white">JM</div>
            <div>
              <h1 className="font-[Cormorant_Garamond,serif] text-[30px] font-semibold leading-none">Jennifer Moran</h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-[12px] text-[#B8B8B8]">
                <span>Venue Owner Profile</span>
                <span>•</span>
                <span>Berry, NSW</span>
                <span>•</span>
                <span className="rounded-full bg-[#E8F4EA] px-2 py-0.5 text-[#4A7C59]">Active</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" className="rounded-md border border-[#B8B8B8]/40 bg-white px-4 py-2 text-sm">
              Message
            </button>
            <button type="button" className="rounded-md bg-[#313131] px-4 py-2 text-sm text-white">
              Edit Profile
            </button>
            <Link href="/portal/tgs-internal-portal-venue-owners-general-dashboard" className="rounded-md border border-[#B8B8B8]/40 bg-white px-4 py-2 text-sm">
              Back
            </Link>
          </div>
        </header>

        <div className="grid min-h-[720px] lg:grid-cols-[360px_1fr]">
          <aside className="border-r border-[#B8B8B8]/20 bg-[#FDFCF9]">
            <section className="border-b border-[#B8B8B8]/20 p-6">
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#B8B8B8]">Profile Overview</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#B8B8B8]">Email</span><span>jennifer@moraeafarm.com</span></div>
                <div className="flex justify-between"><span className="text-[#B8B8B8]">Phone</span><span>+61 412 778 410</span></div>
                <div className="flex justify-between"><span className="text-[#B8B8B8]">Plan Tier</span><span className="rounded bg-[#E8F4EA] px-2 py-0.5 text-xs text-[#4A7C59]">Super Founder</span></div>
                <div className="flex justify-between"><span className="text-[#B8B8B8]">Owner Since</span><span>Nov 2025</span></div>
              </div>
            </section>

            <section className="border-b border-[#B8B8B8]/20 p-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#B8B8B8]">Venues (1)</h2>
                <button type="button" className="rounded border border-[#B8B8B8]/40 px-2 py-1 text-[11px]">Add Venue</button>
              </div>
              <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-4">
                <p className="font-semibold">Moraea Farm</p>
                <p className="text-xs text-[#B8B8B8]">Berry, NSW • Retreat Venue</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                  <div className="rounded bg-[#F7F5F1] p-2"><p className="font-semibold">12</p><p className="text-[10px] text-[#B8B8B8]">Max Guests</p></div>
                  <div className="rounded bg-[#F7F5F1] p-2"><p className="font-semibold">6</p><p className="text-[10px] text-[#B8B8B8]">Rooms</p></div>
                  <div className="rounded bg-[#F7F5F1] p-2"><p className="font-semibold">8</p><p className="text-[10px] text-[#B8B8B8]">Bookings</p></div>
                  <div className="rounded bg-[#F7F5F1] p-2"><p className="font-semibold text-[#4A7C59]">$127K</p><p className="text-[10px] text-[#B8B8B8]">Revenue</p></div>
                </div>
              </article>
            </section>

            <section className="border-b border-[#B8B8B8]/20 p-6">
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#B8B8B8]">Billing Snapshot</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#B8B8B8]">Commission</span><span className="text-[#4A7C59]">5%</span></div>
                <div className="flex justify-between"><span className="text-[#B8B8B8]">Monthly Fee</span><span>$159.60</span></div>
                <div className="flex justify-between"><span className="text-[#B8B8B8]">Payment Method</span><span>Visa •••• 4242</span></div>
                <div className="flex justify-between"><span className="text-[#B8B8B8]">Billing Status</span><span className="rounded bg-[#E8F4EA] px-2 py-0.5 text-xs text-[#4A7C59]">Paid</span></div>
              </div>
            </section>

            <section className="p-6">
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#B8B8B8]">Tags</h2>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-[#F7F5F1] px-3 py-1">Retreat Venue</span>
                <span className="rounded-full bg-[#F7F5F1] px-3 py-1">Super Founder</span>
                <span className="rounded-full bg-[#F7F5F1] px-3 py-1">High Potential</span>
              </div>
            </section>
          </aside>

          <section className="flex flex-col">
            <nav className="flex overflow-x-auto border-b border-[#B8B8B8]/20 px-5">
              {panelTabs.map((tab) => (
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
              <div className="mb-6 grid gap-3 sm:grid-cols-3">
                <article className="rounded-lg border border-[#B8B8B8]/20 bg-[#FDFCF9] p-4 text-center"><p className="font-[Cormorant_Garamond,serif] text-3xl">8</p><p className="text-[10px] uppercase tracking-[0.08em] text-[#B8B8B8]">Total Retreats</p></article>
                <article className="rounded-lg border border-[#B8B8B8]/20 bg-[#FDFCF9] p-4 text-center"><p className="font-[Cormorant_Garamond,serif] text-3xl text-[#4A7C59]">$127,000</p><p className="text-[10px] uppercase tracking-[0.08em] text-[#B8B8B8]">Lifetime Revenue</p></article>
                <article className="rounded-lg border border-[#B8B8B8]/20 bg-[#FDFCF9] p-4 text-center"><p className="font-[Cormorant_Garamond,serif] text-3xl text-[#4A7C59]">$6,350</p><p className="text-[10px] uppercase tracking-[0.08em] text-[#B8B8B8]">Commission Earned</p></article>
              </div>

              {activeTab === "activity" ? (
                <div>
                  <h3 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#B8B8B8]">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      ["Today, 2:30 PM", "New booking confirmed", "Women's Wellness Retreat • Feb 20-23 • Emma Davis • $18,000"],
                      ["Yesterday, 4:15 PM", "Enquiry received", "Corporate retreat enquiry from James Chen • Mar 15-18 • $28,000 potential"],
                      ["Jan 15, 2026", "Subscription payment processed", "Monthly subscription • $159.60 • Visa ending 4242"],
                      ["Jan 10, 2026", "Retreat completed", "Silent Meditation Retreat • $13,500 • Commission: $675"],
                    ].map(([date, title, desc]) => (
                      <article key={`${date}-${title}`} className="rounded-lg border border-[#B8B8B8]/20 bg-white p-4">
                        <p className="text-xs text-[#B8B8B8]">{date}</p>
                        <p className="font-medium">{title}</p>
                        <p className="text-sm text-[#B8B8B8]">{desc}</p>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              {activeTab === "communications" ? (
                <div>
                  <h3 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#B8B8B8]">Communication History</h3>
                  <div className="space-y-3">
                    <article className="rounded-lg border border-[#B8B8B8]/20 p-4"><p className="font-medium">Email • Super Founder welcome</p><p className="text-sm text-[#B8B8B8]">Opened Dec 15, 2025</p></article>
                    <article className="rounded-lg border border-[#B8B8B8]/20 p-4"><p className="font-medium">Call • Onboarding</p><p className="text-sm text-[#B8B8B8]">Completed Nov 18, 2025</p></article>
                    <article className="rounded-lg border border-[#B8B8B8]/20 p-4"><p className="font-medium">Email • Booking confirmation follow-up</p><p className="text-sm text-[#B8B8B8]">Sent Jan 11, 2026</p></article>
                  </div>
                </div>
              ) : null}

              {activeTab === "bookings" ? (
                <div className="overflow-hidden rounded-xl border border-[#B8B8B8]/20">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-[#F7F5F1] text-[10px] uppercase tracking-[0.08em] text-[#B8B8B8]">
                        <th className="px-3 py-2">Retreat</th>
                        <th className="px-3 py-2">Host</th>
                        <th className="px-3 py-2">Dates</th>
                        <th className="px-3 py-2">Amount</th>
                        <th className="px-3 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Women's Wellness Retreat", "Emma Davis", "Feb 20-23", "$18,000", "Upcoming"],
                        ["Silent Meditation Retreat", "Tom Cronin", "Jan 7-10", "$13,500", "Completed"],
                        ["Corporate Reset Program", "Zenith Consulting", "Dec 1-3", "$22,400", "Completed"],
                      ].map((row) => (
                        <tr key={row[0]} className="border-t border-[#B8B8B8]/10">
                          {row.map((cell, index) => (
                            <td key={`${row[0]}-${index}`} className="px-3 py-3">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {activeTab === "notes" ? (
                <div>
                  <h3 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#B8B8B8]">Internal Notes</h3>
                  <textarea className="mb-4 w-full rounded-lg border border-[#B8B8B8]/30 p-3 text-sm" rows={4} placeholder="Add a note about this venue owner..." />
                  <div className="space-y-3">
                    <article className="rounded-lg border border-[#B8B8B8]/20 p-4 text-sm">
                      Spoke with Jennifer about partnership expansion. She can host 3-4 additional retreats per quarter and prefers weekday programs.
                    </article>
                    <article className="rounded-lg border border-[#B8B8B8]/20 p-4 text-sm">
                      Onboarding call completed. Strong fit for Super Founder tier based on past retreat operations and venue quality.
                    </article>
                  </div>
                </div>
              ) : null}

              {activeTab === "documents" ? (
                <div>
                  <h3 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#B8B8B8]">Documents</h3>
                  <div className="space-y-2">
                    {[
                      ["Venue Insurance Certificate.pdf", "Uploaded Jan 02, 2026"],
                      ["Bank Details Verification.pdf", "Uploaded Nov 19, 2025"],
                      ["Identity Document.pdf", "Uploaded Nov 15, 2025"],
                    ].map(([name, meta]) => (
                      <article key={name} className="flex items-center justify-between rounded-lg border border-[#B8B8B8]/20 p-3">
                        <div>
                          <p className="text-sm font-medium">{name}</p>
                          <p className="text-xs text-[#B8B8B8]">{meta}</p>
                        </div>
                        <button type="button" className="rounded border border-[#B8B8B8]/40 px-3 py-1.5 text-xs">View</button>
                      </article>
                    ))}
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
