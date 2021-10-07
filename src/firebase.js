import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
	apiKey: "AIzaSyAfSq7X4CWD5shjiNyjMrisvKy3BQ1ETUs",
	authDomain: "resume-builder-3848a.firebaseapp.com",
	databaseURL: "https://resume-builder-3848a-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "resume-builder-3848a",
	storageBucket: "resume-builder-3848a.appspot.com",
	messagingSenderId: "160605172448",
	appId: "1:160605172448:web:93099590f98f6fae8f9685",
};

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore();
