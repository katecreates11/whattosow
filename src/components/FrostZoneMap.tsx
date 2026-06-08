"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { FeatureCollection } from "geojson";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import { lookupPostcode, calculateLastFrostDate, calculateFirstAutumnFrostDate } from "@/lib/frost";
import RegionPanel from "@/components/RegionPanel";
import { loadLocation, saveLocation } from "@/lib/location-storage";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// UK bounds — keep the map over Britain, not Europe
const UK_MAX_BOUNDS: mapboxgl.LngLatBoundsLike = [
  [-11.0, 49.0], // SW [lng, lat]
  [4.0, 61.5], // NE
];
const UK_CENTER: [number, number] = [-2.6, 54.5]; // [lng, lat]
const UK_FIT_BOUNDS: mapboxgl.LngLatBoundsLike = [
  [-8.2, 49.8],
  [2.0, 60.9],
];

interface FrostProperties {
  LAD24NM?: string;
  LAD23NM?: string;
  frostDayOfYear: number;
  frostDate: string;
  autumnFrostDayOfYear?: number;
  autumnFrostDate?: string;
  growingSeasonDays?: number;
  centroidLat?: number;
  centroidLng?: number;
  // injected at load time
  __spring?: string;
  __autumn?: string;
  __season?: string;
  __id?: number;
  [key: string]: unknown;
}

interface StoredLocation {
  latitude: number;
  longitude: number;
  postcode: string;
  adminDistrict: string;
}

type ActiveLayer = "spring" | "autumn" | "season";

// === Colour scales (unchanged from the Leaflet version) ===

function lerpColor(colors: number[][], t: number): string {
  const idx = t * (colors.length - 1);
  const lower = Math.floor(idx);
  const upper = Math.min(lower + 1, colors.length - 1);
  const frac = idx - lower;
  const r = Math.round(colors[lower][0] + (colors[upper][0] - colors[lower][0]) * frac);
  const g = Math.round(colors[lower][1] + (colors[upper][1] - colors[lower][1]) * frac);
  const b = Math.round(colors[lower][2] + (colors[upper][2] - colors[lower][2]) * frac);
  return `rgb(${r},${g},${b})`;
}

// Spring: green → teal → blue (day 85–168)
function springColor(dayOfYear: number): string {
  const t = Math.max(0, Math.min(1, (dayOfYear - 85) / (168 - 85)));
  return lerpColor(
    [
      [123, 179, 105], // leaf green
      [0, 162, 155], // teal
      [72, 133, 247], // beacon blue
      [123, 167, 194], // frost
    ],
    t,
  );
}

// Autumn: amber → tomato → frost-blue (day 245–310)
function autumnColor(dayOfYear: number): string {
  const t = Math.max(0, Math.min(1, (dayOfYear - 245) / (310 - 245)));
  return lerpColor(
    [
      [212, 148, 58], // amber (#D4943A)
      [201, 84, 62], // tomato (#C9543E)
      [123, 167, 194], // frost (#7BA7C2)
    ],
    t,
  );
}

// Growing season: frost-blue → leaf-green (120–220 days)
function seasonColor(days: number): string {
  const t = Math.max(0, Math.min(1, (days - 120) / (220 - 120)));
  return lerpColor(
    [
      [123, 167, 194], // frost (#7BA7C2)
      [0, 162, 155], // teal
      [123, 179, 105], // leaf green (#7BB369)
    ],
    t,
  );
}

function getTooltipText(layer: ActiveLayer, props: FrostProperties): string {
  const name = props.LAD24NM || props.LAD23NM || "Unknown area";
  if (layer === "autumn") {
    return `<strong>${name}</strong><br/>First autumn frost: <strong>${props.autumnFrostDate || "—"}</strong>`;
  }
  if (layer === "season") {
    return `<strong>${name}</strong><br/>Growing season: <strong>${props.growingSeasonDays ?? "—"} days</strong>`;
  }
  return `<strong>${name}</strong><br/>Last spring frost: <strong>${props.frostDate}</strong>`;
}

// === Legend ===
function Legend({ activeLayer }: { activeLayer: ActiveLayer }) {
  if (activeLayer === "autumn") {
    const stops = [
      { label: "Early Sep", day: 245 },
      { label: "Late Sep", day: 265 },
      { label: "Mid Oct", day: 283 },
      { label: "Early Nov", day: 300 },
      { label: "Late Nov", day: 310 },
    ];
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-md text-xs text-earth">
        <p className="font-semibold mb-2">Estimated first autumn frost</p>
        <div className="flex items-center gap-0.5">
          {stops.map((s, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="h-3 rounded-sm" style={{ backgroundColor: autumnColor(s.day) }} />
              <span className="text-[10px] text-earth-lighter mt-0.5 block">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-earth-lighter">
          <span>Earlier frost</span>
          <span>Later frost</span>
        </div>
      </div>
    );
  }

  if (activeLayer === "season") {
    const stops = [
      { label: "120", days: 120 },
      { label: "145", days: 145 },
      { label: "170", days: 170 },
      { label: "195", days: 195 },
      { label: "220", days: 220 },
    ];
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-md text-xs text-earth">
        <p className="font-semibold mb-2">Growing season length (days)</p>
        <div className="flex items-center gap-0.5">
          {stops.map((s, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="h-3 rounded-sm" style={{ backgroundColor: seasonColor(s.days) }} />
              <span className="text-[10px] text-earth-lighter mt-0.5 block">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-earth-lighter">
          <span>Shorter</span>
          <span>Longer</span>
        </div>
      </div>
    );
  }

  // Default: spring
  const stops = [
    { label: "Late Mar", day: 85 },
    { label: "Mid Apr", day: 107 },
    { label: "Early May", day: 125 },
    { label: "Late May", day: 150 },
    { label: "Mid Jun", day: 168 },
  ];
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-md text-xs text-earth">
      <p className="font-semibold mb-2">Estimated last frost date</p>
      <div className="flex items-center gap-0.5">
        {stops.map((s, i) => (
          <div key={i} className="flex-1 text-center">
            <div className="h-3 rounded-sm" style={{ backgroundColor: springColor(s.day) }} />
            <span className="text-[10px] text-earth-lighter mt-0.5 block">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-1 text-[10px] text-earth-lighter">
        <span>Milder</span>
        <span>Colder</span>
      </div>
    </div>
  );
}

// === Layer toggle buttons ===
function LayerToggle({ activeLayer, onChange }: { activeLayer: ActiveLayer; onChange: (l: ActiveLayer) => void }) {
  const layers: { key: ActiveLayer; label: string }[] = [
    { key: "spring", label: "Spring frost" },
    { key: "autumn", label: "Autumn frost" },
    { key: "season", label: "Growing season" },
  ];
  return (
    <div className="flex bg-white/95 backdrop-blur-sm rounded-lg shadow-md overflow-hidden text-xs">
      {layers.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          aria-pressed={activeLayer === key}
          className={`px-3 py-2 font-medium transition-colors ${
            activeLayer === key ? "bg-allotment text-white" : "text-earth hover:bg-allotment-bg"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

const FILL_LAYER = "frost-fill";
const LINE_LAYER = "frost-line";
const SOURCE = "frost-zones";

export interface FrostMapFocus {
  lat: number;
  lng: number;
  name: string;
  zoom?: number;
}

interface FrostZoneMapProps {
  /** When set, the map opens locked in on this place instead of the whole UK. */
  focus?: FrostMapFocus;
  /** Show the postcode search bar above the map. Default true. */
  showPostcodeSearch?: boolean;
  /** Use a shorter map height (for embedding on content pages). Default false. */
  compact?: boolean;
}

export default function FrostZoneMap({
  focus,
  showPostcodeSearch = true,
  compact = false,
}: FrostZoneMapProps = {}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const cityMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const hoveredId = useRef<number | null>(null);
  const propsById = useRef<Map<number, FrostProperties>>(new Map());
  const geojsonRef = useRef<FeatureCollection | null>(null);
  const activeLayerRef = useRef<ActiveLayer>("spring");
  const focusRef = useRef<FrostMapFocus | undefined>(focus);
  focusRef.current = focus;
  const openUserPopupRef = useRef(false);

  const [userLocation, setUserLocation] = useState<StoredLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeLayer, setActiveLayer] = useState<ActiveLayer>("spring");
  const [selectedRegion, setSelectedRegion] = useState<FrostProperties | null>(null);
  const [postcode, setPostcode] = useState("");
  const [postcodeError, setPostcodeError] = useState("");
  const [searching, setSearching] = useState(false);

  // --- Build the map once ---
  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      setError("Map unavailable — missing configuration.");
      setLoading(false);
      return;
    }
    if (mapRef.current || !mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const saved = loadLocation();

    // Opening view: whole UK by default. In focus mode (city pages), lock in on
    // the city — or on the visitor's own saved location if they have one.
    let initialCenter: [number, number] = UK_CENTER;
    let initialZoom = 4.6;
    if (focus) {
      // City pages always default to the city itself — not the visitor's saved
      // postcode, which may be nowhere near it.
      initialCenter = [focus.lng, focus.lat];
      initialZoom = focus.zoom ?? 9.5;
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 4,
      maxZoom: 14,
      maxBounds: UK_MAX_BOUNDS,
      scrollZoom: false,
      attributionControl: true,
    });
    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-left");

    // In focus mode, always mark the city the page is about (green pin)
    if (focus) {
      const cityEl = document.createElement("div");
      cityEl.innerHTML = `<svg width="26" height="34" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="#2D5F3E"/>
        <circle cx="14" cy="14" r="6" fill="white" fill-opacity="0.9"/>
      </svg>`;
      cityMarkerRef.current = new mapboxgl.Marker({ element: cityEl, anchor: "bottom" })
        .setLngLat([focus.lng, focus.lat])
        .setPopup(new mapboxgl.Popup({ offset: 26 }).setHTML(`<strong>${focus.name}</strong>`))
        .addTo(map);
    }

    if (saved) {
      setUserLocation({
        latitude: saved.latitude,
        longitude: saved.longitude,
        postcode: saved.postcode,
        adminDistrict: saved.adminDistrict,
      });
    }

    // Scroll-to-zoom only after a click (matches old behaviour)
    map.on("click", () => map.scrollZoom.enable());
    map.getCanvas().addEventListener("mouseleave", () => map.scrollZoom.disable());

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      className: "frost-tooltip",
      offset: 8,
    });
    popupRef.current = popup;

    map.on("load", () => {
      fetch("/data/frost-zones.topojson")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load frost zone data");
          return res.json();
        })
        .then((topo: Topology) => {
          const objectName = Object.keys(topo.objects)[0];
          const geojson = feature(topo, topo.objects[objectName]) as unknown as FeatureCollection;

          // Pre-compute per-feature colours for each layer + give each a stable id
          geojson.features.forEach((f, i) => {
            const p = (f.properties || {}) as FrostProperties;
            p.__spring = springColor(p.frostDayOfYear);
            p.__autumn = p.autumnFrostDayOfYear != null ? autumnColor(p.autumnFrostDayOfYear) : p.__spring;
            p.__season = p.growingSeasonDays != null ? seasonColor(p.growingSeasonDays) : p.__spring;
            p.__id = i;
            f.id = i;
            propsById.current.set(i, p);
          });
          geojsonRef.current = geojson;

          map.addSource(SOURCE, { type: "geojson", data: geojson });

          map.addLayer({
            id: FILL_LAYER,
            type: "fill",
            source: SOURCE,
            paint: {
              "fill-color": ["get", "__spring"],
              "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.92, 0.72],
            },
          });

          map.addLayer({
            id: LINE_LAYER,
            type: "line",
            source: SOURCE,
            paint: {
              "line-color": "#ffffff",
              "line-width": ["case", ["boolean", ["feature-state", "hover"], false], 2, 0.6],
              "line-opacity": 0.65,
            },
          });

          // Hover: tooltip + highlight
          map.on("mousemove", FILL_LAYER, (e) => {
            if (!e.features?.length) return;
            map.getCanvas().style.cursor = "pointer";
            const id = e.features[0].id as number;
            if (hoveredId.current !== null && hoveredId.current !== id) {
              map.setFeatureState({ source: SOURCE, id: hoveredId.current }, { hover: false });
            }
            hoveredId.current = id;
            map.setFeatureState({ source: SOURCE, id }, { hover: true });

            const props = propsById.current.get(id);
            if (props) {
              popup.setLngLat(e.lngLat).setHTML(getTooltipText(activeLayerRef.current, props)).addTo(map);
            }
          });

          map.on("mouseleave", FILL_LAYER, () => {
            map.getCanvas().style.cursor = "";
            if (hoveredId.current !== null) {
              map.setFeatureState({ source: SOURCE, id: hoveredId.current }, { hover: false });
              hoveredId.current = null;
            }
            popup.remove();
          });

          // Click: open the region panel
          map.on("click", FILL_LAYER, (e) => {
            if (!e.features?.length) return;
            const id = e.features[0].id as number;
            const props = propsById.current.get(id);
            if (props) setSelectedRegion(props);
          });

          if (!focusRef.current) {
            map.fitBounds(UK_FIT_BOUNDS, { padding: 16, animate: false });
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Could not load frost zone data. Please try refreshing.");
          setLoading(false);
        });
    });

    map.on("error", (e) => {
      // Surface only fatal style/auth failures; tile hiccups are non-fatal
      if (e.error && /access token|Unauthorized|401|403/i.test(e.error.message)) {
        setError("Map failed to load — check the Mapbox token.");
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recolour fills when the active layer changes; keep the ref in sync for handlers
  useEffect(() => {
    activeLayerRef.current = activeLayer;
    const map = mapRef.current;
    if (map && map.getLayer(FILL_LAYER)) {
      map.setPaintProperty(FILL_LAYER, "fill-color", ["get", `__${activeLayer}`]);
    }
  }, [activeLayer]);

  // --- User location marker ---
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !userLocation) return;

    // On a city page, don't drop the visitor's pin if their postcode is far from
    // this city — keep the city itself as the default view.
    if (focusRef.current) {
      const f = focusRef.current;
      const dlat = userLocation.latitude - f.lat;
      const dlng = (userLocation.longitude - f.lng) * Math.cos((f.lat * Math.PI) / 180);
      if (Math.sqrt(dlat * dlat + dlng * dlng) > 0.6) return; // ~> 60km away
    }

    const spring = calculateLastFrostDate(userLocation.latitude, userLocation.longitude);
    const autumn = calculateFirstAutumnFrostDate(userLocation.latitude, userLocation.longitude);
    const seasonDays = Math.round((autumn.getTime() - spring.getTime()) / 86400000);
    const fmt = (dt: Date) => dt.toLocaleDateString("en-GB", { day: "numeric", month: "long" });

    const el = document.createElement("div");
    el.innerHTML = `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="#D4943A"/>
      <circle cx="14" cy="14" r="6" fill="white" fill-opacity="0.9"/>
    </svg>`;

    const fromSearch = openUserPopupRef.current;
    openUserPopupRef.current = false;

    if (userMarkerRef.current) userMarkerRef.current.remove();
    userMarkerRef.current = new mapboxgl.Marker({ element: el, anchor: "bottom" })
      .setLngLat([userLocation.longitude, userLocation.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 28 }).setHTML(
          `<strong>Your spot</strong> (${userLocation.postcode})<br/>Last frost ~ <strong>${fmt(spring)}</strong><br/>First autumn frost ~ <strong>${fmt(autumn)}</strong><br/>Growing season ~ <strong>${seasonDays} days</strong>`,
        ),
      )
      .addTo(map);

    if (fromSearch) userMarkerRef.current.togglePopup();

    // In focus mode the map already opens on the visitor's location — don't yank it.
    if (!focusRef.current) {
      map.flyTo({ center: [userLocation.longitude, userLocation.latitude], zoom: fromSearch ? 10.5 : 8.5, duration: 1200 });
    }

    return () => {
      userMarkerRef.current?.remove();
      userMarkerRef.current = null;
    };
  }, [userLocation]);

  const handlePostcodeSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!postcode.trim()) return;
      setSearching(true);
      setPostcodeError("");

      const result = await lookupPostcode(postcode);
      if (typeof result === "string") {
        setPostcodeError(
          result === "invalid" ? "Postcode not found — check and try again" : "Network error — please try again",
        );
        setSearching(false);
        return;
      }

      const loc: StoredLocation = {
        latitude: result.latitude,
        longitude: result.longitude,
        postcode: result.postcode,
        adminDistrict: result.adminDistrict,
      };
      saveLocation(result);
      openUserPopupRef.current = true;
      setUserLocation(loc);

      // Auto-match region for the detail panel
      const geojson = geojsonRef.current;
      if (geojson) {
        const match = geojson.features.find((f) => {
          const name = (f.properties?.LAD24NM as string) || (f.properties?.LAD23NM as string) || "";
          return name.toLowerCase() === result.adminDistrict.toLowerCase();
        });
        if (match) setSelectedRegion(match.properties as FrostProperties);
      }

      setSearching(false);
    },
    [postcode],
  );

  if (error) {
    return (
      <p className="text-sm text-tomato" role="alert">
        {error}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Postcode search */}
      {showPostcodeSearch && (
        <>
          <form onSubmit={handlePostcodeSubmit} className="flex gap-2">
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="Enter your postcode"
              aria-label="UK postcode"
              className="flex-1 px-4 py-2.5 rounded-lg border border-earth/15 bg-white text-earth placeholder:text-earth-lighter text-sm focus:outline-none focus:ring-2 focus:ring-allotment/30 focus:border-allotment"
            />
            <button
              type="submit"
              disabled={searching || !postcode.trim()}
              className="px-5 py-2.5 bg-allotment text-white rounded-lg text-sm font-medium hover:bg-allotment-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {searching ? "Searching..." : "Search"}
            </button>
          </form>
          {postcodeError && (
            <p className="text-sm text-tomato" role="alert">
              {postcodeError}
            </p>
          )}
        </>
      )}

      <div
        className={`rounded-2xl overflow-hidden border border-earth/10 relative ${
          compact ? "h-[320px] sm:h-[420px]" : "h-[400px] sm:h-[550px] lg:h-[650px]"
        }`}
      >
        <div ref={mapContainer} className="h-full w-full" />

        {loading && <div className="absolute inset-0 bg-allotment-bg animate-pulse z-[400]" />}

        {/* Layer toggle — top right */}
        <div className="absolute top-4 right-4 z-[500]">
          <LayerToggle activeLayer={activeLayer} onChange={setActiveLayer} />
        </div>

        {/* Legend overlay — bottom left */}
        <div className="absolute bottom-4 left-4 z-[500]">
          <Legend activeLayer={activeLayer} />
        </div>
      </div>

      {/* Region detail panel */}
      {selectedRegion && <RegionPanel region={selectedRegion} onClose={() => setSelectedRegion(null)} />}
    </div>
  );
}
