import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import App from "./App";
import ShowCase from "./Pages/ShowCase/ShowCase";
import AboutPage from "./Pages/About/AboutPage";
import ContactPage from "./Pages/Contact/Contact";

import KingdomPage from "./Pages/Kingdom/Kingdom";
import DesertPage from "./Pages/Desert/DesertPage";
import BookingWizard from "./Pages/Booking/BookingWizard";
import AuthPage from "./Pages/Auth/AuthPage";
import AccountPage from "./Pages/Account/AccountPage";
import FindBookingPage from "./Pages/Account/FindBookingPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ index: true, element: <ShowCase /> },
			{ path: "about", element: <AboutPage /> },
			{ path: "contact", element: <ContactPage /> },

			{ path: "kingdom-of-morocco", element: <KingdomPage /> },
			{ path: "desert", element: <DesertPage /> },

			{ path: "book", element: <BookingWizard /> },
			{ path: "login", element: <AuthPage /> },
			{ path: "account", element: <AccountPage /> },
			{ path: "find-booking", element: <FindBookingPage /> },

			// Legacy redirect
			{ path: "moroccan-odyssey", element: <Navigate to="/kingdom-of-morocco" replace /> },
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
