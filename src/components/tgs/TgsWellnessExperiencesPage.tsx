"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import TgsNavDrawer from "@/components/tgs/TgsNavDrawer";

const styles = `
:root {
  --charcoal: #313131;
  --warm-charcoal: #3A3A3A;
  --warm-white: #FDFCF9;
  --warm-cream: #F7F5F1;
  --gold: #C4A265;
  --gold-accent: #C4A265;
  --gold-dark: #7A644F;
  --mist: #8B8B8B;
  --light-rule: #E0D8CC;
  --charcoal-05: rgba(49, 49, 49, 0.05);
  --charcoal-08: rgba(49, 49, 49, 0.08);
  --charcoal-15: rgba(49, 49, 49, 0.15);
  --charcoal-30: rgba(49, 49, 49, 0.30);
  --charcoal-50: rgba(49, 49, 49, 0.50);
  --charcoal-70: rgba(49, 49, 49, 0.70);
  --font-sans: 'Montserrat', sans-serif;
  --font-serif: 'Cormorant Garamond', serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: 'Montserrat', sans-serif; background: var(--warm-white); color: var(--charcoal);
 overflow-x: hidden;
        }


.skip-to-content { position: absolute; top: -100px; left: 16px; background: var(--charcoal); color: var(--warm-white); padding: 12px 20px; z-index: 9999; font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; transition: top 0.2s; }
.skip-to-content:focus { top: 16px; outline: 2px solid var(--gold); }

/* NAV */
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
}
.nav-right { width: 80px; }

/* ════════════════════════════════════════════
   DRAWER (home v6 reference)
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
.drawer-secondary-link:hover { color: var(--charcoal); padding-left: 4px; }
.drawer-secondary-link svg { width: 16px; height: 16px; color: var(--charcoal-30); transition: color 0.2s; }
.drawer-secondary-link:hover svg { color: var(--charcoal); }
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
.hero { height:480px; position:relative; overflow:hidden; display:flex; align-items:flex-end; }
.hero-img { position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80') center/cover; transform:scale(1.04); animation:heroZoom 8s ease-out forwards; }
@keyframes heroZoom { from{transform:scale(1.04)} to{transform:scale(1)} }
.hero-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(49,49,49,0.72) 0%, rgba(49,49,49,0.1) 60%, transparent 100%); }
.hero-content { position:relative; z-index:2; padding:0 80px 56px; width:100%; display:flex; align-items:flex-end; justify-content:space-between; }
.hero-eyebrow { font-size:9px; font-weight:600; letter-spacing:3px; text-transform:uppercase; color:var(--gold); margin-bottom:14px; opacity:0; animation:fadeUp 0.8s 0.3s cubic-bezier(0.22,1,0.36,1) forwards; }
.hero-title { font-family:'Cormorant Garamond',serif; font-size:68px; font-weight:300; line-height:1.05; color:var(--warm-white); opacity:0; animation:fadeUp 0.8s 0.45s cubic-bezier(0.22,1,0.36,1) forwards; }
.hero-title em { font-style:italic; color:rgba(196,162,101,0.9); }
.hero-body { max-width:340px; font-size:11px; font-weight:300; color:rgba(253,252,249,0.65); line-height:1.8; text-align:right; opacity:0; animation:fadeUp 0.8s 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
@keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

/* INTRO BAR */
.intro-bar { background:var(--warm-cream); border-bottom:1px solid var(--light-rule); padding:28px 80px 32px; display:flex; align-items:center; justify-content:space-between; }
.intro-bar-text { font-size:11px; font-weight:300; color:var(--mist); line-height:1.6; }
.intro-bar-text a { color:var(--gold-dark); text-decoration:none; border-bottom:1px solid rgba(122,100,79,0.3); }
.intro-bar-count { font-family:'Cormorant Garamond',serif; font-size:13px; font-weight:300; color:var(--mist); white-space:nowrap; }
.intro-bar-count em { font-style:italic; color:var(--gold-dark); }

/* CATEGORIES SECTION */
.categories { padding-top:48px; }

/* CATEGORY ROW */
.category-item { border-bottom:1px solid var(--light-rule); overflow:hidden; }
.category-header { padding:0 80px; display:grid; grid-template-columns:72px 1fr auto 32px; align-items:center; gap:24px; cursor:pointer; min-height:80px; transition:background 0.25s; user-select:none; }
.category-header:hover { background:var(--warm-cream); }
.category-header.active { background:var(--charcoal); }
.cat-num { font-family:'Cormorant Garamond',serif; font-size:13px; font-weight:300; color:var(--gold-dark); letter-spacing:0.5px; transition:color 0.25s; }
.category-header.active .cat-num { color:rgba(253,252,249,0.2); }
.cat-text { display:flex; flex-direction:column; gap:3px; }
.cat-name { font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:400; color:var(--charcoal); line-height:1.2; margin:0; transition:color 0.25s; }
.category-header:hover .cat-name { color:var(--gold-dark); }
.category-header.active .cat-name { color:var(--warm-white); }
.cat-tagline { font-size:11px; font-weight:400; color:#5A5A5A; transition:color 0.25s; }
.category-header.active .cat-tagline { color:rgba(253,252,249,0.4); }
.cat-count { font-size:10px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:#5A5A5A; white-space:nowrap; transition:color 0.25s; }
.category-header.active .cat-count { color:rgba(253,252,249,0.3); }
.cat-toggle { font-size:20px; line-height:1; color:var(--light-rule); transition:transform 0.4s cubic-bezier(0.22,1,0.36,1), color 0.25s; }
.category-header.active .cat-toggle { transform:rotate(45deg); color:var(--gold); }

/* PANEL */
.category-panel { max-height:0; overflow:hidden; transition:max-height 0.65s cubic-bezier(0.22,1,0.36,1); }
.category-panel.open { max-height:1400px; }
.panel-inner { display:grid; grid-template-columns:1fr 1fr; grid-template-rows:auto; }

/* IMAGE HALF */
.panel-image { position:relative; overflow:hidden; min-height:400px; }
.panel-image img { width:100%; height:100%; object-fit:cover; transform:scale(1.06); transition:transform 0.8s cubic-bezier(0.22,1,0.36,1); display:block; }
.category-panel.open .panel-image img { transform:scale(1); }
.panel-image-overlay { position:absolute; inset:0; background:linear-gradient(135deg,rgba(49,49,49,0.35) 0%,transparent 60%); }
.panel-image-label { position:absolute; bottom:28px; left:32px; font-family:'Cormorant Garamond',serif; font-size:32px; font-weight:300; font-style:italic; color:var(--warm-white); line-height:1.15; opacity:0; transform:translateY(12px); transition:opacity 0.5s 0.2s, transform 0.5s 0.2s cubic-bezier(0.22,1,0.36,1); }
.category-panel.open .panel-image-label { opacity:1; transform:translateY(0); }

/* CONTENT HALF */
.panel-content { background:var(--warm-cream); padding:40px 48px 40px 40px; display:flex; flex-direction:column; gap:20px; }
.panel-content-eyebrow { font-size:8px; font-weight:600; letter-spacing:3px; text-transform:uppercase; color:var(--gold-dark); opacity:0; transform:translateY(8px); transition:opacity 0.4s 0.15s, transform 0.4s 0.15s; }
.category-panel.open .panel-content-eyebrow { opacity:1; transform:translateY(0); }
.panel-content-intro { font-size:13px; font-weight:400; color:#4A4A4A; line-height:1.75; max-width:360px; opacity:0; transform:translateY(8px); transition:opacity 0.4s 0.22s, transform 0.4s 0.22s; }
.category-panel.open .panel-content-intro { opacity:1; transform:translateY(0); }
.panel-tags { display:flex; flex-wrap:wrap; gap:8px; opacity:0; transform:translateY(8px); transition:opacity 0.4s 0.3s, transform 0.4s 0.3s; }
.category-panel.open .panel-tags { opacity:1; transform:translateY(0); }
.sub-tag { display:inline-flex; align-items:center; gap:7px; padding:8px 14px; background:var(--warm-white); border:1px solid var(--light-rule); border-radius:2px; font-family:'Montserrat',sans-serif; font-size:10px; font-weight:500; color:var(--charcoal); cursor:pointer; transition:all 0.2s; }
.sub-tag:hover, .sub-tag.active { background:var(--charcoal); border-color:var(--charcoal); color:var(--warm-white); }
.sub-tag-arrow { font-size:9px; opacity:0; transform:translateX(-4px); transition:all 0.2s; }
.sub-tag:hover .sub-tag-arrow, .sub-tag.active .sub-tag-arrow { opacity:1; transform:translateX(0); }
.panel-explore-link { margin-top:auto; font-size:9px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:var(--gold-dark); text-decoration:none; display:inline-flex; align-items:center; gap:8px; opacity:0; transform:translateY(6px); transition:opacity 0.4s 0.38s, transform 0.4s 0.38s, gap 0.2s, color 0.2s; }
.category-panel.open .panel-explore-link { opacity:1; transform:translateY(0); }
.panel-explore-link:hover { color:var(--charcoal); gap:12px; }

/* VENUE RESULTS */
.venue-results { max-height:0; overflow:hidden; opacity:0; transition:max-height 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.3s; grid-column:1 / -1; background:var(--warm-white); border-top:1px solid var(--light-rule); }
.venue-results.open { max-height:600px; opacity:1; }
.venue-results-inner { padding:32px 40px; }
.venue-results-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; }
.venue-results-label { font-size:8px; font-weight:600; letter-spacing:3px; text-transform:uppercase; color:var(--gold-dark); }
.venue-results-count { font-size:10px; font-weight:300; color:var(--mist); }
.venue-results-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.result-card { background:var(--warm-cream); border:1px solid var(--light-rule); overflow:hidden; transition:transform 0.3s ease, box-shadow 0.3s ease; }
.result-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(49,49,49,0.08); }
.result-card-image { position:relative; height:160px; overflow:hidden; }
.result-card-image img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease; display:block; }
.result-card:hover .result-card-image img { transform:scale(1.04); }
.result-card-country { position:absolute; top:12px; left:12px; font-family:'Montserrat',sans-serif; font-size:8px; font-weight:500; letter-spacing:1px; text-transform:uppercase; padding:5px 10px; background:var(--warm-white); color:var(--charcoal); }
.result-card-body { padding:18px 20px; }
.result-card-location { font-family:'Montserrat',sans-serif; font-size:9px; font-weight:400; letter-spacing:2px; text-transform:uppercase; color:var(--mist); margin-bottom:5px; }
.result-card-name { font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:400; color:var(--charcoal); margin:0 0 10px; line-height:1.25; }
.result-card-meta { display:flex; gap:12px; padding-top:10px; border-top:1px solid var(--light-rule); margin-bottom:14px; }
.result-card-meta-item { font-family:'Montserrat',sans-serif; font-size:9px; font-weight:300; color:var(--mist); }
.result-card-meta-item strong { color:var(--charcoal); font-weight:500; }
.result-card-cta { font-family:'Montserrat',sans-serif; font-size:9px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:var(--gold-dark); text-decoration:none; display:inline-flex; align-items:center; gap:6px; transition:gap 0.2s, color 0.2s; }
.result-card-cta:hover { gap:10px; color:var(--charcoal); }

/* INFO STRIP */
.info-strip { display:grid; grid-template-columns:1fr 1fr; border-top:1px solid var(--light-rule); border-bottom:1px solid var(--light-rule); margin-top:48px; }
.info-cell { padding:48px; border-right:1px solid var(--light-rule); }
.info-cell:last-child { border-right:none; }
.info-cell-eyebrow { font-size:8px; font-weight:600; letter-spacing:3px; text-transform:uppercase; color:var(--gold-dark); margin-bottom:12px; }
.info-cell-heading { font-family:'Cormorant Garamond',serif; font-size:21px; font-weight:400; color:var(--charcoal); line-height:1.3; margin-bottom:10px; }
.info-cell-body { font-size:10px; font-weight:300; color:var(--mist); line-height:1.8; }

/* FOOTER */
/* ═══ FOOTER — home v6 reference 5-column architecture ═══════════════ */
.footer { background: var(--charcoal); color: rgba(255,255,255,0.7); padding: 80px 48px 40px; }
.footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr repeat(4, 1fr); gap: 48px; padding-bottom: 56px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.footer-brand { display: flex; flex-direction: column; gap: 20px; }
.footer-logo-placeholder { width: 72px; height: 72px; border: 2px dashed var(--gold); border-radius: 10px; display: flex; align-items: center; justify-content: center; background: rgba(196, 162, 101, 0.08); flex-shrink: 0; }
.footer-logo-placeholder span { font-family: 'Montserrat', sans-serif; font-size: 8px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: var(--gold); text-align: center; line-height: 1.3; padding: 4px; }
.footer-brand-name { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 400; line-height: 1.7; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.9); }
.footer-brand-text { font-family: 'Cormorant Garamond', serif; font-size: 15px; font-weight: 400; line-height: 1.7; color: rgba(255,255,255,0.5); }
.footer-brand-meta { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 400; line-height: 1.7; letter-spacing: 0.05em; color: rgba(255,255,255,0.35); }
.footer-col-title { font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 500; line-height: 1.7; letter-spacing: 0.20em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 24px; }
.footer-links { list-style: none; display: flex; flex-direction: column; gap: 14px; line-height: 1.7; }
.footer-links a { font-family: 'Cormorant Garamond', serif; font-size: 15px; font-weight: 400; line-height: 1.7; color: rgba(255,255,255,0.6); transition: color 0.3s; text-decoration: none; }
.footer-links a:hover { color: rgba(255,255,255,0.95); }
.footer-bottom { max-width: 1400px; margin: 0 auto; padding-top: 32px; display: flex; justify-content: space-between; align-items: center; }
.footer-copyright { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 400; line-height: 1.7; letter-spacing: 0.05em; color: rgba(255,255,255,0.3); margin: 0; }
.footer-social { display: flex; gap: 24px; }
.footer-social a { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 500; line-height: 1.7; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.4); transition: color 0.3s ease; text-decoration: none; }
.footer-social a:hover { color: var(--gold); }

@media (max-width: 1100px) {
  .footer-grid { grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
}
@media (max-width: 768px) {
  .nav { padding: 18px 24px; }
  .nav-hamburger-label { display: none; }
  .footer { padding: 60px 24px 24px; }
  .footer-grid { grid-template-columns: 1fr; gap: 32px; }
}
@media (max-width: 600px) {
  .footer-bottom { flex-direction: column; gap: 20px; align-items: flex-start; padding-top: 28px; }
  .footer-copyright { white-space: normal; }
  .footer-social { gap: 20px; }
}

/* RESPONSIVE */
@media(max-width:900px){
  nav { padding:0 24px; }
  .hero-content { padding:0 24px 40px; flex-direction:column; align-items:flex-start; gap:16px; }
  .hero-title { font-size:44px; }
  .hero-body { text-align:left; max-width:100%; }
  .intro-bar { padding:16px 24px; flex-direction:column; gap:8px; align-items:flex-start; }
  .category-header { padding:0 24px; grid-template-columns:48px 1fr 24px; }
  .cat-count { display:none; }
  .cat-toggle { font-size: 24px; color: var(--gold-dark); }
  .panel-inner { grid-template-columns:1fr; }
  .panel-image { min-height:240px; }
  .panel-content { padding:28px 24px; }
  .venue-results-grid { grid-template-columns:1fr; }
  .info-strip { grid-template-columns:1fr; }
  .info-cell { border-right:none; border-bottom:1px solid var(--light-rule); padding:32px 24px; }
}
`;

type Venue = {
  name: string;
  location: string;
  country: string;
  price: string;
  duration: string;
  img: string;
  slug: string;
};

type SubTag = {
  slug: string;
  label: string;
  text: string;
};

type Category = {
  num: string;
  name: React.ReactNode;
  tagline: string;
  count: number;
  img: string;
  alt: string;
  imageLabel: React.ReactNode;
  eyebrow: string;
  intro: string;
  tags: SubTag[];
  exploreHref: string;
  exploreLabel: string;
};

const venueData: Record<string, Venue[]> = {
  'onsen': [
    { name:'Goen no Mori Retreat', location:'Yugawara, Japan', country:'Japan', price:'From ¥45,000', duration:'90 min', img:'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80', slug:'japan/yugawara/goen-no-mori-retreat' },
    { name:'Kurama Mountain Retreat', location:'Kyoto, Japan', country:'Japan', price:'From ¥38,000', duration:'60 min', img:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', slug:'japan/kyoto/kurama-mountain-retreat' },
  ],
  'contrast-therapy': [
    { name:'Aenaon Villas', location:'Santorini, Greece', country:'Greece', price:'From €120', duration:'60 min', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', slug:'greece/santorini/aenaon-villas' },
    { name:'Herdade da Comporta', location:'Alentejo, Portugal', country:'Portugal', price:'From €95', duration:'75 min', img:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80', slug:'portugal/alentejo/herdade-da-comporta' },
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$180', duration:'60 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
  ],
  'flotation': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $110', duration:'60 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$150', duration:'90 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
  ],
  'thalassotherapy': [
    { name:'Herdade da Comporta', location:'Alentejo, Portugal', country:'Portugal', price:'From €140', duration:'90 min', img:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80', slug:'portugal/alentejo/herdade-da-comporta' },
    { name:'Aenaon Villas', location:'Santorini, Greece', country:'Greece', price:'From €160', duration:'75 min', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', slug:'greece/santorini/aenaon-villas' },
  ],
  'steam-sauna': [
    { name:'Goen no Mori Retreat', location:'Yugawara, Japan', country:'Japan', price:'Included', duration:'Unlimited', img:'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80', slug:'japan/yugawara/goen-no-mori-retreat' },
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $60', duration:'45 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'Riad Jardin Secret', location:'Marrakech, Morocco', country:'Morocco', price:'From $75', duration:'60 min', img:'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80', slug:'morocco/marrakech/riad-jardin-secret' },
  ],
  'cold-immersion': [
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$95', duration:'30 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
    { name:'Kurama Mountain Retreat', location:'Kyoto, Japan', country:'Japan', price:'From ¥12,000', duration:'45 min', img:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', slug:'japan/kyoto/kurama-mountain-retreat' },
  ],
  'hammam': [
    { name:'Riad Jardin Secret', location:'Marrakech, Morocco', country:'Morocco', price:'From $85', duration:'90 min', img:'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80', slug:'morocco/marrakech/riad-jardin-secret' },
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $95', duration:'75 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
  ],
  'hatha': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $65', duration:'90 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$90', duration:'75 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'From $80', duration:'90 min', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
  ],
  'vinyasa': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $65', duration:'75 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'From $75', duration:'60 min', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
  ],
  'yin': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $55', duration:'90 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'Goen no Mori Retreat', location:'Yugawara, Japan', country:'Japan', price:'From ¥18,000', duration:'75 min', img:'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80', slug:'japan/yugawara/goen-no-mori-retreat' },
  ],
  'kundalini': [
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'From $90', duration:'90 min', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $75', duration:'90 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
  ],
  'somatic': [
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$120', duration:'60 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
    { name:'Herdade da Comporta', location:'Alentejo, Portugal', country:'Portugal', price:'From €110', duration:'75 min', img:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80', slug:'portugal/alentejo/herdade-da-comporta' },
  ],
  'qigong': [
    { name:'Goen no Mori Retreat', location:'Yugawara, Japan', country:'Japan', price:'From ¥15,000', duration:'60 min', img:'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80', slug:'japan/yugawara/goen-no-mori-retreat' },
    { name:'Kurama Mountain Retreat', location:'Kyoto, Japan', country:'Japan', price:'From ¥12,000', duration:'60 min', img:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', slug:'japan/kyoto/kurama-mountain-retreat' },
  ],
  'ecstatic-dance': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $45', duration:'2 hrs', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'From $55', duration:'2 hrs', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
  ],
  'nidra': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $50', duration:'60 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $60', duration:'60 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
  ],
  'holotropic': [
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'From $150', duration:'3 hrs', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$200', duration:'3 hrs', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
  ],
  'wim-hof': [
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$120', duration:'2 hrs', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
    { name:'Herdade da Comporta', location:'Alentejo, Portugal', country:'Portugal', price:'From €130', duration:'2 hrs', img:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80', slug:'portugal/alentejo/herdade-da-comporta' },
  ],
  'pranayama': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $55', duration:'60 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $65', duration:'75 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'From $70', duration:'60 min', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
  ],
  'rebirthing': [
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'From $180', duration:'2.5 hrs', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
  ],
  'transformational-breath': [
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$160', duration:'2 hrs', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $120', duration:'90 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
  ],
  'sound-bath': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $95', duration:'60 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $70', duration:'75 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'From $85', duration:'60 min', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
  ],
  'gong-therapy': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $80', duration:'75 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'Goen no Mori Retreat', location:'Yugawara, Japan', country:'Japan', price:'From ¥22,000', duration:'60 min', img:'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80', slug:'japan/yugawara/goen-no-mori-retreat' },
  ],
  'crystal-bowls': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $85', duration:'60 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$110', duration:'60 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
  ],
  'binaural': [
    { name:'Goen no Mori Retreat', location:'Yugawara, Japan', country:'Japan', price:'From ¥15,000', duration:'45 min', img:'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80', slug:'japan/yugawara/goen-no-mori-retreat' },
  ],
  'mantra': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $45', duration:'60 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'Kurama Mountain Retreat', location:'Kyoto, Japan', country:'Japan', price:'From ¥10,000', duration:'45 min', img:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', slug:'japan/kyoto/kurama-mountain-retreat' },
  ],
  'tuning-forks': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $90', duration:'60 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
  ],
  'panchakarma': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $320/day', duration:'5–21 days', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $280/day', duration:'7–14 days', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
  ],
  'abhyanga': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $110', duration:'75 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $95', duration:'90 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
  ],
  'shirodhara': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $130', duration:'60 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $115', duration:'75 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
  ],
  'marma': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $120', duration:'60 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
  ],
  'ayurvedic-nutrition': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'Included in stay', duration:'Ongoing', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $80/consult', duration:'60 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
  ],
  'pulse-diagnosis': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $90', duration:'45 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
  ],
  'aboriginal-healing': [
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$180', duration:'90 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
  ],
  'andean-therapies': [
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'From $160', duration:'2 hrs', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
  ],
  'native-american': [
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'Enquire', duration:'Varies', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
  ],
  'sweat-lodge': [
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'From $120', duration:'3 hrs', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$150', duration:'3 hrs', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
  ],
  'maori-healing': [
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$200', duration:'90 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
  ],
  'african-traditions': [
    { name:'Riad Jardin Secret', location:'Marrakech, Morocco', country:'Morocco', price:'Enquire', duration:'Varies', img:'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80', slug:'morocco/marrakech/riad-jardin-secret' },
  ],
  'shamanic': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $180', duration:'3 hrs', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'From $200', duration:'4 hrs', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
  ],
  'cacao-ceremony': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $55', duration:'2 hrs', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'From $65', duration:'2.5 hrs', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
  ],
  'kambo': [
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'From $250', duration:'4 hrs', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
  ],
  'hape': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $80', duration:'60 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'From $90', duration:'90 min', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
  ],
  'herbal-medicine': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $75', duration:'60 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'Riad Jardin Secret', location:'Marrakech, Morocco', country:'Morocco', price:'From $65', duration:'45 min', img:'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80', slug:'morocco/marrakech/riad-jardin-secret' },
  ],
  'flower-essences': [
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$95', duration:'45 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $70', duration:'45 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
  ],
  'vipassana': [
    { name:'Goen no Mori Retreat', location:'Yugawara, Japan', country:'Japan', price:'From ¥25,000', duration:'2 hrs', img:'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80', slug:'japan/yugawara/goen-no-mori-retreat' },
    { name:'Kurama Mountain Retreat', location:'Kyoto, Japan', country:'Japan', price:'From ¥20,000', duration:'3 hrs', img:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', slug:'japan/kyoto/kurama-mountain-retreat' },
  ],
  'zen': [
    { name:'Kurama Mountain Retreat', location:'Kyoto, Japan', country:'Japan', price:'Included in stay', duration:'Daily', img:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', slug:'japan/kyoto/kurama-mountain-retreat' },
    { name:'Goen no Mori Retreat', location:'Yugawara, Japan', country:'Japan', price:'Included in stay', duration:'Daily', img:'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80', slug:'japan/yugawara/goen-no-mori-retreat' },
  ],
  'transcendental': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $120', duration:'90 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $100', duration:'75 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
  ],
  'walking-meditation': [
    { name:'Kurama Mountain Retreat', location:'Kyoto, Japan', country:'Japan', price:'Included in stay', duration:'60 min', img:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', slug:'japan/kyoto/kurama-mountain-retreat' },
    { name:'Herdade da Comporta', location:'Alentejo, Portugal', country:'Portugal', price:'From €60', duration:'90 min', img:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80', slug:'portugal/alentejo/herdade-da-comporta' },
  ],
  'yoga-nidra': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $55', duration:'60 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'From $65', duration:'75 min', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
  ],
  'mbsr': [
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$140', duration:'2 hrs', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
    { name:'Herdade da Comporta', location:'Alentejo, Portugal', country:'Portugal', price:'From €120', duration:'2 hrs', img:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80', slug:'portugal/alentejo/herdade-da-comporta' },
  ],
  'thai-massage': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $85', duration:'90 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $75', duration:'60 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'Goen no Mori Retreat', location:'Yugawara, Japan', country:'Japan', price:'From ¥18,000', duration:'60 min', img:'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80', slug:'japan/yugawara/goen-no-mori-retreat' },
  ],
  'craniosacral': [
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$150', duration:'60 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
    { name:'Herdade da Comporta', location:'Alentejo, Portugal', country:'Portugal', price:'From €140', duration:'75 min', img:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80', slug:'portugal/alentejo/herdade-da-comporta' },
  ],
  'rolfing': [
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$180', duration:'75 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
  ],
  'shiatsu': [
    { name:'Goen no Mori Retreat', location:'Yugawara, Japan', country:'Japan', price:'From ¥22,000', duration:'60 min', img:'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80', slug:'japan/yugawara/goen-no-mori-retreat' },
    { name:'Kurama Mountain Retreat', location:'Kyoto, Japan', country:'Japan', price:'From ¥18,000', duration:'60 min', img:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', slug:'japan/kyoto/kurama-mountain-retreat' },
  ],
  'lymphatic': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $100', duration:'60 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'Aenaon Villas', location:'Santorini, Greece', country:'Greece', price:'From €130', duration:'60 min', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', slug:'greece/santorini/aenaon-villas' },
  ],
  'myofascial': [
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$140', duration:'60 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
  ],
  'lomi-lomi': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $110', duration:'90 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$160', duration:'90 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
  ],
  'juice-fasting': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $180/day', duration:'3–7 days', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $160/day', duration:'3–7 days', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
  ],
  'raw-food': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'Included in stay', duration:'Daily', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'Included in stay', duration:'Daily', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
  ],
  'detox': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $250/day', duration:'5–10 days', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'Aenaon Villas', location:'Santorini, Greece', country:'Greece', price:'From €220/day', duration:'3–7 days', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', slug:'greece/santorini/aenaon-villas' },
  ],
  'macrobiotic': [
    { name:'Goen no Mori Retreat', location:'Yugawara, Japan', country:'Japan', price:'Included in stay', duration:'Daily', img:'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80', slug:'japan/yugawara/goen-no-mori-retreat' },
  ],
  'therapeutic-fasting': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $300/day', duration:'7–21 days', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'Herdade da Comporta', location:'Alentejo, Portugal', country:'Portugal', price:'From €280/day', duration:'5–10 days', img:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80', slug:'portugal/alentejo/herdade-da-comporta' },
  ],
  'forest-bathing': [
    { name:'Goen no Mori Retreat', location:'Yugawara, Japan', country:'Japan', price:'Included in stay', duration:'2 hrs', img:'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80', slug:'japan/yugawara/goen-no-mori-retreat' },
    { name:'Kurama Mountain Retreat', location:'Kyoto, Japan', country:'Japan', price:'Included in stay', duration:'2 hrs', img:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', slug:'japan/kyoto/kurama-mountain-retreat' },
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$120', duration:'2 hrs', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
  ],
  'wild-swimming': [
    { name:'Herdade da Comporta', location:'Alentejo, Portugal', country:'Portugal', price:'Included in stay', duration:'Open', img:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80', slug:'portugal/alentejo/herdade-da-comporta' },
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'Included in stay', duration:'Open', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
  ],
  'earthing': [
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$80', duration:'60 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
    { name:'Herdade da Comporta', location:'Alentejo, Portugal', country:'Portugal', price:'From €70', duration:'60 min', img:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80', slug:'portugal/alentejo/herdade-da-comporta' },
  ],
  'wilderness-therapy': [
    { name:'Bodhi Tree Yoga', location:'Nosara, Costa Rica', country:'Costa Rica', price:'From $200', duration:'Full day', img:'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80', slug:'costa-rica/nosara/bodhi-tree-yoga' },
  ],
  'ecotherapy': [
    { name:'Herdade da Comporta', location:'Alentejo, Portugal', country:'Portugal', price:'From €150', duration:'3 hrs', img:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80', slug:'portugal/alentejo/herdade-da-comporta' },
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$140', duration:'2.5 hrs', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
  ],
  'reiki': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $85', duration:'60 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$120', duration:'60 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $90', duration:'60 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
  ],
  'acupuncture': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $95', duration:'60 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'Goen no Mori Retreat', location:'Yugawara, Japan', country:'Japan', price:'From ¥20,000', duration:'60 min', img:'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80', slug:'japan/yugawara/goen-no-mori-retreat' },
  ],
  'human-design': [
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$150', duration:'90 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $120', duration:'90 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
  ],
  'akashic': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $130', duration:'75 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
  ],
  'theta-healing': [
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $140', duration:'75 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$160', duration:'90 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
  ],
  'pranic-healing': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $110', duration:'60 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'Intaaya Wellness Sanctuary', location:'Ubud, Bali', country:'Indonesia', price:'From $100', duration:'60 min', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug:'indonesia/ubud/intaaya-wellness-sanctuary' },
  ],
  'halotherapy': [
    { name:'Aenaon Villas', location:'Santorini, Greece', country:'Greece', price:'From €85', duration:'45 min', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', slug:'greece/santorini/aenaon-villas' },
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$95', duration:'45 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
  ],
  'cryotherapy': [
    { name:'Aenaon Villas', location:'Santorini, Greece', country:'Greece', price:'From €150', duration:'30 min', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', slug:'greece/santorini/aenaon-villas' },
    { name:'Herdade da Comporta', location:'Alentejo, Portugal', country:'Portugal', price:'From €140', duration:'30 min', img:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80', slug:'portugal/alentejo/herdade-da-comporta' },
  ],
  'infrared-sauna': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $75', duration:'45 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$85', duration:'45 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
    { name:'Aenaon Villas', location:'Santorini, Greece', country:'Greece', price:'From €90', duration:'45 min', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', slug:'greece/santorini/aenaon-villas' },
  ],
  'iv-therapy': [
    { name:'Aenaon Villas', location:'Santorini, Greece', country:'Greece', price:'From €220', duration:'60 min', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', slug:'greece/santorini/aenaon-villas' },
  ],
  'hyperbaric': [
    { name:'Aenaon Villas', location:'Santorini, Greece', country:'Greece', price:'From €180', duration:'60 min', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', slug:'greece/santorini/aenaon-villas' },
  ],
  'compression': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $65', duration:'30 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$75', duration:'30 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
  ],
  'red-light': [
    { name:'Aenaon Villas', location:'Santorini, Greece', country:'Greece', price:'From €95', duration:'20 min', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', slug:'greece/santorini/aenaon-villas' },
    { name:'Herdade da Comporta', location:'Alentejo, Portugal', country:'Portugal', price:'From €85', duration:'20 min', img:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80', slug:'portugal/alentejo/herdade-da-comporta' },
  ],
  'biofeedback': [
    { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'From A$180', duration:'60 min', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
  ],
  'spa-treatments': [
    { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'From $80', duration:'60 min', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
    { name:'Aenaon Villas', location:'Santorini, Greece', country:'Greece', price:'From €120', duration:'60 min', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', slug:'greece/santorini/aenaon-villas' },
    { name:'Riad Jardin Secret', location:'Marrakech, Morocco', country:'Morocco', price:'From $95', duration:'75 min', img:'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80', slug:'morocco/marrakech/riad-jardin-secret' },
  ],
};

const defaultVenues: Venue[] = [
  { name:'Amataya Wellness Resort', location:'Chiang Mai, Thailand', country:'Thailand', price:'Enquire', duration:'Varies', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', slug:'thailand/chiang-mai/amataya-wellness-resort' },
  { name:'The Sanctuary Byron', location:'Byron Bay, Australia', country:'Australia', price:'Enquire', duration:'Varies', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', slug:'australia/byron-bay/the-sanctuary' },
];

const categories: Category[] = [
  {
    num: "01",
    name: "Thermal & Hydrotherapy",
    tagline: "Ancient waters, volcanic springs, heat and cold immersion",
    count: 7,
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80",
    alt: "Thermal bathing",
    imageLabel: (<>Ancient waters.<br />Volcanic springs.</>),
    eyebrow: "Thermal & Hydrotherapy",
    intro: "From Japanese onsen to Scandinavian contrast rituals, water has been humanity's oldest healing medium. These practices harness heat, cold, and mineral-rich waters to restore and recalibrate.",
    tags: [
      { slug: "onsen", label: "Japanese Onsen", text: "Japanese Onsen" },
      { slug: "contrast-therapy", label: "Contrast Therapy", text: "Contrast Therapy" },
      { slug: "flotation", label: "Flotation & REST", text: "Flotation & REST" },
      { slug: "thalassotherapy", label: "Thalassotherapy", text: "Thalassotherapy" },
      { slug: "steam-sauna", label: "Steam & Sauna Rituals", text: "Steam & Sauna Rituals" },
      { slug: "cold-immersion", label: "Cold Water Immersion", text: "Cold Water Immersion" },
      { slug: "hammam", label: "Hammam & Ritual Bathing", text: "Hammam & Ritual Bathing" },
    ],
    exploreHref: "/global-santcum/venues?category=thermal",
    exploreLabel: "Explore all thermal venues →",
  },
  {
    num: "02",
    name: "Yoga & Movement",
    tagline: "Classical traditions, somatic practices, conscious movement",
    count: 8,
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80",
    alt: "Yoga practice",
    imageLabel: (<>Classical traditions.<br />Conscious movement.</>),
    eyebrow: "Yoga & Movement",
    intro: "From the stillness of Yin to the fire of Kundalini. Classical yoga traditions alongside contemporary somatic and movement practices that bring the body into conversation with the mind.",
    tags: [
      { slug: "hatha", label: "Hatha Yoga", text: "Hatha Yoga" },
      { slug: "vinyasa", label: "Vinyasa & Flow", text: "Vinyasa & Flow" },
      { slug: "yin", label: "Yin Yoga", text: "Yin Yoga" },
      { slug: "kundalini", label: "Kundalini Yoga", text: "Kundalini Yoga" },
      { slug: "somatic", label: "Somatic Movement", text: "Somatic Movement" },
      { slug: "qigong", label: "Qigong & Tai Chi", text: "Qigong & Tai Chi" },
      { slug: "ecstatic-dance", label: "Ecstatic Dance", text: "Ecstatic Dance" },
      { slug: "nidra", label: "Yoga Nidra", text: "Yoga Nidra" },
    ],
    exploreHref: "/global-santcum/venues?category=yoga",
    exploreLabel: "Explore all yoga venues →",
  },
  {
    num: "03",
    name: "Breathwork",
    tagline: "Pranayama, holotropic traditions, conscious respiration",
    count: 5,
    img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=900&q=80",
    alt: "Breathwork",
    imageLabel: (<>The breath as<br />doorway.</>),
    eyebrow: "Breathwork",
    intro: "The oldest tool for transformation available to us. From gentle pranayama to the deep cathartic journey of holotropic work, these practices recalibrate the nervous system at the most fundamental level.",
    tags: [
      { slug: "holotropic", label: "Holotropic Breathwork", text: "Holotropic Breathwork" },
      { slug: "wim-hof", label: "Wim Hof Method", text: "Wim Hof Method" },
      { slug: "pranayama", label: "Pranayama", text: "Pranayama" },
      { slug: "rebirthing", label: "Rebirthing Breathwork", text: "Rebirthing Breathwork" },
      { slug: "transformational-breath", label: "Transformational Breath", text: "Transformational Breath" },
    ],
    exploreHref: "/global-santcum/venues?category=breathwork",
    exploreLabel: "Explore all breathwork venues →",
  },
  {
    num: "04",
    name: "Sound & Vibrational",
    tagline: "Frequencies, resonance, and the healing power of sound",
    count: 6,
    img: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=900&q=80",
    alt: "Sound healing",
    imageLabel: (<>Frequencies that<br />recalibrate.</>),
    eyebrow: "Sound & Vibrational",
    intro: "Sound moves through the body differently than other healing modalities — it bypasses the thinking mind and works directly on tissue, emotion, and the nervous system.",
    tags: [
      { slug: "sound-bath", label: "Sound Bath", text: "Sound Bath" },
      { slug: "gong-therapy", label: "Gong Therapy", text: "Gong Therapy" },
      { slug: "crystal-bowls", label: "Crystal Singing Bowls", text: "Crystal Singing Bowls" },
      { slug: "binaural", label: "Binaural Frequencies", text: "Binaural Frequencies" },
      { slug: "mantra", label: "Mantra & Chanting", text: "Mantra & Chanting" },
      { slug: "tuning-forks", label: "Tuning Fork Therapy", text: "Tuning Fork Therapy" },
    ],
    exploreHref: "/global-santcum/venues?category=sound",
    exploreLabel: "Explore all sound healing venues →",
  },
  {
    num: "05",
    name: "Ayurveda",
    tagline: "5,000 years of Indian healing science and constitutional medicine",
    count: 6,
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80",
    alt: "Ayurveda",
    imageLabel: (<>Ancient science.<br />Living medicine.</>),
    eyebrow: "Ayurveda",
    intro: "One of the world's oldest living healing systems. Ayurveda works with individual constitution — your dosha — to bring body, mind, and spirit into alignment through diet, ritual, and therapeutic practice.",
    tags: [
      { slug: "panchakarma", label: "Panchakarma", text: "Panchakarma" },
      { slug: "abhyanga", label: "Abhyanga Massage", text: "Abhyanga Massage" },
      { slug: "shirodhara", label: "Shirodhara", text: "Shirodhara" },
      { slug: "marma", label: "Marma Therapy", text: "Marma Therapy" },
      { slug: "ayurvedic-nutrition", label: "Ayurvedic Nutrition", text: "Ayurvedic Nutrition" },
      { slug: "pulse-diagnosis", label: "Pulse Diagnosis", text: "Pulse Diagnosis" },
    ],
    exploreHref: "/global-santcum/venues?category=ayurveda",
    exploreLabel: "Explore all Ayurveda venues →",
  },
  {
    num: "06",
    name: "Indigenous & Earth Traditions",
    tagline: "First peoples' healing wisdom, ceremony, and land-based medicine",
    count: 7,
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80",
    alt: "Earth traditions",
    imageLabel: (<>Land as healer.<br />Ceremony as medicine.</>),
    eyebrow: "Indigenous & Earth Traditions",
    intro: "The healing wisdom of first peoples, carried across generations and continents. Practices rooted in relationship with land, community, and the more-than-human world — approached with the reverence they deserve.",
    tags: [
      { slug: "aboriginal-healing", label: "Aboriginal Healing", text: "Aboriginal Healing" },
      { slug: "andean-therapies", label: "Andean Therapies", text: "Andean Therapies" },
      { slug: "native-american", label: "Native American Traditions", text: "Native American Traditions" },
      { slug: "sweat-lodge", label: "Sweat Lodge & Temazcal", text: "Sweat Lodge & Temazcal" },
      { slug: "maori-healing", label: "Māori Healing", text: "Māori Healing" },
      { slug: "african-traditions", label: "African Healing Traditions", text: "African Healing Traditions" },
      { slug: "shamanic", label: "Shamanic Journeying", text: "Shamanic Journeying" },
    ],
    exploreHref: "/global-santcum/venues?category=indigenous",
    exploreLabel: "Explore all indigenous venues →",
  },
  {
    num: "07",
    name: "Plant Medicine & Ceremony",
    tagline: "Sacred plant traditions, ceremonial healing, botanical medicine",
    count: 5,
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80",
    alt: "Plant medicine",
    imageLabel: (<>Sacred plants.<br />Ancient ceremony.</>),
    eyebrow: "Plant Medicine & Ceremony",
    intro: "Plants have been humanity's healers long before modern medicine. These traditions honour that relationship — from gentle cacao ceremony to the profound depths of botanical healing — held within proper ceremonial container.",
    tags: [
      { slug: "cacao-ceremony", label: "Cacao Ceremony", text: "Cacao Ceremony" },
      { slug: "kambo", label: "Kambo", text: "Kambo" },
      { slug: "hape", label: "Rapé & Hapé", text: "Rapé & Hapé" },
      { slug: "herbal-medicine", label: "Herbal & Botanical Medicine", text: "Herbal & Botanical Medicine" },
      { slug: "flower-essences", label: "Flower Essence Therapy", text: "Flower Essence Therapy" },
    ],
    exploreHref: "/global-santcum/venues?category=plant-medicine",
    exploreLabel: "Explore all plant medicine venues →",
  },
  {
    num: "08",
    name: "Meditation & Mindfulness",
    tagline: "Stillness practices, contemplative traditions, presence work",
    count: 6,
    img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=80",
    alt: "Meditation",
    imageLabel: (<>Stillness as<br />the practice.</>),
    eyebrow: "Meditation & Mindfulness",
    intro: "The training of attention and the cultivation of presence. Drawn from Buddhist, Hindu, Taoist, and secular traditions — each offering a different doorway into the same essential stillness.",
    tags: [
      { slug: "vipassana", label: "Vipassana", text: "Vipassana" },
      { slug: "zen", label: "Zen Meditation", text: "Zen Meditation" },
      { slug: "transcendental", label: "Transcendental Meditation", text: "Transcendental Meditation" },
      { slug: "walking-meditation", label: "Walking Meditation", text: "Walking Meditation" },
      { slug: "yoga-nidra", label: "Yoga Nidra", text: "Yoga Nidra" },
      { slug: "mbsr", label: "MBSR & Mindfulness", text: "MBSR & Mindfulness" },
    ],
    exploreHref: "/global-santcum/venues?category=meditation",
    exploreLabel: "Explore all meditation venues →",
  },
  {
    num: "09",
    name: "Body Therapies & Bodywork",
    tagline: "Hands-on healing, structural integration, and therapeutic touch",
    count: 7,
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80",
    alt: "Bodywork",
    imageLabel: (<>The body holds<br />its own wisdom.</>),
    eyebrow: "Body Therapies & Bodywork",
    intro: "Healing through skilled, intentional touch. From the deep structural release of Rolfing to the meridian-based intelligence of Shiatsu — the body as the primary site of transformation.",
    tags: [
      { slug: "thai-massage", label: "Traditional Thai Massage", text: "Traditional Thai Massage" },
      { slug: "craniosacral", label: "Craniosacral Therapy", text: "Craniosacral Therapy" },
      { slug: "rolfing", label: "Rolfing & Structural Integration", text: "Rolfing & Structural Integration" },
      { slug: "shiatsu", label: "Shiatsu", text: "Shiatsu" },
      { slug: "lymphatic", label: "Lymphatic Drainage", text: "Lymphatic Drainage" },
      { slug: "myofascial", label: "Myofascial Release", text: "Myofascial Release" },
      { slug: "lomi-lomi", label: "Lomi Lomi", text: "Lomi Lomi" },
    ],
    exploreHref: "/global-santcum/venues?category=bodywork",
    exploreLabel: "Explore all bodywork venues →",
  },
  {
    num: "10",
    name: "Nutrition & Cleansing",
    tagline: "Fasting protocols, detoxification, and food as medicine",
    count: 5,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80",
    alt: "Nutrition",
    imageLabel: (<>Food as<br />medicine.</>),
    eyebrow: "Nutrition & Cleansing",
    intro: "What we consume shapes who we become. These practices treat food and fasting as fundamental medicine — from the gentle reset of a juice cleanse to the deep cellular renewal of therapeutic fasting.",
    tags: [
      { slug: "juice-fasting", label: "Juice Fasting & Cleansing", text: "Juice Fasting & Cleansing" },
      { slug: "raw-food", label: "Raw & Living Foods", text: "Raw & Living Foods" },
      { slug: "detox", label: "Detox Programs", text: "Detox Programs" },
      { slug: "macrobiotic", label: "Macrobiotic Nutrition", text: "Macrobiotic Nutrition" },
      { slug: "therapeutic-fasting", label: "Therapeutic Fasting", text: "Therapeutic Fasting" },
    ],
    exploreHref: "/global-santcum/venues?category=nutrition",
    exploreLabel: "Explore all nutrition venues →",
  },
  {
    num: "11",
    name: (<>Nature &amp; Adventure Wellness</>),
    tagline: "Forest medicine, wilderness therapy, and adventure as healing",
    count: 10,
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80",
    alt: "Nature immersion",
    imageLabel: (<>The forest<br />as teacher.</>),
    eyebrow: "Nature & Adventure Wellness",
    intro: "The natural world is both healer and teacher. These practices return us to the intelligence of the living world — through stillness in forests, immersion in wild waters, therapeutic adventure, and movement that reconnects body to earth.",
    tags: [
      { slug: "forest-bathing", label: "Forest Bathing & Shinrin-Yoku", text: "Forest Bathing & Shinrin-Yoku" },
      { slug: "wild-swimming", label: "Wild Swimming", text: "Wild Swimming" },
      { slug: "earthing", label: "Earthing & Grounding", text: "Earthing & Grounding" },
      { slug: "wilderness-therapy", label: "Wilderness Therapy", text: "Wilderness Therapy" },
      { slug: "ecotherapy", label: "Ecotherapy", text: "Ecotherapy" },
      { slug: "surf-therapy", label: "Surf Therapy", text: "Surf Therapy" },
      { slug: "adventure-therapy", label: "Adventure Therapy", text: "Adventure Therapy" },
      { slug: "equine-therapy", label: "Equine-Assisted Therapy", text: "Equine-Assisted Therapy" },
      { slug: "hiking-trekking", label: "Hiking & Wilderness Trekking", text: "Hiking & Wilderness Trekking" },
      { slug: "outdoor-movement", label: "Outdoor Movement & Adventure Sports", text: "Outdoor Movement & Adventure Sports" },
    ],
    exploreHref: "/global-santcum/venues?category=nature-adventure-wellness",
    exploreLabel: "Explore all nature & adventure wellness venues →",
  },
  {
    num: "12",
    name: "Energy & Esoteric",
    tagline: "Subtle body work, energetic healing, and consciousness practices",
    count: 6,
    img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=80",
    alt: "Energy healing",
    imageLabel: (<>Beyond the visible.<br />Into the subtle.</>),
    eyebrow: "Energy & Esoteric",
    intro: "Healing traditions that work with the subtle architecture of the human energy system — meridians, chakras, and the energetic fields that underlie the physical body.",
    tags: [
      { slug: "reiki", label: "Reiki", text: "Reiki" },
      { slug: "acupuncture", label: "Acupuncture & TCM", text: "Acupuncture & TCM" },
      { slug: "human-design", label: "Human Design", text: "Human Design" },
      { slug: "akashic", label: "Akashic Records", text: "Akashic Records" },
      { slug: "theta-healing", label: "Theta Healing", text: "Theta Healing" },
      { slug: "pranic-healing", label: "Pranic Healing", text: "Pranic Healing" },
    ],
    exploreHref: "/global-santcum/venues?category=energy",
    exploreLabel: "Explore all energy healing venues →",
  },
  {
    num: "13",
    name: "Modern Wellness",
    tagline: "Contemporary therapies, clinical modalities, and cutting-edge recovery",
    count: 8,
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80",
    alt: "Modern wellness spa",
    imageLabel: (<>Science meets<br />sanctuary.</>),
    eyebrow: "Modern Wellness",
    intro: "Contemporary therapies grounded in clinical research and emerging science. From halotherapy to cryotherapy — the leading edge of restorative practice, delivered within curated wellness spaces.",
    tags: [
      { slug: "halotherapy", label: "Halotherapy & Salt Therapy", text: "Halotherapy & Salt Therapy" },
      { slug: "cryotherapy", label: "Cryotherapy", text: "Cryotherapy" },
      { slug: "infrared-sauna", label: "Infrared Sauna", text: "Infrared Sauna" },
      { slug: "iv-therapy", label: "IV Therapy & Infusions", text: "IV Therapy & Infusions" },
      { slug: "hyperbaric", label: "Hyperbaric Oxygen Therapy", text: "Hyperbaric Oxygen Therapy" },
      { slug: "compression", label: "Compression Therapy", text: "Compression Therapy" },
      { slug: "red-light", label: "Red Light Therapy", text: "Red Light Therapy" },
      { slug: "biofeedback", label: "Biofeedback & Neurofeedback", text: "Biofeedback & Neurofeedback" },
    ],
    exploreHref: "/global-santcum/venues?category=modern-wellness",
    exploreLabel: "Explore all modern wellness venues →",
  },
  {
    num: "14",
    name: "Skin & Aesthetic Wellness",
    tagline: "Curated skin rituals, advanced facials, and restorative body treatments",
    count: 8,
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80",
    alt: "Skin and aesthetic wellness",
    imageLabel: (<>Skin as ritual.<br />Beauty as restoration.</>),
    eyebrow: "Skin & Aesthetic Wellness",
    intro: "Where elevated skincare meets intentional wellness. Curated treatments that nourish, restore, and recalibrate — delivered by skilled practitioners within spaces that honour the ritual of care.",
    tags: [
      { slug: "advanced-facials", label: "Advanced Facials & Skin Treatments", text: "Advanced Facials & Skin Treatments" },
      { slug: "body-wraps", label: "Body Wraps & Scrubs", text: "Body Wraps & Scrubs" },
      { slug: "led-therapy", label: "LED Light Therapy", text: "LED Light Therapy" },
      { slug: "skin-needling", label: "Skin Needling & Microneedling", text: "Skin Needling & Microneedling" },
      { slug: "lymphatic-facial", label: "Lymphatic Facial Massage", text: "Lymphatic Facial Massage" },
      { slug: "buccal-massage", label: "Buccal & Gua Sha Massage", text: "Buccal & Gua Sha Massage" },
      { slug: "dermaplaning", label: "Dermaplaning & Exfoliation", text: "Dermaplaning & Exfoliation" },
      { slug: "nail-rituals", label: "Nail & Hand Rituals", text: "Nail & Hand Rituals" },
    ],
    exploreHref: "/global-santcum/venues?category=skin-aesthetic-wellness",
    exploreLabel: "Explore all skin & aesthetic wellness venues →",
  },
];

function VenueCard({ v }: { v: Venue }) {
  return (
    <div className="result-card">
      <div className="result-card-image">
        <img src={v.img} alt={v.name} loading="lazy" />
        <span className="result-card-country">{v.country}</span>
      </div>
      <div className="result-card-body">
        <p className="result-card-location">{v.location}</p>
        <h3 className="result-card-name">{v.name}</h3>
        <div className="result-card-meta">
          <span className="result-card-meta-item"><strong>{v.price}</strong></span>
          <span className="result-card-meta-item">{v.duration}</span>
        </div>
        <Link href={`/global-santcum/wellness-venues/${v.slug}?tab=services`} className="result-card-cta">View Services →</Link>
      </div>
    </div>
  );
}

export default function TgsWellnessExperiencesPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState<{ index: number; slug: string; label: string } | null>(null);

  const headerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const resultsRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const hero = document.querySelector(".hero") as HTMLElement | null;
    const onScroll = () => {
      const threshold = hero ? hero.offsetHeight - 80 : 0;
      setScrolled(window.scrollY > threshold);
    };
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

  const toggleCategory = (index: number) => {
    setActiveTag(null);
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
      setTimeout(() => {
        headerRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 80);
    }
  };

  const showVenues = (index: number, slug: string, label: string) => {
    setActiveTag({ index, slug, label });
    setTimeout(() => {
      resultsRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 150);
  };

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <a className="skip-to-content" href="#main-content">Skip to main content</a>

      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
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
              <span></span><span></span><span></span>
            </button>
            <span className="nav-hamburger-label">Menu</span>
          </div>
          <Link href="/global-santcum/web" className="nav-logo-area">
            <span className="nav-logo"></span>
            <span className="nav-brand-text">The Global Sanctum</span>
          </Link>
          <div className="nav-right"></div>
        </div>
      </nav>

      <TgsNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main id="main-content" role="main">
        <section className="hero">
          <div className="hero-img"></div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="hero-left">
              <p className="hero-eyebrow">Modalities & Practices</p>
              <h1 className="hero-title">Explore by<br /><em>Experience.</em></h1>
            </div>
            <p className="hero-body">Browse transformative modalities and healing practices. Each links directly to venues that offer them — so you find the right space for the experience you&apos;re seeking.</p>
          </div>
        </section>

        <div className="intro-bar">
          <p className="intro-bar-text">Select a category to explore. Each practice links to <Link href="/global-santcum/venues">venues in our collection</Link> offering that modality.</p>
          <p className="intro-bar-count"><em>14</em> categories &nbsp;·&nbsp; <em>75+</em> practices</p>
        </div>

        <section className="categories">
          {categories.map((category, index) => {
            const isOpen = openIndex === index;
            const venues = activeTag && activeTag.index === index
              ? (venueData[activeTag.slug] || defaultVenues)
              : null;
            return (
              <div className="category-item" key={category.num}>
                <div
                  className={`category-header${isOpen ? " active" : ""}`}
                  onClick={() => toggleCategory(index)}
                  ref={(el) => { headerRefs.current[index] = el; }}
                >
                  <span className="cat-num">{category.num}</span>
                  <div className="cat-text">
                    <h2 className="cat-name">{category.name}</h2>
                    <span className="cat-tagline">{category.tagline}</span>
                  </div>
                  <span className="cat-count" data-count={category.count}>
                    {isOpen
                      ? `Viewing ${category.count} practices`
                      : `Explore ${category.count} practices`}
                  </span>
                  <span className="cat-toggle">+</span>
                </div>
                <div className={`category-panel${isOpen ? " open" : ""}`}>
                  <div className="panel-inner">
                    <div className="panel-image">
                      <img src={category.img} alt={category.alt} loading="lazy" />
                      <div className="panel-image-overlay"></div>
                      <p className="panel-image-label">{category.imageLabel}</p>
                    </div>
                    <div className="panel-content">
                      <p className="panel-content-eyebrow">{category.eyebrow}</p>
                      <p className="panel-content-intro">{category.intro}</p>
                      <div className="panel-tags">
                        {category.tags.map((tag) => (
                          <button
                            className={`sub-tag${activeTag && activeTag.index === index && activeTag.slug === tag.slug ? " active" : ""}`}
                            key={tag.slug}
                            onClick={() => showVenues(index, tag.slug, tag.label)}
                          >
                            {tag.text} <span className="sub-tag-arrow">→</span>
                          </button>
                        ))}
                      </div>
                      <Link className="panel-explore-link" href={category.exploreHref}>{category.exploreLabel}</Link>
                    </div>
                    <div
                      className={`venue-results${venues ? " open" : ""}`}
                      ref={(el) => { resultsRefs.current[index] = el; }}
                    >
                      <div className="venue-results-inner">
                        <div className="venue-results-header">
                          <p className="venue-results-label">
                            {venues && activeTag ? `Venues offering ${activeTag.label}` : "Venues offering this practice"}
                          </p>
                          <p className="venue-results-count">
                            {venues
                              ? `${venues.length} venue${venues.length !== 1 ? "s" : ""} in our collection`
                              : ""}
                          </p>
                        </div>
                        <div className="venue-results-grid">
                          {venues
                            ? venues.map((v, i) => <VenueCard v={v} key={`${v.slug}-${i}`} />)
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <div className="info-strip">
          <div className="info-cell">
            <p className="info-cell-eyebrow">How it works</p>
            <p className="info-cell-heading">Browse by modality,<br />find your venue.</p>
            <p className="info-cell-body">Each practice links directly to venues in our collection offering that modality. No duplication — the experience lives at the venue.</p>
          </div>
          <div className="info-cell">
            <p className="info-cell-eyebrow">Can&apos;t find your practice?</p>
            <p className="info-cell-heading">We&apos;re always expanding<br />the collection.</p>
            <p className="info-cell-body">If your modality isn&apos;t listed here, reach out and we&apos;ll help you find the right space for your specific needs.</p>
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
