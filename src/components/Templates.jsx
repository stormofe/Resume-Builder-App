import React from "react";
import { Link } from "react-router-dom";
import TempFirst from "./templates/temp1/TempFirst";
import { Route, Switch } from "react-router";
import TempSecond from "./templates/temp2/TempSecond";

function Templates() {
	return (
		<div className='templates'>
			<Link to='/templates/temp1' target='_blank'>
				Шаблон 1
			</Link>
			<Link to='/templates/temp2' target='_blank'>
				Шаблон 2
			</Link>
			<Switch>
				<Route path='/templates/temp1'>
					<TempFirst />
				</Route>
				<Route path='/templates/temp2'>
					<TempSecond />
				</Route>
			</Switch>
		</div>
	);
}

export default Templates;
