import React from "react";
import fireWolf from "./fire-wolf.png";
import mountain from "./mountain.png";

const ShowCaseItem = ({ title, subTitle, image }) => {
	return (
		<div
			className="show-case-item-container"
			style={{
				backgroundImage: `url(${image})`,
				backgroundSize: "cover",
				backgroundPosition: "left",
				backgroundRepeat: "no-repeat",
			}}
		>
			<h2>{title}</h2>
			<h4>{subTitle}</h4>

			<button>BOOK NOW</button>
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
