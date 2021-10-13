import "./App.css";
import Header from "./components/Header";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import Profile from "./components/Profile";
import Forms from "./components/Forms";
import Templates from "./components/Templates";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createUserAction } from "./store/userReducer";
import { fetchUsers } from "./asyncActions/users";
function App() {
	const dispatch = useDispatch();
	const name = useSelector((state) => state.user.name);
	const id = useSelector((state) => state.user.id);
	const users = useSelector((state) => state.user.customers);

	const createUser = () => {
		const user = {
			name: "Alex",
			id: Date.now(),
		};
		dispatch(createUserAction(user));
	};
	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
				{name}
				{id}

				{users ? users.map((user) => <div>{user.name}</div>) : "users not found"}
				<button onClick={createUser}>add</button>
				<button onClick={() => dispatch(fetchUsers())}>from DB</button>
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
					<Route path='/templates'>
						<Templates />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
