"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import SiteNavigation from "@/components/tgs/SiteNavigation";
import { tgsRoutes } from "@/lib/tgsRoutes";
import styles from "./venues.module.css";

type VenueType = "all" | "retreat" | "wellness";
type FilterKey = "location" | "venueType" | "capacity" | "style" | "price" | "rating" | "accessible";

type Venue = {
  name: string;
  type: Exclude<VenueType, "all">;
  category: string;
  location: string;
  country: string;
  region: string;
  capacity: string;
  setting: string;
  description: string;
  image: string;
  tags: string[];
  price: string;
  priceValue: number;
  rating: number;
  reviews: number;
  accessible: boolean;
  featured?: boolean;
};

const liveFallback = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop";

const retreatRecords: Venue[] = [
  {
    name: "Relax Hotel and Spa",
    type: "retreat",
    category: "Retreat Venue",
    location: "Australia",
    country: "Australia",
    region: "Oceania",
    capacity: "20 - 30",
    setting: "Wellness",
    description: "A contemporary hotel and spa retreat setting for restorative stays and group wellness programs.",
    image: "https://vgfpqzbjionzkakoynxw.supabase.co/storage/v1/object/public/photo/pmec2d83du_1779212412250.jpg",
    tags: ["Spa", "Wellness", "Retreat"],
    price: "A$320",
    priceValue: 320,
    rating: 4.6,
    reviews: 18,
    accessible: true,
  },
  {
    name: "Sunshine Retreat Venue",
    type: "retreat",
    category: "Retreat Venue",
    location: "Australia",
    country: "Australia",
    region: "Oceania",
    capacity: "20 - 30",
    setting: "Coastal & Beach",
    description: "A light-filled retreat venue for intimate wellness groups and sunny restorative escapes.",
    image: "https://vgfpqzbjionzkakoynxw.supabase.co/storage/v1/object/public/photo/28enyhgut5h_1775714032814.jpeg",
    tags: ["Yoga", "Wellness", "Retreat"],
    price: "A$290",
    priceValue: 290,
    rating: 4.5,
    reviews: 21,
    accessible: true,
  },
  {
    name: "Rapture Surfcamp Bali Greenbowls",
    type: "retreat",
    category: "Surf Retreat",
    location: "Bali, Indonesia",
    country: "Indonesia",
    region: "Asia-Pacific",
    capacity: "30 - 50",
    setting: "Coastal & Beach",
    description: "A surf-focused retreat base near Green Bowl, shaped around ocean rhythm, movement, and recovery.",
    image: liveFallback,
    tags: ["Surf Therapy", "Ocean Breathwork", "Yoga"],
    price: "A$240",
    priceValue: 240,
    rating: 4.6,
    reviews: 34,
    accessible: false,
  },
  {
    name: "Kyoto Onsen",
    type: "retreat",
    category: "Wellness Retreat",
    location: "Kyoto, Japan",
    country: "Japan",
    region: "Asia-Pacific",
    capacity: "10 - 20",
    setting: "Thermal",
    description: "Traditional onsen retreat combining Japanese bathing rituals, quiet gardens, and contemplative wellness.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&h=800&fit=crop",
    tags: ["Onsen", "Meditation", "Thermal"],
    price: "A$480",
    priceValue: 480,
    rating: 4.9,
    reviews: 58,
    accessible: false,
    featured: true,
  },
  {
    name: "Serenity Springs",
    type: "retreat",
    category: "Wellness Retreat",
    location: "Mornington Peninsula, VIC",
    country: "Australia",
    region: "Oceania",
    capacity: "20 - 30",
    setting: "Thermal",
    description: "Natural hot springs retreat designed for deep rest, bathing rituals, and restorative wellness stays.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
    tags: ["Hot Springs", "Yoga", "Restoration"],
    price: "A$390",
    priceValue: 390,
    rating: 4.8,
    reviews: 67,
    accessible: true,
    featured: true,
  },
  {
    name: "Urban Oasis",
    type: "retreat",
    category: "Corporate Retreat",
    location: "Melbourne, VIC",
    country: "Australia",
    region: "Oceania",
    capacity: "20 - 30",
    setting: "Urban",
    description: "Heritage warehouse retreat in Melbourne combining industrial architecture with zen wellness.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
    tags: ["Yoga", "Meditation", "Art Therapy"],
    price: "A$360",
    priceValue: 360,
    rating: 4.8,
    reviews: 49,
    accessible: true,
    featured: true,
  },
  {
    name: "Alpine Wellness Retreat",
    type: "retreat",
    category: "Adventure Retreat",
    location: "Mount Hotham, VIC",
    country: "Australia",
    region: "Oceania",
    capacity: "20 - 30",
    setting: "Mountain & Alpine",
    description: "Year-round alpine retreat with hot springs, mountain trails and seasonal wellness programs.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop",
    tags: ["Cold Therapy", "Hiking Therapy", "Breathwork"],
    price: "A$430",
    priceValue: 430,
    rating: 4.7,
    reviews: 38,
    accessible: false,
  },
  {
    name: "Sacred Valley Retreat",
    type: "retreat",
    category: "Healing Retreat",
    location: "Byron Bay, NSW",
    country: "Australia",
    region: "Oceania",
    capacity: "20 - 30",
    setting: "Forest & Jungle",
    description: "Immersive nature retreat for healing arts, meditation, and slow group programs.",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&h=800&fit=crop",
    tags: ["Meditation", "Healing", "Nature Therapy"],
    price: "A$340",
    priceValue: 340,
    rating: 4.7,
    reviews: 44,
    accessible: false,
  },
  {
    name: "Mountain Terrace",
    type: "retreat",
    category: "Wellness Retreat",
    location: "Australia",
    country: "Australia",
    region: "Oceania",
    capacity: "20 - 30",
    setting: "Mountain & Alpine",
    description: "Terraced mountain sanctuary for wellness retreats, nature immersion, and high-country stillness.",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1200&h=800&fit=crop",
    tags: ["Meditation", "Nature Therapy", "Yoga"],
    price: "A$410",
    priceValue: 410,
    rating: 4.8,
    reviews: 46,
    accessible: true,
    featured: true,
  },
  {
    name: "Horizon Wellness Retreat",
    type: "retreat",
    category: "Wellness Retreat",
    location: "Australia",
    country: "Australia",
    region: "Oceania",
    capacity: "30 - 50",
    setting: "Countryside",
    description: "An open-horizon retreat venue for movement, recovery, and hosted wellness programs.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&h=800&fit=crop",
    tags: ["Yoga", "Wellness", "Breathwork"],
    price: "A$395",
    priceValue: 395,
    rating: 4.8,
    reviews: 55,
    accessible: true,
    featured: true,
  },
  {
    name: "Bali Healing Centre",
    type: "retreat",
    category: "Healing Retreat",
    location: "Springbrook, QLD",
    country: "Australia",
    region: "Oceania",
    capacity: "20 - 30",
    setting: "Forest & Jungle",
    description: "Balinese-inspired healing retreat in the Gold Coast hinterland with tropical architecture.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&h=800&fit=crop",
    tags: ["Balinese Healing", "Meditation", "Sound Healing"],
    price: "A$285",
    priceValue: 285,
    rating: 4.6,
    reviews: 43,
    accessible: false,
  },
  {
    name: "Float & Flow",
    type: "retreat",
    category: "Wellness Retreat",
    location: "Brooklyn, NSW",
    country: "Australia",
    region: "Oceania",
    capacity: "10 - 20",
    setting: "Lakeside",
    description: "Floating river retreat on the Hawkesbury with purpose-built pavilions on water.",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&h=800&fit=crop",
    tags: ["Yoga", "Meditation", "Float Therapy"],
    price: "A$300",
    priceValue: 300,
    rating: 4.8,
    reviews: 36,
    accessible: false,
    featured: true,
  },
  {
    name: "Coral Coast Bay",
    type: "retreat",
    category: "Wellness Retreat",
    location: "Cairns, QLD",
    country: "Australia",
    region: "Oceania",
    capacity: "30 - 50",
    setting: "Coastal & Beach",
    description: "Coastal wellness venue shaped for ocean-led retreats, movement, and restorative programs.",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&h=800&fit=crop",
    tags: ["Ocean", "Yoga", "Breathwork"],
    price: "A$370",
    priceValue: 370,
    rating: 4.8,
    reviews: 51,
    accessible: true,
    featured: true,
  },
  {
    name: "Sample Venue",
    type: "retreat",
    category: "Dedicated Retreat Centre",
    location: "San Juan, Batangas",
    country: "Philippines",
    region: "Asia-Pacific",
    capacity: "30 - 50",
    setting: "Coastal & Beach",
    description: "A sample retreat venue profile used for layout and listing presentation validation.",
    image: "https://vgfpqzbjionzkakoynxw.supabase.co/storage/v1/object/public/photo/y4790ojvvwr_1772853370919.jpg",
    tags: ["Pilates", "Mindfulness", "Naturopathy"],
    price: "A$210",
    priceValue: 210,
    rating: 4.5,
    reviews: 16,
    accessible: true,
    featured: true,
  },
  {
    name: "Moraea Farm",
    type: "retreat",
    category: "Dedicated Retreat Centre",
    location: "Berry, NSW",
    country: "Australia",
    region: "Oceania",
    capacity: "20 - 30",
    setting: "Countryside",
    description: "A layered retreat property with eco-lodge privacy, estate grounds, and dedicated practice spaces.",
    image: "https://vgfpqzbjionzkakoynxw.supabase.co/storage/v1/object/public/photo/l0w4nr1goro_1772787279556.webp",
    tags: ["Meditation", "Yoga", "Breathwork"],
    price: "A$420",
    priceValue: 420,
    rating: 4.9,
    reviews: 42,
    accessible: true,
    featured: true,
  },
];

const wellnessRecords: Venue[] = [
  {
    name: "testing",
    type: "wellness",
    category: "Wellness Venue",
    location: "Australia",
    country: "Australia",
    region: "Oceania",
    capacity: "Up to 10",
    setting: "Urban",
    description: "A live wellness venue record awaiting complete media and profile details.",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800",
    tags: ["Wellness", "Recovery", "Bodywork"],
    price: "A$110",
    priceValue: 110,
    rating: 4.4,
    reviews: 12,
    accessible: false,
  },
  {
    name: "Zenith Skin Clinic",
    type: "wellness",
    category: "Medi Spa",
    location: "South Yarra, VIC",
    country: "Australia",
    region: "Oceania",
    capacity: "Up to 10",
    setting: "Urban",
    description: "Advanced medi-spa and skin clinic in Melbourne.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800",
    tags: ["Skin Clinic", "Medi Spa", "Facials"],
    price: "A$180",
    priceValue: 180,
    rating: 4.6,
    reviews: 52,
    accessible: true,
  },
  {
    name: "Sage Naturopathic Wellness",
    type: "wellness",
    category: "Naturopathy Clinic",
    location: "Hobart, TAS",
    country: "Australia",
    region: "Oceania",
    capacity: "Up to 10",
    setting: "Urban",
    description: "Naturopathic wellness and herbal medicine in Hobart.",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800",
    tags: ["Naturopathy", "Herbalism", "Wellness"],
    price: "A$120",
    priceValue: 120,
    rating: 4.5,
    reviews: 27,
    accessible: false,
  },
  {
    name: "Aura Day Spa",
    type: "wellness",
    category: "Day Spa",
    location: "Sydney, NSW",
    country: "Australia",
    region: "Oceania",
    capacity: "Up to 10",
    setting: "Urban",
    description: "Luxurious urban day spa in Sydney CBD with bespoke treatments.",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800",
    tags: ["Massage", "Facials", "Day Spa"],
    price: "A$140",
    priceValue: 140,
    rating: 4.9,
    reviews: 85,
    accessible: true,
    featured: true,
  },
  {
    name: "Bodhi Tree Yoga & Wellness",
    type: "wellness",
    category: "Yoga Studio",
    location: "Byron Bay, NSW",
    country: "Australia",
    region: "Oceania",
    capacity: "20 - 30",
    setting: "Coastal & Beach",
    description: "Holistic yoga and wellness centre in Byron Bay.",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800",
    tags: ["Yoga", "Meditation", "Wellness"],
    price: "A$70",
    priceValue: 70,
    rating: 4.7,
    reviews: 44,
    accessible: false,
  },
  {
    name: "Tranquil Waters Wellness",
    type: "wellness",
    category: "Hydrotherapy",
    location: "Mudgeeraba, QLD",
    country: "Australia",
    region: "Oceania",
    capacity: "Up to 10",
    setting: "Forest & Jungle",
    description: "Hydrotherapy and thermal bathing in the Gold Coast hinterland.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    tags: ["Hydrotherapy", "Thermal", "Wellness"],
    price: "A$95",
    priceValue: 95,
    rating: 4.8,
    reviews: 64,
    accessible: true,
    featured: true,
  },
  {
    name: "Coral Spa Retreat",
    type: "wellness",
    category: "Resort Spa",
    location: "Cairns, QLD",
    country: "Australia",
    region: "Oceania",
    capacity: "10 - 20",
    setting: "Coastal & Beach",
    description: "Beachfront luxury spa with marine-inspired treatments in Cairns.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    tags: ["Resort Spa", "Bodywork", "Ocean"],
    price: "A$220",
    priceValue: 220,
    rating: 4.8,
    reviews: 71,
    accessible: true,
    featured: true,
  },
  {
    name: "Stillpoint Acupuncture & TCM",
    type: "wellness",
    category: "Traditional Medicine",
    location: "Braddon, ACT",
    country: "Australia",
    region: "Oceania",
    capacity: "Up to 10",
    setting: "Urban",
    description: "Traditional Chinese Medicine and acupuncture in Canberra.",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800",
    tags: ["Acupuncture", "TCM", "Healing"],
    price: "A$105",
    priceValue: 105,
    rating: 4.6,
    reviews: 29,
    accessible: true,
  },
  {
    name: "Lotus Ayurveda Centre",
    type: "wellness",
    category: "Ayurveda Centre",
    location: "Adelaide, SA",
    country: "Australia",
    region: "Oceania",
    capacity: "Up to 10",
    setting: "Urban",
    description: "Authentic Ayurvedic wellness and Panchakarma in Adelaide.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    tags: ["Ayurveda", "Holistic Health", "Massage"],
    price: "A$125",
    priceValue: 125,
    rating: 4.5,
    reviews: 39,
    accessible: false,
  },
  {
    name: "Pinnacle Performance & Recovery",
    type: "wellness",
    category: "Recovery Centre",
    location: "Australia",
    country: "Australia",
    region: "Oceania",
    capacity: "Up to 10",
    setting: "Urban",
    description: "Performance recovery studio with movement, treatment, and evidence-informed restoration.",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800",
    tags: ["Recovery", "Performance", "Bodywork"],
    price: "A$135",
    priceValue: 135,
    rating: 4.6,
    reviews: 41,
    accessible: true,
  },
  {
    name: "Elysian Float Studio",
    type: "wellness",
    category: "Float Centre",
    location: "Perth, WA",
    country: "Australia",
    region: "Oceania",
    capacity: "Up to 10",
    setting: "Urban",
    description: "Premier float therapy and sensory wellness in Perth.",
    image: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=800",
    tags: ["Float Therapy", "Recovery", "Sensory Wellness"],
    price: "A$90",
    priceValue: 90,
    rating: 4.6,
    reviews: 33,
    accessible: true,
  },
  {
    name: "Bodhi Urban Spa - Updated",
    type: "wellness",
    category: "Day Spa",
    location: "City of Antipolo, Queensland",
    country: "Australia",
    region: "Oceania",
    capacity: "Up to 10",
    setting: "Urban",
    description: "A day spa, treatment centre, and wellness resort profile from the live venue collection.",
    image: "https://vgfpqzbjionzkakoynxw.supabase.co/storage/v1/object/public/photo/21gy0swrlz3_1772939981320.png",
    tags: ["Day Spa", "Treatment Centre", "Wellness Resort"],
    price: "A$160",
    priceValue: 160,
    rating: 4.4,
    reviews: 19,
    accessible: false,
  },
];

const venues: Venue[] = [
  ...retreatRecords.filter((venue) => venue.featured),
  ...wellnessRecords.filter((venue) => venue.featured),
  ...retreatRecords.filter((venue) => !venue.featured),
  ...wellnessRecords.filter((venue) => !venue.featured),
];

const tabs: Array<{ id: VenueType; label: string }> = [
  { id: "all", label: "All Venues" },
  { id: "retreat", label: "Retreat Venues" },
  { id: "wellness", label: "Wellness Venues" },
];

const filterConfig: Array<{
  key: FilterKey;
  label: string;
  options: string[];
}> = [
  { key: "location", label: "All Locations", options: ["All Locations", "Australia", "NSW", "QLD", "VIC", "WA", "SA", "TAS"] },
  { key: "venueType", label: "Venue Type", options: ["Venue Type", "Retreat Venue", "Wellness Venue", "Day Spa", "Yoga Studio", "Eco Lodge", "Hydrotherapy"] },
  { key: "capacity", label: "Capacity", options: ["Capacity", "Up to 10", "10 - 20", "20 - 30", "30 - 50"] },
  { key: "style", label: "Retreat Style", options: ["Retreat Style", "Yoga", "Meditation", "Breathwork", "Thermal", "Hydrotherapy", "Coastal & Beach", "Urban"] },
  { key: "price", label: "Price Range", options: ["Price Range", "Under $100", "$100 - $250", "$250 - $500", "$500+"] },
  { key: "rating", label: "Rating", options: ["Rating", "4.5+", "4.7+", "4.9+"] },
  { key: "accessible", label: "Accessible", options: ["Accessible", "Accessible only"] },
];

const emptyFilters: Record<FilterKey, string> = {
  location: "All Locations",
  venueType: "Venue Type",
  capacity: "Capacity",
  style: "Retreat Style",
  price: "Price Range",
  rating: "Rating",
  accessible: "Accessible",
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function priceMatches(venue: Venue, price: string) {
  if (price === "Under $100") return venue.priceValue < 100;
  if (price === "$100 - $250") return venue.priceValue >= 100 && venue.priceValue <= 250;
  if (price === "$250 - $500") return venue.priceValue > 250 && venue.priceValue <= 500;
  if (price === "$500+") return venue.priceValue > 500;
  return true;
}

function VenueCard({ venue }: { venue: Venue }) {
  return (
    <article className={styles.venueCard}>
      <div className={styles.venueCardImage}>
        <img className={styles.venueCardImg} src={venue.image} alt={venue.name} loading="lazy" />
        <span className={styles.venueCardBadge}>{venue.type === "retreat" ? "Retreat Venue" : "Wellness Venue"}</span>
        {venue.featured ? <span className={styles.venueCardFeatured}>Featured</span> : null}
        <button className={styles.venueCardSave} type="button" aria-label={`Save ${venue.name}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8Z" />
          </svg>
        </button>
      </div>
      <div className={styles.venueCardBody}>
        <p className={styles.venueCardLocation}>{venue.location}</p>
        <h3 className={styles.venueCardName}>{venue.name}</h3>
        <p className={styles.venueCardType}>{venue.category}</p>
        <p className={styles.venueCardExcerpt}>{venue.description}</p>
        <div className={styles.venueCardTags}>
          {venue.tags.map((tag) => (
            <span className={styles.venueCardTag} key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.venueCardMeta}>
          <span className={styles.venueCardRating}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m12 2 2.9 6.1 6.7.9-4.8 4.7 1.1 6.6L12 17.1l-5.9 3.2 1.1-6.6L2.4 9l6.7-.9L12 2Z" />
            </svg>
            {venue.rating.toFixed(1)} <small>({venue.reviews})</small>
          </span>
          <span className={styles.venueCardPrice}>
            From <strong>{venue.price}</strong>
          </span>
        </div>
      </div>
    </article>
  );
}

export default function VenuesClient({ initialTab = "all" }: { initialTab?: VenueType }) {
  const [activeTab, setActiveTab] = useState<VenueType>(initialTab);
  const [sort, setSort] = useState("Recommended");
  const [filters, setFilters] = useState<Record<FilterKey, string>>(emptyFilters);
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const counts = {
    all: venues.length,
    retreat: venues.filter((venue) => venue.type === "retreat").length,
    wellness: venues.filter((venue) => venue.type === "wellness").length,
  };

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => value !== emptyFilters[key as FilterKey]).length;

  const visibleVenues = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = venues.filter((venue) => {
      if (activeTab !== "all" && venue.type !== activeTab) return false;
      if (normalizedQuery) {
        const haystack = [venue.name, venue.location, venue.country, venue.category, venue.description, ...venue.tags].join(" ").toLowerCase();
        if (!haystack.includes(normalizedQuery)) return false;
      }
      if (filters.location !== emptyFilters.location) {
        const location = filters.location.toLowerCase();
        if (![venue.location, venue.country, venue.region].join(" ").toLowerCase().includes(location)) return false;
      }
      if (filters.venueType !== emptyFilters.venueType) {
        if (filters.venueType === "Retreat Venue" && venue.type !== "retreat") return false;
        if (filters.venueType === "Wellness Venue" && venue.type !== "wellness") return false;
        if (!["Retreat Venue", "Wellness Venue"].includes(filters.venueType) && !venue.category.toLowerCase().includes(filters.venueType.toLowerCase())) return false;
      }
      if (filters.capacity !== emptyFilters.capacity && venue.capacity !== filters.capacity) return false;
      if (filters.style !== emptyFilters.style) {
        const style = filters.style.toLowerCase();
        if (![venue.setting, venue.category, ...venue.tags].join(" ").toLowerCase().includes(style)) return false;
      }
      if (!priceMatches(venue, filters.price)) return false;
      if (filters.rating !== emptyFilters.rating && venue.rating < Number.parseFloat(filters.rating)) return false;
      if (filters.accessible !== emptyFilters.accessible && !venue.accessible) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "Highest Rated") return b.rating - a.rating;
      if (sort === "Price: Low to High") return a.priceValue - b.priceValue;
      if (sort === "Newest Listed") return a.name.localeCompare(b.name);
      return Number(b.featured) - Number(a.featured);
    });
  }, [activeTab, filters, query, sort]);

  const heroCopy =
    activeTab === "retreat"
      ? {
          title: "Retreat Venues",
          subtitle:
            "Curated sanctuaries designed for transformation and deep practice. From mountain lodges to coastal estates, personally vetted for retreat hosting excellence.",
        }
      : activeTab === "wellness"
        ? {
            title: "Wellness Venues",
            subtitle:
              "Exceptional wellness destinations for restoration and renewal. From thermal sanctuaries to luxury wellness resorts, personally vetted for authenticity.",
          }
        : {
            title: "Explore Our Venues",
            subtitle: "Retreat centres, wellness resorts, thermal sanctuaries, and sacred spaces - curated from around the world.",
          };

  const applyFilter = (key: FilterKey, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setOpenFilter(null);
    setCurrentPage(1);
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(queryInput);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(visibleVenues.length / pageSize));
  const pageVenues = visibleVenues.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const changePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 760, behavior: "smooth" });
  };

  return (
    <div className={styles.page}>
      <SiteNavigation />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroImage} />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Discover</p>
            <h1>{heroCopy.title}</h1>
            <span>{heroCopy.subtitle}</span>
            <form className={styles.heroSearch} onSubmit={submitSearch}>
              <SearchIcon />
              <input
                aria-label="Search venues"
                placeholder="Search by location, venue name, or experience..."
                value={queryInput}
                onChange={(event) => setQueryInput(event.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </section>

        <section className={styles.filterSection}>
          <div className={styles.filterInner}>
            <div className={styles.tabs} role="tablist" aria-label="Venue type">
              {tabs.map((tab) => (
                <button
                  className={activeTab === tab.id ? styles.activeTab : ""}
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                >
                  {tab.label} <span>{counts[tab.id]}</span>
                </button>
              ))}
            </div>

            <div className={styles.filterBar}>
              <div className={styles.filterChips}>
                {filterConfig.map((filter, index) => {
                  const active = filters[filter.key] !== emptyFilters[filter.key];
                  return (
                    <div className={styles.filterDropdownWrapper} key={filter.key}>
                      <button
                        className={`${styles.filterChip} ${active ? styles.filterChipActive : ""}`}
                        type="button"
                        aria-expanded={openFilter === filter.key}
                        onClick={() => setOpenFilter(openFilter === filter.key ? null : filter.key)}
                      >
                        {index === 0 ? (
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
                          </svg>
                        ) : null}
                        {active ? filters[filter.key] : filter.label}
                        <span aria-hidden="true">⌄</span>
                      </button>
                      {openFilter === filter.key ? (
                        <div className={styles.dropdown}>
                          {filter.options.map((option) => (
                            <button
                              className={filters[filter.key] === option ? styles.dropdownItemActive : ""}
                              key={option}
                              type="button"
                              onClick={() => applyFilter(filter.key, option)}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                <span className={styles.filterDivider} />
                <button className={styles.filterAdvanced} type="button" onClick={() => setAdvancedOpen(!advancedOpen)}>
                  <span aria-hidden="true">⌘</span>
                  Advanced {activeFilterCount ? <strong>{activeFilterCount}</strong> : null}
                </button>
              </div>
              {advancedOpen ? (
                <div className={styles.advancedPanel}>
                  <div>
                    <h3>Advanced Search</h3>
                    <p>Choose a focused combination of setting, modality, price, rating, and accessibility.</p>
                  </div>
                  <div className={styles.advancedActions}>
                    <button type="button" onClick={() => {
                      setFilters({ ...filters, style: "Coastal & Beach", rating: "4.7+" });
                      setCurrentPage(1);
                    }}>
                      Coastal 4.7+
                    </button>
                    <button type="button" onClick={() => {
                      setFilters({ ...filters, venueType: "Wellness Venue", price: "Under $100" });
                      setCurrentPage(1);
                    }}>
                      Wellness under $100
                    </button>
                    <button type="button" onClick={() => {
                      setFilters(emptyFilters);
                      setCurrentPage(1);
                    }}>
                      Clear all
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className={styles.resultsHeader}>
          <p>
            Showing <strong>{visibleVenues.length}</strong>{" "}
            {activeTab === "all" ? "venues" : activeTab === "retreat" ? "retreat venues" : "wellness venues"} worldwide
          </p>
          <div className={styles.resultsActions}>
            <label>
              Sort by
              <select value={sort} onChange={(event) => {
                setSort(event.target.value);
                setCurrentPage(1);
              }}>
                <option>Recommended</option>
                <option>Highest Rated</option>
                <option>Price: Low to High</option>
                <option>Newest Listed</option>
              </select>
            </label>
            <button className={`${styles.viewBtn} ${styles.viewBtnActive}`} type="button" aria-label="Grid view">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
              </svg>
            </button>
            <button className={styles.viewBtn} type="button" aria-label="List view">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
              </svg>
            </button>
          </div>
        </section>

        {visibleVenues.length ? (
          <section className={styles.venuesGrid} aria-label="Venues">
            {pageVenues.map((venue, index) => (
              <VenueCard venue={venue} key={`${venue.name}-${index}`} />
            ))}
          </section>
        ) : (
          <section className={styles.emptyState}>
            <h2>No Venues Found</h2>
            <p>Try adjusting your search query or filters to discover more venues.</p>
            <button type="button" onClick={() => {
              setFilters(emptyFilters);
              setQuery("");
              setQueryInput("");
              setCurrentPage(1);
            }}>
              Clear Filters
            </button>
          </section>
        )}

        {visibleVenues.length && totalPages > 1 ? (
          <nav className={styles.pagination} aria-label="Venue result pages">
            <button
              className={styles.pageBtn}
              type="button"
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
              aria-label="Previous page"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ""}`}
                key={page}
                type="button"
                aria-current={currentPage === page ? "page" : undefined}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className={styles.pageBtn}
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => changePage(currentPage + 1)}
              aria-label="Next page"
            >
              ›
            </button>
          </nav>
        ) : null}

        <section className={styles.cta}>
          <p>Venue Partners</p>
          <h2>
            Your space deserves to be <em>discovered</em>
          </h2>
          <span>
            Join a curated collection of the world&apos;s most exceptional retreat and wellness venues. Transparent pricing,
            editorial-quality presentation, and a community of facilitators seeking spaces like yours.
          </span>
          <a href={tgsRoutes.listYourVenue}>List Your Venue</a>
        </section>
      </main>
    </div>
  );
}

