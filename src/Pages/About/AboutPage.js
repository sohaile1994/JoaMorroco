import React from "react";
import Navbar from "../../Home/Navbar/Navbar";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import AboutAgencySection from "./AboutUsSection";
import PopularAdventuresSection from "./PopularSection";

import "./AboutPage.css";

const AboutPage = () => {
	return (
		<div className="about-container">
			<Navbar />
			<HeroSection />
			<ServicesSection />
			<AboutAgencySection />
			<PopularAdventuresSection />
			<script
				src="https://kit.fontawesome.com/3e495ab38b.js"
				crossorigin="anonymous"
			></script>
		</div>
	);
};

export default AboutPage;
