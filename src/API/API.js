import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "@firebase/auth";

export const getCurrentUser = async () => {
	const currentUser = await getAuth().currentUser.email;
	return currentUser;
};

export const getSkillsFromBD = () => {
	//const currentUser = await getCurrentUser();
	//const user = await doc(db, "user", `${currentUser}`);
	//const data = await (await getDoc(user)).data().skills;
	//console.log(data);
	//return data;
	return getCurrentUser()
		.then((user) => doc(db, "user", `${user}`))
		.then((user) => getDoc(user))
		.then((data) => data.data().skills)
		.catch((e) => console.log(e))
		.finally(() => console.log("finish"));
};

export const setSkillsAtDB = async (skills) => {
	const currentUser = await getCurrentUser();
	const user = doc(db, "user", `${currentUser}`);
	await updateDoc(user, { skills: { ...skills } });
};

export const setEduAtDB = async (edu) => {
	const currentUser = await getCurrentUser();
	const user = doc(db, "user", `${currentUser}`);
	await updateDoc(user, { edu: { ...edu } });
};
export const getEduFromBD = () => {
	return getCurrentUser()
		.then((user) => doc(db, "user", `${user}`))
		.then((user) => getDoc(user))
		.then((data) => data.data().edu)
		.catch((e) => console.log(e))
		.finally(() => console.log("finish"));
};

export const setUserInfoAtDB = async (info) => {
	const currentUser = await getCurrentUser();
	await updateDoc(doc(db, "user", `${currentUser}`), info);
};

export const getUserInfoFromDB = () => {
	return getCurrentUser()
		.then((user) => doc(db, "user", `${user}`))
		.then((user) => getDoc(user))
		.then((data) => data.data())
		.catch((e) => console.log(e))
		.finally(() => console.log("finish"));
};