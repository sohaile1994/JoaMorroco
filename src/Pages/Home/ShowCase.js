import React from "react";

import { Link } from "react-router-dom";

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

			<Link to={"/" + link} className="book-btn">
				<p>BOOK NOW</p>
			</Link>
		</div>
	);
};

const DesertShowCaseItem = () => (
	<ShowCaseItem
		title="Sahara Desert"
		subTitle="Beautiful"
		image="/assets/desert-show-case.jpg"
		link={"desertPage"}
	/>
);
const ForestShowCaseItem = () => (
	<ShowCaseItem
		title="Forest March"
		subTitle="Exotic"
		image={
			"https://thumbs.dreamstime.com/b/akchour-green-forest-morocco-floresta-densa-e-verde-de-perto-chefchaouen-no-marroco-inverno-190874481.jpg"
		}
		link={"forestPage"}
	/>
);
const MountainShowCaseItem = () => (
	<ShowCaseItem
		title="Mountain Climb"
		subTitle="Gorgeous"
		image={
			"https://thumbs.dreamstime.com/z/ifrane-morocco-ifrane-morocco-snowfall-white-mountain-sky-cold-tree-fog-landscape-beautiful-164071116.jpg"
		}
		link={"mountainPage"}
	/>
);
const BeachShowCaseItem = () => (
	<ShowCaseItem
		title="Surf on the Beach"
		subTitle="Stunning"
		image={
			"https://womenbesttravel.com/wp-content/uploads/2020/08/Best-Morocco-beaches-1-768x768.jpg"
		}
		link={"beachPage"}
	/>
);

function ShowCase() {
	return (
		<div className="show-case">
			<DesertShowCaseItem />
			<BeachShowCaseItem />
			<ForestShowCaseItem />
			<MountainShowCaseItem />
		</div>
	);
}

export default ShowCase;
