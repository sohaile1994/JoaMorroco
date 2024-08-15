import React from "react";

import DestinationPage from "../../Components/DestinationPageConstructor/DestinationPageConstructor.js";

const information = {
	title: "Mountain",
	price: "$500",
	duration: 7,
	description:
		"Loremficitur euisms mattis bibendum cursus elementum. Efficitur montes mollis porttitor sila. Facilisi parturient erat consectetur at morbi proin euismod. Dictumst maecenas lacus ridiculus sociosqu tempor taciti convallis. Conubia quam pretium vehicula cubilia ridiculus sapien metus. Himenaeos in diam; cras justo natoque natoque malesuada luctus adipiscing.",
	departure: "Please arrive by 9:15 AM for a prompt departure at 9:30 AM.",
	departureTime: "Approximately 8:30 PM.",
	dressCode: [
		"Casual",
		"Comfortable",
		"athletic clothing",
		"hiking shoes",
		"hat",
		"warm jacket",
	],
	included: ["All Museum Tickets", "Meals", "Transportation/Car"],
	notIncluded: ["Accommodation", "Personal Guide", "Typical Souvenir"],
};
const tourPlan = [
	{ day: 1, plan: "meet and greet" },
	{ day: 2, plan: "drive to location" },
	{ day: 3, plan: "see the doms" },
	{ day: 4, plan: "go back" },
];
const gallery = [
	"src/sahara-show-case.jpg",
	"src/sahara-show-case.jpg",
	"src/sahara-show-case.jpg",
	"src/sahara-show-case.jpg",
];

const reviews = [5, 4, 5, 3];
function MountainPage() {
	const averageReviews =
		reviews.reduce((sum, review) => {
			return sum + review;
		}, 0) / reviews.length;

	return (
		<DestinationPage
			image={"/assets/desert-show-case.jpg"}
			information={information}
			tourPlan={tourPlan}
			gallery={gallery}
			reviews={parseFloat(averageReviews.toFixed(1))}
		/>
	);
}
export default MountainPage;
