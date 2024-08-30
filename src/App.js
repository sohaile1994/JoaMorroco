// src/App.js
import React from "react";
import Logo from "./Home/Logo/Logo";
import Navbar from "./Home/Navbar/Navbar"; // Assuming you have a Navbar component
import Footer from "./Home/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import ShowCase from "./Home/ShowCase/ShowCase";
import "./App.css";

function App() {
	const isHome = useLocation().pathname === "/";

	return (
		<div className="App">
			<div className="header">
				<Logo />
				<Navbar color="#fff" />
			</div>

			<Outlet />
			{isHome ? <ShowCase /> : <Footer />}
		</div>
	);
}

export default App;
