# Image Slots + Visual Placer Tool — Design

**Date:** 2026-06-08
**Status:** Approved (design), pending spec review
**Author:** Kate + Claude

## Problem

Kate's real plot photos are the website's biggest asset, but getting them onto the
right places is broken:

- **Satellite topic pages have no body image slots** — only a single hero. The 8
  `/guides/companion-planting/<topic>` pages are walls of text. They get Google
  traffic; they should be showing tomatoes-with-marigolds, etc.
- **Photos keep landing sideways** — orientation has been hand-fixed per image
  instead of solved once in the pipeline.
- **Kate can't place photos herself** — she depends on Claude guessing which photo
  goes where, and the guesses miss.

## Goal

1. **Image slots** built into the companion templates so pages can hold many photos.
2. A **visual placer tool** (local, for Kate) to assign the right photo to each slot.
3. A **fix-once image pipeline** so nothing is ever sideways again.

Phase 1 scope: the main companion-planting guide + all 8 satellite topic pages.
Photo source: Kate's **whole raw library** (HEICs in `photos-raw/` + existing webps).
The same system extends to crop pages / guides / blog in later phases.

## Non-goals (YAGNI)

- No login / accounts, no cloud storage, no live-site admin. The placer tool is
  **dev-only**, runs on Kate's Mac via `next dev`, and never ships to production.
- No in-browser crop editor in v1 (center cover-crop + a manual rotate nudge is enough).
- No AI alt-text generation in v1 (sensible default + editable field).

## Architecture — five pieces

### 1. Slot registry (static definition)

`src/data/image-slot-registry.ts` — the canonical list of every slot.

```ts
export type SlotShape = "wide" | "portrait" | "square";
export interface SlotDef {
  id: string;            // "companion-tomatoes-hero"
  group: string;         // "Companion: Tomatoes"  (UI grouping)
  label: string;         // "Hero"
  purpose: string;       // "Top-of-page banner"
  shape: SlotShape;      // controls crop aspect
}
export const imageSlotRegistry: SlotDef[] = [ ... ];
```

Slots are generated for each companion topic from a small template so all 8 stay
consistent. Per satellite (×8):

- `companion-<topic>-hero` — wide
- `companion-<topic>-intro` — portrait (sits after the italic intro)
- `companion-<topic>-companions` — wide ("grow these alongside")
- `companion-<topic>-practice` — portrait ("on our plot", before FAQ)

Main guide (`/guides/companion-planting`): `companion-main-hero`,
`companion-main-pairing-1..4` (the existing tomato/marigold time-lapse, migrated),
`companion-main-polyculture`.

Shapes map to aspects: wide = 16/9, portrait = 3/4, square = 1/1.

### 2. Manifest (assignments)

`src/data/image-slots.json` — written by the tool, committed to git, ships with the site.

```json
{
  "companion-tomatoes-hero": {
    "src": "/photos/slots/companion-tomatoes-hero.webp",
    "alt": "Tomatoes staked in a bed edged with French marigolds",
    "caption": "Marigolds edging the tomato bed — easy to copy"
  }
}
```

Empty/unassigned slots simply have no entry.

### 3. Slot helper + component (the read path)

- `src/lib/image-slots.ts` → `getSlot(id): SlotAssignment | null`. Reads the manifest.
- `src/components/SlotImage.tsx` → reads `getSlot(id)`; **renders `null` if empty**
  (no broken images, no sideways images — an unfilled slot is simply absent).
  When filled, renders `next/image` in a `<figure>` with the caption, using the
  registry shape for the aspect container + `object-cover img-grade`.
  Props: `id`, optional `priority`, optional `className`/aspect override.

This means wiring slots into templates is **visually inert until photos are placed** —
safe to ship at any point.

### 4. Image pipeline (fix-once orientation)

`src/lib/process-photo.ts` (Node-only) → `processPhoto({ srcPath, outPath, shape, rotateExtra })`:

1. Try `sharp(srcPath).rotate()` (no-arg = auto-apply EXIF orientation).
2. If sharp can't read the HEIC ("compression format not built in"), fall back:
   `sips -s format jpeg <src> -> tmp.jpg`, then `sharp(tmp).rotate()`.
3. Apply optional `rotateExtra` (±90) — the manual safety net from the tool.
4. `resize` to the slot shape's aspect with `fit: "cover"` (center).
5. `.webp({ quality: 82 })`, no `.withMetadata()` → **GPS/EXIF stripped**.

Used by the tool's assign endpoint and available as a CLI for batch work.

### 5. Visual placer tool (dev-only)

Three dev-only API routes + one client page. **All return 404 when
`process.env.NODE_ENV === "production"`** so they never exist on the live site.

- `GET /api/admin/slots` → registry + current manifest + library listing
  (filenames from `photos-raw/` and `public/photos/`).
- `GET /api/admin/thumb?file=...` → on-the-fly thumbnail for a library photo
  (sips for HEIC), cached under `.cache/admin-thumbs/`.
- `POST /api/admin/assign` → `{ slotId, sourcePath, alt, caption, rotateExtra }` →
  `processPhoto` → write `public/photos/slots/<slotId>.webp` → update
  `image-slots.json` → return the new assignment.

`/admin/photos` (client page):
- Slots grouped by page, each showing its current thumbnail (or "empty") + shape.
- A library grid (your raw photos + webps), with search/sort by date.
- Flow: select a slot → click a library photo → preview (auto-oriented) →
  optional **rotate-left / rotate-right** nudge → edit alt + caption → **Save**.
- After save, the slot thumbnail updates immediately.

## Data flow

```
Kate picks photo in /admin/photos
  → POST /api/admin/assign
  → process-photo (rotate, crop to shape, webp, strip metadata)
  → writes public/photos/slots/<id>.webp + updates image-slots.json
  → SlotImage reads manifest on next render → photo appears, right-way-up
```

Nothing deploys automatically. When Kate is happy, one batch commit + deploy ships
`image-slots.json` + the `public/photos/slots/*.webp` + the template changes.

## Migration / compatibility

- Existing satellite `heroImage` stays as a **fallback** if its hero slot is empty,
  so no page loses its current hero on day one.
- The hand-built companion time-lapse (4 webps) is migrated into
  `companion-main-pairing-1..4` slots.
- Broadfork / wheelbarrow / dibber work already done is untouched.

## Testing

- `process-photo`: unit-test that a known sideways HEIC comes out portrait (width <
  height) and that output carries no GPS metadata.
- `SlotImage`: renders null for an empty slot; renders figure+caption for a filled one.
- Manual: run `/admin/photos`, assign a photo to `companion-tomatoes-hero`, confirm it
  appears upright on the satellite page and that `/admin/*` 404s under a production build.

## Risks

- **HEIC in sharp** is unreliable on this machine → the sips fallback + manual rotate
  nudge are the mitigations.
- **Dev-only routes leaking to prod** → single `NODE_ENV` guard returning 404, verified
  in the test step.
- **Build size** — this is a real build; it's the focus for a stretch, but it ends the
  bottleneck permanently.
