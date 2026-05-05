import React from "react";
import DestinationPage from "../../Components/DestinationPageConstructor/DestinationPageConstructor.js";
import information from "./information.js";
import tourPlan from "./tourPlan.js";
import gallery from "./gallery.js";
import reviews from "./reviews.js";
import Images from "../../images.js";

function MoroccanOdysseyPage() {
	return (
		<DestinationPage
			tour="moroccan-odyssey"
			theme="moroccan"
			image={Images.MoroccanOdysseyHero}
			information={information}
			tourPlan={tourPlan}
			gallery={gallery}
			reviews={reviews}
		/>
	);
}
export default MoroccanOdysseyPage;
