import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import TempFirst from "./profile/templates/temp1/TempFirst";
import Forms from "./profile/Forms";
import exampleBlur from "./../source/ExampleBlur.jpg";
import exampleBlurTwo from "../source/temp2.jpg";
import exampleBlurOne from "../source/temp1.jpg";
import TempTwo from "./profile/templates/temp2/TempTwo";
import Temp from "./profile/templates/temp/Temp";

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

	const { mainInfo } = fullInfo;
	useEffect(() => {
		dispatch({ type: "GET_INFO" });
		dispatch({ type: "GET_PHOTO" });
	}, [dispatch]);
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

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
								<Temp fullInfo={fullInfo} />
							</Box>
						) : (
							<Box
								sx={{
									display: "flex",
									gap: 3,
									maxWidth: "620px",
									width: "100%",
									position: "relative",
								}}>
								<img src={exampleBlur} alt='example' style={{ maxWidth: "100%" }} />
							</Box>
						)}
					</TabPanel>
					<TabPanel value={value} index={1}>
						{mainInfoLength > 2 ? (
							<Box sx={{ display: "flex", gap: 3, maxWidth: "620px", width: "100%", position: "relative" }}>
								<TempFirst info={fullInfo} />
							</Box>
						) : (
							<Box
								sx={{
									display: "flex",
									gap: 3,
									maxWidth: "620px",
									width: "100%",
									position: "relative",
								}}>
								<img src={exampleBlurOne} alt='example' style={{ maxWidth: "100%" }} />
							</Box>
						)}
					</TabPanel>
					<TabPanel value={value} index={2}>
						{mainInfoLength > 2 ? (
							<Box
								sx={{
									display: "flex",
									gap: 3,
									maxWidth: "620px",
									width: "100%",
									position: "relative",
									overflow: "hidden",
								}}>
								<TempTwo info={fullInfo} />
							</Box>
						) : (
							<Box
								sx={{
									display: "flex",
									gap: 3,
									maxWidth: "620px",
									width: "100%",
									position: "relative",
								}}>
								<img src={exampleBlurTwo} alt='example' style={{ maxWidth: "100%" }} />
							</Box>
						)}
					</TabPanel>
				</Box>
			</Grid>
			<Forms sm={12} md={12} lg={5} fullInfo={fullInfo} />
		</Grid>
	);
}

export default Profile;
