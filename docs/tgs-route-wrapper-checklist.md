# TGS Route Wrapper Checklist

## Source Folder

The updated HTML files are currently in `mockupss/`.

For wrapper routing, normalized copies live in `public/frozen/tgs/`.

## Current Wrapper Mapping

| Route | Frozen mockup |
| --- | --- |
| `/global-santcum/web` | `tgs/home.html` |
| `/global-santcum/about` | `tgs/about.html` |
| `/global-santcum/contact` | `tgs/contact.html` |
| `/global-santcum/how-it-works` | `tgs/how-it-works.html` |
| `/global-santcum/legal` | `tgs/legal.html` |
| `/global-santcum/terms-and-conditions` | `tgs/legal.html#terms` |
| `/global-santcum/privacy-policy` | `tgs/legal.html#privacy` |
| `/global-santcum/cookies-policy` | `tgs/legal.html#cookies` |
| `/global-santcum/list-your-venue` | `tgs/list-your-venue.html` |
| `/global-santcum/book` | `tgs/venues.html` |
| `/global-santcum/venues` | `tgs/venues.html` |
| `/global-santcum/retreat-venues` | `tgs/venues.html?type=retreat` |
| `/global-santcum/wellness-venues` | `tgs/venues.html?type=wellness` |
| `/global-santcum/retreat-venues/[slug]` | `tgs/retreat-venue-detail.html` |
| `/global-santcum/wellness-venues/[slug]` | `tgs/wellness-venue-detail.html` |
| `/global-santcum/wellness-experiences` | `tgs/wellness-experiences.html` |
| `/global-santcum/the-wellness-edit` | `tgs/wellness-edit.html` |
| `/global-santcum/host-a-retreat` | `tgs/how-it-works.html#retreat-hosts` |
| `/global-santcum/our-story` | `tgs/about.html` |
| `/global-santcum/sanctum-journal` | `tgs/wellness-edit.html` |
| `/global-santcum/sanctum-journal/signup` | `tgs/sanctum-journal-modal.html` |
| `/global-santcum/sanctum-journal/thank-you` | `tgs/sanctum-journal-thank-you-modal.html` |
| `/global-santcum/contact/thank-you` | `tgs/contact-thank-you-modal.html` |
| `/global-santcum/list-your-venue/signup` | `tgs/venue-signup-modal.html` |
| `/global-santcum/retreat-venues/[slug]/enquiry` | `tgs/retreat-enquiry-modal.html` |
| `/global-santcum/retreat-venues/[slug]/enquiry/thank-you` | `tgs/retreat-enquiry-thank-you-modal.html` |
| `/global-santcum/wellness-venues/[slug]/enquiry` | `tgs/wellness-enquiry-modal.html` |
| `/global-santcum/wellness-venues/[slug]/enquiry/thank-you` | `tgs/wellness-enquiry-thank-you-modal.html` |
| app 404 / not found | `tgs/404.html` |

## Phase 1 Status

- Existing routes now render updated HTML mockups via `FrozenPageFrame`.
- Footer/legal links have dedicated routes so Privacy, Terms, and Cookies can open the legal mockup with the matching tab hash.
- Retreat and wellness detail wrappers exist for slug routes.
- Menu order is controlled by the updated mockup HTML: Retreat Venues, Wellness Venues, Wellness Experiences.
- Modal wrapper routes are connected from the relevant parent flows:
  contact form, journal signup forms, list-your-venue plan CTAs, retreat venue enquiry CTAs, and wellness venue booking CTAs.

## Notes For Phase 2 React Conversion

- `tgs_venues_v3.html` should be converted before detail pages because it is the listing hub.
- `tgs_wellness_experiences_v6.html` already contains the plus/expand behavior in HTML; preserve that behavior when converting.
- `tgs_list_your_venue_v4.html` already includes the yearly/monthly toggle and disabled Launch Partner CTA in the wrapper.
- The HTML mockups contain standalone modal files that still need integration during React conversion.

## Phase 2 Status — React Migration COMPLETE

Every route now renders a real React component instead of a `FrozenPageFrame` iframe. No route in `src/app` imports `FrozenPageFrame` anymore. UI was preserved 1:1: each mockup's CSS is embedded verbatim as a `styles` string injected via `<style dangerouslySetInnerHTML>`, the HTML body was converted to JSX, and inline-script behavior was reproduced with React state/effects.

| New React component | Routes served |
| --- | --- |
| `TgsHomePage` | `/web` |
| `TgsAboutPage` | `/about`, `/our-story` |
| `TgsContactPage` | `/contact` (submit -> `/contact/thank-you`) |
| `TgsHowItWorksPage` | `/how-it-works`, `/host-a-retreat` (`#retreat-hosts`) |
| `TgsLegalPage` | `/legal`, `/terms-and-conditions`, `/privacy-policy`, `/cookies-policy` (hash-driven tabs) |
| `TgsListYourVenuePage` | `/list-your-venue` (CTAs -> `/list-your-venue/signup`) |
| `TgsVenuesPage` | `/venues`, `/book`, `/retreat-venues`, `/wellness-venues` (type filter via `initialType` prop / `?type=`; wrapped in `<Suspense>`) |
| `TgsRetreatVenueDetail` | `/retreat-venues/[slug]` (enquiry CTAs -> `/retreat-venues/[slug]/enquiry`) |
| `TgsWellnessVenueDetail` | `/wellness-venues/[slug]` (book CTAs -> `/wellness-venues/[slug]/enquiry`) |
| `TgsWellnessExperiencesPage` | `/wellness-experiences` (+ expand panels) |
| `TgsWellnessEditPage` | `/the-wellness-edit`, `/sanctum-journal` (subscribe -> `/sanctum-journal/signup`) |
| `TgsRetreatEnquiryModal` | `/retreat-venues/[slug]/enquiry` (submit -> `.../enquiry/thank-you`) |
| `TgsWellnessEnquiryModal` | `/wellness-venues/[slug]/enquiry` (submit -> `.../enquiry/thank-you`) |

Previously migrated (earlier phase): `not-found`, `contact/thank-you`, `sanctum-journal/signup`, `sanctum-journal/thank-you`, retreat/wellness `enquiry/thank-you`, `list-your-venue/signup`.

Verified: `npm run build` passes (all 30 routes), `npm run lint` passes with only pre-existing `<img>` LCP warnings (0 errors), and a dev-server smoke test returned `200` + React markup (no iframe) for all 22 newly migrated routes with no runtime errors.

The frozen HTML files under `public/frozen/tgs/` are now unused by the app and can be removed in a later cleanup pass if desired.
