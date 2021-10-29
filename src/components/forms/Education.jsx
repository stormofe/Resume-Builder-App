import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function Education() {
	const { register, handleSubmit, setValue } = useForm();

	const educationState = useSelector((state) => state.forms.edu);

	const dispatch = useDispatch();
	const [edu, setEdu] = useState([]);
	const [gettingEdu, setGettingEdu] = useState([]);

	useEffect(() => {
		dispatch({ type: "GET_EDU_FROM_DB" });
	}, []);

	useEffect(() => {
		setGettingEdu(educationState);
	}, [educationState]);

	const saveEdu = () => {
		dispatch({ type: "SAVE_EDU", payload: edu });
		setEdu([]);
	};

	const addEdu = (data) => {
		console.log(data);
		setEdu((old) => [...old, data]);
		//dispatch({ type: "SET_EDU", payload: data });
	};

	const deleteEdu = (index) => {
		const newEdu = edu.filter((item, i) => (i !== index ? item : false));
		setEdu(newEdu);
	};

	const deleteEduFromDB = (index) => {
		const newEdu = gettingEdu.filter((item, i) => (i !== index ? item : false));
		dispatch({ type: "DELETE_EDU", payload: newEdu });
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

			{edu
				? edu.map((item, index) => (
						<div key={index}>
							<p>{item.profession}</p>
							<p>{item.where}</p>
							<p>{item.data}</p>
							<p>{item.description}</p>
							<button onClick={() => deleteEdu(index)}>X</button>
						</div>
				  ))
				: ""}

			{gettingEdu
				? gettingEdu.map((item, index) => (
						<div key={index} className='edu__item'>
							<p>{item.profession}</p>
							<p>{item.where}</p>
							<p>{item.data}</p>
							<p>{item.description}</p>
							<button onClick={() => deleteEduFromDB(index)}>X</button>
						</div>
				  ))
				: ""}
		</div>
	);
}

export default Education;
