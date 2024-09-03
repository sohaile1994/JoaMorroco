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
const Twitter = () => {
	return <SocialMediaItem link="https://www.twitter.com/" icon={faTwitter} />;
};
const Facebook = () => {
	return <SocialMediaItem link="https://www.twitter.com/" icon={faFacebook} />;
};
const Instagram = () => {
	return <SocialMediaItem link="https://www.twitter.com/" icon={faInstagram} />;
};
const Youtube = () => {
	return <SocialMediaItem link="https://www.twitter.com/" icon={faYoutube} />;
};

const SocialMediaIcons = () => {
	return (
		<div className="media-icons">
			<ul>
				<li>
					<Twitter />
				</li>
				<li>
					<Facebook />
				</li>
				<li>
					<Instagram />
				</li>
				<li>
					<Youtube />
				</li>
			</ul>
		</div>
	);
};

export default SocialMediaIcons;
