import React from "react";

import DestinationPage from "../../Components/DestinationPageConstructor/DestinationPageConstructor.js";

import information from "./information.js";
import tourPlan from "./tourPlan.js";
import gallery from "./gallery.js";
import reviews from "./reviews.js";

function MountainPage() {
	return (
		<DestinationPage
			image={
				"https://thumbs.dreamstime.com/z/ifrane-morocco-ifrane-morocco-snowfall-white-mountain-sky-cold-tree-fog-landscape-beautiful-164071116.jpg"
			}
			information={information}
			tourPlan={tourPlan}
			gallery={gallery}
			reviews={reviews}
		/>
	);
}
export default MountainPage;
