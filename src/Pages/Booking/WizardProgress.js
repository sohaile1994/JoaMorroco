import React from "react";

// Six-step progress rail. Completed steps are clickable to jump back.
export default function WizardProgress({ steps, step, maxReached, onJump }) {
	const pct = ((step - 1) / (steps.length - 1)) * 100;
	return (
		<div className="wiz-progress" role="navigation" aria-label="Booking progress">
			<div className="wiz-track">
				<div className="wiz-fill" style={{ width: `${pct}%` }} />
				{steps.map((label, i) => {
					const n = i + 1;
					const done = n < step;
					const active = n === step;
					const reachable = n <= maxReached;
					return (
						<button
							key={label}
							type="button"
							className={`wiz-node ${done ? "done" : ""} ${active ? "active" : ""}`}
							disabled={!reachable}
							onClick={() => reachable && onJump(n)}
							aria-current={active ? "step" : undefined}
						>
							<span className="wiz-dot">{done ? "✓" : n}</span>
							<span className="wiz-label">{label}</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
