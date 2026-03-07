/**
 * Generate an .ics calendar file for a harvest day.
 */
export function generateICS(options: {
  date: Date;
  cropNames: string[];
  locationName?: string;
  weatherNote?: string;
}): string {
  const { date, cropNames, locationName, weatherNote } = options;

  // Format date as all-day event (YYYYMMDD)
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const dateStr = `${y}${m}${d}`;

  // Next day for DTEND (all-day events need day after)
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  const ny = nextDay.getFullYear();
  const nm = String(nextDay.getMonth() + 1).padStart(2, "0");
  const nd = String(nextDay.getDate()).padStart(2, "0");
  const endStr = `${ny}${nm}${nd}`;

  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}00`;

  const cropList = cropNames.join(", ");
  const title = `Harvest day: ${cropList}`;

  let description = `Time to harvest: ${cropList}.`;
  if (weatherNote) {
    description += `\\n\\n${weatherNote}`;
  }
  description += `\\n\\nPlanned with whattosow.co.uk`;

  const location = locationName ? `LOCATION:${escapeICS(locationName)}\n` : "";

  // Set reminder for 1 day before
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//What To Sow//Harvest Planner//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART;VALUE=DATE:${dateStr}`,
    `DTEND;VALUE=DATE:${endStr}`,
    `DTSTAMP:${stamp}`,
    `UID:harvest-${dateStr}-${Date.now()}@whattosow.co.uk`,
    `SUMMARY:${escapeICS(title)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    location,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:Tomorrow is harvest day! ${cropList} should be ready.`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  return ics;
}

function escapeICS(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/**
 * Trigger download of an .ics file in the browser.
 */
export function downloadICS(icsContent: string, filename: string = "harvest-day.ics") {
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
