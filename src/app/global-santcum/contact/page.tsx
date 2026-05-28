"use client";

import { useState } from "react";
import SiteNavigation from "@/components/tgs/SiteNavigation";
import { tgsRoutes } from "@/lib/tgsRoutes";
import styles from "./contact.module.css";

const faqs = [
  [
    "How does The Global Sanctum work?",
    "The Global Sanctum is a curated marketplace connecting wellness guests and retreat hosts with exceptional venues worldwide. Browse our collection, compare facilities and pricing, and book seamlessly — our team manages the entire process via the platform, from enquiry to confirmation.",
  ],
  [
    "What types of venues are listed?",
    "We feature two categories: retreat venues for exclusive-use multi-day programs including yoga shalas, meditation centres, and nature lodges; and wellness venues encompassing everything from day-use therapeutic facilities such as onsens, thermal springs, and healing centres through to multi-day wellness hotels and residential wellness properties.",
  ],
  [
    "How do I list my venue?",
    "Visit our List Your Venue page to begin the onboarding process. Our team will guide you through every step — from creating your listing to connecting with your first retreat hosts and wellness guests.",
  ],
  [
    "Can I contact a venue directly?",
    "All enquiries flow through The Global Sanctum to ensure a smooth, accountable booking experience for both venue partners and guests. Our platform manages the entire process end to end.",
  ],
] as const;

const paths = [
  ["○", "Wellness Travelers", "Seeking a transformative retreat or wellness experience? Let us help you find the perfect sanctuary.", "Get in touch"],
  ["◇", "Retreat Hosts", "Looking for the ideal venue for your next retreat or program? We curate spaces designed for transformation.", "Find your venue"],
  ["⬡", "Venue Owners", "Ready to showcase your property to a global audience? We'd love to welcome you to our collection.", "List your venue"],
] as const;

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <img src="https://nextjs-webportal-tgs.vercel.app/images/logo_vector.svg" alt="The Global Sanctum" />
          <h3>The Global Sanctum</h3>
          <p>Extraordinary retreat spaces, wellness venues, and the experiences they hold — curated and connected worldwide.</p>
          <p>Aurella Group Pty Ltd<br />ABN 70 649 742 423</p>
          <div className={styles.footerSocial}><a href="#">Instagram</a><a href="#">Facebook</a><a href="#">LinkedIn</a></div>
        </div>
        <div><h4>About TGS</h4><a href={tgsRoutes.about}>About Us</a><a href={tgsRoutes.howItWorks}>How It Works</a></div>
        <div><h4>Discover</h4><a href={tgsRoutes.retreatVenues}>Retreat Venues</a><a href={tgsRoutes.wellnessVenues}>Wellness Venues</a><a href={tgsRoutes.wellnessExperiences}>Experiences</a></div>
        <div><h4>Partner With Us</h4><a href={tgsRoutes.listYourVenue}>List Your Venue</a><a href={tgsRoutes.contact}>Press & Media</a></div>
        <div><h4>Resources</h4><a href={tgsRoutes.wellnessEdit}>The Wellness Edit</a><a href={tgsRoutes.wellnessEdit}>Join the Journal</a></div>
        <div><h4>Legal</h4><a href={tgsRoutes.legal}>Terms & Conditions</a><a href={tgsRoutes.legal}>Privacy Policy</a><a href={tgsRoutes.legal}>Cookie Policy</a></div>
      </div>
      <div className={styles.footerBottom}>© 2026 The Global Sanctum. All rights reserved.</div>
    </footer>
  );
}

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(-1);
  const [sent, setSent] = useState(false);

  return (
    <div className={styles.page}>
      <SiteNavigation mode="dark" />
      <main>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Get In Touch</p>
          <h1>We&apos;d Love to Hear From You</h1>
          <p>Whether you&apos;re a wellness traveler seeking your next sanctuary, a retreat host searching for the perfect venue, or a venue owner ready to connect with a global audience — we&apos;re here to help.</p>
        </section>

        <section className={styles.contactSection}>
          <div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>General Enquiries</span>
              <h2 className={styles.infoTitle}>Start a Conversation</h2>
              <p className={styles.infoText}>We welcome questions about our platform, partnerships, and services. Reach us directly at <a href="mailto:hello@theglobalsanctum.com">hello@theglobalsanctum.com</a></p>
              <div className={styles.divider} />
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>For Venue Owners</span>
              <h2 className={styles.infoTitle}>List Your Venue</h2>
              <p className={styles.infoText}>Interested in showcasing your retreat or wellness venue to a global audience? Learn more about partnering with us.</p>
              <div className={styles.divider} />
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Press & Media</span>
              <h2 className={styles.infoTitle}>Media Enquiries</h2>
              <p className={styles.infoText}>For press enquiries or collaboration opportunities, please contact press@theglobalsanctum.com</p>
            </div>
            <div className={styles.responseNote}>
              <span>◇</span>
              <p>Our team typically responds within 24–48 hours during business days. For urgent matters, please note this in your message subject line.</p>
            </div>
          </div>

          <div className={styles.formWrap}>
            <h2>Send Us a Message</h2>
            <p>All fields marked with an asterisk are required.</p>
            <form
              className={styles.form}
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
                window.setTimeout(() => setSent(false), 3000);
              }}
            >
              <div className={styles.row}>
                <div><label>First Name *</label><input placeholder="Your first name" required /></div>
                <div><label>Last Name *</label><input placeholder="Your last name" required /></div>
              </div>
              <div><label>Email Address *</label><input type="email" placeholder="your@email.com" required /></div>
              <div>
                <label>I am a</label>
                <select defaultValue="">
                  <option value="" disabled>Please select...</option>
                  <option>Wellness Traveler</option>
                  <option>Retreat Host</option>
                  <option>Venue Owner</option>
                  <option>Press / Media</option>
                  <option>Partner</option>
                </select>
              </div>
              <div>
                <label>Subject *</label>
                <select defaultValue="" required>
                  <option value="" disabled>Select a topic...</option>
                  <option>General enquiry</option>
                  <option>Venue enquiry</option>
                  <option>List my venue</option>
                  <option>Press and media</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div><label>Message *</label><textarea placeholder="Tell us how we can help..." required /></div>
              <button className={styles.submit} type="submit">{sent ? "Message Sent" : "Send Message"}</button>
            </form>
          </div>
        </section>

        <section className={styles.enquiryTypes}>
          <div className={styles.enquiryInner}>
            <div className={styles.enquiryHeader}>
              <p className={styles.eyebrow}>How Can We Help</p>
              <h2>Choose Your Path</h2>
            </div>
            <div className={styles.enquiryGrid}>
              {paths.map(([icon, title, text, link]) => (
                <article className={styles.enquiryCard} key={title}>
                  <div>{icon}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <a href={title === "Venue Owners" ? tgsRoutes.listYourVenue : tgsRoutes.venues}>{link} →</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.faq}>
          <div className={styles.faqHeader}>
            <p className={styles.eyebrow}>Common Questions</p>
            <h2 className={styles.faqTitle}>Frequently Asked</h2>
          </div>
          {faqs.map(([question, answer], index) => (
            <article className={styles.faqItem} key={question}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                <span>{question}</span>
                <span>{openFaq === index ? "×" : "+"}</span>
              </button>
              {openFaq === index ? <p>{answer}</p> : null}
            </article>
          ))}
        </section>

        <section className={styles.newsletter}>
          <p className={styles.eyebrow}>Stay Connected</p>
          <h2>Join The Community</h2>
          <p>Featured venues, practitioner spotlights, wellness discoveries, and our global calendar of retreats. Curated for the Sanctum community, delivered weekly.</p>
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
