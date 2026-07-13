# Revenue batch handoff — 2026-07-13

## Current state

Netlify credits are exhausted, so this branch is intentionally queued rather than deployed.

Branch: `revenue/watering-guide`

Status at handoff: ahead of `origin/main` by 23 local commits.

Do not push until Kate explicitly chooses to spend a deploy.

## What is queued

### Affiliate attribution cleanup

These commits make existing affiliate clicks easier to read in Umami without adding more commercial moments:

- `5c5d4c0` `fix: complete affiliate position tracking`
- `535c766` `fix: improve guide seed click attribution`
- `5fcf5df` `fix: improve featured seed click attribution`
- `d7d8581` `fix: improve sow list seed attribution`
- `bd7518a` `fix: improve companion seed click attribution`
- `f2094a9` `fix: improve seasonal seed click attribution`
- `07a2e5a` `fix: improve remaining guide seed attribution`
- `241a899` `fix: track christmas plate affiliate positions`
- `fce81fe` `fix: track affiliate button positions`
- `ef63c89` `fix: make gear pick attribution specific`
- `3cfa525` `fix: track top pick affiliate positions`
- `7e20bf8` `fix: segment us seed affiliate attribution`
- `b4a7dea` `docs: update affiliate measurement positions`
- `bd1456a` `fix: centralise legacy kit affiliate links`
- `163adb1` `fix: label uk amazon affiliate links`
- `04f8ad1` `fix: remove duplicate affiliate event props`

### Buyer-note sharpening

These commits improve existing commercial moments with clearer buy/skip judgement. They do not add new affiliate blocks:

- `214f287` `fix: sharpen seed starting buyer note`
- `488f0f0` `fix: sharpen holiday watering buyer note`
- `8c9e369` `fix: sharpen companion planting buyer note`
- `9dfa932` `fix: sharpen carrot fly buyer note`
- `ce0dfdf` `fix: sharpen brassica netting buyer note`
- `4cb3329` `fix: sharpen frost protection buyer note`
- `b2628a0` `fix: sharpen tomato feed buyer note`

## What not to touch in this batch

- `src/data/image-slots.json`
- `public/photos/slots/*.webp`
- generated files
- `.next`
- `.netlify`
- admin/photo workflow files
- homepage layout
- `/my-garden`
- major US experience changes
- new affiliate surfaces unless one clearly replaces an existing weak one

## Verification already run

For the buyer-note commits, targeted tests, targeted lint, `npx tsc --noEmit --incremental false`, and `npm run build` were run after each change or small group of changes.

Build passes with the known Turbopack warning:

`./next.config.ts Encountered unexpected file in NFT list`

Import trace points through:

`./src/app/api/admin/_dev.ts -> ./src/app/api/admin/thumb/route.ts`

This warning pre-existed the revenue copy changes and should not block this batch.

## Deployment checklist when credits reset

Before pushing:

1. Run `git status --short --branch`.
2. Confirm no staged files.
3. Confirm the only dirty files, if any, are image-slot/photo files Kate intentionally keeps local.
4. Run `git log --oneline origin/main..HEAD`.
5. Run `npm run build`.
6. Push only when Kate explicitly approves using a deploy.

After deploy:

1. Check Umami `affiliate-click` events still include:
   - `merchant`
   - `product`
   - `type`
   - `position`
   - page/path
2. Spot-check these pages:
   - `/guides/seed-starting-kit`
   - `/guides/watering-while-away`
   - `/guides/companion-planting`
   - `/guides/growing-root-vegetables`
   - `/guides/growing-brassicas`
   - `/guides/protecting-vegetables-from-frost`
   - `/guides/growing-tomatoes-outdoors-vs-greenhouse`
3. Confirm Amazon links use `whattosow21-21` for UK traffic and that OneLink handles US visitors.
4. Watch for click quality, not just click volume.

## Next revenue work

Use the same rule: improve existing intent before adding more links.

Best next candidates:

1. `src/app/guides/growing-veg-in-containers/page.tsx`
   - Clarify compost vs grow bags vs liquid feed.
   - Make each link answer "who should buy this?".
   - Avoid turning it into a product wall.

2. `src/app/guides/growing-squash-pumpkins-courgettes/page.tsx`
   - Clarify feed vs ground cover membrane.
   - Ground cover should be framed as useful for bigger squash/pumpkin beds, not essential for one courgette.

3. `src/app/guides/growing-onions-garlic-leeks/page.tsx`
   - Check whether sets, garlic bulbs, or tools already have affiliate moments.
   - Do not add one unless the page already has a natural buying section.

4. Review click report after 30 days.
   - Prune zero-click duplicate links before adding more.
   - Compare Amazon vs Suttons/Thompson & Morgan by page and position.

## Shed-fund rule

No new affiliate surface unless it replaces, tests against, or removes an existing one.

Trust anchors stay commercial-free.
