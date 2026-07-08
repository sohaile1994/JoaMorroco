import React from "react";
import { DuneDivider } from "../../Components/Motifs/Motifs";

const HeroSection = () => {
	return (
		<section
			className="about-hero"
			style={{ backgroundImage: "url(/assets/sunRise.webp)" }}
		>
			<div className="about-hero-text">
				<span className="about-eyebrow">Our Story</span>
				<h1>Built by guides, not marketers.</h1>
				<p>
					Two private journeys across Morocco, walked and rewalked by the
					people who lead them.
				</p>
			</div>
			<div className="about-hero-dunes">
				<DuneDivider fill="var(--sand-paper)" />
			</div>
		</section>
	);
};

export default HeroSection;
