import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import Header from "./components/Header";
import Info from "./components/Info";
function App() {
	const [users, setUsers] = useState([]);
	const usersCollectionRef = collection(db, "users");
	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(usersCollectionRef);
			setUsers(data.docs.map((user) => ({ ...user.data(), id: user.id })));
		};

		getUsers();
	});
	return (
		<div className='App'>
			{/*{users.map((user) => {
				return (
					<div key={user.id}>
						{user.name}, {user.site}
					</div>
				);
			})}*/}
			<Header />
			<Info />
		</div>
	);
}

export default App;
