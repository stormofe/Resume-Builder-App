import { Grid, Paper } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import { ExpBlock, LinkRow, SidebarItem, Skill, Title } from "./styledComponents/ProfileComponents";
import TempFirst from "./profile/templates/temp1/TempFirst";
import Forms from "./profile/Forms";
import userIcon from "./../source/user.png";
import { v4 as uuidv4 } from "uuid";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import { IconButton } from "@mui/material";
import exampleBlur from "./../source/ExampleBlur.jpg";

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
	const fullInfo = useSelector((state) => state.fullInfo);

	const { skills, softSkills, langSkills, edu, exp, custom, socials, mainInfo } = fullInfo;
	useEffect(() => {
		dispatch({ type: "GET_INFO" });
		dispatch({ type: "GET_PHOTO" });
	}, [dispatch]);
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const componentRef = useRef();
	const pageStyle = `
	.MuiPaper-elevation {
		box-shadow: none !important;
	}
	p {
		orphans: 3;
	}
	.css-1vsk7cc-MuiGrid-root, .MuiPaper-root {
		page-break-inside: avoid !important;
	}import Preloader from './UI/Preloader';

`;

	const [mainInfoLength, setMainInfoLength] = React.useState(0);
	useEffect(() => {
		setMainInfoLength(Object.keys(mainInfo).length);
	}, [mainInfo]);
	return (
		<Grid container spacing={2}>
			<Grid item sm={12} md={12} lg={7}>
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
					</Tabs>
					<TabPanel value={value} index={0}>
						{mainInfoLength > 2 ? (
							<Box
								sx={{
									display: "flex",
									gap: 3,
									maxWidth: "650px",
									width: "100%",
									position: "relative",
								}}>
								<Paper ref={componentRef} sx={{ minHeight: "877px", flexGrow: 0, flexShrink: 0, flexBasis: "620px" }}>
									<Grid container sx={{ minHeight: "100%", maxWidth: "650px" }} columns={2} wrap='nowrap'>
										<Grid item p={2} sx={{ width: "240px", borderRight: "2px solid #fdfdfd" }}>
											<Grid container sx={{ display: "flex", justifyContent: "center" }}>
												<SidebarItem item>
													<Paper sx={{ width: "180px", height: "230px" }} elevation={3}>
														{mainInfo.photoURL ? (
															<img
																style={{ width: "100%", height: "100%", objectFit: "cover" }}
																src={mainInfo.photoURL}
																alt=''
															/>
														) : (
															<img
																style={{ width: "100%", height: "100%", objectFit: "contain" }}
																src={userIcon}
																alt=''
															/>
														)}
													</Paper>
												</SidebarItem>
												<SidebarItem item>
													<Box>
														{mainInfo.email && <LinkRow name={""} link={mainInfo.email} />}
														{mainInfo.phone && <LinkRow name={""} link={mainInfo.phone} />}

														{socials.length > 0 &&
															socials.map((item) => <LinkRow name='' link={item} key={uuidv4()} />)}
													</Box>
												</SidebarItem>
												<SidebarItem item>
													{skills.length > 0 && <Title>Навыки</Title>}
													{skills.length > 0 && skills.map((item, index) => <Skill key={uuidv4()} item={item}></Skill>)}
												</SidebarItem>
												<SidebarItem item>
													{softSkills.length > 0 && <Title>Мягкие навыки</Title>}
													{softSkills.length > 0 &&
														softSkills.map((item, index) => <Skill key={uuidv4()} item={item}></Skill>)}
												</SidebarItem>
												<SidebarItem item>
													{langSkills.length > 0 && <Title>Языки</Title>}
													{langSkills.length > 0 &&
														langSkills.map((item, index) => <Skill key={uuidv4()} item={item}></Skill>)}
												</SidebarItem>
											</Grid>
										</Grid>
										<Grid item p={3} sx={{ flexGrow: 0 }}>
											<Box mt={3} sx={{ width: "100%", textAlign: "center" }}>
												<Typography alignItems='center' color='primary' variant='h4' sx={{ fontWeight: 500 }}>
													{mainInfo.lastName} {mainInfo.firstName}
												</Typography>
												<Typography variant='h6' color='primary'>
													{mainInfo.position}
												</Typography>
											</Box>
											<Typography paragraph mt={1} fontSize='14px' color='GrayText' sx={{ maxWidth: "100%" }}>
												{mainInfo.about}
											</Typography>
											<Box mb={2} sx={{ maxWidth: "100%" }}>
												{edu.length > 0 && <Title>Образование</Title>}
												{edu.length > 0 &&
													edu.map((item, index) => (
														<ExpBlock
															key={uuidv4()}
															name={item.where}
															dateFrom={""}
															dateEnd={item.data}
															description={item.description}
															position={item.profession}
														/>
													))}
											</Box>
											<Box mb={2}>
												{exp.length > 0 && <Title>Опыт работы</Title>}
												{exp.length > 0 &&
													exp.map((item, index) => (
														<ExpBlock
															key={uuidv4()}
															name={item.where}
															dateFrom={item.dateFrom}
															dateEnd={item.dateEnd}
															description={item.description}
															position={item.profession}
														/>
													))}
											</Box>
											<Box mb={2}>
												{custom.length > 0 && <Title>Дополнительные сведения</Title>}
												{custom.length > 0 &&
													custom.map((item, index) => (
														<ExpBlock
															key={uuidv4()}
															name={item.where}
															dateFrom={item.dateStart}
															dateEnd={item.dateEnd}
															description={item.description}
															position={item.profession}
														/>
													))}
											</Box>
										</Grid>
									</Grid>
								</Paper>
								<div style={{ position: "absolute", top: "10px", right: "30px" }}>
									<ReactToPrint
										trigger={() => (
											<IconButton aria-label='print' size='large'>
												<PrintIcon />
											</IconButton>
										)}
										content={() => componentRef.current}
										pageStyle={pageStyle}
									/>
								</div>
							</Box>
						) : (
							<Box
								sx={{
									display: "flex",
									gap: 3,
									maxWidth: "650px",
									width: "100%",
									position: "relative",
								}}>
								<img src={exampleBlur} alt='example' style={{ maxWidth: "100%" }} />
							</Box>
						)}
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Box sx={{ display: "flex", gap: 3, maxWidth: "650px", width: "100%", position: "relative" }}>
							<TempFirst info={fullInfo} />
						</Box>
					</TabPanel>
				</Box>
			</Grid>
			<Forms sm={12} md={12} lg={5} fullInfo={fullInfo} />
		</Grid>
	);
}

export default Profile;
