import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { TOUR_LIST } from "../../data/tours";

import "./ShowCase.css";

const ShowCaseItem = ({ tour }) => {
	const { name, subTitle, video, heroImage, route, days, priceRange } = tour;
	const videoRef = useRef(null);

	useEffect(() => {
		const el = videoRef.current;
		if (!el) return;
		const load = () => {
			el.src = video;
			el.load();
			el.play().catch(() => {});
		};
		const t = setTimeout(load, 1000);
		return () => clearTimeout(t);
	}, [video]);

	const handlePlay = () => {
		if (videoRef.current) videoRef.current.classList.add("playing");
	};

	return (
		<div
			className="show-case-item"
			style={{
				backgroundImage: `url(${heroImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<video
				ref={videoRef}
				className="show-case-video"
				muted
				loop
				playsInline
				poster={heroImage}
				onPlay={handlePlay}
			/>
			<div className="show-case-content">
				<span className="show-case-eyebrow">{days} Days · Private</span>
				<h2>{name}</h2>
				<h4>{subTitle}</h4>
				<span className="show-case-price">{priceRange} / person · kids 50% off</span>
				<Link to={route} className="book-btn">
					<span>EXPLORE &amp; BOOK</span>
				</Link>
			</div>
		</div>
	);
};

function ShowCase() {
	return (
		<section className="show-case show-case--duo">
			{TOUR_LIST.map((tour) => (
				<ShowCaseItem key={tour.key} tour={tour} />
			))}
		</section>
	);
}

export default ShowCase;
