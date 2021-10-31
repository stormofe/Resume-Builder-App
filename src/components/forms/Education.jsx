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

			<form onSubmit={handleSubmit(addEdu)} className='edu__form'>
				<div className='edu__form-line'>
					{" "}
					<label htmlFor='where'>Место</label>
					<input type='text' {...register("where")} />
				</div>
				<div className='edu__form-line'>
					{" "}
					<label htmlFor='profession'>На кого:</label>
					<input type='text' {...register("profession")} />
				</div>
				<div className='edu__form-line'>
					{" "}
					<label htmlFor='data'>Дата окончания:</label>
					<input type='date' {...register("data")} />
				</div>
				<div className='edu__form-line'>
					{" "}
					<label htmlFor='description'>Описание:</label>
					<input type='text' {...register("description")} />
				</div>

				<button>Добавить</button>
			</form>
			<button className='edu__form-save' onClick={saveEdu}>
				Save
			</button>
			<div className='edu__info'>
				{edu
					? edu.map((item, index) => (
							<div className='edu__item edu__item-add' key={index}>
								{item.profession ? (
									<p>
										<b>Должность: </b> {item.profession}
									</p>
								) : (
									""
								)}

								{item.where ? (
									<p>
										<b>Место окончания: </b>
										{item.where}
									</p>
								) : (
									""
								)}
								{item.data ? (
									<p>
										<b>Дата окончания: </b>
										{item.data}
									</p>
								) : (
									""
								)}
								{item.description ? (
									<p>
										<b>Описание деятельности: </b>
										{item.description}
									</p>
								) : (
									""
								)}

								<button onClick={() => deleteEdu(index)}>x</button>
							</div>
					  ))
					: ""}

				{gettingEdu
					? gettingEdu.map((item, index) => (
							<div key={index} className='edu__item'>
								{item.profession ? (
									<p>
										<b>Должность: </b> {item.profession}
									</p>
								) : (
									""
								)}

								{item.where ? (
									<p>
										<b>Место окончания: </b>
										{item.where}
									</p>
								) : (
									""
								)}
								{item.data ? (
									<p>
										<b>Дата окончания: </b>
										{item.data}
									</p>
								) : (
									""
								)}
								{item.description ? (
									<p>
										<b>Описание деятельности: </b> <br />
										{item.description}
									</p>
								) : (
									""
								)}
								<button onClick={() => deleteEduFromDB(index)}>x</button>
							</div>
					  ))
					: ""}
			</div>
		</div>
	);
}

export default Education;
