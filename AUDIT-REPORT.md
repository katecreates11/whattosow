# What To Sow — Security & QA Audit Report

**Date:** 2 March 2026
**Stack:** Next.js 16.1.6, React 19.2.3, Tailwind CSS 4, Netlify
**Files reviewed:** All 13 source files + config

---

## Summary

| Severity | Security | QA | Total |
|----------|----------|-----|-------|
| Critical | 0 | 0 | **0** |
| High | 0 | 3 | **3** |
| Medium | 3 | 10 | **13** |
| Low | 4 | 16 | **20** |
| Info | 5 | 6 | **11** |

No critical vulnerabilities. No show-stopping bugs. The app has a small attack surface (no auth, no server actions, no API keys). Findings are hardening and polish.

---

## High Severity

### H1. CropCard lacks `aria-expanded` attribute
**Type:** Accessibility
**File:** `PlantingTool.tsx` — CropCard button
**Issue:** Screen readers can't tell if crop details are expanded or collapsed.
**Fix:** Add `aria-expanded={expanded}` to the button.

### H2. Form flash on mount before localStorage restore
**Type:** UX / React hydration
**File:** `PlantingTool.tsx` — useEffect on mount
**Issue:** Server renders the form, then client immediately replaces it with results from localStorage. Causes a visible flash.
**Fix:** Add an `initialising` state that renders a neutral placeholder until the localStorage check completes.

### H3. API failure indistinguishable from invalid postcode
**Type:** UX / Error handling
**File:** `frost.ts` — lookupPostcode catch block
**Issue:** Network errors and invalid postcodes both show "Couldn't find that postcode." User keeps re-entering a valid postcode during API outage.
**Fix:** Distinguish network error from 404/invalid postcode response.

---

## Medium Severity

### M1. No security headers configured
**Type:** Security
**Files:** `next.config.ts`, `netlify.toml`
**Issue:** No CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, or Permissions-Policy.
**Fix:** Add `[[headers]]` block to `netlify.toml`.

### M2. localStorage data not runtime-validated
**Type:** Security
**File:** `PlantingTool.tsx` — loadLocation()
**Issue:** `JSON.parse(raw) as LocationData` has no runtime type checking. Corrupted data could produce NaN frost dates.
**Fix:** Add a validation function that checks types of all fields.

### M3. No rate limiting on API calls
**Type:** Security
**File:** `PlantingTool.tsx` — handleSubmit
**Issue:** Rapid form submissions can flood postcodes.io and Open-Meteo.
**Fix:** Add basic debounce — disable button for 2s after submit.

### M4. Error message not announced to screen readers
**Type:** Accessibility
**File:** `PlantingTool.tsx` — error paragraph
**Fix:** Add `role="alert"`.

### M5. "In season" toggle lacks `aria-pressed`
**Type:** Accessibility
**File:** `CropIndex.tsx` — toggle button
**Fix:** Add `aria-pressed={showInSeason}`.

### M6. No `aria-controls` on expand/collapse
**Type:** Accessibility
**File:** `PlantingTool.tsx` — CropCard
**Fix:** Add `id` to detail section, `aria-controls` on button.

### M7. CropIndex "In season" filter uses hardcoded UK-average frost date
**Type:** Functional
**File:** `CropIndex.tsx` — isSowableNow()
**Issue:** Uses April 15 for all UK. Wrong for Scotland (late May) and Cornwall (late March).
**Fix:** Accept note below toggle: "Based on UK average frost date (mid-April). Enter your postcode above for personalised results."

### M8. No custom 404 page
**Type:** UX / Navigation
**Issue:** Invalid URLs show default Next.js 404 — no branding, no way back.
**Fix:** Create `src/app/not-found.tsx` with header, helpful message, and link home.

### M9. `border-l-3` may not produce expected 3px border
**Type:** CSS / Cross-browser
**Files:** PlantingTool.tsx, CropIndex.tsx, crops/[slug]/page.tsx
**Issue:** Tailwind v4 may interpret `border-l-3` as `calc(var(--spacing) * 3)` (12px) not 3px.
**Fix:** Verify output; switch to `border-l-[3px]` if needed.

### M10. Missing OpenGraph image and Twitter card metadata
**Type:** SEO
**File:** `layout.tsx`
**Fix:** Add OG image, Twitter card metadata, and canonical URL.

### M11. "In season" toggle touch target too small
**Type:** Mobile UX
**File:** `CropIndex.tsx`
**Fix:** Increase padding to `px-4 py-2`.

### M12. Frost model doesn't handle year boundary
**Type:** Functional
**File:** `frost.ts`
**Issue:** Visiting in November shows stale "frost season is over" since last frost was April of same year.
**Fix:** When current date is past the autumn frost date, calculate next year's spring frost date.

### M13. Sample preview text is season-dependent
**Type:** Content
**File:** `PlantingTool.tsx`
**Issue:** "sow broad beans, peas, lettuce now" is wrong in August.
**Fix:** Remove the specific crops from the example, keep it generic.

---

## Low Severity (selected key items)

- **L1.** Loading spinner SVG, share icon SVG, section heading SVGs all lack `aria-hidden="true"`
- **L2.** `text-white/60` on `bg-allotment-dark` may fail WCAG AA for small text
- **L3.** Garlic mentioned in FAQ but not in crop database
- **L4.** localStorage data has no expiry or version
- **L5.** Open-Meteo failure silently hides forecast (no "unavailable" note)
- **L6.** No FAQPage structured data for FAQ section
- **L7.** Footer has no navigation links
- **L8.** "All crops" back link goes to homepage top, not crop index section

---

## Info (no action needed)

- JSON-LD dangerouslySetInnerHTML is safe (hardcoded data)
- Postcode properly encoded with `encodeURIComponent`
- npm audit: 0 vulnerabilities
- No secrets or API keys in client bundle
- No open redirect vectors
- No prototype pollution risk
- Static generation reduces attack surface
