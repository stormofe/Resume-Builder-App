import React from "react";

function Input({ placeholder, name }) {
	return (
		<div>
			<label for={name}>{name}</label>
			<input id={name} name={name} placeholder={placeholder} className='myInput' aria-label={name} />
		</div>
	);
}

export default Input;
