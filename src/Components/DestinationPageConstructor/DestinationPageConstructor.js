import React, { Component } from "react";
import HeroSection from "./HeroSection";
import MenuContent from "./Menu";
import ContentSection from "./Content/ContentSection";
import Navbar from "../../Home/Navbar/Navbar.js";

import "./DestinationPageConstructor.css";

import { MenuTypes } from "./Menu";

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
		const { image, reviews, information, tourPlan, gallery } = this.props;
		const { selectedContent } = this.state;

		return (
			<div className="destination-page-container">
				<Navbar />

				<HeroSection
					image={image}
					reviews={reviews}
					title={information.title}
					price={information.price}
					duration={information.duration}
				/>
				<MenuContent
					onMenuClick={this.handleMenuClick}
					selectedContent={selectedContent} // Pass current selectedContent to MenuContent
				/>

				<ContentSection
					selectedContent={selectedContent} // Pass current selectedContent to ContentSection
					information={information}
					tourPlan={tourPlan}
					gallery={gallery}
					reviews={reviews}
				/>
			</div>
		);
	}
}

export default DestinationPage;
