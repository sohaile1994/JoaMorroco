import React, { Component } from "react";
import { Link } from "react-router-dom";
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

	render() {
		const { isOpen } = this.state;

		return (
			<nav className="navbar">
				<div className="hamburger" onClick={this.toggleMenu}>
					<div className={`line ${isOpen ? "open" : ""}`}></div>
					<div className={`line ${isOpen ? "open" : ""}`}></div>
					<div className={`line ${isOpen ? "open" : ""}`}></div>
				</div>
				<div className={`nav-links ${isOpen ? "open" : ""}`}>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>

						<li>
							<Link to="/about">About</Link>
						</li>

						<li>
							<Link to="/contact">Contact</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Navbar;
