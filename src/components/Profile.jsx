import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "./auth/Auth";
import Preloader from "./UI/Preloader";
function Profile() {
	const [col, setCol] = useState({});
	const [lines, setLines] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { currentUser } = useContext(AuthContext);
	const user = doc(db, "user", `${currentUser.email}`);

	useEffect(() => {
		setIsLoading(true);
		const getData = async () => {
			const snap = await getDoc(user);
			setCol(snap.data());
		};
		getData();
	}, []);

	useEffect(() => {
		setIsLoading(true);
		let arr = [];
		for (let [key, value] of Object.entries(col)) {
			arr.push([key, value]);
		}
		setLines(arr);
		//!need debug
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, [col]);

	return (
		<div className='profile'>
			{isLoading ? (
				//<Preloader />
				<p>loading...</p>
			) : (
				""
				//lines.map((line, index) => (
				//	<div key={index}>
				//		<b>{line[0]}</b>: {line[1]} <br />
				//	</div>
				//))
			)}
		</div>
	);
}

export default Profile;
