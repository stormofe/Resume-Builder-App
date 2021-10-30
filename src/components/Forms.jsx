import React from "react";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import About from "./forms/About";
import Education from "./forms/Education";
import Experience from "./forms/Experience";
import Skills from "./forms/Skills";

function Forms() {
	return (
		<div className='forms'>
			<div className='forms__header'>
				<Link to='/forms/about'>О себе</Link>
				<Link to='/forms/skills'>Навыки</Link>
				<Link to='/forms/education'>Образование</Link>
				<Link to='/forms/experience'>Опыт работы</Link>
			</div>
			<div className='forms__content'>
				<Switch>
					<Route path='/forms/about'>
						<About />
					</Route>
					<Route path='/forms/skills'>
						<Skills />
					</Route>
					<Route path='/forms/education'>
						<Education />
					</Route>
					<Route path='/forms/experience'>
						<Experience />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default Forms;
