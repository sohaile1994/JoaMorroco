import { addDays, rangesOverlap } from "@shared/dates.mjs";

// Classify a candidate start date for a tour of `tourDays` length.
// Priority: past > booked > too-soon > overlap > available.
// Only "available" is selectable. "overlap" means the date itself is free but
// the tour would run INTO a booked range (the run-in rule).
export function dateState(ymd, tourDays, bookedRanges, minStart, today) {
	if (today && ymd < today) return "past";
	for (const r of bookedRanges) {
		if (ymd >= r.start && ymd <= r.end) return "booked";
	}
	if (minStart && ymd < minStart) return "too-soon";
	const end = addDays(ymd, Math.max(0, tourDays - 1));
	for (const r of bookedRanges) {
		if (rangesOverlap(ymd, end, r.start, r.end)) return "overlap";
	}
	return "available";
}

export const STATE_REASON = {
	past: "This date has already passed.",
	booked: "Another private tour is running on this date.",
	"too-soon": "Bookings require at least 14 days' notice.",
	overlap: "Your tour would overlap dates that are already reserved.",
	available: "Available — select to start your tour here.",
};
