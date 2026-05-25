"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type JourneySection = {
  eyebrow: string;
  title: string;
  titleEm: string;
  steps: { step: string; title: string; text: string }[];
  cream?: boolean;
};

const journeySections: JourneySection[] = [
  {
    eyebrow: "For Wellness Travelers",
    title: "Find Your",
    titleEm: "Sanctuary",
    steps: [
      {
        step: "1",
        title: "Discover",
        text: "Browse our curated collection of wellness venues and retreat spaces. Filter by location, experience type, amenities, and more.",
      },
      {
        step: "2",
        title: "Explore",
        text: "View detailed venue profiles with galleries, comprehensive facility information, offered services, and reviews.",
      },
      {
        step: "3",
        title: "Connect",
        text: "Reach out through the platform, ask questions, check availability, and discuss your specific requirements.",
      },
      {
        step: "4",
        title: "Book",
        text: "Reserve with confidence through a streamlined process designed for clarity and trust.",
      },
    ],
  },
  {
    eyebrow: "For Retreat Hosts",
    title: "Host Your",
    titleEm: "Transformation",
    cream: true,
    steps: [
      {
        step: "1",
        title: "Search",
        text: "Find the right venue by capacity, facilities, location, and wellness modality fit.",
      },
      {
        step: "2",
        title: "Compare",
        text: "Evaluate venues side by side with details on space setup, accommodation, and service readiness.",
      },
      {
        step: "3",
        title: "Enquire",
        text: "Submit requirements so dates, group details, and special arrangements can be coordinated efficiently.",
      },
      {
        step: "4",
        title: "Confirm",
        text: "Secure your venue and move forward with confidence while logistics are managed through one flow.",
      },
    ],
  },
  {
    eyebrow: "For Venue Owners",
    title: "Showcase Your",
    titleEm: "Space",
    steps: [
      {
        step: "1",
        title: "Apply",
        text: "Submit your venue for review against quality and curation standards.",
      },
      {
        step: "2",
        title: "Create",
        text: "Build a comprehensive venue profile with imagery, amenities, and practical booking details.",
      },
      {
        step: "3",
        title: "Connect",
        text: "Receive enquiries from qualified hosts and guests while communication is kept structured and direct.",
      },
      {
        step: "4",
        title: "Grow",
        text: "Track performance, update availability, and improve conversion as your venue presence matures.",
      },
    ],
  },
];

const whyCards = [
  {
    title: "Curated Excellence",
    text: "Every venue is personally vetted so quality remains the baseline.",
  },
  {
    title: "Transparent Pricing",
    text: "No hidden fee layers. Pricing structures are clear and predictable.",
  },
  {
    title: "Dedicated Support",
    text: "Support is available from venue discovery through booking confirmation.",
  },
  {
    title: "Community Driven",
    text: "A connected global network of hosts, guests, and venue partners focused on transformation.",
  },
];

export default function HowItWorksPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    window.setTimeout(() => setSubscribed(false), 3000);
  };

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
          <button
            type="button"
            className="flex items-center gap-3"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
          >
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

          <Link href="/web/list-your-venue" className="border border-current/30 px-4 py-2 text-[11px] uppercase tracking-[0.16em]">
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
          <aside className="fixed left-0 top-0 z-50 h-full w-[320px] max-w-[84vw] overflow-y-auto bg-[#f7f5f1] p-6 text-[#313131] shadow-2xl">
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
                  <Link href="/web/how-it-works" onClick={() => setDrawerOpen(false)} className="block font-semibold">
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
                  <Link href="/web/list-your-venue" onClick={() => setDrawerOpen(false)} className="block">
                    List Your Venue
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </>
      ) : null}

      <main>
        <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden px-6 pt-32 text-center text-white sm:px-10">
          <div className="absolute inset-0 bg-[url('/frozen/web-pages/images/Bali%20Pool%20Nordic%20Filter.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/50" />
          <div className="relative z-10 max-w-4xl">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/80">How It Works</p>
            <h1 className="mt-4 text-5xl sm:text-7xl">
              Your Journey with <em>The Global Sanctum</em>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 sm:text-xl">
              Discover how we connect wellness travelers and retreat hosts with exceptional venues worldwide in one seamless flow from discovery to booking.
            </p>
          </div>
        </section>

        {journeySections.map((section) => (
          <section key={section.eyebrow} className={`px-6 py-24 sm:px-10 ${section.cream ? "bg-[#f7f5f1]" : ""}`}>
            <div className="mx-auto max-w-[1200px]">
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[0.24em] text-black/55">{section.eyebrow}</p>
                <h2 className="mt-3 text-4xl sm:text-5xl">
                  {section.title} <em>{section.titleEm}</em>
                </h2>
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {section.steps.map((item) => (
                  <article key={`${section.eyebrow}-${item.step}`} className="border border-black/10 bg-white p-6 text-center">
                    <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#313131] text-white">{item.step}</div>
                    <h3 className="text-2xl">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-black/70">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="bg-[#313131] px-6 py-24 text-white sm:px-10">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">Our Difference</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">
                <em>Why</em> The Global Sanctum?
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {whyCards.map((card) => (
                <article key={card.title} className="border border-white/20 bg-white/5 p-6">
                  <h3 className="text-2xl">{card.title}</h3>
                  <p className="mt-3 text-white/80">{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 text-center sm:px-10">
          <h2 className="text-4xl sm:text-5xl">Ready to Begin?</h2>
          <p className="mx-auto mt-4 max-w-3xl text-black/70">
            Whether you are seeking a transformative experience or planning to share your space with the world, your next step starts here.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/web/venues" className="bg-[#313131] px-7 py-3 text-[11px] uppercase tracking-[0.14em] text-white">
              Explore Venues
            </Link>
            <Link href="/web/list-your-venue" className="border border-black/20 px-7 py-3 text-[11px] uppercase tracking-[0.14em]">
              List Your Space
            </Link>
          </div>
        </section>

        <section className="bg-[#f7f5f1] px-6 py-24 text-center sm:px-10">
          <p className="text-[11px] uppercase tracking-[0.24em] text-black/55">Stay Connected</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Join The Community</h2>
          <p className="mx-auto mt-4 max-w-3xl text-black/70">
            Featured venues, practitioner spotlights, and wellness discoveries curated for the Sanctum community.
          </p>
          <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              className="w-full border border-black/20 px-4 py-3"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="bg-[#313131] px-6 py-3 text-[11px] uppercase tracking-[0.14em] text-white">
              Subscribe
            </button>
          </form>
          {subscribed ? <p className="mt-4 text-[#7a644f]">Subscribed successfully.</p> : null}
        </section>
      </main>

      <footer className="bg-[#313131] px-6 py-16 text-[#fdfcf9] sm:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-sm uppercase tracking-[0.32em]">The Global Sanctum</p>
            <p className="mt-4 max-w-xl text-sm text-white/75">
              Extraordinary retreat spaces, wellness venues, and the experiences they hold - curated and connected worldwide.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">About TGS</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link href="/web/about" className="block">About Us</Link>
              <Link href="/web/how-it-works" className="block">How It Works</Link>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Discover</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link href="/web/venues" className="block">Retreat Venues</Link>
              <Link href="/web/wellness-experiences" className="block">Experiences</Link>
              <Link href="/web/contact" className="block">Contact</Link>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Legal</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link href="/web/legal" className="block">Terms & Conditions</Link>
              <Link href="/web/legal" className="block">Privacy Policy</Link>
              <Link href="/web/legal" className="block">Cookies Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
