import React from "react";
import "./Logo.css";
import { Link } from "react-router-dom";

const Logo = () => {
	return (
		<div className="logo-container">
			<Link to="/">
				<img src="/assets/logo.png" alt="logo" />
			</Link>
		</div>
	);
};

export default Logo;
