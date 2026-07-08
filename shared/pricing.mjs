// Pricing engine — the single source of truth for money, shared by the live
// booking UI and the server (which recomputes to never trust client math).
// Money is integer CENTS everywhere; format only at the display edge.
//
// Tiered per-person rate by paying-guest count (adults + children):
//   2 guests -> tier 1 | 3–5 guests -> tier 2 | 6+ guests -> tier 3
// Children (3–11) pay 50% of the adult per-person rate. Toddlers (0–2) are free.

import { MAX_TRAVELERS } from "./tourMeta.mjs";

export const MIN_PAYING = 2; // pricing table starts at 2 guests (business rule)

// Per-person rates in cents, indexed by tier (0,1,2).
export const TOUR_PRICING = {
  desert: [150000, 120000, 100000], // $1,500 / $1,200 / $1,000
  kingdom: [170000, 150000, 120000], // $1,700 / $1,500 / $1,200
};

export function tierIndex(payingCount) {
  if (payingCount <= 2) return 0;
  if (payingCount <= 5) return 1;
  return 2;
}

export function centsToUSD(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

// Validate a party against capacity + minimum rules. Returns {ok, error}.
export function validateParty(tourKey, adults, children, toddlers) {
  const a = Number(adults) || 0;
  const c = Number(children) || 0;
  const t = Number(toddlers) || 0;

  if (![a, c, t].every((n) => Number.isInteger(n) && n >= 0)) {
    return { ok: false, error: "Guest counts must be whole numbers." };
  }
  if (!TOUR_PRICING[tourKey]) {
    return { ok: false, error: "Unknown tour." };
  }
  if (a < 1) {
    return { ok: false, error: "At least one adult is required." };
  }
  if (a + c < MIN_PAYING) {
    return { ok: false, error: `A minimum of ${MIN_PAYING} guests is required to book.` };
  }
  if (a + c + t > MAX_TRAVELERS) {
    return { ok: false, error: `Maximum ${MAX_TRAVELERS} travelers per private tour.` };
  }
  return { ok: true, error: "" };
}

// Compute the full price breakdown. Callers should validate first, but this is
// defensive: it clamps to sane numbers so the UI can preview partial parties.
export function computeQuote(tourKey, adults, children, toddlers) {
  const a = Math.max(0, Number(adults) || 0);
  const c = Math.max(0, Number(children) || 0);
  const t = Math.max(0, Number(toddlers) || 0);

  const tiers = TOUR_PRICING[tourKey] || TOUR_PRICING.desert;
  const paying = a + c;
  const tier = tierIndex(Math.max(paying, MIN_PAYING)); // preview as if at min
  const ppCents = tiers[tier];
  const childPpCents = Math.round(ppCents * 0.5);

  const adultsCents = a * ppCents;
  const childrenCents = c * childPpCents;
  const totalCents = adultsCents + childrenCents;

  return {
    tourKey,
    adults: a,
    children: c,
    toddlers: t,
    payingCount: paying,
    tier: tier + 1, // human-friendly 1-based
    ppCents,
    childPpCents,
    adultsCents,
    childrenCents,
    toddlersCents: 0,
    totalCents,
    perPersonLabel: centsToUSD(ppCents),
    totalLabel: centsToUSD(totalCents),
  };
}
