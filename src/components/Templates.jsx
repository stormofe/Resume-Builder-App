import React from "react";
import { Link } from "react-router-dom";
import TempFirst from "./templates/temp1/TempFirst";
import { Route } from "react-router";

function Templates() {
	return (
		<div className='templates'>
			<Link to='/templates/temp1' target='_blank'>
				Шаблон 1
			</Link>
			<Route path='/templates/:temp1'>
				<TempFirst />
			</Route>
		</div>
	);
}

export default Templates;
