"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type BillingCycle = "yearly" | "monthly";
type StepName = "details" | "terms" | "stripe" | "confirm";

type SignupTrigger = {
  label: string;
  gold?: boolean;
  tier: string;
  tierName: string;
  track?: string;
  trackName?: string;
  free: boolean;
  trial?: boolean;
  commission: string;
  priceMonthly?: string;
  priceMonthlyId?: string;
  priceYearly?: string;
  priceYearlyId?: string;
  annualSaving?: string;
};

type SignupConfig = SignupTrigger & {
  billingCycle: BillingCycle | "";
  steps: StepName[];
  labels: string[];
  hasTrack: boolean;
  eyebrow: string;
  title: string;
  planDisplayName: string;
  banner?: string;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  venueName: string;
  venueType: string;
  country: string;
  website: string;
  description: string;
  honeypot: string;
};

const EMPTY_FORM: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  venueName: "",
  venueType: "",
  country: "",
  website: "",
  description: "",
  honeypot: "",
};

const COUNTRIES = [
  ["AU", "Australia"],
  ["NZ", "New Zealand"],
  ["US", "United States"],
  ["GB", "United Kingdom"],
  ["ID", "Indonesia"],
  ["TH", "Thailand"],
  ["JP", "Japan"],
  ["PT", "Portugal"],
  ["GR", "Greece"],
  ["MA", "Morocco"],
  ["CR", "Costa Rica"],
  ["DE", "Germany"],
  ["FR", "France"],
  ["IT", "Italy"],
  ["ES", "Spain"],
  ["NL", "Netherlands"],
  ["CH", "Switzerland"],
  ["AT", "Austria"],
  ["SE", "Sweden"],
  ["NO", "Norway"],
  ["DK", "Denmark"],
  ["FI", "Finland"],
  ["BE", "Belgium"],
  ["IE", "Ireland"],
  ["IN", "India"],
  ["SG", "Singapore"],
  ["ZA", "South Africa"],
  ["MX", "Mexico"],
  ["BR", "Brazil"],
  ["other", "Other"],
];

const TRIGGERS: Array<{ label: string; items: SignupTrigger[] }> = [
  {
    label: "Free tier (no track variant - Essentials is shared across all programmes)",
    items: [
      {
        label: "Essentials - Free",
        tier: "essentials",
        tierName: "Essentials",
        free: true,
        commission: "20% per booking",
      },
    ],
  },
  {
    label: "Founding Partner pricing - 60% off subscription, lifetime (currently active programme)",
    items: [
      {
        label: "Founding · Standard",
        gold: true,
        tier: "standard",
        tierName: "Standard",
        track: "founding",
        trackName: "Founding Partner",
        free: false,
        trial: true,
        commission: "10% per booking",
        priceMonthly: "$19.60/month",
        priceMonthlyId: "price_FND_STD_M_REPLACE",
        priceYearly: "$196/year",
        priceYearlyId: "price_FND_STD_Y_REPLACE",
        annualSaving: "Save $39.20",
      },
      {
        label: "Founding · Featured",
        gold: true,
        tier: "featured",
        tierName: "Featured",
        track: "founding",
        trackName: "Founding Partner",
        free: false,
        trial: true,
        commission: "7% per booking",
        priceMonthly: "$39.60/month",
        priceMonthlyId: "price_FND_FEA_M_REPLACE",
        priceYearly: "$396/year",
        priceYearlyId: "price_FND_FEA_Y_REPLACE",
        annualSaving: "Save $79.20",
      },
      {
        label: "Founding · Premium",
        gold: true,
        tier: "premium",
        tierName: "Premium",
        track: "founding",
        trackName: "Founding Partner",
        free: false,
        trial: true,
        commission: "5% per booking",
        priceMonthly: "$79.60/month",
        priceMonthlyId: "price_FND_PRE_M_REPLACE",
        priceYearly: "$796/year",
        priceYearlyId: "price_FND_PRE_Y_REPLACE",
        annualSaving: "Save $159.20",
      },
    ],
  },
  {
    label: "Launch Partner pricing - 40% off subscription, lifetime (next programme)",
    items: [
      {
        label: "Launch · Standard",
        gold: true,
        tier: "standard",
        tierName: "Standard",
        track: "launch",
        trackName: "Launch Partner",
        free: false,
        trial: true,
        commission: "10% per booking",
        priceMonthly: "$29.40/month",
        priceMonthlyId: "price_LCH_STD_M_REPLACE",
        priceYearly: "$294/year",
        priceYearlyId: "price_LCH_STD_Y_REPLACE",
        annualSaving: "Save $58.80",
      },
      {
        label: "Launch · Featured",
        gold: true,
        tier: "featured",
        tierName: "Featured",
        track: "launch",
        trackName: "Launch Partner",
        free: false,
        trial: true,
        commission: "7% per booking",
        priceMonthly: "$59.40/month",
        priceMonthlyId: "price_LCH_FEA_M_REPLACE",
        priceYearly: "$594/year",
        priceYearlyId: "price_LCH_FEA_Y_REPLACE",
        annualSaving: "Save $118.80",
      },
      {
        label: "Launch · Premium",
        gold: true,
        tier: "premium",
        tierName: "Premium",
        track: "launch",
        trackName: "Launch Partner",
        free: false,
        trial: true,
        commission: "5% per booking",
        priceMonthly: "$119.40/month",
        priceMonthlyId: "price_LCH_PRE_M_REPLACE",
        priceYearly: "$1,194/year",
        priceYearlyId: "price_LCH_PRE_Y_REPLACE",
        annualSaving: "Save $238.80",
      },
    ],
  },
  {
    label: "Standard pricing - full price (post-launch programme)",
    items: [
      {
        label: "Standard",
        tier: "standard",
        tierName: "Standard",
        free: false,
        trial: true,
        commission: "10% per booking",
        priceMonthly: "$49/month",
        priceMonthlyId: "price_STD_STD_M_REPLACE",
        priceYearly: "$490/year",
        priceYearlyId: "price_STD_STD_Y_REPLACE",
        annualSaving: "Save $98",
      },
      {
        label: "Featured",
        tier: "featured",
        tierName: "Featured",
        free: false,
        trial: true,
        commission: "7% per booking",
        priceMonthly: "$99/month",
        priceMonthlyId: "price_STD_FEA_M_REPLACE",
        priceYearly: "$990/year",
        priceYearlyId: "price_STD_FEA_Y_REPLACE",
        annualSaving: "Save $198",
      },
      {
        label: "Premium",
        tier: "premium",
        tierName: "Premium",
        free: false,
        trial: true,
        commission: "5% per booking",
        priceMonthly: "$199/month",
        priceMonthlyId: "price_STD_PRE_M_REPLACE",
        priceYearly: "$1,990/year",
        priceYearlyId: "price_STD_PRE_Y_REPLACE",
        annualSaving: "Save $398",
      },
    ],
  },
];

function createConfig(trigger: SignupTrigger, billingCycle: BillingCycle): SignupConfig {
  const hasTrack = Boolean(trigger.track && trigger.trackName);
  const steps: StepName[] = trigger.free ? ["details", "terms", "confirm"] : ["details", "terms", "stripe"];
  const pct = trigger.track === "founding" ? "60% off" : trigger.track === "launch" ? "40% off" : "";

  return {
    ...trigger,
    billingCycle: trigger.free ? "" : billingCycle,
    steps,
    labels: trigger.free ? ["Your Details", "Agreement", "Confirmed"] : ["Your Details", "Agreement", "Payment"],
    hasTrack,
    eyebrow: hasTrack ? trigger.trackName || "" : `${trigger.tierName} Plan`,
    title: trigger.free ? "Get Started Free" : "List Your Venue",
    planDisplayName: hasTrack ? `${trigger.tierName} · ${trigger.trackName}` : trigger.tierName,
    banner: hasTrack ? `${trigger.trackName} - ${pct ? `${pct}, for life` : "lifetime pricing"}` : undefined,
  };
}

function createSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function trackEvent(event: string, cfg: SignupConfig | null, submissionId: string, extra: Record<string, unknown> = {}) {
  const maybeWindow = window as Window & {
    tgsTrackOnce?: (eventName: string, payload: Record<string, unknown>) => void;
  };
  maybeWindow.tgsTrackOnce?.(event, {
    submissionId,
    form_name: "venue_signup",
    tier: cfg?.tier || "",
    track: cfg?.track || "standard",
    ...extra,
  });
}

export default function TgsVenueSignupModal() {
  const router = useRouter();
  const [billingCycle] = useState<BillingCycle>("yearly");
  const [open, setOpen] = useState(true);
  const [cfg] = useState<SignupConfig>(() => createConfig(TRIGGERS[0].items[0], "yearly"));
  const [stepIdx, setStepIdx] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submissionId] = useState(() => createSubmissionId());
  const [formError, setFormError] = useState("");
  const [termsScrolled, setTermsScrolled] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [gdprAccepted, setGdprAccepted] = useState(false);

  const stepName = cfg.steps[stepIdx];
  const canContinue = stepName !== "terms" || (termsScrolled && termsAccepted && gdprAccepted);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    trackEvent("signup_form_view", cfg, submissionId);
    trackEvent("signup_step_view", cfg, submissionId, { step: stepName, step_index: stepIdx + 1 });
  }, [cfg, stepIdx, stepName, submissionId]);

  useEffect(() => {
    const maybeWindow = window as Window & { tgsPageBillingCycle?: BillingCycle };
    maybeWindow.tgsPageBillingCycle = billingCycle;
  }, [billingCycle]);

  const footerLabel = useMemo(() => {
    if (stepName === "terms") return "I Agree & Continue \u2192";
    if (stepName === "stripe") return "Proceed to Secure Payment \u2192";
    if (stepName === "confirm") return "Close";
    return "Continue \u2192";
  }, [stepName]);

  function closeModal(force = false) {
    if (!force && stepIdx > 0 && stepName !== "confirm" && !window.confirm("Close this signup? Your progress will be lost.")) {
      return;
    }
    setOpen(false);
    router.back();
  }

  function validateDetails() {
    if (form.honeypot.trim()) {
      if (cfg.steps.includes("confirm")) setStepIdx(cfg.steps.length - 1);
      else closeModal(true);
      return false;
    }

    const missing: string[] = [];
    if (!form.firstName.trim()) missing.push("First name");
    if (!form.lastName.trim()) missing.push("Last name");
    if (!form.email.trim()) missing.push("Email");
    if (!form.phone.trim()) missing.push("Phone");
    if (!form.venueName.trim()) missing.push("Venue name");
    if (!form.venueType.trim()) missing.push("Venue type");
    if (!form.country.trim()) missing.push("Country");
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) missing.push("Email (invalid format)");

    if (missing.length) {
      setFormError(`Please complete: ${missing.join(", ")}.`);
      return false;
    }
    setFormError("");
    return true;
  }

  function nextStep() {
    if (stepName === "details") {
      if (!validateDetails()) return;
      trackEvent("signup_details_submit", cfg, submissionId, { step: "details" });
    }

    if (stepName === "terms") {
      if (!canContinue) return;
      trackEvent("signup_terms_accepted", cfg, submissionId, { step: "terms" });
    }

    if (stepName === "stripe") {
      const priceId = cfg.billingCycle === "yearly" ? cfg.priceYearlyId : cfg.priceMonthlyId;
      trackEvent("signup_payment_initiated", cfg, submissionId, {
        step: "stripe",
        billing_cycle: cfg.billingCycle,
        price_id: priceId,
      });
      const maybeWindow = window as Window & {
        tgsStripeHandoff?: (payload: Record<string, unknown>) => void;
      };
      if (maybeWindow.tgsStripeHandoff && priceId) {
        maybeWindow.tgsStripeHandoff({
          price_id: priceId,
          billing_cycle: cfg.billingCycle,
          tier: cfg.tier,
          track: cfg.track,
          formData: form,
          submissionId,
          trial: cfg.trial,
        });
      } else {
        alert(
          `[PREVIEW] Stripe Checkout would open now.\nprice_id: ${priceId || "MISSING"}\nbilling_cycle: ${cfg.billingCycle}\ntier: ${cfg.tier}\ntrack: ${cfg.track || "(standard)"}\nsubmissionId: ${submissionId}`,
        );
      }
      return;
    }

    if (stepName === "confirm") {
      closeModal(true);
      return;
    }

    setStepIdx((current) => Math.min(current + 1, cfg.steps.length - 1));
    setTermsScrolled(false);
    setTermsAccepted(false);
    setGdprAccepted(false);
  }

  function prevStep() {
    setStepIdx((current) => Math.max(current - 1, 0));
  }

  return (
    <>
      <style>{venueSignupStyles}</style>
      <main />

      <div
        aria-hidden={!open}
        className={`signup-modal-overlay ${open ? "active" : ""}`}
        onClick={() => closeModal()}
      />
      <aside
        aria-hidden={!open}
        aria-label="Venue Subscription"
        aria-modal="true"
        className={`signup-modal ${open ? "active" : ""}`}
        role="dialog"
      >
        <header className="signup-modal-header">
          <div className="signup-modal-header-left">
            <span aria-hidden="true" className="signup-modal-logo" />
            <div className="signup-modal-label-wrap">
              <span className="signup-modal-eyebrow">{cfg.eyebrow}</span>
              <span className="signup-modal-label">{cfg.title}</span>
            </div>
          </div>
          <button aria-label="Close" className="signup-modal-close" onClick={() => closeModal()} type="button">
            &times;
          </button>
        </header>

        <nav aria-label="Signup progress" className="signup-progress">
          {cfg.labels.map((label, index) => {
            const done = index < stepIdx;
            const active = index === stepIdx;
            return (
              <div className="progress-fragment" key={label}>
                <div className="progress-step">
                  <div aria-current={active ? "step" : undefined} className={`progress-dot ${done ? "done" : active ? "active" : ""}`}>
                    {done ? "\u2713" : index + 1}
                  </div>
                  <span className={`progress-label ${active ? "active" : ""}`}>{label}</span>
                </div>
                {index < cfg.labels.length - 1 ? <div className={`progress-line ${done ? "done" : ""}`} /> : null}
              </div>
            );
          })}
        </nav>

        <div className="signup-modal-body">
          {stepName === "details" ? <DetailsStep cfg={cfg} form={form} formError={formError} setForm={setForm} /> : null}
          {stepName === "terms" ? (
            <TermsStep
              gdprAccepted={gdprAccepted}
              setGdprAccepted={setGdprAccepted}
              setTermsAccepted={setTermsAccepted}
              setTermsScrolled={setTermsScrolled}
              termsAccepted={termsAccepted}
              termsScrolled={termsScrolled}
            />
          ) : null}
          {stepName === "stripe" ? <StripeStep cfg={cfg} /> : null}
          {stepName === "confirm" ? <ConfirmStep cfg={cfg} form={form} submissionId={submissionId} /> : null}
        </div>

        <footer className="signup-modal-footer">
          <button className="btn-back" hidden={stepIdx === 0 || stepName === "confirm"} onClick={prevStep} type="button">
            &larr; Back
          </button>
          <span className="step-count">{stepName === "confirm" ? "" : `${stepIdx + 1} of ${cfg.steps.length}`}</span>
          <button
            className={`btn-next ${stepName === "stripe" ? "gold" : ""}`}
            disabled={!canContinue}
            onClick={nextStep}
            type="button"
          >
            {footerLabel}
          </button>
        </footer>
      </aside>
    </>
  );
}

function DetailsStep({
  cfg,
  form,
  formError,
  setForm,
}: {
  cfg: SignupConfig;
  form: FormData;
  formError: string;
  setForm: (next: FormData) => void;
}) {
  const update = (key: keyof FormData, value: string) => setForm({ ...form, [key]: value });

  return (
    <>
      {cfg.hasTrack ? (
        <div className="partner-banner">
          <div className="partner-banner-dot" />
          <p className="partner-banner-text">
            {cfg.banner} - <strong>{cfg.tierName} tier</strong>
          </p>
        </div>
      ) : null}
      <p className="step-intro">
        Tell us a little about you and your venue. We&apos;ll use these details to create your account and tailor
        your onboarding.
      </p>
      {formError ? (
        <div className="form-error" role="alert">
          <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          <span>{formError}</span>
        </div>
      ) : null}
      <label aria-hidden="true" className="hp-trap">
        Website (leave blank)
        <input autoComplete="off" name="website" onChange={(event) => update("honeypot", event.target.value)} tabIndex={-1} type="text" />
      </label>
      <div className="form-grid">
        <Field label="First Name" required>
          <input autoComplete="given-name" className="form-input" onChange={(event) => update("firstName", event.target.value)} placeholder="Kate" type="text" value={form.firstName} />
        </Field>
        <Field label="Last Name" required>
          <input autoComplete="family-name" className="form-input" onChange={(event) => update("lastName", event.target.value)} placeholder="Smith" type="text" value={form.lastName} />
        </Field>
        <Field full label="Email Address" required>
          <input autoComplete="email" className="form-input" onChange={(event) => update("email", event.target.value)} placeholder="hello@yourvenue.com" type="email" value={form.email} />
        </Field>
        <Field full label="Phone Number" required>
          <input autoComplete="tel" className="form-input" onChange={(event) => update("phone", event.target.value)} placeholder="+61 4XX XXX XXX" type="tel" value={form.phone} />
        </Field>
        <Field full label="Venue Name" required>
          <input className="form-input" onChange={(event) => update("venueName", event.target.value)} placeholder="Horizon Wellness Retreat" type="text" value={form.venueName} />
        </Field>
        <Field label="Venue Type" required>
          <select className="form-input" onChange={(event) => update("venueType", event.target.value)} value={form.venueType}>
            <option value="">Select type</option>
            <option value="retreat">Retreat Venue</option>
            <option value="wellness">Wellness Venue</option>
            <option value="both">Both</option>
          </select>
        </Field>
        <Field label="Country" required>
          <select className="form-input" onChange={(event) => update("country", event.target.value)} value={form.country}>
            <option value="">Select country</option>
            {COUNTRIES.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </Field>
        <Field full label="Website" optional>
          <input autoComplete="url" className="form-input" onChange={(event) => update("website", event.target.value)} placeholder="https://yourvenue.com" type="url" value={form.website} />
        </Field>
        <Field full label="Tell us about your space" optional>
          <textarea className="form-input" onChange={(event) => update("description", event.target.value)} placeholder="A few sentences about your venue, its ethos, and what makes it unique..." rows={3} value={form.description} />
        </Field>
      </div>
    </>
  );
}

function Field({
  children,
  full,
  label,
  optional,
  required,
}: {
  children: React.ReactNode;
  full?: boolean;
  label: string;
  optional?: boolean;
  required?: boolean;
}) {
  return (
    <div className={`form-field ${full ? "full" : ""}`}>
      <label className="form-label">
        {label} {required ? <span className="required">*</span> : null}
        {optional ? <span className="optional">(optional)</span> : null}
      </label>
      {children}
    </div>
  );
}

function TermsStep({
  gdprAccepted,
  setGdprAccepted,
  setTermsAccepted,
  setTermsScrolled,
  termsAccepted,
  termsScrolled,
}: {
  gdprAccepted: boolean;
  setGdprAccepted: (value: boolean) => void;
  setTermsAccepted: (value: boolean) => void;
  setTermsScrolled: (value: boolean) => void;
  termsAccepted: boolean;
  termsScrolled: boolean;
}) {
  function onScroll(event: React.UIEvent<HTMLDivElement>) {
    const box = event.currentTarget;
    if (box.scrollTop + box.clientHeight >= box.scrollHeight - 24) setTermsScrolled(true);
  }

  return (
    <>
      <p className="terms-intro">Please read the following agreements in full. Scroll to the bottom of the box to activate the agreement checkboxes.</p>
      <div className="terms-container" onScroll={onScroll}>
        <h4 className="terms-section-title">Terms &amp; Conditions</h4>
        <p className="terms-text">The Global Sanctum (&quot;TGS&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) welcomes you. By accessing or using our platform (www.theglobalsanctum.com and any sub-pages), you agree to these Terms and Conditions. If you do not agree, please do not use the site.</p>
        <p className="terms-text"><strong>1. Purpose of the Site.</strong> This site is operated by The Global Sanctum to share information about our platform, services, and community initiatives. Content is for general information only and may change or be updated at any time.</p>
        <p className="terms-text"><strong>2. About TGS.</strong> TGS is a venue discovery and booking platform for retreat venues, wellness resorts, hosts, and wellness guests. TGS does not own or operate the venues listed. We act as an intermediary connecting venue owners with hosts and guests.</p>
        <p className="terms-text"><strong>5. Subscriptions &amp; Fees.</strong> Venue owners subscribe to TGS on a monthly basis. Subscription tiers, pricing, and included features are detailed on our List Your Venue page. Commissions are applied on a per-booking basis at rates determined by subscription tier.</p>
        <p className="terms-text"><strong>9. Liabilities &amp; Disclaimers.</strong> TGS acts as an intermediary only. We are not responsible for venue conditions, host performance, or guest behaviour. Our role is to facilitate secure bookings and payments.</p>
        <p className="terms-text"><strong>14. Governing Law.</strong> This agreement is governed by the laws of Queensland, Australia. Any legal proceedings shall be conducted in the courts of Queensland.</p>

        <h4 className="terms-section-title">Venue Partner Agreement</h4>
        <p className="terms-text">Effective date: 22 January 2026. Document type: Addendum to Terms &amp; Conditions. Jurisdiction: Queensland, Australia. This Venue Partner Agreement is entered into between The Global Sanctum and the undersigned venue owner who lists their property or venue on our platform.</p>
        <p className="terms-text"><strong>Section 1 - Venue Owner Obligations.</strong> By listing on The Global Sanctum, the Owner or Authorised Representative agrees to provide accurate information, maintain appropriate licences, ensure legal compliance, honour confirmed bookings, and communicate promptly regarding availability or changes.</p>
        <p className="terms-text"><strong>Section 3 - Fees, Commissions &amp; Payouts.</strong> Subscription tiers: Essentials $0/$0 - 20% commission; Standard $49/month or $490/year - 10% commission; Featured $99/month or $990/year - 7% commission; Premium $199/month or $1,990/year - 5% commission.</p>
        <p className="terms-text"><strong>Section 6 - Liability &amp; Insurance.</strong> Venue Owners must maintain appropriate public liability and professional indemnity insurance as required in their jurisdiction.</p>

        <h4 className="terms-section-title">Booking Terms &amp; Fees</h4>
        <p className="terms-text">Effective date: 1 February 2026. ABN: 70 649 742 423. Jurisdiction: Queensland, Australia. These terms establish transparent pricing, clear commission structures, and fair policies governing all bookings made through The Global Sanctum platform.</p>
        <p className="terms-text"><strong>Section 1 - Payment Processing.</strong> All transactions are securely processed through Stripe Connect. Quotes are indicative until confirmed by the venue. Payment is charged only when booking is accepted and confirmed.</p>
        <p className="terms-text"><strong>Section 2 - Founding &amp; Launch Partner Program.</strong> Founding Partners are the first 50 venues to join the platform and receive 60% off their subscription, grandfathered for life. Launch Partners are the next 150 venues and receive 40% off.</p>
        <p className="terms-text"><strong>Section 5 - Governing Law.</strong> These terms are governed by and construed in accordance with the laws of Queensland, Australia.</p>
        <p className="terms-text">Contact: The Global Sanctum - 58 Wellington Street, Virginia, QLD Australia 4014 - ABN: 70 649 742 423 - Phone: 0434 777 032 - hello@theglobalsanctum.com - theglobalsanctum.com</p>
        <div className="terms-end" />
        {!termsScrolled ? <div className="terms-scroll-hint">↓ Scroll to the bottom to continue</div> : null}
      </div>

      <AgreementRow
        checked={termsAccepted}
        disabled={!termsScrolled}
        label={
          <>
            I have read and agree to the <a href="/global-santcum/legal#terms">Terms &amp; Conditions</a>,{" "}
            <a href="/global-santcum/legal#venue-partner">Venue Partner Terms</a>, and{" "}
            <a href="/global-santcum/legal#booking">Booking Terms</a>.
          </>
        }
        onToggle={() => termsScrolled && setTermsAccepted(!termsAccepted)}
      />
      <AgreementRow
        checked={gdprAccepted}
        disabled={!termsScrolled}
        label={
          <>
            I consent to my personal data being collected and processed by The Global Sanctum in accordance with the{" "}
            <a href="/global-santcum/legal#privacy">Privacy Policy</a>. I understand I may withdraw this consent at any time
            by contacting hello@theglobalsanctum.com.
          </>
        }
        onToggle={() => termsScrolled && setGdprAccepted(!gdprAccepted)}
      />
      {!termsScrolled ? <p className="agree-must-scroll">Please scroll through the full agreement above to activate the checkboxes.</p> : null}
    </>
  );
}

function AgreementRow({
  checked,
  disabled,
  label,
  onToggle,
}: {
  checked: boolean;
  disabled: boolean;
  label: React.ReactNode;
  onToggle: () => void;
}) {
  return (
    <div className="agree-row">
      <button
        aria-checked={checked}
        aria-label="Agreement checkbox"
        className={`agree-checkbox ${disabled ? "locked" : ""} ${checked ? "checked" : ""}`}
        onClick={onToggle}
        role="checkbox"
        type="button"
      />
      <p className="agree-label">{label}</p>
    </div>
  );
}

function StripeStep({ cfg }: { cfg: SignupConfig }) {
  const yearly = cfg.billingCycle === "yearly";
  const priceDisplay = yearly ? `${cfg.priceYearly}${cfg.annualSaving ? ` (${cfg.annualSaving})` : ""}` : cfg.priceMonthly;

  return (
    <>
      {cfg.trial ? (
        <div className="stripe-trial-note">
          <div className="stripe-trial-dot" />
          <p className="stripe-trial-text">
            Every paid plan begins with <strong>fourteen days, complimentary.</strong> Your card will not be charged until your trial ends. Cancel anytime before then at no cost.
          </p>
        </div>
      ) : null}
      <div className="stripe-summary">
        <StripeRow label="Plan" value={cfg.planDisplayName} />
        <StripeRow label="Billing" value={yearly ? "Annual" : "Monthly"} />
        <StripeRow hi label="Price" value={priceDisplay || ""} />
        <StripeRow label="Commission" value={cfg.commission} />
        {cfg.hasTrack ? <StripeRow hi label="Programme" value={cfg.trackName || ""} /> : null}
        {cfg.trial ? <StripeRow label="Trial" value="14 days, no charge" /> : null}
      </div>
      <div className="stripe-handoff-note">
        <p className="stripe-handoff-title">You&apos;re about to be handed to Stripe</p>
        <p className="stripe-handoff-body">Stripe is our secure payment partner. They handle all card details, currency conversion, local tax, and receipts. The Global Sanctum never sees or stores your payment information at any point.</p>
        <p className="stripe-handoff-body">Once payment is confirmed you&apos;ll be returned here with a welcome confirmation, and a receipt will be sent to your email.</p>
      </div>
      <div className="stripe-badges">
        <span className="stripe-badge">Secured by Stripe</span>
        <span className="stripe-badge">Visa</span>
        <span className="stripe-badge">Mastercard</span>
        <span className="stripe-badge">Amex</span>
        <span className="stripe-badge">256-bit SSL</span>
      </div>
      <p className="stripe-change-note">Need to change your plan or billing cycle? Close this and re-select from the pricing table.</p>
    </>
  );
}

function StripeRow({ hi, label, value }: { hi?: boolean; label: string; value: string }) {
  return (
    <div className="stripe-row">
      <span className="stripe-label">{label}</span>
      <span className={`stripe-value ${hi ? "hi" : ""}`}>{value}</span>
    </div>
  );
}

function ConfirmStep({ cfg, form, submissionId }: { cfg: SignupConfig; form: FormData; submissionId: string }) {
  const refDisplay = `TGS-SIGN-${submissionId.slice(0, 8).toUpperCase()}`;

  return (
    <div className="confirm-wrap">
      <div aria-hidden="true" className="confirm-icon">
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="confirm-title" tabIndex={-1}>
        Welcome to
        <br />
        The Global <em>Sanctum.</em>
      </h2>
      <p className="confirm-text">
        <strong>{form.venueName || "your venue"}</strong> has been received into our collection. Someone from our team will be in touch within 48 hours to guide you through the next steps.
      </p>
      <div className="confirm-detail">
        <div className="confirm-row">
          <span className="confirm-row-label">Plan</span>
          <span className="confirm-row-value">{cfg.planDisplayName}</span>
        </div>
        <div className="confirm-row">
          <span className="confirm-row-label">Commission</span>
          <span className="confirm-row-value">{cfg.commission}</span>
        </div>
        <div className="confirm-row">
          <span className="confirm-row-label">Next steps</span>
          <span className="confirm-row-value">Confirmation email on its way</span>
        </div>
      </div>
      <div className="confirm-ref">
        Your reference: <strong>{refDisplay}</strong>
      </div>
      <p className="confirm-email-note">
        A confirmation will arrive at <em>{form.email || "your email address"}</em> shortly. Questions?{" "}
        <a href="mailto:hello@theglobalsanctum.com">hello@theglobalsanctum.com</a>
      </p>
    </div>
  );
}

const venueSignupStyles = `
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
  --error-border: #B03C32;
  --error-bg: rgba(176,60,50,0.06);
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Montserrat', sans-serif;
}
* { box-sizing: border-box; }
body { margin: 0; font-family: var(--font-sans); color: var(--charcoal); background: var(--warm-white); -webkit-font-smoothing: antialiased; }
.demo-page { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px; background: linear-gradient(rgba(49,49,49,0.55), rgba(49,49,49,0.55)), #5a7a6a; gap: 28px; }
.demo-section { display: flex; flex-direction: column; align-items: center; gap: 10px; max-width: 760px; width: 100%; }
.demo-section-label { font-family: var(--font-sans); font-size: 10px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(253,252,249,0.65); text-align: center; line-height: 1.5; margin: 0; }
.demo-row { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; max-width: 720px; }
.demo-trigger { background: var(--charcoal); color: var(--white); font-family: var(--font-sans); font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; padding: 12px 22px; border: 1px solid var(--charcoal); border-radius: 50px; cursor: pointer; transition: background 0.3s, border-color 0.3s; text-decoration: none; display: inline-block; }
.demo-trigger:hover { background: var(--charcoal-70); border-color: var(--charcoal-70); }
.demo-trigger.gold { background: transparent; color: var(--gold-accent); border-color: rgba(196,162,101,0.55); }
.demo-trigger.gold:hover { background: rgba(196,162,101,0.12); }
.demo-note { text-align: center; max-width: 640px; font-family: var(--font-sans); font-size: 11px; color: var(--white); opacity: 0.6; line-height: 1.7; margin: 8px 0 0; }
.demo-note code { background: rgba(255,255,255,0.1); padding: 1px 5px; border-radius: 3px; }
.demo-cycle-toggle { display: inline-flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 50px; background: rgba(255,255,255,0.12); margin-bottom: 8px; }
.demo-cycle-toggle-label { font-family: var(--font-sans); font-size: 10px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.7); margin-right: 4px; }
.demo-cycle-btn { font-family: var(--font-sans); font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 7px 14px; border-radius: 50px; background: transparent; color: rgba(255,255,255,0.65); border: 1px solid rgba(255,255,255,0.2); cursor: pointer; transition: all 0.25s; }
.demo-cycle-btn:hover { color: var(--white); border-color: rgba(255,255,255,0.45); }
.demo-cycle-btn.active { background: var(--white); color: var(--charcoal); border-color: var(--white); }
.signup-modal-overlay { position: fixed; inset: 0; z-index: 1100; background: rgba(49,49,49,0.55); backdrop-filter: blur(2px); opacity: 0; visibility: hidden; transition: opacity 0.4s ease, visibility 0.4s ease; }
.signup-modal-overlay.active { opacity: 1; visibility: visible; }
.signup-modal { position: fixed; top: 0; right: 0; width: 560px; max-width: 100vw; height: 100vh; height: 100dvh; background: var(--warm-white); z-index: 1101; transform: translateX(100%); transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1); display: flex; flex-direction: column; overflow: hidden; box-shadow: -16px 0 60px rgba(49,49,49,0.12); }
.signup-modal.active { transform: translateX(0); }
.signup-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 36px; border-bottom: 1px solid var(--charcoal-08); flex-shrink: 0; background: var(--warm-white); }
.signup-modal-header-left { display: flex; align-items: center; gap: 12px; }
.signup-modal-logo { width: 28px; height: 28px; border: 1px solid var(--gold-accent); transform: rotate(45deg); position: relative; }
.signup-modal-logo::after { content: ""; position: absolute; inset: 3px; border: 1px solid var(--gold-accent); }
.signup-modal-label-wrap { display: flex; flex-direction: column; gap: 2px; }
.signup-modal-eyebrow { font-family: var(--font-sans); font-size: 9px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold-dark); }
.signup-modal-label { font-family: var(--font-sans); font-size: 10px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--charcoal); }
.signup-modal-close { width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--charcoal-08); background: var(--warm-cream); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 22px; line-height: 1; color: var(--charcoal-50); transition: all 0.25s; padding: 0; }
.signup-modal-close:hover { border-color: var(--charcoal-30); color: var(--charcoal); }
.signup-progress { display: flex; align-items: center; padding: 14px 36px; background: var(--warm-cream); border-bottom: 1px solid var(--charcoal-08); flex-shrink: 0; }
.progress-fragment { display: contents; }
.progress-step { display: flex; align-items: center; gap: 10px; }
.progress-dot { width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid var(--charcoal-15); display: flex; align-items: center; justify-content: center; font-family: var(--font-sans); font-size: 9px; font-weight: 600; color: var(--charcoal-50); background: var(--warm-white); transition: all 0.3s; flex-shrink: 0; }
.progress-dot.active { border-color: var(--charcoal); background: var(--charcoal); color: var(--white); }
.progress-dot.done { border-color: var(--gold-dark); background: var(--gold-dark); color: var(--white); }
.progress-label { font-family: var(--font-sans); font-size: 9px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--charcoal-50); transition: color 0.3s; white-space: nowrap; }
.progress-label.active { color: var(--charcoal); }
.progress-line { flex: 1; height: 1px; background: var(--charcoal-15); margin: 0 10px; min-width: 12px; transition: background 0.3s; }
.progress-line.done { background: var(--gold-dark); }
.signup-modal-body { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 28px 36px 32px; }
.signup-modal-footer { display: flex; align-items: center; justify-content: space-between; padding: 18px 36px; border-top: 1px solid var(--charcoal-08); background: var(--warm-white); flex-shrink: 0; }
.btn-back { font-family: var(--font-sans); font-size: 10px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--charcoal-50); background: transparent; border: 1px solid var(--charcoal-08); padding: 11px 18px; border-radius: 50px; cursor: pointer; transition: all 0.25s; }
.btn-back:hover { color: var(--charcoal); border-color: var(--charcoal-30); }
.btn-back[hidden] { display: none; }
.step-count { font-family: var(--font-sans); font-size: 10px; font-weight: 400; color: var(--charcoal-30); }
.btn-next { font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--white); background: var(--charcoal); border: 1px solid var(--charcoal); padding: 12px 22px; border-radius: 50px; cursor: pointer; transition: all 0.25s; }
.btn-next:hover:not(:disabled) { background: var(--charcoal-70); border-color: var(--charcoal-70); }
.btn-next:disabled { opacity: 0.35; cursor: not-allowed; }
.btn-next.gold { background: var(--gold-accent); border-color: var(--gold-accent); color: var(--charcoal); }
.btn-next.gold:hover:not(:disabled) { background: var(--gold-dark); border-color: var(--gold-dark); color: var(--white); }
.partner-banner { background: var(--charcoal); color: var(--white); padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
.partner-banner-dot { width: 6px; height: 6px; background: var(--gold-accent); border-radius: 50%; flex-shrink: 0; }
.partner-banner-text { font-family: var(--font-sans); font-size: 11px; font-weight: 400; color: rgba(253,252,249,0.85); line-height: 1.5; margin: 0; }
.partner-banner-text strong { color: var(--gold-accent); font-weight: 600; }
.step-intro { font-family: var(--font-sans); font-size: 12px; font-weight: 300; color: var(--charcoal-70); line-height: 1.65; margin: 0 0 18px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-field { display: flex; flex-direction: column; gap: 6px; }
.form-field.full { grid-column: 1 / -1; }
.form-label { font-family: var(--font-sans); font-size: 12px; font-weight: 500; color: var(--charcoal); }
.form-label .required { color: var(--error-border); margin-left: 2px; }
.form-label .optional { font-weight: 300; color: var(--charcoal-30); margin-left: 4px; }
.form-input { font-family: var(--font-sans); font-size: 13px; font-weight: 400; color: var(--charcoal); background: var(--warm-cream); border: 1px solid var(--charcoal-08); border-radius: 6px; padding: 11px 14px; outline: none; transition: border-color 0.2s; width: 100%; }
.form-input:focus { border-color: var(--charcoal-30); }
.form-input::placeholder { color: var(--charcoal-30); }
textarea.form-input { resize: vertical; min-height: 80px; line-height: 1.5; }
select.form-input { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23313131' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; }
.hp-trap { position: absolute !important; left: -9999px !important; top: -9999px !important; opacity: 0 !important; pointer-events: none !important; height: 0; width: 0; overflow: hidden; }
.form-error { background: var(--error-bg); border-left: 3px solid var(--error-border); padding: 12px 14px; margin-bottom: 16px; font-family: var(--font-sans); font-size: 12px; color: var(--charcoal); line-height: 1.5; border-radius: 0 4px 4px 0; display: flex; align-items: flex-start; gap: 10px; }
.form-error svg { width: 16px; height: 16px; color: var(--error-border); flex-shrink: 0; margin-top: 1px; }
.terms-intro { font-family: var(--font-sans); font-size: 12px; font-weight: 300; color: var(--charcoal-70); line-height: 1.7; margin: 0 0 14px; }
.terms-container { border: 1px solid var(--charcoal-08); border-radius: 8px; height: 240px; overflow-y: auto; padding: 18px 20px 0; background: var(--warm-cream); margin-bottom: 16px; position: relative; -webkit-overflow-scrolling: touch; }
.terms-section-title { font-family: var(--font-serif); font-size: 16px; font-weight: 400; color: var(--charcoal); margin: 18px 0 6px; }
.terms-section-title:first-child { margin-top: 0; }
.terms-text { font-family: var(--font-sans); font-size: 11px; font-weight: 300; color: var(--charcoal-70); line-height: 1.75; margin: 0 0 8px; }
.terms-text strong { color: var(--charcoal); font-weight: 500; }
.terms-end { height: 28px; }
.terms-scroll-hint { position: sticky; bottom: 0; background: linear-gradient(to top, var(--warm-cream) 60%, transparent); padding: 22px 0 8px; text-align: center; font-family: var(--font-sans); font-size: 9px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--charcoal-50); pointer-events: none; transition: opacity 0.3s; }
.agree-row { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; }
.agree-checkbox { width: 18px; height: 18px; border: 1.5px solid var(--charcoal-15); border-radius: 3px; flex-shrink: 0; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; margin-top: 1px; background: var(--warm-cream); }
.agree-checkbox.locked { opacity: 0.4; cursor: not-allowed; }
.agree-checkbox.checked { background: var(--charcoal); border-color: var(--charcoal); }
.agree-checkbox.checked::after { content: ''; width: 10px; height: 10px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E"); background-size: contain; background-repeat: no-repeat; background-position: center; }
.agree-label { font-family: var(--font-sans); font-size: 12px; font-weight: 400; color: var(--charcoal); line-height: 1.55; margin: 0; }
.agree-label a { color: var(--gold-dark); text-decoration: underline; }
.agree-must-scroll { font-family: var(--font-sans); font-size: 11px; font-weight: 300; color: var(--charcoal-30); font-style: italic; margin-top: 8px; }
.stripe-trial-note { background: rgba(196,162,101,0.08); border: 1px solid rgba(196,162,101,0.25); border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; display: flex; align-items: flex-start; gap: 10px; }
.stripe-trial-dot { width: 6px; height: 6px; background: var(--gold-accent); border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
.stripe-trial-text { font-family: var(--font-sans); font-size: 12px; font-weight: 300; color: var(--gold-dark); line-height: 1.6; margin: 0; }
.stripe-trial-text strong { color: var(--gold-dark); font-weight: 600; }
.stripe-summary, .stripe-handoff-note { background: var(--warm-cream); border: 1px solid var(--charcoal-08); border-radius: 8px; padding: 18px; margin-bottom: 16px; }
.stripe-row { display: flex; justify-content: space-between; align-items: baseline; padding: 8px 0; border-bottom: 1px solid var(--charcoal-08); }
.stripe-row:last-child { border-bottom: none; padding-bottom: 0; }
.stripe-row:first-child { padding-top: 0; }
.stripe-label { font-family: var(--font-sans); font-size: 11px; font-weight: 400; color: var(--charcoal-50); }
.stripe-value { font-family: var(--font-sans); font-size: 12px; font-weight: 500; color: var(--charcoal); text-align: right; }
.stripe-value.hi { color: var(--gold-dark); }
.stripe-handoff-note { padding: 14px 16px; }
.stripe-handoff-title { font-family: var(--font-sans); font-size: 11px; font-weight: 600; color: var(--charcoal); margin: 0 0 6px; letter-spacing: 0.04em; }
.stripe-handoff-body { font-family: var(--font-sans); font-size: 11.5px; font-weight: 300; color: var(--charcoal-70); line-height: 1.65; margin: 0 0 4px; }
.stripe-badges { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; }
.stripe-badge { font-family: var(--font-sans); font-size: 9px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 5px 10px; border: 1px solid var(--charcoal-08); border-radius: 50px; color: var(--charcoal-50); background: var(--warm-cream); }
.stripe-change-note { margin-top: 18px; font-family: var(--font-sans); font-size: 11px; font-weight: 300; color: var(--charcoal-30); line-height: 1.6; text-align: center; }
.confirm-wrap { text-align: center; padding-top: 20px; }
.confirm-icon { width: 64px; height: 64px; margin: 0 auto 24px; border-radius: 50%; border: 2px solid var(--charcoal); display: flex; align-items: center; justify-content: center; animation: scaleIn 0.5s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s both; }
.confirm-icon svg { width: 28px; height: 28px; color: var(--charcoal); stroke-dasharray: 50; stroke-dashoffset: 50; animation: drawCheck 0.5s ease 0.5s forwards; }
@keyframes scaleIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes drawCheck { to { stroke-dashoffset: 0; } }
.confirm-title { font-family: var(--font-serif); font-size: 30px; font-weight: 300; color: var(--charcoal); line-height: 1.2; margin: 0 0 10px; outline: none; }
.confirm-title em { font-style: italic; color: var(--gold-dark); }
.confirm-text { font-family: var(--font-sans); font-size: 12.5px; font-weight: 300; color: var(--charcoal-70); line-height: 1.7; max-width: 380px; margin: 0 auto 24px; }
.confirm-text strong { font-weight: 500; color: var(--charcoal); }
.confirm-detail { background: var(--warm-cream); border: 1px solid var(--charcoal-08); border-radius: 8px; padding: 16px 18px; text-align: left; margin-bottom: 16px; }
.confirm-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--charcoal-08); }
.confirm-row:last-child { border-bottom: none; padding-bottom: 0; }
.confirm-row:first-child { padding-top: 0; }
.confirm-row-label { font-family: var(--font-sans); font-size: 9.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--charcoal-50); }
.confirm-row-value { font-family: var(--font-sans); font-size: 11px; font-weight: 500; color: var(--charcoal); text-align: right; }
.confirm-ref { font-family: var(--font-sans); font-size: 11px; color: var(--charcoal-30); text-align: center; margin-bottom: 16px; }
.confirm-ref strong { color: var(--charcoal-50); font-weight: 500; }
.confirm-email-note { font-family: var(--font-sans); font-size: 11.5px; font-weight: 300; color: var(--charcoal-50); line-height: 1.6; text-align: center; }
.confirm-email-note em { color: var(--charcoal); font-style: normal; font-weight: 500; }
.confirm-email-note a { color: var(--charcoal); text-decoration: none; font-weight: 500; }
@media (prefers-reduced-motion: reduce) { .signup-modal-overlay, .signup-modal, .progress-dot, .progress-line, .progress-label { transition: none !important; } .confirm-icon, .confirm-icon svg { animation: none !important; } .confirm-icon svg { stroke-dashoffset: 0 !important; } }
@media (max-width: 768px) {
  .signup-modal { width: 100vw; }
  .signup-modal-header { padding: 16px 20px; }
  .signup-progress { padding: 12px 20px; }
  .signup-modal-body { padding: 22px 20px 28px; }
  .signup-modal-footer { padding: 14px 20px; }
  .signup-modal-close { width: 44px; height: 44px; }
  .form-input { padding: 13px 14px; }
  .btn-back { padding: 13px 18px; }
  .btn-next { padding: 14px 22px; }
  .form-grid { grid-template-columns: 1fr; gap: 12px; }
  .progress-label { display: none; }
  .progress-line { margin: 0 6px; }
  .progress-step { gap: 0; }
  .terms-container { height: 200px; }
  .demo-cycle-toggle { flex-wrap: wrap; justify-content: center; border-radius: 18px; }
}
`;
