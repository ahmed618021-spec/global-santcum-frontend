"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const styles = `
.cookie-banner {
  --charcoal: #313131;
  --warm-white: #FDFCF9;
  --warm-cream: #F7F5F1;
  --gold: #C4A265;
  --gold-dark: #7A644F;
  --mist: #8B8B8B;
  --light-rule: #E0D8CC;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--warm-cream);
  border-top: 2px solid var(--light-rule);
  padding: 20px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  font-family: 'Montserrat', sans-serif;
  animation: tgsCookieSlideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes tgsCookieSlideUp {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.cookie-banner.closing {
  transform: translateY(100%);
  opacity: 0;
  transition: transform 0.35s cubic-bezier(0.4, 0, 1, 1), opacity 0.3s;
  animation: none;
}

.cookie-left {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  min-width: 0;
}

.cookie-dot {
  width: 5px;
  height: 5px;
  background: var(--gold);
  border-radius: 50%;
  flex-shrink: 0;
}

.cookie-text {
  font-size: 11px;
  font-weight: 400;
  color: var(--charcoal);
  line-height: 1.7;
  margin: 0;
}

.cookie-text a {
  color: var(--gold-dark);
  text-decoration: none;
  border-bottom: 1px solid rgba(122, 100, 79, 0.3);
  transition: color 0.2s, border-color 0.2s;
}

.cookie-text a:hover {
  color: var(--charcoal);
  border-color: var(--charcoal);
}

.cookie-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.cookie-banner .btn-accept {
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--warm-white);
  background: var(--charcoal);
  border: 1px solid var(--charcoal);
  padding: 12px 24px;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.cookie-banner .btn-accept:hover { background: #1a1a1a; border-color: #1a1a1a; }

.cookie-banner .btn-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--light-rule);
  font-size: 20px;
  line-height: 1;
  padding: 4px;
  transition: color 0.2s;
  flex-shrink: 0;
}

.cookie-banner .btn-close:hover { color: var(--mist); }

@media (max-width: 768px) {
  .cookie-banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 24px;
    gap: 16px;
  }
  .cookie-actions { width: 100%; justify-content: space-between; }
}
`;

const CONSENT_COOKIE = "tgs_consent";

function hasConsent(): boolean {
  return document.cookie
    .split(";")
    .some((c) => c.trim().startsWith(`${CONSENT_COOKIE}=`));
}

function persistConsent(value: "accepted" | "essential", days: number): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${CONSENT_COOKIE}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export default function TgsCookieBanner() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (hasConsent()) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const dismiss = (value: "accepted" | "essential", days: number) => {
    persistConsent(value, days);
    setClosing(true);
    window.setTimeout(() => setVisible(false), 400);
  };

  if (!visible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div
        className={`cookie-banner${closing ? " closing" : ""}`}
        role="dialog"
        aria-label="Cookie consent"
        aria-live="polite"
      >
        <div className="cookie-left">
          <div className="cookie-dot" aria-hidden="true" />
          <p className="cookie-text">
            We use cookies to improve your experience on The Global Sanctum. By
            continuing to browse, you agree to our use of cookies as outlined in
            our{" "}
            <Link href="/global-santcum/terms-and-conditions">
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </div>

        <div className="cookie-actions">
          <button
            className="btn-accept"
            type="button"
            onClick={() => dismiss("accepted", 365)}
          >
            Accept All
          </button>
          <button
            className="btn-close"
            type="button"
            aria-label="Decline non-essential cookies"
            onClick={() => dismiss("essential", 30)}
          >
            &times;
          </button>
        </div>
      </div>
    </>
  );
}
