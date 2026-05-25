# New Repo Bootstrap (Next.js)

Run these commands in a new folder/repo:

```powershell
npx create-next-app@latest tgs-react-migration --typescript --eslint --app --src-dir false --import-alias "@/*"
cd tgs-react-migration
```

Then copy this package into your new repo under:
- migration-source/

Suggested structure:
- migration-source/index.html
- migration-source/web-pages/
- migration-source/portal-pages/
- migration-source/images/
- migration-source/ROUTE_MAP_REACT.csv

Initial implementation order:
1. app/page.tsx (chooser)
2. app/web/page.tsx
3. app/portal/page.tsx
4. P0 routes from ROUTE_MAP_REACT.csv
5. P1 routes
6. P2 routes
