"use client";

import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { fetchNearbyAllotments, type AllotmentSite } from "@/lib/allotments";
import { lookupPostcode, type LocationData } from "@/lib/frost";
import { loadLocation } from "@/lib/location-storage";

// Custom marker icon (Leaflet default icons break with webpack)
function createIcon(color: string) {
  return L.divIcon({
    className: "",
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
    html: `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="${color}"/>
      <circle cx="14" cy="14" r="6" fill="white" fill-opacity="0.9"/>
    </svg>`,
  });
}

let allotmentIcon: L.DivIcon;
let userIcon: L.DivIcon;

function getIcons() {
  if (!allotmentIcon) allotmentIcon = createIcon("#2D5F3E");
  if (!userIcon) userIcon = createIcon("#D4943A");
  return { allotmentIcon, userIcon };
}

function FitBounds({ sites, userLat, userLng }: { sites: AllotmentSite[]; userLat: number; userLng: number }) {
  const map = useMap();

  useEffect(() => {
    const points: [number, number][] = [
      [userLat, userLng],
      ...sites.map((s) => [s.lat, s.lng] as [number, number]),
    ];
    if (points.length > 1) {
      map.fitBounds(L.latLngBounds(points), { padding: [40, 40] });
    } else {
      map.setView([userLat, userLng], 13);
    }
  }, [map, sites, userLat, userLng]);

  return null;
}

export default function AllotmentMap() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [sites, setSites] = useState<AllotmentSite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [postcode, setPostcode] = useState("");
  const [mapReady, setMapReady] = useState(false);

  const search = useCallback(async (loc: LocationData) => {
    setLoading(true);
    setError("");
    try {
      const results = await fetchNearbyAllotments(loc.latitude, loc.longitude);
      setSites(results);
      setLocation(loc);
    } catch {
      setError("Could not search for allotments. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = loadLocation();
    if (saved) {
      setPostcode(saved.postcode);
      search(saved);
    }
    setMapReady(true);
  }, [search]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await lookupPostcode(postcode);
    if (typeof result === "string") {
      setError(
        result === "network"
          ? "Could not reach the postcode service. Check your connection."
          : "Couldn't find that postcode. Please check and try again."
      );
      setLoading(false);
      return;
    }

    search(result);
  }

  if (!mapReady) {
    return <div className="h-[500px] bg-allotment-bg rounded-2xl animate-pulse" />;
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-0 max-w-md">
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value.toUpperCase())}
          placeholder="Your postcode"
          aria-label="UK postcode"
          className="flex-1 px-4 py-3 border border-[#003b44]/20 bg-white text-[#003b44] placeholder:text-[#003b44]/30 focus:outline-none focus:ring-2 focus:ring-[#003b44] focus:border-transparent text-base uppercase tracking-widest"
          autoComplete="postal-code"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[#003b44] text-white font-mono text-xs tracking-[0.1em] uppercase hover:bg-[#006260] focus:outline-none focus:ring-2 focus:ring-[#003b44] focus:ring-offset-2 disabled:opacity-50 transition-colors whitespace-nowrap"
        >
          {loading ? "..." : "Find"}
        </button>
      </form>

      {error && <p className="text-sm text-tomato" role="alert">{error}</p>}

      {location && (
        <>
          <div className="overflow-hidden h-[560px] sm:h-[640px]">
            <MapContainer
              center={[location.latitude, location.longitude]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='Map tiles by <a href="https://stamen.com">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors.'
                url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
                minZoom={1}
                maxZoom={16}
              />
              <Marker position={[location.latitude, location.longitude]} icon={getIcons().userIcon}>
                <Popup>
                  <strong>Your location</strong>
                  <br />
                  {location.adminDistrict}
                </Popup>
              </Marker>
              {sites.map((site) => (
                <Marker key={site.id} position={[site.lat, site.lng]} icon={getIcons().allotmentIcon}>
                  <Popup>
                    <strong>{site.name ?? "Allotment site"}</strong>
                    <br />
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${site.lat},${site.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-allotment underline"
                    >
                      Get directions
                    </a>
                  </Popup>
                </Marker>
              ))}
              <FitBounds sites={sites} userLat={location.latitude} userLng={location.longitude} />
            </MapContainer>
          </div>

          <p className="text-sm text-earth-lighter">
            {sites.length === 0
              ? "No allotments found within 10km of your location."
              : `${sites.length} allotment site${sites.length === 1 ? "" : "s"} found within 10km.`}
          </p>
        </>
      )}
    </div>
  );
}
