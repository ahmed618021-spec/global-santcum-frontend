"use client";

import { useEffect, useState } from "react";
import { tgsRoutes } from "@/lib/tgsRoutes";
import styles from "./site-navigation.module.css";

export default function SiteNavigation({
  mode = "transparent",
}: {
  mode?: "transparent" | "solid" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <nav
        className={`${styles.nav} ${mode === "solid" ? styles.solid : ""} ${mode === "dark" ? styles.dark : ""} ${
          scrolled || open ? styles.scrolled : ""
        }`}
        id="nav"
      >
        <div className={styles.navInner}>
          <button
            className={styles.navLeft}
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="navDrawer"
            onClick={() => setOpen((current) => !current)}
          >
            <span className={styles.navHamburger} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className={styles.navHamburgerLabel}>Menu</span>
          </button>
          <a className={styles.navLogoArea} href={tgsRoutes.home}>
            <span className={styles.navLogo}>
              <img
                src="https://nextjs-webportal-tgs.vercel.app/images/logo_vector.svg"
                alt="The Global Sanctum"
              />
            </span>
            <span className={styles.navBrandText}>The Global Sanctum</span>
          </a>
          <div className={styles.navRight} />
        </div>
      </nav>

      <button
        className={`${styles.navOverlay} ${open ? styles.open : ""}`}
        aria-label="Close navigation menu"
        aria-hidden={!open}
        type="button"
        onClick={() => setOpen(false)}
      />

      <aside
        className={`${styles.navDrawer} ${open ? styles.open : ""}`}
        id="navDrawer"
        aria-hidden={!open}
        aria-label="Navigation menu"
      >
        <div className={styles.navDrawerHeader}>
          <span className={styles.navDrawerLabel} aria-hidden="true" />
          <button
            className={styles.navDrawerClose}
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
        </div>
        <div className={styles.navDrawerLinks}>
          <p className={styles.navDrawerSectionLabel}>Discover</p>
          <a href={tgsRoutes.venues}>Explore Venues</a>
          <a href={tgsRoutes.wellnessExperiences}>Wellness Experiences</a>

          <p className={styles.navDrawerSectionLabel}>Learn</p>
          <a href={tgsRoutes.about}>About Us</a>
          <a href={tgsRoutes.howItWorks}>How It Works</a>
          <a href={tgsRoutes.wellnessEdit}>The Wellness Edit</a>

          <p className={styles.navDrawerSectionLabel}>Connect</p>
          <a href={tgsRoutes.contact}>Contact Us</a>
          <a href={tgsRoutes.listYourVenue}>List Your Venue</a>
        </div>
        <div className={styles.navDrawerFooter}>
          <p>
            Questions? Reach us at
            <br />
            <a href="mailto:hello@theglobalsanctum.com">
              hello@theglobalsanctum.com
            </a>
          </p>
        </div>
      </aside>
    </>
  );
}
