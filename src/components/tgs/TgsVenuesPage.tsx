"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import TgsNavDrawer from "@/components/tgs/TgsNavDrawer";

const styles = `
:root {
    --warm-cream: #F7F5F1; --warm-white: #FDFCF9; --white: #FFFFFF;
    --charcoal: #313131; --warm-charcoal: #3A3A3A;
    --charcoal-80: rgba(49,49,49,0.8);
    --charcoal-70: rgba(49,49,49,0.7); --charcoal-50: rgba(49,49,49,0.5);
    --charcoal-30: rgba(49,49,49,0.3); --charcoal-15: rgba(49,49,49,0.15);
    --charcoal-10: rgba(49,49,49,0.1);
    --charcoal-08: rgba(49,49,49,0.08); --charcoal-05: rgba(49,49,49,0.05);
    --gold: #C4A265; --gold-accent: #C4A265; --gold-dark: #7A644F;
    --canyon-clay: #7A644F;
    --mist: #8B8B8B; --light-rule: #E0D8CC;
    --font-serif: 'Cormorant Garamond', Georgia, serif; --font-sans: 'Montserrat', sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--font-sans); color: var(--charcoal); background: var(--warm-white); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
img { max-width: 100%; height: auto; display: block; }

/* ═══════════════════════════════════════════════════
   SKIP TO CONTENT (accessibility)
   ═══════════════════════════════════════════════════ */
.skip-to-content {
    position: absolute; top: -100px; left: 16px;
    background: var(--charcoal); color: var(--warm-white);
    padding: 12px 20px; z-index: 9999;
    font-family: var(--font-sans); font-size: 13px; font-weight: 500;
    letter-spacing: 0.05em; text-transform: uppercase;
    transition: top 0.2s; text-decoration: none;
}
.skip-to-content:focus { top: 16px; outline: 2px solid var(--gold-accent); }

/* ═══════════════════════════════════════════════════
   NAVIGATION (matches wellness experiences mockup)
   Transparent over the dark hero image, fades to opaque
   cream after scroll. Matches all other public-facing pages.
   ═══════════════════════════════════════════════════ */
.nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 24px 48px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0) 100%); backdrop-filter: blur(4px);
    border-bottom: 1px solid transparent;
    transition: background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease;
}
.nav.scrolled {
    background: rgba(253, 252, 249, 0.95);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--charcoal-08);
}
.nav-inner {
    max-width: 1400px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    gap: 24px;
    padding: 0;
    height: auto;
}
.nav-left { display: flex; align-items: center; gap: 14px; cursor: pointer; }
.nav-hamburger {
    display: flex; flex-direction: column; gap: 4px;
    background: transparent; border: none; padding: 0;
    cursor: pointer; color: inherit;
    width: auto; height: auto; justify-content: initial;
}
.nav-hamburger:focus-visible { outline: 2px solid var(--gold-accent); outline-offset: 4px; }
.nav-hamburger span {
    width: 22px; height: 1px; background: var(--white);
    transition: background 0.3s, transform 0.3s, opacity 0.3s, width 0.3s;
    display: block;
}
.nav.scrolled .nav-hamburger span { background: var(--charcoal); }
.nav-hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
.nav-hamburger.active span:nth-child(2) { opacity: 0; }
.nav-hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }
.nav-menu-label {
    font-family: var(--font-sans); font-size: 11px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--white); transition: color 0.3s;
}
.nav.scrolled .nav-menu-label { color: var(--charcoal); }
.nav-logo-area {
    display: flex; align-items: center; gap: 14px;
    color: var(--white); transition: color 0.3s;
    text-decoration: none;
}
.nav.scrolled .nav-logo-area { color: var(--charcoal); }
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
    color: inherit;
}
.nav-right { width: 80px; }

/* ═══════════════════════════════════════════════════
   DRAWER (matches wellness experiences mockup)
   ═══════════════════════════════════════════════════ */
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

/* HERO */
.hero { position: relative; height: 55vh; min-height: 420px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: var(--charcoal); }
.hero-image { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.45) 100%), url('/tgs-images/Oriental%20Building%20Nordic%20Filter.png'); background-size: cover; background-position: center; }
.hero-content { position: relative; z-index: 2; text-align: center; max-width: 800px; padding: 0 40px; }
.hero-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.7); margin-bottom: 16px; }
.hero-title { font-family: var(--font-serif); font-size: 58px; font-weight: 300; color: var(--white); line-height: 1.1; margin-bottom: 16px; }
.hero-subtitle { font-size: 15px; font-weight: 300; color: rgba(255,255,255,0.8); line-height: 1.6; max-width: 520px; margin: 0 auto; }

/* TYPE TOGGLE + FILTER BAR combined */
.filter-section { background: var(--white); border-bottom: 1px solid var(--charcoal-08); position: sticky; top: 88px; z-index: 90; }
.filter-section-inner { max-width: 1400px; margin: 0 auto; }

/* ─────── PROGRESSIVE SEARCH BAR ─────── */
.search-bar-wrap { background: var(--warm-cream); padding: 24px 40px; }
.search-bar-inner { max-width: 1400px; margin: 0 auto; }
.progressive-bar-row { display: flex; align-items: stretch; gap: 0; }
.progressive-bar { flex: 1; background: var(--white); border: 1.5px solid var(--charcoal-15); display: flex; align-items: stretch; transition: box-shadow 0.3s; }
.progressive-bar:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
.progressive-segment { flex: 1; padding: 16px 22px; cursor: pointer; transition: background 0.2s; position: relative; border-right: 1px solid var(--charcoal-08); display: flex; flex-direction: column; justify-content: center; min-width: 0; }
.progressive-segment:last-child { border-right: none; }
.progressive-segment:hover { background: var(--warm-cream); }
.progressive-segment.active { background: var(--warm-cream); }
.progressive-segment.active::after { content: ''; position: absolute; bottom: -1.5px; left: 0; right: 0; height: 2px; background: var(--gold-dark); }
.progressive-segment-label { font-size: 9px; font-weight: 600; letter-spacing: 1.8px; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 5px; white-space: nowrap; }
.progressive-segment-value { font-size: 13px; color: var(--charcoal); font-weight: 400; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.progressive-segment-value.placeholder { color: var(--charcoal-50); }
.progressive-search-btn { background: var(--charcoal); color: var(--white); border: none; padding: 0 32px; font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; transition: background 0.3s; flex-shrink: 0; white-space: nowrap; }
.progressive-search-btn:hover { background: var(--gold-dark); }

/* PROGRESSIVE PANEL (drops from any segment) */
.progressive-panel { background: var(--white); border: 1px solid var(--charcoal-15); margin-top: 12px; padding: 24px 28px; max-width: 600px; box-shadow: 0 12px 40px rgba(0,0,0,0.08); display: none; }
.progressive-panel.open { display: block; }
.progressive-panel-title { font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 14px; }
.progressive-search-input { width: 100%; padding: 14px 18px; border: 1px solid var(--charcoal-15); background: var(--warm-cream); font-family: var(--font-sans); font-size: 14px; color: var(--charcoal); margin-bottom: 16px; outline: none; transition: border-color 0.2s; }
.progressive-search-input:focus { border-color: var(--gold-dark); background: var(--white); }
.progressive-search-input::placeholder { color: var(--charcoal-50); }
.panel-suggestions-label { font-size: 9px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--charcoal-50); margin-bottom: 10px; }
.panel-suggestion { padding: 11px 14px; cursor: pointer; transition: background 0.2s; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--charcoal-08); }
.panel-suggestion:last-child { border-bottom: none; }
.panel-suggestion:hover { background: var(--warm-cream); }
.panel-suggestion-icon { width: 32px; height: 32px; background: var(--warm-cream); display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 12px; flex-shrink: 0; color: var(--gold-dark); }
.panel-suggestion-content { flex: 1; }
.panel-suggestion-name { font-size: 13px; font-weight: 500; color: var(--charcoal); margin-bottom: 2px; }
.panel-suggestion-detail { font-size: 11px; color: var(--charcoal-50); }
.panel-suggestion-count { font-size: 11px; color: var(--charcoal-50); margin-left: 12px; }
.panel-options-list { display: flex; flex-direction: column; gap: 8px; }
.panel-option { padding: 14px 16px; border: 1px solid var(--charcoal-15); background: var(--white); cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: all 0.2s; }
.panel-option:hover { border-color: var(--charcoal-30); background: var(--warm-cream); }
.panel-option.selected { background: var(--warm-cream); border-color: var(--gold-dark); }
.panel-option-content { flex: 1; }
.panel-option-name { font-size: 13px; font-weight: 500; color: var(--charcoal); margin-bottom: 3px; }
.panel-option-desc { font-size: 11px; color: var(--charcoal-50); line-height: 1.4; }
.panel-option-count { font-size: 11px; color: var(--charcoal-50); margin-left: 12px; flex-shrink: 0; }
.panel-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.panel-pill { padding: 10px 14px; border: 1px solid var(--charcoal-15); background: var(--white); font-size: 12px; color: var(--charcoal-70); cursor: pointer; text-align: center; transition: all 0.2s; }
.panel-pill:hover { border-color: var(--charcoal-30); color: var(--charcoal); }
.panel-pill.selected { background: var(--warm-cream); border-color: var(--gold-dark); color: var(--gold-dark); font-weight: 500; }
.panel-range { display: flex; align-items: center; gap: 14px; margin-bottom: 10px; }
.panel-range input[type="range"] { flex: 1; height: 4px; background: var(--charcoal-15); appearance: none; outline: none; }
.panel-range input[type="range"]::-webkit-slider-thumb { appearance: none; width: 18px; height: 18px; background: var(--gold-dark); cursor: pointer; }
.panel-range-label { font-size: 11px; color: var(--charcoal-50); margin-bottom: 14px; }
.panel-empty-state { padding: 24px; text-align: center; font-size: 12px; color: var(--charcoal-50); font-style: italic; line-height: 1.6; }

/* ─────── REFINE FURTHER CTA BAND ─────── */
.refine-band { background: var(--white); border-top: 1px solid var(--charcoal-08); border-bottom: 1px solid var(--charcoal-08); padding: 18px 40px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.refine-content { flex: 1; }
.refine-title { font-family: var(--font-serif); font-size: 22px; font-weight: 400; color: var(--charcoal); margin-bottom: 4px; }
.refine-title em { font-style: italic; color: var(--gold-dark); }
.refine-description { font-size: 12px; color: var(--charcoal-70); line-height: 1.5; }
.refine-description strong { color: var(--gold-dark); font-weight: 500; }
.refine-cta { background: var(--gold-dark); color: var(--white); border: none; padding: 14px 28px; font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: background 0.3s; flex-shrink: 0; }
.refine-cta:hover { background: var(--charcoal); }
.refine-badge { background: var(--white); color: var(--gold-dark); border-radius: 50%; width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 600; }
.modal-subsection { margin-bottom: 16px; padding: 16px; background: var(--warm-cream); border: 1px solid var(--charcoal-08); }
.modal-subsection-title { font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--charcoal-50); margin-bottom: 10px; }
.modal-subsection .modal-grid { margin: 0; }
.modal-modality-category { margin-bottom: 12px; }
.modal-modality-parent { font-size: 11px; font-weight: 600; color: var(--charcoal); letter-spacing: 0.5px; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid var(--charcoal-08); }
.modal-modality-children { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 4px; }
.modal-modality-child { padding: 6px 12px; border: 1px solid var(--charcoal-15); background: var(--white); font-size: 11px; color: var(--charcoal-70); cursor: pointer; transition: all 0.2s; }
.modal-modality-child:hover { border-color: var(--gold-dark); color: var(--gold-dark); }
.modal-modality-child.selected { background: var(--warm-cream); border-color: var(--gold-dark); color: var(--gold-dark); font-weight: 500; }
.packages-cta { border: 1px solid var(--gold-dark); padding: 16px 20px; margin-top: 8px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.packages-cta-text { font-size: 12px; font-weight: 300; color: var(--charcoal-70); line-height: 1.5; }
.packages-cta-text strong { color: var(--gold-dark); font-weight: 500; display: block; margin-bottom: 2px; }
.packages-cta-btn { font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold-dark); border: 1px solid var(--gold-dark); padding: 8px 16px; background: transparent; cursor: pointer; white-space: nowrap; transition: all 0.2s; }
.packages-cta-btn:hover { background: var(--gold-dark); color: var(--white); }

/* RESULTS */
.results-header { max-width: 1400px; margin: 0 auto; padding: 28px 40px 0; display: flex; align-items: center; justify-content: space-between; }
.results-count { font-size: 13px; color: var(--charcoal-50); }
.results-count strong { color: var(--charcoal); font-weight: 500; }
.results-sort { display: flex; align-items: center; gap: 8px; }
.results-sort label { font-size: 12px; color: var(--charcoal-50); }
.results-sort select { font-family: var(--font-sans); font-size: 12px; font-weight: 500; color: var(--charcoal); border: 1px solid var(--charcoal-15); padding: 6px 12px; background: var(--white); cursor: pointer; }

/* VENUE CARDS */
/* TIER LISTING SYSTEM */
.listings-wrap { max-width: 1400px; margin: 0 auto; padding: 28px 40px 60px; }
.tier-section { margin-bottom: 56px; }
.tier-section:last-child { margin-bottom: 0; }
.tier-section-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid var(--charcoal-08); }
.tier-section-label { font-family: var(--font-sans); font-size: 10px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: var(--charcoal-50); margin: 0; }
.tier-section-count { font-family: var(--font-sans); font-size: 11px; font-weight: 400; color: var(--charcoal-50); }

/* Editorial Pick Badge - independent of tier, can overlay any card */
.editorial-pick { position: absolute; top: 16px; right: 16px; background: var(--charcoal); color: var(--white); padding: 6px 14px; font-size: 9px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; z-index: 4; }

/* Reusable card primitives */
.placeholder-img { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 1px; text-transform: uppercase; }
.p1 { background: linear-gradient(135deg, #5a7a6a, #8ba89a); } .p2 { background: linear-gradient(135deg, #7a8b6a, #a2b094); } .p3 { background: linear-gradient(135deg, #6a7a8b, #94a2b0); } .p4 { background: linear-gradient(135deg, #8b7a6a, #b0a294); } .p5 { background: linear-gradient(135deg, #7a6a5a, #a89a8b); } .p6 { background: linear-gradient(135deg, #5a6a7a, #8b9aa8); } .p7 { background: linear-gradient(135deg, #6a8b7a, #94b0a2); } .p8 { background: linear-gradient(135deg, #8b6a7a, #b094a2); }

/* ─────── PREMIUM HORIZONTAL CARD ─────── */
.premium-grid { display: flex; flex-direction: column; gap: 24px; }
.premium-card { background: var(--white); border: 1px solid var(--charcoal-08); display: grid; grid-template-columns: 46% 1fr; min-height: 380px; transition: box-shadow 0.3s, transform 0.3s; cursor: pointer; position: relative; overflow: hidden; }
.premium-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.08); transform: translateY(-2px); }
.premium-card-image { position: relative; overflow: hidden; }
.premium-card-image .placeholder-img { font-size: 12px; }
.premium-card-body { padding: 36px 40px; display: flex; flex-direction: column; }
.premium-card-eyebrow { font-family: var(--font-sans); font-size: 10px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 14px; }
.premium-card-eyebrow .type-primary { font-weight: 600; }
.premium-card-eyebrow .eyebrow-divider { color: var(--charcoal-30); margin: 0 6px; }
.premium-card-eyebrow .type-secondary { font-weight: 400; text-transform: none; letter-spacing: 0.5px; font-size: 11px; color: var(--charcoal-70); }
.premium-card-name { font-family: var(--font-serif); font-size: 32px; font-weight: 400; color: var(--charcoal); line-height: 1.15; margin-bottom: 6px; }
.premium-card-location { font-size: 12px; color: var(--charcoal-50); margin-bottom: 18px; }
.premium-card-editor-note { font-family: var(--font-serif); font-style: italic; font-size: 14px; line-height: 1.6; color: var(--charcoal-70); margin-bottom: 18px; padding-left: 14px; border-left: 2px solid var(--gold-accent); }
.premium-card-excerpt { font-size: 13px; font-weight: 300; color: var(--charcoal-70); line-height: 1.7; margin-bottom: 20px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.premium-card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 22px; }
.premium-card-tag { padding: 5px 12px; background: var(--warm-cream); font-size: 10px; font-weight: 500; letter-spacing: 0.5px; color: var(--gold-dark); }
.premium-card-meta { display: flex; align-items: center; justify-content: space-between; padding-top: 18px; border-top: 1px solid var(--charcoal-08); margin-top: auto; }
.premium-card-rating { font-size: 14px; font-weight: 500; }
.premium-card-rating .star { color: var(--gold-dark); }
.premium-card-rating .count { font-weight: 400; color: var(--charcoal-50); font-size: 12px; }
.premium-card-price { font-size: 13px; color: var(--charcoal-70); }
.premium-card-price strong { font-size: 20px; font-weight: 500; color: var(--charcoal); }

/* ─────── FEATURED HORIZONTAL CARD ─────── */
.featured-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.featured-card { background: var(--white); border: 1px solid var(--charcoal-08); display: grid; grid-template-columns: 44% 1fr; min-height: 340px; transition: box-shadow 0.3s, transform 0.3s; cursor: pointer; position: relative; overflow: hidden; }
.featured-card:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.07); transform: translateY(-3px); }
.featured-card-image { position: relative; overflow: hidden; }
.featured-card-body { padding: 28px 30px; display: flex; flex-direction: column; }
.featured-card-eyebrow { font-family: var(--font-sans); font-size: 10px; font-weight: 500; letter-spacing: 1.8px; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 10px; }
.featured-card-eyebrow .type-primary { font-weight: 600; }
.featured-card-eyebrow .eyebrow-divider { color: var(--charcoal-30); margin: 0 5px; }
.featured-card-eyebrow .type-secondary { font-weight: 400; text-transform: none; letter-spacing: 0.4px; font-size: 11px; color: var(--charcoal-70); }
.featured-card-name { font-family: var(--font-serif); font-size: 26px; font-weight: 400; color: var(--charcoal); line-height: 1.2; margin-bottom: 5px; }
.featured-card-location { font-size: 12px; color: var(--charcoal-50); margin-bottom: 16px; }
.featured-card-excerpt { font-size: 13px; font-weight: 300; color: var(--charcoal-70); line-height: 1.6; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.featured-card-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 18px; }
.featured-card-tag { padding: 4px 10px; background: var(--warm-cream); font-size: 10px; font-weight: 500; letter-spacing: 0.5px; color: var(--gold-dark); }
.featured-card-meta { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid var(--charcoal-08); margin-top: auto; }
.featured-card-rating { font-size: 13px; font-weight: 500; }
.featured-card-rating .star { color: var(--gold-dark); }
.featured-card-rating .count { font-weight: 400; color: var(--charcoal-50); font-size: 12px; }
.featured-card-price { font-size: 13px; color: var(--charcoal-70); }
.featured-card-price strong { font-size: 18px; font-weight: 500; color: var(--charcoal); }

/* ─────── STANDARD CARD ─────── */
.standard-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.standard-card { background: var(--white); border: 1px solid var(--charcoal-08); transition: box-shadow 0.3s, transform 0.3s; cursor: pointer; position: relative; }
.standard-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.06); transform: translateY(-3px); }
.standard-card-image { position: relative; height: 190px; overflow: hidden; }
.standard-card-body { padding: 18px 20px 20px; }
.standard-card-eyebrow { font-family: var(--font-sans); font-size: 9px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 6px; }
.standard-card-eyebrow .type-primary { font-weight: 600; }
.standard-card-eyebrow .eyebrow-divider { color: var(--charcoal-30); margin: 0 4px; }
.standard-card-eyebrow .type-secondary { font-weight: 400; text-transform: none; letter-spacing: 0.3px; font-size: 10px; color: var(--charcoal-70); }
.standard-card-location { font-size: 11px; color: var(--charcoal-50); margin-bottom: 10px; }
.standard-card-name { font-family: var(--font-serif); font-size: 20px; font-weight: 400; color: var(--charcoal); line-height: 1.25; margin-bottom: 6px; }
.standard-card-subtitle { font-size: 11px; color: var(--charcoal-50); margin-bottom: 12px; }
.standard-card-excerpt { font-size: 12px; font-weight: 300; color: var(--charcoal-70); line-height: 1.6; margin-bottom: 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.standard-card-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 14px; }
.standard-card-tag { padding: 3px 9px; background: var(--warm-cream); font-size: 10px; font-weight: 500; letter-spacing: 0.5px; color: var(--gold-dark); }
.standard-card-meta { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid var(--charcoal-08); }
.standard-card-rating { font-size: 12px; font-weight: 500; }
.standard-card-rating .star { color: var(--gold-dark); }
.standard-card-rating .count { font-weight: 400; color: var(--charcoal-50); font-size: 11px; }
.standard-card-price { font-size: 12px; color: var(--charcoal-70); }
.standard-card-price strong { font-size: 16px; font-weight: 500; color: var(--charcoal); }

/* ─────── ESSENTIALS COMPACT CARD ─────── */
.essentials-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.essentials-card { background: var(--white); border: 1px solid var(--charcoal-08); transition: box-shadow 0.3s; cursor: pointer; position: relative; }
.essentials-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
.essentials-card-image { position: relative; height: 160px; overflow: hidden; }
.essentials-card-body { padding: 14px 16px 16px; }
.essentials-card-eyebrow { font-family: var(--font-sans); font-size: 9px; font-weight: 600; letter-spacing: 1.4px; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 4px; }
.essentials-card-location { font-size: 10px; color: var(--charcoal-50); margin-bottom: 6px; }
.essentials-card-name { font-family: var(--font-serif); font-size: 17px; font-weight: 400; color: var(--charcoal); line-height: 1.25; margin-bottom: 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.essentials-card-meta { display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid var(--charcoal-08); }
.essentials-card-rating { font-size: 11px; font-weight: 500; }
.essentials-card-rating .star { color: var(--gold-dark); }
.essentials-card-price { font-size: 11px; color: var(--charcoal-70); }
.essentials-card-price strong { font-size: 14px; font-weight: 500; color: var(--charcoal); }

/* MODAL */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 2000; opacity: 0; visibility: hidden; transition: opacity 0.3s, visibility 0.3s; display: flex; align-items: center; justify-content: center; }
.modal-overlay.open { opacity: 1; visibility: visible; }
.modal { background: var(--white); width: 90%; max-width: 860px; max-height: 85vh; overflow: hidden; display: flex; flex-direction: column; transform: translateY(20px); transition: transform 0.3s; }
.modal-overlay.open .modal { transform: translateY(0); }
.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 24px 32px; border-bottom: 1px solid var(--charcoal-08); gap: 16px; }
.modal-header-left { display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 0; }
.modal-back { display: inline-flex; align-items: center; gap: 6px; background: none; border: none; padding: 0; font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold-dark); cursor: pointer; transition: color 0.2s; align-self: flex-start; }
.modal-back:hover { color: var(--charcoal); }
.modal-title { font-family: var(--font-serif); font-size: 28px; font-weight: 400; color: var(--charcoal); }
.modal-close { width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--charcoal-15); background: var(--white); cursor: pointer; font-size: 20px; color: var(--charcoal-50); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.modal-close:hover { border-color: var(--charcoal); color: var(--charcoal); }
.modal-body { padding: 32px; overflow-y: auto; flex: 1; }
.modal-section { margin-bottom: 32px; }
.modal-section:last-child { margin-bottom: 0; }
.modal-section-title { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 16px; }
.modal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.modal-option { padding: 10px 14px; border: 1px solid var(--charcoal-15); background: var(--white); font-size: 12px; font-weight: 400; color: var(--charcoal-70); cursor: pointer; transition: all 0.2s; text-align: center; }
.modal-option:hover { border-color: var(--charcoal-30); color: var(--charcoal); }
.modal-option.selected { background: var(--warm-cream); border-color: var(--gold-dark); color: var(--gold-dark); font-weight: 500; }
.opt-count { color: var(--charcoal-50); font-weight: 400; font-size: 11px; margin-left: 2px; }
.modal-option:hover .opt-count, .modal-modality-child:hover .opt-count { color: var(--gold-dark); }
.modal-option.selected .opt-count, .modal-modality-child.selected .opt-count { color: var(--gold-dark); }
.modal-results-summary { background: var(--warm-cream); border-left: 3px solid var(--gold-accent); padding: 16px 20px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; }
.modal-results-count { font-family: var(--font-serif); font-size: 16px; color: var(--charcoal); }
.modal-results-count strong { font-size: 22px; font-weight: 500; color: var(--gold-dark); margin-right: 6px; }
.modal-results-hint { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: var(--charcoal-50); }
.modal-range { display: flex; align-items: center; gap: 16px; }
.modal-range input[type="range"] { flex: 1; -webkit-appearance: none; height: 4px; background: var(--charcoal-15); outline: none; }
.modal-range input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: var(--gold-dark); cursor: pointer; border: 3px solid var(--white); box-shadow: 0 2px 6px rgba(0,0,0,0.15); }
.modal-range-value { font-size: 14px; font-weight: 500; color: var(--charcoal); min-width: 60px; text-align: right; }
.modal-range-labels { display: flex; justify-content: space-between; font-size: 12px; color: var(--charcoal-50); margin-top: 4px; }
.modal-footer { padding: 20px 32px; border-top: 1px solid var(--charcoal-08); display: flex; align-items: center; justify-content: space-between; }
.modal-clear { font-size: 13px; color: var(--charcoal-50); background: none; border: none; cursor: pointer; text-decoration: underline; }
.modal-clear:hover { color: var(--charcoal); }
.modal-apply { background: var(--charcoal); color: var(--white); font-size: 12px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; padding: 14px 36px; border: none; cursor: pointer; }
.modal-apply:hover { background: var(--gold-dark); }

/* ─────── VENUE TYPE CHOOSER OVERLAY ─────── */
.chooser-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 2100; opacity: 0; visibility: hidden; transition: opacity 0.3s, visibility 0.3s; display: flex; align-items: center; justify-content: center; padding: 20px; }
.chooser-overlay.open { opacity: 1; visibility: visible; }
.chooser-dialog { background: var(--white); width: 100%; max-width: 540px; padding: 40px; transform: translateY(20px); transition: transform 0.3s; }
.chooser-overlay.open .chooser-dialog { transform: translateY(0); }
.chooser-header { text-align: center; margin-bottom: 28px; }
.chooser-eyebrow { font-size: 10px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 12px; }
.chooser-title { font-family: var(--font-serif); font-size: 28px; font-weight: 400; color: var(--charcoal); line-height: 1.2; margin-bottom: 10px; }
.chooser-title em { font-style: italic; color: var(--gold-dark); }
.chooser-subtitle { font-size: 13px; color: var(--charcoal-70); line-height: 1.5; max-width: 380px; margin: 0 auto; }
.chooser-options { display: flex; flex-direction: column; gap: 12px; margin-bottom: 22px; }
.chooser-option { padding: 22px 24px; border: 1.5px solid var(--charcoal-15); background: var(--white); cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 18px; text-align: left; width: 100%; position: relative; }
.chooser-option:hover { border-color: var(--gold-dark); background: var(--warm-cream); }
.chooser-option.current { border-color: var(--gold-dark); background: var(--warm-cream); }
.chooser-option.current .chooser-option-icon { background: var(--gold-dark); color: var(--white); }
.chooser-current-tag { position: absolute; top: 12px; right: 14px; font-family: var(--font-sans); font-size: 9px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold-dark); }
.chooser-option-icon { width: 48px; height: 48px; background: var(--warm-cream); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--gold-dark); font-size: 22px; }
.chooser-option:hover .chooser-option-icon { background: var(--gold-dark); color: var(--white); }
.chooser-option-content { flex: 1; }
.chooser-option-name { font-family: var(--font-serif); font-size: 20px; font-weight: 400; color: var(--charcoal); margin-bottom: 4px; }
.chooser-option-desc { font-size: 12px; color: var(--charcoal-70); line-height: 1.5; }
.chooser-option-count { font-size: 11px; color: var(--charcoal-50); margin-top: 4px; letter-spacing: 0.5px; }
.chooser-cancel { background: none; border: none; font-size: 12px; color: var(--charcoal-50); cursor: pointer; text-decoration: underline; display: block; margin: 0 auto; padding: 10px; transition: color 0.2s; }
.chooser-cancel:hover { color: var(--charcoal); }
.chooser-close { position: absolute; top: 16px; right: 18px; background: none; border: none; font-size: 22px; color: var(--charcoal-50); cursor: pointer; line-height: 1; }
.chooser-close:hover { color: var(--charcoal); }
.chooser-dialog { position: relative; }

/* CTA */
.cta-section { background: var(--warm-cream); padding: 80px 40px; }
.cta-inner { max-width: 800px; margin: 0 auto; text-align: center; }
.cta-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 16px; }
.cta-title { font-family: var(--font-serif); font-size: 42px; font-weight: 300; color: var(--charcoal); line-height: 1.2; margin-bottom: 16px; }
.cta-title em { font-style: italic; }
.cta-text { font-size: 14px; font-weight: 300; color: var(--charcoal-70); line-height: 1.7; max-width: 560px; margin: 0 auto 32px; }
.cta-btn { display: inline-block; background: var(--charcoal); color: var(--white); font-size: 11px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; padding: 16px 40px; text-decoration: none; }
.cta-btn:hover { background: var(--gold-dark); }

/* ═══════════════════════════════════════════════════
   FOOTER (matches wellness experiences mockup)
   ═══════════════════════════════════════════════════ */
.footer { background: var(--charcoal); color: rgba(255,255,255,0.7); padding: 80px 48px 40px; }
.footer-inner { max-width: 1400px; margin: 0 auto; }
.footer-grid { display: grid; grid-template-columns: 1.5fr repeat(4, 1fr); gap: 48px; margin-bottom: 0; padding-bottom: 56px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.footer-brand-block { display: flex; flex-direction: column; gap: 20px; }
.footer-logo-placeholder { width: 72px; height: 72px; border: 2px dashed var(--gold-accent); border-radius: 10px; display: flex; align-items: center; justify-content: center; background: rgba(196, 162, 101, 0.08); flex-shrink: 0; }
.footer-logo-placeholder span { font-family: var(--font-sans); font-size: 8px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: var(--gold-accent); text-align: center; line-height: 1.3; padding: 4px; }
.footer-brand-name { font-family: var(--font-serif); font-size: 18px; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.9); }
.footer-brand-tagline { font-family: var(--font-serif); font-size: 15px; font-weight: 400; line-height: 1.7; color: rgba(255,255,255,0.5); font-style: normal; }
.footer-brand-meta { font-family: var(--font-sans); font-size: 11px; font-weight: 400; line-height: 1.7; letter-spacing: 0.05em; color: rgba(255,255,255,0.35); }
.footer-col-title { font-family: var(--font-sans); font-size: 10px; font-weight: 500; letter-spacing: 0.20em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 24px; }
.footer-links { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 14px; }
.footer-links a { font-family: var(--font-serif); font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.6); transition: color 0.3s; text-decoration: none; letter-spacing: 0; }
.footer-links a:hover { color: rgba(255,255,255,0.95); }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 32px; }
.footer-copyright { font-family: var(--font-sans); font-size: 12px; font-weight: 400; letter-spacing: 0.05em; color: rgba(255,255,255,0.3); }
.footer-social { display: flex; gap: 24px; }
.footer-social a { font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.4); transition: color 0.3s ease; text-decoration: none; }
.footer-social a:hover { color: var(--gold-accent); }

/* ═══════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════ */
@media (max-width: 1280px) {
    .progressive-segment { padding: 14px 16px; }
    .progressive-segment-value { font-size: 12px; }
}

@media (max-width: 1100px) {
    .footer-grid { grid-template-columns: 1fr 1fr 1fr; gap: 40px; row-gap: 48px; }
    .footer-brand-block { grid-column: 1 / -1; }
}

@media (max-width: 1024px) {
    .hero-title { font-size: 44px; }
    .modal-grid { grid-template-columns: repeat(2, 1fr); }

    .premium-card { grid-template-columns: 1fr; }
    .premium-card-image { height: 320px; }
    .featured-grid { grid-template-columns: 1fr 1fr; }
    .standard-grid { grid-template-columns: repeat(2, 1fr); }
    .essentials-grid { grid-template-columns: repeat(3, 1fr); }

    .progressive-bar-row { flex-wrap: wrap; gap: 12px; }
    .progressive-bar { width: 100%; flex-wrap: wrap; }
    .progressive-segment { min-width: 33.333%; flex: 1 1 33.333%; border-bottom: 1px solid var(--charcoal-08); }
    .progressive-segment:nth-child(3n) { border-right: none; }
    .progressive-segment:nth-last-child(-n+2) { border-bottom: none; }
    .progressive-search-btn { width: 100%; padding: 14px; }

    .refine-band { flex-direction: column; gap: 14px; align-items: flex-start; }
    .refine-cta { width: 100%; justify-content: center; }
}

@media (max-width: 768px) {
    .nav { padding: 18px 24px; }
    .nav-menu-label { display: none; }
    .drawer { width: 100%; max-width: 100vw; }
    .filter-section { top: 76px; }

    .hero { height: 45vh; min-height: 360px; }
    .hero-title { font-size: 34px; }
    .hero-content { padding: 0 24px; }

    .listings-wrap { padding: 20px 20px 40px; }
    .results-header { padding-left: 20px; padding-right: 20px; }
    .search-bar-wrap { padding: 16px 20px; }
    .refine-band { padding: 16px 20px; }

    .modal { width: 95%; max-height: 90vh; }
    .modal-grid { grid-template-columns: repeat(2, 1fr); }
    .modal-body { padding: 24px; }

    .premium-card { grid-template-columns: 1fr; }
    .premium-card-image { height: 260px; }
    .premium-card-body { padding: 24px 22px; }
    .premium-card-name { font-size: 26px; }
    .featured-grid, .standard-grid, .essentials-grid { grid-template-columns: 1fr; gap: 20px; }
    .featured-card { grid-template-columns: 1fr; }
    .featured-card-image { height: 220px; }
    .standard-card-image { height: 200px; }
    .essentials-card { display: flex; flex-direction: row; }
    .essentials-card-image { width: 130px; height: auto; flex-shrink: 0; }
    .essentials-card-body { flex: 1; padding: 14px 16px; }

    .progressive-segment { min-width: 50%; flex: 1 1 50%; }
    .progressive-segment:nth-child(3n) { border-right: 1px solid var(--charcoal-08); }
    .progressive-segment:nth-child(2n) { border-right: none; }
    .progressive-panel { max-width: 100%; }

    .footer { padding: 60px 24px 24px; }
    .footer-grid { grid-template-columns: 1fr; gap: 32px; padding-bottom: 32px; }
}

@media (max-width: 600px) {
    .footer-bottom { flex-direction: column; gap: 20px; align-items: flex-start; padding-top: 28px; }
    .footer-social { gap: 20px; }
}
`;

const heroTitles: Record<string, string> = { all: "Explore Our Venues", retreat: "Retreat Venues", wellness: "Wellness Venues" };
const heroSubs: Record<string, string> = {
  all: "Retreat centres, wellness resorts, thermal sanctuaries, and sacred spaces — curated from around the world.",
  retreat: "Curated sanctuaries designed for transformation and deep practice. From mountain lodges to coastal estates, chosen with intention for retreat hosting excellence.",
  wellness: "Exceptional wellness destinations for restoration and renewal. From thermal sanctuaries to luxury wellness resorts, chosen with intention for authenticity.",
};
const refineDescriptions: Record<string, string> = {
  all: "Filter by retreat style, wellness modality, capacity, booking type, facilities, accessibility &amp; more — <strong>22 advanced filters</strong> available",
  retreat: "Filter by retreat style, capacity, booking type, facilities &amp; amenities — <strong>14 advanced filters</strong> for retreat venues",
  wellness: "Filter by wellness modality, booking type, facilities &amp; amenities — <strong>17 advanced filters</strong> for wellness venues",
};

const masterModalities = [
  { name: "Thermal &amp; Hydrotherapy", count: { all: 14, retreat: 4, wellness: 14 } },
  { name: "Yoga &amp; Movement", count: { all: 28, retreat: 22, wellness: 18 } },
  { name: "Breathwork", count: { all: 14, retreat: 11, wellness: 8 } },
  { name: "Sound &amp; Vibrational", count: { all: 17, retreat: 9, wellness: 14 } },
  { name: "Ayurveda", count: { all: 9, retreat: 4, wellness: 7 } },
  { name: "Body Therapies &amp; Bodywork", count: { all: 28, retreat: 11, wellness: 26 } },
  { name: "Meditation &amp; Mindfulness", count: { all: 24, retreat: 18, wellness: 14 } },
  { name: "Modern Wellness &amp; Recovery", count: { all: 16, retreat: 4, wellness: 16 } },
  { name: "Skin &amp; Aesthetic Wellness", count: { all: 12, retreat: 2, wellness: 12 } },
  { name: "Nature Immersion", count: { all: 11, retreat: 8, wellness: 5 } },
  { name: "Energy &amp; Esoteric", count: { all: 17, retreat: 6, wellness: 14 } },
  { name: "Indigenous &amp; Earth Traditions", count: { all: 7, retreat: 5, wellness: 4 } },
  { name: "Nutrition &amp; Cleansing", count: { all: 12, retreat: 7, wellness: 9 } },
  { name: "Plant Medicine &amp; Ceremony", count: { all: 5, retreat: 5, wellness: 3 } },
];

const priceConfig: Record<string, { label: string; max: number; default: number } | null> = {
  all: null,
  retreat: { label: "Per night, exclusive hire", max: 10000, default: 10000 },
  wellness: { label: "Per session / treatment", max: 500, default: 500 },
};

export default function TgsVenuesPage({
  initialType,
}: {
  initialType?: "retreat" | "wellness";
} = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const $ = (id: string) => root.querySelector<HTMLElement>("#" + CSS.escape(id));
    const $$ = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));

    const state = { currentType: "all", currentSetting: "", currentModality: "", activePanelSegment: null as string | null };

    function openProgressivePanel(segment: string, el: HTMLElement) {
      $$(".progressive-panel").forEach((p) => p.classList.remove("open"));
      $$(".progressive-segment").forEach((s) => s.classList.remove("active"));
      if (state.activePanelSegment === segment) {
        state.activePanelSegment = null;
        return;
      }
      el.classList.add("active");
      const panel = $("panel-" + segment);
      if (panel) {
        panel.classList.add("open");
        state.activePanelSegment = segment;
        const input = panel.querySelector<HTMLInputElement>('input[type="text"]');
        if (input) setTimeout(() => input.focus(), 50);
      }
    }

    function closeAllPanels() {
      $$(".progressive-panel").forEach((p) => p.classList.remove("open"));
      $$(".progressive-segment").forEach((s) => s.classList.remove("active"));
      state.activePanelSegment = null;
    }

    function selectWhere(value: string) {
      const seg = $("seg-where-value");
      if (seg) {
        seg.textContent = value;
        seg.classList.remove("placeholder");
      }
      closeAllPanels();
    }

    function selectVenueType(type: string) {
      state.currentType = type;
      const seg = $("seg-venuetype-value");
      const labels: Record<string, string> = { all: "All venues", retreat: "Retreat Venue", wellness: "Wellness Venue" };
      if (seg) {
        seg.textContent = labels[type];
        seg.classList.remove("placeholder");
      }
      $$("#panel-venueType .panel-option").forEach((o) => o.classList.remove("selected"));
      const opts = $$("#panel-venueType .panel-option");
      if (type === "all" && opts[0]) opts[0].classList.add("selected");
      if (type === "retreat" && opts[1]) opts[1].classList.add("selected");
      if (type === "wellness" && opts[2]) opts[2].classList.add("selected");
      let count = 0;
      $$(".premium-card, .featured-card, .standard-card, .essentials-card").forEach((card) => {
        const show = type === "all" || card.dataset.type === type || card.dataset.type === "both";
        card.style.display = show ? "" : "none";
        if (show) count++;
      });
      $$(".tier-section").forEach((section) => {
        const visibleCards = section.querySelectorAll<HTMLElement>(".premium-card, .featured-card, .standard-card, .essentials-card");
        let hasVisible = false;
        visibleCards.forEach((c) => {
          if (c.style.display !== "none") hasVisible = true;
        });
        section.style.display = hasVisible ? "" : "none";
      });
      const ce = $("resultCount");
      if (ce) ce.textContent = String(count);
      const te = $("heroTitle");
      const se = $("heroSubtitle");
      if (te) te.textContent = heroTitles[type];
      if (se) se.textContent = heroSubs[type];
      const rd = $("refineDescription");
      if (rd) rd.innerHTML = refineDescriptions[type];
      rebuildModalityPanel();
      rebuildPricePanel();
      state.currentModality = "";
      const sm = $("seg-modality-value");
      if (sm) {
        sm.textContent = "All modalities";
        sm.classList.add("placeholder");
      }
      const sp = $("seg-price-value");
      if (sp) {
        sp.textContent = type === "all" ? "Any price" : type === "retreat" ? "Up to $10,000/night" : "Up to $500/session";
        sp.classList.add("placeholder");
      }
      closeAllPanels();
      updateBadge();
    }

    function selectSetting(value: string, el: HTMLElement) {
      $$("#panel-setting .panel-pill").forEach((p) => p.classList.remove("selected"));
      el.classList.add("selected");
      state.currentSetting = value;
      const labels: Record<string, string> = { coastal: "Coastal & Beach", mountain: "Mountain & Alpine", forest: "Forest & Jungle", urban: "Urban", island: "Island & Tropical", countryside: "Countryside", thermal: "Thermal / Geothermal", lakeside: "Lakeside" };
      const seg = $("seg-setting-value");
      if (seg) {
        seg.textContent = labels[value] || "All settings";
        seg.classList.remove("placeholder");
      }
      closeAllPanels();
    }

    function selectModality(value: string, el: HTMLElement) {
      $$("#panel-modality .panel-pill").forEach((p) => p.classList.remove("selected"));
      el.classList.add("selected");
      state.currentModality = value;
      const seg = $("seg-modality-value");
      if (seg) {
        seg.textContent = value;
        seg.classList.remove("placeholder");
      }
      closeAllPanels();
    }

    function rebuildModalityPanel() {
      const grid = $("modalityPanelGrid");
      const title = $("modalityPanelTitle");
      const hint = $("modalityPanelHint");
      const emptyState = $("modalityPanelEmpty");
      if (!grid) return;

      if (state.currentType === "all") {
        if (title) title.textContent = "Modality";
        if (hint) hint.textContent = "";
        if (emptyState) emptyState.style.display = "";
        grid.style.display = "none";
        return;
      }

      if (emptyState) emptyState.style.display = "none";
      grid.style.display = "";

      const titles: Record<string, string> = {
        retreat: "Modality — Suitable for Hosting",
        wellness: "Modality — Experience Type",
      };
      const hints: Record<string, string> = {
        retreat: "Categories the venue is equipped to host. Same taxonomy as our Wellness Experiences page.",
        wellness: "Experiences the venue offers as bookable services. Same taxonomy as our Wellness Experiences page.",
      };
      if (title) title.textContent = titles[state.currentType];
      if (hint) hint.textContent = hints[state.currentType];

      grid.innerHTML = "";
      masterModalities.forEach((opt) => {
        const count = opt.count[state.currentType as "all" | "retreat" | "wellness"];
        if (count === 0) return;
        const pill = document.createElement("div");
        pill.className = "panel-pill";
        pill.innerHTML = `${opt.name} <span class="opt-count">(${count})</span>`;
        pill.onclick = function () {
          selectModality(opt.name, this as HTMLElement);
        };
        grid.appendChild(pill);
      });
    }

    function rebuildPricePanel() {
      const empty = $("pricePanelEmpty");
      const controls = $("pricePanelControls");
      const label = $("pricePanelLabel");
      const cfg = priceConfig[state.currentType];
      if (!cfg) {
        if (empty) empty.style.display = "";
        if (controls) controls.style.display = "none";
        if (label) label.textContent = "Choose a venue type first to see relevant pricing.";
      } else {
        if (empty) empty.style.display = "none";
        if (controls) controls.style.display = "";
        if (label) label.textContent = cfg.label;
        const slider = $("priceSlider") as HTMLInputElement | null;
        const maxLabel = $("priceMaxLabel");
        if (slider) {
          slider.max = String(cfg.max);
          slider.value = String(cfg.default);
        }
        if (maxLabel) maxLabel.textContent = "$" + cfg.max.toLocaleString() + "+";
      }
    }

    function openModal() {
      openChooser();
    }

    function openChooser() {
      const c = $("chooserOverlay");
      if (!c) return;
      const options = Array.from(c.querySelectorAll<HTMLElement>(".chooser-option"));
      options.forEach((o) => {
        o.classList.remove("current");
        const existingTag = o.querySelector(".chooser-current-tag");
        if (existingTag) existingTag.remove();
      });
      if (state.currentType === "retreat" && options[0]) {
        options[0].classList.add("current");
        const tag = document.createElement("span");
        tag.className = "chooser-current-tag";
        tag.textContent = "Currently active";
        options[0].appendChild(tag);
      } else if (state.currentType === "wellness" && options[1]) {
        options[1].classList.add("current");
        const tag = document.createElement("span");
        tag.className = "chooser-current-tag";
        tag.textContent = "Currently active";
        options[1].appendChild(tag);
      }
      c.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeChooser() {
      const c = $("chooserOverlay");
      if (c) c.classList.remove("open");
      document.body.style.overflow = "";
    }

    function chooseAndOpenModal(type: string) {
      selectVenueType(type);
      closeChooser();
      setTimeout(() => {
        const id = type === "wellness" ? "modalWellness" : "modalRetreat";
        const m = $(id);
        if (m) {
          m.classList.add("open");
          document.body.style.overflow = "hidden";
        }
      }, 100);
    }

    function backToChooser() {
      $$(".modal-overlay").forEach((m) => m.classList.remove("open"));
      setTimeout(() => {
        openChooser();
      }, 100);
    }

    function closeModal() {
      $$(".modal-overlay").forEach((m) => m.classList.remove("open"));
      document.body.style.overflow = "";
      updateBadge();
    }

    function updateBadge() {
      const id = state.currentType === "wellness" ? "modalWellness" : "modalRetreat";
      const modal = $(id);
      const badge = $("filterBadge");
      if (!modal || !badge) return;
      const n = modal.querySelectorAll(".modal-option.selected,.modal-modality-child.selected").length;
      badge.textContent = String(n);
      badge.style.display = n > 0 ? "inline-flex" : "none";
    }

    // ── Wire up delegated handlers on the progressive segments ──
    const segmentHandlers: Array<[HTMLElement, () => void]> = [];
    $$(".progressive-segment").forEach((seg) => {
      const segment = seg.dataset.segment;
      if (!segment) return;
      const handler = () => openProgressivePanel(segment, seg);
      seg.addEventListener("click", handler);
      segmentHandlers.push([seg, handler]);
    });

    // Where suggestions
    const whereHandlers: Array<[HTMLElement, () => void]> = [];
    $$("#panel-where .panel-suggestion").forEach((sug) => {
      const value = sug.dataset.where;
      if (!value) return;
      const handler = () => selectWhere(value);
      sug.addEventListener("click", handler);
      whereHandlers.push([sug, handler]);
    });

    // Venue type options
    const venueTypeHandlers: Array<[HTMLElement, () => void]> = [];
    $$("#panel-venueType .panel-option").forEach((opt) => {
      const type = opt.dataset.venueType;
      if (!type) return;
      const handler = () => selectVenueType(type);
      opt.addEventListener("click", handler);
      venueTypeHandlers.push([opt, handler]);
    });

    // Setting pills
    const settingHandlers: Array<[HTMLElement, () => void]> = [];
    $$("#panel-setting .panel-pill").forEach((pill) => {
      const value = pill.dataset.setting;
      if (!value) return;
      const handler = () => selectSetting(value, pill);
      pill.addEventListener("click", handler);
      settingHandlers.push([pill, handler]);
    });

    // Chooser
    const closeButtons = $$(".chooser-close, .chooser-cancel");
    const closeChooserHandlers: Array<[HTMLElement, () => void]> = [];
    closeButtons.forEach((b) => {
      const handler = () => closeChooser();
      b.addEventListener("click", handler);
      closeChooserHandlers.push([b, handler]);
    });
    const chooserOptionHandlers: Array<[HTMLElement, () => void]> = [];
    $$(".chooser-option").forEach((o) => {
      const type = o.dataset.chooserType;
      if (!type) return;
      const handler = () => chooseAndOpenModal(type);
      o.addEventListener("click", handler);
      chooserOptionHandlers.push([o, handler]);
    });

    // Modal back / close / apply buttons
    const modalBtnHandlers: Array<[HTMLElement, () => void]> = [];
    $$(".modal-back").forEach((b) => {
      const handler = () => backToChooser();
      b.addEventListener("click", handler);
      modalBtnHandlers.push([b, handler]);
    });
    $$(".modal-close, .modal-apply").forEach((b) => {
      const handler = () => closeModal();
      b.addEventListener("click", handler);
      modalBtnHandlers.push([b, handler]);
    });

    // Initialise panels
    rebuildModalityPanel();
    rebuildPricePanel();

    // Refine Further button
    const btn = $("advancedSearchBtn");
    const refineHandler = () => openModal();
    if (btn) btn.addEventListener("click", refineHandler);

    // Close on overlay click
    const overlayHandlers: Array<[HTMLElement, (e: Event) => void]> = [];
    $$(".modal-overlay").forEach((o) => {
      const handler = (e: Event) => {
        if (e.target === o) closeModal();
      };
      o.addEventListener("click", handler);
      overlayHandlers.push([o, handler]);
    });

    const chooser = $("chooserOverlay");
    const chooserClickHandler = (e: Event) => {
      if (e.target === chooser) closeChooser();
    };
    if (chooser) chooser.addEventListener("click", chooserClickHandler);

    // Modal option pills
    const optionHandlers: Array<[HTMLElement, () => void]> = [];
    $$(".modal-option").forEach((o) => {
      const handler = () => {
        o.classList.toggle("selected");
        updateBadge();
      };
      o.addEventListener("click", handler);
      optionHandlers.push([o, handler]);
    });

    // Modality child pills
    const childHandlers: Array<[HTMLElement, () => void]> = [];
    $$(".modal-modality-child").forEach((c) => {
      const handler = () => {
        c.classList.toggle("selected");
        updateBadge();
      };
      c.addEventListener("click", handler);
      childHandlers.push([c, handler]);
    });

    // Modality parent expand/collapse
    const parentHandlers: Array<[HTMLElement, () => void]> = [];
    $$(".modal-modality-parent").forEach((p) => {
      p.style.cursor = "pointer";
      const arr = document.createElement("span");
      arr.innerHTML = " &#9660;";
      arr.style.cssText = "font-size:9px;color:var(--gold-dark);margin-left:4px;transition:transform 0.2s;display:inline-block;";
      p.appendChild(arr);
      const children = p.nextElementSibling as HTMLElement | null;
      if (children) children.style.display = "none";
      arr.style.transform = "rotate(-90deg)";
      const handler = () => {
        if (!children) return;
        const open = children.style.display !== "none";
        children.style.display = open ? "none" : "flex";
        arr.style.transform = open ? "rotate(-90deg)" : "rotate(0deg)";
      };
      p.addEventListener("click", handler);
      parentHandlers.push([p, handler]);
    });

    // Range sliders inside modals
    const modalRangeHandlers: Array<[HTMLInputElement, () => void]> = [];
    $$(".modal-overlay input[type=\"range\"]").forEach((sEl) => {
      const s = sEl as HTMLInputElement;
      const handler = function () {
        const v = parseInt(s.value);
        const isMax = v >= parseInt(s.max);
        const txt = "$" + v.toLocaleString() + (isMax ? "+" : "");
        const el = s.closest(".modal-range")?.querySelector<HTMLElement>(".modal-range-value");
        if (el) el.textContent = txt;
      };
      s.addEventListener("input", handler);
      modalRangeHandlers.push([s, handler]);
    });

    // Bar price slider
    const priceSlider = $("priceSlider") as HTMLInputElement | null;
    const priceSliderHandler = function () {
      if (!priceSlider) return;
      const v = parseInt(priceSlider.value);
      const isMax = v >= parseInt(priceSlider.max);
      const txt = "$" + v.toLocaleString() + (isMax ? "+" : "");
      const lbl = $("priceMaxLabel");
      if (lbl) lbl.textContent = txt;
      const seg = $("seg-price-value");
      if (seg) {
        seg.classList.remove("placeholder");
        const unit = state.currentType === "retreat" ? "/night" : "/session";
        seg.textContent = (isMax ? "Up to " : "Up to ") + txt + unit;
      }
    };
    if (priceSlider) priceSlider.addEventListener("input", priceSliderHandler);

    // Where input
    const whereInput = $("whereInput") as HTMLInputElement | null;
    const whereInputHandler = function (e: KeyboardEvent) {
      if (!whereInput) return;
      if (e.key === "Enter" && whereInput.value.trim()) {
        selectWhere(whereInput.value.trim());
      }
    };
    if (whereInput) whereInput.addEventListener("keypress", whereInputHandler);

    // Clear filters
    const clearHandlers: Array<[HTMLElement, () => void]> = [];
    $$(".modal-clear").forEach((b) => {
      const handler = () => {
        const modal = b.closest(".modal");
        if (!modal) return;
        modal.querySelectorAll(".modal-option.selected,.modal-modality-child.selected").forEach((o) => o.classList.remove("selected"));
        modal.querySelectorAll<HTMLInputElement>('input[type="range"]').forEach((r) => {
          r.value = r.max;
          r.dispatchEvent(new Event("input"));
        });
        modal.querySelectorAll("select").forEach((s) => ((s as HTMLSelectElement).selectedIndex = 0));
        updateBadge();
      };
      b.addEventListener("click", handler);
      clearHandlers.push([b, handler]);
    });

    // Packages enquire
    const packagesHandlers: Array<[HTMLElement, () => void]> = [];
    $$(".packages-cta-btn").forEach((b) => {
      const handler = () => {
        closeModal();
        router.push("/global-santcum/contact");
      };
      b.addEventListener("click", handler);
      packagesHandlers.push([b, handler]);
    });

    // Click outside progressive panel closes it
    const documentClickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && !target.closest(".progressive-panel") && !target.closest(".progressive-segment")) {
        closeAllPanels();
      }
    };
    document.addEventListener("click", documentClickHandler);

    // ── Card navigation ──
    function detailTarget(card: HTMLElement | null): string | null {
      if (!card) return null;
      const type = card.getAttribute("data-type");
      if (type === "retreat") return "/global-santcum/retreat-venues/santosa-retreat";
      if (type === "wellness") return "/global-santcum/wellness-venues/serenity-day-spa";
      return null;
    }
    const cardClickHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target && target.closest ? target.closest("a, button, input, select, textarea") : null;
      if (interactive) return;
      const card = target && target.closest ? target.closest<HTMLElement>(".premium-card, .featured-card, .standard-card, .essentials-card") : null;
      const dest = detailTarget(card);
      if (!dest) return;
      event.preventDefault();
      router.push(dest);
    };
    document.addEventListener("click", cardClickHandler);

    const cardKeydownHandlers: Array<[HTMLElement, (e: KeyboardEvent) => void]> = [];
    $$(".premium-card, .featured-card, .standard-card, .essentials-card").forEach((card) => {
      if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex", "0");
      if (!card.hasAttribute("role")) card.setAttribute("role", "link");
      const dest = detailTarget(card);
      if (dest && !card.hasAttribute("aria-label")) {
        const name = card.querySelector(".essentials-card-name") || card.querySelector("h3");
        card.setAttribute("aria-label", "Open " + (name ? (name.textContent || "").trim() : "venue") + " detail page");
      }
      const handler = (event: KeyboardEvent) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        const keyboardTarget = detailTarget(card);
        if (!keyboardTarget) return;
        event.preventDefault();
        router.push(keyboardTarget);
      };
      card.addEventListener("keydown", handler);
      cardKeydownHandlers.push([card, handler]);
    });

    // ── Apply initial type from prop or ?type= query param ──
    const resolvedType = initialType ?? searchParams.get("type");
    if (resolvedType === "retreat" || resolvedType === "wellness") {
      selectVenueType(resolvedType);
    }

    return () => {
      segmentHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      whereHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      venueTypeHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      settingHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      closeChooserHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      chooserOptionHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      modalBtnHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      if (btn) btn.removeEventListener("click", refineHandler);
      overlayHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      if (chooser) chooser.removeEventListener("click", chooserClickHandler);
      optionHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      childHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      parentHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      modalRangeHandlers.forEach(([el, h]) => el.removeEventListener("input", h));
      if (priceSlider) priceSlider.removeEventListener("input", priceSliderHandler);
      if (whereInput) whereInput.removeEventListener("keypress", whereInputHandler as EventListener);
      clearHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      packagesHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      document.removeEventListener("click", documentClickHandler);
      document.removeEventListener("click", cardClickHandler);
      cardKeydownHandlers.forEach(([el, h]) => el.removeEventListener("keydown", h));
    };
  }, [router, searchParams, initialType]);

  return (
    <div ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <a className="skip-to-content" href="#main-content">Skip to main content</a>

      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="nav" aria-label="Primary">
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
              <span /><span /><span />
            </button>
            <span className="nav-menu-label" aria-hidden="true">Menu</span>
          </div>
          <Link href="/global-santcum/web" className="nav-logo-area" aria-label="The Global Sanctum — home">
            <span className="nav-logo" aria-hidden="true" />
            <span className="nav-brand-text">The Global Sanctum</span>
          </Link>
          <div className="nav-right" />
        </div>
      </nav>

      <TgsNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main id="main-content" role="main">

        <section className="hero">
          <div className="hero-image" />
          <div className="hero-content">
            <div className="hero-eyebrow">Discover</div>
            <h1 className="hero-title" id="heroTitle">Explore Our Venues</h1>
            <p className="hero-subtitle" id="heroSubtitle">Retreat centres, wellness resorts, thermal sanctuaries, and sacred spaces — curated from around the world.</p>
          </div>
        </section>

        <div className="filter-section">
          <div className="filter-section-inner">
            <div className="search-bar-wrap">
              <div className="search-bar-inner">
                <div className="progressive-bar-row">
                  <div className="progressive-bar">
                    <div className="progressive-segment" data-segment="where">
                      <div className="progressive-segment-label">Where</div>
                      <div className="progressive-segment-value placeholder" id="seg-where-value">Anywhere</div>
                    </div>
                    <div className="progressive-segment" data-segment="venueType">
                      <div className="progressive-segment-label">Venue Type</div>
                      <div className="progressive-segment-value" id="seg-venuetype-value">All venues</div>
                    </div>
                    <div className="progressive-segment" data-segment="setting">
                      <div className="progressive-segment-label">Setting</div>
                      <div className="progressive-segment-value placeholder" id="seg-setting-value">All settings</div>
                    </div>
                    <div className="progressive-segment" data-segment="modality">
                      <div className="progressive-segment-label">Modality</div>
                      <div className="progressive-segment-value placeholder" id="seg-modality-value">All modalities</div>
                    </div>
                    <div className="progressive-segment" data-segment="price">
                      <div className="progressive-segment-label">Price</div>
                      <div className="progressive-segment-value placeholder" id="seg-price-value">Any price</div>
                    </div>
                  </div>
                  <button className="progressive-search-btn">Search</button>
                </div>

                <div className="progressive-panel" id="panel-where">
                  <div className="progressive-panel-title">Where to?</div>
                  <input type="text" className="progressive-search-input" placeholder="Search a country, region, city, or neighbourhood" id="whereInput" />
                  <div className="panel-suggestions-label">Popular destinations</div>
                  <div className="panel-suggestion" data-where="Bali, Indonesia">
                    <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                      <div className="panel-suggestion-icon">◉</div>
                      <div className="panel-suggestion-content">
                        <div className="panel-suggestion-name">Bali</div>
                        <div className="panel-suggestion-detail">Indonesia · Asia-Pacific</div>
                      </div>
                    </div>
                    <div className="panel-suggestion-count">3 venues</div>
                  </div>
                  <div className="panel-suggestion" data-where="Lisbon, Portugal">
                    <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                      <div className="panel-suggestion-icon">◉</div>
                      <div className="panel-suggestion-content">
                        <div className="panel-suggestion-name">Lisbon</div>
                        <div className="panel-suggestion-detail">City · Portugal · Europe</div>
                      </div>
                    </div>
                    <div className="panel-suggestion-count">2 venues</div>
                  </div>
                  <div className="panel-suggestion" data-where="Algarve, Portugal">
                    <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                      <div className="panel-suggestion-icon">◉</div>
                      <div className="panel-suggestion-content">
                        <div className="panel-suggestion-name">Algarve</div>
                        <div className="panel-suggestion-detail">Region · Portugal · Europe</div>
                      </div>
                    </div>
                    <div className="panel-suggestion-count">1 venue</div>
                  </div>
                  <div className="panel-suggestion" data-where="Reykjavík, Iceland">
                    <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                      <div className="panel-suggestion-icon">◉</div>
                      <div className="panel-suggestion-content">
                        <div className="panel-suggestion-name">Reykjavík</div>
                        <div className="panel-suggestion-detail">City · Iceland · Europe</div>
                      </div>
                    </div>
                    <div className="panel-suggestion-count">1 venue</div>
                  </div>
                </div>

                <div className="progressive-panel" id="panel-venueType">
                  <div className="progressive-panel-title">What kind of venue?</div>
                  <div className="panel-options-list">
                    <div className="panel-option selected" data-venue-type="all">
                      <div className="panel-option-content">
                        <div className="panel-option-name">All Venues</div>
                        <div className="panel-option-desc">Show every retreat and wellness venue on the platform</div>
                      </div>
                      <div className="panel-option-count">11 venues</div>
                    </div>
                    <div className="panel-option" data-venue-type="retreat">
                      <div className="panel-option-content">
                        <div className="panel-option-name">Retreat Venue</div>
                        <div className="panel-option-desc">Dedicated retreat centres, private estates, eco lodges, and hinterland properties for hosting transformational experiences</div>
                      </div>
                      <div className="panel-option-count">5 venues</div>
                    </div>
                    <div className="panel-option" data-venue-type="wellness">
                      <div className="panel-option-content">
                        <div className="panel-option-name">Wellness Venue</div>
                        <div className="panel-option-desc">Day spas, hammams, geothermal lagoons, thermal sanctuaries, and wellness resorts for restoration and renewal</div>
                      </div>
                      <div className="panel-option-count">6 venues</div>
                    </div>
                  </div>
                </div>

                <div className="progressive-panel" id="panel-setting">
                  <div className="progressive-panel-title">Setting</div>
                  <div className="panel-grid">
                    <div className="panel-pill" data-setting="coastal">Coastal &amp; Beach <span className="opt-count">(2)</span></div>
                    <div className="panel-pill" data-setting="mountain">Mountain &amp; Alpine <span className="opt-count">(1)</span></div>
                    <div className="panel-pill" data-setting="forest">Forest &amp; Jungle <span className="opt-count">(2)</span></div>
                    <div className="panel-pill" data-setting="urban">Urban <span className="opt-count">(1)</span></div>
                    <div className="panel-pill" data-setting="island">Island &amp; Tropical <span className="opt-count">(2)</span></div>
                    <div className="panel-pill" data-setting="countryside">Countryside <span className="opt-count">(1)</span></div>
                    <div className="panel-pill" data-setting="thermal">Thermal / Geothermal <span className="opt-count">(2)</span></div>
                    <div className="panel-pill" data-setting="lakeside">Lakeside <span className="opt-count">(0)</span></div>
                  </div>
                </div>

                <div className="progressive-panel" id="panel-modality">
                  <div className="progressive-panel-title" id="modalityPanelTitle">Modality</div>
                  <p className="panel-range-label" id="modalityPanelHint" />
                  <div className="panel-empty-state" id="modalityPanelEmpty">
                    Modality filtering depends on whether you&apos;re seeking a retreat venue or a wellness venue.<br />Choose a venue type to filter by modality.
                  </div>
                  <div className="panel-grid" id="modalityPanelGrid" />
                </div>

                <div className="progressive-panel" id="panel-price">
                  <div className="progressive-panel-title" id="pricePanelTitle">Price Range</div>
                  <p className="panel-range-label" id="pricePanelLabel">Choose a venue type first to see relevant pricing.</p>
                  <div className="panel-empty-state" id="pricePanelEmpty">
                    Price ranges differ between retreat venues (per night, exclusive hire)<br />and wellness venues (per session). Select a venue type to begin.
                  </div>
                  <div id="pricePanelControls" style={{ display: "none" }}>
                    <div className="panel-range">
                      <span style={{ fontSize: "12px", color: "var(--charcoal-50)" }}>$0</span>
                      <input type="range" min="0" max="10000" defaultValue="10000" id="priceSlider" />
                      <span style={{ fontSize: "12px", color: "var(--charcoal)", fontWeight: 500 }} id="priceMaxLabel">$10,000+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="refine-band">
              <div className="refine-content">
                <div className="refine-title">Search <em>beyond the surface</em></div>
                <div className="refine-description" id="refineDescription">Filter by retreat style, wellness modality, capacity, booking type, facilities, accessibility &amp; more — <strong>22 advanced filters</strong> available</div>
              </div>
              <button className="refine-cta" id="advancedSearchBtn">
                Refine Further → <span className="refine-badge" id="filterBadge" style={{ display: "none" }}>0</span>
              </button>
            </div>
          </div>
        </div>

        <div className="results-header">
          <div className="results-count">Showing <strong id="resultCount">11</strong> venues worldwide</div>
          <div className="results-sort">
            <label>Sort by</label>
            <select id="sortSelect"><option>Recommended</option><option>Highest Rated</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Newest Listed</option></select>
          </div>
        </div>

        <div className="listings-wrap">

          <section className="tier-section">
            <div className="tier-section-header">
              <h2 className="tier-section-label">Premium Sanctuaries</h2>
              <div className="tier-section-count">2 venues</div>
            </div>
            <div className="premium-grid">

              <article className="premium-card" data-type="retreat" data-tier="premium">
                <div className="premium-card-image">
                  <div className="placeholder-img p1">Hero Photo</div>
                  <div className="editorial-pick">Editor&apos;s Pick</div>
                </div>
                <div className="premium-card-body">
                  <div className="premium-card-eyebrow"><span className="type-primary">Retreat Venue</span><span className="eyebrow-divider">·</span><span className="type-secondary">Dedicated Retreat Centre</span></div>
                  <h3 className="premium-card-name">Santosa Retreat Centre</h3>
                  <div className="premium-card-location">Ubud, Bali, Indonesia · Sleeps 24</div>
                  <p className="premium-card-editor-note">A purpose-built sanctuary where every architectural choice serves the retreat experience. Two yoga shalas open to rice terraces; meals are grown on-site.</p>
                  <p className="premium-card-excerpt">Surrounded by working rice terraces and ancient banyan trees, with dedicated meditation pavilion and full ceremonial space.</p>
                  <div className="premium-card-tags">
                    <span className="premium-card-tag">Yoga Shala ×2</span>
                    <span className="premium-card-tag">Meditation Pavilion</span>
                    <span className="premium-card-tag">Farm-to-Table</span>
                    <span className="premium-card-tag">Ceremony Space</span>
                    <span className="premium-card-tag">Exclusive Use</span>
                  </div>
                  <div className="premium-card-meta">
                    <div className="premium-card-rating"><span className="star">★</span> 4.9 <span className="count">(142 reviews)</span></div>
                    <div className="premium-card-price">From <strong>$185</strong> /person/night</div>
                  </div>
                </div>
              </article>

              <article className="premium-card" data-type="wellness" data-tier="premium">
                <div className="premium-card-image">
                  <div className="placeholder-img p3">Hero Photo</div>
                </div>
                <div className="premium-card-body">
                  <div className="premium-card-eyebrow"><span className="type-primary">Wellness Venue</span><span className="eyebrow-divider">·</span><span className="type-secondary">Thermal Spa &amp; Hotel</span></div>
                  <h3 className="premium-card-name">Therme Vals</h3>
                  <div className="premium-card-location">Vals, Switzerland · Day &amp; Overnight</div>
                  <p className="premium-card-editor-note">A masterpiece of thermal architecture by Peter Zumthor. The stone, water, and silence work in concert — restoration becomes inevitable.</p>
                  <p className="premium-card-excerpt">Natural hot springs and minimalist quartzite stone in the Swiss Alps. Multiple thermal baths and treatment rooms.</p>
                  <div className="premium-card-tags">
                    <span className="premium-card-tag">Thermal Bathing</span>
                    <span className="premium-card-tag">Hydrotherapy</span>
                    <span className="premium-card-tag">Steam &amp; Sauna</span>
                    <span className="premium-card-tag">Treatment Rooms</span>
                    <span className="premium-card-tag">Overnight Stays</span>
                  </div>
                  <div className="premium-card-meta">
                    <div className="premium-card-rating"><span className="star">★</span> 4.9 <span className="count">(127 reviews)</span></div>
                    <div className="premium-card-price">From <strong>CHF 65</strong> /entry</div>
                  </div>
                </div>
              </article>

            </div>
          </section>

          <section className="tier-section">
            <div className="tier-section-header">
              <h2 className="tier-section-label">Featured Venues</h2>
              <div className="tier-section-count">2 venues</div>
            </div>
            <div className="featured-grid">

              <article className="featured-card" data-type="retreat" data-tier="featured">
                <div className="featured-card-image">
                  <div className="placeholder-img p2">Venue Photo</div>
                </div>
                <div className="featured-card-body">
                  <div className="featured-card-eyebrow"><span className="type-primary">Retreat Venue</span><span className="eyebrow-divider">·</span><span className="type-secondary">Private Estate</span></div>
                  <h3 className="featured-card-name">Casa Terra Sagrada</h3>
                  <div className="featured-card-location">Algarve, Portugal · Sleeps 18</div>
                  <p className="featured-card-excerpt">A beautifully restored farmhouse on twelve acres of olive groves. Indoor yoga hall, outdoor ceremony space, saltwater infinity pool, and full-time on-site team.</p>
                  <div className="featured-card-tags">
                    <span className="featured-card-tag">Exclusive Use</span>
                    <span className="featured-card-tag">Ceremony Space</span>
                    <span className="featured-card-tag">Farm-to-Table</span>
                  </div>
                  <div className="featured-card-meta">
                    <div className="featured-card-rating"><span className="star">★</span> 4.9 <span className="count">(76 reviews)</span></div>
                    <div className="featured-card-price">From <strong>€4,200</strong> /week</div>
                  </div>
                </div>
              </article>

              <article className="featured-card" data-type="wellness" data-tier="featured">
                <div className="featured-card-image">
                  <div className="placeholder-img p4">Venue Photo</div>
                  <div className="editorial-pick">New Listing</div>
                </div>
                <div className="featured-card-body">
                  <div className="featured-card-eyebrow"><span className="type-primary">Wellness Venue</span><span className="eyebrow-divider">·</span><span className="type-secondary">Destination Resort</span></div>
                  <h3 className="featured-card-name">Kamalaya Wellness Sanctuary</h3>
                  <div className="featured-card-location">Koh Samui, Thailand · Sleeps 40</div>
                  <p className="featured-card-excerpt">Award-winning holistic wellness sanctuary combining traditional healing therapies with modern science. Hosts retreats and individual guests.</p>
                  <div className="featured-card-tags">
                    <span className="featured-card-tag">Holistic Wellness</span>
                    <span className="featured-card-tag">Detox</span>
                    <span className="featured-card-tag">Yoga</span>
                  </div>
                  <div className="featured-card-meta">
                    <div className="featured-card-rating"><span className="star">★</span> 4.9 <span className="count">(214 reviews)</span></div>
                    <div className="featured-card-price">From <strong>$380</strong> /night</div>
                  </div>
                </div>
              </article>

            </div>
          </section>

          <section className="tier-section">
            <div className="tier-section-header">
              <h2 className="tier-section-label">Standard Listings</h2>
              <div className="tier-section-count">3 venues</div>
            </div>
            <div className="standard-grid">

              <article className="standard-card" data-type="wellness" data-tier="standard">
                <div className="standard-card-image">
                  <div className="placeholder-img p5">Venue Photo</div>
                </div>
                <div className="standard-card-body">
                  <div className="standard-card-eyebrow"><span className="type-primary">Wellness Venue</span><span className="eyebrow-divider">·</span><span className="type-secondary">Hammam &amp; Day Spa</span></div>
                  <h3 className="standard-card-name">Le Bain Bleu</h3>
                  <div className="standard-card-location">Marrakech, Morocco</div>
                  <p className="standard-card-excerpt">A traditional Moroccan hammam in a restored 17th-century riad, offering ancient bathing rituals and artisan bodywork.</p>
                  <div className="standard-card-tags">
                    <span className="standard-card-tag">Hammam</span>
                    <span className="standard-card-tag">Steam</span>
                    <span className="standard-card-tag">Bodywork</span>
                  </div>
                  <div className="standard-card-meta">
                    <div className="standard-card-rating"><span className="star">★</span> 4.7 <span className="count">(63)</span></div>
                    <div className="standard-card-price">From <strong>MAD 800</strong> /session</div>
                  </div>
                </div>
              </article>

              <article className="standard-card" data-type="retreat" data-tier="standard">
                <div className="standard-card-image">
                  <div className="placeholder-img p6">Venue Photo</div>
                </div>
                <div className="standard-card-body">
                  <div className="standard-card-eyebrow"><span className="type-primary">Retreat Venue</span><span className="eyebrow-divider">·</span><span className="type-secondary">Hinterland Property</span></div>
                  <h3 className="standard-card-name">The Sanctuary at Bangalow</h3>
                  <div className="standard-card-location">Byron Bay, Australia · Sleeps 30</div>
                  <p className="standard-card-excerpt">Set among Byron&apos;s lush hinterland. Workshop space, heated pool, and bush walking trails on the property.</p>
                  <div className="standard-card-tags">
                    <span className="standard-card-tag">Workshops</span>
                    <span className="standard-card-tag">Nature</span>
                    <span className="standard-card-tag">Catering</span>
                  </div>
                  <div className="standard-card-meta">
                    <div className="standard-card-rating"><span className="star">★</span> 4.7 <span className="count">(58)</span></div>
                    <div className="standard-card-price">From <strong>A$165</strong> /night</div>
                  </div>
                </div>
              </article>

              <article className="standard-card" data-type="wellness" data-tier="standard">
                <div className="standard-card-image">
                  <div className="placeholder-img p7">Venue Photo</div>
                </div>
                <div className="standard-card-body">
                  <div className="standard-card-eyebrow"><span className="type-primary">Wellness Venue</span><span className="eyebrow-divider">·</span><span className="type-secondary">Geothermal Lagoon</span></div>
                  <h3 className="standard-card-name">Sky Lagoon</h3>
                  <div className="standard-card-location">Reykjavík, Iceland</div>
                  <p className="standard-card-excerpt">Oceanside geothermal lagoon with seven-step ritual: warm waters, cold plunge, sauna, mist, and steam.</p>
                  <div className="standard-card-tags">
                    <span className="standard-card-tag">Geothermal</span>
                    <span className="standard-card-tag">Cold Plunge</span>
                    <span className="standard-card-tag">Sauna</span>
                  </div>
                  <div className="standard-card-meta">
                    <div className="standard-card-rating"><span className="star">★</span> 4.8 <span className="count">(412)</span></div>
                    <div className="standard-card-price">From <strong>ISK 12,990</strong> /entry</div>
                  </div>
                </div>
              </article>

            </div>
          </section>

          <section className="tier-section">
            <div className="tier-section-header">
              <h2 className="tier-section-label">Essentials Listings</h2>
              <div className="tier-section-count">4 venues</div>
            </div>
            <div className="essentials-grid">

              <article className="essentials-card" data-type="retreat" data-tier="essentials">
                <div className="essentials-card-image">
                  <div className="placeholder-img p1">Venue</div>
                </div>
                <div className="essentials-card-body">
                  <div className="essentials-card-eyebrow">Retreat Venue</div>
                  <h3 className="essentials-card-name">Red Rock Retreat House</h3>
                  <div className="essentials-card-location">Sedona, USA</div>
                  <div className="essentials-card-meta">
                    <div className="essentials-card-rating"><span className="star">★</span> 4.6</div>
                    <div className="essentials-card-price"><strong>$140</strong></div>
                  </div>
                </div>
              </article>

              <article className="essentials-card" data-type="wellness" data-tier="essentials">
                <div className="essentials-card-image">
                  <div className="placeholder-img p3">Venue</div>
                </div>
                <div className="essentials-card-body">
                  <div className="essentials-card-eyebrow">Wellness Venue</div>
                  <h3 className="essentials-card-name">Banhos Termais Lisboa</h3>
                  <div className="essentials-card-location">Lisbon, Portugal</div>
                  <div className="essentials-card-meta">
                    <div className="essentials-card-rating"><span className="star">★</span> 4.5</div>
                    <div className="essentials-card-price"><strong>€45</strong></div>
                  </div>
                </div>
              </article>

              <article className="essentials-card" data-type="retreat" data-tier="essentials">
                <div className="essentials-card-image">
                  <div className="placeholder-img p5">Venue</div>
                </div>
                <div className="essentials-card-body">
                  <div className="essentials-card-eyebrow">Retreat Venue</div>
                  <h3 className="essentials-card-name">Tushita Meditation Centre</h3>
                  <div className="essentials-card-location">Dharamshala, India</div>
                  <div className="essentials-card-meta">
                    <div className="essentials-card-rating"><span className="star">★</span> 4.7</div>
                    <div className="essentials-card-price"><strong>₹2,200</strong></div>
                  </div>
                </div>
              </article>

              <article className="essentials-card" data-type="wellness" data-tier="essentials">
                <div className="essentials-card-image">
                  <div className="placeholder-img p7">Venue</div>
                </div>
                <div className="essentials-card-body">
                  <div className="essentials-card-eyebrow">Wellness Venue</div>
                  <h3 className="essentials-card-name">Casa Maya Day Spa</h3>
                  <div className="essentials-card-location">Tulum, Mexico</div>
                  <div className="essentials-card-meta">
                    <div className="essentials-card-rating"><span className="star">★</span> 4.4</div>
                    <div className="essentials-card-price"><strong>$85</strong></div>
                  </div>
                </div>
              </article>

            </div>
          </section>

        </div>

        <section className="cta-section">
          <div className="cta-inner">
            <div className="cta-eyebrow">Venue Partners</div>
            <h2 className="cta-title">Your space deserves to be <em>discovered</em></h2>
            <p className="cta-text">Join a curated collection of the world&apos;s most exceptional retreat and wellness venues. Transparent pricing, editorial-quality presentation, and a community of retreat hosts seeking spaces like yours.</p>
            <a href="#" className="cta-btn">List Your Venue</a>
          </div>
        </section>

      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand-block">
              <div className="footer-logo-placeholder">
                <span>Logo Goes Here</span>
              </div>
              <span className="footer-brand-name">The Global Sanctum</span>
              <p className="footer-brand-tagline">Curated wellness venues and transformational retreat spaces for retreat hosts, wellness guests, and seekers worldwide.</p>
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
                <li><Link href="/global-santcum/legal">All Legal &amp; Policies →</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">© 2026 The Global Sanctum. All rights reserved.</p>
            <div className="footer-social">
              <a href="https://www.instagram.com/theglobalsanctum/" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>
              <a href="https://www.facebook.com/profile.php?id=61577706717526" target="_blank" rel="noopener" aria-label="Facebook">Facebook</a>
              <a href="https://www.linkedin.com/company/the-global-sanctum/" target="_blank" rel="noopener" aria-label="LinkedIn">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>

      <div className="chooser-overlay" id="chooserOverlay">
        <div className="chooser-dialog">
          <button className="chooser-close">×</button>
          <div className="chooser-header">
            <div className="chooser-eyebrow">Refine Your Search</div>
            <h2 className="chooser-title">Refine <em>which venues</em>?</h2>
            <p className="chooser-subtitle">Each venue type has its own set of advanced filters. Choose to continue.</p>
          </div>
          <div className="chooser-options">
            <button className="chooser-option" data-chooser-type="retreat">
              <div className="chooser-option-icon">◐</div>
              <div className="chooser-option-content">
                <div className="chooser-option-name">Retreat Venues</div>
                <div className="chooser-option-desc">Filter by retreat style, capacity, booking type, facilities &amp; more</div>
                <div className="chooser-option-count">5 venues · 14 advanced filters</div>
              </div>
            </button>
            <button className="chooser-option" data-chooser-type="wellness">
              <div className="chooser-option-icon">◑</div>
              <div className="chooser-option-content">
                <div className="chooser-option-name">Wellness Venues</div>
                <div className="chooser-option-desc">Filter by wellness modality, booking type, facilities &amp; more</div>
                <div className="chooser-option-count">6 venues · 17 advanced filters</div>
              </div>
            </button>
          </div>
          <button className="chooser-cancel">Cancel</button>
        </div>
      </div>

      <div className="modal-overlay" id="modalRetreat">
        <div className="modal">
          <div className="modal-header"><div className="modal-header-left"><button className="modal-back">← Back to venue type</button><h2 className="modal-title">Advanced Search — Retreat Venues</h2></div><button className="modal-close">×</button></div>
          <div className="modal-body">

            <div className="modal-results-summary">
              <div className="modal-results-count"><strong>5</strong> retreat venues match your filters</div>
              <div className="modal-results-hint">Counts update as you select filters</div>
            </div>

            <div className="modal-section"><div className="modal-section-title">Retreat Venue Type</div><div className="modal-grid"><div className="modal-option">Dedicated Retreat Centre <span className="opt-count">(8)</span></div><div className="modal-option">Eco Lodge <span className="opt-count">(3)</span></div><div className="modal-option">Private Estate <span className="opt-count">(12)</span></div><div className="modal-option">Boutique Hotel <span className="opt-count">(6)</span></div><div className="modal-option">Mountain Lodge <span className="opt-count">(4)</span></div><div className="modal-option">Beach Property <span className="opt-count">(7)</span></div><div className="modal-option">Monastery / Ashram <span className="opt-count">(2)</span></div><div className="modal-option">Farm / Ranch <span className="opt-count">(5)</span></div><div className="modal-option">Villa <span className="opt-count">(9)</span></div><div className="modal-option">Castle / Historic <span className="opt-count">(3)</span></div><div className="modal-option">Glamping / Tented <span className="opt-count">(2)</span></div><div className="modal-option">Treehouse / Elevated <span className="opt-count">(1)</span></div></div></div>
            <div className="modal-section"><div className="modal-section-title">Modality — Suitable for Hosting</div><div className="modal-grid"><div className="modal-option">Yoga <span className="opt-count">(28)</span></div><div className="modal-option">Meditation <span className="opt-count">(24)</span></div><div className="modal-option">Breathwork <span className="opt-count">(14)</span></div><div className="modal-option">Sound Healing <span className="opt-count">(11)</span></div><div className="modal-option">Silent Retreat <span className="opt-count">(7)</span></div><div className="modal-option">Plant Medicine <span className="opt-count">(4)</span></div><div className="modal-option">Women&apos;s Retreat <span className="opt-count">(9)</span></div><div className="modal-option">Men&apos;s Retreat <span className="opt-count">(3)</span></div><div className="modal-option">Corporate <span className="opt-count">(6)</span></div><div className="modal-option">Teacher Training <span className="opt-count">(12)</span></div><div className="modal-option">Creative / Arts <span className="opt-count">(5)</span></div><div className="modal-option">Fitness &amp; Adventure <span className="opt-count">(8)</span></div><div className="modal-option">Couples <span className="opt-count">(7)</span></div><div className="modal-option">Leadership <span className="opt-count">(3)</span></div><div className="modal-option">Grief &amp; Healing <span className="opt-count">(2)</span></div></div></div>
            <div className="modal-section"><div className="modal-section-title">Capacity</div><div className="modal-grid"><div className="modal-option">Up to 10 <span className="opt-count">(6)</span></div><div className="modal-option">10 – 20 <span className="opt-count">(14)</span></div><div className="modal-option">20 – 30 <span className="opt-count">(11)</span></div><div className="modal-option">30 – 50 <span className="opt-count">(8)</span></div><div className="modal-option">50+ <span className="opt-count">(3)</span></div></div></div>
            <div className="modal-section"><div className="modal-section-title">Booking Type</div><div className="modal-grid"><div className="modal-option">Exclusive Hire <span className="opt-count">(22)</span></div><div className="modal-option">Shared Booking <span className="opt-count">(8)</span></div><div className="modal-option">Day Hire Only <span className="opt-count">(4)</span></div><div className="modal-option">Both Available <span className="opt-count">(14)</span></div></div></div>
            <div className="modal-section">
              <div className="modal-section-title">Venue Hire Price — Per Night</div>
              <div className="modal-range">
                <span style={{ fontSize: "12px", color: "var(--charcoal-50)" }}>$0</span>
                <input type="range" min="0" max="10000" defaultValue="10000" />
                <span className="modal-range-value">$10,000+</span>
              </div>
              <div className="modal-range-labels"><span>$0</span><span style={{ fontSize: "10px", color: "var(--charcoal-50)" }}>Total venue hire per night — inclusive of accommodation &amp; spaces</span><span>$10,000+</span></div>
            </div>
            <div className="modal-section"><div className="modal-section-title">Facilities &amp; Amenities</div><div className="modal-grid"><div className="modal-option">Yoga Shala <span className="opt-count">(26)</span></div><div className="modal-option">Ceremony Space <span className="opt-count">(14)</span></div><div className="modal-option">Treatment Rooms <span className="opt-count">(18)</span></div><div className="modal-option">Commercial Kitchen <span className="opt-count">(22)</span></div><div className="modal-option">Catering Available <span className="opt-count">(31)</span></div><div className="modal-option">Swimming Pool <span className="opt-count">(28)</span></div><div className="modal-option">Cold Plunge <span className="opt-count">(11)</span></div><div className="modal-option">Sauna <span className="opt-count">(17)</span></div><div className="modal-option">Meditation Hall <span className="opt-count">(19)</span></div><div className="modal-option">Outdoor Fire Pit <span className="opt-count">(23)</span></div><div className="modal-option">Accommodation On-Site <span className="opt-count">(38)</span></div><div className="modal-option">Workshop Space <span className="opt-count">(21)</span></div><div className="modal-option">AV Equipment <span className="opt-count">(15)</span></div><div className="modal-option">Parking <span className="opt-count">(35)</span></div><div className="modal-option">EV Charging <span className="opt-count">(9)</span></div><div className="modal-option">Pet Friendly <span className="opt-count">(7)</span></div><div className="modal-option">Child Friendly <span className="opt-count">(12)</span></div><div className="modal-option">Accessible <span className="opt-count">(16)</span></div></div></div>
          </div>
          <div className="modal-footer"><button className="modal-clear">Clear all filters</button><button className="modal-apply">Show 11 venues</button></div>
        </div>
      </div>

      <div className="modal-overlay" id="modalWellness">
        <div className="modal">
          <div className="modal-header"><div className="modal-header-left"><button className="modal-back">← Back to venue type</button><h2 className="modal-title">Advanced Search — Wellness Venues</h2></div><button className="modal-close">×</button></div>
          <div className="modal-body">

            <div className="modal-results-summary">
              <div className="modal-results-count"><strong>6</strong> wellness venues match your filters</div>
              <div className="modal-results-hint">Counts update as you select filters</div>
            </div>

            <div className="modal-section"><div className="modal-section-title">Wellness Venue Type</div><div className="modal-grid"><div className="modal-option">Day Spa <span className="opt-count">(1)</span></div><div className="modal-option">Destination Spa <span className="opt-count">(0)</span></div><div className="modal-option">Thermal Spa &amp; Hotel <span className="opt-count">(1)</span></div><div className="modal-option">Geothermal Lagoon <span className="opt-count">(1)</span></div><div className="modal-option">Traditional Onsen <span className="opt-count">(0)</span></div><div className="modal-option">Nordic Spa <span className="opt-count">(0)</span></div><div className="modal-option">Hammam &amp; Day Spa <span className="opt-count">(1)</span></div><div className="modal-option">Bathhouse <span className="opt-count">(1)</span></div><div className="modal-option">Wellness Hotel <span className="opt-count">(0)</span></div><div className="modal-option">Destination Resort <span className="opt-count">(1)</span></div><div className="modal-option">Ayurvedic Centre <span className="opt-count">(0)</span></div><div className="modal-option">Float Centre <span className="opt-count">(0)</span></div><div className="modal-option">Healing Centre <span className="opt-count">(0)</span></div><div className="modal-option">Medical Spa <span className="opt-count">(0)</span></div><div className="modal-option">Sound Healing Studio <span className="opt-count">(0)</span></div></div></div>

            <div className="modal-section"><div className="modal-section-title">Booking Type</div><div className="modal-grid"><div className="modal-option">Single Session / Drop-In <span className="opt-count">(4)</span></div><div className="modal-option">Day Pass / Day Spa Visit <span className="opt-count">(3)</span></div><div className="modal-option">Overnight Stay <span className="opt-count">(2)</span></div><div className="modal-option">Multi-Day Program <span className="opt-count">(1)</span></div><div className="modal-option">Series / Membership <span className="opt-count">(1)</span></div></div></div>

            <div className="modal-section">
              <div className="modal-section-title">Modality — Experience Type</div>
              <p style={{ fontSize: "11px", color: "var(--charcoal-50)", marginBottom: "16px", fontWeight: 300 }}>Select a modality category, then choose specific experience types. Click a category to expand.</p>
              <div className="modal-modality-category"><div className="modal-modality-parent">Thermal &amp; Hydrotherapy</div><div className="modal-modality-children"><div className="modal-modality-child">Contrast Therapy <span className="opt-count">(2)</span></div><div className="modal-modality-child">Floatation &amp; REST <span className="opt-count">(0)</span></div><div className="modal-modality-child">Thalassotherapy <span className="opt-count">(0)</span></div><div className="modal-modality-child">Steam &amp; Sauna Ritual <span className="opt-count">(3)</span></div><div className="modal-modality-child">Kneipp Therapy <span className="opt-count">(0)</span></div><div className="modal-modality-child">Hot Springs / Onsen <span className="opt-count">(2)</span></div><div className="modal-modality-child">Ice Bath <span className="opt-count">(1)</span></div><div className="modal-modality-child">Hydrotherapy Circuit <span className="opt-count">(2)</span></div></div></div>
              <div className="modal-modality-category"><div className="modal-modality-parent">Yoga &amp; Movement</div><div className="modal-modality-children"><div className="modal-modality-child">Hatha Yoga <span className="opt-count">(2)</span></div><div className="modal-modality-child">Yin Yoga <span className="opt-count">(1)</span></div><div className="modal-modality-child">Kundalini Yoga <span className="opt-count">(0)</span></div><div className="modal-modality-child">Somatic Movement <span className="opt-count">(0)</span></div><div className="modal-modality-child">Yoga Nidra <span className="opt-count">(1)</span></div><div className="modal-modality-child">Ecstatic Dance <span className="opt-count">(0)</span></div><div className="modal-modality-child">Qi Gong <span className="opt-count">(0)</span></div></div></div>
              <div className="modal-modality-category"><div className="modal-modality-parent">Breathwork</div><div className="modal-modality-children"><div className="modal-modality-child">Holotropic Breathwork <span className="opt-count">(0)</span></div><div className="modal-modality-child">Rebirthing Breathwork <span className="opt-count">(0)</span></div><div className="modal-modality-child">Conscious Connected <span className="opt-count">(0)</span></div><div className="modal-modality-child">Wim Hof Method <span className="opt-count">(1)</span></div><div className="modal-modality-child">Pranayama <span className="opt-count">(1)</span></div></div></div>
              <div className="modal-modality-category"><div className="modal-modality-parent">Sound &amp; Vibrational</div><div className="modal-modality-children"><div className="modal-modality-child">Sound Bath <span className="opt-count">(1)</span></div><div className="modal-modality-child">Gong Therapy <span className="opt-count">(0)</span></div><div className="modal-modality-child">Singing Bowl Healing <span className="opt-count">(0)</span></div><div className="modal-modality-child">Tuning Fork Therapy <span className="opt-count">(0)</span></div><div className="modal-modality-child">Nada Yoga <span className="opt-count">(0)</span></div></div></div>
              <div className="modal-modality-category"><div className="modal-modality-parent">Ayurveda</div><div className="modal-modality-children"><div className="modal-modality-child">Ayurvedic Consultation <span className="opt-count">(0)</span></div><div className="modal-modality-child">Abhyanga Massage <span className="opt-count">(0)</span></div><div className="modal-modality-child">Shirodhara <span className="opt-count">(0)</span></div><div className="modal-modality-child">Panchakarma <span className="opt-count">(0)</span></div><div className="modal-modality-child">Ayurvedic Nutrition <span className="opt-count">(0)</span></div></div></div>
              <div className="modal-modality-category"><div className="modal-modality-parent">Body Therapies &amp; Bodywork</div><div className="modal-modality-children"><div className="modal-modality-child">Swedish Massage <span className="opt-count">(2)</span></div><div className="modal-modality-child">Deep Tissue Massage <span className="opt-count">(1)</span></div><div className="modal-modality-child">Lomi Lomi <span className="opt-count">(0)</span></div><div className="modal-modality-child">Thai Massage <span className="opt-count">(0)</span></div><div className="modal-modality-child">Craniosacral Therapy <span className="opt-count">(0)</span></div><div className="modal-modality-child">Reflexology <span className="opt-count">(1)</span></div><div className="modal-modality-child">Shiatsu <span className="opt-count">(0)</span></div></div></div>
              <div className="modal-modality-category"><div className="modal-modality-parent">Meditation &amp; Mindfulness</div><div className="modal-modality-children"><div className="modal-modality-child">Vipassana <span className="opt-count">(0)</span></div><div className="modal-modality-child">Zen Meditation <span className="opt-count">(0)</span></div><div className="modal-modality-child">Transcendental Meditation <span className="opt-count">(0)</span></div><div className="modal-modality-child">Walking Meditation <span className="opt-count">(0)</span></div><div className="modal-modality-child">Guided Meditation <span className="opt-count">(2)</span></div></div></div>
              <div className="modal-modality-category"><div className="modal-modality-parent">Modern Wellness &amp; Recovery</div><div className="modal-modality-children"><div className="modal-modality-child">Infrared Sauna <span className="opt-count">(1)</span></div><div className="modal-modality-child">Cryotherapy <span className="opt-count">(0)</span></div><div className="modal-modality-child">IV Therapy &amp; Drip <span className="opt-count">(0)</span></div><div className="modal-modality-child">Red Light Therapy <span className="opt-count">(0)</span></div><div className="modal-modality-child">Compression Therapy <span className="opt-count">(0)</span></div><div className="modal-modality-child">Hyperbaric Oxygen <span className="opt-count">(0)</span></div></div></div>
              <div className="modal-modality-category"><div className="modal-modality-parent">Skin &amp; Aesthetic Wellness</div><div className="modal-modality-children"><div className="modal-modality-child">Facial Treatments <span className="opt-count">(2)</span></div><div className="modal-modality-child">Body Wraps &amp; Scrubs <span className="opt-count">(2)</span></div><div className="modal-modality-child">Microdermabrasion <span className="opt-count">(0)</span></div><div className="modal-modality-child">LED Light Therapy <span className="opt-count">(0)</span></div><div className="modal-modality-child">Holistic Skincare <span className="opt-count">(1)</span></div></div></div>
              <div className="modal-modality-category"><div className="modal-modality-parent">Nature Immersion</div><div className="modal-modality-children"><div className="modal-modality-child">Forest Bathing / Shinrin-yoku <span className="opt-count">(0)</span></div><div className="modal-modality-child">Ecotherapy <span className="opt-count">(0)</span></div><div className="modal-modality-child">Wild Swimming <span className="opt-count">(1)</span></div><div className="modal-modality-child">Nature Therapy <span className="opt-count">(0)</span></div></div></div>
              <div className="modal-modality-category"><div className="modal-modality-parent">Energy &amp; Esoteric</div><div className="modal-modality-children"><div className="modal-modality-child">Reiki <span className="opt-count">(0)</span></div><div className="modal-modality-child">Acupuncture <span className="opt-count">(0)</span></div><div className="modal-modality-child">Crystal Healing <span className="opt-count">(0)</span></div><div className="modal-modality-child">Human Design <span className="opt-count">(0)</span></div><div className="modal-modality-child">Astrology <span className="opt-count">(0)</span></div></div></div>
              <div className="modal-modality-category"><div className="modal-modality-parent">Indigenous &amp; Earth Traditions</div><div className="modal-modality-children"><div className="modal-modality-child">Melukat Ceremony <span className="opt-count">(0)</span></div><div className="modal-modality-child">Sweat Lodge <span className="opt-count">(0)</span></div><div className="modal-modality-child">Cacao Ceremony <span className="opt-count">(0)</span></div><div className="modal-modality-child">Shamanic Healing <span className="opt-count">(0)</span></div></div></div>
              <div className="modal-modality-category"><div className="modal-modality-parent">Nutrition &amp; Cleansing</div><div className="modal-modality-children"><div className="modal-modality-child">Juice Cleanse <span className="opt-count">(0)</span></div><div className="modal-modality-child">Detox Program <span className="opt-count">(1)</span></div><div className="modal-modality-child">Nutritional Therapy <span className="opt-count">(0)</span></div><div className="modal-modality-child">Fasting Programs <span className="opt-count">(0)</span></div></div></div>
              <div className="modal-modality-category"><div className="modal-modality-parent">Plant Medicine &amp; Ceremony <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 600, letterSpacing: "1.5px", color: "var(--gold-dark)", marginLeft: "10px" }}>By Approval Only</span></div><div className="modal-modality-children"><div className="modal-modality-child">Ayahuasca <span className="opt-count">(0)</span></div><div className="modal-modality-child">Psilocybin <span className="opt-count">(0)</span></div><div className="modal-modality-child">San Pedro <span className="opt-count">(0)</span></div><div className="modal-modality-child">Integration Support <span className="opt-count">(0)</span></div></div></div>
            </div>

            <div className="modal-section">
              <div className="modal-section-title">Session Price Range — Per Person</div>
              <div className="modal-range">
                <span style={{ fontSize: "12px", color: "var(--charcoal-50)" }}>$0</span>
                <input type="range" min="0" max="500" defaultValue="500" />
                <span className="modal-range-value">$500+</span>
              </div>
              <div className="modal-range-labels"><span>$0</span><span style={{ fontSize: "10px", color: "var(--charcoal-50)" }}>Per session / treatment</span><span>$500+</span></div>
            </div>

            <div className="modal-section">
              <div className="modal-section-title">Packages, Multi-Day Stays &amp; Tailored Programs</div>
              <div className="packages-cta">
                <div className="packages-cta-text"><strong>Packages &amp; bespoke stays available</strong>Multi-day wellness stays, residential programs, and tailored packages are priced individually. Enquire directly for availability and pricing.</div>
                <button className="packages-cta-btn">Enquire</button>
              </div>
            </div>

            <div className="modal-section"><div className="modal-section-title">Facilities &amp; Amenities</div><div className="modal-grid"><div className="modal-option">Thermal Pools <span className="opt-count">(2)</span></div><div className="modal-option">Cold Plunge <span className="opt-count">(2)</span></div><div className="modal-option">Sauna <span className="opt-count">(3)</span></div><div className="modal-option">Steam Room <span className="opt-count">(2)</span></div><div className="modal-option">Infrared Sauna <span className="opt-count">(1)</span></div><div className="modal-option">Float Tanks <span className="opt-count">(0)</span></div><div className="modal-option">Treatment Rooms <span className="opt-count">(4)</span></div><div className="modal-option">Yoga Studio <span className="opt-count">(2)</span></div><div className="modal-option">Meditation Room <span className="opt-count">(1)</span></div><div className="modal-option">Restaurant / Café <span className="opt-count">(3)</span></div><div className="modal-option">Accommodation <span className="opt-count">(2)</span></div><div className="modal-option">Outdoor Space <span className="opt-count">(4)</span></div><div className="modal-option">Parking <span className="opt-count">(5)</span></div><div className="modal-option">Accessible <span className="opt-count">(3)</span></div><div className="modal-option">EV Charging <span className="opt-count">(2)</span></div></div></div>

          </div>
          <div className="modal-footer"><button className="modal-clear">Clear all filters</button><button className="modal-apply">Show 6 Results</button></div>
        </div>
      </div>
    </div>
  );
}
