"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const styles = `
:root{
    --warm-white:#FDFCF9;
    --warm-cream:#F7F5F1;
    --charcoal:#313131;
    --warm-charcoal:#3A3A3A;
    --charcoal-80:rgba(49,49,49,0.8);
    --charcoal-70:rgba(49,49,49,0.7);
    --charcoal-50:rgba(49,49,49,0.5);
    --charcoal-30:rgba(49,49,49,0.3);
    --charcoal-15:rgba(49,49,49,0.15);
    --charcoal-10:rgba(49,49,49,0.1);
    --gold-accent:#C4A265;
    --gold-dark:#7A644F;
    --font-serif:'Cormorant Garamond',Georgia,serif;
    --font-sans:'Montserrat',sans-serif;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}

/* Skip to content — visible only on keyboard focus, off-screen otherwise */
.skip-to-content{position:absolute;top:-100px;left:16px;background:var(--charcoal);color:var(--warm-white);padding:12px 20px;z-index:9999;font-family:var(--font-sans);font-size:13px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;transition:top 0.2s}
.skip-to-content:focus{top:16px;outline:2px solid var(--gold-accent)}
        body{font-family:var(--font-serif);font-size:18px;font-weight:400;line-height:1.7;color:#3a3a3a;background:var(--warm-white);-webkit-font-smoothing:antialiased;
    overflow-x: hidden;
}
img{max-width:100%;height:auto;display:block}
a{color:inherit;text-decoration:none}

/* NAVIGATION */
/* ═══ NAVIGATION (standard pattern — transparent over hero, fades on scroll) ═══ */
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 24px 48px; background: linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0) 100%); backdrop-filter: blur(4px); border-bottom: 1px solid transparent; transition: background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease; }
.nav.nav--light, .nav.scrolled { background: rgba(253, 252, 249, 0.95); backdrop-filter: blur(8px); border-bottom: 1px solid var(--charcoal-08, rgba(49,49,49,0.08)); }
.nav-inner { max-width: 1400px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.nav-left { display: flex; align-items: center; gap: 14px; cursor: pointer; }
.nav-hamburger { display: flex; flex-direction: column; gap: 4px; background: transparent; border: none; padding: 0; cursor: pointer; color: inherit; }
.nav-hamburger:focus-visible { outline: 2px solid var(--gold-accent); outline-offset: 4px; }
.nav-hamburger span { width: 22px; height: 1px; background: var(--warm-white); transition: background 0.3s, transform 0.3s, opacity 0.3s; display: block; }
.nav.nav--light .nav-hamburger span, .nav.scrolled .nav-hamburger span { background: var(--charcoal); }
.nav-hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
.nav-hamburger.active span:nth-child(2) { opacity: 0; }
.nav-hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }
.nav-hamburger-label { font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--warm-white); transition: color 0.3s; }
.nav.nav--light .nav-hamburger-label, .nav.scrolled .nav-hamburger-label { color: var(--charcoal); }
.nav-logo-area { display: flex; align-items: center; gap: 14px; color: var(--warm-white); transition: color 0.3s; text-decoration: none; }
.nav.nav--light .nav-logo-area, .nav.scrolled .nav-logo-area { color: var(--charcoal); }
.nav-logo { width: 40px; height: 40px; border: 1px solid var(--gold-accent); transform: rotate(45deg); position: relative; }
.nav-logo::after { content: ""; position: absolute; inset: 4px; border: 1px solid var(--gold-accent); }
.nav-brand-text { font-family: var(--font-serif); font-size: 18px; font-weight: 400; letter-spacing: 0.32em; text-transform: uppercase; color: inherit; }
.nav-right { width: 80px; }

/* ═══ DRAWER ═══ */
.drawer-overlay { position: fixed; inset: 0; z-index: 998; background: rgba(49,49,49,0.45); backdrop-filter: blur(2px); opacity: 0; visibility: hidden; transition: opacity 0.4s ease, visibility 0.4s ease; }
.drawer-overlay.active { opacity: 1; visibility: visible; }
.drawer { position: fixed; top: 0; left: 0; width: 440px; max-width: 90vw; height: 100vh; background: var(--warm-white); z-index: 999; transform: translateX(-100%); transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1); display: flex; flex-direction: column; overflow: hidden; }
.drawer.active { transform: translateX(0); }
.drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 24px 36px; border-bottom: 1px solid var(--charcoal-08, rgba(49,49,49,0.08)); flex-shrink: 0; }
.drawer-header-left { display: flex; align-items: center; gap: 12px; }
.drawer-logo { width: 32px; height: 32px; border: 1px solid var(--gold-accent); transform: rotate(45deg); position: relative; }
.drawer-logo::after { content: ""; position: absolute; inset: 3px; border: 1px solid var(--gold-accent); }
.drawer-label { font-family: var(--font-sans); font-size: 10px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(49,49,49,0.5); }
.drawer-close { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--charcoal-08, rgba(49,49,49,0.08)); background: var(--warm-cream); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; color: rgba(49,49,49,0.5); transition: all 0.25s; }
.drawer-close:hover { border-color: rgba(49,49,49,0.3); color: var(--charcoal); }
.drawer-search { padding: 20px 36px; border-bottom: 1px solid var(--charcoal-08, rgba(49,49,49,0.08)); flex-shrink: 0; }
.drawer-search-bar { display: flex; align-items: center; gap: 10px; background: var(--warm-cream); border: 1px solid var(--charcoal-08, rgba(49,49,49,0.08)); border-radius: 50px; padding: 10px 18px; transition: border-color 0.2s; }
.drawer-search-bar:focus-within { border-color: rgba(49,49,49,0.3); }
.drawer-search-bar svg { width: 16px; height: 16px; color: rgba(49,49,49,0.3); flex-shrink: 0; }
.drawer-search-bar input { flex: 1; border: none; outline: none; background: transparent; font-family: var(--font-sans); font-size: 13px; color: var(--charcoal); }
.drawer-search-bar input::placeholder { color: rgba(49,49,49,0.3); }
.drawer-body { flex: 1; overflow-y: auto; padding: 28px 36px; }
.drawer-group { margin-bottom: 32px; }
.drawer-group:last-child { margin-bottom: 0; }
.drawer-group-label { font-family: var(--font-sans); font-size: 9px; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: var(--charcoal); margin-bottom: 12px; padding-left: 2px; }
.drawer-link { display: flex; align-items: center; justify-content: space-between; font-family: var(--font-serif); font-size: 26px; font-weight: 300; color: var(--charcoal); padding: 12px 0; border-bottom: 1px solid rgba(49,49,49,0.05); transition: color 0.3s, padding-left 0.3s; text-decoration: none; }
.drawer-link:last-child { border-bottom: none; }
.drawer-link:hover { color: rgba(49,49,49,0.7); padding-left: 6px; }
.drawer-link-arrow { font-size: 18px; color: rgba(49,49,49,0.15); transition: color 0.3s, transform 0.3s; }
.drawer-link:hover .drawer-link-arrow { color: rgba(49,49,49,0.5); transform: translateX(4px); }
.drawer-secondary-link { display: flex; align-items: center; gap: 10px; font-family: var(--font-serif); font-size: 26px; font-weight: 300; color: var(--charcoal); padding: 10px 0; transition: color 0.2s, padding-left 0.2s; text-decoration: none; }
.drawer-secondary-link:hover { color: rgba(49,49,49,0.7); padding-left: 4px; }
.drawer-cta { display: block; width: 100%; text-align: center; background: var(--charcoal); color: #FFFFFF; font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; padding: 16px 24px; transition: background 0.3s; margin-top: 8px; text-decoration: none; }
.drawer-cta:hover { background: #3A3A3A; }
.drawer-footer { padding: 24px 36px; border-top: 1px solid var(--charcoal-08, rgba(49,49,49,0.08)); background: var(--warm-cream); flex-shrink: 0; }
.drawer-footer-contact { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
.drawer-footer-item { display: flex; align-items: center; gap: 10px; font-family: var(--font-sans); font-size: 12px; color: rgba(49,49,49,0.5); transition: color 0.2s; text-decoration: none; }
.drawer-footer-item:hover { color: var(--charcoal); }
.drawer-footer-item svg { width: 14px; height: 14px; flex-shrink: 0; }
.drawer-social { display: flex; gap: 10px; }
.drawer-social a { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--charcoal-08, rgba(49,49,49,0.08)); display: flex; align-items: center; justify-content: center; color: rgba(49,49,49,0.5); font-family: var(--font-sans); font-size: 11px; font-weight: 500; transition: all 0.2s; text-decoration: none; }
.drawer-social a:hover { border-color: var(--charcoal); color: var(--charcoal); }

/* HERO */
.hero{position:relative;height:55vh;min-height:420px;display:flex;align-items:center;justify-content:center;text-align:center;color:var(--warm-white);overflow:hidden}
.hero-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&q=85') center/cover;z-index:1}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(58,58,58,0.35) 0%,rgba(58,58,58,0.5) 100%);z-index:2}
.hero-content{position:relative;z-index:3;max-width:920px;padding:0 40px}
.hero-eyebrow{font-family:var(--font-sans);font-size:10px;font-weight:400;letter-spacing:0.32em;text-transform:uppercase;color:var(--warm-white);margin-bottom:28px;opacity:0.92}
.hero-eyebrow::before{content:"";display:inline-block;width:36px;height:1px;background:var(--gold-accent);margin-right:18px;vertical-align:middle;margin-bottom:3px}
.hero-eyebrow::after{content:"";display:inline-block;width:36px;height:1px;background:var(--gold-accent);margin-left:18px;vertical-align:middle;margin-bottom:3px}
.hero-title{font-family:var(--font-serif);font-size:clamp(38px,5vw,56px);font-weight:300;line-height:1.15;letter-spacing:-0.005em;margin-bottom:24px}
.hero-title em{font-style:italic;font-weight:300}
.hero-subtitle{font-family:var(--font-serif);font-size:19px;font-weight:400;line-height:1.7;max-width:620px;margin:0 auto;opacity:0.94}

/* JOURNEY SECTIONS */
.journey{padding:90px 60px;background:var(--warm-white)}
.journey--cream{background:var(--warm-cream)}
.journey-inner{max-width:1280px;margin:0 auto}
.journey-header{text-align:center;margin-bottom:64px}
.journey-eyebrow{font-family:var(--font-sans);font-size:9px;font-weight:400;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold-dark);margin-bottom:20px}
.journey-eyebrow::before{content:"";display:inline-block;width:28px;height:1px;background:var(--gold-accent);margin-right:14px;vertical-align:middle;margin-bottom:3px}
.journey-eyebrow::after{content:"";display:inline-block;width:28px;height:1px;background:var(--gold-accent);margin-left:14px;vertical-align:middle;margin-bottom:3px}
.journey-title{font-family:var(--font-serif);font-size:clamp(32px,4vw,44px);font-weight:300;line-height:1.2;color:var(--charcoal);letter-spacing:-0.005em}
.journey-title em{font-style:italic;font-weight:400}
.journey-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.journey-card{background:var(--warm-white);padding:36px 22px 32px;text-align:center;border:1px solid var(--charcoal-10);transition:transform 0.4s ease,box-shadow 0.4s ease,border-color 0.4s ease}
.journey--cream .journey-card{background:var(--warm-white)}
.journey-card:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(49,49,49,0.06);border-color:var(--gold-accent)}
.journey-step{width:42px;height:42px;border-radius:50%;background:var(--charcoal);color:var(--warm-white);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-family:var(--font-serif);font-size:16px;font-style:italic;font-weight:400}
.journey-step-title{font-family:var(--font-serif);font-size:20px;font-weight:400;color:var(--charcoal);margin-bottom:14px;letter-spacing:0.005em}
.journey-step-text{font-family:var(--font-serif);font-size:15px;font-weight:400;line-height:1.65;color:#3a3a3a}

/* PER-SECTION CTAs (in journey sections) */
.journey-cta{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:56px}
.journey-cta-btn{display:inline-block;padding:14px 32px;font-family:var(--font-sans);font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;transition:all 0.3s ease;cursor:pointer;border:1px solid var(--charcoal);color:var(--charcoal);background:transparent}
.journey-cta-btn:hover{background:var(--charcoal);color:var(--warm-white)}
.journey-cta-btn--filled{background:var(--charcoal);color:var(--warm-white)}
.journey-cta-btn--filled:hover{background:transparent;color:var(--charcoal)}
.journey-cta-btn--gold{background:var(--gold-dark);color:var(--warm-white);border-color:var(--gold-dark)}
.journey-cta-btn--gold:hover{background:var(--charcoal);border-color:var(--charcoal)}

/* WHY SECTION (DARK) - matches Contact Us footer pattern exactly */
.why{padding:100px 60px;background:var(--warm-charcoal);color:rgba(255,255,255,0.7)}
.why-inner{max-width:1200px;margin:0 auto}
.why-header{text-align:center;margin-bottom:64px}
.why-eyebrow{font-family:var(--font-sans);font-size:9px;font-weight:400;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold-accent);margin-bottom:20px}
.why-eyebrow::before{content:"";display:inline-block;width:28px;height:1px;background:var(--gold-accent);margin-right:14px;vertical-align:middle;margin-bottom:3px}
.why-eyebrow::after{content:"";display:inline-block;width:28px;height:1px;background:var(--gold-accent);margin-left:14px;vertical-align:middle;margin-bottom:3px}
.why-title{font-family:var(--font-serif);font-size:clamp(32px,3.8vw,42px);font-weight:300;line-height:1.2;letter-spacing:-0.005em;color:rgba(255,255,255,0.9)}
.why-title em{font-style:italic;font-weight:400}
.why-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.why-card{padding:34px 32px;border:1px solid rgba(255,255,255,0.08);transition:border-color 0.4s ease}
.why-card:hover{border-color:var(--gold-accent)}
.why-card-title{font-family:var(--font-serif);font-size:22px;font-weight:400;margin-bottom:14px;letter-spacing:0.005em;color:rgba(255,255,255,0.9)}
.why-card-text{font-family:var(--font-serif);font-size:16px;font-weight:400;line-height:1.7;color:rgba(255,255,255,0.75)}

/* NEWSLETTER */
.newsletter{padding:90px 60px;background:var(--warm-cream);text-align:center}
.newsletter-eyebrow{font-family:var(--font-sans);font-size:9px;font-weight:400;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold-dark);margin-bottom:20px}
.newsletter-title{font-family:var(--font-serif);font-size:clamp(32px,3.8vw,42px);font-weight:300;color:var(--charcoal);margin-bottom:22px;letter-spacing:-0.005em}
.newsletter-text{font-family:var(--font-serif);font-size:16px;font-weight:400;line-height:1.7;color:#3a3a3a;max-width:600px;margin:0 auto 36px}
.newsletter-form{display:flex;gap:12px;max-width:520px;margin:0 auto;justify-content:center;flex-wrap:wrap}
.newsletter-input{flex:1;min-width:240px;padding:13px 18px;border:1px solid var(--charcoal-15);background:var(--warm-white);font-family:var(--font-sans);font-size:12px;color:var(--charcoal);outline:none;transition:border-color 0.3s ease}
.newsletter-input:focus{border-color:var(--gold-accent)}
.newsletter-input::placeholder{color:var(--charcoal-50);font-style:italic}
.newsletter-btn{padding:13px 30px;background:var(--charcoal);color:var(--warm-white);border:1px solid var(--charcoal);font-family:var(--font-sans);font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;cursor:pointer;transition:all 0.3s ease}
.newsletter-btn:hover{background:transparent;color:var(--charcoal)}

/* FOOTER - matches Contact Us mockup exactly */
.footer{background:var(--charcoal);color:rgba(255,255,255,0.7);padding:80px 48px 40px}
.footer-grid{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1.5fr repeat(4, 1fr);gap:48px;padding-bottom:56px;border-bottom:1px solid rgba(255,255,255,0.08)}
.footer-brand{display:flex;flex-direction:column;gap:20px}
.footer-logo-placeholder{width:72px;height:72px;border:2px dashed var(--gold-accent);border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(196, 162, 101, 0.08);flex-shrink:0}
.footer-logo-placeholder span{font-family:var(--font-sans);font-size:8px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:var(--gold-accent);text-align:center;line-height:1.3;padding:4px}
.footer-brand-name{font-family:var(--font-serif);font-size:18px;font-weight:400;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.9)}
.footer-brand-text{font-family:var(--font-serif);font-size:15px;font-weight:400;line-height:1.7;color:rgba(255,255,255,0.5)}
.footer-brand-meta{font-family:var(--font-sans);font-size:11px;font-weight:400;line-height:1.7;letter-spacing:0.05em;color:rgba(255,255,255,0.35)}
.footer-col-title{font-family:var(--font-sans);font-size:10px;font-weight:500;letter-spacing:0.20em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:24px}
.footer-links{list-style:none;display:flex;flex-direction:column;gap:14px}
.footer-links a{font-family:var(--font-serif);font-size:15px;font-weight:400;color:rgba(255,255,255,0.6);transition:color 0.3s}
.footer-links a:hover{color:rgba(255,255,255,0.95)}
.footer-bottom{max-width:1400px;margin:0 auto;padding-top:32px;display:flex;justify-content:space-between;align-items:center}
.footer-copyright{font-family:var(--font-sans);font-size:12px;font-weight:400;letter-spacing:0.05em;color:rgba(255,255,255,0.3)}
.footer-social{display:flex;gap:24px}
.footer-social a{font-family:var(--font-sans);font-size:11px;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.4);transition:color 0.3s ease}
.footer-social a:hover{color:var(--gold-accent)}

/* RESPONSIVE */
@media (max-width: 1024px){
    .nav{padding:24px 32px}
    .journey{padding:70px 32px}
    .journey-grid{grid-template-columns:repeat(2,1fr)}
    .why{padding:70px 32px}
    .cta{padding:70px 32px}
    .newsletter{padding:70px 32px}
}
@media (max-width: 1100px){
    .footer-grid{grid-template-columns:1fr 1fr 1fr;gap:40px}
}
@media (max-width: 768px){
    .nav{padding:20px 24px}
    .nav-right{display:none}
    .hero{height:auto;min-height:440px;padding:110px 24px 70px}
    .journey{padding:54px 24px}
    .journey-grid{grid-template-columns:1fr;gap:18px}
    .journey-header{margin-bottom:42px}
    .why{padding:54px 24px}
    .why-grid{grid-template-columns:1fr;gap:18px}
    .why-card{padding:28px 24px}
    .cta{padding:54px 24px}
    .newsletter{padding:54px 24px}
    .footer{padding:60px 24px 24px}
    .footer-grid{grid-template-columns:1fr;gap:32px}
    .footer-brand-text{max-width:none}
}
`;

export default function TgsHowItWorksPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const nav = document.getElementById("mainNav");
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!nav || !hero) return;
    const onScroll = () => {
      const heroBottom = hero.offsetTop + hero.offsetHeight - 80;
      setScrolled(window.scrollY > heroBottom);
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

  const toggleDrawer = () => setDrawerOpen((open) => !open);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* Skip-to-content link for keyboard and screen reader users */}
      <a className="skip-to-content" href="#main-content">
        Skip to main content
      </a>

      <nav
        className={`nav${scrolled ? " nav--light" : ""}`}
        id="mainNav"
        aria-label="Primary"
      >
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

      {/* ═══ DRAWER ═══ */}
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
          <button
            className="drawer-close"
            onClick={toggleDrawer}
            aria-label="Close menu"
            type="button"
          >
            &times;
          </button>
        </div>
        <div className="drawer-search">
          <div className="drawer-search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input type="text" placeholder="Search venues, experiences, locations..." />
          </div>
        </div>
        <div className="drawer-body">
          <div className="drawer-group">
            <div className="drawer-group-label">Discover</div>
            <Link href="/global-santcum/retreat-venues" className="drawer-link" onClick={closeDrawer}>
              Retreat Venues<span className="drawer-link-arrow">→</span>
            </Link>
            <Link href="/global-santcum/wellness-venues" className="drawer-link" onClick={closeDrawer}>
              Wellness Venues<span className="drawer-link-arrow">→</span>
            </Link>
            <Link href="/global-santcum/wellness-experiences" className="drawer-link" onClick={closeDrawer}>
              Wellness Experiences<span className="drawer-link-arrow">→</span>
            </Link>
          </div>
          <div className="drawer-group">
            <div className="drawer-group-label">Learn</div>
            <Link href="/global-santcum/about" className="drawer-secondary-link" onClick={closeDrawer}>
              About Us
            </Link>
            <Link href="/global-santcum/how-it-works" className="drawer-secondary-link" onClick={closeDrawer}>
              How It Works
            </Link>
            <Link href="/global-santcum/the-wellness-edit" className="drawer-secondary-link" onClick={closeDrawer}>
              The Wellness Edit
            </Link>
          </div>
          <div className="drawer-group">
            <div className="drawer-group-label">Connect</div>
            <Link href="/global-santcum/contact" className="drawer-secondary-link" onClick={closeDrawer}>
              Contact Us
            </Link>
            <Link href="/global-santcum/list-your-venue" className="drawer-secondary-link" onClick={closeDrawer}>
              List Your Venue
            </Link>
          </div>
          <div className="drawer-group">
            <Link href="/global-santcum/list-your-venue" className="drawer-cta" onClick={closeDrawer}>
              List Your Venue
            </Link>
          </div>
        </div>
        <div className="drawer-footer">
          <div className="drawer-footer-contact">
            <a className="email-link drawer-footer-item" href="mailto:hello@theglobalsanctum.com">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="email-text">hello@theglobalsanctum.com</span>
            </a>
          </div>
          <div className="drawer-social">
            <a href="https://www.facebook.com/profile.php?id=61577706717526" target="_blank" rel="noopener" aria-label="Facebook">
              Fb
            </a>
            <a href="https://www.instagram.com/theglobalsanctum/" target="_blank" rel="noopener" aria-label="Instagram">
              Ig
            </a>
            <a href="https://www.linkedin.com/company/the-global-sanctum/" target="_blank" rel="noopener" aria-label="LinkedIn">
              Li
            </a>
          </div>
        </div>
      </div>

      <main id="main-content" role="main">
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow">How It Works</p>
            <h1 className="hero-title">
              Your Journey with <em>The Global Sanctum</em>
            </h1>
            <p className="hero-subtitle">
              Discover how we connect wellness guests, retreat hosts, and venue owners with exceptional spaces worldwide. A seamless experience from discovery to booking.
            </p>
          </div>
        </section>

        <section className="journey">
          <div className="journey-inner">
            <div className="journey-header">
              <p className="journey-eyebrow">For Wellness Guests</p>
              <h2 className="journey-title">
                Find Your <em>Sanctuary</em>
              </h2>
            </div>
            <div className="journey-grid">
              <div className="journey-card">
                <div className="journey-step">1</div>
                <h3 className="journey-step-title">Discover</h3>
                <p className="journey-step-text">Browse our curated collection of wellness venues and retreat spaces. Filter by location, experience type, amenities, and more to find your perfect match.</p>
              </div>
              <div className="journey-card">
                <div className="journey-step">2</div>
                <h3 className="journey-step-title">Explore</h3>
                <p className="journey-step-text">View detailed venue profiles with high-resolution galleries, comprehensive facility information, services offered, and authentic reviews.</p>
              </div>
              <div className="journey-card">
                <div className="journey-step">3</div>
                <h3 className="journey-step-title">Connect</h3>
                <p className="journey-step-text">Reach out to venues through our platform. Ask questions, check availability, and discuss your specific needs with our concierge team.</p>
              </div>
              <div className="journey-card">
                <div className="journey-step">4</div>
                <h3 className="journey-step-title">Book</h3>
                <p className="journey-step-text">Reserve your experience with confidence. Secure payment, dedicated coordination, and flexible cancellation options.</p>
              </div>
            </div>
            <div className="journey-cta">
              <Link href="/global-santcum/wellness-venues" className="journey-cta-btn journey-cta-btn--filled">
                Browse Wellness Venues
              </Link>
              <Link href="/global-santcum/wellness-experiences" className="journey-cta-btn">
                Explore by Experience
              </Link>
            </div>
          </div>
        </section>

        <section className="journey journey--cream" id="retreat-hosts">
          <div className="journey-inner">
            <div className="journey-header">
              <p className="journey-eyebrow">For Retreat Hosts</p>
              <h2 className="journey-title">
                Host Your <em>Transformation</em>
              </h2>
            </div>
            <div className="journey-grid">
              <div className="journey-card">
                <div className="journey-step">1</div>
                <h3 className="journey-step-title">Search</h3>
                <p className="journey-step-text">Find the perfect venue for your retreat program. Filter by capacity, facilities, location, and specific wellness modalities.</p>
              </div>
              <div className="journey-card">
                <div className="journey-step">2</div>
                <h3 className="journey-step-title">Compare</h3>
                <p className="journey-step-text">Evaluate venues side by side. Review detailed information about spaces, accommodation, catering options, and past host reviews.</p>
              </div>
              <div className="journey-card">
                <div className="journey-step">3</div>
                <h3 className="journey-step-title">Enquire</h3>
                <p className="journey-step-text">Submit your retreat requirements. Our team works with you and the venue to coordinate dates, group size, and special arrangements.</p>
              </div>
              <div className="journey-card">
                <div className="journey-step">4</div>
                <h3 className="journey-step-title">Confirm</h3>
                <p className="journey-step-text">Secure your venue with a deposit. We handle the logistics so you can focus on creating an exceptional retreat experience.</p>
              </div>
            </div>
            <div className="journey-cta">
              <Link href="/global-santcum/retreat-venues" className="journey-cta-btn journey-cta-btn--filled">
                Browse Retreat Venues
              </Link>
              <Link href="/global-santcum/contact#bespoke" className="journey-cta-btn">
                Request a Bespoke Search
              </Link>
            </div>
          </div>
        </section>

        <section className="journey">
          <div className="journey-inner">
            <div className="journey-header">
              <p className="journey-eyebrow">For Venue Owners</p>
              <h2 className="journey-title">
                Showcase Your <em>Space</em>
              </h2>
            </div>
            <div className="journey-grid">
              <div className="journey-card">
                <div className="journey-step">1</div>
                <h3 className="journey-step-title">Apply</h3>
                <p className="journey-step-text">Submit your venue for review. We curate all listings to ensure quality and alignment with our wellness community.</p>
              </div>
              <div className="journey-card">
                <div className="journey-step">2</div>
                <h3 className="journey-step-title">Create</h3>
                <p className="journey-step-text">Build your comprehensive venue profile. Upload photos, describe your facilities, and highlight what makes your space unique.</p>
              </div>
              <div className="journey-card">
                <div className="journey-step">3</div>
                <h3 className="journey-step-title">Connect</h3>
                <p className="journey-step-text">Receive enquiries from qualified retreat hosts and wellness guests. Our platform facilitates direct communication.</p>
              </div>
              <div className="journey-card">
                <div className="journey-step">4</div>
                <h3 className="journey-step-title">Grow</h3>
                <p className="journey-step-text">Manage bookings through your dashboard. Track performance, update availability, and build your reputation in the wellness community.</p>
              </div>
            </div>
            <div className="journey-cta">
              <Link href="/global-santcum/list-your-venue" className="journey-cta-btn journey-cta-btn--gold">
                List Your Venue
              </Link>
              <Link href="/global-santcum/contact" className="journey-cta-btn">
                Speak With Our Team
              </Link>
            </div>
          </div>
        </section>

        <section className="why">
          <div className="why-inner">
            <div className="why-header">
              <p className="why-eyebrow">Our Difference</p>
              <h2 className="why-title">
                <em>Why</em> The Global Sanctum?
              </h2>
            </div>
            <div className="why-grid">
              <div className="why-card">
                <h3 className="why-card-title">Curated Excellence</h3>
                <p className="why-card-text">Every venue is personally reviewed. We prioritise quality over quantity, ensuring only exceptional spaces make it to our platform.</p>
              </div>
              <div className="why-card">
                <h3 className="why-card-title">Transparent Pricing</h3>
                <p className="why-card-text">No hidden fees. Clear commission structures. You always know exactly what you&apos;re paying for.</p>
              </div>
              <div className="why-card">
                <h3 className="why-card-title">Dedicated Support</h3>
                <p className="why-card-text">Our team is here to help at every step. From venue selection to booking confirmation, we&apos;ve got you covered.</p>
              </div>
              <div className="why-card">
                <h3 className="why-card-title">Community Driven</h3>
                <p className="why-card-text">Join a global network of wellness practitioners, retreat hosts, and seekers united by a passion for transformation.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="newsletter">
          <p className="newsletter-eyebrow">Stay Connected</p>
          <h2 className="newsletter-title">Join The Community</h2>
          <p className="newsletter-text">Featured venues, practitioner spotlights, wellness discoveries, and our global calendar of retreats. Curated for the Sanctum community, delivered weekly.</p>
          <form
            className="newsletter-form"
            id="newsletter-form-how-it-works"
            data-form-type="newsletter"
            noValidate
          >
            <input type="hidden" name="submissionId" defaultValue="" />
            <input type="hidden" name="source" defaultValue="how_it_works_footer" />
            {/* Honeypot — hidden from real users, bots auto-fill; non-empty = silent reject */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
              <label>
                Website (leave blank)
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <input
              type="email"
              className="newsletter-input"
              id="newsletter-email-how-it-works"
              name="email"
              placeholder="Your email address"
              required
              aria-label="Email address for newsletter signup"
              autoComplete="email"
            />
            {/* Cloudflare Turnstile mount — invisible widget, renders post-DNS-migration */}
            <div className="cf-turnstile" data-sitekey="REPLACE_WITH_PRODUCTION_SITEKEY" data-size="invisible" />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
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
            <a href="https://www.instagram.com/theglobalsanctum/" target="_blank" rel="noopener" aria-label="Instagram">
              Instagram
            </a>
            <a href="https://www.facebook.com/profile.php?id=61577706717526" target="_blank" rel="noopener" aria-label="Facebook">
              Facebook
            </a>
            <a href="https://www.linkedin.com/company/the-global-sanctum/" target="_blank" rel="noopener" aria-label="LinkedIn">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
