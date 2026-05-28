import SiteNavigation from "@/components/tgs/SiteNavigation";
import { tgsRoutes } from "@/lib/tgsRoutes";
import styles from "./about.module.css";

const values = [
  ["◇", "Curated With Intention", "Every venue listed with The Global Sanctum is curated for its transformational qualities - spaces designed with intention, facilities created for genuine wellness work."],
  ["◈", "Built To Serve", "Technology should handle what technology does best - bookings, calendars, payments, coordination - freeing everyone to focus on what matters."],
  ["◎", "Transparency First", "Honest curation, accurate information, open communication about what each venue genuinely offers. No false promises. No inflated claims."],
  ["⬡", "Connection & Community", "Transformation thrives through connection. We unite venue owners, retreat hosts, and wellness guests in an ecosystem serving everyone."],
  ["◉", "Global By Design", "Wellness and retreat venues exist across every continent. We curate them from Southeast Asia to the Mediterranean, the Pacific to the Middle East."],
  ["★", "Elevating The Industry", "Retreat venues, wellness facilities, and the transformational work happening within them deserve world-class infrastructure."],
] as const;

const valueIcons = ["◇", "◆", "◎", "⬡", "◉", "★"] as const;

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <SiteNavigation />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Our Story</p>
            <h1>About The Global Sanctum</h1>
          </div>
        </section>

        <section className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Wellness Redefined</p>
            <h2 className={styles.title}>
              The Premier Platform <em>Connecting Transformation</em>
            </h2>
            <p className={styles.text}>
              Extraordinary retreat spaces, wellness venues, and the experiences they hold — curated and connected worldwide.
            </p>
            <p className={styles.text}>
              Where finding your sanctuary is effortless. Where booking your retreat is seamless. Where the full spectrum of wellness becomes discoverable.
            </p>
          </div>
          <div className={styles.imageWrap}>
            <img src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80" alt="Meditation practice" />
          </div>
        </section>

        <section className={styles.problem}>
          <div className={styles.inner}>
            <div className={styles.center}>
              <h2 className={styles.title}><em>The Problem</em> We Saw</h2>
              <p className={styles.text}>The wellness industry had energy, intention, and growth - but was missing the platform to support it.</p>
            </div>
            <div className={styles.problemGrid}>
              <div className={styles.wideImage}>
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80" alt="Person at laptop" />
              </div>
              <div className={styles.cards}>
                <article className={styles.problemCard}>
                  <h3>For Wellness Guests</h3>
                  <p className={styles.text}>The full spectrum of wellness — traditional healing to modern modalities, sacred practices to therapeutic experiences — remained scattered. No unified place to find what exists globally.</p>
                </article>
                <article className={styles.problemCard}>
                  <h3>For Retreat Hosts</h3>
                  <p className={styles.text}>Months of searching. Navigating fragmented processes, managing bookings across multiple platforms. Time spent searching instead of designing transformational experiences.</p>
                </article>
                <article className={styles.problemCard}>
                  <h3>For Venue Owners</h3>
                  <p className={styles.text}>Manually managing leads that went nowhere. Revenue leaking through lost time and disjointed systems. Hours spent answering enquiries that never converted. Administrative work consuming what should have been profit.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.solution}>
          <div>
            <p className={styles.eyebrow}>The Solution</p>
            <h2 className={styles.title}><em>One Platform</em> Connecting Everyone Who Creates Transformation</h2>
            <p className={styles.text}>The Global Sanctum exists to solve this. We built a platform where the full spectrum of wellness becomes discoverable.</p>
            <p className={styles.text}>Traditional healing practices to modern modalities. Coastal sanctuaries to mountain temples, urban bathhouses to forest hideaways. Curated for depth, not volume. Transparent information, trusted bookings, seamless coordination.</p>
            <p className={styles.text}>For retreat hosts, months of searching reduced to precision. For wellness guests, access to experiences that remained hidden — authenticated, curated, gathered in one place. For venue owners, technology that liberates instead of burdens.</p>
          </div>
          <div className={styles.imageWrap}>
            <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80" alt="Wellness space" />
          </div>
        </section>

        <section className={styles.visionMission}>
          <div className={styles.visionMissionGrid}>
            <article className={styles.vmCard}>
              <h3>Our Vision</h3>
              <p className={styles.text}>A platform where wellness venues and experiences become discoverable. Traditional practices alongside modern modalities - Japanese onsens to Ayurvedic centers, forest temples to coastal facilities.</p>
              <p className={styles.text}>Venue owners with technology handling operations so they can focus on creating sanctuary. Hosts finding what their retreats need with clarity and confidence.</p>
            </article>
            <article className={styles.vmCard}>
              <h3>Our Mission</h3>
              <p className={styles.text}>We exist to make wellness accessible to everyone seeking transformation - and to support everyone creating it.</p>
              <p className={styles.text}>Traditional practices honored for centuries alongside modern modalities advancing today. We serve three communities equally, building infrastructure this industry needs to flourish.</p>
            </article>
          </div>
        </section>

        <section className={styles.quote}>
          <div>
            <blockquote>&ldquo;Just the first chapter. The story we&apos;re writing is much bigger than this.&rdquo;</blockquote>
            <p className={styles.eyebrow}>The Global Sanctum</p>
          </div>
        </section>

        <section className={styles.founder}>
          <div>
            <p className={styles.eyebrow}>The Founder</p>
            <h2 className={styles.title}>A Note From Kate</h2>
            <p className={styles.text}>Everything I&apos;ve experienced has converged in The Global Sanctum.</p>
            <p className={styles.text}>Professionally, I built expertise in real estate, property, and mortgage broking - understanding how markets work, how spaces create value, how infrastructure supports growth.</p>
            <p className={styles.text}>Personally, I walked my own path through life coaching, spiritual practice, and personal development. That journey taught me the power of transformation — not just from the spaces we inhabit, but from the expert facilitators, hosts, and coaches who guide the work. Both matter profoundly.</p>
            <p className={styles.text}>The Global Sanctum is where these paths align. My professional background meeting my values and personal journey. Real estate knowledge applied to an industry I genuinely care about. Infrastructure that serves spaces designed for transformation and the people leading that transformation.</p>
            <p className={styles.text}>This is where my experience, my values, and what this industry needs come together.</p>
            <p className={styles.text}>We&apos;re just beginning.</p>
            <p className={styles.signature}>- Kate</p>
          </div>
          <div className={styles.founderImage}>
            <img src="https://nextjs-webportal-tgs.vercel.app/images/Kate%20Beston%20Headshot.jpg" alt="Kate Beston - Founder" />
          </div>
        </section>

        <section className={styles.values}>
          <div className={styles.inner}>
            <div className={styles.center}>
              <p className={styles.eyebrow}>What Guides Us</p>
              <h2 className={styles.title}>Our Values</h2>
            </div>
            <div className={styles.valuesGrid}>
              {values.map(([, title, text], index) => (
                <article className={styles.valueCard} key={title}>
                  <div className={styles.valueIcon}>{valueIcons[index]}</div>
                  <h3>{title}</h3>
                  <p className={styles.text}>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.newsletter}>
          <div className={styles.newsletterInner}>
            <p className={styles.eyebrow}>Stay Connected</p>
            <h2 className={styles.title}>Join The Community</h2>
            <p className={styles.text}>Featured venues, practitioner spotlights, wellness discoveries, and our global calendar of retreats. Curated for the Sanctum community, delivered weekly.</p>
            <form className={styles.form}>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      </main>

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
          <div><h4>Resources</h4><a href={tgsRoutes.wellnessEdit}>The Wellness Edit</a><a href={tgsRoutes.legal}>Legal</a></div>
        </div>
      </footer>
    </div>
  );
}
