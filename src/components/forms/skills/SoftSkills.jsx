import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function SoftSkills() {
	const { register, handleSubmit, setValue } = useForm();

	const [softSkills, setSoftSkills] = useState([]);
	const [gettingSoftSkills, setGettingSoftSkills] = useState([]);

	const softSkillsFromState = useSelector((state) => state.forms.softSkills);
	const dispatch = useDispatch();

	//useEffect(() => {
	//	dispatch({ type: "FETCH_SOFT_SKILLS" });
	//}, []);

	useEffect(() => {
		setGettingSoftSkills(softSkillsFromState);
	}, [softSkillsFromState]);

	const addSoftSkill = async (data) => {
		const skill = [data.softskill, data.value];
		await setSoftSkills((old) => [...old, skill]);
		setValue("softskill", "");
	};

	const saveSoftSkills = () => {
		dispatch({ type: "SAVE_SOFT_SKILLS", payload: softSkills });
		setSoftSkills([]);
	};

	const deleteSoftSkillFromState = (skillIndex) => {
		const arr = softSkills.filter((skill, index) => (index !== skillIndex ? skill : false));
		setSoftSkills(arr);
	};

	const deleteSoftSkillFromDB = (index) => {
		const newSkills = gettingSoftSkills.filter((skill, i) => (i !== index ? skill : false));
		dispatch({ type: "DELETE_SOFT_SKILL", payload: newSkills });
	};

	return (
		<>
			<div className='skills'>
				{gettingSoftSkills.length !== 0 ? (
					<>
						{" "}
						<h3>Ваши "мягкие" навыки:</h3>
						<div className='skills__map'>
							{gettingSoftSkills
								? gettingSoftSkills.map((skill, index) => (
										<p className='skills__item' key={index}>
											{skill[0]}: {skill[1]}⭐<button onClick={() => deleteSoftSkillFromDB(index)}>x</button>
										</p>
								  ))
								: ""}
						</div>
					</>
				) : (
					""
				)}

				<h3>Добавьте "мягкие" навыки: </h3>

				<div className='skills__list'>
					{softSkills
						? softSkills.map((skill, index) => (
								<p className='skills__list-item' key={index}>
									<b>{skill[0]}</b>: {skill[1]}
									<button onClick={() => deleteSoftSkillFromState(index)}>x</button>
								</p>
						  ))
						: ""}
				</div>
				<form onSubmit={handleSubmit(addSoftSkill)} className='skills__form'>
					<div className='skills__form-line'>
						<input
							type='text'
							placeholder='Введите навык'
							{...register("softskill", { required: true, minLength: 2, maxLength: 20 })}
						/>
						<select {...register("value")}>
							<option value='1'>1 ⭐</option>
							<option value='2'>2 ⭐</option>
							<option value='3'>3 ⭐</option>
							<option value='4'>4 ⭐</option>
							<option value='5'>5 ⭐</option>
						</select>
					</div>

					<button>Добавить</button>
					<button className='skills__form-save' onClick={saveSoftSkills}>
						Сохранить
					</button>
				</form>
			</div>
		</>
	);
}

export default SoftSkills;
