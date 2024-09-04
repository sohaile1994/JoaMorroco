// src/App.js
import React from "react";
import Logo from "./Nav-Logo-Footer/Logo/Logo";
import Navbar from "./Nav-Logo-Footer/Navbar/Navbar"; // Assuming you have a Navbar component
import Footer from "./Nav-Logo-Footer/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import ShowCase from "./Pages/ShowCase/ShowCase";
import "./App.css";
import PopularAdventuresSection from "./Nav-Logo-Footer/PopularSection";

function App() {
	const isHome = useLocation().pathname === "/";

	return (
		<div className="App">
			<div className="header">
				<Logo />
				<Navbar color="#fff" />
			</div>

			<Outlet />
			<PopularAdventuresSection />
			{isHome ? <ShowCase /> : <Footer />}
		</div>
	);
}

export default App;
