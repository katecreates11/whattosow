# Seasonal route policy

Public pages that make a claim about today, this week or the current month use
the shared `Europe/London` seasonal clock and regenerate hourly. The route list
is kept in `src/lib/seasonal-route-policy.ts` and checked by the seasonal-time
guard.

| Route | Refresh | Why |
| --- | --- | --- |
| `/` | hourly | Dateline, weekly edit, month link and kit |
| `/sow` | hourly | Sowing answer, week label and kit |
| `/sow-in/[city]` | hourly | City month, metadata and schema |
| `/print` | hourly | Current-month highlight and year |
| `/pins` | hourly | Current monthly pin selection |
| `/crops/[slug]` | hourly | Current crop verdict and answer |
| `/crops/[slug]/[variety]` | hourly | Current variety sowing-status label |
| `/grow-your-christmas-dinner` | hourly | Countdown and Christmas growing windows |
| `/guides` | hourly | Existing weather-led guide relevance |
| `/api/blight-map` | six hours | Existing live weather cache policy |
| `/still-time/opengraph-image` | hourly | Social-preview "N crops you can still sow" count |

Timeless editorial pages are intentionally excluded. Client-only tools calculate
their own immediate browser state and are not server-cache policy entries.
