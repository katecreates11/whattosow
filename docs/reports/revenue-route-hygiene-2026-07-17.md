# Revenue Route Hygiene — 17 July 2026

Purpose: keep revenue work pointed at strong, trusted journeys instead of adding
more affiliate surfaces. This is a working map for the July revenue push.

## Canonical money paths

These are the pages to improve and measure first.

| Route | Role | Commercial posture |
| --- | --- | --- |
| `/guides/companion-planting` | Highest-traffic guide; planning intent | One buyer note only; seeds/plants that help bed planning |
| `/guides/watering` | High problem intent in hot weather | One watering kit note; free fix leads |
| `/guides/growing-tomatoes-outdoors-vs-greenhouse` | High-intent tomato decision page | One decision-led tomato kit moment |
| `/guides/seed-starting-kit` | Direct kit intent | Pruned shortlist, not a catalogue |
| `/guides/allotment-essentials` | Direct beginner kit intent | One choice per job |
| `/sow` | Full weekly listings | One SEEDS column, measured by row position |
| `/crops/[slug]` | Field-guide intent | Crop-specific worth-buying/skip blocks only where useful |
| `/us` | US ZIP beta | Measure ZIP starts/submits and Amazon US clicks before expansion |

## Trust anchors

Do not add affiliate links here. Their job is to make the commercial moments
believable elsewhere.

| Surface | Why protected |
| --- | --- |
| Homepage postcode Answer | Brand promise: "it understood my garden" |
| Tonight's Watering Note | Editorial charm and weekly habit |
| Crop verdict band | Trust-first decision moment |
| Crop problem clinics | Free fix first; product only when the fix genuinely is the product |
| FAQ blocks | Reassurance, not monetisation |
| Email capture | Relationship-building |

## Parked, private, or weak routes

| Route | Current handling | Next decision |
| --- | --- | --- |
| `/my-garden` | Redirected home; now explicitly noindex in metadata | Rebuild as noticeboard before linking again |
| `/my-plot` | Redirected home; noindex | Merge into `/my-garden` only with Kate's approval |
| `/lucky-dip` | Redirected home; now explicitly noindex in metadata | Keep parked until it has a clear role |
| `/kit` | Permanent redirect to `/guides` | Link directly to the relevant guide instead |
| `/products` | Noindex, not in sitemap | Remove or rebuild only when a real product exists |
| `/print` | Noindex utility | Keep as calendar utility; do not promote globally |
| `/still-time` | Still indexed, but no longer promoted in global/footer journeys | Reassess after Search Console data |
| `/sow-in` + city pages | Still indexed, but no longer promoted globally | Hold until Search Console shows whether they index |

## Route hygiene rules

- Global navigation and footers should point to `/sow`, `/crops`, `/calendar`,
  `/guides`, `/`, and the strongest live guide pages.
- Do not send readers through redirected routes for commercial or SEO journeys.
- No parked or private page should be in the sitemap.
- Any page excluded from the sitemap because it is private, parked, or a utility
  should also carry noindex metadata.
- Keep `/sow-in` internal links inside the location feature until Search Console
  proves whether the city pages are useful or clutter.

## Measurement questions

Pull these in the next Umami/Amazon review:

1. Which canonical money paths produce affiliate clicks per 1,000 sessions?
2. Do `/sow` SEEDS clicks convert better than guide buyer-note clicks?
3. Do US ZIP visitors click Amazon US links after ZIP submit?
4. Are guide clicks coming from human sessions or bot-heavy pages?
5. Which parked/legacy pages still receive meaningful organic traffic?

## Shed-fund rule

No new affiliate surface unless it replaces, tests against, or removes an
existing one. A clearer journey beats another link.
