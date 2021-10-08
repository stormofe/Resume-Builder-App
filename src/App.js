import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import { firebase } from "./firebase";
import Profile from "./components/Profile";
import Forms from "./components/Forms";
function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
				<Switch>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/profile'>
						<Profile />
					</Route>
					<Route path='/forms'>
						<Forms />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
