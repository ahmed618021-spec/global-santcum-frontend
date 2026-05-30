# TGS Latest Mockup Audit

Source folder: `mockupss/`

Important note: the latest mockups are not tracked in git, and all files in `mockupss/` currently have the same update date in this workspace. Because of that, there is no reliable old-vs-new filesystem diff. This audit classifies the latest files against the current React app instead.

## Full Page Mockups

These are not small patches. Most of these should be treated as page-level design migrations because the latest HTML includes navigation, drawer/search behavior, footer links, forms, and section structures that differ from the current React pages.

| Mockup | Existing React target | Accurate migration read |
| --- | --- | --- |
| `tgs_home_v7.html` | `src/app/global-santcum/web/page.tsx` | Same route exists, but latest mockup has a richer hero search with suggestion panels, setting/location links, premium collection, destination cards, featured venues, and a different lower CTA: `Wellness Should Feel Inevitable, Not Effortful`. Current React is close in broad sections but not exact. |
| `tgs_about_v4.html` | `src/app/global-santcum/about/page.tsx` | Same page and content family. Needs design/content alignment, especially footer/nav links, newsletter form metadata, and `Join The Community - It's Free`. Not a brand-new page. |
| `tgs_contact_v4.html` | `src/app/global-santcum/contact/page.tsx` | Same page, but the form is more specific in the mockup: hidden submission ID, honeypot, enquiry type, required fields, FAQ accordion behavior, and a separate thank-you modal file. |
| `tgs_how_it_works_v4 (2).html` | `src/app/global-santcum/how-it-works/page.tsx` | Existing page is simplified. Latest mockup is three distinct journey sections: `Find Your Sanctuary`, `Host Your Transformation`, `Showcase Your Space`, each with CTAs. This needs a section-level rebuild. |
| `tgs_legal_v5.html` | `src/app/global-santcum/legal/page.tsx` | Current legal page is a placeholder compared to the mockup. Latest mockup has 8 tabbed policies and much deeper content. This is a full rebuild. |
| `tgs_list_your_venue_v4.html` | `src/app/global-santcum/list-your-venue/page.tsx` | Same route and mostly same content structure. Needs latest pricing/design/FAQ/footer alignment and should later open the venue signup modal instead of only linking contact/pricing anchors. |
| `tgs_venues_v3.html` | `src/app/global-santcum/venues/VenuesClient.tsx` plus retreat/wellness aliases | Existing page is materially different. Latest mockup has tiered listings: Premium Sanctuaries, Featured Venues, Standard Listings, Essentials Listings, progressive search, chooser modal, and separate advanced-search modal flows for retreat vs wellness venues. This is a full page redesign. |
| `tgs_wellness_experiences_v6.html` | `src/app/global-santcum/wellness-experiences/page.tsx` | Existing page is much simpler. Latest mockup has 14 expandable modality categories and many sub-tag buttons that reveal venue results. This is a full page redesign. |
| `tgs_wellness_edit_v2 (1).html` | `src/app/global-santcum/the-wellness-edit/page.tsx` | Existing page is a compact article grid. Latest mockup has featured editorial article, newsletter signup at top, keyword/category/author/date/sort search, many category tabs, load-more behavior, and richer article cards. Full redesign. |

## New Full Pages Missing From React

| Mockup | Purpose | Where it fits |
| --- | --- | --- |
| `tgs_404_page (1).html` | Custom 404 page | Next app-level `not-found.tsx`, styled to match TGS and link back into the public flow. |
| `tgs_retreat_venue_detail_v2_sample_venue.html` | Retreat venue detail page | Should be a dynamic venue detail route for retreat venues. It connects from venue cards and opens retreat enquiry flow. |
| `tgs_wellness_venue_detail_v2 (4).html` | Wellness venue detail page | Should be a dynamic venue detail route for wellness venues. It connects from venue cards and opens wellness booking/enquiry flow. |

## Standalone Components And Modals

These should not be migrated as normal pages. They are supporting pieces that plug into the page flow.

| Mockup | Type | Where it fits |
| --- | --- | --- |
| `TGS_Empty_State_Venues.html` | Empty-state component | Use inside venues/search/category results when no matching venues exist. Includes notify form and bespoke-search form. |
| `tgs_cookie_banner_v2 (1).html` | Global cookie banner | App-level component, but must match the mockup behavior and legal link strategy first. |
| `tgs_contact_thank_you_modal_v1 (1).html` | Contact success modal | Opens after successful contact form submission. |
| `tgs_retreat_enquiry_modal_v1 (1).html` | Retreat enquiry modal | Opens from retreat venue detail/enquiry CTA. Includes retreat-specific fields. |
| `tgs_retreat_enquiry_thank_you_modal_v1.html` | Retreat enquiry success modal | Follows successful retreat enquiry submission. |
| `tgs_wellness_enquiry_modal_v1 (2).html` | Wellness enquiry modal | Opens from wellness venue detail service/package CTAs. Includes wellness-specific fields. |
| `tgs_wellness_enquiry_thank_you_modal_v1 (1).html` | Wellness enquiry success modal | Follows successful wellness enquiry submission. |
| `tgs_sanctum_journal_modal.html` | Journal signup modal | Opens from newsletter/journal CTAs. |
| `tgs_sanctum_journal_thank_you_modal_v2 (2).html` | Journal signup success modal | Follows journal signup. |
| `tgs_venue_signup_modal_v2 (2).html` | Venue signup/subscription modal | Opens from List Your Venue pricing/plan CTAs. Contains plan selection, yearly/monthly toggle, venue details, and legal consent. |
| `tgs_logo_single_state.html` | Shared logo asset/component | Should replace/standardize current remote logo usage if the SVG/CSS is the intended latest logo. |
| `tgs_social_icons.html` | Shared social icon component | Should replace text-only social links in footers. |

## Latest Flow From Mockups

Primary visitor flow:

`Home` -> `Retreat Venues` / `Wellness Venues` / `Wellness Experiences` -> `Venue Detail` -> `Retreat or Wellness Enquiry Modal` -> `Thank You Modal`

Venue owner flow:

`List Your Venue` -> pricing/plan CTA -> `Venue Signup Modal` -> legal consent -> confirmation/submission

Content/community flow:

`The Wellness Edit` -> article/category/search browsing -> `Sanctum Journal Modal` -> journal thank-you modal

Fallback/support flow:

No results in venues/search/category -> `Empty State` -> notify form or bespoke search enquiry

Legal flow:

Footer/legal links should either route to the rebuilt `Legal & Policies` tabs or to stable anchors that open the correct tab.

## Design Change Severity

Full rebuild priority:

- `tgs_venues_v3.html`
- `tgs_wellness_experiences_v6.html`
- `tgs_legal_v5.html`
- `tgs_wellness_edit_v2 (1).html`
- `tgs_retreat_venue_detail_v2_sample_venue.html`
- `tgs_wellness_venue_detail_v2 (4).html`

Moderate alignment:

- `tgs_home_v7.html`
- `tgs_how_it_works_v4 (2).html`
- `tgs_contact_v4.html`

Mostly existing content with design/form/footer cleanup:

- `tgs_about_v4.html`
- `tgs_list_your_venue_v4.html`

## Suggested Migration Order

1. Freeze the shared shell from the latest mockups: nav drawer, footer links, logo/social icons, legal route strategy.
2. Rebuild venues listing from `tgs_venues_v3.html`, because it is the hub for retreat/wellness flows.
3. Add retreat and wellness detail page templates.
4. Add retreat/wellness enquiry modals and thank-you modals.
5. Rebuild wellness experiences because it links directly into filtered venue results.
6. Rebuild legal tabs before wiring final footer/legal links.
7. Align home, contact, how-it-works, about, list-your-venue, and wellness edit.
