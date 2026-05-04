import React from "react";
import "./AboutUsSection.css";

const AboutAgencySection = () => {
	return (
		<section className="about-agency-section">
			<div className="about-agency-container">
				<article>
					<img
						src="https://roam.qodeinteractive.com/wp-content/uploads/2017/08/about-1-img-1-768x482.jpg"
						alt="Morocco landscape"
					/>
					<section>
						<h2>Who We Are</h2>
						<h3>A small team with deep roots in Morocco</h3>
						<p>
							JOA Morocco was built by guides, not marketers. Every itinerary
							we offer is one we have walked ourselves — the desert camps,
							the medina lanes, the mountain passes. We keep our groups small
							so every traveller gets the experience they came for.
						</p>
					</section>
				</article>
			</div>
		</section>
	);
};

export default AboutAgencySection;
