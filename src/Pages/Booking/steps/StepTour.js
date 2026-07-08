import React from "react";
import { TOUR_LIST } from "../../../data/tours";

export default function StepTour({ data, update, next }) {
	const choose = (key) => update({ tour: key });

	return (
		<div className="step">
			<header className="step-head">
				<h1>Choose your journey</h1>
				<p>Two private tours, each reserved exclusively for you and your group.</p>
			</header>

			<div className="tour-choices">
				{TOUR_LIST.map((tour) => {
					const selected = data.tour === tour.key;
					return (
						<button
							key={tour.key}
							type="button"
							className={`tour-choice ${selected ? "selected" : ""}`}
							onClick={() => choose(tour.key)}
							aria-pressed={selected}
						>
							<div
								className="tour-choice-img"
								style={{ backgroundImage: `url(${tour.heroImage})` }}
							>
								<span className="tour-choice-badge">{tour.days} Days · Private</span>
								{selected && <span className="tour-choice-check">✓</span>}
							</div>
							<div className="tour-choice-body">
								<h3>{tour.name}</h3>
								<p className="tour-choice-tag">{tour.tagline}</p>
								<ul className="tour-choice-highlights">
									{tour.highlights.slice(0, 3).map((h) => (
										<li key={h}>{h}</li>
									))}
								</ul>
								<div className="tour-choice-price">from {tour.fromPrice} / person</div>
							</div>
						</button>
					);
				})}
			</div>

			<div className="step-actions">
				<span />
				<button type="button" className="btn-primary" disabled={!data.tour} onClick={next}>
					Continue
				</button>
			</div>
		</div>
	);
}
