import { doc, getDoc, setDoc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { initState } from "../store/loginReducer";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const auth = getAuth();

const createDocInDB = async (email) => {
	await setDoc(doc(db, "user", `${email}`), { ...initState, email: email });
};

export const register = (email, password) => {
	return createUserWithEmailAndPassword(auth, email, password)
		.then(() => {
			createDocInDB(email);
		})
		.catch((err) => {
			return err;
		});
};

export const login = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password).catch((err) => {
		const result = { err };
		return result;
	});
};

export const logOut = () => {
	return signOut(auth);
};

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
	try {
		const currentUser = await getCurrentUser();
		const user = doc(db, "user", `${currentUser}`);
		await updateDoc(user, { skills: { ...skills } });
	} catch (error) {
		console.log(error);
		const result = { error, result: false };
		return result;
	}
};

export const getSoftSkillsFromBD = () => {
	return getCurrentUser()
		.then((user) => doc(db, "user", `${user}`))
		.then((user) => getDoc(user))
		.then((data) => data.data().softSkills)
		.catch((e) => console.log(e))
		.finally(() => console.log("finish"));
};

export const setSoftSkillsAtDB = async (skills) => {
	const currentUser = await getCurrentUser();
	const user = doc(db, "user", `${currentUser}`);
	await updateDoc(user, { softSkills: { ...skills } });
};

export const getLangSkillsFromBD = () => {
	return getCurrentUser()
		.then((user) => doc(db, "user", `${user}`))
		.then((user) => getDoc(user))
		.then((data) => data.data().langSkills)
		.catch((e) => console.log(e))
		.finally(() => console.log("finish"));
};

export const setLangSkillsAtDB = async (skills) => {
	const currentUser = await getCurrentUser();
	const user = doc(db, "user", `${currentUser}`);
	await updateDoc(user, { langSkills: { ...skills } });
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

export const getExpFromBD = () => {
	return getCurrentUser()
		.then((user) => doc(db, "user", `${user}`))
		.then((user) => getDoc(user))
		.then((data) => data.data().exp)
		.catch((e) => console.log(e))
		.finally(() => console.log("finish"));
};
export const setExpAtDB = async (exp) => {
	const currentUser = await getCurrentUser();
	const user = doc(db, "user", `${currentUser}`);
	await updateDoc(user, { exp: { ...exp } });
};

export const getCustomBlockFromBD = () => {
	return getCurrentUser()
		.then((user) => doc(db, "user", `${user}`))
		.then((user) => getDoc(user))
		.then((data) => data.data().custom)
		.catch((e) => console.log(e))
		.finally(() => console.log("finish"));
};
export const setCustomBlockAtDB = async (block) => {
	const currentUser = await getCurrentUser();
	const user = doc(db, "user", `${currentUser}`);
	await updateDoc(user, { custom: { ...block } });
};

export const getUserInfoFromDB = () => {
	return getCurrentUser()
		.then((user) => doc(db, "user", `${user}`))
		.then((user) => getDoc(user))
		.then((data) => data.data())
		.catch((e) => console.log(e))
		.finally(() => console.log("finish"));
};
export const setUserInfoAtDB = async (info) => {
	const currentUser = await getCurrentUser();
	await updateDoc(doc(db, "user", `${currentUser}`), info);
};

export const setStorage = async (photo) => {
	//const storage = await getStorage();
	//return getCurrentUser().then((user) => {
	//	debugger;
	//	return uploadBytes(ref(storage, user), photo).then((snapshot) => {
	//		console.log("Uploaded a blob or file!");
	//	});
	//});
	const user = await getCurrentUser();
	const storage = await getStorage();
	const storageRef = await ref(storage, user);

	await uploadBytes(storageRef, photo)
		.then((snapshot) => {
			console.log("Uploaded a blob or file!");
		})
		.catch((e) => {
			console.log(e);
		});
};
export const getPhoto = async () => {
	const user = await getCurrentUser();
	const storage = await getStorage();
	const storageRef = await ref(storage, user);
	return getDownloadURL(storageRef)
		.then((url) => {
			return url;
		})
		.catch((error) => {
			console.log(error);
		});
};

export const getSocialsFromBD = () => {
	return getCurrentUser()
		.then((user) => doc(db, "user", `${user}`))
		.then((user) => getDoc(user))
		.then((data) => data.data().socials)
		.catch((e) => console.log(e))
		.finally(() => console.log("finish"));
};
export const setSocialsAtDB = async (socials) => {
	const currentUser = await getCurrentUser();
	const user = doc(db, "user", `${currentUser}`);
	await updateDoc(user, { socials: { ...socials } });
};