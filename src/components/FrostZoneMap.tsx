"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { lookupPostcode, getFrostForecast, calculateLastFrostDate, calculateFirstAutumnFrostDate } from "@/lib/frost";
import { crops, getCropsByAction, getMinSoilTemp } from "@/data/crops";
import type { FrostForecast } from "@/lib/frost";
import RegionPanel from "@/components/RegionPanel";

const STORAGE_KEY = "whattosow_location";

// UK bounds — prevent panning to Europe
const UK_BOUNDS: L.LatLngBoundsExpression = [
  [49.5, -8.5], // SW
  [61.0, 2.5],  // NE
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
  [key: string]: unknown;
}

interface StoredLocation {
  latitude: number;
  longitude: number;
  postcode: string;
  adminDistrict: string;
}

type ActiveLayer = "spring" | "autumn" | "season";

// === Colour scales ===

// Spring: green → teal → blue (day 85–168)
function springColor(dayOfYear: number): string {
  const min = 85;
  const max = 168;
  const t = Math.max(0, Math.min(1, (dayOfYear - min) / (max - min)));
  const colors = [
    [123, 179, 105], // leaf green
    [0, 162, 155],   // teal
    [72, 133, 247],  // beacon blue
    [123, 167, 194], // frost
  ];
  const idx = t * (colors.length - 1);
  const lower = Math.floor(idx);
  const upper = Math.min(lower + 1, colors.length - 1);
  const frac = idx - lower;
  const r = Math.round(colors[lower][0] + (colors[upper][0] - colors[lower][0]) * frac);
  const g = Math.round(colors[lower][1] + (colors[upper][1] - colors[lower][1]) * frac);
  const b = Math.round(colors[lower][2] + (colors[upper][2] - colors[lower][2]) * frac);
  return `rgb(${r},${g},${b})`;
}

// Autumn: amber → tomato → frost-blue (day 245–310)
function autumnColor(dayOfYear: number): string {
  const min = 245;
  const max = 310;
  const t = Math.max(0, Math.min(1, (dayOfYear - min) / (max - min)));
  const colors = [
    [212, 148, 58],  // amber (#D4943A)
    [201, 84, 62],   // tomato (#C9543E)
    [123, 167, 194], // frost (#7BA7C2)
  ];
  const idx = t * (colors.length - 1);
  const lower = Math.floor(idx);
  const upper = Math.min(lower + 1, colors.length - 1);
  const frac = idx - lower;
  const r = Math.round(colors[lower][0] + (colors[upper][0] - colors[lower][0]) * frac);
  const g = Math.round(colors[lower][1] + (colors[upper][1] - colors[lower][1]) * frac);
  const b = Math.round(colors[lower][2] + (colors[upper][2] - colors[lower][2]) * frac);
  return `rgb(${r},${g},${b})`;
}

// Growing season: frost-blue → leaf-green (120–220 days)
function seasonColor(days: number): string {
  const min = 120;
  const max = 220;
  const t = Math.max(0, Math.min(1, (days - min) / (max - min)));
  const colors = [
    [123, 167, 194], // frost (#7BA7C2)
    [0, 162, 155],   // teal
    [123, 179, 105], // leaf green (#7BB369)
  ];
  const idx = t * (colors.length - 1);
  const lower = Math.floor(idx);
  const upper = Math.min(lower + 1, colors.length - 1);
  const frac = idx - lower;
  const r = Math.round(colors[lower][0] + (colors[upper][0] - colors[lower][0]) * frac);
  const g = Math.round(colors[lower][1] + (colors[upper][1] - colors[lower][1]) * frac);
  const b = Math.round(colors[lower][2] + (colors[upper][2] - colors[lower][2]) * frac);
  return `rgb(${r},${g},${b})`;
}

function getColor(layer: ActiveLayer, props: FrostProperties): string {
  if (layer === "autumn" && props.autumnFrostDayOfYear != null) {
    return autumnColor(props.autumnFrostDayOfYear);
  }
  if (layer === "season" && props.growingSeasonDays != null) {
    return seasonColor(props.growingSeasonDays);
  }
  return springColor(props.frostDayOfYear);
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

// User location marker
const userIcon = L.divIcon({
  className: "",
  iconSize: [28, 36],
  iconAnchor: [14, 36],
  popupAnchor: [0, -36],
  html: `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="#D4943A"/>
    <circle cx="14" cy="14" r="6" fill="white" fill-opacity="0.9"/>
  </svg>`,
});

function MapFlyTo({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [map, center, zoom]);
  return null;
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
          className={`px-3 py-2 font-medium transition-colors ${
            activeLayer === key
              ? "bg-allotment text-white"
              : "text-earth hover:bg-allotment-bg"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function FrostZoneMap() {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);
  const [userLocation, setUserLocation] = useState<StoredLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeLayer, setActiveLayer] = useState<ActiveLayer>("spring");
  const [selectedRegion, setSelectedRegion] = useState<FrostProperties | null>(null);
  const [postcode, setPostcode] = useState("");
  const [postcodeError, setPostcodeError] = useState("");
  const [searching, setSearching] = useState(false);
  const [flyTarget, setFlyTarget] = useState<{ center: [number, number]; zoom: number } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed?.latitude === "number" && typeof parsed?.longitude === "number") {
          setUserLocation(parsed);
        }
      }
    } catch {
      // ignore
    }

    fetch("/data/frost-zones.geojson")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load frost zone data");
        return res.json();
      })
      .then((data) => {
        setGeojson(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load frost zone data. Please try refreshing.");
        setLoading(false);
      });
  }, []);

  const handlePostcodeSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode.trim()) return;
    setSearching(true);
    setPostcodeError("");

    const result = await lookupPostcode(postcode);
    if (typeof result === "string") {
      setPostcodeError(result === "invalid" ? "Postcode not found — check and try again" : "Network error — please try again");
      setSearching(false);
      return;
    }

    const loc: StoredLocation = {
      latitude: result.latitude,
      longitude: result.longitude,
      postcode: result.postcode,
      adminDistrict: result.adminDistrict,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
    setUserLocation(loc);
    setFlyTarget({ center: [result.latitude, result.longitude], zoom: 9 });

    // Auto-match region
    if (geojson) {
      const match = geojson.features.find((f) => {
        const name = f.properties?.LAD24NM || f.properties?.LAD23NM || "";
        return name.toLowerCase() === result.adminDistrict.toLowerCase();
      });
      if (match) {
        setSelectedRegion(match.properties as FrostProperties);
      }
    }

    setSearching(false);
  }, [postcode, geojson]);

  // Compute user's frost date for popup
  let userFrostDate = "";
  if (userLocation) {
    const d = calculateLastFrostDate(userLocation.latitude, userLocation.longitude);
    userFrostDate = d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
  }

  if (loading) {
    return <div className="h-[400px] sm:h-[550px] lg:h-[650px] bg-allotment-bg rounded-2xl animate-pulse" />;
  }

  if (error) {
    return <p className="text-sm text-tomato-light">{error}</p>;
  }

  return (
    <div className="space-y-4">
      {/* Postcode search */}
      <form onSubmit={handlePostcodeSubmit} className="flex gap-2">
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Enter your postcode"
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
      {postcodeError && <p className="text-sm text-tomato">{postcodeError}</p>}

      <div className="rounded-2xl overflow-hidden border border-earth/10 relative h-[400px] sm:h-[550px] lg:h-[650px]">
        <MapContainer
          center={[54.5, -2.5]}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
          maxBounds={UK_BOUNDS}
          maxBoundsViscosity={1.0}
          minZoom={5}
          maxZoom={12}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            opacity={0.4}
          />
          {geojson && (
            <GeoJSON
              key={activeLayer}
              data={geojson}
              style={(feature?: Feature<Geometry, FrostProperties>) => ({
                fillColor: feature?.properties
                  ? getColor(activeLayer, feature.properties)
                  : "#ccc",
                fillOpacity: 0.7,
                weight: 1,
                color: "#fff",
                opacity: 0.6,
              })}
              onEachFeature={(feature: Feature<Geometry, FrostProperties>, layer: L.Layer) => {
                const props = feature.properties;
                // Hover tooltip
                (layer as L.Path).bindTooltip(
                  getTooltipText(activeLayer, props),
                  { sticky: true, className: "frost-tooltip" }
                );
                // Hover highlight
                (layer as L.Path).on({
                  mouseover: (e: L.LeafletEvent) => {
                    const target = e.target as L.Path;
                    target.setStyle({ fillOpacity: 0.9, weight: 2 });
                  },
                  mouseout: (e: L.LeafletEvent) => {
                    const target = e.target as L.Path;
                    target.setStyle({ fillOpacity: 0.7, weight: 1 });
                  },
                  click: () => {
                    setSelectedRegion(props);
                  },
                });
              }}
            />
          )}
          {userLocation && (
            <>
              <Marker
                position={[userLocation.latitude, userLocation.longitude]}
                icon={userIcon}
              >
                <Popup>
                  <strong>Your location</strong> ({userLocation.postcode})
                  <br />
                  Estimated last frost: <strong>{userFrostDate}</strong>
                </Popup>
              </Marker>
              {!flyTarget && (
                <MapFlyTo
                  center={[userLocation.latitude, userLocation.longitude]}
                  zoom={8}
                />
              )}
            </>
          )}
          {flyTarget && <MapFlyTo center={flyTarget.center} zoom={flyTarget.zoom} />}
        </MapContainer>

        {/* Layer toggle — top right */}
        <div className="absolute top-4 right-4 z-[1000]">
          <LayerToggle activeLayer={activeLayer} onChange={setActiveLayer} />
        </div>

        {/* Legend overlay — bottom left */}
        <div className="absolute bottom-4 left-4 z-[1000]">
          <Legend activeLayer={activeLayer} />
        </div>
      </div>

      {/* Region detail panel */}
      {selectedRegion && (
        <RegionPanel
          region={selectedRegion}
          onClose={() => setSelectedRegion(null)}
        />
      )}
    </div>
  );
}
