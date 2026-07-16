export const ANALYTICS_BOT_PATTERN_SOURCE =
  "bot|crawler|spider|crawling|headless|prerender|preview|lighthouse|pagespeed|pingdom|uptime|monitor|semrush|ahrefs|mj12|dotbot|petalbot|bytespider|gptbot|claudebot|anthropic-ai|ccbot|facebookexternalhit|slurp|yandex|baiduspider|duckduckbot|bingbot|googlebot";

const BOT_USER_AGENT_PATTERN = new RegExp(ANALYTICS_BOT_PATTERN_SOURCE, "i");

export function shouldSkipAnalyticsForUserAgent(userAgent: string, webdriver = false) {
  const ua = userAgent.trim();
  if (!ua) return true;
  if (webdriver) return true;
  return BOT_USER_AGENT_PATTERN.test(ua);
}
