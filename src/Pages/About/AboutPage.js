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

			<script
				src="https://kit.fontawesome.com/3e495ab38b.js"
				crossorigin="anonymous"
			></script>
		</section>
	);
};

export default AboutPage;
