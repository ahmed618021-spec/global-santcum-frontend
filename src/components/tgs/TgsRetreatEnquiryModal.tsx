"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

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
    --error-border: #B03C32;
    --error-bg: rgba(176,60,50,0.06);
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

.enquiry-modal-overlay {
    position: fixed; inset: 0; z-index: 1100;
    background: rgba(49,49,49,0.55);
    backdrop-filter: blur(2px);
    opacity: 0; visibility: hidden;
    transition: opacity 0.4s ease, visibility 0.4s ease;
}
.enquiry-modal-overlay.active { opacity: 1; visibility: visible; }

.enquiry-modal {
    position: fixed; top: 0; right: 0;
    width: 560px; max-width: 100vw; height: 100vh;
    background: var(--warm-white); z-index: 1101;
    transform: translateX(100%);
    transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
    display: flex; flex-direction: column; overflow: hidden;
    box-shadow: -16px 0 60px rgba(49,49,49,0.12);
}
.enquiry-modal.active { transform: translateX(0); }

.enquiry-modal-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 36px;
    border-bottom: 1px solid var(--charcoal-08);
    flex-shrink: 0; background: var(--warm-white);
}
.enquiry-modal-header-left { display: flex; align-items: center; gap: 12px; }
.enquiry-modal-logo {
    width: 28px; height: 28px;
    border: 1px solid var(--gold-accent);
    transform: rotate(45deg); position: relative;
}
.enquiry-modal-logo::after {
    content: ""; position: absolute; inset: 3px;
    border: 1px solid var(--gold-accent);
}
.enquiry-modal-label {
    font-family: var(--font-sans); font-size: 10px;
    font-weight: 600; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--charcoal);
}
.enquiry-modal-close {
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid var(--charcoal-08); background: var(--warm-cream);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-size: 22px; line-height: 1; color: var(--charcoal-50);
    transition: all 0.25s; padding: 0;
}
.enquiry-modal-close:hover { border-color: var(--charcoal-30); color: var(--charcoal); }
.enquiry-modal-close:focus-visible { outline: 2px solid var(--gold-accent); outline-offset: 2px; }

.enquiry-modal-body {
    flex: 1; overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
.enquiry-state { padding: 32px 36px 40px; }
.enquiry-state[hidden] { display: none; }

.enquiry-intro { margin-bottom: 28px; }
.enquiry-eyebrow {
    font-family: var(--font-sans); font-size: 10px; font-weight: 600;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--gold-dark); margin-bottom: 10px;
}
.enquiry-title {
    font-family: var(--font-serif); font-size: 32px; font-weight: 300;
    color: var(--charcoal); line-height: 1.15; margin-bottom: 6px;
}
.enquiry-title em { font-style: italic; }
.enquiry-venue-meta {
    font-family: var(--font-sans); font-size: 12px; font-weight: 400;
    color: var(--charcoal-50); margin-bottom: 16px;
    letter-spacing: 0.02em;
}
.enquiry-venue-meta:empty { display: none; }
.enquiry-subtitle {
    font-family: var(--font-sans); font-size: 13px; font-weight: 300;
    color: var(--charcoal-70); line-height: 1.6;
}

.hp-trap {
    position: absolute !important;
    left: -9999px !important; top: -9999px !important;
    opacity: 0 !important; pointer-events: none !important;
    height: 0; width: 0; overflow: hidden;
}

.form-error {
    background: var(--error-bg);
    border-left: 3px solid var(--error-border);
    padding: 14px 16px; margin-bottom: 20px;
    font-family: var(--font-sans); font-size: 13px;
    color: var(--charcoal); line-height: 1.6;
    border-radius: 0 4px 4px 0;
    display: flex; align-items: flex-start; gap: 10px;
}
.form-error svg {
    width: 18px; height: 18px; color: var(--error-border);
    flex-shrink: 0; margin-top: 1px;
}
.form-error a {
    color: var(--charcoal); text-decoration: underline; font-weight: 500;
}
.form-error[hidden] { display: none; }

.form-section { margin-bottom: 28px; }
.form-section-label {
    font-family: var(--font-sans); font-size: 10px; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--charcoal); margin-bottom: 16px;
    padding-bottom: 8px; border-bottom: 1px solid var(--charcoal-08);
}
.form-row {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 12px; margin-bottom: 12px;
}
.form-row.full { grid-template-columns: 1fr; }
.form-field { display: flex; flex-direction: column; gap: 6px; }
.form-label {
    font-family: var(--font-sans); font-size: 12px; font-weight: 500;
    color: var(--charcoal);
}
.form-label .optional {
    font-weight: 300; color: var(--charcoal-30);
}
.form-input, .form-select, .form-textarea {
    font-family: var(--font-sans); font-size: 13px; font-weight: 400;
    color: var(--charcoal);
    background: var(--warm-cream);
    border: 1px solid var(--charcoal-08);
    border-radius: 6px; padding: 11px 14px;
    outline: none; transition: border-color 0.2s;
    width: 100%;
}
.form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: var(--charcoal-30);
}
.form-input::placeholder, .form-textarea::placeholder { color: var(--charcoal-30); }
.form-textarea { resize: vertical; min-height: 90px; line-height: 1.6; }
.form-select {
    cursor: pointer; -webkit-appearance: none; appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23313131' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 14px center;
    padding-right: 36px;
}

.form-fieldset {
    border: 0; padding: 0; margin: 0;
    min-width: 0;
    display: flex; flex-direction: column; gap: 6px;
}
.form-fieldset legend.form-label { padding: 0; display: block; }
.form-checkbox-group {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
    margin-top: 4px;
}
.form-checkbox {
    display: flex; align-items: center; gap: 10px;
    font-family: var(--font-sans); font-size: 12px; font-weight: 400;
    color: var(--charcoal-70); cursor: pointer;
}
.form-checkbox input[type="checkbox"] {
    width: 16px; height: 16px; border-radius: 3px;
    border: 1px solid var(--charcoal-15); appearance: none;
    background: var(--warm-cream); cursor: pointer;
    transition: all 0.2s; flex-shrink: 0;
}
.form-checkbox input[type="checkbox"]:checked {
    background: var(--charcoal); border-color: var(--charcoal);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
    background-size: 11px; background-position: center; background-repeat: no-repeat;
}

.form-submit-area {
    padding-top: 20px;
    border-top: 1px solid var(--charcoal-08);
}
.form-submit {
    background: var(--charcoal); color: var(--white);
    font-family: var(--font-sans); font-size: 12px; font-weight: 500;
    letter-spacing: 0.15em; text-transform: uppercase;
    padding: 15px 36px; border: none; border-radius: 50px;
    cursor: pointer; transition: background 0.3s;
    width: 100%; margin-bottom: 14px;
}
.form-submit:hover { background: var(--charcoal-70); }
.form-submit:disabled { background: var(--charcoal-30); cursor: not-allowed; }
.form-privacy {
    font-family: var(--font-sans); font-size: 11px; font-weight: 300;
    color: var(--charcoal-30); line-height: 1.55; text-align: center;
}
.form-privacy a { color: var(--charcoal-50); }

.form-input:focus-visible,
.form-select:focus-visible,
.form-textarea:focus-visible,
.form-checkbox input[type="checkbox"]:focus-visible,
.form-submit:focus-visible {
    outline: 2px solid var(--gold-accent);
    outline-offset: 2px;
}

.enquiry-state--thanks { text-align: center; padding-top: 48px; }
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
    margin-bottom: 28px;
    animation: fadeUp 0.5s ease 1s both;
}
.confirmation-btn-primary {
    background: var(--charcoal); color: var(--white);
    font-family: var(--font-sans); font-size: 12px; font-weight: 500;
    letter-spacing: 0.15em; text-transform: uppercase;
    padding: 14px 32px; border-radius: 50px;
    border: none; cursor: pointer; transition: background 0.3s;
}
.confirmation-btn-primary:hover { background: var(--charcoal-70); }
.confirmation-btn-primary:focus-visible { outline: 2px solid var(--gold-accent); outline-offset: 2px; }
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
    .enquiry-modal-overlay,
    .enquiry-modal { transition: none !important; }
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
    .enquiry-modal { width: 100vw; }
    .enquiry-state { padding: 24px 20px 32px; }
    .enquiry-modal-header { padding: 16px 20px; }
    .enquiry-title { font-size: 28px; }
    .form-row { grid-template-columns: 1fr; }
    .form-checkbox-group { grid-template-columns: 1fr; }
    .confirmation-title { font-size: 30px; }
    .confirmation-steps { padding: 20px; }
}
`;

const VENUE_CONTEXT = {
  venue_id: "santosa-retreat-coromandel",
  venue_name: "Santosa Retreat",
  venue_location: "Coromandel Peninsula, New Zealand",
  venue_type: "Dedicated Retreat Centre",
};

function todayString() {
  const t = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
}

export default function TgsRetreatEnquiryModal() {
  const router = useRouter();
  const pathname = usePathname();

  const slug = useMemo(() => {
    const match = pathname?.match(/\/global-santcum\/retreat-venues\/([^/]+)\/enquiry/);
    return match?.[1] || "santosa-retreat";
  }, [pathname]);

  const open = true;
  const formRef = useRef<HTMLFormElement>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  const venueMeta = useMemo(() => {
    const meta: string[] = [];
    if (VENUE_CONTEXT.venue_type) meta.push(VENUE_CONTEXT.venue_type);
    if (VENUE_CONTEXT.venue_location) meta.push(VENUE_CONTEXT.venue_location);
    return meta.join(" · ");
  }, []);

  const close = () => router.back();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/global-santcum/retreat-venues/${slug}/enquiry/thank-you`);
  }

  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div
        className={`enquiry-modal-overlay${open ? " active" : ""}`}
        aria-hidden="true"
        onClick={close}
      />

      <aside
        className={`enquiry-modal${open ? " active" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Retreat Enquiry"
        aria-hidden={!open}
      >
        <header className="enquiry-modal-header">
          <div className="enquiry-modal-header-left">
            <span className="enquiry-modal-logo" aria-hidden="true" />
            <span className="enquiry-modal-label">Retreat Enquiry</span>
          </div>
          <button
            className="enquiry-modal-close"
            type="button"
            aria-label="Close enquiry"
            onClick={close}
          >
            &times;
          </button>
        </header>

        <div className="enquiry-modal-body" ref={modalBodyRef}>
          <section className="enquiry-state enquiry-state--form">
            <div className="enquiry-intro">
              <p className="enquiry-eyebrow">Enquiring About</p>
              <h2 className="enquiry-title">
                <span>{VENUE_CONTEXT.venue_name}</span>
              </h2>
              <p className="enquiry-venue-meta">{venueMeta}</p>
              <p className="enquiry-subtitle">
                Tell us about your retreat and we&apos;ll handle the rest. Our concierge team
                personally coordinates every booking.
              </p>
            </div>

            <form ref={formRef} noValidate onSubmit={handleSubmit}>
              <label className="hp-trap" aria-hidden="true">
                Website (leave blank)
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>

              <input type="hidden" name="enquiry_type" defaultValue="retreat" />
              <input type="hidden" name="enquiry_source" defaultValue="retreat-enquiry-modal" />
              <input type="hidden" name="venue_id" defaultValue={VENUE_CONTEXT.venue_id} />
              <input type="hidden" name="venue_name" defaultValue={VENUE_CONTEXT.venue_name} />
              <input
                type="hidden"
                name="venue_location"
                defaultValue={VENUE_CONTEXT.venue_location}
              />
              <input type="hidden" name="venue_type" defaultValue={VENUE_CONTEXT.venue_type} />

              <div className="form-section">
                <h3 className="form-section-label">Your Details</h3>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="first_name"
                      className="form-input"
                      placeholder="First name"
                      required
                      autoComplete="given-name"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="last_name"
                      className="form-input"
                      placeholder="Last name"
                      required
                      autoComplete="family-name"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="you@email.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="phone">
                      Phone <span className="optional">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      placeholder="+61 400 000 000"
                      autoComplete="tel"
                    />
                  </div>
                </div>
                <div className="form-row full">
                  <div className="form-field">
                    <label className="form-label" htmlFor="enquirerType">
                      I am a...
                    </label>
                    <select
                      id="enquirerType"
                      name="enquirer_type"
                      className="form-select"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select your role
                      </option>
                      <option>Retreat Host</option>
                      <option>Yoga / Meditation Teacher</option>
                      <option>Wellness Practitioner</option>
                      <option>Corporate Event Planner</option>
                      <option>Travel Agent / Tour Operator</option>
                      <option>Individual Planning a Group Trip</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-label">Retreat Details</h3>
                <div className="form-row full">
                  <div className="form-field">
                    <label className="form-label" htmlFor="retreatName">
                      Retreat Name / Working Title <span className="optional">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="retreatName"
                      name="retreat_name"
                      className="form-input"
                      placeholder="e.g. Spring Renewal Yoga Retreat"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="retreatType">
                      Retreat Type
                    </label>
                    <select
                      id="retreatType"
                      name="retreat_type"
                      className="form-select"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select type
                      </option>
                      <option>Yoga</option>
                      <option>Meditation</option>
                      <option>Breathwork</option>
                      <option>Sound Healing</option>
                      <option>Wellness / Detox</option>
                      <option>Silent Retreat</option>
                      <option>Women&apos;s Retreat</option>
                      <option>Men&apos;s Retreat</option>
                      <option>Corporate / Leadership</option>
                      <option>Teacher Training</option>
                      <option>Creative / Arts</option>
                      <option>Fitness / Adventure</option>
                      <option>Couples</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="participants">
                      Number of Participants
                    </label>
                    <select
                      id="participants"
                      name="participants"
                      className="form-select"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select group size
                      </option>
                      <option>1 &ndash; 5</option>
                      <option>6 &ndash; 10</option>
                      <option>11 &ndash; 15</option>
                      <option>16 &ndash; 20</option>
                      <option>21 &ndash; 30</option>
                      <option>31 &ndash; 50</option>
                      <option>50+</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-label">Preferred Dates</h3>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="startDate">
                      Preferred Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="preferred_start_date"
                      className="form-input"
                      required
                      min={todayString()}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="nights">
                      Number of Nights
                    </label>
                    <select
                      id="nights"
                      name="nights"
                      className="form-select"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select duration
                      </option>
                      <option>2 nights</option>
                      <option>3 nights</option>
                      <option>4 nights</option>
                      <option>5 nights</option>
                      <option>6 nights</option>
                      <option>7 nights (1 week)</option>
                      <option>10 nights</option>
                      <option>14 nights (2 weeks)</option>
                      <option>21+ nights</option>
                    </select>
                  </div>
                </div>
                <div className="form-row full">
                  <div className="form-field">
                    <label className="form-label" htmlFor="dateFlexibility">
                      Date Flexibility
                    </label>
                    <select
                      id="dateFlexibility"
                      name="date_flexibility"
                      className="form-select"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        How flexible are your dates?
                      </option>
                      <option>Fixed dates &mdash; these are confirmed</option>
                      <option>Flexible &plusmn; 1 week</option>
                      <option>Flexible &plusmn; 1 month</option>
                      <option>Anytime within a season</option>
                      <option>Still exploring &mdash; no dates yet</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-label">Requirements</h3>
                <div className="form-row full">
                  <div className="form-field">
                    <label className="form-label" htmlFor="bookingType">
                      Booking Type
                    </label>
                    <select
                      id="bookingType"
                      name="booking_type"
                      className="form-select"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select preference
                      </option>
                      <option>Exclusive use &mdash; full venue buyout</option>
                      <option>Shared use &mdash; happy to share the venue with other groups</option>
                      <option>No preference</option>
                    </select>
                  </div>
                </div>
                <div className="form-row full">
                  <fieldset className="form-fieldset">
                    <legend className="form-label">
                      Key Spaces Needed <span className="optional">(select all that apply)</span>
                    </legend>
                    <div className="form-checkbox-group">
                      <label className="form-checkbox">
                        <input type="checkbox" name="space_yoga_shala" value="yes" /> Yoga Shala
                      </label>
                      <label className="form-checkbox">
                        <input type="checkbox" name="space_meditation_hall" value="yes" /> Meditation
                        Hall
                      </label>
                      <label className="form-checkbox">
                        <input type="checkbox" name="space_workshop_room" value="yes" /> Workshop Room
                      </label>
                      <label className="form-checkbox">
                        <input type="checkbox" name="space_ceremony" value="yes" /> Ceremony Space
                      </label>
                      <label className="form-checkbox">
                        <input type="checkbox" name="space_outdoor" value="yes" /> Outdoor Practice
                        Area
                      </label>
                      <label className="form-checkbox">
                        <input type="checkbox" name="space_pool" value="yes" /> Swimming Pool
                      </label>
                      <label className="form-checkbox">
                        <input type="checkbox" name="space_catering" value="yes" /> On-site Catering
                      </label>
                      <label className="form-checkbox">
                        <input type="checkbox" name="space_treatment_rooms" value="yes" /> Treatment
                        Rooms
                      </label>
                    </div>
                  </fieldset>
                </div>
                <div className="form-row full">
                  <div className="form-field">
                    <label className="form-label" htmlFor="budget">
                      Estimated Budget <span className="optional">(optional)</span>
                    </label>
                    <select id="budget" name="budget_aud" className="form-select" defaultValue="">
                      <option value="" disabled>
                        Select budget range per person per night
                      </option>
                      <option>Under $100</option>
                      <option>$100 &ndash; $200</option>
                      <option>$200 &ndash; $350</option>
                      <option>$350 &ndash; $500</option>
                      <option>$500+</option>
                      <option>Prefer to discuss</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-label">Anything Else</h3>
                <div className="form-row full">
                  <div className="form-field">
                    <label className="form-label" htmlFor="additionalNotes">
                      Tell us about your retreat vision, any special requirements, or questions{" "}
                      <span className="optional">(optional)</span>
                    </label>
                    <textarea
                      id="additionalNotes"
                      name="additional_notes"
                      className="form-textarea"
                      placeholder="Dietary needs, accessibility requirements, specific equipment, ceremony preferences, or anything else that would help us find the right fit..."
                      rows={4}
                    />
                  </div>
                </div>
                <div className="form-row full">
                  <div className="form-field">
                    <label className="form-label" htmlFor="referralSource">
                      How did you find us? <span className="optional">(optional)</span>
                    </label>
                    <select
                      id="referralSource"
                      name="referral_source"
                      className="form-select"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option>Google Search</option>
                      <option>Instagram</option>
                      <option>Facebook</option>
                      <option>Referral from a friend / colleague</option>
                      <option>Referral from a venue</option>
                      <option>Industry event / conference</option>
                      <option>The Wellness Edit (blog)</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-submit-area">
                <button type="submit" className="form-submit">
                  Submit Enquiry
                </button>
                <p className="form-privacy">
                  By submitting, you agree to our{" "}
                  <Link href="/global-santcum/legal#terms">Terms</Link> and{" "}
                  <Link href="/global-santcum/legal#privacy">Privacy Policy</Link>. We&apos;ll only
                  share your details with the venue you&apos;re enquiring about &mdash; we&apos;ll
                  never sell your information or pass it to marketing partners.
                </p>
              </div>
            </form>
          </section>
        </div>
      </aside>
    </main>
  );
}
