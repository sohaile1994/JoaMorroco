import useInView from "../../../hooks/useInView";
import GalleryContent from "./Gallery.js";
import "./Information.css";

const InformationItem = ({ title, description, index }) => {
	const [ref, inView] = useInView();
	return (
		<li
			ref={ref}
			className={`info-item anim fade-right ${inView ? "anim-in" : ""}`}
			style={{ "--anim-delay": `${(index ?? 0) * 80}ms` }}
		>
			<h6>{title}</h6>
			<p>{description}</p>
		</li>
	);
};

const InformationContent = ({ info, gallery }) => {
	const [descRef, descInView] = useInView();
	const {
		title,
		price,
		description,
		destination,
		departureTime,
		dressCode,
		included,
	} = info;

	return (
		<div className="information-destination-page">
			<div
				ref={descRef}
				className={`description anim fade-up ${descInView ? "anim-in" : ""}`}
			>
				<h2>{title}</h2>
				<h4>{price} / per person</h4>
				{(Array.isArray(description) ? description : [description]).map(
					(paragraph, index) => (
						<p key={index}>{paragraph}</p>
					)
				)}
			</div>
			<ul>
				<InformationItem index={0} title="Destination" description={destination} />
				<InformationItem index={1} title="Departure Time" description={departureTime} />
				<InformationItem
					index={2}
					title="Dress Code"
					description={dressCode.join(", ")}
				/>
				<InformationItem
					index={3}
					title="Included"
					description={included.join(", ")}
				/>
			</ul>
			<GalleryContent info={gallery} />
		</div>
	);
};

export default InformationContent;
