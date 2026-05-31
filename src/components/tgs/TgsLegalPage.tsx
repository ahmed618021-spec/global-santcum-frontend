"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TgsNavDrawer from "@/components/tgs/TgsNavDrawer";

const styles = `
:root {
    --warm-white: #FDFCF9;
    --warm-cream: #F7F5F1;
    --warm-charcoal: #3A3A3A;
    --charcoal: #313131;
    --charcoal-80: rgba(49, 49, 49, 0.8);
    --charcoal-70: rgba(49, 49, 49, 0.7);
    --charcoal-50: rgba(49, 49, 49, 0.5);
    --charcoal-30: rgba(49, 49, 49, 0.3);
    --charcoal-15: rgba(49, 49, 49, 0.15);
    --charcoal-10: rgba(49, 49, 49, 0.1);
    --charcoal-08: rgba(49, 49, 49, 0.08);
    --charcoal-05: rgba(49, 49, 49, 0.05);
    --gold: #C4A265;
    --gold-accent: #C4A265;
    --gold-dark: #7A644F;
    --canyon-clay: #7A644F;
    --mist: #8B8B8B;
    --light-rule: #E0D8CC;
    --font-serif: 'Cormorant Garamond', Georgia, serif;
    --font-sans: 'Montserrat', sans-serif;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
    font-family: var(--font-serif);
    color: var(--charcoal);
    background: var(--warm-white);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
}

a { color: inherit; text-decoration: none; }

.skip-to-content {
    position: absolute; top: -100px; left: 16px;
    background: var(--charcoal); color: var(--warm-white);
    padding: 12px 20px; z-index: 9999;
    font-family: var(--font-sans); font-size: 13px; font-weight: 500;
    letter-spacing: 0.05em; text-transform: uppercase;
    transition: top 0.2s; text-decoration: none;
}
.skip-to-content:focus { top: 16px; outline: 2px solid var(--gold-accent); }

.nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 24px 48px;
    background: rgba(253, 252, 249, 0.95);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--charcoal-08);
    transition: background 0.3s ease, backdrop-filter 0.3s ease;
}
.nav-inner {
    max-width: 1400px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    gap: 24px;
}
.nav-left { display: flex; align-items: center; gap: 14px; cursor: pointer; }
.nav-hamburger {
    display: flex; flex-direction: column; gap: 4px;
    background: transparent; border: none; padding: 0;
    cursor: pointer; color: inherit;
}
.nav-hamburger:focus-visible { outline: 2px solid var(--gold-accent); outline-offset: 4px; }
.nav-hamburger span {
    width: 22px; height: 1px; background: var(--charcoal);
    transition: background 0.3s, transform 0.3s, opacity 0.3s, width 0.3s;
}
.nav-hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
.nav-hamburger.active span:nth-child(2) { opacity: 0; }
.nav-hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }
.nav-hamburger-label {
    font-family: var(--font-sans); font-size: 11px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--charcoal); transition: color 0.3s;
}
.nav-logo-area {
    display: flex; align-items: center; gap: 14px;
    color: var(--charcoal); transition: color 0.3s;
    text-decoration: none;
}
.nav-logo {
    width: 40px; height: 40px;
    border: 1px solid var(--gold-accent);
    transform: rotate(45deg);
    position: relative;
}
.nav-logo::after {
    content: ""; position: absolute; inset: 4px;
    border: 1px solid var(--gold-accent);
}
.nav-brand-text {
    font-family: var(--font-serif); font-size: 18px;
    font-weight: 400; letter-spacing: 0.32em;
    text-transform: uppercase;
}
.nav-right { width: 80px; }

.drawer-overlay {
    position: fixed; inset: 0; z-index: 998;
    background: rgba(49,49,49,0.45);
    backdrop-filter: blur(2px);
    opacity: 0; visibility: hidden;
    transition: opacity 0.4s ease, visibility 0.4s ease;
}
.drawer-overlay.active { opacity: 1; visibility: visible; }

.drawer {
    position: fixed; top: 0; left: 0;
    width: 440px; max-width: 90vw; height: 100vh;
    background: var(--warm-white); z-index: 999;
    transform: translateX(-100%);
    transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
    display: flex; flex-direction: column; overflow: hidden;
}
.drawer.active { transform: translateX(0); }

.drawer-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 36px;
    border-bottom: 1px solid var(--charcoal-08);
    flex-shrink: 0;
}
.drawer-header-left { display: flex; align-items: center; gap: 12px; }
.drawer-logo {
    width: 32px; height: 32px;
    border: 1px solid var(--gold-accent);
    transform: rotate(45deg); position: relative;
}
.drawer-logo::after {
    content: ""; position: absolute; inset: 3px;
    border: 1px solid var(--gold-accent);
}
.drawer-label {
    font-family: var(--font-sans); font-size: 10px;
    font-weight: 500; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--charcoal-50);
}
.drawer-close {
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid var(--charcoal-08); background: var(--warm-cream);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-size: 18px; color: var(--charcoal-50);
    transition: all 0.25s;
}
.drawer-close:hover { border-color: var(--charcoal-30); color: var(--charcoal); }

.drawer-search {
    padding: 20px 36px;
    border-bottom: 1px solid var(--charcoal-08);
    flex-shrink: 0;
}
.drawer-search-bar {
    display: flex; align-items: center; gap: 10px;
    background: var(--warm-cream); border: 1px solid var(--charcoal-08);
    border-radius: 50px; padding: 10px 18px;
    transition: border-color 0.2s;
}
.drawer-search-bar:focus-within { border-color: var(--charcoal-30); }
.drawer-search-bar svg { width: 16px; height: 16px; color: var(--charcoal-30); flex-shrink: 0; }
.drawer-search-bar input {
    flex: 1; border: none; outline: none; background: transparent;
    font-family: var(--font-sans); font-size: 13px; color: var(--charcoal);
}
.drawer-search-bar input::placeholder { color: var(--charcoal-30); }

.drawer-body { flex: 1; overflow-y: auto; padding: 28px 36px; }
.drawer-group { margin-bottom: 32px; }
.drawer-group:last-child { margin-bottom: 0; }
.drawer-group-label {
    font-family: var(--font-sans); font-size: 9px;
    font-weight: 600; letter-spacing: 0.25em;
    text-transform: uppercase; color: var(--charcoal);
    margin-bottom: 12px; padding-left: 2px;
}
.drawer-link {
    display: flex; align-items: center; justify-content: space-between;
    font-family: var(--font-serif); font-size: 26px; font-weight: 300;
    color: var(--charcoal); padding: 12px 0;
    border-bottom: 1px solid var(--charcoal-05);
    transition: color 0.3s, padding-left 0.3s;
    text-decoration: none;
}
.drawer-link:last-child { border-bottom: none; }
.drawer-link:hover { color: var(--charcoal-70); padding-left: 6px; }
.drawer-link-arrow { font-size: 18px; color: var(--charcoal-15); transition: color 0.3s, transform 0.3s; }
.drawer-link:hover .drawer-link-arrow { color: var(--charcoal-50); transform: translateX(4px); }
.drawer-secondary-link {
    display: flex; align-items: center; gap: 10px;
    font-family: var(--font-serif); font-size: 26px; font-weight: 300;
    color: var(--charcoal); padding: 10px 0;
    transition: color 0.2s, padding-left 0.2s;
    text-decoration: none;
}
.drawer-secondary-link:hover { color: var(--charcoal-70); padding-left: 4px; }
.drawer-cta {
    display: block; width: 100%; text-align: center;
    background: var(--charcoal); color: #FFFFFF;
    font-family: var(--font-sans); font-size: 11px; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase;
    padding: 16px 24px; transition: background 0.3s; margin-top: 8px;
    text-decoration: none;
}
.drawer-cta:hover { background: var(--warm-charcoal); }
.drawer-footer {
    padding: 24px 36px;
    border-top: 1px solid var(--charcoal-08);
    background: var(--warm-cream); flex-shrink: 0;
}
.drawer-footer-contact {
    display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;
}
.drawer-footer-item {
    display: flex; align-items: center; gap: 10px;
    font-family: var(--font-sans); font-size: 12px;
    color: var(--charcoal-50); transition: color 0.2s;
    text-decoration: none;
}
.drawer-footer-item:hover { color: var(--charcoal); }
.drawer-footer-item svg { width: 14px; height: 14px; flex-shrink: 0; }
.drawer-social { display: flex; gap: 10px; }
.drawer-social a {
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid var(--charcoal-08);
    display: flex; align-items: center; justify-content: center;
    color: var(--charcoal-50); font-family: var(--font-sans);
    font-size: 11px; font-weight: 500; transition: all 0.2s;
    text-decoration: none;
}
.drawer-social a:hover { border-color: var(--charcoal); color: var(--charcoal); }

.hero {
    padding: 140px 48px 48px;
    text-align: center;
    background: var(--warm-white);
}

.hero-overline {
    font-family: var(--font-sans); font-size: 10px; font-weight: 500;
    letter-spacing: 0.3em; text-transform: uppercase; color: var(--charcoal); margin-bottom: 20px;
}

.hero-title {
    font-family: var(--font-serif); font-size: clamp(36px, 5vw, 52px); font-weight: 300;
    line-height: 1.15; color: var(--charcoal); margin-bottom: 16px;
}

.hero-subtitle {
    font-family: var(--font-serif); font-size: 18px; font-weight: 300;
    line-height: 1.65; color: var(--charcoal-70); max-width: 560px; margin: 0 auto 12px;
}

.hero-date {
    font-family: var(--font-sans); font-size: 10px; font-weight: 400;
    letter-spacing: 0.1em; text-transform: uppercase; color: var(--charcoal-30);
}

.policy-tabs {
    position: sticky;
    top: 72px;
    z-index: 100;
    background: var(--warm-white);
    border-bottom: 1px solid var(--charcoal-10);
}

.policy-tabs-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0;
    padding: 0 24px;
}

.policy-tab {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--charcoal-50);
    padding: 18px 24px;
    border: none;
    background: none;
    cursor: pointer;
    position: relative;
    transition: color 0.3s ease;
    white-space: nowrap;
}

.policy-tab:hover { color: var(--charcoal); }

.policy-tab.active {
    color: var(--charcoal);
    font-weight: 500;
}

.policy-tab.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 20px;
    right: 20px;
    height: 2px;
    background: var(--charcoal);
}

.legal-layout {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 48px 100px;
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 64px;
}

.toc {
    position: sticky;
    top: 144px;
    align-self: start;
    max-height: calc(100vh - 180px);
    overflow-y: auto;
}

.toc-label {
    font-family: var(--font-sans); font-size: 9px; font-weight: 500;
    letter-spacing: 0.25em; text-transform: uppercase; color: var(--charcoal-30);
    margin-bottom: 16px;
}

.toc-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0;
}

.toc-link {
    display: block;
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 400;
    line-height: 1.4;
    color: var(--charcoal-50);
    padding: 8px 0;
    border-left: 2px solid transparent;
    padding-left: 16px;
    transition: all 0.3s ease;
}

.toc-link:hover { color: var(--charcoal); }

.toc-link.active {
    color: var(--charcoal);
    font-weight: 500;
    border-left-color: var(--charcoal);
}

.policy-content { display: none; }
.policy-content.active { display: block; }

.policy-intro {
    font-family: var(--font-serif); font-size: 18px; font-weight: 300;
    line-height: 1.75; color: var(--charcoal-70); margin-bottom: 48px;
    padding-bottom: 32px; border-bottom: 1px solid var(--charcoal-10);
}

.policy-section { margin-bottom: 48px; }

.policy-section-title {
    font-family: var(--font-sans); font-size: 11px; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--charcoal);
    margin-bottom: 20px; padding-bottom: 12px;
    border-bottom: 1px solid var(--charcoal-10);
}

.policy-text {
    font-family: var(--font-serif); font-size: 17px; font-weight: 300;
    line-height: 1.8; color: var(--charcoal); margin-bottom: 16px;
}

.policy-list {
    list-style: none; margin-bottom: 16px; padding-left: 0;
}

.policy-list li {
    font-family: var(--font-serif); font-size: 17px; font-weight: 300;
    line-height: 1.8; color: var(--charcoal); padding: 4px 0 4px 20px;
    position: relative;
}

.policy-list li::before {
    content: '\\2013';
    position: absolute; left: 0; color: var(--charcoal-30);
}

.policy-subsection {
    font-family: var(--font-serif); font-size: 19px; font-weight: 400;
    color: var(--charcoal); margin-top: 28px; margin-bottom: 12px;
}

.policy-contact {
    background: var(--warm-cream);
    padding: 28px 32px;
    margin-top: 48px;
}

.policy-contact p {
    font-family: var(--font-serif); font-size: 16px; font-weight: 300;
    line-height: 1.7; color: var(--charcoal);
}

.policy-contact a {
    color: var(--canyon-clay);
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s ease;
}

.policy-contact a:hover { border-color: var(--canyon-clay); }

.footer { background: var(--charcoal); color: rgba(255,255,255,0.7); padding: 80px 48px 40px; }
.footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr repeat(4, 1fr); gap: 48px; padding-bottom: 56px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.footer-brand { display: flex; flex-direction: column; gap: 20px; }
.footer-logo-placeholder { width: 72px; height: 72px; border: 2px dashed var(--gold-accent); border-radius: 10px; display: flex; align-items: center; justify-content: center; background: rgba(196, 162, 101, 0.08); flex-shrink: 0; }
.footer-logo-placeholder span { font-family: var(--font-sans); font-size: 8px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: var(--gold-accent); text-align: center; line-height: 1.3; padding: 4px; }
.footer-brand-name { font-family: var(--font-serif); font-size: 18px; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.9); }
.footer-brand-text { font-family: var(--font-serif); font-size: 15px; font-weight: 400; line-height: 1.7; color: rgba(255,255,255,0.5); }
.footer-brand-meta { font-family: var(--font-sans); font-size: 11px; font-weight: 400; line-height: 1.7; letter-spacing: 0.05em; color: rgba(255,255,255,0.35); }
.footer-col-title { font-family: var(--font-sans); font-size: 10px; font-weight: 500; letter-spacing: 0.20em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 24px; }
.footer-links { list-style: none; display: flex; flex-direction: column; gap: 14px; }
.footer-links a { font-family: var(--font-serif); font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.6); transition: color 0.3s; text-decoration: none; }
.footer-links a:hover { color: rgba(255,255,255,0.95); }
.footer-bottom { max-width: 1400px; margin: 0 auto; padding-top: 32px; display: flex; justify-content: space-between; align-items: center; }
.footer-copyright { font-family: var(--font-sans); font-size: 12px; font-weight: 400; letter-spacing: 0.05em; color: rgba(255,255,255,0.3); }
.footer-social { display: flex; gap: 24px; }
.footer-social a { font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.4); transition: color 0.3s ease; text-decoration: none; }
.footer-social a:hover { color: var(--gold-accent); }

@media (max-width: 1100px) {
    .footer-grid { grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
}
@media (max-width: 1024px) {
    .legal-layout { grid-template-columns: 200px 1fr; gap: 40px; }
}
@media (max-width: 768px) {
    .nav { padding: 18px 24px; }
    .nav-hamburger-label { display: none; }
    .drawer { width: 100%; max-width: 100vw; }

    .hero { padding: 120px 24px 36px; }
    .policy-tabs { top: 60px; }
    .policy-tab { padding: 14px 20px; font-size: 9px; letter-spacing: 0.1em; }

    .policy-tabs-inner {
        flex-wrap: nowrap;
        justify-content: flex-start;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        padding: 0 16px;
    }
    .policy-tabs-inner::-webkit-scrollbar { display: none; }

    .legal-layout { grid-template-columns: 1fr; padding: 0 24px 72px; gap: 0; }

    .toc {
        position: relative; top: auto;
        max-height: none;
        padding: 24px;
        background: var(--warm-cream);
        margin-bottom: 36px;
        margin-top: 36px;
    }

    .footer { padding: 60px 24px 24px; }
    .footer-grid { grid-template-columns: 1fr; gap: 32px; }
}
@media (max-width: 600px) {
    .footer-bottom { flex-direction: column; gap: 20px; align-items: flex-start; padding-top: 28px; }
    .footer-copyright { white-space: normal; }
    .footer-social { gap: 20px; }
}
`;

const EMAIL = "hello@theglobalsanctum.com";

type TabId =
  | "terms"
  | "privacy"
  | "cookies"
  | "health"
  | "refunds"
  | "booking"
  | "acceptable"
  | "community"
  | "venue-partner";

const TAB_IDS: TabId[] = [
  "terms",
  "privacy",
  "cookies",
  "health",
  "refunds",
  "booking",
  "acceptable",
  "community",
  "venue-partner",
];

const PATH_TAB_MAP: Record<string, TabId> = {
  "privacy-policy": "privacy",
  "cookies-policy": "cookies",
  "terms-and-conditions": "terms",
};

function pathToTab(pathname: string | null): TabId {
  const seg = (pathname || "").split("/").filter(Boolean).pop() || "";
  return PATH_TAB_MAP[seg] ?? "terms";
}

const tabLabels: Record<TabId, string> = {
  terms: "Terms & Conditions",
  privacy: "Privacy Policy",
  cookies: "Cookie Policy",
  health: "Health & Wellness Disclaimer",
  refunds: "Refund & Cancellation Policy",
  booking: "Booking Terms & Conditions",
  acceptable: "Acceptable Use Policy",
  community: "Community Standards & Code of Conduct",
  "venue-partner": "Venue Partner Terms",
};

const tocData: Record<TabId, { id: string; label: string }[]> = {
  terms: [
    { id: "t-purpose", label: "1. Purpose of the Site" },
    { id: "t-about", label: "2. About TGS" },
    { id: "t-roles", label: "3. User Roles" },
    { id: "t-ip", label: "4. Intellectual Property" },
    { id: "t-subscriptions", label: "5. Subscriptions & Fees" },
    { id: "t-bookings", label: "6. Bookings & Payments" },
    { id: "t-refunds", label: "7. Refunds & Cancellations" },
    { id: "t-community", label: "8. Community Standards" },
    { id: "t-liability", label: "9. Liabilities & Disclaimers" },
    { id: "t-insurance", label: "10. Insurance" },
    { id: "t-suspension", label: "11. Non-Payment & Suspension" },
    { id: "t-disputes", label: "12. Disputes & Resolution" },
    { id: "t-changes", label: "13. Changes to Terms" },
    { id: "t-venue-agreement", label: "14. Venue Owner Agreement" },
    { id: "t-law", label: "15. Governing Law" },
    { id: "t-contact", label: "Contact Us" },
  ],
  privacy: [
    { id: "p-collect", label: "1. Information We Collect" },
    { id: "p-use", label: "2. How We Use Your Information" },
    { id: "p-sharing", label: "3. Sharing Your Information" },
    { id: "p-security", label: "4. Data Security" },
    { id: "p-transfers", label: "5. International Transfers" },
    { id: "p-rights", label: "6. Your Rights" },
    { id: "p-retention", label: "7. Retention of Information" },
    { id: "p-updates", label: "8. Updates to This Policy" },
    { id: "p-contact", label: "Contact Us" },
  ],
  cookies: [
    { id: "c-what", label: "1. What Are Cookies?" },
    { id: "c-types", label: "2. Types of Cookies We Use" },
    { id: "c-why", label: "3. Why We Use Cookies" },
    { id: "c-third", label: "4. Third-Party Cookies" },
    { id: "c-manage", label: "5. Managing Cookies" },
    { id: "c-updates", label: "6. Updates to This Policy" },
    { id: "c-contact", label: "Contact Us" },
  ],
  health: [
    { id: "h-general", label: "1. General Disclaimer" },
    { id: "h-nature", label: "2. Nature of Wellness Services" },
    { id: "h-responsibility", label: "3. Responsibility of Participants" },
    { id: "h-community", label: "4. Responsibilities of Community Members" },
    { id: "h-risks", label: "5. Inherent Risks" },
    { id: "h-guarantees", label: "6. No Guarantees" },
    { id: "h-release", label: "7. Release of Liability" },
    { id: "h-assumption", label: "8. Assumption of Risk" },
    { id: "h-insurance", label: "9. Insurance Recommendations" },
    { id: "h-indemnification", label: "10. Indemnification" },
    { id: "h-minors", label: "11. Children & Minors" },
    { id: "h-law", label: "12. Governing Law" },
    { id: "h-updates", label: "13. Updates to This Disclaimer" },
    { id: "h-contact", label: "Contact Us" },
  ],
  refunds: [
    { id: "r-general", label: "1. General Principles" },
    { id: "r-cancellations", label: "2. Booking Cancellations by Guests" },
    { id: "r-venue-cancellations", label: "3. Cancellations by Venue Owners" },
    { id: "r-subscriptions", label: "4. Subscription Cancellations" },
    { id: "r-force-majeure", label: "5. Force Majeure" },
    { id: "r-commission", label: "6. Commission & Fee Treatment" },
    { id: "r-discretionary", label: "7. Platform Discretionary Refunds" },
    { id: "r-chargebacks", label: "8. Chargebacks" },
    { id: "r-request", label: "9. How to Request a Refund" },
    { id: "r-disputes", label: "10. Refund Disputes" },
    { id: "r-consumer-rights", label: "11. Consumer Rights" },
    { id: "r-law", label: "12. Governing Law" },
    { id: "r-changes", label: "13. Changes to This Policy" },
    { id: "r-contact", label: "Contact Us" },
  ],
  booking: [
    { id: "bt-overview", label: "1. Platform Overview" },
    { id: "bt-roles", label: "2. User Roles & Eligibility" },
    { id: "bt-bookings", label: "3. How Bookings Work" },
    { id: "bt-fees", label: "4. Fees, Commissions & Pricing" },
    { id: "bt-payments", label: "5. Payments & Payouts" },
    { id: "bt-modifications", label: "6. Booking Modifications" },
    { id: "bt-cancellations", label: "7. Cancellations & Refunds" },
    { id: "bt-responsibilities", label: "8. Responsibilities" },
    { id: "bt-disputes", label: "9. Booking Disputes" },
    { id: "bt-liability", label: "10. Liability & Disclaimers" },
    { id: "bt-insurance", label: "11. Insurance" },
    { id: "bt-conduct", label: "12. Code of Conduct" },
    { id: "bt-privacy", label: "13. Privacy & Data" },
    { id: "bt-ip", label: "14. Intellectual Property" },
    { id: "bt-indemnification", label: "15. Indemnification" },
    { id: "bt-severability", label: "16. Severability" },
    { id: "bt-law", label: "17. Governing Law" },
    { id: "bt-changes", label: "18. Changes to These Terms" },
    { id: "bt-contact", label: "Contact Us" },
  ],
  acceptable: [
    { id: "au-permitted", label: "1. Permitted Use" },
    { id: "au-prohibited", label: "2. Prohibited Conduct" },
    { id: "au-account", label: "3. Account Responsibilities" },
    { id: "au-ip", label: "4. Intellectual Property" },
    { id: "au-monitoring", label: "5. Monitoring & Enforcement" },
    { id: "au-reporting", label: "6. Reporting Violations" },
    { id: "au-third-party", label: "7. Third-Party Services" },
    { id: "au-liability", label: "8. Liability & Indemnification" },
    { id: "au-law", label: "9. Governing Law" },
    { id: "au-updates", label: "10. Updates to This Policy" },
    { id: "au-contact", label: "Contact Us" },
  ],
  community: [
    { id: "cs-principles", label: "1. Core Principles" },
    { id: "cs-venues", label: "2. Expectations for Venue Owners" },
    { id: "cs-facilitators", label: "3. Expectations for Retreat Hosts" },
    { id: "cs-guests", label: "4. Expectations for Guests" },
    { id: "cs-communication", label: "5. Communication Standards" },
    { id: "cs-inclusion", label: "6. Non-Discrimination & Inclusion" },
    { id: "cs-prohibited", label: "7. Prohibited Behaviour" },
    { id: "cs-enforcement", label: "8. Consequences & Enforcement" },
    { id: "cs-reporting", label: "9. Reporting Concerns" },
    { id: "cs-general", label: "10. General Provisions" },
    { id: "cs-updates", label: "11. Updates to These Standards" },
    { id: "cs-contact", label: "Contact Us" },
  ],
  "venue-partner": [
    { id: "vp-overview", label: "1. Overview" },
    { id: "vp-eligibility", label: "2. Eligibility & Onboarding" },
    { id: "vp-subscription", label: "3. Subscription & Fees" },
    { id: "vp-listing", label: "4. Listing Obligations" },
    { id: "vp-commission", label: "5. Commission & Disbursement" },
    { id: "vp-conduct", label: "6. Conduct Standards" },
    { id: "vp-term", label: "7. Term, Suspension & Termination" },
    { id: "vp-precedence", label: "8. Precedence" },
    { id: "vp-contact", label: "Contact Us" },
  ],
};

function EmailLink({ contact = false }: { contact?: boolean }) {
  return (
    <a
      className="email-link"
      href={`mailto:${EMAIL}`}
      style={contact ? undefined : { color: "var(--canyon-clay)" }}
    >
      <span className="email-text">{EMAIL}</span>
    </a>
  );
}

function ContactBlock({
  lead,
  withWebLabel = true,
}: {
  lead?: string;
  withWebLabel?: boolean;
}) {
  return (
    <>
      <p>
        <strong>Contact Us</strong>
      </p>
      <p>
        {lead ? (
          <>
            {lead}
            <br />
          </>
        ) : null}
        Aurella Group Pty Ltd, trading as The Global Sanctum
        <br />
        ABN 70 649 742 423
        <br />
        Email: <EmailLink contact />
        <br />
        {withWebLabel ? "Web: " : null}
        <a href="https://www.theglobalsanctum.com">www.theglobalsanctum.com</a>
        <br />
        Address: 58 Wellington Street, Virginia QLD Australia 4014
      </p>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <p className="policy-intro">The Global Sanctum (&quot;TGS&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) welcomes you. By accessing or using our platform (www.theglobalsanctum.com and any sub-pages), you agree to these Terms and Conditions. If you do not agree, please do not use the site.</p>

      <div className="policy-section" id="t-purpose">
        <h2 className="policy-section-title">1. Purpose of the Site</h2>
        <p className="policy-text">This site is operated by The Global Sanctum to share information about our platform, services, and community initiatives. Content is for general information only and may change or be updated at any time.</p>
      </div>

      <div className="policy-section" id="t-about">
        <h2 className="policy-section-title">2. About TGS</h2>
        <p className="policy-text">TGS is a venue discovery and booking platform for retreat venues, wellness resorts, retreat hosts, and wellness guests.</p>
        <ul className="policy-list">
          <li>TGS does not own or operate the venues listed.</li>
          <li>We act as an intermediary connecting venue owners with retreat hosts and wellness guests.</li>
          <li>All bookings are subject to the policies of the venue and host, as well as these Terms.</li>
        </ul>
      </div>

      <div className="policy-section" id="t-roles">
        <h2 className="policy-section-title">3. User Roles</h2>
        <p className="policy-text">You may interact with TGS in one or more of the following roles:</p>
        <ul className="policy-list">
          <li>Venue Owner: lists property or resort for hire via subscription.</li>
          <li>Retreat Host: books venues for retreats, workshops, events, or group programs.</li>
          <li>Wellness Guest: books wellness stays, experiences, and retreats via the platform.</li>
        </ul>
        <p className="policy-text">Different rules may apply depending on your role.</p>
      </div>

      <div className="policy-section" id="t-ip">
        <h2 className="policy-section-title">4. Intellectual Property</h2>
        <p className="policy-text">All written content, brand concepts, layout design, and original materials on this site are the property of The Global Sanctum and are protected under Australian copyright and trademark law.</p>
      </div>

      <div className="policy-section" id="t-subscriptions">
        <h2 className="policy-section-title">5. Subscriptions &amp; Fees</h2>
        <p className="policy-text">Venue owners list on the platform via a paid subscription, available on monthly or annual billing cycles across four tiers (Essentials, Standard, Featured, Premium). Each tier carries a different commission rate on completed bookings. Full details, including pricing, inclusions, and commission rates, are set out in our Credit &amp; Payment Policy and the Venue Owner Subscription Terms.</p>
        <p className="policy-text">A 3% Stripe processing fee applies to all booking transactions and is charged to the person making the payment (retreat host or wellness guest). All platform fees, subscriptions, and commissions are denominated in Australian Dollars (AUD). All fees are subject to change with reasonable notice.</p>
      </div>

      <div className="policy-section" id="t-bookings">
        <h2 className="policy-section-title">6. Bookings &amp; Payments</h2>
        <p className="policy-text">All bookings are facilitated through the TGS platform. Payments are processed securely via Stripe Connect &mdash; TGS does not store credit card details and does not hold guest or host funds at any stage of the booking process.</p>
        <ul className="policy-list">
          <li>Booking confirmations are subject to venue availability and venue owner acceptance.</li>
          <li>Payment terms, deposit requirements, and scheduled payment milestones are determined by the venue&apos;s published payment policy and are clearly displayed at the time of booking.</li>
          <li>The initial deposit is forwarded to the venue owner in full. Platform commission is deducted from the second scheduled payment onwards via Stripe Connect, applied cumulatively across subsequent payments until the full commission amount on the total booking value has been collected.</li>
          <li>Where a booking is paid in a single payment, commission is deducted from that payment at the time of processing.</li>
        </ul>
        <p className="policy-text">Full details on payment processing, payouts, and commission timing are set out in our Booking Terms &amp; Conditions and Credit &amp; Payment Policy.</p>
      </div>

      <div className="policy-section" id="t-refunds">
        <h2 className="policy-section-title">7. Refunds &amp; Cancellations</h2>
        <p className="policy-text">Cancellation and refund terms vary depending on who initiates the cancellation and the timing relative to the venue&apos;s payment schedule. Each venue owner sets a cancellation policy from one of TGS&apos;s standard frameworks (Flexible, Moderate, Firm, Non-Refundable, or Custom), which is displayed to the retreat host or wellness guest before booking confirmation.</p>
        <ul className="policy-list">
          <li>Refund amounts are determined by the venue&apos;s cancellation policy and the timing of the cancellation.</li>
          <li>The 3% Stripe processing fee is non-refundable on guest-initiated cancellations, except where required by law or where the venue initiates the cancellation.</li>
          <li>A Cancellation Administration Fee applies to all guest-initiated cancellations of confirmed bookings, calculated on a tiered basis according to timing.</li>
          <li>Where a venue owner cancels a confirmed booking, the retreat host or wellness guest is entitled to a full refund of all amounts paid, including the Stripe processing fee.</li>
          <li>Force majeure events are handled on a case-by-case basis and may result in date changes, credit notes, or refunds.</li>
        </ul>
        <p className="policy-text">Full details, including the Cancellation Administration Fee schedule, commission treatment, and the resolution process for force majeure events, are set out in our Refund &amp; Cancellation Policy.</p>
      </div>

      <div className="policy-section" id="t-community">
        <h2 className="policy-section-title">8. Community Standards</h2>
        <p className="policy-text">All users are expected to engage respectfully with the TGS community. We reserve the right to suspend or terminate accounts that violate our community standards, including but not limited to harassment, misrepresentation, or fraudulent activity.</p>
      </div>

      <div className="policy-section" id="t-liability">
        <h2 className="policy-section-title">9. Liabilities &amp; Disclaimers</h2>
        <p className="policy-text">TGS acts as an intermediary only. We are not responsible for venue conditions, host performance, or wellness guest behaviour. Our role is to facilitate secure bookings and payments.</p>
        <ul className="policy-list">
          <li>TGS is not liable for the condition, safety or suitability of venues.</li>
          <li>TGS does not guarantee the performance of retreat hosts or venue owners.</li>
          <li>Our responsibility is limited to operating the booking platform and processing payments.</li>
        </ul>
        <p className="policy-text">We aim to ensure all information on the site is accurate, but we make no representations or warranties of any kind regarding completeness, reliability, or suitability of the content.</p>
      </div>

      <div className="policy-section" id="t-insurance">
        <h2 className="policy-section-title">10. Insurance</h2>
        <p className="policy-text">Venue owners are required to maintain appropriate insurance for their properties. Retreat hosts are strongly encouraged to carry professional indemnity insurance. Wellness Guests are strongly encouraged to obtain their own travel and health insurance.</p>
        <p className="policy-text">TGS&apos;s platform insurance does not extend to cover the activities, operations, or liabilities of venue owners, retreat hosts, or wellness guests, or to any third-party services accessed through the platform. Refer to our Insurance Statement for further details.</p>
      </div>

      <div className="policy-section" id="t-suspension">
        <h2 className="policy-section-title">11. Non-Payment &amp; Account Suspension</h2>
        <p className="policy-text">All users are required to pay fees and charges in accordance with these Terms. If a subscription payment, invoice, or other amount owed to TGS is not received by the due date, the following process applies:</p>
        <ul className="policy-list">
          <li><strong>Day 1&ndash;3:</strong> Payment reminder issued via email. Stripe will automatically reattempt the charge.</li>
          <li><strong>Day 7:</strong> Late fee of 2% per week applied to the outstanding balance. Second reminder issued.</li>
          <li><strong>Day 14:</strong> Listing and platform features may be suspended. Access to the dashboard remains available for the purpose of updating payment details.</li>
          <li><strong>Day 30+:</strong> Account may be terminated. Outstanding balance may be referred to a collection service at the account holder&apos;s expense.</li>
        </ul>
        <p className="policy-text">Suspended accounts can be reactivated upon payment of all outstanding fees and late charges. TGS reserves the right to offset outstanding amounts against pending payouts owed to the venue owner. Full details are set out in our Credit &amp; Payment Policy.</p>
      </div>

      <div className="policy-section" id="t-disputes">
        <h2 className="policy-section-title">12. Disputes &amp; Resolution</h2>
        <p className="policy-text">In the event of a dispute, parties are encouraged to resolve matters directly. TGS may offer mediation support but is not obligated to resolve disputes between users. Formal disputes will be governed by the laws of Queensland, Australia.</p>
      </div>

      <div className="policy-section" id="t-changes">
        <h2 className="policy-section-title">13. Changes to These Terms</h2>
        <p className="policy-text">The Global Sanctum reserves the right to update or amend these terms with notice. Continued use of the platform after changes constitutes acceptance of the updated terms.</p>
      </div>

      <div className="policy-section" id="t-venue-agreement">
        <h2 className="policy-section-title">14. Venue Owner Agreement</h2>
        <p className="policy-text">Venue owners who register on the TGS platform are required to accept a Venue Owner Agreement as part of the onboarding process. This agreement sets out the specific terms governing your subscription, listing obligations, commission arrangements, disbursement timelines, and conduct standards applicable to your role as a venue partner. By completing the onboarding process, you confirm that you have read and accepted the Venue Owner Agreement in full. In the event of any conflict between these Terms and Conditions and the Venue Owner Agreement, the Venue Owner Agreement will take precedence with respect to the venue-specific matters. A copy of the Venue Owner Agreement accepted at the time of your onboarding is available on request by contacting <EmailLink />.</p>
      </div>

      <div className="policy-section" id="t-law">
        <h2 className="policy-section-title">15. Governing Law</h2>
        <p className="policy-text">This agreement is governed by the laws of Queensland, Australia. Any legal proceedings shall be conducted in the courts of Queensland.</p>
      </div>

      <div className="policy-contact" id="t-contact">
        <ContactBlock />
      </div>
    </>
  );
}

function PrivacyContent() {
  return (
    <>
      <p className="policy-intro">At The Global Sanctum (&quot;TGS&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;), your privacy is very important to us. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our website, services, and platform.</p>

      <div className="policy-section" id="p-collect">
        <h2 className="policy-section-title">1. Information We Collect</h2>
        <p className="policy-text">We may collect the following types of information:</p>
        <ul className="policy-list">
          <li>Personal details: name, email address, phone number, billing address, payment details.</li>
          <li>Business details: venue information, company name, website, descriptions, and media provided by venue owners or wellness resorts.</li>
          <li>Booking details: retreat requests, travel dates, group size, preferences, dietary or accessibility needs.</li>
          <li>Account information: login credentials (via authentication integrations).</li>
          <li>Technical data: IP address, browser type, device identifiers, cookies, and usage statistics.</li>
        </ul>
      </div>

      <div className="policy-section" id="p-use">
        <h2 className="policy-section-title">2. How We Use Your Information</h2>
        <p className="policy-text">We use the information collected to:</p>
        <ul className="policy-list">
          <li>Provide or manage your bookings, listings, or subscriptions.</li>
          <li>Process payments securely via Stripe Connect.</li>
          <li>Communicate with you about your account, inquiries, or updates.</li>
          <li>Send promotional emails or newsletters (you may opt out anytime).</li>
          <li>Improve and personalise the TGS platform.</li>
          <li>Comply with legal obligations.</li>
        </ul>
      </div>

      <div className="policy-section" id="p-sharing">
        <h2 className="policy-section-title">3. Sharing Your Information</h2>
        <p className="policy-text">We only share information where necessary:</p>
        <ul className="policy-list">
          <li>With Venues or Retreat Hosts when you submit a booking or enquiry.</li>
          <li>With Payment Processors (e.g. Stripe) to process transactions.</li>
          <li>With Service Providers who support our operations (e.g. email platforms, hosting, analytics).</li>
          <li>When required by Law, Regulation, or Court Order.</li>
          <li>In Business Transfers, such as mergers or acquisitions.</li>
        </ul>
      </div>

      <div className="policy-section" id="p-security">
        <h2 className="policy-section-title">4. Data Security</h2>
        <p className="policy-text">We implement industry-standard security measures including encryption, secure servers, and access controls to protect your data.</p>
        <ul className="policy-list">
          <li>We restrict access to personal information to authorised staff and contractors only.</li>
          <li>Despite our safeguards, no system is 100% secure; we cannot guarantee absolute security.</li>
        </ul>
      </div>

      <div className="policy-section" id="p-transfers">
        <h2 className="policy-section-title">5. International Data Transfers</h2>
        <p className="policy-text">As TGS is a global platform, your information may be transferred across countries to enable bookings and services. We take steps to ensure any such transfers comply with privacy and relevant GDPR legislation.</p>
      </div>

      <div className="policy-section" id="p-rights">
        <h2 className="policy-section-title">6. Your Rights</h2>
        <p className="policy-text">Depending on your location, you may have the right to:</p>
        <ul className="policy-list">
          <li>Access, correct, or delete your personal information.</li>
          <li>Withdraw consent for marketing communications.</li>
          <li>Request a copy of your information in portable format.</li>
          <li>File a complaint with your local privacy authority.</li>
        </ul>
        <p className="policy-text">To exercise these rights, contact us at <EmailLink />.</p>
      </div>

      <div className="policy-section" id="p-retention">
        <h2 className="policy-section-title">7. Retention of Information</h2>
        <p className="policy-text">We keep your information only as long as necessary for business and legal purposes, then securely delete or anonymise it.</p>
      </div>

      <div className="policy-section" id="p-updates">
        <h2 className="policy-section-title">8. Updates to This Policy</h2>
        <p className="policy-text">We may update this Privacy Policy from time to time. Any changes will be posted on our website with the updated effective date.</p>
      </div>

      <div className="policy-contact" id="p-contact">
        <ContactBlock lead="For questions or concerns about this Privacy Policy, please contact:" />
      </div>
    </>
  );
}

function CookiesContent() {
  return (
    <>
      <p className="policy-intro">The Global Sanctum (&quot;The Global Sanctum&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) uses cookies and similar technology to provide you with the best possible experience. This Cookie Policy explains what cookies are, how we use them, and your choices.</p>

      <div className="policy-section" id="c-what">
        <h2 className="policy-section-title">1. What Are Cookies?</h2>
        <p className="policy-text">Cookies are small text files stored on your device when you visit a website. They help websites function properly, improve performance, and provide insights into how users interact with the site.</p>
      </div>

      <div className="policy-section" id="c-types">
        <h2 className="policy-section-title">2. Types of Cookies We Use</h2>
        <ul className="policy-list">
          <li><strong>Essential Cookies:</strong> Required for the operation of our website (e.g. login, checkout, secure browsing).</li>
          <li><strong>Functional Cookies:</strong> Enable enhanced functionality such as remembering preferences.</li>
          <li><strong>Analytics Cookies:</strong> Help us understand website performance and improve user experience (e.g. Google Analytics).</li>
          <li><strong>Marketing Cookies:</strong> Used to deliver relevant content, advertisements, and measure the effectiveness of campaigns.</li>
        </ul>
      </div>

      <div className="policy-section" id="c-why">
        <h2 className="policy-section-title">3. Why We Use Cookies</h2>
        <ul className="policy-list">
          <li>To ensure our website functions correctly.</li>
          <li>To personalise your browsing experience.</li>
          <li>To analyse traffic and improve our services.</li>
          <li>To support secure payments and login features.</li>
        </ul>
      </div>

      <div className="policy-section" id="c-third">
        <h2 className="policy-section-title">4. Third-Party Cookies</h2>
        <p className="policy-text">Some cookies are set by third-party providers (such as Google, Stripe, or social media platforms). These third parties may collect information about your browsing activity across different websites.</p>
      </div>

      <div className="policy-section" id="c-manage">
        <h2 className="policy-section-title">5. Managing Cookies</h2>
        <p className="policy-text">On your first visit, you will see a cookie banner allowing you to accept or adjust settings. Most web browsers let you control cookies via their settings (e.g. block, delete, or disable cookies).</p>
        <p className="policy-text">Please note: disabling cookies may affect site functionality (e.g. login or booking features).</p>
        <p className="policy-subsection">Browser Settings</p>
        <ul className="policy-list">
          <li>Chrome: Settings &rsaquo; Privacy and Security &rsaquo; Cookies</li>
          <li>Safari: Preferences &rsaquo; Privacy &rsaquo; Cookies</li>
          <li>Firefox: Options &rsaquo; Privacy &amp; Security &rsaquo; Cookies</li>
          <li>Edge: Settings &rsaquo; Privacy &rsaquo; Cookies</li>
        </ul>
        <p className="policy-subsection">Do Not Track</p>
        <p className="policy-text">Some browsers have a &quot;Do Not Track&quot; feature. Our website does not currently respond to Do Not Track signals.</p>
      </div>

      <div className="policy-section" id="c-updates">
        <h2 className="policy-section-title">6. Updates to This Policy</h2>
        <p className="policy-text">We may update this Cookie Policy from time to time. Any changes will be posted on our website with the updated effective date.</p>
      </div>

      <div className="policy-contact" id="c-contact">
        <ContactBlock lead="For questions about this Cookie Policy, please contact:" />
      </div>
    </>
  );
}

function HealthContent() {
  return (
    <>
      <p className="policy-intro">The Global Sanctum (&quot;The Global Sanctum&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;), operated by Aurella Group Pty Ltd, provides a curated marketplace connecting wellness and retreat venue owners, retreat hosts, and wellness guests. We are committed to offering access to spaces and experiences that support health, wellbeing, and personal growth. This Health &amp; Wellness Disclaimer (&quot;Disclaimer&quot;) applies to all users of the platform. By accessing or using the platform, or by participating in any retreat, wellness experience, or activity discovered through The Global Sanctum, you acknowledge and agree to the terms set out below.</p>

      <div className="policy-section" id="h-general">
        <h2 className="policy-section-title">1. General Disclaimer</h2>
        <p className="policy-text">The Global Sanctum is a technology platform and marketplace. We are not a healthcare provider, wellness practitioner, medical facility, or therapeutic service. The following important clarifications apply:</p>
        <ul className="policy-list">
          <li>We do not provide medical advice, diagnosis, treatment, or therapy of any kind.</li>
          <li>We do not provide psychological, psychiatric, or mental health services.</li>
          <li>We do not endorse, recommend, or validate any specific wellness modality, treatment approach, healing tradition, or health outcome.</li>
          <li>Any information on our platform &mdash; including venue descriptions, retreat offerings, retreat host profiles, blog content, and editorial features &mdash; is provided for general informational purposes only and should not be interpreted as professional health advice.</li>
          <li>Information on the platform should never replace the advice, diagnosis, or treatment of a qualified healthcare professional.</li>
        </ul>
        <p className="policy-text">If you are experiencing a medical or mental health emergency, please contact your local emergency services immediately. In Australia, call 000. The Global Sanctum platform is not designed or equipped to provide emergency support.</p>
      </div>

      <div className="policy-section" id="h-nature">
        <h2 className="policy-section-title">2. Nature of Wellness Services</h2>
        <p className="policy-text">The venues, retreats, and experiences listed on The Global Sanctum encompass a broad and evolving range of wellness traditions, therapeutic practices, healing modalities, physical activities, spiritual disciplines, and personal development approaches from around the world. These span &mdash; but are not limited to &mdash; movement and bodywork, mindfulness and meditation, thermal and water therapies, traditional and holistic healing, nutrition and dietary programs, mental and emotional wellbeing, adventure and nature-based experiences, and spiritual or ceremonial practices.</p>
        <p className="policy-text">This Disclaimer applies to all wellness-related activities, services, treatments, programs, and experiences of any kind that are listed on, discovered through, or facilitated by the platform &mdash; whether or not they are specifically named in this document.</p>
        <p className="policy-text">Many of the modalities featured on our platform are rooted in traditional, cultural, or spiritual practices rather than Western evidence-based medicine. The Global Sanctum does not evaluate, validate, or endorse the scientific basis, therapeutic efficacy, or safety of any modality, practice, treatment, or service listed on the platform. The inclusion of any activity, modality, or service on our platform does not constitute an endorsement of its effectiveness, safety, or suitability for any individual.</p>
      </div>

      <div className="policy-section" id="h-responsibility">
        <h2 className="policy-section-title">3. Responsibility of Participants</h2>
        <p className="policy-text">Participation in any retreat, wellness experience, or activity discovered through The Global Sanctum is entirely voluntary and undertaken at your own risk. By using the platform and participating in any experience, you acknowledge and agree to the following:</p>
        <p className="policy-subsection">Personal Health Assessment</p>
        <ul className="policy-list">
          <li>You are responsible for assessing whether participation in a retreat, activity, or wellness practice is appropriate for you given your current physical health, mental health, medical history, and personal circumstances.</li>
          <li>You should consult a qualified healthcare professional before participating in any new health, fitness, or wellness activity &mdash; particularly if you have a pre-existing condition, injury, disability, chronic illness, mental health concern, or are pregnant.</li>
          <li>You should disclose all relevant health conditions, allergies, medications, and physical or psychological limitations to the venue owner and retreat host before participating, where relevant to your safety or the safety of others.</li>
        </ul>
        <p className="policy-subsection">Informed Consent</p>
        <ul className="policy-list">
          <li>You should carefully review all information provided about the retreat, experience, or activity &mdash; including descriptions, requirements, contraindications, intensity levels, and safety considerations &mdash; before booking or participating.</li>
          <li>You should ask questions of the venue owner or retreat host if anything is unclear regarding the nature, risks, or requirements of the experience.</li>
          <li>You understand that participation constitutes informed, voluntary consent to engage in the activities described.</li>
        </ul>
        <p className="policy-subsection">Right to Withdraw</p>
        <ul className="policy-list">
          <li>You have the right to withdraw from any activity at any time if you feel uncomfortable, unsafe, or unwell.</li>
          <li>No retreat host, venue owner, or fellow participant should pressure you to continue an activity against your wishes.</li>
          <li>If you experience adverse symptoms during or after an activity &mdash; including pain, dizziness, emotional distress, disorientation, or any other concerning reaction &mdash; you should stop immediately and seek appropriate medical attention.</li>
        </ul>
      </div>

      <div className="policy-section" id="h-community">
        <h2 className="policy-section-title">4. Responsibilities of Community Members</h2>
        <p className="policy-subsection">Venue Owners</p>
        <ul className="policy-list">
          <li>Ensure that facilities are safe, well-maintained, and compliant with all applicable local health, safety, and building regulations.</li>
          <li>Provide accurate information about venue capabilities and any known hazards.</li>
          <li>Obtain all necessary licences, permits, and insurance for venue operations.</li>
          <li>Ensure appropriate emergency plans are in place and accessible to guests.</li>
        </ul>
        <p className="policy-subsection">Retreat Hosts</p>
        <ul className="policy-list">
          <li>Operate strictly within the scope of your qualifications, training, and competence.</li>
          <li>Maintain current professional insurance appropriate to your practice.</li>
          <li>Provide clear, accurate descriptions of your offerings, including any contraindications, physical requirements, or psychological intensity.</li>
          <li>Obtain appropriate health disclosures or waivers from participants before activities.</li>
          <li>Maintain professional boundaries at all times.</li>
        </ul>
        <p className="policy-subsection">Wellness Guests</p>
        <ul className="policy-list">
          <li>Make informed decisions about participation based on your own health and circumstances.</li>
          <li>Disclose relevant health conditions to venues and retreat hosts when required.</li>
          <li>Carry appropriate personal insurance including travel, medical, and emergency evacuation cover.</li>
          <li>Comply with venue rules, safety instructions, and retreat host guidance during activities.</li>
        </ul>
      </div>

      <div className="policy-section" id="h-risks">
        <h2 className="policy-section-title">5. Inherent Risks of Wellness Activities</h2>
        <p className="policy-text">All wellness activities, regardless of type or intensity, carry inherent risks. The following describes broad categories of risk that may apply to any activity, treatment, service, or experience discovered through The Global Sanctum. This list is not exhaustive &mdash; risks vary by activity, individual health, environment, and circumstance.</p>
        <p className="policy-subsection">Physical Risks</p>
        <ul className="policy-list">
          <li>Musculoskeletal injury, strain, sprain, fracture, or joint injury from movement-based or physical activities of any kind.</li>
          <li>Cardiovascular stress, blood pressure changes, fainting, dehydration, heat exhaustion, or cardiac events from thermal exposure, physical exertion, or environmental conditions.</li>
          <li>Allergic reactions to foods, natural substances, topical applications, herbal remedies, essential oils, or environmental allergens.</li>
          <li>Adverse reactions to treatments, therapies, or substances &mdash; including interactions with existing medications or medical conditions.</li>
          <li>Communicable illness from shared facilities, communal living, or close-contact activities.</li>
          <li>Accidental injury including slips, trips, falls, drowning, burns, or environmental hazards.</li>
        </ul>
        <p className="policy-subsection">Psychological &amp; Emotional Risks</p>
        <ul className="policy-list">
          <li>Emotional distress arising from introspective, therapeutic, contemplative, or group-based practices.</li>
          <li>Surfacing of unresolved trauma, grief, or difficult emotions during intensive or immersive experiences.</li>
          <li>Altered states of consciousness from breathwork, meditation, sensory deprivation, fasting, or ceremonial practices.</li>
          <li>Post-experience adjustment difficulties when returning to daily life after an intensive or immersive program.</li>
        </ul>
        <p className="policy-subsection">Environmental &amp; Situational Risks</p>
        <ul className="policy-list">
          <li>Natural hazards including weather events, wildlife, insects, sun exposure, altitude, water conditions, and terrain.</li>
          <li>Remote locations where access to medical facilities, emergency services, or communication may be limited.</li>
          <li>Travel risks including transport disruptions, accidents, and unforeseen events beyond the control of any party.</li>
        </ul>
        <p className="policy-subsection">Regulatory &amp; Compliance Risks</p>
        <ul className="policy-list">
          <li>Some activities or substances may be regulated, restricted, or prohibited in certain jurisdictions &mdash; participants are responsible for understanding the legal status of activities in the relevant location.</li>
          <li>Practitioners may hold varying levels of qualification, certification, or regulatory recognition depending on the modality and jurisdiction &mdash; The Global Sanctum does not verify practitioner credentials.</li>
        </ul>
        <p className="policy-text">The risks outlined above are inherent to wellness activities generally. Specific risks vary depending on the activity, your personal health, and the environment. It is your responsibility to assess whether any activity is appropriate for you, and to consult a qualified healthcare professional where you have any doubt.</p>
      </div>

      <div className="policy-section" id="h-guarantees">
        <h2 className="policy-section-title">6. No Guarantees</h2>
        <p className="policy-text">Wellness is a deeply personal experience and outcomes vary for every individual. The Global Sanctum makes no promises, representations, or guarantees regarding:</p>
        <ul className="policy-list">
          <li>Health outcomes &mdash; we do not guarantee that any retreat, experience, or wellness activity will result in improved health, healing, recovery, or symptom relief.</li>
          <li>Personal transformation &mdash; we do not guarantee personal growth, spiritual awakening, emotional breakthroughs, or any other transformative outcome.</li>
          <li>Experience quality &mdash; while we curate our platform with care, we cannot guarantee the quality, safety, or suitability of any venue, retreat host, or experience for any individual participant.</li>
          <li>Retreat host competence &mdash; we do not verify, certify, or endorse the qualifications, competence, or regulatory compliance of any retreat host listed on the platform.</li>
          <li>Scientific validity &mdash; we do not guarantee the scientific basis or evidence-based efficacy of any wellness modality, treatment, or practice featured on the platform.</li>
        </ul>
        <p className="policy-text">Any claims made by retreat hosts, venues, or in retreat descriptions regarding health benefits, outcomes, or results are the sole responsibility of the party making the claim and do not represent the views or endorsements of The Global Sanctum.</p>
      </div>

      <div className="policy-section" id="h-release">
        <h2 className="policy-section-title">7. Release of Liability</h2>
        <p className="policy-text">By engaging with The Global Sanctum platform and participating in any retreat, wellness experience, or activity discovered through the platform, you acknowledge and agree that:</p>
        <ul className="policy-list">
          <li>The Global Sanctum is not liable for any injury, illness, accident, loss, damage (including physical, psychological, emotional, or financial), or death that may occur before, during, or after any retreat or wellness experience.</li>
          <li>The Global Sanctum is not liable for any adverse reaction, complication, or outcome resulting from participation in any activity, treatment, or program discovered through the platform.</li>
          <li>The Global Sanctum is not liable for the actions, omissions, advice, services, or conduct of any venue owner, retreat host, or other third party listed on the platform.</li>
          <li>Any claims relating to injury, illness, malpractice, negligence, or loss should be directed to the relevant venue owner, retreat host, or your healthcare provider &mdash; not to The Global Sanctum.</li>
          <li>This release applies to the fullest extent permitted by applicable law, including the laws of Queensland, Australia.</li>
        </ul>
        <p className="policy-text"><strong>Australian Consumer Law:</strong> Nothing in this Disclaimer is intended to exclude, restrict, or modify any rights or remedies that you may have under the Australian Consumer Law (Schedule 2 of the Competition and Consumer Act 2010) or any equivalent legislation that cannot be excluded, restricted, or modified by agreement.</p>
      </div>

      <div className="policy-section" id="h-assumption">
        <h2 className="policy-section-title">8. Assumption of Risk</h2>
        <p className="policy-text">By participating in any wellness activity, retreat, or experience booked through The Global Sanctum, you acknowledge that:</p>
        <ul className="policy-list">
          <li>You understand that wellness activities involve inherent risks, including the risk of physical injury, emotional distress, illness, and in rare cases, death.</li>
          <li>You voluntarily assume all risks associated with your participation, whether foreseeable or unforeseeable.</li>
          <li>You have had the opportunity to investigate the nature and risks of the activity and have made an informed decision to participate.</li>
          <li>You release The Global Sanctum, its directors, officers, employees, and agents from any and all claims arising from risks inherent to the activity.</li>
        </ul>
        <p className="policy-text">This assumption of risk does not apply to risks arising from the gross negligence or wilful misconduct of a venue owner, retreat host, or The Global Sanctum.</p>
      </div>

      <div className="policy-section" id="h-insurance">
        <h2 className="policy-section-title">9. Insurance Recommendations</h2>
        <p className="policy-text">We strongly recommend that all community members carry appropriate insurance. Our Insurance Statement provides full details, but as a summary:</p>
        <ul className="policy-list">
          <li><strong>Venue Owners:</strong> Public liability, property and contents, business interruption, workers&apos; compensation (if applicable).</li>
          <li><strong>Retreat Hosts:</strong> Professional indemnity, public liability, personal accident.</li>
          <li><strong>Wellness Guests:</strong> Comprehensive travel insurance including medical cover, emergency evacuation, trip cancellation, and personal liability.</li>
        </ul>
      </div>

      <div className="policy-section" id="h-indemnification">
        <h2 className="policy-section-title">10. Indemnification</h2>
        <p className="policy-text">You agree to indemnify, defend, and hold harmless The Global Sanctum (Aurella Group Pty Ltd), its directors, officers, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable legal fees) arising from or in connection with:</p>
        <ul className="policy-list">
          <li>Your participation in any retreat, wellness experience, or activity discovered through the platform.</li>
          <li>Your failure to disclose relevant health conditions to venue owners or retreat hosts.</li>
          <li>Your failure to seek appropriate medical advice before participating in an activity for which medical clearance was recommended.</li>
          <li>Any claim by a third party arising from your actions, omissions, or conduct during a retreat or wellness experience.</li>
        </ul>
      </div>

      <div className="policy-section" id="h-minors">
        <h2 className="policy-section-title">11. Children &amp; Minors</h2>
        <p className="policy-text">Some retreats and wellness experiences may be suitable for children or young people. Where minors participate:</p>
        <ul className="policy-list">
          <li>A parent or legal guardian must provide informed consent for the minor&apos;s participation.</li>
          <li>The parent or guardian is responsible for assessing whether the activity is appropriate for the child&apos;s age, health, and development.</li>
          <li>All health disclosures and waivers must be completed by the parent or legal guardian on the minor&apos;s behalf.</li>
          <li>The parent or guardian assumes full responsibility for the minor&apos;s safety, conduct, and wellbeing during the experience.</li>
        </ul>
      </div>

      <div className="policy-section" id="h-law">
        <h2 className="policy-section-title">12. Governing Law</h2>
        <p className="policy-text">This Disclaimer is governed by and construed in accordance with the laws of Queensland, Australia. Both parties agree to submit to the exclusive jurisdiction of the courts of Queensland, Australia in relation to any dispute arising under or in connection with this Disclaimer.</p>
      </div>

      <div className="policy-section" id="h-updates">
        <h2 className="policy-section-title">13. Updates to This Disclaimer</h2>
        <p className="policy-text">We may update this Health &amp; Wellness Disclaimer from time to time to reflect changes in our platform, the services offered through it, or applicable legislation. Any changes will be posted on our website with the updated effective date.</p>
      </div>

      <div className="policy-contact" id="h-contact">
        <ContactBlock lead="If you have any questions about this Disclaimer, please contact:" />
      </div>
    </>
  );
}

function RefundsContent() {
  return (
    <>
      <p className="policy-intro">This Refund &amp; Cancellation Policy (&quot;Policy&quot;) applies to all bookings, subscriptions, and payments made through The Global Sanctum (&quot;The Global Sanctum&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;), operated by Aurella Group Pty Ltd (ABN 70 649 742 423). By using the platform, you agree to the terms set out below. This Policy should be read in conjunction with our Booking Terms &amp; Conditions, Credit &amp; Payment Policy, and Venue Owner Subscription Terms.</p>

      <div className="policy-section" id="r-general">
        <h2 className="policy-section-title">1. General Principles</h2>
        <ul className="policy-list">
          <li>All bookings and payments are processed securely through Stripe Connect.</li>
          <li>Refunds, where applicable, are returned to the original payment method unless otherwise agreed.</li>
          <li>The 3% Stripe processing fee charged to guests at checkout is non-refundable on guest-initiated cancellations, except where required by law or where the venue initiates the cancellation.</li>
          <li>A Cancellation Administration Fee applies to all guest-initiated cancellations of confirmed bookings, reflecting the coordination effort undertaken by The Global Sanctum (see Section 2.3).</li>
          <li>Platform commissions (charged to venue owners) may be refunded in full or in part at The Global Sanctum&apos;s discretion, depending on the circumstances.</li>
          <li>No charge occurs until a venue owner accepts and confirms a booking &mdash; unconfirmed enquiries can be withdrawn at any time without charge.</li>
          <li>The Global Sanctum acts as a marketplace and introducing agent &mdash; final responsibility for honouring reservations and issuing venue-specific refunds rests with the venue owner.</li>
        </ul>
        <p className="policy-text"><strong>Important:</strong> Cancellation terms for retreat bookings and wellness experiences are set by each venue owner individually. It is the guest&apos;s responsibility to review the venue&apos;s cancellation policy before completing a booking. The venue&apos;s policy is displayed during the booking process.</p>
      </div>

      <div className="policy-section" id="r-cancellations">
        <h2 className="policy-section-title">2. Booking Cancellations by Guests</h2>
        <p className="policy-text">This section applies to retreat hosts and wellness guests who wish to cancel a confirmed booking.</p>

        <p className="policy-subsection">2.1 Venue-Set Cancellation Policies</p>
        <p className="policy-text">Each venue owner sets their own cancellation policy, which is displayed to the guest before the booking is confirmed. The Global Sanctum requires venue owners to adopt one of the following standard cancellation frameworks, or a custom policy approved by The Global Sanctum:</p>
        <ul className="policy-list">
          <li><strong>Flexible:</strong> Full refund if cancelled 14 or more days before the booking start date. 50% refund if cancelled 7&ndash;13 days before. No refund if cancelled less than 7 days before or for no-shows.</li>
          <li><strong>Moderate:</strong> Full refund if cancelled 30 or more days before the booking start date. 50% refund if cancelled 14&ndash;29 days before. No refund if cancelled less than 14 days before or for no-shows.</li>
          <li><strong>Firm:</strong> Full refund if cancelled 60 or more days before the booking start date. 50% refund if cancelled 30&ndash;59 days before. No refund if cancelled less than 30 days before or for no-shows.</li>
          <li><strong>Non-Refundable:</strong> No refund for cancellations at any time after booking confirmation. Suitable for limited-availability or high-demand experiences.</li>
          <li><strong>Custom:</strong> Venue owner sets bespoke terms, which must be clearly communicated to the guest and approved by The Global Sanctum before publication.</li>
        </ul>

        <p className="policy-subsection">2.2 What Is Refundable</p>
        <p className="policy-text">Where a refund applies under the venue&apos;s cancellation policy, the following rules determine what is returned to the guest:</p>
        <ul className="policy-list">
          <li><strong>Venue price:</strong> Refundable in accordance with the venue&apos;s cancellation policy (full, partial, or none).</li>
          <li><strong>3% Stripe processing fee:</strong> Non-refundable on guest-initiated cancellations. Refundable only if the venue initiates the cancellation or where required by law.</li>
          <li><strong>Cancellation Administration Fee:</strong> Non-refundable. Charged to the guest on all guest-initiated cancellations of confirmed bookings. Does not apply to venue-initiated cancellations or force majeure events. See Section 2.3.</li>
        </ul>

        <p className="policy-subsection">2.3 Cancellation Administration Fee</p>
        <p className="policy-text">In addition to any forfeited portion of the venue price under the venue&apos;s cancellation policy, a Cancellation Administration Fee applies to all guest-initiated cancellations of confirmed bookings. This fee reflects the coordination, communication, and administrative effort undertaken by The Global Sanctum up to the point of cancellation.</p>
        <ul className="policy-list">
          <li><strong>Before booking confirmation (enquiry withdrawn):</strong> No fee. No substantive coordination has commenced.</li>
          <li><strong>After confirmation, 30+ days before start date:</strong> 2% of booking value (minimum $25 AUD). Booking processed, payment collected, confirmation issued. Limited coordination to date.</li>
          <li><strong>After confirmation, 14&ndash;29 days before start date:</strong> 3% of booking value (minimum $50 AUD). Venue coordination underway. Pre-arrival communications, logistics, or dietary planning may have commenced.</li>
          <li><strong>After confirmation, under 14 days before start date:</strong> 5% of booking value (minimum $75 AUD). Substantial coordination completed. Venue may have turned away other bookings. Late-stage logistics and participant communications in progress.</li>
        </ul>
        <ul className="policy-list">
          <li>The Cancellation Administration Fee is charged to the person who made the booking (retreat host or wellness guest) and is deducted from any refund due.</li>
          <li>This fee is separate from and in addition to the 3% Stripe processing fee and any amount forfeited under the venue&apos;s cancellation policy.</li>
          <li>The fee is calculated on the total booking value (the venue&apos;s quoted or listed price).</li>
          <li>Where the calculated percentage is less than the stated minimum, the minimum fee applies.</li>
          <li>The Cancellation Administration Fee does not apply to venue-initiated cancellations or force majeure events &mdash; in those cases, the guest bears no administration cost.</li>
          <li>This fee is non-refundable once the cancellation is processed.</li>
        </ul>
        <p className="policy-text" style={{ fontStyle: "italic", color: "var(--charcoal-70)", borderLeft: "2px solid var(--gold-accent)", paddingLeft: "24px", margin: "16px 0 24px" }}><strong style={{ fontStyle: "normal" }}>Example:</strong> A retreat host cancels a $15,000 retreat booking 20 days before the start date. The venue&apos;s cancellation policy (Moderate) provides a 50% refund. The retreat host receives: $7,500 (50% venue refund) minus $450 (3% administration fee) minus the 3% Stripe processing fee already retained at checkout. The Cancellation Administration Fee reflects the coordination work completed by TGS to that point.</p>

        <p className="policy-subsection">2.4 How to Cancel a Booking</p>
        <ul className="policy-list">
          <li>Guests may cancel a booking via their account dashboard or by contacting <EmailLink />.</li>
          <li>The cancellation date is determined by the date the cancellation is received and confirmed by the platform, not the date the guest sends the request.</li>
          <li>Refunds are processed within 5&ndash;10 business days of the cancellation being confirmed, subject to Stripe&apos;s standard processing timelines.</li>
          <li>Guests will receive an email confirmation of the cancellation and any applicable refund amount.</li>
        </ul>

        <p className="policy-subsection">2.5 Partial Stays &amp; Early Departures</p>
        <ul className="policy-list">
          <li>If a guest departs a retreat or experience early by choice, no refund is issued for the unused portion unless the venue owner agrees otherwise.</li>
          <li>If a guest is unable to continue due to illness, injury, or emergency, the guest should contact both the venue and The Global Sanctum &mdash; any refund for the unused portion is at the venue owner&apos;s discretion.</li>
          <li>We strongly recommend that all guests carry comprehensive travel insurance that includes trip interruption cover.</li>
        </ul>
      </div>

      <div className="policy-section" id="r-venue-cancellations">
        <h2 className="policy-section-title">3. Cancellations by Venue Owners</h2>

        <p className="policy-subsection">3.1 Guest Entitlements</p>
        <p className="policy-text">If a venue owner cancels a confirmed booking for any reason, the guest is entitled to:</p>
        <ul className="policy-list">
          <li>A full refund of all amounts paid, including the venue price and the 3% Stripe processing fee.</li>
          <li>The refund is processed within 5&ndash;10 business days of the cancellation being confirmed.</li>
        </ul>

        <p className="policy-subsection">3.2 Consequences for Venue Owners</p>
        <p className="policy-text">Venue-initiated cancellations undermine trust in the platform. The following actions may be taken at The Global Sanctum&apos;s discretion:</p>
        <ul className="policy-list">
          <li><strong>First cancellation:</strong> Formal warning. The cancellation is recorded on the venue&apos;s internal account history.</li>
          <li><strong>Second cancellation:</strong> Listing may be temporarily suspended. Venue owner may be required to provide an explanation and remediation plan before reactivation.</li>
          <li><strong>Third or repeated cancellations:</strong> Listing may be permanently removed from the platform. Subscription may be terminated. The venue owner may be restricted from re-listing.</li>
        </ul>
        <p className="policy-text">Exceptions may apply where the cancellation is due to circumstances genuinely beyond the venue owner&apos;s control (see Section 5, Force Majeure).</p>
      </div>

      <div className="policy-section" id="r-subscriptions">
        <h2 className="policy-section-title">4. Subscription Cancellations &amp; Refunds</h2>
        <p className="policy-text">This section applies to venue owner subscription plans (Essentials, Standard, Featured, Premium).</p>

        <p className="policy-subsection">4.1 How to Cancel a Subscription</p>
        <ul className="policy-list">
          <li>You may cancel your subscription at any time via your account dashboard or by emailing <EmailLink />.</li>
          <li>Cancellation takes effect at the end of the current billing cycle &mdash; your listing remains active until that date.</li>
          <li>No cancellation fee applies.</li>
        </ul>

        <p className="policy-subsection">4.2 Subscription Refund Terms</p>
        <ul className="policy-list">
          <li><strong>Monthly subscription cancelled mid-cycle:</strong> Non-refundable. Access continues until end of billing cycle.</li>
          <li><strong>Annual subscription cancelled mid-term:</strong> Non-refundable. Access continues until end of annual term. No pro-rata refund for unused months.</li>
          <li><strong>Duplicate payment or billing error:</strong> Full refund of the duplicate or erroneous amount upon verification.</li>
          <li><strong>Technical error preventing access:</strong> Refund or credit at TGS discretion for the period affected, upon verification.</li>
          <li><strong>Change of mind:</strong> Non-refundable.</li>
        </ul>

        <p className="policy-subsection">4.3 Outstanding Obligations</p>
        <ul className="policy-list">
          <li>Cancelling a subscription does not release the venue owner from outstanding commissions, fees, or obligations related to bookings that were confirmed prior to cancellation.</li>
          <li>Payouts for confirmed bookings will continue to be processed in accordance with the standard payout timelines set out in the Credit &amp; Payment Policy.</li>
        </ul>

        <p className="policy-subsection">4.4 Founding &amp; Launch Partner Subscriptions</p>
        <ul className="policy-list">
          <li>Founding Partner and Launch Partner lifetime discounts are forfeited upon subscription cancellation and cannot be reinstated if the venue owner reactivates at a later date.</li>
          <li>All other cancellation and refund terms apply equally to discounted subscriptions.</li>
        </ul>
      </div>

      <div className="policy-section" id="r-force-majeure">
        <h2 className="policy-section-title">5. Force Majeure &amp; Extraordinary Circumstances</h2>
        <p className="policy-text">Where a booking cannot proceed due to circumstances genuinely beyond the reasonable control of either party, the following applies:</p>

        <p className="policy-subsection">5.1 What Constitutes Force Majeure</p>
        <p className="policy-text">Force majeure events include but are not limited to:</p>
        <ul className="policy-list">
          <li>Natural disasters (earthquakes, floods, bushfires, volcanic eruptions, tsunamis).</li>
          <li>Severe weather events that make travel to or use of the venue unsafe or impossible.</li>
          <li>Pandemics, epidemics, or public health emergencies resulting in government-mandated restrictions.</li>
          <li>Government actions including travel bans, border closures, quarantine orders, or states of emergency.</li>
          <li>Civil unrest, terrorism, or armed conflict.</li>
          <li>Critical infrastructure failure affecting the venue (e.g. loss of water supply, structural damage) that is not attributable to the venue owner&apos;s negligence.</li>
        </ul>

        <p className="policy-subsection">5.2 Resolution Process</p>
        <p className="policy-text">In the event of a force majeure situation, The Global Sanctum will work with both the venue owner and the guest to reach a fair resolution. Possible outcomes include:</p>
        <ul className="policy-list">
          <li><strong>Date change</strong> &mdash; rescheduling the booking to mutually agreed alternative dates at no additional cost.</li>
          <li><strong>Credit note</strong> &mdash; issuing the guest a credit for the full booking value, valid for 12 months, to be used at the same or an alternative venue on the platform.</li>
          <li><strong>Full or partial refund</strong> &mdash; where rescheduling or credit is not possible or acceptable to both parties.</li>
        </ul>
        <p className="policy-text">The specific resolution will be determined on a case-by-case basis having regard to the nature and severity of the event, the timing relative to the booking, and the options reasonably available to both parties.</p>

        <p className="policy-subsection">5.3 What Does Not Constitute Force Majeure</p>
        <p className="policy-text">The following are generally not considered force majeure and are subject to the standard cancellation terms:</p>
        <ul className="policy-list">
          <li>Personal circumstances such as change of plans, work commitments, family events, or personal illness (unless a government health directive applies).</li>
          <li>Travel disruptions such as flight cancellations, missed connections, or lost luggage (travel insurance is recommended).</li>
          <li>Dissatisfaction with the venue, experience, or retreat host after arrival.</li>
          <li>Financial hardship or inability to pay.</li>
        </ul>
      </div>

      <div className="policy-section" id="r-commission">
        <h2 className="policy-section-title">6. Commission &amp; Fee Treatment on Cancellation</h2>
        <p className="policy-text">When a booking is cancelled, the treatment of platform commissions and fees depends on who initiates the cancellation and the timing relative to the venue&apos;s payment schedule. Under the platform&apos;s payment architecture, the initial deposit is forwarded to the venue owner in full. Commission is deducted from the second scheduled payment onwards via Stripe Connect, until the full commission amount on the total booking value has been collected. Commission treatment on cancellation reflects this staged structure.</p>

        <p className="policy-subsection">Cancellation Before Second Payment &mdash; Full Refund Under Venue Policy</p>
        <ul className="policy-list">
          <li>Venue Commission: Not collected.</li>
          <li>3% Stripe Fee: Non-refundable to guest.</li>
          <li>Admin Fee: Charged to guest (tiered).</li>
          <li>Venue Payout: No payout / deposit refunded.</li>
        </ul>

        <p className="policy-subsection">Cancellation Before Second Payment &mdash; Partial Refund Under Venue Policy</p>
        <ul className="policy-list">
          <li>Venue Commission: Not collected.</li>
          <li>3% Stripe Fee: Non-refundable to guest.</li>
          <li>Admin Fee: Charged to guest (tiered).</li>
          <li>Venue Payout: Retained portion goes to venue in full.</li>
        </ul>

        <p className="policy-subsection">Cancellation After Commission Has Been Deducted &mdash; Full Refund</p>
        <ul className="policy-list">
          <li>Venue Commission: Reversed (reimbursed by TGS to refund).</li>
          <li>3% Stripe Fee: Non-refundable to guest.</li>
          <li>Admin Fee: Charged to guest (tiered).</li>
          <li>Venue Payout: No payout.</li>
        </ul>

        <p className="policy-subsection">Cancellation After Commission Has Been Deducted &mdash; Partial Refund</p>
        <ul className="policy-list">
          <li>Venue Commission: Applied proportionally to retained portion.</li>
          <li>3% Stripe Fee: Non-refundable to guest.</li>
          <li>Admin Fee: Charged to guest (tiered).</li>
          <li>Venue Payout: Retained portion minus commission.</li>
        </ul>

        <p className="policy-subsection">Venue Cancels (Any Timing)</p>
        <ul className="policy-list">
          <li>Venue Commission: Not collected / reversed.</li>
          <li>3% Stripe Fee: Refunded to guest.</li>
          <li>Admin Fee: Not charged.</li>
          <li>Venue Payout: No payout.</li>
        </ul>

        <p className="policy-subsection">Force Majeure (Full Refund)</p>
        <ul className="policy-list">
          <li>Venue Commission: Not collected / reversed.</li>
          <li>3% Stripe Fee: Refunded to guest.</li>
          <li>Admin Fee: Not charged.</li>
          <li>Venue Payout: No payout.</li>
        </ul>
      </div>

      <div className="policy-section" id="r-discretionary">
        <h2 className="policy-section-title">7. Platform Discretionary Refunds</h2>
        <p className="policy-text">The Global Sanctum reserves the right to issue refunds outside the standard terms where fairness requires it. Circumstances that may warrant a discretionary refund include:</p>
        <ul className="policy-list">
          <li>The venue materially fails to deliver the services, accommodation, or experience described in the listing.</li>
          <li>A safety concern arises that was not disclosed by the venue owner and that materially affects the guest&apos;s ability to participate.</li>
          <li>The venue is significantly misrepresented in its listing (e.g. photos, amenities, or capacity are materially inaccurate).</li>
          <li>Fraud or deceptive conduct by the venue owner or retreat host.</li>
        </ul>
        <p className="policy-text">Discretionary refunds are assessed on a case-by-case basis and are at The Global Sanctum&apos;s sole discretion. The Global Sanctum may request evidence, documentation, or photographs from either party to assist in determining the outcome.</p>
      </div>

      <div className="policy-section" id="r-chargebacks">
        <h2 className="policy-section-title">8. Chargebacks</h2>
        <ul className="policy-list">
          <li>If a guest initiates a chargeback (payment dispute) through their bank or card issuer instead of following the cancellation process set out in this Policy, The Global Sanctum will respond to the chargeback in accordance with Stripe&apos;s dispute resolution process.</li>
          <li>Guests are encouraged to contact us first at <EmailLink /> before initiating a chargeback, as direct resolution is typically faster and more favourable for all parties.</li>
          <li>If a chargeback is initiated, the venue owner&apos;s payout may be withheld or reversed pending the outcome of the dispute.</li>
          <li>If a chargeback is determined to be unjustified, the guest may be liable for any fees incurred by The Global Sanctum or the venue owner as a result, and their account may be suspended.</li>
        </ul>
      </div>

      <div className="policy-section" id="r-request">
        <h2 className="policy-section-title">9. How to Request a Refund</h2>
        <ul className="policy-list">
          <li><strong>Step 1:</strong> Cancel the booking via your account dashboard, or email <EmailLink /> with your booking reference and reason for cancellation.</li>
          <li><strong>Step 2:</strong> The Global Sanctum will confirm the cancellation, apply the venue&apos;s cancellation policy, and calculate the applicable refund amount.</li>
          <li><strong>Step 3:</strong> If a refund is due, it will be processed via Stripe to the original payment method within 5&ndash;10 business days.</li>
          <li><strong>Step 4:</strong> You will receive an email confirming the refund amount and estimated timeline.</li>
          <li><strong>Step 5:</strong> If you believe the refund amount is incorrect or you wish to dispute the outcome, email <EmailLink /> with &quot;Refund Enquiry &mdash; [Booking Reference]&quot; in the subject line.</li>
        </ul>
        <p className="policy-text">Refund requests should be submitted as soon as possible after the decision to cancel. Refund amounts are determined by the cancellation date, not the date the refund is processed.</p>
      </div>

      <div className="policy-section" id="r-disputes">
        <h2 className="policy-section-title">10. Refund Disputes</h2>
        <ul className="policy-list">
          <li>If you disagree with a refund decision, you may submit a written dispute to <EmailLink /> within 14 days of the refund confirmation.</li>
          <li>Disputes will be acknowledged within 3 business days and a substantive response provided within 10 business days.</li>
          <li>The Global Sanctum may request additional information or evidence from either party to assist in resolving the dispute.</li>
          <li>If the dispute cannot be resolved directly, it will be escalated in accordance with our Dispute Resolution Policy.</li>
        </ul>
      </div>

      <div className="policy-section" id="r-consumer-rights">
        <h2 className="policy-section-title">11. Consumer Rights</h2>
        <p className="policy-text"><strong>Australian Consumer Law:</strong> Nothing in this Policy is intended to exclude, restrict, or modify any rights or remedies that you may have under the Australian Consumer Law (Schedule 2 of the Competition and Consumer Act 2010) or any equivalent consumer protection legislation in your jurisdiction that cannot be excluded, restricted, or modified by agreement. Where this Policy conflicts with your statutory rights, your statutory rights prevail.</p>
      </div>

      <div className="policy-section" id="r-law">
        <h2 className="policy-section-title">12. Governing Law</h2>
        <p className="policy-text">This Policy is governed by and construed in accordance with the laws of Queensland, Australia. Both parties agree to submit to the exclusive jurisdiction of the courts of Queensland, Australia in relation to any dispute arising under or in connection with this Policy.</p>
      </div>

      <div className="policy-section" id="r-changes">
        <h2 className="policy-section-title">13. Changes to This Policy</h2>
        <p className="policy-text">The Global Sanctum may update this Refund &amp; Cancellation Policy from time to time. Any material changes will be communicated via the platform or by email. Continued use of the platform after changes are published constitutes acceptance of the updated Policy.</p>
      </div>

      <div className="policy-contact" id="r-contact">
        <ContactBlock lead="For refund requests, cancellation queries, or disputes, please contact:" />
      </div>
    </>
  );
}

function BookingContent() {
  return (
    <>
      <p className="policy-intro">These Booking Terms &amp; Conditions (&quot;Terms&quot;) govern all bookings made through The Global Sanctum (&quot;The Global Sanctum&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;), operated by Aurella Group Pty Ltd (ABN 70 649 742 423). By making or accepting a booking through the platform, you agree to be bound by these Terms. These Terms should be read in conjunction with our Terms &amp; Conditions, Privacy Policy, Refund &amp; Cancellation Policy, Credit &amp; Payment Policy, and any role-specific agreements (Venue Owner Agreement, Venue Owner Subscription Terms) that apply to your use of the platform.</p>

      <div className="policy-section" id="bt-overview">
        <h2 className="policy-section-title">1. Platform Overview</h2>
        <p className="policy-text">The Global Sanctum is a curated marketplace connecting wellness and retreat venue owners with retreat hosts and wellness guests. The following important clarifications apply to all bookings:</p>
        <ul className="policy-list">
          <li>The Global Sanctum operates as a marketplace and introducing agent &mdash; we do not own, operate, manage, or control any venue listed on the platform.</li>
          <li>We facilitate discovery, connection, and payment processing between venue owners, retreat hosts, and wellness guests.</li>
          <li>All payments are processed directly via Stripe Connect from the payer to the venue owner. The Global Sanctum does not hold guest or host funds at any stage of the booking process.</li>
          <li>All bookings are subject to these Terms, the applicable venue&apos;s own policies, and any additional terms provided by the venue owner.</li>
          <li>The contractual relationship for the provision of accommodation, facilities, and services is between the venue owner and the retreat host or wellness guest &mdash; not with The Global Sanctum.</li>
          <li>The Global Sanctum does not guarantee the availability, accuracy, quality, safety, or suitability of any venue, experience, or service listed on the platform.</li>
        </ul>
      </div>

      <div className="policy-section" id="bt-roles">
        <h2 className="policy-section-title">2. User Roles &amp; Eligibility</h2>
        <p className="policy-text">You may interact with the platform in one or more of the following roles. Different terms, responsibilities, and fee structures apply depending on your role:</p>
        <ul className="policy-list">
          <li><strong>Venue Owner:</strong> Lists a property, retreat centre, wellness venue, or resort on the platform via a subscription plan. Accepts and fulfils bookings. Pays a platform commission on completed bookings, deducted from scheduled payments after the initial deposit. Subject to the Venue Owner Agreement and Venue Owner Subscription Terms.</li>
          <li><strong>Retreat Host:</strong> Books venues for retreats, workshops, events, or group programs. Pays the venue price plus a 3% Stripe processing fee. No platform commission is charged to retreat hosts.</li>
          <li><strong>Wellness Guest:</strong> Books wellness experiences, day-use services, or individual stays at venues listed on the platform. Pays the venue price plus a 3% Stripe processing fee. No platform commission is charged to wellness guests.</li>
        </ul>
        <p className="policy-text">To make or accept a booking, you must be at least 18 years of age and have the legal capacity to enter into binding agreements. By making a booking, you represent that the information you provide is accurate, complete, and current.</p>
      </div>

      <div className="policy-section" id="bt-bookings">
        <h2 className="policy-section-title">3. How Bookings Work</h2>

        <p className="policy-subsection">3.1 Retreat Venue Bookings (Retreat Hosts)</p>
        <p className="policy-text">Retreat bookings involve a retreat host booking exclusive or partial use of a venue for a group program. The process operates as follows:</p>
        <ul className="policy-list">
          <li>The retreat host submits a booking enquiry through the platform, specifying dates, group size, requirements, and any additional services.</li>
          <li>The venue owner reviews the enquiry and provides a quote &mdash; all quotes are estimates until formally confirmed by the venue.</li>
          <li>Once both parties agree on terms, the booking is confirmed and the venue&apos;s payment schedule commences.</li>
          <li>The retreat host pays the venue&apos;s quoted price plus a 3% Stripe processing fee &mdash; no platform commission is charged to the retreat host.</li>
          <li>Payments are processed via Stripe Connect on the venue owner&apos;s published payment schedule (for example: 50% deposit at booking, 25% two months prior to the retreat, 25% seven days prior).</li>
          <li>The initial deposit is forwarded to the venue owner in full. Platform commission (5&ndash;20%, determined by the venue owner&apos;s subscription tier) is deducted from the second scheduled payment onwards via Stripe Connect, until the full commission amount on the total booking value has been collected.</li>
        </ul>

        <p className="policy-subsection">3.2 Wellness Experience Bookings (Wellness Guests)</p>
        <p className="policy-text">Wellness experience bookings involve an individual wellness guest booking a day-use experience, treatment, session, or short stay at a wellness venue. The process operates as follows:</p>
        <ul className="policy-list">
          <li>The wellness guest selects an experience, service, or availability listed on the platform and completes the booking.</li>
          <li>The wellness guest pays the venue&apos;s listed price plus a 3% Stripe processing fee &mdash; no platform commission is charged to the wellness guest.</li>
          <li>Where the booking is paid in a single payment, platform commission is deducted from that payment via Stripe Connect at the time of processing.</li>
          <li>Where the booking has a multi-stage payment schedule, the initial deposit is forwarded to the venue owner in full and commission is deducted from subsequent payments in line with Section 3.1.</li>
          <li>The venue owner receives the listed price minus the applicable commission via Stripe Connect.</li>
        </ul>

        <p className="policy-subsection">3.3 Booking Confirmation</p>
        <ul className="policy-list">
          <li>A booking is not confirmed until the venue owner accepts the booking and the initial payment has been successfully processed.</li>
          <li>Venue owners are expected to respond to booking enquiries within 48 hours.</li>
          <li>The Global Sanctum may send confirmation notifications to both parties via email &mdash; these serve as a record of the booking but do not create a contractual obligation between The Global Sanctum and either party for the delivery of services.</li>
          <li>If a venue owner does not respond within the expected timeframe, the booking enquiry may expire and the retreat host or wellness guest will be notified.</li>
        </ul>
      </div>

      <div className="policy-section" id="bt-fees">
        <h2 className="policy-section-title">4. Fees, Commissions &amp; Pricing</h2>

        <p className="policy-subsection">4.1 Venue Owner Subscriptions</p>
        <p className="policy-text">Venue owners pay a monthly or annual subscription to list on the platform. Higher tiers unlock reduced commission rates and enhanced features. Full details are set out in the Venue Owner Subscription Terms.</p>
        <ul className="policy-list">
          <li><strong>Essentials:</strong> $0 monthly / $0 annual &mdash; 20% commission.</li>
          <li><strong>Standard:</strong> $49 monthly / $490 annual (saving $98) &mdash; 10% commission.</li>
          <li><strong>Featured:</strong> $99 monthly / $990 annual (saving $198) &mdash; 7% commission.</li>
          <li><strong>Premium:</strong> $199 monthly / $1,990 annual (saving $398) &mdash; 5% commission.</li>
        </ul>
        <p className="policy-text">All subscription prices are in Australian Dollars (AUD). For GST-registered venues in Australia, GST of 10% applies to subscription fees and will be itemised on invoices.</p>

        <p className="policy-subsection">4.2 Commission Structure</p>
        <p className="policy-text">Platform commissions are charged only to venue owners on completed bookings made through the platform. No commission is charged to retreat hosts or wellness guests.</p>
        <p className="policy-text"><strong>Commission timing</strong></p>
        <ul className="policy-list">
          <li>Commission is calculated as a percentage of the total booking value, based on the venue owner&apos;s subscription tier at the time of booking confirmation.</li>
          <li>The initial deposit (typically the first scheduled payment as defined by the venue&apos;s payment policy) is forwarded to the venue owner in full. No commission is deducted from the initial deposit, as this payment serves to secure the venue booking.</li>
          <li>Commission is deducted from the second scheduled payment onwards, applied cumulatively across subsequent payments via Stripe Connect&apos;s automatic split, until the full commission amount on the total booking value has been collected.</li>
          <li>Where a venue&apos;s payment schedule consists of two payments only (for example, 50% deposit and 50% final payment), commission is deducted in full from the second and final payment.</li>
          <li>Commission applies only to completed bookings &mdash; no commission is charged on enquiries, quotes, or bookings that are cancelled before the second scheduled payment.</li>
          <li>Commission does not apply to bookings arranged directly between the venue and a retreat host or wellness guest outside the platform.</li>
        </ul>

        <p className="policy-subsection">4.3 Stripe Processing Fee</p>
        <p className="policy-text">A transparent processing fee of 3% applies to all transactions processed through the platform. This fee covers the cost of secure payment processing via Stripe Connect.</p>
        <ul className="policy-list">
          <li>The 3% Stripe processing fee is charged to the person making the payment (retreat host or wellness guest) and is added to the venue&apos;s quoted or listed price at checkout.</li>
          <li>The fee is displayed separately at checkout so the retreat host or wellness guest can see exactly what they are paying.</li>
          <li>Processing fees are non-refundable in the event of cancellation, except where the venue initiates the cancellation or where required by law.</li>
        </ul>
        <p className="policy-text" style={{ fontStyle: "italic", color: "var(--charcoal-70)", borderLeft: "2px solid var(--gold-accent)", paddingLeft: "24px", margin: "16px 0 24px" }}>What retreat hosts and wellness guests pay: Venue price + 3% Stripe processing fee. That&apos;s it. No platform commission is charged to retreat hosts or wellness guests. Commission is between The Global Sanctum and the venue owner only.</p>

        <p className="policy-subsection">4.4 Currency &amp; Taxes</p>
        <ul className="policy-list">
          <li>All platform fees, subscriptions, and commissions are denominated in Australian Dollars (AUD).</li>
          <li>Venue owners are solely responsible for determining and collecting any applicable taxes on the services they provide, including GST, VAT, sales tax, or tourism levies in their jurisdiction.</li>
          <li>The Global Sanctum charges GST on its own fees (subscriptions and commissions) where required under Australian tax law.</li>
          <li>Retreat hosts and wellness guests are responsible for any additional taxes, duties, or levies that may apply in the venue&apos;s location.</li>
        </ul>
      </div>

      <div className="policy-section" id="bt-payments">
        <h2 className="policy-section-title">5. Payments &amp; Payouts</h2>

        <p className="policy-subsection">5.1 Guest Payments</p>
        <ul className="policy-list">
          <li>All payments are processed securely via Stripe Connect &mdash; The Global Sanctum does not store credit card details and does not hold guest or host funds at any stage.</li>
          <li>Payments flow directly from the retreat host or wellness guest to the venue owner&apos;s connected Stripe account, with platform commission automatically split where applicable from the second scheduled payment onwards.</li>
          <li>Payment timing is determined by the venue&apos;s published payment policy, which is displayed to the retreat host or wellness guest before booking confirmation. Typical structures include a deposit at booking with one or more subsequent staged payments leading up to the retreat or experience date.</li>
          <li>Accepted payment methods include credit card, debit card, and any additional methods supported by Stripe in the payer&apos;s region.</li>
          <li>A booking is only confirmed once the initial payment (deposit) has been successfully processed.</li>
          <li>The total amount charged is the venue&apos;s price plus 3% Stripe processing fee.</li>
        </ul>

        <p className="policy-subsection">5.2 Venue Owner Payouts</p>
        <ul className="policy-list">
          <li>Payouts are processed to the venue owner&apos;s connected Stripe account at each scheduled payment milestone in accordance with the venue&apos;s published payment policy.</li>
          <li>The initial deposit is forwarded to the venue owner in full at the time of booking confirmation.</li>
          <li>Subsequent scheduled payments are forwarded to the venue owner net of commission, with commission deducted automatically by Stripe Connect at the time each payment is processed, until the full commission amount on the total booking value has been collected.</li>
          <li>Venue owners must maintain an active Stripe Connect account in good standing to receive payouts.</li>
          <li>Payout timelines are subject to Stripe&apos;s standard transfer policies and may vary by region and banking institution.</li>
          <li>The Global Sanctum reserves the right to instruct Stripe to withhold or delay scheduled payouts in the event of a dispute, suspected fraud, policy violation, or where a refund or chargeback has been initiated.</li>
        </ul>
      </div>

      <div className="policy-section" id="bt-modifications">
        <h2 className="policy-section-title">6. Booking Modifications</h2>
        <ul className="policy-list">
          <li>Either party may request a modification to a confirmed booking (e.g. date changes, group size adjustments, additional services) by contacting The Global Sanctum or the other party directly.</li>
          <li>All modifications require mutual agreement between the venue owner and the retreat host or wellness guest &mdash; neither party is obligated to accept a modification request.</li>
          <li>Where a modification results in a change to the booking value, commission and processing fees will be recalculated against the revised value, with any over- or under-collection adjusted at the next scheduled payment or refund.</li>
          <li>Modifications that result in a reduction in booking value are subject to the venue&apos;s cancellation policy for the reduced portion.</li>
          <li>The Global Sanctum will make reasonable efforts to facilitate modifications but is not responsible for any loss or inconvenience arising from a modification that cannot be accommodated.</li>
        </ul>
      </div>

      <div className="policy-section" id="bt-cancellations">
        <h2 className="policy-section-title">7. Cancellations &amp; Refunds</h2>
        <p className="policy-text">Cancellation and refund terms vary depending on who initiates the cancellation and the timing of the cancellation relative to the venue&apos;s payment schedule. Full details are set out in our Refund &amp; Cancellation Policy, which should be read in conjunction with this section.</p>

        <p className="policy-subsection">7.1 Guest-Initiated Cancellations</p>
        <ul className="policy-list">
          <li>Cancellation terms are set by the venue owner and are displayed at the time of booking &mdash; it is the retreat host or wellness guest&apos;s responsibility to review and understand the applicable cancellation policy before completing a booking.</li>
          <li>Refund amounts are determined by the venue&apos;s cancellation policy and the timing of the cancellation.</li>
          <li>Where a cancellation occurs before the second scheduled payment, the venue retains the deposit in accordance with its cancellation policy. No platform commission has been collected at this point and none is owed.</li>
          <li>Where a cancellation occurs after commission has been deducted from one or more scheduled payments, refund treatment of commission is governed by the Refund &amp; Cancellation Policy and is at The Global Sanctum&apos;s discretion having regard to the circumstances.</li>
          <li>The 3% Stripe processing fee is non-refundable on guest-initiated cancellations, except where required by law.</li>
          <li>A Cancellation Administration Fee may apply in accordance with the Refund &amp; Cancellation Policy.</li>
        </ul>

        <p className="policy-subsection">7.2 Venue-Initiated Cancellations</p>
        <ul className="policy-list">
          <li>If a venue owner cancels a confirmed booking, the retreat host or wellness guest is entitled to a full refund of all amounts paid, including the Stripe processing fee.</li>
          <li>Where commission has already been deducted from one or more scheduled payments at the time of a venue-initiated cancellation, that commission is reversed and the full amount is refunded.</li>
          <li>Venue-initiated cancellations may result in listing suspension, tier downgrade, or removal from the platform at The Global Sanctum&apos;s discretion.</li>
          <li>Repeated cancellations by a venue owner constitute a breach of the Venue Owner Agreement and may result in account termination.</li>
        </ul>

        <p className="policy-subsection">7.3 Force Majeure &amp; Extraordinary Circumstances</p>
        <ul className="policy-list">
          <li>Where a booking cannot proceed due to circumstances beyond the reasonable control of either party &mdash; including but not limited to natural disasters, pandemics, government restrictions, civil unrest, or severe weather events &mdash; The Global Sanctum will work with both parties to reach a fair resolution.</li>
          <li>Resolutions may include date changes, credit notes, or refunds and will be determined on a case-by-case basis having regard to the specific circumstances.</li>
          <li>The Global Sanctum is not liable for any loss, cost, or inconvenience arising from a force majeure event.</li>
        </ul>

        <p className="policy-subsection">7.4 Platform Discretionary Refunds</p>
        <ul className="policy-list">
          <li>The Global Sanctum reserves the right to issue discretionary refunds where fairness requires it &mdash; for example, where a venue materially fails to deliver the services described in the listing, or where a safety concern arises.</li>
          <li>Discretionary refunds are assessed on a case-by-case basis and are at The Global Sanctum&apos;s sole discretion.</li>
        </ul>
      </div>

      <div className="policy-section" id="bt-responsibilities">
        <h2 className="policy-section-title">8. Responsibilities</h2>

        <p className="policy-subsection">8.1 Venue Owners</p>
        <ul className="policy-list">
          <li>Provide accurate, complete, and current listing information including descriptions, photos, pricing, availability, policies, and amenities.</li>
          <li>Publish a clear payment schedule and cancellation policy, displayed to retreat hosts and wellness guests before booking confirmation.</li>
          <li>Honour all confirmed bookings made through the platform.</li>
          <li>Respond to booking enquiries within 48 hours.</li>
          <li>Maintain all necessary licences, permits, and insurance required for venue operations in the applicable jurisdiction.</li>
          <li>Ensure that the venue is safe, clean, and compliant with all applicable health, safety, and building regulations.</li>
          <li>Communicate promptly with The Global Sanctum and guests regarding any changes, issues, or disruptions that may affect a booking.</li>
          <li>Maintain an active Stripe Connect account for payment processing.</li>
        </ul>

        <p className="policy-subsection">8.2 Retreat Hosts</p>
        <ul className="policy-list">
          <li>Provide accurate booking details including dates, group size, requirements, and any special needs.</li>
          <li>Comply with the venue&apos;s rules, policies, and instructions during the retreat or event.</li>
          <li>Hold appropriate professional insurance for the activities you conduct at the venue.</li>
          <li>Accept responsibility for the conduct and safety of your participants during the program.</li>
          <li>Communicate any changes to your booking to both the venue and The Global Sanctum as early as possible.</li>
        </ul>

        <p className="policy-subsection">8.3 Wellness Guests</p>
        <ul className="policy-list">
          <li>Provide accurate personal and payment information when making a booking.</li>
          <li>Review and understand the venue&apos;s policies (including cancellation, payment schedule, house rules, and health requirements) before completing a booking.</li>
          <li>Carry appropriate travel and medical insurance, particularly for international travel or activities involving physical risk.</li>
          <li>Comply with the venue&apos;s rules and treat the property, staff, and other guests with respect.</li>
          <li>Report any issues or concerns to the venue owner and/or The Global Sanctum promptly.</li>
        </ul>
      </div>

      <div className="policy-section" id="bt-disputes">
        <h2 className="policy-section-title">9. Booking Disputes</h2>
        <ul className="policy-list">
          <li>In the event of a dispute between a venue owner and a retreat host or wellness guest, both parties should first attempt to resolve the matter directly.</li>
          <li>If direct resolution is not possible, either party may contact The Global Sanctum at <EmailLink /> to request assistance.</li>
          <li>The Global Sanctum may, at its discretion, mediate between the parties, request evidence or documentation, and propose a resolution.</li>
          <li>Any resolution proposed by The Global Sanctum is provided in good faith and is not binding unless both parties agree to it.</li>
          <li>The Global Sanctum is not a party to the contractual relationship between the venue owner and the retreat host or wellness guest, and is not liable for any dispute arising from the provision of accommodation, facilities, or services by the venue.</li>
        </ul>
      </div>

      <div className="policy-section" id="bt-liability">
        <h2 className="policy-section-title">10. Liability &amp; Disclaimers</h2>

        <p className="policy-subsection">10.1 Platform Role</p>
        <p className="policy-text">The Global Sanctum operates as a technology platform and marketplace. Our responsibility is limited to operating the booking platform, facilitating connections between parties, and processing payments via Stripe Connect. The Global Sanctum does not hold funds at any stage of the booking process. We do not:</p>
        <ul className="policy-list">
          <li>Own, operate, or manage any venue listed on the platform.</li>
          <li>Guarantee the condition, safety, suitability, legality, or quality of any venue, experience, or service.</li>
          <li>Endorse or verify the qualifications, competence, insurance, or regulatory compliance of any venue owner or retreat host.</li>
          <li>Control the actions, omissions, advice, or conduct of any venue owner, retreat host, or wellness guest.</li>
          <li>Act as a financial intermediary or merchant of record for booking transactions.</li>
        </ul>

        <p className="policy-subsection">10.2 Limitation of Liability</p>
        <p className="policy-text">To the fullest extent permitted by applicable law, The Global Sanctum (Aurella Group Pty Ltd), its directors, officers, employees, agents, and affiliates shall not be liable for any:</p>
        <ul className="policy-list">
          <li>Loss, damage, injury, illness, or death arising from or in connection with any booking, stay, retreat, or experience.</li>
          <li>Indirect, consequential, special, or incidental damages including loss of profits, revenue, data, goodwill, or anticipated savings.</li>
          <li>Property damage, theft, or loss at any venue.</li>
          <li>Failure by a venue owner to deliver the services described in their listing.</li>
          <li>Delays, cancellations, or disruptions to travel, accommodation, or services.</li>
        </ul>
        <p className="policy-text">Where liability cannot be excluded by law, The Global Sanctum&apos;s total aggregate liability for all claims arising from or related to a single booking shall not exceed the total platform fees (commissions and processing fees) actually received by The Global Sanctum in connection with that booking.</p>
        <p className="policy-text"><strong>Australian Consumer Law:</strong> Nothing in these Terms is intended to exclude, restrict, or modify any rights or remedies that you may have under the Australian Consumer Law (Schedule 2 of the Competition and Consumer Act 2010) or any equivalent consumer protection legislation in your jurisdiction that cannot be excluded, restricted, or modified by agreement.</p>
      </div>

      <div className="policy-section" id="bt-insurance">
        <h2 className="policy-section-title">11. Insurance</h2>
        <ul className="policy-list">
          <li>Venue owners must hold and maintain valid insurance appropriate to their property and operations, as set out in the Venue Owner Agreement.</li>
          <li>Retreat hosts are responsible for ensuring their programs comply with applicable insurance and safety requirements, including professional indemnity and public liability cover.</li>
          <li>Wellness guests are strongly encouraged to obtain comprehensive travel and medical insurance covering trip cancellation, medical emergencies, emergency evacuation, and personal liability.</li>
          <li>The Global Sanctum&apos;s platform insurance does not extend to cover the activities, operations, or liabilities of venue owners, retreat hosts, or wellness guests &mdash; refer to our Insurance Statement for details.</li>
        </ul>
      </div>

      <div className="policy-section" id="bt-conduct">
        <h2 className="policy-section-title">12. Code of Conduct</h2>
        <p className="policy-text">By making or accepting a booking through The Global Sanctum, all users agree to:</p>
        <ul className="policy-list">
          <li>Treat all venues, staff, retreat hosts, and fellow guests with respect, courtesy, and consideration.</li>
          <li>Comply with all applicable local laws, health and safety regulations, and cultural sensitivities at the venue location.</li>
          <li>Not use the platform or any booking for unlawful, fraudulent, or harmful purposes.</li>
          <li>Not engage in harassment, discrimination, intimidation, or threatening behaviour toward any person in connection with a booking.</li>
          <li>Provide honest and fair reviews and feedback about venues and experiences.</li>
        </ul>
        <p className="policy-text">The Global Sanctum reserves the right to suspend or terminate accounts and cancel bookings where a user breaches these conduct standards. Full details are set out in our Community Standards &amp; Code of Conduct.</p>
      </div>

      <div className="policy-section" id="bt-privacy">
        <h2 className="policy-section-title">13. Privacy &amp; Data</h2>
        <p className="policy-text">We respect your privacy. Personal information collected in connection with bookings is handled in accordance with our Privacy Policy and the Australian Privacy Principles. By making a booking, you consent to the sharing of relevant booking details (name, contact information, dates, group size, special requirements) with the venue owner and/or retreat host for the purpose of fulfilling the booking. For full details on how your information is collected, stored, used, and disclosed, please refer to our Privacy Policy.</p>
      </div>

      <div className="policy-section" id="bt-ip">
        <h2 className="policy-section-title">14. Intellectual Property</h2>
        <ul className="policy-list">
          <li>All content on the platform &mdash; including venue descriptions, editorial content, photography, design, branding, and software &mdash; is the intellectual property of The Global Sanctum or its licensors and is protected by copyright and other intellectual property laws.</li>
          <li>Booking confirmations, itineraries, and related correspondence are provided for your personal use only and may not be reproduced, distributed, or used for commercial purposes without written permission.</li>
          <li>Venue owners retain ownership of their own content but grant The Global Sanctum a licence to use it in accordance with the Photo &amp; Content Licence Agreement.</li>
        </ul>
      </div>

      <div className="policy-section" id="bt-indemnification">
        <h2 className="policy-section-title">15. Indemnification</h2>
        <p className="policy-text">You agree to indemnify, defend, and hold harmless The Global Sanctum (Aurella Group Pty Ltd), its directors, officers, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable legal fees) arising from:</p>
        <ul className="policy-list">
          <li>Your breach of these Terms or any other agreement with The Global Sanctum.</li>
          <li>Your use of the platform or participation in any booking, retreat, or experience.</li>
          <li>Any inaccurate, misleading, or incomplete information you provide.</li>
          <li>Any dispute between you and a venue owner, retreat host, or other user.</li>
          <li>Any claim by a third party arising from your actions, omissions, or conduct.</li>
        </ul>
      </div>

      <div className="policy-section" id="bt-severability">
        <h2 className="policy-section-title">16. Severability</h2>
        <p className="policy-text">If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, that provision shall be severed or modified to the minimum extent necessary. The remaining provisions shall continue in full force and effect.</p>
      </div>

      <div className="policy-section" id="bt-law">
        <h2 className="policy-section-title">17. Governing Law</h2>
        <p className="policy-text">These Terms are governed by and construed in accordance with the laws of Queensland, Australia. Both parties agree to submit to the exclusive jurisdiction of the courts of Queensland, Australia in relation to any dispute arising under or in connection with these Terms.</p>
      </div>

      <div className="policy-section" id="bt-changes">
        <h2 className="policy-section-title">18. Changes to These Terms</h2>
        <p className="policy-text">The Global Sanctum may update these Booking Terms &amp; Conditions from time to time to reflect changes in our platform, services, pricing, or applicable legislation. Any material changes will be communicated via the platform or by email. Continued use of the platform after changes are published constitutes acceptance of the updated Terms. We encourage you to review these Terms periodically.</p>
      </div>

      <div className="policy-contact" id="bt-contact">
        <ContactBlock lead="If you have any questions about these Terms, please contact:" />
      </div>
    </>
  );
}

function AcceptableContent() {
  return (
    <>
      <p className="policy-intro">The Global Sanctum (&quot;The Global Sanctum&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) provides a curated marketplace connecting wellness and retreat venue owners, retreat hosts, and wellness guests worldwide. This Acceptable Use Policy (&quot;Policy&quot;) sets out the rules and expectations for how our platform, website, and services may be used. This Policy applies to all users of the platform, including visitors, registered members, venue owners, retreat hosts, and wellness guests. By accessing or using the Site, you agree to comply with this Policy. This Policy should be read in conjunction with our Terms &amp; Conditions and Community Standards &amp; Code of Conduct.</p>

      <div className="policy-section" id="au-permitted">
        <h2 className="policy-section-title">1. Permitted Use</h2>
        <p className="policy-text">Our platform is designed to facilitate the discovery, booking, and management of wellness and retreat venues and experiences. You may use the platform for the following purposes:</p>
        <ul className="policy-list">
          <li><strong>Browsing and discovery</strong> &mdash; searching for, viewing, and comparing wellness and retreat venues, retreat hosts, and experiences.</li>
          <li><strong>Account management</strong> &mdash; creating and maintaining your user profile, managing bookings, and updating your information.</li>
          <li><strong>Booking and enquiries</strong> &mdash; making booking requests, sending enquiries to venue owners or retreat hosts, and managing reservations.</li>
          <li><strong>Listing and promotion</strong> &mdash; if you are a venue owner or retreat host, creating and managing listings for your property or services in accordance with your subscription agreement.</li>
          <li><strong>Communication</strong> &mdash; using our messaging and communication tools for legitimate booking-related or community purposes.</li>
          <li><strong>Reviews and feedback</strong> &mdash; leaving honest, constructive reviews based on genuine firsthand experience.</li>
        </ul>
      </div>

      <div className="policy-section" id="au-prohibited">
        <h2 className="policy-section-title">2. Prohibited Conduct</h2>
        <p className="policy-text">You agree not to use the platform in any manner that is unlawful, harmful, or inconsistent with the purpose and integrity of our community. The following conduct is strictly prohibited:</p>
        <p className="policy-subsection">Illegal &amp; Harmful Activity</p>
        <ul className="policy-list">
          <li>Using the platform for any purpose that is unlawful, fraudulent, or deceptive under the laws of any applicable jurisdiction.</li>
          <li>Facilitating, promoting, or engaging in money laundering, terrorist financing, or sanctions evasion.</li>
          <li>Posting, transmitting, or distributing any content that is obscene, defamatory, threatening, harassing, discriminatory, or incites violence.</li>
          <li>Using the platform to exploit, harm, or endanger any person, including minors.</li>
          <li>Promoting or facilitating the sale or distribution of illegal substances, controlled goods, or unlicensed services.</li>
        </ul>
        <p className="policy-subsection">Fraud &amp; Misrepresentation</p>
        <ul className="policy-list">
          <li>Creating false, misleading, or deceptive listings, profiles, reviews, or communications.</li>
          <li>Impersonating any person, entity, or organisation, or misrepresenting your affiliation with any party.</li>
          <li>Fabricating or manipulating reviews, ratings, or testimonials.</li>
          <li>Creating multiple accounts for the purpose of evading enforcement actions, manipulating search results, or gaining unfair advantage.</li>
          <li>Providing false payment information or engaging in chargebacks or payment fraud.</li>
        </ul>
        <p className="policy-subsection">Platform Integrity &amp; Security</p>
        <ul className="policy-list">
          <li>Attempting to gain unauthorised access to any part of the platform, other user accounts, or any connected systems or networks.</li>
          <li>Introducing viruses, malware, trojans, worms, or any other harmful or disruptive code.</li>
          <li>Conducting denial-of-service attacks, load testing, or any activity intended to disrupt or degrade platform performance.</li>
          <li>Reverse engineering, decompiling, or disassembling any part of the platform&apos;s software or infrastructure.</li>
          <li>Circumventing or attempting to circumvent any access controls, security measures, or rate limits.</li>
        </ul>
        <p className="policy-subsection">Data Harvesting &amp; Scraping</p>
        <ul className="policy-list">
          <li>Using automated tools, bots, scrapers, crawlers, or similar technology to extract, collect, or download data from the platform without prior written consent.</li>
          <li>Systematically downloading, copying, or storing venue listings, user data, photographs, or proprietary content for any purpose.</li>
          <li>Building or populating a competing database, directory, or service using data obtained from our platform.</li>
          <li>Using data obtained from the platform for unsolicited commercial communications or marketing purposes.</li>
        </ul>
        <p className="policy-subsection">Commercial Misuse</p>
        <ul className="policy-list">
          <li>Using the platform for unsolicited advertising, spam, chain letters, or promotional material not authorised by The Global Sanctum.</li>
          <li>Soliciting users to transact outside the platform in order to avoid fees, commissions, or platform protections.</li>
          <li>Reselling, sublicensing, or commercially exploiting access to the platform or its features without authorisation.</li>
          <li>Using venue or retreat host contact information obtained through the platform for purposes unrelated to a legitimate booking or enquiry.</li>
        </ul>
        <p className="policy-subsection">Content Violations</p>
        <ul className="policy-list">
          <li>Uploading, posting, or transmitting content that infringes upon the intellectual property, privacy, or proprietary rights of any third party.</li>
          <li>Posting content that contains personal information of others without their explicit consent.</li>
          <li>Publishing photographs or media depicting individuals without their knowledge or permission.</li>
          <li>Using the platform to distribute political propaganda, religious proselytising, or ideological recruitment unrelated to the platform&apos;s purpose.</li>
        </ul>
      </div>

      <div className="policy-section" id="au-account">
        <h2 className="policy-section-title">3. Account Responsibilities</h2>
        <p className="policy-text">As a registered user of the platform, you are responsible for maintaining the security and integrity of your account.</p>
        <ul className="policy-list">
          <li>You are solely responsible for all activity that occurs under your account, whether authorised by you or not.</li>
          <li>You must not share your login credentials with any third party or allow others to access your account.</li>
          <li>You must notify us immediately at <EmailLink /> if you become aware of any unauthorised access to your account.</li>
          <li>You must keep your account information accurate, current, and complete.</li>
          <li>You must not use another person&apos;s account without their express permission and our prior approval.</li>
        </ul>
        <p className="policy-text"><strong>Shared access:</strong> Where a venue or organisation requires multiple team members to access a single account, please contact us to arrange appropriate multi-user access. Sharing individual login credentials is not a substitute for proper account configuration.</p>
      </div>

      <div className="policy-section" id="au-ip">
        <h2 className="policy-section-title">4. Intellectual Property</h2>
        <p className="policy-text">All content, design, branding, software, and materials on the platform are the property of The Global Sanctum or its licensors and are protected under Australian and international intellectual property law.</p>
        <ul className="policy-list">
          <li>You may not reproduce, distribute, modify, or create derivative works from any platform content without prior written consent.</li>
          <li>You may not use our trademarks, brand name, or logos in any way that suggests endorsement or affiliation without authorisation.</li>
          <li>You may not frame, mirror, or embed any part of the platform on another website or application.</li>
          <li>User-submitted content remains the property of the submitting user, subject to the licence granted in our Terms &amp; Conditions.</li>
        </ul>
      </div>

      <div className="policy-section" id="au-monitoring">
        <h2 className="policy-section-title">5. Monitoring &amp; Enforcement</h2>
        <p className="policy-text">We reserve the right, but are not obligated, to monitor use of the platform for compliance with this Policy. We may investigate any reported or suspected violation and take action at our sole discretion.</p>
        <p className="policy-subsection">Enforcement Actions</p>
        <p className="policy-text">Where we determine that a violation has occurred, we may take one or more of the following actions, depending on the severity and nature of the breach:</p>
        <ul className="policy-list">
          <li><strong>Content removal:</strong> Removal or modification of any content that violates this Policy, without prior notice.</li>
          <li><strong>Feature restriction:</strong> Temporary restriction of access to specific platform features, such as messaging, booking, or listing capabilities.</li>
          <li><strong>Account suspension:</strong> Temporary suspension of your account pending investigation or resolution of a reported violation.</li>
          <li><strong>Account termination:</strong> Permanent removal of your account and all associated listings, content, and data from the platform.</li>
          <li><strong>Legal action:</strong> Pursuit of civil remedies or referral to law enforcement authorities where conduct is criminal or causes material harm.</li>
        </ul>
        <p className="policy-text">We will endeavour to notify affected users before or at the time enforcement action is taken, except where immediate action is required to protect the safety of users, the integrity of the platform, or compliance with legal obligations.</p>
      </div>

      <div className="policy-section" id="au-reporting">
        <h2 className="policy-section-title">6. Reporting Violations</h2>
        <p className="policy-text">If you become aware of any use of the platform that violates this Policy, we encourage you to report it promptly. Reports can be submitted by emailing <EmailLink /> with the subject line &quot;Acceptable Use Report&quot;, or by using the in-app reporting feature where available.</p>
        <p className="policy-text">Please include as much detail as possible, including the nature of the violation, the account or content involved, and any supporting evidence. All reports will be reviewed and treated with discretion. We do not tolerate retaliation against anyone who reports a violation in good faith.</p>
      </div>

      <div className="policy-section" id="au-third-party">
        <h2 className="policy-section-title">7. Third-Party Services &amp; Integrations</h2>
        <p className="policy-text">The platform may integrate with or link to third-party services, including payment processors, analytics providers, and authentication systems. Your use of these third-party services is subject to their own terms of use and privacy policies.</p>
        <p className="policy-text">You agree not to use any third-party service accessed through the platform in a way that violates this Policy, the third party&apos;s own terms, or any applicable law. The Global Sanctum is not responsible for the conduct, content, or practices of any third-party service.</p>
      </div>

      <div className="policy-section" id="au-liability">
        <h2 className="policy-section-title">8. Liability &amp; Indemnification</h2>
        <p className="policy-text">You acknowledge that you are solely responsible for your use of the platform and for any consequences arising from your violation of this Policy. You agree to indemnify and hold harmless The Global Sanctum, its directors, officers, employees, and agents from any claims, damages, losses, or expenses arising from your breach of this Policy.</p>
        <p className="policy-text">The Global Sanctum shall not be liable for any loss or damage arising from the actions or content of any user, or from enforcement actions taken in accordance with this Policy.</p>
      </div>

      <div className="policy-section" id="au-law">
        <h2 className="policy-section-title">9. Governing Law</h2>
        <p className="policy-text">This Policy is governed by and construed in accordance with the laws of Queensland, Australia. Any dispute arising under or in connection with this Policy shall be subject to the exclusive jurisdiction of the courts of Queensland, Australia.</p>
      </div>

      <div className="policy-section" id="au-updates">
        <h2 className="policy-section-title">10. Updates to This Policy</h2>
        <p className="policy-text">We may update this Acceptable Use Policy from time to time to reflect changes in our platform, services, or applicable legislation. Any changes will be posted on our website with the updated effective date. Where material changes are made, we will make reasonable efforts to notify registered users. Your continued use of the platform following the posting of a revised Policy constitutes your acceptance of those changes.</p>
      </div>

      <div className="policy-contact" id="au-contact">
        <ContactBlock lead="If you have any questions about this Policy, or wish to report a violation, please contact:" />
      </div>
    </>
  );
}

function CommunityContent() {
  return (
    <>
      <p className="policy-intro">The Global Sanctum (&quot;The Global Sanctum&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is a community built on respect, integrity, and shared vision. Our platform exists to bring together venue owners, retreat hosts, and wellness guests in a spirit of trust and collaboration. These Community Standards and Code of Conduct (&quot;Standards&quot;) apply to all members of our community, including venue owners, retreat hosts, wellness guests, and any other individuals who interact with or through our platform. By creating an account or using our services, you agree to uphold these Standards.</p>

      <p className="policy-text" style={{ fontStyle: "italic", color: "var(--charcoal-70)", padding: "8px 0 24px", borderLeft: "2px solid var(--gold-accent)", paddingLeft: "24px", marginBottom: "32px" }}>We believe that the best experiences are built on mutual respect, honest communication, and a genuine commitment to the wellbeing of everyone involved. These standards exist to protect that belief.</p>

      <div className="policy-section" id="cs-principles">
        <h2 className="policy-section-title">1. Core Principles</h2>
        <p className="policy-text">The following principles form the foundation of our community. Every interaction on or through the platform should reflect these values.</p>
        <ul className="policy-list">
          <li><strong>Respect:</strong> Treat all members of our community with courtesy and dignity. Engage with empathy and professionalism in every interaction, whether online or in person.</li>
          <li><strong>Integrity:</strong> Be honest and transparent in all communication, listings, bookings, and representations. Say what you mean and honour what you commit to.</li>
          <li><strong>Inclusivity:</strong> Welcome people of all cultures, genders, abilities, ages, backgrounds, and belief systems. Our community is enriched by diversity and diminished by exclusion.</li>
          <li><strong>Sustainability:</strong> Honour the environment, local communities, and cultural traditions. Operate with awareness of the impact your activities have on the places and people around you.</li>
          <li><strong>Safety:</strong> Prioritise the physical, emotional, and psychological safety of all participants. Create and maintain environments where people feel secure and supported.</li>
          <li><strong>Accountability:</strong> Take responsibility for your actions, commitments, and their consequences. When things go wrong, communicate openly and work toward resolution.</li>
        </ul>
      </div>

      <div className="policy-section" id="cs-venues">
        <h2 className="policy-section-title">2. Expectations for Venue Owners</h2>
        <p className="policy-text">Venue owners are the foundation of our marketplace. The quality, accuracy, and integrity of your listing directly shapes the experience of every host and wellness guest who engages with your property.</p>
        <p className="policy-subsection">Listing Accuracy</p>
        <ul className="policy-list">
          <li>Provide accurate, up-to-date information about your property, including facilities, amenities, capacity, accessibility features, and any known limitations.</li>
          <li>Use current, representative photographs that truthfully reflect the property&apos;s condition and setting.</li>
          <li>Clearly disclose any seasonal variations, renovation schedules, or temporary changes that may affect the guest experience.</li>
          <li>Keep availability calendars current and respond promptly to booking enquiries.</li>
        </ul>
        <p className="policy-subsection">Booking &amp; Service Standards</p>
        <ul className="policy-list">
          <li>Honour all bookings, pricing, and availability as agreed. Last-minute cancellations without genuine cause erode community trust.</li>
          <li>Maintain high standards of cleanliness, safety, and guest care consistent with the expectations set by your listing.</li>
          <li>Be responsive to enquiries and communications in a timely manner &mdash; within 48 hours as a general standard.</li>
          <li>Respect retreat hosts&apos; and guests&apos; needs, including dietary, accessibility, and cultural considerations.</li>
        </ul>
        <p className="policy-subsection">Professionalism</p>
        <ul className="policy-list">
          <li>Treat all retreat hosts, guests, and platform staff with courtesy and professionalism.</li>
          <li>Address concerns or complaints constructively and in good faith.</li>
          <li>Comply with all applicable local regulations, licences, health and safety standards, and insurance requirements.</li>
        </ul>
      </div>

      <div className="policy-section" id="cs-facilitators">
        <h2 className="policy-section-title">3. Expectations for Retreat Hosts</h2>
        <p className="policy-text">Retreat hosts are entrusted with the wellbeing and experience of their participants. Your conduct reflects not only on your own practice but on the broader community.</p>
        <p className="policy-subsection">Truthful Representation</p>
        <ul className="policy-list">
          <li>Represent yourself and your offerings truthfully &mdash; including qualifications, certifications, experience, and the nature of your retreats or programs.</li>
          <li>Do not misrepresent your credentials, training lineage, or professional affiliations.</li>
          <li>Clearly describe what is and is not included in your retreat offering, including meals, accommodation, activities, and any additional costs.</li>
        </ul>
        <p className="policy-subsection">Commitment &amp; Reliability</p>
        <ul className="policy-list">
          <li>Honour all agreements with venues, participants, and the platform.</li>
          <li>Communicate any changes to schedules, pricing, or offerings promptly and transparently.</li>
          <li>Ensure retreats and experiences align with principles of wellness, safety, and respect for all attendees.</li>
          <li>Provide clear pre-arrival information to participants, including what to expect, what to bring, and any health or safety considerations.</li>
        </ul>
        <p className="policy-subsection">Duty of Care</p>
        <ul className="policy-list">
          <li>Prioritise the physical, emotional, and psychological safety of all participants at all times.</li>
          <li>Maintain appropriate professional boundaries with participants.</li>
          <li>Have an accessible emergency plan and ensure participants know how to access help if needed.</li>
          <li>Be transparent about the scope and limitations of your practice &mdash; wellness facilitation is not a substitute for medical, psychological, or therapeutic treatment.</li>
          <li>Treat venue owners, their staff, and local communities with kindness and professionalism.</li>
        </ul>
        <p className="policy-text"><strong>Qualifications:</strong> The Global Sanctum does not verify or endorse the qualifications, certifications, or competency of retreat hosts listed on the platform. Retreat Hosts are solely responsible for ensuring they hold the appropriate credentials, insurance, and licences required to deliver their services in the relevant jurisdiction.</p>
      </div>

      <div className="policy-section" id="cs-guests">
        <h2 className="policy-section-title">4. Expectations for Wellness Guests &amp; Guests</h2>
        <p className="policy-text">As a guest, you play an essential role in maintaining the quality and integrity of our community. Your conduct shapes the experience for everyone &mdash; including future guests.</p>
        <p className="policy-subsection">Respect &amp; Courtesy</p>
        <ul className="policy-list">
          <li>Treat venues, retreat hosts, staff, and fellow guests with courtesy and respect.</li>
          <li>Respect property rules, house guidelines, cultural norms, and environmental protocols at each venue.</li>
          <li>Be mindful of shared spaces, noise levels, and the experience of others.</li>
        </ul>
        <p className="policy-subsection">Booking Commitments</p>
        <ul className="policy-list">
          <li>Honour your booking commitments and communicate promptly if changes arise.</li>
          <li>Familiarise yourself with the venue&apos;s and retreat host&apos;s cancellation and refund policies before booking.</li>
          <li>Arrive prepared with any information, documents, or materials requested by the host or venue.</li>
        </ul>
        <p className="policy-subsection">Personal Responsibility</p>
        <ul className="policy-list">
          <li>Engage with activities and experiences in a responsible and safe manner.</li>
          <li>Disclose any relevant health conditions, allergies, or accessibility needs to venue owners and retreat hosts before your stay, where relevant to your safety or the safety of others.</li>
          <li>Take responsibility for your own belongings and for any damage caused to venue property during your stay.</li>
        </ul>
      </div>

      <div className="policy-section" id="cs-communication">
        <h2 className="policy-section-title">5. Communication Standards</h2>
        <p className="policy-text">All communication conducted through or in connection with the platform &mdash; including messages, reviews, listing descriptions, and social media interactions &mdash; should reflect the values of our community.</p>
        <ul className="policy-list">
          <li>Be honest and constructive in all communications, including reviews and feedback.</li>
          <li>Do not post misleading, defamatory, or deliberately harmful content about any member of the community.</li>
          <li>Resolve disputes through direct, respectful communication before escalating to The Global Sanctum.</li>
          <li>Do not use the platform&apos;s messaging or communication tools for unsolicited marketing, spam, or self-promotion unrelated to a booking or enquiry.</li>
          <li>Respect the confidentiality of private communications between members.</li>
        </ul>
        <p className="policy-subsection">Reviews &amp; Feedback</p>
        <p className="policy-text">Reviews are a vital part of our community. We encourage honest, balanced feedback that helps other members make informed decisions. Reviews should be based on genuine, firsthand experience and should not be used to harass, intimidate, or unfairly damage another member&apos;s reputation. The Global Sanctum reserves the right to remove reviews that violate these Standards.</p>
      </div>

      <div className="policy-section" id="cs-inclusion">
        <h2 className="policy-section-title">6. Non-Discrimination &amp; Inclusion</h2>
        <p className="policy-text">The Global Sanctum is committed to fostering an inclusive community. Discrimination of any kind is not tolerated on our platform.</p>
        <p className="policy-text">All members &mdash; venue owners, retreat hosts, and wellness guests alike &mdash; must not discriminate against any person on the basis of:</p>
        <ul className="policy-list">
          <li>Race, colour, ethnicity, or national origin.</li>
          <li>Gender, gender identity, or gender expression.</li>
          <li>Sexual orientation.</li>
          <li>Age.</li>
          <li>Religion, belief, or spiritual practice.</li>
          <li>Disability, medical condition, or neurodivergence.</li>
          <li>Marital or family status.</li>
          <li>Socioeconomic background.</li>
        </ul>
        <p className="policy-text">Venue owners may set reasonable, non-discriminatory house rules related to the nature of their property (such as adult-only or women-only retreat spaces), provided these are clearly communicated in advance and do not contravene applicable anti-discrimination legislation.</p>
      </div>

      <div className="policy-section" id="cs-prohibited">
        <h2 className="policy-section-title">7. Prohibited Behaviour</h2>
        <p className="policy-text">The following behaviours are strictly prohibited and may result in immediate action, including suspension or permanent removal from the platform:</p>
        <p className="policy-subsection">Harassment &amp; Abuse</p>
        <ul className="policy-list">
          <li>Discrimination, harassment, bullying, intimidation, or abuse of any kind &mdash; whether verbal, written, physical, or sexual.</li>
          <li>Threatening, stalking, or engaging in conduct intended to cause fear or distress.</li>
          <li>Any form of exploitation, coercion, or manipulation of vulnerable individuals.</li>
        </ul>
        <p className="policy-subsection">Fraud &amp; Misrepresentation</p>
        <ul className="policy-list">
          <li>Using the platform for scams, fraudulent listings, false advertising, or any illegal activity.</li>
          <li>Misrepresenting qualifications, certifications, property features, or the nature of services offered.</li>
          <li>Creating fake accounts, reviews, or bookings.</li>
          <li>Attempting to circumvent the platform&apos;s booking or payment systems.</li>
        </ul>
        <p className="policy-subsection">Property &amp; Safety</p>
        <ul className="policy-list">
          <li>Deliberate damage to property, theft, or unsafe conduct at any venue.</li>
          <li>Possession or use of illegal substances on venue property, unless otherwise permitted by local law and venue policy.</li>
          <li>Endangering the safety of others through reckless or negligent behaviour.</li>
        </ul>
        <p className="policy-subsection">Platform Misuse</p>
        <ul className="policy-list">
          <li>Spamming, trolling, or disruptive behaviour in community spaces or communications.</li>
          <li>Scraping, harvesting, or extracting data from the platform without authorisation.</li>
          <li>Attempting to solicit members away from the platform to avoid fees or bypass our systems.</li>
        </ul>
      </div>

      <div className="policy-section" id="cs-enforcement">
        <h2 className="policy-section-title">8. Consequences &amp; Enforcement</h2>
        <p className="policy-text">The Global Sanctum reserves the right to investigate any reported or suspected violation of these Standards and to take appropriate action at our sole discretion. The severity of the response will be proportionate to the nature and gravity of the violation.</p>
        <ul className="policy-list">
          <li><strong>Level 1 &mdash; Reminder:</strong> Written reminder of community standards with guidance on expected behaviour. Applies to minor or first-time infractions and misunderstandings.</li>
          <li><strong>Level 2 &mdash; Warning:</strong> Formal written warning documented on the member&apos;s account. Applies to repeated minor infractions or moderate violations.</li>
          <li><strong>Level 3 &mdash; Restriction:</strong> Temporary suspension of account, listing, or specific platform features. Applies to serious or repeated violations after prior warning.</li>
          <li><strong>Level 4 &mdash; Removal:</strong> Permanent removal of listings, accounts, and access to the platform. Applies to severe violations, fraud, illegal activity, or repeated serious offences.</li>
          <li><strong>Level 5 &mdash; Referral:</strong> Reporting to appropriate law enforcement or regulatory authorities. Applies to criminal conduct, threats of violence, or child safety concerns.</li>
        </ul>
        <p className="policy-text">Members who are subject to enforcement action will be notified and, where appropriate, given the opportunity to respond before a final decision is made. However, in cases involving immediate safety concerns, we reserve the right to act without prior notice.</p>
      </div>

      <div className="policy-section" id="cs-reporting">
        <h2 className="policy-section-title">9. Reporting Concerns</h2>
        <p className="policy-text">If you experience, witness, or become aware of any behaviour that violates these Standards, we encourage you to report it promptly. All reports will be treated seriously and handled with discretion.</p>
        <p className="policy-subsection">How to Report</p>
        <ul className="policy-list">
          <li><strong>Email:</strong> <EmailLink /> with the subject line &quot;Community Standards Report&quot;.</li>
          <li><strong>Platform:</strong> Use the in-app reporting feature (where available) on any listing, profile, or message.</li>
        </ul>
        <p className="policy-subsection">What to Include</p>
        <ul className="policy-list">
          <li>Your name and contact details.</li>
          <li>The name or account of the person or listing involved.</li>
          <li>A clear description of the incident, including dates, locations, and any supporting evidence (screenshots, messages, photographs).</li>
          <li>Any witnesses or other parties involved.</li>
        </ul>
        <p className="policy-text"><strong>Confidentiality:</strong> We will handle all reports with care and discretion. Your identity will not be disclosed to the reported party without your consent, except where required by law or necessary to ensure safety. We do not tolerate retaliation against anyone who makes a report in good faith.</p>
      </div>

      <div className="policy-section" id="cs-general">
        <h2 className="policy-section-title">10. General Provisions</h2>
        <ul className="policy-list">
          <li>These Standards form part of the broader agreement between you and The Global Sanctum, alongside our Terms &amp; Conditions, Privacy Policy, Cookie Policy, and any applicable service-specific agreements.</li>
          <li>The Global Sanctum reserves the right to update or amend these Standards at any time with reasonable notice. Material changes will be communicated to registered members via email or platform notification.</li>
          <li>If any provision of these Standards is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</li>
          <li>These Standards are governed by the laws of Queensland, Australia.</li>
        </ul>
      </div>

      <div className="policy-section" id="cs-updates">
        <h2 className="policy-section-title">11. Updates to These Standards</h2>
        <p className="policy-text">We may update these Community Standards and Code of Conduct from time to time to reflect changes in our community, services, or applicable legislation. Any changes will be posted on our website with the updated effective date. We encourage all members to review these Standards periodically.</p>
      </div>

      <div className="policy-contact" id="cs-contact">
        <ContactBlock lead="If you have any questions about these Standards, or wish to report a concern, please contact:" />
      </div>
    </>
  );
}

function VenuePartnerContent() {
  return (
    <>
      <p className="policy-intro">These Venue Partner Terms govern the relationship between The Global Sanctum (&quot;TGS&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) and venue owners who list retreat or wellness spaces on our platform. They supplement the general Terms &amp; Conditions and, together with the Venue Owner Agreement accepted during onboarding, set out the obligations that apply to your role as a venue partner.</p>

      <div className="policy-section" id="vp-overview">
        <h2 className="policy-section-title">1. Overview</h2>
        <p className="policy-text">As a venue partner, you list your space for discovery and booking by retreat hosts and wellness guests. TGS provides the platform, curation, and booking infrastructure; you remain responsible for the operation, safety, and accuracy of your venue listing.</p>
      </div>

      <div className="policy-section" id="vp-eligibility">
        <h2 className="policy-section-title">2. Eligibility &amp; Onboarding</h2>
        <ul className="policy-list">
          <li>You must own the venue or hold written authority to list it and accept bookings on its behalf.</li>
          <li>You must complete the onboarding process, including identity and ownership verification where requested.</li>
          <li>By completing onboarding you confirm you have read and accepted the Venue Owner Agreement in full.</li>
        </ul>
      </div>

      <div className="policy-section" id="vp-subscription">
        <h2 className="policy-section-title">3. Subscription &amp; Fees</h2>
        <p className="policy-text">Listing on TGS requires an active subscription at the plan and billing cycle you select during signup. Subscription fees are billed in advance and are non-refundable except where required by law. We will give reasonable notice of any change to subscription pricing.</p>
      </div>

      <div className="policy-section" id="vp-listing">
        <h2 className="policy-section-title">4. Listing Obligations</h2>
        <ul className="policy-list">
          <li>Keep your listing accurate and current, including availability, pricing, facilities, and imagery.</li>
          <li>Honour all confirmed bookings and the published cancellation policy you have selected.</li>
          <li>Hold and maintain appropriate insurance, licences, and permits for your venue and activities.</li>
          <li>Comply with all applicable local laws, health and safety regulations, and cultural sensitivities at the venue location.</li>
        </ul>
      </div>

      <div className="policy-section" id="vp-commission">
        <h2 className="policy-section-title">5. Commission &amp; Disbursement</h2>
        <p className="policy-text">TGS applies a commission to confirmed bookings as set out in your Venue Owner Agreement. Guest payments are collected through the platform&apos;s payment provider and disbursed to you according to the agreed disbursement schedule, net of commission and any applicable processing fees.</p>
      </div>

      <div className="policy-section" id="vp-conduct">
        <h2 className="policy-section-title">6. Conduct Standards</h2>
        <p className="policy-text">Venue partners are expected to communicate professionally and promptly, represent their venue honestly, and uphold the wellbeing and safety of every guest. Conduct that misleads guests, circumvents the platform, or breaches our Community Standards may result in suspension.</p>
      </div>

      <div className="policy-section" id="vp-term">
        <h2 className="policy-section-title">7. Term, Suspension &amp; Termination</h2>
        <p className="policy-text">These terms apply for as long as your listing remains active. We may suspend or remove a listing for breach of these terms, the Venue Owner Agreement, or applicable law. You may cancel your subscription at any time; cancellation takes effect at the end of the current billing cycle and does not affect bookings already confirmed.</p>
      </div>

      <div className="policy-section" id="vp-precedence">
        <h2 className="policy-section-title">8. Precedence</h2>
        <p className="policy-text">In the event of any conflict between these Venue Partner Terms and the Venue Owner Agreement accepted at onboarding, the Venue Owner Agreement will take precedence with respect to venue-specific matters. A copy of the agreement accepted at the time of your onboarding is available on request by contacting <EmailLink />.</p>
      </div>

      <div className="policy-contact" id="vp-contact">
        <ContactBlock lead="For questions about these Venue Partner Terms, please contact:" />
      </div>
    </>
  );
}

const tabContent: Record<TabId, () => React.ReactElement> = {
  terms: TermsContent,
  privacy: PrivacyContent,
  cookies: CookiesContent,
  health: HealthContent,
  refunds: RefundsContent,
  booking: BookingContent,
  acceptable: AcceptableContent,
  community: CommunityContent,
  "venue-partner": VenuePartnerContent,
};

export default function TgsLegalPage() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>(() => pathToTab(pathname));
  const [activeTocId, setActiveTocId] = useState<string>("");
  const tabsInnerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  const scrollActiveTabIntoView = useCallback(() => {
    const container = tabsInnerRef.current;
    if (!container) return;
    const tab = container.querySelector<HTMLElement>(".policy-tab.active");
    if (!tab) return;
    if (container.scrollWidth <= container.clientWidth) return;
    const target = tab.offsetLeft - (container.clientWidth - tab.offsetWidth) / 2;
    container.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if ((TAB_IDS as string[]).includes(hash)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(hash as TabId);
    }
    const onHashChange = () => {
      const next = window.location.hash.replace("#", "");
      if ((TAB_IDS as string[]).includes(next)) {
        setActiveTab(next as TabId);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    requestAnimationFrame(scrollActiveTabIntoView);
    const onResize = () => scrollActiveTabIntoView();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeTab, scrollActiveTabIntoView]);

  useEffect(() => {
    const updateScrollSpy = () => {
      const items = tocData[activeTab];
      let current = "";
      items.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < 200) {
          current = item.id;
        }
      });
      setActiveTocId(current);
    };
    updateScrollSpy();
    window.addEventListener("scroll", updateScrollSpy);
    return () => window.removeEventListener("scroll", updateScrollSpy);
  }, [activeTab]);

  const switchTab = (tab: TabId) => {
    setActiveTab(tab);
    if (typeof window !== "undefined" && window.history) {
      window.history.replaceState(null, "", "#" + tab);
    }
    const tabsEl = document.getElementById("policyTabs");
    if (tabsEl) {
      window.scrollTo({ top: tabsEl.offsetTop - 72, behavior: "smooth" });
    }
  };

  const handleTocClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = el.offsetTop - 160;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const ActiveContent = tabContent[activeTab];

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <a className="skip-to-content" href="#main-content">Skip to main content</a>

      <nav className="nav" id="nav" aria-label="Primary">
        <div className="nav-inner">
          <div className="nav-left" onClick={() => setDrawerOpen((open) => !open)}>
            <button
              className={`nav-hamburger${drawerOpen ? " active" : ""}`}
              id="navHamburger"
              type="button"
              aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={drawerOpen ? "true" : "false"}
              aria-controls="navDrawer"
            >
              <span />
              <span />
              <span />
            </button>
            <span className="nav-hamburger-label" aria-hidden="true">Menu</span>
          </div>
          <Link href="/global-santcum/web" className="nav-logo-area" aria-label="The Global Sanctum &mdash; home">
            <span className="nav-logo" aria-hidden="true" />
            <span className="nav-brand-text">The Global Sanctum</span>
          </Link>
          <div className="nav-right" />
        </div>
      </nav>

      <TgsNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main id="main-content" role="main">

        <section className="hero" aria-labelledby="page-title">
          <p className="hero-overline">Legal</p>
          <h1 className="hero-title" id="page-title">Legal &amp; Policies</h1>
          <p className="hero-subtitle">The policies that govern your use of The Global Sanctum platform &mdash; covering booking, payment, conduct, and how we protect your information.</p>
          <p className="hero-date">Last Updated: April 2026</p>
        </section>

        <div className="policy-tabs" id="policyTabs" role="tablist" aria-label="Policy categories">
          <div className="policy-tabs-inner" ref={tabsInnerRef}>
            {TAB_IDS.map((id) => (
              <button
                key={id}
                className={`policy-tab${activeTab === id ? " active" : ""}`}
                onClick={() => switchTab(id)}
                role="tab"
                aria-selected={activeTab === id ? "true" : "false"}
                aria-controls={`${id}-content`}
                type="button"
              >
                {tabLabels[id]}
              </button>
            ))}
          </div>
        </div>

        <div className="legal-layout">

          <aside className="toc" id="toc" aria-label="On this page">
            <p className="toc-label">On This Page</p>
            <ul className="toc-list" id="tocList">
              {tocData[activeTab].map((item) => (
                <li key={item.id}>
                  <a
                    className={`toc-link${activeTocId === item.id ? " active" : ""}`}
                    href={`#${item.id}`}
                    onClick={(event) => handleTocClick(event, item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="policy-content active" id={`${activeTab}-content`} role="tabpanel" tabIndex={0}>
            <ActiveContent />
          </div>

        </div>

      </main>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-placeholder">
              <span>Logo Goes Here</span>
            </div>
            <span className="footer-brand-name">The Global Sanctum</span>
            <p className="footer-brand-text">Curated wellness venues and transformational retreat spaces for retreat hosts, wellness guests, and seekers worldwide.</p>
            <p className="footer-brand-meta">Aurella Group Pty Ltd<br />ABN 70 649 742 423</p>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Discover</h4>
            <ul className="footer-links">
              <li><Link href="/global-santcum/retreat-venues">Retreat Venues</Link></li>
              <li><Link href="/global-santcum/wellness-venues">Wellness Venues</Link></li>
              <li><Link href="/global-santcum/wellness-experiences">Wellness Experiences</Link></li>
              <li><Link href="/global-santcum/how-it-works">How It Works</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Partner With Us</h4>
            <ul className="footer-links">
              <li><Link href="/global-santcum/list-your-venue">List Your Venue</Link></li>
              <li><Link href="/global-santcum/host-a-retreat">Host A Retreat</Link></li>
              <li><Link href="/global-santcum/contact#press-media">Press &amp; Media</Link></li>
              <li><Link href="/global-santcum/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Resources</h4>
            <ul className="footer-links">
              <li><Link href="/global-santcum/the-wellness-edit">The Wellness Edit</Link></li>
              <li><Link href="/global-santcum/sanctum-journal">Sanctum Journal</Link></li>
              <li><Link href="/global-santcum/about">About Us</Link></li>
              <li><Link href="/global-santcum/our-story">Our Story</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Legal</h4>
            <ul className="footer-links">
              <li><Link href="/global-santcum/terms-and-conditions">Terms &amp; Conditions</Link></li>
              <li><Link href="/global-santcum/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/global-santcum/cookies-policy">Cookies Policy</Link></li>
              <li><Link href="/global-santcum/legal">All Legal &amp; Policies &rarr;</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">&copy; 2026 The Global Sanctum. All rights reserved.</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/theglobalsanctum/" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61577706717526" target="_blank" rel="noopener" aria-label="Facebook">Facebook</a>
            <a href="https://www.linkedin.com/company/the-global-sanctum/" target="_blank" rel="noopener" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
