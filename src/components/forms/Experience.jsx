import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function Experience() {
	const { register, handleSubmit, setValue } = useForm();

	const expState = useSelector((state) => state.forms.exp);

	const dispatch = useDispatch();
	const [exp, setExp] = useState([]);
	const [gettingExp, setGettingExp] = useState([]);

	useEffect(() => {
		//dispatch({ type: "GET_EDU_FROM_DB" });
	}, []);

	useEffect(() => {
		setGettingExp(expState);
	}, [expState]);

	const saveExp = () => {
		dispatch({ type: "SAVE_EXP", payload: exp });
		setExp([]);
	};

	const addExp = (data) => {
		console.log(data);
		setExp((old) => [...old, data]);
		//dispatch({ type: "SET_EDU", payload: data });
	};

	const deleteExp = (index) => {
		const newExp = exp.filter((item, i) => (i !== index ? item : false));
		setExp(newExp);
	};

	const deleteExpFromDB = (index) => {
		const newExp = gettingExp.filter((item, i) => (i !== index ? item : false));
		dispatch({ type: "DELETE_EXP", payload: newExp });
	};
	return (
		<div className='edu'>
			<h3>Ваш опыт работы в данной сфере:</h3>

			<form onSubmit={handleSubmit(addExp)} className='edu__form'>
				<div className='edu__form-line'>
					{" "}
					<label htmlFor='where'>Место</label>
					<input type='text' {...register("where")} />
				</div>
				<div className='edu__form-line'>
					{" "}
					<label htmlFor='profession'>Кем :</label>
					<input type='text' {...register("profession")} />
				</div>
				<div className='edu__form-line'>
					<label htmlFor='dateFrom'>Дата начала :</label>
					<input type='date' {...register("dateFrom")} />
					<label htmlFor='dateEnd'>Дата окончания :</label>
					<input type='date' {...register("dateEnd")} />
				</div>
				<div className='edu__form-line'>
					{" "}
					<label htmlFor='description'>Описание:</label>
					<input type='text' {...register("description")} />
				</div>

				<button>Добавить</button>
			</form>
			<button className='edu__form-save' onClick={saveExp}>
				Save
			</button>
			<div className='edu__info'>
				{exp
					? exp.map((item, index) => (
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
									</p>
								) : (
									""
								)}

								<button onClick={() => deleteExp(index)}>x</button>
							</div>
					  ))
					: ""}

				{gettingExp
					? gettingExp.map((item, index) => (
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
								<button onClick={() => deleteExpFromDB(index)}>x</button>
							</div>
					  ))
					: ""}
			</div>
		</div>
	);
}

export default Experience;
