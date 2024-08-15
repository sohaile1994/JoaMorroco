const HeroSection = ({ image, reviews, title, price, duration }) => {
	return (
		<section
			className="hero-destination-page background-image"
			style={{ backgroundImage: `url(${image})` }}
		>
			<div className="flex-center">
				<h1>{title}</h1>
			</div>

			<h4>{price + "/" + duration + (duration > 1 ? " days" : "day")}</h4>
			{/* <img src={scrollImage}></img>*/}
			<h4>{reviews}</h4>
		</section>
	);
};
export default HeroSection;
