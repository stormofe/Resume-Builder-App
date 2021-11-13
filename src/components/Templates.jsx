import React from "react";
import { Link } from "react-router-dom";
import TempFirst from "./templates/temp1/TempFirst";
import { Route, Switch } from "react-router";
import TempSecond from "./templates/temp2/TempSecond";
import temp1 from "./templates/temp1/img/temp1.jpg";
import temp2 from "./templates/temp2/img/temp2.jpg";

function Templates() {
	return (
		<div className='templates'>
			<Link to='/templates/temp1'>
				<img className='templates__link' src={temp1} alt='' />
			</Link>
			<Link to='/templates/temp2'>
				<img className='templates__link' src={temp2} alt='' />
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
