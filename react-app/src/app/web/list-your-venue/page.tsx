"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type TierKey = "essentials" | "standard" | "featured" | "premium";

type BillingMode = "yearly" | "monthly";

const faqItems = [
  {
    q: "What is the difference between Retreat Venues and Wellness Venues?",
    a: "Retreat Venues are exclusive-use spaces for multi-day group programs. Wellness Venues offer day-use and multi-day experiences such as spas, bathhouses, and therapeutic facilities. Many venues qualify for both categories.",
  },
  {
    q: "What are the Founding Partner and Launch Partner programmes?",
    a: "Founding Partners receive lifetime 60% off and Launch Partners receive lifetime 40% off. These launch rates are limited and permanently locked when accepted.",
  },
  {
    q: "How does the Essentials plan work?",
    a: "Essentials has no subscription fee. You only pay platform commission when a booking is completed through The Global Sanctum.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Yes. Plan changes are supported at any time. Upgrades apply immediately with prorated billing, and downgrades apply at the next billing cycle.",
  },
];

const featureRows: { label: string; values: Record<TierKey, string> }[] = [
  {
    label: "Platform Commission",
    values: {
      essentials: "20% + 3%",
      standard: "10% + 3%",
      featured: "7% + 3%",
      premium: "5% + 3%",
    },
  },
  {
    label: "Search visibility",
    values: {
      essentials: "Standard",
      standard: "Standard",
      featured: "Priority",
      premium: "Premium",
    },
  },
  {
    label: "Home page placement",
    values: {
      essentials: "-",
      standard: "-",
      featured: "Feature rotation",
      premium: "Premium rotation",
    },
  },
  {
    label: "Analytics",
    values: {
      essentials: "-",
      standard: "Basic",
      featured: "Advanced",
      premium: "Comprehensive",
    },
  },
  {
    label: "Support level",
    values: {
      essentials: "Email",
      standard: "Direct",
      featured: "Priority",
      premium: "Dedicated",
    },
  },
];

const tierMeta: Record<
  TierKey,
  {
    name: string;
    description: string;
    founding: boolean;
    price: { yearly: string; monthly: string };
    retail?: { yearly: string; monthly: string };
  }
> = {
  essentials: {
    name: "Essentials",
    description: "Pay only when bookings arrive",
    founding: false,
    price: { yearly: "$0/mo", monthly: "$0/mo" },
  },
  standard: {
    name: "Standard",
    description: "Establish your presence",
    founding: true,
    retail: { yearly: "$490/yr", monthly: "$49/mo" },
    price: { yearly: "$196/yr", monthly: "$19.60/mo" },
  },
  featured: {
    name: "Featured",
    description: "Maximise booking potential",
    founding: true,
    retail: { yearly: "$990/yr", monthly: "$99/mo" },
    price: { yearly: "$396/yr", monthly: "$39.60/mo" },
  },
  premium: {
    name: "Premium",
    description: "Maximum exposure and support",
    founding: true,
    retail: { yearly: "$1,990/yr", monthly: "$199/mo" },
    price: { yearly: "$796/yr", monthly: "$79.60/mo" },
  },
};

export default function ListYourVenuePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [billing, setBilling] = useState<BillingMode>("yearly");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedTier, setSelectedTier] = useState<TierKey | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
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
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  const chosenTier = useMemo(() => (selectedTier ? tierMeta[selectedTier] : null), [selectedTier]);

  return (
    <div className="min-h-screen bg-[#fdfcf9] text-[#313131]">
      <nav
        className={`fixed left-0 right-0 top-0 z-40 border-b px-6 py-5 transition-all sm:px-10 ${
          scrolled
            ? "border-black/10 bg-[#fdfcf9]/95 shadow-[0_6px_28px_rgba(49,49,49,0.08)]"
            : "border-transparent bg-gradient-to-b from-black/25 to-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-3"
            aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setDrawerOpen((v) => !v)}
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
          <aside className="fixed left-0 top-0 z-50 h-full w-[320px] max-w-[84vw] overflow-y-auto bg-[#f7f5f1] p-6 shadow-2xl">
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
                  <Link href="/web/list-your-venue" onClick={() => setDrawerOpen(false)} className="block font-semibold">
                    List Your Venue
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-black/10 pt-5 text-sm text-black/70">
              Partnership support: <a href="mailto:hello@theglobalsanctum.com">hello@theglobalsanctum.com</a>
            </div>
          </aside>
        </>
      ) : null}

      <main>
        <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden px-6 pt-32 text-center text-white sm:px-10">
          <div className="absolute inset-0 bg-[url('/frozen/web-pages/images/Bali%20Pool%20Nordic%20Filter.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/45" />
          <div className="relative z-10 max-w-4xl">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/75">Partner With Us</p>
            <h1 className="mt-4 text-5xl italic sm:text-7xl">List Your Venue on The Global Sanctum</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 sm:text-xl">
              Join a curated network of exceptional wellness and retreat venues. Reach retreat hosts, wellness guests, and seekers looking for transformational spaces.
            </p>
            <a
              href="#pricing"
              className="mt-8 inline-block bg-white px-8 py-4 text-[11px] uppercase tracking-[0.18em] text-[#313131] transition hover:-translate-y-0.5 hover:bg-[#f7f5f1]"
            >
              View Pricing
            </a>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-black/50">Why List With Us</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">Infrastructure Built For You</h2>
            <p className="mt-6 text-lg leading-8 text-black/70">
              This is not another listing site. We are building venue infrastructure for the wellness sector: detailed profiles, intelligent matching, and operations support that helps your team focus on guest experience.
            </p>
          </div>
        </section>

        <section className="bg-[#f7f5f1] px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.25em] text-black/50">Two Paths, One Platform</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">For Every Type of Wellness Space</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <article className="overflow-hidden bg-white shadow-[0_24px_50px_rgba(49,49,49,0.08)]">
                <div className="h-64 bg-[url('/frozen/web-pages/images/Meditation%20Room%20Nordic%20Filter.png')] bg-cover bg-center" />
                <div className="p-8">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/50">Exclusive-Use Spaces</p>
                  <h3 className="mt-2 text-3xl">Retreat Venues</h3>
                  <p className="mt-3 text-black/70">Purpose-built centers, eco lodges, heritage properties, and private estates for multi-day hosted programs.</p>
                  <ul className="mt-4 space-y-2 text-sm text-black/75">
                    <li>Connect with retreat hosts globally</li>
                    <li>Showcase accommodation and facilities</li>
                    <li>Receive qualified booking enquiries</li>
                    <li>Streamlined group booking coordination</li>
                  </ul>
                </div>
              </article>
              <article className="overflow-hidden bg-white shadow-[0_24px_50px_rgba(49,49,49,0.08)]">
                <div className="h-64 bg-[url('/frozen/web-pages/images/Sauna%20Modern%20Nordic%20Filter.png')] bg-cover bg-center" />
                <div className="p-8">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/50">Day-Use and Multi-Day Venues</p>
                  <h3 className="mt-2 text-3xl">Wellness Venues</h3>
                  <p className="mt-3 text-black/70">Spas, bathhouses, wellness centers, and therapeutic spaces for flexible guest formats.</p>
                  <ul className="mt-4 space-y-2 text-sm text-black/75">
                    <li>Reach wellness guests actively searching</li>
                    <li>Display services and treatment offerings</li>
                    <li>Direct booking integration pathways</li>
                    <li>Visibility in curated collections</li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.25em] text-black/50">What You Gain</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">Built To Serve Your Success</h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                ["Global Visibility", "Reach qualified retreat hosts and wellness guests searching for spaces like yours."],
                ["Comprehensive Profiles", "Present accommodation, facilities, services, and brand story in one high-trust profile."],
                ["Intelligent Matching", "Surface your venue to the right guests using relevant filters and context."],
                ["Transparent Fees", "Clear subscription and commission structure with no hidden costs."],
                ["Curated Community", "Position your venue among quality operators in a focused wellness network."],
                ["Operational Tools", "Concierge support now, with dashboard and automation capabilities expanding next."],
              ].map(([title, text]) => (
                <article key={title} className="border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(49,49,49,0.08)]">
                  <h3 className="text-2xl">{title}</h3>
                  <p className="mt-3 text-black/70">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#313131] px-6 py-20 text-white sm:px-10">
          <div className="mx-auto max-w-[1100px]">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/50">Early Access</p>
              <h2 className="mt-3 text-4xl italic sm:text-5xl">Partner Pricing</h2>
              <p className="mx-auto mt-5 max-w-3xl text-white/80">
                We are inviting a limited set of venues to join at launch. In exchange for early commitment and feedback, we offer permanent partner rates.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <article className="border border-[#c4a265] bg-transparent p-8">
                <p className="inline-block bg-[#c4a265] px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white">Limited Availability</p>
                <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-white/70">Founding Partner</p>
                <p className="mt-1 text-6xl leading-none">60<span className="text-2xl">% off</span></p>
                <p className="mt-2 text-[#c4a265]">Lifetime pricing</p>
                <p className="mt-4 border-b border-white/15 pb-4 text-white/70">Limited to 50 venues worldwide</p>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li>Permanent 60% reduction on subscription tier</li>
                  <li>Priority positioning in search results</li>
                  <li>Dedicated onboarding support</li>
                  <li>Launch communications feature opportunities</li>
                </ul>
                <a href="#pricing" className="mt-7 inline-block w-full bg-white px-5 py-3 text-center text-[10px] uppercase tracking-[0.16em] text-[#313131]">
                  Select Your Plan
                </a>
              </article>
              <article className="border border-white/25 bg-transparent p-8">
                <p className="mt-7 text-[11px] uppercase tracking-[0.18em] text-white/70">Launch Partner</p>
                <p className="mt-1 text-6xl leading-none">40<span className="text-2xl">% off</span></p>
                <p className="mt-2 text-[#c4a265]">Lifetime pricing</p>
                <p className="mt-4 border-b border-white/15 pb-4 text-white/70">Limited to 150 venues after Founding Partners</p>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li>Permanent 40% reduction on subscription tier</li>
                  <li>Enhanced positioning in search results</li>
                  <li>Priority onboarding support</li>
                  <li>Early access to new features</li>
                </ul>
                <span className="mt-7 inline-block w-full border border-white/30 px-5 py-3 text-center text-[10px] uppercase tracking-[0.16em] text-white/65">
                  Available After Founding Partners
                </span>
              </article>
            </div>
          </div>
        </section>

        <section id="pricing" className="px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-[1300px]">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.25em] text-black/50">Founding Partner Pricing</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">Choose Your Plan</h2>
              <p className="mx-auto mt-4 max-w-3xl text-black/70">Simple subscriptions for retreat venues and wellness venues. No hidden fees. Cancel anytime.</p>
            </div>

            <aside className="mx-auto mt-8 max-w-4xl border-l-4 border-[#c4a265] bg-[#f7f5f1] p-6 text-left">
              <p className="text-2xl">You are viewing Founding Partner pricing.</p>
              <p className="mt-2 text-black/70">
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#c4a265]">Lifetime 60% off</span> - limited to 50 venues worldwide.
              </p>
            </aside>

            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="inline-flex items-center gap-4">
                <button
                  type="button"
                  className={`text-sm uppercase tracking-[0.1em] ${billing === "yearly" ? "text-black" : "text-black/45"}`}
                  onClick={() => setBilling("yearly")}
                >
                  Yearly
                </button>
                <button
                  type="button"
                  onClick={() => setBilling((v) => (v === "yearly" ? "monthly" : "yearly"))}
                  className="relative h-7 w-14 rounded-full bg-[#313131]"
                  aria-label="Toggle billing mode"
                >
                  <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${billing === "yearly" ? "left-1" : "left-8"}`} />
                </button>
                <button
                  type="button"
                  className={`text-sm uppercase tracking-[0.1em] ${billing === "monthly" ? "text-black" : "text-black/45"}`}
                  onClick={() => setBilling("monthly")}
                >
                  Monthly
                </button>
              </div>
              <p className="text-sm italic text-black/55">save 17% with annual subscriptions</p>
            </div>

            <div className="mt-8 overflow-x-auto border border-black/10 bg-white">
              <table className="min-w-[980px] w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-black/15">
                    <th className="p-4 text-sm font-medium">Plan</th>
                    {(["essentials", "standard", "featured", "premium"] as TierKey[]).map((key) => {
                      const tier = tierMeta[key];
                      return (
                        <th key={key} className={`p-4 align-top ${key === "featured" ? "bg-[#fbf8f2]" : ""}`}>
                          {key === "featured" ? <span className="mb-2 inline-block rounded bg-[#313131] px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-white">Most Popular</span> : null}
                          <p className="text-2xl">{tier.name}</p>
                          {tier.founding ? <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#c4a265]">Founding Partner - 60% off</p> : null}
                          {tier.retail ? <p className="mt-2 text-sm text-black/45 line-through">{tier.retail[billing]}</p> : null}
                          <p className="mt-1 text-3xl">{tier.price[billing]}</p>
                          <p className="mt-1 text-sm italic text-black/55">{tier.description}</p>
                          <button
                            type="button"
                            className="mt-4 border border-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.14em] hover:bg-black hover:text-white"
                            onClick={() => setSelectedTier(key)}
                          >
                            Get Started
                          </button>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map((row) => (
                    <tr key={row.label} className="border-b border-black/5">
                      <th className="p-4 text-sm font-medium">{row.label}</th>
                      <td className="p-4 text-sm">{row.values.essentials}</td>
                      <td className="p-4 text-sm">{row.values.standard}</td>
                      <td className="bg-[#fbf8f2] p-4 text-sm">{row.values.featured}</td>
                      <td className="p-4 text-sm">{row.values.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 text-sm text-black/60">
              <p>All subscriptions are monthly or annual. No long-term contracts.</p>
              <p>Industry average commission: 15-25%. Our tiers move down to 5% as you scale.</p>
            </div>

            {chosenTier ? (
              <div className="mt-8 border border-[#c4a265] bg-[#fffdf6] p-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#9c7f4f]">Selection Saved</p>
                <h3 className="mt-2 text-3xl">{chosenTier.name} selected</h3>
                <p className="mt-2 text-black/70">Current rate: {chosenTier.price[billing]}. We can wire this to your onboarding flow next.</p>
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-[#f7f5f1] px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-[1000px]">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.25em] text-black/50">Questions</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">Frequently Asked</h2>
            </div>
            <div className="mt-8 space-y-3">
              {faqItems.map((item, idx) => {
                const open = activeFaq === idx;
                return (
                  <article key={item.q} className="border border-black/10 bg-white">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(open ? null : idx)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="text-xl">{item.q}</span>
                      <span className="text-2xl leading-none">{open ? "-" : "+"}</span>
                    </button>
                    {open ? <p className="px-5 pb-5 text-black/70">{item.a}</p> : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 text-center sm:px-10">
          <h2 className="text-4xl sm:text-5xl">Ready to Join?</h2>
          <p className="mx-auto mt-4 max-w-3xl text-black/70">
            List your venue on the platform built to serve you with transparent pricing, qualified leads, and technology that supports growth.
          </p>
          <a href="#pricing" className="mt-7 inline-block bg-[#313131] px-8 py-3 text-[11px] uppercase tracking-[0.14em] text-white">
            Get Started Today
          </a>
          <p className="mt-5 text-black/65">
            Questions? <Link href="/web/contact" className="text-[#7a644f]">Get in touch</Link> with our partnerships team.
          </p>
        </section>
      </main>

      <footer className="bg-[#313131] px-6 py-16 text-[#fdfcf9] sm:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-sm uppercase tracking-[0.32em]">The Global Sanctum</p>
            <p className="mt-4 max-w-xl text-sm text-white/75">
              Curated wellness venues and retreat spaces for retreat hosts, wellness guests, and seekers worldwide.
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
