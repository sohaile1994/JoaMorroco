import React from "react";

import { Link } from "react-router-dom";

const Logo = () => {
	return (
		<div className="logo-container">
			<img src="/assets/logo.png" alt="logo" />
		</div>
	);
};

const NavBarItem = ({ name, link }) => {
	return (
		<Link
			to={"/" + link}
			style={{
				"text-decoration": "none",
				"font-size": "3rem",
				display: "block",
			}}
		>
			{name}
		</Link>
	);
};

const HomeNavBarItem = () => <NavBarItem name="Home" link={"beachPage"} />;
const BookNavBarItem = () => <NavBarItem name="Book" link={"beachPage"} />;
const AboutNavBarItem = () => <NavBarItem name="About" link={"beachPage"} />;
const ContactNavBarItem = () => (
	<NavBarItem name="Contact" link={"beachPage"} />
);
const NavBar = () => {
	return (
		<nav>
			<HomeNavBarItem />
			<BookNavBarItem />
			<AboutNavBarItem />
			<ContactNavBarItem />
		</nav>
	);
};
function Header() {
	return (
		<div className="Header">
			<Logo />
			<NavBar />
		</div>
	);
}

export default Header;
