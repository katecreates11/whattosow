import { crops } from "@/data/crops";
import { allVarietyParams } from "@/lib/variety-routes";
import { cities } from "@/data/cities";
import { MONTH_SLUGS } from "@/lib/calendar";
import { getPublishedPosts } from "@/data/blog-posts";
import { getPublishedEditorialPosts } from "@/data/editorial-posts";
import { companionTopics } from "@/data/companion-topics";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://whattosow.co.uk";

  const editorialBlogPosts = getPublishedEditorialPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPosts = getPublishedPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const cropPages = crops.map((crop) => ({
    url: `${baseUrl}/crops/${crop.slug}`,
    lastModified: new Date("2026-04-02"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const varietyPages = allVarietyParams().map((p) => ({
    url: `${baseUrl}/crops/${p.slug}/${p.variety}`,
    lastModified: new Date("2026-06-02"),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const cityPages = cities.map((city) => ({
    url: `${baseUrl}/sow-in/${city.slug}`,
    lastModified: new Date("2026-04-02"),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const monthlyPages = MONTH_SLUGS.map((month) => ({
    url: `${baseUrl}/sow/${month}`,
    lastModified: new Date("2026-04-02"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const companionTopicPages = companionTopics.map((t) => ({
    url: `${baseUrl}/guides/companion-planting/${t.slug}`,
    lastModified: new Date("2026-06-04"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/sow`,
      lastModified: new Date("2026-06-02"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/grow`,
      lastModified: new Date("2026-06-02"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/harvest`,
      lastModified: new Date("2026-06-02"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lucky-dip`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/my-garden`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/calendar`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/frost-map`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/still-time`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "daily",
      priority: 0.8,
    },
{
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/spring-vegetables`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/beginners`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/companion-planting`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/autumn-winter-vegetables`,
      lastModified: new Date("2026-06-04"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/green-manures`,
      lastModified: new Date("2026-06-04"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/what-to-sow-in-summer-uk`,
      lastModified: new Date("2026-06-07"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/succession-sowing`,
      lastModified: new Date("2026-06-07"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/growing-brassicas`,
      lastModified: new Date("2026-06-07"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/growing-tomatoes-outdoors-vs-greenhouse`,
      lastModified: new Date("2026-06-07"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/growing-onions-garlic-leeks`,
      lastModified: new Date("2026-06-07"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/growing-winter-salad-leaves`,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/preparing-your-plot-for-winter`,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/protecting-vegetables-from-frost`,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/overwintering-broad-beans-and-peas`,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/growing-root-vegetables`,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/growing-squash-pumpkins-courgettes`,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/growing-veg-in-containers`,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/sun-mapping`,
      lastModified: new Date("2026-06-04"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/crop-rotation`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/seed-starting`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/soil`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/watering`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/pests`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/tomato-blight`,
      lastModified: new Date("2026-06-02"),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/allotment-essentials`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/seed-starting-kit`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/composting`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/growing-fruit`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kit`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/harvest-planner`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sow-in`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...editorialBlogPosts,
    ...blogPosts,
    ...cityPages,
    ...cropPages,
    ...varietyPages,
    ...monthlyPages,
    ...companionTopicPages,
  ];
}
