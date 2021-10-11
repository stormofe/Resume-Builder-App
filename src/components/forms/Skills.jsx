import React, { useContext, useEffect, useState } from "react";
import { doc, updateDoc, setDoc } from "@firebase/firestore";
import { db } from "../../firebase";
import { useForm } from "react-hook-form";
import { AuthContext } from "../auth/Auth";
import { getDoc } from "firebase/firestore";

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

	const [skills, setSkills] = useState({});
	const [gettingSkills, setGettingSkills] = useState({});

	const getSkills = async () => {
		await getDoc(user).then((result) => setGettingSkills(result.data().skills));
	};

	useEffect(() => {
		getSkills();
	}, []);

	const saveSkills = async () => {
		await updateDoc(user, { skills: { ...gettingSkills, ...skills } });
		setSkills("");
		getSkills();
	};

	const addSkill = async (data) => {
		await setSkills({ ...skills, [data.skill]: +data.value });
		setValue("skill", "");
	};

	return (
		<div className='skills'>
			<h3>Ваши навыки:</h3>
			<div className='skills__map'>
				{gettingSkills
					? Object.entries(gettingSkills).map((skill, index) => (
							<p className='skills__item' key={index}>
								{skill}
							</p>
					  ))
					: ""}
			</div>

			<h3>Добавьте навыки: </h3>

			<div className='skills__list'>
				{skills
					? Object.entries(skills).map((skill) => (
							<p key={skill[0]}>
								<b>{skill[0]}</b>: {skill[1]}
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
