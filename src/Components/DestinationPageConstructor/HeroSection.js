import "./HeroSection.css";

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
					<li>
						<h4>
							{[...Array(reviews.stars)].map((_, i) => (
								<span key={i}>*</span>
							))}{" "}
							stars
						</h4>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default HeroSection;
