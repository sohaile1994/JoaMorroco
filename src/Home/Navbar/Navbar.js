import React, { Component } from "react";
import { Link } from "react-router-dom";
import SocialMediaIcons from "../SocialMediaIcons/SocialMediaIcons";
import "./Navbar.css"; // Import your custom CSS

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		};
	}

	toggleMenu = () => {
		this.setState((prevState) => ({
			isOpen: !prevState.isOpen,
		}));
	};
	closeMenu = () => {
		this.setState({ isOpen: false });
	};
	render() {
		const { isOpen } = this.state;
		const { color } = this.props;
		const lineColor = {
			backgroundColor: color,
		};
		return (
			<nav className="navbar">
				<div
					className={`hamburger ${isOpen ? "open" : ""}`}
					onClick={this.toggleMenu}
				>
					<div className="line" style={lineColor}></div>
					<div className="line" style={lineColor}></div>
					<div className="line" style={lineColor}></div>
				</div>
				<div className={`nav-links ${isOpen ? "open" : ""}`}>
					<ul>
						<li>
							<Link to="/" onClick={this.closeMenu}>
								Tours
							</Link>
						</li>
						<li>
							<Link to="/about" onClick={this.closeMenu}>
								About
							</Link>
						</li>
						<li>
							<Link to="/contact" onClick={this.closeMenu}>
								Contact
							</Link>
						</li>
					</ul>

					<SocialMediaIcons />
				</div>
			</nav>
		);
	}
}

export default Navbar;
