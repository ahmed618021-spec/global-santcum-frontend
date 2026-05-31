"use client";

import { useState } from "react";
import Link from "next/link";

const styles = `
.empty-state {
  border: 1px solid #E0D8CC;
  background: #F7F5F1;
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Montserrat', sans-serif;
  color: #313131;
}

.empty-top {
  text-align: center;
  padding: 60px 80px 48px;
  border-bottom: 1px solid #E0D8CC;
}
.empty-rule { width: 36px; height: 1px; background: #C4A265; margin: 0 auto 28px; }
.empty-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 30px; font-weight: 300; color: #313131; line-height: 1.3; margin-bottom: 12px;
}
.empty-title em { font-style: italic; color: #7A644F; }
.empty-text {
  font-size: 12px; font-weight: 300; color: #8B8B8B; line-height: 1.85;
  max-width: 400px; margin: 0 auto 28px;
}
.empty-state .btn-browse {
  font-size: 9px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
  color: #313131; background: transparent; border: 1px solid rgba(49,49,49,0.25);
  padding: 12px 22px; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s;
}
.empty-state .btn-browse:hover { border-color: #313131; background: #313131; color: #FDFCF9; }

.empty-bottom { display: grid; grid-template-columns: 1fr 1fr; }
.empty-state .panel { padding: 40px 40px 48px; }
.empty-state .panel:first-child { border-right: 1px solid #E0D8CC; }
.panel-eyebrow {
  font-size: 8.5px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase;
  color: #C4A265; margin-bottom: 10px;
}
.panel-title {
  font-family: 'Cormorant Garamond', serif; font-size: 21px; font-weight: 400;
  color: #313131; line-height: 1.35; margin-bottom: 8px;
}
.panel-title em { font-style: italic; color: #7A644F; }
.panel-text { font-size: 11.5px; font-weight: 300; color: #8B8B8B; line-height: 1.8; margin-bottom: 24px; }

.form-field { margin-bottom: 10px; }
.empty-state .form-input,
.empty-state .form-select,
.empty-state .form-textarea {
  font-family: 'Montserrat', sans-serif; font-size: 11.5px; font-weight: 300; color: #313131;
  background: #FDFCF9; border: 1px solid #E0D8CC; padding: 11px 14px; width: 100%;
  outline: none; transition: border-color 0.2s; display: block;
}
.empty-state .form-input::placeholder,
.empty-state .form-textarea::placeholder { color: rgba(49,49,49,0.35); }
.empty-state .form-input:focus,
.empty-state .form-select:focus,
.empty-state .form-textarea:focus { border-color: #C4A265; }
.empty-state .form-select {
  appearance: none; cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23313131' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 12px center; background-color: #FDFCF9;
  padding-right: 32px; color: rgba(49,49,49,0.5);
}
.empty-state .form-select.has-value { color: #313131; }
.empty-state .form-textarea { min-height: 80px; resize: none; line-height: 1.7; }
.empty-state .form-submit {
  font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 2px;
  text-transform: uppercase; color: #FDFCF9; background: #313131; border: 1px solid #313131;
  padding: 13px 20px; width: 100%; cursor: pointer; margin-top: 4px; transition: background 0.2s;
}
.empty-state .form-submit:hover { background: #7A644F; border-color: #7A644F; }
.form-note { font-size: 10px; font-weight: 300; color: rgba(49,49,49,0.35); margin-top: 8px; }

.concierge-example { border-left: 2px solid #C4A265; padding: 12px 16px; background: #FDFCF9; margin-bottom: 20px; }
.concierge-example-label {
  font-size: 8.5px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
  color: rgba(49,49,49,0.4); margin-bottom: 5px;
}
.concierge-example-text {
  font-family: 'Cormorant Garamond', serif; font-size: 14px; font-style: italic; color: #313131; line-height: 1.6;
}

.form-success {
  padding: 16px; background: rgba(196,162,101,0.07); border: 1px solid rgba(196,162,101,0.3);
  border-left: 3px solid #C4A265; margin-top: 4px;
}
.form-success p { font-size: 11.5px; color: #7A644F; line-height: 1.65; }

.empty-state .form-input.error,
.empty-state .form-textarea.error,
.empty-state .form-select.error { border-color: #c0392b; }

@media (max-width: 720px) {
  .empty-top { padding: 44px 28px 36px; }
  .empty-bottom { grid-template-columns: 1fr; }
  .empty-state .panel:first-child { border-right: none; border-bottom: 1px solid #E0D8CC; }
  .empty-state .panel { padding: 32px 24px 36px; }
}
`;

const isEmail = (value: string) => value.trim() !== "" && value.includes("@");

export default function TgsVenueEmptyState() {
  // notify-me
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyError, setNotifyError] = useState(false);
  const [notifySent, setNotifySent] = useState(false);

  // bespoke concierge
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [venueType, setVenueType] = useState("");
  const [message, setMessage] = useState("");
  const [conciergeErrors, setConciergeErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [conciergeSent, setConciergeSent] = useState(false);

  const handleNotify = () => {
    if (!isEmail(notifyEmail)) {
      setNotifyError(true);
      return;
    }
    setNotifyError(false);
    setNotifySent(true);
  };

  const handleConcierge = () => {
    const errors = {
      name: name.trim() === "",
      email: !isEmail(email),
      message: message.trim() === "",
    };
    setConciergeErrors(errors);
    if (errors.name || errors.email || errors.message) return;
    setConciergeSent(true);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="empty-state" role="region" aria-label="No venues found">
        <div className="empty-top">
          <div className="empty-rule" aria-hidden="true" />
          <h3 className="empty-title">
            More venues and experiences <em>coming soon.</em>
          </h3>
          <p className="empty-text">
            We are actively curating exceptional spaces for this collection.
            Browse our full directory or let us help you find exactly what you
            need.
          </p>
          <Link href="/global-santcum/venues" className="btn-browse">
            Browse all venues →
          </Link>
        </div>

        <div className="empty-bottom">
          {/* LEFT — notify me */}
          <div className="panel">
            <div className="panel-eyebrow">Stay informed</div>
            <h4 className="panel-title">
              Notify me when <em>new spaces are added</em>
            </h4>
            <p className="panel-text">
              Leave your email and we&apos;ll let you know when new venues are
              added to this collection.
            </p>

            {notifySent ? (
              <div className="form-success" role="status">
                <p>
                  You&apos;re on the list — we&apos;ll be in touch when new
                  spaces are added.
                </p>
              </div>
            ) : (
              <div>
                <div className="form-field">
                  <input
                    type="email"
                    className={`form-input${notifyError ? " error" : ""}`}
                    placeholder="Your email address"
                    autoComplete="email"
                    aria-label="Your email address"
                    aria-invalid={notifyError}
                    value={notifyEmail}
                    onChange={(e) => {
                      setNotifyEmail(e.target.value);
                      if (notifyError) setNotifyError(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleNotify();
                    }}
                  />
                </div>
                <button
                  className="form-submit"
                  type="button"
                  onClick={handleNotify}
                >
                  Notify me
                </button>
                <p className="form-note">No spam. Unsubscribe at any time.</p>
              </div>
            )}
          </div>

          {/* RIGHT — bespoke search */}
          <div className="panel">
            <div className="panel-eyebrow">Bespoke search</div>
            <h4 className="panel-title">
              Looking for something <em>specific?</em>
            </h4>
            <p className="panel-text">
              Tell us what you need and our team will find the right space for
              you.
            </p>

            <div className="concierge-example">
              <div className="concierge-example-label">Example</div>
              <p className="concierge-example-text">
                &quot;A thermal bathhouse in regional Victoria with
                accommodation for a weekend group.&quot;
              </p>
            </div>

            {conciergeSent ? (
              <div className="form-success" role="status">
                <p>Thank you — our team will be in touch within 24 hours.</p>
              </div>
            ) : (
              <div>
                <div className="form-field">
                  <input
                    type="text"
                    className={`form-input${conciergeErrors.name ? " error" : ""}`}
                    placeholder="Your name"
                    autoComplete="name"
                    aria-label="Your name"
                    aria-invalid={conciergeErrors.name}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (conciergeErrors.name)
                        setConciergeErrors((p) => ({ ...p, name: false }));
                    }}
                  />
                </div>
                <div className="form-field">
                  <input
                    type="email"
                    className={`form-input${conciergeErrors.email ? " error" : ""}`}
                    placeholder="Your email"
                    autoComplete="email"
                    aria-label="Your email"
                    aria-invalid={conciergeErrors.email}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (conciergeErrors.email)
                        setConciergeErrors((p) => ({ ...p, email: false }));
                    }}
                  />
                </div>
                <div className="form-field">
                  <select
                    className={`form-select${venueType ? " has-value" : ""}`}
                    aria-label="Venue type"
                    value={venueType}
                    onChange={(e) => setVenueType(e.target.value)}
                  >
                    <option value="" disabled>
                      Venue type
                    </option>
                    <option value="retreat">Retreat Venue</option>
                    <option value="wellness">Wellness Venue</option>
                    <option value="both">Both / Not sure</option>
                  </select>
                </div>
                <div className="form-field">
                  <textarea
                    className={`form-textarea${conciergeErrors.message ? " error" : ""}`}
                    placeholder="Describe what you're looking for — location, experience, group size, dates..."
                    aria-label="Describe what you're looking for"
                    aria-invalid={conciergeErrors.message}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (conciergeErrors.message)
                        setConciergeErrors((p) => ({ ...p, message: false }));
                    }}
                  />
                </div>
                <button
                  className="form-submit"
                  type="button"
                  onClick={handleConcierge}
                >
                  Send enquiry →
                </button>
                <p className="form-note">We&apos;ll respond within 24 hours.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
