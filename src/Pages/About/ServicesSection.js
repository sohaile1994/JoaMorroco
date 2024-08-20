// ServicesSection.js
import React from "react";

const ServicesSection = () => {
	const services = [
		{
			icon: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/cf/e5/cb.jpg",
			title: "Adventure Time",
			description: "Lorem ipsum...",
		},
		{
			icon: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/cf/e5/cb.jpg",
			title: "Branding Projects",
			description: "Lorem ipsum...",
		},
		{
			icon: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/cf/e5/cb.jpg",
			title: "Promotion & Event",
			description: "Lorem ipsum...",
		},
		{
			icon: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/cf/e5/cb.jpg",
			title: "Color it All",
			description: "Lorem ipsum...",
		},
	];

	return (
		<section className="services-section">
			<div className="services-container">
				{services.map((service, index) => (
					<div key={index} className="service">
						<img src={service.icon} alt={service.title} />
						<h3>{service.title}</h3>
						<p>{service.description}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default ServicesSection;
