import { doc, updateDoc } from "@firebase/firestore";
import React, { useContext } from "react";
import { db } from "../../firebase";
import { useForm } from "react-hook-form";
import { AuthContext } from "../auth/Auth";

function About() {
	const { register, handleSubmit } = useForm();

	const { currentUser } = useContext(AuthContext);
	const user = doc(db, "user", `${currentUser.email}`);

	const onSubmit = async (data) => await updateDoc(user, data);

	return (
		<div className='about'>
			<h3>Личная информация: </h3>
			<form onSubmit={handleSubmit(onSubmit)} className='about__form'>
				<div className='about__form-line'>
					<label htmlFor='name'>Фамилия, имя:</label>
					<input {...register("name")} type='text' />
				</div>
				<div className='about__form-line'>
					<label htmlFor='about'>О себе: </label>
					<input {...register("about")} type='text' />
				</div>
				<div className='about__form-line'>
					<label htmlFor='phone'>Телефон :</label>
					<input {...register("phone")} type='phone' />
				</div>
				<div className='about__form-line'>
					<label htmlFor='position'>Должность :</label>
					<input {...register("position")} type='text' />
				</div>
				<button>Сохранить</button>
			</form>
		</div>
	);
}

export default About;
