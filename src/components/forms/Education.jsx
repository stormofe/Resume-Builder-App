import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Education() {
	const { register, handleSubmit, setValue } = useForm();

	const [edu, setEdu] = useState([]);

	const addEdu = (data) => {
		const info = Object.entries(data);
		setEdu((old) => [...old, info]);
		setValue("where", "");
	};
	const saveEdu = async () => {
		const obj = { ...edu };
		console.log(obj);
	};
	return (
		<div className='edu'>
			<h3>Ваше образование, курсы, сертификаты:</h3>
			<button onClick={saveEdu}>Save</button>
			<form onSubmit={handleSubmit(addEdu)} className='edu__form'>
				<label htmlFor='where'>Место</label>
				<input type='text' {...register("where")} />
				<label htmlFor='where'>На кого:</label>
				<input type='text' {...register("profession")} />
				<label htmlFor='where'>Дата окончания:</label>
				<input type='date' {...register("data")} />
				<label htmlFor='where'>Описание:</label>
				<input type='text' {...register("description")} />
				<button>Добавить</button>
			</form>
		</div>
	);
}

export default Education;
