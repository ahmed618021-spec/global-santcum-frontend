"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

const values = [
  {
    icon: "◇",
    title: "Curated With Intention",
    text: "Every listed venue is selected for transformational quality, intentional design, and practical suitability for wellness work.",
  },
  {
    icon: "◈",
    title: "Built To Serve",
    text: "Technology should remove operational friction so venue owners, hosts, and guests can focus on the experience itself.",
  },
  {
    icon: "◎",
    title: "Transparency First",
    text: "Clear information, honest positioning, and accurate representation of what each venue offers.",
  },
  {
    icon: "⬡",
    title: "Connection and Community",
    text: "We align venue owners, retreat hosts, and wellness guests into a shared ecosystem that creates stronger outcomes for all.",
  },
  {
    icon: "◉",
    title: "Global By Design",
    text: "From the Pacific to Europe and beyond, we curate authentic venues across regions so global discovery is practical and trusted.",
  },
  {
    icon: "★",
    title: "Elevating The Industry",
    text: "Wellness and retreat spaces deserve infrastructure designed for their realities, not retrofitted from generic systems.",
  },
];

export default function AboutPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
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

  const submitNewsletter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail("");
    window.setTimeout(() => setSubscribed(false), 3500);
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
                  <Link href="/web/about" onClick={() => setDrawerOpen(false)} className="block font-semibold">
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
        <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 pt-32 text-center text-white sm:px-10">
          <div className="absolute inset-0 bg-[url('/frozen/web-pages/images/Bali%20Pool%20Nordic%20Filter.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/35 to-black/55" />
          <div className="relative z-10 max-w-4xl">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/80">Our Story</p>
            <h1 className="mt-4 text-5xl italic sm:text-7xl">About The Global Sanctum</h1>
          </div>
        </section>

        <section className="grid gap-12 px-6 py-24 sm:px-10 md:grid-cols-2 md:items-center">
          <div className="mx-auto max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.24em] text-black/55">Wellness Redefined</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">The Premier Platform Connecting Transformation</h2>
            <p className="mt-5 text-black/70">
              The Global Sanctum connects wellness guests and retreat hosts with global wellness venues and retreat spaces.
            </p>
            <p className="mt-4 text-black/70">
              Finding your sanctuary becomes clearer, and booking your retreat becomes more seamless with curated structure and trusted information.
            </p>
          </div>
          <div className="mx-auto h-[420px] w-full max-w-[560px] overflow-hidden border border-black/10 shadow-[0_28px_56px_rgba(49,49,49,0.08)]">
            <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&q=80')] bg-cover bg-center" />
          </div>
        </section>

        <section className="bg-[#f7f5f1] px-6 py-24 sm:px-10">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl"><em>The Problem</em> We Saw</h2>
              <p className="mx-auto mt-4 max-w-3xl text-black/70">
                The wellness industry has deep intention and growth, but lacked the operational infrastructure to support the full ecosystem.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <article className="border border-black/10 bg-white p-6">
                <h3 className="text-2xl">For Wellness Guests</h3>
                <p className="mt-3 text-black/70">Experiences remained fragmented across channels, making authentic discovery difficult and inconsistent.</p>
              </article>
              <article className="border border-black/10 bg-white p-6">
                <h3 className="text-2xl">For Retreat Hosts</h3>
                <p className="mt-3 text-black/70">Venue sourcing took months, with repetitive admin and disconnected booking processes slowing delivery.</p>
              </article>
              <article className="border border-black/10 bg-white p-6">
                <h3 className="text-2xl">For Venue Owners</h3>
                <p className="mt-3 text-black/70">Teams managed large enquiry volumes manually, often with low conversion and high operational overhead.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="grid gap-10 px-6 py-24 sm:px-10 md:grid-cols-2 md:items-center">
          <div className="mx-auto h-[420px] w-full max-w-[560px] overflow-hidden border border-black/10 shadow-[0_28px_56px_rgba(49,49,49,0.08)]">
            <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=80')] bg-cover bg-center" />
          </div>
          <div className="mx-auto max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.24em] text-black/55">The Solution</p>
            <h2 className="mt-3 text-4xl sm:text-5xl"><em>One Platform</em> Connecting Everyone Who Creates Transformation</h2>
            <p className="mt-5 text-black/70">
              We built a platform where the full spectrum of wellness is discoverable, from traditional healing practices to contemporary modalities.
            </p>
            <p className="mt-4 text-black/70">
              For hosts, sourcing becomes precise. For guests, discovery becomes trusted. For venues, technology supports growth instead of creating burden.
            </p>
          </div>
        </section>

        <section className="bg-[#313131] px-6 py-24 text-white sm:px-10">
          <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-2">
            <article className="border border-white/20 p-8">
              <h3 className="text-3xl">Our Vision</h3>
              <p className="mt-4 text-white/80">
                A global platform where wellness venues and experiences are searchable, comparable, and bookable with confidence.
              </p>
              <p className="mt-4 text-white/80">
                Venue owners gain infrastructure for operations while hosts and guests gain clarity for decision-making.
              </p>
            </article>
            <article className="border border-white/20 p-8">
              <h3 className="text-3xl">Our Mission</h3>
              <p className="mt-4 text-white/80">
                Make transformational wellness more accessible by supporting everyone who creates it and everyone seeking it.
              </p>
              <p className="mt-4 text-white/80">
                Gather spaces, practices, and facilitators in one trusted system designed for this sector.
              </p>
            </article>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-24 text-center text-white sm:px-10">
          <div className="absolute inset-0 bg-[url('/frozen/web-pages/images/Sauna%20Modern%20Nordic%20Filter.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 mx-auto max-w-4xl">
            <p className="text-4xl italic leading-tight sm:text-5xl">&quot;Just the first chapter. The story we are writing is much bigger than this.&quot;</p>
            <p className="mt-4 text-white/80">The Global Sanctum</p>
          </div>
        </section>

        <section className="px-6 py-24 sm:px-10">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.24em] text-black/55">The Founder</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">A Note From Kate</h2>
            </div>
            <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-center">
              <div className="space-y-4 text-black/70">
                <p>Everything I have experienced has converged in The Global Sanctum.</p>
                <p>My professional path in property and market infrastructure, and my personal path in coaching and spiritual practice, both shaped this vision.</p>
                <p>
                  This platform is where operational expertise and transformational values align: infrastructure serving spaces designed for meaningful work.
                </p>
                <p>We are just beginning.</p>
                <p className="text-xl text-black">- Kate</p>
              </div>
              <div className="mx-auto h-[460px] w-full max-w-[420px] overflow-hidden rounded-full border border-black/10 p-3">
                <div className="h-full w-full rounded-full bg-[url('https://nextjs-webportal-tgs.vercel.app/images/Kate%20Beston%20Headshot.jpg')] bg-cover bg-center" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f5f1] px-6 py-24 sm:px-10">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.24em] text-black/55">What Guides Us</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">Our Values</h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {values.map((value) => (
                <article key={value.title} className="border border-black/10 bg-white p-6">
                  <p className="text-2xl text-black/55">{value.icon}</p>
                  <h3 className="mt-3 text-2xl">{value.title}</h3>
                  <p className="mt-3 text-black/70">{value.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 text-center sm:px-10">
          <p className="text-[11px] uppercase tracking-[0.24em] text-black/55">Stay Connected</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Join The Community</h2>
          <p className="mx-auto mt-4 max-w-3xl text-black/70">
            Featured venues, practitioner spotlights, and global retreat insights curated weekly for the Sanctum community.
          </p>
          <form onSubmit={submitNewsletter} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              className="w-full border border-black/20 px-4 py-3"
              placeholder="Your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
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
              <Link href="/web/wellness-experiences" className="block">Wellness Experiences</Link>
              <Link href="/web/contact" className="block">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
