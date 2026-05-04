import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Logo from "./Nav-Logo-Footer/Logo/Logo";
import Navbar from "./Nav-Logo-Footer/Navbar/Navbar";
import Footer from "./Nav-Logo-Footer/Footer/Footer";
import PopularAdventuresSection from "./Nav-Logo-Footer/PopularSection";
import ScrollToTop from "./ScrollToTop";
import "./App.css";

function App() {
	const isHome = useLocation().pathname === "/";

	return (
		<div className="App">
			<ScrollToTop />
			<div className="header">
				<Logo />
				<Navbar color="#fff" />
			</div>
			<Outlet />
			{!isHome && (
				<>
					<PopularAdventuresSection />
					<Footer />
				</>
			)}
		</div>
	);
}

export default App;
