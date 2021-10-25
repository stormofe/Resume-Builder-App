import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase";

const auth = getAuth();

const createDocInDB = async (email) => {
	await setDoc(doc(db, "user", `${email}`), {});
};

const getLoginAtFB = (email, password) => {
	signInWithEmailAndPassword(auth, email, password);
};
const getLogOutFromFB = () => {
	signOut(auth);
};

const getRegisterAtFB = (email, password) => {
	createUserWithEmailAndPassword(auth, email, password)
		.then(() => {
			createDocInDB(email);
		})
		.catch((err) => {
			//console.log(err);
		});
};

function* loginWorker() {}

export function* loginWatcher() {}
