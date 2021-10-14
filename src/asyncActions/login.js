import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from "@firebase/auth";
import { createUserAction } from "../store/loginReducer";
import { loginUserAction } from "./../store/loginReducer";

const auth = getAuth();

const createDocInDB = async (email) => {
	await setDoc(doc(db, "user", `${email}`), {});
};

export const register = (email, password) => {
	return function (dispatch) {
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				createDocInDB(email);
				dispatch(createUserAction(email));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const login = (email, password) => {
	return function (dispatch) {
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				dispatch(loginUserAction(true));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const logOut = () => {
	return function (dispatch) {
		signOut(auth).then(() => dispatch(loginUserAction(false)));
	};
};
