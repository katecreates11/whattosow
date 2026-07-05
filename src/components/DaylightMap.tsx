"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { FeatureCollection } from "geojson";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import { lookupPostcode } from "@/lib/frost";
import { loadLocation, saveLocation } from "@/lib/location-storage";
import { getSunTimes, formatDaylight, formatTime } from "@/lib/astronomy";
import { summerSolstice } from "@/lib/solstice";

/**
 * A UK map of how much daylight you get on the longest day. Each district is
 * shaded by its daylight length — pale gold in the south, deep gold up north —
 * and clicking anywhere gives that spot's sunrise, sunset and total. All pure
 * client-side maths (no weather API), so it's instant. Searching a postcode
 * also saves the location, re-tuning the arc and swing above via the shared
 * location-updated event.
 */

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

const SOURCE = "daylight-zones";
const FILL_LAYER = "daylight-fill";
const LINE_LAYER = "daylight-line";

interface DistrictProps {
  LAD24NM?: string;
  LAD23NM?: string;
  centroidLat?: number;
  centroidLng?: number;
  __daylight?: number;
  __id?: number;
  [key: string]: unknown;
}

interface Reading {
  name: string;
  daylight: string;
  sunrise: string;
  sunset: string;
  you: boolean;
}

function readingAt(lat: number, lng: number, name: string, you = false): Reading {
  const t = getSunTimes(summerSolstice(), lat, lng);
  return {
    name,
    daylight: formatDaylight(t.daylightMinutes),
    sunrise: formatTime(t.sunrise),
    sunset: formatTime(t.sunset),
    you,
  };
}

function DaylightDetail({ r, onClose }: { r: Reading; onClose: () => void }) {
  return (
    <div role="dialog" aria-label={`Daylight for ${r.name}`} className="bg-white rounded-2xl border border-earth/10 shadow-lg overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between bg-amber">
        <div>
          <p className="text-white/80 font-mono text-[10px] uppercase tracking-[0.16em]">On the longest day</p>
          <h3 className="text-white font-semibold text-lg leading-tight">
            {r.you ? `Your spot — ${r.name}` : r.name}
          </h3>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors" aria-label="Close panel">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-5 flex items-end gap-8">
        <div>
          <div className="font-serif text-4xl text-earth leading-none">{r.daylight}</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-earth-lighter mt-1.5">of daylight</div>
        </div>
        <div className="flex gap-6">
          <div>
            <div className="font-serif text-xl text-earth leading-none">{r.sunrise}</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-earth-lighter mt-1">sunrise</div>
          </div>
          <div>
            <div className="font-serif text-xl text-earth leading-none">{r.sunset}</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-earth-lighter mt-1">sunset</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-md text-xs text-earth">
      <p className="font-semibold mb-2">Daylight on the longest day</p>
      <div className="h-2.5 w-40 rounded-sm" style={{ background: "linear-gradient(90deg,#F4E3C2,#E2A64A,#A9741B)" }} />
      <div className="flex justify-between mt-1 font-mono text-[10px] text-earth-light">
        <span>~16h · south</span>
        <span>~19h · north</span>
      </div>
    </div>
  );
}

export default function DaylightMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const hoveredId = useRef<number | null>(null);
  const districtById = useRef<Map<number, DistrictProps>>(new Map());

  const [ready, setReady] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [selected, setSelected] = useState<Reading | null>(null);
  const [postcode, setPostcode] = useState("");
  const [postcodeError, setPostcodeError] = useState("");
  const [searching, setSearching] = useState(false);

  function placeMarker(map: mapboxgl.Map, lng: number, lat: number) {
    if (userMarkerRef.current) userMarkerRef.current.remove();
    const el = document.createElement("div");
    el.innerHTML = `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="#3B2F28"/>
      <circle cx="14" cy="14" r="6" fill="white" fill-opacity="0.9"/></svg>`;
    userMarkerRef.current = new mapboxgl.Marker({ element: el, anchor: "bottom" }).setLngLat([lng, lat]).addTo(map);
  }

  useEffect(() => {
    if (!MAPBOX_TOKEN || mapRef.current || !mapContainer.current) return;
    mapboxgl.accessToken = MAPBOX_TOKEN;
    const saved = loadLocation();
    let map: mapboxgl.Map;
    try {
      // Always open framed on the whole UK (even with a saved postcode).
      map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: UK_CENTER,
        zoom: 4.6,
        minZoom: 3,
        maxZoom: 14,
        maxBounds: UK_MAX_BOUNDS,
        scrollZoom: false,
        attributionControl: true,
      });
    } catch {
      setDataError(true);
      return;
    }
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
            const t = getSunTimes(summerSolstice(), p.centroidLat ?? 54, p.centroidLng ?? -2);
            p.__daylight = t.daylightMinutes;
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
              // amber shading by daylight minutes (≈16h south → ≈19h far north)
              "fill-color": ["interpolate", ["linear"], ["get", "__daylight"], 955, "#F4E3C2", 1050, "#E2A64A", 1145, "#A9741B"],
              "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.95, 0.78],
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
              popup.setLngLat(e.lngLat).setHTML(`<strong>${name}</strong><br/><strong>${formatDaylight(props.__daylight ?? 0)}</strong> of daylight`).addTo(map);
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
            if (props) {
              const name = props.LAD24NM || props.LAD23NM || "This area";
              setSelected(readingAt(props.centroidLat ?? 54, props.centroidLng ?? -2, name));
            }
          });

          // Frame the whole UK and lock that as the zoom-out floor.
          const cam = map.cameraForBounds(UK_FIT_BOUNDS, { padding: 16 });
          if (cam && typeof cam.zoom === "number") map.setMinZoom(cam.zoom - 0.15);
          map.fitBounds(UK_FIT_BOUNDS, { padding: 16, animate: false });
          setReady(true);
        })
        .catch(() => {
          setDataError(true);
          setReady(true);
        });
    });

    if (saved) placeMarker(map, saved.longitude, saved.latitude);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const handlePostcodeSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode.trim()) return;
    setSearching(true);
    setPostcodeError("");
    const result = await lookupPostcode(postcode);
    if (typeof result === "string") {
      setPostcodeError("Postcode not found — check and try again");
      setSearching(false);
      return;
    }
    saveLocation(result); // re-tunes the arc + swing above too
    const map = mapRef.current;
    if (map) {
      map.flyTo({ center: [result.longitude, result.latitude], zoom: 8.5, duration: 1200 });
      placeMarker(map, result.longitude, result.latitude);
    }
    setSelected(readingAt(result.latitude, result.longitude, result.adminDistrict || "your area", true));
    setSearching(false);
  }, [postcode]);

  if (!MAPBOX_TOKEN) return null;

  if (dataError) {
    return (
      <div className="border border-earth/10 bg-allotment-bg rounded-2xl p-8 text-center">
        <p className="font-serif text-lg text-earth mb-1">Can&apos;t load the map right now</p>
        <p className="text-sm text-earth-light">Please try again shortly.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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

      <div className="rounded-2xl overflow-hidden border border-earth/10 relative h-[420px] sm:h-[560px]">
        <div ref={mapContainer} className="h-full w-full" />
        {!ready && <div className="absolute inset-0 bg-allotment-bg animate-pulse z-[400]" />}
        <div className="absolute bottom-4 left-4 z-[500]">
          <Legend />
        </div>
      </div>

      {selected && <DaylightDetail r={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
