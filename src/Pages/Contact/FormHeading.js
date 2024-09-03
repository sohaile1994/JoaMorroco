import React from "react";
import SocialMediaIcons from "../../Nav-Logo-Footer/SocialMediaIcons/SocialMediaIcons";
import {
	faYoutube,
	faFacebook,
	faTwitter,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const FormHeading = () => {
	return (
		<div className="contact-info">
			<h2>Feel Free to Contact us For Help or Additional Info</h2>
			<p>
				<strong>name:</strong> Joamorocco, Morocco
			</p>
			<p>
				<strong>mail:</strong> joamorroco@gmail.com
			</p>

			<p>
				<strong>phone:</strong> +1 614.380.9363
			</p>
			<SocialMediaIcons />
		</div>
	);
};
export default FormHeading;
