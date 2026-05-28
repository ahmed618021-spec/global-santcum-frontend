"use client";

import { useState } from "react";
import SiteNavigation from "@/components/tgs/SiteNavigation";
import { tgsRoutes } from "@/lib/tgsRoutes";
import styles from "./wellness-experiences.module.css";

type VenueResult = {
  name: string;
  location: string;
  country: string;
  price: string;
  duration: string;
  image: string;
};

type Category = {
  name: string;
  tagline: string;
  image: string;
  imageAlt: string;
  label: string;
  intro: string;
  categorySlug: string;
  linkText: string;
  tags: string[];
};

const defaultVenues: VenueResult[] = [
  {
    name: "Intaaya Wellness Sanctuary",
    location: "Ubud, Bali",
    country: "Indonesia",
    price: "From $95",
    duration: "75 min",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
  },
  {
    name: "The Sanctuary Byron",
    location: "Byron Bay, Australia",
    country: "Australia",
    price: "From A$120",
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
  },
  {
    name: "Amataya Wellness Resort",
    location: "Chiang Mai, Thailand",
    country: "Thailand",
    price: "From $110",
    duration: "90 min",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
  },
];

const venueResults: Record<string, VenueResult[]> = {
  "Japanese Onsen": [
    {
      name: "Goen no Mori Retreat",
      location: "Yugawara, Japan",
      country: "Japan",
      price: "From JPY 45,000",
      duration: "90 min",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80",
    },
    {
      name: "Kurama Mountain Retreat",
      location: "Kyoto, Japan",
      country: "Japan",
      price: "From JPY 38,000",
      duration: "60 min",
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80",
    },
  ],
  "Contrast Therapy": [
    {
      name: "Aenaon Villas",
      location: "Santorini, Greece",
      country: "Greece",
      price: "From EUR 120",
      duration: "60 min",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    },
    {
      name: "Herdade da Comporta",
      location: "Alentejo, Portugal",
      country: "Portugal",
      price: "From EUR 95",
      duration: "75 min",
      image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80",
    },
    defaultVenues[1],
  ],
  "Hatha Yoga": [
    defaultVenues[0],
    defaultVenues[1],
    {
      name: "Bodhi Tree Yoga",
      location: "Nosara, Costa Rica",
      country: "Costa Rica",
      price: "From $80",
      duration: "90 min",
      image: "https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80",
    },
  ],
  Pranayama: [defaultVenues[0], defaultVenues[2], defaultVenues[1]],
  "Sound Bath": [defaultVenues[2], defaultVenues[0], defaultVenues[1]],
  Panchakarma: [
    {
      ...defaultVenues[2],
      price: "From $320/day",
      duration: "5-21 days",
    },
    {
      ...defaultVenues[0],
      price: "From $280/day",
      duration: "7-14 days",
    },
  ],
};

const categories: Category[] = [
  {
    name: "Thermal & Hydrotherapy",
    tagline: "Ancient waters, volcanic springs, heat and cold immersion",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80",
    imageAlt: "Thermal bathing",
    label: "Ancient waters.\nVolcanic springs.",
    intro:
      "From Japanese onsen to Scandinavian contrast rituals, water has been humanity's oldest healing medium. These practices harness heat, cold, and mineral-rich waters to restore and recalibrate.",
    categorySlug: "thermal",
    linkText: "Explore all thermal & hydrotherapy venues",
    tags: ["Japanese Onsen", "Contrast Therapy", "Flotation & REST", "Thalassotherapy", "Steam & Sauna Rituals", "Cold Water Immersion", "Hammam & Ritual Bathing"],
  },
  {
    name: "Yoga & Movement",
    tagline: "Classical traditions, somatic practices, conscious movement",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80",
    imageAlt: "Yoga practice",
    label: "Classical traditions.\nConscious movement.",
    intro:
      "From the stillness of Yin to the fire of Kundalini. Classical yoga traditions alongside contemporary somatic and movement practices that bring the body into conversation with the mind.",
    categorySlug: "yoga",
    linkText: "Explore all yoga & movement venues",
    tags: ["Hatha Yoga", "Vinyasa & Flow", "Yin Yoga", "Kundalini Yoga", "Somatic Movement", "Qigong & Tai Chi", "Ecstatic Dance", "Yoga Nidra"],
  },
  {
    name: "Breathwork",
    tagline: "Pranayama, holotropic traditions, conscious respiration",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=900&q=80",
    imageAlt: "Breathwork",
    label: "The breath as\ndoorway.",
    intro:
      "The oldest tool for transformation available to us. From gentle pranayama to the deep cathartic journey of holotropic work, these practices recalibrate the nervous system at the most fundamental level.",
    categorySlug: "breathwork",
    linkText: "Explore all breathwork venues",
    tags: ["Holotropic Breathwork", "Wim Hof Method", "Pranayama", "Rebirthing Breathwork", "Transformational Breath"],
  },
  {
    name: "Sound & Vibrational",
    tagline: "Frequencies, resonance, and the healing power of sound",
    image: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=900&q=80",
    imageAlt: "Sound healing",
    label: "Frequencies that\nrecalibrate.",
    intro:
      "Sound moves through the body differently than other healing modalities - it bypasses the thinking mind and works directly on tissue, emotion, and the nervous system.",
    categorySlug: "sound",
    linkText: "Explore all sound & vibrational venues",
    tags: ["Sound Bath", "Gong Therapy", "Crystal Singing Bowls", "Binaural Frequencies", "Mantra & Chanting", "Tuning Fork Therapy"],
  },
  {
    name: "Ayurveda",
    tagline: "5,000 years of Indian healing science and constitutional medicine",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80",
    imageAlt: "Ayurveda",
    label: "Ancient science.\nLiving medicine.",
    intro:
      "One of the world's oldest living healing systems. Ayurveda works with individual constitution - your dosha - to bring body, mind, and spirit into alignment through diet, ritual, and therapeutic practice.",
    categorySlug: "ayurveda",
    linkText: "Explore all Ayurveda venues",
    tags: ["Panchakarma", "Abhyanga Massage", "Shirodhara", "Marma Therapy", "Ayurvedic Nutrition", "Pulse Diagnosis"],
  },
  {
    name: "Indigenous & Earth Traditions",
    tagline: "First peoples' healing wisdom, ceremony, and land-based medicine",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80",
    imageAlt: "Earth traditions",
    label: "Land as healer.\nCeremony as medicine.",
    intro:
      "The healing wisdom of first peoples, carried across generations and continents. Practices rooted in relationship with land, community, and the more-than-human world - approached with the reverence they deserve.",
    categorySlug: "indigenous",
    linkText: "Explore all indigenous venues",
    tags: ["Aboriginal Healing", "Andean Therapies", "Native American Traditions", "Sweat Lodge & Temazcal", "Māori Healing", "African Healing Traditions", "Shamanic Journeying"],
  },
  {
    name: "Plant Medicine & Ceremony",
    tagline: "Sacred plant traditions, ceremonial healing, botanical medicine",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80",
    imageAlt: "Plant medicine",
    label: "Sacred plants.\nAncient ceremony.",
    intro:
      "Plants have been humanity's healers long before modern medicine. These traditions honour that relationship - from gentle cacao ceremony to the profound depths of botanical healing - held within proper ceremonial container.",
    categorySlug: "plant-medicine",
    linkText: "Explore all plant medicine venues",
    tags: ["Cacao Ceremony", "Kambo", "Rapé & Hapé", "Herbal & Botanical Medicine", "Flower Essence Therapy"],
  },
  {
    name: "Meditation & Mindfulness",
    tagline: "Stillness practices, contemplative traditions, presence work",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=80",
    imageAlt: "Meditation",
    label: "Stillness as\nthe practice.",
    intro:
      "The training of attention and the cultivation of presence. Drawn from Buddhist, Hindu, Taoist, and secular traditions - each offering a different doorway into the same essential stillness.",
    categorySlug: "meditation",
    linkText: "Explore all meditation & mindfulness venues",
    tags: ["Vipassana", "Zen Meditation", "Transcendental Meditation", "Walking Meditation", "Yoga Nidra", "MBSR & Mindfulness"],
  },
  {
    name: "Body Therapies & Bodywork",
    tagline: "Hands-on healing, structural integration, and therapeutic touch",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80",
    imageAlt: "Bodywork",
    label: "The body holds\nits own wisdom.",
    intro:
      "Healing through skilled, intentional touch. From the deep structural release of Rolfing to the meridian-based intelligence of Shiatsu - the body as the primary site of transformation.",
    categorySlug: "bodywork",
    linkText: "Explore all body therapies & bodywork venues",
    tags: ["Traditional Thai Massage", "Craniosacral Therapy", "Rolfing & Structural Integration", "Shiatsu", "Lymphatic Drainage", "Myofascial Release", "Lomi Lomi"],
  },
  {
    name: "Nutrition & Cleansing",
    tagline: "Fasting protocols, detoxification, and food as medicine",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80",
    imageAlt: "Nutrition",
    label: "Food as\nmedicine.",
    intro:
      "What we consume shapes who we become. These practices treat food and fasting as fundamental medicine - from the gentle reset of a juice cleanse to the deep cellular renewal of therapeutic fasting.",
    categorySlug: "nutrition",
    linkText: "Explore all nutrition & cleansing venues",
    tags: ["Juice Fasting & Cleansing", "Raw & Living Foods", "Detox Programs", "Macrobiotic Nutrition", "Therapeutic Fasting"],
  },
  {
    name: "Nature Immersion",
    tagline: "Forest medicine, wilderness therapy, and earth connection",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80",
    imageAlt: "Nature immersion",
    label: "The forest\nas teacher.",
    intro:
      "The natural world has always been the original healing environment. These practices return us to the intelligence of the living world and its capacity to restore what modern life depletes.",
    categorySlug: "nature",
    linkText: "Explore all nature immersion venues",
    tags: ["Forest Bathing & Shinrin-Yoku", "Wild Swimming", "Earthing & Grounding", "Wilderness Therapy", "Ecotherapy"],
  },
  {
    name: "Energy & Esoteric",
    tagline: "Subtle body work, energetic healing, and consciousness practices",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=80",
    imageAlt: "Energy healing",
    label: "Beyond the visible.\nInto the subtle.",
    intro:
      "Healing traditions that work with the subtle architecture of the human energy system - meridians, chakras, and the energetic fields that underlie the physical body.",
    categorySlug: "energy",
    linkText: "Explore all energy & esoteric venues",
    tags: ["Reiki", "Acupuncture & TCM", "Human Design", "Akashic Records", "Theta Healing", "Pranic Healing"],
  },
  {
    name: "Modern Wellness",
    tagline: "Contemporary therapies, clinical modalities, and cutting-edge recovery",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80",
    imageAlt: "Modern wellness spa",
    label: "Science meets\nsanctuary.",
    intro:
      "Contemporary therapies grounded in clinical research and emerging science. From halotherapy to cryotherapy - the leading edge of restorative practice, delivered within curated wellness spaces.",
    categorySlug: "modern-wellness",
    linkText: "Explore all modern wellness venues",
    tags: ["Halotherapy & Salt Therapy", "Cryotherapy", "Infrared Sauna", "IV Therapy & Infusions", "Hyperbaric Oxygen Therapy", "Compression Therapy", "Red Light Therapy", "Biofeedback & Neurofeedback", "Spa & Skin Treatments"],
  },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <img src="https://nextjs-webportal-tgs.vercel.app/images/logo_vector.svg" alt="The Global Sanctum" />
          <span className={styles.footerBrandName}>The Global Sanctum</span>
          <p className={styles.footerBrandText}>Extraordinary retreat spaces, wellness venues, and the experiences they hold - curated and connected worldwide.</p>
        </div>
        <div><h4>About TGS</h4><a href={tgsRoutes.about}>About Us</a><a href={tgsRoutes.howItWorks}>How It Works</a></div>
        <div><h4>Discover</h4><a href={tgsRoutes.retreatVenues}>Retreat Venues</a><a href={tgsRoutes.wellnessVenues}>Wellness Venues</a><a href={tgsRoutes.wellnessExperiences}>Experiences</a></div>
        <div><h4>Partner With Us</h4><a href={tgsRoutes.listYourVenue}>List Your Venue</a><a href={tgsRoutes.contact}>Press & Media</a></div>
        <div><h4>Resources</h4><a href={tgsRoutes.wellnessEdit}>The Wellness Edit</a><a href={tgsRoutes.wellnessEdit}>Join the Journal</a></div>
        <div><h4>Legal</h4><a href={tgsRoutes.legal}>Terms & Conditions</a><a href={tgsRoutes.legal}>Privacy Policy</a><a href={tgsRoutes.legal}>Cookies Policy</a></div>
      </div>
      <div className={styles.footerBottom}>
        <p>Copyright 2026 The Global Sanctum. All rights reserved.</p>
        <div><a href="https://www.instagram.com/theglobalsanctum/" target="_blank" rel="noopener">Instagram</a><a href="https://www.facebook.com/profile.php?id=61577706717526" target="_blank" rel="noopener">Facebook</a><a href="https://www.linkedin.com/company/the-global-sanctum/" target="_blank" rel="noopener">LinkedIn</a></div>
      </div>
    </footer>
  );
}

function VenueCard({ venue }: { venue: VenueResult }) {
  return (
    <article className={styles.resultCard}>
      <div className={styles.resultCardImage}>
        <img src={venue.image} alt={venue.name} loading="lazy" />
        <span>{venue.country}</span>
      </div>
      <div className={styles.resultCardBody}>
        <p>{venue.location}</p>
        <h3>{venue.name}</h3>
        <div className={styles.resultCardMeta}>
          <span><strong>{venue.price}</strong></span>
          <span>{venue.duration}</span>
        </div>
        <a href={tgsRoutes.venues}>View venue -&gt;</a>
      </div>
    </article>
  );
}

export default function WellnessExperiencesPage() {
  const [open, setOpen] = useState(-1);
  const [selectedPractice, setSelectedPractice] = useState<string | null>(null);

  const openCategory = (index: number) => {
    setOpen(open === index ? -1 : index);
    setSelectedPractice(null);
  };

  return (
    <div className={styles.page}>
      <SiteNavigation />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroImg} />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <div>
              <p className={styles.heroEyebrow}>Modalities & Practices</p>
              <h1>Explore by<br /><em>Experience.</em></h1>
            </div>
            <p>Browse transformative modalities and healing practices. Each links directly to venues that offer them - so you find the right space for the experience you&apos;re seeking.</p>
          </div>
        </section>

        <div className={styles.introBar}>
          <p>Select a category to explore. Each practice links to <a href={tgsRoutes.venues}>venues in our collection</a> offering that modality.</p>
          <p><em>13</em> categories &nbsp;-&nbsp; <em>82+</em> practices</p>
        </div>

        <section className={styles.categories}>
          {categories.map((category, index) => {
            const isOpen = open === index;
            const selected = isOpen ? selectedPractice : null;
            const results = selected ? venueResults[selected] || defaultVenues : [];

            return (
              <article className={styles.categoryItem} key={category.name}>
                <button
                  className={`${styles.categoryHeader} ${isOpen ? styles.active : ""}`}
                  type="button"
                  onClick={() => openCategory(index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.catNum}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.catText}>
                    <span className={styles.catName}>{category.name}</span>
                    <span className={styles.catTagline}>{category.tagline}</span>
                  </span>
                  <span className={styles.catCount}>{isOpen ? "Viewing " : ""}{category.tags.length} practices</span>
                  <span className={styles.catToggle}>+</span>
                </button>

                <div className={`${styles.categoryPanel} ${isOpen ? styles.open : ""}`}>
                  <div className={styles.panelInner}>
                    <div className={styles.panelImage}>
                      <img src={category.image} alt={category.imageAlt} loading="lazy" />
                      <div />
                      <p>{category.label.split("\n").map((line) => <span key={line}>{line}</span>)}</p>
                    </div>
                    <div className={styles.panelContent}>
                      <p className={styles.panelEyebrow}>{category.name}</p>
                      <p className={styles.panelIntro}>{category.intro}</p>
                      <div className={styles.panelTags}>
                        {category.tags.map((tag) => (
                          <button
                            className={`${styles.subTag} ${selectedPractice === tag && isOpen ? styles.subTagActive : ""}`}
                            key={tag}
                            type="button"
                            onClick={() => setSelectedPractice(tag)}
                          >
                            {tag} <span>-&gt;</span>
                          </button>
                        ))}
                      </div>
                      <a className={styles.panelExploreLink} href={`${tgsRoutes.venues}?category=${category.categorySlug}`}>{category.linkText} -&gt;</a>
                    </div>

                    <div className={`${styles.venueResults} ${selected ? styles.resultsOpen : ""}`}>
                      <div className={styles.venueResultsInner}>
                        <div className={styles.venueResultsHeader}>
                          <p>Venues offering {selected}</p>
                          <p>{results.length} venue{results.length === 1 ? "" : "s"} in our collection</p>
                        </div>
                        <div className={styles.venueResultsGrid}>
                          {results.map((venue) => <VenueCard venue={venue} key={`${selected}-${venue.name}`} />)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className={styles.infoStrip}>
          <div><p>How it works</p><h2>Browse by modality,<br />find your venue.</h2><span>Each practice links directly to venues in our collection offering that modality. No duplication - the experience leads you to the right place.</span></div>
          <div><p>Why categories</p><h2>Depth over<br />breadth.</h2><span>Rather than listing every treatment, we group by tradition and lineage. This helps you understand the roots of each practice and find venues that go deep, not wide.</span></div>
          <div><p>Our approach</p><h2>Curated with<br />intention.</h2><span>Every venue in our collection is personally vetted. When you click through to a practice, you&apos;re seeing only spaces we&apos;d recommend to someone we care about.</span></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
