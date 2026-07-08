import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Logo from "./Nav-Logo-Footer/Logo/Logo";
import Navbar from "./Nav-Logo-Footer/Navbar/Navbar";
import Footer from "./Nav-Logo-Footer/Footer/Footer";
import PopularAdventuresSection from "./Nav-Logo-Footer/PopularSection";
import ScrollToTop from "./ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./Components/Toast/ToastProvider";
import "./App.css";

function App() {
	const pathname = useLocation().pathname;
	const isHome = pathname === "/";
	// Full-bleed app pages provide their own footer/spacing.
	const isAppPage = ["/book", "/login", "/account", "/find-booking"].includes(pathname);

	return (
		<AuthProvider>
			<ToastProvider>
				<div className="App">
					<ScrollToTop />
					<div className="header">
						<Logo />
						<Navbar color="#fff" />
					</div>
					<Outlet />
					{!isHome && !isAppPage && (
						<>
							<PopularAdventuresSection />
							<Footer />
						</>
					)}
					{isAppPage && <Footer />}
				</div>
			</ToastProvider>
		</AuthProvider>
	);
}

export default App;
