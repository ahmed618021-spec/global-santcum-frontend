"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type PanelName = "where" | "venueType" | "setting";

type Suggestion = {
  value: string;
  detail: string;
  count: string;
};

const whereSuggestions: Suggestion[] = [
  { value: "Bali, Indonesia", detail: "Indonesia - Asia-Pacific", count: "3 venues" },
  { value: "Lisbon, Portugal", detail: "City - Portugal - Europe", count: "2 venues" },
  { value: "Algarve, Portugal", detail: "Region - Portugal - Europe", count: "1 venue" },
  { value: "Reykjavik, Iceland", detail: "City - Iceland - Europe", count: "1 venue" },
  { value: "Byron Bay, Australia", detail: "City - Australia - Asia-Pacific", count: "1 venue" },
  { value: "Vals, Switzerland", detail: "Mountain Village - Switzerland - Europe", count: "1 venue" },
];

const premiumSlides = [
  [
    {
      tag: "Coral Bay",
      location: "Coral Bay, Australia",
      name: "Relax Hotel and Spa",
      desc: "Barefoot luxury eco-retreat on WA's Coral Coast with ocean wellness and indigenous healing.",
      type: "Wellness Retreat - Yoga Retreat",
      image:
        "https://nextjs-webportal-tgs.vercel.app/_next/image?url=https%3A%2F%2Fvgfpqzbjionzkakoynxw.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fphoto%2Fpdzh5yay3j_1779212412251.jpeg&w=1920&q=75",
    },
    {
      tag: "Brooklyn",
      location: "Brooklyn, Australia",
      name: "Sunshine Retreat Venue",
      desc: "A serene lakeside sanctuary designed for stillness, reflection, and gentle restoration.",
      type: "Wellness Retreat - Meditation Retreat",
      image:
        "https://nextjs-webportal-tgs.vercel.app/_next/image?url=https%3A%2F%2Fvgfpqzbjionzkakoynxw.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fphoto%2Frsj5j39ij7_1775714032815.jpg&w=1920&q=75",
    },
    {
      tag: "Katoomba",
      location: "Katoomba, Australia",
      name: "Rapture Surfcamp Bali Greenbowls",
      desc: "A purpose-built mountain retreat in the Blue Mountains, designed for transformation and renewal.",
      type: "Dedicated Retreat Centre",
      image:
        "https://nextjs-webportal-tgs.vercel.app/_next/image?url=https%3A%2F%2Fvgfpqzbjionzkakoynxw.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fphoto%2Fpy6ly0u5nel_1775286440947.jpg&w=1920&q=75",
    },
  ],
  [
    {
      tag: "Nafplio",
      location: "Nafplio, Greece",
      name: "Coral Coast Bay",
      desc: "Where expansion and tranquility comes naturally.",
      type: "Dedicated Retreat Centre",
      image:
        "https://nextjs-webportal-tgs.vercel.app/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1510414842594-a61c69b5ae57%3Fw%3D800%26h%3D600%26fit%3Dcrop&w=1920&q=75",
    },
    {
      tag: "Bali",
      location: "Indonesia",
      name: "Serenity Springs",
      desc: "A space designed for meaningful, intimate retreats.",
      type: "Villa",
      image:
        "https://nextjs-webportal-tgs.vercel.app/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1600585154340-be6161a56a0c%3Fw%3D800%26h%3D600%26fit%3Dcrop&w=1920&q=75",
    },
    {
      tag: "Hahndorf",
      location: "Hahndorf, Australia",
      name: "Float & Flow",
      desc: "A heritage retreat property nestled in the Adelaide Hills, offering coastal views and immersive nature experiences.",
      type: "Heritage Property",
      image:
        "https://nextjs-webportal-tgs.vercel.app/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1439066615861-d1af74d74000%3Fw%3D800%26h%3D600%26fit%3Dcrop&w=1920&q=75",
    },
  ],
];

export default function WebEntryPage() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement | null>(null);
  const panelAreaRef = useRef<HTMLDivElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openPanel, setOpenPanel] = useState<PanelName | null>(null);
  const [whereValue, setWhereValue] = useState("");
  const [whereDisplay, setWhereDisplay] = useState("Anywhere");
  const [whereQuery, setWhereQuery] = useState("");
  const [venueTypeValue, setVenueTypeValue] = useState("");
  const [venueTypeDisplay, setVenueTypeDisplay] = useState("All Venues");
  const [settingValue, setSettingValue] = useState("");
  const [settingDisplay, setSettingDisplay] = useState("Any setting");
  const [premiumSlide, setPremiumSlide] = useState(0);

  const filteredSuggestions = useMemo(() => {
    const q = whereQuery.trim().toLowerCase();
    if (!q) return whereSuggestions;
    return whereSuggestions.filter((item) => item.value.toLowerCase().includes(q) || item.detail.toLowerCase().includes(q));
  }, [whereQuery]);

  useEffect(() => {
    const onScroll = () => {
      const threshold = (heroRef.current?.offsetHeight ?? 420) - 80;
      setScrolled(window.scrollY > threshold);
    };
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
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setOpenPanel(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (!panelAreaRef.current || !openPanel) return;
      if (!panelAreaRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [openPanel]);

  const submitSearch = () => {
    const params = new URLSearchParams();
    if (whereValue) params.set("location", whereValue);
    if (venueTypeValue) params.set("venueType", venueTypeValue);
    if (settingValue) params.set("setting", settingValue);
    const query = params.toString();
    router.push(query ? `/web/venues?${query}` : "/web/venues");
  };

  return (
    <div className="bg-[#fdfcf9] text-[#313131]">
      <nav
        className={`fixed left-0 right-0 top-0 z-40 px-6 py-5 transition-all sm:px-10 ${
          scrolled ? "border-b border-black/10 bg-[#fdfcf9]/95 backdrop-blur" : "bg-gradient-to-b from-black/20 to-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
          <button
            type="button"
            aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setDrawerOpen((v) => !v)}
            className="flex items-center gap-3"
          >
            <span className="flex flex-col gap-1">
              <span className="h-px w-5 bg-[#313131]" />
              <span className="h-px w-5 bg-[#313131]" />
              <span className="h-px w-5 bg-[#313131]" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em]">{drawerOpen ? "Close" : "Menu"}</span>
          </button>

          <Link href="/web" className="text-sm uppercase tracking-[0.35em] sm:text-base">
            The Global Sanctum
          </Link>

          <Link href="/web/list-your-venue" className="border border-black/20 px-4 py-2 text-[11px] uppercase tracking-[0.16em]">
            List Your Venue
          </Link>
        </div>
      </nav>

      {drawerOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu overlay"
          />
          <aside className="fixed left-0 top-0 z-50 h-full w-[320px] bg-[#f7f5f1] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em]">Navigate</p>
              <button type="button" onClick={() => setDrawerOpen(false)} className="text-sm uppercase tracking-[0.16em]">
                Close
              </button>
            </div>
            <div className="space-y-5 text-sm">
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-black/60">Discover</p>
                <div className="space-y-2">
                  <Link href="/web/venues" onClick={() => setDrawerOpen(false)} className="block">
                    Retreat Venues
                  </Link>
                  <Link href="/web/venues" onClick={() => setDrawerOpen(false)} className="block">
                    Wellness Venues
                  </Link>
                  <Link href="/web/wellness-experiences" onClick={() => setDrawerOpen(false)} className="block">
                    Wellness Experiences
                  </Link>
                </div>
              </div>
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-black/60">Learn</p>
                <div className="space-y-2">
                  <Link href="/web/about" onClick={() => setDrawerOpen(false)} className="block">
                    About Us
                  </Link>
                  <Link href="/web/how-it-works" onClick={() => setDrawerOpen(false)} className="block">
                    How It Works
                  </Link>
                  <Link href="/web/the-wellness-edit" onClick={() => setDrawerOpen(false)} className="block">
                    The Wellness Edit
                  </Link>
                </div>
              </div>
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-black/60">Connect</p>
                <div className="space-y-2">
                  <Link href="/web/contact" onClick={() => setDrawerOpen(false)} className="block">
                    Contact Us
                  </Link>
                  <Link href="/portal" onClick={() => setDrawerOpen(false)} className="block">
                    Portal
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </>
      ) : null}

      <header
        ref={heroRef}
        className="relative min-h-[92vh] bg-cover bg-center"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1545389336-cf090694435e?w=1920&q=80)" }}
      >
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative mx-auto flex max-w-[1400px] flex-col px-6 pb-16 pt-44 text-white sm:px-10">
          <p className="mb-2 text-[11px] uppercase tracking-[0.26em] text-white/80">The Global Sanctum</p>
          <h1 className="max-w-4xl text-5xl leading-[0.95] sm:text-7xl">Thoughtfully Curated. Globally Connected.</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            Discover exceptional retreat venues and wellness sanctuaries around the world.
          </p>

          <div ref={panelAreaRef} className="relative mt-8 rounded border border-white/25 bg-white/10 p-4 backdrop-blur">
            <div className="grid gap-3 sm:grid-cols-4">
              <button
                type="button"
                onClick={() => setOpenPanel((v) => (v === "where" ? null : "where"))}
                className={`rounded border px-3 py-3 text-left text-sm ${
                  openPanel === "where" ? "border-[#c4a265] bg-black/35" : "border-white/20 bg-black/25"
                }`}
              >
                <span className="block text-[11px] uppercase tracking-[0.14em] text-white/65">Where</span>
                <span>{whereDisplay}</span>
              </button>
              <button
                type="button"
                onClick={() => setOpenPanel((v) => (v === "venueType" ? null : "venueType"))}
                className={`rounded border px-3 py-3 text-left text-sm ${
                  openPanel === "venueType" ? "border-[#c4a265] bg-black/35" : "border-white/20 bg-black/25"
                }`}
              >
                <span className="block text-[11px] uppercase tracking-[0.14em] text-white/65">Venue Type</span>
                <span>{venueTypeDisplay}</span>
              </button>
              <button
                type="button"
                onClick={() => setOpenPanel((v) => (v === "setting" ? null : "setting"))}
                className={`rounded border px-3 py-3 text-left text-sm ${
                  openPanel === "setting" ? "border-[#c4a265] bg-black/35" : "border-white/20 bg-black/25"
                }`}
              >
                <span className="block text-[11px] uppercase tracking-[0.14em] text-white/65">Setting</span>
                <span>{settingDisplay}</span>
              </button>
              <button
                type="button"
                onClick={submitSearch}
                className="rounded bg-[#c4a265] px-4 py-3 text-sm uppercase tracking-[0.12em] text-black"
              >
                Search
              </button>
            </div>

            {openPanel === "where" ? (
              <div className="absolute left-4 right-4 top-[calc(100%+8px)] z-20 rounded border border-black/20 bg-[#fdfcf9] p-3 text-[#313131] shadow-xl sm:left-4 sm:max-w-[420px]">
                <p className="mb-2 text-xs uppercase tracking-[0.14em] text-black/55">Where to?</p>
                <input
                  value={whereQuery}
                  onChange={(e) => setWhereQuery(e.target.value)}
                  placeholder="Search a country, region, city, or neighbourhood"
                  className="mb-3 w-full border border-black/15 px-3 py-2 text-sm outline-none"
                />
                <div className="max-h-[260px] overflow-auto">
                  {filteredSuggestions.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setWhereValue(item.value);
                        setWhereDisplay(item.value);
                        setOpenPanel(null);
                      }}
                      className="mb-1 flex w-full items-center justify-between border border-transparent px-2 py-2 text-left text-sm hover:border-black/10 hover:bg-black/5"
                    >
                      <span>
                        <span className="block">{item.value}</span>
                        <span className="block text-xs text-black/55">{item.detail}</span>
                      </span>
                      <span className="text-xs text-black/50">{item.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {openPanel === "venueType" ? (
              <div className="absolute left-4 right-4 top-[calc(100%+8px)] z-20 rounded border border-black/20 bg-[#fdfcf9] p-3 text-[#313131] shadow-xl sm:left-[26%] sm:max-w-[420px]">
                <p className="mb-2 text-xs uppercase tracking-[0.14em] text-black/55">What kind of venue?</p>
                {[
                  { value: "", label: "All Venues" },
                  { value: "retreat", label: "Retreat Venues" },
                  { value: "wellness", label: "Wellness Venues" },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setVenueTypeValue(item.value);
                      setVenueTypeDisplay(item.label);
                      setOpenPanel(null);
                    }}
                    className="mb-1 block w-full border border-transparent px-2 py-2 text-left text-sm hover:border-black/10 hover:bg-black/5"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ) : null}

            {openPanel === "setting" ? (
              <div className="absolute left-4 right-4 top-[calc(100%+8px)] z-20 rounded border border-black/20 bg-[#fdfcf9] p-3 text-[#313131] shadow-xl sm:left-[52%] sm:max-w-[420px]">
                <p className="mb-2 text-xs uppercase tracking-[0.14em] text-black/55">Setting</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "", label: "Any setting" },
                    { value: "coastal", label: "Coastal and Beach" },
                    { value: "mountain", label: "Mountain and Alpine" },
                    { value: "forest", label: "Forest and Jungle" },
                    { value: "urban", label: "Urban" },
                    { value: "island", label: "Island and Tropical" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setSettingValue(item.value);
                        setSettingDisplay(item.label);
                        setOpenPanel(null);
                      }}
                      className="border border-black/15 px-3 py-1 text-xs uppercase tracking-[0.08em]"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.14em]">
            <Link href="/web/venues" className="border border-white/30 px-4 py-2">
              Retreat Venues
            </Link>
            <Link href="/web/venues" className="border border-white/30 px-4 py-2">
              Wellness Venues
            </Link>
            <Link href="/web/wellness-experiences" className="border border-white/30 px-4 py-2">
              Wellness Experiences
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10">
        <p className="text-[11px] uppercase tracking-[0.24em] text-black/55">Premium Collection</p>
        <h2 className="mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">Our Featured Wellness & Retreat Venues</h2>
        <p className="mt-4 max-w-3xl text-lg text-black/65">
          The most exceptional wellness and retreat venues, offering unparalleled experiences in extraordinary settings.
        </p>

        <div className="mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${premiumSlide * 100}%)` }}
          >
            {premiumSlides.map((slide, index) => (
              <div key={index} className="w-full shrink-0">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {slide.map((venue) => (
                    <article key={venue.name} className="overflow-hidden border border-black/10 bg-white">
                      <div className="relative h-56 w-full">
                        {/* Using source image URLs to preserve migration parity during native rollout. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={venue.image} alt={venue.name} className="h-full w-full object-cover" />
                        <span className="absolute left-3 top-3 bg-black/65 px-2 py-1 text-xs uppercase tracking-[0.12em] text-white">
                          {venue.tag}
                        </span>
                      </div>
                      <div className="p-5">
                        <p className="text-xs uppercase tracking-[0.14em] text-black/50">{venue.location}</p>
                        <h3 className="mt-2 text-2xl">{venue.name}</h3>
                        <p className="mt-2 text-sm text-black/65">{venue.desc}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-black/50">{venue.type}</p>
                        <Link href="/web/venues" className="mt-4 inline-block text-sm uppercase tracking-[0.14em] text-[#7a644f]">
                          Explore Venue {"->"}
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setPremiumSlide((v) => Math.max(0, v - 1))}
              disabled={premiumSlide === 0}
              className="border border-black/20 px-3 py-1 disabled:opacity-40"
            >
              {"<-"}
            </button>
            <button
              type="button"
              aria-label="Go to premium slide 1"
              onClick={() => setPremiumSlide(0)}
              className={`h-2 w-2 rounded-full ${premiumSlide === 0 ? "bg-black" : "bg-black/30"}`}
            />
            <button
              type="button"
              aria-label="Go to premium slide 2"
              onClick={() => setPremiumSlide(1)}
              className={`h-2 w-2 rounded-full ${premiumSlide === 1 ? "bg-black" : "bg-black/30"}`}
            />
            <button
              type="button"
              onClick={() => setPremiumSlide((v) => Math.min(premiumSlides.length - 1, v + 1))}
              disabled={premiumSlide === premiumSlides.length - 1}
              className="border border-black/20 px-3 py-1 disabled:opacity-40"
            >
              {"->"}
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f5f1] px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-[980px] text-center">
          <p className="text-[11px] uppercase tracking-[0.24em] text-black/55">Stay Connected</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Join The Community</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-black/65">
            Featured venues, practitioner spotlights, wellness discoveries, and our global calendar of retreats.
          </p>
          <div className="mx-auto mt-8 flex max-w-[560px] flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 border border-black/20 bg-white px-4 py-3 text-base outline-none"
            />
            <button type="button" className="bg-[#313131] px-6 py-3 text-sm uppercase tracking-[0.14em] text-white">
              Subscribe
            </button>
          </div>
        </div>
      </section>

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
              <Link href="/web/venues" className="block">
                Venues
              </Link>
              <Link href="/web/wellness-experiences" className="block">
                Wellness Experiences
              </Link>
              <Link href="/web/the-wellness-edit" className="block">
                The Wellness Edit
              </Link>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Company</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link href="/web/about" className="block">
                About
              </Link>
              <Link href="/web/contact" className="block">
                Contact
              </Link>
              <Link href="/web/legal" className="block">
                Legal
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
