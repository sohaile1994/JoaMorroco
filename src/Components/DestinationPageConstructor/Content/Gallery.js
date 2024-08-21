import "./Gallery.css";

const GalleryContent = ({ info }) => {
	return (
		<div className="gallery-destination-page content">
			{info.map((item, index) => (
				<div className="gallery-item" key={index}>
					<img src={item.image} alt={item.title} />
				</div>
			))}
		</div>
	);
};

export default GalleryContent;
