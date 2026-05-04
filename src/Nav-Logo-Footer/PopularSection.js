import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PopularSection.css";

import DesertShowCaseItem from "../Pages/ShowCase/Desert";
import MoroccanOdysseyShowCaseItem from "../Pages/ShowCase/MoroccanOdyssey";
import BlueAndBeyondShowCaseItem from "../Pages/ShowCase/BlueAndBeyond";

const PopularAdventuresSection = () => {
	const adventures = [
		DesertShowCaseItem,
		MoroccanOdysseyShowCaseItem,
		BlueAndBeyondShowCaseItem,
	];

	const [current, setCurrent] = useState(0);
	const count = adventures.length;
	const sectionRef = useRef(null);

	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.classList.add("pop-visible");
					observer.disconnect();
				}
			},
			{ threshold: 0.08 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const prev = () => setCurrent((i) => (i - 1 + count) % count);
	const next = () => setCurrent((i) => (i + 1) % count);
	const adv = adventures[current];

	return (
		<section ref={sectionRef} className="popular-adventures-section">
			<div className="heading-container max-width">
				<h5>Modern & Beautiful</h5>
				<h3>Most Popular Adventures We Have</h3>
				<p>
					From the golden dunes of the Sahara to the blue streets of
					Chefchaouen — discover Morocco's most breathtaking tours.
				</p>
			</div>

			{/* ── Mobile carousel ── */}
			<div className="pop-carousel">
				<div className="carousel-controls">
					<button className="carousel-arrow" onClick={prev} aria-label="Previous">
						<span>&#8249;</span>
					</button>
					<div className="carousel-dots">
						{adventures.map((_, i) => (
							<button
								key={i}
								className={`dot ${i === current ? "active" : ""}`}
								onClick={() => setCurrent(i)}
								aria-label={`Go to adventure ${i + 1}`}
							/>
						))}
					</div>
					<button className="carousel-arrow" onClick={next} aria-label="Next">
						<span>&#8250;</span>
					</button>
				</div>

				<Link to={"/" + adv.link} className="carousel-card" key={current}>
					<div
						className="carousel-image"
						style={{ backgroundImage: `url(${adv.heroImage})` }}
					>
						<div className="carousel-image-overlay" />
						<div className="carousel-badge">{adv.days} Days</div>
					</div>
					<div className="carousel-body">
						<h3>{adv.title}</h3>
						<p className="carousel-location">{adv.city}</p>
						<div className="carousel-meta">
							<span className="carousel-price">{adv.price}</span>
							<span className="carousel-seats">
								{adv.remainingSeats} seats left
							</span>
						</div>
					</div>
					<div className="carousel-book-btn">Book Now</div>
				</Link>
			</div>

			{/* ── Desktop grid ── */}
			<section className="popular-adventures-showcase">
				{adventures.map((adventure, index) => (
					<Link
						to={"/" + adventure.link}
						className="showcase-item"
						key={index}
					>
						<div className="top-section">
							<div
								style={{
									backgroundImage: `url(${adventure.heroImage})`,
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
									width: "100%",
									height: "100%",
								}}
							/>
						</div>
						<div className="middle-section">
							<h3>
								{adventure.title + ", " + adventure.city}
								<span>{adventure.price}</span>
							</h3>
							<figcaption>{"★".repeat(adventure.rating)} {adventure.rating} / 5</figcaption>
							<p>An unforgettable journey through the heart of Morocco.</p>
						</div>
						<div className="bottom-section">
							<p>
								{adventure.days} Days
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
