import "./Gallery.css";

const GalleryContent = ({ info }) => {
	return (
		<div className="gallery-destination-page">
			<div className="gallery-title">
				<h1>From our gallery</h1>
				<p>kjaskjhf jakshf jaskhfjash fjkash fjkahs kjfhas jkf hkasj</p>
			</div>
			<div className="gallery-content">
				{info.map((item, index) => (
					<div className="gallery-item" key={index}>
						<img src={item.image} alt={item.title} />
					</div>
				))}
			</div>
		</div>
	);
};

export default GalleryContent;
