import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function About() {
	const { register, handleSubmit } = useForm();

	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.user);

	const [gettingInfo, setGettingInfo] = useState({});
	const { about, area, email, position, name, phone, website, hobbies } = gettingInfo;

	const saveInfo = (data) => {
		dispatch({ type: "SAVE_INFO", payload: data });
		setGettingInfo(userInfo);
		console.log(about);
	};
	useEffect(() => {
		dispatch({ type: "GET_INFO" });
	}, []);

	useEffect(() => {
		setGettingInfo(userInfo);
	}, [userInfo]);

	return (
		<div className='about'>
			<h3>Личная информация: </h3>

			{/*<button onClick={() => dispatch({ type: "GET_INFO" })}>Get info</button>*/}

			<p className='about__notice notice'>Ставьте "-" там, где не хотите заполнять поле</p>
			<form onSubmit={handleSubmit(saveInfo)} className='about__form'>
				<button className='about__form-save'>Сохранить</button>
				<div className='about__form-line'>
					<label htmlFor='position'>Введите желаемую должность: </label>
					<input {...register("position")} />
					{position ? <p className='about__form-state'>{position}</p> : ""}
				</div>
				<div className='about__form-line'>
					<label htmlFor='name'>Введите Имя, Фамилию: </label>
					<input {...register("name")} />
					{name ? <p className='about__form-state'>{name}</p> : ""}
				</div>
				<div className='about__form-line'>
					<label htmlFor='area'>Ваша страна, город: </label>
					<input {...register("area")} />
					{area ? <p className='about__form-state'>{area}</p> : ""}
				</div>
				<div className='about__form-line'>
					<label htmlFor='about'>Расскажите о себе: </label>
					<input {...register("about")} />
					{about ? <p className='about__form-state'>{about}</p> : ""}
				</div>
				<div className='about__form-line'>
					<label htmlFor='phone'>Ваш номер телефона: </label>
					<input {...register("phone")} type='tel' />
					{phone ? <p className='about__form-state'>{phone}</p> : ""}
				</div>
				<div className='about__form-line'>
					<label htmlFor='email'>Ваш email: </label>
					<input {...register("email")} type='email' />
					{email ? <p className='about__form-state'>{email}</p> : ""}
				</div>
				<div className='about__form-line'>
					<label htmlFor='website'>Ваш сайт: </label>
					<input {...register("website")} />
					{website ? <p className='about__form-state'>{website}</p> : ""}
				</div>
				<div className='about__form-line'>
					<label htmlFor='hobbies'>Ваше хобби: </label>
					<input {...register("hobbies")} />
					{hobbies ? <p className='about__form-state'>{hobbies}</p> : ""}
				</div>
				<button className='about__form-save'>Сохранить</button>
			</form>
		</div>
	);
}

export default About;
