"use client";

import { useEffect, useState } from "react";
import SiteNavigation from "@/components/tgs/SiteNavigation";
import { tgsRoutes as routes } from "@/lib/tgsRoutes";
import styles from "./home.module.css";

const img = {
  hero: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1920&q=80",
  intro: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
  coastal: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80",
  forest: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
  desert: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80",
  tropical: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
  thermal: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80",
  mountain: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
  retreat: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
  wellnessVenue: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80",
  experience: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
  insights: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=800&q=80",
  sound: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=600&q=80",
  australia: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80",
  japan: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
  india: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80",
  thailand: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80",
  venueOne:
    "https://vgfpqzbjionzkakoynxw.supabase.co/storage/v1/object/public/photo/pmec2d83du_1779212412250.jpg",
  venueTwo:
    "https://vgfpqzbjionzkakoynxw.supabase.co/storage/v1/object/public/photo/28enyhgut5h_1775714032814.jpeg",
  venueThree: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  logo: "https://nextjs-webportal-tgs.vercel.app/images/logo_vector.svg",
};

const mosaicItems = [
  ["Coastal Sanctuaries", img.coastal, "Coastal sanctuary", "large"],
  ["Forest Hideaways", img.forest, "Forest retreat", ""],
  ["Desert Retreats", img.desert, "Desert retreat", ""],
  ["Tropical Sanctuaries", img.tropical, "Tropical sanctuary", "large"],
  ["Thermal Sanctuaries", img.thermal, "Thermal sanctuary", ""],
  ["Mountain Sanctuaries", img.mountain, "Mountain sanctuary", ""],
] as const;

const paths = [
  ["Retreat Venues", "Curated spaces for immersive retreat experiences.", "Explore Venues", routes.retreatVenues, img.retreat],
  ["Wellness Venues", "Sanctuaries where restoration becomes routine.", "Discover Stays", routes.wellnessVenues, img.wellnessVenue],
  ["Wellness Experiences", "Single sessions and ancient healing traditions.", "Book Experiences", routes.wellnessExperiences, img.experience],
  ["The Wellness Edit", "Stories, guides, and inspiration for the path.", "Browse Articles", routes.wellnessEdit, img.insights],
] as const;

const experiences = [
  ["Hydrotherapy", "Thermal Bathing Rituals", "Ancient waters, volcanic springs, and the art of restoration through heat and cold.", img.thermal, "Thermal bathing"],
  ["Sound Therapy", "Vibrational Sound Journeys", "Crystal bowls, gongs, and frequencies that recalibrate the nervous system.", img.sound, "Sound healing"],
  ["Nature Immersion", "Forest Bathing & Shinrin-Yoku", "The Japanese art of forest medicine and intentional nature connection.", img.forest, "Forest bathing"],
  ["Breathwork", "Conscious Breathing Practices", "Holotropic, Wim Hof, and pranayama traditions for deep transformation.", img.hero, "Breathwork"],
] as const;

const destinations = [
  ["Australia", "Vast landscapes, ancient wellness", img.australia, "Australian landscape", "large"],
  ["Bali", "Sacred island, spiritual sanctuary", img.tropical, "Bali rice terraces", ""],
  ["Japan", "Ancient traditions, thermal waters", img.japan, "Japan zen garden", ""],
  ["India", "Ayurvedic wisdom, sacred journeys", img.india, "India temple", ""],
  ["Thailand", "Tropical healing, mindful traditions", img.thailand, "Thailand temple", ""],
] as const;

const venues = [
  ["Desert Hot Springs", "Relax Hotel and Spa", "Palm Springs, USA", img.venueOne],
  ["Nafplio", "Sunshine Retreat Venue", "Greece", img.venueTwo],
  ["New South Wales", "Rapture Surfcamp Bali Greenbowls", "Australia", img.venueThree],
  ["Japan", "Kyoto Onsen", "Kyoto, Japan", "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&h=800&fit=crop"],
  ["Katoomba", "Serenity Springs", "Katoomba, Australia", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop"],
  ["Urban", "Urban Oasis", "City Retreat", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop"],
] as const;

const premiumVenues = [
  [
    "Coral Bay",
    "Coral Bay, Australia",
    "Relax Hotel and Spa",
    "Barefoot luxury eco-retreat on WA's Coral Coast with ocean wellness and indigenous healing.",
    "Wellness Retreat · Yoga Retreat",
    "https://vgfpqzbjionzkakoynxw.supabase.co/storage/v1/object/public/photo/pdzh5yay3j_1779212412251.jpeg",
  ],
  [
    "Brooklyn",
    "Brooklyn, Australia",
    "Sunshine Retreat Venue",
    "A serene lakeside sanctuary designed for stillness, reflection, and gentle restoration.",
    "Wellness Retreat · Meditation Retreat",
    "https://vgfpqzbjionzkakoynxw.supabase.co/storage/v1/object/public/photo/rsj5j39ij7_1775714032815.jpg",
  ],
  [
    "Katoomba",
    "Katoomba, Australia",
    "Rapture Surfcamp Bali Greenbowls",
    "A purpose-built mountain retreat in the Blue Mountains, designed for transformation and renewal.",
    "Dedicated Retreat Centre",
    "https://vgfpqzbjionzkakoynxw.supabase.co/storage/v1/object/public/photo/py6ly0u5nel_1775286440947.jpg",
  ],
  [
    "Nafplio",
    "Nafplio, Greece",
    "Coral Coast Bay",
    "Where expansion and tranquility comes naturally.",
    "Dedicated Retreat Centre",
    img.coastal,
  ],
  [
    "Bali",
    "Indonesia",
    "Serenity Springs",
    "A space designed for meaningful, intimate retreats.",
    "Villa",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  ],
  [
    "Hahndorf",
    "Hahndorf, Australia",
    "Float & Flow",
    "A heritage retreat property nestled in the Adelaide Hills, offering coastal views and immersive nature experiences.",
    "Heritage Property",
    "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
  ],
] as const;

function QuoteTypewriter() {
  const quote = "What you seek is seeking you.";
  const author = "Rumi";
  const [quoteLength, setQuoteLength] = useState(0);
  const [authorLength, setAuthorLength] = useState(0);

  useEffect(() => {
    if (quoteLength < quote.length) {
      const timer = window.setTimeout(() => setQuoteLength(quoteLength + 1), 42);
      return () => window.clearTimeout(timer);
    }

    if (authorLength < author.length) {
      const timer = window.setTimeout(() => setAuthorLength(authorLength + 1), 80);
      return () => window.clearTimeout(timer);
    }
  }, [authorLength, quoteLength]);

  return (
    <>
      <blockquote>
        &ldquo;{quote.slice(0, quoteLength)}
        {quoteLength < quote.length ? <span className={styles.cursor}>|</span> : null}
        &rdquo;
      </blockquote>
      <p>
        {author.slice(0, authorLength)}
        {quoteLength === quote.length ? <span className={styles.cursor}>|</span> : null}
      </p>
    </>
  );
}

function ImageFill({ src, alt }: { src: string; alt: string }) {
  return (
    <span className={styles.imageFill}>
      <img src={src} alt={alt} />
    </span>
  );
}

export default function WebEntryPage() {
  const [premiumPage, setPremiumPage] = useState(0);
  const [featuredPage, setFeaturedPage] = useState(0);
  const premiumPageSize = 3;
  const featuredPageSize = 4;
  const premiumPages = Math.ceil(premiumVenues.length / premiumPageSize);
  const featuredPages = Math.ceil(venues.length / featuredPageSize);
  const visiblePremium = premiumVenues.slice(
    premiumPage * premiumPageSize,
    premiumPage * premiumPageSize + premiumPageSize,
  );
  const visibleVenues = venues.slice(
    featuredPage * featuredPageSize,
    featuredPage * featuredPageSize + featuredPageSize,
  );

  return (
    <div className={styles.page}>
      <SiteNavigation />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            <img src={img.hero} alt="Retreat sanctuary" />
          </div>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>The Global Sanctum</p>
            <h1 className={styles.heroHeadline}>
              Thoughtfully Curated.
              <br />
              Globally Connected.
            </h1>
            <p className={styles.heroSubtext}>
              Discover exceptional retreat venues and wellness sanctuaries
              around the world.
            </p>

            <div className={styles.heroGlass}>
              <div className={styles.heroSearch}>
                <div className={styles.searchField}>
                  <label>Destination</label>
                  <select defaultValue="">
                    <option value="">Where to?</option>
                    <option>Asia Pacific</option>
                    <option>Europe</option>
                    <option>The Americas</option>
                    <option>Middle East & Africa</option>
                    <option>Australia & Oceania</option>
                  </select>
                </div>
                <div className={styles.searchField}>
                  <label>Venue Type</label>
                  <select defaultValue="">
                    <option value="">Any type</option>
                    <option>Retreat Venue</option>
                    <option>Wellness Studio</option>
                    <option>Spa & Thermal</option>
                    <option>Eco Lodge</option>
                    <option>Monastery / Ashram</option>
                    <option>Wellness Resort</option>
                  </select>
                </div>
                <div className={styles.searchField}>
                  <label>Setting</label>
                  <select defaultValue="">
                    <option value="">Any setting</option>
                    <option>Mountain</option>
                    <option>Beach & Coastal</option>
                    <option>Forest & Jungle</option>
                    <option>Desert</option>
                    <option>Urban</option>
                    <option>Countryside</option>
                    <option>Island</option>
                  </select>
                </div>
                <div className={styles.searchField}>
                  <label>Guests</label>
                  <select defaultValue="">
                    <option value="">How many?</option>
                    <option>1 - 10 guests</option>
                    <option>11 - 20 guests</option>
                    <option>21 - 40 guests</option>
                    <option>41 - 60 guests</option>
                    <option>60+ guests</option>
                  </select>
                </div>
                <button className={styles.searchBtn} type="button">
                  Search
                </button>
              </div>
            </div>

            <div className={styles.heroCtas}>
              <a href={routes.retreatVenues}>Browse Retreat Venues →</a>
              <a href={routes.wellnessVenues}>Explore Wellness Venues →</a>
              <a href={routes.wellnessExperiences}>Discover Experiences →</a>
            </div>
          </div>
        </section>

        <section className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>A New Era of Wellness Discovery</p>
            <h2 className={styles.introTitle}>
              The spaces where wellness happens.{" "}
              <em>The venues where retreats come to life.</em> Curated and
              connected worldwide.
            </h2>
            <p className={styles.introText}>
              We are the world&apos;s first curated platform dedicated exclusively to
              transformative wellness venues and retreat spaces.
            </p>
            <p className={styles.introText}>
              Whether you&apos;re a retreat host seeking the perfect venue, a
              wellness guest designing your next journey, or simply seeking
              restoration, The Global Sanctum connects you with extraordinary
              spaces around the world.
            </p>
            <a className={styles.introLink} href={routes.about}>
              Discover Our Story →
            </a>
          </div>
          <div className={styles.introImage}>
            <img src={img.intro} alt="Spa wellness treatment" loading="lazy" />
          </div>
        </section>

        <section className={styles.explore}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Discover Differently</p>
            <h2 className={styles.sectionTitle}>
              Explore Intentional Spaces Around The World
            </h2>
            <p className={styles.sectionText}>
              From soul-restoring coastal sanctuaries to mountain retreats where
              silence does the work. Thermal springs rising from volcanic earth,
              forest hideaways hidden in ancient canopy - spaces where wellness
              lives in the foundations.
            </p>
          </div>
          <div className={styles.mosaic}>
            {mosaicItems.map(([title, src, alt, size]) => (
              <a
                className={`${styles.imageTile} ${
                  size === "large" ? styles.imageTileLarge : ""
                } ${size === "wide" ? styles.imageTileWide : ""}`}
                href={routes.venues}
                key={title}
              >
                <ImageFill src={src} alt={alt} />
                <div className={styles.tileContent}>
                  <h3>{title}</h3>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.paths}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Find Your Path</p>
            <h2 className={styles.sectionTitle}>Four Ways to Discover</h2>
            <p className={styles.sectionText}>
              From thermal springs to forest sanctuaries, coastal retreats to
              mountain hideaways. Spaces where restoration isn&apos;t an afterthought
              - it&apos;s the foundation.
            </p>
          </div>
          <div className={styles.pathGrid}>
            {paths.map(([title, text, cta, href, src]) => (
              <article className={styles.pathCard} key={title}>
                <ImageFill src={src} alt={title} />
                <div className={styles.pathContent}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <a className={styles.sectionAction} href={href}>
                    {cta} →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.experiences}>
          <div className={styles.splitHeader}>
            <div>
              <p className={styles.eyebrow}>The Year Ahead</p>
              <h2 className={styles.sectionTitle}>
                Defining Wellness Experiences for 2026
              </h2>
            </div>
            <a className={styles.sectionAction} href={routes.wellnessExperiences}>
              Explore All Experiences →
            </a>
          </div>
          <div className={styles.experienceGrid}>
            {experiences.map(([category, title, text, src, alt]) => (
              <article className={styles.experienceCard} key={title}>
                <div className={styles.experienceImage}>
                  <ImageFill src={src} alt={alt} />
                </div>
                <div className={styles.experienceCardContent}>
                  <p className={styles.cardCategory}>{category}</p>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.premium}>
          <div className={styles.splitHeader}>
            <div>
              <p className={styles.eyebrow}>Intentionally Curated</p>
              <h2 className={styles.sectionTitle}>Our Premium Collection</h2>
              <p className={styles.premiumSubtitle}>
                The most exceptional wellness and retreat venues, offering
                unparalleled experiences in extraordinary settings.
              </p>
            </div>
            <a className={styles.sectionAction} href={routes.venues}>
              Explore Premium Venues →
            </a>
          </div>
          <div className={styles.premiumGrid}>
            {visiblePremium.map(([tag, location, title, text, type, src]) => (
              <a className={styles.premiumCard} href={routes.venues} key={title}>
                <div className={styles.premiumImage}>
                  <img src={src} alt={title} />
                  <span>{tag}</span>
                </div>
                <div className={styles.premiumContent}>
                  <p className={styles.premiumLocation}>{location}</p>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <p className={styles.premiumType}>{type}</p>
                  <span className={styles.sectionAction}>Explore Venue →</span>
                </div>
              </a>
            ))}
          </div>
          <div className={styles.carouselControls}>
            <button
              type="button"
              disabled={premiumPage === 0}
              aria-label="Previous premium venues"
              onClick={() => setPremiumPage((page) => Math.max(0, page - 1))}
            >
              &larr;
            </button>
            {Array.from({ length: premiumPages }).map((_, index) => (
              <button
                aria-label={`Premium venues slide ${index + 1}`}
                className={index === premiumPage ? styles.carouselDotActive : styles.carouselDot}
                key={index}
                onClick={() => setPremiumPage(index)}
                type="button"
              />
            ))}
            <button
              type="button"
              disabled={premiumPage === premiumPages - 1}
              aria-label="Next premium venues"
              onClick={() => setPremiumPage((page) => Math.min(premiumPages - 1, page + 1))}
            >
              &rarr;
            </button>
          </div>
        </section>

        <section className={styles.quote}>
          <QuoteTypewriter />
        </section>

        <section className={styles.destinations}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Where Seekers Are Journeying</p>
            <h2 className={styles.sectionTitle}>
              Destinations Defining Wellness Travel
            </h2>
            <p className={styles.sectionText}>
              The places calling to those seeking transformation, restoration,
              and spaces that hold intention in their foundations.
            </p>
          </div>
          <div className={styles.destinationGrid}>
            {destinations.map(([title, text, src, alt, size]) => (
              <a
                className={`${styles.destination} ${
                  size === "large" ? styles.destinationLarge : ""
                }`}
                href={routes.venues}
                key={title}
              >
                <ImageFill src={src} alt={alt} />
                <div className={styles.destinationContent}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.venues}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Featured Sanctuaries</p>
            <h2 className={styles.sectionTitle}>
              Our Collection of Featured Venues
            </h2>
            <p className={styles.sectionText}>
              From Japanese onsen to Greek island retreats. Mountain sanctuaries
              to coastal hideaways. Spaces where the environment does half the
              healing.
            </p>
            <a className={styles.sectionAction} href={routes.venues}>
              Explore All Venues →
            </a>
          </div>
          <div className={styles.venueGrid}>
            {visibleVenues.map(([tag, title, place, src]) => (
              <a className={styles.venueCard} href={routes.venues} key={title}>
                <div className={styles.venueImage}>
                  <img src={src} alt={title} />
                  <span className={styles.venueTag}>{tag}</span>
                </div>
                <div className={styles.venueContent}>
                  <p>{place}</p>
                  <h3>{title}</h3>
                  <span className={styles.sectionAction}>Explore Venue →</span>
                </div>
              </a>
            ))}
          </div>
          <div className={styles.carouselControls}>
            <button
              type="button"
              disabled={featuredPage === 0}
              aria-label="Previous featured sanctuaries"
              onClick={() => setFeaturedPage((page) => Math.max(0, page - 1))}
            >
              &larr;
            </button>
            {Array.from({ length: featuredPages }).map((_, index) => (
              <button
                aria-label={`Featured sanctuaries slide ${index + 1}`}
                className={index === featuredPage ? styles.carouselDotActive : styles.carouselDot}
                key={index}
                onClick={() => setFeaturedPage(index)}
                type="button"
              />
            ))}
            <button
              type="button"
              disabled={featuredPage === featuredPages - 1}
              aria-label="Next featured sanctuaries"
              onClick={() => setFeaturedPage((page) => Math.min(featuredPages - 1, page + 1))}
            >
              &rarr;
            </button>
          </div>
        </section>

        <section className={styles.searchFeatures}>
          <div className={styles.searchImage}>
            <img src={img.intro} alt="Spa wellness treatment" loading="lazy" />
          </div>
          <div>
            <p className={styles.eyebrow}>Discover Intentionally</p>
            <h2 className={styles.searchTitle}>Search Beyond The Surface</h2>
            <p className={styles.bodyText}>
              Search for what truly matters - the practices supported, the
              experiences felt, the spaces designed, the environments created -
              not just where and when.
            </p>
            <div className={styles.featureList}>
              {[
                ["By Modality", "Yoga, breathwork, plant medicine, somatic work, sound healing, permaculture and more."],
                ["By Location", "Coastal sanctuaries, mountain temples, thermal springs, tropical hideaways."],
                ["By Wellness Type", "Ayurvedic, traditional Chinese medicine, thermal hydrotherapy, cryotherapy."],
                ["By Architecture", "Eco lodges, heritage properties, purpose-built centres, minimalist sanctuaries."],
              ].map(([title, text]) => (
                <div className={styles.feature} key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.philosophy}>
          <div>
            <p className={styles.eyebrow}>Our Philosophy</p>
            <h2 className={styles.philosophyTitle}>
              Spaces That Hold Intention In Their Foundations
            </h2>
            <p className={styles.bodyText}>
              We believe that where you practice matters as much as how you
              practice. That architecture can amplify intention. That the right
              environment becomes a silent teacher.
            </p>
            <p className={styles.bodyText}>
              Every venue in our collection has been selected not just for its
              beauty, but for its capacity to hold transformation - spaces built
              with the same care that practitioners bring to their work.
            </p>
            <div className={styles.principles}>
              {[
                ["Intentional Design", "Spaces built for practice, not adapted to it"],
                ["Natural Materials", "Stone, wood, water - elements that ground"],
                ["Cultural Integrity", "Traditions honoured, not commodified"],
                ["Environmental Harmony", "Built with the land, not against it"],
              ].map(([title, text]) => (
                <div key={title}>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.philosophyImages}>
            <img src={img.wellnessVenue} alt="Meditation space" loading="lazy" />
            <img src={img.retreat} alt="Yoga practice" loading="lazy" />
            <img src={img.forest} alt="Forest bathing" loading="lazy" />
          </div>
        </section>

        <section className={styles.newsletter}>
          <div className={styles.newsletterInner}>
            <p className={styles.eyebrow}>Stay Connected</p>
            <h2 className={styles.newsletterTitle}>Join The Community</h2>
            <p className={styles.bodyText}>
              Featured venues, practitioner spotlights, wellness discoveries,
              and our global calendar of retreats. Curated for the Sanctum
              community, delivered weekly.
            </p>
            <form className={styles.newsletterForm}>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <img src={img.logo} alt="The Global Sanctum" />
            <h3>The Global Sanctum</h3>
            <p>
              Extraordinary retreat spaces, wellness venues, and the experiences
              they hold - curated and connected worldwide.
            </p>
          </div>
          <div className={styles.footerCol}>
            <h4>About TGS</h4>
            <a href={routes.about}>About Us</a>
            <a href={routes.howItWorks}>How It Works</a>
          </div>
          <div className={styles.footerCol}>
            <h4>Discover</h4>
            <a href={routes.retreatVenues}>Retreat Venues</a>
            <a href={routes.wellnessVenues}>Wellness Venues</a>
            <a href={routes.wellnessExperiences}>Experiences</a>
          </div>
          <div className={styles.footerCol}>
            <h4>Partner With Us</h4>
            <a href={routes.listYourVenue}>List Your Venue</a>
            <a href={routes.contact}>Press & Media</a>
          </div>
          <div className={styles.footerCol}>
            <h4>Resources</h4>
            <a href={routes.wellnessEdit}>The Wellness Edit</a>
            <a href={routes.contact}>Join the Journal</a>
          </div>
        </div>
        <p className={styles.copyright}>
          © 2026 The Global Sanctum. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
