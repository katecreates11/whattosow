/**
 * Calculate daylight hours for a given date and latitude.
 * Uses the CBM model (Civil twilight excluded — actual sunrise to sunset).
 */
export function getDaylightHours(date: Date, latitude: number): number {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      (24 * 60 * 60 * 1000)
  );

  // Solar declination (radians)
  const declination =
    0.4093 * Math.sin(((2 * Math.PI) / 365) * (dayOfYear - 81));

  // Convert latitude to radians
  const latRad = (latitude * Math.PI) / 180;

  // Hour angle at sunrise/sunset
  const cosHourAngle = -Math.tan(latRad) * Math.tan(declination);

  // Handle polar day / polar night
  if (cosHourAngle < -1) return 24; // midnight sun
  if (cosHourAngle > 1) return 0; // polar night

  const hourAngle = Math.acos(cosHourAngle);

  // Day length in hours
  const dayLength = (2 * hourAngle * 24) / (2 * Math.PI);

  return Math.round(dayLength * 10) / 10;
}

/**
 * Get a human-readable daylight description for gardening context.
 */
export function getDaylightDescription(hours: number): string {
  if (hours >= 16) return "Long days — crops are growing fast";
  if (hours >= 14) return "Plenty of daylight for ripening";
  if (hours >= 12) return "Days are shortening — harvest before growth slows";
  if (hours >= 10) return "Short days — late-season crops need picking soon";
  return "Very short days — growing season is over";
}
