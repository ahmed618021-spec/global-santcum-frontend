"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TgsNavDrawer from "@/components/tgs/TgsNavDrawer";
import { featuredArticle, gridArticles, editorialPairs, type Article } from "@/components/tgs/wellnessEditData";

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
    font-size: 17px;
    font-weight: 300;
    line-height: 1.7;
    color: var(--charcoal);
    background: var(--warm-white);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
}

img { max-width: 100%; height: auto; display: block; }
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

.hp-trap {
    position: absolute; left: -9999px; top: -9999px;
    width: 1px; height: 1px; overflow: hidden;
    opacity: 0; pointer-events: none;
}

.hero {
    padding: 160px 48px 80px;
    text-align: center;
    background: var(--warm-white);
}

.hero-inner {
    max-width: 720px;
    margin: 0 auto;
}

.hero-overline {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--charcoal);
    margin-bottom: 28px;
}

.hero-title {
    font-family: var(--font-serif);
    font-size: clamp(48px, 7vw, 72px);
    font-weight: 300;
    line-height: 1.05;
    color: var(--charcoal);
    margin-bottom: 28px;
    font-style: italic;
}

.hero-subtitle {
    font-family: var(--font-serif);
    font-size: 20px;
    font-weight: 300;
    line-height: 1.7;
    color: var(--charcoal);
    max-width: 540px;
    margin: 0 auto;
}

.hero-rule {
    width: 48px;
    height: 1px;
    background: var(--charcoal-15);
    margin: 48px auto 0;
}

.featured {
    padding: 0 48px 80px;
}

.featured-inner {
    max-width: 1400px;
    margin: 0 auto;
}

.featured-card {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 0;
    background: var(--warm-cream);
    overflow: hidden;
    cursor: pointer;
    transition: box-shadow 0.4s ease;
}

.featured-card:hover {
    box-shadow: 0 20px 60px rgba(49, 49, 49, 0.08);
}

.featured-image {
    aspect-ratio: 4 / 3;
    background: linear-gradient(135deg, var(--charcoal-10), var(--charcoal-05));
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
}

.featured-image-placeholder {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--charcoal-30);
}

.featured-content {
    padding: 64px 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.featured-category {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--canyon-clay);
    margin-bottom: 20px;
}

.featured-title {
    font-family: var(--font-serif);
    font-size: clamp(28px, 3vw, 38px);
    font-weight: 300;
    line-height: 1.25;
    color: var(--charcoal);
    margin-bottom: 20px;
}

.featured-excerpt {
    font-family: var(--font-serif);
    font-size: 16px;
    font-weight: 300;
    line-height: 1.75;
    color: var(--charcoal);
    margin-bottom: 32px;
}

.featured-meta {
    display: flex;
    align-items: center;
    gap: 20px;
}

.featured-meta span {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.1em;
    color: var(--charcoal-50);
    text-transform: uppercase;
}

.featured-meta-divider {
    width: 24px;
    height: 1px;
    background: var(--charcoal-15);
}

.featured-read-more {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--charcoal);
    border-bottom: 1px solid var(--charcoal-15);
    padding-bottom: 4px;
    display: inline-block;
    margin-top: 28px;
    transition: border-color 0.3s ease;
    align-self: flex-start;
}

.featured-read-more:hover {
    border-color: var(--charcoal);
}

.journal-cta {
    padding: 64px 48px;
    background: var(--warm-cream);
}

.journal-cta-inner {
    max-width: 680px;
    margin: 0 auto;
    text-align: center;
}

.journal-cta-label {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--charcoal);
    margin-bottom: 16px;
}

.journal-cta-title {
    font-family: var(--font-serif);
    font-size: 30px;
    font-weight: 300;
    line-height: 1.3;
    color: var(--charcoal);
    margin-bottom: 12px;
}

.journal-cta-text {
    font-family: var(--font-serif);
    font-size: 16px;
    font-weight: 300;
    color: var(--charcoal);
    margin-bottom: 28px;
}

.journal-form {
    display: flex;
    gap: 0;
    max-width: 480px;
    margin: 0 auto;
}

.journal-input {
    flex: 1;
    font-family: var(--font-serif);
    font-size: 15px;
    font-weight: 300;
    padding: 14px 20px;
    border: 1px solid var(--charcoal-15);
    border-right: none;
    background: var(--warm-white);
    color: var(--charcoal);
    outline: none;
    transition: border-color 0.3s ease;
}

.journal-input::placeholder {
    color: var(--charcoal);
    opacity: 0.35;
}

.journal-input:focus {
    border-color: var(--gold-accent);
}

.journal-submit {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 14px 28px;
    background: var(--charcoal);
    color: var(--warm-white);
    border: 1px solid var(--charcoal);
    cursor: pointer;
    transition: background 0.3s ease;
    white-space: nowrap;
}

.journal-submit:hover {
    background: var(--canyon-clay);
    border-color: var(--canyon-clay);
}

.search-bar {
    padding: 56px 48px 0;
    background: var(--warm-white);
}

.search-bar-inner {
    max-width: 1400px;
    margin: 0 auto;
}

.search-bar-label {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--charcoal);
    text-align: center;
    margin-bottom: 24px;
}

.search-row {
    display: flex;
    gap: 0;
    border: 1px solid var(--charcoal-15);
    background: var(--warm-white);
    transition: border-color 0.3s ease;
}

.search-row:focus-within {
    border-color: var(--gold-accent);
}

.search-keyword {
    flex: 1;
    font-family: var(--font-serif);
    font-size: 16px;
    font-weight: 300;
    padding: 16px 24px;
    border: none;
    background: transparent;
    color: var(--charcoal);
    outline: none;
    min-width: 0;
}

.search-keyword::placeholder {
    color: var(--charcoal);
    opacity: 0.3;
}

.search-divider {
    width: 1px;
    background: var(--charcoal-10);
    margin: 10px 0;
    flex-shrink: 0;
}

.search-select-wrapper {
    position: relative;
    flex-shrink: 0;
}

.search-select {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--charcoal-50);
    padding: 16px 40px 16px 20px;
    border: none;
    background: transparent;
    cursor: pointer;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    min-width: 140px;
}

.search-select:focus,
.search-select:not([value=""]):valid {
    color: var(--charcoal);
}

.search-select-wrapper::after {
    content: '';
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid var(--charcoal-30);
    pointer-events: none;
}

.search-btn {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--warm-white);
    background: var(--charcoal);
    padding: 16px 32px;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease;
    white-space: nowrap;
    flex-shrink: 0;
}

.search-btn:hover {
    background: var(--canyon-clay);
}

.search-filters-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0 0;
}

.search-active-filters {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.search-filter-tag {
    display: none;
    align-items: center;
    gap: 6px;
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--charcoal-70);
    background: var(--warm-cream);
    padding: 6px 12px;
}

.search-filter-tag.visible {
    display: flex;
}

.search-filter-tag-close {
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    color: var(--charcoal-30);
    transition: color 0.2s ease;
}

.search-filter-tag-close:hover {
    color: var(--charcoal);
}

.search-clear-all {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--charcoal-30);
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px 0;
    transition: color 0.3s ease;
    display: none;
}

.search-clear-all.visible {
    display: block;
}

.search-clear-all:hover {
    color: var(--charcoal);
}

.search-results-count {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.06em;
    color: var(--charcoal-30);
    text-align: center;
    padding-top: 20px;
}

.categories {
    padding: 60px 48px 0;
    background: var(--warm-white);
}

.categories-inner {
    max-width: 1400px;
    margin: 0 auto;
}

.categories-label {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--charcoal);
    text-align: center;
    margin-bottom: 24px;
}

.categories-tabs {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    padding-bottom: 48px;
    border-bottom: 1px solid var(--charcoal-10);
}

.category-tab {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--charcoal-50);
    padding: 10px 20px;
    border: 1px solid transparent;
    background: none;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.category-tab:hover {
    color: var(--charcoal);
}

.category-tab.active {
    color: var(--charcoal);
    border-color: var(--charcoal);
    font-weight: 500;
}

.articles {
    padding: 56px 48px 100px;
    background: var(--warm-white);
}

.articles-inner {
    max-width: 1400px;
    margin: 0 auto;
}

.articles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px 36px;
}

.article-card {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.article-card:hover {
    transform: translateY(-4px);
}

.article-image {
    aspect-ratio: 3 / 2;
    background: linear-gradient(135deg, var(--charcoal-10), var(--charcoal-05));
    margin-bottom: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.article-image-placeholder {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--charcoal-30);
}

.article-category {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--canyon-clay);
    margin-bottom: 10px;
}

.article-title {
    font-family: var(--font-serif);
    font-size: 24px;
    font-weight: 400;
    line-height: 1.3;
    color: var(--charcoal);
    margin-bottom: 12px;
}

.article-excerpt {
    font-family: var(--font-serif);
    font-size: 15px;
    font-weight: 300;
    line-height: 1.7;
    color: var(--charcoal);
    margin-bottom: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.article-meta {
    display: flex;
    align-items: center;
    gap: 12px;
}

.article-meta span {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.08em;
    color: var(--charcoal-50);
    text-transform: uppercase;
}

.article-meta-dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--charcoal-15);
}

.editorial-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 36px;
    margin-top: 56px;
    padding-top: 56px;
    border-top: 1px solid var(--charcoal-10);
}

.editorial-card {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 28px;
    cursor: pointer;
    align-items: start;
}

.editorial-card:hover .editorial-title {
    color: var(--canyon-clay);
}

.editorial-image {
    aspect-ratio: 1 / 1;
    background: linear-gradient(135deg, var(--charcoal-10), var(--charcoal-05));
    display: flex;
    align-items: center;
    justify-content: center;
}

.editorial-content {
    padding: 8px 0;
}

.editorial-category {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--canyon-clay);
    margin-bottom: 8px;
}

.editorial-title {
    font-family: var(--font-serif);
    font-size: 20px;
    font-weight: 400;
    line-height: 1.35;
    color: var(--charcoal);
    margin-bottom: 10px;
    transition: color 0.3s ease;
}

.editorial-excerpt {
    font-family: var(--font-serif);
    font-size: 14px;
    font-weight: 300;
    line-height: 1.65;
    color: var(--charcoal);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.editorial-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 12px;
}

.editorial-meta span {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.06em;
    color: var(--charcoal-50);
    text-transform: uppercase;
}

.load-more {
    text-align: center;
    margin-top: 64px;
}

.load-more-btn {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--charcoal);
    background: none;
    border: 1px solid var(--charcoal-15);
    padding: 16px 48px;
    cursor: pointer;
    transition: border-color 0.3s ease, transform 0.2s ease;
}

.load-more-btn:hover {
    border-color: var(--charcoal);
    transform: translateY(-1px);
}

.bottom-cta {
    padding: 100px 48px;
    background: var(--charcoal);
    text-align: center;
}

.bottom-cta-inner {
    max-width: 600px;
    margin: 0 auto;
}

.bottom-cta-label {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 20px;
}

.bottom-cta-title {
    font-family: var(--font-serif);
    font-size: clamp(28px, 4vw, 38px);
    font-weight: 300;
    line-height: 1.3;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 16px;
}

.bottom-cta-text {
    font-family: var(--font-serif);
    font-size: 16px;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.55);
    margin-bottom: 36px;
}

.bottom-cta-form {
    display: flex;
    gap: 0;
    max-width: 480px;
    margin: 0 auto;
}

.bottom-cta-input {
    flex: 1;
    font-family: var(--font-serif);
    font-size: 15px;
    font-weight: 300;
    padding: 14px 20px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-right: none;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    outline: none;
    transition: border-color 0.3s ease;
}

.bottom-cta-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
}

.bottom-cta-input:focus {
    border-color: var(--gold-accent);
}

.bottom-cta-submit {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 14px 28px;
    background: rgba(255, 255, 255, 0.9);
    color: var(--charcoal);
    border: none;
    cursor: pointer;
    transition: background 0.3s ease;
    white-space: nowrap;
}

.bottom-cta-submit:hover {
    background: var(--gold-accent);
    color: white;
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

@media (max-width: 1280px) {
    .articles-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 1100px) {
    .footer-grid { grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
}

@media (max-width: 1024px) {
    .featured-card { grid-template-columns: 1fr; }
    .featured-image { aspect-ratio: 16 / 9; }
    .featured-content { padding: 40px 36px; }
    .editorial-pair { grid-template-columns: 1fr; gap: 40px; }

    .search-row { flex-wrap: wrap; }
    .search-keyword { flex: 1 1 100%; border-bottom: 1px solid var(--charcoal-10); }
    .search-divider { display: none; }
    .search-select-wrapper { flex: 1; border-bottom: 1px solid var(--charcoal-10); }
    .search-btn { flex: 1 1 100%; }
}

@media (max-width: 768px) {
    .nav { padding: 18px 24px; }
    .nav-hamburger-label { display: none; }
    .drawer { width: 100%; max-width: 100vw; }

    .hero { padding: 130px 24px 56px; }
    .featured { padding: 0 24px 56px; }
    .featured-content { padding: 32px 24px; }
    .search-bar { padding: 40px 24px 0; }
    .search-select-wrapper { flex: 1 1 100%; }

    .categories { padding: 40px 24px 0; }
    .categories-tabs {
        gap: 4px;
        flex-wrap: nowrap;
        justify-content: flex-start;
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        -ms-overflow-style: none;
        scrollbar-width: none;
        margin-left: -24px;
        margin-right: -24px;
        padding-left: 24px;
        padding-right: 24px;
        padding-bottom: 32px;
    }
    .categories-tabs::-webkit-scrollbar { display: none; }
    .category-tab {
        padding: 8px 14px;
        font-size: 9px;
        flex-shrink: 0;
    }
    .articles { padding: 40px 24px 80px; }
    .articles-grid { grid-template-columns: 1fr; gap: 48px; }
    .editorial-pair { margin-top: 48px; padding-top: 48px; }
    .editorial-card { grid-template-columns: 1fr; }
    .editorial-image { aspect-ratio: 3 / 2; }

    .journal-cta { padding: 48px 24px; }
    .journal-form { flex-direction: column; }
    .journal-input { border-right: 1px solid var(--charcoal-15); }

    .bottom-cta { padding: 72px 24px; }
    .bottom-cta-form { flex-direction: column; }
    .bottom-cta-input { border-right: 1px solid rgba(255, 255, 255, 0.15); }

    .footer { padding: 60px 24px 24px; }
    .footer-grid { grid-template-columns: 1fr; gap: 32px; }
}

@media (max-width: 600px) {
    .footer-bottom { flex-direction: column; gap: 20px; align-items: flex-start; padding-top: 28px; }
    .footer-copyright { white-space: normal; }
    .footer-social { gap: 20px; }
}
`;

const categoryNames: Record<string, string> = {
  horizons: "Horizons",
  practice: "The Practice",
  pathways: "Pathways",
  portraits: "Portraits",
  craft: "The Craft",
  destinations: "Destinations",
  philosophy: "Philosophy",
  "field-notes": "Field Notes",
  "living-well": "Living Well",
  "inside-tgs": "Inside The Sanctum",
};

const dateLabels: Record<string, string> = {
  "7": "Past 7 days",
  "30": "Past 30 days",
  "90": "Past 3 months",
  "180": "Past 6 months",
  "365": "Past year",
};

const authorLabels: Record<string, string> = {
  editorial: "TGS Editorial",
  guest: "Guest Contributors",
};

const categoryTabs: Array<[string, string]> = [
  ["all", "All"],
  ["horizons", "Horizons"],
  ["practice", "The Practice"],
  ["pathways", "Pathways"],
  ["portraits", "Portraits"],
  ["craft", "The Craft"],
  ["destinations", "Destinations"],
  ["philosophy", "Philosophy"],
  ["field-notes", "Field Notes"],
  ["living-well", "Living Well"],
  ["inside-tgs", "Inside The Sanctum"],
];

const footerColumns: Array<{ title: string; links: Array<[string, string]> }> = [
  {
    title: "Discover",
    links: [
      ["Retreat Venues", "/global-santcum/retreat-venues"],
      ["Wellness Venues", "/global-santcum/wellness-venues"],
      ["Wellness Experiences", "/global-santcum/wellness-experiences"],
      ["How It Works", "/global-santcum/how-it-works"],
    ],
  },
  {
    title: "Partner With Us",
    links: [
      ["List Your Venue", "/global-santcum/list-your-venue"],
      ["Host A Retreat", "/global-santcum/host-a-retreat"],
      ["Press & Media", "/global-santcum/contact#press-media"],
      ["Contact Us", "/global-santcum/contact"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["The Wellness Edit", "/global-santcum/the-wellness-edit"],
      ["Sanctum Journal", "/global-santcum/sanctum-journal"],
      ["About Us", "/global-santcum/about"],
      ["Our Story", "/global-santcum/our-story"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Terms & Conditions", "/global-santcum/terms-and-conditions"],
      ["Privacy Policy", "/global-santcum/privacy-policy"],
      ["Cookies Policy", "/global-santcum/cookies-policy"],
      ["All Legal & Policies →", "/global-santcum/legal"],
    ],
  },
];

function articleMatches(
  article: Article,
  keyword: string,
  category: string,
): boolean {
  if (category && article.category !== category) return false;
  if (keyword) {
    const text = [
      article.categoryLabel,
      article.title,
      article.excerpt,
      article.date,
      article.read,
    ]
      .join(" ")
      .toLowerCase();
    if (!text.includes(keyword)) return false;
  }
  return true;
}

export default function TgsWellnessEditPage() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [keywordInput, setKeywordInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [sort, setSort] = useState("newest");

  const tabsRef = useRef<HTMLDivElement | null>(null);

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

  const scrollActiveTabIntoView = () => {
    const container = tabsRef.current;
    const active = container?.querySelector<HTMLElement>(".category-tab.active");
    if (!container || !active) return;
    if (container.scrollWidth <= container.clientWidth) return;
    const target =
      active.offsetLeft - container.clientWidth / 2 + active.offsetWidth / 2;
    container.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  };

  useEffect(() => {
    scrollActiveTabIntoView();
    const onResize = () => scrollActiveTabIntoView();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    scrollActiveTabIntoView();
  }, [category]);

  const executeSearch = () => {
    setKeyword(keywordInput.trim().toLowerCase());
  };

  const clearAllFilters = () => {
    setKeywordInput("");
    setKeyword("");
    setCategory("");
    setAuthor("");
    setDateRange("");
    setSort("newest");
  };

  const visibleCount = useMemo(() => {
    let count = 0;
    gridArticles.forEach((a) => {
      if (articleMatches(a, keyword, category)) count++;
    });
    editorialPairs.forEach((pair) => {
      pair.forEach((a) => {
        if (articleMatches(a, keyword, category)) count++;
      });
    });
    return count;
  }, [keyword, category]);

  const hasFilters = Boolean(keyword || category || author || dateRange);
  const resultsText = hasFilters
    ? `${visibleCount} article${visibleCount !== 1 ? "s" : ""} found`
    : "";

  const activeTab = category || "all";

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <a className="skip-to-content" href="#main-content">
        Skip to main content
      </a>

      <nav className="nav" id="nav" aria-label="Primary">
        <div className="nav-inner">
          <div className="nav-left" onClick={() => setDrawerOpen((o) => !o)}>
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
            <span className="nav-hamburger-label" aria-hidden="true">
              Menu
            </span>
          </div>
          <Link
            href="/global-santcum/web"
            className="nav-logo-area"
            aria-label="The Global Sanctum — home"
          >
            <span className="nav-logo" aria-hidden="true" />
            <span className="nav-brand-text">The Global Sanctum</span>
          </Link>
          <div className="nav-right" />
        </div>
      </nav>

      <TgsNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main id="main-content" role="main">
        <section className="hero">
          <div className="hero-inner">
            <p className="hero-overline">The Global Sanctum Presents</p>
            <h1 className="hero-title">The Wellness Edit</h1>
            <p className="hero-subtitle">
              Considered perspectives on the spaces, practices, and philosophies
              shaping how we heal, travel, and live with intention.
            </p>
            <div className="hero-rule" />
          </div>
        </section>

        <section className="featured">
          <div className="featured-inner">
            <div className="featured-card">
              <div className="featured-image">
                <span className="featured-image-placeholder">Featured Image</span>
              </div>
              <div className="featured-content">
                <span className="featured-category">Horizons</span>
                <h2 className="featured-title">
                  The Quiet Rise of Regenerative Tourism — And Why It Matters More
                  Than Sustainability
                </h2>
                <p className="featured-excerpt">
                  Beyond leaving no trace lies a more radical proposition: travel
                  that actively restores. From rewilding estates in Scotland to
                  coral regeneration programmes in the Maldives, a new generation of
                  venues is rewriting the relationship between tourism and the land
                  it inhabits.
                </p>
                <div className="featured-meta">
                  <span>February 2026</span>
                  <div className="featured-meta-divider" />
                  <span>12 min read</span>
                </div>
                <Link href={`/global-santcum/the-wellness-edit/${featuredArticle.slug}`} className="featured-read-more">
                  Read the Article
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="journal-cta">
          <div className="journal-cta-inner">
            <p className="journal-cta-label">The Sanctum Journal</p>
            <h3 className="journal-cta-title">
              Weekly wellness intelligence, delivered with care
            </h3>
            <p className="journal-cta-text">
              Curated insights, emerging trends, and quiet discoveries — direct to
              your inbox every Thursday.
            </p>
            <form
              className="journal-form"
              data-form="newsletter-edit-top"
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/global-santcum/sanctum-journal/signup");
              }}
            >
              <input
                type="text"
                name="website_url"
                className="hp-trap"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <input type="hidden" name="form_started_at" className="hp-timestamp" />
              <input
                type="email"
                className="journal-input"
                placeholder="Your email address"
                required
              />
              <button type="submit" className="journal-submit">
                Subscribe
              </button>
            </form>
          </div>
        </section>

        <section className="search-bar">
          <div className="search-bar-inner">
            <p className="search-bar-label">Search The Wellness Edit</p>

            <div className="search-row">
              <input
                type="text"
                className="search-keyword"
                id="searchKeyword"
                placeholder="Search by keyword, title, or topic..."
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") executeSearch();
                }}
              />

              <div className="search-divider" />

              <div className="search-select-wrapper">
                <select
                  className="search-select"
                  id="searchCategory"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setKeyword(keywordInput.trim().toLowerCase());
                  }}
                >
                  <option value="">Category</option>
                  <option value="horizons">Horizons</option>
                  <option value="practice">The Practice</option>
                  <option value="pathways">Pathways</option>
                  <option value="portraits">Portraits</option>
                  <option value="craft">The Craft</option>
                  <option value="destinations">Destinations</option>
                  <option value="philosophy">Philosophy</option>
                  <option value="field-notes">Field Notes</option>
                  <option value="living-well">Living Well</option>
                  <option value="inside-tgs">Inside The Sanctum</option>
                </select>
              </div>

              <div className="search-divider" />

              <div className="search-select-wrapper">
                <select
                  className="search-select"
                  id="searchAuthor"
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                    setKeyword(keywordInput.trim().toLowerCase());
                  }}
                >
                  <option value="">Author</option>
                  <option value="editorial">The Global Sanctum Editorial</option>
                  <option value="guest">Guest Contributors</option>
                </select>
              </div>

              <div className="search-divider" />

              <div className="search-select-wrapper">
                <select
                  className="search-select"
                  id="searchDate"
                  value={dateRange}
                  onChange={(e) => {
                    setDateRange(e.target.value);
                    setKeyword(keywordInput.trim().toLowerCase());
                  }}
                >
                  <option value="">Date</option>
                  <option value="7">Past 7 days</option>
                  <option value="30">Past 30 days</option>
                  <option value="90">Past 3 months</option>
                  <option value="180">Past 6 months</option>
                  <option value="365">Past year</option>
                </select>
              </div>

              <div className="search-divider" />

              <div className="search-select-wrapper">
                <select
                  className="search-select"
                  id="searchSort"
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setKeyword(keywordInput.trim().toLowerCase());
                  }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Read</option>
                </select>
              </div>

              <button className="search-btn" onClick={executeSearch} type="button">
                Search
              </button>
            </div>

            <div className="search-filters-row">
              <div className="search-active-filters" id="activeFilters">
                {keyword && (
                  <span className="search-filter-tag visible">
                    {`"${keyword}"`}{" "}
                    <span
                      className="search-filter-tag-close"
                      onClick={() => {
                        setKeywordInput("");
                        setKeyword("");
                      }}
                    >
                      ×
                    </span>
                  </span>
                )}
                {category && (
                  <span className="search-filter-tag visible">
                    {categoryNames[category] || category}{" "}
                    <span
                      className="search-filter-tag-close"
                      onClick={() => setCategory("")}
                    >
                      ×
                    </span>
                  </span>
                )}
                {author && (
                  <span className="search-filter-tag visible">
                    {authorLabels[author] || author}{" "}
                    <span
                      className="search-filter-tag-close"
                      onClick={() => setAuthor("")}
                    >
                      ×
                    </span>
                  </span>
                )}
                {dateRange && (
                  <span className="search-filter-tag visible">
                    {dateLabels[dateRange] || dateRange}{" "}
                    <span
                      className="search-filter-tag-close"
                      onClick={() => setDateRange("")}
                    >
                      ×
                    </span>
                  </span>
                )}
              </div>
              <button
                className={`search-clear-all${hasFilters ? " visible" : ""}`}
                id="clearAllBtn"
                onClick={clearAllFilters}
                type="button"
              >
                Clear All
              </button>
            </div>

            <p className="search-results-count" id="resultsCount">
              {resultsText}
            </p>
          </div>
        </section>

        <section className="categories">
          <div className="categories-inner">
            <p className="categories-label">Browse by Theme</p>
            <div className="categories-tabs" ref={tabsRef}>
              {categoryTabs.map(([value, label]) => (
                <button
                  key={value}
                  className={`category-tab${activeTab === value ? " active" : ""}`}
                  type="button"
                  onClick={() => {
                    setCategory(value === "all" ? "" : value);
                    setKeyword(keywordInput.trim().toLowerCase());
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="articles">
          <div className="articles-inner">
            <div className="articles-grid">
              {gridArticles.map((article) => (
                <Link
                  key={article.title}
                  href={`/global-santcum/the-wellness-edit/${article.slug}`}
                  className="article-card"
                  data-category={article.category}
                  style={
                    articleMatches(article, keyword, category)
                      ? undefined
                      : { display: "none" }
                  }
                >
                  <div className="article-image">
                    <span className="article-image-placeholder">Article Image</span>
                  </div>
                  <span className="article-category">{article.categoryLabel}</span>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.excerpt}</p>
                  <div className="article-meta">
                    <span>{article.date}</span>
                    <div className="article-meta-dot" />
                    <span>{article.read}</span>
                  </div>
                </Link>
              ))}
            </div>

            {editorialPairs.map((pair, pairIndex) => {
              const pairVisible = pair.some((a) =>
                articleMatches(a, keyword, category),
              );
              return (
                <div
                  key={pairIndex}
                  className="editorial-pair"
                  style={pairVisible ? undefined : { display: "none" }}
                >
                  {pair.map((article) => (
                    <Link
                      key={article.title}
                      href={`/global-santcum/the-wellness-edit/${article.slug}`}
                      className="editorial-card"
                      data-category={article.category}
                      style={
                        articleMatches(article, keyword, category)
                          ? undefined
                          : { display: "none" }
                      }
                    >
                      <div className="editorial-image">
                        <span className="article-image-placeholder">Image</span>
                      </div>
                      <div className="editorial-content">
                        <span className="editorial-category">
                          {article.categoryLabel}
                        </span>
                        <h3 className="editorial-title">{article.title}</h3>
                        <p className="editorial-excerpt">{article.excerpt}</p>
                        <div className="editorial-meta">
                          <span>{article.date}</span>
                          <div className="article-meta-dot" />
                          <span>{article.read}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              );
            })}

            <div className="load-more">
              <button className="load-more-btn" type="button">
                Load More Articles
              </button>
            </div>
          </div>
        </section>

        <section className="bottom-cta">
          <div className="bottom-cta-inner">
            <p className="bottom-cta-label">The Sanctum Journal</p>
            <h3 className="bottom-cta-title">
              Never miss an edition of The Wellness Edit
            </h3>
            <p className="bottom-cta-text">
              Join our community of wellness travellers, facilitators, and venue
              owners receiving thoughtful perspectives every week.
            </p>
            <form
              className="bottom-cta-form"
              data-form="newsletter-edit-bottom"
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/global-santcum/sanctum-journal/signup");
              }}
            >
              <input
                type="text"
                name="website_url"
                className="hp-trap"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <input type="hidden" name="form_started_at" className="hp-timestamp" />
              <input
                type="email"
                className="bottom-cta-input"
                placeholder="Your email address"
                required
              />
              <button type="submit" className="bottom-cta-submit">
                Subscribe
              </button>
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
            <p className="footer-brand-text">
              Curated wellness venues and transformational retreat spaces for
              retreat hosts, wellness guests, and seekers worldwide.
            </p>
            <p className="footer-brand-meta">
              Aurella Group Pty Ltd
              <br />
              ABN 70 649 742 423
            </p>
          </div>

          {footerColumns.map((column) => (
            <div className="footer-col" key={column.title}>
              <h4 className="footer-col-title">{column.title}</h4>
              <ul className="footer-links">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 The Global Sanctum. All rights reserved.
          </p>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/theglobalsanctum/"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61577706717526"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/company/the-global-sanctum/"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
