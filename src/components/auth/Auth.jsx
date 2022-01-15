import React, { useEffect, useState } from "react";
import Preloader from "../UI/Preloader";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});
	}, []);
	if (loading) {
		return <Preloader />;
	}

	return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};;
