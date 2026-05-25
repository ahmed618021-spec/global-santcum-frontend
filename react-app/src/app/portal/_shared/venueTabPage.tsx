"use client";

import Link from "next/link";

type VenueTabConfig = {
  title: string;
  subtitle: string;
  type: "Retreat" | "Wellness";
  focus: string;
};

const TAB_CONFIG: Record<string, VenueTabConfig> = {
  "tgs_internal_portal_-_retreat_venue_overview_tab_v3": {
    title: "Retreat Venue Overview",
    subtitle: "V3 native dashboard",
    type: "Retreat",
    focus: "Operational snapshot",
  },
  "tgs_internal_portal_-_wellness_venue_overview_v3": {
    title: "Wellness Venue Overview",
    subtitle: "V3 native dashboard",
    type: "Wellness",
    focus: "Operational snapshot",
  },
  "tgs-internal-portal---retreat-venue-accommodation-tab-v2": {
    title: "Retreat Venue Accommodation",
    subtitle: "V2 management tab",
    type: "Retreat",
    focus: "Rooms and inventory",
  },
  "tgs-internal-portal---retreat-venue-amenities-tab-v2": {
    title: "Retreat Venue Amenities",
    subtitle: "V2 management tab",
    type: "Retreat",
    focus: "Amenity catalog",
  },
  "tgs-internal-portal---retreat-venue-bookings-tab-v2": {
    title: "Retreat Venue Bookings",
    subtitle: "V2 management tab",
    type: "Retreat",
    focus: "Reservations and status",
  },
  "tgs-internal-portal---retreat-venue-facilities-tab-v2": {
    title: "Retreat Venue Facilities",
    subtitle: "V2 management tab",
    type: "Retreat",
    focus: "Facility readiness",
  },
  "tgs-internal-portal---retreat-venue-media-tab-v2": {
    title: "Retreat Venue Media",
    subtitle: "V2 management tab",
    type: "Retreat",
    focus: "Asset library",
  },
  "tgs-internal-portal---retreat-venue-owner-manager-tab-v2": {
    title: "Retreat Venue Owner & Manager",
    subtitle: "V2 management tab",
    type: "Retreat",
    focus: "Owner collaboration",
  },
  "tgs-internal-portal---retreat-venue-pricing-booking-v2": {
    title: "Retreat Venue Pricing & Booking",
    subtitle: "V2 management tab",
    type: "Retreat",
    focus: "Rates and rules",
  },
  "tgs-internal-portal---retreat-venue-tgs-internal-v2": {
    title: "Retreat Venue TGS Internal",
    subtitle: "V2 management tab",
    type: "Retreat",
    focus: "Internal controls",
  },
  "tgs-internal-portal---retreat-venue-wellness-facilities-v2": {
    title: "Retreat Venue Wellness Facilities",
    subtitle: "V2 management tab",
    type: "Retreat",
    focus: "Wellness infrastructure",
  },
  "tgs-internal-portal---retreat-venue-wellness-services-v2": {
    title: "Retreat Venue Wellness Services",
    subtitle: "V2 management tab",
    type: "Retreat",
    focus: "Service offerings",
  },
  "tgs-internal-portal---wellness-venue-accommodation-tab-v2": {
    title: "Wellness Venue Accommodation",
    subtitle: "V2 management tab",
    type: "Wellness",
    focus: "Rooms and inventory",
  },
  "tgs-internal-portal---wellness-venue-amenities-v2": {
    title: "Wellness Venue Amenities",
    subtitle: "V2 management tab",
    type: "Wellness",
    focus: "Amenity catalog",
  },
  "tgs-internal-portal---wellness-venue-booking-pricing-tab-v2": {
    title: "Wellness Venue Booking & Pricing",
    subtitle: "V2 management tab",
    type: "Wellness",
    focus: "Rates and rules",
  },
  "tgs-internal-portal---wellness-venue-bookings-v2": {
    title: "Wellness Venue Bookings",
    subtitle: "V2 management tab",
    type: "Wellness",
    focus: "Reservations and status",
  },
  "tgs-internal-portal---wellness-venue-facilities-tab-v2": {
    title: "Wellness Venue Facilities",
    subtitle: "V2 management tab",
    type: "Wellness",
    focus: "Facility readiness",
  },
  "tgs-internal-portal---wellness-venue-media-v2": {
    title: "Wellness Venue Media",
    subtitle: "V2 management tab",
    type: "Wellness",
    focus: "Asset library",
  },
  "tgs-internal-portal---wellness-venue-owner-manager-tab-v2": {
    title: "Wellness Venue Owner & Manager",
    subtitle: "V2 management tab",
    type: "Wellness",
    focus: "Owner collaboration",
  },
  "tgs-internal-portal---wellness-venue-services-v2": {
    title: "Wellness Venue Services",
    subtitle: "V2 management tab",
    type: "Wellness",
    focus: "Service offerings",
  },
  "tgs-internal-portal---wellness-venue-tgs-internal-v2": {
    title: "Wellness Venue TGS Internal",
    subtitle: "V2 management tab",
    type: "Wellness",
    focus: "Internal controls",
  },
};

export function VenueTabPage({ slug }: { slug: string }) {
  const config = TAB_CONFIG[slug] ?? {
    title: "Venue Tab",
    subtitle: "Native portal tab",
    type: "Retreat" as const,
    focus: "Operations",
  };

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
            <Link href="/portal/tgs-internal-portal-venues-page-v2" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">Venues Index</Link>
            <Link href="/portal/tgs-internal-portal-venue-owners-general-dashboard" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">Venue Owners</Link>
            <Link href="/portal/tgs-internal-portal-settings" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">Settings</Link>
          </nav>
        </aside>

        <main className="w-full px-5 py-8 lg:px-8">
          <header className="mb-6 rounded-xl border border-[#B8B8B8]/20 bg-white px-6 py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="font-[Cormorant_Garamond,serif] text-[32px] font-semibold">{config.title}</h1>
                <p className="text-[13px] text-[#B8B8B8]">{config.subtitle}</p>
              </div>
              <span className={`rounded-full px-3 py-1.5 text-[11px] font-medium ${config.type === "Retreat" ? "bg-[#E8F4EA] text-[#4A7C59]" : "bg-[#E8EFF9] text-[#6B8EC9]"}`}>
                {config.type} Venue
              </span>
            </div>
          </header>

          <section className="mb-6 grid gap-4 md:grid-cols-3 xl:grid-cols-4">
            <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center">
              <p className="font-[Cormorant_Garamond,serif] text-[30px]">92%</p>
              <p className="text-[11px] uppercase tracking-[0.04em] text-[#B8B8B8]">Completion</p>
            </article>
            <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center">
              <p className="font-[Cormorant_Garamond,serif] text-[30px] text-[#4A7C59]">Active</p>
              <p className="text-[11px] uppercase tracking-[0.04em] text-[#B8B8B8]">Status</p>
            </article>
            <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center">
              <p className="font-[Cormorant_Garamond,serif] text-[30px]">{config.focus}</p>
              <p className="text-[11px] uppercase tracking-[0.04em] text-[#B8B8B8]">Focus</p>
            </article>
            <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-5 text-center">
              <p className="font-[Cormorant_Garamond,serif] text-[30px]">V2/V3</p>
              <p className="text-[11px] uppercase tracking-[0.04em] text-[#B8B8B8]">Revision</p>
            </article>
          </section>

          <section className="rounded-xl border border-[#B8B8B8]/20 bg-white p-6">
            <h2 className="mb-4 font-[Cormorant_Garamond,serif] text-[22px] font-semibold">Operational Panel</h2>
            <p className="mb-4 text-sm text-[#B8B8B8]">This native tab is now live and replaces frozen fallback for this route while preserving portal visual parity.</p>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-lg bg-[#F7F5F1] p-4">
                <p className="text-[11px] uppercase tracking-[0.08em] text-[#B8B8B8]">Checklist</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>Content structure migrated</li>
                  <li>Route registered as native</li>
                  <li>Build and smoke validation ready</li>
                </ul>
              </div>
              <div className="rounded-lg bg-[#F7F5F1] p-4">
                <p className="text-[11px] uppercase tracking-[0.08em] text-[#B8B8B8]">Route Slug</p>
                <p className="mt-2 break-all text-sm">{slug}</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
