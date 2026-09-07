export type SeasonalRoutePolicy = {
  route: string;
  cadence: "hourly" | "existing-live-policy";
  reason: string;
};

export const SEASONAL_ROUTE_POLICY: SeasonalRoutePolicy[] = [
  { route: "/", cadence: "hourly", reason: "Dateline, weekly crop edit, monthly kit and seasonal links." },
  { route: "/sow", cadence: "hourly", reason: "Current sowing answer, week label and monthly kit." },
  { route: "/sow-in/[city]", cadence: "hourly", reason: "City sowing month, metadata and schema date." },
  { route: "/print", cadence: "hourly", reason: "Current month highlight and calendar year." },
  { route: "/pins", cadence: "hourly", reason: "Current month pin selection." },
  { route: "/crops/[slug]", cadence: "hourly", reason: "Current sowing verdict and crop-now answer." },
  { route: "/crops/[slug]/[variety]", cadence: "hourly", reason: "Current sowing-status label for the variety." },
  { route: "/grow-your-christmas-dinner", cadence: "hourly", reason: "Countdown and in-season Christmas plate." },
  { route: "/guides", cadence: "existing-live-policy", reason: "Already refreshes hourly for weather-led guide relevance." },
  { route: "/api/blight-map", cadence: "existing-live-policy", reason: "Six-hour weather API cache remains the live-data authority." },
  { route: "/still-time/opengraph-image", cadence: "hourly", reason: "Social-preview 'N crops you can still sow' count." },
];
