"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const styles = `
:root {
  --warm-cream: #F7F5F1;
  --warm-white: #FDFCF9;
  --charcoal: #313131;
  --charcoal-70: rgba(49,49,49,0.7);
  --charcoal-50: rgba(49,49,49,0.5);
  --charcoal-30: rgba(49,49,49,0.3);
  --charcoal-15: rgba(49,49,49,0.15);
  --charcoal-08: rgba(49,49,49,0.08);
  --gold-accent: #C4A265;
  --gold-dark: #7A644F;
  --white: #FFFFFF;
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Montserrat', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: var(--font-sans);
  color: var(--charcoal);
  background: var(--warm-white);
  -webkit-font-smoothing: antialiased;
}

.sj-thanks-page {
  min-height: 100vh;
  background: var(--warm-white);
  font-family: var(--font-sans);
  color: var(--charcoal);
}

.sj-thanks-overlay {
  position: fixed; inset: 0; z-index: 1100;
  background: rgba(49,49,49,0.55);
  backdrop-filter: blur(2px);
  opacity: 0; visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;
}
.sj-thanks-overlay.active { opacity: 1; visibility: visible; }

.sj-thanks-modal {
  position: fixed; top: 0; right: 0;
  width: 560px; max-width: 100vw;
  height: 100vh;
  height: 100dvh;
  background: var(--warm-white); z-index: 1101;
  transform: translateX(100%);
  transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  display: flex; flex-direction: column; overflow: hidden;
  box-shadow: -16px 0 60px rgba(49,49,49,0.12);
}
.sj-thanks-modal.active { transform: translateX(0); }

.sj-thanks-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 36px;
  border-bottom: 1px solid var(--charcoal-08);
  flex-shrink: 0; background: var(--warm-white);
}
.sj-thanks-header-left { display: flex; align-items: center; gap: 12px; }
.sj-thanks-logo {
  width: 28px; height: 28px;
  border: 1px solid var(--gold-accent);
  transform: rotate(45deg); position: relative;
}
.sj-thanks-logo::after {
  content: ""; position: absolute; inset: 3px;
  border: 1px solid var(--gold-accent);
}
.sj-thanks-label {
  font-family: var(--font-sans); font-size: 10px;
  font-weight: 600; letter-spacing: 0.22em;
  text-transform: uppercase; color: var(--charcoal);
}
.sj-thanks-close {
  width: 40px; height: 40px; border-radius: 50%;
  border: 1px solid var(--charcoal-08); background: var(--warm-cream);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  font-size: 22px; line-height: 1; color: var(--charcoal-50);
  transition: all 0.25s; padding: 0;
}
.sj-thanks-close:hover { border-color: var(--charcoal-30); color: var(--charcoal); }
.sj-thanks-close:focus-visible { outline: 2px solid var(--gold-accent); outline-offset: 2px; }

.sj-thanks-body {
  flex: 1; overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 48px 36px 40px;
  text-align: center;
}

.confirmation-icon {
  width: 72px; height: 72px; margin: 0 auto 28px;
  border-radius: 50%;
  border: 2px solid var(--charcoal);
  display: flex; align-items: center; justify-content: center;
}
.confirmation-icon svg {
  width: 32px; height: 32px; color: var(--charcoal);
}
.confirmation-eyebrow {
  font-family: var(--font-sans); font-size: 9px; font-weight: 600;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--gold-dark);
  margin-bottom: 12px;
}
.confirmation-title {
  font-family: var(--font-serif); font-size: 38px; font-weight: 300;
  color: var(--charcoal); line-height: 1.15; margin-bottom: 14px;
  outline: none;
}
.confirmation-title em { font-style: italic; }
.confirmation-subtitle {
  font-family: var(--font-sans); font-size: 13px; font-weight: 300;
  color: var(--charcoal-70); line-height: 1.7; margin-bottom: 32px;
  max-width: 440px; margin-left: auto; margin-right: auto;
}

.confirmation-steps {
  text-align: left; background: var(--warm-cream);
  border-radius: 12px; padding: 24px;
  margin-bottom: 28px;
}
.confirmation-steps-title {
  font-family: var(--font-sans); font-size: 10px; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--charcoal-50); margin-bottom: 18px;
}
.confirmation-step {
  display: flex; align-items: flex-start; gap: 12px;
  margin-bottom: 16px;
}
.confirmation-step:last-child { margin-bottom: 0; }
.step-icon {
  width: 32px; height: 32px; border-radius: 50%;
  border: 1px solid var(--charcoal-15);
  background: var(--warm-white);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.step-icon svg { width: 14px; height: 14px; color: var(--charcoal-50); }
.step-content { padding-top: 2px; }
.step-label {
  font-family: var(--font-sans); font-size: 12px; font-weight: 500;
  color: var(--charcoal); margin-bottom: 3px;
}
.step-desc {
  font-family: var(--font-sans); font-size: 11.5px; font-weight: 300;
  color: var(--charcoal-50); line-height: 1.55;
}

.confirmation-actions {
  display: flex; flex-direction: column; gap: 10px;
  margin-bottom: 28px;
}
.confirmation-btn-primary,
.confirmation-btn-secondary {
  font-family: var(--font-sans); font-size: 12px; font-weight: 500;
  letter-spacing: 0.15em; text-transform: uppercase;
  padding: 14px 32px; border-radius: 50px;
  text-decoration: none;
  transition: background 0.3s, border-color 0.3s, color 0.3s;
  display: inline-block;
}
.confirmation-btn-primary {
  background: var(--charcoal); color: var(--white);
  border: 1px solid var(--charcoal);
}
.confirmation-btn-primary:hover { background: var(--charcoal-70); border-color: var(--charcoal-70); }
.confirmation-btn-secondary {
  background: transparent; color: var(--charcoal);
  border: 1px solid var(--charcoal-15);
}
.confirmation-btn-secondary:hover { border-color: var(--charcoal-30); }
.confirmation-btn-primary:focus-visible,
.confirmation-btn-secondary:focus-visible {
  outline: 2px solid var(--gold-accent); outline-offset: 2px;
}

.confirmation-contact {
  padding-top: 24px;
  border-top: 1px solid var(--charcoal-08);
}
.confirmation-contact p {
  font-family: var(--font-sans); font-size: 12px;
  color: var(--charcoal-50); line-height: 1.6;
}
.confirmation-contact a {
  color: var(--charcoal); text-decoration: none; font-weight: 500;
}

@media (prefers-reduced-motion: reduce) {
  .sj-thanks-overlay,
  .sj-thanks-modal { transition: none !important; }
}

@media (max-width: 768px) {
  .sj-thanks-modal { width: 100vw; }
  .sj-thanks-header { padding: 16px 20px; }
  .sj-thanks-body { padding: 36px 20px 32px; }
  .sj-thanks-close { width: 44px; height: 44px; }
  .confirmation-btn-primary,
  .confirmation-btn-secondary { padding: 16px 32px; }
  .confirmation-title { font-size: 30px; }
  .confirmation-steps { padding: 20px; }
}
`;

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15 9 22 9 16.5 13.5 18.5 21 12 16.7 5.5 21 7.5 13.5 2 9 9 9 12 2" />
    </svg>
  );
}

const steps = [
  {
    icon: <MailIcon />,
    label: "Confirmation email sent",
    desc: "Check your inbox for a welcome from The Global Sanctum. If it doesn't arrive within a few minutes, please check your spam or promotions folder.",
  },
  {
    icon: <ClockIcon />,
    label: "Your first issue arrives soon",
    desc: "The Sanctum Journal is delivered monthly. Your first issue will appear in your inbox shortly after publication.",
  },
  {
    icon: <StarIcon />,
    label: "Reserved for the TGS community",
    desc: "Each issue is curated exclusively for our subscribers - venue introductions, host conversations, and editorial features not published elsewhere.",
  },
];

export default function TgsSanctumJournalThankYouModal() {
  const open = true;
  const router = useRouter();
  const close = () => router.back();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <main className="sj-thanks-page">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div
        className={`sj-thanks-overlay${open ? " active" : ""}`}
        id="sjThanksOverlay"
        aria-hidden="true"
        onClick={close}
      />

      <aside
        className={`sj-thanks-modal${open ? " active" : ""}`}
        id="sjThanksModal"
        role="dialog"
        aria-modal="true"
        aria-label="Subscription Confirmed"
        aria-hidden={!open}
      >
        <header className="sj-thanks-header">
          <div className="sj-thanks-header-left">
            <span className="sj-thanks-logo" aria-hidden="true" />
            <span className="sj-thanks-label">Sanctum Journal</span>
          </div>
          <button
            className="sj-thanks-close"
            id="sjThanksClose"
            type="button"
            aria-label="Close"
            onClick={close}
          >
            &times;
          </button>
        </header>

        <div className="sj-thanks-body">
          <div className="confirmation-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p className="confirmation-eyebrow">Subscription Confirmed</p>
          <h2 className="confirmation-title" id="confirmationTitle" tabIndex={-1}>
            Welcome to <em>The Sanctum Journal</em>
          </h2>
          <p className="confirmation-subtitle">
            Each month, we share new sanctuaries, host stories, and the quiet
            practices we&apos;ve gathered. Your first issue is on its way.
          </p>

          <div className="confirmation-steps">
            <h3 className="confirmation-steps-title">What Happens Next</h3>

            {steps.map((step) => (
              <div className="confirmation-step" key={step.label}>
                <div className="step-icon" aria-hidden="true">
                  {step.icon}
                </div>
                <div className="step-content">
                  <div className="step-label">{step.label}</div>
                  <div className="step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="confirmation-actions">
            <Link
              href="/global-santcum/the-wellness-edit"
              className="confirmation-btn-primary"
            >
              Read The Wellness Edit
            </Link>
            <Link href="/global-santcum/web" className="confirmation-btn-secondary">
              Return Home
            </Link>
          </div>

          <div className="confirmation-contact">
            <p>
              Questions about your subscription? Email{" "}
              <a href="mailto:hello@theglobalsanctum.com">
                hello@theglobalsanctum.com
              </a>
              .
            </p>
          </div>
        </div>
      </aside>
    </main>
  );
}
