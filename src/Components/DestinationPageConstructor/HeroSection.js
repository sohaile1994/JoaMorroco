import "./HeroSection.css";
import "./Content/Reviews.css";
const ReviewRating = ({ stars }) => {
	const starElements = [];
	for (let i = 0; i < 5; i++) {
		starElements.push(
			<span key={i} className={`star ${i < stars ? "filled" : "empty"}`}>
				&#9733;
			</span>
		);
	}

	return <div className="review-rating">{starElements}</div>;
};

const HeroSection = ({ image, reviews, title, price, duration }) => {
	return (
		<section
			className="hero-destination-page background-image"
			style={{ backgroundImage: `url(${image})` }}
		>
			<div className="flex-center">
				<h1>{title}</h1>
			</div>
			<div className="flex-space-between">
				<ul>
					<li>
						<h4>
							{price + "/" + duration + (duration > 1 ? " days" : " day")}
						</h4>
					</li>
					<ReviewRating stars={reviews.stars} />
				</ul>
			</div>
		</section>
	);
};

export default HeroSection;
