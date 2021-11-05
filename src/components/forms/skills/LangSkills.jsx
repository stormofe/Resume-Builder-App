import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function LangSkills() {
	const { register, handleSubmit, setValue } = useForm();

	const [langSkills, setLangSkills] = useState([]);
	const [gettingLangSkills, setGettingLangSkills] = useState([]);

	const langSkillsFromState = useSelector((state) => state.forms.langSkills);
	const dispatch = useDispatch();

	useEffect(() => {
		setGettingLangSkills(langSkillsFromState);
	}, [langSkillsFromState]);

	const addLangSkill = async (data) => {
		const skill = [data.langskill, data.value];
		await setLangSkills((old) => [...old, skill]);
		setValue("langskill", "");
	};

	const saveLangSkills = () => {
		dispatch({ type: "SAVE_LANG_SKILLS", payload: langSkills });
		setLangSkills([]);
	};

	const deleteLangSkillFromState = (skillIndex) => {
		const arr = langSkills.filter((skill, index) => (index !== skillIndex ? skill : false));
		setLangSkills(arr);
	};

	const deleteLangSkillFromDB = (index) => {
		const newSkills = gettingLangSkills.filter((skill, i) => (i !== index ? skill : false));
		dispatch({ type: "DELETE_LANG_SKILL", payload: newSkills });
	};

	return (
		<>
			<div className='skills'>
				{gettingLangSkills.length !== 0 ? (
					<>
						{" "}
						<h3>Ваши языки:</h3>
						<div className='skills__map'>
							{gettingLangSkills
								? gettingLangSkills.map((skill, index) => (
										<p className='skills__item' key={index}>
											{skill[0]}: {skill[1]}⭐<button onClick={() => deleteLangSkillFromDB(index)}>x</button>
										</p>
								  ))
								: ""}
						</div>
					</>
				) : (
					""
				)}

				<h3>Добавьте языки: </h3>

				<div className='skills__list'>
					{langSkills
						? langSkills.map((skill, index) => (
								<p className='skills__list-item' key={index}>
									<b>{skill[0]}</b>: {skill[1]}
									<button onClick={() => deleteLangSkillFromState(index)}>x</button>
								</p>
						  ))
						: ""}
				</div>
				<form onSubmit={handleSubmit(addLangSkill)} className='skills__form'>
					<div className='skills__form-line'>
						<input
							type='text'
							placeholder='Введите навык'
							{...register("langskill", { required: true, minLength: 2, maxLength: 20 })}
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
					<button className='skills__form-save' onClick={saveLangSkills}>
						Сохранить
					</button>
				</form>
			</div>
		</>
	);
}

export default LangSkills;
