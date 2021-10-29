import { doc, updateDoc } from "@firebase/firestore";
import React, { useContext } from "react";
import { db } from "../../firebase";
import { useForm } from "react-hook-form";
import { AuthContext } from "../auth/Auth";
import FormLine from "./about/FormLine";
import { useDispatch } from "react-redux";

function About() {
	const { register, handleSubmit } = useForm();

	const dispatch = useDispatch();

	const saveInfo = (data) => {
		dispatch({ type: "SAVE_INFO", payload: data });
	};

	return (
		<div className='about'>
			<h3>Личная информация: </h3>
			<form onSubmit={handleSubmit(saveInfo)} className='about__form'>
				<div className='about__form-line'>
					<label htmlFor='position'>Введите желаемую должность: </label>
					<input {...register("position")} />
				</div>
				<div className='about__form-line'>
					<label htmlFor='name'>Введите Имя, Фамилию: </label>
					<input {...register("name")} />
				</div>
				<div className='about__form-line'>
					<label htmlFor='area'>Ваша страна, город: </label>
					<input {...register("area")} />
				</div>
				<div className='about__form-line'>
					<label htmlFor='about'>Расскажите о себе: </label>
					<input {...register("about")} />
				</div>
				<div className='about__form-line'>
					<label htmlFor='phone'>Ваш номер телефона: </label>
					<input {...register("phone")} type='tel' />
				</div>
				<div className='about__form-line'>
					<label htmlFor='email'>Ваш email: </label>
					<input {...register("email")} type='email' />
				</div>
				<div className='about__form-line'>
					<label htmlFor='website'>Ваш сайт: </label>
					<input {...register("website")} />
				</div>
				<div className='about__form-line'>
					<label htmlFor='hobbies'>Ваше хобби: </label>
					<input {...register("hobbies")} />
				</div>
				<button>Сохранить</button>
			</form>
		</div>
	);
}

export default About;
