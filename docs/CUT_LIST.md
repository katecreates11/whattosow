# What To Sow — The Cut List

A ruthless editor's pass. The rule for every item: **what to sow is a weekly
gardening periodical, personally addressed. If it would not earn its place in
that periodical, cut it, move it, or shrink it.** No new features appear in this
document. Removal notes reference the law docs; anything marked ⛔ is gated on
Kate's explicit approval (see NEXT_PHASES §5).

---

## 1. Remove, demote or move

- **/products** — a "coming soon" shop page that has said coming soon since
  March. An empty shop on a trust-first site is worse than no shop. Remove the
  page and its nav/footer links until a product exists. ⛔ (functionality removal)
- **The personal-garden triplication** — /my-plot (tracking), /my-garden (the
  game), /lucky-dip (also the game). Three doors to one idea. One page
  (/my-garden as the noticeboard, per spec) with the game inside it. ⛔ merge
- **Auto-generated monthly blog posts** (24 pre-written, time-gated to 2027) —
  see §4. Out of /blog.
- **/still-time** — its whole job (closing windows) is now done better by the
  /sow list's amber tags and the crop verdicts. Demote to a redirect into
  /sow once the listings redesign ships. ⛔ removal
- **Two printables** — /print ("premium printable chart") and
  /guides/companion-planting-chart. One printable story, told twice. Keep the
  chart (it has the funnel and the pins); fold /print's value into it or retire it. ⛔
- **Bed planner** — noindex and unfinished since June. Decide: schedule the
  finish, or park it formally and stop carrying it as silent WIP. ⛔
- **Duplicate inline seed links on desktop crop pages** — the rail already
  carries them; `lg:hidden` the inline block (keep for mobile, where it earns
  its place).
- **Homepage below-the-fold grids** — utility cards, four sage guide tiles,
  three community photo cards. All go; links fold into footer doors and the
  week's list. (NEXT_PHASES Phase 4.)
- **InSeasonBand** — unimported since the jobs-layout redesign, still in the
  tree. Verify with grep, then delete. ⛔ deletion

## 2. Dashboard residue

- The **WeatherCommandCenter metric strip** and **SkyTonight** on the homepage —
  the last instrument panels on the front page. (Phases 5–6.)
- The **sow/plant/harvest date cards** and the **permanently-open SowPlanner
  form** on crop pages — utility furniture where one calm dates block belongs.
  (Phase 7.)
- The **"In season now" button** on the crops index — a control styled as a
  control. Becomes a quiet text toggle. (Phase 3.)
- The data strip cell reading **"Type: Tender — No Frost Tolerance"** — a
  database enum in a serif font. Say "Tender" and let the crop page say why.

## 3. AI design

- The **six-box seasonal grid** on /sow. (Phase 1 kills it.)
- The **forty-box crops page**. (Phase 3 kills it.)
- Chip clouds, left colour-bar cards, grey **VIEW ON AMAZON** pills, and any
  symmetric card row where every child is equal. All named in ANTI_PATTERNS;
  all still partially live.
- **Heading stutter** ("Browse the crops"/"Explore crops"; "What to sow
  now"/"What can I sow now?") — two headings per idea is a template talking to
  itself.

## 4. SEO content vs editorial value

- **The 24 auto-generated monthly blog posts** (Jan 2026–Dec 2027, templated
  from crop data, publishing themselves on the 1st). They were scaffolding
  before real writing existed. Now Kate's actual diary posts share the same
  /blog index, and the difference is visible at a glance — which teaches
  readers that this blog is partly machine-written. That price is no longer
  worth the long-tail. Move their useful content into /sow/[month] (which owns
  those queries anyway), stop future auto-publishes, and let /blog be the
  diary. ⛔ (big removal — needs Kate)
- **The 51 /sow-in city pages** — templated thin-ish pages likely clogging the
  "Discovered – not indexed" bucket. Hold until the Search Console export says
  whether Google indexes them; if it doesn't after the autumn, prune to the ~10
  biggest cities and redirect the rest. ⛔
- **`keywords` meta arrays** everywhere — Google has ignored the keywords tag
  since 2009. Harmless, but cargo-cult; stop adding them to new pages.
- **181 variety pages** — stay (unique voice copy + buy-intent), but they are
  on watch: if the indexing data says Google won't touch them, thin the tail. ⛔

## 5. Trust risks

- **"Photos from Unsplash" in the footer of a site whose premise is "from our
  plot."** Correct today (some crops still wear stock heroes) — which is the
  problem. Keep the honest credit while it's true; retire Unsplash photo by
  photo as Kate's replace them, and treat every remaining stock hero as debt.
- **Unverified Suttons URLs** (Cara the shakiest) — live commercial links nobody
  has click-tested. Broken = £0 forever; wrong = worse. Kate's click-test is
  still owed.
- **The seed-vs-plug "too late" contradiction** — the site currently disagrees
  with its own author in public. (Phase 2.)
- **Auto-posts presenting as written** — see §4; same trust wound.
- **Any "the one we use" claim not literally true** — audit against kit Kate
  owns; downgrade the rest to "what to look for" framing.

## 6. Affiliate creep

- **Count the buy-points on a playbook crop page**: rail seeds + rail kit +
  buying-advice block + in-flow step links + variety seed links + inline seeds
  (mobile) + kit teaser. That is seven systems. Each is individually justified;
  together they are drifting toward a shop with a diary attached. **Cap: on any
  screenful, one commercial moment.** If a new one arrives, an old one leaves.
- **"GET THE SEEDS →" eleven times** down the /sow photo wall — one blindness,
  bought eleven times. (Phase 1 replaces with the single SEEDS column.)
- **Blight Watch's defence kit** — currently inside the rulebook (the fix
  genuinely is fleece), but it is the edge of "monetising fear." Hold the line:
  no expansion, and the free advice always leads.
- **The seasonal kit edit appearing on homepage AND /sow AND crop rails** — the
  same products three ways. The rotation makes it feel edited; keep it to two
  surfaces maximum.

## 7. Wrong voice

- **"Support this tool →"** and **"Free UK planting calendar by postcode"** —
  the site calling itself a tool in its own footer. It's "Towards the shed →"
  and a sentence about frost dates. (COPY_REWRITES §8.)
- **Marquee marketing lines** — "Free UK planting tool — personalised to your
  frost date" and "What to grow. When to grow it. Where you are." are ad slogans
  scrolling across a periodical. The ticker earns its place only with weather
  and season lines; cut the self-promotion messages from `marquee.ts`.
- **"Get your exact dates"** and other imperative-tool labels — tool grammar.
- **Frost-relative arithmetic in public** ("Direct sow 8w before frost") —
  engine-speak. Months, not maths. (Phase 3.)
- **Un-audited older copy**: variety *recipes* and crop *tips* never had the
  voice pass the personalities got. Audit when touched; don't trust them.

## 8. Things Codex will keep rebuilding unless explicitly banned

It has already built each of these once, unprompted. Ban by name:

1. A "crawlable answers" box grid for any page that lacks one.
2. Info-bars explaining what a tool is about to do.
3. Stat/metric strips in any personal or weather feature.
4. Grey marketplace buttons for any product link.
5. "Related articles" card grids at the bottoms of pages.
6. A new homepage band for every new feature (the page count is the law).
7. Re-adding the marquee marketing slogans "for SEO".
8. Restoring copy Kate deleted from data files (a deletion is a veto).

## 9. The top 10 cuts, ranked by how much more like itself the site becomes

1. The six-box grid on /sow.
2. The forty-box crops page.
3. The homepage below-fold grids (cards, tiles, community row).
4. Auto-generated posts out of /blog — the diary becomes all diary. ⛔
5. Marquee marketing slogans out of the ticker.
6. The /products placeholder. ⛔
7. Metric strip + SkyTonight off the homepage (to /my-garden).
8. Tool-speak strings, sitewide ("Support this tool", "planting calendar").
9. The printable/still-time/personal-pages duplications — one of each thing. ⛔
10. Desktop duplicate seed links + the harvest wall shrunk to compact.

## 10. Do not mourn these

None of this is loss. A periodical is defined by what its editor leaves out —
that is the entire difference between a front page and a feed. Every grid cut
makes the remaining photographs feel chosen; every duplicate removed makes the
surviving copy feel deliberate; every slogan deleted makes the plain sentences
ring truer; every auto-post retired makes Kate's real marigold disasters worth
more. The reader never sees what was cut. They feel it — as speed, as calm, as
the sense that a person decided everything on the page. The site does not get
smaller when these things go. It gets *clearer*, and clarity is the product.
Cut without ceremony.
