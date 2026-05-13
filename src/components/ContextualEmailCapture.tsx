"use client";

import { useState, useEffect, useCallback } from "react";
import EmailCapture from "@/components/EmailCapture";
import { calculateLastFrostDate, formatDateShort, LocationData } from "@/lib/frost";
import { loadLocation } from "@/lib/location-storage";

interface ContextualEmailCaptureProps {
  variant?: "full" | "compact";
  /** Static context — used for crop pages where crop name is known server-side */
  cropName?: string;
}

export default function ContextualEmailCapture({ variant = "full", cropName }: ContextualEmailCaptureProps) {
  const [location, setLocation] = useState<LocationData | null>(null);

  const refreshLocation = useCallback(() => {
    const loc = loadLocation();
    if (loc) setLocation(loc);
  }, []);

  useEffect(() => {
    refreshLocation();
    window.addEventListener("whattosow:location-updated", refreshLocation);
    return () => window.removeEventListener("whattosow:location-updated", refreshLocation);
  }, [refreshLocation]);

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
