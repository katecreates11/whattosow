import Image from "next/image";

/**
 * The front page opens on Kate's own plot, in the season you're reading it.
 * Each photo is chosen for what it shows: bare beds being readied, young plants
 * and calendula, the high-summer path, marigolds hanging on into autumn.
 */
const SEASON_PHOTOS: { months: number[]; src: string; alt: string; caption: string; width: number; height: number }[] = [
  {
    months: [0, 1, 2, 3],
    src: "/photos/guides/allotment-wide-summer.webp",
    alt: "The allotment under a big grey sky, beds dug over and edged, ready for the season",
    caption: "Beds dug and waiting",
    width: 1200,
    height: 1600,
  },
  {
    months: [4, 5],
    src: "/photos/guides/allotment-overview-june.webp",
    alt: "Raised beds of young plants edged with yellow calendula under a blue sky",
    caption: "Young plants and calendula",
    width: 900,
    height: 1200,
  },
  {
    months: [6, 7],
    src: "/photos/guides/summer-golden-path.webp",
    alt: "A woodchip path between full summer beds, sunflowers and marigolds either side",
    caption: "The path in high summer",
    width: 900,
    height: 1200,
  },
  {
    months: [8, 9, 10, 11],
    src: "/photos/guides/plot-autumn-marigolds.webp",
    alt: "The allotment in autumn, marigolds still flowering along the beds either side of a stepping-stone path",
    caption: "Marigolds hanging on into autumn",
    width: 900,
    height: 1200,
  },
];

export function heroPhotoFor(monthIndex: number) {
  return SEASON_PHOTOS.find((photo) => photo.months.includes(monthIndex)) ?? SEASON_PHOTOS[3];
}

export default function HomeHero({ monthIndex, dateline, daylight }: { monthIndex: number; dateline: string; daylight: string }) {
  const photo = heroPhotoFor(monthIndex);

  return (
    <section className="relative isolate overflow-hidden bg-earth" aria-labelledby="home-title">
      <div className="relative h-[78svh] min-h-[460px] max-h-[820px]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_60%] img-grade"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#1b1611]/85 via-[#1b1611]/25 to-[#1b1611]/10"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 px-6 sm:px-10 lg:px-16 pb-9 sm:pb-14">
          <div className="max-w-6xl mx-auto home-rise">
            <p className="text-[15px] sm:text-base text-white/85">
              {dateline}
              <span className="text-white/55"> &middot; {daylight} of daylight</span>
            </p>
            <h1
              id="home-title"
              className="mt-3 font-serif font-normal text-white tracking-[-0.025em] leading-[0.92] text-[3.4rem] sm:text-[5.2rem] lg:text-[6.6rem] max-w-[11ch]"
            >
              What to sow this week
            </h1>
          </div>
        </div>
        <p className="absolute right-4 top-4 sm:right-6 sm:top-5 font-serif italic text-[13px] sm:text-sm text-white/80">
          {photo.caption}, on our plot
        </p>
      </div>
    </section>
  );
}
