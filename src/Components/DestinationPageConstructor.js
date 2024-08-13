import React from "react";
import scrollImage from "../assets/scroll-icon.png";

const DestinationPage = ({
	image,
	reviews,
	information,
	tourPlan,
	gallery,
}) => {
	return (
		<div className="destination-page-container">
			<HeroSection
				image={image}
				reviews={reviews}
				title={information.title}
				price={information.price}
				duration={information.duration}
			/>
			<MenuSection
				information={information}
				tourPlan={tourPlan}
				gallery={gallery}
				reviews={reviews}
			/>
			<bookFormSection />
		</div>
	);
};

const HeroSection = ({ image, reviews, title, price, duration }) => {
	<section className="tour-page-hero" style={{ background: image }}>
		<h1>{title}</h1>
		<h4>{price + "/" + duration + (duration > 1 ? " days" : "day")}</h4>
		<img src={scrollImage}></img>
		<h4>{reviews}</h4>
	</section>;
};
const MenuSection = ({ information, tourPlan, gallery, reviews }) => {
	<section className="tour-page-menu">
		<button>Information</button>
		<button>Tour Plan</button>
		<button>Gallery</button>
		<button>Reviews</button>
	</section>;
};

const bookFormSection = ({ price, duration }) => {
	<section className="tour-page-book">
		<form>
			<label for="input-name">Name</label>
			<input id="input-name" type="text"></input>
			<label for="input-email">Email</label>
			<input id="input-email" type="email"></input>
			<label for="input-number">Phone Number</label>
			<input id="input-number" type="number"></input>
			<label for="input-date">Date</label>
			<input id="input-date" type="date"></input>
		</form>
	</section>;
};

export default DestinationPage;
