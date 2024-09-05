import React, { Component } from "react";
import { Link } from "react-router-dom";
import SocialMediaIcons from "../SocialMediaIcons/SocialMediaIcons";
import "./Navbar.css"; // Import your custom CSS

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			hamburgerColor: "white", // Default color for hamburger menu lines
		};
		this.hamburgerRef = React.createRef(); // Reference to the hamburger menu element
	}

	componentDidMount() {
		window.addEventListener("scroll", this.updateHamburgerColor);
		this.updateHamburgerColor(); // Ensure initial color is set correctly
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.updateHamburgerColor);
	}

	updateHamburgerColor = () => {
		const hamburgerElement = this.hamburgerRef.current;
		const elements = document.querySelectorAll("body *"); // Select all elements in the body
		let newHamburgerColor = "white";

		elements.forEach((element) => {
			const rect = element.getBoundingClientRect();
			const isBehindHamburger =
				rect.top <= hamburgerElement.getBoundingClientRect().bottom &&
				rect.bottom >= hamburgerElement.getBoundingClientRect().top &&
				rect.left <= hamburgerElement.getBoundingClientRect().right &&
				rect.right >= hamburgerElement.getBoundingClientRect().left;

			if (isBehindHamburger) {
				const backgroundColor =
					window.getComputedStyle(element).backgroundColor;
				const luminance = this.getLuminance(backgroundColor);

				// Change hamburger line color based on luminance
				if (luminance > 0.5) {
					newHamburgerColor = "black"; // Light background
				} else {
					newHamburgerColor = "white"; // Dark background
				}
			}
		});

		this.setState({
			hamburgerColor: newHamburgerColor,
		});
	};

	getLuminance = (color) => {
		const [r, g, b] = color
			.match(/\d+/g)
			.slice(0, 3)
			.map((v) =>
				(v /= 255) <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
			);
		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	};

	toggleMenu = () => {
		this.setState((prevState) => ({
			isOpen: !prevState.isOpen,
		}));
	};

	closeMenu = () => {
		this.setState({ isOpen: false });
	};

	render() {
		const { isOpen, hamburgerColor } = this.state;

		const lineStyle = {
			backgroundColor: hamburgerColor,
		};

		return (
			<nav className="navbar">
				<div
					className={`hamburger ${isOpen ? "open" : ""}`}
					onClick={this.toggleMenu}
					ref={this.hamburgerRef}
				>
					<div className="line" style={lineStyle}></div>
					<div className="line" style={lineStyle}></div>
					<div className="line" style={lineStyle}></div>
				</div>
				{isOpen && <div className="blur"></div>}
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
