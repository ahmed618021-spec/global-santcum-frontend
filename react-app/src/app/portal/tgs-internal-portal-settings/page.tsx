"use client";

import Link from "next/link";
import { useState } from "react";

type SettingsSection =
  | "general"
  | "branding"
  | "integrations"
  | "api"
  | "stripe"
  | "pricing"
  | "email"
  | "notifications"
  | "security"
  | "backup"
  | "danger";

const sections: Array<{ key: SettingsSection; label: string; group: string }> = [
  { key: "general", label: "Business Info", group: "General" },
  { key: "branding", label: "Branding", group: "General" },
  { key: "integrations", label: "Connected Apps", group: "Integrations" },
  { key: "api", label: "API Keys", group: "Integrations" },
  { key: "stripe", label: "Stripe Connect", group: "Payments" },
  { key: "pricing", label: "Pricing & Commission", group: "Payments" },
  { key: "email", label: "Email Settings", group: "Notifications" },
  { key: "notifications", label: "Notifications", group: "Notifications" },
  { key: "security", label: "Security", group: "System" },
  { key: "backup", label: "Backup & Export", group: "System" },
  { key: "danger", label: "Danger Zone", group: "System" },
];

export default function PortalSettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("general");

  return (
    <div className="min-h-screen bg-[#FDFCF9] font-[Montserrat,sans-serif] text-[#313131]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[260px] shrink-0 bg-[#313131] text-white lg:block">
          <div className="border-b border-white/10 px-6 py-8">
            <p className="font-[Cormorant_Garamond,serif] text-xl font-semibold uppercase tracking-[0.1em]">The Global Sanctum</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">Internal Portal</p>
          </div>
          <nav className="py-6 text-[13px]">
            <p className="px-6 pb-2 pt-2 text-[10px] uppercase tracking-[0.15em] text-[#B8B8B8]">System</p>
            <Link href="/portal/tgs-internal-portal-analytics" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">Analytics</Link>
            <Link href="/portal/tgs-internal-portal-users" className="block px-6 py-3 text-white/70 hover:bg-white/5 hover:text-white">Users & Team</Link>
            <Link href="/portal/tgs-internal-portal-settings" className="block border-r-[3px] border-white bg-white/10 px-6 py-3 text-white">Settings</Link>
          </nav>
        </aside>

        <main className="w-full px-5 py-8 lg:px-8">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-[Cormorant_Garamond,serif] text-[32px] font-semibold">Settings</h1>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F4EA] px-3 py-1.5 text-[11px] font-medium text-[#4A7C59]">
              <span className="h-2 w-2 rounded-full bg-[#4A7C59]" />
              Production Environment
            </span>
          </header>

          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            <nav className="h-fit rounded-xl border border-[#B8B8B8]/20 bg-white py-4">
              {Array.from(new Set(sections.map((section) => section.group))).map((group) => (
                <div key={group} className="mb-2 last:mb-0">
                  <p className="px-5 py-2 text-[10px] uppercase tracking-[0.1em] text-[#B8B8B8]">{group}</p>
                  {sections
                    .filter((section) => section.group === group)
                    .map((section) => (
                      <button
                        key={section.key}
                        type="button"
                        onClick={() => setActiveSection(section.key)}
                        className={`w-full border-l-[3px] px-5 py-3 text-left text-[13px] ${
                          activeSection === section.key
                            ? "border-[#313131] bg-[#F7F5F1] font-medium text-[#313131]"
                            : "border-transparent text-[#B8B8B8] hover:bg-[#F7F5F1] hover:text-[#313131]"
                        }`}
                      >
                        {section.label}
                      </button>
                    ))}
                </div>
              ))}
            </nav>

            <section>
              {activeSection === "general" ? (
                <>
                  <article className="mb-6 rounded-xl border border-[#B8B8B8]/20 bg-white">
                    <header className="border-b border-[#B8B8B8]/10 px-6 py-5">
                      <h3 className="font-[Cormorant_Garamond,serif] text-[20px] font-semibold">Business Information</h3>
                      <p className="text-xs text-[#B8B8B8]">Core business details used across the platform</p>
                    </header>
                    <div className="grid gap-4 p-6 md:grid-cols-2">
                      <label className="grid gap-1 text-xs">Business Name<input defaultValue="The Global Sanctum Pty Ltd" className="rounded border border-[#B8B8B8]/30 px-3 py-2 text-sm" /></label>
                      <label className="grid gap-1 text-xs">ABN<input defaultValue="12 345 678 901" className="rounded border border-[#B8B8B8]/30 px-3 py-2 text-sm" /></label>
                      <label className="grid gap-1 text-xs md:col-span-2">Business Address<input defaultValue="Brisbane, Queensland, Australia" className="rounded border border-[#B8B8B8]/30 px-3 py-2 text-sm" /></label>
                      <label className="grid gap-1 text-xs">Primary Email<input defaultValue="hello@theglobalsanctum.com" className="rounded border border-[#B8B8B8]/30 px-3 py-2 text-sm" /></label>
                      <label className="grid gap-1 text-xs">Support Email<input defaultValue="support@theglobalsanctum.com" className="rounded border border-[#B8B8B8]/30 px-3 py-2 text-sm" /></label>
                    </div>
                  </article>
                  <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-6">
                    <h3 className="mb-2 font-[Cormorant_Garamond,serif] text-[20px] font-semibold">Website URLs</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="grid gap-1 text-xs">Primary Domain<input defaultValue="www.theglobalsanctum.com" className="rounded border border-[#B8B8B8]/30 px-3 py-2 text-sm" /></label>
                      <label className="grid gap-1 text-xs">Portal URL<input defaultValue="portal.theglobalsanctum.com" className="rounded border border-[#B8B8B8]/30 bg-[#F7F5F1] px-3 py-2 text-sm" readOnly /></label>
                    </div>
                  </article>
                </>
              ) : null}

              {activeSection === "branding" ? (
                <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-6">
                  <h3 className="mb-2 font-[Cormorant_Garamond,serif] text-[20px] font-semibold">Brand Colors</h3>
                  <p className="mb-4 text-xs text-[#B8B8B8]">Primary color palette for TGS brand</p>
                  <div className="flex flex-wrap gap-4">
                    {[
                      ["Sacred Sand", "#F5F0E5"],
                      ["Warm Linen", "#F9F6F0"],
                      ["Canyon Clay", "#7A644F"],
                      ["Charcoal", "#313131"],
                      ["Mineral Green", "#3B5E4C"],
                    ].map(([name, hex]) => (
                      <div key={name} className="text-center">
                        <div className="mb-1 h-14 w-14 rounded border border-[#B8B8B8]/20" style={{ backgroundColor: hex }} />
                        <p className="text-xs font-medium">{name}</p>
                        <p className="text-[10px] text-[#B8B8B8]">{hex}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ) : null}

              {activeSection === "integrations" ? (
                <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-6">
                  <h3 className="mb-4 font-[Cormorant_Garamond,serif] text-[20px] font-semibold">Connected Applications</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {[
                      "Webflow",
                      "Airtable",
                      "Stripe Connect",
                      "Make.com",
                      "Beehiiv",
                      "Brevo",
                      "Memberstack",
                      "Typeform",
                    ].map((item) => (
                      <div key={item} className="rounded-xl bg-[#F7F5F1] p-4">
                        <p className="font-medium">{item}</p>
                        <p className="text-xs text-[#4A7C59]">Connected</p>
                      </div>
                    ))}
                  </div>
                </article>
              ) : null}

              {activeSection === "api" ? (
                <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-6">
                  <h3 className="mb-3 font-[Cormorant_Garamond,serif] text-[20px] font-semibold">API Keys</h3>
                  <div className="space-y-4 text-sm">
                    {[
                      ["Airtable API Key", "pat••••••••••••••••••••••Xk9"],
                      ["Stripe Secret Key (Live)", "sk_live_••••••••••••••••••••••••"],
                      ["Beehiiv API Key", "bh_••••••••••••••••••••••••••"],
                      ["Brevo API Key", "xkeysib-••••••••••••••••••••"],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="mb-1 text-xs font-medium">{label}</p>
                        <div className="rounded bg-[#F7F5F1] px-3 py-2 font-mono text-xs">{value}</div>
                      </div>
                    ))}
                  </div>
                </article>
              ) : null}

              {activeSection === "stripe" ? (
                <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-6">
                  <h3 className="mb-3 font-[Cormorant_Garamond,serif] text-[20px] font-semibold">Stripe Connect Configuration</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-1 text-xs">Account ID<input defaultValue="acct_1Ox7kL9..." className="rounded border border-[#B8B8B8]/30 bg-[#F7F5F1] px-3 py-2 text-sm" readOnly /></label>
                    <label className="grid gap-1 text-xs">Account Status<input defaultValue="Verified ✓" className="rounded border border-[#B8B8B8]/30 bg-[#F7F5F1] px-3 py-2 text-sm" readOnly /></label>
                  </div>
                </article>
              ) : null}

              {activeSection === "pricing" ? (
                <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-6">
                  <h3 className="mb-3 font-[Cormorant_Garamond,serif] text-[20px] font-semibold">Subscription Plans</h3>
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    {[
                      ["Basic", "$79/mo", "7% commission"],
                      ["Standard", "$149/mo", "7% commission"],
                      ["Featured", "$249/mo", "5% commission"],
                      ["Premium", "$399/mo", "5% commission"],
                    ].map(([name, price, rate]) => (
                      <div key={name} className={`rounded-xl p-4 text-center ${name === "Featured" ? "bg-[#313131] text-white" : "bg-[#F7F5F1]"}`}>
                        <p className="font-[Cormorant_Garamond,serif] text-[18px] font-semibold">{name}</p>
                        <p className="text-2xl font-semibold">{price}</p>
                        <p className="text-xs opacity-80">{rate}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ) : null}

              {activeSection === "email" ? (
                <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-6">
                  <h3 className="mb-3 font-[Cormorant_Garamond,serif] text-[20px] font-semibold">Email Configuration</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-1 text-xs">From Name<input defaultValue="The Global Sanctum" className="rounded border border-[#B8B8B8]/30 px-3 py-2 text-sm" /></label>
                    <label className="grid gap-1 text-xs">From Email<input defaultValue="hello@theglobalsanctum.com" className="rounded border border-[#B8B8B8]/30 px-3 py-2 text-sm" /></label>
                    <label className="grid gap-1 text-xs md:col-span-2">Reply-To Email<input defaultValue="support@theglobalsanctum.com" className="rounded border border-[#B8B8B8]/30 px-3 py-2 text-sm" /></label>
                  </div>
                </article>
              ) : null}

              {activeSection === "notifications" ? (
                <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-6">
                  <h3 className="mb-4 font-[Cormorant_Garamond,serif] text-[20px] font-semibold">Admin Notifications</h3>
                  <div className="space-y-4 text-sm">
                    {[
                      "New Booking",
                      "Booking Cancelled",
                      "High-Value Booking",
                      "New Venue Signup",
                      "Subscription Cancelled",
                      "Payment Failed",
                      "Refund Requested",
                    ].map((item) => (
                      <div key={item} className="flex items-center justify-between border-b border-[#B8B8B8]/10 pb-3 last:border-b-0">
                        <p>{item}</p>
                        <span className="inline-flex h-6 w-11 rounded-full bg-[#4A7C59] p-1"><span className="h-4 w-4 rounded-full bg-white translate-x-5" /></span>
                      </div>
                    ))}
                  </div>
                </article>
              ) : null}

              {activeSection === "security" ? (
                <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-6">
                  <h3 className="mb-4 font-[Cormorant_Garamond,serif] text-[20px] font-semibold">Security Settings</h3>
                  <div className="space-y-4 text-sm">
                    {["Two-Factor Authentication", "Session Timeout", "IP Allowlist", "Login Notifications"].map((item, idx) => (
                      <div key={item} className="flex items-center justify-between border-b border-[#B8B8B8]/10 pb-3 last:border-b-0">
                        <p>{item}</p>
                        <span className={`inline-flex h-6 w-11 rounded-full p-1 ${idx === 2 ? "bg-[#B8B8B8]" : "bg-[#4A7C59]"}`}>
                          <span className={`h-4 w-4 rounded-full bg-white ${idx === 2 ? "" : "translate-x-5"}`} />
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              ) : null}

              {activeSection === "backup" ? (
                <article className="rounded-xl border border-[#B8B8B8]/20 bg-white p-6">
                  <h3 className="mb-4 font-[Cormorant_Garamond,serif] text-[20px] font-semibold">Recent Exports</h3>
                  <div className="space-y-2">
                    {[
                      "full-export-2026-02-10.csv",
                      "venues-export-2026-02-01.xlsx",
                      "financial-jan-2026.csv",
                    ].map((item) => (
                      <div key={item} className="flex items-center justify-between rounded-lg bg-[#F7F5F1] px-4 py-3">
                        <p className="text-sm">{item}</p>
                        <button className="rounded border border-[#B8B8B8]/40 px-3 py-1 text-xs">Download</button>
                      </div>
                    ))}
                  </div>
                </article>
              ) : null}

              {activeSection === "danger" ? (
                <>
                  <section className="mb-4 rounded-lg border border-[#C45C5C] bg-[#FCE8E8] px-4 py-3 text-sm text-[#C45C5C]">
                    <strong>Warning:</strong> Actions in this section are destructive and may be irreversible.
                  </section>
                  <article className="rounded-xl border border-[#C45C5C] bg-white p-6">
                    <h3 className="mb-4 font-[Cormorant_Garamond,serif] text-[20px] font-semibold text-[#C45C5C]">Danger Zone</h3>
                    <div className="space-y-3">
                      {[
                        ["Clear Test Data", "Remove all test bookings, users, and transactions from staging environment"],
                        ["Reset Analytics", "Clear all analytics data and start fresh"],
                        ["Purge Cache", "Clear cached data across Webflow, Airtable, and CDN"],
                        ["Emergency Maintenance Mode", "Take the entire platform offline for emergency maintenance"],
                      ].map(([title, desc]) => (
                        <div key={title} className="flex items-center justify-between border-b border-[#B8B8B8]/10 pb-3 last:border-b-0">
                          <div>
                            <p className="font-medium">{title}</p>
                            <p className="text-xs text-[#B8B8B8]">{desc}</p>
                          </div>
                          <button className="rounded bg-[#C45C5C] px-3 py-1.5 text-xs text-white">Run</button>
                        </div>
                      ))}
                    </div>
                  </article>
                </>
              ) : null}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
