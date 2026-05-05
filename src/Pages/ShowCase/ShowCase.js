import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import MoroccanOdysseyShowCaseItem from "./MoroccanOdyssey";
import BlueAndBeyondShowCaseItem from "./BlueAndBeyond";
import DesertShowCaseItem from "./Desert";

import "./ShowCase.css";

const ShowCaseItem = ({ info }) => {
	const { title, subTitle, showCaseImage, heroImage, link } = info;
	const videoRef = useRef(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const load = () => {
			video.src = showCaseImage;
			video.load();
			video.play().catch(() => {});
		};

		const t = setTimeout(load, 1000);
		return () => clearTimeout(t);
	}, [showCaseImage]);

	const handlePlay = () => {
		if (videoRef.current) videoRef.current.classList.add("playing");
	};

	return (
		<div
			className="show-case-item"
			style={{
				backgroundImage: `url(${heroImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<video
				ref={videoRef}
				className="show-case-video"
				muted
				loop
				playsInline
				poster={heroImage}
				onPlay={handlePlay}
			/>
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
		<section className="show-case">
			<ShowCaseItem info={BlueAndBeyondShowCaseItem} />
			<ShowCaseItem info={MoroccanOdysseyShowCaseItem} />
			<ShowCaseItem info={DesertShowCaseItem} />
		</section>
	);
}

export default ShowCase;
