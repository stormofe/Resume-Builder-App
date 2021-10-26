import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Skills() {
	const { currentUser } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setValue,
	} = useForm();

	const [skills, setSkills] = useState([]);
	const [gettingSkills, setGettingSkills] = useState([]);

	const skillsFromState = useSelector((state) => state.forms.skills);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: "FETCH_SKILLS" });
	}, []);

	const addSkill = async (data) => {
		const skill = [data.skill, data.value];
		await setSkills((old) => [...old, skill]);
		setValue("skill", "");
	};

	const deleteSkillFromState = async (skillIndex) => {
		const arr = skills.filter((skill, index) => (index !== skillIndex ? skill : false));
		setSkills(arr);
	};

	//const deleteSkillFromDB = async (index) => {
	//	const arr = gettingSkills.filter((skill, i) => (i !== index ? skill : false));
	//	await updateDoc(user, {
	//		skills: deleteField(),
	//	})
	//		.then(() => {
	//			updateDoc(user, { skills: { ...arr } });
	//		})
	//		.then(() => setSkills([]));
	//	//.then(() => getSkills());
	//};

	return (
		<div className='skills'>
			<h3>Ваши навыки:</h3>
			<div className='skills__map'>
				{/*{gettingSkills
					? gettingSkills.map((skill, index) => (
							<p className='skills__item' key={index}>
								{skill[0]}: {skill[1]}⭐<button onClick={() => deleteSkillFromDB(index)}>x</button>
							</p>
					  ))
					: ""}*/}
				{skillsFromState
					? skillsFromState.map((skill, index) => (
							<p className='skills__item' key={index}>
								{skill[1][0]}: {skill[1][1]}⭐<button>x</button>
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
				<button className='skills__form-save' onClick={() => dispatch({ type: "SAVE_SKILLS", payload: skills })}>
					Сохранить
				</button>
				<button onClick={() => console.log(skillsFromState)}>log</button>
				{/*<button onClick={}>save</button>*/}
				{skillsFromState
					? skillsFromState.map((skill, index) => (
							<div key={index}>
								{skill[1][0]}::::{skill[1][1]}
							</div>
					  ))
					: ""}
			</form>
			{/*<button onClick={() => dispatch({ type: "FETCH_SKILLS" })}>getSkills</button>*/}
		</div>
	);
}

export default Skills;
