import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@firebase/auth";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const register = () => {
		const auth = getAuth();
		console.log(auth);
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				resetInput();
			})
			.catch((err) => {
				console.log(err);
			});
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
				<button onClick={register}>Register</button>
				<button onClick={login}>Login</button>
				<button onClick={logOut}>Logout</button>
			</div>
		</div>
	);
}

export default Login;
