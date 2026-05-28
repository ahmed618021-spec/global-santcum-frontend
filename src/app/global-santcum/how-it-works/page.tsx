import SiteNavigation from "@/components/tgs/SiteNavigation";
import { tgsRoutes } from "@/lib/tgsRoutes";
import styles from "./how.module.css";

const guestSteps = [
  ["Discover", "Browse our curated collection of wellness venues and retreat spaces. Filter by location, experience type, amenities, and more to find your perfect match."],
  ["Explore", "View detailed venue profiles with high-resolution galleries, comprehensive facility information, services offered, and authentic reviews."],
  ["Connect", "Reach out to venues directly through our platform. Ask questions, check availability, and discuss your specific needs."],
  ["Book", "Reserve your experience with confidence. Secure payment, instant confirmation, and flexible cancellation options."],
] as const;

const hostSteps = [
  ["Search", "Find the perfect venue for your retreat program. Filter by capacity, facilities, location, and specific wellness modalities."],
  ["Compare", "Evaluate venues side by side. Review detailed information about spaces, accommodation, catering options, and past host reviews."],
  ["Enquire", "Submit your retreat requirements. Our team works with you and the venue to coordinate dates, group size, and special arrangements."],
  ["Confirm", "Secure your venue with a deposit. We handle the logistics so you can focus on creating an exceptional retreat experience."],
] as const;

const ownerSteps = [
  ["Apply", "Submit your venue for review. We curate all listings to ensure quality and alignment with our wellness community."],
  ["Create", "Build your comprehensive venue profile. Upload photos, describe your facilities, and highlight what makes your space unique."],
  ["Connect", "Receive enquiries from qualified retreat hosts and wellness guests. Our platform facilitates direct communication."],
  ["Grow", "Manage bookings through your dashboard. Track performance, update availability, and build your reputation in the wellness community."],
] as const;

function JourneySection({
  eyebrow,
  title,
  steps,
  alt,
}: {
  eyebrow: string;
  title: React.ReactNode;
  steps: readonly (readonly [string, string])[];
  alt?: boolean;
}) {
  return (
    <section className={`${styles.journey} ${alt ? styles.journeyAlt : ""}`}>
      <div className={styles.inner}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.steps}>
          {steps.map(([stepTitle, text], index) => (
            <article className={styles.step} key={stepTitle}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <h3>{stepTitle}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div>
          <img src="https://nextjs-webportal-tgs.vercel.app/images/logo_vector.svg" alt="The Global Sanctum" />
          <h3>The Global Sanctum</h3>
          <p>Extraordinary retreat spaces, wellness venues, and the experiences they hold - curated and connected worldwide.</p>
          <p>Aurella Group Pty Ltd<br />ABN 70 649 742 423</p>
        </div>
        <div><h4>About TGS</h4><a href={tgsRoutes.about}>About Us</a><a href={tgsRoutes.howItWorks}>How It Works</a></div>
        <div><h4>Discover</h4><a href={tgsRoutes.retreatVenues}>Retreat Venues</a><a href={tgsRoutes.wellnessVenues}>Wellness Venues</a><a href={tgsRoutes.wellnessExperiences}>Experiences</a></div>
        <div><h4>Partner With Us</h4><a href={tgsRoutes.listYourVenue}>List Your Venue</a><a href={tgsRoutes.contact}>Contact Us</a></div>
          <div><h4>Resources</h4><a href={tgsRoutes.wellnessEdit}>The Wellness Edit</a><a href={tgsRoutes.wellnessEdit}>Join the Journal</a></div>
          <div><h4>Legal</h4><a href={tgsRoutes.legal}>Terms & Conditions</a><a href={tgsRoutes.legal}>Privacy Policy</a><a href={tgsRoutes.legal}>Cookie Policy</a></div>
        </div>
      </footer>
  );
}

export default function HowItWorksPage() {
  return (
    <div className={styles.page}>
      <SiteNavigation />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>How It Works</p>
            <h1>Your Journey with <em>The Global Sanctum</em></h1>
            <p>Discover how we connect wellness travelers and retreat hosts with exceptional venues worldwide. A seamless experience from discovery to booking.</p>
          </div>
        </section>

        <JourneySection eyebrow="For Wellness Travelers" title={<>Find Your <em>Sanctuary</em></>} steps={guestSteps} />
        <JourneySection eyebrow="For Retreat Hosts" title={<>Host Your <em>Transformation</em></>} steps={hostSteps} alt />
        <JourneySection eyebrow="For Venue Owners" title={<>Showcase Your <em>Space</em></>} steps={ownerSteps} />

        <section className={styles.why}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>Our Difference</p>
              <h2 className={styles.title}><em>Why</em> The Global Sanctum?</h2>
            </div>
            <div className={styles.whyGrid}>
              <article className={styles.whyCard}><h3>Curated Excellence</h3><p>Every venue is personally vetted. We prioritize quality over quantity, ensuring only exceptional spaces make it to our platform.</p></article>
              <article className={styles.whyCard}><h3>Transparent Pricing</h3><p>No hidden fees. Clear commission structures. You always know exactly what you&apos;re paying for.</p></article>
              <article className={styles.whyCard}><h3>Dedicated Support</h3><p>Our team is here to help at every step. From venue selection to booking confirmation, we&apos;ve got you covered.</p></article>
              <article className={styles.whyCard}><h3>Community Driven</h3><p>Join a global network of wellness practitioners, retreat hosts, and seekers united by a passion for transformation.</p></article>
            </div>
          </div>
        </section>

        <section className={styles.ready}>
          <h2>Ready to Begin?</h2>
          <p>Whether you&apos;re seeking a transformative experience or looking to share your space with the world, your journey starts here.</p>
          <div className={styles.readyLinks}>
            <a href={tgsRoutes.venues}>Explore Venues</a>
            <a href={tgsRoutes.listYourVenue}>List Your Space</a>
          </div>
        </section>

        <section className={styles.newsletter}>
          <p className={styles.eyebrow}>Stay Connected</p>
          <h2>Join The Community</h2>
          <p>Featured venues, practitioner spotlights, wellness discoveries, and our global calendar of retreats. Curated for the Sanctum community, delivered weekly.</p>
          <form className={styles.form}>
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
