import React from "react";
import useInView from "../../hooks/useInView";
import { CompassRose } from "../../Components/Motifs/Motifs";

// "How we travel" — a journey timeline, not a card grid. Numbered stops
// connected by a dashed route line, the way a route is drawn on a map.
const STOPS = [
	{
		title: "Led by locals",
		text: "Your guide grew up on these roads. The history, the shortcuts, the right café in every town: lived knowledge, not a script.",
	},
	{
		title: "Shaped around you",
		text: "No two groups are identical. Tell us what matters and we bend the route around it, from photography light to nap schedules.",
	},
	{
		title: "Handled end to end",
		text: "Hotels, the Mercedes Vito, timing, entrances. Arranged before you land, invisible while you travel.",
	},
	{
		title: "Around the table",
		text: "From rooftop riads to a campfire in the dunes, every meal is part of the journey, not a pause in it.",
	},
];

const Stop = ({ stop, index }) => {
	const [ref, inView] = useInView();
	return (
		<li
			ref={ref}
			className={`journey-stop anim fade-up ${inView ? "anim-in" : ""}`}
			style={{ "--anim-delay": `${index * 90}ms` }}
		>
			<span className="journey-marker" aria-hidden="true">
				<span className="journey-dot" />
			</span>
			<div className="journey-body">
				<span className="journey-index">{String(index + 1).padStart(2, "0")}</span>
				<h3>{stop.title}</h3>
				<p>{stop.text}</p>
			</div>
		</li>
	);
};

const JourneySection = () => {
	const [headRef, headInView] = useInView();
	return (
		<section className="journey-section">
			<div className="journey-compass" aria-hidden="true">
				<CompassRose />
			</div>
			<div
				ref={headRef}
				className={`journey-heading anim fade-up ${headInView ? "anim-in" : ""}`}
			>
				<span className="about-eyebrow">How we travel</span>
				<h2>The way a journey should feel</h2>
			</div>
			<ol className="journey-list">
				{STOPS.map((stop, i) => (
					<Stop key={stop.title} stop={stop} index={i} />
				))}
			</ol>
		</section>
	);
};

export default JourneySection;
