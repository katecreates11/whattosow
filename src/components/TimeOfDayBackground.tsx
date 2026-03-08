"use client";

import { useState, useEffect } from "react";

function getMeshClass(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 8) return "mesh-dawn";
  if (hour >= 8 && hour < 12) return "mesh-midday";
  if (hour >= 12 && hour < 17) return "mesh-afternoon";
  if (hour >= 17 && hour < 20) return "mesh-dusk";
  return "mesh-night";
}

function getTimeLabel(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 8) return "Dawn";
  if (hour >= 8 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 17) return "Afternoon";
  if (hour >= 17 && hour < 20) return "Dusk";
  return "Night";
}

export default function TimeOfDayBackground({ children }: { children: React.ReactNode }) {
  const [meshClass, setMeshClass] = useState("mesh-midday");
  const [timeLabel, setTimeLabel] = useState("");

  useEffect(() => {
    setMeshClass(getMeshClass());
    setTimeLabel(getTimeLabel());
  }, []);

  return (
    <div className={`${meshClass} px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden`}>
      {timeLabel && (
        <span className="absolute top-4 right-6 sm:right-10 lg:right-16 text-[10px] font-bold tracking-[0.2em] uppercase text-white/25">
          {timeLabel}
        </span>
      )}
      {children}
    </div>
  );
}
