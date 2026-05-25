"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Category = {
  id: string;
  number: string;
  name: string;
  tagline: string;
  count: number;
  intro: string;
  image: string;
  label: string;
  practices: string[];
  venuesQuery: string;
};

const categories: Category[] = [
  {
    id: "thermal",
    number: "01",
    name: "Thermal & Hydrotherapy",
    tagline: "Ancient waters, volcanic springs, heat and cold immersion",
    count: 7,
    intro: "From Japanese onsen to Scandinavian contrast rituals, water has been one of humanity's oldest healing mediums.",
    image: "/frozen/web-pages/images/Woman%20In%20Bath%20Nordic%20Filter.png",
    label: "Ancient waters. Volcanic springs.",
    practices: ["Japanese Onsen", "Contrast Therapy", "Flotation & REST", "Steam & Sauna Rituals"],
    venuesQuery: "thermal",
  },
  {
    id: "yoga",
    number: "02",
    name: "Yoga & Movement",
    tagline: "Classical traditions, somatic practices, conscious movement",
    count: 8,
    intro: "From Yin to Kundalini, classical and modern movement practices that reconnect body and awareness.",
    image: "/frozen/web-pages/images/Woman%20Stretching%20Back%20Yoga%20Nordic%20Filter.png",
    label: "Classical traditions. Conscious movement.",
    practices: ["Hatha Yoga", "Vinyasa & Flow", "Yin Yoga", "Qigong & Tai Chi"],
    venuesQuery: "yoga",
  },
  {
    id: "breathwork",
    number: "03",
    name: "Breathwork",
    tagline: "Pranayama, holotropic traditions, conscious respiration",
    count: 5,
    intro: "Practices that use breath to regulate the nervous system and unlock emotional and physiological reset.",
    image: "/frozen/web-pages/images/Breathwork%20lying%20down%20Nordic%20Filter.png",
    label: "The breath as doorway.",
    practices: ["Holotropic Breathwork", "Wim Hof Method", "Pranayama", "Rebirthing Breathwork"],
    venuesQuery: "breathwork",
  },
  {
    id: "sound",
    number: "04",
    name: "Sound & Vibrational",
    tagline: "Frequencies, resonance, and the healing power of sound",
    count: 6,
    intro: "Sound-based modalities that work through resonance, nervous system entrainment, and meditative states.",
    image: "/frozen/web-pages/images/Woman%20With%20Sound%20Bowl%20Nordic%20Filter.png",
    label: "Frequencies that recalibrate.",
    practices: ["Sound Bath", "Gong Therapy", "Crystal Singing Bowls", "Tuning Fork Therapy"],
    venuesQuery: "sound",
  },
  {
    id: "ayurveda",
    number: "05",
    name: "Ayurveda",
    tagline: "5,000 years of Indian healing science and constitutional medicine",
    count: 6,
    intro: "Traditional constitutional medicine focused on restoring doshic balance through therapies and lifestyle protocols.",
    image: "/frozen/web-pages/images/Ayurveda%20Shirodhara%20Nordic%20Filter.jpg",
    label: "Ancient science. Living medicine.",
    practices: ["Panchakarma", "Abhyanga Massage", "Shirodhara", "Ayurvedic Nutrition"],
    venuesQuery: "ayurveda",
  },
  {
    id: "indigenous",
    number: "06",
    name: "Indigenous & Earth Traditions",
    tagline: "First peoples' healing wisdom, ceremony, and land-based medicine",
    count: 7,
    intro: "Ceremonial and earth-rooted practices carried across generations and approached with respect and context.",
    image: "/frozen/web-pages/images/Shaman%20With%20Flute%20Nordic%20Filter.png",
    label: "Land as healer. Ceremony as medicine.",
    practices: ["Sweat Lodge & Temazcal", "Shamanic Journeying", "Andean Therapies", "Māori Healing"],
    venuesQuery: "indigenous",
  },
  {
    id: "plant-medicine",
    number: "07",
    name: "Plant Medicine & Ceremony",
    tagline: "Sacred plant traditions, ceremonial healing, botanical medicine",
    count: 5,
    intro: "Ritual and botanical practices that honor plant intelligence within ethical and ceremonial frameworks.",
    image: "/frozen/web-pages/images/Herbs%20On%20Timber%20Nordic%20Filter.png",
    label: "Sacred plants. Ancient ceremony.",
    practices: ["Cacao Ceremony", "Kambo", "Rapé & Hapé", "Botanical Medicine"],
    venuesQuery: "plant-medicine",
  },
  {
    id: "meditation",
    number: "08",
    name: "Meditation & Mindfulness",
    tagline: "Stillness practices, contemplative traditions, presence work",
    count: 6,
    intro: "Lineage and contemporary mindfulness methods for attention training, stillness, and insight.",
    image: "/frozen/web-pages/images/Meditation%20Black%20%26%20White%20Mountain.jpg",
    label: "Stillness as the practice.",
    practices: ["Vipassana", "Zen Meditation", "Transcendental Meditation", "Yoga Nidra"],
    venuesQuery: "meditation",
  },
  {
    id: "bodywork",
    number: "09",
    name: "Body Therapies & Bodywork",
    tagline: "Hands-on healing, structural integration, and therapeutic touch",
    count: 7,
    intro: "Manual therapies focused on release, regulation, and structural restoration through skilled touch.",
    image: "/frozen/web-pages/images/Massage%20black%20and%20white.jpg",
    label: "The body holds its own wisdom.",
    practices: ["Thai Massage", "Craniosacral Therapy", "Shiatsu", "Myofascial Release"],
    venuesQuery: "bodywork",
  },
  {
    id: "nutrition",
    number: "10",
    name: "Nutrition & Cleansing",
    tagline: "Fasting protocols, detoxification, and food as medicine",
    count: 5,
    intro: "Food, fasting, and detox methods used as foundational levers for energy and recovery.",
    image: "/frozen/web-pages/images/Raw%20Salad%20Bowl%20Nordic%20Filter.png",
    label: "Food as medicine.",
    practices: ["Juice Cleansing", "Detox Programs", "Raw & Living Foods", "Therapeutic Fasting"],
    venuesQuery: "nutrition",
  },
  {
    id: "nature-adventure",
    number: "11",
    name: "Nature & Adventure Wellness",
    tagline: "Forest medicine, wilderness therapy, and adventure as healing",
    count: 10,
    intro: "Practices that use direct relationship with natural environments for recovery, presence, and resilience.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80",
    label: "The forest as teacher.",
    practices: ["Forest Bathing", "Ecotherapy", "Wild Swimming", "Adventure Therapy"],
    venuesQuery: "nature-adventure-wellness",
  },
  {
    id: "energy",
    number: "12",
    name: "Energy & Esoteric",
    tagline: "Subtle body work, energetic healing, and consciousness practices",
    count: 6,
    intro: "Approaches that work with subtle energetic systems and expanded states of awareness.",
    image: "/frozen/web-pages/images/Reiki%20Image%20Nordic%20Filter.png",
    label: "Beyond the visible. Into the subtle.",
    practices: ["Reiki", "Acupuncture & TCM", "Human Design", "Pranic Healing"],
    venuesQuery: "energy",
  },
  {
    id: "modern-wellness",
    number: "13",
    name: "Modern Wellness",
    tagline: "Contemporary therapies, clinical modalities, and cutting-edge recovery",
    count: 8,
    intro: "Emerging science-led treatments and recovery tools integrated into curated wellness spaces.",
    image: "/frozen/web-pages/images/Halotherapy%20Nordic%20Filter.png",
    label: "Science meets sanctuary.",
    practices: ["Halotherapy", "Cryotherapy", "Infrared Sauna", "Red Light Therapy"],
    venuesQuery: "modern-wellness",
  },
  {
    id: "skin-aesthetic",
    number: "14",
    name: "Skin & Aesthetic Wellness",
    tagline: "Curated skin rituals, advanced facials, and restorative body treatments",
    count: 8,
    intro: "Restorative skin and body rituals that combine advanced methods with intentional wellness care.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80",
    label: "Skin as ritual. Beauty as restoration.",
    practices: ["Advanced Facials", "Body Wraps & Scrubs", "LED Therapy", "Lymphatic Facial Massage"],
    venuesQuery: "skin-aesthetic-wellness",
  },
];

const venueSamples = [
  { name: "Santosa Retreat Centre", location: "Ubud, Bali", category: ["thermal", "yoga", "meditation"], price: "$185 /night", duration: "Retreat Stay" },
  { name: "Therme Vals", location: "Vals, Switzerland", category: ["thermal", "modern-wellness"], price: "CHF 65 /entry", duration: "Day Access" },
  { name: "Kamalaya Wellness Sanctuary", location: "Koh Samui, Thailand", category: ["ayurveda", "bodywork", "nutrition"], price: "$380 /night", duration: "Program Stay" },
  { name: "Sky Lagoon", location: "Reykjavik, Iceland", category: ["thermal", "nature-adventure"], price: "ISK 12,990", duration: "Ritual Session" },
];

export default function WellnessExperiencesPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(categories[0].id);
  const [selectedPractice, setSelectedPractice] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const currentCategory = useMemo(
    () => categories.find((c) => c.id === openCategory) ?? categories[0],
    [openCategory],
  );

  const sampleCards = useMemo(
    () => venueSamples.filter((v) => v.category.includes(currentCategory.id)).slice(0, 3),
    [currentCategory.id],
  );

  return (
    <div className="bg-[#fdfcf9] text-[#313131]">
      <nav
        className={`fixed left-0 right-0 top-0 z-40 border-b px-6 py-5 transition-all sm:px-10 ${
          scrolled
            ? "border-black/10 bg-[#fdfcf9]/95 shadow-[0_6px_28px_rgba(49,49,49,0.08)]"
            : "border-transparent bg-gradient-to-b from-black/25 to-transparent text-white"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
          <button type="button" className="flex items-center gap-3" onClick={() => setDrawerOpen((v) => !v)}>
            <span className="flex flex-col gap-1.5">
              <span className="h-px w-6 bg-current" />
              <span className="h-px w-4 bg-current" />
              <span className="h-px w-6 bg-current" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em]">Menu</span>
          </button>
          <Link href="/web" className="text-sm uppercase tracking-[0.35em] sm:text-base">
            The Global Sanctum
          </Link>
          <div className="w-16" />
        </div>
      </nav>

      {drawerOpen ? (
        <>
          <button type="button" className="fixed inset-0 z-40 bg-black/40" onClick={() => setDrawerOpen(false)} aria-label="Close menu" />
          <aside className="fixed left-0 top-0 z-50 h-full w-[340px] max-w-[86vw] overflow-y-auto bg-[#f7f5f1] p-6 text-[#313131] shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.2em]">Navigation</span>
              <button type="button" className="text-3xl leading-none" onClick={() => setDrawerOpen(false)}>
                ×
              </button>
            </div>
            <div className="space-y-5 text-sm">
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-black/60">Discover</p>
                <div className="space-y-2">
                  <Link href="/web/venues" onClick={() => setDrawerOpen(false)} className="block">Retreat Venues</Link>
                  <Link href="/web/venues" onClick={() => setDrawerOpen(false)} className="block">Wellness Venues</Link>
                  <Link href="/web/wellness-experiences" onClick={() => setDrawerOpen(false)} className="block font-semibold">Wellness Experiences</Link>
                </div>
              </div>
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-black/60">Learn</p>
                <div className="space-y-2">
                  <Link href="/web/about" onClick={() => setDrawerOpen(false)} className="block">About Us</Link>
                  <Link href="/web/how-it-works" onClick={() => setDrawerOpen(false)} className="block">How It Works</Link>
                  <Link href="/web/the-wellness-edit" onClick={() => setDrawerOpen(false)} className="block">The Wellness Edit</Link>
                </div>
              </div>
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-black/60">Connect</p>
                <div className="space-y-2">
                  <Link href="/web/contact" onClick={() => setDrawerOpen(false)} className="block">Contact Us</Link>
                  <Link href="/web/list-your-venue" onClick={() => setDrawerOpen(false)} className="block">List Your Venue</Link>
                </div>
              </div>
            </div>
          </aside>
        </>
      ) : null}

      <main>
        <section className="relative flex min-h-[66vh] items-end overflow-hidden px-6 pb-14 pt-32 text-white sm:px-10">
          <div className="absolute inset-0 bg-[url('/frozen/web-pages/images/Woman%20Hot%20Stone%20Silhouette%20Nordic%20Filter.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/55" />
          <div className="relative z-10 mx-auto w-full max-w-[1400px]">
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/80">Modalities & Practices</p>
            <h1 className="mt-3 text-5xl sm:text-7xl">
              Explore by <em>Experience.</em>
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-white/90">
              Browse transformative modalities and healing practices. Each links directly to venues that offer them.
            </p>
          </div>
        </section>

        <div className="border-y border-black/10 bg-[#f7f5f1] px-6 py-5 sm:px-10">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-2 md:flex-row md:items-center">
            <p className="text-sm text-black/75">
              Select a category to explore. Each practice links to <Link href="/web/venues" className="text-[#7a644f]">venues in our collection</Link> offering that modality.
            </p>
            <p className="text-sm text-black/65">
              <em>14</em> categories · <em>75+</em> practices
            </p>
          </div>
        </div>

        <section className="px-0 py-6">
          {categories.map((cat) => {
            const open = openCategory === cat.id;
            return (
              <article key={cat.id} className="border-b border-black/10">
                <button
                  type="button"
                  onClick={() => {
                    setOpenCategory(open ? null : cat.id);
                    setSelectedPractice(null);
                  }}
                  className={`grid w-full grid-cols-[46px_1fr_auto] items-center gap-4 px-6 py-5 text-left transition sm:grid-cols-[70px_1fr_auto_24px] sm:px-10 ${
                    open ? "bg-[#313131] text-white" : "bg-white text-[#313131] hover:bg-[#f7f5f1]"
                  }`}
                >
                  <span className={`text-2xl ${open ? "text-white/30" : "text-black/30"}`}>{cat.number}</span>
                  <span>
                    <span className="block text-3xl">{cat.name}</span>
                    <span className={`block text-sm ${open ? "text-white/55" : "text-black/55"}`}>{cat.tagline}</span>
                  </span>
                  <span className={`text-sm ${open ? "text-white/60" : "text-black/55"}`}>Explore {cat.count} practices</span>
                  <span className="hidden text-2xl sm:block">{open ? "−" : "+"}</span>
                </button>

                {open ? (
                  <div className="bg-[#fdfcf9] px-6 py-7 sm:px-10">
                    <div className="mx-auto grid w-full max-w-[1400px] gap-6 lg:grid-cols-[360px_1fr]">
                      <div className="relative h-[300px] overflow-hidden">
                        {/* Source imagery includes mixed local and remote assets; keep img for parity during migration. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/45" />
                        <p className="absolute bottom-5 left-5 text-2xl italic text-white">{cat.label}</p>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-black/55">{cat.name}</p>
                        <p className="mt-3 max-w-4xl text-lg text-black/75">{cat.intro}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {cat.practices.map((practice) => (
                            <button
                              key={`${cat.id}-${practice}`}
                              type="button"
                              onClick={() => setSelectedPractice(practice)}
                              className={`px-3 py-2 text-[11px] uppercase tracking-[0.1em] transition ${
                                selectedPractice === practice
                                  ? "bg-[#313131] text-white"
                                  : "border border-black/15 bg-white text-[#7a644f] hover:border-black/30"
                              }`}
                            >
                              {practice}
                            </button>
                          ))}
                        </div>
                        <Link href={`/web/venues?category=${cat.venuesQuery}`} className="mt-5 inline-block text-sm uppercase tracking-[0.12em] text-[#7a644f]">
                          Explore all {cat.name.toLowerCase()} venues -&gt;
                        </Link>
                      </div>
                    </div>

                    <div className="mx-auto mt-6 w-full max-w-[1400px] border-t border-black/10 pt-6">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-black/55">Venues offering this practice</p>
                        <p className="text-sm text-black/55">{sampleCards.length} sample venues</p>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        {sampleCards.map((v) => (
                          <article key={`${cat.id}-${v.name}`} className="border border-black/10 bg-[#f7f5f1] p-5">
                            <p className="text-[10px] uppercase tracking-[0.16em] text-black/55">{v.location}</p>
                            <h3 className="mt-2 text-2xl">{v.name}</h3>
                            <div className="mt-3 flex gap-4 border-t border-black/10 pt-3 text-xs text-black/65">
                              <span><strong>{v.price}</strong></span>
                              <span>{v.duration}</span>
                            </div>
                            <Link href="/web/venues" className="mt-3 inline-block text-[11px] uppercase tracking-[0.12em] text-[#7a644f]">
                              View Services -&gt;
                            </Link>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </section>

        <section className="grid gap-4 bg-[#f7f5f1] px-6 py-16 sm:px-10 md:grid-cols-3">
          <article className="border border-black/10 bg-white p-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-black/55">How It Works</p>
            <h3 className="mt-3 text-3xl">Browse by modality, find your venue.</h3>
            <p className="mt-3 text-black/70">Each practice links to venues in our collection offering that modality. The experience lives at the venue.</p>
          </article>
          <article className="border border-black/10 bg-white p-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-black/55">Why categories</p>
            <h3 className="mt-3 text-3xl">Depth over breadth.</h3>
            <p className="mt-3 text-black/70">We group by lineage and tradition so people can understand roots, not just treatment names.</p>
          </article>
          <article className="border border-black/10 bg-white p-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-black/55">Our approach</p>
            <h3 className="mt-3 text-3xl">Curated with intention.</h3>
            <p className="mt-3 text-black/70">Every venue is vetted so each modality page shows spaces we would personally recommend.</p>
          </article>
        </section>
      </main>

      <footer className="bg-[#313131] px-6 py-16 text-[#fdfcf9] sm:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-sm uppercase tracking-[0.32em]">The Global Sanctum</p>
            <p className="mt-4 max-w-xl text-sm text-white/75">
              Curated wellness venues and transformational retreat spaces for retreat hosts, wellness guests, and seekers worldwide.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Discover</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link href="/web/venues" className="block">Retreat Venues</Link>
              <Link href="/web/venues" className="block">Wellness Venues</Link>
              <Link href="/web/wellness-experiences" className="block">Wellness Experiences</Link>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Partner</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link href="/web/list-your-venue" className="block">List Your Venue</Link>
              <Link href="/web/contact" className="block">Contact Us</Link>
              <Link href="/web/legal" className="block">Legal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
