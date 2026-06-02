# What To Sow — Editorial Redesign + Seasonal Variety Field Guide

**Date:** 2026-06-02
**Status:** Design approved (homepage). Ready to plan implementation.
**Visual source of truth:** `.superpowers/brainstorm/47581-1780354363/content/homepage-v9.html` (desktop + mobile)

---

## 1. Goal

Turn the What To Sow homepage — and then the wider site — into a **premium editorial seasonal field guide**: a place people return to, weekly, to see what they can sow right now where they live, browse every variety worth growing, and (later) keep their own growing collection.

It must feel like a real grower's allotment, not a SaaS app. The editorial trust is what drives the business goal: **affiliate clicks (seeds + kit) toward a real allotment shed.** The shed story is part of the brand.

**References:** Kinfolk (airy whitespace, numbered editorial lists, tiny captions), Observer Feast (asymmetric magazine layout, crafted serif), Mushroom People / Broccoli (earthy moss-greens + golden gleams, wonder/discovery), Natoora (radical seasonality, full-bleed photography, text-list "in season" index, long-form storytelling).

**Banned / rejected (hard constraints):**
- No rounded corners, no drop shadows on cards.
- No "generic AI aesthetic" — no uniform card grids + pill buttons.
- No emoji. No cutesy seedling/sprig icons. No logo sprig (wordmark only).
- No author/personal name anywhere on the site.
- The word **"dex"** is banned (concept stays; word goes). The collection is "the field guide"; the personal collection is "your patch."

---

## 2. Design system

**Palette (Ghibli — already in `globals.css`, used with restraint):** cream `#F5EFE0` (page), earth `#3B2F28` (text), allotment `#2D5F3E` / allotment-dark `#1E4A2D` (header, the one rich dark band, footer), amber `#D4943A` (the single accent — CTAs, rules, gold gleam), tomato `#C9543E` (urgency/closing), leaf/leaf-light (dark-on-light accents). Soft tints (blush/sage/sky/ochre/lavender) used sparingly, **not as large section slabs**. Herbarium paper tone `#ECE5D4`. Principle: *the problem was never the colours, it was soft/inconsistent application — use cream as the spine, dark richly, amber as the one accent.*

**Two type registers (this is the core anti-AI move):**
- **Editorial voice** — Newsreader serif / serif-italic: headlines, standfirsts, section labels, the note, pull-quotes, recommendation links.
- **Functional data** — IBM Plex Mono, ~10–12px: metadata (crop · rarity), dates, status, catalogue numbers. Mostly lowercase; ALL-CAPS only for Natoora-style functional labels (featured this week / dates) — *flagged for Kate's final call.*

**Shared components (new, reusable across pages):**
- `WeatherCommandCenter` — prose forecast line is the hero; soil temp + current temp as big serif numbers; sunset/daylight/moon as quiet mono satellites + a drawn amber moon. Powered by existing Open-Meteo + `astronomy.ts` + `Marquee` message logic.
- `VarietySpecimen` — the in-season card: photo when available, **`HerbariumLabel`** fallback (serif name + Latin name + catalogue No. + washi-tape, slightly rotated) when not. Variety name large; **legendary names larger**; rarity as a quiet `★`.
- `FeaturedVariety` — Natoora-style long-form: photo + dropcap story (from `varieties.ts` `personality`) + editorial affiliate recommendation (serif-italic link + amber rule, not a button).
- `ContentsLine` — catalogue-style filter index (In season · Closing soon · All 182 · By crop · By rarity).
- `NumberedList` — Kinfolk "Thought Starters" pattern (01–04 serif numerals, hairlines, no boxes) — used for guides.
- `EditorialBlogGrid` — asymmetric (one lead + secondary stack).

---

## 3. The data + status engine

**Entry = variety.** `src/data/varieties.ts` already holds **182 varieties** (id, cropSlug, name, rarity common→legendary, personality, recipes, seedSuppliers). All 47 `cropSlug`s map cleanly to `crops.ts` (timing, `harvestWeeks`). **Gap:** no per-variety images — handled by the image fallback ladder (per-variety illustration [future] → crop photo [~11] → crop `unsplashId` → `HerbariumLabel`).

**Status engine** — extend `src/lib/sowable.ts` to:
- be **location-aware** (accept the user's frost date from `location-storage`, not the hardcoded UK average);
- operate at **variety level** (derive from `variety.cropSlug` → crop timing);
- expose states: **Sow now**, **Opens soon**, **Closing soon (N days)**, **Out of season**;
- a **seasonal-scarcity** flag: a variety in its closing window is surfaced as urgent ("last chance").

---

## 4. Surfaces

1. **Homepage** (reshaped, per mockup) — header (wordmark nav + vane + marquee) → illustration hero → **"What to sow this week"** (weather command center + standfirst + contents line + your-patch tally) → **Featured variety** → **In season now** band (mostly herbarium labels + Natoora text index) → **Shed fund** (editorial recommendation) → note from the plot → asymmetric blog → numbered guides → weekly-list email → footer.
2. **Variety pages** — `/crops/[crop]/[variety]`, one per variety (182, indexable — the SEO engine): hero image/label, rarity + lore, live status, "what to do now", recipes, affiliate seed links, "I'm growing this", JSON-LD.
3. **The full field guide** — `/field-guide` (name TBC): the complete browsable 182, filterable by status / crop / rarity, with collection progress.
4. **Your patch** (personal collection + tracking) — "I'm growing this" claims a variety; logs a sow date → expected harvest (`sowDate + harvestWeeks`) → "ready to pick" when due. Collection progress (X/182), rarity breakdown, "complete a crop" badges. Own `localStorage` key — never touches the separate game project.
5. **What's in season to harvest** — `/in-season` (Natoora style): crops/varieties grouped early / peak / late, "featured this week", recipe links, "ready to pull" from sow-tracking.

---

## 5. Affiliate / shed integration

Every variety page and the featured slot carry seed-supplier links (Thompson & Morgan / Sarah Raven / Suttons) + relevant kit. "Closing soon" creates honest urgency to buy now. The **shed-fund** section frames affiliate income as editorial recommendation ("the kit we actually use") with a quiet progress bar toward the Den Sheds Hipex (~£800). 182 variety pages = 182 new affiliate surfaces + SEO.

---

## 6. Phasing (shippable slices — local test between each, one deploy at the end)

- **Phase 1 — Editorial homepage (real data).** Build the v9 homepage in `src/app/page.tsx` with the new shared components; wire the weather command center, the variety status engine (location-aware, variety-level), featured-variety + in-season selection, herbarium fallback, shed section, asymmetric blog, numbered guides. The full field guide / variety pages / tracking are *linked but stubbed* (tally can show a simple count or "explore 182 varieties"). **This is the visible "get it live" win.**
- **Phase 2 — Roll the editorial system to other pages.** Apply the shared type/colour/components to crops index, crop pages, guides, blog, frost-map, allotments. ("Apply to other pages.")
- **Phase 3 — Variety pages + full field guide + your-patch tracking.** The 182 variety pages (SEO), the `/field-guide` page, "grow to claim", collection progress, badges, ready-to-pick.
- **Phase 4 — Harvest "what's in season" page** (`/in-season`).

---

## 7. Non-goals / notes

- **Do not touch** the separate game project (`/lucky-dip`, Phaser, its components). We only *read* `varieties.ts`.
- Rename the internal `.dex` CSS class to `.collection` / `.fieldguide` so the banned word never ships in markup.
- ALL-CAPS mono labels are pending Kate's final call (Natoora-style vs sentence-case).
- The illustration is used in both hero and shed section — Kate to confirm whether to differentiate.
