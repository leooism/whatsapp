import React, { useState, useEffect } from "react";
import "./App.css";
import "./Sidebar";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
	const [{ user }, dispatch] = useStateValue();

	return (
		// BEM naming convention

		<div className="App">
			{!user ? (
				<Login />
			) : (
				<div className="app__body">
					{/* Sidebar */}

					<Router>
						<Sidebar />
						<Switch>
							<Route path="/room/:id" component={Chat} />

							{/* Chat */}
						</Switch>
					</Router>
				</div>
			)}
		</div>
	);
}

export default App;
