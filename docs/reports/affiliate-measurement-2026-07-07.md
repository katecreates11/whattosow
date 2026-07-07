# Affiliate measurement report - 7 July 2026

Source: manually extracted Umami data supplied on 7 July 2026.

This is not yet the clean monthly run described in the runbook. The data covers
"this year" in Umami, with visible event examples rather than a complete export
of every row. Treat it as a baseline: useful for direction, not strong enough to
declare winners.

## 1. Traffic summary

| Metric | This year |
|---|---:|
| Visitors | 3.24k |
| Visits | 3.79k |
| Views | 6.40k |
| Bounce rate | 82% |
| Average visit duration | 1m 26s |

Read: the site is still early, but the traffic is real. Search is doing useful
work already, with DuckDuckGo, Google, Bing, Ecosia and Yahoo all appearing in
the top referrers.

Top pages by visitors:

| Page | Visitors |
|---|---:|
| `/guides/companion-planting` | 1.01k |
| `/` | 812 |
| `/frost-map` | 137 |
| `/guides/crop-rotation` | 131 |
| `/allotments` | 123 |
| `/calendar` | 85 |
| `/crops/raspberries/tulameen` | 66 |
| `/crops/peas` | 60 |
| `/crops/tomatoes` | 57 |
| `/still-time` | 57 |

Highest-intent read: companion planting is the traffic engine today. The
homepage is the second-largest surface. Crop and variety pages are present, but
not yet large enough to judge every crop-specific commercial idea.

## 2. Top behaviour events

| Event | Count |
|---|---:|
| `postcode-search` | 610 |
| `crop-scroll-depth` | 335 |
| `email-signup` | 47 |
| `gear-affiliate-click` | 25 |
| `pinterest-save` | 23 |
| `affiliate-click` | 16 |
| `urgency-crop-click` | 14 |
| `lucky-dip-discover` | 14 |
| `print-initiated` | 12 |
| `print-chart` | 10 |
| `crop-kit-click` | 8 |
| `shed-kit-click` | 6 |
| `companion-seed-click` | 5 |
| `sow-seed-click` | 4 |
| `ko-fi-click` | 4 |
| `lucky-dip-affiliate-click` | 3 |
| `shop-season-teaser-click` | 3 |
| `variety-seed-click` | 2 |
| `featured-variety-click` | 2 |

The strongest product signal is not affiliate clicks. It is `postcode-search`.
People are using the site for its core promise first: tell me what makes sense
where I am. That is the trust engine the shed fund depends on.

`crop-scroll-depth` is the second signal worth protecting. People are reading
crop pages deeply enough that in-flow, moment-of-need recommendations can work,
but only if the pages remain useful first and commercial second.

## 3. Commercial event counts

| Event | Count | Read |
|---|---:|---|
| `gear-affiliate-click` | 25 | Old gear event; strongest commercial signal. |
| `affiliate-click` | 16 | Unified event; mixed seed/gear records. |
| `crop-kit-click` | 8 | Crop kit has some signal. |
| `shed-kit-click` | 6 | Shed-fund surface has small signal. |
| `companion-seed-click` | 5 | Old seed event. |
| `sow-seed-click` | 4 | Old seed event; too early to judge after /sow redesign. |
| `lucky-dip-affiliate-click` | 3 | Small legacy game signal. |
| `shop-season-teaser-click` | 3 | Seasonal shop teaser is not yet proven. |
| `variety-seed-click` | 2 | Variety seed signal is tiny so far. |
| **Total commercial-ish events** | **72** | Directional only. |

Gear and kit clicks currently outperform seed clicks. That does not mean seeds
do not work; it means seed data is still too small, fragmented across old event
names, and affected by recent /sow and crop-page changes.

Approximate read by commercial family:

| Family | Events included | Count |
|---|---|---:|
| Gear/kit/shopping | `gear-affiliate-click`, `crop-kit-click`, `shed-kit-click`, `shop-season-teaser-click` | 42 |
| Seed-specific legacy | `companion-seed-click`, `sow-seed-click`, `variety-seed-click` | 11 |
| Unified mixed affiliate | `affiliate-click` | 16 |
| Lucky Dip affiliate | `lucky-dip-affiliate-click` | 3 |

## 4. Merchant/supplier read

Visible `affiliate-click` records show that more than Amazon is getting clicks.

| Merchant/supplier | Visible records | Read |
|---|---:|---|
| Suttons | 8 | Strongest visible supplier in unified examples, heavily helped by `/blight-watch`. |
| Thompson & Morgan | 6 | Present across crop and guide clicks. |
| Amazon | 2 | Appears in unified examples for soaker hose and winter vegetable seeds; stronger in old gear events. |

Visible `affiliate-click` examples:

| Page | Merchant/supplier | Type | Product/read |
|---|---|---|---|
| `/guides/growing-brassicas` | Thompson & Morgan | seed | Brassica seed link. |
| `/crops/cucumbers` | Suttons | seed | Cucumber supplier click. |
| `/blight-watch` | Suttons | seed | Grafted Crimson Crush tomato. |
| `/longest-day` | Amazon | seed | Winter vegetable seeds. |
| `/blight-watch` | Suttons | seed | Crimson Cherry tomato. |
| `/blight-watch` | Suttons | seed | Crimson Cocktail tomato. |
| `/blight-watch` | Suttons | seed | Crimson Crush tomato. |
| `/blight-watch` | Suttons | seed | Cara seed potatoes. |
| `/blight-watch` | Suttons | seed | Sarpo Mira seed potatoes. |
| `/blight-watch` | Amazon | gear | Soaker hose. |
| `/crops/raspberries` | Thompson & Morgan | seed | Raspberry supplier click. |
| `/crops/spring-onions` | Thompson & Morgan | seed | Spring onion supplier click. |
| `/crops/cabbage` | Suttons | seed | Cabbage supplier click. |
| `/crops/cabbage` | Thompson & Morgan | seed | Cabbage supplier click. |
| `/crops/cabbage` | Thompson & Morgan | seed | Cabbage supplier click. |
| `/crops/aubergine` | Thompson & Morgan | seed | Aubergine supplier click. |

Conclusion: do not assume Amazon is the only useful merchant. Amazon may still
win on basket value, but Suttons and Thompson & Morgan are visibly earning clicks
from gardening-specific pages.

## 5. Pages producing commercial clicks

Pages with visible unified `affiliate-click` records:

| Page | Visible click pattern | Read |
|---|---|---|
| `/blight-watch` | Multiple Suttons seed clicks plus Amazon soaker hose | High commercial intent when the page solves a specific problem. Hold the line: no fear-monetising expansion. |
| `/crops/cabbage` | Suttons and Thompson & Morgan seed clicks | Crop pages can produce supplier clicks. |
| `/crops/cucumbers` | Suttons seed click | Crop pages can produce supplier clicks. |
| `/crops/raspberries` | Thompson & Morgan click | Fruit/crop pages can work beyond annual veg. |
| `/crops/spring-onions` | Thompson & Morgan click | Everyday crop pages can work. |
| `/crops/aubergine` | Thompson & Morgan click | Tender crop pages can work. |
| `/guides/growing-brassicas` | Thompson & Morgan seed click | Guides can produce seed clicks. |
| `/longest-day` | Amazon winter seed click | Almanac/seasonal pages can produce curiosity-led seed clicks. |

Gear examples point to buying-guide and problem-guide strength:

| Page/source | Product examples |
|---|---|
| `/blog/best-allotment-tools-...` | Haemmerlin puncture... |
| `/blog/best-water-butts-uk` | Slimline water butt; standard butt + stand; large allotment tank. |
| `/blog/best-raised-beds-uk` | Tall raised planter. |
| `/guides/allotment-essentials` | Growmore/chicken manure; well-rotted manure; horticultural fleece. |
| `/guides/companion-planting` | Seeding Square; Carrots Love Tomatoes. |
| `/guides/watering` | Haws 8.8L long reach... |
| `/guides/seed-starting-kit` | Nutley's 24-cell... |
| `/sow` | Slug and snail pellets. |

The strongest commercial pattern is not "more product boxes". It is specific
need plus relevant product: water storage on a water-butt page, fleece on a
protection page, supports on a tomato page, mesh or protection where pests are
the real problem.

## 6. What we can conclude

- The site has a working behaviour engine: `postcode-search` is much stronger
  than any affiliate event.
- Gear and kit currently produce more clicks than seeds.
- Seed clicks are too small to judge, especially because /sow has just been
  redesigned and needs a fresh 30-day run.
- Suttons and Thompson & Morgan are getting clicks. Amazon is not the only useful
  merchant.
- Crop pages can produce commercial clicks when the link is relevant to the crop.
- Problem-led pages seem commercially promising, but they need the strictest trust
  guardrails.
- Buying guides and kit/problem guides are the safest commercial destinations,
  because the reader arrives with buying intent.
- The current sample is not large enough to justify more affiliate surfaces.

## 7. What we cannot conclude yet

- We cannot declare a merchant winner from this data.
- We cannot say Suttons converts better than Amazon; clicks are not revenue.
- We cannot say SEEDS links work or fail yet.
- We cannot judge the redesigned `/sow` page until it has had 30 days live.
- We cannot judge the redesigned `/crops` page or homepage changes from this
  historical extract.
- We cannot use this data to expand buying-advice blocks to all crops.
- We cannot use this data to move affiliate links into trust anchors.
- We cannot tell whether zero-click links are clutter without page-level sessions
  and a complete affiliate-link inventory for the same period.

## 8. 30-day measurement plan

Run the next report after the /sow, /crops and homepage changes have had 30 days
to settle.

Pull from Umami:

| View | Why |
|---|---|
| `affiliate-click` by merchant | Compare Amazon, Suttons, Thompson & Morgan and other suppliers. |
| `affiliate-click` by product | Find what gardeners actually open. |
| `affiliate-click` by page/path | Identify highest-intent pages. |
| `affiliate-click` by type | Separate seed and gear behaviour. |
| `affiliate-click` by position | Compare rail, inline, sidebar, variety-card and blank/legacy positions. |
| Top 10 affiliate links | Keep the winners visible and editorial. |
| Zero-click links | Find prune candidates. |
| Pages with affiliate links but no clicks | Find clutter and pages where the link does not match intent. |

Also pull:

| View | Why |
|---|---|
| Sessions by page/path | Needed for clicks per 1,000 sessions. |
| Amazon revenue for the same 30 days | Clicks do not prove earnings. |
| Awin/Suttons/Thompson & Morgan revenue for the same 30 days | Merchant comparison needs revenue, not only clicks. |

Minimum decisions for the next report:

1. Keep, prune or rewrite the lowest-performing duplicate seed surfaces.
2. Decide whether `/sow` SEEDS links are earning their place.
3. Decide whether crop-page rail, inline or variety-card positions look stronger.
4. Decide whether seasonal kit belongs on two surfaces or needs pruning to one.
5. Choose one commercial test only if it replaces an existing surface.

## 9. Rule: no new affiliate surfaces until the next 30-day report

No new affiliate surface until the next 30-day report is filled from Umami and
revenue data.

For now:

- Do not add more commercial moments per screenful.
- Do not add affiliate links to trust anchors.
- Do not expand worth-buying/skip blocks to every crop.
- Do not assume Amazon is the only useful merchant.
- Do not keep clutter just because it might earn someday.

The shed-fund rule stands: no new affiliate surface unless it replaces, tests
against, or removes an existing one.
