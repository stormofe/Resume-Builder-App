import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import CreateIcon from "@mui/icons-material/Create";
import { ExpBlock, LinkRow, SidebarItem, Skill, Title } from "../styledComponents/ProfileComponents";
import TempFirst from "./templates/temp1/TempFirst";
import TempSecond from "./templates/temp2/TempSecond";
import Form from "./Form";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			style={{ width: "inherit" }}
			{...other}>
			{value === index && <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
}

function Profile() {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.user);
	const userPhoto = useSelector((state) => state.user.photoURL);

	const [file, setFile] = useState(null);

	const {
		position,
		name,
		firstName,
		lastName,
		about,
		phone,
		email,
		website,
		area,
		hobbies,
		photoUrl,
		skills,
		edu,
		exp,
		custom,
		softSkills,
		langSkills,
		socials,
	} = userInfo;

	useEffect(() => {
		dispatch({ type: "GET_INFO" });
		dispatch({ type: "GET_PHOTO" });
	}, []);

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Grid container>
			<Grid item sm={12} md={9} lg={8}>
				<Box sx={{ flexGrow: 1, display: "flex", width: "100%" }}>
					<Tabs
						orientation='vertical'
						variant='scrollable'
						value={value}
						onChange={handleChange}
						aria-label='Vertical tabs example'
						sx={{ borderRight: 1, borderColor: "divider" }}>
						<Tab
							icon={<AccountBoxIcon />}
							sx={{
								padding: 1,
								minWidth: "48px",
								pl: 0,
								fontSize: { xs: 0, md: 0, lg: "14px" },
							}}
							label='Ваш профиль'
							{...a11yProps(0)}
						/>
						<Tab
							icon={<LooksOneIcon />}
							sx={{
								padding: 1,
								minWidth: "48px",
								pl: 0,
								fontSize: { xs: 0, md: 0, lg: "14px" },
							}}
							label='Шаблон 1'
							{...a11yProps(1)}
						/>
						<Tab
							icon={<LooksTwoIcon />}
							sx={{
								padding: 1,
								minWidth: "48px",
								pl: 0,
								fontSize: { xs: 0, md: 0, lg: "14px" },
							}}
							label='Шаблон 2'
							{...a11yProps(2)}
						/>

						<Tab
							icon={<CreateIcon />}
							sx={{
								padding: 1,
								minWidth: "48px",
								pl: 0,
								fontSize: { xs: 0, md: 0, lg: "14px" },
							}}
							label=''
							{...a11yProps(3)}
						/>
					</Tabs>
					<TabPanel value={value} index={0}>
						<Box sx={{ display: "flex", gap: 3, maxWidth: "650px" }}>
							<Paper sx={{ minHeight: "877px", flexGrow: 0, flexShrink: 0, flexBasis: "620px" }}>
								<Grid container sx={{ minHeight: "100%" }} columns={2} wrap='nowrap'>
									<Grid item p={2} sx={{ width: "240px", borderRight: "2px solid #fdfdfd" }}>
										<Grid container sx={{ display: "flex", justifyContent: "center" }}>
											<SidebarItem item>
												<Paper sx={{ width: "180px", height: "230px" }} elevation={3}>
													<img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={userPhoto} alt='' />
												</Paper>
											</SidebarItem>
											<SidebarItem item>
												<Box>
													<LinkRow name={""} link={email} />
													<LinkRow name={""} link={phone} />
													{socials
														? Object.entries(socials).map((item) => <LinkRow name='' link={item[1]} key={item[1]} />)
														: ""}
												</Box>
											</SidebarItem>
											<SidebarItem item>
												<Title>Навыки</Title>
												{skills
													? Object.entries(skills).map((item, index) => <Skill key={index} item={item}></Skill>)
													: ""}
											</SidebarItem>
											<SidebarItem item>
												<Title>Мягкие навыки</Title>
												{softSkills
													? Object.entries(softSkills).map((item, index) => <Skill key={index} item={item}></Skill>)
													: ""}
											</SidebarItem>
											<SidebarItem item>
												<Title>Языки</Title>
												{langSkills
													? Object.entries(langSkills).map((item, index) => <Skill key={index} item={item}></Skill>)
													: ""}
											</SidebarItem>
										</Grid>
									</Grid>
									<Grid item p={3} sx={{ flexGrow: 0 }}>
										<Box mt={3} sx={{ width: "100%", textAlign: "center" }}>
											<Typography alignItems='center' color='primary' variant='h4' sx={{ fontWeight: 500 }}>
												{lastName} {firstName}
											</Typography>
											<Typography variant='h6' color='primary'>
												{position}
											</Typography>
										</Box>
										<Typography paragraph mt={1} fontSize='14px' color='GrayText'>
											{about}
										</Typography>
										<Box mb={2}>
											<Title>Образование</Title>
											{edu
												? Object.entries(edu).map((item, index) => (
														<ExpBlock
															key={index}
															name={item[1].where}
															dateFrom={""}
															dateEnd={item[1].data}
															description={item[1].description}
															position={item[1].profession}
														/>
												  ))
												: ""}
										</Box>
										<Box mb={2}>
											<Title>Опыт работы</Title>
											{exp
												? Object.entries(exp).map((item, index) => (
														<ExpBlock
															key={index}
															name={item[1].where}
															dateFrom={item[1].dateFrom}
															dateEnd={item[1].dateEnd}
															description={item[1].description}
															position={item[1].profession}
														/>
												  ))
												: ""}
										</Box>
										<Box mb={2}>
											<Title>Дополнительные сведения</Title>
											{custom
												? Object.entries(custom).map((item, index) => (
														<ExpBlock
															key={index}
															name={item[1].name}
															dateFrom={item[1].dateFrom}
															dateEnd={item[1].dateEnd}
															description={item[1].description}
															position={item[1].obj}
														/>
												  ))
												: ""}
										</Box>
									</Grid>
								</Grid>
							</Paper>
						</Box>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Box sx={{ display: "flex", gap: 3, maxWidth: "650px" }}>
							<TempFirst />
						</Box>
					</TabPanel>
					<TabPanel value={value} index={2}>
						<Box sx={{ display: "flex", gap: 3, maxWidth: "595px" }}>
							<TempSecond />
						</Box>
					</TabPanel>
					<TabPanel value={value} index={3}>
						<Form sm={12} />
					</TabPanel>
				</Box>
			</Grid>
			<Form sm={12} md={3} lg={4} userInfo={userInfo} />
		</Grid>

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
