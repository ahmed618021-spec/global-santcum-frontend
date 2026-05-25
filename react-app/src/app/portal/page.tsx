"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

type VenueCard = {
  tag: string;
  location: string;
  name: string;
  desc?: string;
  type?: string;
  image: string;
};

const discoverPanels = [
  {
    title: "Coastal Sanctuaries",
    image: "/frozen/images/Beach%20With%20Boat%20Rainforest%20Aerial%20Nordic%20Filter.png",
    tall: true,
  },
  {
    title: "Forest Hideaways",
    image: "/frozen/images/Misty%20Forest%20Nordic%20Filter.png",
  },
  {
    title: "Desert Retreats",
    image: "/frozen/images/Australia%20Uluru%20Nordic%20Filter.png",
  },
  {
    title: "Mountain Sanctuaries",
    image: "/frozen/images/Meditation%20Black%20%26%20White%20Mountain.jpg",
  },
  {
    title: "Tropical Hideaways",
    image: "/frozen/images/Misty%20Jungle%20Forest%20Nordic%20Filter.png",
  },
  {
    title: "Sacred Temples",
    image: "/frozen/images/Bali%20Pool%20Nordic%20Filter.png",
    tall: true,
  },
];

const pathCards = [
  {
    title: "Retreat Venues",
    sub: "Exclusive-use spaces built for transformation.",
    cta: "Explore Venues ->",
    href: "/web/venues",
    image: "/frozen/images/Jungle%20Cabin%20Nordic%20Filter.png",
  },
  {
    title: "Wellness Venues",
    sub: "Sanctuaries where wellness is woven into every architectural detail.",
    cta: "Discover Stays ->",
    href: "/web/venues",
    image: "/frozen/images/Woman%20Hot%20Stone%20Silhouette%20Nordic%20Filter.png",
  },
  {
    title: "Wellness Experiences",
    sub: "Thermal springs, ancient healing traditions, and practices that restore.",
    cta: "Book Experiences ->",
    href: "/web/wellness-experiences",
    image: "/frozen/images/Woman%20In%20Spa%20Dark%20Tiles%20Nordic%20Filter.png",
  },
  {
    title: "Wellness Insights",
    sub: "Stories, guides, and inspiration from the global wellness community.",
    cta: "Browse Articles ->",
    href: "/web/the-wellness-edit",
    image: "/frozen/images/Woman%20Eyes%20Closed%20Meditate%20Nordic%20Filter.png",
  },
];

const yearlyExperiences = [
  {
    tag: "Hydrotherapy",
    title: "Thermal Bathing Rituals",
    desc: "Ancient waters, volcanic springs, and the art of restoration through heat and cold.",
    image: "/frozen/images/Reiki%20Image%20Nordic%20Filter.png",
  },
  {
    tag: "Sound Therapy",
    title: "Vibrational Sound Journeys",
    desc: "Crystal bowls, gongs, and frequencies that recalibrate the nervous system.",
    image: "/frozen/images/Black%20%26%20White%20Massage%20Nordic%20Filter.png",
  },
  {
    tag: "Nature Immersion",
    title: "Forest Bathing & Shinrin-Yoku",
    desc: "The Japanese art of forest medicine and intentional nature connection.",
    image: "/frozen/images/Misty%20Forest%20Nordic%20Filter.png",
  },
  {
    tag: "Breathwork",
    title: "Conscious Breathing Practices",
    desc: "Holotropic, Wim Hof, and pranayama traditions for deep transformation.",
    image: "/frozen/images/Breathwork%20lying%20down%20Nordic%20Filter.png",
  },
];

const premiumCards: VenueCard[] = [
  {
    tag: "Brooklyn",
    location: "Brooklyn, Australia",
    name: "Float & Flow",
    desc: "Floating river retreat on the Hawkesbury with purpose-built pavilions on water.",
    type: "Wellness Retreat - Yoga Retreat",
    image: "/frozen/images/Beach%20With%20Boat%20Rainforest%20Aerial%20Nordic%20Filter.png",
  },
  {
    tag: "Katoomba",
    location: "Katoomba, Australia",
    name: "Serenity Springs",
    desc: "Natural hot spring retreat in the Blue Mountains with mineral pools and forest meditation.",
    type: "Wellness Retreat - Yoga Retreat",
    image: "/frozen/images/Sauna%20Modern%20Nordic%20Filter.png",
  },
  {
    tag: "Hahndorf",
    location: "Hahndorf, Australia",
    name: "Kyoto Onsen",
    desc: "Japanese-inspired onsen retreat in the Adelaide Hills with mineral springs and zen gardens.",
    type: "Wellness Retreat - Cultural Retreat",
    image: "/frozen/images/Moroccan%20Pool%20Scandi%20Filter.png",
  },
  {
    tag: "Bali",
    location: "Bali, Indonesia",
    name: "Rapture Surfcamp Bali",
    desc: "A tropical retreat designed for surfing, wellness, and meaningful connection.",
    type: "Wellness Retreat - Surf Retreat",
    image: "/frozen/images/Bali%20Pool%20Nordic%20Filter.png",
  },
  {
    tag: "Nafplio",
    location: "Nafplio, Greece",
    name: "Sunshine Retreat Venue",
    desc: "Where expansion and tranquility comes naturally in the Peloponnese.",
    type: "Dedicated Retreat Centre",
    image: "/frozen/images/Oriental%20Building%20Nordic%20Filter.png",
  },
];

const featuredCards: VenueCard[] = [
  {
    tag: "Katoomba",
    location: "Katoomba, Australia",
    name: "Serenity Springs",
    image: "/frozen/images/Sauna%20Modern%20Nordic%20Filter.png",
  },
  {
    tag: "Melbourne",
    location: "Melbourne, Australia",
    name: "Urban Oasis",
    image: "/frozen/images/Meditation%20Room%20Nordic%20Filter.png",
  },
  {
    tag: "Mount Hotham",
    location: "Mount Hotham, Australia",
    name: "Alpine Wellness Retreat",
    image: "/frozen/images/Meditation%20Black%20%26%20White%20Mountain.jpg",
  },
  {
    tag: "Strahan",
    location: "Strahan, Australia",
    name: "Sacred Valley Retreat",
    image: "/frozen/images/Misty%20Forest%20Nordic%20Filter.png",
  },
  {
    tag: "Hahndorf",
    location: "Hahndorf, Australia",
    name: "Kyoto Onsen",
    image: "/frozen/images/Moroccan%20Pool%20Scandi%20Filter.png",
  },
];

export default function PortalEntryPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [premiumIndex, setPremiumIndex] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [cookieHidden, setCookieHidden] = useState(false);

  const [destination, setDestination] = useState("Where to?");
  const [venueType, setVenueType] = useState("Any type");
  const [setting, setSetting] = useState("Any setting");
  const [guests, setGuests] = useState("How many?");

  const premiumSlides = useMemo(() => [premiumCards.slice(0, 3), premiumCards.slice(2, 5)], []);
  const featuredSlides = useMemo(() => [featuredCards.slice(0, 3), featuredCards.slice(2, 5)], []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
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
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="bg-[#f5f4f0] font-[Montserrat,sans-serif] text-[#2f2f2a]">
      <header
        className={`fixed left-0 right-0 top-0 z-40 flex h-[72px] items-center justify-between px-5 sm:px-9 ${
          scrolled ? "border-b border-black/10 bg-[#fcfbf8]/95 shadow-sm backdrop-blur" : "bg-transparent"
        }`}
      >
        <button type="button" onClick={() => setDrawerOpen(true)} className="flex items-center gap-2" aria-label="Open navigation">
          <span className="flex flex-col gap-1">
            <span className={`block h-[1.5px] w-5 ${scrolled ? "bg-[#2f2f2a]" : "bg-white"}`} />
            <span className={`block h-[1.5px] w-5 ${scrolled ? "bg-[#2f2f2a]" : "bg-white"}`} />
            <span className={`block h-[1.5px] w-5 ${scrolled ? "bg-[#2f2f2a]" : "bg-white"}`} />
          </span>
          <span className={`text-[11px] uppercase tracking-[0.22em] ${scrolled ? "text-[#2f2f2a]" : "text-white"}`}>Menu</span>
        </button>

        <Link href="/web" className={`text-center font-[Cormorant_Garamond,serif] text-sm uppercase tracking-[0.22em] sm:text-base ${scrolled ? "text-[#2f2f2a]" : "text-white"}`}>
          The Global Sanctum
        </Link>

        <div className="w-[80px]" />
      </header>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 sm:px-9">
            <button type="button" onClick={() => setDrawerOpen(false)} className="text-2xl leading-none" aria-label="Close menu">
              ×
            </button>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/60">Menu</span>
            <span className="w-6" />
          </div>
          <div className="h-[calc(100vh-64px)] overflow-y-auto px-7 py-8 sm:px-10">
            <div className="mb-10">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/55">Discover</p>
              <div className="grid gap-4 font-[Cormorant_Garamond,serif] text-4xl leading-none">
                <Link href="/web/venues" onClick={() => setDrawerOpen(false)}>
                  Explore Venues
                </Link>
                <Link href="/web/wellness-experiences" onClick={() => setDrawerOpen(false)}>
                  Wellness Experiences
                </Link>
              </div>
            </div>
            <div className="mb-10">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/55">Learn</p>
              <div className="grid gap-4 font-[Cormorant_Garamond,serif] text-4xl leading-none">
                <Link href="/web/about" onClick={() => setDrawerOpen(false)}>
                  About Us
                </Link>
                <Link href="/web/how-it-works" onClick={() => setDrawerOpen(false)}>
                  How It Works
                </Link>
                <Link href="/web/the-wellness-edit" onClick={() => setDrawerOpen(false)}>
                  The Wellness Edit
                </Link>
              </div>
            </div>
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/55">Connect</p>
              <div className="grid gap-4 font-[Cormorant_Garamond,serif] text-4xl leading-none">
                <Link href="/web/contact" onClick={() => setDrawerOpen(false)}>
                  Contact Us
                </Link>
                <Link href="/web/list-your-venue" onClick={() => setDrawerOpen(false)}>
                  List Your Venue
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <section className="relative flex min-h-[620px] items-center justify-center overflow-hidden pt-28" aria-label="Hero">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/frozen/images/Woman%20Meditating%20In%20Sacred%20Site%20Nordic%20Filter.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/60" />
        <div className="relative z-10 w-full px-5 text-center text-white sm:px-10">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">The Global Sanctum</p>
          <h1 className="font-[Cormorant_Garamond,serif] text-[44px] leading-[1.05] sm:text-[72px]">
            Thoughtfully Curated.<br />
            Globally Connected.
          </h1>
          <p className="mx-auto mb-7 mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-[15px]">
            Discover exceptional retreat venues and wellness sanctuaries around the world.
          </p>

          <form onSubmit={onSearch} className="mx-auto grid w-full max-w-[920px] gap-2 rounded-lg border border-white/20 bg-black/45 p-4 backdrop-blur md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            <label className="grid gap-1 px-2 text-left">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">Destination</span>
              <select value={destination} onChange={(e) => setDestination(e.target.value)} className="bg-transparent text-sm text-white outline-none">
                <option className="text-black">Where to?</option>
                <option className="text-black">Asia Pacific</option>
                <option className="text-black">Europe</option>
                <option className="text-black">The Americas</option>
                <option className="text-black">Australia & Oceania</option>
              </select>
            </label>
            <label className="grid gap-1 border-white/15 px-2 text-left md:border-l">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">Venue Type</span>
              <select value={venueType} onChange={(e) => setVenueType(e.target.value)} className="bg-transparent text-sm text-white outline-none">
                <option className="text-black">Any type</option>
                <option className="text-black">Retreat Venue</option>
                <option className="text-black">Wellness Studio</option>
                <option className="text-black">Spa & Thermal</option>
                <option className="text-black">Eco Lodge</option>
              </select>
            </label>
            <label className="grid gap-1 border-white/15 px-2 text-left md:border-l">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">Setting</span>
              <select value={setting} onChange={(e) => setSetting(e.target.value)} className="bg-transparent text-sm text-white outline-none">
                <option className="text-black">Any setting</option>
                <option className="text-black">Mountain</option>
                <option className="text-black">Beach & Coastal</option>
                <option className="text-black">Forest & Jungle</option>
                <option className="text-black">Desert</option>
              </select>
            </label>
            <label className="grid gap-1 border-white/15 px-2 text-left md:border-l">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">Guests</span>
              <select value={guests} onChange={(e) => setGuests(e.target.value)} className="bg-transparent text-sm text-white outline-none">
                <option className="text-black">How many?</option>
                <option className="text-black">1-10 guests</option>
                <option className="text-black">11-20 guests</option>
                <option className="text-black">21-40 guests</option>
                <option className="text-black">40+ guests</option>
              </select>
            </label>
            <button type="submit" className="rounded-md bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2f2f2a]">
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            <a href="#ways">Browse Retreat Venues -&gt;</a>
            <a href="#ways">Explore Wellness Venues -&gt;</a>
            <a href="#experiences">Discover Experiences -&gt;</a>
          </div>
        </div>
      </section>

      <main>
        <section className="px-5 py-20 sm:px-10" id="story">
          <div className="mx-auto grid w-full max-w-[1180px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/60">A New Era of Wellness Discovery</p>
              <h2 className="mb-6 font-[Cormorant_Garamond,serif] text-[34px] leading-[1.2] text-[#2f2f2a] sm:text-[48px]">
                The spaces where wellness happens. <em>The venues where retreats come to life.</em> Curated and connected worldwide.
              </h2>
              <div className="mb-7 grid gap-4 text-sm leading-8 text-[#6f685f]">
                <p>We are the world&apos;s first curated platform dedicated exclusively to transformative wellness venues and retreat spaces.</p>
                <p>
                  Whether you&apos;re a retreat host seeking the perfect venue, a wellness guest designing your next journey, or simply seeking
                  restoration, The Global Sanctum connects you with extraordinary spaces around the world.
                </p>
              </div>
              <a className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2f2f2a] underline underline-offset-4" href="#philosophy">
                Discover Our Story -&gt;
              </a>
            </div>
            <div className="overflow-hidden bg-[#e5ddd2]">
              <img src="/frozen/images/Ayurveda%20Shirodhara%20Nordic%20Filter.jpg" alt="Oil massage treatment" className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="bg-[#f0ede8] px-5 py-20 sm:px-10" id="discover">
          <div className="mx-auto w-full max-w-[1180px]">
            <div className="mb-10 text-center">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/60">Discover Differently</p>
              <h2 className="mb-4 font-[Cormorant_Garamond,serif] text-[34px] italic leading-[1.1] sm:text-[48px]">Explore Intentional Spaces Around The World</h2>
              <p className="mx-auto max-w-4xl text-sm leading-8 text-[#6f685f]">
                From soul-restoring coastal sanctuaries to mountain retreats where silence does the work. Thermal springs rising from volcanic earth,
                forest hideaways hidden in ancient canopy - spaces where wellness lives in the foundations.
              </p>
            </div>

            <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-4">
              {discoverPanels.map((panel) => (
                <article key={panel.title} className={`group relative overflow-hidden ${panel.tall ? "md:row-span-2" : ""}`}>
                  <img src={panel.image} alt={panel.title} className="h-full min-h-[220px] w-full object-cover transition duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                  <p className="absolute bottom-3 left-3 text-sm font-medium text-white">{panel.title}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-10" id="ways">
          <div className="mx-auto w-full max-w-[1180px]">
            <div className="mb-10 text-center">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/60">Find Your Path</p>
              <h2 className="font-[Cormorant_Garamond,serif] text-[36px] leading-[1.1] sm:text-[52px]">Four Ways to Discover</h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-8 text-[#6f685f]">
                From thermal springs to forest sanctuaries, coastal retreats to mountain hideaways. Spaces where restoration isn&apos;t an afterthought -
                it&apos;s the foundation.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pathCards.map((card) => (
                <Link key={card.title} href={card.href} className="group relative block min-h-[420px] overflow-hidden">
                  <img src={card.image} alt={card.title} className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/75" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="mb-2 font-[Cormorant_Garamond,serif] text-3xl leading-none">{card.title}</h3>
                    <p className="mb-4 text-xs leading-6 text-white/80">{card.sub}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85">{card.cta}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-10" id="experiences">
          <div className="mx-auto w-full max-w-[1180px]">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/60">The Year Ahead</p>
                <h2 className="max-w-2xl font-[Cormorant_Garamond,serif] text-[34px] leading-[1.1] sm:text-[52px]">Defining Wellness Experiences for 2026</h2>
              </div>
              <Link href="/web/wellness-experiences" className="text-[11px] font-semibold uppercase tracking-[0.22em]">
                Explore All Experiences -&gt;
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {yearlyExperiences.map((item) => (
                <article key={item.title}>
                  <div className="mb-4 overflow-hidden bg-[#d8d0c6]">
                    <img src={item.image} alt={item.title} className="aspect-[0.88] w-full object-cover" />
                  </div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6f685f]">{item.tag}</p>
                  <h3 className="mb-2 font-[Cormorant_Garamond,serif] text-[24px] leading-[1.2]">{item.title}</h3>
                  <p className="text-[13px] leading-7 text-[#6f685f]">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-10" id="premium">
          <div className="mx-auto w-full max-w-[1180px]">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/60">Intentionally Curated</p>
                <h2 className="font-[Cormorant_Garamond,serif] text-[34px] leading-[1.1] sm:text-[50px]">Our Premium Collection</h2>
                <p className="mt-3 max-w-3xl text-[13px] leading-7 text-[#6f685f]">
                  The most exceptional wellness and retreat venues, offering unparalleled experiences in extraordinary settings.
                </p>
              </div>
              <Link href="/web/venues" className="pt-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
                Explore Premium Venues -&gt;
              </Link>
            </div>
            <div className="mb-5 flex items-center gap-2">
              <button
                type="button"
                className="h-9 w-9 rounded-full border border-black/25 bg-white"
                onClick={() => setPremiumIndex((v) => Math.max(0, v - 1))}
                aria-label="Previous premium venues"
              >
                ←
              </button>
              <button
                type="button"
                className="h-9 w-9 rounded-full border border-black/25 bg-white"
                onClick={() => setPremiumIndex((v) => Math.min(premiumSlides.length - 1, v + 1))}
                aria-label="Next premium venues"
              >
                →
              </button>
              <div className="ml-1 flex gap-2">
                {premiumSlides.map((_, idx) => (
                  <button
                    key={`premium-dot-${idx}`}
                    type="button"
                    onClick={() => setPremiumIndex(idx)}
                    className={`h-2 w-2 rounded-full ${premiumIndex === idx ? "bg-[#2f2f2a]" : "bg-black/20"}`}
                    aria-label={`Go to premium slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {premiumSlides[premiumIndex].map((card) => (
                <article key={`${card.name}-${card.tag}`} className="grid grid-rows-[auto_1fr] border border-black/10 bg-white">
                  <div className="relative">
                    <img src={card.image} alt={card.name} className="aspect-[1.1] w-full object-cover" />
                    <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]">{card.tag}</span>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f685f]">{card.location}</p>
                    <h3 className="mb-2 font-[Cormorant_Garamond,serif] text-3xl leading-none">{card.name}</h3>
                    <p className="mb-3 text-[13px] leading-7 text-[#6f685f]">{card.desc}</p>
                    <p className="mb-3 border-b border-black/10 pb-3 text-[11px] text-black/55">{card.type}</p>
                    <Link href="/web/venues" className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                      Explore Venue -&gt;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#353330] px-5 py-16 text-center text-white/70 sm:px-10">
          <p className="mx-auto mb-4 max-w-4xl font-[Cormorant_Garamond,serif] text-[22px] italic leading-[1.7] sm:text-[28px]">
            &quot;Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.&quot;
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">- Rumi</p>
        </section>

        <section className="px-5 py-20 sm:px-10" id="featured">
          <div className="mx-auto w-full max-w-[1180px]">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/60">Featured Sanctuaries</p>
                <h2 className="font-[Cormorant_Garamond,serif] text-[34px] leading-[1.1] sm:text-[50px]">Our Collection of Featured Venues</h2>
                <p className="mt-3 max-w-3xl text-[13px] leading-7 text-[#6f685f]">
                  From Japanese onsen to Greek island retreats. Mountain sanctuaries to coastal hideaways. Spaces where the environment does half the
                  healing.
                </p>
              </div>
              <Link href="/web/venues" className="pt-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
                Explore All Venues -&gt;
              </Link>
            </div>
            <div className="mb-5 flex items-center gap-2">
              <button
                type="button"
                className="h-9 w-9 rounded-full border border-black/25 bg-white"
                onClick={() => setFeaturedIndex((v) => Math.max(0, v - 1))}
                aria-label="Previous featured venues"
              >
                ←
              </button>
              <button
                type="button"
                className="h-9 w-9 rounded-full border border-black/25 bg-white"
                onClick={() => setFeaturedIndex((v) => Math.min(featuredSlides.length - 1, v + 1))}
                aria-label="Next featured venues"
              >
                →
              </button>
              <div className="ml-1 flex gap-2">
                {featuredSlides.map((_, idx) => (
                  <button
                    key={`featured-dot-${idx}`}
                    type="button"
                    onClick={() => setFeaturedIndex(idx)}
                    className={`h-2 w-2 rounded-full ${featuredIndex === idx ? "bg-[#2f2f2a]" : "bg-black/20"}`}
                    aria-label={`Go to featured slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {featuredSlides[featuredIndex].map((card) => (
                <article key={`${card.name}-${card.tag}`} className="grid grid-rows-[auto_1fr] border border-black/10 bg-white">
                  <div className="relative">
                    <img src={card.image} alt={card.name} className="aspect-[1.1] w-full object-cover" />
                    <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]">{card.tag}</span>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f685f]">{card.location}</p>
                    <h3 className="mb-2 font-[Cormorant_Garamond,serif] text-3xl leading-none">{card.name}</h3>
                    <Link href="/web/venues" className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                      Explore Venue -&gt;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-10">
          <div className="mx-auto grid w-full max-w-[1180px] items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <div className="overflow-hidden bg-[#d8d0c6]">
              <img src="/frozen/images/Ayurveda%20Shirodhara%20Nordic%20Filter.jpg" alt="Oil pouring massage treatment" className="w-full object-cover" />
            </div>
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/60">Discover Intentionally</p>
              <h2 className="mb-4 font-[Cormorant_Garamond,serif] text-[34px] italic leading-[1.1] sm:text-[50px]">Search Beyond The Surface</h2>
              <p className="mb-6 text-sm leading-8 text-[#6f685f]">
                Search for what truly matters - the practices supported, the experiences felt, the spaces designed, the environments created - not just
                where and when.
              </p>
              <div className="divide-y divide-black/10">
                {[
                  ["By Modality", "Yoga, breathwork, plant medicine, somatic work, sound healing, permaculture and more."],
                  ["By Location", "Coastal sanctuaries, mountain temples, thermal springs, tropical hideaways."],
                  ["By Wellness Type", "Ayurvedic, traditional Chinese medicine, thermal hydrotherapy, cryotherapy."],
                  ["By Architecture", "Eco lodges, heritage properties, purpose-built centres, minimalist sanctuaries."],
                ].map(([title, desc]) => (
                  <article key={title} className="py-4">
                    <h3 className="mb-1 font-[Cormorant_Garamond,serif] text-[24px]">{title}</h3>
                    <p className="text-[13px] leading-7 text-[#6f685f]">{desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-10" id="philosophy">
          <div className="mx-auto grid w-full max-w-[1180px] gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/60">Our Philosophy</p>
              <h2 className="mb-5 max-w-xl font-[Cormorant_Garamond,serif] text-[34px] leading-[1.2] sm:text-[48px]">Spaces That Hold Intention In Their Foundations</h2>
              <div className="mb-7 grid gap-4 text-sm leading-8 text-[#6f685f]">
                <p>
                  We believe that where you practice matters as much as how you practice. That architecture can amplify intention. That the right
                  environment becomes a silent teacher.
                </p>
                <p>
                  Every venue in our collection has been selected not just for its beauty, but for its capacity to hold transformation - spaces built
                  with the same care that practitioners bring to their work.
                </p>
              </div>
              <div className="grid sm:grid-cols-2">
                {[
                  ["Intentional Design", "Spaces built for practice, not adapted to it."],
                  ["Natural Materials", "Stone, wood, water - elements that ground."],
                  ["Cultural Integrity", "Traditions honoured, not commodified."],
                  ["Environmental Harmony", "Built with the land, not against it."],
                ].map(([title, desc], idx) => (
                  <article key={title} className={`border-t border-black/10 py-5 ${idx % 2 === 1 ? "sm:pl-5" : ""}`}>
                    <h3 className="mb-1 font-[Cormorant_Garamond,serif] text-[22px]">{title}</h3>
                    <p className="text-[13px] leading-7 text-[#6f685f]">{desc}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <div className="overflow-hidden bg-[#d8d0c6]">
                <img src="/frozen/images/Woman%20Hot%20Stone%20Silhouette%20Nordic%20Filter.png" alt="Hot stone massage" className="aspect-[1.55] w-full object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <img
                  src="/frozen/images/Woman%20Meditating%20In%20Sacred%20Site%20Nordic%20Filter.png"
                  alt="Yoga at sunset"
                  className="aspect-square w-full object-cover"
                />
                <img src="/frozen/images/Misty%20Forest%20Nordic%20Filter.png" alt="Misty forest" className="aspect-square w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#efece6] px-5 py-20 text-center sm:px-10" id="newsletter">
          <div className="mx-auto w-full max-w-[1180px]">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/60">Stay Connected</p>
            <h2 className="mb-3 font-[Cormorant_Garamond,serif] text-[36px] sm:text-[54px]">Join The Community</h2>
            <p className="mx-auto mb-8 max-w-3xl text-sm leading-8 text-[#6f685f]">
              Featured venues, practitioner spotlights, wellness discoveries, and our global calendar of retreats. Curated for the Sanctum community,
              delivered weekly.
            </p>
            <form className="mx-auto flex max-w-[520px] flex-col gap-2 sm:flex-row" onSubmit={onSearch}>
              <input
                type="email"
                placeholder="Your email address"
                required
                className="h-12 flex-1 border border-black/20 bg-white px-4 text-sm outline-none"
              />
              <button type="submit" className="h-12 bg-[#2f2f2a] px-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#2d2b27] px-5 pb-0 pt-14 text-white sm:px-10">
        <div className="mx-auto w-full max-w-[1180px]">
          <div className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-3 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <p className="mb-3 font-[Cormorant_Garamond,serif] text-lg uppercase tracking-[0.2em] text-white">The Global Sanctum</p>
              <p className="max-w-sm text-[13px] leading-7 text-white/45">
                Extraordinary retreat spaces, wellness venues, and the experiences they hold - curated and connected worldwide.
              </p>
            </div>
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">About TGS</p>
              <div className="grid gap-2 text-sm text-white/70">
                <Link href="/web/about">About Us</Link>
                <Link href="/web/how-it-works">How It Works</Link>
              </div>
            </div>
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Discover</p>
              <div className="grid gap-2 text-sm text-white/70">
                <Link href="/web/venues">Retreat Venues</Link>
                <Link href="/web/venues">Wellness Venues</Link>
                <Link href="/web/wellness-experiences">Experiences</Link>
              </div>
            </div>
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Partner With Us</p>
              <div className="grid gap-2 text-sm text-white/70">
                <Link href="/web/list-your-venue">List Your Venue</Link>
                <a href="mailto:press@theglobalsanctum.com">Press & Media</a>
              </div>
            </div>
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Legal</p>
              <div className="grid gap-2 text-sm text-white/70">
                <Link href="/web/legal">Terms & Conditions</Link>
                <Link href="/web/legal">Privacy Policy</Link>
                <Link href="/web/legal">Cookies Policy</Link>
              </div>
            </div>
          </div>
          <div className="py-5 text-center text-xs text-white/30">© 2026 The Global Sanctum. All rights reserved.</div>
        </div>
      </footer>

      {!cookieHidden ? (
        <aside className="fixed bottom-5 right-5 z-50 max-w-[340px] border border-black/10 bg-[#fcfbf8] p-4 shadow-2xl">
          <p className="mb-3 text-[13px] leading-6 text-[#6f685f]">
            We use cookies to improve your experience. By continuing to browse, you agree to our use of cookies.
          </p>
          <button
            type="button"
            onClick={() => setCookieHidden(true)}
            className="ml-auto block bg-[#2f2f2a] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
          >
            Accept All
          </button>
        </aside>
      ) : null}
    </div>
  );
}
