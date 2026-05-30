"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const styles = `
:root {
    --warm-white: #FDFCF9;
    --warm-cream: #F7F5F1;
    --charcoal: #313131;
    --warm-charcoal: #3A3A3A;
    --charcoal-80: rgba(49,49,49,0.8);
    --charcoal-70: rgba(49,49,49,0.7);
    --charcoal-50: rgba(49,49,49,0.5);
    --charcoal-30: rgba(49,49,49,0.3);
    --charcoal-15: rgba(49,49,49,0.15);
    --charcoal-10: rgba(49,49,49,0.1);
    --charcoal-08: rgba(49,49,49,0.08);
    --charcoal-05: rgba(49,49,49,0.05);
    --gold-accent: #C4A265;
    --gold-dark: #7A644F;
    --font-serif: 'Cormorant Garamond', Georgia, serif;
    --font-sans: 'Montserrat', sans-serif;
}
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
    font-family: var(--font-serif);
    font-size: 18px;
    font-weight: 400;
    line-height: 1.7;
    color: #3A3A3A;
    background: var(--warm-white);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
        }
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }


/* Skip to content — visible only on keyboard focus, removed by browsers from visible flow */
.skip-to-content {
    position: absolute; top: -100px; left: 16px;
    background: var(--charcoal); color: var(--warm-white);
    padding: 12px 20px; z-index: 9999;
    font-family: var(--font-sans); font-size: 13px; font-weight: 500;
    letter-spacing: 0.05em; text-transform: uppercase;
    transition: top 0.2s;
}
.skip-to-content:focus { top: 16px; outline: 2px solid var(--gold-accent); }
/* ════════════════════════════════════════════
   NAVIGATION
   ════════════════════════════════════════════ */
.nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 24px 48px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0) 100%); backdrop-filter: blur(4px);
    transition: background 0.3s ease, backdrop-filter 0.3s ease;
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
}
.nav-left { display: flex; align-items: center; gap: 14px; cursor: pointer; }
.nav-hamburger { display: flex; flex-direction: column; gap: 4px; }
/* Button-element resets (hamburger upgraded from <div> to <button> for accessibility) */
.nav-hamburger { background: transparent; border: none; padding: 0; cursor: pointer; color: inherit; font: inherit; }
.nav-hamburger:focus-visible { outline: 2px solid var(--gold-accent, #C4A265); outline-offset: 4px; }

.nav-hamburger span {
    width: 22px; height: 1px; background: #FFFFFF;
    transition: background 0.3s, transform 0.3s, opacity 0.3s, width 0.3s;
}
.nav.scrolled .nav-hamburger span { background: var(--charcoal); }
.nav-hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
.nav-hamburger.active span:nth-child(2) { opacity: 0; }
.nav-hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }
.nav-hamburger-label {
    font-family: var(--font-sans); font-size: 11px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(255,255,255,0.85); transition: color 0.3s;
}
.nav.scrolled .nav-hamburger-label { color: var(--charcoal); }
.nav-logo-area {
    display: flex; align-items: center; gap: 14px;
    color: #FFFFFF; transition: color 0.3s;
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
}
.nav-right { width: 80px; }

/* ════════════════════════════════════════════
   DRAWER
   ════════════════════════════════════════════ */
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
}
.drawer-link:last-child { border-bottom: none; }
.drawer-link:hover { color: var(--charcoal-70); padding-left: 6px; }
.drawer-link-arrow { font-size: 18px; color: var(--charcoal-15); transition: color 0.3s, transform 0.3s; }
.drawer-link:hover .drawer-link-arrow { color: var(--charcoal-50); transform: translateX(4px); }
.drawer-secondary-link {
    display: flex; align-items: center; gap: 10px;
    font-family: var(--font-sans); font-size: 14px; font-weight: 400;
    color: var(--charcoal-70); padding: 10px 0;
    transition: color 0.2s, padding-left 0.2s;
}
.drawer-secondary-link:hover { color: var(--charcoal); padding-left: 4px; }
.drawer-secondary-link svg { width: 16px; height: 16px; color: var(--charcoal-30); transition: color 0.2s; }
.drawer-secondary-link:hover svg { color: var(--charcoal); }
.drawer-cta {
    display: block; width: 100%; text-align: center;
    background: var(--charcoal); color: #FFFFFF;
    font-family: var(--font-sans); font-size: 11px; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase;
    padding: 16px 24px; transition: background 0.3s; margin-top: 8px;
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
}
.drawer-social a:hover { border-color: var(--charcoal); color: var(--charcoal); }

/* ════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════ */
.hero {
    position: relative; height: 100vh; min-height: 720px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; color: #FFFFFF;
}
.hero-bg {
    position: absolute; inset: 0; z-index: 1;
    background: url('https://images.unsplash.com/photo-1545389336-cf090694435e?w=1920&q=80') center/cover;
}
.hero-overlay {
    position: absolute; inset: 0; z-index: 2;
    background: linear-gradient(180deg, rgba(58,58,58,0.45) 0%, rgba(58,58,58,0.65) 100%);
}
.hero-content {
    position: relative; z-index: 3;
    max-width: 1100px; padding: 0 32px; text-align: center;
    width: 100%;
}
.hero-eyebrow {
    font-family: var(--font-sans); font-size: 11px;
    font-weight: 400; letter-spacing: 0.32em;
    text-transform: uppercase; color: rgba(255,255,255,0.85);
    margin-bottom: 28px;
}
.hero-eyebrow::before, .hero-eyebrow::after {
    content: ""; display: inline-block; width: 36px; height: 1px;
    background: var(--gold-accent); vertical-align: middle; margin-bottom: 3px;
}
.hero-eyebrow::before { margin-right: 18px; }
.hero-eyebrow::after { margin-left: 18px; }
.hero-headline {
    font-family: var(--font-serif); font-weight: 300;
    font-size: clamp(40px, 5.5vw, 68px);
    line-height: 1.1; letter-spacing: -0.005em;
    margin-bottom: 24px;
}
.hero-subtext {
    font-family: var(--font-serif); font-size: 18px; font-weight: 300;
    line-height: 1.7; max-width: 620px; margin: 0 auto 40px;
    color: rgba(255,255,255,0.92);
}
.hero-glass {
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.18);
    padding: 6px;
    max-width: 720px; margin: 0 auto 32px;
 position: relative; }
.hero-search {
    display: grid; grid-template-columns: 1fr auto 1fr auto 1fr auto;
    align-items: center; gap: 0;
}
.search-field { padding: 11px 18px; text-align: left; }
.search-field-label {
    display: block;
    font-family: var(--font-sans); font-size: 9px;
    font-weight: 600; letter-spacing: 0.22em;
    text-transform: uppercase; color: rgba(255,255,255,0.75);
    margin-bottom: 4px;
}
.search-field-select-wrapper { position: relative; }
.search-field-select-wrapper::after {
    content: "▾"; position: absolute; right: 0; top: 50%;
    transform: translateY(-55%);
    color: rgba(255,255,255,0.5);
    font-size: 10px; pointer-events: none;
}
.search-field select {
    width: 100%; background: transparent;
    border: none; outline: none;
    font-family: var(--font-serif); font-size: 16px; font-weight: 400;
    color: #FFFFFF; padding: 0 16px 0 0;
    cursor: pointer;
    appearance: none; -webkit-appearance: none;
}
.search-field select option { color: var(--charcoal); background: var(--warm-white); }
.search-divider { width: 1px; height: 30px; background: rgba(255,255,255,0.18); }
.search-btn {
    display: flex; align-items: center; gap: 7px;
    background: rgba(255,255,255,0.16);
    color: #FFFFFF; border: none;
    padding: 13px 22px;
    font-family: var(--font-sans); font-size: 10px;
    font-weight: 500; letter-spacing: 0.2em;
    text-transform: uppercase; cursor: pointer;
    transition: background 0.3s; align-self: stretch;
}
.search-btn:hover { background: rgba(255,255,255,0.28); }

/* ════════════════════════════════════════════
   HERO SEARCH — Click-to-open panel pattern
   Replaces previous select dropdowns with branded panels matching /venues
   ════════════════════════════════════════════ */
.search-field { cursor: pointer; transition: background 0.2s ease; position: relative; }
.search-field:hover { background: rgba(255,255,255,0.04); }
.search-field.is-active { background: rgba(255,255,255,0.06); }
.search-field-display {
    color: #FFFFFF;
    font-family: var(--font-sans);
    font-size: 13px;
    font-weight: 400;
    line-height: 1.4;
    padding-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.search-field-display.placeholder { color: rgba(255,255,255,0.55); }

/* Panels float below the search bar */
.hero-panel {
    position: absolute;
    top: calc(100% + 12px);
    left: 0; right: 0;
    background: var(--warm-white);
    border: 1px solid var(--charcoal-10);
    box-shadow: 0 16px 48px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.06);
    padding: 28px;
    max-width: 560px;
    z-index: 60;
    opacity: 0;
    transform: translateY(-8px);
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.hero-panel.is-open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
}
.hero-panel-title {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--gold-dark);
    margin-bottom: 18px;
}
.hero-panel-input {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid var(--charcoal-15);
    background: var(--warm-cream);
    font-family: var(--font-sans);
    font-size: 14px;
    color: var(--charcoal);
    margin-bottom: 20px;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
}
.hero-panel-input:focus { border-color: var(--gold-accent); background: #FFFFFF; }
.hero-panel-suggestions-label {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--charcoal-50);
    margin-bottom: 10px;
}
.hero-panel-suggestions {
    display: flex; flex-direction: column; gap: 2px;
    max-height: 320px; overflow-y: auto;
}
.hero-panel-suggestion {
    display: flex; align-items: center; gap: 14px;
    width: 100%;
    background: transparent;
    border: 0;
    padding: 12px 12px;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s ease;
}
.hero-panel-suggestion:hover { background: var(--warm-cream); }
.hero-suggestion-icon {
    display: inline-flex; align-items: center; justify-content: center;
    width: 32px; height: 32px;
    border: 1px solid var(--charcoal-15);
    color: var(--gold-accent);
    font-size: 10px;
    flex-shrink: 0;
}
.hero-suggestion-content { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.hero-suggestion-name {
    font-family: var(--font-serif);
    font-size: 16px;
    color: var(--charcoal);
    line-height: 1.2;
}
.hero-suggestion-detail {
    font-family: var(--font-sans);
    font-size: 11px;
    color: var(--charcoal-50);
    letter-spacing: 0.02em;
}
.hero-suggestion-count {
    font-family: var(--font-sans);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--charcoal-50);
    flex-shrink: 0;
}
.hero-panel-options { display: flex; flex-direction: column; gap: 4px; }
.hero-panel-option {
    display: flex; align-items: flex-start;
    width: 100%;
    background: transparent;
    border: 1px solid var(--charcoal-08);
    padding: 16px;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s ease, border-color 0.15s ease;
}
.hero-panel-option:hover { background: var(--warm-cream); border-color: var(--charcoal-15); }
.hero-panel-option.is-selected { border-color: var(--gold-accent); background: var(--warm-cream); }
.hero-option-content { display: flex; flex-direction: column; gap: 4px; flex: 1; }
.hero-option-name {
    font-family: var(--font-serif);
    font-size: 17px;
    color: var(--charcoal);
    line-height: 1.2;
}
.hero-option-desc {
    font-family: var(--font-sans);
    font-size: 12px;
    line-height: 1.5;
    color: var(--charcoal-70);
}
.hero-panel-pills {
    display: flex; flex-wrap: wrap; gap: 8px;
}
.hero-panel-pill {
    background: transparent;
    border: 1px solid var(--charcoal-15);
    padding: 9px 14px;
    font-family: var(--font-sans);
    font-size: 12px;
    color: var(--charcoal);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.hero-panel-pill:hover { background: var(--warm-cream); border-color: var(--charcoal-30); }
.hero-panel-pill.is-selected {
    background: var(--charcoal); color: #FFFFFF; border-color: var(--charcoal);
}

@media (max-width: 720px) {
    .hero-panel {
        position: fixed;
        top: auto; bottom: 0; left: 0; right: 0;
        max-width: 100%;
        border: 0;
        border-top: 1px solid var(--charcoal-10);
        max-height: 80vh;
        overflow-y: auto;
        transform: translateY(100%);
    }
    .hero-panel.is-open { transform: translateY(0); }
}


.hero-ctas {
    display: flex; gap: 32px; justify-content: center; flex-wrap: wrap;
}
.hero-cta-link {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font-sans); font-size: 11px;
    font-weight: 500; letter-spacing: 0.22em;
    text-transform: uppercase; color: rgba(255,255,255,0.85);
    transition: color 0.3s;
}
.hero-cta-link:hover { color: var(--gold-accent); }
.cta-arrow { transition: transform 0.3s; }
.hero-cta-link:hover .cta-arrow { transform: translateX(4px); }

/* ════════════════════════════════════════════
   SHARED SECTION DEFAULTS
   ════════════════════════════════════════════ */
.section-eyebrow {
    font-family: var(--font-sans); font-size: 9px;
    font-weight: 600; letter-spacing: 0.3em;
    text-transform: uppercase; color: var(--gold-dark);
    margin-bottom: 20px;
}
.section-eyebrow::before, .section-eyebrow::after {
    content: ""; display: inline-block; width: 28px; height: 1px;
    background: var(--gold-accent); vertical-align: middle; margin-bottom: 3px;
}
.section-eyebrow::before { margin-right: 14px; }
.section-eyebrow::after { margin-left: 14px; }
.section-title {
    font-family: var(--font-serif); font-weight: 300;
    font-size: clamp(32px, 4vw, 44px);
    line-height: 1.2; letter-spacing: -0.005em;
    color: var(--charcoal); margin-bottom: 24px;
}
.section-title em { font-style: italic; font-weight: 400; }
.section-text {
    font-family: var(--font-serif); font-size: 18px;
    font-weight: 400; line-height: 1.7;
    color: #3A3A3A; max-width: 680px;
}

/* ════════════════════════════════════════════
   INTRO
   ════════════════════════════════════════════ */
.intro {
    padding: 120px 48px;
    background: var(--warm-white);
}
.intro-inner {
    max-width: 1280px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: center;
}
.intro-content { padding-right: 24px; }
.intro-eyebrow {
    font-family: var(--font-sans); font-size: 9px;
    font-weight: 600; letter-spacing: 0.3em;
    text-transform: uppercase; color: var(--gold-dark);
    margin-bottom: 20px;
}
.intro-title {
    font-family: var(--font-serif); font-weight: 300;
    font-size: clamp(28px, 3.4vw, 40px);
    line-height: 1.25; color: var(--charcoal);
    margin-bottom: 28px; letter-spacing: -0.005em;
}
.intro-title em { font-style: italic; font-weight: 400; }
.intro-text {
    font-family: var(--font-serif); font-size: 16px;
    font-weight: 400; line-height: 1.75;
    color: #3A3A3A; margin-bottom: 16px;
}
.intro-link {
    display: inline-flex; align-items: center; gap: 8px;
    margin-top: 16px;
    font-family: var(--font-sans); font-size: 11px;
    font-weight: 500; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--charcoal);
    border-bottom: 1px solid var(--gold-accent);
    padding-bottom: 6px; transition: color 0.3s;
}
.intro-link:hover { color: var(--gold-dark); }
.intro-image { position: relative; }
.intro-image img {
    width: 100%; height: 580px; object-fit: cover;
    display: block;
}
.intro-image-accent {
    position: absolute; bottom: -20px; right: -20px;
    width: 140px; height: 140px;
    border: 1px solid var(--gold-accent);
    z-index: -1;
}

/* ════════════════════════════════════════════
   EXPLORE MOSAIC
   ════════════════════════════════════════════ */
.explore {
    padding: 120px 0;
    background: var(--warm-cream);
}
.explore-inner { max-width: 100%; margin: 0; }
.explore-header { text-align: center; max-width: 720px; margin: 0 auto 64px; padding: 0 48px; }
.explore-mosaic {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 1fr;
    gap: 4px;
    width: 100%;
}
.mosaic-item {
    position: relative; overflow: hidden;
    transition: transform 0.5s ease;
    aspect-ratio: 1 / 1;
}
.mosaic-item-tall {
    grid-row: span 2;
    aspect-ratio: 1 / 2;
}
/* Explicit placement: Coastal tall left (col 1), Tropical tall right (col 4),
   four shorter cards fill the middle 2x2 (cols 2-3) */
.mosaic-item:nth-child(1) { grid-column: 1; grid-row: 1 / span 2; }
.mosaic-item:nth-child(2) { grid-column: 2; grid-row: 1; }
.mosaic-item:nth-child(3) { grid-column: 3; grid-row: 1; }
.mosaic-item:nth-child(4) { grid-column: 4; grid-row: 1 / span 2; }
.mosaic-item:nth-child(5) { grid-column: 2; grid-row: 2; }
.mosaic-item:nth-child(6) { grid-column: 3; grid-row: 2; }
.mosaic-item img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.mosaic-item:hover img { transform: scale(1.08); }
.mosaic-item-overlay {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(180deg, rgba(58,58,58,0) 50%, rgba(58,58,58,0.75) 100%);
    opacity: 0;
    transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.mosaic-item:hover .mosaic-item-overlay { opacity: 1; }
.mosaic-item-content {
    position: absolute; bottom: 28px; left: 28px;
    z-index: 2; color: #FFFFFF;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s,
                transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s;
}
.mosaic-item:hover .mosaic-item-content {
    opacity: 1;
    transform: translateY(0);
}
.mosaic-item-title {
    font-family: var(--font-serif); font-size: 24px;
    font-weight: 400; letter-spacing: 0.005em;
}

/* ════════════════════════════════════════════
   PATHS (Find Your Path) - rebuilt clean
   ════════════════════════════════════════════ */
.paths {
    padding: 120px 48px;
    background: #FDFCF9;
}
.paths-inner {
    max-width: 1400px;
    margin: 0 auto;
}
.paths-header {
    text-align: center;
    max-width: 720px;
    margin: 0 auto 64px;
}
.paths-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: stretch;
    gap: 24px;
    width: 100%;
}
.path-card {
    flex: 1 1 0;
    min-width: 0;
    position: relative;
    overflow: hidden;
    aspect-ratio: 3/4;
    min-height: 420px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.path-card-bg {
    position: absolute;
    inset: 0;
    z-index: 1;
}
.path-card-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s ease;
}
.path-card:hover .path-card-bg img {
    transform: scale(1.06);
}
.path-card-overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: linear-gradient(180deg, rgba(58,58,58,0) 40%, rgba(58,58,58,0.75) 100%);
}
.path-card-content {
    position: relative;
    z-index: 3;
    padding: 32px;
    color: #FFFFFF;
}
.path-card-title {
    font-family: var(--font-serif);
    font-size: 26px;
    font-weight: 400;
    margin: 0 0 12px;
    letter-spacing: 0.005em;
}
.path-card-text {
    font-family: var(--font-serif);
    font-size: 14px;
    font-weight: 300;
    line-height: 1.6;
    color: rgba(255,255,255,0.85);
    margin: 0 0 20px;
}
.path-card-cta {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold-accent);
    transition: color 0.3s;
}
.path-card:hover .path-card-cta {
    color: #FFFFFF;
}

/* ════════════════════════════════════════════
   WELLNESS EXPERIENCES 2026
   ════════════════════════════════════════════ */
.experiences-2026 {
    padding: 120px 48px;
    background: var(--warm-cream);
}
.experiences-2026-inner { max-width: 1400px; margin: 0 auto; }
.experiences-2026-header {
    display: flex; justify-content: space-between; align-items: flex-end;
    gap: 48px; margin-bottom: 64px; flex-wrap: wrap;
}
.experiences-2026-header-content { max-width: 640px; }
.experiences-2026-link {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font-sans); font-size: 11px;
    font-weight: 500; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--charcoal);
    border-bottom: 1px solid var(--gold-accent);
    padding-bottom: 6px; transition: color 0.3s;
    flex-shrink: 0;
}
.experiences-2026-link:hover { color: var(--gold-dark); }
.experiences-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
}
.experience-card { background: var(--warm-white); transition: transform 0.4s ease; }
.experience-card:hover { transform: translateY(-4px); }
.experience-card-image {
    position: relative; width: 100%; height: 280px; overflow: hidden;
}
.experience-card-image img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; transition: transform 0.7s ease;
}
.experience-card:hover .experience-card-image img { transform: scale(1.06); }
.experience-card-content { padding: 28px; }
.experience-card-category {
    font-family: var(--font-sans); font-size: 9px;
    font-weight: 600; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--gold-dark);
    margin-bottom: 12px;
}
.experience-card-name {
    font-family: var(--font-serif); font-size: 22px;
    font-weight: 400; color: var(--charcoal);
    margin-bottom: 12px; line-height: 1.3;
}
.experience-card-desc {
    font-family: var(--font-serif); font-size: 14px;
    font-weight: 400; line-height: 1.65;
    color: #3A3A3A;
    margin-bottom: 20px;
}
.experience-card-cta {
    font-family: var(--font-sans); font-size: 10px;
    font-weight: 500; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--charcoal);
    transition: color 0.3s;
    display: inline-block;
    border-top: 1px solid var(--charcoal-08);
    padding-top: 16px;
    margin-top: 4px;
}
.experience-card-cta:hover { color: var(--gold-dark); }

/* ════════════════════════════════════════════
   PREMIUM COLLECTION
   ════════════════════════════════════════════ */
.premium {
    padding: 120px 48px;
    background: var(--warm-white);
}
.premium-inner { max-width: 1400px; margin: 0 auto; }
.premium-header {
    display: flex; justify-content: space-between; align-items: flex-end;
    gap: 48px; margin-bottom: 56px; flex-wrap: wrap;
}
.premium-header-content { max-width: 640px; }
.premium-subtitle {
    font-family: var(--font-serif); font-size: 16px;
    font-weight: 400; line-height: 1.65;
    color: #3A3A3A; margin-top: 8px;
}
.premium-link {
    display: inline-flex; align-items: center;
    font-family: var(--font-sans); font-size: 11px;
    font-weight: 500; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--charcoal);
    border-bottom: 1px solid var(--gold-accent);
    padding-bottom: 6px; transition: color 0.3s;
    flex-shrink: 0;
}
.premium-link:hover { color: var(--gold-dark); }

.premium-carousel-wrap {
    position: relative;
    margin-bottom: 32px;
}
.premium-carousel-viewport {
    overflow: hidden;
    position: relative;
}
.premium-carousel-track {
    display: flex;
    /* Horizontal slide with long, gentle easing — outgoing slide moves left,
       incoming slide arrives from right. ease-out-quart curve feels natural
       and slow without being sluggish. Duration 1100ms for elegance. */
    transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}
.premium-slide {
    flex: 0 0 100%;
    min-width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
}
.premium-card {
    background: transparent;
    transition: transform 0.4s ease;
    display: flex; flex-direction: column;
}
.premium-card:hover { transform: translateY(-4px); }
.premium-card-image {
    position: relative; height: 320px; overflow: hidden;
    margin-bottom: 24px;
}
.premium-card-image img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; transition: transform 0.7s ease;
}
.premium-card:hover .premium-card-image img { transform: scale(1.04); }
.premium-card-tag {
    position: absolute; top: 16px; left: 16px; z-index: 2;
    background: rgba(253,252,249,0.92);
    color: var(--charcoal);
    padding: 7px 16px;
    font-family: var(--font-sans); font-size: 9px;
    font-weight: 500; letter-spacing: 0.22em;
    text-transform: uppercase;
}
.premium-card-content {
    padding: 0;
    display: flex; flex-direction: column; gap: 12px;
}
.premium-card-location {
    font-family: var(--font-sans); font-size: 9px;
    font-weight: 600; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--charcoal-50);
    margin: 0;
}
.premium-card-name {
    font-family: var(--font-serif); font-size: 28px;
    font-weight: 400; color: var(--charcoal);
    line-height: 1.2; margin: 0;
}
.premium-card-desc {
    font-family: var(--font-serif); font-size: 15px;
    font-weight: 400; line-height: 1.6;
    color: #3A3A3A; margin: 0;
}
.premium-card-type {
    font-family: var(--font-sans); font-size: 11px;
    font-weight: 400; color: var(--charcoal-70);
    margin: 4px 0 0; padding-top: 16px;
    border-top: 1px solid var(--charcoal-08);
}
.premium-card-cta {
    font-family: var(--font-sans); font-size: 10px;
    font-weight: 500; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--charcoal);
    margin-top: 4px; transition: color 0.3s;
    align-self: flex-start;
}
.premium-card-cta:hover { color: var(--gold-dark); }

.premium-controls {
    display: flex; align-items: center; justify-content: center;
    gap: 24px; margin-top: 40px;
}
.premium-arrow {
    width: 44px; height: 44px;
    border: 1px solid var(--charcoal-15);
    background: transparent; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; color: var(--charcoal);
    transition: all 0.3s;
}
.premium-arrow:not(:disabled):hover {
    background: var(--charcoal); color: #FFFFFF; border-color: var(--charcoal);
}
.premium-arrow:disabled { opacity: 0.3; cursor: not-allowed; }
.premium-dots { display: flex; gap: 8px; }
.premium-dot {
    width: 8px; height: 8px; border-radius: 50%;
    border: 1px solid var(--charcoal-30); background: transparent;
    cursor: pointer; transition: all 0.3s; padding: 0;
}
.premium-dot-active { background: var(--charcoal); border-color: var(--charcoal); }

/* ════════════════════════════════════════════
   QUOTE
   ════════════════════════════════════════════ */
.quote-section {
    padding: 100px 48px;
    background: var(--warm-charcoal);
    text-align: center; color: #FFFFFF;
}
.quote-text {
    font-family: var(--font-serif); font-style: italic;
    font-size: clamp(28px, 3.4vw, 40px);
    font-weight: 300; line-height: 1.4;
    max-width: 900px; margin: 0 auto 32px;
    color: rgba(255,255,255,0.88);
}
.quote-open, .quote-close { color: var(--gold-accent); }
.quote-cursor, .author-cursor {
    display: inline-block;
    color: var(--gold-accent);
    font-weight: 300;
    animation: blink 1s step-end infinite;
    margin-left: 2px;
}
.author-cursor { display: none; }
.author-cursor.active { display: inline-block; }
@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}
.quote-author {
    font-family: var(--font-sans); font-size: 11px;
    font-weight: 400; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--gold-accent);
    font-style: normal;
}

/* ════════════════════════════════════════════
   TRENDING DESTINATIONS
   ════════════════════════════════════════════ */
.trending {
    padding: 120px 48px;
    background: var(--warm-white);
}
.trending-inner { max-width: 1400px; margin: 0 auto; }
.trending-header { text-align: center; max-width: 720px; margin: 0 auto 64px; }
.trending-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 320px 320px;
    gap: 16px;
}
.trending-item {
    position: relative; overflow: hidden;
    transition: transform 0.5s ease;
}
.trending-item-large {
    grid-column: span 2; grid-row: span 2;
}
.trending-item img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; transition: transform 0.7s ease;
}
.trending-item:hover img { transform: scale(1.06); }
.trending-item-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(58,58,58,0) 40%, rgba(58,58,58,0.75) 100%);
}
.trending-item-content {
    position: absolute; bottom: 28px; left: 28px; right: 28px;
    z-index: 2; color: #FFFFFF;
}
.trending-item-name {
    font-family: var(--font-serif); font-size: 26px;
    font-weight: 400; margin-bottom: 4px;
}
.trending-item-tagline {
    font-family: var(--font-serif); font-size: 14px;
    font-weight: 300; font-style: italic;
    color: rgba(255,255,255,0.85);
}

/* ════════════════════════════════════════════
   FEATURED SANCTUARIES (carousel)
   ════════════════════════════════════════════ */
.featured {
    padding: 120px 48px;
    background: var(--warm-cream);
}
.featured-inner { max-width: 1400px; margin: 0 auto; }
.featured-header {
    display: flex; justify-content: space-between; align-items: flex-end;
    gap: 48px; margin-bottom: 56px; flex-wrap: wrap;
}
.featured-header-content { max-width: 640px; }
.featured-subtitle {
    font-family: var(--font-serif); font-size: 16px;
    font-weight: 400; line-height: 1.65;
    color: #3A3A3A; margin-top: 8px;
}
.featured-link {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font-sans); font-size: 11px;
    font-weight: 500; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--charcoal);
    border-bottom: 1px solid var(--gold-accent);
    padding-bottom: 6px; transition: color 0.3s;
    flex-shrink: 0;
}
.featured-link:hover { color: var(--gold-dark); }
.carousel-wrap { position: relative; }
.carousel-viewport { overflow: hidden; position: relative; }
.carousel-track {
    display: flex;
    /* Horizontal slide with long, gentle easing — matches premium carousel */
    transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}
.featured-slide {
    flex: 0 0 100%;
    min-width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}
@media (max-width: 1100px) {
    .featured-slide { grid-template-columns: repeat(2, 1fr); }
    .premium-slide { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 720px) {
    .featured-slide { grid-template-columns: 1fr; }
    .premium-slide { grid-template-columns: 1fr; }
}
.venue-card {
    background: var(--warm-white);
    transition: transform 0.4s ease;
}
.venue-card:hover { transform: translateY(-4px); }
.venue-card-image {
    position: relative; height: 320px; overflow: hidden;
}
.venue-card-image img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; transition: transform 0.7s ease;
}
.venue-card:hover .venue-card-image img { transform: scale(1.06); }
.venue-card-tag {
    position: absolute; top: 16px; left: 16px; z-index: 2;
    background: rgba(58,58,58,0.85);
    color: #FFFFFF; padding: 6px 14px;
    font-family: var(--font-sans); font-size: 9px;
    font-weight: 500; letter-spacing: 0.22em;
    text-transform: uppercase;
}
.venue-card-content { padding: 24px; }
.venue-card-location {
    font-family: var(--font-sans); font-size: 9px;
    font-weight: 600; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--gold-dark);
    margin-bottom: 10px;
}
.venue-card-name {
    font-family: var(--font-serif); font-size: 22px;
    font-weight: 400; color: var(--charcoal);
    margin-bottom: 12px;
}
.card-cta {
    font-family: var(--font-sans); font-size: 10px;
    font-weight: 500; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--gold-dark);
    transition: color 0.3s;
}
.venue-card:hover .card-cta { color: var(--charcoal); }
.carousel-controls {
    display: flex; justify-content: center; align-items: center;
    gap: 24px; margin-top: 40px;
}
.carousel-arrow {
    width: 44px; height: 44px;
    border: 1px solid var(--charcoal-15);
    background: transparent; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; color: var(--charcoal);
    transition: all 0.3s;
}
.carousel-arrow:not(:disabled):hover {
    background: var(--charcoal); color: #FFFFFF; border-color: var(--charcoal);
}
.carousel-arrow:disabled { opacity: 0.3; cursor: not-allowed; }
.carousel-dots { display: flex; gap: 8px; }
.carousel-dot {
    width: 8px; height: 8px; border-radius: 50%;
    border: 1px solid var(--charcoal-30); background: transparent;
    cursor: pointer; transition: all 0.3s; padding: 0;
}
.carousel-dot-active { background: var(--charcoal); border-color: var(--charcoal); }

/* ════════════════════════════════════════════
   SEARCH FEATURES
   ════════════════════════════════════════════ */
.search-features {
    padding: 120px 48px;
    background: var(--warm-white);
}
.search-features-inner {
    max-width: 1400px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: center;
}
.search-features-image { position: relative; height: 600px; }
.search-features-image img {
    width: 100%; height: 100%; object-fit: cover;
}
.search-features-content {}
.search-features-list {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 32px; margin-top: 40px;
}
.search-feature {}
.search-feature-title {
    font-family: var(--font-serif); font-size: 20px;
    font-weight: 400; color: var(--charcoal);
    margin-bottom: 8px;
}
.search-feature-text {
    font-family: var(--font-serif); font-size: 14px;
    font-weight: 400; line-height: 1.65;
    color: #3A3A3A;
}

/* ════════════════════════════════════════════
   PHILOSOPHY
   ════════════════════════════════════════════ */
.philosophy {
    padding: 120px 48px;
    background: var(--warm-cream);
}
.philosophy-inner {
    max-width: 1400px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: center;
}
.philosophy-content {}
.philosophy-principles {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 32px; margin-top: 40px;
}
.principle {}
.principle-title {
    font-family: var(--font-serif); font-size: 18px;
    font-weight: 400; color: var(--charcoal);
    margin-bottom: 6px;
}
.principle-text {
    font-family: var(--font-serif); font-size: 14px;
    font-weight: 400; line-height: 1.6;
    color: #3A3A3A; font-style: italic;
}
.philosophy-images {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 16px;
}
.philosophy-images img:first-child {
    grid-column: span 2; height: 320px; object-fit: cover; width: 100%;
}
.philosophy-images img:nth-child(2),
.philosophy-images img:nth-child(3) {
    height: 280px; object-fit: cover; width: 100%;
}

/* ════════════════════════════════════════════
   NEWSLETTER
   ════════════════════════════════════════════ */
.newsletter {
    padding: 100px 48px;
    background: var(--warm-white);
    text-align: center;
}
.newsletter-inner { max-width: 720px; margin: 0 auto; }
.newsletter-eyebrow {
    font-family: var(--font-sans); font-size: 9px;
    font-weight: 600; letter-spacing: 0.3em;
    text-transform: uppercase; color: var(--gold-dark);
    margin-bottom: 20px;
}
.newsletter-title {
    font-family: var(--font-serif); font-size: clamp(32px, 3.6vw, 42px);
    font-weight: 300; color: var(--charcoal);
    margin-bottom: 22px; letter-spacing: -0.005em;
}
.newsletter-text {
    font-family: var(--font-serif); font-size: 16px;
    font-weight: 400; line-height: 1.7;
    color: #3A3A3A; margin-bottom: 36px;
}
.newsletter-form {
    display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
    max-width: 520px; margin: 0 auto;
}
.newsletter-input {
    flex: 1; min-width: 240px;
    padding: 14px 20px;
    border: 1px solid var(--charcoal-15);
    background: var(--warm-cream);
    font-family: var(--font-sans); font-size: 13px;
    color: var(--charcoal); outline: none;
    transition: border-color 0.3s;
}
.newsletter-input:focus { border-color: var(--gold-accent); }
.newsletter-input::placeholder { color: var(--charcoal-50); font-style: italic; }
.newsletter-btn {
    padding: 14px 32px;
    background: var(--charcoal); color: #FFFFFF;
    border: 1px solid var(--charcoal);
    font-family: var(--font-sans); font-size: 11px;
    font-weight: 500; letter-spacing: 0.2em;
    text-transform: uppercase; cursor: pointer;
    transition: background 0.3s;
}
.newsletter-btn:hover { background: var(--warm-charcoal); }

/* ════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════ */
.footer {
    background: var(--charcoal);
    color: rgba(255,255,255,0.7);
    padding: 80px 48px 40px;
}
.footer-grid {
    max-width: 1400px; margin: 0 auto;
    display: grid; grid-template-columns: 1.5fr repeat(4, 1fr);
    gap: 48px; padding-bottom: 56px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
}
.footer-brand { display: flex; flex-direction: column; gap: 20px; }
.footer-logo-placeholder {
    width: 72px; height: 72px;
    border: 2px dashed var(--gold-accent);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(196, 162, 101, 0.08);
    flex-shrink: 0;
}
.footer-logo-placeholder span {
    font-family: var(--font-sans); font-size: 8px;
    font-weight: 500; letter-spacing: 0.05em;
    text-transform: uppercase; color: var(--gold-accent);
    text-align: center; line-height: 1.3; padding: 4px;
}
.footer-brand-name {
    font-family: var(--font-serif); font-size: 18px;
    font-weight: 400; letter-spacing: 0.12em;
    text-transform: uppercase; color: rgba(255,255,255,0.9);
}
.footer-brand-text {
    font-family: var(--font-serif); font-size: 15px;
    font-weight: 400; line-height: 1.7;
    color: rgba(255,255,255,0.5);
}
.footer-brand-meta {
    font-family: var(--font-sans); font-size: 11px;
    font-weight: 400; line-height: 1.7;
    letter-spacing: 0.05em;
    color: rgba(255,255,255,0.35);
}
.footer-col-title {
    font-family: var(--font-sans); font-size: 10px;
    font-weight: 500; letter-spacing: 0.20em;
    text-transform: uppercase; color: rgba(255,255,255,0.4);
    margin-bottom: 24px;
}
.footer-links { list-style: none; display: flex; flex-direction: column; gap: 14px; }
.footer-links a {
    font-family: var(--font-serif); font-size: 15px;
    font-weight: 400; color: rgba(255,255,255,0.6);
    transition: color 0.3s;
}
.footer-links a:hover { color: rgba(255,255,255,0.95); }
.footer-bottom {
    max-width: 1400px; margin: 0 auto;
    padding-top: 32px;
    display: flex; justify-content: space-between; align-items: center;
}
.footer-copyright {
    font-family: var(--font-sans); font-size: 12px;
    font-weight: 400; letter-spacing: 0.05em;
    color: rgba(255,255,255,0.3);
}
.footer-social { display: flex; gap: 24px; }
.footer-social a {
    font-family: var(--font-sans); font-size: 11px;
    font-weight: 500; letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    transition: color 0.3s ease;
}
.footer-social a:hover {
    color: var(--gold-accent);
}

/* ════════════════════════════════════════════
   RESPONSIVE
   ════════════════════════════════════════════ */
@media (max-width: 1100px) {
    .hero-search { grid-template-columns: 1fr 1fr; gap: 0; }
    .search-divider { display: none; }
    .search-field { border-bottom: 1px solid rgba(255,255,255,0.12); }
    .search-btn { grid-column: span 2; padding: 18px; justify-content: center; margin-top: 4px; }
    .intro-inner, .search-features-inner, .philosophy-inner { grid-template-columns: 1fr; gap: 56px; }
    .paths-grid { flex-wrap: wrap; }
    .paths-grid .path-card { flex: 1 1 calc(50% - 12px); }
    .experiences-grid { grid-template-columns: repeat(2, 1fr); }
    .trending-grid { grid-template-columns: repeat(2, 1fr); grid-template-rows: 280px 280px 280px; }
    .trending-item-large { grid-column: span 2; grid-row: span 1; }
    .venue-card { flex: 0 0 calc(50% - 12px); }
    .premium-card { flex: 0 0 calc(50% - 16px); }
    .footer-grid { grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
}
@media (max-width: 768px) {
    .nav { padding: 18px 24px; }
    .nav-hamburger-label { display: none; }
    .nav-brand-text { font-size: 14px; }
    .hero { min-height: 600px; padding: 100px 20px 60px; height: auto; }
    .hero-search { grid-template-columns: 1fr; }
    .search-divider { display: none; }
    .search-btn { padding: 18px; justify-content: center; }
    .hero-ctas { flex-direction: column; gap: 16px; align-items: center; }
    .intro, .explore, .paths, .experiences-2026, .trending, .featured,
    .search-features, .philosophy { padding: 70px 24px; }
    .quote-section, .newsletter { padding: 70px 24px; }
    .explore-mosaic { grid-template-columns: 1fr 1fr; grid-template-rows: 220px 220px 220px; }
    .mosaic-item-tall { grid-row: span 1; }
    .explore-mosaic .mosaic-item:nth-child(1),
    .explore-mosaic .mosaic-item:nth-child(2),
    .explore-mosaic .mosaic-item:nth-child(3),
    .explore-mosaic .mosaic-item:nth-child(4),
    .explore-mosaic .mosaic-item:nth-child(5),
    .explore-mosaic .mosaic-item:nth-child(6) {
        grid-column: auto; grid-row: auto;
    }
    .paths-grid { flex-direction: column; }
    .paths-grid .path-card { flex: 1 1 auto; }
    .experiences-grid { grid-template-columns: 1fr; }
    .trending-grid { grid-template-columns: 1fr; grid-template-rows: 260px 260px 260px 260px 260px; }
    .trending-item-large { grid-column: span 1; }
    .venue-card { flex: 0 0 calc(85% - 12px); }
    .premium { padding: 70px 24px; }
    .premium-carousel-track { gap: 24px; }
    .premium-card { flex: 0 0 calc(85%); }
    .premium-card-image { height: 280px; }
    .search-features-list, .philosophy-principles { grid-template-columns: 1fr; gap: 28px; }
    .footer { padding: 60px 24px 24px; }
    .footer-grid { grid-template-columns: 1fr; gap: 32px; }
    .drawer { width: 100%; max-width: 100vw; }
}
`;

const whereSuggestions = [
  { value: "Bali, Indonesia", name: "Bali", detail: "Indonesia · Asia-Pacific", count: "3 venues" },
  { value: "Lisbon, Portugal", name: "Lisbon", detail: "City · Portugal · Europe", count: "2 venues" },
  { value: "Algarve, Portugal", name: "Algarve", detail: "Region · Portugal · Europe", count: "1 venue" },
  { value: "Reykjavík, Iceland", name: "Reykjavík", detail: "City · Iceland · Europe", count: "1 venue" },
  { value: "Byron Bay, Australia", name: "Byron Bay", detail: "City · Australia · Asia-Pacific", count: "1 venue" },
  { value: "Vals, Switzerland", name: "Vals", detail: "Mountain Village · Switzerland · Europe", count: "1 venue" },
];

const venueTypeOptions = [
  { value: "", label: "All Venues", name: "All Venues", desc: "Show every retreat and wellness venue on the platform" },
  { value: "retreat", label: "Retreat Venues", name: "Retreat Venue", desc: "Dedicated retreat centres, private estates, eco lodges, and hinterland properties for hosting transformational experiences" },
  { value: "wellness", label: "Wellness Venues", name: "Wellness Venue", desc: "Day spas, hammams, geothermal lagoons, thermal sanctuaries, and wellness resorts for restoration and renewal" },
];

const settingPills = [
  { value: "", label: "Any setting" },
  { value: "coastal", label: "Coastal & Beach" },
  { value: "mountain", label: "Mountain & Alpine" },
  { value: "forest", label: "Forest & Jungle" },
  { value: "urban", label: "Urban" },
  { value: "island", label: "Island & Tropical" },
  { value: "countryside", label: "Countryside" },
  { value: "thermal", label: "Thermal / Geothermal" },
  { value: "lakeside", label: "Lakeside" },
];

const QUOTE_TEXT =
  "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.";
const AUTHOR_TEXT = "— Rumi";

export default function TgsHomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef<HTMLDivElement | null>(null);

  // Hero search state
  const [openPanel, setOpenPanel] = useState<"where" | "venueType" | "setting" | null>(null);
  const [whereDisplay, setWhereDisplay] = useState("Anywhere");
  const [whereValue, setWhereValue] = useState("");
  const [whereInput, setWhereInput] = useState("");
  const [venueTypeDisplay, setVenueTypeDisplay] = useState("All Venues");
  const [venueTypeValue, setVenueTypeValue] = useState("");
  const [settingDisplay, setSettingDisplay] = useState("Any setting");
  const [settingValue, setSettingValue] = useState("");

  const whereInputRef = useRef<HTMLInputElement | null>(null);
  const submissionIdRef = useRef("");

  // Carousels
  const [featuredSlide, setFeaturedSlide] = useState(0);
  const featuredTotal = 2;
  const [premiumSlide, setPremiumSlide] = useState(0);
  const premiumTotal = 2;

  // Quote typing
  const [quoteTyped, setQuoteTyped] = useState("");
  const [authorTyped, setAuthorTyped] = useState("");
  const [quoteCursorVisible, setQuoteCursorVisible] = useState(true);
  const [authorCursorActive, setAuthorCursorActive] = useState(false);
  const [authorCursorVisible, setAuthorCursorVisible] = useState(true);
  const quoteSectionRef = useRef<HTMLElement | null>(null);

  // Nav scroll behaviour — scrolled when past hero height - 80
  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      setScrolled(window.scrollY > hero.offsetHeight - 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Escape closes drawer + hero panels
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (drawerOpen) setDrawerOpen(false);
        setOpenPanel(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  // Close hero panels on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (!target.closest(".hero-panel") && !target.closest(".search-field")) {
        setOpenPanel(null);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Focus where input when its panel opens
  useEffect(() => {
    if (openPanel === "where") {
      const t = setTimeout(() => whereInputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [openPanel]);

  // Populate submissionId UUID at mount
  useEffect(() => {
    const uuid = () =>
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          });
    submissionIdRef.current = uuid();
  }, []);

  // Quote typing animation triggered when section ~40% visible
  useEffect(() => {
    const section = quoteSectionRef.current;
    if (!section) return;
    let hasAnimated = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const typeText = (
      text: string,
      speed: number,
      setter: (updater: (prev: string) => string) => void,
      onComplete?: () => void,
    ) => {
      let i = 0;
      const tick = () => {
        if (i < text.length) {
          const ch = text.charAt(i);
          setter((prev) => prev + ch);
          i++;
          timeouts.push(setTimeout(tick, speed));
        } else if (onComplete) {
          onComplete();
        }
      };
      tick();
    };

    const startAnimation = () => {
      if (hasAnimated) return;
      hasAnimated = true;
      typeText(QUOTE_TEXT, 35, setQuoteTyped, () => {
        setQuoteCursorVisible(false);
        timeouts.push(
          setTimeout(() => {
            setAuthorCursorActive(true);
            typeText(AUTHOR_TEXT, 80, setAuthorTyped, () => {
              setAuthorCursorVisible(false);
            });
          }, 600),
        );
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            startAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: [0.4] },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  const toggleDrawer = () => setDrawerOpen((o) => !o);

  const openHeroPanel = (name: "where" | "venueType" | "setting", event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    setOpenPanel((prev) => (prev === name ? null : name));
  };

  const handleHeroSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const honeypot = form.querySelector<HTMLInputElement>('input[name="website"]');
    if (honeypot && honeypot.value) {
      event.preventDefault();
      return;
    }
    const w = window as unknown as { tgsTrackOnce?: (n: string, p: Record<string, unknown>) => void };
    if (w.tgsTrackOnce) {
      w.tgsTrackOnce("venues_searched", {
        interactionId: submissionIdRef.current,
        location: whereValue,
        venueType: venueTypeValue,
        setting: settingValue,
        modality: "",
        source: "home_hero",
      });
    }
  };

  const filteredWhere = whereSuggestions.filter((s) => {
    const q = whereInput.trim().toLowerCase();
    if (!q) return true;
    return s.name.toLowerCase().includes(q) || s.detail.toLowerCase().includes(q);
  });

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <a className="skip-to-content" href="#main-content">Skip to main content</a>

      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
        <div className="nav-inner">
          <div className="nav-left" onClick={toggleDrawer}>
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
            <span className="nav-hamburger-label">Menu</span>
          </div>
          <Link href="/global-santcum/web" className="nav-logo-area">
            <span className="nav-logo" />
            <span className="nav-brand-text">The Global Sanctum</span>
          </Link>
          <div className="nav-right" />
        </div>
      </nav>

      <div
        className={`drawer-overlay${drawerOpen ? " active" : ""}`}
        id="drawerOverlay"
        onClick={toggleDrawer}
        aria-hidden={drawerOpen ? "false" : "true"}
      />
      <div
        className={`drawer${drawerOpen ? " active" : ""}`}
        id="navDrawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={drawerOpen ? "false" : "true"}
      >
        <div className="drawer-header">
          <div className="drawer-header-left">
            <span className="drawer-logo" />
            <span className="drawer-label">Navigation</span>
          </div>
          <button className="drawer-close" onClick={toggleDrawer} aria-label="Close menu">&times;</button>
        </div>
        <div className="drawer-search">
          <div className="drawer-search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            <input type="text" placeholder="Search venues, experiences, locations..." />
          </div>
        </div>
        <div className="drawer-body">
          <div className="drawer-group">
            <div className="drawer-group-label">Discover</div>
            <Link href="/global-santcum/retreat-venues" className="drawer-link">Retreat Venues<span className="drawer-link-arrow">→</span></Link>
            <Link href="/global-santcum/wellness-venues" className="drawer-link">Wellness Venues<span className="drawer-link-arrow">→</span></Link>
            <Link href="/global-santcum/wellness-experiences" className="drawer-link">Wellness Experiences<span className="drawer-link-arrow">→</span></Link>
          </div>
          <div className="drawer-group">
            <div className="drawer-group-label">Learn</div>
            <Link href="/global-santcum/about" className="drawer-secondary-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
              About Us
            </Link>
            <Link href="/global-santcum/how-it-works" className="drawer-secondary-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              How It Works
            </Link>
            <Link href="/global-santcum/the-wellness-edit" className="drawer-secondary-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
              The Wellness Edit
            </Link>
          </div>
          <div className="drawer-group">
            <div className="drawer-group-label">Connect</div>
            <Link href="/global-santcum/contact" className="drawer-secondary-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              Contact Us
            </Link>
            <Link href="/global-santcum/list-your-venue" className="drawer-secondary-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              List Your Venue
            </Link>
          </div>
          <div className="drawer-group">
            <Link href="/global-santcum/list-your-venue" className="drawer-cta">List Your Venue</Link>
          </div>
        </div>
        <div className="drawer-footer">
          <div className="drawer-footer-contact">
            <a href="mailto:hello@theglobalsanctum.com" className="drawer-footer-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              hello@theglobalsanctum.com
            </a>
          </div>
          <div className="drawer-social">
            <a href="#" aria-label="Facebook">Fb</a>
            <a href="#" aria-label="Instagram">Ig</a>
            <a href="#" aria-label="LinkedIn">Li</a>
          </div>
        </div>
      </div>

      <main id="main-content" role="main">
        <section className="hero" ref={heroRef}>
          <div className="hero-bg" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow">The Global Sanctum</p>
            <h1 className="hero-headline">Thoughtfully Curated.<br />Globally Connected.</h1>
            <p className="hero-subtext">Discover exceptional retreat venues and wellness sanctuaries around the world.</p>

            <div className="hero-glass">
              <form
                className="hero-search"
                id="hero-search-form"
                data-form-type="venue-search"
                role="search"
                aria-label="Search wellness venues"
                action="/venues"
                method="GET"
                onSubmit={handleHeroSubmit}
              >
                <input type="hidden" name="submissionId" defaultValue="" />
                <input type="hidden" name="location" id="hero-location" value={whereValue} readOnly />
                <input type="hidden" name="venueType" id="hero-venueType" value={venueTypeValue} readOnly />
                <input type="hidden" name="setting" id="hero-setting" value={settingValue} readOnly />
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
                  <label>Website (leave blank)<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
                </div>
                <div
                  className={`search-field${openPanel === "where" ? " is-active" : ""}`}
                  id="hero-field-where"
                  onClick={(e) => openHeroPanel("where", e)}
                >
                  <label className="search-field-label">Where</label>
                  <div className="search-field-display" id="hero-display-where">{whereDisplay}</div>
                </div>
                <div className="search-divider" />
                <div
                  className={`search-field${openPanel === "venueType" ? " is-active" : ""}`}
                  id="hero-field-venueType"
                  onClick={(e) => openHeroPanel("venueType", e)}
                >
                  <label className="search-field-label">Venue Type</label>
                  <div className="search-field-display" id="hero-display-venueType">{venueTypeDisplay}</div>
                </div>
                <div className="search-divider" />
                <div
                  className={`search-field${openPanel === "setting" ? " is-active" : ""}`}
                  id="hero-field-setting"
                  onClick={(e) => openHeroPanel("setting", e)}
                >
                  <label className="search-field-label">Setting</label>
                  <div className="search-field-display" id="hero-display-setting">{settingDisplay}</div>
                </div>
                <button type="submit" className="search-btn" aria-label="Search venues">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                  <span>Search</span>
                </button>
              </form>

              <div
                className={`hero-panel${openPanel === "where" ? " is-open" : ""}`}
                id="hero-panel-where"
                role="dialog"
                aria-label="Where to?"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="hero-panel-title">Where to?</div>
                <input
                  type="text"
                  className="hero-panel-input"
                  placeholder="Search a country, region, city, or neighbourhood"
                  id="hero-where-input"
                  autoComplete="off"
                  ref={whereInputRef}
                  value={whereInput}
                  onChange={(e) => setWhereInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const value = whereInput.trim();
                      if (value) {
                        setWhereDisplay(value);
                        setWhereValue(value);
                      }
                      setOpenPanel(null);
                    }
                  }}
                />
                <div className="hero-panel-suggestions-label">Popular destinations</div>
                <div className="hero-panel-suggestions" id="hero-where-suggestions">
                  {filteredWhere.map((s) => (
                    <button
                      type="button"
                      className="hero-panel-suggestion"
                      data-value={s.value}
                      data-detail={s.detail}
                      key={s.value}
                      onClick={() => {
                        setWhereDisplay(s.value);
                        setWhereValue(s.value);
                        setOpenPanel(null);
                      }}
                    >
                      <span className="hero-suggestion-icon">◉</span>
                      <span className="hero-suggestion-content">
                        <span className="hero-suggestion-name">{s.name}</span>
                        <span className="hero-suggestion-detail">{s.detail}</span>
                      </span>
                      <span className="hero-suggestion-count">{s.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`hero-panel${openPanel === "venueType" ? " is-open" : ""}`}
                id="hero-panel-venueType"
                role="dialog"
                aria-label="What kind of venue?"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="hero-panel-title">What kind of venue?</div>
                <div className="hero-panel-options">
                  {venueTypeOptions.map((o) => (
                    <button
                      type="button"
                      className={`hero-panel-option${venueTypeValue === o.value && venueTypeDisplay === o.label ? " is-selected" : ""}`}
                      data-value={o.value}
                      data-label={o.label}
                      key={o.label}
                      onClick={() => {
                        setVenueTypeDisplay(o.label);
                        setVenueTypeValue(o.value);
                        setOpenPanel(null);
                      }}
                    >
                      <span className="hero-option-content">
                        <span className="hero-option-name">{o.name}</span>
                        <span className="hero-option-desc">{o.desc}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`hero-panel${openPanel === "setting" ? " is-open" : ""}`}
                id="hero-panel-setting"
                role="dialog"
                aria-label="Setting"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="hero-panel-title">Setting</div>
                <div className="hero-panel-pills">
                  {settingPills.map((p) => (
                    <button
                      type="button"
                      className={`hero-panel-pill${settingValue === p.value && settingDisplay === p.label ? " is-selected" : ""}`}
                      data-value={p.value}
                      data-label={p.label}
                      key={p.label}
                      onClick={() => {
                        setSettingDisplay(p.label);
                        setSettingValue(p.value);
                        setOpenPanel(null);
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-ctas">
              <Link href="/global-santcum/retreat-venues" className="hero-cta-link">
                <span>Browse Retreat Venues</span><span className="cta-arrow">→</span>
              </Link>
              <Link href="/global-santcum/wellness-venues" className="hero-cta-link">
                <span>Explore Wellness Venues</span><span className="cta-arrow">→</span>
              </Link>
              <Link href="/global-santcum/wellness-experiences" className="hero-cta-link">
                <span>Discover Experiences</span><span className="cta-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="intro" id="intro">
          <div className="intro-inner">
            <div className="intro-content">
              <p className="intro-eyebrow">A New Era of Wellness Discovery</p>
              <h2 className="intro-title">The spaces where wellness happens. <em>The venues where retreats come to life.</em> Curated and connected worldwide.</h2>
              <p className="intro-text">We are the world&apos;s first curated platform dedicated exclusively to transformative wellness venues and retreat spaces.</p>
              <p className="intro-text">Whether you&apos;re a retreat host seeking the perfect venue, a wellness guest designing your next journey, or simply seeking restoration, The Global Sanctum connects you with extraordinary spaces around the world.</p>
              <Link href="/global-santcum/about" className="intro-link">About The Global Sanctum<span>→</span></Link>
            </div>
            <div className="intro-image">
              <img src="/tgs-images/Woman%20Meditating%20In%20Sacred%20Site%20Nordic%20Filter.png" alt="Sacred-site meditation" loading="eager" decoding="async" fetchPriority="high" width="800" height="600" />
              <div className="intro-image-accent" />
            </div>
          </div>
        </section>

        <section className="explore">
          <div className="explore-inner">
            <div className="explore-header">
              <p className="section-eyebrow">Discover Differently</p>
              <h2 className="section-title"><em>Explore Intentional Spaces Around The World</em></h2>
              <p className="section-text">From soul-restoring coastal sanctuaries to mountain retreats where silence does the work. Thermal springs rising from volcanic earth, forest hideaways hidden in ancient canopy — spaces where wellness lives in the foundations.</p>
            </div>
            <div className="explore-mosaic">
              <Link href="/global-santcum/venues?setting=coastal" className="mosaic-item mosaic-item-tall">
                <img src="/tgs-images/Beach%20With%20Boat%20Rainforest%20Aerial%20Nordic%20Filter.png" alt="Coastal sanctuary" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                <div className="mosaic-item-overlay" />
                <div className="mosaic-item-content"><h3 className="mosaic-item-title">Coastal Sanctuaries</h3></div>
              </Link>
              <Link href="/global-santcum/venues?setting=forest" className="mosaic-item">
                <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80" alt="Forest retreat" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                <div className="mosaic-item-overlay" />
                <div className="mosaic-item-content"><h3 className="mosaic-item-title">Forest Hideaways</h3></div>
              </Link>
              <Link href="/global-santcum/venues?setting=desert" className="mosaic-item">
                <img src="/tgs-images/Sunset%20Desert%20Nordic%20Filter.png" alt="Desert retreat" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                <div className="mosaic-item-overlay" />
                <div className="mosaic-item-content"><h3 className="mosaic-item-title">Desert Retreats</h3></div>
              </Link>
              <Link href="/global-santcum/venues?setting=tropical" className="mosaic-item mosaic-item-tall">
                <img src="/tgs-images/Misty%20Jungle%20Forest%20Nordic%20Filter.png" alt="Tropical sanctuary" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                <div className="mosaic-item-overlay" />
                <div className="mosaic-item-content"><h3 className="mosaic-item-title">Tropical Sanctuaries</h3></div>
              </Link>
              <Link href="/global-santcum/venues?setting=urban" className="mosaic-item">
                <img src="/tgs-images/City%20Wet%20Pavement%20Nordic%20Filter.png" alt="Urban sanctuary" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                <div className="mosaic-item-overlay" />
                <div className="mosaic-item-content"><h3 className="mosaic-item-title">Urban Sanctuaries</h3></div>
              </Link>
              <Link href="/global-santcum/venues?setting=mountain" className="mosaic-item">
                <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80" alt="Mountain sanctuary" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                <div className="mosaic-item-overlay" />
                <div className="mosaic-item-content"><h3 className="mosaic-item-title">Mountain Sanctuaries</h3></div>
              </Link>
            </div>
          </div>
        </section>

        <section className="paths">
          <div className="paths-inner">
            <div className="paths-header">
              <p className="section-eyebrow">Find Your Path</p>
              <h2 className="section-title">Four Ways to Discover</h2>
              <p className="section-text">From thermal springs to forest sanctuaries, coastal retreats to mountain hideaways. Spaces where restoration isn&apos;t an afterthought — it&apos;s the foundation.</p>
            </div>
            <div className="paths-grid">
              <div className="path-card">
                <div className="path-card-bg"><img src="/tgs-images/Jungle%20Cabin%20Nordic%20Filter.png" alt="Retreat venues" loading="lazy" decoding="async" fetchPriority="low" width="800" height="600" /></div>
                <div className="path-card-overlay" />
                <div className="path-card-content">
                  <h3 className="path-card-title">Retreat Venues</h3>
                  <p className="path-card-text">Curated spaces for immersive retreat experiences.</p>
                  <Link href="/global-santcum/retreat-venues" className="path-card-cta">Explore Venues →</Link>
                </div>
              </div>
              <div className="path-card">
                <div className="path-card-bg"><img src="/tgs-images/Onsen%203%20Nordic%20Filter.png" alt="Wellness venues" loading="lazy" decoding="async" fetchPriority="low" width="800" height="600" /></div>
                <div className="path-card-overlay" />
                <div className="path-card-content">
                  <h3 className="path-card-title">Wellness Venues</h3>
                  <p className="path-card-text">Sanctuaries where restoration becomes routine.</p>
                  <Link href="/global-santcum/wellness-venues" className="path-card-cta">Explore Venues →</Link>
                </div>
              </div>
              <div className="path-card">
                <div className="path-card-bg"><img src="/tgs-images/Massage%20black%20and%20white.jpg" alt="Wellness experiences" loading="lazy" decoding="async" fetchPriority="low" width="800" height="600" /></div>
                <div className="path-card-overlay" />
                <div className="path-card-content">
                  <h3 className="path-card-title">Wellness Experiences</h3>
                  <p className="path-card-text">Single sessions and ancient healing traditions.</p>
                  <Link href="/global-santcum/wellness-experiences" className="path-card-cta">Explore Experiences →</Link>
                </div>
              </div>
              <div className="path-card">
                <div className="path-card-bg"><img src="https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=800&q=80" alt="Wellness insights" loading="lazy" decoding="async" fetchPriority="low" width="800" height="600" /></div>
                <div className="path-card-overlay" />
                <div className="path-card-content">
                  <h3 className="path-card-title">The Wellness Edit</h3>
                  <p className="path-card-text">Stories, guides, and inspiration for the path.</p>
                  <Link href="/global-santcum/the-wellness-edit" className="path-card-cta">Explore The Edit →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="experiences-2026">
          <div className="experiences-2026-inner">
            <div className="experiences-2026-header">
              <div className="experiences-2026-header-content">
                <p className="section-eyebrow">The Year Ahead</p>
                <h2 className="section-title">Defining Wellness Experiences for 2026</h2>
              </div>
              <Link href="/global-santcum/retreat-venues" className="experiences-2026-link">Explore All Experiences<span>→</span></Link>
            </div>
            <div className="experiences-grid">
              <article className="experience-card">
                <div className="experience-card-image"><img src="/tgs-images/Woman%20In%20Spa%20Dark%20Tiles%20Nordic%20Filter.png" alt="Thermal bathing" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" /></div>
                <div className="experience-card-content">
                  <p className="experience-card-category">Hydrotherapy</p>
                  <h3 className="experience-card-name">Thermal Bathing Rituals</h3>
                  <p className="experience-card-desc">Ancient waters, volcanic springs, and the art of restoration through heat and cold.</p>
                  <Link href="/global-santcum/wellness-experiences?category=thermal-bathing" className="experience-card-cta">Explore Category&nbsp;→</Link>
                </div>
              </article>
              <article className="experience-card">
                <div className="experience-card-image"><img src="/tgs-images/Gold%20Sound%20Bowl%20Nordic%20Filter.jpg" alt="Sound healing" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" /></div>
                <div className="experience-card-content">
                  <p className="experience-card-category">Sound Therapy</p>
                  <h3 className="experience-card-name">Vibrational Sound Journeys</h3>
                  <p className="experience-card-desc">Crystal bowls, gongs, and frequencies that recalibrate the nervous system.</p>
                  <Link href="/global-santcum/wellness-experiences?category=sound-therapy" className="experience-card-cta">Explore Category&nbsp;→</Link>
                </div>
              </article>
              <article className="experience-card">
                <div className="experience-card-image"><img src="/tgs-images/Man%20Walking%20Through%20Forest%20Nordic%20Filter.png" alt="Forest bathing" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" /></div>
                <div className="experience-card-content">
                  <p className="experience-card-category">Nature Immersion</p>
                  <h3 className="experience-card-name">Forest Bathing &amp; Shinrin-Yoku</h3>
                  <p className="experience-card-desc">The Japanese art of forest medicine and intentional nature connection.</p>
                  <Link href="/global-santcum/wellness-experiences?category=nature-immersion" className="experience-card-cta">Explore Category&nbsp;→</Link>
                </div>
              </article>
              <article className="experience-card">
                <div className="experience-card-image"><img src="/tgs-images/Man%20Black%20and%20White%20Hands%20on%20Chest.jpg" alt="Conscious breath" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" /></div>
                <div className="experience-card-content">
                  <p className="experience-card-category">Recovery &amp; Performance</p>
                  <h3 className="experience-card-name">Modern Wellness &amp; Recovery</h3>
                  <p className="experience-card-desc">Ice baths, contrast therapy, infrared saunas, and float tanks — restoration through modern science.</p>
                  <Link href="/global-santcum/wellness-experiences?category=modern-wellness-recovery" className="experience-card-cta">Explore Category&nbsp;→</Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="premium">
          <div className="premium-inner">
            <div className="premium-header">
              <div className="premium-header-content">
                <p className="section-eyebrow">Intentionally Curated</p>
                <h2 className="section-title">Our Premium Collection</h2>
                <p className="premium-subtitle">The most exceptional wellness and retreat venues, offering unparalleled experiences in extraordinary settings.</p>
              </div>
              <Link href="/global-santcum/retreat-venues" className="premium-link">Explore Premium Venues<span>&nbsp;→</span></Link>
            </div>
            <div className="premium-carousel-wrap">
              <div className="premium-carousel-viewport">
                <div
                  className="premium-carousel-track"
                  id="premiumCarouselTrack"
                  style={{ transform: `translateX(-${premiumSlide * 100}%)` }}
                >
                  <div className={`premium-slide${premiumSlide === 0 ? " is-active" : ""}`} data-slide="0">
                    <article className="premium-card">
                      <div className="premium-card-image">
                        <img src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80" alt="Coral Coast Bay" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                        <span className="premium-card-tag">Coral Bay</span>
                      </div>
                      <div className="premium-card-content">
                        <p className="premium-card-location">Coral Bay, Australia</p>
                        <h3 className="premium-card-name">Coral Coast Bay</h3>
                        <p className="premium-card-desc">Barefoot luxury eco-retreat on WA&apos;s Coral Coast with ocean wellness and indigenous healing.</p>
                        <p className="premium-card-type">Wellness Retreat &middot; Yoga Retreat</p>
                        <Link href="/global-santcum/retreat-venues" className="premium-card-cta">Explore Venue&nbsp;→</Link>
                      </div>
                    </article>
                    <article className="premium-card">
                      <div className="premium-card-image">
                        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80" alt="Float &amp; Flow" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                        <span className="premium-card-tag">Brooklyn</span>
                      </div>
                      <div className="premium-card-content">
                        <p className="premium-card-location">Brooklyn, Australia</p>
                        <h3 className="premium-card-name">Float &amp; Flow</h3>
                        <p className="premium-card-desc">A serene lakeside sanctuary designed for stillness, reflection, and gentle restoration.</p>
                        <p className="premium-card-type">Wellness Retreat &middot; Meditation Retreat</p>
                        <Link href="/global-santcum/retreat-venues" className="premium-card-cta">Explore Venue&nbsp;→</Link>
                      </div>
                    </article>
                    <article className="premium-card">
                      <div className="premium-card-image">
                        <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80" alt="Serenity Springs" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                        <span className="premium-card-tag">Katoomba</span>
                      </div>
                      <div className="premium-card-content">
                        <p className="premium-card-location">Katoomba, Australia</p>
                        <h3 className="premium-card-name">Serenity Springs</h3>
                        <p className="premium-card-desc">A purpose-built mountain retreat in the Blue Mountains, designed for transformation and renewal.</p>
                        <p className="premium-card-type">Dedicated Retreat Centre</p>
                        <Link href="/global-santcum/retreat-venues" className="premium-card-cta">Explore Venue&nbsp;→</Link>
                      </div>
                    </article>
                  </div>
                  <div className={`premium-slide${premiumSlide === 1 ? " is-active" : ""}`} data-slide="1">
                    <article className="premium-card">
                      <div className="premium-card-image">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" alt="Sunshine Retreat Venue" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                        <span className="premium-card-tag">Nafplio</span>
                      </div>
                      <div className="premium-card-content">
                        <p className="premium-card-location">Nafplio, Greece</p>
                        <h3 className="premium-card-name">Sunshine Retreat Venue</h3>
                        <p className="premium-card-desc">Where expansion and tranquility comes naturally.</p>
                        <p className="premium-card-type">Dedicated Retreat Centre</p>
                        <Link href="/global-santcum/retreat-venues" className="premium-card-cta">Explore Venue&nbsp;→</Link>
                      </div>
                    </article>
                    <article className="premium-card">
                      <div className="premium-card-image">
                        <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" alt="Rapture Surfcamp Bali Greenbowls" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                        <span className="premium-card-tag">Bali</span>
                      </div>
                      <div className="premium-card-content">
                        <p className="premium-card-location">Indonesia</p>
                        <h3 className="premium-card-name">Rapture Surfcamp Bali Greenbowls</h3>
                        <p className="premium-card-desc">A space designed for meaningful, intimate retreats.</p>
                        <p className="premium-card-type">Villa</p>
                        <Link href="/global-santcum/retreat-venues" className="premium-card-cta">Explore Venue&nbsp;→</Link>
                      </div>
                    </article>
                    <article className="premium-card">
                      <div className="premium-card-image">
                        <img src="https://images.unsplash.com/photo-1518614368389-1c2cccfb9f0a?w=600&q=80" alt="Hahndorf Retreat" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                        <span className="premium-card-tag">Hahndorf</span>
                      </div>
                      <div className="premium-card-content">
                        <p className="premium-card-location">Hahndorf, Australia</p>
                        <h3 className="premium-card-name">Hahndorf Retreat</h3>
                        <p className="premium-card-desc">A heritage retreat property nestled in the Adelaide Hills, offering coastal views and immersive nature experiences.</p>
                        <p className="premium-card-type">Heritage Property</p>
                        <Link href="/global-santcum/retreat-venues" className="premium-card-cta">Explore Venue&nbsp;→</Link>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
              <div className="premium-controls">
                <button
                  className="premium-arrow"
                  id="premiumPrev"
                  aria-label="Previous"
                  disabled={premiumSlide === 0}
                  onClick={() => { if (premiumSlide > 0) setPremiumSlide((s) => s - 1); }}
                >&larr;</button>
                <div className="premium-dots">
                  <button
                    className={`premium-dot${premiumSlide === 0 ? " premium-dot-active" : ""}`}
                    data-slide="0"
                    aria-label="Slide 1"
                    onClick={() => setPremiumSlide(0)}
                  />
                  <button
                    className={`premium-dot${premiumSlide === 1 ? " premium-dot-active" : ""}`}
                    data-slide="1"
                    aria-label="Slide 2"
                    onClick={() => setPremiumSlide(1)}
                  />
                </div>
                <button
                  className="premium-arrow"
                  id="premiumNext"
                  aria-label="Next"
                  disabled={premiumSlide === premiumTotal - 1}
                  onClick={() => { if (premiumSlide < premiumTotal - 1) setPremiumSlide((s) => s + 1); }}
                >&rarr;</button>
              </div>
            </div>
          </div>
        </section>

        <section className="quote-section" id="quoteSection" ref={quoteSectionRef}>
          <blockquote className="quote-text">
            <span className="quote-open">&ldquo;</span><span className="quote-typed" id="quoteTyped">{quoteTyped}</span><span className="quote-cursor" id="quoteCursor" style={quoteCursorVisible ? undefined : { display: "none" }}>|</span><span className="quote-close">&rdquo;</span>
          </blockquote>
          <cite className="quote-author"><span className="author-typed" id="authorTyped">{authorTyped}</span><span className={`author-cursor${authorCursorActive ? " active" : ""}`} id="authorCursor" style={authorCursorVisible ? undefined : { display: "none" }}>{authorCursorActive ? "|" : ""}</span></cite>
        </section>

        <section className="trending">
          <div className="trending-inner">
            <div className="trending-header">
              <p className="section-eyebrow">Where Seekers Are Journeying</p>
              <h2 className="section-title"><em>Destinations Defining Wellness Travel</em></h2>
              <p className="section-text">The places calling to those seeking transformation, restoration, and spaces that hold intention in their foundations.</p>
            </div>
            <div className="trending-grid">
              <Link href="/global-santcum/venues?country=australia" className="trending-item trending-item-large">
                <img src="/tgs-images/Australia%20Uluru%20Nordic%20Filter.png" alt="Australian landscape" loading="lazy" decoding="async" fetchPriority="low" width="1000" height="750" />
                <div className="trending-item-overlay" />
                <div className="trending-item-content">
                  <h3 className="trending-item-name">Australia</h3>
                  <p className="trending-item-tagline">Vast landscapes, ancient wellness</p>
                </div>
              </Link>
              <Link href="/global-santcum/venues?country=indonesia&region=bali" className="trending-item">
                <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" alt="Bali rice terraces" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                <div className="trending-item-overlay" />
                <div className="trending-item-content">
                  <h3 className="trending-item-name">Bali</h3>
                  <p className="trending-item-tagline">Sacred island, spiritual sanctuary</p>
                </div>
              </Link>
              <Link href="/global-santcum/venues?country=japan" className="trending-item">
                <img src="/tgs-images/Japan%20Temple%20Red%20Nordic%20Filter.png" alt="Japan temple" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                <div className="trending-item-overlay" />
                <div className="trending-item-content">
                  <h3 className="trending-item-name">Japan</h3>
                  <p className="trending-item-tagline">Ancient traditions, thermal waters</p>
                </div>
              </Link>
              <Link href="/global-santcum/venues?country=india" className="trending-item">
                <img src="/tgs-images/India%20Building%20Nordic%20Filter.png" alt="India temple" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                <div className="trending-item-overlay" />
                <div className="trending-item-content">
                  <h3 className="trending-item-name">India</h3>
                  <p className="trending-item-tagline">Ayurvedic wisdom, sacred journeys</p>
                </div>
              </Link>
              <Link href="/global-santcum/venues?country=thailand" className="trending-item">
                <img src="/tgs-images/Rice%20Terraces%20Nordic%20Filter.jpg" alt="Thailand rice terraces" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                <div className="trending-item-overlay" />
                <div className="trending-item-content">
                  <h3 className="trending-item-name">Thailand</h3>
                  <p className="trending-item-tagline">Tropical healing, mindful traditions</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="featured">
          <div className="featured-inner">
            <div className="featured-header">
              <div className="featured-header-content">
                <p className="section-eyebrow">Featured Sanctuaries</p>
                <h2 className="section-title">Our Collection of Featured Venues</h2>
                <p className="featured-subtitle">From Japanese onsen to Greek island retreats. Mountain sanctuaries to coastal hideaways. Spaces where the environment does half the healing.</p>
              </div>
              <Link href="/global-santcum/retreat-venues" className="featured-link">Explore All Venues<span>→</span></Link>
            </div>
            <div className="carousel-wrap">
              <div className="carousel-viewport">
                <div
                  className="carousel-track"
                  id="carouselTrack"
                  style={{ transform: `translateX(-${featuredSlide * 100}%)` }}
                >
                  <div className={`featured-slide${featuredSlide === 0 ? " is-active" : ""}`} data-slide="0">
                    <Link href="/global-santcum/retreat-venues" className="venue-card">
                      <div className="venue-card-image">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" alt="Aenaon Villas" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                        <span className="venue-card-tag">Greece</span>
                      </div>
                      <div className="venue-card-content">
                        <p className="venue-card-location">Santorini</p>
                        <h3 className="venue-card-name">Aenaon Villas</h3>
                        <span className="card-cta">Explore Venue →</span>
                      </div>
                    </Link>
                    <Link href="/global-santcum/retreat-venues" className="venue-card">
                      <div className="venue-card-image">
                        <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80" alt="The Sanctuary" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                        <span className="venue-card-tag">Australia</span>
                      </div>
                      <div className="venue-card-content">
                        <p className="venue-card-location">Byron Bay Hinterland</p>
                        <h3 className="venue-card-name">The Sanctuary</h3>
                        <span className="card-cta">Explore Venue →</span>
                      </div>
                    </Link>
                    <Link href="/global-santcum/retreat-venues" className="venue-card">
                      <div className="venue-card-image">
                        <img src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80" alt="Riad Jardin Secret" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                        <span className="venue-card-tag">Morocco</span>
                      </div>
                      <div className="venue-card-content">
                        <p className="venue-card-location">Marrakech</p>
                        <h3 className="venue-card-name">Riad Jardin Secret</h3>
                        <span className="card-cta">Explore Venue →</span>
                      </div>
                    </Link>
                  </div>
                  <div className={`featured-slide${featuredSlide === 1 ? " is-active" : ""}`} data-slide="1">
                    <Link href="/global-santcum/retreat-venues" className="venue-card">
                      <div className="venue-card-image">
                        <img src="https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80" alt="Bodhi Tree Yoga" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                        <span className="venue-card-tag">Costa Rica</span>
                      </div>
                      <div className="venue-card-content">
                        <p className="venue-card-location">Nosara</p>
                        <h3 className="venue-card-name">Bodhi Tree Yoga</h3>
                        <span className="card-cta">Explore Venue →</span>
                      </div>
                    </Link>
                    <Link href="/global-santcum/retreat-venues" className="venue-card">
                      <div className="venue-card-image">
                        <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80" alt="Samui Wellness Retreat" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                        <span className="venue-card-tag">Thailand</span>
                      </div>
                      <div className="venue-card-content">
                        <p className="venue-card-location">Koh Samui</p>
                        <h3 className="venue-card-name">Samui Wellness Retreat</h3>
                        <span className="card-cta">Explore Venue →</span>
                      </div>
                    </Link>
                    <Link href="/global-santcum/retreat-venues" className="venue-card">
                      <div className="venue-card-image">
                        <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" alt="The Layar Estate" loading="lazy" decoding="async" fetchPriority="low" width="600" height="450" />
                        <span className="venue-card-tag">Indonesia</span>
                      </div>
                      <div className="venue-card-content">
                        <p className="venue-card-location">Canggu, Bali</p>
                        <h3 className="venue-card-name">The Layar Estate</h3>
                        <span className="card-cta">Explore Venue →</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="carousel-controls">
                <button
                  className="carousel-arrow"
                  id="carouselPrev"
                  aria-label="Previous"
                  disabled={featuredSlide === 0}
                  onClick={() => { if (featuredSlide > 0) setFeaturedSlide((s) => s - 1); }}
                >←</button>
                <div className="carousel-dots">
                  <button
                    className={`carousel-dot${featuredSlide === 0 ? " carousel-dot-active" : ""}`}
                    data-slide="0"
                    aria-label="Slide 1"
                    onClick={() => setFeaturedSlide(0)}
                  />
                  <button
                    className={`carousel-dot${featuredSlide === 1 ? " carousel-dot-active" : ""}`}
                    data-slide="1"
                    aria-label="Slide 2"
                    onClick={() => setFeaturedSlide(1)}
                  />
                </div>
                <button
                  className="carousel-arrow"
                  id="carouselNext"
                  aria-label="Next"
                  disabled={featuredSlide === featuredTotal - 1}
                  onClick={() => { if (featuredSlide < featuredTotal - 1) setFeaturedSlide((s) => s + 1); }}
                >→</button>
              </div>
            </div>
          </div>
        </section>

        <section className="search-features">
          <div className="search-features-inner">
            <div className="search-features-image">
              <img src="/tgs-images/Man%20With%20Ipad%20Nordic%20Filter.png" alt="Wellness search on tablet" loading="lazy" decoding="async" fetchPriority="low" width="800" height="600" />
            </div>
            <div className="search-features-content">
              <p className="section-eyebrow" style={{ textAlign: "left" }}>Discover Intentionally</p>
              <h2 className="section-title" style={{ textAlign: "left" }}><em>Search Beyond The Surface</em></h2>
              <p className="section-text">Search for what truly matters — the practices supported, the experiences felt, the spaces designed, the environments created — not just where and when.</p>
              <div className="search-features-list">
                <div className="search-feature">
                  <h3 className="search-feature-title">By Modality</h3>
                  <p className="search-feature-text">Yoga, breathwork, plant medicine, somatic work, sound healing, permaculture and more.</p>
                </div>
                <div className="search-feature">
                  <h3 className="search-feature-title">By Location</h3>
                  <p className="search-feature-text">Coastal sanctuaries, mountain temples, thermal springs, tropical hideaways.</p>
                </div>
                <div className="search-feature">
                  <h3 className="search-feature-title">By Wellness Type</h3>
                  <p className="search-feature-text">Ayurvedic, traditional Chinese medicine, thermal hydrotherapy, cryotherapy.</p>
                </div>
                <div className="search-feature">
                  <h3 className="search-feature-title">By Architecture</h3>
                  <p className="search-feature-text">Eco lodges, heritage properties, purpose-built centres, minimalist sanctuaries.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="philosophy">
          <div className="philosophy-inner">
            <div className="philosophy-content">
              <p className="section-eyebrow" style={{ textAlign: "left" }}>Our Philosophy</p>
              <h2 className="section-title" style={{ textAlign: "left" }}><em>Wellness Should Feel Inevitable, Not Effortful</em></h2>
              <p className="section-text">We built The Global Sanctum because the world&apos;s most considered wellness spaces shouldn&apos;t be hidden behind algorithms or buried beneath noise. Because seekers deserve a guide. Because the right space, found at the right moment, changes everything.</p>
              <p className="section-text" style={{ marginTop: "16px" }}>Every retreat, sanctuary, and experience here has been chosen with one question in mind: would we send the people we love here? If the answer isn&apos;t yes, it isn&apos;t featured.</p>
              <div className="philosophy-principles">
                <div className="principle">
                  <h4 className="principle-title">Accessibility Without Pretence</h4>
                  <p className="principle-text">Every venue, every host, every wellness guest — elevated, never exclusionary</p>
                </div>
                <div className="principle">
                  <h4 className="principle-title">Reverence For The Craft</h4>
                  <p className="principle-text">Ancient traditions, modern practitioners, and the sacred lands they hold — honoured</p>
                </div>
                <div className="principle">
                  <h4 className="principle-title">Effortless By Design</h4>
                  <p className="principle-text">Discovery for guests, bookings for venues, tools for hosts — technology working quietly</p>
                </div>
                <div className="principle">
                  <h4 className="principle-title">A Higher Standard, Together</h4>
                  <p className="principle-text">Better data, deeper insight, and a bar we raise across the industry as one</p>
                </div>
              </div>
            </div>
            <div className="philosophy-images">
              <img src="/tgs-images/Moroccan%20Pool%20Scandi%20Filter.png" alt="Moroccan pool" loading="lazy" decoding="async" fetchPriority="low" width="800" height="600" />
              <img src="/tgs-images/Andean%20Man%20With%20Shell%20Nordic%20Filter.jpg" alt="Andean man with shell" loading="lazy" decoding="async" fetchPriority="low" width="400" height="300" />
              <img src="/tgs-images/Misty%20Forest%20Nordic%20Filter.png" alt="Misty forest" loading="lazy" decoding="async" fetchPriority="low" width="400" height="300" />
            </div>
          </div>
        </section>

        <section className="newsletter">
          <div className="newsletter-inner">
            <p className="newsletter-eyebrow">Stay Connected</p>
            <h2 className="newsletter-title">Join The Community</h2>
            <p className="newsletter-text">Featured venues, practitioner spotlights, wellness discoveries, and our global calendar of retreats. Curated for the Sanctum community, delivered weekly.</p>
            <form
              className="newsletter-form"
              id="newsletter-form"
              data-form-type="newsletter"
              onSubmit={(e) => e.preventDefault()}
            >
              <input type="hidden" name="submissionId" defaultValue="" />
              <input type="hidden" name="source" value="home_footer" readOnly />
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
                <label>Website (leave blank)<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <div className="cf-turnstile" data-sitekey="REPLACE_WITH_PRODUCTION_SITEKEY" data-size="invisible" />
              <input type="email" className="newsletter-input" id="newsletter-email" name="email" placeholder="Your email address" required aria-label="Email address for newsletter signup" autoComplete="email" />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </section>
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
      </footer>
    </div>
  );
}
