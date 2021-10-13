import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth";
import { useDispatch } from "react-redux";
import { register, login, logOut } from "../../asyncActions/login";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { currentUser } = useContext(AuthContext);
	const dispatch = useDispatch();

	const setRegister = () => {
		dispatch(register(email, password));
		resetInput();
	};
	const setLogIn = () => {
		dispatch(login(email, password));
		resetInput();
	};
	const setLogOut = () => {
		dispatch(logOut());
		resetInput();
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
				{currentUser ? <button onClick={setLogOut}>Logout</button> : <button onClick={setLogIn}>Login</button>}

				<button onClick={setRegister}>Register</button>
			</div>
		</div>
	);
}

export default Login;
