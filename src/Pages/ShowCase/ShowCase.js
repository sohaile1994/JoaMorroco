import React from "react";

import { Link } from "react-router-dom";

import BeachShowCaseItem from "./Beach";
import DesertShowCaseItem from "./Desert";
import ForestShowCaseItem from "./Forest";
import MountainShowCaseItem from "./Mountain";

import "./ShowCase.css";

const ShowCaseItem = ({ info }) => {
	const { title, subTitle, image, link } = info;
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
			<div className="mask"></div>
			<h2>{title}</h2>
			<h4>{subTitle}</h4>

			<Link to={"/" + link} className="book-btn">
				<p>BOOK NOW</p>
			</Link>
		</div>
	);
};

function ShowCase() {
	return (
		<div className="show-case">
			<ShowCaseItem info={DesertShowCaseItem} />
			<ShowCaseItem info={BeachShowCaseItem} />
			<ShowCaseItem info={ForestShowCaseItem} />
			<ShowCaseItem info={MountainShowCaseItem} />
		</div>
	);
}

export default ShowCase;
