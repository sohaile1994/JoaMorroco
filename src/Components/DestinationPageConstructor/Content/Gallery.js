import useInView from "../../../hooks/useInView";
import "./Gallery.css";

const GalleryItem = ({ item, index }) => {
	const [ref, inView] = useInView();
	return (
		<div
			ref={ref}
			className={`gallery-item anim scale-up ${inView ? "anim-in" : ""}`}
			style={{ "--anim-delay": `${(index % 3) * 80}ms` }}
		>
			<img src={item.image} alt={item.title} loading="lazy" />
		</div>
	);
};

const GalleryContent = ({ info }) => {
	return (
		<div className="gallery-destination-page">
			<div className="gallery-title">
				<h1>From Our Gallery</h1>
			</div>
			<div className="gallery-content">
				{info.map((item, index) => (
					<GalleryItem key={index} item={item} index={index} />
				))}
			</div>
		</div>
	);
};

export default GalleryContent;
