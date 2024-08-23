import React, { Component } from "react";
import InformationContent from "./Information";
import TourPlanContent from "./TourPlan";
import GalleryContent from "./Gallery";
import ReviewsContent from "./Reviews";
import BookFormSection from "./BookForm";
import { MenuTypes } from "../Menu";

import "./ContentSection.css";

class ContentSection extends Component {
	render() {
		const { selectedContent, information, tourPlan, gallery, reviews } =
			this.props;

		let content;
		// Switch statement to determine which content to display
		switch (selectedContent) {
			case MenuTypes.TOURPLAN:
				content = <TourPlanContent info={tourPlan} />;
				break;
			case MenuTypes.GALLERY:
				content = <GalleryContent info={gallery} />;
				break;
			case MenuTypes.REVIEWS:
				content = <ReviewsContent info={reviews} />;
				break;
			default:
				content = <InformationContent info={information} />;
		}

		return (
			<section className="content-destination-page">
				<div className="content-container">
					<div className="content">{content}</div>
					<BookFormSection />
				</div>
			</section>
		);
	}
}

export default ContentSection;
