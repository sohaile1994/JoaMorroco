import React from "react";

import DestinationPage from "../../Components/DestinationPageConstructor/DestinationPageConstructor.js";

import information from "./information.js";
import tourPlan from "./tourPlan.js";
import gallery from "./gallery.js";
import reviews from "./reviews.js";

function BeachPage() {
	return (
		<DestinationPage
			image={
				"https://womenbesttravel.com/wp-content/uploads/2020/08/Best-Morocco-beaches-1-768x768.jpg"
			}
			information={information}
			tourPlan={tourPlan}
			gallery={gallery}
			reviews={reviews}
		/>
	);
}
export default BeachPage;
