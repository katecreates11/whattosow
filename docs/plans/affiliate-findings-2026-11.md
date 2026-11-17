# Affiliate & traffic findings — November 2026

Phase 12 of `docs/NEXT_PHASES.md` ("affiliate revenue measurement"), done on
16 Nov 2026 from Kate's exports: Umami (Mar–Nov), Search Console (12 months),
Amazon Associates and Awin (1 Jan–16 Nov). Figures are as exported; nothing
here is estimated unless it says so.

## The headline

| | Clicks | Sales | You earned | Per click |
|---|---|---|---|---|
| Thompson & Morgan (Awin) | 319 | 2 orders, £132.97 | £10.64 | 3.3p |
| Amazon (site's own tag) | 456 | 6 items, £20.73 | £0.80 | 0.2p |
| Amazon ("Other" tracking) | 11 | 10 items, £105.59 | £3.50 | — |
| Suttons | 125 | 0 | £0 | 0 |
| Dobies | 2 | 0 | £0 | 0 |

About **£15 of affiliate income in 2026**. The shed-fund goal (£300–£600 a
month) is a traffic-and-merchant problem, not a link-placement one.

## What we learned

1. **Real traffic is ~950 UK visits a month**, flat May–September. About 3,000
   further sessions (Singapore, a US spike in July) are bots: desktop Chrome,
   one page each. Read Umami with `country = GB` or the numbers lie.
2. **Google is the third search engine.** UK sessions by source:
   DuckDuckGo 1,509 · Bing 1,074 · Google 1,053 · Ecosia 555 · Yahoo 364.
   Google has led since October.
3. **Search Console's big impression numbers are mostly bots.** "best compost
   bins": 66,487 impressions, 5 clicks, alongside queries like "best compost
   bin for photographers". Ignore impressions on that page family.
4. **Buying guides convert; everything else barely does.** Share of UK visits
   that clicked an affiliate link, since 5 July: buying guides 23.7% (compost
   bins 35%), other guides 5.1%, /sow 6.6%, crop pages 2.0%, homepage 0.7%,
   month pages and /calendar 0% (they had no links until 16 Nov).
5. **In-flow beats the rail**, as the monetisation rulebook predicted: nearly
   every click came from a comparison table or a link inside a sentence.
6. **Postcode users click more** (5.7% vs 3.4%). Half of homepage visitors
   enter a postcode.
7. **Amazon search links don't sell.** The guides send readers to an Amazon
   *search*, where they choose again without us. 15 of 16 Amazon items sold
   were not the thing the reader was sent to.

## What broke, and is now fixed (deployed 16 Nov)

- **Every Thompson & Morgan search link was broken — 511 links on 253 pages.**
  `search.thompson-morgan.com/seeds/<term>` drops the term (empty search);
  `www.thompson-morgan.com/search?q=<term>` becomes `?q=q=<term>` (hundreds of
  unrelated products). The only working shape is
  `/search-results?q=<term>`. `awinLink()` in `src/lib/awin.ts` now repairs
  both shapes centrally, with tests. This may explain 2 sales from 319 clicks.
- **UK visitors were being sent to the US page.** Any browser with `en-US`
  in its language list counted as American; about three in ten UK homepage
  visits were redirected. The timezone now decides (`src/lib/us-visitor.ts`).
- **whattosow.com** served a full duplicate; it now 301s to .co.uk.

## Rules this taught us

- **Never assume a merchant URL pattern works. Open it.** Thompson & Morgan
  blocks this build machine (Cloudflare), so link checks must be done from
  Kate's own computer. Don't disguise a browser to get round the block.
- **Of 7 hand-checked T&M product pages, 2 were dead** ("Product Not Found").
  The site links ~110 T&M product pages; ~92 are still unchecked.
- **Suttons, Sarah Raven and Dobies search links are unchecked too.** Suttons
  has 125 clicks and no sales.

## Decisions waiting on Kate

1. **Check the remaining merchant links from her machine** (prompt below).
2. **Pick one real product for each row of the compost bins guide** (and the
   other buying guides). Prefer Thompson & Morgan where they stock it: 8%
   against Amazon's 3.4%, and a product page instead of a search.
3. **Join a specialist merchant programme** for big-ticket items (polytunnels,
   raised beds, greenhouses). One sale outweighs a year of Amazon.
4. **Decide on email** (`NEXT_PUBLIC_EMAIL_SIGNUPS`): 43 sign-ups so far with
   capture mostly off; the only channel that brings readers back without Google.

### The link-check prompt (paste into a local Claude session)

```
In this repo, find every URL containing thompson-morgan.com/p/, suttons.co.uk,
sarahraven.com or dobies.co.uk. Open each one in a browser. Give me a plain list
of the ones that 404, show "Product Not Found", or (for search links) show
results that don't match the search term, with the file and line each is on.
```

## The monthly pull (30 minutes, first week of each month)

1. **Umami → Events → `affiliate-click`**, last month, filter `country = GB`.
   Break down by `merchant`, then `position`, then page. Note any position
   with zero clicks for three months running: it is a prune candidate.
2. **Awin → Reports → Advertiser**, last month: clicks, sales, commission.
3. **Amazon Associates → Reports → Tracking ID**, last month.
4. **Search Console → Performance**, last 3 months vs previous 3, filter
   country United Kingdom: total clicks, and the top 20 pages by clicks.
5. Write four numbers into this file's log below: UK visits, affiliate
   clicks, earnings, Google clicks. The trend matters more than the month.

| Month | UK visits | Affiliate clicks | Earnings | Google clicks |
|---|---|---|---|---|
| Oct 2026 | 768 | 61 | — | 105 |
