import { getPublishedPosts } from "@/data/blog-posts";
import { getPublishedEditorialPosts } from "@/data/editorial-posts";

function toRFC822(date: Date): string {
  return date.toUTCString();
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getPublishedPosts();
  const editorialPosts = getPublishedEditorialPosts();

  const editorialItems = editorialPosts.map((post) => {
    const url = `https://whattosow.co.uk/blog/${post.slug}`;
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${toRFC822(post.publishDate)}</pubDate>
      <guid>${url}</guid>
    </item>`;
  });

  const monthlyItems = posts.map((post) => {
    const url = `https://whattosow.co.uk/blog/${post.slug}`;
    return `    <item>
      <title>${escapeXml(post.title + " " + post.year)}</title>
      <link>${url}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${toRFC822(post.publishDate)}</pubDate>
      <guid>${url}</guid>
    </item>`;
  });

  const items = [...editorialItems, ...monthlyItems].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>What To Sow — Monthly Sowing Guides</title>
    <description>What to sow each month in the UK, with frost dates, varieties, and honest growing advice.</description>
    <link>https://whattosow.co.uk/blog</link>
    <language>en-gb</language>
    <atom:link href="https://whattosow.co.uk/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
