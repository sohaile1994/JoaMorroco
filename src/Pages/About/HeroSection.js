import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
	return (
		<section
			className="about-hero"
			style={{ backgroundImage: "url(/assets/sunRise.webp)" }}
		>
			<div className="about-hero-text">
				<h1>About JOA Morocco</h1>
				<p>Handcrafted journeys across the Kingdom</p>
			</div>
		</section>
	);
};

export default HeroSection;
