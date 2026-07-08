import React from "react";
import { MAX_TRAVELERS } from "@shared/tourMeta.mjs";
import { validateParty } from "@shared/pricing.mjs";

function Counter({ label, sub, value, onChange, min = 0, disableInc }) {
	return (
		<div className="guest-row">
			<div className="guest-label">
				<strong>{label}</strong>
				<span>{sub}</span>
			</div>
			<div className="counter">
				<button
					type="button"
					className="counter-btn"
					onClick={() => onChange(Math.max(min, value - 1))}
					disabled={value <= min}
					aria-label={`Remove one ${label}`}
				>
					−
				</button>
				<span className="counter-value" aria-live="polite">
					{value}
				</span>
				<button
					type="button"
					className="counter-btn"
					onClick={() => onChange(value + 1)}
					disabled={disableInc}
					aria-label={`Add one ${label}`}
				>
					+
				</button>
			</div>
		</div>
	);
}

export default function StepGuests({ data, update, next, back }) {
	const total = data.adults + data.children + data.toddlers;
	const atCapacity = total >= MAX_TRAVELERS;
	const check = validateParty(data.tour, data.adults, data.children, data.toddlers);

	return (
		<div className="step">
			<header className="step-head">
				<h1>Who's travelling?</h1>
				<p>Up to {MAX_TRAVELERS} guests share your private Mercedes-Benz Vito.</p>
			</header>

			<div className="guests-card">
				<Counter
					label="Adults"
					sub="Age 12+"
					value={data.adults}
					min={1}
					onChange={(v) => update({ adults: v })}
					disableInc={atCapacity}
				/>
				<Counter
					label="Children"
					sub="Age 3–11 · 50% off"
					value={data.children}
					onChange={(v) => update({ children: v })}
					disableInc={atCapacity}
				/>
				<Counter
					label="Toddlers"
					sub="Age 0–2 · Free"
					value={data.toddlers}
					onChange={(v) => update({ toddlers: v })}
					disableInc={atCapacity}
				/>

				<div className="capacity-meter">
					<div className="capacity-bar">
						<div
							className="capacity-fill"
							style={{ width: `${(total / MAX_TRAVELERS) * 100}%` }}
						/>
					</div>
					<span className="capacity-text">
						{total} of {MAX_TRAVELERS} seats
						{atCapacity && " · vehicle full"}
					</span>
				</div>
			</div>

			{!check.ok && <p className="form-hint">{check.error}</p>}

			<div className="step-actions">
				<button type="button" className="btn-ghost" onClick={back}>
					Back
				</button>
				<button type="button" className="btn-primary" disabled={!check.ok} onClick={next}>
					Continue
				</button>
			</div>
		</div>
	);
}
