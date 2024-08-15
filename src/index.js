import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import BeachPage from "./Pages/Beach/BeachPage.js";
import ForestPage from "./Pages/Forest/ForestPage.js";
import DesertPage from "./Pages/Desert/DesertPage.js";
import MountainPage from "./Pages/Mountain/MountainPage.js";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
