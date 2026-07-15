# Affiliate measurement runbook

This is the monthly shed-fund report pull. Its job is to show what is actually
helping, what is clutter, and what should be pruned before anything new is added.

Do not use this report to justify affiliate creep. The trust anchors stay clean:
the postcode Answer, watering note, crop verdicts, FAQs, problem clinics, charm
moments and email capture are not commercial surfaces.

## What is currently tracked

Affiliate links should roll up under one Umami event:

| Field | Where it comes from | Notes |
|---|---|---|
| `affiliate-click` | `data-umami-event` | The unified event name for outbound affiliate clicks. |
| `merchant` | `data-umami-event-merchant` | Examples: `amazon-uk`, `amazon-us`, `suttons`, `thompson-morgan`. Keep UK and US Amazon separate. |
| `product` | `data-umami-event-product` | The crop, variety or kit item named by the link. |
| `type` | `data-umami-event-type` | Usually `seed` or `gear`. |
| `position` | `data-umami-event-position` | The placement and often the exact crop/item. Use this to decide what to keep, prune or rewrite. |
| page/path | Umami page URL/path | Not a custom attribute in `AffiliateLink`; use Umami's page/path dimension when exporting events. |

The source of truth is `src/components/AffiliateLink.tsx`. It adds the affiliate
URL treatment, `rel="sponsored noopener noreferrer"`, and the event attributes
above. Some older hand-placed links also emit `affiliate-click`; include them in
the report if Umami sees them.

Legacy commercial event names such as `gear-affiliate-click`,
`crop-kit-click`, `variety-seed-click`, `sow-seed-click`,
`companion-seed-click`, `lucky-dip-affiliate-click` and
`card-detail-affiliate-click` may still appear in older Umami ranges. Treat
them as historical commercial-click data only. Current outbound affiliate links
should use `affiliate-click` with `merchant`, `product`, `type` and `position`.

## Monthly export Kate needs

Export the last 30 days from Umami for the event `affiliate-click`.

Use a rolling 30-day window, then save the date range in the report. If Umami has
a CSV export, export the event rows. If it only shows grouped tables, copy the
top rows into the template below.

Pull these views:

1. Affiliate-clicks by merchant.
2. Affiliate-clicks by product.
3. Affiliate-clicks by page/path.
4. Affiliate-clicks by type.
5. Affiliate-clicks by position.
6. Top 10 links by clicks.
7. Zero-click links.
8. Pages with affiliate links but no clicks.

If the date range crosses the tracking cleanup, add a small "legacy commercial
events" note with counts for old event names. Do not compare old event names
against `affiliate-click` as if they were separate current surfaces.

Then split the `position` view into readable groups. Recent tracking uses more
specific position names so the report can tell whether a click came from a crop
page rail, a seed row, a guide kit pick, the US ZIP beta, or a buying note.

Useful position families:

| Position starts with | Read as |
|---|---|
| `crop-kit-` | Crop-page sidebar/kit rail. |
| `crop-buying-advice-` | Trust-led worth-buying block on crop pages. |
| `crop-page-variety-seeds-` | Seed supplier link on a crop page variety list. |
| `variety-page-seeds-` | Seed supplier link on a variety page. |
| `sow-list-seeds-` | `/sow` ruled-list seed link. |
| `sow-card-seeds-` | Homepage/sowing crop card seed link. |
| `featured-variety-seeds-` | Featured variety seed link. |
| `summer-sowing-seeds-`, `succession-sowing-seeds-`, `green-manure-seeds-` | Guide row seed links. |
| `blog-primary-product-`, `blog-product-`, `blog-kit-`, `blog-table-` | Blog commercial links. |
| `watering-buyer-note-`, `seed-starting-kit-`, `allotment-essentials-` | Trust-led buyer notes. |
| `gear-pick-`, `top-picks-grid-` | GearPick defaults and top-picks grids; these should include the item name. |
| `us-zip-seeds-` | US ZIP beta Amazon US seed link. If it includes source and region, read it as `us-zip-seeds-{source}-{region}`. |

For zero-click links, Umami can only show what was clicked. To find the links
that earned nothing, compare the Umami export against the live affiliate-link
inventory: crop pages, /sow, /kit, buying guides, variety pages and guide pages
with `affiliate-click` links.

## First 30-day report template

Date range: `YYYY-MM-DD` to `YYYY-MM-DD`

### Summary

| Metric | Value | Notes |
|---|---:|---|
| Total affiliate clicks |  |  |
| Sessions |  | From Umami, same date range. |
| Affiliate clicks per 1,000 sessions |  | `clicks / sessions * 1000`. |
| Top merchant |  | Do not call this a winner unless the sample is meaningful. |
| Top product |  |  |
| Top page/path |  |  |
| Seed clicks |  | `type = seed`. |
| Gear clicks |  | `type = gear`. |
| Revenue |  | Pull separately from Amazon/Awin if available. |

### Clicks by merchant

| Merchant | Clicks | Share | Revenue if known | Notes |
|---|---:|---:|---:|---|
| Amazon UK |  |  |  | `merchant = amazon-uk`. |
| Amazon US |  |  |  | `merchant = amazon-us`; watch this separately from UK Amazon. |
| Suttons |  |  |  |  |
| Thompson & Morgan |  |  |  |  |
| Other |  |  |  |  |

### Clicks by product/category

| Product/category | Type | Merchant | Clicks | Page/path | Notes |
|---|---|---|---:|---|---|
|  |  |  |  |  |  |

### Clicks by page/path

| Page/path | Clicks | Sessions | Clicks per 1,000 sessions | Main link types | Notes |
|---|---:|---:|---:|---|---|
|  |  |  |  |  |  |

### Clicks by type

| Type | Clicks | Share | Notes |
|---|---:|---:|---|
| seed |  |  | Are SEEDS links earning their place? |
| gear |  |  | Are higher-value kit links earning their place? |

### Clicks by position

| Position | Clicks | Page/path examples | Notes |
|---|---:|---|---|
| `crop-kit-*` |  |  | Crop-page rail. |
| `crop-buying-advice-*` |  |  | Worth-buying block on crop pages. |
| `sow-list-seeds-*` |  |  | `/sow` seed rows. |
| Guide seed rows |  |  | `summer-sowing-seeds-*`, `succession-sowing-seeds-*`, `green-manure-seeds-*`. |
| Guide kit rows |  |  | `watering-buyer-note-*`, `seed-starting-kit-*`, `allotment-essentials-*`. |
| Blog commercial links |  |  | `blog-primary-product-*`, `blog-product-*`, `blog-kit-*`, `blog-table-*`. |
| `us-zip-seeds-*` |  |  | Amazon US seed link after the ZIP beta. |
| unknown/blank |  |  | Older or hand-placed links. |

### Top 10 affiliate links

| Rank | Page/path | Merchant | Product | Type | Position | Clicks | Keep / prune / watch |
|---:|---|---|---|---|---|---:|---|
| 1 |  |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |  |
| 3 |  |  |  |  |  |  |  |
| 4 |  |  |  |  |  |  |  |
| 5 |  |  |  |  |  |  |  |
| 6 |  |  |  |  |  |  |  |
| 7 |  |  |  |  |  |  |  |
| 8 |  |  |  |  |  |  |  |
| 9 |  |  |  |  |  |  |  |
| 10 |  |  |  |  |  |  |  |

### Zero-click links

Only list links that had a fair chance to be clicked: visible page, meaningful
traffic, and at least one full reporting period live.

| Page/path | Merchant | Product | Type | Position | Page sessions | Decision |
|---|---|---|---|---|---:|---|
|  |  |  |  |  |  |  |

### Pages with affiliate links but no clicks

| Page/path | Sessions | Number of affiliate links | Link types | Decision |
|---|---:|---:|---|---|
|  |  |  |  |  |

## Decisions this report can support

- Prune duplicate links that do not earn their place.
- Compare Amazon vs Suttons click behaviour, once there is enough data.
- Identify the highest-intent pages.
- Decide whether SEEDS links work on /sow, crop pages and variety pages.
- Find clutter: pages with many commercial links and few or no clicks.
- Decide whether a link should move lower, be rewritten, or be removed.
- Decide whether a surface needs better editorial context rather than more links.

## Decisions this report cannot support yet

- Adding more commercial moments per screenful.
- Expanding affiliate blocks to all crops.
- Moving links into trust anchors.
- Declaring a merchant winner from tiny data.
- Claiming a product is "the one we use" without Kate confirming it.
- Inventing a new affiliate surface because one existing link clicked once.
- Keeping a zero-click link just because it might pay well someday.

## The shed-fund rule

No new affiliate surface unless it replaces, tests against, or removes an
existing one.

That means a proposed new link must answer one of these:

- What link or block does it replace?
- What existing surface is it testing against?
- What clutter does it help remove?

If the answer is "nothing", do not add it.

## First manual task for Kate

Pull the last 30 days of `affiliate-click` events from Umami and fill the first
report table.

Minimum pull:

1. Event: `affiliate-click`.
2. Date range: last 30 days.
3. Group by merchant.
4. Group by product.
5. Group by page/path.
6. Group by type.
7. Group by position, if Umami exposes it cleanly. Keep the full position value:
   `sow-list-seeds-carrots-thompson-and-morgan` is more useful than collapsing it
   to `sow-list`.
8. Export or copy the top 10 clicked links.

Then add Amazon/Awin revenue for the same period, if available. Keep clicks and
revenue separate: clicks tell us what gardeners trusted enough to open; revenue
tells us whether the basket had enough value to help the shed.

For the US ZIP beta, pull a separate mini-table while the test is running:

1. Events: `us-beta-auto-offered`, `us-beta-auto-redirect`,
   `us-beta-nudge-shown`, `us-beta-nudge-click`, `us-beta-dismissed`.
2. Event: `us-zip-submitted`, grouped by `source`, `region` and `zoneBand`.
3. Event: `affiliate-click`, filtered to `merchant = amazon-us`.
4. Event: `affiliate-click`, filtered to positions starting `us-zip-seeds-`.

This tells us whether US visitors are accepting the ZIP doorway, which region
they are in, and whether that doorway produces Amazon US seed clicks rather than
just curiosity clicks.
