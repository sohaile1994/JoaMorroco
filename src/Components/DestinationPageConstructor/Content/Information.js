import "./Information.css";

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
		<div className="information-destination-page content">
			<div className="description">
				<h2>{title}</h2>
				<h4>{price} / per person</h4>
				<p>{description}</p>
			</div>
			<ul>
				<li>
					<h6>Destination</h6>
					<p>{destination}</p>
				</li>
				<li>
					<h6>Departure</h6>
					<p>{departure}</p>
				</li>
				<li>
					<h6>Departure Time</h6>
					<p>{departureTime}</p>
				</li>
				<li>
					<h6>Dress Code</h6>
					<p>{dressCode}</p>
				</li>
				<li className="included">
					<h6>Included</h6>
					<p>{included}</p>
				</li>
				<li className="not-included">
					<h6>Not Included</h6>
					<p>{notIncluded}</p>
				</li>
			</ul>
		</div>
	);
};

export default InformationContent;
