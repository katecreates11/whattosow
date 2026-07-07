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
| `merchant` | `data-umami-event-merchant` | Examples: `amazon`, `suttons`, `thompson-morgan`. |
| `product` | `data-umami-event-product` | The crop, variety or kit item named by the link. |
| `type` | `data-umami-event-type` | Usually `seed` or `gear`. |
| `position` | `data-umami-event-position` | Optional. Useful values include placements such as `sidebar`, `inline` or `variety-card`. |
| page/path | Umami page URL/path | Not a custom attribute in `AffiliateLink`; use Umami's page/path dimension when exporting events. |

The source of truth is `src/components/AffiliateLink.tsx`. It adds the affiliate
URL treatment, `rel="sponsored noopener noreferrer"`, and the event attributes
above. Some older hand-placed links also emit `affiliate-click`; include them in
the report if Umami sees them.

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
| Amazon |  |  |  |  |
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
| sidebar |  |  | Crop-page rail. |
| inline |  |  | In-flow seed or kit moments. |
| variety-card |  |  | Variety/card placements. |
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
7. Group by position, if Umami exposes it cleanly.
8. Export or copy the top 10 clicked links.

Then add Amazon/Awin revenue for the same period, if available. Keep clicks and
revenue separate: clicks tell us what gardeners trusted enough to open; revenue
tells us whether the basket had enough value to help the shed.
