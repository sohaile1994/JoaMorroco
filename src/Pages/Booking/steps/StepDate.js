import React, { useEffect, useState } from "react";
import Calendar from "../../../Components/Calendar/Calendar";
import { getTour } from "../../../data/tours";
import { prettyDate, endDateFor, addDays, todayYMD } from "@shared/dates.mjs";
import { api } from "../../../lib/api";

export default function StepDate({ data, update, next, back }) {
	const tour = getTour(data.tour);
	const [avail, setAvail] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let alive = true;
		setLoading(true);
		const from = todayYMD();
		const to = addDays(from, 550);
		api
			.get(`/api/availability?from=${from}&to=${to}`)
			.then((d) => {
				if (alive) setAvail(d);
			})
			.catch(() => {
				if (alive) setError("Could not load availability. Please try again.");
			})
			.finally(() => alive && setLoading(false));
		return () => {
			alive = false;
		};
	}, []);

	const bookedRanges = avail?.bookedRanges || [];
	const minStart = avail?.minStart;
	const today = avail?.today || todayYMD();

	return (
		<div className="step">
			<header className="step-head">
				<h1>Pick your start date</h1>
				<p>
					Your {tour?.name} runs {tour?.days} days. Hover a date to preview the full span —
					reserved and overlapping dates are blocked automatically.
				</p>
			</header>

			{error && <p className="form-error">{error}</p>}

			<div className="date-layout">
				<Calendar
					tourDays={tour?.days || 1}
					bookedRanges={bookedRanges}
					minStart={minStart}
					today={today}
					value={data.startDate}
					loading={loading}
					onSelect={(d) => update({ startDate: d })}
				/>

				<div className="date-selected">
					{data.startDate ? (
						<div className="date-selected-card">
							<span className="date-selected-label">Your tour</span>
							<strong>{prettyDate(data.startDate)}</strong>
							<span className="date-arrow">↓</span>
							<strong>{prettyDate(endDateFor(data.startDate, tour.days))}</strong>
							<span className="date-selected-days">{tour.days} days / {tour.nights} nights</span>
						</div>
					) : (
						<div className="date-selected-empty">
							<p>Select an available date to see your itinerary window.</p>
						</div>
					)}
				</div>
			</div>

			<div className="step-actions">
				<button type="button" className="btn-ghost" onClick={back}>
					Back
				</button>
				<button type="button" className="btn-primary" disabled={!data.startDate} onClick={next}>
					Continue
				</button>
			</div>
		</div>
	);
}
