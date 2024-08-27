// src/App.js
import React from "react";
import Logo from "./Home/Logo/Logo";
import Navbar from "./Home/Navbar/Navbar"; // Assuming you have a Navbar component
import Footer from "./Home/Footer/Footer";
import { Outlet } from "react-router-dom"; // This will render the matched child route component
import "./App.css";

function App() {
	return (
		<div className="App">
			<div className="header">
				<Logo />
				<Navbar color="#fff" />
			</div>

			<Outlet />

			<Footer />
		</div>
	);
}

export default App;
