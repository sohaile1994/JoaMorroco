import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faYoutube,
	faFacebook,
	faTwitter,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./SocialMediaIcons.css";

const SocialMediaItem = ({ link, icon }) => {
	return (
		<a href={link} target="_blank" rel="noopener noreferrer">
			<FontAwesomeIcon icon={icon} />
		</a>
	);
};

const SocialMediaIcons = () => {
	return (
		<div className="media-icons">
			<ul>
				<li>
					<SocialMediaItem link="https://www.twitter.com/" icon={faTwitter} />
				</li>
				<li>
					<SocialMediaItem link="https://www.twitter.com/" icon={faFacebook} />
				</li>
				<li>
					<SocialMediaItem link="https://www.twitter.com/" icon={faInstagram} />
				</li>
				<li>
					<SocialMediaItem link="https://www.twitter.com/" icon={faYoutube} />
				</li>
			</ul>
		</div>
	);
};

export default SocialMediaIcons;
