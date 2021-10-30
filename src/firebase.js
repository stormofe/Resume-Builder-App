import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
	apiKey: `${process.env.REACT_APP_MY_API_KEY}`,
	authDomain: `${process.env.REACT_APP_MY_AUTH_DOMAIN}`,
	databaseURL: `${process.env.REACT_APP_MY_DB_URL}`,
	projectId: `${process.env.REACT_APP_MY_PROJECT_ID}`,
	storageBucket: `${process.env.REACT_APP_MY_STORAGE_BUCKET}`,
	messagingSenderId: `${process.env.REACT_APP_MY_MESSAGING_SENDER_ID}`,
	appId: `${process.env.REACT_APP_MY_APP_ID}`,
};

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore();

