# Revenue deploy checklist — July 2026

Use this when Netlify credits reset and Kate decides the queued revenue batch should go live.

## Before pushing

1. Confirm the branch is the revenue branch:

   `git status --short --branch`

2. Confirm the only commits ahead of `origin/main` are the queued revenue/affiliate commits:

   `git log --oneline origin/main..HEAD`

3. Confirm nothing is staged:

   `git diff --cached --name-only`

4. Confirm no local image/photo/generated files are part of the push:

   `git diff --name-only origin/main..HEAD`

   Do not push:

   - `src/data/image-slots.json`
   - `public/photos/slots/*.webp`
   - generated files
   - `.next`
   - `.netlify`
   - admin/photo workflow files

5. Run the production build:

   `npm run build`

   Known warning that can be accepted for this batch:

   `./next.config.ts Encountered unexpected file in NFT list`

   It points through the admin thumbnail route and pre-dates the affiliate cleanup.

## Pages to spot-check after deploy

Check these in a browser, ideally mobile first:

- `/guides/seed-starting-kit`
- `/guides/watering-while-away`
- `/guides/companion-planting`
- `/guides/growing-root-vegetables`
- `/guides/growing-brassicas`
- `/guides/protecting-vegetables-from-frost`
- `/guides/growing-tomatoes-outdoors-vs-greenhouse`
- `/guides/growing-veg-in-containers`
- `/sow`
- `/crops/tomatoes`
- `/crops/carrots`
- `/us`

## What to check on each commercial page

- Advice still comes before product.
- There is no product wall.
- Buyer notes use clear buy/skip judgement.
- Affiliate links still open in a new tab.
- Links include `rel="sponsored noopener noreferrer"`.
- Umami event attributes are present:
  - `data-umami-event="affiliate-click"`
  - `data-umami-event-merchant`
  - `data-umami-event-product`
  - `data-umami-event-type`
  - `data-umami-event-position`

## Umami checks after deploy

Within the first day, click one test affiliate link from a few representative surfaces and confirm events appear with useful positions:

- `seed-starting-kit-module-trays`
- `watering-while-away-bottle-spikes`
- `companion-buyer-note`
- `root-vegetables-carrot-fly-mesh`
- `brassica-protection-inline`
- `frost-protection-fleece`
- `tomatoes-feed`
- `containers-compost`

If positions appear blank, duplicated or generic, stop adding commercial work and fix measurement first.

## Amazon and US checks

- UK Amazon links should use `whattosow21-21`.
- US-specific Amazon attribution should use the configured US tracking setup where the code supports it.
- OneLink should handle eligible US visitors at Amazon after click-through.
- Do not assume OneLink success from clicks alone; wait for Amazon reporting.

## Rollback triggers

Rollback or hotfix quickly if:

- Affiliate links stop opening.
- Affiliate links lose sponsored/noopener/noreferrer attributes.
- Umami affiliate-click events disappear.
- A guide renders with duplicate buyer notes.
- A guide feels like a product page rather than advice.
- The homepage or `/sow` loses core sowing functionality.
- Build/runtime errors appear on core pages.

## What to measure after 30 days

Use `docs/reports/affiliate-measurement-runbook.md`.

Minimum report:

- clicks by merchant
- clicks by product
- clicks by page/path
- clicks by type
- clicks by position
- top 10 clicked links
- zero-click commercial links
- pages with affiliate links but no clicks

Decision rule:

Prune or rewrite weak links before adding new affiliate surfaces.
