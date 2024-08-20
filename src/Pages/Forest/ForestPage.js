import React from "react";

import DestinationPage from "../../Components/DestinationPageConstructor/DestinationPageConstructor.js";

import information from "./information.js";
import tourPlan from "./tourPlan.js";
import gallery from "./gallery.js";
import reviews from "./reviews.js";

function ForestPage() {
	return (
		<DestinationPage
			image={
				"https://thumbs.dreamstime.com/b/akchour-green-forest-morocco-floresta-densa-e-verde-de-perto-chefchaouen-no-marroco-inverno-190874481.jpg"
			}
			information={information}
			tourPlan={tourPlan}
			gallery={gallery}
			reviews={reviews}
		/>
	);
}
export default ForestPage;
