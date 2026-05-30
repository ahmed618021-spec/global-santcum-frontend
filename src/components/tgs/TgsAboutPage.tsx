"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import TgsNavDrawer from "@/components/tgs/TgsNavDrawer";

const styles = `

/* Skip to content — visible only on keyboard focus, off-screen otherwise */
.skip-to-content {
    position: absolute; top: -100px; left: 16px;
    background: var(--charcoal); color: var(--warm-white);
    padding: 12px 20px; z-index: 9999;
    font-family: var(--font-sans); font-size: 13px; font-weight: 500;
    letter-spacing: 0.05em; text-transform: uppercase;
    transition: top 0.2s;
}
.skip-to-content:focus { top: 16px; outline: 2px solid var(--gold-accent); }

/* ════════════════════════════════════════════════════════════
   CSS VARIABLES
   ════════════════════════════════════════════════════════════ */
:root {
    --font-serif: 'Cormorant Garamond', Georgia, serif;
    --font-sans: 'Montserrat', -apple-system, sans-serif;

    --warm-white: #FDFCF9;
    --warm-cream: #F7F5F1;
    --charcoal: #313131;
    --charcoal-80: rgba(49, 49, 49, 0.8);
    --charcoal-70: rgba(49, 49, 49, 0.7);
    --charcoal-50: rgba(49, 49, 49, 0.5);
    --charcoal-30: rgba(49, 49, 49, 0.3);
    --charcoal-15: rgba(49, 49, 49, 0.15);
    --charcoal-10: rgba(49, 49, 49, 0.1);
    --charcoal-05: rgba(49, 49, 49, 0.05);

    --gold-accent: #C4A265;
    --gold-dark: #7A644F;
}

/* ════════════════════════════════════════════════════════════
   RESET & BASE
   ════════════════════════════════════════════════════════════ */
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-serif);
    font-size: 18px;
    font-weight: 400;
    line-height: 1.7;
    color: #3a3a3a;
    background: var(--warm-white);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
}

img {
    max-width: 100%;
    height: auto;
    display: block;
}

a {
    color: inherit;
    text-decoration: none;
}

/* ════════════════════════════════════════════════════════════
   NAVIGATION
   ════════════════════════════════════════════════════════════ */
.nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0) 100%);
    backdrop-filter: blur(4px);
    transition: all 0.4s ease;
}

.nav--scrolled {
    background: rgba(253, 252, 249, 0.97);
    backdrop-filter: blur(12px);
    box-shadow: 0 1px 0 var(--charcoal-10);
}

.nav-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 60px;
    height: 80px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
}

.nav--scrolled .nav-inner {
    height: 70px;
}

/* ── Left: Hamburger ── */
.nav-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.nav-hamburger {
    display: flex;
    flex-direction: column;
    gap: 6px;
    cursor: pointer;
    padding: 10px;
    margin-left: -10px;
    transition: opacity 0.3s ease;
}
/* Button-element resets (hamburger upgraded from <div> to <button> for accessibility) */
.nav-hamburger { background: transparent; border: none; padding: 0; cursor: pointer; color: inherit; font: inherit; }
.nav-hamburger:focus-visible { outline: 2px solid var(--gold-accent, #C4A265); outline-offset: 4px; }


.nav-hamburger:hover {
    opacity: 0.6;
}

.nav-hamburger span {
    width: 26px;
    height: 1.5px;
    background: white;
    transition: all 0.3s ease;
    display: block;
}

.nav-hamburger span:nth-child(2) {
    width: 18px;
}

.nav--scrolled .nav-hamburger span {
    background: var(--charcoal);
}

.nav-hamburger.active span:first-child {
    transform: rotate(45deg) translate(5px, 5px);
}

.nav-hamburger.active span:nth-child(2) {
    opacity: 0;
}

.nav-hamburger.active span:last-child {
    transform: rotate(-45deg) translate(5px, -5px);
}

.nav-hamburger-label {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    margin-left: 14px;
    transition: color 0.4s ease;
}

.nav--scrolled .nav-hamburger-label {
    color: var(--charcoal);
}

/* ── Centre: Logo ── */
.nav-logo-area {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-shrink: 0;
}

.nav-logo-placeholder {
    width: 44px;
    height: 44px;
    border: 2px dashed var(--gold-accent);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--charcoal);
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
}

.nav-logo-placeholder span {
    font-family: var(--font-sans);
    font-size: 7px;
    font-weight: 500;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--gold-accent);
    text-align: center;
    line-height: 1.2;
    padding: 2px;
}

.nav-brand-text {
    font-family: var(--font-serif);
    font-size: 17px;
    font-weight: 400;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: white;
    white-space: nowrap;
    transition: color 0.4s ease;
}

.nav--scrolled .nav-brand-text {
    color: var(--charcoal);
}

/* ── Right: Book Now ── */
.nav-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.nav-book-now {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--charcoal);
    background: white;
    padding: 11px 24px;
    border-radius: 0;
    transition: all 0.4s ease;
    text-decoration: none;
    white-space: nowrap;
}

.nav--scrolled .nav-book-now {
    background: var(--charcoal);
    color: white;
}

.nav-book-now:hover {
    transform: translateY(-1px);
}

/* ── Slide-Out Menu ── */
.nav-overlay {
    position: fixed;
    inset: 0;
    background: rgba(49, 49, 49, 0.3);
    z-index: 998;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease, visibility 0.4s ease;
    backdrop-filter: blur(2px);
}

.nav-overlay.active {
    opacity: 1;
    visibility: visible;
}

.nav-drawer {
    position: fixed;
    top: 0;
    left: 0;
    width: 380px;
    max-width: 85vw;
    height: 100vh;
    background: var(--warm-white);
    z-index: 999;
    transform: translateX(-100%);
    transition: transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.nav-drawer.active {
    transform: translateX(0);
}

.nav-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 36px;
    border-bottom: 1px solid var(--charcoal-10);
}

.nav-drawer-close {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-family: var(--font-serif);
    font-size: 24px;
    font-weight: 300;
    color: var(--charcoal);
    transition: color 0.3s ease;
    background: none;
    border: none;
}

.nav-drawer-close:hover {
    color: var(--gold-dark);
}

.nav-drawer-label {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--charcoal);
}

.nav-drawer-links {
    padding: 40px 36px;
    display: flex;
    flex-direction: column;
    gap: 0;
    flex: 1;
}

.nav-drawer-links a {
    font-family: var(--font-serif);
    font-size: 26px;
    font-weight: 300;
    color: var(--charcoal);
    padding: 16px 0;
    border-bottom: 1px solid var(--charcoal-05);
    transition: color 0.3s ease, padding-left 0.3s ease;
    display: block;
    text-decoration: none;
}

.nav-drawer-links a:hover {
    color: var(--gold-dark);
    padding-left: 8px;
}

.nav-drawer-links a.active {
    color: var(--charcoal);
}

.nav-drawer-section-label {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--charcoal);
    margin-top: 32px;
    margin-bottom: 8px;
}

.nav-drawer-footer {
    padding: 28px 36px;
    border-top: 1px solid var(--charcoal-10);
}

.nav-drawer-footer p {
    font-family: var(--font-serif);
    font-size: 15px;
    font-weight: 400;
    color: var(--charcoal);
    line-height: 1.6;
}

.nav-drawer-footer a {
    color: var(--gold-dark);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s ease;
}

.nav-drawer-footer a:hover {
    border-color: var(--gold-dark);
}

/* ════════════════════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════════════════════ */
.hero {
    position: relative;
    height: 70vh;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.hero-bg {
    position: absolute;
    inset: 0;
    background: url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80') center/cover;
}

.hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to bottom,
        rgba(49, 49, 49, 0.3) 0%,
        rgba(49, 49, 49, 0.2) 50%,
        rgba(49, 49, 49, 0.4) 100%
    );
}

.hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    padding: 0 40px;
}

.hero-eyebrow {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 24px;
}

.hero-title {
    font-family: var(--font-serif);
    font-size: clamp(40px, 6vw, 64px);
    font-weight: 300;
    font-style: italic;
    line-height: 1.1;
    color: white;
}

/* ════════════════════════════════════════════════════════════
   INTRODUCTION
   ════════════════════════════════════════════════════════════ */
.intro {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 100px;
    padding: 140px 80px;
    max-width: 1400px;
    margin: 0 auto;
    align-items: center;
}

.intro-content {
    max-width: 520px;
}

.section-eyebrow {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--charcoal-50);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
}

.section-eyebrow::before {
    content: '';
    width: 40px;
    height: 1px;
    background: var(--charcoal-30);
}

.intro-title {
    font-family: var(--font-serif);
    font-size: 42px;
    font-weight: 400;
    line-height: 1.2;
    color: var(--charcoal);
    margin-bottom: 32px;
}

.intro-title em {
    font-style: italic;
}

.intro-text {
    font-size: 17px;
    line-height: 1.9;
    color: #3a3a3a;
    margin-bottom: 20px;
}

.intro-image {
    position: relative;
}

.intro-image img {
    width: 100%;
    height: 580px;
    object-fit: cover;
}

.intro-image-accent {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100%;
    height: 100%;
    border: 1px solid var(--charcoal-15);
    z-index: -1;
}

/* ════════════════════════════════════════════════════════════
   THE PROBLEM
   ════════════════════════════════════════════════════════════ */
.problem {
    background: var(--warm-cream);
    padding: 140px 80px;
}

.problem-inner {
    max-width: 1200px;
    margin: 0 auto;
}

.problem-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 80px;
}

.section-title {
    font-family: var(--font-serif);
    font-size: 40px;
    font-weight: 400;
    line-height: 1.2;
    color: var(--charcoal);
    margin-bottom: 24px;
}

.section-title em {
    font-style: italic;
}

.section-subtitle {
    font-family: var(--font-serif);
    font-size: 19px;
    font-weight: 400;
    line-height: 1.8;
    color: #3a3a3a;
}

.problem-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
}

.problem-image img {
    width: 100%;
    height: 500px;
    object-fit: cover;
}

.problem-cards {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.problem-card {
    padding-left: 28px;
    border-left: 2px solid var(--charcoal-15);
    transition: border-color 0.3s ease;
}

.problem-card:hover {
    border-left-color: var(--charcoal-50);
}

.problem-card-title {
    font-family: var(--font-serif);
    font-size: 24px;
    font-weight: 400;
    color: var(--charcoal);
    margin-bottom: 12px;
}

.problem-card-text {
    font-size: 15px;
    line-height: 1.8;
    color: #3a3a3a;
}

/* ════════════════════════════════════════════════════════════
   THE SOLUTION
   ════════════════════════════════════════════════════════════ */
.solution {
    padding: 140px 80px;
    background: var(--warm-white);
}

.solution-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 100px;
    max-width: 1200px;
    margin: 0 auto;
    align-items: center;
}

.solution-content {
    max-width: 500px;
}

.solution-title {
    font-family: var(--font-serif);
    font-size: 40px;
    font-weight: 400;
    line-height: 1.2;
    color: var(--charcoal);
    margin-bottom: 32px;
}

.solution-title em {
    font-style: italic;
}

.solution-text {
    font-size: 17px;
    line-height: 1.9;
    color: #3a3a3a;
    margin-bottom: 20px;
}

.solution-image img {
    width: 100%;
    height: 550px;
    object-fit: cover;
}

/* ════════════════════════════════════════════════════════════
   VISION & MISSION
   ════════════════════════════════════════════════════════════ */
.vision-mission {
    background: var(--warm-cream);
    padding: 120px 80px;
}

.vision-mission-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    max-width: 1100px;
    margin: 0 auto;
}

.vm-card {
    text-align: center;
    padding: 60px 50px;
    background: var(--warm-white);
}

.vm-title {
    font-family: var(--font-serif);
    font-size: 32px;
    font-weight: 400;
    color: var(--charcoal);
    margin-bottom: 28px;
}

.vm-text {
    font-size: 16px;
    line-height: 1.9;
    color: #3a3a3a;
}

/* ════════════════════════════════════════════════════════════
   QUOTE BANNER
   ════════════════════════════════════════════════════════════ */
.quote-banner {
    position: relative;
    padding: 100px 80px;
    background: url('https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1920&q=80') center/cover;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.quote-banner-overlay {
    position: absolute;
    inset: 0;
    background: rgba(49, 49, 49, 0.7);
}

.quote-banner-content {
    position: relative;
    z-index: 10;
    text-align: center;
    max-width: 900px;
}

.quote-banner-text {
    font-family: var(--font-serif);
    font-size: clamp(24px, 3vw, 32px);
    font-weight: 300;
    font-style: italic;
    line-height: 1.6;
    color: white;
}

.quote-banner-author {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 28px;
}

/* ════════════════════════════════════════════════════════════
   FOUNDER NOTE
   ════════════════════════════════════════════════════════════ */
.founder {
    padding: 140px 80px;
    background: var(--warm-white);
}

.founder-inner {
    max-width: 1100px;
    margin: 0 auto;
}

.founder-header {
    text-align: center;
    margin-bottom: 80px;
}

.founder-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
}

.founder-content {
    max-width: 480px;
}

.founder-text {
    font-size: 17px;
    line-height: 1.9;
    color: #3a3a3a;
    margin-bottom: 24px;
}

.founder-signature {
    font-family: var(--font-serif);
    font-size: 20px;
    font-style: italic;
    color: var(--charcoal);
    margin-top: 40px;
}

.founder-image-wrapper {
    display: flex;
    justify-content: center;
}

.founder-image {
    position: relative;
    width: 400px;
    height: 400px;
}

.founder-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.founder-image-ring {
    position: absolute;
    inset: -15px;
    border: 1px solid var(--charcoal-15);
    border-radius: 50%;
}

/* ════════════════════════════════════════════════════════════
   VALUES
   ════════════════════════════════════════════════════════════ */
.values {
    background: var(--warm-cream);
    padding: 140px 80px;
}

.values-inner {
    max-width: 1200px;
    margin: 0 auto;
}

.values-header {
    text-align: center;
    max-width: 600px;
    margin: 0 auto 80px;
}

.values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
}

.value-card {
    background: var(--warm-white);
    padding: 48px 40px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(49, 49, 49, 0.08);
}

.value-icon {
    font-size: 28px;
    margin-bottom: 24px;
}

.value-title {
    font-family: var(--font-serif);
    font-size: 24px;
    font-weight: 400;
    color: var(--charcoal);
    margin-bottom: 16px;
}

.value-text {
    font-size: 15px;
    line-height: 1.8;
    color: #3a3a3a;
}

/* ════════════════════════════════════════════════════════════
   NEWSLETTER
   ════════════════════════════════════════════════════════════ */
.newsletter {
    padding: 120px 80px;
    background: var(--warm-white);
    text-align: center;
}

.newsletter-inner {
    max-width: 650px;
    margin: 0 auto;
}

.newsletter-title {
    font-family: var(--font-serif);
    font-size: 36px;
    font-weight: 400;
    font-style: italic;
    color: var(--charcoal);
    margin-bottom: 20px;
}

.newsletter-text {
    font-size: 16px;
    line-height: 1.8;
    color: #3a3a3a;
    margin-bottom: 40px;
}

.newsletter-form {
    display: flex;
    gap: 12px;
    max-width: 480px;
    margin: 0 auto;
}

.newsletter-input {
    flex: 1;
    padding: 18px 24px;
    border: 1px solid var(--charcoal-15);
    background: white;
    font-family: var(--font-serif);
    font-size: 15px;
    color: var(--charcoal);
    outline: none;
    transition: border-color 0.3s ease;
}

.newsletter-input::placeholder {
    color: var(--charcoal-30);
}

.newsletter-input:focus {
    border-color: var(--charcoal-50);
}

.newsletter-btn {
    padding: 18px 32px;
    background: var(--charcoal);
    color: white;
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease;
}

.newsletter-btn:hover {
    background: var(--charcoal-80);
}

/* ════════════════════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════════════════════ */
.footer {
    background: var(--charcoal);
    color: rgba(255, 255, 255, 0.7);
    padding: 80px 48px 40px;
}

.footer-grid {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.5fr repeat(4, 1fr);
    gap: 48px;
    padding-bottom: 56px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-brand {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.footer-logo-placeholder {
    width: 72px;
    height: 72px;
    border: 2px dashed var(--gold-accent);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(196, 162, 101, 0.08);
    flex-shrink: 0;
}

.footer-logo-placeholder span {
    font-family: var(--font-sans);
    font-size: 8px;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--gold-accent);
    text-align: center;
    line-height: 1.3;
    padding: 4px;
}

.footer-brand-name {
    font-family: var(--font-serif);
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.9);
}

.footer-brand-text {
    font-family: var(--font-serif);
    font-size: 15px;
    font-weight: 400;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.5);
}

.footer-brand-meta {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 400;
    line-height: 1.7;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.35);
}

.footer-social {
    display: flex;
    gap: 24px;
}

.footer-social a {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    transition: color 0.3s ease;
}

.footer-social a:hover {
    color: var(--gold-accent);
}

.footer-col-title {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 24px;
}

.footer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.footer-links a {
    font-family: var(--font-serif);
    font-size: 15px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
    transition: color 0.3s ease;
}

.footer-links a:hover {
    color: rgba(255, 255, 255, 0.95);
}

.footer-bottom {
    max-width: 1400px;
    margin: 0 auto;
    padding-top: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-copyright {
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.3);
}

/* ════════════════════════════════════════════════════════════
   RESPONSIVE
   ════════════════════════════════════════════════════════════ */
@media (max-width: 1280px) {
    .values-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 1100px) {
    .footer-grid { grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
}

@media (max-width: 1024px) {
    .nav-inner { padding: 0 40px; }
    .nav-hamburger-label { display: none; }

    .intro {
        grid-template-columns: 1fr;
        padding: 100px 40px;
        gap: 60px;
    }

    .intro-image { order: -1; }

    .problem { padding: 100px 40px; }
    .problem-grid {
        grid-template-columns: 1fr;
        gap: 60px;
    }

    .solution { padding: 100px 40px; }
    .solution-inner {
        grid-template-columns: 1fr;
        gap: 60px;
    }

    .vision-mission { padding: 100px 40px; }
    .vision-mission-grid {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .founder { padding: 100px 40px; }
    .founder-grid {
        grid-template-columns: 1fr;
        gap: 60px;
    }
    .founder-image-wrapper { order: -1; }
    .founder-content { max-width: 100%; }

    .values { padding: 100px 40px; }
    .values-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .hero { height: 60vh; min-height: 400px; }

    .section-title { font-size: 32px; }
    .intro-title { font-size: 32px; }
    .solution-title { font-size: 32px; }
    .vm-title { font-size: 26px; }

    .founder-image-wrapper { min-width: 0; }
    .founder-image { width: min(400px, 100%); height: auto; aspect-ratio: 1 / 1; }

    .newsletter-form {
        flex-direction: column;
    }

    .footer { padding: 60px 24px 24px; }
    .footer-grid {
        grid-template-columns: 1fr;
        gap: 32px;
    }

    .nav-inner {
        padding: 0 24px;
        height: 68px;
    }

    .nav-brand-text {
        font-size: 14px;
        letter-spacing: 0.1em;
    }

    .nav-logo-placeholder {
        width: 36px;
        height: 36px;
    }

    .nav-book-now {
        font-size: 9px;
        padding: 9px 16px;
        letter-spacing: 0.12em;
    }

    .nav-drawer {
        width: 100%;
        max-width: 100vw;
    }
}
`;

export default function TgsAboutPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
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
    const form = formRef.current;
    if (!form) return;
    const idField = form.querySelector<HTMLInputElement>(
      'input[name="submissionId"]'
    );
    if (idField && !idField.value) {
      idField.value =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
              const r = (Math.random() * 16) | 0;
              const v = c === "x" ? r : (r & 0x3) | 0x8;
              return v.toString(16);
            });
    }
  }, []);

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <a className="skip-to-content" href="#main-content">
        Skip to main content
      </a>

      <nav className={`nav${scrolled ? " nav--scrolled" : ""}`} id="nav">
        <div className="nav-inner">
          <div className="nav-left">
            <button
              className={`nav-hamburger${drawerOpen ? " active" : ""}`}
              id="navHamburger"
              type="button"
              aria-label={
                drawerOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={drawerOpen ? "true" : "false"}
              aria-controls="navDrawer"
              onClick={() => setDrawerOpen((open) => !open)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <span className="nav-hamburger-label">Menu</span>
          </div>

          <Link href="/global-santcum/web" className="nav-logo-area">
            <div className="nav-logo-placeholder">
              <span>Logo Goes Here</span>
            </div>
            <div className="nav-brand-text">The Global Sanctum</div>
          </Link>

          <div className="nav-right">
            <Link href="/global-santcum/book" className="nav-book-now">
              Book Now
            </Link>
          </div>
        </div>
      </nav>

      <TgsNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main id="main-content" role="main">
        <section className="hero">
          <div className="hero-bg"></div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <p className="hero-eyebrow">Our Story</p>
            <h1 className="hero-title">About The Global Sanctum</h1>
          </div>
        </section>

        <section className="intro">
          <div className="intro-content">
            <p className="section-eyebrow">Wellness Redefined</p>
            <h2 className="intro-title">
              The Premier Platform <em>Connecting Transformation</em>
            </h2>
            <p className="intro-text">
              The Global Sanctum is the premier platform connecting wellness
              guests and retreat hosts with global wellness venues and retreat
              spaces.
            </p>
            <p className="intro-text">
              Where finding your sanctuary is effortless. Where booking your
              retreat is seamless. Where the full spectrum of wellness becomes
              discoverable.
            </p>
          </div>
          <div className="intro-image">
            <img
              src="/tgs-images/Old%20Man%20With%20Sound%20Bowls%20Nordic%20Filter.png"
              alt="Sound bowl meditation"
            />
            <div className="intro-image-accent"></div>
          </div>
        </section>

        <section className="problem">
          <div className="problem-inner">
            <div className="problem-header">
              <h2 className="section-title">
                <em>The Problem</em> We Saw
              </h2>
              <p className="section-subtitle">
                The wellness industry had energy, intention, and growth — but
                was missing the platform to support it.
              </p>
            </div>

            <div className="problem-grid">
              <div className="problem-image">
                <img
                  src="/tgs-images/Group%20Of%20Hands%20Together%20Nordic%20Filter.png"
                  alt="Hands gathered together"
                />
              </div>

              <div className="problem-cards">
                <div className="problem-card">
                  <h3 className="problem-card-title">For Wellness Guests</h3>
                  <p className="problem-card-text">
                    The full spectrum of wellness — traditional healing to
                    modern modalities, sacred practices to therapeutic
                    experiences — remained scattered. No unified place to find
                    what exists globally.
                  </p>
                </div>

                <div className="problem-card">
                  <h3 className="problem-card-title">For Retreat Hosts</h3>
                  <p className="problem-card-text">
                    Months of searching. Navigating fragmented processes,
                    managing bookings across multiple platforms. Time spent
                    searching instead of designing transformational experiences.
                  </p>
                </div>

                <div className="problem-card">
                  <h3 className="problem-card-title">For Venue Owners</h3>
                  <p className="problem-card-text">
                    Manually managing leads that went nowhere. Revenue leaking
                    through lost time and disjointed systems. Hours spent
                    answering enquiries that never converted. Administrative work
                    consuming what should have been profit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="solution">
          <div className="solution-inner">
            <div className="solution-content">
              <p className="section-eyebrow">The Solution</p>
              <h2 className="solution-title">
                <em>One Platform</em> Connecting Everyone Who Creates
                Transformation
              </h2>
              <p className="solution-text">
                The Global Sanctum exists to solve this. We built a platform
                where the full spectrum of wellness becomes discoverable.
              </p>
              <p className="solution-text">
                Traditional healing practices to modern modalities. Coastal
                sanctuaries to mountain temples, urban bathhouses to forest
                hideaways. Curated for depth, not volume. Transparent
                information, trusted bookings, seamless coordination.
              </p>
              <p className="solution-text">
                For retreat hosts, months of searching reduced to precision. For
                wellness guests, access to experiences that remained hidden —
                authenticated, curated, gathered in one place. For venue owners,
                technology that liberates instead of burdens.
              </p>
            </div>
            <div className="solution-image">
              <img
                src="/tgs-images/Woman%20Eyes%20Closed%20Meditate%20Nordic%20Filter.png"
                alt="Woman meditating"
              />
            </div>
          </div>
        </section>

        <section className="vision-mission">
          <div className="vision-mission-grid">
            <div className="vm-card">
              <h3 className="vm-title">Our Vision</h3>
              <p className="vm-text">
                A platform where wellness venues and experiences become
                discoverable. Traditional practices alongside modern modalities
                — Japanese onsens to Ayurvedic centers, forest temples to
                coastal facilities. Simple search, seamless booking.
              </p>
              <p className="vm-text" style={{ marginTop: "20px" }}>
                Venue owners with technology handling operations — bookings,
                calendars, payments — so they can focus on creating sanctuary.
                Hosts finding what their retreats need with clarity and
                confidence. Wellness guests accessing the full spectrum of
                wellness, gathered in one place.
              </p>
            </div>

            <div className="vm-card">
              <h3 className="vm-title">Our Mission</h3>
              <p className="vm-text">
                We exist to make wellness accessible to everyone seeking
                transformation — and to support everyone creating it. We gather
                wellness venues and experiences globally.
              </p>
              <p className="vm-text" style={{ marginTop: "20px" }}>
                Traditional practices honored for centuries alongside modern
                modalities advancing today. Retreat centers, healing
                sanctuaries, therapeutic spaces — brought into one place where
                they can be found. We serve three communities equally, building
                infrastructure this industry needs to flourish.
              </p>
            </div>
          </div>
        </section>

        <section className="quote-banner">
          <div className="quote-banner-overlay"></div>
          <div className="quote-banner-content">
            <p className="quote-banner-text">
              &quot;Just the first chapter. The story we&apos;re writing is much
              bigger than this.&quot;
            </p>
            <p className="quote-banner-author">— The Global Sanctum</p>
          </div>
        </section>

        <section className="founder">
          <div className="founder-inner">
            <div className="founder-header">
              <p
                className="section-eyebrow"
                style={{ justifyContent: "center" }}
              >
                The Founder
              </p>
              <h2 className="section-title">A Note From Kate</h2>
            </div>

            <div className="founder-grid">
              <div className="founder-content">
                <p className="founder-text">
                  Everything I&apos;ve experienced has converged in The Global
                  Sanctum.
                </p>
                <p className="founder-text">
                  Professionally, I built expertise in real estate, property,
                  and mortgage broking — understanding how markets work, how
                  spaces create value, how infrastructure supports growth.
                </p>
                <p className="founder-text">
                  Personally, I walked my own path through life coaching,
                  spiritual practice, and personal development. That journey
                  taught me the power of transformation — not just from the
                  spaces we inhabit, but from the expert facilitators, hosts,
                  and coaches who guide the work. Both matter profoundly.
                </p>
                <p className="founder-text">
                  The Global Sanctum is where these paths align. My professional
                  background meeting my values and personal journey. Real estate
                  knowledge applied to an industry I genuinely care about.
                  Infrastructure that serves spaces designed for transformation
                  and the people leading that transformation.
                </p>
                <p className="founder-text">
                  This is where my experience, my values, and what this industry
                  needs come together.
                </p>
                <p className="founder-text">We&apos;re just beginning.</p>
                <p className="founder-signature">— Kate</p>
              </div>

              <div className="founder-image-wrapper">
                <div className="founder-image">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                    alt="Kate - Founder"
                  />
                  <div className="founder-image-ring"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="values">
          <div className="values-inner">
            <div className="values-header">
              <p
                className="section-eyebrow"
                style={{ justifyContent: "center" }}
              >
                What Guides Us
              </p>
              <h2 className="section-title">Our Values</h2>
            </div>

            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">◇</div>
                <h3 className="value-title">Curated With Intention</h3>
                <p className="value-text">
                  Every venue listed with The Global Sanctum is curated for its
                  transformational qualities — spaces designed with intention,
                  facilities created for genuine wellness work. We curate for
                  intentionality. You know what you&apos;re getting every time.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">◈</div>
                <h3 className="value-title">Built To Serve</h3>
                <p className="value-text">
                  Technology should handle what technology does best — bookings,
                  calendars, payments, coordination — freeing everyone to focus
                  on what matters. Simple where it should be. Precise where
                  precision matters.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">◎</div>
                <h3 className="value-title">Transparency First</h3>
                <p className="value-text">
                  Transparency shapes everything we do. Honest curation,
                  accurate information, open communication about what each venue
                  genuinely offers. No false promises. No inflated claims. Just
                  integrity.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">⬡</div>
                <h3 className="value-title">Connection &amp; Community</h3>
                <p className="value-text">
                  Transformation thrives through connection. We unite venue
                  owners, retreat hosts, and wellness guests in an ecosystem
                  serving everyone. Genuine community. Shared success. Better
                  together.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">◉</div>
                <h3 className="value-title">Global By Design</h3>
                <p className="value-text">
                  Wellness and retreat venues exist across every continent. We
                  curate them — from Scandinavia to South America, Southeast Asia
                  to the Mediterranean, the Pacific to the Middle East. Access to
                  authentic wellness globally. One platform.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">★</div>
                <h3 className="value-title">Elevating The Industry</h3>
                <p className="value-text">
                  Retreat venues, wellness facilities, and the transformational
                  work happening within them deserve world-class infrastructure.
                  Not adapted systems, but purpose-built technology. Excellence
                  as baseline. Quality as expectation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="newsletter">
          <div className="newsletter-inner">
            <p className="section-eyebrow" style={{ justifyContent: "center" }}>
              Stay Connected
            </p>
            <h2 className="newsletter-title">Join The Community — It&apos;s Free</h2>
            <p className="newsletter-text">
              Where intention meets discovery weekly with The Sanctum Journal.
              Featured venues, practitioner spotlights, product discoveries,
              trends, and our global calendar of retreats and wellness events.
              Curated for the Sanctum community, delivered weekly.
            </p>
            <form
              ref={formRef}
              className="newsletter-form"
              id="newsletter-form-about"
              data-form-type="newsletter"
              noValidate
            >
              <input type="hidden" name="submissionId" defaultValue="" />
              <input type="hidden" name="source" defaultValue="about_footer" />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                <label>
                  Website (leave blank)
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>
              <input
                type="email"
                className="newsletter-input"
                id="newsletter-email-about"
                name="email"
                placeholder="Your email address"
                required
                aria-label="Email address for newsletter signup"
                autoComplete="email"
              />
              <div
                className="cf-turnstile"
                data-sitekey="REPLACE_WITH_PRODUCTION_SITEKEY"
                data-size="invisible"
              ></div>
              <button type="submit" className="newsletter-btn">
                Join Now
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

          <div className="footer-col">
            <h4 className="footer-col-title">Discover</h4>
            <ul className="footer-links">
              <li>
                <Link href="/global-santcum/retreat-venues">
                  Retreat Venues
                </Link>
              </li>
              <li>
                <Link href="/global-santcum/wellness-venues">
                  Wellness Venues
                </Link>
              </li>
              <li>
                <Link href="/global-santcum/wellness-experiences">
                  Wellness Experiences
                </Link>
              </li>
              <li>
                <Link href="/global-santcum/how-it-works">How It Works</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Partner With Us</h4>
            <ul className="footer-links">
              <li>
                <Link href="/global-santcum/list-your-venue">
                  List Your Venue
                </Link>
              </li>
              <li>
                <Link href="/global-santcum/host-a-retreat">Host A Retreat</Link>
              </li>
              <li>
                <Link href="/global-santcum/contact#press-media">
                  Press &amp; Media
                </Link>
              </li>
              <li>
                <Link href="/global-santcum/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Resources</h4>
            <ul className="footer-links">
              <li>
                <Link href="/global-santcum/the-wellness-edit">
                  The Wellness Edit
                </Link>
              </li>
              <li>
                <Link href="/global-santcum/sanctum-journal">
                  Sanctum Journal
                </Link>
              </li>
              <li>
                <Link href="/global-santcum/about">About Us</Link>
              </li>
              <li>
                <Link href="/global-santcum/our-story">Our Story</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Legal</h4>
            <ul className="footer-links">
              <li>
                <Link href="/global-santcum/terms-and-conditions">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/global-santcum/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/global-santcum/cookies-policy">Cookies Policy</Link>
              </li>
              <li>
                <Link href="/global-santcum/legal">
                  All Legal &amp; Policies →
                </Link>
              </li>
            </ul>
          </div>
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
