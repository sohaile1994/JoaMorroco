import { jsPDF } from "jspdf";
import { prettyDate } from "@shared/dates.mjs";
import { centsToUSD } from "@shared/pricing.mjs";
import { getTour } from "../data/tours";
import kingdomPlan from "../Pages/Kingdom/tourPlan";
import desertPlan from "../Pages/Desert/tourPlan";

const PLANS = { kingdom: kingdomPlan, desert: desertPlan };
const ORANGE = [255, 104, 26];
const DARK = [48, 48, 48];
const GRAY = [120, 120, 120];

// Generates and triggers download of a booking confirmation PDF.
export function downloadBookingPdf(booking) {
	const doc = new jsPDF({ unit: "pt", format: "a4" });
	const W = doc.internal.pageSize.getWidth();
	const H = doc.internal.pageSize.getHeight();
	const M = 48; // margin
	let y = 0;

	const tour = getTour(booking.tourKey) || { name: booking.tourKey, days: "" };
	const plan = PLANS[booking.tourKey] || [];
	const b = booking.breakdown || {};

	// ── Header band ──
	doc.setFillColor(...ORANGE);
	doc.rect(0, 0, W, 84, "F");
	doc.setTextColor(255, 255, 255);
	doc.setFont("helvetica", "bold");
	doc.setFontSize(22);
	doc.text("JOA Morocco", M, 40);
	doc.setFont("helvetica", "normal");
	doc.setFontSize(11);
	doc.text("Private Guided Tours", M, 60);
	doc.setFontSize(10);
	doc.text("Booking Confirmation", W - M, 40, { align: "right" });
	doc.setFont("helvetica", "bold");
	doc.setFontSize(14);
	doc.text(booking.reference, W - M, 60, { align: "right" });

	y = 120;

	// ── Tour + dates ──
	doc.setTextColor(...DARK);
	doc.setFont("helvetica", "bold");
	doc.setFontSize(18);
	doc.text(tour.name, M, y);
	y += 22;
	doc.setFont("helvetica", "normal");
	doc.setFontSize(11);
	doc.setTextColor(...GRAY);
	doc.text(
		`${prettyDate(booking.startDate)}  –  ${prettyDate(booking.endDate)}   (${tour.days} days)`,
		M,
		y
	);
	y += 30;

	// ── Party + price table ──
	const line = (label, value, bold = false) => {
		doc.setTextColor(...DARK);
		doc.setFont("helvetica", bold ? "bold" : "normal");
		doc.setFontSize(11);
		doc.text(label, M, y);
		doc.text(value, W - M, y, { align: "right" });
		y += 18;
	};

	doc.setDrawColor(230, 230, 230);
	doc.line(M, y - 8, W - M, y - 8);

	if (b.adults) line(`Adults (${b.adults})`, centsToUSD(b.adultsCents || 0));
	if (b.children) line(`Children (${b.children}, 50% off)`, centsToUSD(b.childrenCents || 0));
	if (booking.toddlers) line(`Toddlers (${booking.toddlers})`, "Free");
	doc.line(M, y - 8, W - M, y - 8);
	line("Total", centsToUSD(booking.totalCents || 0), true);
	y += 6;

	// ── Payment status ──
	if (booking.paymentStatus) {
		doc.setFont("helvetica", "normal");
		doc.setFontSize(10);
		doc.setTextColor(...GRAY);
		const statusLabel =
			booking.paymentStatus === "pending"
				? "Payment pending — see instructions below"
				: "Payment received (test)";
		doc.text(statusLabel, M, y);
		y += 16;
		if (booking.instructions) {
			const wrapped = doc.splitTextToSize(booking.instructions, W - M * 2);
			doc.text(wrapped, M, y);
			y += wrapped.length * 13;
		}
	}

	if (booking.specialRequests) {
		y += 6;
		doc.setFont("helvetica", "bold");
		doc.setFontSize(10);
		doc.setTextColor(...DARK);
		doc.text("Special requests", M, y);
		y += 14;
		doc.setFont("helvetica", "normal");
		doc.setTextColor(...GRAY);
		const wrapped = doc.splitTextToSize(booking.specialRequests, W - M * 2);
		doc.text(wrapped, M, y);
		y += wrapped.length * 13;
	}

	// ── Itinerary (paginated) ──
	y += 14;
	const ensureSpace = (needed) => {
		if (y + needed > H - 60) {
			doc.addPage();
			y = 60;
		}
	};

	doc.setFont("helvetica", "bold");
	doc.setFontSize(14);
	doc.setTextColor(...ORANGE);
	doc.text("Your Itinerary", M, y);
	y += 22;

	plan.forEach((day) => {
		ensureSpace(60);
		doc.setFont("helvetica", "bold");
		doc.setFontSize(11);
		doc.setTextColor(...DARK);
		doc.text(`Day ${day.day} — ${day.title}`, M, y);
		y += 16;
		doc.setFont("helvetica", "normal");
		doc.setFontSize(10);
		doc.setTextColor(...GRAY);
		(day.activities || []).forEach((act) => {
			const wrapped = doc.splitTextToSize(`•  ${act}`, W - M * 2 - 10);
			ensureSpace(wrapped.length * 13 + 4);
			doc.text(wrapped, M + 8, y);
			y += wrapped.length * 13;
		});
		y += 10;
	});

	// ── Footer on every page ──
	const pages = doc.internal.getNumberOfPages();
	for (let p = 1; p <= pages; p++) {
		doc.setPage(p);
		doc.setDrawColor(230, 230, 230);
		doc.line(M, H - 44, W - M, H - 44);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(9);
		doc.setTextColor(...GRAY);
		doc.text("JOA Morocco  ·  hello@joamorocco.com  ·  Keep this confirmation for your records", M, H - 28);
		doc.text(`Page ${p} of ${pages}`, W - M, H - 28, { align: "right" });
	}

	doc.save(`JOA-Morocco-${booking.reference}.pdf`);
}
