import React, { useMemo, useState } from "react";
import { endDateFor, prettyDate } from "@shared/dates.mjs";
import { dateState, STATE_REASON } from "../../lib/calendarState";
import "./Calendar.css";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December",
];

function pad(n) {
	return String(n).padStart(2, "0");
}
function ymd(y, m, d) {
	return `${y}-${pad(m + 1)}-${pad(d)}`;
}

export default function Calendar({
	tourDays,
	bookedRanges = [],
	minStart,
	today,
	value,
	onSelect,
	loading = false,
}) {
	// Start the view on the month of the earliest bookable date.
	const initial = minStart || today || ymd(new Date().getFullYear(), new Date().getMonth(), 1);
	const [view, setView] = useState(() => {
		const [y, m] = initial.split("-").map(Number);
		return { year: y, month: m - 1 };
	});
	const [hover, setHover] = useState(null);

	const grid = useMemo(() => {
		const first = new Date(Date.UTC(view.year, view.month, 1));
		const startWeekday = first.getUTCDay();
		const daysInMonth = new Date(Date.UTC(view.year, view.month + 1, 0)).getUTCDate();
		const cells = [];
		for (let i = 0; i < startWeekday; i++) cells.push(null);
		for (let d = 1; d <= daysInMonth; d++) {
			const dstr = ymd(view.year, view.month, d);
			cells.push({ d, dstr, state: dateState(dstr, tourDays, bookedRanges, minStart, today) });
		}
		return cells;
	}, [view, tourDays, bookedRanges, minStart, today]);

	// The span to highlight: hovered available date, else the selected value.
	const spanStart = hover || value;
	const span = spanStart
		? { start: spanStart, end: endDateFor(spanStart, tourDays) }
		: null;

	const inSpan = (dstr) => span && dstr >= span.start && dstr <= span.end;

	const go = (delta) => {
		setView((v) => {
			const m = v.month + delta;
			return { year: v.year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 };
		});
	};

	// Don't let users page back before this month.
	const minView = (minStart || today || "").slice(0, 7);
	const viewKey = `${view.year}-${pad(view.month + 1)}`;
	const atMin = minView && viewKey <= minView;

	return (
		<div className="cal" role="group" aria-label="Choose a start date">
			<div className="cal-header">
				<button
					type="button"
					className="cal-nav"
					onClick={() => go(-1)}
					disabled={atMin}
					aria-label="Previous month"
				>
					‹
				</button>
				<div className="cal-title" aria-live="polite">
					{MONTHS[view.month]} {view.year}
				</div>
				<button type="button" className="cal-nav" onClick={() => go(1)} aria-label="Next month">
					›
				</button>
			</div>

			<div className="cal-weekdays">
				{WEEKDAYS.map((w) => (
					<span key={w}>{w}</span>
				))}
			</div>

			<div className={`cal-grid ${loading ? "cal-loading" : ""}`}>
				{grid.map((cell, i) =>
					cell === null ? (
						<span key={`b${i}`} className="cal-cell cal-blank" />
					) : (
						<button
							key={cell.dstr}
							type="button"
							className={
								`cal-cell cal-${cell.state}` +
								(cell.dstr === value ? " cal-selected" : "") +
								(inSpan(cell.dstr) ? " cal-in-span" : "")
							}
							disabled={cell.state !== "available"}
							title={STATE_REASON[cell.state]}
							aria-label={`${prettyDate(cell.dstr)} — ${STATE_REASON[cell.state]}`}
							aria-pressed={cell.dstr === value}
							onMouseEnter={() => cell.state === "available" && setHover(cell.dstr)}
							onMouseLeave={() => setHover(null)}
							onFocus={() => cell.state === "available" && setHover(cell.dstr)}
							onBlur={() => setHover(null)}
							onClick={() => cell.state === "available" && onSelect(cell.dstr)}
						>
							{cell.d}
						</button>
					)
				)}
			</div>

			<ul className="cal-legend">
				<li><span className="swatch sw-available" /> Available</li>
				<li><span className="swatch sw-span" /> Your tour</li>
				<li><span className="swatch sw-booked" /> Reserved</li>
				<li><span className="swatch sw-overlap" /> Would overlap</li>
				<li><span className="swatch sw-soon" /> Too soon (14 days)</li>
			</ul>
		</div>
	);
}
