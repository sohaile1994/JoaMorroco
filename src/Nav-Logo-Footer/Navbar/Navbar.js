import React, { Component } from "react";
import { Link } from "react-router-dom";
import SocialMediaIcons from "../SocialMediaIcons/SocialMediaIcons";
import "./Navbar.css";

class Navbar extends Component {
	state = { isOpen: false, hamburgerColor: "white" };
	hamburgerRef = React.createRef();

	componentDidMount() {
		window.addEventListener("scroll", this.updateHamburgerColor);
		this.updateHamburgerColor();
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.updateHamburgerColor);
	}

	updateHamburgerColor = () => {
		const elements = document.querySelectorAll("body *");
		const { bottom, top, right, left } =
			this.hamburgerRef.current.getBoundingClientRect();
		let newHamburgerColor = "white";

		elements.forEach((element) => {
			const rect = element.getBoundingClientRect();
			if (
				rect.top <= bottom &&
				rect.bottom >= top &&
				rect.left <= right &&
				rect.right >= left
			) {
				const bgColor = window.getComputedStyle(element).backgroundColor;
				newHamburgerColor =
					this.getLuminance(bgColor) > 0.5 ? "black" : "white";
			}
		});

		this.setState({ hamburgerColor: newHamburgerColor });
	};

	getLuminance = (color) => {
		const [r, g, b] = color
			.match(/\d+/g)
			.map((v) =>
				(v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
			);
		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	};

	toggleMenu = () => this.setState({ isOpen: !this.state.isOpen });
	closeMenu = () => this.setState({ isOpen: false });

	render() {
		const { isOpen, hamburgerColor } = this.state;

		return (
			<nav className="navbar">
				<div
					className={`hamburger ${isOpen ? "open" : ""}`}
					onClick={this.toggleMenu}
					ref={this.hamburgerRef}
				>
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className="line"
							style={{ backgroundColor: hamburgerColor }}
						></div>
					))}
				</div>
				{isOpen && <div className="blur"></div>}
				<div className={`nav-links ${isOpen ? "open" : ""}`}>
					<ul>
						{["Tours", "About", "Contact"].map((item, i) => (
							<li key={i}>
								<Link
									to={item === "Tours" ? "/" : `/${item.toLowerCase()}`}
									onClick={this.closeMenu}
								>
									{item}
								</Link>
							</li>
						))}
					</ul>
					<SocialMediaIcons />
				</div>
			</nav>
		);
	}
}

export default Navbar;
