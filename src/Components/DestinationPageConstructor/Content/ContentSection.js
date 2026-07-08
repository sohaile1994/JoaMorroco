import React, { Component } from "react";
import { Link } from "react-router-dom";
import InformationContent from "./Information";
import TourPlanContent from "./TourPlan";
import GalleryContent from "./Gallery";
import ReviewsContent from "./Reviews";
import { MenuTypes } from "../Menu";
import { getTour } from "../../../data/tours";

import "./ContentSection.css";

const BookCta = ({ tour }) => {
	const t = getTour(tour);
	return (
		<aside className="book-cta" id="book-form">
			<div className="book-cta-inner">
				<h3>Book this tour</h3>
				<p className="book-cta-price">from {t?.fromPrice || ""} <span>/ person</span></p>
				<ul className="book-cta-points">
					<li>Completely private — your group only</li>
					<li>{t?.days}-day guided journey</li>
					<li>Free date changes before payment</li>
				</ul>
				<Link className="book-cta-btn" to={`/book?tour=${tour}`}>
					Start booking
				</Link>
				<Link className="book-cta-link" to="/find-booking">
					Find an existing booking
				</Link>
			</div>
		</aside>
	);
};

class ContentSection extends Component {
	render() {
		const { selectedContent, information, tourPlan, gallery, reviews, tour } =
			this.props;

		let content;
		switch (selectedContent) {
			case MenuTypes.TOURPLAN:
				content = <TourPlanContent info={tourPlan} />;
				break;
			case MenuTypes.GALLERY:
				content = <GalleryContent info={gallery} tour={tour} />;
				break;
			case MenuTypes.REVIEWS:
				content = <ReviewsContent info={reviews} tour={tour} />;
				break;
			default:
				content = <InformationContent info={information} gallery={gallery} tour={tour} />;
		}

		return (
			<section className="content-section">
				<div className="content-destination-page">
					<div className="content-container">
						<div className="content">{content}</div>
						<BookCta tour={tour} />
					</div>
				</div>
			</section>
		);
	}
}

export default ContentSection;
