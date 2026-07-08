import React from "react";
import { DuneDivider } from "../../Components/Motifs/Motifs";

const Hero = () => {
	return (
		<section
			className="contact-hero"
			style={{ backgroundImage: `url(/assets/contact-background.webp)` }}
		>
			<div className="contact-hero-text">
				<span className="contact-eyebrow">Contact</span>
				<h1>Write to us</h1>
				<p>Planning questions, custom routes, or just a hello from afar.</p>
			</div>
			<div className="contact-hero-dunes">
				<DuneDivider fill="var(--sand-paper)" />
			</div>
		</section>
	);
};

export default Hero;
