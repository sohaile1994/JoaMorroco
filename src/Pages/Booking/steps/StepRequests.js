import React from "react";

export default function StepRequests({ data, update, next, back }) {
	return (
		<div className="step">
			<header className="step-head">
				<h1>Anything we should know?</h1>
				<p>Dietary needs, celebrations, accessibility, room preferences — all optional.</p>
			</header>

			<div className="requests-card">
				<label className="field">
					<span className="field-label">Special requests</span>
					<textarea
						rows={5}
						placeholder="Tell us how to make this trip yours…"
						value={data.specialRequests}
						maxLength={2000}
						onChange={(e) => update({ specialRequests: e.target.value })}
					/>
				</label>

				<label className={`luxury-toggle ${data.luxury ? "on" : ""}`}>
					<input
						type="checkbox"
						checked={data.luxury}
						onChange={(e) => update({ luxury: e.target.checked })}
					/>
					<div className="luxury-copy">
						<strong>Interested in a luxury upgrade?</strong>
						<span>5★ hotels, premium suites, private luxury transport & bespoke arrangements. We'll follow up with options — no charge added now.</span>
					</div>
					<span className="luxury-check" aria-hidden="true">
						{data.luxury ? "✓" : ""}
					</span>
				</label>
			</div>

			<div className="step-actions">
				<button type="button" className="btn-ghost" onClick={back}>
					Back
				</button>
				<button type="button" className="btn-primary" onClick={next}>
					Continue to payment
				</button>
			</div>
		</div>
	);
}
