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

export const getDataFromDB = (dataName) => {
	return getCurrentUser()
		.then((user) => doc(db, "user", `${user}`))
		.then((user) => getDoc(user))
		.then((data) => {
			if (dataName === "skills") {
				return data.data().skills;
			}
			if (dataName === "softSkills") {
				return data.data().softSkills;
			}
			if (dataName === "langSkills") {
				return data.data().langSkills;
			}
			if (dataName === "edu") {
				return data.data().edu;
			}
			if (dataName === "exp") {
				return data.data().exp;
			}
			if (dataName === "custom") {
				return data.data().custom;
			}
			if (dataName === "socials") {
				return data.data().socials;
			}
			if (dataName === "info") {
				return data.data();
			}
			return undefined;
		})
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

export const setSoftSkillsAtDB = async (skills) => {
	const currentUser = await getCurrentUser();
	const user = doc(db, "user", `${currentUser}`);
	await updateDoc(user, { softSkills: { ...skills } });
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

export const setExpAtDB = async (exp) => {
	const currentUser = await getCurrentUser();
	const user = doc(db, "user", `${currentUser}`);
	await updateDoc(user, { exp: { ...exp } });
};

export const setCustomBlockAtDB = async (block) => {
	const currentUser = await getCurrentUser();
	const user = doc(db, "user", `${currentUser}`);
	await updateDoc(user, { custom: { ...block } });
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

export const setSocialsAtDB = async (socials) => {
	const currentUser = await getCurrentUser();
	const user = doc(db, "user", `${currentUser}`);
	await updateDoc(user, { socials: { ...socials } });
};