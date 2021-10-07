import React, { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
function Profile() {
	const [col, setCol] = useState({});
	const pers = doc(db, "user", "T89mL28JqDaelV3cJRia");

	useEffect(() => {
		const getData = async () => {
			const snap = await getDoc(pers);
			setCol(snap.data());
		};
		getData();
		console.log(col);
	}, []);

	return (
		<div className='profile'>
			<h4>Name :</h4>
			<p>{col.name}</p>
			<h4>Position</h4>
			<p>{col.position}</p>
			<h4>About :</h4>
			<p>{col.about}</p>
		</div>
	);
}

export default Profile;
