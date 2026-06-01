# What To Sow — Site Redesign Design Spec
**Date:** 2026-06-01

## Brief

Transform What To Sow from a functional tool into a premium editorial destination. The site has 1,680 organic visitors in 90 days with no promotion. The design needs to match the quality of the content and photography.

**Design references:** Kinfolk magazine · Nigel Slater's Kitchen Diaries · Liberty London · Natoora · Magma bookshop · Studio Ghibli

**Mood:** Quiet, considered, personal. A real person's allotment, not a gardening app. Premium but warm, never cold. The Ghibli palette — Paper White, Heritage Green, mossy sages, warm creams — is intentional and stays. The issue is not the colours, it's using them with more intention.

**Business goal:** Generate income through affiliate links (seed suppliers, tools, kit) to fund Kate's allotment shed. Design must build trust first — editorial voice and genuine recommendations over ad-like placements. The shed story is part of the brand.

---

## 1. Navigation

### Current (8 items, cluttered)
Crops / Calendar / Harvest planner / Frost map / Guides / By location / My Garden / Blog

### New (5 items, data-led)
**Crops / Frost Map / Guides / Allotments / Blog**

- **Removed:** Harvest Planner (7 entry visitors, 3 events total), My Garden (4 visitors), By location (minimal direct nav traffic — postcode tool is accessed via homepage)
- **Added:** Allotments (92 entry visitors, not currently in nav)
- **Kept:** "Still time to sow" CTA button — 6-minute average session time earns its place
- Mobile menu: same 5 items, full-width stacked

### Nav design direction (Kinfolk full-screen overlay)
The horizontal nav is replaced entirely with a full-screen menu overlay.

**Header (always visible):**
- Logo (left)
- `MENU` text or hamburger icon (right) — IBM Plex Mono, small caps

**Overlay (full-screen, Paper White background):**
- X close (top right)
- **Right column — large display type:** Crops / Guides / Blog / Allotments
- **Left column — small type:** Frost Map / Still time to sow / Calendar / About / Dot
- **Bottom:** Postcode input or email signup CTA
- Triggered by clicking MENU on any screen size (desktop and mobile)

This replaces both the desktop horizontal nav and the mobile hamburger menu.

---

## 2. Photography Treatment

### Colour grade (CSS filter, applied globally)
All images on the site get a consistent film-like grade:

```css
filter: contrast(1.06) saturate(0.82) sepia(0.06) brightness(1.01);
```

Effect: warm highlights, lifted shadows (nothing crushes to pure black), gentle desaturation so greens feel botanical not garish, slight warm cast. Makes varied photos shot in different conditions feel like they came from the same place.

Applied via a shared CSS class `img-grade` on all `<img>` and `<Image>` elements across the site. Exception: UI icons and logos are excluded.

### Blog post images
- **Remove forced `aspect-[3/2]`** — images use natural aspect ratio. Portrait shots stay tall, landscape wide.
- **True full-bleed** — images extend to viewport edges (`-mx-[calc(50vw-50%)]` or equivalent), not just outside the text column
- **Spacing** — `my-12 sm:my-16` above and below images (up from `my-8 sm:my-10`)
- **Captions** — remove italic serif styling. New: `text-[11px] uppercase tracking-[0.08em] text-earth-light/70` — small, precise, magazine-style

### Hero images (blog posts)
- Remove fixed height (`h-64 sm:h-80 md:h-[28rem]`)
- New: `aspect-[16/9] sm:aspect-[21/9]` — wider, more cinematic
- Keep gradient overlay but make it more subtle

---

## 3. Crop Icons → Photography

Replace AI-illustrated crop icons (`/public/images/crops/*.png`) with real photography where available from `/public/photos/crops/`.

Existing photo coverage: tomatoes, peas, carrots, lettuce, courgette, strawberries, sweetcorn, pumpkin, borage, sunflower, peppers.

Where no photo exists: use a simple text-based card (crop name, season badge) — no illustration fallback.

---

## 4. Editor's Note Component

A new `EditorNote` component — Kate's personal voice on the site.

### Design (Liberty London-inspired)
- Distinct visual treatment: slightly warmer background (`bg-[#f5f0e8]` or similar), left border accent in Heritage Green
- Eyebrow label: `EDITOR'S NOTE` — small, tracked, monospace (IBM Plex Mono per brand guidelines)
- Body text: Kate's note in first person, 2–4 sentences, present tense, specific and personal
- Signature: `— K` in italics, right-aligned or inline
- No avatar, no photo of Kate — the words are enough

### Placement
1. **Homepage** — after the hero, before the postcode tool. Sets the tone for the visit.
2. **Guide pages** — optional inline aside, styled distinctly from body text
3. **Blog post pages** — optional intro note before the article begins

### Data
Content stored in `/src/data/editor-note.ts` — a single exported object Kate can update:

```ts
export const editorNote = {
  text: "June has been all about the marigolds. After losing the first batch to an April heatwave, the second planting is finally holding. I've also got potatoes coming up that I cannot stop checking on. July cannot come soon enough.",
  date: "June 2026",
}
```

Updating the note = editing one file, rebuilding.

---

## 5. Homepage Redesign

### Current
Search box first, then crops grid. Functional, not editorial.

### New structure
1. **Full-bleed hero** — one of Kate's allotment photos (rotated seasonally), with a single line of type overlaid: *"What to grow. When to grow it. Where you are."* No buttons in the hero.
2. **Editor's Note** — Kate's current note (see above)
3. **Postcode tool** — the core product, now clearly positioned after the editorial arrival
4. **Crops** — photography-led grid, no illustrated icons
5. **Latest from the blog** — 2–3 recent editorial posts, shown as editorial cards with full-bleed crop images

---

## 6. Typography

### Changes
- **Headings** — increase scale. `text-4xl sm:text-5xl` for H1 on blog posts (up from `text-3xl sm:text-4xl`)
- **Line height** — `leading-[1.1]` on large headings (tighter, more confident)
- **Tracking** — `-0.02em` on headings (Kinfolk tightness)
- **Body text** — `text-base` (16px) minimum, `leading-relaxed` for article text
- **IBM Plex Mono** — used for editor's note eyebrow, section labels, CTA buttons (already in brand guidelines — enforce consistently)

---

## 7. Colour and Feel

### Direction
The Studio Ghibli palette is correct and intentional — keep all hex values from CLAUDE.md. The problem is inconsistent application, not the colours themselves.

- **Paper White (`#f2f2eb`)** — the page background. Warm, never stark white.
- **Heritage Green (`#003b44`)** — the dark. Used for header, hero overlays, dark section backgrounds. Rich and deep, not flat grey.
- **Sage Green (`#a3bfb5`)** — used for quiet accents, borders, the Editor's Note background. The mossy, Ghibli-forest tone.
- **Bright Green (`#00d975`)** — one intentional accent per page. CTAs, affiliate link highlights only.
- **Tints** — use the defined tints from CLAUDE.md consistently rather than arbitrary opacity values like `bg-sage/40`.
- **No rounded cards** — `rounded-xl` and `rounded-lg` on content cards removed. Sharp edges, magazine feel.
- **No drop shadows** — remove `shadow-sm`, `shadow-md` from content cards.

---

## 8. Affiliate Trust Architecture

The current site has 4 affiliate click events in 90 days. The redesign needs to surface recommendations in a way that feels like editorial curation, not advertising.

### Principles
- **Every affiliate link is a recommendation, not an ad** — framed as "what I use / what I'd buy" not "sponsored"
- **The shed story** — a persistent, light-touch narrative: Kate is saving up for an allotment shed. Affiliate income goes toward it. This is honest, charming, and gives visitors a reason to click.
- **Context over clutter** — affiliate links appear where they're relevant (on crop pages, in guides, in kit recommendations) not scattered everywhere

### Implementations
1. **"From the plot" product cards** — editorial-style product recommendations on crop pages. Small card: product name, one line of Kate's recommendation, affiliate link. Styled like a Liberty buyer's note — personal, specific, not salesy.
2. **Kit/gear page** — already exists at `/kit`. Needs redesign to feel editorial rather than a product grid. Becomes the affiliate hub.
3. **Shed fund indicator** — optional light-touch element, possibly in the footer or about page: "Helping Kate build her allotment shed. [x]% of the way there." Honest and human.
4. **Affiliate links in blog posts** — woven into editorial content naturally, e.g. in the potato post: "I used a bulb planter — [this one](affiliate link) — and it changed the whole job."

---

## 9. Marquee Banner (Conran Shop-inspired)

A scrolling ticker that sits directly below the nav on every page. Heritage Green background, cream monospace text, continuous loop. Content rotates through seasonal messages, sowing prompts, and light affiliate nudges.

**Initial messages:**
- `Now sowing — runner beans, French beans, outdoor tomatoes`
- `Enter your postcode for personalised planting dates`
- `Free UK allotment tool — no account needed`
- `18 gardeners signed up for monthly reminders`
- `Companion planting guide — the most-read page on the site`

Updated seasonally in `/src/data/marquee.ts`.

---

## 10. Map Design

Both maps get a visual overhaul. The tile style is a URL swap — we build both options and Kate chooses.

### Allotments finder map
**Option A: Stadia Watercolor** — painterly, illustrated, looks like a Ghibli map. Completely unique. Free at current traffic (needs free Stadia account + API key).
**Option B: Custom Mapbox style** — built in Mapbox Studio using the brand palette exactly. Heritage Green for water, Paper White for land, Sage Green for parks. Kate has a Mapbox account. Free tier covers ~50,000 loads/month (current usage ~200/month).

Both options also get:
- Custom markers in Heritage Green (replacing default Leaflet blue pins)
- Restyled popups matching the brand (Heritage Green header, cream body, sharp corners — no Leaflet defaults)

### Frost zone map
- Switch from `carto light_all` to `carto light_nolabels` — removes all road/place text so the frost zone colours become the entire focus
- Or: Mapbox style with no labels — same effect, brand palette base
- Result: looks like editorial infographic design, not a road map

### CSP update required
Both Stadia and Mapbox tile domains need adding to `netlify.toml` Content-Security-Policy `img-src`.

### Keys needed
- `NEXT_PUBLIC_MAPBOX_TOKEN` — Mapbox public token (Kate has account)
- `NEXT_PUBLIC_STADIA_API_KEY` — Stadia free tier key (needs account if not yet created)

---

## 10. Dot the Allotment Cat

Dot (also called Baby) is a white and black cat who visits Kate's allotment plot. She is the site mascot.

### About page (`/dot`)
A short, warm page introducing Dot. Her name, her habits (arrives when watering starts, sits in seedlings), her photos. Written in Kate's voice. Not precious — funny and honest. She doesn't behave.

We already have excellent photos:
- `dot-planter-purple-flowers-allotment.webp` — hero image (Dot on the Tumbling Ted planter, full allotment behind)
- `dot-allotment-cat-closeup.webp` — looking up through the climbing frame
- `dot-allotment-cat-seedlings.webp` — flopped in the lettuce
- `dot-deck-allotment.webp` — treating the whole site as hers

### Mascot presence across the site
- **Footer** — small Dot photo and a line: "Dot approves of this website."
- **404 page** — Dot looking unimpressed. "She's not helping either."
- **Homepage** — optional small cameo, e.g. a photo in the editor's note area or as a footer feature
- **Nav** — no icon, but her name in the footer links to `/dot`

### Why this works
Dot turns the site from a tool into a place. She's evidence of a real allotment, a real person, real visits. Visitors who encounter Dot remember the site. It's the kind of detail that gets shared.

---

## 11. What Is Not Changing

- Core postcode/frost tool functionality
- Blog post data structure
- URL structure (no redirects needed)
- Allotments map functionality
- Email capture (confirmed working, 18 subscribers)
- Mobile hamburger menu pattern

---

## Scope Notes

- **Phase 1 (this plan):** Nav, colour grade, blog image treatment, Editor's Note component, crop icon replacement, homepage restructure, typography, colour consistency
- **Phase 2 (later):** Natoora-style dropdown nav, My Garden redesign if usage grows, Harvest Planner redesign if usage grows
- **Out of scope:** Lucky Dip game redesign, new content pages, SEO changes

---

## Success Criteria

- Nav reduced to 5 items with Allotments added
- Every photo has the CSS grade applied
- No AI-illustrated crop icons visible on the site
- Editor's Note visible on homepage
- Blog post images are full-bleed with natural aspect ratios
- Affiliate product cards on at least 3 crop pages
- Dot has her own page at `/dot` and appears in the footer
- Site feels like it belongs next to Kinfolk on a shelf
- Someone who visits for the first time can tell immediately that a real person made this
