"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

const faqs = [
  {
    q: "How does The Global Sanctum work?",
    a: "The Global Sanctum is a curated marketplace connecting wellness guests and retreat hosts with exceptional venues worldwide. Browse our collection, compare facilities and pricing, and book seamlessly.",
  },
  {
    q: "What types of venues are listed?",
    a: "We feature retreat venues for multi-day hosted programs and wellness venues spanning day-use facilities and multi-day wellness stays.",
  },
  {
    q: "How do I list my venue?",
    a: "Visit our List Your Venue page to start onboarding. Our team guides you from listing setup through first guest and host enquiries.",
  },
  {
    q: "Can I contact a venue directly?",
    a: "The platform provides end-to-end concierge support. Direct communication can be arranged when needed, while bookings are handled through the platform.",
  },
];

export default function ContactPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [sent, setSent] = useState(false);

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
    setSent(true);
    window.setTimeout(() => setSent(false), 3000);
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <div className="bg-[#fdfcf9] text-[#313131]">
      <nav
        className={`fixed left-0 right-0 top-0 z-40 border-b border-black/10 px-6 py-5 transition-all sm:px-10 ${
          scrolled ? "bg-[#fdfcf9] shadow-[0_2px_20px_rgba(49,49,49,0.06)]" : "bg-[#fdfcf9]"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
          <button
            type="button"
            aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setDrawerOpen((v) => !v)}
            className="flex items-center gap-3"
          >
            <span className="flex flex-col gap-1.5">
              <span className="h-px w-6 bg-[#313131]" />
              <span className="h-px w-4 bg-[#313131]" />
              <span className="h-px w-6 bg-[#313131]" />
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
          <aside className="fixed left-0 top-0 z-50 h-full w-[320px] bg-[#f7f5f1] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.2em]">Navigation</span>
              <button type="button" onClick={() => setDrawerOpen(false)} className="text-2xl leading-none">
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
                  <Link href="/web/contact" onClick={() => setDrawerOpen(false)} className="block font-semibold">
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
        <section className="px-6 pb-16 pt-40 text-center sm:px-10">
          <p className="text-[11px] uppercase tracking-[0.24em] text-black/55">Get In Touch</p>
          <h1 className="mt-3 text-5xl sm:text-7xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-black/65">
            Whether you are a wellness guest, retreat host, or venue owner, we are here to support your next step.
          </p>
        </section>

        <section className="mx-auto grid max-w-[1200px] gap-10 px-6 pb-20 sm:grid-cols-2 sm:px-10">
          <div className="space-y-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-black/55">General Enquiries</p>
              <h2 className="mt-2 text-4xl">Start a Conversation</h2>
              <p className="mt-3 text-black/70">
                For questions about bookings, venues, or platform support, contact us at{" "}
                <a href="mailto:hello@theglobalsanctum.com" className="text-[#7a644f]">
                  hello@theglobalsanctum.com
                </a>
                .
              </p>
            </div>
            <div className="h-px bg-black/10" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-black/55">For Venue Owners</p>
              <h2 className="mt-2 text-4xl">List Your Venue</h2>
              <p className="mt-3 text-black/70">
                Want to join our curated collection? Visit our listing page or send us a direct enquiry.
              </p>
            </div>
            <div className="h-px bg-black/10" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-black/55">Press & Media</p>
              <h2 className="mt-2 text-4xl">Media Enquiries</h2>
              <p className="mt-3 text-black/70">
                For interviews or collaboration enquiries, email{" "}
                <a href="mailto:press@theglobalsanctum.com" className="text-[#7a644f]">
                  press@theglobalsanctum.com
                </a>
                .
              </p>
            </div>
          </div>

          <div className="border border-black/10 bg-white p-6">
            <h3 className="text-3xl">Send Message</h3>
            <form className="mt-5 space-y-4" onSubmit={onSubmit}>
              <input className="w-full border border-black/20 px-4 py-3" placeholder="Full Name" required />
              <input className="w-full border border-black/20 px-4 py-3" type="email" placeholder="Email" required />
              <input className="w-full border border-black/20 px-4 py-3" placeholder="Company / Venue (Optional)" />
              <select className="w-full border border-black/20 px-4 py-3" defaultValue="">
                <option value="" disabled>
                  Enquiry Type
                </option>
                <option>General Enquiry</option>
                <option>Booking Enquiry</option>
                <option>Partnership Opportunity</option>
                <option>Press & Media</option>
                <option>Technical Support</option>
              </select>
              <textarea className="min-h-36 w-full border border-black/20 px-4 py-3" placeholder="Tell us how we can help..." required />
              <button type="submit" className="w-full bg-[#313131] px-6 py-3 text-[11px] uppercase tracking-[0.14em] text-white">
                {sent ? "Message Sent" : "Send Message"}
              </button>
            </form>
          </div>
        </section>

        <section className="bg-[#f7f5f1] px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.24em] text-black/55">How Can We Help</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">Choose Your Path</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="border border-black/10 bg-white p-6">
                <h3 className="text-2xl">Wellness Guests</h3>
                <p className="mt-3 text-black/65">Seeking a retreat or wellness experience? Let us help you find the right sanctuary.</p>
                <a href="#" className="mt-5 inline-block text-sm uppercase tracking-[0.14em] text-[#7a644f]">
                  Get in Touch {"->"}
                </a>
              </article>
              <article className="border border-black/10 bg-white p-6">
                <h3 className="text-2xl">Retreat Hosts</h3>
                <p className="mt-3 text-black/65">Looking for the ideal venue for your next hosted program? We can help you curate the shortlist.</p>
                <a href="#" className="mt-5 inline-block text-sm uppercase tracking-[0.14em] text-[#7a644f]">
                  Find Your Venue {"->"}
                </a>
              </article>
              <article className="border border-black/10 bg-white p-6">
                <h3 className="text-2xl">Venue Owners</h3>
                <p className="mt-3 text-black/65">Ready to list your property for a global wellness audience? Start onboarding with us.</p>
                <Link href="/web/list-your-venue" className="mt-5 inline-block text-sm uppercase tracking-[0.14em] text-[#7a644f]">
                  List Your Venue {"->"}
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1000px] px-6 py-16 sm:px-10">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.24em] text-black/55">Common Questions</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">Frequently Asked</h2>
          </div>
          <div className="mt-8 space-y-3">
            {faqs.map((item, idx) => {
              const open = activeFaq === idx;
              return (
                <article key={item.q} className="border border-black/10 bg-white">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(open ? null : idx)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-xl">{item.q}</span>
                    <span className="text-2xl leading-none">{open ? "−" : "+"}</span>
                  </button>
                  {open ? <p className="px-5 pb-5 text-black/70">{item.a}</p> : null}
                </article>
              );
            })}
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
              <Link href="/web/venues" className="block">
                Retreat Venues
              </Link>
              <Link href="/web/wellness-experiences" className="block">
                Wellness Experiences
              </Link>
              <Link href="/web/how-it-works" className="block">
                How It Works
              </Link>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Legal</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link href="/web/legal" className="block">
                Terms & Conditions
              </Link>
              <Link href="/web/legal" className="block">
                Privacy Policy
              </Link>
              <Link href="/web/legal" className="block">
                Cookies Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
