import React from "react";
import useInView from "../../../hooks/useInView";
import "./TourPlan.css";

const DayItem = ({ item, index }) => {
	const [ref, inView] = useInView();
	return (
		<div
			ref={ref}
			className={`day-item anim fade-right ${inView ? "anim-in" : ""}`}
			style={{ "--anim-delay": `${index * 90}ms` }}
		>
			<div className="day-number">
				<span>{item.day}</span>
			</div>
			<div className="day-content">
				<h3>{`Day ${item.day}: ${item.title}`}</h3>
				<p>{item.description}</p>
				<ul>
					{item.activities.map((activity, i) => (
						<li className="list-item" key={i}>
							{activity}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

const TourPlan = ({ info }) => {
	return (
		<div className="tour-plan-destination-page">
			{info.map((item, index) => (
				<DayItem key={index} item={item} index={index} />
			))}
		</div>
	);
};

export default TourPlan;
