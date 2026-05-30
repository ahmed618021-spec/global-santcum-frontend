"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Shared site navigation drawer (the slide-in "hamburger" menu panel).
 *
 * This is the single source of truth for the opened menu across every TGS page,
 * so the menu looks and behaves identically no matter which page it opens on.
 * The panel is fully self-contained (its own namespaced `tgsdrawer-*` styles with
 * hard-coded brand values) so it renders the same regardless of the host page's
 * own CSS or nav-bar theme. The page keeps its own nav bar + hamburger button and
 * just drives this with `open` / `onClose`.
 */

const styles = `
.tgsdrawer-overlay {
  position: fixed; inset: 0; z-index: 1998;
  background: rgba(49,49,49,0.45);
  backdrop-filter: blur(2px);
  opacity: 0; visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;
}
.tgsdrawer-overlay.active { opacity: 1; visibility: visible; }

.tgsdrawer {
  position: fixed; top: 0; left: 0;
  width: 440px; max-width: 90vw; height: 100vh;
  background: #FDFCF9; z-index: 1999;
  transform: translateX(-100%);
  transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  display: flex; flex-direction: column; overflow: hidden;
  color: #313131;
  font-family: 'Cormorant Garamond', Georgia, serif;
}
.tgsdrawer.active { transform: translateX(0); }
.tgsdrawer *, .tgsdrawer *::before, .tgsdrawer *::after { box-sizing: border-box; }
.tgsdrawer a { color: inherit; text-decoration: none; }

.tgsdrawer-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 36px;
  border-bottom: 1px solid rgba(49,49,49,0.08);
  flex-shrink: 0;
}
.tgsdrawer-header-left { display: flex; align-items: center; gap: 12px; }
.tgsdrawer-logo {
  width: 32px; height: 32px;
  border: 1px solid #C4A265;
  transform: rotate(45deg); position: relative;
}
.tgsdrawer-logo::after {
  content: ""; position: absolute; inset: 3px;
  border: 1px solid #C4A265;
}
.tgsdrawer-label {
  font-family: 'Montserrat', sans-serif; font-size: 10px;
  font-weight: 500; letter-spacing: 0.2em;
  text-transform: uppercase; color: rgba(49,49,49,0.5);
}
.tgsdrawer-close {
  width: 36px; height: 36px; border-radius: 50%;
  border: 1px solid rgba(49,49,49,0.08); background: #F7F5F1;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  font-size: 18px; color: rgba(49,49,49,0.5);
  transition: all 0.25s;
}
.tgsdrawer-close:hover { border-color: rgba(49,49,49,0.3); color: #313131; }

.tgsdrawer-search {
  padding: 20px 36px;
  border-bottom: 1px solid rgba(49,49,49,0.08);
  flex-shrink: 0;
}
.tgsdrawer-search-bar {
  display: flex; align-items: center; gap: 10px;
  background: #F7F5F1; border: 1px solid rgba(49,49,49,0.08);
  border-radius: 50px; padding: 10px 18px;
  transition: border-color 0.2s;
}
.tgsdrawer-search-bar:focus-within { border-color: rgba(49,49,49,0.3); }
.tgsdrawer-search-bar svg { width: 16px; height: 16px; color: rgba(49,49,49,0.3); flex-shrink: 0; }
.tgsdrawer-search-bar input {
  flex: 1; border: none; outline: none; background: transparent;
  font-family: 'Montserrat', sans-serif; font-size: 13px; color: #313131;
}
.tgsdrawer-search-bar input::placeholder { color: rgba(49,49,49,0.3); }

.tgsdrawer-body { flex: 1; overflow-y: auto; padding: 28px 36px; }
.tgsdrawer-group { margin-bottom: 32px; }
.tgsdrawer-group:last-child { margin-bottom: 0; }
.tgsdrawer-group-label {
  font-family: 'Montserrat', sans-serif; font-size: 9px;
  font-weight: 600; letter-spacing: 0.25em;
  text-transform: uppercase; color: #313131;
  margin-bottom: 12px; padding-left: 2px;
}
.tgsdrawer-link {
  display: flex; align-items: center; justify-content: space-between;
  font-family: 'Cormorant Garamond', Georgia, serif; font-size: 26px; font-weight: 300;
  color: #313131; padding: 12px 0;
  border-bottom: 1px solid rgba(49,49,49,0.05);
  transition: color 0.3s, padding-left 0.3s;
}
.tgsdrawer-link:last-child { border-bottom: none; }
.tgsdrawer-link:hover { color: rgba(49,49,49,0.7); padding-left: 6px; }
.tgsdrawer-link-arrow { font-size: 18px; color: rgba(49,49,49,0.15); transition: color 0.3s, transform 0.3s; }
.tgsdrawer-link:hover .tgsdrawer-link-arrow { color: rgba(49,49,49,0.5); transform: translateX(4px); }
.tgsdrawer-secondary-link {
  display: flex; align-items: center; gap: 10px;
  font-family: 'Cormorant Garamond', Georgia, serif; font-size: 26px; font-weight: 300;
  color: #313131; padding: 10px 0;
  transition: color 0.3s, padding-left 0.3s;
}
.tgsdrawer-secondary-link:hover { color: rgba(49,49,49,0.7); padding-left: 6px; }
.tgsdrawer-secondary-link svg { display: none; }
.tgsdrawer-cta {
  display: block; width: 100%; text-align: center;
  background: #313131; color: #FFFFFF;
  font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 500;
  letter-spacing: 0.2em; text-transform: uppercase;
  padding: 16px 24px; transition: background 0.3s; margin-top: 8px;
}
.tgsdrawer-cta:hover { background: #3A3A3A; }
.tgsdrawer-footer {
  padding: 24px 36px;
  border-top: 1px solid rgba(49,49,49,0.08);
  background: #F7F5F1; flex-shrink: 0;
}
.tgsdrawer-footer-contact {
  display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;
}
.tgsdrawer-footer-item {
  display: flex; align-items: center; gap: 10px;
  font-family: 'Montserrat', sans-serif; font-size: 12px;
  color: rgba(49,49,49,0.5); transition: color 0.2s;
}
.tgsdrawer-footer-item:hover { color: #313131; }
.tgsdrawer-footer-item svg { width: 14px; height: 14px; flex-shrink: 0; }
.tgsdrawer-social { display: flex; gap: 10px; }
.tgsdrawer-social a {
  width: 36px; height: 36px; border-radius: 50%;
  border: 1px solid rgba(49,49,49,0.08);
  display: flex; align-items: center; justify-content: center;
  color: rgba(49,49,49,0.5); font-family: 'Montserrat', sans-serif;
  font-size: 11px; font-weight: 500; transition: all 0.2s;
}
.tgsdrawer-social a:hover { border-color: #313131; color: #313131; }
`;

export type TgsNavDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function TgsNavDrawer({ open, onClose }: TgsNavDrawerProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div
        className={`tgsdrawer-overlay${open ? " active" : ""}`}
        onClick={onClose}
        aria-hidden={open ? "false" : "true"}
      />
      <div
        className={`tgsdrawer${open ? " active" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={open ? "false" : "true"}
      >
        <div className="tgsdrawer-header">
          <div className="tgsdrawer-header-left">
            <span className="tgsdrawer-logo" />
            <span className="tgsdrawer-label">Navigation</span>
          </div>
          <button className="tgsdrawer-close" onClick={onClose} aria-label="Close menu" type="button">
            &times;
          </button>
        </div>
        <div className="tgsdrawer-search">
          <div className="tgsdrawer-search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input type="text" placeholder="Search venues, experiences, locations..." />
          </div>
        </div>
        <div className="tgsdrawer-body">
          <div className="tgsdrawer-group">
            <div className="tgsdrawer-group-label">Discover</div>
            <Link href="/global-santcum/retreat-venues" className="tgsdrawer-link" onClick={onClose}>
              Retreat Venues<span className="tgsdrawer-link-arrow">→</span>
            </Link>
            <Link href="/global-santcum/wellness-venues" className="tgsdrawer-link" onClick={onClose}>
              Wellness Venues<span className="tgsdrawer-link-arrow">→</span>
            </Link>
            <Link href="/global-santcum/wellness-experiences" className="tgsdrawer-link" onClick={onClose}>
              Wellness Experiences<span className="tgsdrawer-link-arrow">→</span>
            </Link>
          </div>
          <div className="tgsdrawer-group">
            <div className="tgsdrawer-group-label">Learn</div>
            <Link href="/global-santcum/about" className="tgsdrawer-secondary-link" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
              About Us
            </Link>
            <Link href="/global-santcum/how-it-works" className="tgsdrawer-secondary-link" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              How It Works
            </Link>
            <Link href="/global-santcum/the-wellness-edit" className="tgsdrawer-secondary-link" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
              The Wellness Edit
            </Link>
          </div>
          <div className="tgsdrawer-group">
            <div className="tgsdrawer-group-label">Connect</div>
            <Link href="/global-santcum/contact" className="tgsdrawer-secondary-link" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              Contact Us
            </Link>
            <Link href="/global-santcum/list-your-venue" className="tgsdrawer-secondary-link" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              List Your Venue
            </Link>
          </div>
          <div className="tgsdrawer-group">
            <Link href="/global-santcum/list-your-venue" className="tgsdrawer-cta" onClick={onClose}>
              List Your Venue
            </Link>
          </div>
        </div>
        <div className="tgsdrawer-footer">
          <div className="tgsdrawer-footer-contact">
            <a href="mailto:hello@theglobalsanctum.com" className="tgsdrawer-footer-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              hello@theglobalsanctum.com
            </a>
          </div>
          <div className="tgsdrawer-social">
            <a href="#" aria-label="Facebook">Fb</a>
            <a href="#" aria-label="Instagram">Ig</a>
            <a href="#" aria-label="LinkedIn">Li</a>
          </div>
        </div>
      </div>
    </>
  );
}
