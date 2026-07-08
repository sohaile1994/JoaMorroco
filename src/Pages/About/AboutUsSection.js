import React from "react";
import useInView from "../../hooks/useInView";
import { ArchImage, Stamp } from "../../Components/Motifs/Motifs";

const FIELD_NOTES = [
	"2 tours",
	"11 & 8 days",
	"1 group at a time",
	"7 travellers max",
];

const StorySection = () => {
	const [imgRef, imgInView] = useInView();
	const [txtRef, txtInView] = useInView();

	return (
		<section className="story-section">
			<div className="story-grid">
				<div
					ref={imgRef}
					className={`story-figure anim scale-up ${imgInView ? "anim-in" : ""}`}
				>
					<ArchImage
						src="/assets/city.webp"
						alt="Rooftops of a Moroccan medina at golden hour"
						className="story-arch"
					/>
					<div className="story-stamp" aria-hidden="true">
						<Stamp />
					</div>
				</div>

				<div
					ref={txtRef}
					className={`story-text anim fade-up ${txtInView ? "anim-in" : ""}`}
				>
					<span className="about-eyebrow">Who we are</span>
					<h2>A small team with deep roots in Morocco</h2>
					<p>
						JOA Morocco was built by guides, not marketers. Every itinerary we
						offer is one we have walked ourselves: the desert camps, the medina
						lanes, the mountain passes.
					</p>
					<p>
						We run one group at a time, in one vehicle, on dates that belong to
						you alone. That is the whole business model, and it is why people
						come back.
					</p>
				</div>
			</div>

			<ul className="field-notes" aria-label="At a glance">
				{FIELD_NOTES.map((note) => (
					<li key={note}>{note}</li>
				))}
			</ul>
		</section>
	);
};

export default StorySection;
