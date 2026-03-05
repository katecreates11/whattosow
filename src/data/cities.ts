export interface City {
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  county: string;
  region: string;
  postcodePrefix: string;
  coastal: boolean;
  /** Short description of growing conditions for this area */
  growingNotes: string;
}

export const regions = [
  "London",
  "South East",
  "South West",
  "East Anglia",
  "East Midlands",
  "West Midlands",
  "North West",
  "North East",
  "Yorkshire & the Humber",
  "Wales",
  "Scotland",
  "Northern Ireland",
] as const;

export type Region = (typeof regions)[number];

export const cities: City[] = [
  // === LONDON ===
  {
    name: "London",
    slug: "london",
    latitude: 51.51,
    longitude: -0.13,
    county: "Greater London",
    region: "London",
    postcodePrefix: "EC",
    coastal: false,
    growingNotes:
      "The urban heat island effect gives London gardeners a head start — the city centre can be 2-3°C warmer than surrounding countryside, making it one of the mildest spots in the UK for growing. Space is the main challenge, but balconies, window boxes, and allotments are everywhere.",
  },

  // === SOUTH EAST ===
  {
    name: "Brighton",
    slug: "brighton",
    latitude: 50.82,
    longitude: -0.14,
    county: "East Sussex",
    region: "South East",
    postcodePrefix: "BN",
    coastal: true,
    growingNotes:
      "Brighton's mild coastal climate means a long growing season, though salt-laden winds can batter exposed plots. Sheltered south-facing gardens do brilliantly — Mediterranean crops thrive here.",
  },
  {
    name: "Southampton",
    slug: "southampton",
    latitude: 50.9,
    longitude: -1.4,
    county: "Hampshire",
    region: "South East",
    postcodePrefix: "SO",
    coastal: true,
    growingNotes:
      "Southampton benefits from its sheltered position on the Solent. Mild winters and warm summers make it excellent for a wide range of crops, with an extended growing season compared to inland Hampshire.",
  },
  {
    name: "Reading",
    slug: "reading",
    latitude: 51.45,
    longitude: -0.97,
    county: "Berkshire",
    region: "South East",
    postcodePrefix: "RG",
    coastal: false,
    growingNotes:
      "Reading sits in the Thames Valley with fertile soil and a relatively mild, sheltered climate. The area is slightly warmer than higher ground to the west and north, with good growing conditions for most crops.",
  },
  {
    name: "Canterbury",
    slug: "canterbury",
    latitude: 51.28,
    longitude: 1.08,
    county: "Kent",
    region: "South East",
    postcodePrefix: "CT",
    coastal: false,
    growingNotes:
      "Kent is the 'Garden of England' for good reason. Canterbury's location gives it warm summers and the continental influence from the east means drier conditions — ideal for crops that dislike wet feet.",
  },
  {
    name: "Oxford",
    slug: "oxford",
    latitude: 51.75,
    longitude: -1.25,
    county: "Oxfordshire",
    region: "South East",
    postcodePrefix: "OX",
    coastal: false,
    growingNotes:
      "Oxford's inland Thames Valley position gives it warm summers and cold winters. Late frosts can catch out eager gardeners, but the long summer days and fertile valley soil reward patience.",
  },

  // === SOUTH WEST ===
  {
    name: "Bristol",
    slug: "bristol",
    latitude: 51.45,
    longitude: -2.59,
    county: "Bristol",
    region: "South West",
    postcodePrefix: "BS",
    coastal: false,
    growingNotes:
      "Bristol's mild, westerly climate and allotment culture make it a brilliant city for growers. The Severn Estuary nearby moderates temperatures, but the hilly terrain means frost pockets can form in lower-lying gardens.",
  },
  {
    name: "Exeter",
    slug: "exeter",
    latitude: 50.72,
    longitude: -3.53,
    county: "Devon",
    region: "South West",
    postcodePrefix: "EX",
    coastal: false,
    growingNotes:
      "Exeter's sheltered position in the Exe Valley gives it a milder climate than you might expect. The South West's higher rainfall keeps soil moist, and the long growing season suits a huge range of crops.",
  },
  {
    name: "Plymouth",
    slug: "plymouth",
    latitude: 50.38,
    longitude: -4.14,
    county: "Devon",
    region: "South West",
    postcodePrefix: "PL",
    coastal: true,
    growingNotes:
      "Plymouth's coastal position means mild winters and fewer frosts, but Atlantic winds can be fierce. Shelter is key — behind a wall or hedge, you can grow crops that would struggle further north. Rainfall is generous.",
  },
  {
    name: "Bath",
    slug: "bath",
    latitude: 51.38,
    longitude: -2.36,
    county: "Somerset",
    region: "South West",
    postcodePrefix: "BA",
    coastal: false,
    growingNotes:
      "Bath's position in the Avon Valley gives it a sheltered, mild microclimate. The surrounding hills can create frost pockets in winter, but the city itself benefits from relatively mild conditions and good growing soil.",
  },

  // === EAST ANGLIA ===
  {
    name: "Norwich",
    slug: "norwich",
    latitude: 52.63,
    longitude: 1.3,
    county: "Norfolk",
    region: "East Anglia",
    postcodePrefix: "NR",
    coastal: false,
    growingNotes:
      "Norwich and Norfolk are drier than most of the UK — great news for crops that hate wet roots. The flat, open landscape means wind exposure, but the low rainfall and warm summers make this prime growing country.",
  },
  {
    name: "Cambridge",
    slug: "cambridge",
    latitude: 52.21,
    longitude: 0.12,
    county: "Cambridgeshire",
    region: "East Anglia",
    postcodePrefix: "CB",
    coastal: false,
    growingNotes:
      "Cambridge sits on the edge of the Fens — some of the most fertile agricultural land in the UK. Dry summers and the continental influence from the east mean warm days but colder winters than the west coast.",
  },
  {
    name: "Ipswich",
    slug: "ipswich",
    latitude: 52.06,
    longitude: 1.16,
    county: "Suffolk",
    region: "East Anglia",
    postcodePrefix: "IP",
    coastal: false,
    growingNotes:
      "Suffolk is one of the driest counties in England, with warm summers and the east coast influence. The light, sandy soils warm up quickly in spring — great for early sowings of carrots, parsnips, and root crops.",
  },
  {
    name: "Peterborough",
    slug: "peterborough",
    latitude: 52.57,
    longitude: -0.24,
    county: "Cambridgeshire",
    region: "East Anglia",
    postcodePrefix: "PE",
    coastal: false,
    growingNotes:
      "Peterborough sits on the edge of the Fens — flat, rich, black soil that's been drained for agriculture. It's one of the driest areas in the UK, and the fertile ground is ideal for growing vegetables of all kinds.",
  },

  // === EAST MIDLANDS ===
  {
    name: "Nottingham",
    slug: "nottingham",
    latitude: 52.95,
    longitude: -1.15,
    county: "Nottinghamshire",
    region: "East Midlands",
    postcodePrefix: "NG",
    coastal: false,
    growingNotes:
      "Nottingham has a typical Midlands climate — moderate rainfall, warm summers, and cold winters. The Trent Valley provides fertile ground, and the city's allotment tradition is strong.",
  },
  {
    name: "Leicester",
    slug: "leicester",
    latitude: 52.63,
    longitude: -1.13,
    county: "Leicestershire",
    region: "East Midlands",
    postcodePrefix: "LE",
    coastal: false,
    growingNotes:
      "Leicester sits in the heart of England with a moderate climate. Being inland means colder winters than the coasts, but warm summers and reasonable rainfall make for solid growing conditions.",
  },
  {
    name: "Derby",
    slug: "derby",
    latitude: 52.92,
    longitude: -1.47,
    county: "Derbyshire",
    region: "East Midlands",
    postcodePrefix: "DE",
    coastal: false,
    growingNotes:
      "Derby lies at the southern edge of the Pennines, so gardens at higher elevations will have later frosts. The Derwent Valley is more sheltered, with decent growing conditions for the full range of UK crops.",
  },
  {
    name: "Lincoln",
    slug: "lincoln",
    latitude: 53.23,
    longitude: -0.54,
    county: "Lincolnshire",
    region: "East Midlands",
    postcodePrefix: "LN",
    coastal: false,
    growingNotes:
      "Lincolnshire is vegetable-growing country — flat, fertile fenland soils that have been feeding the nation for centuries. Lincoln itself has a slightly drier climate than the west, with warm summers.",
  },

  // === WEST MIDLANDS ===
  {
    name: "Birmingham",
    slug: "birmingham",
    latitude: 52.48,
    longitude: -1.9,
    county: "West Midlands",
    region: "West Midlands",
    postcodePrefix: "B",
    coastal: false,
    growingNotes:
      "Birmingham's urban sprawl creates a heat island that can extend the growing season by a week or two. Clay soils are common — they're rich but heavy, so add organic matter to improve drainage.",
  },
  {
    name: "Coventry",
    slug: "coventry",
    latitude: 52.41,
    longitude: -1.51,
    county: "West Midlands",
    region: "West Midlands",
    postcodePrefix: "CV",
    coastal: false,
    growingNotes:
      "Coventry sits on the Warwickshire plain with moderate growing conditions. The area gets reasonable rainfall and warm enough summers for the full range of common UK crops.",
  },
  {
    name: "Stoke-on-Trent",
    slug: "stoke-on-trent",
    latitude: 53.0,
    longitude: -2.18,
    county: "Staffordshire",
    region: "West Midlands",
    postcodePrefix: "ST",
    coastal: false,
    growingNotes:
      "Stoke sits on the edge of the Pennines, so it's slightly cooler and wetter than lowland Midlands. Gardens at lower elevations do well, but higher plots need hardier varieties and more patience in spring.",
  },
  {
    name: "Worcester",
    slug: "worcester",
    latitude: 52.19,
    longitude: -2.22,
    county: "Worcestershire",
    region: "West Midlands",
    postcodePrefix: "WR",
    coastal: false,
    growingNotes:
      "The Vale of Evesham around Worcester is famous for market gardening — the rich, fertile soil and sheltered position make it one of the best areas in England for growing fruit and vegetables.",
  },
  {
    name: "Wolverhampton",
    slug: "wolverhampton",
    latitude: 52.59,
    longitude: -2.13,
    county: "West Midlands",
    region: "West Midlands",
    postcodePrefix: "WV",
    coastal: false,
    growingNotes:
      "Wolverhampton sits on the western edge of the Black Country with a moderate Midlands climate. The area benefits from the urban heat island effect, and community allotments and growing projects are well established.",
  },

  // === NORTH WEST ===
  {
    name: "Manchester",
    slug: "manchester",
    latitude: 53.48,
    longitude: -2.24,
    county: "Greater Manchester",
    region: "North West",
    postcodePrefix: "M",
    coastal: false,
    growingNotes:
      "Manchester's reputation for rain is well-earned — the Pennines wring moisture from Atlantic air masses. The upside: you'll rarely need to water. The growing season is shorter than the south, but hardy crops thrive.",
  },
  {
    name: "Liverpool",
    slug: "liverpool",
    latitude: 53.41,
    longitude: -2.98,
    county: "Merseyside",
    region: "North West",
    postcodePrefix: "L",
    coastal: true,
    growingNotes:
      "Liverpool's position on the Mersey estuary gives it a mild maritime climate. Frosts come later and leave earlier than inland Lancashire, and the Gulf Stream influence keeps winters milder than you'd expect at this latitude.",
  },
  {
    name: "Preston",
    slug: "preston",
    latitude: 53.76,
    longitude: -2.7,
    county: "Lancashire",
    region: "North West",
    postcodePrefix: "PR",
    coastal: false,
    growingNotes:
      "Preston sits between the coast and the Pennine foothills. It's wetter than the east, but the Ribble Valley provides reasonably sheltered growing conditions. Hardy crops do well; tender ones need protection.",
  },
  {
    name: "Chester",
    slug: "chester",
    latitude: 53.19,
    longitude: -2.89,
    county: "Cheshire",
    region: "North West",
    postcodePrefix: "CH",
    coastal: false,
    growingNotes:
      "The Cheshire Plain around Chester is low-lying and relatively mild. Good agricultural land with moderate rainfall — a solid location for growing the full range of UK vegetables.",
  },

  // === NORTH EAST ===
  {
    name: "Newcastle",
    slug: "newcastle",
    latitude: 54.98,
    longitude: -1.61,
    county: "Tyne and Wear",
    region: "North East",
    postcodePrefix: "NE",
    coastal: true,
    growingNotes:
      "Newcastle's coastal proximity moderates temperatures, but cold North Sea winds ('the haar') can set growth back in spring. Choose sheltered spots and start tender crops indoors — once summer arrives, the long daylight hours help crops catch up.",
  },
  {
    name: "Sunderland",
    slug: "sunderland",
    latitude: 54.91,
    longitude: -1.38,
    county: "Tyne and Wear",
    region: "North East",
    postcodePrefix: "SR",
    coastal: true,
    growingNotes:
      "Sunderland's exposed coastal position means cold spring winds, but the sea keeps winter temperatures from dropping as low as inland areas. The allotment tradition here is strong — robust varieties and cloches are your friends.",
  },
  {
    name: "Durham",
    slug: "durham",
    latitude: 54.78,
    longitude: -1.57,
    county: "County Durham",
    region: "North East",
    postcodePrefix: "DH",
    coastal: false,
    growingNotes:
      "Durham's elevated inland position means colder winters and later springs than the coast. The Wear Valley provides some shelter, but gardeners here benefit from choosing hardy varieties and using fleece to extend the season.",
  },
  {
    name: "Middlesbrough",
    slug: "middlesbrough",
    latitude: 54.57,
    longitude: -1.23,
    county: "North Yorkshire",
    region: "North East",
    postcodePrefix: "TS",
    coastal: true,
    growingNotes:
      "Middlesbrough sits on the Tees estuary with the North York Moors to the south. The coastal location moderates winter cold, but the eastern exposure means cooler springs. Once established, crops grow well through the long summer days.",
  },

  // === YORKSHIRE & THE HUMBER ===
  {
    name: "Leeds",
    slug: "leeds",
    latitude: 53.8,
    longitude: -1.55,
    county: "West Yorkshire",
    region: "Yorkshire & the Humber",
    postcodePrefix: "LS",
    coastal: false,
    growingNotes:
      "Leeds sits in the Aire Valley between the Pennines and the York plain. It's wetter than the east but drier than Manchester. The growing season is moderate — start hardy crops early and give tender ones a head start indoors.",
  },
  {
    name: "Sheffield",
    slug: "sheffield",
    latitude: 53.38,
    longitude: -1.47,
    county: "South Yorkshire",
    region: "Yorkshire & the Humber",
    postcodePrefix: "S",
    coastal: false,
    growingNotes:
      "Sheffield is famously hilly, and altitude matters. Gardens in the lower Don Valley are noticeably warmer than those on the western hills. The Peak District edge means higher rainfall and later frosts at elevation.",
  },
  {
    name: "York",
    slug: "york",
    latitude: 53.96,
    longitude: -1.08,
    county: "North Yorkshire",
    region: "Yorkshire & the Humber",
    postcodePrefix: "YO",
    coastal: false,
    growingNotes:
      "York sits on the flat Vale of York with fertile soil and a drier climate than western Yorkshire. The low-lying position can create frost pockets, but the fertile ground and moderate conditions suit most UK crops well.",
  },
  {
    name: "Hull",
    slug: "hull",
    latitude: 53.74,
    longitude: -0.33,
    county: "East Riding of Yorkshire",
    region: "Yorkshire & the Humber",
    postcodePrefix: "HU",
    coastal: true,
    growingNotes:
      "Hull's Humber estuary position gives it a slightly drier climate than western Yorkshire, but the eastern exposure brings cold spring winds. The flat Holderness plain has rich agricultural soil — great for root crops and brassicas.",
  },
  {
    name: "Bradford",
    slug: "bradford",
    latitude: 53.79,
    longitude: -1.75,
    county: "West Yorkshire",
    region: "Yorkshire & the Humber",
    postcodePrefix: "BD",
    coastal: false,
    growingNotes:
      "Bradford's position on the Pennine slopes means it's a touch cooler and wetter than the lowlands to the east. Higher-altitude allotments will have a shorter growing season, but hardy varieties do well.",
  },

  // === WALES ===
  {
    name: "Cardiff",
    slug: "cardiff",
    latitude: 51.48,
    longitude: -3.18,
    county: "Cardiff",
    region: "Wales",
    postcodePrefix: "CF",
    coastal: true,
    growingNotes:
      "Cardiff's position on the Severn Estuary gives it a mild climate — similar to Bristol across the water. The coastal influence keeps frosts at bay, and the growing season is longer than much of Wales.",
  },
  {
    name: "Swansea",
    slug: "swansea",
    latitude: 51.62,
    longitude: -3.94,
    county: "Swansea",
    region: "Wales",
    postcodePrefix: "SA",
    coastal: true,
    growingNotes:
      "Swansea's Gower Peninsula location means a mild, wet maritime climate. The Gulf Stream keeps winters mild, and the growing season is generous — but you'll need to contend with Atlantic rain and wind.",
  },
  {
    name: "Newport",
    slug: "newport",
    latitude: 51.59,
    longitude: -2.99,
    county: "Newport",
    region: "Wales",
    postcodePrefix: "NP",
    coastal: true,
    growingNotes:
      "Newport sits on the Severn Estuary with a mild climate. The Gwent Levels provide flat, fertile growing ground, and the maritime influence means a decent growing season for southern Wales.",
  },
  {
    name: "Wrexham",
    slug: "wrexham",
    latitude: 53.05,
    longitude: -3.0,
    county: "Wrexham",
    region: "Wales",
    postcodePrefix: "LL",
    coastal: false,
    growingNotes:
      "Wrexham sits on the border between the Welsh hills and the Cheshire Plain. Lower-lying gardens benefit from the sheltered plain, while higher spots face a shorter season. Good allotment soil in the Dee Valley.",
  },
  {
    name: "Bangor",
    slug: "bangor",
    latitude: 53.23,
    longitude: -4.13,
    county: "Gwynedd",
    region: "Wales",
    postcodePrefix: "LL",
    coastal: true,
    growingNotes:
      "Bangor's position on the Menai Strait gives it a mild, maritime climate influenced by the Gulf Stream. The nearby Snowdonia mountains shelter it from the worst weather, and the coast keeps frosts at bay — though wind exposure is the main growing challenge.",
  },

  // === SCOTLAND ===
  {
    name: "Edinburgh",
    slug: "edinburgh",
    latitude: 55.95,
    longitude: -3.19,
    county: "City of Edinburgh",
    region: "Scotland",
    postcodePrefix: "EH",
    coastal: true,
    growingNotes:
      "Edinburgh's east coast position means it's drier than Glasgow but cooler in spring. The Firth of Forth moderates extremes, and the city's many walled gardens and allotments show what's possible. Start tender crops indoors and make the most of the long summer days.",
  },
  {
    name: "Glasgow",
    slug: "glasgow",
    latitude: 55.86,
    longitude: -4.25,
    county: "City of Glasgow",
    region: "Scotland",
    postcodePrefix: "G",
    coastal: false,
    growingNotes:
      "Glasgow's mild, wet west-coast climate means you'll rarely worry about drought, but slugs love it too. The Gulf Stream influence keeps temperatures reasonable, and the growing season is longer than eastern Scotland at the same latitude.",
  },
  {
    name: "Aberdeen",
    slug: "aberdeen",
    latitude: 57.15,
    longitude: -2.09,
    county: "Aberdeen City",
    region: "Scotland",
    postcodePrefix: "AB",
    coastal: true,
    growingNotes:
      "Aberdeen's northern position and North Sea exposure mean a short growing season and cool summers. But the long daylight hours in June and July are a secret weapon — crops grow remarkably fast once they get going. Stick to hardy varieties and polytunnels help enormously.",
  },
  {
    name: "Dundee",
    slug: "dundee",
    latitude: 56.46,
    longitude: -2.97,
    county: "Dundee City",
    region: "Scotland",
    postcodePrefix: "DD",
    coastal: true,
    growingNotes:
      "Dundee sits on the Tay Estuary, which moderates temperatures. It's one of the driest and sunniest cities in Scotland — surprisingly good for growing. The community growing scene is strong, and hardy crops do well.",
  },
  {
    name: "Inverness",
    slug: "inverness",
    latitude: 57.48,
    longitude: -4.22,
    county: "Highland",
    region: "Scotland",
    postcodePrefix: "IV",
    coastal: false,
    growingNotes:
      "Inverness has a surprisingly mild climate thanks to its sheltered position at the head of the Moray Firth. The growing season is short but intense — the near-constant daylight in midsummer drives rapid growth. Focus on hardy crops and use protection for tender ones.",
  },
  {
    name: "Stirling",
    slug: "stirling",
    latitude: 56.12,
    longitude: -3.94,
    county: "Stirling",
    region: "Scotland",
    postcodePrefix: "FK",
    coastal: false,
    growingNotes:
      "Stirling sits in the Forth Valley, sheltered by the Ochil Hills. The growing conditions are reasonable for central Scotland — milder than the Highlands, with enough rainfall to keep crops happy without waterlogging.",
  },
  {
    name: "Perth",
    slug: "perth",
    latitude: 56.39,
    longitude: -3.43,
    county: "Perth and Kinross",
    region: "Scotland",
    postcodePrefix: "PH",
    coastal: false,
    growingNotes:
      "Perth sits in the sheltered Tay Valley, one of Scotland's better spots for growing. The river valley moderates temperatures, and the area has a long tradition of soft fruit farming — raspberries and strawberries thrive here. Hardy crops do well; the long summer days help.",
  },

  // === NORTHERN IRELAND ===
  {
    name: "Belfast",
    slug: "belfast",
    latitude: 54.6,
    longitude: -5.93,
    county: "County Antrim",
    region: "Northern Ireland",
    postcodePrefix: "BT",
    coastal: true,
    growingNotes:
      "Belfast's position on Belfast Lough and the Gulf Stream influence give it a milder, more maritime climate than its latitude suggests. Frosts are less severe than eastern Britain at the same latitude, and the growing season is surprisingly generous.",
  },
  {
    name: "Derry",
    slug: "derry",
    latitude: 54.99,
    longitude: -7.32,
    county: "County Londonderry",
    region: "Northern Ireland",
    postcodePrefix: "BT",
    coastal: true,
    growingNotes:
      "Derry's far-western position means it gets the full benefit of the Gulf Stream — mild, wet, and rarely very cold. The Foyle Estuary moderates temperatures. Rain is plentiful, so drainage matters more than watering.",
  },
];

/** Get cities grouped by region */
export function getCitiesByRegion(): Record<string, City[]> {
  const grouped: Record<string, City[]> = {};
  for (const region of regions) {
    const regionCities = cities.filter((c) => c.region === region);
    if (regionCities.length > 0) {
      grouped[region] = regionCities;
    }
  }
  return grouped;
}

/** Get nearby cities (same region, excluding self) */
export function getNearbyCities(city: City): City[] {
  return cities.filter(
    (c) => c.region === city.region && c.slug !== city.slug
  );
}
