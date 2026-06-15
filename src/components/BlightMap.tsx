"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { FeatureCollection } from "geojson";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import { lookupPostcode } from "@/lib/frost";
import { loadLocation, saveLocation } from "@/lib/location-storage";
import { assessHutton, type BlightLevel } from "@/lib/blight";
import AffiliateLink from "@/components/AffiliateLink";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const UK_MAX_BOUNDS: mapboxgl.LngLatBoundsLike = [
  [-11.0, 49.0],
  [4.0, 61.5],
];
const UK_CENTER: [number, number] = [-2.6, 54.5];
const UK_FIT_BOUNDS: mapboxgl.LngLatBoundsLike = [
  [-8.2, 49.8],
  [2.0, 60.9],
];

const LEVEL_COLOR: Record<BlightLevel, string> = {
  high: "#C9543E", // tomato
  building: "#D4943A", // amber
  low: "#7BB369", // leaf
};
const LEVEL_LABEL: Record<BlightLevel, string> = {
  high: "High risk",
  building: "Risk building",
  low: "Low risk",
};

interface BlightDay {
  date: string;
  minTemp: number;
  humidHours: number;
  qualifies: boolean;
  isToday: boolean;
}
interface BlightPoint {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  level: BlightLevel;
  period: { start: string; end: string } | null;
  forecast: boolean;
  days: BlightDay[];
}

interface DistrictProps {
  LAD24NM?: string;
  LAD23NM?: string;
  centroidLat?: number;
  centroidLng?: number;
  __blight?: string;
  __level?: BlightLevel;
  __pointSlug?: string;
  __id?: number;
  [key: string]: unknown;
}

const SOURCE = "blight-zones";
const FILL_LAYER = "blight-fill";
const LINE_LAYER = "blight-line";

function nearestPoint(lat: number, lng: number, points: BlightPoint[]): BlightPoint {
  let best = points[0];
  let bestD = Infinity;
  const cosLat = Math.cos((lat * Math.PI) / 180);
  for (const p of points) {
    const dlat = lat - p.lat;
    const dlng = (lng - p.lng) * cosLat;
    const d = dlat * dlat + dlng * dlng;
    if (d < bestD) {
      bestD = d;
      best = p;
    }
  }
  return best;
}

function fmtDay(date: string): string {
  return new Date(date + "T00:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

// === Selected-region detail panel ===
function BlightDetail({ point, onClose }: { point: BlightPoint; onClose: () => void }) {
  const color = LEVEL_COLOR[point.level];
  return (
    <div role="dialog" aria-label={`Blight detail for ${point.name}`} className="bg-white rounded-2xl border border-earth/10 shadow-lg overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between" style={{ backgroundColor: color }}>
        <div>
          <p className="text-white/80 font-mono text-[10px] uppercase tracking-[0.16em]">{LEVEL_LABEL[point.level]}</p>
          <h3 className="text-white font-semibold text-lg leading-tight">
            {point.slug === "your-spot" ? `Your spot — ${point.name}` : `Around ${point.name}`}
          </h3>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors" aria-label="Close panel">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-5">
        <p className="text-sm text-earth-light leading-relaxed mb-4">
          {point.level === "high" && point.forecast && "A Hutton Period — two days warm and humid enough for late blight — is forecast here. Improve airflow and have your plan ready."}
          {point.level === "high" && !point.forecast && "A Hutton Period has been recorded near here. Check tomatoes and potatoes now, bin (never compost) any affected leaves, and keep water off the foliage."}
          {point.level === "building" && "Warm and humid enough to watch — not a full Hutton Period yet, but heading that way. Keep an eye on your tomatoes and potatoes."}
          {point.level === "low" && "Conditions near here aren't currently favourable for late blight."}
        </p>
        {point.days.length > 0 && (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth-lighter mb-2">
              A day counts when it&apos;s 10&deg;C+ overnight with 6+ hours at 90% humidity
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
              {point.days.map((d) => (
                <div
                  key={d.date}
                  className={`p-2 border text-center ${d.qualifies ? "border-tomato/40 bg-tomato-bg" : "border-earth/10"} ${d.isToday ? "ring-1 ring-allotment" : ""}`}
                >
                  <div className="font-mono text-[9px] uppercase tracking-[0.04em] text-earth-lighter">{fmtDay(d.date).split(" ")[0]}</div>
                  <div className="font-serif text-base text-earth">{d.minTemp}&deg;</div>
                  <div className="font-mono text-[9px] text-earth-light">{d.humidHours}h</div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          {point.level === "high" || point.level === "building" ? (
            <AffiliateLink
              href="https://www.suttons.co.uk/garden-equipment/all/frost-protection-fleece_MH4728"
              product="frost protection fleece"
              type="gear"
              merchant="suttons"
              className="font-mono text-[11px] uppercase tracking-[0.08em] text-rust border-b border-rust/40 hover:text-earth transition-colors"
            >
              Protect your plants &rarr;
            </AffiliateLink>
          ) : (
            <a href="#resistant-varieties" className="font-mono text-[11px] uppercase tracking-[0.08em] text-rust border-b border-rust/40 hover:text-earth transition-colors">
              Resistant varieties &rarr;
            </a>
          )}
          <a href="/guides/tomato-blight" className="font-mono text-[11px] uppercase tracking-[0.08em] text-allotment border-b border-amber">
            Hutton Criteria &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

function Legend() {
  const levels: BlightLevel[] = ["low", "building", "high"];
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-md text-xs text-earth">
      <p className="font-semibold mb-2">Blight risk this week</p>
      <div className="space-y-1">
        {levels.map((l) => (
          <div key={l} className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: LEVEL_COLOR[l] }} />
            <span>{LEVEL_LABEL[l]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BlightMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const hoveredId = useRef<number | null>(null);
  const districtById = useRef<Map<number, DistrictProps>>(new Map());
  const pointBySlug = useRef<Map<string, BlightPoint>>(new Map());

  const [points, setPoints] = useState<BlightPoint[] | null>(null);
  const [loadedAt, setLoadedAt] = useState("");
  const [dataError, setDataError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BlightPoint | null>(null);
  const [postcode, setPostcode] = useState("");
  const [postcodeError, setPostcodeError] = useState("");
  const [searching, setSearching] = useState(false);

  // Fetch the national sample grid once
  useEffect(() => {
    fetch("/api/blight-map")
      .then((res) => {
        if (!res.ok) throw new Error("blight api");
        return res.json();
      })
      .then((data: { points: BlightPoint[] }) => {
        if (!data.points?.length) throw new Error("no points");
        setPoints(data.points);
        setLoadedAt(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
        data.points.forEach((p) => pointBySlug.current.set(p.slug, p));
      })
      .catch(() => setDataError(true));
  }, []);

  // Build the map once we have the sample points
  useEffect(() => {
    if (!MAPBOX_TOKEN || !points || mapRef.current || !mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    const saved = loadLocation();
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: saved ? [saved.longitude, saved.latitude] : UK_CENTER,
      zoom: saved ? 7.5 : 4.6,
      minZoom: 4,
      maxZoom: 15,
      maxBounds: UK_MAX_BOUNDS,
      scrollZoom: false,
      attributionControl: true,
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-left");
    map.on("click", () => map.scrollZoom.enable());
    map.getCanvas().addEventListener("mouseleave", () => map.scrollZoom.disable());

    const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, className: "frost-tooltip", offset: 8 });
    popupRef.current = popup;

    map.on("load", () => {
      fetch("/data/frost-zones.topojson")
        .then((res) => res.json())
        .then((topo: Topology) => {
          const objectName = Object.keys(topo.objects)[0];
          const geojson = feature(topo, topo.objects[objectName]) as unknown as FeatureCollection;

          geojson.features.forEach((f, i) => {
            const p = (f.properties || {}) as DistrictProps;
            const near = nearestPoint(p.centroidLat ?? 54, p.centroidLng ?? -2, points);
            p.__level = near.level;
            p.__blight = LEVEL_COLOR[near.level];
            p.__pointSlug = near.slug;
            p.__id = i;
            f.id = i;
            districtById.current.set(i, p);
          });

          map.addSource(SOURCE, { type: "geojson", data: geojson });
          map.addLayer({
            id: FILL_LAYER,
            type: "fill",
            source: SOURCE,
            paint: {
              "fill-color": ["get", "__blight"],
              "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.9, 0.7],
            },
          });
          map.addLayer({
            id: LINE_LAYER,
            type: "line",
            source: SOURCE,
            paint: {
              "line-color": "#ffffff",
              "line-width": ["case", ["boolean", ["feature-state", "hover"], false], 2, 0.6],
              "line-opacity": 0.6,
            },
          });

          map.on("mousemove", FILL_LAYER, (e) => {
            if (!e.features?.length) return;
            map.getCanvas().style.cursor = "pointer";
            const id = e.features[0].id as number;
            if (hoveredId.current !== null && hoveredId.current !== id) {
              map.setFeatureState({ source: SOURCE, id: hoveredId.current }, { hover: false });
            }
            hoveredId.current = id;
            map.setFeatureState({ source: SOURCE, id }, { hover: true });
            const props = districtById.current.get(id);
            if (props) {
              const name = props.LAD24NM || props.LAD23NM || "This area";
              popup
                .setLngLat(e.lngLat)
                .setHTML(`<strong>${name}</strong><br/>Blight risk: <strong>${LEVEL_LABEL[props.__level ?? "low"]}</strong>`)
                .addTo(map);
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
          map.on("click", FILL_LAYER, (e) => {
            if (!e.features?.length) return;
            const props = districtById.current.get(e.features[0].id as number);
            if (props?.__pointSlug) {
              const pt = pointBySlug.current.get(props.__pointSlug);
              if (pt) setSelected(pt);
            }
          });

          if (!saved) map.fitBounds(UK_FIT_BOUNDS, { padding: 16, animate: false });
          setLoading(false);
        })
        .catch(() => {
          setDataError(true);
          setLoading(false);
        });
    });

    if (saved) {
      const el = document.createElement("div");
      el.innerHTML = `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="#3B2F28"/>
        <circle cx="14" cy="14" r="6" fill="white" fill-opacity="0.9"/>
      </svg>`;
      userMarkerRef.current = new mapboxgl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([saved.longitude, saved.latitude])
        .addTo(map);
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [points]);

  const handlePostcodeSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!postcode.trim() || !points) return;
      setSearching(true);
      setPostcodeError("");
      const result = await lookupPostcode(postcode);
      if (typeof result === "string") {
        setPostcodeError(result === "invalid" ? "Postcode not found — check and try again" : "Network error — please try again");
        setSearching(false);
        return;
      }
      saveLocation(result);

      const map = mapRef.current;
      if (map) {
        map.flyTo({ center: [result.longitude, result.latitude], zoom: 9.5, duration: 1200 });
        if (userMarkerRef.current) userMarkerRef.current.remove();
        const el = document.createElement("div");
        el.innerHTML = `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="#3B2F28"/>
          <circle cx="14" cy="14" r="6" fill="white" fill-opacity="0.9"/>
        </svg>`;
        userMarkerRef.current = new mapboxgl.Marker({ element: el, anchor: "bottom" })
          .setLngLat([result.longitude, result.latitude])
          .addTo(map);
      }

      // Pin-sharp: read blight at the exact postcode coords, not the nearest sample
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}` +
            `&hourly=temperature_2m,relative_humidity_2m&past_days=2&forecast_days=5&timezone=Europe/London`,
        );
        if (!res.ok) throw new Error("meteo");
        const h = (await res.json()).hourly;
        const a = assessHutton(h.time, h.temperature_2m, h.relative_humidity_2m);
        setSelected({
          slug: "your-spot",
          name: result.adminDistrict || "your area",
          lat: result.latitude,
          lng: result.longitude,
          level: a.level,
          period: a.period,
          forecast: a.forecast,
          days: a.days.map((d) => ({
            date: d.date,
            minTemp: d.minTemp,
            humidHours: d.humidHours,
            qualifies: d.qualifies,
            isToday: d.isToday,
          })),
        });
      } catch {
        // Fall back to the nearest cached sample point
        setSelected(nearestPoint(result.latitude, result.longitude, points));
      }
      setSearching(false);
    },
    [postcode, points],
  );

  // National summary headline
  const summary = points
    ? points.reduce(
        (acc, p) => {
          acc[p.level]++;
          return acc;
        },
        { high: 0, building: 0, low: 0 } as Record<BlightLevel, number>,
      )
    : null;

  if (dataError && !points) {
    return (
      <div className="border border-earth/10 bg-allotment-bg rounded-2xl p-8 text-center">
        <p className="font-serif text-lg text-earth mb-1">Can&apos;t read blight conditions right now</p>
        <p className="text-sm text-earth-light">The weather service is unavailable — please try again shortly.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {summary && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-earth-lighter">
            Right now across the UK{loadedAt && <span className="normal-case tracking-normal"> · as of {loadedAt}</span>}
          </span>
          {(["high", "building", "low"] as BlightLevel[]).map((l) => (
            <span key={l} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LEVEL_COLOR[l] }} />
              <span className="text-earth"><b>{summary[l]}</b> {LEVEL_LABEL[l].toLowerCase()}</span>
            </span>
          ))}
        </div>
      )}

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
      {postcodeError && <p className="text-sm text-tomato" role="alert">{postcodeError}</p>}

      <div className="rounded-2xl overflow-hidden border border-earth/10 relative h-[400px] sm:h-[550px] lg:h-[650px]">
        <div ref={mapContainer} className="h-full w-full" />
        {loading && <div className="absolute inset-0 bg-allotment-bg animate-pulse z-[400]" />}
        <div className="absolute bottom-4 left-4 z-[500]">
          <Legend />
        </div>
      </div>

      {selected && <BlightDetail point={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
