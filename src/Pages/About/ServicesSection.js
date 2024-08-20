import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMountain,
	faTag,
	faCalendar,
	faPalette,
} from "@fortawesome/free-solid-svg-icons";

const ServicesSection = () => {
	const services = [
		{
			icon: faMountain,
			title: "Adventure Time",
			description: "Experience thrilling adventures with our guided tours.",
		},
		{
			icon: faTag,
			title: "Branding Projects",
			description: "Enhance your brand with creative and impactful solutions.",
		},
		{
			icon: faCalendar,
			title: "Promotion & Event",
			description:
				"Organize successful events and promotions with expert help.",
		},
		{
			icon: faPalette,
			title: "Color it All",
			description: "Add a splash of color and creativity to your projects.",
		},
	];

	return (
		<section className="services-section">
			<article>
				{services.map((service, index) => (
					<section key={index}>
						<div className="icon-outline"></div>
						<div className="icon-container">
							<FontAwesomeIcon icon={service.icon} size="2x" />
						</div>
						<h3>{service.title}</h3>
						<p>{service.description}</p>
					</section>
				))}
			</article>
		</section>
	);
};

export default ServicesSection;
