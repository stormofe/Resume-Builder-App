import { Container, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setStorage } from "../API/API";
function Profile() {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.user);

	const [file, setFile] = useState(null);

	const { position, name, about, phone, email, website, area, hobbies, skills, edu, exp, softSkills, socials } =
		userInfo;

	useEffect(() => {
		dispatch({ type: "GET_INFO" });
		console.log(userInfo);
	}, []);

	const ItemLeft = styled(Paper)(({ theme }) => ({
		...theme.typography.body1,
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.primary,
	}));
	const ItemRight = styled(Paper)(({ theme }) => ({
		...theme.typography.body1,
		padding: theme.spacing(1),
		textAlign: "left",
		color: theme.palette.text.secondary,
	}));

	return (
		<Container>
			<Typography variant='h5' component='h2' mb='20px'>
				Общая информация:
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={3}>
					<ItemLeft>Имя Фамилия</ItemLeft>
				</Grid>
				<Grid item xs={9}>
					<ItemRight>{name}</ItemRight>
				</Grid>{" "}
				<Grid item xs={3}>
					<ItemLeft>Профессия</ItemLeft>
				</Grid>
				<Grid item xs={9}>
					<ItemRight>{position}</ItemRight>
				</Grid>
				<Grid item xs={3}>
					<ItemLeft>Имя Фамилия</ItemLeft>
				</Grid>
				<Grid item xs={9}>
					<ItemRight>{name}</ItemRight>
				</Grid>
				<Grid item xs={3}>
					<ItemLeft>Имя Фамилия</ItemLeft>
				</Grid>
				<Grid item xs={9}>
					<ItemRight>{name}</ItemRight>
				</Grid>
			</Grid>
		</Container>
		//<div className='profile'>
		//	{userInfo ? (
		//		<div className='profile__info'>
		//			<h3>Общая информация: </h3>
		//			<div className='info'>
		//				<div className='info__line'>
		//					<div className='info__name'>Имя Фамилия</div>
		//					<div className='info__value'>{name}</div>
		//				</div>
		//				<div className='info__line'>
		//					<div className='info__name'>Профессия</div>
		//					<div className='info__value'>{position}</div>
		//				</div>
		//				<div className='info__line'>
		//					<div className='info__name'>Обо мне</div>
		//					<div className='info__value'>{about}</div>
		//				</div>
		//				<div className='info__line'>
		//					<div className='info__name'>Телефон </div>
		//					<div className='info__value'>{phone}</div>
		//				</div>
		//				<div className='info__line'>
		//					<div className='info__name'>Email</div>
		//					<div className='info__value'>{email}</div>
		//				</div>
		//				<div className='info__line'>
		//					<div className='info__name'>Сайт</div>
		//					<div className='info__value'>{website}</div>
		//				</div>
		//				<div className='info__line'>
		//					<div className='info__name'>Город</div>
		//					<div className='info__value'>{area}</div>
		//				</div>
		//				<div className='info__line'>
		//					<div className='info__name'>Хобби</div>
		//					<div className='info__value'>{hobbies}</div>
		//				</div>
		//			</div>
		//		</div>
		//	) : (
		//		"Loading..."
		//	)}

		//	<div className='profile__skills'>
		//		<h3>Coциальные сети </h3>
		//		<div className='profile__skills-info'>
		//			{socials && Object.keys(socials).length !== 0
		//				? Object.entries(socials).map((soc, index) => (
		//						<div key={index} className='skills'>
		//							<a target='_blank' href={`${soc[1]}`}>
		//								{soc[1]}
		//							</a>{" "}
		//						</div>
		//				  ))
		//				: ""}
		//		</div>
		//	</div>
		//	<div className='profile__skills'>
		//		<h3>Навыки</h3>
		//		<div className='profile__skills-info'>
		//			{skills
		//				? Object.entries(skills).map((item, index) => (
		//						<div className='skills' key={index}>
		//							<div className='skills__name'>{item[1][0]}</div>
		//							<div className='skills__value'> {item[1][1]}⭐</div>
		//						</div>
		//				  ))
		//				: ""}
		//		</div>
		//	</div>
		//	<div className='profile__skills'>
		//		<h3>Мягкие навыки</h3>
		//		<div className='profile__skills-info'>
		//			{softSkills
		//				? Object.entries(softSkills).map((item, index) => (
		//						<div className='skills' key={index}>
		//							<div className='skills__name'>{item[1][0]}</div>
		//							<div className='skills__value'> {item[1][1]}⭐</div>
		//						</div>
		//				  ))
		//				: ""}
		//		</div>
		//	</div>
		//	<div className='profile__exp'>
		//		<h3>Опыт работы</h3>
		//		{exp
		//			? Object.entries(exp).map((item, index) => (
		//					<div className='profile__exp-column info' key={index}>
		//						<div className='info__line'>
		//							<div className='info__name'>Профессия</div>
		//							<div className='info__value'>{item[1].profession}</div>
		//						</div>{" "}
		//						<div className='info__line'>
		//							<div className='info__name'>Учреждение</div>
		//							<div className='info__value'>{item[1].where}</div>
		//						</div>{" "}
		//						<div className='info__line'>
		//							<div className='info__name'>Дата начала</div>
		//							<div className='info__value'>{item[1].dateFrom}</div>
		//						</div>{" "}
		//						<div className='info__line'>
		//							<div className='info__name'>Дата окончания</div>
		//							<div className='info__value'>{item[1].dateEnd}</div>
		//						</div>{" "}
		//						<div className='info__line'>
		//							<div className='info__name'>Описание</div>
		//							<div className='info__value'>{item[1].description}</div>
		//						</div>
		//					</div>
		//			  ))
		//			: ""}
		//	</div>
		//	<div className='profile__edu'>
		//		<h3>Образование</h3>
		//		{edu
		//			? Object.entries(edu).map((item, index) => (
		//					<div className='profile__edu-column info' key={index}>
		//						<div className='info__line'>
		//							<div className='info__name'>Профессия</div>
		//							<div className='info__value'>{item[1].profession}</div>
		//						</div>{" "}
		//						<div className='info__line'>
		//							<div className='info__name'>Учреждение</div>
		//							<div className='info__value'>{item[1].where}</div>
		//						</div>{" "}
		//						<div className='info__line'>
		//							<div className='info__name'>Дата окончания</div>
		//							<div className='info__value'>{item[1].data}</div>
		//						</div>{" "}
		//						<div className='info__line'>
		//							<div className='info__name'>Описание</div>
		//							<div className='info__value'>{item[1].description}</div>
		//						</div>
		//					</div>
		//			  ))
		//			: ""}
		//	</div>
		//</div>
	);
}

export default Profile;
