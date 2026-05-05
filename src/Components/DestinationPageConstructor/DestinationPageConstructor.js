import React, { Component } from "react";
import HeroSection from "./HeroSection";
import MenuContent from "./Menu";
import ContentSection from "./Content/ContentSection";

import "./DestinationPageConstructor.css";
import { MenuTypes } from "./Menu";

const FloatingBookBtn = () => {
	const scrollToForm = () => {
		const el = document.getElementById("book-form");
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
	};
	return (
		<button className="floating-book-btn" onClick={scrollToForm} aria-label="Book this tour">
			Book Now
		</button>
	);
};

class DestinationPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedContent: MenuTypes.INFORMATION,
		};
	}

	handleMenuClick = (content) => {
		this.setState({ selectedContent: content });
	};

	render() {
		const { image, reviews, information, tourPlan, gallery, theme, tour } =
			this.props;
		const { selectedContent } = this.state;

		return (
			<div
				className={`destination-page-container${theme ? ` theme-${theme}` : ""}`}
			>
				<HeroSection
					image={image}
					reviews={reviews}
					title={information.title}
					price={information.price}
					duration={information.duration}
				/>
				<MenuContent
					onMenuClick={this.handleMenuClick}
					selectedContent={selectedContent}
				/>
				<ContentSection
					selectedContent={selectedContent}
					information={information}
					tourPlan={tourPlan}
					gallery={gallery}
					reviews={reviews}
					tour={tour}
				/>
				<FloatingBookBtn />
			</div>
		);
	}
}

export default DestinationPage;
