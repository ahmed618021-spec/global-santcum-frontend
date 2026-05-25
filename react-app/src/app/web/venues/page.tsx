"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type VenueType = "retreat" | "wellness";
type VenueTier = "premium" | "featured" | "standard" | "essentials";
type SortMode = "recommended" | "rating" | "priceLow" | "priceHigh";

type Venue = {
  name: string;
  type: VenueType;
  tier: VenueTier;
  location: string;
  setting: "coastal" | "mountain" | "forest" | "urban" | "island" | "thermal";
  priceLabel: string;
  priceValue: number;
  rating: number;
  image: string;
  tags: string[];
  excerpt: string;
};

const venues: Venue[] = [
  {
    name: "Santosa Retreat Centre",
    type: "retreat",
    tier: "premium",
    location: "Ubud, Bali, Indonesia",
    setting: "island",
    priceLabel: "$185 /person/night",
    priceValue: 185,
    rating: 4.9,
    image: "/frozen/web-pages/images/Bali%20Pool%20Nordic%20Filter.png",
    tags: ["Yoga Shala", "Meditation", "Exclusive Use"],
    excerpt: "Purpose-built sanctuary with rice terrace views, ceremony spaces, and on-site farm-to-table catering.",
  },
  {
    name: "Therme Vals",
    type: "wellness",
    tier: "premium",
    location: "Vals, Switzerland",
    setting: "mountain",
    priceLabel: "CHF 65 /entry",
    priceValue: 65,
    rating: 4.9,
    image: "/frozen/web-pages/images/Onsen%203%20Nordic%20Filter.png",
    tags: ["Thermal", "Hydrotherapy", "Sauna"],
    excerpt: "Architectural thermal sanctuary in the Alps with quartzite bathing chambers and restorative hydrotherapy.",
  },
  {
    name: "Casa Terra Sagrada",
    type: "retreat",
    tier: "featured",
    location: "Algarve, Portugal",
    setting: "coastal",
    priceLabel: "EUR 4,200 /week",
    priceValue: 600,
    rating: 4.9,
    image: "/frozen/web-pages/images/Misty%20Forest%20Nordic%20Filter.png",
    tags: ["Private Estate", "Ceremony Space", "Farm-to-Table"],
    excerpt: "Restored farmhouse retreat estate with dedicated yoga hall, saltwater pool, and in-house retreat operations support.",
  },
  {
    name: "Kamalaya Wellness Sanctuary",
    type: "wellness",
    tier: "featured",
    location: "Koh Samui, Thailand",
    setting: "island",
    priceLabel: "$380 /night",
    priceValue: 380,
    rating: 4.9,
    image: "/frozen/web-pages/images/Woman%20In%20Spa%20Dark%20Tiles%20Nordic%20Filter.png",
    tags: ["Holistic Wellness", "Detox", "Yoga"],
    excerpt: "Award-winning destination combining traditional healing with modern wellness programs in a tropical setting.",
  },
  {
    name: "Le Bain Bleu",
    type: "wellness",
    tier: "standard",
    location: "Marrakech, Morocco",
    setting: "urban",
    priceLabel: "MAD 800 /session",
    priceValue: 80,
    rating: 4.7,
    image: "/frozen/web-pages/images/Moroccan%20Pool%20Scandi%20Filter.png",
    tags: ["Hammam", "Steam", "Bodywork"],
    excerpt: "Traditional hammam rituals in a restored riad with artisan treatments and immersive bathing experiences.",
  },
  {
    name: "The Sanctuary at Bangalow",
    type: "retreat",
    tier: "standard",
    location: "Byron Bay, Australia",
    setting: "forest",
    priceLabel: "A$165 /night",
    priceValue: 165,
    rating: 4.7,
    image: "/frozen/web-pages/images/Misty%20Jungle%20Forest%20Nordic%20Filter.png",
    tags: ["Workshops", "Nature", "Catering"],
    excerpt: "Hinterland retreat venue with workshop spaces, pool, and integrated guest operations for multi-day programs.",
  },
  {
    name: "Sky Lagoon",
    type: "wellness",
    tier: "standard",
    location: "Reykjavik, Iceland",
    setting: "thermal",
    priceLabel: "ISK 12,990 /entry",
    priceValue: 120,
    rating: 4.8,
    image: "/frozen/web-pages/images/Sauna%20Modern%20Nordic%20Filter.png",
    tags: ["Geothermal", "Cold Plunge", "Sauna"],
    excerpt: "Ocean-edge geothermal lagoon with contrast ritual flow across warm waters, cold plunge, sauna, and steam.",
  },
  {
    name: "Red Rock Retreat House",
    type: "retreat",
    tier: "essentials",
    location: "Sedona, USA",
    setting: "mountain",
    priceLabel: "$140",
    priceValue: 140,
    rating: 4.6,
    image: "/frozen/web-pages/images/Sunset%20Desert%20Nordic%20Filter.png",
    tags: ["Retreat House"],
    excerpt: "Compact retreat base for intimate group programs with direct access to nature and sacred landscape.",
  },
  {
    name: "Banhos Termais Lisboa",
    type: "wellness",
    tier: "essentials",
    location: "Lisbon, Portugal",
    setting: "urban",
    priceLabel: "EUR 45",
    priceValue: 45,
    rating: 4.5,
    image: "/frozen/web-pages/images/Halotherapy%20Nordic%20Filter.png",
    tags: ["Thermal"],
    excerpt: "Urban thermal bathing concept with targeted restoration sessions for modern city schedules.",
  },
  {
    name: "Tushita Meditation Centre",
    type: "retreat",
    tier: "essentials",
    location: "Dharamshala, India",
    setting: "mountain",
    priceLabel: "INR 2,200",
    priceValue: 27,
    rating: 4.7,
    image: "/frozen/web-pages/images/Meditation%20Room%20Nordic%20Filter.png",
    tags: ["Meditation"],
    excerpt: "Meditation-first retreat center designed for contemplative programs and structured silent practice.",
  },
  {
    name: "Casa Maya Day Spa",
    type: "wellness",
    tier: "essentials",
    location: "Tulum, Mexico",
    setting: "coastal",
    priceLabel: "$85",
    priceValue: 85,
    rating: 4.4,
    image: "/frozen/web-pages/images/Black%20%26%20White%20Massage%20Nordic%20Filter.png",
    tags: ["Day Spa"],
    excerpt: "Day spa for restorative bodywork and light hydrotherapy in a relaxed tropical atmosphere.",
  },
];

const tierOrder: VenueTier[] = ["premium", "featured", "standard", "essentials"];
const tierTitle: Record<VenueTier, string> = {
  premium: "Premium Sanctuaries",
  featured: "Featured Venues",
  standard: "Standard Listings",
  essentials: "Essentials Listings",
};

export default function VenuesPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [venueType, setVenueType] = useState<"all" | VenueType>("all");
  const [setting, setSetting] = useState<"all" | Venue["setting"]>("all");
  const [sort, setSort] = useState<SortMode>("recommended");

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

  const filtered = useMemo(() => {
    let result = venues.filter((v) => {
      const byType = venueType === "all" ? true : v.type === venueType;
      const bySetting = setting === "all" ? true : v.setting === setting;
      const byQuery = query.trim()
        ? `${v.name} ${v.location} ${v.tags.join(" ")} ${v.excerpt}`.toLowerCase().includes(query.toLowerCase())
        : true;
      return byType && bySetting && byQuery;
    });

    if (sort === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    if (sort === "priceLow") result = [...result].sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "priceHigh") result = [...result].sort((a, b) => b.priceValue - a.priceValue);

    return result;
  }, [query, setting, sort, venueType]);

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
          <aside className="fixed left-0 top-0 z-50 h-full w-[340px] max-w-[86vw] overflow-y-auto bg-[#f7f5f1] p-6 shadow-2xl">
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
                  <Link href="/web/venues" onClick={() => setDrawerOpen(false)} className="block font-semibold">Retreat Venues</Link>
                  <Link href="/web/venues" onClick={() => setDrawerOpen(false)} className="block">Wellness Venues</Link>
                  <Link href="/web/wellness-experiences" onClick={() => setDrawerOpen(false)} className="block">Wellness Experiences</Link>
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
        <section className="relative flex min-h-[62vh] items-end overflow-hidden px-6 pb-16 pt-32 text-white sm:px-10">
          <div className="absolute inset-0 bg-[url('/frozen/web-pages/images/Oriental%20Building%20Nordic%20Filter.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/55" />
          <div className="relative z-10 mx-auto w-full max-w-[1400px]">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/80">Discover</p>
            <h1 className="mt-3 text-5xl sm:text-7xl">Explore Our Venues</h1>
            <p className="mt-4 max-w-3xl text-lg text-white/90">
              Retreat centres, wellness resorts, thermal sanctuaries, and sacred spaces curated from around the world.
            </p>
          </div>
        </section>

        <section className="sticky top-[74px] z-30 border-b border-black/10 bg-[#f7f5f1] px-6 py-4 sm:px-10">
          <div className="mx-auto grid w-full max-w-[1400px] gap-3 md:grid-cols-12">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search venues, places, modalities"
              className="border border-black/15 bg-white px-4 py-3 md:col-span-5"
            />
            <select value={venueType} onChange={(e) => setVenueType(e.target.value as "all" | VenueType)} className="border border-black/15 bg-white px-3 py-3 md:col-span-2">
              <option value="all">All Venues</option>
              <option value="retreat">Retreat Venues</option>
              <option value="wellness">Wellness Venues</option>
            </select>
            <select value={setting} onChange={(e) => setSetting(e.target.value as "all" | Venue["setting"])} className="border border-black/15 bg-white px-3 py-3 md:col-span-2">
              <option value="all">All Settings</option>
              <option value="coastal">Coastal</option>
              <option value="mountain">Mountain</option>
              <option value="forest">Forest</option>
              <option value="urban">Urban</option>
              <option value="island">Island</option>
              <option value="thermal">Thermal</option>
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortMode)} className="border border-black/15 bg-white px-3 py-3 md:col-span-3">
              <option value="recommended">Sort: Recommended</option>
              <option value="rating">Highest Rated</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </section>

        <section className="px-6 py-6 sm:px-10">
          <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between text-sm text-black/70">
            <p>
              Showing <strong>{filtered.length}</strong> venues
            </p>
            <button type="button" className="border border-black/20 px-3 py-2 text-[11px] uppercase tracking-[0.14em]">
              Refine Further
            </button>
          </div>
        </section>

        <section className="px-6 pb-24 sm:px-10">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10">
            {tierOrder.map((tier) => {
              const tierItems = filtered.filter((v) => v.tier === tier);
              if (!tierItems.length) return null;
              return (
                <div key={tier}>
                  <div className="mb-4 flex items-center justify-between border-b border-black/10 pb-3">
                    <h2 className="text-3xl">{tierTitle[tier]}</h2>
                    <span className="text-sm text-black/55">{tierItems.length} venues</span>
                  </div>
                  <div className={`grid gap-4 ${tier === "premium" || tier === "featured" ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                    {tierItems.map((v) => (
                      <article key={v.name} className="overflow-hidden border border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(49,49,49,0.08)]">
                        <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url('${v.image}')` }} />
                        <div className="p-5">
                          <p className="text-[10px] uppercase tracking-[0.14em] text-[#7a644f]">
                            {v.type === "retreat" ? "Retreat Venue" : "Wellness Venue"} - {tier}
                          </p>
                          <h3 className="mt-2 text-3xl">{v.name}</h3>
                          <p className="mt-1 text-sm text-black/55">{v.location}</p>
                          <p className="mt-3 text-sm leading-6 text-black/70">{v.excerpt}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {v.tags.map((tag) => (
                              <span key={`${v.name}-${tag}`} className="bg-[#f7f5f1] px-2 py-1 text-[10px] uppercase tracking-[0.08em] text-[#7a644f]">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3 text-sm">
                            <span>
                              <span className="text-[#7a644f]">★ </span>
                              {v.rating.toFixed(1)}
                            </span>
                            <span>{v.priceLabel}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-[#313131] px-6 py-24 text-center text-white sm:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">Venue Partners</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">Your space deserves to be discovered</h2>
            <p className="mt-4 text-white/80">
              Join a curated collection of exceptional retreat and wellness venues with transparent pricing and qualified audience reach.
            </p>
            <Link href="/web/list-your-venue" className="mt-7 inline-block bg-white px-8 py-3 text-[11px] uppercase tracking-[0.14em] text-[#313131]">
              List Your Venue
            </Link>
          </div>
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
              <Link href="/web/wellness-experiences" className="block">Wellness Experiences</Link>
              <Link href="/web/how-it-works" className="block">How It Works</Link>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Partner</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link href="/web/list-your-venue" className="block">List Your Venue</Link>
              <Link href="/web/contact" className="block">Contact Us</Link>
              <Link href="/web/about" className="block">About Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
