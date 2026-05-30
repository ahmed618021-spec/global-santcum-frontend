"use client";

import { useEffect, useState } from "react";

const styles = `
:root {
  --charcoal: #313131;
  --warm-white: #FDFCF9;
  --warm-cream: #F7F5F1;
  --gold: #C4A265;
  --gold-dark: #7A644F;
  --mist-grey: #8B8B8B;
  --light-rule: #E0D8CC;
  --divider: #CCCCCC;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Montserrat', sans-serif;
  background: #4a5a52;
  background-image: url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&q=80');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.trigger-btn {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.15);
  padding: 12px 24px;
  border-radius: 2px;
  cursor: pointer;
  backdrop-filter: blur(8px);
  z-index: 10;
  transition: all 0.2s;
}

.trigger-btn:hover {
  color: rgba(255,255,255,0.9);
  background: rgba(0,0,0,0.45);
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 26, 22, 0.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.overlay.active {
  opacity: 1;
  pointer-events: all;
}

.modal {
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  background: var(--warm-white);
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.2);
  transform: translateY(24px) scale(0.98);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease;
  opacity: 0;
  position: relative;
  max-height: 92vh;
  overflow-y: auto;
}

.overlay.active .modal {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.modal-image {
  position: relative;
  overflow: hidden;
  height: 240px;
  flex-shrink: 0;
  background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=90');
  background-size: cover;
  background-position: center;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  display: block;
  transform: scale(1.04);
  transition: transform 6s ease;
}

.overlay.active .modal-image img { transform: scale(1); }

.modal-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(49, 49, 49, 0.15) 0%,
    rgba(30, 30, 30, 0.35) 60%,
    rgba(20, 20, 20, 0.65) 100%
  );
}

.image-label {
  position: absolute;
  top: 24px;
  left: 28px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.image-label-eyebrow {
  font-family: 'Montserrat', sans-serif;
  font-size: 7.5px;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
}

.image-label-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  font-weight: 300;
  font-style: italic;
  color: rgba(255,255,255,0.95);
  line-height: 1.2;
}

.image-quote {
  position: absolute;
  bottom: 20px;
  left: 28px;
  right: 52px;
  z-index: 2;
}

.image-quote-mark {
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px;
  font-weight: 300;
  color: var(--gold);
  line-height: 0.6;
  margin-bottom: 8px;
  display: block;
  opacity: 0.75;
}

.image-quote-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  color: rgba(255,255,255,0.88);
  line-height: 1.55;
}

.modal-image::before { display: none; }

.modal-content {
  display: flex;
  flex-direction: column;
  padding: 36px 36px 32px;
  background: var(--warm-white);
  position: relative;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  color: rgba(255,255,255,0.85);
  transition: all 0.2s;
  z-index: 10;
  flex-shrink: 0;
}

.modal-close:hover {
  background: rgba(0,0,0,0.55);
  color: #fff;
}

.modal-close svg {
  width: 14px;
  height: 14px;
}

.modal-eyebrow {
  font-family: 'Montserrat', sans-serif;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold-dark);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-eyebrow::before {
  content: '';
  width: 24px;
  height: 1px;
  background: var(--gold);
  display: block;
  flex-shrink: 0;
}

.modal-heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: 34px;
  font-weight: 300;
  color: var(--charcoal);
  line-height: 1.2;
  margin-bottom: 8px;
}

.modal-heading em {
  font-style: italic;
  color: var(--gold-dark);
}

.modal-rule {
  width: 36px;
  height: 1px;
  background: var(--light-rule);
  margin: 18px 0;
}

.modal-desc {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 300;
  color: var(--mist-grey);
  line-height: 1.8;
  margin-bottom: 24px;
}

.modal-benefits {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
}

.modal-benefit {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.benefit-dot {
  width: 4px;
  height: 4px;
  background: var(--gold);
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
}

.benefit-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: var(--charcoal);
  line-height: 1.6;
}

.benefit-text strong {
  font-weight: 600;
  color: var(--charcoal);
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.form-input-wrap { position: relative; }

.modal-input {
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 300;
  color: var(--charcoal);
  background: var(--warm-cream);
  border: 1px solid var(--light-rule);
  border-radius: 2px;
  padding: 14px 16px;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}

.modal-input::placeholder {
  color: var(--mist-grey);
  font-style: italic;
}

.modal-input:focus {
  border-color: var(--gold);
  background: #fff;
}

.modal-submit {
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--warm-white);
  background: var(--charcoal);
  border: none;
  border-radius: 2px;
  padding: 16px 24px;
  cursor: pointer;
  transition: background 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.modal-submit:hover { background: #1a1a1a; }

.modal-submit svg {
  width: 12px;
  height: 12px;
  opacity: 0.7;
}

.modal-success {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px 0;
  gap: 12px;
}

.modal-success.visible { display: flex; }

.success-mark {
  font-family: 'Cormorant Garamond', serif;
  font-size: 40px;
  color: var(--gold);
  font-weight: 300;
  font-style: italic;
  line-height: 1;
}

.success-heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  font-weight: 300;
  color: var(--charcoal);
}

.success-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 300;
  color: var(--mist-grey);
  line-height: 1.7;
}

.modal-privacy {
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 300;
  color: var(--mist-grey);
  line-height: 1.6;
  text-align: center;
  opacity: 0.7;
}

.frequency-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: 8.5px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gold-dark);
  background: rgba(196, 162, 101, 0.08);
  border: 1px solid rgba(196, 162, 101, 0.2);
  padding: 5px 10px;
  border-radius: 2px;
  margin-bottom: 20px;
  align-self: flex-start;
}

.frequency-dot {
  width: 5px;
  height: 5px;
  background: var(--gold);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.7); }
}

@media (max-width: 600px) {
  .modal { max-width: 100%; }
  .modal-image { height: 200px; }
  .modal-content { padding: 28px 24px 24px; }
  .modal-heading { font-size: 26px; }
}
`;

const benefits = [
  [
    "Featured venues",
    "handpicked sanctuaries from our global collection, before they reach the platform",
  ],
  [
    "Practitioner spotlights",
    "the facilitators, healers and teachers shaping the wellness world",
  ],
  [
    "Wellness tourism trends",
    "where the industry is moving, the destinations rising, and the modalities gaining global momentum",
  ],
  [
    "Upcoming wellness events",
    "retreats, immersions, festivals, workshops and experiences from across the global wellness community",
  ],
  [
    "This month in wellness",
    "the conversations, shifts and insights shaping the retreat and wellness industry right now",
  ],
];

export default function TgsSanctumJournalSignupModal() {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const submit = () => {
    if (!email.trim() || !email.includes("@")) {
      setInvalid(true);
      return;
    }
    window.location.href = "/global-santcum/sanctum-journal/thank-you";
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <button className="trigger-btn" onClick={() => setOpen(true)} type="button">
        Open Journal Modal
      </button>

      <div
        className={`overlay${open ? " active" : ""}`}
        id="overlay"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setOpen(false);
          }
        }}
      >
        <div className="modal" id="modal">
          <div className="modal-image">
            <button
              className="modal-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=90"
              alt="Sanctum Journal"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
            <div className="image-label">
              <span className="image-label-eyebrow">The Global Sanctum</span>
              <span className="image-label-title">Sanctum Journal</span>
            </div>
            <div className="image-quote">
              <span className="image-quote-mark">&quot;</span>
              <p className="image-quote-text">
                Spaces where restoration isn&apos;t an afterthought - it&apos;s
                the foundation.
              </p>
            </div>
          </div>

          <div className="modal-content">
            <span className="modal-eyebrow">Weekly Curation</span>
            <h2 className="modal-heading">
              Where intention
              <br />
              meets <em>discovery.</em>
            </h2>
            <div className="modal-rule" />
            <p className="modal-desc">
              Join a community of retreat hosts, wellness seekers, and conscious
              explorers. Every month, directly to your inbox.
            </p>
            <div className="frequency-badge">
              <div className="frequency-dot" />
              Delivered every month
            </div>

            <div className="modal-benefits">
              {benefits.map(([title, text]) => (
                <div className="modal-benefit" key={title}>
                  <div className="benefit-dot" />
                  <span className="benefit-text">
                    <strong>{title}</strong> - {text}
                  </span>
                </div>
              ))}
            </div>

            <div id="formWrap">
              <div className="modal-form">
                <div className="form-input-wrap">
                  <input
                    className="modal-input"
                    type="email"
                    id="emailInput"
                    placeholder="Your email address"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setInvalid(false);
                    }}
                    style={{ borderColor: invalid ? "#c97a7a" : undefined }}
                  />
                </div>
                <button className="modal-submit" onClick={submit} type="button">
                  Join The Journal
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M4 10h12M10 4l6 6-6 6" />
                  </svg>
                </button>
              </div>
              <p className="modal-privacy">
                No noise. No selling your details. Unsubscribe anytime.
              </p>
            </div>

            <div className="modal-success" id="successState">
              <div className="success-mark">&#10022;</div>
              <h3 className="success-heading">Welcome to the community.</h3>
              <p className="success-text">
                Your first issue of the Sanctum Journal
                <br />
                arrives this month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
