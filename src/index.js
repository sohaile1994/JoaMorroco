// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import ShowCase from "./Pages/ShowCase/ShowCase";
import AboutPage from "./Pages/About/AboutPage";
import ContactPage from "./Pages/Contact/Contact";
import BeachPage from "./Pages/Beach/BeachPage";
import ForestPage from "./Pages/Forest/ForestPage";
import DesertPage from "./Pages/Desert/DesertPage";
import MountainPage from "./Pages/Mountain/MountainPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <ShowCase />,
			},
			{
				path: "about",
				element: <AboutPage />,
			},
			{
				path: "contact",
				element: <ContactPage />,
			},
			{
				path: "beachPage",
				element: <BeachPage />,
			},
			{
				path: "forestPage",
				element: <ForestPage />,
			},
			{
				path: "desertPage",
				element: <DesertPage />,
			},
			{
				path: "mountainPage",
				element: <MountainPage />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

reportWebVitals();
