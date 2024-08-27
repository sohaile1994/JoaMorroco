import React from "react";
import "./PopularSection.css";

const PopularAdventuresSection = () => {
	const adventures = [
		{
			img: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/cf/e5/cb.jpg",
			title: "Discover Costa Rica",
			price: "$2830",
		},
		{
			img: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/cf/e5/cb.jpg",
			title: "India Is For Everyone",
			price: "$1350",
		},
		{
			img: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/cf/e5/cb.jpg",
			title: "Thai Island To Visit",
			price: "$1870",
		},
	];

	return (
		<section className="popular-adventures-section">
			<h2>Most Popular Adventures We Have</h2>
			<article>
				{adventures.map((adventure, index) => (
					<section key={index}>
						<img src={adventure.img} alt={adventure.title} />
						<h3>{adventure.title}</h3>
						<p>{adventure.price}</p>
					</section>
				))}
			</article>
		</section>
	);
};

export default PopularAdventuresSection;
