import React from "react";
import "./PopularSection.css";

const PopularAdventuresSection = () => {
	const adventures = [
		{
			img: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/cf/e5/cb.jpg",
			title: "Discover Costa Rica",
			price: "$2830",
			rating: 5,
			days: 16,
			remainingSeats: 12,
		},
		{
			img: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/cf/e5/cb.jpg",
			title: "India Is For Everyone",
			price: "$1350",
			rating: 5,
			days: 16,
			remainingSeats: 12,
		},
		{
			img: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/cf/e5/cb.jpg",
			title: "Thai Island To Visit",
			price: "$1870",
			rating: 5,
			days: 16,
			remainingSeats: 12,
		},
	];

	return (
		<section className="popular-adventures-section">
			<div className="heading-container max-width">
				<h5>Modern & Beautiful</h5>
				<h3>Most Popular Adventures We Have</h3>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere
					tempor mauris, nec imperdiet mi rutrum eget. Donec quis ligula in
					tellus dictum consequat.
				</p>
			</div>
			<section className="popular-adventures-showcase">
				{adventures.map((adventure, index) => (
					<div className="showcase-item" key={index}>
						<div className="top-section">
							<div
								style={{
									backgroundImage: `url(${adventure.img})`,
									backgroundSize: "cover", // Cover the entire figure
									backgroundRepeat: "no-repeat",
									width: "100%",
									height: "100%", // Don't repeat the image
								}}
							></div>
						</div>

						<div className="middle-section">
							<h3>
								{adventure.title} <span>{adventure.price}</span>
							</h3>

							<figcaption>Rating: {adventure.rating}</figcaption>

							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
								id ligula aliquam, malesuada ex ac,
							</p>
						</div>

						<div className="bottom-section">
							<p>
								{adventure.days} Days{" "}
								<span>{adventure.remainingSeats} Seats</span>
							</p>
						</div>
					</div>
				))}
			</section>
		</section>
	);
};

export default PopularAdventuresSection;
