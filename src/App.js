import "./App.css";
import ShowCase from "./Home/ShowCase/ShowCase.js";
import Header from "./Home/Header.js";
import Navbar from "./Home/Navbar/Navbar.js";

function App() {
	return (
		<div className="App">
			<Header />
			<Navbar />
			<ShowCase />
		</div>
	);
}

export default App;
