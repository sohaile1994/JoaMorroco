import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMountain,
	faMapMarkedAlt,
	faCalendarCheck,
	faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import "./ServicesSection.css";

const ServicesSection = () => {
	const services = [
		{
			icon: faMountain,
			title: "Guided Adventures",
			description: "Every tour is led by a local expert who knows the land, the history, and the people.",
		},
		{
			icon: faMapMarkedAlt,
			title: "Tailored Itineraries",
			description: "No two groups are identical. We shape each journey around what matters to you.",
		},
		{
			icon: faCalendarCheck,
			title: "Seamless Planning",
			description: "Accommodation, transport, permits, and timing — all handled before you arrive.",
		},
		{
			icon: faUtensils,
			title: "Authentic Cuisine",
			description: "From rooftop riads to desert campfires, every meal is a part of the experience.",
		},
	];

	return (
		<section className="services-section">
			<article>
				{services.map((service, index) => (
					<section className="service-container" key={index}>
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
