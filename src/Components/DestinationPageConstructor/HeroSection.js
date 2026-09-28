import { useRef, useState } from "react";
import "./HeroSection.css";

// Top-of-page photo gallery: swipe (native scroll-snap), arrows, or dots move
// between pictures. No caption or price on the photos — only the tour's
// average rating in gold stars, centred along the bottom edge.
const GoldStars = ({ stars }) => (
	<div className="hero-stars" aria-label={`Rated ${stars} out of 5`}>
		{[0, 1, 2, 3, 4].map((i) => (
			<span key={i} className={`gold-star ${i < stars ? "filled" : "empty"}`}>
				&#9733;
			</span>
		))}
	</div>
);

const HeroSection = ({ gallery, reviews }) => {
	const trackRef = useRef(null);
	const [index, setIndex] = useState(0);
	const averageStars = reviews.length
		? Math.round(reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length)
		: 0;

	// Slide under the viewport right now, read from the scroll position
	const current = () => {
		const track = trackRef.current;
		return track ? Math.round(track.scrollLeft / track.clientWidth) : 0;
	};

	// Slide an arrow is still smoothly scrolling to (null once settled), so
	// taps during the animation stack up instead of repeating the same move
	const target = useRef(null);
	const settle = useRef(0);

	const goTo = (i) => {
		const track = trackRef.current;
		if (!track) return;
		const n = (i + gallery.length) % gallery.length;
		target.current = n;
		clearTimeout(settle.current);
		settle.current = setTimeout(() => (target.current = null), 700);
		track.scrollTo({ left: n * track.clientWidth, behavior: "smooth" });
	};

	const onScroll = () => setIndex(current());

	const step = (delta) => goTo((target.current ?? current()) + delta);

	return (
		<section className="hero-gallery" aria-roledescription="carousel" aria-label="Tour photos">
			<div className="hero-gallery-track" ref={trackRef} onScroll={onScroll}>
				{gallery.map((item, i) => (
					<div className="hero-gallery-slide" key={item.image}>
						<img
							src={item.image}
							alt={item.title}
							loading={i === 0 ? "eager" : "lazy"}
							draggable={false}
						/>
					</div>
				))}
			</div>

			<button
				type="button"
				className="hero-gallery-arrow prev"
				aria-label="Previous photo"
				onClick={() => step(-1)}
			>
				&#8249;
			</button>
			<button
				type="button"
				className="hero-gallery-arrow next"
				aria-label="Next photo"
				onClick={() => step(1)}
			>
				&#8250;
			</button>

			<div className="hero-gallery-footer">
				<GoldStars stars={averageStars} />
				<div className="hero-gallery-dots">
					{gallery.map((item, i) => (
						<button
							type="button"
							key={item.image}
							className={i === index ? "active" : ""}
							aria-label={`Photo ${i + 1} of ${gallery.length}`}
							onClick={() => goTo(i)}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
