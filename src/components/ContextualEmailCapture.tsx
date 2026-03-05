"use client";

import { useState, useEffect, useCallback } from "react";
import EmailCapture from "@/components/EmailCapture";
import { calculateLastFrostDate, formatDateShort, LocationData } from "@/lib/frost";

const STORAGE_KEY = "whattosow_location";

interface ContextualEmailCaptureProps {
  variant?: "full" | "compact";
  /** Static context — used for crop pages where crop name is known server-side */
  cropName?: string;
}

export default function ContextualEmailCapture({ variant = "full", cropName }: ContextualEmailCaptureProps) {
  const [location, setLocation] = useState<LocationData | null>(null);

  const loadLocation = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLocation(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    loadLocation();
    window.addEventListener("whattosow:location-updated", loadLocation);
    return () => window.removeEventListener("whattosow:location-updated", loadLocation);
  }, [loadLocation]);

  const context = cropName
    ? { cropName }
    : location
      ? {
          district: location.adminDistrict,
          frostDate: formatDateShort(calculateLastFrostDate(location.latitude, location.longitude)),
        }
      : undefined;

  return <EmailCapture variant={variant} context={context} />;
}
