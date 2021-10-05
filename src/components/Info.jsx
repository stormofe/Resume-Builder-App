import React from "react";
import Input from "./UI/Input";

function Info() {
	return (
		<div className='info'>
			<h2>Заполни поля и после сохранения выбери шаблон:</h2>
			<form action='' className='info__form'>
				<Input name='name' placeholder='Enter name' />
				<Input name='sity' placeholder='Enter sity' />
				<Input name='site' placeholder='Enter site' />
			</form>
		</div>
	);
}

export default Info;
