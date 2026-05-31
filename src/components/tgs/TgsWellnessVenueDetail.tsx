"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import TgsNavDrawer from "@/components/tgs/TgsNavDrawer";

const styles = `
:root {
    --warm-white: #FDFCF9;
    --warm-cream: #F7F5F1;
    --warm-charcoal: #3A3A3A;
    --charcoal: #313131;
    --charcoal-80: rgba(49, 49, 49, 0.8);
    --charcoal-70: rgba(49, 49, 49, 0.7);
    --charcoal-light: rgba(49, 49, 49, 0.7);
    --charcoal-lighter: rgba(49, 49, 49, 0.5);
    --charcoal-50: rgba(49, 49, 49, 0.5);
    --charcoal-30: rgba(49, 49, 49, 0.3);
    --charcoal-15: rgba(49, 49, 49, 0.15);
    --charcoal-border: rgba(49, 49, 49, 0.15);
    --charcoal-subtle: rgba(49, 49, 49, 0.1);
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

    --section-padding: 80px;
    --container-width: 1200px;
    --text-width: 680px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-serif);
    color: var(--charcoal);
    background-color: var(--warm-white);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
}

img { max-width: 100%; height: auto; display: block; }

.skip-to-content {
    position: absolute; top: -100px; left: 16px;
    background: var(--charcoal); color: var(--warm-white);
    padding: 12px 20px; z-index: 9999;
    font-family: var(--font-sans); font-size: 13px; font-weight: 500;
    letter-spacing: 0.05em; text-transform: uppercase;
    transition: top 0.2s; text-decoration: none;
}
.skip-to-content:focus { top: 16px; outline: 2px solid var(--gold-accent); }

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.sample-ribbon {
    position: absolute;
    top: 110px;
    right: 32px;
    z-index: 30;
    background: rgba(49, 49, 49, 0.85);
    backdrop-filter: blur(6px);
    padding: 10px 18px;
    border: 1px solid var(--gold-accent);
    display: flex;
    flex-direction: column;
    gap: 2px;
    text-align: right;
    line-height: 1.3;
}
.sample-ribbon-eyebrow {
    font-family: var(--font-sans);
    font-size: 8px;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold-accent);
}
.sample-ribbon-text {
    font-family: var(--font-serif);
    font-size: 12px;
    font-weight: 400;
    font-style: italic;
    color: rgba(255,255,255,0.92);
    letter-spacing: 0.03em;
}
@media (max-width: 768px) {
    .sample-ribbon {
        top: 84px;
        right: 16px;
        padding: 8px 14px;
    }
    .sample-ribbon-eyebrow { font-size: 7px; }
    .sample-ribbon-text { font-size: 11px; }
}

.nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 24px 48px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0) 100%);
    backdrop-filter: blur(4px);
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
}
.nav-left { display: flex; align-items: center; gap: 14px; cursor: pointer; }
.nav-hamburger {
    display: flex; flex-direction: column; gap: 4px;
    background: transparent; border: none; padding: 0;
    cursor: pointer; color: inherit;
}
.nav-hamburger:focus-visible { outline: 2px solid var(--gold-accent); outline-offset: 4px; }
.nav-hamburger span {
    width: 22px; height: 1px; background: #FFFFFF;
    transition: background 0.3s, transform 0.3s, opacity 0.3s;
    display: block;
}
.nav.scrolled .nav-hamburger span { background: var(--charcoal); }
.nav-hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
.nav-hamburger.active span:nth-child(2) { opacity: 0; }
.nav-hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }
.nav-hamburger-label {
    font-family: var(--font-sans); font-size: 11px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #FFFFFF; transition: color 0.3s;
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
    color: inherit;
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

.hero-gallery {
    position: relative;
    height: 85vh;
    min-height: 600px;
    max-height: 900px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4)),
                url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80') center/cover;
}

.hero-content {
    position: absolute;
    bottom: 140px;
    left: 0;
    right: 0;
    text-align: center;
    color: white;
}

.hero-venue-type {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 4px;
    text-transform: uppercase;
    opacity: 0.9;
    margin-bottom: 16px;
}

.hero-venue-name {
    font-family: var(--font-serif);
    font-size: 56px;
    font-weight: 400;
    margin-bottom: 12px;
}

.hero-location {
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 4px;
    text-transform: uppercase;
    opacity: 0.9;
    margin-bottom: 30px;
}

.hero-view-photos {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 1px;
    color: white;
    text-decoration: none;
    padding: 12px 24px;
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 2px;
    transition: all 0.3s ease;
}

.hero-view-photos:hover {
    background: rgba(255,255,255,0.1);
    border-color: white;
}

.hero-thumbnails {
    position: absolute;
    bottom: 30px;
    left: 40px;
    display: flex;
    gap: 10px;
}

.hero-thumb {
    width: 100px;
    height: 70px;
    border-radius: 4px;
    object-fit: cover;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.3s ease;
}

.hero-thumb:hover {
    opacity: 1;
}

.tab-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--warm-white);
    border-bottom: 1px solid var(--charcoal-subtle);
}

.tab-nav-inner {
    max-width: var(--container-width);
    margin: 0 auto;
    display: flex;
    gap: 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0 40px;
}

.tab-nav-inner::-webkit-scrollbar {
    display: none;
}

.tab {
    padding: 20px 24px;
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--charcoal-light);
    text-decoration: none;
    white-space: nowrap;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
    cursor: pointer;
}

.tab:hover {
    color: var(--charcoal);
}

.tab.active {
    color: var(--charcoal);
    border-bottom-color: var(--charcoal);
}

.main-layout {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 60px;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
}

.main-content {
    min-width: 0;
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

.booking-sidebar {
    position: relative;
}

.sidebar-card {
    position: sticky;
    top: 100px;
    background: var(--warm-white);
    border: 1px solid var(--charcoal-border);
    border-radius: 8px;
    padding: 32px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.sidebar-header {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--charcoal);
    margin-bottom: 20px;
}

.sidebar-price {
    font-family: var(--font-serif);
    font-size: 32px;
    font-weight: 400;
    color: var(--charcoal);
    margin-bottom: 4px;
}

.sidebar-price span {
    font-size: 16px;
    color: var(--charcoal-light);
}

.sidebar-price-note {
    font-family: var(--font-sans);
    font-size: 12px;
    color: var(--charcoal-lighter);
    margin-bottom: 24px;
}

.sidebar-select {
    width: 100%;
    padding: 14px 16px;
    font-family: var(--font-sans);
    font-size: 13px;
    color: var(--charcoal);
    border: 1px solid var(--charcoal-border);
    border-radius: 4px;
    background: var(--warm-white);
    margin-bottom: 16px;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23313131' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
}

.sidebar-btn-primary {
    width: 100%;
    padding: 16px;
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: white;
    background: var(--charcoal);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: opacity 0.3s ease;
    margin-bottom: 24px;
}

.sidebar-btn-primary:hover {
    opacity: 0.9;
}

.sidebar-divider {
    height: 1px;
    background: var(--charcoal-subtle);
    margin: 24px 0;
}

.sidebar-trust {
    margin-bottom: 24px;
}

.sidebar-trust-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-sans);
    font-size: 12px;
    color: var(--charcoal-light);
    margin-bottom: 10px;
}

.sidebar-trust-item svg {
    width: 16px;
    height: 16px;
    stroke: var(--charcoal);
    stroke-width: 2;
    fill: none;
}

.sidebar-wishlist {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 12px;
    font-family: var(--font-sans);
    font-size: 12px;
    color: var(--charcoal-light);
    background: transparent;
    border: 1px solid var(--charcoal-border);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 20px;
}

.sidebar-wishlist:hover {
    background: var(--warm-cream);
}

.sidebar-wishlist svg {
    width: 16px;
    height: 16px;
    stroke: var(--charcoal-light);
    stroke-width: 2;
    fill: none;
}

.sidebar-contact {
    font-family: var(--font-sans);
    font-size: 11px;
    color: var(--charcoal-lighter);
    text-align: center;
}

.sidebar-contact a {
    color: var(--charcoal);
    text-decoration: none;
}

.sidebar-contact a:hover {
    text-decoration: underline;
}

.section {
    padding: var(--section-padding) 0;
}

.section--cream {
    background: var(--warm-cream);
    margin: 0 -40px;
    padding: var(--section-padding) 40px;
}

.section-label {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--charcoal);
    margin-bottom: 12px;
}

.section-subtitle {
    font-family: var(--font-serif);
    font-size: 17px;
    font-weight: 300;
    font-style: italic;
    color: var(--charcoal-light);
    margin-bottom: 40px;
}

.section-text {
    font-family: var(--font-serif);
    font-size: 18px;
    font-weight: 300;
    line-height: 1.9;
    color: var(--charcoal);
    max-width: var(--text-width);
}

.section-text p + p {
    margin-top: 24px;
}

.section-divider {
    height: 1px;
    background: var(--charcoal-subtle);
    margin: 60px 0;
}

.featured-services {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 24px;
}

.featured-service-card {
    background: var(--warm-cream);
    border-radius: 8px;
    overflow: hidden;
}

.featured-service-image {
    height: 180px;
    background-size: cover;
    background-position: center;
}

.featured-service-content {
    padding: 24px;
}

.featured-service-name {
    font-family: var(--font-serif);
    font-size: 22px;
    font-weight: 400;
    color: var(--charcoal);
    margin-bottom: 8px;
}

.featured-service-meta {
    font-family: var(--font-sans);
    font-size: 12px;
    color: var(--charcoal-lighter);
    margin-bottom: 16px;
}

.featured-service-btn {
    display: inline-block;
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--charcoal);
    text-decoration: none;
    padding: 10px 20px;
    border: 1px solid var(--charcoal);
    border-radius: 2px;
    transition: all 0.3s ease;
}

.featured-service-btn:hover {
    background: var(--charcoal);
    color: white;
}

.view-all-link {
    font-family: var(--font-sans);
    font-size: 12px;
    color: var(--charcoal);
    text-decoration: none;
    border-bottom: 1px solid var(--charcoal);
    padding-bottom: 2px;
}

.view-all-link:hover {
    opacity: 0.7;
}

.quick-amenities {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 24px;
}

.quick-amenity {
    text-align: center;
    padding: 20px;
    background: var(--warm-cream);
    border-radius: 8px;
}

.quick-amenity-icon {
    font-size: 28px;
    margin-bottom: 12px;
}

.quick-amenity-label {
    font-family: var(--font-sans);
    font-size: 11px;
    letter-spacing: 1px;
    color: var(--charcoal);
}

.at-a-glance {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.glance-item {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid var(--charcoal-subtle);
}

.glance-label {
    font-family: var(--font-sans);
    font-size: 12px;
    color: var(--charcoal-lighter);
}

.glance-value {
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 500;
    color: var(--charcoal);
}

.service-category {
    margin-bottom: 48px;
}

.service-category-title {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--charcoal);
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--charcoal-subtle);
}

.service-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 24px 0;
    border-bottom: 1px solid var(--charcoal-subtle);
}

.service-info {
    flex: 1;
    padding-right: 40px;
}

.service-name {
    font-family: var(--font-serif);
    font-size: 20px;
    font-weight: 400;
    color: var(--charcoal);
    margin-bottom: 8px;
}

.service-description {
    font-family: var(--font-serif);
    font-size: 15px;
    font-weight: 300;
    color: var(--charcoal-light);
    line-height: 1.6;
    margin-bottom: 12px;
}

.service-options {
    font-family: var(--font-sans);
    font-size: 12px;
    color: var(--charcoal-lighter);
}

.service-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
}

.service-price {
    font-family: var(--font-serif);
    font-size: 18px;
    color: var(--charcoal);
}

.service-book-btn {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: white;
    background: var(--charcoal);
    border: none;
    padding: 10px 24px;
    border-radius: 2px;
    cursor: pointer;
    transition: opacity 0.3s ease;
}

.service-book-btn:hover {
    opacity: 0.9;
}

.facilities-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 48px;
}

.facility-card {
    background: var(--warm-cream);
    border-radius: 8px;
    overflow: hidden;
}

.facility-image {
    height: 200px;
    background-size: cover;
    background-position: center;
}

.facility-content {
    padding: 24px;
}

.facility-name {
    font-family: var(--font-serif);
    font-size: 20px;
    font-weight: 400;
    color: var(--charcoal);
    margin-bottom: 8px;
}

.facility-description {
    font-family: var(--font-serif);
    font-size: 15px;
    font-weight: 300;
    color: var(--charcoal-light);
    line-height: 1.6;
}

.facility-access {
    font-family: var(--font-sans);
    font-size: 11px;
    color: var(--charcoal-lighter);
    margin-top: 12px;
}

.amenities-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
}

.amenity-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    background: var(--warm-cream);
    border-radius: 4px;
}

.amenity-icon {
    font-size: 18px;
}

.amenity-label {
    font-family: var(--font-sans);
    font-size: 11px;
    color: var(--charcoal);
}

.map-container {
    height: 400px;
    background: var(--warm-cream);
    border-radius: 8px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--charcoal-lighter);
    font-family: var(--font-sans);
    font-size: 14px;
}

.location-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
}

.location-block h4 {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--charcoal);
    margin-bottom: 16px;
}

.location-block p,
.location-block li {
    font-family: var(--font-serif);
    font-size: 16px;
    font-weight: 300;
    color: var(--charcoal-light);
    line-height: 1.8;
}

.location-block ul {
    list-style: none;
}

.location-block ul li {
    margin-bottom: 8px;
}

.hours-table {
    width: 100%;
}

.hours-table tr {
    border-bottom: 1px solid var(--charcoal-subtle);
}

.hours-table td {
    padding: 12px 0;
    font-family: var(--font-serif);
    font-size: 15px;
    color: var(--charcoal-light);
}

.hours-table td:last-child {
    text-align: right;
    font-weight: 400;
    color: var(--charcoal);
}

.policy-section {
    margin-bottom: 48px;
}

.policy-title {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--charcoal);
    margin-bottom: 20px;
}

.policy-content {
    font-family: var(--font-serif);
    font-size: 16px;
    font-weight: 300;
    color: var(--charcoal-light);
    line-height: 1.8;
}

.policy-content ul {
    list-style: none;
    margin-top: 16px;
}

.policy-content li {
    padding: 8px 0;
    padding-left: 24px;
    position: relative;
}

.policy-content li::before {
    content: "\\2022";
    position: absolute;
    left: 0;
    color: var(--charcoal);
}

.policy-highlight {
    background: var(--warm-cream);
    padding: 24px;
    border-radius: 8px;
    margin-top: 16px;
}

.similar-venues {
    background: var(--warm-cream);
    padding: 80px 40px;
}

.similar-venues .section-header {
    text-align: center;
    margin-bottom: 48px;
}

.venue-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
}

.venue-card {
    background: var(--warm-white);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.venue-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.1);
}

.venue-card-image {
    height: 220px;
    background-size: cover;
    background-position: center;
}

.venue-card-content {
    padding: 24px;
}

.venue-card-name {
    font-family: var(--font-serif);
    font-size: 22px;
    font-weight: 400;
    color: var(--charcoal);
    margin-bottom: 8px;
}

.venue-card-location {
    font-family: var(--font-sans);
    font-size: 11px;
    letter-spacing: 1px;
    color: var(--charcoal-lighter);
    margin-bottom: 16px;
}

.venue-card-price {
    font-family: var(--font-serif);
    font-size: 16px;
    color: var(--charcoal);
}

.venue-card-price span {
    color: var(--charcoal-lighter);
}

.cta-section {
    background: var(--charcoal);
    padding: 80px 40px;
    text-align: center;
}

.cta-title {
    font-family: var(--font-serif);
    font-size: 36px;
    font-weight: 400;
    color: white;
    margin-bottom: 16px;
}

.cta-text {
    font-family: var(--font-serif);
    font-size: 18px;
    font-weight: 300;
    color: rgba(255,255,255,0.8);
    margin-bottom: 32px;
}

.cta-buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
}

.btn {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 16px 32px;
    border-radius: 2px;
    text-decoration: none;
    transition: all 0.3s ease;
}

.btn--primary {
    background: white;
    color: var(--charcoal);
}

.btn--primary:hover {
    opacity: 0.9;
}

.btn--secondary {
    background: transparent;
    color: white;
    border: 1px solid rgba(255,255,255,0.5);
}

.btn--secondary:hover {
    background: rgba(255,255,255,0.1);
    border-color: white;
}

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

.conditional-tab {
    position: relative;
}

.conditional-tab::after {
    content: "CONDITIONAL";
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 7px;
    letter-spacing: 0.5px;
    padding: 2px 4px;
    background: #e8d5c4;
    color: var(--charcoal);
    border-radius: 2px;
}

.mobile-booking-bar {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--warm-white);
    padding: 16px 24px;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
    z-index: 1000;
    justify-content: space-between;
    align-items: center;
}

.mobile-price {
    font-family: var(--font-serif);
    font-size: 20px;
    color: var(--charcoal);
}

.mobile-price span {
    font-size: 14px;
    color: var(--charcoal-light);
}

.mobile-book-btn {
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: white;
    background: var(--charcoal);
    border: none;
    padding: 14px 28px;
    border-radius: 4px;
    cursor: pointer;
}

@media (max-width: 1024px) {
    .main-layout {
        grid-template-columns: 1fr;
    }

    .booking-sidebar {
        display: none;
    }

    .mobile-booking-bar {
        display: flex;
    }

    .main-content {
        padding-bottom: 100px;
    }
}

@media (max-width: 768px) {
    .hero-venue-name {
        font-size: 36px;
    }

    .hero-thumbnails {
        left: 16px;
        right: 16px;
        overflow-x: auto;
        padding-bottom: 4px;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
    }
    .hero-thumbnails::-webkit-scrollbar { display: none; }
    .hero-thumb { flex: 0 0 auto; }

    .featured-services,
    .facilities-grid,
    .location-details {
        grid-template-columns: 1fr;
    }

    .quick-amenities,
    .amenities-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .venue-cards {
        grid-template-columns: 1fr;
    }

    .nav-inner { padding: 0 24px; height: 68px; }
    .nav-hamburger-label { display: none; }
    .nav-brand-text { font-size: 14px; letter-spacing: 0.1em; }
    .drawer { width: 100%; max-width: 100vw; }

    .footer { padding: 60px 24px 32px; }
    .footer-grid {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .footer-bottom {
        flex-direction: column;
        gap: 16px;
        text-align: center;
    }

    .cta-buttons {
        flex-direction: column;
    }
}

.taxonomy-section {
    margin-bottom: 0;
}

.taxonomy-label {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: rgba(49,49,49,0.4);
    margin-bottom: 12px;
}

.taxonomy-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.taxonomy-pill {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.5px;
    color: var(--charcoal);
    background: var(--warm-cream);
    border: 1px solid var(--charcoal-border);
    padding: 6px 14px;
    cursor: default;
    transition: none;
}

.services-filter-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    padding-bottom: 32px;
    margin-bottom: 40px;
    border-bottom: 1px solid var(--charcoal-subtle);
}

.services-filter-label {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(49,49,49,0.4);
    margin-right: 4px;
    white-space: nowrap;
}

.services-filter-btn {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.5px;
    color: var(--charcoal);
    background: var(--warm-white);
    border: 1px solid var(--charcoal-border);
    padding: 7px 16px;
    cursor: pointer;
    transition: all 0.15s;
}

.services-filter-btn:hover,
.services-filter-btn.active {
    background: var(--charcoal);
    color: var(--warm-white);
    border-color: var(--charcoal);
}

.service-category-title-note {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 400;
    color: rgba(49,49,49,0.35);
    letter-spacing: 0.5px;
    margin-left: 8px;
    text-transform: none;
    vertical-align: middle;
}
`;

const TABS = [
  { id: "overview", label: "Overview", conditional: false },
  { id: "accommodation", label: "Accommodation", conditional: true },
  { id: "services", label: "Services", conditional: false },
  { id: "packages", label: "Packages", conditional: true },
  { id: "practitioners", label: "Practitioners", conditional: true },
  { id: "space", label: "The Space", conditional: false },
  { id: "location", label: "Location & Hours", conditional: false },
  { id: "policies", label: "Policies", conditional: false },
];

const VENUE_PDF_URL: string | null = null;

export default function TgsWellnessVenueDetail() {
  const pathname = usePathname();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [serviceFilter, setServiceFilter] = useState("all");

  const slug = (() => {
    const match = pathname?.match(/\/global-santcum\/wellness-venues\/([^/]+)/);
    return match ? match[1] : "serenity-day-spa";
  })();

  const enquiryHref = `/global-santcum/wellness-venues/${slug}/enquiry`;

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
    root.querySelectorAll<HTMLAnchorElement>(".email-link").forEach((el) => {
      const user = el.dataset.u;
      const host = el.dataset.d;
      if (!user || !host) return;
      const email = `${user}@${host}`;
      el.setAttribute("href", `mailto:${email}`);
      const textEl = el.querySelector<HTMLElement>(".email-text");
      if (textEl) textEl.textContent = email;
    });
  }, []);

  const switchTab = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  const goToEnquiry = () => {
    router.push(enquiryHref);
  };

  return (
    <div ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <a className="skip-to-content" href="#main-content">Skip to main content</a>

      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="mainNav" aria-label="Primary">
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
            <span className="nav-hamburger-label" aria-hidden="true">Menu</span>
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
        <section className="hero-gallery">
          <div className="sample-ribbon" role="note" aria-label="This is a sample listing">
            <span className="sample-ribbon-eyebrow">Sample Listing</span>
            <span className="sample-ribbon-text">Preview Only</span>
          </div>
          <div className="hero-content">
            <p className="hero-venue-type">Day Spa</p>
            <h1 className="hero-venue-name">Serenity Day Spa</h1>
            <p className="hero-location">Brisbane, Queensland, Australia</p>
            
          </div>
          <div className="hero-thumbnails">
            <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&q=80" alt="Spa treatment" className="hero-thumb" />
            <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=200&q=80" alt="Relaxation area" className="hero-thumb" />
            <img src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=200&q=80" alt="Sauna" className="hero-thumb" />
            <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=200&q=80" alt="Pool" className="hero-thumb" />
          </div>
        </section>

        <nav className="tab-nav">
          <div className="tab-nav-inner">
            {TABS.map((tab) => (
              <div
                key={tab.id}
                className={`tab${tab.conditional ? " conditional-tab" : ""}${activeTab === tab.id ? " active" : ""}`}
                data-tab={tab.id}
                onClick={() => switchTab(tab.id)}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </nav>

        <div className="main-layout">
          <div className="main-content">

            <div className={`tab-content${activeTab === "overview" ? " active" : ""}`} id="overview">
              <h2 className="sr-only">Overview</h2>
              <section className="section">
                <p className="section-label">Welcome</p>
                <div className="section-text">
                  <p>Serenity Day Spa is Brisbane&apos;s premier urban wellness destination, offering a tranquil escape from the demands of daily life. Nestled in the heart of the city, our award-winning spa combines ancient healing traditions with modern therapeutic techniques.</p>
                  <p>Every visit is designed to restore balance to body, mind, and spirit. From our signature thermal circuit to our expert massage therapists, we invite you to surrender to stillness and emerge renewed.</p>
                </div>
              </section>

              <div className="section-divider" />

              <section className="section taxonomy-section">
                <p className="taxonomy-label">Wellness Categories</p>
                <div className="taxonomy-pills">
                  <span className="taxonomy-pill" data-taxonomy-category="body-therapies-bodywork">Body Therapies &amp; Bodywork</span>
                  <span className="taxonomy-pill" data-taxonomy-category="thermal-hydrotherapy">Thermal &amp; Hydrotherapy</span>
                  <span className="taxonomy-pill" data-taxonomy-category="skin-ritual-beauty">Skin &amp; Ritual Beauty</span>
                  <span className="taxonomy-pill" data-taxonomy-category="yoga-movement">Yoga &amp; Movement</span>
                </div>
              </section>

              <section className="section">
                <p className="section-label">Featured Experiences</p>
                <p className="section-subtitle">Our most loved treatments</p>

                <div className="featured-services">
                  <div className="featured-service-card">
                    <div className="featured-service-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80')" }} />
                    <div className="featured-service-content">
                      <h3 className="featured-service-name">Signature Massage</h3>
                      <p className="featured-service-meta">60 min — From $129</p>
                      <a href="#" className="featured-service-btn" onClick={(e) => { e.preventDefault(); goToEnquiry(); }}>Book</a>
                    </div>
                  </div>
                  <div className="featured-service-card">
                    <div className="featured-service-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80')" }} />
                    <div className="featured-service-content">
                      <h3 className="featured-service-name">Thermal Circuit</h3>
                      <p className="featured-service-meta">2 hours — $89</p>
                      <a href="#" className="featured-service-btn" onClick={(e) => { e.preventDefault(); goToEnquiry(); }}>Book</a>
                    </div>
                  </div>
                  <div className="featured-service-card">
                    <div className="featured-service-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80')" }} />
                    <div className="featured-service-content">
                      <h3 className="featured-service-name">Facial Ritual</h3>
                      <p className="featured-service-meta">75 min — $159</p>
                      <a href="#" className="featured-service-btn" onClick={(e) => { e.preventDefault(); goToEnquiry(); }}>Book</a>
                    </div>
                  </div>
                  <div className="featured-service-card">
                    <div className="featured-service-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80')" }} />
                    <div className="featured-service-content">
                      <h3 className="featured-service-name">Float Therapy</h3>
                      <p className="featured-service-meta">60 min — $99</p>
                      <a href="#" className="featured-service-btn" onClick={(e) => { e.preventDefault(); goToEnquiry(); }}>Book</a>
                    </div>
                  </div>
                </div>

                <a href="#" className="view-all-link" onClick={(e) => { e.preventDefault(); switchTab("services"); }}>View All Services &#8594;</a>
              </section>

              <div className="section-divider" />

              <section className="section">
                <p className="section-label">Amenities</p>

                <div className="quick-amenities">
                  <div className="quick-amenity">
                    <div className="quick-amenity-icon">🅿️</div>
                    <div className="quick-amenity-label">Free Parking</div>
                  </div>
                  <div className="quick-amenity">
                    <div className="quick-amenity-icon">🚿</div>
                    <div className="quick-amenity-label">Showers</div>
                  </div>
                  <div className="quick-amenity">
                    <div className="quick-amenity-icon">🧖</div>
                    <div className="quick-amenity-label">Robes Provided</div>
                  </div>
                  <div className="quick-amenity">
                    <div className="quick-amenity-icon">🍵</div>
                    <div className="quick-amenity-label">Tea Lounge</div>
                  </div>
                  <div className="quick-amenity">
                    <div className="quick-amenity-icon">🔒</div>
                    <div className="quick-amenity-label">Lockers</div>
                  </div>
                  <div className="quick-amenity">
                    <div className="quick-amenity-icon">♿</div>
                    <div className="quick-amenity-label">Accessible</div>
                  </div>
                  <div className="quick-amenity">
                    <div className="quick-amenity-icon">📶</div>
                    <div className="quick-amenity-label">WiFi</div>
                  </div>
                  <div className="quick-amenity">
                    <div className="quick-amenity-icon">❄️</div>
                    <div className="quick-amenity-label">Air Conditioning</div>
                  </div>
                </div>

                <a href="#" className="view-all-link" onClick={(e) => { e.preventDefault(); switchTab("space"); }}>View All Amenities &#8594;</a>
              </section>

              <div className="section-divider" />

              <section className="section">
                <p className="section-label">At a Glance</p>

                <div className="at-a-glance">
                  <div className="glance-item">
                    <span className="glance-label">Venue Type</span>
                    <span className="glance-value">Day Spa</span>
                  </div>
                  <div className="glance-item">
                    <span className="glance-label">Established</span>
                    <span className="glance-value">2018</span>
                  </div>
                  <div className="glance-item">
                    <span className="glance-label">Best For</span>
                    <span className="glance-value">Couples, Solo, Groups</span>
                  </div>
                  <div className="glance-item">
                    <span className="glance-label">Languages</span>
                    <span className="glance-value">English, Mandarin</span>
                  </div>
                  <div className="glance-item">
                    <span className="glance-label">Today&apos;s Hours</span>
                    <span className="glance-value">9:00 AM – 9:00 PM</span>
                  </div>
                  <div className="glance-item">
                    <span className="glance-label">Accessibility</span>
                    <span className="glance-value">Wheelchair Accessible</span>
                  </div>
                </div>
              </section>
            </div>

            <div className={`tab-content${activeTab === "services" ? " active" : ""}`} id="services">
              <h2 className="sr-only">Services</h2>
              <section className="section">
                <p className="section-label">Experiences &amp; Treatments</p>
                <p className="section-subtitle">Restore, rejuvenate, reconnect</p>

                <div className="services-filter-bar">
                  <span className="services-filter-label">Filter by</span>
                  <button className={`services-filter-btn${serviceFilter === "all" ? " active" : ""}`} data-filter="all" onClick={() => setServiceFilter("all")}>All</button>
                  <button className={`services-filter-btn${serviceFilter === "body-therapies-bodywork" ? " active" : ""}`} data-filter="body-therapies-bodywork" onClick={() => setServiceFilter("body-therapies-bodywork")}>Body Therapies</button>
                  <button className={`services-filter-btn${serviceFilter === "thermal-hydrotherapy" ? " active" : ""}`} data-filter="thermal-hydrotherapy" onClick={() => setServiceFilter("thermal-hydrotherapy")}>Thermal &amp; Water</button>
                  <button className={`services-filter-btn${serviceFilter === "skin-ritual-beauty" ? " active" : ""}`} data-filter="skin-ritual-beauty" onClick={() => setServiceFilter("skin-ritual-beauty")}>Skin &amp; Beauty</button>
                </div>

                <div className="service-category" data-taxonomy-category="body-therapies-bodywork" style={{ display: serviceFilter === "all" || serviceFilter === "body-therapies-bodywork" ? "" : "none" }}>
                  <h3 className="service-category-title">Massage <span className="service-category-title-note">&#8627; Body Therapies &amp; Bodywork</span></h3>

                  <div className="service-item">
                    <div className="service-info">
                      <h4 className="service-name">Signature Relaxation Massage</h4>
                      <p className="service-description">A flowing, full-body massage using warm aromatherapy oils to release tension and restore calm.</p>
                      <p className="service-options">30 min — $69 | 60 min — $119 | 90 min — $159</p>
                    </div>
                    <div className="service-actions">
                      <span className="service-price">From $69</span>
                      <button className="service-book-btn" onClick={goToEnquiry}>Book</button>
                    </div>
                  </div>

                  <div className="service-item">
                    <div className="service-info">
                      <h4 className="service-name">Deep Tissue Massage</h4>
                      <p className="service-description">Targeted pressure to release chronic muscle tension and knots. Best for those who prefer firm pressure.</p>
                      <p className="service-options">60 min — $139 | 90 min — $189</p>
                    </div>
                    <div className="service-actions">
                      <span className="service-price">From $139</span>
                      <button className="service-book-btn" onClick={goToEnquiry}>Book</button>
                    </div>
                  </div>

                  <div className="service-item">
                    <div className="service-info">
                      <h4 className="service-name">Hot Stone Massage</h4>
                      <p className="service-description">Smooth, heated basalt stones combined with massage techniques to deeply relax muscles and improve circulation.</p>
                      <p className="service-options">75 min — $169 | 90 min — $199</p>
                    </div>
                    <div className="service-actions">
                      <span className="service-price">From $169</span>
                      <button className="service-book-btn" onClick={goToEnquiry}>Book</button>
                    </div>
                  </div>
                </div>

                <div className="service-category" style={{ display: serviceFilter === "all" ? "" : "none" }}>
                  <h3 className="service-category-title">Thermal &amp; Water</h3>

                  <div className="service-item">
                    <div className="service-info">
                      <h4 className="service-name">Thermal Circuit</h4>
                      <p className="service-description">Journey through our Finnish sauna, steam room, ice fountain, and heated relaxation pool. Includes herbal tea.</p>
                      <p className="service-options">2 hours access</p>
                    </div>
                    <div className="service-actions">
                      <span className="service-price">$89</span>
                      <button className="service-book-btn" onClick={goToEnquiry}>Book</button>
                    </div>
                  </div>

                  <div className="service-item">
                    <div className="service-info">
                      <h4 className="service-name">Float Therapy</h4>
                      <p className="service-description">Effortlessly float in our sensory deprivation pods filled with magnesium-rich water. Complete stillness for body and mind.</p>
                      <p className="service-options">60 min — $99 | 90 min — $129</p>
                    </div>
                    <div className="service-actions">
                      <span className="service-price">From $99</span>
                      <button className="service-book-btn" onClick={goToEnquiry}>Book</button>
                    </div>
                  </div>

                  <div className="service-item">
                    <div className="service-info">
                      <h4 className="service-name">Infrared Sauna</h4>
                      <p className="service-description">Private infrared sauna session for detoxification, pain relief, and deep relaxation at a gentle temperature.</p>
                      <p className="service-options">45 min — $59 | 60 min — $75</p>
                    </div>
                    <div className="service-actions">
                      <span className="service-price">From $59</span>
                      <button className="service-book-btn" onClick={goToEnquiry}>Book</button>
                    </div>
                  </div>
                </div>

                <div className="service-category" data-taxonomy-category="skin-ritual-beauty" style={{ display: serviceFilter === "all" || serviceFilter === "skin-ritual-beauty" ? "" : "none" }}>
                  <h3 className="service-category-title">Facials <span className="service-category-title-note">&#8627; Skin &amp; Ritual Beauty</span></h3>

                  <div className="service-item">
                    <div className="service-info">
                      <h4 className="service-name">Signature Facial</h4>
                      <p className="service-description">Customised facial treatment including cleansing, exfoliation, mask, and facial massage. Tailored to your skin type.</p>
                      <p className="service-options">60 min — $129 | 90 min — $179</p>
                    </div>
                    <div className="service-actions">
                      <span className="service-price">From $129</span>
                      <button className="service-book-btn" onClick={goToEnquiry}>Book</button>
                    </div>
                  </div>

                  <div className="service-item">
                    <div className="service-info">
                      <h4 className="service-name">Hydrating Facial</h4>
                      <p className="service-description">Intensive hydration for dry or dehydrated skin using hyaluronic acid and vitamin-rich serums.</p>
                      <p className="service-options">75 min</p>
                    </div>
                    <div className="service-actions">
                      <span className="service-price">$159</span>
                      <button className="service-book-btn" onClick={goToEnquiry}>Book</button>
                    </div>
                  </div>
                </div>

                <div className="service-category" data-taxonomy-category="skin-ritual-beauty" style={{ display: serviceFilter === "all" || serviceFilter === "skin-ritual-beauty" ? "" : "none" }}>
                  <h3 className="service-category-title">Body Treatments <span className="service-category-title-note">&#8627; Skin &amp; Ritual Beauty</span></h3>

                  <div className="service-item">
                    <div className="service-info">
                      <h4 className="service-name">Body Scrub &amp; Wrap</h4>
                      <p className="service-description">Full body exfoliation followed by a nourishing body wrap. Leaves skin silky smooth and deeply moisturised.</p>
                      <p className="service-options">90 min</p>
                    </div>
                    <div className="service-actions">
                      <span className="service-price">$189</span>
                      <button className="service-book-btn" onClick={goToEnquiry}>Book</button>
                    </div>
                  </div>
                </div>

              </section>
            </div>

            <div className={`tab-content conditional-content${activeTab === "accommodation" ? " active" : ""}`} id="accommodation" data-condition="has-accommodation">
              <h2 className="sr-only">Accommodation</h2>
              <div style={{ width: "100%", height: "400px", background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80') center/cover", marginBottom: "0" }} />

              <section className="section">
                <p className="section-label">Stay With Us</p>
                <div className="section-text">
                  <p>Extend your wellness journey with an overnight stay at our boutique retreat rooms. Each room has been thoughtfully designed as a sanctuary of calm, featuring organic linens, blackout curtains, and views of our meditation gardens.</p>
                  <p>Overnight guests enjoy exclusive access to our thermal facilities before and after regular hours, plus a wellness breakfast included with your stay.</p>
                </div>
              </section>

              <div className="section-divider" />

              <section className="section">
                <p className="section-label">Room Types</p>
                <p className="section-subtitle">Choose your sanctuary</p>

                <div className="facilities-grid">
                  <div className="facility-card">
                    <div className="facility-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80')" }} />
                    <div className="facility-content">
                      <h4 className="facility-name">Garden Room</h4>
                      <p className="facility-description">Intimate room overlooking our zen garden. Queen bed, ensuite bathroom, meditation corner.</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "var(--charcoal-lighter)", marginTop: "8px" }}>Sleeps 2 · 28 sqm · Ground floor</p>
                      <p style={{ fontFamily: "var(--font-serif)", fontSize: "18px", color: "var(--charcoal)", marginTop: "12px" }}>$350 / night</p>
                      <button className="service-book-btn" style={{ marginTop: "16px" }} onClick={goToEnquiry}>Book Room</button>
                    </div>
                  </div>
                  <div className="facility-card">
                    <div className="facility-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80')" }} />
                    <div className="facility-content">
                      <h4 className="facility-name">Wellness Suite</h4>
                      <p className="facility-description">Spacious suite with private balcony, king bed, deep soaking tub, and dedicated relaxation area.</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "var(--charcoal-lighter)", marginTop: "8px" }}>Sleeps 2 · 45 sqm · First floor</p>
                      <p style={{ fontFamily: "var(--font-serif)", fontSize: "18px", color: "var(--charcoal)", marginTop: "12px" }}>$495 / night</p>
                      <button className="service-book-btn" style={{ marginTop: "16px" }} onClick={goToEnquiry}>Book Room</button>
                    </div>
                  </div>
                </div>
              </section>

              <div className="section-divider" />

              <section className="section">
                <p className="section-label">What&apos;s Included</p>
                <div className="amenities-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                  <div className="amenity-item"><span className="amenity-icon">🍳</span><span className="amenity-label">Wellness Breakfast</span></div>
                  <div className="amenity-item"><span className="amenity-icon">🧖</span><span className="amenity-label">Robes &amp; Slippers</span></div>
                  <div className="amenity-item"><span className="amenity-icon">🌡️</span><span className="amenity-label">Thermal Access</span></div>
                  <div className="amenity-item"><span className="amenity-icon">🧴</span><span className="amenity-label">Organic Amenities</span></div>
                  <div className="amenity-item"><span className="amenity-icon">🍵</span><span className="amenity-label">In-Room Tea</span></div>
                  <div className="amenity-item"><span className="amenity-icon">📶</span><span className="amenity-label">WiFi</span></div>
                </div>
              </section>

              <div className="section-divider" />

              <section className="section">
                <p className="section-label">Check-In / Check-Out</p>
                <div className="location-details" style={{ gridTemplateColumns: "1fr" }}>
                  <div className="location-block">
                    <table className="hours-table">
                      <tbody>
                        <tr>
                          <td>Check-in</td>
                          <td>3:00 PM</td>
                        </tr>
                        <tr>
                          <td>Check-out</td>
                          <td>11:00 AM</td>
                        </tr>
                      </tbody>
                    </table>
                    <p style={{ marginTop: "16px", fontFamily: "var(--font-serif)", fontSize: "15px", color: "var(--charcoal-light)" }}>Early check-in and late check-out available on request, subject to availability.</p>
                  </div>
                </div>
              </section>
            </div>

            <div className={`tab-content conditional-content${activeTab === "packages" ? " active" : ""}`} id="packages" data-condition="has-packages">
              <h2 className="sr-only">Packages</h2>
              <section className="section">
                <p className="section-label">Curated Packages</p>
                <p className="section-subtitle">Complete wellness experiences designed for transformation</p>
                <div className="section-text" style={{ marginBottom: "48px" }}>
                  <p>Our packages combine accommodation, treatments, and experiences into seamless wellness journeys. Each has been thoughtfully curated to provide deep restoration and lasting benefits.</p>
                </div>

                <div className="facilities-grid">
                  <div className="facility-card">
                    <div className="facility-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80')" }} />
                    <div className="facility-content">
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--charcoal-lighter)", marginBottom: "8px" }}>Day Package</p>
                      <h4 className="facility-name">Restore &amp; Renew</h4>
                      <p className="facility-description">A half-day escape featuring thermal circuit access, signature massage, and organic lunch.</p>
                      <ul style={{ listStyle: "none", marginTop: "16px", fontFamily: "var(--font-serif)", fontSize: "14px", color: "var(--charcoal-light)" }}>
                        <li style={{ padding: "4px 0" }}>✓ 2-hour thermal circuit access</li>
                        <li style={{ padding: "4px 0" }}>✓ 60-min signature massage</li>
                        <li style={{ padding: "4px 0" }}>✓ Organic wellness lunch</li>
                        <li style={{ padding: "4px 0" }}>✓ Herbal tea service</li>
                      </ul>
                      <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", color: "var(--charcoal)", marginTop: "16px" }}>$299 per person</p>
                      <button className="service-book-btn" style={{ marginTop: "16px" }} onClick={goToEnquiry}>Book Package</button>
                    </div>
                  </div>

                  <div className="facility-card">
                    <div className="facility-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80')" }} />
                    <div className="facility-content">
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--charcoal-lighter)", marginBottom: "8px" }}>Overnight</p>
                      <h4 className="facility-name">Weekend Wellness</h4>
                      <p className="facility-description">Two nights of complete immersion including accommodation, daily treatments, and all meals.</p>
                      <ul style={{ listStyle: "none", marginTop: "16px", fontFamily: "var(--font-serif)", fontSize: "14px", color: "var(--charcoal-light)" }}>
                        <li style={{ padding: "4px 0" }}>✓ 2 nights Garden Room</li>
                        <li style={{ padding: "4px 0" }}>✓ Daily breakfast &amp; dinner</li>
                        <li style={{ padding: "4px 0" }}>✓ 90-min massage</li>
                        <li style={{ padding: "4px 0" }}>✓ Signature facial</li>
                        <li style={{ padding: "4px 0" }}>✓ Unlimited thermal access</li>
                      </ul>
                      <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", color: "var(--charcoal)", marginTop: "16px" }}>$1,250 per person</p>
                      <button className="service-book-btn" style={{ marginTop: "16px" }} onClick={goToEnquiry}>Book Package</button>
                    </div>
                  </div>
                </div>

                <div style={{ background: "var(--warm-cream)", padding: "32px", borderRadius: "8px", marginTop: "48px", textAlign: "center" }}>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "18px", color: "var(--charcoal)", marginBottom: "16px" }}>Looking for something different?</p>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "15px", color: "var(--charcoal-light)", marginBottom: "24px" }}>We can create custom packages tailored to your needs.</p>
                  <Link href="/global-santcum/contact" className="view-all-link">Contact Us &#8594;</Link>
                </div>

              </section>
            </div>

            <div className={`tab-content conditional-content${activeTab === "practitioners" ? " active" : ""}`} id="practitioners" data-condition="has-practitioners">
              <h2 className="sr-only">Practitioners</h2>
              <section className="section">
                <p className="section-label">Our Practitioners</p>
                <p className="section-subtitle">Experienced healers dedicated to your wellbeing</p>
                <div className="section-text" style={{ marginBottom: "48px" }}>
                  <p>Our team of qualified practitioners brings together diverse modalities and decades of combined experience. Each therapist is carefully selected not only for their technical expertise but for their intuitive approach to healing.</p>
                </div>

                <div className="facilities-grid">
                  <div className="facility-card">
                    <div className="facility-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80')", backgroundPosition: "top" }} />
                    <div className="facility-content">
                      <h4 className="facility-name">Dr. Sarah Chen</h4>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--charcoal-lighter)", marginBottom: "12px" }}>Traditional Chinese Medicine</p>
                      <p className="facility-description">B.HSc (TCM), AHPRA Registered. 15+ years experience specialising in women&apos;s health, fertility, and chronic pain management.</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--charcoal-lighter)", marginTop: "12px" }}>Specialises in: Acupuncture, Herbal Medicine, Cupping</p>
                      <button className="service-book-btn" style={{ marginTop: "16px" }} onClick={goToEnquiry}>Book with Sarah</button>
                    </div>
                  </div>

                  <div className="facility-card">
                    <div className="facility-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80')", backgroundPosition: "top" }} />
                    <div className="facility-content">
                      <h4 className="facility-name">Michael Torres</h4>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--charcoal-lighter)", marginBottom: "12px" }}>Senior Massage Therapist</p>
                      <p className="facility-description">Diploma Remedial Massage, Cert IV Myotherapy. 12+ years experience with elite athletes and chronic pain patients.</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--charcoal-lighter)", marginTop: "12px" }}>Specialises in: Deep Tissue, Sports Massage, Myofascial Release</p>
                      <button className="service-book-btn" style={{ marginTop: "16px" }} onClick={goToEnquiry}>Book with Michael</button>
                    </div>
                  </div>

                  <div className="facility-card">
                    <div className="facility-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80')", backgroundPosition: "top" }} />
                    <div className="facility-content">
                      <h4 className="facility-name">Emma Williams</h4>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--charcoal-lighter)", marginBottom: "12px" }}>Naturopath &amp; Nutritionist</p>
                      <p className="facility-description">BHSc Naturopathy, Adv Dip Nutritional Medicine. 10+ years helping clients optimise health through natural therapies.</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--charcoal-lighter)", marginTop: "12px" }}>Specialises in: Gut Health, Hormonal Balance, Stress Management</p>
                      <button className="service-book-btn" style={{ marginTop: "16px" }} onClick={goToEnquiry}>Book with Emma</button>
                    </div>
                  </div>

                  <div className="facility-card">
                    <div className="facility-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&q=80')", backgroundPosition: "top" }} />
                    <div className="facility-content">
                      <h4 className="facility-name">James Liu</h4>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--charcoal-lighter)", marginBottom: "12px" }}>Ayurvedic Practitioner</p>
                      <p className="facility-description">BAMS (India), Certified Panchakarma Specialist. 8+ years bringing authentic Ayurvedic healing to Western wellness.</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--charcoal-lighter)", marginTop: "12px" }}>Specialises in: Ayurvedic Consultation, Abhyanga, Shirodhara</p>
                      <button className="service-book-btn" style={{ marginTop: "16px" }} onClick={goToEnquiry}>Book with James</button>
                    </div>
                  </div>
                </div>

              </section>
            </div>

            <div className={`tab-content${activeTab === "space" ? " active" : ""}`} id="space">
              <h2 className="sr-only">The Space</h2>
              <section className="section">
                <p className="section-label">About Serenity Day Spa</p>
                <div className="section-text">
                  <p>Founded in 2018, Serenity Day Spa was created with a singular vision: to bring world-class spa experiences to the heart of Brisbane. Our 800 square metre urban sanctuary features treatment rooms, thermal facilities, and relaxation spaces designed by leading wellness architects.</p>
                  <p>We believe in the transformative power of touch, heat, and stillness. Every element of our space — from the natural materials to the ambient soundscape — has been carefully considered to support your journey back to balance.</p>
                </div>
              </section>

              <div className="section-divider" />

              <section className="section">
                <p className="section-label">Facilities</p>
                <p className="section-subtitle">Spaces designed for restoration</p>

                <div className="facilities-grid">
                  <div className="facility-card">
                    <div className="facility-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80')" }} />
                    <div className="facility-content">
                      <h4 className="facility-name">Thermal Suite</h4>
                      <p className="facility-description">Finnish sauna, steam room, ice fountain, and heated relaxation pool.</p>
                      <p className="facility-access">Included with Thermal Circuit booking</p>
                    </div>
                  </div>
                  <div className="facility-card">
                    <div className="facility-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80')" }} />
                    <div className="facility-content">
                      <h4 className="facility-name">Float Pods</h4>
                      <p className="facility-description">Two private sensory deprivation pods with shower facilities.</p>
                      <p className="facility-access">By booking only</p>
                    </div>
                  </div>
                  <div className="facility-card">
                    <div className="facility-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=600&q=80')" }} />
                    <div className="facility-content">
                      <h4 className="facility-name">Relaxation Lounge</h4>
                      <p className="facility-description">Quiet space with heated loungers, herbal tea station, and ambient music.</p>
                      <p className="facility-access">Included with all treatments</p>
                    </div>
                  </div>
                  <div className="facility-card">
                    <div className="facility-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80')" }} />
                    <div className="facility-content">
                      <h4 className="facility-name">Treatment Rooms</h4>
                      <p className="facility-description">Six private treatment rooms including one couples suite.</p>
                      <p className="facility-access">By booking only</p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="section-divider" />

              <section className="section">
                <p className="section-label">Amenities</p>

                <div className="amenities-grid">
                  <div className="amenity-item">
                    <span className="amenity-icon">🅿️</span>
                    <span className="amenity-label">Free Parking</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon">🚿</span>
                    <span className="amenity-label">Showers</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon">🧖</span>
                    <span className="amenity-label">Robes &amp; Slippers</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon">🔒</span>
                    <span className="amenity-label">Lockers</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon">🧴</span>
                    <span className="amenity-label">Toiletries</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon">💨</span>
                    <span className="amenity-label">Hair Dryers</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon">🍵</span>
                    <span className="amenity-label">Tea Station</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon">💧</span>
                    <span className="amenity-label">Water Station</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon">📶</span>
                    <span className="amenity-label">WiFi</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon">❄️</span>
                    <span className="amenity-label">Air Conditioning</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon">♿</span>
                    <span className="amenity-label">Accessible Entry</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon">🌿</span>
                    <span className="amenity-label">Outdoor Terrace</span>
                  </div>
                </div>
              </section>

              <div className="section-divider" />

              <section className="section">
                <p className="section-label">What to Bring</p>
                <div className="section-text">
                  <p><strong>We provide:</strong> Robes, slippers, towels, lockers, toiletries, hair dryers</p>
                  <p><strong>Please bring:</strong> Swimwear for thermal facilities, personal items, a calm mindset</p>
                  <p><strong>Optional:</strong> Your own products if you have specific preferences</p>
                </div>
              </section>
            </div>

            <div className={`tab-content${activeTab === "location" ? " active" : ""}`} id="location">
              <h2 className="sr-only">Location and Hours</h2>
              <section className="section">
                <p className="section-label">Find Us</p>

                <div className="map-container">
                  [Google Map Embed]
                </div>

                <div className="location-details">
                  <div className="location-block">
                    <h4>Address</h4>
                    <p>123 Wellness Lane<br />Brisbane QLD 4000<br />Australia</p>
                    <br />
                    <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("123 Wellness Lane, Brisbane QLD 4000, Australia")} className="view-all-link" target="_blank" rel="noopener noreferrer">Get Directions &#8594;</a>
                  </div>

                  <div className="location-block">
                    <h4>Getting Here</h4>
                    <ul>
                      <li><strong>By Car:</strong> Free parking available on-site (20 spaces)</li>
                      <li><strong>Public Transport:</strong> 5 min walk from Central Station</li>
                      <li><strong>From Airport:</strong> 25 min by car or train</li>
                    </ul>
                  </div>
                </div>
              </section>

              <div className="section-divider" />

              <section className="section">
                <p className="section-label">Opening Hours</p>

                <table className="hours-table">
                  <tbody>
                    <tr>
                      <td>Monday</td>
                      <td>9:00 AM – 9:00 PM</td>
                    </tr>
                    <tr>
                      <td>Tuesday</td>
                      <td>9:00 AM – 9:00 PM</td>
                    </tr>
                    <tr>
                      <td>Wednesday</td>
                      <td>9:00 AM – 9:00 PM</td>
                    </tr>
                    <tr>
                      <td>Thursday</td>
                      <td>9:00 AM – 9:00 PM</td>
                    </tr>
                    <tr>
                      <td>Friday</td>
                      <td>9:00 AM – 10:00 PM</td>
                    </tr>
                    <tr>
                      <td>Saturday</td>
                      <td>8:00 AM – 10:00 PM</td>
                    </tr>
                    <tr>
                      <td>Sunday</td>
                      <td>8:00 AM – 8:00 PM</td>
                    </tr>
                  </tbody>
                </table>

                <p style={{ marginTop: "24px", fontFamily: "var(--font-sans)", fontSize: "12px", color: "var(--charcoal-lighter)" }}>
                  Last treatment booking 1 hour before close. Public holiday hours may vary.
                </p>
              </section>

              <div className="section-divider" />

              <section className="section">
                <p className="section-label">Contact</p>
                <div className="location-details">
                  <div className="location-block">
                    <h4>Phone</h4>
                    <p>+61 7 1234 5678</p>
                  </div>
                  <div className="location-block">
                    <h4>Email</h4>
                    <p><a className="email-link" data-u="{{venue.email_user}}" data-d="{{venue.email_domain}}"><span className="email-text">{"{{venue.email_user}} [at] {{venue.email_domain}}"}</span></a></p>
                  </div>
                </div>
              </section>
            </div>

            <div className={`tab-content${activeTab === "policies" ? " active" : ""}`} id="policies">
              <h2 className="sr-only">Policies</h2>
              <section className="section">
                <div className="policy-section">
                  <h3 className="policy-title">Cancellation Policy</h3>
                  <div className="policy-content">
                    <ul>
                      <li><strong>48+ hours before appointment:</strong> Full refund</li>
                      <li><strong>24-48 hours before:</strong> 50% refund</li>
                      <li><strong>Less than 24 hours:</strong> No refund</li>
                    </ul>
                    <div className="policy-highlight">
                      <p><strong>Rescheduling:</strong> Bookings can be rescheduled free of charge up to 24 hours before your appointment, subject to availability.</p>
                    </div>
                  </div>
                </div>

                <div className="policy-section">
                  <h3 className="policy-title">Arrival</h3>
                  <div className="policy-content">
                    <p>Please arrive 15 minutes before your appointment to complete check-in and prepare for your treatment. This allows time to change, store belongings, and begin relaxing before your service.</p>
                    <ul>
                      <li><strong>Late arrivals:</strong> Your treatment may be shortened to accommodate subsequent bookings</li>
                      <li><strong>No-shows:</strong> Full charge applies</li>
                    </ul>
                  </div>
                </div>

                <div className="policy-section">
                  <h3 className="policy-title">Health &amp; Safety</h3>
                  <div className="policy-content">
                    <p>Please inform us of any health conditions, allergies, injuries, or pregnancy when booking. Some treatments have contraindications.</p>
                    <ul>
                      <li>Thermal facilities not recommended for pregnant women</li>
                      <li>Some treatments not suitable for certain medical conditions</li>
                      <li>Please consult your doctor if unsure</li>
                    </ul>
                  </div>
                </div>

                <div className="policy-section">
                  <h3 className="policy-title">Venue Etiquette</h3>
                  <div className="policy-content">
                    <ul>
                      <li><strong>Quiet zones:</strong> Please maintain a peaceful atmosphere throughout the spa</li>
                      <li><strong>Mobile phones:</strong> Silent mode required; no calls in common areas</li>
                      <li><strong>Photography:</strong> Not permitted in treatment areas or changing rooms</li>
                      <li><strong>Dress code:</strong> Swimwear required in thermal facilities; robes provided for all other areas</li>
                    </ul>
                  </div>
                </div>

                <div className="policy-section">
                  <h3 className="policy-title">Payment</h3>
                  <div className="policy-content">
                    <ul>
                      <li><strong>Accepted:</strong> Visa, Mastercard, AMEX, EFTPOS, Cash</li>
                      <li><strong>Gift vouchers:</strong> Valid for 3 years from purchase date</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

          </div>

          <aside className="booking-sidebar sidebar-version-a">
            <div className="sidebar-card">
              <p className="sidebar-header">Book an Experience</p>
              <p className="sidebar-price">From $59</p>
              <p className="sidebar-price-note">Per service</p>

              <select className="sidebar-select" defaultValue="Select a Service">
                <option>Select a Service</option>
                <option>Signature Massage — From $69</option>
                <option>Deep Tissue Massage — From $139</option>
                <option>Hot Stone Massage — From $169</option>
                <option>Thermal Circuit — $89</option>
                <option>Float Therapy — From $99</option>
                <option>Infrared Sauna — From $59</option>
                <option>Signature Facial — From $129</option>
                <option>Body Scrub &amp; Wrap — $189</option>
              </select>

              <button className="sidebar-btn-primary" onClick={goToEnquiry}>Check Availability</button>

              <div className="sidebar-divider" />

              <div className="sidebar-trust">
                <div className="sidebar-trust-item">
                  <svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
                  Instant confirmation
                </div>
                <div className="sidebar-trust-item">
                  <svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
                  Free cancellation 48hrs+
                </div>
                <div className="sidebar-trust-item">
                  <svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
                  Secure payment
                </div>
              </div>

              <div className="sidebar-divider" />

              <button className="sidebar-wishlist">
                <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                Save to Wishlist
              </button>

              <p className="sidebar-contact">
                Questions? <a className="email-link" data-u="hello" data-d="theglobalsanctum.com">Contact us</a>
              </p>
            </div>
          </aside>

        </div>

        <section className="similar-venues">
          <div className="section-header">
            <p className="section-label">You May Also Like</p>
          </div>

          <div className="venue-cards">
            <article className="venue-card">
              <div className="venue-card-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80')" }} />
              <div className="venue-card-content">
                <h3 className="venue-card-name">Endota Spa</h3>
                <p className="venue-card-location">Brisbane, Queensland</p>
                <p className="venue-card-price">From $79 <span>/ service</span></p>
              </div>
            </article>
            <article className="venue-card">
              <div className="venue-card-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80')" }} />
              <div className="venue-card-content">
                <h3 className="venue-card-name">Float Space</h3>
                <p className="venue-card-location">Brisbane, Queensland</p>
                <p className="venue-card-price">From $89 <span>/ session</span></p>
              </div>
            </article>
            <article className="venue-card">
              <div className="venue-card-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80')" }} />
              <div className="venue-card-content">
                <h3 className="venue-card-name">Nordic Bathhouse</h3>
                <p className="venue-card-location">Sunshine Coast, Queensland</p>
                <p className="venue-card-price">From $69 <span>/ entry</span></p>
              </div>
            </article>
          </div>
        </section>

        <section className="cta-section">
          <h2 className="cta-title">Ready to Book?</h2>
          <p className="cta-text">Experience relaxation at Serenity Day Spa</p>
          <div className="cta-buttons">
            <a href="#" className="btn btn--primary" onClick={(e) => { e.preventDefault(); goToEnquiry(); }}>Book Now</a>
            {VENUE_PDF_URL ? <a href={VENUE_PDF_URL} className="btn btn--secondary" target="_blank" rel="noopener noreferrer">Download Venue PDF</a> : null}
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
              <li><Link href="/global-santcum/legal">All Legal &amp; Policies &#8594;</Link></li>
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

      <div className="mobile-booking-bar">
        <div className="mobile-price">From $59 <span>/ service</span></div>
        <button className="mobile-book-btn" onClick={goToEnquiry}>Check Availability</button>
      </div>
    </div>
  );
}
