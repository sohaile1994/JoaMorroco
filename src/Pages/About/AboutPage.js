import React from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import AboutAgencySection from "./AboutUsSection";
import "./About.css";
const AboutPage = () => {
	return (
		<section className="about-container">
			<HeroSection />
			<ServicesSection />
			<AboutAgencySection />
		</section>
	);
};

export default AboutPage;
