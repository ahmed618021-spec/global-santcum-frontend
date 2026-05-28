"use client";

import { useState } from "react";
import SiteNavigation from "@/components/tgs/SiteNavigation";
import { tgsRoutes } from "@/lib/tgsRoutes";
import styles from "../remaining.module.css";

const policies = [
  ["terms", "Terms & Conditions", "The terms governing access to and use of The Global Sanctum platform, including account responsibilities, enquiries, booking conduct, intellectual property, and platform use."],
  ["privacy", "Privacy Policy", "How we collect, use, disclose, retain, and protect personal information in accordance with applicable privacy principles and platform operations."],
  ["cookies", "Cookie Policy", "How cookies and similar technologies support analytics, preferences, security, and site performance across The Global Sanctum."],
  ["health", "Health & Wellness Disclaimer", "Wellness experiences are not a substitute for professional medical advice. Guests are responsible for assessing suitability and seeking medical guidance where needed."],
  ["refunds", "Refund & Cancellation Policy", "The standards governing booking cancellations, venue owner cancellations, subscription cancellations, and refund requests."],
  ["booking", "Booking Terms & Conditions", "The specific terms applying to bookings, enquiries, payments, venue responsibilities, guest conduct, insurance, and dispute handling."],
  ["acceptable", "Acceptable Use Policy", "Platform rules covering responsible use, lawful conduct, respectful communication, data integrity, and prohibited activity."],
  ["community", "Community Standards & Code of Conduct", "The shared standards for venue partners, retreat hosts, and wellness guests participating in The Global Sanctum community."],
] as const;

export default function LegalPage() {
  const [active, setActive] = useState("terms");
  const policy = policies.find(([id]) => id === active) ?? policies[0];

  return (
    <div className={styles.page}>
      <SiteNavigation mode="solid" />
      <main>
        <section className={styles.lightHero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Legal</p>
            <h1 className={styles.title}>Legal & Policies</h1>
            <p className={styles.subtitle}>The legal terms, privacy practices, and policies governing your use of The Global Sanctum platform.</p>
          </div>
        </section>
        <section className={styles.legalLayout}>
          <aside className={styles.sideNav}>
            {policies.map(([id, title]) => (
              <button className={active === id ? styles.activeTab : ""} key={id} type="button" onClick={() => setActive(id)}>
                {title}
              </button>
            ))}
          </aside>
          <article className={styles.policy}>
            <p className={styles.eyebrow}>{policy[1]}</p>
            <h2 className={styles.title}>{policy[1]}</h2>
            <p>{policy[2]}</p>
            <h2>1. Purpose</h2>
            <p>These policies set out the standards and responsibilities that apply when using The Global Sanctum website, platform, listings, enquiries, booking flows, and communications.</p>
            <h2>2. User Responsibilities</h2>
            <p>Users must provide accurate information, communicate respectfully, comply with applicable law, and make independent decisions about suitability, health, travel, booking, and participation.</p>
            <h2>3. Platform Role</h2>
            <p>The Global Sanctum curates and presents venues and experiences, facilitates discovery and enquiries, and supports a clear booking process. Venue services are supplied by independent venue partners.</p>
            <h2>4. Contact</h2>
            <p>Questions about these policies may be sent to hello@theglobalsanctum.com or Aurella Group Pty Ltd, trading as The Global Sanctum.</p>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return <footer className={styles.footer}><div className={styles.footerGrid}><div><img src="https://nextjs-webportal-tgs.vercel.app/images/logo_vector.svg" alt="The Global Sanctum" /><h3>The Global Sanctum</h3><p>Curated wellness venues and transformational retreat spaces worldwide.</p></div><div><h4>Discover</h4><a href={tgsRoutes.venues}>Explore Venues</a><a href={tgsRoutes.wellnessExperiences}>Wellness Experiences</a></div><div><h4>Partner With Us</h4><a href={tgsRoutes.listYourVenue}>List Your Venue</a><a href={tgsRoutes.contact}>Contact Us</a></div><div><h4>Resources</h4><a href={tgsRoutes.wellnessEdit}>The Wellness Edit</a><a href={tgsRoutes.about}>About Us</a></div><div><h4>Legal</h4><a href={tgsRoutes.legal}>Terms & Conditions</a><a href={tgsRoutes.legal}>Privacy Policy</a></div></div></footer>;
}
