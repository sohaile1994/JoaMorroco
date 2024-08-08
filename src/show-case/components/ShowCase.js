import React from "react";
import fireWolf from "../fire-wolf.png";
import mountain from "../mountain.png";
import "./ShowCase.css";

const ShowCaseItem = ({ title, subTitle, image }) => {
	return (
		<div className="show-case-item-container">
			<h2>{title}</h2>
			<h4>{subTitle}</h4>
			<img src={image} alt={title} />
		</div>
	);
};

const SaharaDesert = () => (
	<ShowCaseItem title="Sahara Desert" subTitle="Beautiful" image={fireWolf} />
);
const MountainClimb = () => (
	<ShowCaseItem title="Mountain Climb" subTitle="Gorgeous" image={mountain} />
);

function ShowCase() {
	return (
		<div className="show-case">
			<SaharaDesert />
			<MountainClimb />
			<SaharaDesert />
			<MountainClimb />
		</div>
	);
}

export default ShowCase;
