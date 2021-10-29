import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Skills() {
	const { register, handleSubmit, setValue } = useForm();

	const [skills, setSkills] = useState([]);
	const [gettingSkills, setGettingSkills] = useState([]);

	const skillsFromState = useSelector((state) => state.forms.skills);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: "FETCH_SKILLS" });
	}, []);

	useEffect(() => {
		setGettingSkills(skillsFromState);
	}, [skillsFromState]);

	const addSkill = async (data) => {
		const skill = [data.skill, data.value];
		await setSkills((old) => [...old, skill]);
		setValue("skill", "");
	};

	const saveSkills = () => {
		dispatch({ type: "SAVE_SKILLS", payload: skills });
		setSkills([]);
	};
	const deleteSkillFromState = (skillIndex) => {
		const arr = skills.filter((skill, index) => (index !== skillIndex ? skill : false));
		setSkills(arr);
	};

	const deleteSkillFromDB = (index) => {
		const newSkills = gettingSkills.filter((skill, i) => (i !== index ? skill : false));
		dispatch({ type: "DELETE_SKILL", payload: newSkills });
	};

	return (
		<div className='skills'>
			<h3>Ваши навыки:</h3>
			<div className='skills__map'>
				{gettingSkills
					? gettingSkills.map((skill, index) => (
							<p className='skills__item' key={index}>
								{skill[0]}: {skill[1]}⭐<button onClick={() => deleteSkillFromDB(index)}>x</button>
							</p>
					  ))
					: ""}
			</div>

			<h3>Добавьте навыки: </h3>

			<div className='skills__list'>
				{skills
					? skills.map((skill, index) => (
							<p className='skills__list-item' key={index}>
								<b>{skill[0]}</b>: {skill[1]}
								<button onClick={() => deleteSkillFromState(index)}>x</button>
							</p>
					  ))
					: ""}
			</div>
			<form onSubmit={handleSubmit(addSkill)} className='skills__form'>
				<div className='skills__form-line'>
					<input
						type='text'
						placeholder='Введите навык'
						{...register("skill", { required: true, minLength: 2, maxLength: 20 })}
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
				<button className='skills__form-save' onClick={saveSkills}>
					Сохранить
				</button>
			</form>
		</div>
	);
}

export default Skills;
