import { doc, getDoc, setDoc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { initState } from "../store/loginReducer";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import userIcon from "./../source/user.png";
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
		.catch((e) => e.message);
	//.finally(() => console.log("finish"));
};

export const setDataAtDB = async ({ dataName, data }) => {
	const currentUser = await getCurrentUser();
	const user = doc(db, "user", `${currentUser}`);
	//for debug
	//const user = doc(db, "user", `currentUser`);
	if (dataName === "softSkills") {
		try {
			await updateDoc(user, { softSkills: { ...data } });
		} catch (e) {
			return e.message;
		}
	}
	if (dataName === "skills") {
		try {
			await updateDoc(user, { skills: { ...data } });
		} catch (e) {
			return e.message;
		}
	}
	if (dataName === "langSkills") {
		try {
			await updateDoc(user, { langSkills: { ...data } });
		} catch (e) {
			return e.message;
		}
	}
	if (dataName === "edu") {
		try {
			await updateDoc(user, { edu: { ...data } });
		} catch (e) {
			return e.message;
		}
	}
	if (dataName === "exp") {
		try {
			await updateDoc(user, { exp: { ...data } });
		} catch (e) {
			return e.message;
		}
	}
	if (dataName === "custom") {
		try {
			await updateDoc(user, { custom: { ...data } });
		} catch (e) {
			return e.message;
		}
	}
	if (dataName === "socials") {
		try {
			await updateDoc(user, { socials: [...data] });
		} catch (e) {
			return e.message;
		}
	}
	if (data === "") {
		const objName = `mainInfo.${[dataName]}`;
		await updateDoc(user, { [objName]: "" });
	}
	if (dataName === "mainInfo") {
		try {
			await updateDoc(user, { mainInfo: { ...data } });
		} catch (e) {
			return e.message;
		}
	}
};


export const setStorage = async (photo) => {
	//const storage = await getStorage();
	//return getCurrentUser().then((user) => {
	//	debugger;
	//	return uploadBytes(ref(storage, user), photo).then((snapshot) => {
	//		console.log("Uploaded a blob or file!");
	//	});
	//});
	//const user = await getCurrentUser();
	//const storage = await getStorage();
	//const storageRef = await ref(storage, user);

	//await uploadBytes(storageRef, photo)
	//	.then((snapshot) => {
	//		console.log("Uploaded a blob or file!");
	//	})
	//	.catch((e) => {
	//		console.log(e);
	//	});
	try {
		const user = await getCurrentUser();
		const storage = await getStorage();
		const storageRef = await ref(storage, user);
		await uploadBytes(storageRef, photo);
	} catch (err) {
		console.log(err["message"]);
		//return err["message"];
	}
};
export const getPhoto = async () => {
	//const user = await getCurrentUser();
	//const storage = await getStorage();
	//const storageRef = await ref(storage, user);
	//return getDownloadURL(storageRef)
	//	.then((url) => {
	//		return url;
	//	})
	//	.catch((error) => {
	//		console.log(error);
	//	});
	try {
		const user = await getCurrentUser();
		const storage = await getStorage();
		const storageRef = await ref(storage, user);
		return await getDownloadURL(storageRef);
	} catch (err) {
		return err;
	}
};
