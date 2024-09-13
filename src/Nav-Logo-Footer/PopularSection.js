import React from "react";
import { Link } from "react-router-dom";
import "./PopularSection.css";

import DesertShowCaseItem from "../Pages/ShowCase/Desert";
import BeachShowCaseItem from "../Pages/ShowCase/Beach";
import ForestShowCaseItem from "../Pages/ShowCase/Forest";
import MountainShowCaseItem from "../Pages/ShowCase/Mountain";

const PopularAdventuresSection = () => {
	const adventures = [
		DesertShowCaseItem,
		BeachShowCaseItem,
		ForestShowCaseItem,
		MountainShowCaseItem,
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
					<Link to={"/" + adventure.link} className="showcase-item" key={index}>
						<div className="top-section">
							<div
								style={{
									backgroundImage: `url(${adventure.image})`,
									backgroundSize: "cover", // Cover the entire figure
									backgroundRepeat: "no-repeat",
									width: "100%",
									height: "100%", // Don't repeat the image
								}}
							></div>
						</div>

						<div className="middle-section">
							<h3>
								{adventure.title + ", " + adventure.city}{" "}
								<span>{adventure.price}</span>
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
					</Link>
				))}
			</section>
		</section>
	);
};

export default PopularAdventuresSection;
