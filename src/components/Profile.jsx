import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "./auth/Auth";
import Preloader from "./UI/Preloader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
function Profile() {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.user);

	const { position, name, about, phone, email, website, area, hobbies } = userInfo;

	useEffect(() => {
		dispatch({ type: "GET_INFO" });
		console.log(userInfo);
	}, []);

	return (
		<div className='profile'>
			<h3>Ваши данные: </h3>
			{userInfo ? (
				<div className='profile__info info'>
					<div className='info__line'>
						<div className='info__name'>Имя Фамилия</div>
						<div className='info__value'>{name}</div>
					</div>
					<div className='info__line'>
						<div className='info__name'>Профессия</div>
						<div className='info__value'>{position}</div>
					</div>
					<div className='info__line'>
						<div className='info__name'>Обо мне</div>
						<div className='info__value'>{about}</div>
					</div>
					<div className='info__line'>
						<div className='info__name'>Телефон </div>
						<div className='info__value'>{phone}</div>
					</div>
					<div className='info__line'>
						<div className='info__name'>Email</div>
						<div className='info__value'>{email}</div>
					</div>
					<div className='info__line'>
						<div className='info__name'>Сайт</div>
						<div className='info__value'>{website}</div>
					</div>
					<div className='info__line'>
						<div className='info__name'>Город</div>
						<div className='info__value'>{area}</div>
					</div>
					<div className='info__line'>
						<div className='info__name'>Хобби</div>
						<div className='info__value'>{hobbies}</div>
					</div>
				</div>
			) : (
				"Loading..."
			)}
		</div>
	);
}

export default Profile;
