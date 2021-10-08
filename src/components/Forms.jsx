import React from "react";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import About from "./forms/About";
import Skills from "./forms/Skills";

function Forms() {
	return (
		<div className='forms'>
			<div className='forms__header'>
				<Link to='/forms/about'>О себе</Link>
				<Link to='/forms/skills'>Навыки</Link>
			</div>
			<div className='forms__content'>
				<Switch>
					<Route path='/forms/about'>
						<About />
					</Route>
					<Route path='/forms/skills'>
						<Skills />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default Forms;
