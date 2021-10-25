import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "@firebase/auth";

export const getCurrentUser = async () => {
	const currentUser = await getAuth().currentUser.email;
	return currentUser;
};

export const getSkillsFromBD = async () => {
	const currentUser = await getCurrentUser();
	const user = await doc(db, "user", `${currentUser}`);
	const data = await (await getDoc(user)).data().skills;
	console.log(data);
	return data;
};

const setSkillsAtDB = async (skills) => {
	const currentUser = await getCurrentUser();
	const user = doc(db, "user", `${currentUser}`);
	await updateDoc(user, { skills: { ...skills } });
};
