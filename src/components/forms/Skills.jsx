import React, { useContext, useEffect, useState } from "react";
import { doc, updateDoc, deleteField } from "@firebase/firestore";
import { db } from "../../firebase";
import { useForm } from "react-hook-form";
import { AuthContext } from "../auth/Auth";
import { getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setSkillsAtState } from "../../asyncActions/forms";
import { fetchSkills, saveSkillsAtDBAction, saveSkillsFromState } from "./../../store/formsReducer";

function Skills() {
	const { currentUser } = useContext(AuthContext);
	const user = doc(db, "user", `${currentUser.email}`);

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

	//const getSkills = async () => {
	//	const result = await (await getDoc(user)).data().skills;
	//	const arr = Object.entries(result).map((item) => item[1]);
	//	setGettingSkills(arr);
	//};

	//const setSkillsFromDB = () => {
	//	getSkills();
	//	setSkills(gettingSkills);
	//};

	useEffect(() => {
		dispatch(fetchSkills(currentUser));
	}, []);

	//const saveSkills = async () => {
	//	const arr = [...gettingSkills, ...skills];
	//	await updateDoc(user, { skills: { ...arr } })
	//		.then(() => setSkills([]))
	//		.then(() => getSkills());
	//};

	const addSkill = async (data) => {
		const skill = [data.skill, data.value];
		await setSkills((old) => [...old, skill]);
		setValue("skill", "");
	};

	const deleteSkillFromState = async (skillIndex) => {
		const arr = skills.filter((skill, index) => (index !== skillIndex ? skill : false));
		setSkills(arr);
	};

	const saveSkills = () => {
		dispatch(saveSkillsFromState(skills));
		//dispatch(saveSkillsAtDBAction(skills));
	};
	const deleteSkillFromDB = async (index) => {
		const arr = gettingSkills.filter((skill, i) => (i !== index ? skill : false));
		await updateDoc(user, {
			skills: deleteField(),
		})
			.then(() => {
				updateDoc(user, { skills: { ...arr } });
			})
			.then(() => setSkills([]));
		//.then(() => getSkills());
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
				{/*<button className='skills__form-save' onClick={saveSkills}>
					Сохранить
				</button>*/}
				<button onClick={() => console.log(skillsFromState)}>log</button>
				<button onClick={saveSkills}>save</button>
				{skillsFromState
					? skillsFromState.map((skill) => (
							<div>
								{skill[0]}::::{skill[1]}
							</div>
					  ))
					: ""}
			</form>
		</div>
	);
}

export default Skills;
