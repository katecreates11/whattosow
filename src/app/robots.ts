import type { MetadataRoute } from "next";

// AI *training* crawlers — bots that scrape the site to train LLMs and send us
// nothing back. These are blocked to match our Cloudflare AI policy (Training →
// Block). We deliberately do NOT block AI *search* / *agent* crawlers
// (OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-User/SearchBot, etc.) —
// those let ChatGPT/Perplexity discover and cite us, which sends real traffic.
// Search engines (Googlebot, Bingbot, DuckDuckBot) are never blocked.
const BLOCKED_TRAINING_BOTS = [
  "GPTBot", // OpenAI — training crawler (OAI-SearchBot is the search one; allowed)
  "Google-Extended", // Google — Gemini training/grounding opt-out (does NOT affect Google Search or AI Overviews)
  "Applebot-Extended", // Apple — Apple Intelligence training
  "anthropic-ai", // Anthropic — legacy training user-agent
  "ClaudeBot", // Anthropic — crawler used for training (Claude-User/SearchBot allowed)
  "CCBot", // Common Crawl — feeds most public LLM training sets
  "Bytespider", // ByteDance — training
  "Meta-ExternalAgent", // Meta — AI training
  "cohere-ai", // Cohere — training
  "Diffbot", // structured-data scraper / training data
  "Omgilibot", // webz.io — resells crawl data for training
  "ImagesiftBot", // Hive — training data
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Everyone else — search engines and AI search/agent crawlers — may crawl freely.
      {
        userAgent: "*",
        allow: "/",
      },
      // Keep our content out of AI training sets.
      {
        userAgent: BLOCKED_TRAINING_BOTS,
        disallow: "/",
      },
    ],
    sitemap: "https://whattosow.co.uk/sitemap.xml",
  };
}
