# what to sow – Project Context

## Purpose

what to sow is building the UK's most useful gardening website.

Our goal is to help gardeners know exactly what they should sow, plant and harvest throughout the year with clear, trustworthy advice.

Every improvement should make the website more useful, faster, easier to use and more trustworthy.

---

## Long-term Goal

Become the UK's most trusted website for seasonal gardening.

Generate £300–£600/month in affiliate income while always putting the gardener first.

---

## Target Audience

- UK gardeners
- Allotment holders
- Beginners
- Experienced growers wanting quick answers
- Mostly mobile users using the website while in the garden

---

## Brand

Tone of voice:
- Calm
- Friendly
- Knowledgeable
- Practical
- Never overwhelming

Use British English.

Always write "courgette", never "zucchini".

---

## Technical Principles

- Keep the site lightweight.
- Keep the site fast.
- Work within the existing stack (Next.js, React, Tailwind).
- Prefer static generation and server components; keep client-side JavaScript minimal.
- Avoid adding new dependencies unless they clearly earn their place.
- Prioritise accessibility.
- Prioritise mobile usability.

---

## UX Principles

Every page should answer:

- What can I do today?
- Why should I do it now?
- What should I do next?

Information should be easy to scan.

Avoid clutter.

---

## SEO Principles

Every page should be the best answer available.

Prioritise:

- Helpful content
- Internal linking
- Clear page structure
- Fast loading
- Structured data where appropriate

Never add content just for search engines.

---

## Affiliate Principles

Affiliate links should help gardeners solve problems.

Trust is more important than short-term revenue.

Recommend products naturally and only where they genuinely add value.

---

## Content Archive (photos)

**Before any image work, check `docs/photo-catalogue.json` first.** It is the index of our entire photo archive — every raw photo described, tagged and quality-rated (1–3, with `hero-worthy` flags and dupe groups). This applies to everyone and everything: Claude, Codex, and the autonomous agents.

- Find photos by grepping tags (`watering-lance`, `harvest`, `hero-worthy`, `cat`, crop names, year tags) — never re-browse the photo pool by eye.
- Raw originals live in `photos-raw/` on Kate's machine only (gitignored). Local sessions may convert and place them (webp, into `public/photos/`); cloud agents use the catalogue descriptions plus any photo already placed in `public/photos/`.
- New photos get catalogued on arrival, same JSON shape. The catalogue is a growing content archive — keep it complete and it stays cheap to use.
- Real photos from the plot always beat stock. Prefer a `q:3`/`hero-worthy` shot; images must carry information, not decoration.

---

## AI Working Rules

Before making changes, ask:

- Does this improve the experience for gardeners?
- Does this make the page more useful?
- Is this simpler?
- Is this faster?
- Is this accessible?
- Does this support the long-term goal of becoming the UK's best gardening website?

If unsure, choose the simplest solution.

Explain major architectural changes before implementing them.

Do not remove existing functionality without approval.

After finishing any task, before calling it done:

1. Review your own work.
2. Look for opportunities to improve UX.
3. Improve SEO where appropriate.
4. Improve accessibility.
5. Improve performance.
6. Remove unnecessary complexity.
7. Refactor code where it genuinely improves maintainability.

Iterate until it is production quality — do not stop at the first working solution. Check mobile first: most readers are in the garden on a phone.
