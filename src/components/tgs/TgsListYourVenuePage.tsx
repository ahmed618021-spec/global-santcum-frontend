"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TgsNavDrawer from "@/components/tgs/TgsNavDrawer";

const styles = `
        :root{--warm-white:#FDFCF9;--warm-cream:#F7F5F1;--charcoal:#313131;--charcoal-80:rgba(49,49,49,0.8);--charcoal-70:rgba(49,49,49,0.7);--charcoal-50:rgba(49,49,49,0.5);--charcoal-30:rgba(49,49,49,0.3);--charcoal-15:rgba(49,49,49,0.15);--charcoal-10:rgba(49,49,49,0.1);--charcoal-05:rgba(49,49,49,0.05);--gold-accent:#C4A265;--font-serif:'Cormorant Garamond',Georgia,serif;--font-sans:'Montserrat',sans-serif}
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{font-family:var(--font-serif);font-size:18px;font-weight:400;line-height:1.7;color:#3A3A3A;background:var(--warm-white);-webkit-font-smoothing:antialiased;
            overflow-x: hidden;
        }img{max-width:100%;height:auto;display:block}a{color:inherit;text-decoration:none}

        .skip-to-content{position:absolute;top:-100px;left:16px;background:var(--charcoal);color:var(--warm-white);padding:12px 20px;z-index:9999;font-family:var(--font-sans);font-size:13px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;transition:top 0.2s}
        .skip-to-content:focus{top:16px;outline:2px solid var(--gold-accent)}

        /* NAV */
        .nav{position:fixed;top:0;left:0;right:0;z-index:1000;background:linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0) 100%);backdrop-filter:blur(4px);border-bottom:1px solid transparent;transition:background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease, box-shadow .3s ease}
        .nav.scrolled{background:rgba(253,252,249,0.95);backdrop-filter:blur(8px);border-bottom:1px solid var(--charcoal-08);box-shadow:0 2px 20px rgba(49,49,49,.06)}
        .nav-inner{max-width:1400px;margin:0 auto;padding:0 48px;height:80px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center}
        .nav-left{display:flex;align-items:center}
        .nav-hamburger{display:flex;flex-direction:column;gap:6px;cursor:pointer;padding:10px;margin-left:-10px;transition:opacity .3s ease}
        /* Button-element resets (hamburger upgraded from <div> to <button> for accessibility) */
        .nav-hamburger { background: transparent; border: none; padding: 0; cursor: pointer; color: inherit; font: inherit; }
        .nav-hamburger:focus-visible { outline: 2px solid var(--gold-accent, #C4A265); outline-offset: 4px; }

        .nav-hamburger:hover{opacity:.6}
        .nav-hamburger span{width:26px;height:1.5px;background:#FFFFFF;display:block;transition:background .3s ease, all .3s ease}
        .nav.scrolled .nav-hamburger span{background:var(--charcoal)}
        .nav-hamburger span:nth-child(2){width:18px}
        .nav-hamburger.active span:first-child{transform:rotate(45deg) translate(5px,5px)}
        .nav-hamburger.active span:nth-child(2){opacity:0}
        .nav-hamburger.active span:last-child{transform:rotate(-45deg) translate(5px,-5px)}
        .nav-hamburger-label{font-family:var(--font-sans);font-size:9px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#FFFFFF;margin-left:14px;transition:color .3s ease}
        .nav.scrolled .nav-hamburger-label{color:var(--charcoal)}
        .nav-logo-area{display:flex;align-items:center;justify-content:center;gap:16px}
        .nav-logo-placeholder{width:44px;height:44px;border:2px dashed var(--gold-accent);border-radius:8px;display:flex;align-items:center;justify-content:center;background:var(--charcoal);flex-shrink:0}
        .nav-logo-placeholder span{font-family:var(--font-sans);font-size:7px;font-weight:500;text-transform:uppercase;color:var(--gold-accent);text-align:center;line-height:1.2}
        .nav-brand-text{font-family:var(--font-serif);font-size:17px;font-weight:400;letter-spacing:.15em;text-transform:uppercase;color:#FFFFFF;white-space:nowrap;transition:color .3s ease}
        .nav.scrolled .nav-brand-text{color:var(--charcoal)}
        .nav-right{display:flex;align-items:center;justify-content:flex-end}
        .nav-book-now{font-family:var(--font-sans);font-size:10px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--warm-white);background:var(--charcoal);padding:11px 24px;transition:background .3s ease,transform .2s ease}
        .nav-book-now:hover{background:#7A644F;transform:translateY(-1px)}
        .nav-overlay{position:fixed;inset:0;background:rgba(49,49,49,.3);z-index:998;opacity:0;visibility:hidden;transition:opacity .4s ease,visibility .4s ease;backdrop-filter:blur(2px)}
        .nav-overlay.active{opacity:1;visibility:visible}
        .nav-drawer{position:fixed;top:0;left:0;width:380px;max-width:85vw;height:100vh;background:var(--warm-white);z-index:999;transform:translateX(-100%);transition:transform .45s cubic-bezier(.25,.1,.25,1);display:flex;flex-direction:column;overflow-y:auto}
        .nav-drawer.active{transform:translateX(0)}
        .nav-drawer-header{display:flex;align-items:center;justify-content:space-between;padding:24px 36px;border-bottom:1px solid var(--charcoal-10)}
        .nav-drawer-close{width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-family:var(--font-serif);font-size:24px;font-weight:300;color:var(--charcoal);background:none;border:none;transition:color .3s ease}
        .nav-drawer-close:hover{color:#7A644F}
        .nav-drawer-label{font-family:var(--font-sans);font-size:9px;font-weight:500;letter-spacing:.25em;text-transform:uppercase;color:var(--charcoal)}
        .nav-drawer-links{padding:40px 36px;display:flex;flex-direction:column;flex:1}
        .nav-drawer-links a{font-family:var(--font-serif);font-size:26px;font-weight:300;color:var(--charcoal);padding:16px 0;border-bottom:1px solid var(--charcoal-05);transition:color .3s ease,padding-left .3s ease;display:block}
        .nav-drawer-links a:hover{color:#7A644F;padding-left:8px}
        .nav-drawer-section-label{font-family:var(--font-sans);font-size:9px;font-weight:500;letter-spacing:.25em;text-transform:uppercase;color:var(--charcoal);margin-top:32px;margin-bottom:8px}
        .nav-drawer-footer{padding:28px 36px;border-top:1px solid var(--charcoal-10)}
        .nav-drawer-footer p{font-family:var(--font-serif);font-size:14px;font-weight:300;color:var(--charcoal);line-height:1.6}
        .nav-drawer-footer a{color:#7A644F;border-bottom:1px solid transparent;transition:border-color .3s ease}
        .nav-drawer-footer a:hover{border-color:#7A644F}

        /* UTILITIES */
        .section-eyebrow{font-family:var(--font-sans);font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--charcoal-50);margin-bottom:20px;display:flex;align-items:center;justify-content:center;gap:16px}.section-eyebrow::before,.section-eyebrow::after{content:'';width:40px;height:1px;background:var(--charcoal-30)}.section-title{font-family:var(--font-serif);font-size:40px;font-weight:400;line-height:1.2;color:var(--charcoal);margin-bottom:28px}.section-title em{font-style:italic}

        /* HERO */
        .hero{position:relative;height:75vh;min-height:550px;display:flex;flex-direction:column;justify-content:center;align-items:center;overflow:hidden}.hero-bg{position:absolute;inset:0;background:url('/tgs-images/Bali%20Pool%20Nordic%20Filter.png') center/cover}.hero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(49,49,49,.35)0%,rgba(49,49,49,.25)50%,rgba(49,49,49,.45)100%)}.hero-content{position:relative;z-index:10;text-align:center;padding:0 40px;max-width:900px}.hero-eyebrow{font-family:var(--font-sans);font-size:10px;font-weight:400;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.8);margin-bottom:24px}.hero-title{font-family:var(--font-serif);font-size:clamp(38px,5vw,56px);font-weight:300;font-style:italic;line-height:1.15;color:#fff;margin-bottom:24px}.hero-subtitle{font-family:var(--font-serif);font-size:20px;font-weight:300;line-height:1.7;color:rgba(255,255,255,.9);max-width:650px;margin:0 auto 40px}.hero-cta{display:inline-block;font-family:var(--font-sans);font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;padding:18px 40px;background:#fff;color:var(--charcoal);transition:all .3s ease}.hero-cta:hover{background:var(--warm-cream);transform:translateY(-2px)}

        /* INTRO */
        .intro{padding:120px 80px;background:var(--warm-white)}.intro-inner{max-width:1000px;margin:0 auto;text-align:center}.intro-text{font-size:18px;font-weight:400;line-height:1.9;color:#3A3A3A;max-width:750px;margin:0 auto}

        /* WHO FOR */
        .who-for{padding:120px 80px;background:var(--warm-cream)}.who-for-inner{max-width:1200px;margin:0 auto}.who-for-header{text-align:center;margin-bottom:80px}.who-for-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px}.who-card{background:var(--warm-white);overflow:hidden;transition:transform .4s ease,box-shadow .4s ease}.who-card:hover{transform:translateY(-6px);box-shadow:0 30px 60px rgba(49,49,49,.1)}.who-card-image{height:300px;overflow:hidden}.who-card-image img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease}.who-card:hover .who-card-image img{transform:scale(1.05)}.who-card-content{padding:48px 44px}.who-card-label{font-family:var(--font-sans);font-size:9px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--charcoal-50);margin-bottom:16px}.who-card-title{font-family:var(--font-serif);font-size:30px;font-weight:400;color:var(--charcoal);margin-bottom:20px}.who-card-text{font-size:16px;line-height:1.8;color:#3A3A3A;margin-bottom:24px}.who-card-features{list-style:none}.who-card-features li{font-size:15px;color:#3A3A3A;padding:10px 0;border-bottom:1px solid var(--charcoal-10);display:flex;align-items:center;gap:12px}.who-card-features li:last-child{border-bottom:none}.who-card-features li::before{content:'✓';font-size:12px;color:var(--charcoal-50)}

        /* BENEFITS */
        .benefits{padding:140px 80px;background:var(--warm-white)}.benefits-inner{max-width:1200px;margin:0 auto}.benefits-header{text-align:center;margin-bottom:80px}.benefits-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:40px}.benefit-card{padding:44px 36px;border:1px solid var(--charcoal-10);transition:all .4s ease}.benefit-card:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(49,49,49,.08);border-color:var(--charcoal-30)}.benefit-icon{font-size:28px;margin-bottom:24px;color:var(--charcoal-50)}.benefit-title{font-family:var(--font-serif);font-size:24px;font-weight:400;color:var(--charcoal);margin-bottom:16px}.benefit-text{font-size:15px;line-height:1.8;color:#3A3A3A}

        /* HOW */
        .how{padding:120px 80px;background:var(--warm-cream)}.how-inner{max-width:1100px;margin:0 auto}.how-header{text-align:center;margin-bottom:80px}.how-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:40px}.how-step{text-align:center;position:relative}.how-step::after{content:'';position:absolute;top:40px;right:-20px;width:40px;height:1px;background:var(--charcoal-15)}.how-step:last-child::after{display:none}.how-step-number{width:80px;height:80px;border-radius:50%;background:var(--warm-white);border:1px solid var(--charcoal-15);display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:32px;font-weight:400;color:var(--charcoal);margin:0 auto 28px}.how-step-title{font-family:var(--font-serif);font-size:22px;font-weight:400;color:var(--charcoal);margin-bottom:12px}.how-step-text{font-size:15px;line-height:1.7;color:#3A3A3A}

        /* FOUNDING */
        .founding{padding:120px 80px;background:var(--charcoal);color:#fff}.founding-inner{max-width:1100px;margin:0 auto}.founding-header{text-align:center;margin-bottom:60px}.founding-header .section-eyebrow{color:rgba(255,255,255,.4)}.founding-header .section-eyebrow::before,.founding-header .section-eyebrow::after{background:rgba(255,255,255,.2)}.founding-header .section-title{color:#fff}.founding-intro{font-size:18px;line-height:1.8;color:rgba(255,255,255,.8);text-align:center;max-width:700px;margin:0 auto 60px}.founding-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:60px}.founding-card{border:1px solid rgba(255,255,255,.15);padding:48px;position:relative}.founding-card--primary{border-color:var(--gold-accent)}.founding-card-badge{position:absolute;top:-12px;left:40px;background:var(--gold-accent);color:#fff;font-family:var(--font-sans);font-size:9px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;padding:6px 14px}.founding-card-name{font-family:var(--font-sans);font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:12px}.founding-card-discount{font-family:var(--font-serif);font-size:56px;font-weight:400;color:#fff;line-height:1;margin-bottom:8px}.founding-card-discount span{font-size:24px}.founding-card-term{font-family:var(--font-sans);font-size:12px;color:var(--gold-accent);letter-spacing:1px;margin-bottom:24px}.founding-card-limit{font-size:15px;color:rgba(255,255,255,.6);margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,.1)}.founding-card-features{list-style:none}.founding-card-features li{font-size:14px;color:rgba(255,255,255,.7);padding:10px 0;display:flex;align-items:flex-start;gap:10px}.founding-card-features li::before{content:'✓';font-size:10px;color:var(--gold-accent);margin-top:3px}.founding-card-btn{display:block;width:100%;padding:18px 32px;font-family:var(--font-sans);font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;text-align:center;background:#fff;color:var(--charcoal);border:none;cursor:pointer;transition:all .3s ease;margin-top:32px}.founding-card-btn:hover{background:var(--warm-cream)}.founding-card:not(.founding-card--primary) .founding-card-btn{background:transparent;border:1px solid rgba(255,255,255,.3);color:#fff}.founding-card:not(.founding-card--primary) .founding-card-btn:hover{background:rgba(255,255,255,.1)}.founding-card-btn--disabled{opacity:.4;cursor:not-allowed;font-size:9px;letter-spacing:1.5px}.founding-card-btn--disabled:hover{background:transparent !important;border-color:rgba(255,255,255,.3) !important}.founding-note{text-align:center;font-size:14px;color:rgba(255,255,255,.5)}

        /* ════════════════════════════════════════════
           PRICING — HORIZONTAL COMPARISON TABLE
           ════════════════════════════════════════════ */
                /* ═══ FOUNDING PARTNER PRICING LAYER ═══════════════════════════════
           Manually swapped when programme transitions Founding → Launch → Standard.
           Currently active: Founding Partner (60% off).
           ═══════════════════════════════════════════════════════════════════ */
        .partner-pricing-banner{max-width:900px;margin:0 auto 56px;padding:24px 32px;background:var(--warm-cream);border-left:3px solid var(--gold-accent);text-align:left}
        .partner-pricing-banner-title{font-family:var(--font-serif);font-size:20px;font-weight:400;color:var(--charcoal);margin-bottom:6px;line-height:1.3}
        .partner-pricing-banner-text{font-family:var(--font-sans);font-size:13px;font-weight:400;letter-spacing:0.02em;color:#3A3A3A;line-height:1.6;margin:0}
        .partner-pricing-banner-text strong{color:var(--gold-accent);font-weight:600;text-transform:uppercase;letter-spacing:0.1em;font-size:11px}

        .tier-founding-badge{display:inline-block;font-family:var(--font-sans);font-size:8px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold-accent);background:rgba(196,162,101,0.1);padding:4px 10px;border:1px solid rgba(196,162,101,0.3);margin-bottom:12px;line-height:1.2}

        .tier-price-retail{font-family:var(--font-serif);font-size:18px;font-weight:300;color:var(--charcoal-50);text-decoration:line-through;text-decoration-thickness:1px;line-height:1;margin-bottom:6px;display:block}
        .tier-price-retail .currency{font-size:14px;vertical-align:top;margin-right:1px}
        .tier-price-retail .period{font-size:12px;color:var(--charcoal-50);font-weight:300;margin-left:2px}

        .pricing{padding:140px 80px;background:var(--warm-white)}
        .pricing-inner{max-width:1300px;margin:0 auto}
        .pricing-header{text-align:center;margin-bottom:40px}
        .pricing-subtitle{font-size:18px;font-weight:400;color:#3A3A3A;max-width:750px;margin:0 auto}
        .pricing-toggle-wrapper{text-align:center;margin-bottom:12px}
        .pricing-toggle{display:inline-flex;align-items:center;gap:16px}
        .pricing-toggle-label{font-family:var(--font-sans);font-size:12px;font-weight:500;letter-spacing:1px;color:var(--charcoal-50);cursor:pointer;transition:color .3s ease;user-select:none}
        .pricing-toggle-label.active{color:var(--charcoal);font-weight:600}
        .pricing-toggle-switch{width:52px;height:28px;background:var(--charcoal);border-radius:14px;cursor:pointer;position:relative;flex-shrink:0}
        .pricing-toggle-switch::after{content:'';position:absolute;top:3px;left:3px;width:22px;height:22px;background:#fff;border-radius:50%;transition:transform .3s ease}
        .pricing-toggle-switch.monthly::after{transform:translateX(24px)}
        .pricing-save{font-family:var(--font-serif);font-size:15px;font-style:italic;color:var(--charcoal-50);text-align:center;margin-bottom:60px;transition:opacity .3s ease}

        /* Table */
        .pricing-table{width:100%;border-collapse:collapse}
        .pricing-table th,.pricing-table td{padding:16px 20px;text-align:center;vertical-align:middle;border-bottom:1px solid var(--charcoal-05)}
        .pricing-table thead th{border-bottom:2px solid var(--charcoal-15);padding-bottom:32px}
        .pricing-table th.feature-label{text-align:left;width:28%}

        /* Column headers */
        .tier-icon{display:block;margin:0 auto 8px}
        .tier-icon svg{width:36px;height:36px;stroke:var(--charcoal);stroke-width:1.2;fill:none;stroke-linecap:round;stroke-linejoin:round;margin:0 auto}
        .tier-name{font-family:var(--font-serif);font-size:24px;font-weight:400;color:var(--charcoal);margin-bottom:8px}
        .tier-price{font-family:var(--font-serif);font-size:36px;font-weight:400;color:var(--charcoal);line-height:1}
        .tier-price .currency{font-size:18px;vertical-align:super}
        .tier-price .period{font-size:14px;color:var(--charcoal-50);font-weight:300}
        .tier-desc{font-family:var(--font-serif);font-size:13px;font-style:italic;color:var(--charcoal-50);margin-top:6px;line-height:1.5}

        /* Featured column highlight */
        .col-featured{background:var(--warm-cream);position:relative}
        .pricing-table thead .col-featured{padding-top:44px}
        .col-featured-badge{position:absolute;top:0;left:50%;transform:translateX(-50%);background:var(--gold-accent);color:#fff;font-family:var(--font-sans);font-size:8px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;padding:6px 14px;white-space:nowrap}

        /* Category rows */
        .pricing-table .category-row td,.pricing-table .category-row th{font-family:var(--font-sans);font-size:9px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--charcoal-50);border-bottom:1px solid var(--charcoal-15);padding:20px 20px 10px;background:transparent}
        .pricing-table .category-row .col-featured{background:var(--warm-cream)}

        /* Feature rows */
        .pricing-table .feature-label{font-family:var(--font-serif);font-size:15px;color:#3A3A3A;text-align:left;font-weight:400}
        .pricing-table td{font-family:var(--font-serif);font-size:15px;color:#3A3A3A}
        .pricing-table .check{color:var(--charcoal-30);font-size:16px}
        .pricing-table .col-featured .check{color:var(--gold-accent)}
        .pricing-table .dash{color:var(--charcoal-30);font-size:18px}
        .pricing-table .value{font-family:var(--font-sans);font-size:12px;font-weight:500;color:var(--charcoal)}
        .pricing-table .col-featured .value{color:var(--charcoal)}
        .coming-soon{font-family:var(--font-sans);font-size:7px;font-weight:500;letter-spacing:.5px;text-transform:uppercase;background:var(--charcoal-10);color:var(--charcoal-50);padding:2px 5px;border-radius:2px;margin-left:4px;vertical-align:middle}

        /* Commission row */
        .pricing-table .commission-row td,.pricing-table .commission-row th{background:var(--charcoal);color:#fff;border-bottom:1px solid rgba(255,255,255,.1);padding:20px 20px}
        .pricing-table .commission-row .col-featured{background:var(--charcoal)}
        .pricing-table .commission-row .feature-label{color:rgba(255,255,255,.7)}
        .commission-value{font-family:var(--font-serif);font-size:28px;font-weight:400;color:#fff;line-height:1}
        .commission-value span{font-size:14px;color:rgba(255,255,255,.5)}
        .commission-note{font-family:var(--font-sans);font-size:10px;color:rgba(255,255,255,.4);margin-top:4px}

        /* CTA row */
        .pricing-table .cta-row td,.pricing-table .cta-row th{border-bottom:none;padding:32px 20px}
        .pricing-table-btn{display:inline-block;min-width:140px;padding:16px 28px;font-family:var(--font-sans);font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;border:1px solid var(--charcoal-30);color:var(--charcoal);background:transparent;cursor:pointer;transition:all .3s ease;box-sizing:border-box}
        .pricing-table-btn:hover{background:var(--charcoal);color:#fff;border-color:var(--charcoal)}
        .col-featured .pricing-table-btn{background:var(--charcoal);color:#fff;border-color:var(--charcoal)}
        .col-featured .pricing-table-btn:hover{background:var(--charcoal-80)}

        .pricing-notes{margin-top:48px;text-align:center}
        .pricing-note{font-size:14px;color:var(--charcoal-50);margin-bottom:8px}

        /* FAQ */
        .faq{padding:140px 80px;background:var(--warm-white)}.faq-inner{max-width:800px;margin:0 auto}.faq-header{text-align:center;margin-bottom:60px}.faq-item{border-bottom:1px solid var(--charcoal-15)}.faq-question{font-family:var(--font-serif);font-size:22px;font-weight:400;color:var(--charcoal);padding:28px 0;cursor:pointer;display:flex;justify-content:space-between;align-items:center}.faq-question::after{content:'+';font-size:24px;color:var(--charcoal-50);flex-shrink:0;margin-left:16px}.faq-item.open .faq-question::after{content:'−'}.faq-answer{font-size:16px;line-height:1.8;color:#3A3A3A;max-height:0;overflow:hidden;transition:max-height .4s ease,padding .4s ease;padding:0}.faq-item.open .faq-answer{max-height:300px;padding-bottom:28px}

        /* CTA */
        .cta-section{padding:120px 80px;background:var(--warm-cream);text-align:center}.cta-inner{max-width:700px;margin:0 auto}.cta-title{font-family:var(--font-serif);font-size:40px;font-weight:400;font-style:italic;color:var(--charcoal);margin-bottom:24px}.cta-text{font-size:18px;line-height:1.8;color:#3A3A3A;margin-bottom:40px}.cta-btn{display:inline-block;font-family:var(--font-sans);font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;padding:20px 48px;background:var(--charcoal);color:#fff;transition:all .3s ease}.cta-btn:hover{background:var(--charcoal-80);transform:translateY(-2px)}.cta-contact{margin-top:32px;font-size:15px;color:var(--charcoal-50)}.cta-contact a{color:var(--charcoal);border-bottom:1px solid var(--charcoal-30);transition:border-color .3s ease}.cta-contact a:hover{border-color:var(--charcoal)}

        /* FOOTER */
        .footer{background:var(--charcoal);color:rgba(255,255,255,.7);padding:80px 48px 40px}
        .footer-grid{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1.5fr repeat(4, 1fr);gap:48px;padding-bottom:56px;border-bottom:1px solid rgba(255,255,255,0.08)}
        .footer-brand{display:flex;flex-direction:column;gap:20px}
        .footer-logo-placeholder{width:72px;height:72px;border:2px dashed var(--gold-accent);border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(196,162,101,.08)}
        .footer-logo-placeholder span{font-family:var(--font-sans);font-size:8px;font-weight:500;text-transform:uppercase;color:var(--gold-accent);text-align:center;line-height:1.3}
        .footer-brand-name{font-family:var(--font-serif);font-size:18px;font-weight:400;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.9)}
        .footer-brand-text{font-family:var(--font-serif);font-size:15px;font-weight:400;line-height:1.7;color:rgba(255,255,255,0.5)}
        .footer-brand-meta{font-family:var(--font-sans);font-size:11px;font-weight:400;line-height:1.7;letter-spacing:0.05em;color:rgba(255,255,255,0.35)}
        .footer-social{display:flex;gap:24px}
        .footer-social a{font-family:var(--font-sans);font-size:11px;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.4);transition:color 0.3s ease}
        .footer-social a:hover{color:var(--gold-accent)}
        .footer-col-title{font-family:var(--font-sans);font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:24px}
        .footer-links{list-style:none;display:flex;flex-direction:column;gap:14px}
        .footer-links a{font-family:var(--font-serif);font-size:15px;font-weight:400;color:rgba(255,255,255,0.6);transition:color 0.3s}
        .footer-links a:hover{color:rgba(255,255,255,.95)}
        .footer-bottom{max-width:1400px;margin:0 auto;padding-top:32px;display:flex;justify-content:space-between;align-items:center}
        .footer-copyright{font-family:var(--font-sans);font-size:12px;font-weight:400;letter-spacing:0.05em;color:rgba(255,255,255,0.3)}

        @media(max-width:1024px){.nav-inner{padding:0 40px}.intro{padding:80px 40px}.who-for{padding:80px 40px}.who-for-grid{grid-template-columns:1fr;gap:40px}.benefits{padding:80px 40px}.benefits-grid{grid-template-columns:1fr 1fr}.how{padding:80px 40px}.how-steps{grid-template-columns:1fr 1fr}.how-step::after{display:none}.founding{padding:80px 40px}.founding-grid{grid-template-columns:1fr}.pricing{padding:80px 40px}.pricing-table{font-size:14px}.pricing-table th,.pricing-table td{padding:12px 10px}.tier-price{font-size:28px}.tier-name{font-size:20px}.commission-value{font-size:22px}.faq{padding:80px 40px}.cta-section{padding:80px 40px}}
        @media(max-width:1100px){.footer-grid{grid-template-columns:1fr 1fr 1fr;gap:40px}}
        @media(max-width:768px){.nav-inner{padding:0 24px;height:68px}.nav-hamburger-label{display:none}.nav-brand-text{font-size:14px;letter-spacing:.1em}.nav-logo-placeholder{width:36px;height:36px}.nav-book-now{font-size:9px;padding:9px 16px}.nav-drawer{width:100%;max-width:100vw}.hero{height:60vh;min-height:400px}.section-title{font-size:32px}.benefits-grid{grid-template-columns:1fr}.how-steps{grid-template-columns:1fr}.pricing{padding:60px 20px}.pricing-table{display:block;overflow-x:auto;white-space:nowrap}.footer{padding:60px 24px 24px}.footer-grid{grid-template-columns:1fr;gap:32px}}
`;

const SIGNUP_URL = "/global-santcum/list-your-venue/signup";

const faqItems = [
  {
    question: "What's the difference between Retreat Venues and Wellness Venues?",
    answer:
      "Retreat Venues are exclusive-use spaces that accommodate groups for multi-day programs — retreat centers, eco lodges, and private estates. Wellness Venues offer day-use and multi-day experiences — spas, bathhouses, wellness centers, and therapeutic facilities. Many venues qualify as both, and pricing is the same regardless of venue type.",
  },
  {
    question: "What are the Founding Partner and Launch Partner programmes?",
    answer:
      "We're offering permanent discounted rates to venues who join us during our launch period. Founding Partners (first 50 venues) receive 60% off their subscription tier for life. Launch Partners (next 150 venues) receive 40% off for life. These rates are locked in permanently and will never be offered again after launch.",
  },
  {
    question: "How does the Essentials plan work?",
    answer:
      "The Essentials plan is completely free — no subscription fee at all. You only pay a 20% commission when a booking is completed through our platform. It's perfect for venues wanting to test the platform before committing to a paid tier.",
  },
  {
    question: "When will the dashboard and analytics features launch?",
    answer:
      "We're building the venue dashboard and analytics features for launch shortly after the platform goes live. Featured and Premium members will have access first.",
  },
  {
    question: "How long does verification take?",
    answer:
      "Most venues are verified within 48–72 hours. We review for accuracy, quality, and alignment with our curation standards. Premium tier members receive priority verification.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, cancel anytime. Your listing remains active until the end of your billing period. No long-term contracts, no cancellation fees. You can also switch to the free Essentials plan at any time.",
  },
  {
    question: "What makes you different from other listing platforms?",
    answer:
      "Curation over volume. Comprehensive venue profiles that showcase depth, not just photos. Significantly lower total fees. Built specifically for wellness and retreat spaces, not adapted from generic hospitality software.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can change plans at any time. Upgrades take effect immediately with prorated billing. Downgrades take effect at your next billing cycle. Founding Partner and Launch Partner discounts apply to whatever tier you choose.",
  },
];

export default function TgsListYourVenuePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isYearly, setIsYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const pick = (yearly: string, monthly: string) => (isYearly ? yearly : monthly);

  const goToSignup = (event: React.MouseEvent) => {
    event.preventDefault();
    if (typeof window !== "undefined") {
      window.location.href = SIGNUP_URL;
    }
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
              aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
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
          <div className="hero-bg" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow">Partner With Us</p>
            <h1 className="hero-title">List Your Venue on The Global Sanctum</h1>
            <p className="hero-subtitle">
              Join a curated network of exceptional wellness and retreat venues. Reach retreat hosts, wellness guests,
              and seekers who value transformational spaces.
            </p>
            <a href="#pricing" className="hero-cta">
              View Pricing
            </a>
          </div>
        </section>

        <section className="intro">
          <div className="intro-inner">
            <p className="section-eyebrow">Why List With Us</p>
            <h2 className="section-title">
              Infrastructure <em>Built For You</em>
            </h2>
            <p className="intro-text">
              The Global Sanctum isn&apos;t another listing site. We&apos;re building the infrastructure this industry
              deserves — comprehensive venue profiles, intelligent search that matches the right guests to the right
              spaces, and technology that handles operations so you can focus on creating sanctuary.
            </p>
          </div>
        </section>

        <section className="who-for">
          <div className="who-for-inner">
            <div className="who-for-header">
              <p className="section-eyebrow">Two Paths, One Platform</p>
              <h2 className="section-title">
                For Every Type of <em>Wellness Space</em>
              </h2>
            </div>
            <div className="who-for-grid">
              <div className="who-card">
                <div className="who-card-image">
                  <img src="/tgs-images/Meditation%20Room%20Nordic%20Filter.png" alt="Retreat venue" />
                </div>
                <div className="who-card-content">
                  <p className="who-card-label">Exclusive-Use Spaces</p>
                  <h3 className="who-card-title">Retreat Venues</h3>
                  <p className="who-card-text">
                    Purpose-built centers, eco lodges, heritage properties, and private estates that host
                    transformational group programs.
                  </p>
                  <ul className="who-card-features">
                    <li>Connect with retreat hosts globally</li>
                    <li>Showcase full accommodation and facilities</li>
                    <li>Receive qualified booking enquiries</li>
                    <li>Integrated calendar and availability</li>
                    <li>Streamlined group booking coordination</li>
                  </ul>
                </div>
              </div>
              <div className="who-card">
                <div className="who-card-image">
                  <img src="/tgs-images/Sauna%20Modern%20Nordic%20Filter.png" alt="Wellness venue" />
                </div>
                <div className="who-card-content">
                  <p className="who-card-label">Day-Use &amp; Multi-Day Venues</p>
                  <h3 className="who-card-title">Wellness Venues</h3>
                  <p className="who-card-text">
                    Spas, bathhouses, thermal facilities, wellness centers, and therapeutic spaces offering day-use and
                    multi-day experiences and treatments.
                  </p>
                  <ul className="who-card-features">
                    <li>Reach wellness guests seeking experiences</li>
                    <li>Display services, treatments, and offerings</li>
                    <li>Direct booking integration</li>
                    <li>Visibility in curated collections</li>
                    <li>Connection to global wellness community</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="benefits">
          <div className="benefits-inner">
            <div className="benefits-header">
              <p className="section-eyebrow">What You Gain</p>
              <h2 className="section-title">
                Built To Serve <em>Your Success</em>
              </h2>
            </div>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">◎</div>
                <h3 className="benefit-title">Global Visibility</h3>
                <p className="benefit-text">
                  Reach qualified leads — retreat hosts, wellness guests, and seekers actively searching for spaces like
                  yours.
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">◈</div>
                <h3 className="benefit-title">Comprehensive Profiles</h3>
                <p className="benefit-text">
                  Showcase everything that makes your space unique. Accommodation, facilities, wellness offerings,
                  location, philosophy.
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">◇</div>
                <h3 className="benefit-title">Intelligent Matching</h3>
                <p className="benefit-text">
                  Our search connects the right guests to the right spaces. Filter by modality, capacity, setting,
                  amenities.
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⬡</div>
                <h3 className="benefit-title">Transparent Fees</h3>
                <p className="benefit-text">
                  Commission as low as 5%. Clear pricing, no hidden costs. You keep more of what you earn.
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">★</div>
                <h3 className="benefit-title">Curated Community</h3>
                <p className="benefit-text">
                  Curation that protects your positioning among serious operators. Quality over volume, always.
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">◉</div>
                <h3 className="benefit-title">Operational Tools</h3>
                <p className="benefit-text">
                  Full concierge support handles your enquiries and booking coordination today. Calendar management,
                  automated enquiry handling, and self-serve booking tools coming soon.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="how">
          <div className="how-inner">
            <div className="how-header">
              <p className="section-eyebrow">Simple Process</p>
              <h2 className="section-title">
                How It <em>Works</em>
              </h2>
            </div>
            <div className="how-steps">
              <div className="how-step">
                <div className="how-step-number">1</div>
                <h3 className="how-step-title">Apply</h3>
                <p className="how-step-text">
                  Submit your venue details. We review for quality and alignment with our curation standards.
                </p>
              </div>
              <div className="how-step">
                <div className="how-step-number">2</div>
                <h3 className="how-step-title">Onboard</h3>
                <p className="how-step-text">
                  Our team helps build your comprehensive profile — photography guidance, descriptions, and facility
                  mapping.
                </p>
              </div>
              <div className="how-step">
                <div className="how-step-number">3</div>
                <h3 className="how-step-title">Launch</h3>
                <p className="how-step-text">
                  Your venue goes live. Featured in search, discoverable by retreat hosts and wellness guests worldwide.
                </p>
              </div>
              <div className="how-step">
                <div className="how-step-number">4</div>
                <h3 className="how-step-title">Grow</h3>
                <p className="how-step-text">
                  Receive qualified enquiries, manage bookings, and track performance through your venue dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="founding">
          <div className="founding-inner">
            <div className="founding-header">
              <p className="section-eyebrow">Early Access</p>
              <h2 className="section-title">
                <em>Partner Pricing</em>
              </h2>
            </div>
            <p className="founding-intro">
              We&apos;re inviting a select group of venues to join us at launch. In exchange for your early commitment
              and feedback, we&apos;re offering partnership rates that will never be available again.
            </p>
            <div className="founding-grid">
              <div className="founding-card founding-card--primary">
                <span className="founding-card-badge">Limited Availability</span>
                <p className="founding-card-name">Founding Partner</p>
                <p className="founding-card-discount">
                  60<span>% off</span>
                </p>
                <p className="founding-card-term">Lifetime pricing</p>
                <p className="founding-card-limit">Limited to 50 venues worldwide</p>
                <ul className="founding-card-features">
                  <li>Permanent 60% reduction on your subscription tier</li>
                  <li>Priority positioning in search results</li>
                  <li>Direct input on platform features and roadmap</li>
                  <li>Recognised as a Founding Partner of TGS</li>
                  <li>Featured in launch communications</li>
                  <li>Dedicated onboarding support</li>
                </ul>
                <a href="#pricing" className="founding-card-btn" onClick={goToSignup}>
                  Select Your Plan
                </a>
              </div>
              <div className="founding-card">
                <p className="founding-card-name">Launch Partner</p>
                <p className="founding-card-discount">
                  40<span>% off</span>
                </p>
                <p className="founding-card-term">Lifetime pricing</p>
                <p className="founding-card-limit">Limited to 150 venues after Founding Partners</p>
                <ul className="founding-card-features">
                  <li>Permanent 40% reduction on your subscription tier</li>
                  <li>Enhanced positioning in search results</li>
                  <li>Early access to new features</li>
                  <li>Recognised as a Launch Partner of TGS</li>
                  <li>Priority support during onboarding</li>
                </ul>
                <span className="founding-card-btn founding-card-btn--disabled" aria-disabled="true">
                  Available After Founding Partners
                </span>
              </div>
            </div>
            <p className="founding-note">
              Applications are reviewed individually. We&apos;re looking for venues aligned with our vision of curated,
              transformational spaces.
            </p>
          </div>
        </section>

        <section className="pricing" id="pricing">
          <div className="pricing-inner">
            <div className="pricing-header">
              <p className="section-eyebrow">Founding Partner Pricing</p>
              <h2 className="section-title">Choose Your Plan</h2>
              <p className="pricing-subtitle">
                Simple subscriptions for all venue types — retreat venues and wellness venues. No hidden fees. Cancel
                anytime.
              </p>
            </div>

            <aside className="partner-pricing-banner" role="note" aria-label="Founding Partner pricing notice">
              <p className="partner-pricing-banner-title">
                You&apos;re viewing <em>Founding Partner</em> pricing.
              </p>
              <p className="partner-pricing-banner-text">
                <strong>Lifetime 60% off</strong> — limited to 50 venues worldwide. These rates are locked in
                permanently and will never be offered again.
              </p>
            </aside>
            <div className="pricing-toggle-wrapper">
              <div className="pricing-toggle">
                <span className={`pricing-toggle-label${isYearly ? " active" : ""}`} id="label-yearly">
                  Yearly
                </span>
                <div
                  className={`pricing-toggle-switch${isYearly ? "" : " monthly"}`}
                  id="pricing-switch"
                  onClick={() => setIsYearly((prev) => !prev)}
                />
                <span className={`pricing-toggle-label${isYearly ? "" : " active"}`} id="label-monthly">
                  Monthly
                </span>
              </div>
            </div>
            <p className="pricing-save" id="pricing-save" style={{ opacity: isYearly ? 1 : 0 }}>
              (save 17% with annual subscriptions)
            </p>

            <table className="pricing-table">
              <thead>
                <tr>
                  <th className="feature-label"></th>
                  <th>
                    <div className="tier-icon">
                      <svg viewBox="0 0 36 36">
                        <circle cx="12" cy="26" r="4" />
                        <circle cx="24" cy="26" r="4" />
                        <path d="M16 26h4M12 22V16l6-4 6 4v6" />
                      </svg>
                    </div>
                    <div className="tier-name">Essentials</div>
                    <div className="tier-price">
                      <span className="currency">$</span>
                      <span className="price-amount">{pick("0", "0")}</span>
                      <span className="period">{pick("/mo", "/mo")}</span>
                    </div>
                    <div className="tier-desc">Pay only when bookings arrive</div>
                  </th>
                  <th>
                    <div className="tier-icon">
                      <svg viewBox="0 0 36 36">
                        <rect x="4" y="16" width="28" height="10" rx="2" />
                        <circle cx="11" cy="26" r="3" />
                        <circle cx="25" cy="26" r="3" />
                        <path d="M4 21h5l3-5h12l3 5h5" />
                      </svg>
                    </div>
                    <div className="tier-name">Standard</div>
                    <span className="tier-founding-badge">Founding Partner — 60% off</span>
                    <div className="tier-price-retail">
                      <span className="currency">$</span>
                      <span className="price-amount-retail">{pick("490", "49")}</span>
                      <span className="period">{pick("/yr", "/mo")}</span>
                    </div>
                    <div className="tier-price">
                      <span className="currency">$</span>
                      <span className="price-amount">{pick("196", "19.60")}</span>
                      <span className="period">{pick("/yr", "/mo")}</span>
                    </div>
                    <div className="tier-desc">Establish your presence</div>
                  </th>
                  <th className="col-featured">
                    <span className="col-featured-badge">Most Popular</span>
                    <div className="tier-icon">
                      <svg viewBox="0 0 36 36">
                        <path d="M18 4L4 32h28L18 4z" />
                        <path d="M18 4v28M4 32l14-14M32 32L18 18" />
                      </svg>
                    </div>
                    <div className="tier-name">Featured</div>
                    <span className="tier-founding-badge">Founding Partner — 60% off</span>
                    <div className="tier-price-retail">
                      <span className="currency">$</span>
                      <span className="price-amount-retail">{pick("990", "99")}</span>
                      <span className="period">{pick("/yr", "/mo")}</span>
                    </div>
                    <div className="tier-price">
                      <span className="currency">$</span>
                      <span className="price-amount">{pick("396", "39.60")}</span>
                      <span className="period">{pick("/yr", "/mo")}</span>
                    </div>
                    <div className="tier-desc">Maximise booking potential</div>
                  </th>
                  <th>
                    <div className="tier-icon">
                      <svg viewBox="0 0 36 36">
                        <path d="M18 2l3 10h10l-8 6 3 10-8-6-8 6 3-10-8-6h10z" />
                      </svg>
                    </div>
                    <div className="tier-name">Premium</div>
                    <span className="tier-founding-badge">Founding Partner — 60% off</span>
                    <div className="tier-price-retail">
                      <span className="currency">$</span>
                      <span className="price-amount-retail">{pick("1,990", "199")}</span>
                      <span className="period">{pick("/yr", "/mo")}</span>
                    </div>
                    <div className="tier-price">
                      <span className="currency">$</span>
                      <span className="price-amount">{pick("796", "79.60")}</span>
                      <span className="period">{pick("/yr", "/mo")}</span>
                    </div>
                    <div className="tier-desc">Maximum exposure &amp; support</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="commission-row">
                  <th className="feature-label">Platform Commission</th>
                  <td className="col-essentials">
                    <div className="commission-value">
                      20%<span> + 3%</span>
                    </div>
                    <div className="commission-note">Stripe processing</div>
                  </td>
                  <td>
                    <div className="commission-value">
                      10%<span> + 3%</span>
                    </div>
                    <div className="commission-note">Stripe processing</div>
                  </td>
                  <td className="col-featured">
                    <div className="commission-value">
                      7%<span> + 3%</span>
                    </div>
                    <div className="commission-note">Stripe processing</div>
                  </td>
                  <td>
                    <div className="commission-value">
                      5%<span> + 3%</span>
                    </div>
                    <div className="commission-note">Stripe processing</div>
                  </td>
                </tr>

                <tr className="category-row">
                  <th colSpan={1}>Venue Profile</th>
                  <td></td>
                  <td></td>
                  <td className="col-featured"></td>
                  <td></td>
                </tr>
                <tr>
                  <th className="feature-label">Full venue profile in TGS collection</th>
                  <td>
                    <span className="check">✓</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                  <td className="col-featured">
                    <span className="check">✓</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>
                <tr>
                  <th className="feature-label">High-resolution photo gallery</th>
                  <td>
                    <span className="check">✓</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                  <td className="col-featured">
                    <span className="check">✓</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>
                <tr>
                  <th className="feature-label">Video uploads</th>
                  <td>
                    <span className="check">✓</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                  <td className="col-featured">
                    <span className="check">✓</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>
                <tr>
                  <th className="feature-label">Search visibility</th>
                  <td className="value">Standard</td>
                  <td className="value">Standard</td>
                  <td className="col-featured value">Priority</td>
                  <td className="value">Premium (top)</td>
                </tr>
                <tr>
                  <th className="feature-label">Home page placement</th>
                  <td>
                    <span className="dash">—</span>
                  </td>
                  <td>
                    <span className="dash">—</span>
                  </td>
                  <td className="col-featured">
                    <span className="value">Feature rotation</span>
                  </td>
                  <td>
                    <span className="value">Premium rotation</span>
                  </td>
                </tr>

                <tr className="category-row">
                  <th colSpan={1}>Dashboard &amp; Tools</th>
                  <td></td>
                  <td></td>
                  <td className="col-featured"></td>
                  <td></td>
                </tr>
                <tr>
                  <th className="feature-label">Enquiry notifications</th>
                  <td>
                    <span className="check">✓</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                  <td className="col-featured">
                    <span className="check">✓</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>
                <tr>
                  <th className="feature-label">
                    Analytics <span className="coming-soon">Coming Soon</span>
                  </th>
                  <td>
                    <span className="dash">—</span>
                  </td>
                  <td className="value">Basic</td>
                  <td className="col-featured value">Advanced</td>
                  <td className="value">Comprehensive</td>
                </tr>
                <tr>
                  <th className="feature-label">Booking management</th>
                  <td>
                    <span className="dash">—</span>
                  </td>
                  <td>
                    <span className="dash">—</span>
                  </td>
                  <td className="col-featured">
                    <span className="check">✓</span>
                  </td>
                  <td>
                    <span className="value">Priority</span>
                  </td>
                </tr>
                <tr>
                  <th className="feature-label">Dedicated Account Manager</th>
                  <td>
                    <span className="dash">—</span>
                  </td>
                  <td>
                    <span className="dash">—</span>
                  </td>
                  <td className="col-featured">
                    <span className="dash">—</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>

                <tr className="category-row">
                  <th colSpan={1}>Support</th>
                  <td></td>
                  <td></td>
                  <td className="col-featured"></td>
                  <td></td>
                </tr>
                <tr>
                  <th className="feature-label">Support level</th>
                  <td className="value">Email</td>
                  <td className="value">Direct</td>
                  <td className="col-featured value">Priority</td>
                  <td className="value">Dedicated</td>
                </tr>

                <tr className="category-row">
                  <th colSpan={1}>Marketing &amp; Exposure</th>
                  <td></td>
                  <td></td>
                  <td className="col-featured"></td>
                  <td></td>
                </tr>
                <tr>
                  <th className="feature-label">Sanctum Journal newsletter</th>
                  <td>
                    <span className="dash">—</span>
                  </td>
                  <td className="value">Standard</td>
                  <td className="col-featured value">Priority rotation</td>
                  <td className="value">Included</td>
                </tr>
                <tr>
                  <th className="feature-label">Social media spotlight</th>
                  <td>
                    <span className="dash">—</span>
                  </td>
                  <td>
                    <span className="dash">—</span>
                  </td>
                  <td className="col-featured value">Quarterly</td>
                  <td className="value">Monthly</td>
                </tr>
                <tr>
                  <th className="feature-label">Exclusive partner events</th>
                  <td>
                    <span className="dash">—</span>
                  </td>
                  <td>
                    <span className="dash">—</span>
                  </td>
                  <td className="col-featured">
                    <span className="dash">—</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>

                <tr className="category-row">
                  <th colSpan={1}>Community</th>
                  <td></td>
                  <td></td>
                  <td className="col-featured"></td>
                  <td></td>
                </tr>
                <tr>
                  <th className="feature-label">Sanctum community updates</th>
                  <td>
                    <span className="check">✓</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                  <td className="col-featured">
                    <span className="check">✓</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>
                <tr>
                  <th className="feature-label">Advisory voice in shaping TGS</th>
                  <td>
                    <span className="dash">—</span>
                  </td>
                  <td>
                    <span className="dash">—</span>
                  </td>
                  <td className="col-featured">
                    <span className="check">✓</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>

                <tr className="cta-row">
                  <th></th>
                  <td>
                    <a href="#" className="pricing-table-btn" onClick={goToSignup} data-tier="essentials">
                      Get Started
                    </a>
                  </td>
                  <td>
                    <a href="#" className="pricing-table-btn" onClick={goToSignup} data-tier="standard">
                      Get Started
                    </a>
                  </td>
                  <td className="col-featured">
                    <a href="#" className="pricing-table-btn" onClick={goToSignup} data-tier="featured">
                      Get Started
                    </a>
                  </td>
                  <td>
                    <a href="#" className="pricing-table-btn" onClick={goToSignup} data-tier="premium">
                      Get Started
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="pricing-notes">
              <p className="pricing-note">
                All subscriptions are month-to-month or annual. No long-term contracts.
              </p>
              <p className="pricing-note">
                Industry average: 15–25% commission. Our highest rate is 20% with zero subscription — paid tiers drop to
                as low as 5%.
              </p>
            </div>
          </div>
        </section>

        <section className="faq">
          <div className="faq-inner">
            <div className="faq-header">
              <p className="section-eyebrow">Questions</p>
              <h2 className="section-title">Frequently Asked</h2>
            </div>
            {faqItems.map((item, index) => (
              <div className={`faq-item${openFaq === index ? " open" : ""}`} key={item.question}>
                <h3
                  className="faq-question"
                  onClick={() => setOpenFaq((current) => (current === index ? null : index))}
                >
                  {item.question}
                </h3>
                <p className="faq-answer">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-inner">
            <h2 className="cta-title">Ready to Join?</h2>
            <p className="cta-text">
              List your venue on the platform built to serve you. Transparent pricing, qualified leads, and technology
              that liberates instead of burdens.
            </p>
            <a href="#pricing" className="cta-btn">
              Get Started Today
            </a>
            <p className="cta-contact">
              Questions? <Link href="/global-santcum/contact">Get in touch</Link> with our partnerships team.
            </p>
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
              Curated wellness venues and transformational retreat spaces for retreat hosts, wellness guests, and
              seekers worldwide.
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
                <Link href="/global-santcum/wellness-venues">Wellness Venues</Link>
              </li>
              <li>
                <Link href="/global-santcum/wellness-experiences">Wellness Experiences</Link>
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
                <Link href="/global-santcum/list-your-venue">List Your Venue</Link>
              </li>
              <li>
                <Link href="/global-santcum/host-a-retreat">Host A Retreat</Link>
              </li>
              <li>
                <Link href="/global-santcum/contact#press-media">Press &amp; Media</Link>
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
                <Link href="/global-santcum/the-wellness-edit">The Wellness Edit</Link>
              </li>
              <li>
                <Link href="/global-santcum/sanctum-journal">Sanctum Journal</Link>
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
                <Link href="/global-santcum/terms-and-conditions">Terms &amp; Conditions</Link>
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
          <p className="footer-copyright">© 2026 The Global Sanctum. All rights reserved.</p>
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
