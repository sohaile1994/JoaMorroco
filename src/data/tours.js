// Single normalized tour registry — the one place that describes each tour for
// the home showcase, the "popular adventures" cards, the booking wizard, and
// the PDF. Pricing/duration mirror the shared engine (@shared/pricing,
// @shared/tourMeta); everything visual lives here.
import Images, { KingdomVideo, DesertVideo } from "../images";
import { TOUR_PRICING } from "@shared/pricing.mjs";
import { TOUR_META } from "@shared/tourMeta.mjs";
import { centsToUSD } from "@shared/pricing.mjs";

export const TOURS = {
  kingdom: {
    key: "kingdom",
    name: TOUR_META.kingdom.name,
    city: "Casablanca → Tangier",
    days: TOUR_META.kingdom.days,
    nights: TOUR_META.kingdom.days - 1,
    route: "/kingdom-of-morocco",
    theme: "moroccan",
    rating: 5,
    priceTiersCents: TOUR_PRICING.kingdom,
    fromPrice: centsToUSD(Math.min(...TOUR_PRICING.kingdom)),
    subTitle: "The Complete Kingdom",
    tagline: "11 days, coast to Sahara to the blue north",
    description:
      "Eleven days across the whole of Morocco — imperial cities, the High Atlas, two nights in a luxury Sahara camp, the blue lanes of Chefchaouen, and the Atlantic coast at Tangier.",
    highlights: [
      "Hassan II Mosque & Casablanca",
      "Marrakech medina & Jemaa el-Fnaa",
      "Two nights in a luxury desert camp",
      "Chefchaouen, the Blue City",
    ],
    video: KingdomVideo,
    heroImage: Images.KingdomHero,
  },
  desert: {
    key: "desert",
    name: TOUR_META.desert.name,
    city: "Casablanca → Casablanca",
    days: TOUR_META.desert.days,
    nights: TOUR_META.desert.days - 1,
    route: "/desert",
    theme: "desert",
    rating: 5,
    priceTiersCents: TOUR_PRICING.desert,
    fromPrice: centsToUSD(Math.min(...TOUR_PRICING.desert)),
    subTitle: "From Imperial Cities to the Golden Dunes",
    tagline: "8 days from Fes to the Sahara to Marrakech",
    description:
      "Eight days from Casablanca through the ancient medina of Fes, over the Middle Atlas, into the golden dunes of Erg Chebbi — then two full days in Marrakech to finish.",
    highlights: [
      "Hassan II Mosque & Fes medina",
      "Two nights in a luxury desert camp",
      "Horseback riding over the dunes",
      "Marrakech souks & cooking class",
    ],
    video: DesertVideo,
    heroImage: Images.DesertHero,
  },
};

export const TOUR_LIST = [TOURS.kingdom, TOURS.desert];

export function getTour(key) {
  return TOURS[key] || null;
}
