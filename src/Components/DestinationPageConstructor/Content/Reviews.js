import React from "react";
import "./Reviews.css";

// Define the smaller components inside ReviewsContent.js

const ReviewImage = ({ image }) => {
	return <img src={image} alt="Profile" className="profile-image" />;
};

const ReviewName = ({ name }) => {
	return <h4 className="review-name">{name}</h4>;
};

const ReviewReview = ({ review }) => {
	return <p className="review-review">{review}</p>;
};

const ReviewRating = ({ stars }) => {
	const starElements = [];
	for (let i = 0; i < 5; i++) {
		starElements.push(
			<span key={i} className={`star ${i < stars ? "filled" : "empty"}`}>
				&#9733;
			</span>
		);
	}

	return (
		<div className="review-rating">
			<span className="rating-label">Rating: </span>
			{starElements}
		</div>
	);
};

// Main ReviewsContent component
const ReviewsContent = ({ info }) => {
	return (
		<div className="review-content">
			{info.map((review, index) => (
				<div key={index} className="review-item">
					<ReviewImage image={review.profileImage} />
					<div className="review-info">
						<div className="review-header">
							<ReviewName name={review.name} />
						</div>
						<ReviewRating stars={review.stars} />
						<ReviewReview review={review.review} />
					</div>
				</div>
			))}
		</div>
	);
};

export default ReviewsContent;
