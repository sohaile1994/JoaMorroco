import { Link } from "react-router-dom";
import "./ConsultButton.css";

// Always-visible call to action on every page; opens the contact postcard
// with the subject pre-filled.
const ConsultButton = () => (
	<Link className="floating-consult-btn" to="/contact?topic=consultation">
		Free Consultation
	</Link>
);

export default ConsultButton;
