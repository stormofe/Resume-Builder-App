import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
function Profile() {
	const [hard, setUsers] = useState([]);
	const [col, setCol] = useState({});
	const docRef = collection(db, "user");

	useEffect(() => {
		const getData = async () => {
			const data = await getDocs(docRef);
			setCol(data.docs.map((doc) => ({ ...doc.data(), id: doc.data().id })));
		};
		getData();
	}, []);

	return <div className='profile'></div>;
}

export default Profile;
