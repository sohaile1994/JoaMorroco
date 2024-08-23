import "./Information.css";

const InformationItem = ({ title, description }) => {
	return (
		<li className="info-item">
			<h6>{title}</h6>
			<p>{description}</p>
		</li>
	);
};

const InformationContent = ({ info }) => {
	const {
		title,
		price,
		description,
		destination,
		departure,
		departureTime,
		dressCode,
		included,
		notIncluded,
	} = info;

	return (
		<div className="information-destination-page">
			<div className="description">
				<h2>{title}</h2>
				<h4>{price} / per person</h4>
				<p>{description}</p>
			</div>
			<ul>
				<InformationItem title="Destination" description={destination} />
				<InformationItem title="Departure Time" description={departureTime} />
				<InformationItem title="Dress Code" description={dressCode} />
				<InformationItem
					className="included info-item"
					title="Included"
					description={included}
				/>
				<InformationItem
					className="not-included info-item"
					title="Not Included"
					description={notIncluded}
				/>
			</ul>
		</div>
	);
};

export default InformationContent;
