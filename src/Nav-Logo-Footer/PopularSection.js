import React from "react";
import "./PopularSection.css";
import {
	DesertImage,
	BeachImage,
	ForestImage,
	MountainImage,
} from "../Manager";

const PopularAdventuresSection = () => {
	const adventures = [
		{
			img: DesertImage,
			title: "Desert, Sahara",
			price: "$2830",
			rating: 5,
			days: 16,
			remainingSeats: 12,
		},
		{
			img: BeachImage,
			title: "Beach, Marina",
			price: "$2370",
			rating: 5,
			days: 8,
			remainingSeats: 7,
		},
		{
			img: ForestImage,
			title: "Forest, Agadir",
			price: "$1350",
			rating: 5,
			days: 16,
			remainingSeats: 12,
		},
		{
			img: MountainImage,
			title: "Mountain, Ifran",
			price: "$1870",
			rating: 5,
			days: 16,
			remainingSeats: 12,
		},
	];

	return (
		<section className="popular-adventures-section">
			<section className="heading-container max-width">
				<h5>Modern & Beautiful</h5>
				<h3>Most Popular Adventures We Have</h3>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere
					tempor mauris, nec imperdiet mi rutrum eget. Donec quis ligula in
					tellus dictum consequat.
				</p>
			</section>
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
