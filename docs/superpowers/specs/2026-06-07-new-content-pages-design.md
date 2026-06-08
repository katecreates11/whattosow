# New content pages — June 2026

**Date:** 2026-06-07
**Branch:** `content-pages-jun7` (isolated git worktree at `../whattosow-content`)
**Why a worktree:** a second Claude is adding photos in the main working tree on `main` (uncommitted edits to `editorial-posts.ts`, `kit.ts`, `GearPick.tsx`, `SeasonalKitEdit.tsx`, `blog/[slug]/page.tsx`, `companion-planting/page.tsx` + new `public/photos/**`). This branch only adds **net-new files** plus additive edits to two shared registration files, so the two streams merge without collision.

## Scope — 9 pages, 3 lanes

### Lane 1 — Companion-planting satellites (4)
Add 4 entries to `src/data/companion-topics.ts` (existing `CompanionTopic` shape). The existing `[topic]` template renders them (Article + FAQPage + BreadcrumbList JSON-LD, sibling links, hub funnel). **No template change.**

- `companion-plants-for-strawberries`
- `companion-plants-for-potatoes`
- `companion-plants-for-onions-garlic`
- `companion-plants-for-cucumbers`

Each: keyword-front-loaded `metaTitle`, `intro`, readable `sections`, `goodCompanions` + `avoid` + `flowers`, 5–7 `faqs`, `seedLinks` via the `tm()` helper (Awin-tracked), `relatedCrops` (only slugs that exist in `crops.ts`).

**heroImage:** must point at an **already-committed** photo (the template renders it via `next/image`; a missing file 404s the hero). Assignments:
- strawberries → `/photos/blog/strawberry-plants-flowering.webp`
- potatoes → `/photos/blog/potato-rows-growing.webp`
- onions-garlic → `/photos/blog/sowing-drills-allotment-spring.webp`
- cucumbers → `/photos/guides/allotment-wide-summer.webp`

### Lane 2 — Seasonal "what to do now" guides (2)
New files, built like `guides/autumn-winter-vegetables/page.tsx` (text header, `GuideVisuals`, `SowItem[]` lists, `tm()`/`az()` links, Article+FAQ+Breadcrumb JSON-LD, cross-links). Photo-free.

- `src/app/guides/what-to-sow-in-summer-uk/page.tsx`
- `src/app/guides/succession-sowing/page.tsx`

### Lane 4 — Winter-crop guides (4, added 2026-06-08)
Written ahead of the autumn/winter search season so they index in time. Same `GuideVisuals` text-header pattern, photo-free, Article+FAQ+Breadcrumb JSON-LD, registered in guides index (cards 22–25) + sitemap. All distinct angles from the existing `autumn-winter-vegetables` (which owns "what to *sow*") and the `/crops` pages.

- `src/app/guides/growing-winter-salad-leaves/page.tsx`
- `src/app/guides/preparing-your-plot-for-winter/page.tsx`
- `src/app/guides/protecting-vegetables-from-frost/page.tsx`
- `src/app/guides/overwintering-broad-beans-and-peas/page.tsx`

### Lane 3 — Crop-family + technique guides (3)
New files, same pattern. Each links **down** to the relevant `/crops/[slug]` field guides (no cannibalisation). Photo-free.

- `src/app/guides/growing-brassicas/page.tsx`
- `src/app/guides/growing-tomatoes-outdoors-vs-greenhouse/page.tsx`
- `src/app/guides/growing-onions-garlic-leeks/page.tsx`

## Shared registration files (additive edits only)
- `src/app/guides/page.tsx` — add 5 guide cards (Seasonal ×2, Growing ×3)
- `src/app/sitemap.ts` — add 5 guide URLs + 4 companion-satellite URLs

## Voice
Locked WTS tone: gentle weather-obsessed friend, Pooh warmth + Nigel Slater rhythm, never snarky/superior. JSX entities escaped (`&apos; &mdash; &rarr;`).

## Done = 
`npm run build` + `tsc` clean in the worktree → Kate browser-tests → merge this branch + the photo-Claude's work in ONE batched deploy.
