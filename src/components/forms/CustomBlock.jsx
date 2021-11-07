import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function CustomBlock() {
	const { register, handleSubmit, setValue } = useForm();

	const customBlockState = useSelector((state) => state.forms.custom);

	const dispatch = useDispatch();
	const [custBlock, setCustBlock] = useState([]);
	const [gettingCustBlock, setGettingCustBlock] = useState([]);

	useEffect(() => {
		dispatch({ type: "GET_CUST_BLOCK_FROM_DB" });
	}, []);

	useEffect(() => {
		setGettingCustBlock(customBlockState);
	}, [customBlockState]);

	const saveCustBlock = () => {
		dispatch({ type: "SAVE_CUST_BLOCK", payload: custBlock });
		setCustBlock([]);
	};

	const addCustBlock = (data) => {
		console.log(data);
		setCustBlock((old) => [...old, data]);
		setValue("name", "");
	};

	const deleteCustBlock = (index) => {
		const newBlock = custBlock.filter((item, i) => (i !== index ? item : false));
		setCustBlock(newBlock);
	};

	const deleteCustBlockFromDB = (index) => {
		const newBlock = gettingCustBlock.filter((item, i) => (i !== index ? item : false));
		dispatch({ type: "DELETE_CUST_BLOCK", payload: newBlock });
	};
	return (
		<div className='edu'>
			<h3>Дополнительная информация</h3>
			<p className='notice' style={{ marginBottom: 20 + "px" }}>
				Вы можете заполнить только те поля, которые считаете нужными, чтобы предоставить дополнительную информацию о
				себе. Блок будет добавлен в конце резюме
			</p>
			<h3>Пример:</h3>
			<div className='edu__item' style={{ backgroundColor: "whitesmoke" }}>
				<p>
					<b>Заголовок</b>
				</p>{" "}
				<p>Предмет</p>
				<p>
					<b>Дата начала: </b>12-2020
				</p>{" "}
				<p>
					<b>Дата окончания: </b>10-2021
				</p>{" "}
				<p>Описание</p>
			</div>

			<form onSubmit={handleSubmit(addCustBlock)} className='edu__form'>
				<div className='edu__form-line'>
					<label htmlFor='where'>Заголовок</label>
					<input type='text' {...register("name")} />
				</div>
				<div className='edu__form-line'>
					<label htmlFor='profession'>Предмет</label>
					<input type='text' {...register("obj")} />
				</div>
				<div className='edu__form-line'>
					<label htmlFor='dateFrom'>Дата начала :</label>
					<input type='month' {...register("dateFrom")} />
					<label htmlFor='dateEnd'>Дата окончания :</label>
					<input type='month' {...register("dateEnd")} />
				</div>
				<div className='edu__form-line'>
					<label htmlFor='description'>Описание:</label>
					<input type='text' {...register("description")} />
				</div>

				<button>Добавить</button>
			</form>
			<button className='edu__form-save' onClick={saveCustBlock}>
				Save
			</button>
			<div className='edu__info'>
				{custBlock
					? custBlock.map((item, index) => (
							<div className='edu__item edu__item-add' key={index}>
								{item.name ? (
									<p>
										<b>{item.name}</b>
									</p>
								) : (
									""
								)}

								{item.obj ? <p>{item.obj}</p> : ""}
								{item.dateFrom ? (
									<p>
										<b>Дата начала: </b>
										{item.dateFrom}
									</p>
								) : (
									""
								)}
								{item.dateEnd ? (
									<p>
										<b>Дата окончания: </b>
										{item.dateEnd}
									</p>
								) : (
									""
								)}
								{item.description ? <p>{item.description}</p> : ""}

								<button onClick={() => deleteCustBlock(index)}>x</button>
							</div>
					  ))
					: ""}

				{gettingCustBlock
					? gettingCustBlock.map((item, index) => (
							<div key={index} className='edu__item'>
								{item.name ? (
									<p>
										<b>{item.name}</b>
									</p>
								) : (
									""
								)}

								{item.obj ? <p>{item.obj}</p> : ""}
								{item.dateFrom ? (
									<p>
										<b>Дата начала: </b>
										{item.dateFrom}
									</p>
								) : (
									""
								)}
								{item.dateEnd ? (
									<p>
										<b>Дата окончания: </b>
										{item.dateEnd}
									</p>
								) : (
									""
								)}
								{item.description ? <p>{item.description}</p> : ""}
								<button onClick={() => deleteCustBlockFromDB(index)}>x</button>
							</div>
					  ))
					: ""}
			</div>
		</div>
	);
}

export default CustomBlock;
