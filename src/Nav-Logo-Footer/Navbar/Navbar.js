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
		if (!this.hamburgerRef.current) return;
		const elements = document.querySelectorAll("body *");
		const { bottom, top, right, left } =
			this.hamburgerRef.current.getBoundingClientRect();
		let newHamburgerColor = "white";

		for (let i = elements.length - 1; i >= 0; i--) {
			let element = elements[i];
			const rect = element.getBoundingClientRect();
			if (
				rect.top <= bottom &&
				rect.bottom >= top &&
				rect.left <= right &&
				rect.right >= left
			) {
				let bgColor = window.getComputedStyle(element).backgroundColor;
				while (bgColor === "rgba(0, 0, 0, 0)" || bgColor === "transparent") {
					element = element.parentElement;
					if (!element) break;
					bgColor = window.getComputedStyle(element).backgroundColor;
				}
				if (bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") {
					newHamburgerColor =
						this.getLuminance(bgColor) > 0.5 ? "black" : "white";
					break;
				}
			}
		}
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

	toggleMenu = () => {
		this.updateHamburgerColor();
		this.setState({ isOpen: !this.state.isOpen });
	};

	closeMenu = () => this.setState({ isOpen: false });

	render() {
		const { isOpen, hamburgerColor } = this.state;
		const navItems = [
			{ label: "Tours", path: "/" },
			{ label: "About", path: "/about" },
			{ label: "Contact", path: "/contact" },
		];

		return (
			<nav className="navbar">
				{/* Mobile hamburger */}
				<div
					className={`hamburger ${isOpen ? "open" : ""}`}
					onClick={this.toggleMenu}
					ref={this.hamburgerRef}
				>
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className="line"
							style={{
								backgroundColor: hamburgerColor,
								borderColor: hamburgerColor,
							}}
						/>
					))}
				</div>

				{isOpen && <div className="blur" onClick={this.closeMenu} />}

				{/* Nav panel — overlay on mobile, inline on desktop */}
				<div className={`nav-links ${isOpen ? "open" : ""}`}>
					<ul>
						{navItems.map((item, i) => (
							<li key={i}>
								<Link to={item.path} onClick={this.closeMenu}>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
					<div className="nav-social">
						<SocialMediaIcons />
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
