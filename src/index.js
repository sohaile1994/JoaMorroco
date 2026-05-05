import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import ShowCase from "./Pages/ShowCase/ShowCase";
import AboutPage from "./Pages/About/AboutPage";
import ContactPage from "./Pages/Contact/Contact";

import MoroccanOdysseyPage from "./Pages/MoroccanOdyssey/MoroccanOdyssey";
import BlueAndBeyondPage from "./Pages/BlueAndBeyond/BlueAndBeyond";
import DesertPage from "./Pages/Desert/DesertPage";

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
				path: "moroccan-odyssey",
				element: <MoroccanOdysseyPage />,
			},
			{
				path: "blue-and-beyond",
				element: <BlueAndBeyondPage />,
			},
			{
				path: "desert",
				element: <DesertPage />,
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

