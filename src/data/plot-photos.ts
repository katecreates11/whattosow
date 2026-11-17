/**
 * "From the plot": a short strip of Kate's own photos on a crop page, part way
 * down, for crops where we have more than the one hero shot. Approved by Kate
 * on 17 Nov 2026 (plan item B). Captions say only what the photo shows; never
 * name a variety or a plant Kate hasn't confirmed (the cosmos rule).
 */
export interface PlotPhoto {
  src: string;
  alt: string;
  caption: string;
}

const PLOT_PHOTOS: Record<string, PlotPhoto[]> = {
  peas: [
    { src: "/photos/crops/peas-flowering-netting.webp", alt: "Pea plants in flower, climbing the netting", caption: "Flowering on the netting" },
    { src: "/photos/blog/peas-growing-on-vine.webp", alt: "Plump pea pods hanging on the plants", caption: "Pods on the vine" },
    { src: "/photos/blog/pea-trellis-golden.webp", alt: "A pea trellis with marigolds and calendula flowering in front", caption: "The trellis, with marigolds in front" },
  ],
  sweetcorn: [
    { src: "/photos/crops/sweetcorn-planted-out-rows.webp", alt: "Young sweetcorn plants in rows in freshly dug soil", caption: "Just planted out, in a block" },
    { src: "/photos/crops/sweetcorn-glass-gem-cob.webp", alt: "A Glass Gem sweetcorn cob with blue, pink and white kernels, husk peeled back", caption: "A Glass Gem cob, husk peeled back" },
  ],
  pumpkins: [
    { src: "/photos/crops/pumpkin-planted-out.webp", alt: "A young pumpkin plant with broad leaves, newly planted out", caption: "Newly planted out" },
  ],
  tomatoes: [
    { src: "/photos/crops/tomatoes-cherry-ripening-orange.webp", alt: "Cherry tomatoes ripening from green to orange on the truss", caption: "Ripening on the truss" },
  ],
  courgettes: [
    { src: "/photos/blog/courgettes-dusk-hand.webp", alt: "A hand holding two freshly picked courgettes at dusk", caption: "Two picked at dusk" },
  ],
};

export function getPlotPhotos(slug: string): PlotPhoto[] {
  return PLOT_PHOTOS[slug] ?? [];
}
