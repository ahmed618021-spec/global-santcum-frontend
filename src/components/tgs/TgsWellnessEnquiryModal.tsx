"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
    width: 560px; max-width: 100vw;
    height: 100vh;
    height: 100dvh;
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
    width: 40px; height: 40px; border-radius: 50%;
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
    color: var(--charcoal-50); margin-bottom: 4px;
    letter-spacing: 0.02em;
}
.enquiry-venue-meta:empty { display: none; }
.enquiry-service-line {
    font-family: var(--font-sans); font-size: 12px; font-weight: 500;
    color: var(--charcoal); margin-bottom: 16px;
    padding-top: 8px;
}
.enquiry-service-line[hidden] { display: none; }
.enquiry-service-line .service-label {
    color: var(--charcoal-50); font-weight: 400;
}
.enquiry-subtitle {
    font-family: var(--font-sans); font-size: 13px; font-weight: 300;
    color: var(--charcoal-70); line-height: 1.6;
    margin-top: 16px;
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
.form-note {
    font-family: var(--font-sans); font-size: 11px; font-weight: 300;
    color: var(--charcoal-30); line-height: 1.5; margin-top: 6px;
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
    .enquiry-modal-close { width: 44px; height: 44px; }
    .form-input, .form-select, .form-textarea { padding: 13px 14px; }
    .form-submit { padding: 16px 36px; }
    .enquiry-title { font-size: 28px; }
    .form-row { grid-template-columns: 1fr; }
    .confirmation-title { font-size: 30px; }
    .confirmation-steps { padding: 20px; }
}
`;

const venueContext: Record<string, string> = {
  venue_id: "therme-vals-switzerland",
  venue_name: "Therme Vals",
  venue_location: "Vals, Switzerland",
  venue_type: "Thermal Sanctuary",
  service_id: "contrast-therapy-90min",
  service_name: "Contrast Therapy",
  category: "thermal",
};

function todayString() {
  const t = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
}

export default function TgsWellnessEnquiryModal() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const slug = (() => {
    const match = pathname?.match(/\/wellness-venues\/([^/]+)\/enquiry/);
    return match ? match[1] : "serenity-day-spa";
  })();

  const ctx = venueContext;
  const meta = [ctx.venue_type, ctx.venue_location].filter(Boolean).join(" · ");
  const minDate = todayString();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    router.push(`/global-santcum/wellness-venues/${slug}/enquiry/thank-you`);
  };

  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="demo-page">
        <button
          type="button"
          className="demo-trigger"
          onClick={() => setOpen(true)}
        >
          Open Wellness Enquiry Modal
        </button>
        <p className="demo-note">
          Preview only. In production this modal opens from any element with{" "}
          <code>data-enquiry-trigger</code> on the wellness venue detail page.
        </p>
      </div>

      <div
        className={`enquiry-modal-overlay${open ? " active" : ""}`}
        id="enquiryOverlay"
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      <aside
        className={`enquiry-modal${open ? " active" : ""}`}
        id="enquiryModal"
        role="dialog"
        aria-modal="true"
        aria-label="Wellness Enquiry"
        aria-hidden={!open}
      >
        <header className="enquiry-modal-header">
          <div className="enquiry-modal-header-left">
            <span className="enquiry-modal-logo" aria-hidden="true" />
            <span className="enquiry-modal-label">Wellness Enquiry</span>
          </div>
          <button
            className="enquiry-modal-close"
            id="enquiryClose"
            type="button"
            aria-label="Close enquiry"
            ref={closeBtnRef}
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
        </header>

        <div className="enquiry-modal-body">
          <section className="enquiry-state enquiry-state--form" id="enquiryStateForm">
            <div className="enquiry-intro">
              <p className="enquiry-eyebrow">Enquiring About</p>
              <h2 className="enquiry-title">
                <span id="enquiryVenueName">{ctx.venue_name || "This Venue"}</span>
              </h2>
              <p className="enquiry-venue-meta" id="enquiryVenueMeta">
                {meta}
              </p>
              <p
                className="enquiry-service-line"
                id="enquiryServiceLine"
                hidden={!ctx.service_name}
              >
                <span className="service-label">Service:</span>{" "}
                <span id="enquiryServiceName">{ctx.service_name || "—"}</span>
              </p>
              <p className="enquiry-subtitle">
                Tell us what you&apos;re looking for and we&apos;ll handle the rest. Our
                concierge team personally coordinates every wellness booking &mdash; fill in
                what you know.
              </p>
            </div>

            <div className="form-error" id="formError" role="alert" aria-live="polite" hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>
                Sorry &mdash; there was a problem sending your enquiry. Please try again, or
                email <a href="mailto:hello@theglobalsanctum.com">hello@theglobalsanctum.com</a>.
              </span>
            </div>

            <form id="wellnessEnquiryForm" noValidate onSubmit={handleSubmit}>
              <label className="hp-trap" aria-hidden="true">
                Website (leave blank)
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>

              <input type="hidden" name="enquiry_type" value="wellness" />
              <input type="hidden" name="enquiry_source" value="wellness-enquiry-modal" />
              <input type="hidden" name="venue_id" id="hiddenVenueId" value={ctx.venue_id || ""} />
              <input type="hidden" name="venue_name" id="hiddenVenueName" value={ctx.venue_name || ""} />
              <input type="hidden" name="venue_location" id="hiddenVenueLocation" value={ctx.venue_location || ""} />
              <input type="hidden" name="venue_type" id="hiddenVenueType" value={ctx.venue_type || ""} />
              <input type="hidden" name="service_id" id="hiddenServiceId" value={ctx.service_id || ""} />
              <input type="hidden" name="service_name" id="hiddenServiceName" value={ctx.service_name || ""} />
              <input type="hidden" name="submissionId" id="submissionId" value="" readOnly />

              <div className="form-section">
                <h3 className="form-section-label">Your Details</h3>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="first_name" className="form-input" placeholder="First name" required autoComplete="given-name" />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="last_name" className="form-input" placeholder="Last name" required autoComplete="family-name" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" className="form-input" placeholder="you@email.com" required autoComplete="email" />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="phone">Phone <span className="optional">(optional)</span></label>
                    <input type="tel" id="phone" name="phone" className="form-input" placeholder="+61 or international" autoComplete="tel" />
                  </div>
                </div>
                <div className="form-row full">
                  <div className="form-field">
                    <label className="form-label" htmlFor="guestType">I am a...</label>
                    <select id="guestType" name="guest_type" className="form-select" required defaultValue="">
                      <option value="" disabled>Select</option>
                      <option value="individual">Individual guest</option>
                      <option value="couple">Couple</option>
                      <option value="small_group">Small group (friends / family)</option>
                      <option value="corporate">Corporate team</option>
                      <option value="agent">Travel agent / tour operator</option>
                      <option value="gift">Booking as a gift</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-label">Wellness Details</h3>
                <div className="form-row full">
                  <div className="form-field">
                    <label className="form-label" htmlFor="wellnessCategory">Wellness Category <span className="optional">(optional if pre-filled)</span></label>
                    <select id="wellnessCategory" name="wellness_category" className="form-select" defaultValue={ctx.category || ""}>
                      <option value="">Select a modality</option>
                      <option value="thermal">Thermal &amp; Hydrotherapy</option>
                      <option value="yoga">Yoga &amp; Movement</option>
                      <option value="breathwork">Breathwork</option>
                      <option value="sound">Sound &amp; Vibrational Healing</option>
                      <option value="ayurveda">Ayurveda</option>
                      <option value="bodywork">Body Therapies &amp; Bodywork</option>
                      <option value="meditation">Meditation &amp; Mindfulness</option>
                      <option value="modern">Modern Wellness &amp; Recovery</option>
                      <option value="skin">Skin &amp; Aesthetic Wellness</option>
                      <option value="nature">Nature Immersion</option>
                      <option value="energy">Energy &amp; Esoteric</option>
                      <option value="indigenous">Indigenous &amp; Earth Traditions</option>
                      <option value="nutrition">Nutrition &amp; Cleansing</option>
                      <option value="plant">Plant Medicine &amp; Ceremony</option>
                      <option value="notSure">Not sure yet &mdash; open to recommendations</option>
                    </select>
                  </div>
                </div>
                <div className="form-row full">
                  <div className="form-field">
                    <label className="form-label" htmlFor="serviceSelected">Select a Service <span className="optional">(optional if pre-filled)</span></label>
                    <select id="serviceSelected" name="service_selected" className="form-select" defaultValue={ctx.service_id || ""}>
                      <option value="">Select from available services</option>
                      <option value="__general__">&mdash; General enquiry, no specific service &mdash;</option>
                      {ctx.service_name && ctx.service_id ? (
                        <option value={ctx.service_id}>{ctx.service_name}</option>
                      ) : null}
                      <option value="massage">Massage &amp; Bodywork</option>
                      <option value="thermal">Thermal &amp; Hydrotherapy</option>
                      <option value="facial">Facial &amp; Skin Treatment</option>
                      <option value="float">Float Therapy</option>
                      <option value="sauna">Sauna &amp; Steam</option>
                      <option value="yoga">Yoga &amp; Movement</option>
                      <option value="sound">Sound Healing</option>
                      <option value="meditation">Meditation</option>
                      <option value="breathwork">Breathwork</option>
                      <option value="package">Wellness Package / Day Pass</option>
                      <option value="other">Other &mdash; see notes below</option>
                    </select>
                    <p className="form-note">Pre-fills automatically when booking from a specific service listing. Otherwise select the closest option or leave blank.</p>
                  </div>
                </div>
                <div className="form-row full">
                  <div className="form-field">
                    <label className="form-label" htmlFor="additionalServices">Additional Services or Experiences <span className="optional">(optional)</span></label>
                    <input type="text" id="additionalServices" name="additional_services" className="form-input" placeholder="e.g. Also interested in a sound bath and infrared sauna..." />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="guestCount">Number of Guests</label>
                    <select id="guestCount" name="guest_count" className="form-select" required defaultValue="">
                      <option value="" disabled>Select</option>
                      <option value="1">1 guest</option>
                      <option value="2">2 guests</option>
                      <option value="3-5">3 &ndash; 5 guests</option>
                      <option value="6-10">6 &ndash; 10 guests</option>
                      <option value="11-20">11 &ndash; 20 guests</option>
                      <option value="20+">20+ guests</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="sessionCount">Number of Sessions <span className="optional">(optional)</span></label>
                    <select id="sessionCount" name="session_count" className="form-select" defaultValue="">
                      <option value="">Select</option>
                      <option value="1">1 session</option>
                      <option value="2-3">2 &ndash; 3 sessions</option>
                      <option value="4-6">4 &ndash; 6 sessions</option>
                      <option value="package">Looking for a package</option>
                      <option value="residential">Residential stay with wellness</option>
                      <option value="notSure">Not sure yet</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-label">Preferred Dates &amp; Times</h3>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="preferredDate">Preferred Date</label>
                    <input type="date" id="preferredDate" name="preferred_date" className="form-input" required min={minDate} />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="preferredTime">Preferred Time <span className="optional">(optional)</span></label>
                    <select id="preferredTime" name="preferred_time" className="form-select" defaultValue="">
                      <option value="">No preference</option>
                      <option value="morning">Morning (before 12pm)</option>
                      <option value="midday">Midday (12pm &ndash; 2pm)</option>
                      <option value="afternoon">Afternoon (2pm &ndash; 5pm)</option>
                      <option value="evening">Evening (after 5pm)</option>
                    </select>
                  </div>
                </div>
                <div className="form-row full">
                  <div className="form-field">
                    <label className="form-label" htmlFor="dateFlexibility">Date &amp; Time Flexibility</label>
                    <select id="dateFlexibility" name="date_flexibility" className="form-select" required defaultValue="">
                      <option value="" disabled>How flexible are your dates?</option>
                      <option value="fixed">Fixed &mdash; these dates are confirmed</option>
                      <option value="plusMinus3">Flexible &plusmn; a few days</option>
                      <option value="plusMinusWeek">Flexible &plusmn; 1 week</option>
                      <option value="plusMinusMonth">Flexible within a month</option>
                      <option value="open">Open &mdash; anytime in the coming months</option>
                      <option value="exploring">Still exploring &mdash; no dates yet</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-label">Budget <span className="optional">(optional &mdash; leave blank if enquiring about a listed price)</span></h3>
                <div className="form-row full">
                  <div className="form-field">
                    <label className="form-label" htmlFor="budget">Approximate Budget per Person</label>
                    <select id="budget" name="budget" className="form-select" defaultValue="">
                      <option value="">Select approximate budget per person</option>
                      <option value="under100">Under $100 per session</option>
                      <option value="100-200">$100 &ndash; $200 per session</option>
                      <option value="200-350">$200 &ndash; $350 per session</option>
                      <option value="350plus">$350+ per session</option>
                      <option value="package">Looking for a package &mdash; budget flexible</option>
                      <option value="listed">Enquiring about a listed price</option>
                      <option value="discuss">Prefer to discuss</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-label">Anything Else</h3>
                <div className="form-row full">
                  <div className="form-field">
                    <label className="form-label" htmlFor="additionalNotes">Additional notes <span className="optional">(optional)</span></label>
                    <textarea id="additionalNotes" name="additional_notes" className="form-textarea" placeholder="Anything else we should know &mdash; health considerations, accessibility requirements, specific practitioners, special occasions, or any questions you have." rows={4} />
                  </div>
                </div>
                <div className="form-row full">
                  <div className="form-field">
                    <label className="form-label" htmlFor="referralSource">How did you find us? <span className="optional">(optional)</span></label>
                    <select id="referralSource" name="referral_source" className="form-select" defaultValue="">
                      <option value="">Select</option>
                      <option value="google">Google Search</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="friend">Referral from a friend / colleague</option>
                      <option value="venue">Referral from a venue</option>
                      <option value="event">Industry event / conference</option>
                      <option value="blog">The Wellness Edit (blog)</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-submit-area">
                <div className="cf-turnstile" data-sitekey="SITEKEY_PLACEHOLDER" data-callback="onTurnstileSuccess" data-size="invisible" />
                <button type="submit" className="form-submit" id="submitBtn" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit Enquiry"}
                </button>
                <p className="form-privacy">
                  By submitting, you agree to our{" "}
                  <Link href="/global-santcum/legal#terms">Terms</Link> and{" "}
                  <Link href="/global-santcum/legal#privacy">Privacy Policy</Link>. We&apos;ll
                  only share your details with the venue you&apos;re enquiring about &mdash;
                  we&apos;ll never sell your information or pass it to marketing partners.
                </p>
              </div>
            </form>
          </section>

          <section className="enquiry-state enquiry-state--thanks" id="enquiryStateThanks" hidden>
            <div className="confirmation-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2 className="confirmation-title" id="confirmationTitle" tabIndex={-1}>Enquiry <em>Received</em></h2>
            <p className="confirmation-subtitle">Thank you for your interest. Our concierge team has received your booking request and will confirm availability, session details, and next steps within 24 hours.</p>

            <div className="confirmation-steps">
              <h3 className="confirmation-steps-title">What Happens Next</h3>

              <div className="confirmation-step">
                <div className="step-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </div>
                <div className="step-content">
                  <div className="step-label">Confirmation email sent</div>
                  <div className="step-desc">Check your inbox for your enquiry details and reference. If it doesn&apos;t arrive within a few minutes, please check your spam folder.</div>
                </div>
              </div>

              <div className="confirmation-step">
                <div className="step-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </div>
                <div className="step-content">
                  <div className="step-label">We check availability with the venue</div>
                  <div className="step-desc">Our concierge team contacts the venue directly to confirm your preferred date, time, and service availability.</div>
                </div>
              </div>

              <div className="confirmation-step">
                <div className="step-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                </div>
                <div className="step-content">
                  <div className="step-label">Booking confirmation sent to you</div>
                  <div className="step-desc">Once the venue confirms, we&apos;ll send you a confirmed booking with full details, pricing, and everything you need for your visit.</div>
                </div>
              </div>
            </div>

            <div className="confirmation-ref" id="confirmationRef" hidden>
              Your enquiry reference: <strong id="enquiryRefDisplay">&mdash;</strong>
            </div>

            <div className="confirmation-actions">
              <button type="button" className="confirmation-btn-primary" onClick={() => setOpen(false)}>Continue Exploring</button>
            </div>

            <div className="confirmation-contact">
              <p>Questions in the meantime? Contact <a href="mailto:hello@theglobalsanctum.com">hello@theglobalsanctum.com</a> or <a href="tel:+61434777032">+61 434 777 032</a></p>
            </div>
          </section>
        </div>
      </aside>
    </main>
  );
}
