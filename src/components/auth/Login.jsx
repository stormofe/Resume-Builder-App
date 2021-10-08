import React, { useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { AuthContext } from "./Auth";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../../firebase";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { currentUser } = useContext(AuthContext);

	const register = () => {
		const auth = getAuth();
		console.log(auth);
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				createDocInDB();
				resetInput();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const createDocInDB = async () => {
		console.log(email + "DB add");
		await setDoc(doc(db, "user", `${email}`), {});
	};

	const login = () => {
		const auth = getAuth();

		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				resetInput();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const logOut = () => {
		const auth = getAuth();
		signOut(auth);
	};

	const resetInput = () => {
		setPassword("");
		setEmail("");
	};

	return (
		<div className='login'>
			<h2>SingIn / SingUp</h2>
			<div className='login__form'>
				<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
				<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
				{currentUser ? <button onClick={logOut}>Logout</button> : <button onClick={login}>Login</button>}

				<button onClick={register}>Register</button>
			</div>
		</div>
	);
}

export default Login;
