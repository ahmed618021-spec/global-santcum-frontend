# React Migration Freeze Baseline (2026-05-25)

## Scope
This freeze captures the current stable React migration baseline for web + portal parity routing.

## Native Web Routes Completed
- /web
- /web/about
- /web/contact
- /web/how-it-works
- /web/list-your-venue
- /web/venues
- /web/wellness-experiences

## Portal Status
- /portal remains parity-safe via frozen catch-all mapping.

## Validation Snapshot
- lint: PASS
- build: PASS
- smoke routes: PASS
  - /web = 200
  - /web/about = 200
  - /web/contact = 200
  - /web/how-it-works = 200
  - /web/list-your-venue = 200
  - /web/venues = 200
  - /web/wellness-experiences = 200
  - /portal = 200

## Purpose
Use this commit+tag as the rollback-safe baseline before beginning native portal migration.
