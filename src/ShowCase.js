import React from "react";
import fireWolf from "./fire-wolf.png";
import mountain from "./mountain.png";

const ShowCaseItem = ({ title, subTitle, image, link }) => {
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

			<a href={link} target="_blank">
				BOOK NOW
			</a>
		</div>
	);
};

const SaharaDesert = () => (
	<ShowCaseItem
		title="Sahara Desert"
		subTitle="Beautiful"
		image={fireWolf}
		link={"https://www.google.com/"}
	/>
);
const MountainClimb = () => (
	<ShowCaseItem
		title="Mountain Climb"
		subTitle="Gorgeous"
		image={mountain}
		link={"https://www.youtube.com/"}
	/>
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
