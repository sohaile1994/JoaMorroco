import React from "react";
import HeroSection from "./HeroSection";
import JourneySection from "./ServicesSection";
import StorySection from "./AboutUsSection";
import "./About.css";

const AboutPage = () => {
	return (
		<section className="about-container">
			<HeroSection />
			<JourneySection />
			<StorySection />
		</section>
	);
};

export default AboutPage;
