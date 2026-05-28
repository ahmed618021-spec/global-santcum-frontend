"use client";

import { useMemo, useState } from "react";
import SiteNavigation from "@/components/tgs/SiteNavigation";
import { tgsRoutes } from "@/lib/tgsRoutes";
import styles from "./wellness-edit.module.css";

const topics = ["All", "Practical Guides", "Data & Trends", "Essays & Culture", "Design & Architecture"] as const;

const articles = [
  ["Practical Guides", "The Compass", "The Week Before Your Retreat: Slowing Down To Prepare", "Most of us arrive at a retreat still carrying everything we meant to leave behind. A guide to the seven days that shape what becomes possible once you're there.", "8 April 2026", "https://cdn.sanity.io/images/3kjpidry/production/208c514f4c6a04603d7c77fe9919b47913ad753a-1500x500.png"],
  ["Data & Trends", "Pulse", "The $1.3 Trillion Wellness Tourism Market: Where The Money Is Actually Going", "An analysis of the market's scale, its geographic distribution, and the booking behaviours reshaping where the industry is heading next.", "6 April 2026", "https://cdn.sanity.io/images/3kjpidry/production/d2f96ceaa59be40e56966ec27e21e044df77c92b-1500x500.png"],
  ["Essays & Culture", "Philosophy", "The Psychology Of Healing Spaces", "Why certain spaces change how we feel before anything happens, and what environmental psychology reveals about healing environments.", "29 March 2026", "https://cdn.sanity.io/images/3kjpidry/production/ad702d490ce4abe5ac2c0db9830b4d730f25719c-1500x500.png"],
  ["Design & Architecture", "Form", "The Power Of Views", "A window is not a hole in a wall. It is a decision about what the body will see, how the mind will rest, and where the eye is invited to travel.", "29 March 2026", "https://cdn.sanity.io/images/3kjpidry/production/69a5d574b066159a56493aa6e81925f3b5e8ad46-1500x500.png"],
  ["Design & Architecture", "Form", "Colour Therapy In Retreat Architecture & Design", "Colour is never neutral. Every retreat space is already treating its guests through palette before a single program begins.", "29 March 2026", "https://cdn.sanity.io/images/3kjpidry/production/7d56aad8e7be99aa18e0ab29dde5fc1e7acda8f7-500x500.png"],
  ["Design & Architecture", "Form", "Sacred Geometry In Retreat Space Architecture", "There is a reason certain spaces make you exhale the moment you walk in. Sacred geometry quietly shapes the next generation of retreat design.", "29 March 2026", "https://cdn.sanity.io/images/3kjpidry/production/a9f8497f9c20a29f24e67338819e988bf07c978b-1500x500.png"],
  ["Design & Architecture", "Form", "Biophilic Design: Bringing Nature Inside", "How transformative retreat spaces use nature as their primary design language, from living walls to natural light and raw materials.", "21 March 2026", "https://cdn.sanity.io/images/3kjpidry/production/23b822df2ac6dee13d3f3a3d4427fcef34ccbdea-6720x4480.jpg"],
  ["Design & Architecture", "Form", "The Room Speaks First", "The most transformative wellness experiences begin with the space itself: the light, the materials, and the silence.", "21 March 2026", "https://cdn.sanity.io/images/3kjpidry/production/48bffbf585eb38b6d5a6301a13b46b44070ee9a0-5824x3264.jpg"],
] as const;

export default function TheWellnessEditPage() {
  const [topic, setTopic] = useState<(typeof topics)[number]>("All");
  const filtered = useMemo(() => topic === "All" ? articles : articles.filter(([articleTopic]) => articleTopic === topic), [topic]);

  return (
    <div className={styles.page}>
      <SiteNavigation mode="dark" />
      <main>
        <section className={styles.lightHero}>
          <div className={styles.heroContent}>
            <div className={styles.breadcrumbs}>
              <a href={tgsRoutes.home}>Home</a>
              <span>›</span>
              <span>The Wellness Edit</span>
            </div>
            <h1 className={styles.title}>The Wellness Edit</h1>
            <p className={styles.subtitle}>Considered perspectives on the spaces, practices, and philosophies shaping how we heal, travel, and live with intention.</p>
          </div>
        </section>
        <section className={styles.articlesSection}>
          <div className={styles.inner}>
            <div className={styles.tabs}>
              {topics.map((item) => (
                <button className={topic === item ? styles.activeTab : ""} key={item} type="button" onClick={() => setTopic(item)}>
                  {item}
                </button>
              ))}
            </div>
            <div className={styles.articleGrid}>
              {filtered.map(([articleTopic, category, title, excerpt, date, image], index) => (
                <a className={`${styles.article} ${index === 0 ? styles.articleLead : ""}`} href={tgsRoutes.wellnessEdit} key={title}>
                  <div className={styles.articleImage}>
                    <img src={`${image}?w=1200&h=800&fit=crop&auto=format`} alt={title} loading="eager" decoding="async" />
                    <span>{category}</span>
                  </div>
                  <div className={styles.articleBody}>
                    <span className={styles.articleCategory}>{category}</span>
                    <h3>{title}</h3>
                    <p>{excerpt}</p>
                    <div className={styles.articleMeta}>{date} · 5 min read · {articleTopic}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.journalCta}>
          <p className={styles.eyebrow}>The Sanctum Journal</p>
          <h2>Monthly perspectives, delivered to your inbox</h2>
          <form className={styles.journalForm}>
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <img src="https://nextjs-webportal-tgs.vercel.app/images/logo_vector.svg" alt="The Global Sanctum" />
          <h3>The Global Sanctum</h3>
          <p>Extraordinary retreat spaces, wellness venues, and the experiences they hold — curated and connected worldwide.</p>
          <p>Aurella Group Pty Ltd<br />ABN 70 649 742 423</p>
        </div>
        <div><h4>About TGS</h4><a href={tgsRoutes.about}>About Us</a><a href={tgsRoutes.howItWorks}>How It Works</a></div>
        <div><h4>Discover</h4><a href={tgsRoutes.retreatVenues}>Retreat Venues</a><a href={tgsRoutes.wellnessVenues}>Wellness Venues</a><a href={tgsRoutes.wellnessExperiences}>Experiences</a></div>
        <div><h4>Partner With Us</h4><a href={tgsRoutes.listYourVenue}>List Your Venue</a><a href={tgsRoutes.contact}>Press & Media</a></div>
        <div><h4>Resources</h4><a href={tgsRoutes.wellnessEdit}>The Wellness Edit</a><a href={tgsRoutes.wellnessEdit}>Join the Journal</a></div>
        <div><h4>Legal</h4><a href={tgsRoutes.legal}>Terms & Conditions</a><a href={tgsRoutes.legal}>Privacy Policy</a><a href={tgsRoutes.legal}>Cookies Policy</a></div>
      </div>
      <div className={styles.footerBottom}>© 2026 The Global Sanctum. All rights reserved.</div>
    </footer>
  );
}
