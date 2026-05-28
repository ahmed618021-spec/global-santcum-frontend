import SiteNavigation from "@/components/tgs/SiteNavigation";
import { tgsRoutes } from "@/lib/tgsRoutes";
import styles from "./list-your-venue.module.css";

const liveImage = (id: string, width = 800) => `https://images.unsplash.com/${id}?w=${width}&q=80`;

const venueTypes = [
  {
    image: liveImage("photo-1600334129128-685c5582fd35"),
    label: "Exclusive-Use Spaces",
    title: "Retreat Venues",
    text: "Purpose-built centers, eco lodges, heritage properties, and private estates that host transformational group programs.",
    features: [
      "Connect with retreat facilitators globally",
      "Showcase full accommodation and facilities",
      "Receive qualified booking enquiries",
      "Integrated calendar and availability",
      "Streamlined group booking coordination",
    ],
  },
  {
    image: liveImage("photo-1544161515-4ab6ce6db874"),
    label: "Day-Use Facilities",
    title: "Wellness Venues",
    text: "Spas, bathhouses, thermal facilities, wellness centers, and therapeutic spaces offering day experiences and treatments.",
    features: [
      "Reach wellness travelers seeking experiences",
      "Display services, treatments, and offerings",
      "Direct booking integration",
      "Visibility in curated collections",
      "Connection to global wellness community",
    ],
  },
];

const benefits = [
  ["Global Visibility", "Reach qualified leads - retreat facilitators, wellness travelers, and seekers actively searching for spaces like yours."],
  ["Comprehensive Profiles", "Showcase everything that makes your space unique. Accommodation, facilities, wellness offerings, location, philosophy."],
  ["Intelligent Matching", "Our search connects the right guests to the right spaces. Filter by modality, capacity, setting, amenities."],
  ["Transparent Fees", "Commission as low as 5%. Clear pricing, no hidden costs. You keep more of what you earn."],
  ["Curated Community", "Curation that protects your positioning among serious operators. Quality over volume, always."],
  ["Operational Tools", "Calendar management, enquiry handling, booking coordination. Technology that liberates instead of burdens."],
];

const steps = [
  ["Apply", "Submit your venue details. We review for quality and alignment with our curation standards."],
  ["Onboard", "Our team helps build your comprehensive profile - photography guidance, descriptions, and facility mapping."],
  ["Launch", "Your venue goes live. Featured in search, discoverable by facilitators and travelers worldwide."],
  ["Grow", "Receive qualified enquiries, manage bookings, and track performance through your venue dashboard."],
];

const partnerPlans = [
  {
    title: "Founding Partner",
    badge: "Limited Availability",
    discount: "60% off",
    term: "Lifetime pricing",
    limit: "Limited to 50 venues worldwide",
    features: [
      "Permanent 60% reduction on your subscription tier",
      "Priority positioning in search results",
      "Direct input on platform features and roadmap",
      "Recognised as a founding member of TGS",
      "Featured in launch communications",
      "Dedicated onboarding support",
    ],
  },
  {
    title: "Launch Partner",
    discount: "40% off",
    term: "Lifetime pricing",
    limit: "Limited to 150 venues worldwide after Founding Partners",
    features: [
      "Permanent 40% reduction on your subscription tier",
      "Enhanced positioning in search results",
      "Early access to new features",
      "Recognised as a founder partner of TGS",
      "Priority support during onboarding",
    ],
  },
];

const pricingTiers = [
  { name: "Essentials", price: "$0", period: "/yr", note: "", desc: "Pay only when bookings arrive", cta: "Get Started Free" },
  { name: "Standard", price: "$490", period: "/yr", note: "AUD", desc: "Establish your presence", cta: "Get Started" },
  { name: "Featured", price: "$990", period: "/yr", note: "AUD", desc: "Maximise booking potential", badge: "Most Popular", cta: "Get Started" },
  { name: "Premium", price: "$1,990", period: "/yr", note: "AUD", desc: "Maximum exposure & support", cta: "Get Started" },
];

const pricingRows = [
  ["Platform Commission", "20% + 3%", "10% + 3%", "7% + 3%", "5% + 3%", "commission"],
  ["Venue Profile", "", "", "", "", "category"],
  ["Full venue profile in TGS collection", "yes", "yes", "yes", "yes"],
  ["High-resolution photo gallery", "yes", "yes", "yes", "yes"],
  ["Search visibility", "Standard", "Standard", "Priority", "Premium (top)"],
  ["Marketing & Exposure", "", "", "", "", "category"],
  ["Marketing support", "-", "Standard", "Priority rotation", "Included"],
];

const faqs = [
  [
    "What's the difference between Retreat Venues and Wellness Venues?",
    "Retreat Venues are exclusive-use spaces that accommodate groups for multi-day programs - retreat centers, eco lodges, and private estates. Wellness Venues offer day-use and multi-day experiences - spas, bathhouses, wellness centers, and therapeutic facilities. Many venues qualify as both, and pricing is the same regardless of venue type.",
  ],
  [
    "What are the Founding Partner and Launch Partner programmes?",
    "We're offering permanent discounted rates to venues who join us during our launch period. Founding Partners receive 60% off their subscription tier for life. Launch Partners receive 40% off for life. These rates are locked in permanently and will never be offered again after launch.",
  ],
  [
    "How does the Essentials plan work?",
    "The Essentials plan is completely free - no subscription fee at all. You only pay a 20% commission when a booking is completed through our platform.",
  ],
  ["When will the dashboard and analytics features launch?", "We're building the venue dashboard and analytics features for launch shortly after the platform goes live. Featured and Premium members will have access first."],
  ["How long does verification take?", "Most venues are verified within 48-72 hours. We review for accuracy, quality, and alignment with our curation standards. Premium tier members receive priority verification."],
  ["Can I cancel my subscription?", "Yes, cancel anytime. Your listing remains active until the end of your billing period. No long-term contracts, no cancellation fees."],
  ["What makes you different from other listing platforms?", "Curation over volume. Comprehensive venue profiles that showcase depth, not just photos. Significantly lower total fees. Built specifically for wellness and retreat spaces."],
  ["Can I upgrade or downgrade my plan?", "Yes, you can change plans at any time. Upgrades take effect immediately with prorated billing. Downgrades take effect at your next billing cycle."],
];

export default function ListYourVenuePage() {
  return (
    <div className={styles.page}>
      <SiteNavigation />
      <main>
        <section className={styles.hero}>
          <img className={styles.heroBg} src={liveImage("photo-1540555700478-4be289fbecef", 1920)} alt="Spa wellness treatment" />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Partner With Us</p>
            <h1 className={styles.heroTitle}>List Your Venue on The Global Sanctum</h1>
            <p className={styles.heroSubtitle}>Join a curated network of exceptional wellness and retreat venues. Reach facilitators, travelers, and seekers who value transformational spaces.</p>
            <a className={styles.heroCta} href="#pricing">View Pricing</a>
          </div>
        </section>

        <section className={styles.intro}>
          <div className={styles.introInner}>
            <p className={styles.sectionEyebrow}>Why List With Us</p>
            <h2 className={styles.sectionTitle}>Infrastructure <em>Built For You</em></h2>
            <p className={styles.introText}>The Global Sanctum isn&apos;t another listing site. We&apos;re building the infrastructure this industry deserves - comprehensive venue profiles, intelligent search that matches the right guests to the right spaces, and technology that handles operations so you can focus on creating sanctuary.</p>
          </div>
        </section>

        <section className={styles.whoFor}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>Two Paths, One Platform</p>
              <h2 className={styles.sectionTitle}>For Every Type of <em>Wellness Space</em></h2>
            </div>
            <div className={styles.whoGrid}>
              {venueTypes.map((type) => (
                <article className={styles.whoCard} key={type.title}>
                  <div className={styles.whoImage}>
                    <img src={type.image} alt={type.title} />
                  </div>
                  <div className={styles.whoBody}>
                    <p className={styles.cardLabel}>{type.label}</p>
                    <h3>{type.title}</h3>
                    <p>{type.text}</p>
                    <ul>{type.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.benefits}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>What You Gain</p>
              <h2 className={styles.sectionTitle}>Built To Serve <em>Your Success</em></h2>
            </div>
            <div className={styles.benefitGrid}>
              {benefits.map(([title, text], index) => (
                <article className={styles.benefitCard} key={title}>
                  <span>{["◎", "◈", "◇", "⬡", "★", "◉"][index]}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.how}>
          <div className={styles.howInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>Simple Process</p>
              <h2 className={styles.sectionTitle}>How It <em>Works</em></h2>
            </div>
            <div className={styles.steps}>
              {steps.map(([title, text], index) => (
                <article className={styles.step} key={title}>
                  <div>{index + 1}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.partner}>
          <div className={styles.partnerInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>Early Access</p>
              <h2 className={styles.sectionTitle}><em>Partner Pricing</em></h2>
              <p className={styles.partnerIntro}>We&apos;re inviting a select group of venues to join us at launch. In exchange for your early commitment and feedback, we&apos;re offering partnership rates that will never be available again.</p>
            </div>
            <div className={styles.partnerGrid}>
              {partnerPlans.map((plan) => (
                <article className={styles.partnerCard} key={plan.title}>
                  {plan.badge ? <span className={styles.partnerBadge}>{plan.badge}</span> : null}
                  <h3>{plan.title}</h3>
                  <div className={styles.discount}>{plan.discount}</div>
                  <p className={styles.term}>{plan.term}</p>
                  <p className={styles.limit}>{plan.limit}</p>
                  <ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  <a className={styles.partnerButton} href="#pricing">Select Your Plan</a>
                </article>
              ))}
            </div>
            <p className={styles.partnerNote}>Applications are reviewed individually. We&apos;re looking for venues aligned with our vision of curated, transformational spaces.</p>
          </div>
        </section>

        <section className={styles.pricing} id="pricing">
          <div className={styles.pricingInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>Standard Pricing</p>
              <h2 className={styles.sectionTitle}>Choose Your Plan</h2>
              <p className={styles.pricingSubtitle}>Simple subscriptions for all venue types - retreat venues and wellness venues. No hidden fees. Cancel anytime.</p>
            </div>
            <div className={styles.billingToggle} aria-hidden="true">
              <span>Yearly</span>
              <span>Monthly</span>
            </div>
            <p className={styles.saveNote}>(save 17% with annual subscriptions)</p>
            <div className={styles.pricingScroll}>
              <table className={styles.pricingTable}>
                <thead>
                  <tr>
                    <th />
                    {pricingTiers.map((tier, index) => (
                      <th className={index === 2 ? styles.featuredCol : undefined} key={tier.name}>
                        {tier.badge ? <span className={styles.popularBadge}>{tier.badge}</span> : null}
                        <div className={styles.tierName}>{tier.name}</div>
                        <div className={styles.price}><span>{tier.price}</span>{tier.period}</div>
                        {tier.note ? <div className={styles.retail}>{tier.note}</div> : null}
                        <p>{tier.desc}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row) => {
                    const rowType = row[5];
                    if (rowType === "category") {
                      return (
                        <tr className={styles.categoryRow} key={row[0]}>
                          <th>{row[0]}</th>
                          <td />
                          <td />
                          <td className={styles.featuredCol} />
                          <td />
                        </tr>
                      );
                    }
                    return (
                      <tr className={rowType === "commission" ? styles.commissionRow : undefined} key={row[0]}>
                        <th>{row[0]}</th>
                        {row.slice(1, 5).map((cell, index) => (
                          <td className={index === 2 ? styles.featuredCol : undefined} key={`${row[0]}-${index}`}>
                            {cell === "yes" ? <span className={styles.check}>✓</span> : cell === "-" ? <span className={styles.dash}>—</span> : cell}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  <tr className={styles.ctaRow}>
                    <th />
                    {pricingTiers.map((tier, index) => (
                      <td className={index === 2 ? styles.featuredCol : undefined} key={tier.name}>
                        <a href={tgsRoutes.contact}>{tier.cta}</a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.pricingNotes}>
              <p>All subscriptions are month-to-month or annual. No long-term contracts.</p>
              <p>Industry average: 15-25% commission. Our highest rate is 20% with zero subscription.</p>
            </div>
          </div>
        </section>

        <section className={styles.faq}>
          <div className={styles.faqInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>Questions</p>
              <h2 className={styles.sectionTitle}>Frequently Asked</h2>
            </div>
            {faqs.map(([question, answer]) => (
              <details className={styles.faqItem} key={question}>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <h2>Ready to Join?</h2>
            <p>List your venue on the platform built to serve you. Transparent pricing, qualified leads, and technology that liberates instead of burdens.</p>
            <a href="#pricing">Get Started Today</a>
            <p className={styles.ctaContact}>Questions? <a href={tgsRoutes.contact}>Get in touch</a> with our partnerships team.</p>
          </div>
        </section>
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

function Newsletter() {
  return (
    <section className={styles.newsletter}>
      <div className={styles.newsletterInner}>
        <p className={styles.sectionEyebrow}>Stay Connected</p>
        <h2>Join The Community</h2>
        <p>Featured venues, practitioner spotlights, wellness discoveries, and our global calendar of retreats. Curated for the Sanctum community, delivered weekly.</p>
        <form>
          <input type="email" aria-label="Email address" placeholder="Email address" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <img src="https://nextjs-webportal-tgs.vercel.app/images/logo_vector.svg" alt="The Global Sanctum" />
          <span>The Global Sanctum</span>
          <p>Extraordinary retreat spaces, wellness venues, and the experiences they hold - curated and connected worldwide.</p>
        </div>
        <FooterColumn title="About TGS" links={[["About Us", tgsRoutes.about], ["How It Works", tgsRoutes.howItWorks]]} />
        <FooterColumn title="Discover" links={[["Retreat Venues", tgsRoutes.venues], ["Wellness Venues", tgsRoutes.venues], ["Experiences", tgsRoutes.wellnessExperiences]]} />
        <FooterColumn title="Partner With Us" links={[["List Your Venue", tgsRoutes.listYourVenue], ["Press & Media", tgsRoutes.contact]]} />
        <FooterColumn title="Resources" links={[["The Wellness Edit", tgsRoutes.wellnessEdit], ["Join the Journal", tgsRoutes.wellnessEdit]]} />
        <FooterColumn title="Legal" links={[["Terms & Conditions", tgsRoutes.legal], ["Privacy Policy", tgsRoutes.legal], ["Cookies Policy", tgsRoutes.legal]]} />
      </div>
      <div className={styles.footerBottom}>
        <p>© 2026 The Global Sanctum. All rights reserved.</p>
        <div>
          <a href="https://www.instagram.com/theglobalsanctum/">Instagram</a>
          <a href="https://www.facebook.com/profile.php?id=61577706717526">Facebook</a>
          <a href="https://www.linkedin.com/company/the-global-sanctum/">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className={styles.footerCol}>
      <h4>{title}</h4>
      {links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
    </div>
  );
}
