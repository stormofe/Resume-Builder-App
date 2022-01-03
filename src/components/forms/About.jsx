import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Social from "./about/Social";

function About() {
	const { register, handleSubmit } = useForm();

	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.user);
	const userPhoto = useSelector((state) => state.user.photoURL);

	const [gettingInfo, setGettingInfo] = useState({});
	const [photo, setPhoto] = useState(null);
	const [gettingPhoto, setGettingPhoto] = useState(null);
	const { about, area, email, position, name, phone, hobbies } = gettingInfo;
	const photoInp = useRef(null);

	const saveInfo = (data, event) => {
		event.target.reset();
		console.log(data);
		dispatch({ type: "SAVE_INFO", payload: data });
		setGettingInfo(userInfo);
	};

	const savePhoto = (e) => {
		e.preventDefault();
		dispatch({ type: "SAVE_PHOTO", payload: photo });
		//setPhoto(null);
		deletePhoto();
	};

	const deletePhoto = () => {
		setPhoto(null);
		photoInp.current.value = "";
	};
	useEffect(() => {
		dispatch({ type: "GET_INFO" });
		dispatch({ type: "GET_PHOTO" });
	}, []);

	useEffect(() => {
		setGettingInfo(userInfo);
	}, [userInfo]);

	useEffect(() => {
		setGettingPhoto(userPhoto);
	}, [userPhoto]);

	return (
		<div className='about'>
			<h3>Личная информация</h3>
			<h4>Ваше фото:</h4>
			<form className='about__photo' onSubmit={(e) => savePhoto(e)}>
				<div className='about__photo-col'>
					{gettingPhoto ? <img src={gettingPhoto} alt='' /> : ""}
					<div className='about__photo-col_inp'>
						<label htmlFor='file'>Выберите фото</label>
						<input
							style={{ opacity: 0 }}
							type='file'
							name='file'
							ref={photoInp}
							onChange={(e) => setPhoto(e.target.files[0])}
						/>
					</div>
				</div>
				<div className='about__photo-col'>
					{photo ? (
						<>
							<img src={photo ? URL.createObjectURL(photo) : null} alt='' />
						</>
					) : (
						""
					)}
					{photo ? (
						<>
							<p>
								Выбран файл: <br /> {photo.name}
							</p>
							<div className='about__photo-col_buttons buttons'>
								<button>✓</button>
								<button onClick={deletePhoto}>X</button>
							</div>
						</>
					) : (
						""
					)}
				</div>
			</form>

			<Social />

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
