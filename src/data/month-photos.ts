/**
 * One photo of Kate's plot on a month page, where we have one that clearly
 * belongs to that month. Approved by Kate on 17 Nov 2026 (plan item D). The
 * other months stay without a photo until she sends one: no stock here.
 */
export interface MonthPhoto {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

const MONTH_PHOTOS: Partial<Record<number, MonthPhoto>> = {
  2: { src: "/photos/blog/plot-early-spring.webp", alt: "Raised beds on the allotment in early spring, the first young plants coming through", caption: "Our plot in early spring", width: 1200, height: 1600 },
  4: { src: "/photos/blog/marigold-new-plugs-overhead.webp", alt: "A bed of newly planted marigold plugs seen from above", caption: "New marigold plugs going in", width: 900, height: 1200 },
  5: { src: "/photos/blog/sweetcorn-planting-bed-wide.webp", alt: "A wide view across the allotment beds at planting time, marigolds flowering", caption: "Planting time on the plot", width: 1600, height: 900 },
  10: { src: "/photos/guides/plot-autumn-marigolds.webp", alt: "The allotment in autumn with marigolds still flowering along the beds", caption: "The plot in autumn, marigolds still out", width: 900, height: 1200 },
};

export function getMonthPhoto(monthIndex: number): MonthPhoto | null {
  return MONTH_PHOTOS[monthIndex] ?? null;
}
