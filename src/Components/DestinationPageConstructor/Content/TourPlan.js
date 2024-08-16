import React from "react";
import "./TourPlan.css";

const TourPlan = ({ info }) => {
	return (
		<div className="tour-plan-destination-page content">
			{info.map((item, index) => (
				<div key={index} className="day-item">
					<div className="day-number">
						<span>{item.day}</span>
					</div>
					<div className="day-content">
						<h3>{`Day ${item.day}: ${item.title}`}</h3>
						<p>{item.description}</p>
						<ul>
							{item.activities.map((activity, i) => (
								<li key={i}>{activity}</li>
							))}
						</ul>
					</div>
				</div>
			))}
		</div>
	);
};

export default TourPlan;
