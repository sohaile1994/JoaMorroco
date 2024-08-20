// AboutUsPage.js
import React from "react";
import Navbar from "../../Home/Navbar/Navbar";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import AboutAgencySection from "./AboutUsSection";
import PopularAdventuresSection from "./PopularSection";

import "./AboutPage.css";

const AboutPage = () => {
	return (
		<>
			<Navbar />
			<HeroSection />
			<ServicesSection />
			<AboutAgencySection />
			<PopularAdventuresSection />
		</>
	);
};

export default AboutPage;
