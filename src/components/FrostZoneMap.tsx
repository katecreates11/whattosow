"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Feature, FeatureCollection, Geometry } from "geojson";

const STORAGE_KEY = "whattosow_location";

interface FrostProperties {
  LAD24NM?: string;    // LAD name
  LAD23NM?: string;    // older format
  frostDayOfYear: number;
  frostDate: string;
  [key: string]: unknown;
}

interface StoredLocation {
  latitude: number;
  longitude: number;
  postcode: string;
  adminDistrict: string;
}

// Colour scale: green (mild, early frost end) → blue (cold, late frost)
// Using site palette tones
function frostColor(dayOfYear: number): string {
  // Range roughly 85 (late March) to 168 (mid June)
  const min = 85;
  const max = 168;
  const t = Math.max(0, Math.min(1, (dayOfYear - min) / (max - min)));

  // Green → Teal → Blue gradient
  const colors = [
    [123, 179, 105], // leaf green (#7BB369)
    [0, 162, 155],   // teal
    [72, 133, 247],  // beacon blue (#4885F7)
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

function SetView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
}

function Legend() {
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
            <div
              className="h-3 rounded-sm"
              style={{ backgroundColor: frostColor(s.day) }}
            />
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

export default function FrostZoneMap() {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);
  const [userLocation, setUserLocation] = useState<StoredLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load user location
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

    // Fetch frost zones GeoJSON
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

  if (loading) {
    return <div className="h-[600px] bg-allotment-bg rounded-2xl animate-pulse" />;
  }

  if (error) {
    return <p className="text-sm text-tomato-light">{error}</p>;
  }

  // Compute user's frost date for popup
  let userFrostDate = "";
  if (userLocation) {
    let dayOfYear = 100 + (userLocation.latitude - 50) * 6;
    const lng = userLocation.longitude;
    if (lng < -4.5) dayOfYear -= 5;
    else if (lng < -3) dayOfYear -= 3;
    else if (lng < -1) dayOfYear -= 1;
    else if (lng > 0.5) dayOfYear += 2;
    dayOfYear = Math.max(85, Math.min(168, Math.round(dayOfYear)));
    const d = new Date(new Date().getFullYear(), 0);
    d.setDate(dayOfYear);
    userFrostDate = d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl overflow-hidden border border-earth/10 relative" style={{ height: 600 }}>
        <MapContainer
          center={[54.5, -2.5]}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            opacity={0.3}
          />
          {geojson && (
            <GeoJSON
              data={geojson}
              style={(feature?: Feature<Geometry, FrostProperties>) => ({
                fillColor: feature?.properties
                  ? frostColor(feature.properties.frostDayOfYear)
                  : "#ccc",
                fillOpacity: 0.7,
                weight: 1,
                color: "#fff",
                opacity: 0.6,
              })}
              onEachFeature={(feature: Feature<Geometry, FrostProperties>, layer: L.Layer) => {
                const props = feature.properties;
                const name = props.LAD24NM || props.LAD23NM || "Unknown area";
                (layer as L.Path).bindPopup(
                  `<strong>${name}</strong><br/>Estimated last frost: <strong>${props.frostDate}</strong>`
                );
                (layer as L.Path).on({
                  mouseover: (e: L.LeafletEvent) => {
                    const target = e.target as L.Path;
                    target.setStyle({ fillOpacity: 0.9, weight: 2 });
                  },
                  mouseout: (e: L.LeafletEvent) => {
                    const target = e.target as L.Path;
                    target.setStyle({ fillOpacity: 0.7, weight: 1 });
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
              <SetView
                center={[userLocation.latitude, userLocation.longitude]}
                zoom={8}
              />
            </>
          )}
        </MapContainer>

        {/* Legend overlay */}
        <div className="absolute bottom-4 left-4 z-[1000]">
          <Legend />
        </div>
      </div>
    </div>
  );
}
