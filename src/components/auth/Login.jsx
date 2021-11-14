import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { currentUser } = useContext(AuthContext);
	const dispatch = useDispatch();
	const error = useSelector((store) => store.login.error);

	const resetInput = () => {
		setPassword("");
		setEmail("");
	};

	const logIn = () => {
		dispatch({ type: "LOG_IN", email, password });
		resetInput();
	};
	const getLogOut = () => {
		dispatch({ type: "LOG_OUT" });
		resetInput();
	};
	const getRegister = () => {
		dispatch({ type: "REGISTER", email, password });
		resetInput();
	};
	return (
		<div className='login'>
			<h2>SingIn / SingUp</h2>

			<div className='login__form'>
				<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
				<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
				{currentUser ? <button onClick={getLogOut}>Logout</button> : <button onClick={logIn}>Login</button>}
				<h3>or</h3>
				<button onClick={getRegister}>Register</button>
			</div>
			{error && error == "EMAIL_EXISTS" ? (
				<div style={{ color: "red", marginTop: 15 + "px" }}>Этот эл. адрес уже занят</div>
			) : (
				<div style={{ color: "red", marginTop: 15 + "px" }}>{error}</div>
			)}
		</div>
	);
}

export default Login;
