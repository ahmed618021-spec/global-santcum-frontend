# React Migration Start Here

This package is ready for migration into a new React/Next.js repository.

## Migration objective
- Single root URL with platform chooser.
- Option 1: Website experience.
- Option 2: Portal experience.

## Source package structure
- index.html (chooser page)
- web-pages/ (10 public web HTML files)
- portal-pages/ (38 portal HTML files, unchanged)
- images/ (shared visual assets)
- ROUTE_MAP_WEB.csv
- ROUTE_MAP_PORTAL.csv
- WEB_MIGRATION_CHECKSUMS.txt
- PORTAL_MIGRATION_CHECKSUMS.txt

## Recommended target in Next.js (App Router)
- app/page.tsx: platform chooser (Website / Portal)
- app/web/page.tsx: website home
- app/portal/page.tsx: portal home
- app/web/[...slug]/page.tsx: mapped web routes
- app/portal/[...slug]/page.tsx: mapped portal routes

## Safe migration approach
1. Keep this package as immutable source of truth.
2. Build React pages route-by-route from ROUTE_MAP_REACT.csv.
3. Validate visual and behavior parity against static source before moving to next route.
4. Keep portal content/function parity unchanged during first pass.

## Verification artifacts
- WEB_MIGRATION_CHECKSUMS.txt verifies web source integrity.
- PORTAL_MIGRATION_CHECKSUMS.txt verifies portal source integrity.

## Notes
- This package intentionally separates Website and Portal payloads.
- The root chooser is already aligned with the unified entry experience.
