import { getPublishedEditorialPosts } from "@/data/editorial-posts";
import Link from "next/link";

export default function LatestFromThePlot() {
  const posts = getPublishedEditorialPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20" aria-label="Latest from the plot">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-baseline justify-between mb-8 sm:mb-10">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#003b44]/40">
            Latest from the plot
          </p>
          <Link
            href="/blog"
            className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#003b44]/50 hover:text-[#003b44] transition-colors"
          >
            All posts →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-px bg-[#003b44]/10">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-[#f2f2eb] block"
            >
              {/* Photo */}
              <div className="overflow-hidden aspect-[4/3]">
                <img
                  src={post.heroImage}
                  alt={post.heroAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "contrast(1.06) saturate(0.82) sepia(0.06) brightness(1.01)" }}
                  loading="lazy"
                />
              </div>

              {/* Text */}
              <div className="p-5 sm:p-6">
                <div className="flex gap-2 flex-wrap mb-3">
                  {post.tags.slice(0, 1).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] tracking-[0.14em] uppercase text-[#003b44]/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-[#003b44] font-medium leading-snug mb-2 group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h3>
                <p className="text-[11px] text-[#003b44]/50 leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
