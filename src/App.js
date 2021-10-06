import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import { firebase } from "./firebase";
function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
				<Switch>
					<Route path='/login'>
						<Login />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
