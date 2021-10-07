import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./auth/Auth";

function Header() {
	const { currentUser } = useContext(AuthContext);
	const currentUserEmail = currentUser ? currentUser.email : "Профиль";
	return (
		<div className='header'>
			<h1>Создай свое резюме</h1>
			<nav className='header__nav'>
				<Link to='/profile'>{currentUserEmail}</Link>
				<Link to='/templates'>Шаблоны</Link>
				<Link to='/login'>{currentUser ? "SignOut" : "SignIn"}</Link>
			</nav>
		</div>
	);
}

export default Header;
