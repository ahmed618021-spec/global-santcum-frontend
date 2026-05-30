"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const styles = `
:root {
  --warm-cream: #F7F5F1;
  --warm-white: #FDFCF9;
  --warm-linen: #F9F6F0;
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

.demo-page {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  padding: 40px 20px;
  background:
    linear-gradient(rgba(49,49,49,0.4), rgba(49,49,49,0.4)),
    #5a7a6a;
}
.demo-trigger {
  background: var(--charcoal); color: var(--white);
  font-family: var(--font-sans); font-size: 12px; font-weight: 500;
  letter-spacing: 0.15em; text-transform: uppercase;
  padding: 18px 36px; border: none; border-radius: 50px;
  cursor: pointer; transition: background 0.3s;
}
.demo-trigger:hover { background: var(--charcoal-70); }
.demo-note {
  position: fixed; bottom: 16px; left: 16px; right: 16px;
  text-align: center;
  font-family: var(--font-sans); font-size: 11px;
  color: var(--white); opacity: 0.6;
}

.thanks-modal-overlay {
  position: fixed; inset: 0; z-index: 1100;
  background: rgba(49,49,49,0.55);
  backdrop-filter: blur(2px);
  opacity: 0; visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;
}
.thanks-modal-overlay.active { opacity: 1; visibility: visible; }

.thanks-modal {
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
.thanks-modal.active { transform: translateX(0); }

.thanks-modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 36px;
  border-bottom: 1px solid var(--charcoal-08);
  flex-shrink: 0; background: var(--warm-white);
}
.thanks-modal-header-left { display: flex; align-items: center; gap: 12px; }
.thanks-modal-logo {
  width: 28px; height: 28px;
  border: 1px solid var(--gold-accent);
  transform: rotate(45deg); position: relative;
}
.thanks-modal-logo::after {
  content: ""; position: absolute; inset: 3px;
  border: 1px solid var(--gold-accent);
}
.thanks-modal-label {
  font-family: var(--font-sans); font-size: 10px;
  font-weight: 600; letter-spacing: 0.22em;
  text-transform: uppercase; color: var(--charcoal);
}
.thanks-modal-close {
  width: 40px; height: 40px; border-radius: 50%;
  border: 1px solid var(--charcoal-08); background: var(--warm-cream);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  font-size: 22px; line-height: 1; color: var(--charcoal-50);
  transition: all 0.25s; padding: 0;
}
.thanks-modal-close:hover { border-color: var(--charcoal-30); color: var(--charcoal); }
.thanks-modal-close:focus-visible { outline: 2px solid var(--gold-accent); outline-offset: 2px; }

.thanks-modal-body {
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
  animation: scaleIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s both;
}
.confirmation-icon svg {
  width: 32px; height: 32px; color: var(--charcoal);
  stroke-dasharray: 50; stroke-dashoffset: 50;
  animation: drawCheck 0.5s ease 0.5s forwards;
}
@keyframes scaleIn {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes drawCheck { to { stroke-dashoffset: 0; } }
@keyframes fadeUp {
  from { transform: translateY(12px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.confirmation-title {
  font-family: var(--font-serif); font-size: 36px; font-weight: 300;
  color: var(--charcoal); line-height: 1.15; margin-bottom: 12px;
  animation: fadeUp 0.5s ease 0.3s both;
  outline: none;
}
.confirmation-title em { font-style: italic; }
.confirmation-subtitle {
  font-family: var(--font-sans); font-size: 13px; font-weight: 300;
  color: var(--charcoal-70); line-height: 1.65; margin-bottom: 32px;
  animation: fadeUp 0.5s ease 0.5s both;
}

.confirmation-steps {
  text-align: left; background: var(--warm-cream);
  border-radius: 12px; padding: 24px;
  margin-bottom: 28px;
  animation: fadeUp 0.5s ease 0.7s both;
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

.confirmation-ref {
  font-family: var(--font-sans); font-size: 12px;
  color: var(--charcoal-30); margin-bottom: 28px;
  animation: fadeUp 0.5s ease 0.9s both;
}
.confirmation-ref strong { color: var(--charcoal-50); font-weight: 500; }

.confirmation-actions {
  display: flex; flex-direction: column; gap: 10px;
  margin-bottom: 28px;
  animation: fadeUp 0.5s ease 1s both;
}
.confirmation-btn-primary,
.confirmation-btn-secondary {
  font-family: var(--font-sans); font-size: 12px; font-weight: 500;
  letter-spacing: 0.15em; text-transform: uppercase;
  padding: 14px 32px; border-radius: 50px;
  text-decoration: none;
  transition: background 0.3s, border-color 0.3s;
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
  animation: fadeUp 0.5s ease 1.1s both;
}
.confirmation-contact p {
  font-family: var(--font-sans); font-size: 12px;
  color: var(--charcoal-50); line-height: 1.6;
}
.confirmation-contact a {
  color: var(--charcoal); text-decoration: none; font-weight: 500;
}

@media (prefers-reduced-motion: reduce) {
  .thanks-modal-overlay,
  .thanks-modal { transition: none !important; }
  .confirmation-icon,
  .confirmation-icon svg,
  .confirmation-title,
  .confirmation-subtitle,
  .confirmation-steps,
  .confirmation-ref,
  .confirmation-actions,
  .confirmation-contact { animation: none !important; }
  .confirmation-icon svg { stroke-dashoffset: 0 !important; }
}

@media (max-width: 768px) {
  .thanks-modal { width: 100vw; }
  .thanks-modal-header { padding: 16px 20px; }
  .thanks-modal-body { padding: 36px 20px 32px; }
  .thanks-modal-close { width: 44px; height: 44px; }
  .confirmation-btn-primary,
  .confirmation-btn-secondary { padding: 16px 32px; }
  .confirmation-title { font-size: 30px; }
  .confirmation-steps { padding: 20px; }
}
`;

type EnquiryStep = {
  icon: ReactNode;
  label: string;
  desc: string;
};

type TgsEnquiryThankYouModalProps = {
  label: string;
  subtitle: string;
  steps: EnquiryStep[];
  primaryHref: string;
  primaryLabel: string;
  refPrefix: string;
};

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

export const wellnessEnquiryThankYou = {
  label: "Wellness Enquiry",
  subtitle:
    "Thank you for your interest. Our concierge team has received your booking request and will confirm availability, session details, and next steps within 24 hours.",
  primaryHref: "/global-santcum/wellness-venues",
  primaryLabel: "Explore More Venues",
  refPrefix: "TGS-WE",
  steps: [
    {
      icon: <MailIcon />,
      label: "Confirmation email sent",
      desc: "Check your inbox for a copy of your enquiry details and your reference number. If it doesn't arrive within a few minutes, please check your spam or promotions folder.",
    },
    {
      icon: <PhoneIcon />,
      label: "We check availability with the venue",
      desc: "Our concierge team contacts the venue directly to confirm your preferred date, time, and service availability.",
    },
    {
      icon: <CheckIcon />,
      label: "Booking confirmation sent to you",
      desc: "Once the venue confirms, we'll send you a confirmed booking with full details, pricing, and everything you need for your visit.",
    },
  ],
};

export const retreatEnquiryThankYou = {
  label: "Retreat Enquiry",
  subtitle:
    "Thank you for your interest. Our concierge team has received your retreat enquiry and will be in touch within 24 hours to discuss your requirements and venue availability.",
  primaryHref: "/global-santcum/retreat-venues",
  primaryLabel: "Browse More Venues",
  refPrefix: "TGS-RE",
  steps: [
    {
      icon: <MailIcon />,
      label: "Confirmation email sent",
      desc: "Check your inbox for a copy of your enquiry details and your reference number. If it doesn't arrive within a few minutes, please check your spam or promotions folder.",
    },
    {
      icon: <PhoneIcon />,
      label: "Personal follow-up within 24 hours",
      desc: "A member of our concierge team will contact you to discuss dates, availability, and any specific needs for your retreat.",
    },
    {
      icon: <DocumentIcon />,
      label: "Venue proposal delivered",
      desc: "We'll coordinate with the venue on your behalf and send you a detailed proposal with pricing, availability, and everything you need to make a decision.",
    },
  ],
};

export function TgsWellnessEnquiryThankYouModal() {
  return <TgsEnquiryThankYouModal {...wellnessEnquiryThankYou} />;
}

export function TgsRetreatEnquiryThankYouModal() {
  return <TgsEnquiryThankYouModal {...retreatEnquiryThankYou} />;
}

export default function TgsEnquiryThankYouModal({
  label,
  subtitle,
  steps,
  primaryHref,
  primaryLabel,
  refPrefix,
}: TgsEnquiryThankYouModalProps) {
  const router = useRouter();
  const close = () => router.back();
  const open = true;
  const [reference] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }
    const params = new URLSearchParams(window.location.search);
    const rawRef = params.get("ref");
    return rawRef ? `${refPrefix}-${rawRef.slice(0, 8).toUpperCase()}` : "";
  });

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
    <main>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div
        className={`thanks-modal-overlay${open ? " active" : ""}`}
        id="thanksOverlay"
        aria-hidden="true"
        onClick={close}
      />

      <aside
        className={`thanks-modal${open ? " active" : ""}`}
        id="thanksModal"
        role="dialog"
        aria-modal="true"
        aria-label="Enquiry Received"
        aria-hidden={!open}
      >
        <header className="thanks-modal-header">
          <div className="thanks-modal-header-left">
            <span className="thanks-modal-logo" aria-hidden="true" />
            <span className="thanks-modal-label">{label}</span>
          </div>
          <button
            className="thanks-modal-close"
            id="thanksClose"
            type="button"
            aria-label="Close"
            onClick={close}
          >
            &times;
          </button>
        </header>

        <div className="thanks-modal-body">
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

          <h2 className="confirmation-title" id="confirmationTitle" tabIndex={-1}>
            Enquiry <em>Received</em>
          </h2>
          <p className="confirmation-subtitle">{subtitle}</p>

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

          {reference ? (
            <div className="confirmation-ref" id="confirmationRef">
              Your enquiry reference:{" "}
              <strong id="enquiryRefDisplay">{reference}</strong>
            </div>
          ) : (
            <div className="confirmation-ref" id="confirmationRef" hidden>
              Your enquiry reference: <strong id="enquiryRefDisplay">-</strong>
            </div>
          )}

          <div className="confirmation-actions">
            <Link href={primaryHref} className="confirmation-btn-primary">
              {primaryLabel}
            </Link>
            <Link href="/global-santcum/web" className="confirmation-btn-secondary">
              Return Home
            </Link>
          </div>

          <div className="confirmation-contact">
            <p>
              Questions in the meantime? Contact{" "}
              <a href="mailto:hello@theglobalsanctum.com">
                hello@theglobalsanctum.com
              </a>{" "}
              or <a href="tel:+61434777032">+61 434 777 032</a>
            </p>
          </div>
        </div>
      </aside>
    </main>
  );
}
