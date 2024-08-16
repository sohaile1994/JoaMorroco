import React from "react";

import DestinationPage from "../../Components/DestinationPageConstructor/DestinationPageConstructor.js";

const information = {
	title: "Desert",
	price: "$750",
	duration: 10,
	destination: "Sahara",
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
	{
		day: 1,
		title: "Meet at Location",
		description: "Meet and greet etc etc",
		activities: ["Eat breakfast", "Visit pool", "Go to waterfall"],
	},
	{
		day: 2,
		title: "Drive to Location",
		description: "Drive and sightseeing etc etc",
		activities: [
			"Lunch at local cafe",
			"Historic site visit",
			"Evening at the beach",
		],
	},
	{
		day: 3,
		title: "Explore the City",
		description: "City tour etc etc",
		activities: ["Museum visit", "Shopping", "Dinner at a rooftop restaurant"],
	},
	{
		day: 4,
		title: "Departure",
		description: "Check-out and head back",
		activities: ["Breakfast", "Last minute shopping", "Airport transfer"],
	},
];

const gallery = [
	"src/sahara-show-case.jpg",
	"src/sahara-show-case.jpg",
	"src/sahara-show-case.jpg",
	"src/sahara-show-case.jpg",
];

const reviews = [5, 4, 5, 3];
function DesertPage() {
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
export default DesertPage;
