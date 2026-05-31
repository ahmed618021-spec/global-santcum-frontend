"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

        :root {
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
            --gold-dark: #7A644F;
            --gold-accent: #C4A265;
            --font-serif: 'Cormorant Garamond', Georgia, serif;
            --font-sans: 'Montserrat', sans-serif;
        }

        *, *::before, *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html { scroll-behavior: smooth; }

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

        img { max-width: 100%; height: auto; display: block; }
        a { color: inherit; text-decoration: none; }

        .nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: var(--warm-white);
            border-bottom: 1px solid var(--charcoal-10);
            transition: box-shadow 0.3s ease;
        }

        .nav.scrolled {
            box-shadow: 0 2px 20px rgba(49, 49, 49, 0.06);
        }

        .nav-inner {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 48px;
            height: 80px;
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
        }

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
        .nav-hamburger { background: transparent; border: none; padding: 0; cursor: pointer; color: inherit; font: inherit; }
        .nav-hamburger:focus-visible { outline: 2px solid var(--gold-accent, #C4A265); outline-offset: 4px; }


        .nav-hamburger:hover {
            opacity: 0.6;
        }

        .nav-hamburger span {
            width: 26px;
            height: 1.5px;
            background: var(--charcoal);
            transition: all 0.3s ease;
            display: block;
        }

        .nav-hamburger span:nth-child(2) {
            width: 18px;
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
            color: var(--charcoal);
            margin-left: 14px;
        }

        .nav-logo-area {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            flex-shrink: 0;
        }

        .nav-logo { width: 40px; height: 40px; border: 1px solid var(--gold-accent); transform: rotate(45deg); position: relative; flex-shrink: 0; }
.nav-logo::after { content: ""; position: absolute; inset: 4px; border: 1px solid var(--gold-accent); }
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
            color: var(--charcoal);
            white-space: nowrap;
        }

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
            color: var(--warm-white);
            background: var(--charcoal);
            padding: 11px 24px;
            border-radius: 0;
            transition: background 0.3s ease, transform 0.2s ease;
            text-decoration: none;
            white-space: nowrap;
        }

        .nav-book-now:hover {
            background: var(--gold-dark);
            transform: translateY(-1px);
        }

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
            color: var(--charcoal);
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
            color: #3a3a3a;
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

        .page-hero {
            padding: 160px 48px 80px;
            text-align: center;
            background: var(--warm-white);
        }

        .page-hero-label {
            font-family: var(--font-sans);
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: var(--charcoal);
            margin-bottom: 20px;
        }

        .page-hero h1 {
            font-family: var(--font-serif);
            font-size: clamp(38px, 5vw, 56px);
            font-weight: 300;
            line-height: 1.15;
            color: var(--charcoal);
            margin-bottom: 20px;
            letter-spacing: 0.02em;
        }

        .page-hero p {
            font-family: var(--font-serif);
            font-size: 19px;
            font-weight: 400;
            line-height: 1.7;
            color: #3a3a3a;
            max-width: 600px;
            margin: 0 auto;
        }

        .contact-section {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 48px 100px;
            display: grid;
            grid-template-columns: 1fr 1.3fr;
            gap: 80px;
            align-items: start;
        }

        .contact-info {
            padding-top: 10px;
        }

        .contact-info-block {
            margin-bottom: 48px;
        }

        .contact-info-block:last-child {
            margin-bottom: 0;
        }

        .contact-info-label {
            font-family: var(--font-sans);
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            color: var(--charcoal);
            margin-bottom: 12px;
        }

        .contact-info-title {
            font-family: var(--font-serif);
            font-size: 24px;
            font-weight: 400;
            color: var(--charcoal);
            margin-bottom: 12px;
            line-height: 1.3;
        }

        .contact-info-text {
            font-family: var(--font-serif);
            font-size: 17px;
            font-weight: 400;
            line-height: 1.75;
            color: #3a3a3a;
        }

        .contact-info-text a {
            color: var(--gold-dark);
            border-bottom: 1px solid transparent;
            transition: border-color 0.3s ease;
        }

        .contact-info-text a:hover {
            border-color: var(--gold-dark);
        }

        .contact-divider {
            width: 48px;
            height: 1px;
            background: var(--charcoal-15);
            margin: 40px 0;
        }

        .response-note {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 20px 24px;
            background: var(--warm-cream);
            border-left: 2px solid var(--gold-accent);
            margin-top: 36px;
        }

        .response-note-icon {
            font-size: 16px;
            flex-shrink: 0;
            margin-top: 2px;
        }

        .response-note p {
            font-family: var(--font-sans);
            font-size: 12px;
            font-weight: 400;
            line-height: 1.65;
            color: var(--charcoal);
        }

        .contact-form-wrapper {
            background: var(--warm-white);
            border: 1px solid var(--charcoal-10);
            padding: 56px 48px;
        }

        .form-title {
            font-family: var(--font-serif);
            font-size: 28px;
            font-weight: 400;
            color: var(--charcoal);
            margin-bottom: 8px;
        }

        .form-subtitle {
            font-family: var(--font-serif);
            font-size: 16px;
            font-weight: 400;
            color: #3a3a3a;
            margin-bottom: 40px;
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 24px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            margin-bottom: 24px;
        }

        .form-row .form-group {
            margin-bottom: 0;
        }

        .form-label {
            font-family: var(--font-sans);
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--charcoal);
            margin-bottom: 10px;
        }

        .form-label .required {
            color: var(--charcoal);
            margin-left: 2px;
        }

        .form-input,
        .form-select,
        .form-textarea {
            font-family: var(--font-serif);
            font-size: 16px;
            font-weight: 400;
            color: var(--charcoal);
            background: var(--warm-cream);
            border: 1px solid var(--charcoal-10);
            padding: 14px 18px;
            outline: none;
            transition: border-color 0.3s ease, background 0.3s ease;
            width: 100%;
            -webkit-appearance: none;
            appearance: none;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
            color: var(--charcoal);
            opacity: 0.35;
            font-style: italic;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
            border-color: var(--gold-accent);
            background: var(--warm-white);
        }

        .form-select {
            cursor: pointer;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23313131' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 18px center;
            padding-right: 44px;
        }

        .form-textarea {
            min-height: 140px;
            resize: vertical;
            line-height: 1.6;
        }

        .form-submit {
            font-family: var(--font-sans);
            font-size: 11.5px;
            font-weight: 500;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: var(--warm-white);
            background: var(--charcoal);
            border: none;
            padding: 18px 48px;
            cursor: pointer;
            transition: background 0.3s ease, transform 0.2s ease;
            width: 100%;
            margin-top: 12px;
        }

        .form-submit:hover {
            background: var(--gold-dark);
            transform: translateY(-1px);
        }

        .enquiry-types {
            background: var(--warm-cream);
            padding: 100px 48px;
        }

        .enquiry-types-inner {
            max-width: 1200px;
            margin: 0 auto;
        }

        .enquiry-types-header {
            text-align: center;
            margin-bottom: 64px;
        }

        .enquiry-types-label {
            font-family: var(--font-sans);
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: var(--charcoal);
            margin-bottom: 16px;
        }

        .enquiry-types-title {
            font-family: var(--font-serif);
            font-size: 36px;
            font-weight: 300;
            color: var(--charcoal);
            letter-spacing: 0.02em;
        }

        .enquiry-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
        }

        .enquiry-card {
            background: var(--warm-white);
            border: 1px solid var(--charcoal-10);
            padding: 40px 32px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .enquiry-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(49, 49, 49, 0.06);
        }

        .enquiry-card-icon {
            font-size: 28px;
            margin-bottom: 20px;
        }

        .enquiry-card-title {
            font-family: var(--font-serif);
            font-size: 22px;
            font-weight: 400;
            color: var(--charcoal);
            margin-bottom: 12px;
        }

        .enquiry-card-text {
            font-family: var(--font-serif);
            font-size: 16px;
            font-weight: 400;
            line-height: 1.7;
            color: #3a3a3a;
            margin-bottom: 20px;
        }

        .enquiry-card-link {
            font-family: var(--font-sans);
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--gold-dark);
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: gap 0.3s ease;
        }

        .enquiry-card-link:hover {
            gap: 12px;
        }

        .enquiry-card-link svg {
            width: 14px;
            height: 14px;
            stroke: currentColor;
            fill: none;
            stroke-width: 2;
        }

        .faq-section {
            padding: 100px 48px;
            max-width: 800px;
            margin: 0 auto;
        }

        .faq-header {
            text-align: center;
            margin-bottom: 56px;
        }

        .faq-label {
            font-family: var(--font-sans);
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: var(--charcoal);
            margin-bottom: 16px;
        }

        .faq-title {
            font-family: var(--font-serif);
            font-size: 36px;
            font-weight: 300;
            color: var(--charcoal);
        }

        .faq-item {
            border-bottom: 1px solid var(--charcoal-10);
            padding: 28px 0;
        }

        .faq-question {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            gap: 24px;
        }

        .faq-question h3 {
            font-family: var(--font-serif);
            font-size: 20px;
            font-weight: 400;
            color: var(--charcoal);
            line-height: 1.4;
        }

        .faq-toggle {
            width: 32px;
            height: 32px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: var(--font-serif);
            font-size: 22px;
            font-weight: 300;
            color: var(--charcoal);
            transition: transform 0.3s ease;
        }

        .faq-item.active .faq-toggle {
            transform: rotate(45deg);
        }

        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease, padding 0.3s ease;
        }

        .faq-item.active .faq-answer {
            max-height: 300px;
            padding-top: 16px;
        }

        .faq-answer p {
            font-family: var(--font-serif);
            font-size: 17px;
            font-weight: 400;
            line-height: 1.75;
            color: #3a3a3a;
        }

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

        .logo-note {
            font-family: var(--font-sans);
            font-size: 9px;
            font-weight: 400;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--charcoal);
            opacity: 0.7;
            margin-top: 4px;
        }

        .footer-brand .logo-note {
            color: rgba(196, 162, 101, 0.6);
        }

        @media (max-width: 1024px) {
            .contact-section {
                grid-template-columns: 1fr;
                gap: 60px;
            }

            .enquiry-grid {
                grid-template-columns: 1fr 1fr;
            }

            .footer-grid {
                grid-template-columns: 1fr 1fr 1fr;
                gap: 40px;
            }
        }

        @media (max-width: 768px) {
            .nav-inner {
                padding: 0 24px;
                height: 68px;
            }

            .nav-hamburger-label {
                display: none;
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

            .page-hero {
                padding: 130px 24px 60px;
            }

            .contact-section {
                padding: 0 24px 80px;
            }

            .contact-form-wrapper {
                padding: 40px 28px;
            }

            .form-row {
                grid-template-columns: 1fr;
                gap: 24px;
            }

            .enquiry-types {
                padding: 80px 24px;
            }

            .enquiry-grid {
                grid-template-columns: 1fr;
            }

            .faq-section {
                padding: 80px 24px;
            }

            .footer {
                padding: 60px 24px 32px;
            }

            .footer-grid {
                grid-template-columns: 1fr;
                gap: 36px;
            }

            .footer-bottom {
                flex-direction: column;
                gap: 16px;
                text-align: center;
            }
        }

        @keyframes fadeUp {
            from {
                opacity: 0;
                transform: translateY(24px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-in {
            animation: fadeUp 0.7s ease forwards;
        }

        .animate-in:nth-child(2) { animation-delay: 0.1s; }
        .animate-in:nth-child(3) { animation-delay: 0.2s; }
`;

const faqItems = [
  {
    question: "How does The Global Sanctum work?",
    answer: (
      <p>
        The Global Sanctum is a curated marketplace connecting wellness guests
        and retreat hosts with exceptional venues worldwide. Browse our
        collection, compare facilities and pricing, and book seamlessly — our
        team manages the entire process via the platform, from enquiry to
        confirmation.
      </p>
    ),
  },
  {
    question: "What types of venues are listed?",
    answer: (
      <p>
        We feature two categories: retreat venues for exclusive-use multi-day
        programs including yoga shalas, meditation centres, and nature lodges;
        and wellness venues encompassing everything from day-use therapeutic
        facilities such as onsens, thermal springs, and healing centres through
        to multi-day wellness hotels and residential wellness properties.
      </p>
    ),
  },
  {
    question: "How do I list my venue?",
    answer: (
      <p>
        Visit our List Your Venue page to begin the onboarding process. Our team
        will guide you through every step — from creating your listing to
        connecting with your first retreat hosts and wellness guests.
      </p>
    ),
  },
  {
    question: "What are the fees for venue owners?",
    answer: (
      <p>
        Venue owners select a monthly subscription tier, each with its own
        commission structure — designed to be transparent and significantly
        below industry averages. For a full breakdown of our tiers and pricing,
        visit our{" "}
        <Link
          href="/global-santcum/list-your-venue"
          style={{
            color: "var(--gold-dark)",
            borderBottom: "1px solid transparent",
            transition: "border-color 0.3s ease",
          }}
        >
          List Your Venue
        </Link>{" "}
        page.
      </p>
    ),
  },
  {
    question: "Can I contact a venue directly?",
    answer: (
      <p>
        The Global Sanctum provides a full end-to-end concierge service,
        managing everything from your initial enquiry through to booking
        confirmation and beyond. Should a retreat host wish to communicate
        directly with a venue, this can certainly be arranged — however, all
        bookings are processed directly through the platform to ensure a
        seamless, transparent experience for everyone involved.
      </p>
    ),
  },
];

export default function TgsContactPage() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/global-santcum/contact/thank-you");
  };

  const toggleFaq = (index: number) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <a className="skip-to-content" href="#main-content">
        Skip to main content
      </a>

      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="mainNav">
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
              <span />
              <span />
              <span />
            </button>
            <span className="nav-hamburger-label">Menu</span>
          </div>

          <Link href="/global-santcum/web" className="nav-logo-area">
            <span className="nav-logo" aria-hidden="true" />
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
        <section className="page-hero">
          <p className="page-hero-label">Get In Touch</p>
          <h1>We&apos;d Love to Hear From You</h1>
          <p>
            Whether you&apos;re a wellness guest seeking your next sanctuary, a
            retreat host searching for the perfect venue, or a venue owner ready
            to connect with a global audience — we&apos;re here to help.
          </p>
        </section>

        <section className="contact-section">
          <div className="contact-info">
            <div className="contact-info-block">
              <p className="contact-info-label">General Enquiries</p>
              <h2 className="contact-info-title">Start a Conversation</h2>
              <p className="contact-info-text">
                We welcome questions about our platform, partnerships, and
                services. Reach us directly at{" "}
                <a href="mailto:hello@theglobalsanctum.com">
                  hello@theglobalsanctum.com
                </a>
              </p>
            </div>

            <div className="contact-divider" />

            <div className="contact-info-block">
              <p className="contact-info-label">For Venue Owners</p>
              <h2 className="contact-info-title">List Your Venue</h2>
              <p className="contact-info-text">
                Interested in showcasing your retreat or wellness venue to a
                global audience of discerning wellness guests and retreat hosts?{" "}
                <Link href="/global-santcum/list-your-venue">
                  Learn more about partnering with us.
                </Link>
              </p>
            </div>

            <div className="contact-divider" />

            <div className="contact-info-block">
              <p className="contact-info-label">Press &amp; Media</p>
              <h2 className="contact-info-title">Media Enquiries</h2>
              <p className="contact-info-text">
                For press enquiries, interviews, or collaboration opportunities,
                please contact{" "}
                <a href="mailto:press@theglobalsanctum.com">
                  press@theglobalsanctum.com
                </a>
              </p>
            </div>

            <div className="response-note">
              <span className="response-note-icon">◈</span>
              <p>
                Our team typically responds within 24–48 hours during business
                days. For urgent matters, please note this in your message
                subject line.
              </p>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h2 className="form-title">Send Us a Message</h2>
            <p className="form-subtitle">
              All fields marked with an asterisk are required.
            </p>

            <form
              id="contactForm"
              data-form-type="contact-enquiry"
              noValidate
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="submissionId" defaultValue="" />
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
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="firstName"
                    name="firstName"
                    placeholder="Your first name"
                    autoComplete="given-name"
                    required
                    aria-label="First name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Last Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="lastName"
                    name="lastName"
                    placeholder="Your last name"
                    autoComplete="family-name"
                    required
                    aria-label="Last name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  className="form-input"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                  aria-label="Email address"
                />
              </div>

              <div className="form-group">
                <label className="form-label">I Am A</label>
                <select className="form-select" defaultValue="">
                  <option value="" disabled>
                    Please select...
                  </option>
                  <option value="wellness-guest">Wellness Guest</option>
                  <option value="retreat-host">Retreat Host</option>
                  <option value="venue-owner">Venue Owner / Manager</option>
                  <option value="press-media">Press / Media</option>
                  <option value="partner">Potential Partner</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Subject <span className="required">*</span>
                </label>
                <select className="form-select" defaultValue="" required>
                  <option value="" disabled>
                    Select a topic...
                  </option>
                  <option value="general">General Enquiry</option>
                  <option value="venue-listing">Venue Listing</option>
                  <option value="booking">Booking Enquiry</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="press">Press &amp; Media</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  className="form-textarea"
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>

              <div
                className="cf-turnstile"
                data-sitekey="REPLACE_WITH_PRODUCTION_SITEKEY"
                data-size="invisible"
              />
              <button type="submit" className="form-submit">
                Send Message
              </button>
            </form>
          </div>
        </section>

        <section className="enquiry-types">
          <div className="enquiry-types-inner">
            <div className="enquiry-types-header">
              <p className="enquiry-types-label">How Can We Help</p>
              <h2 className="enquiry-types-title">Choose Your Path</h2>
            </div>

            <div className="enquiry-grid">
              <div className="enquiry-card">
                <div className="enquiry-card-icon">◯</div>
                <h3 className="enquiry-card-title">Wellness Guests</h3>
                <p className="enquiry-card-text">
                  Seeking a transformative retreat or wellness experience? Let us
                  help you find the perfect sanctuary tailored to your journey.
                </p>
                <a href="#contactForm" className="enquiry-card-link">
                  Get in Touch
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              <div className="enquiry-card">
                <div className="enquiry-card-icon">◇</div>
                <h3 className="enquiry-card-title">Retreat Hosts</h3>
                <p className="enquiry-card-text">
                  Looking for the ideal venue for your next retreat or program?
                  We curate spaces designed for meaningful facilitation.
                </p>
                <a href="#contactForm" className="enquiry-card-link">
                  Find Your Venue
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              <div className="enquiry-card">
                <div className="enquiry-card-icon">⬡</div>
                <h3 className="enquiry-card-title">Venue Owners</h3>
                <p className="enquiry-card-text">
                  Ready to showcase your property to a global audience of
                  wellness guests and retreat hosts? We&apos;d love to welcome
                  you.
                </p>
                <Link
                  href="/global-santcum/list-your-venue"
                  className="enquiry-card-link"
                >
                  List Your Venue
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="faq-header">
            <p className="faq-label">Common Questions</p>
            <h2 className="faq-title">Frequently Asked</h2>
          </div>

          {faqItems.map((item, index) => (
            <div
              className={`faq-item${activeFaq === index ? " active" : ""}`}
              key={item.question}
            >
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                <h3>{item.question}</h3>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-answer">{item.answer}</div>
            </div>
          ))}
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
                <Link href="/global-santcum/retreat-venues">Retreat Venues</Link>
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
                <Link href="/global-santcum/legal">All Legal &amp; Policies →</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 The Global Sanctum. All rights reserved.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">
              Instagram
            </a>
            <a href="#" aria-label="Facebook">
              Facebook
            </a>
            <a href="#" aria-label="LinkedIn">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
