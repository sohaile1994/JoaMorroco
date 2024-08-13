import React from "react";
import DestinationPage from "../../Components/DestinationPageConstructor.js";
import DesertImage from "../../assets/desert-show-case.jpg";
const information = {
	title: "Beach",
	price: "$500",
	duration: 3,
	description: "amazing trip to the beach",
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
	notIncluded: ["Accommondation", "Personal Guide", "Typical Souvenir"],
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

function BeachPage() {
	return (
		<DestinationPage
			image={DesertImage}
			title="Beach"
			information={information}
			tourPlan={tourPlan}
			gallery={gallery}
			reviews="****"
		/>
	);
}
export default BeachPage;
