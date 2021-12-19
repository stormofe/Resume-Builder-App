import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import FormMainInfo from "./form/FormMainInfo";
import FormSkills from "./form/FormSkills";
import FormSkillsUniversal from "./form/FormSkillsUniversal";
import { FormBlock } from "../styledComponents/ProfileComponents";

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	"&:not(:last-child)": {
		borderBottom: 0,
	},
	"&:before": {
		display: "none",
	},
}));

const AccordionSummary = styled((props) => (
	<MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
	flexDirection: "row-reverse",
	"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
		transform: "rotate(90deg)",
	},
	"& .MuiAccordionSummary-content": {
		marginLeft: theme.spacing(1),
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function Form(props) {
	const [expanded, setExpanded] = React.useState("panel1");
	const handleChangeAccord = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const fullUserInfo = props.userInfo;
	const { firstName, lastName, position, phone, about, area, email, hobbies, photoURL } = fullUserInfo;
	const formFieldsNames = [firstName, lastName, position, phone, about, area, email, hobbies, photoURL];

	const valueOfFormFill = () => {
		let count = formFieldsNames.length;
		let fillingForms = formFieldsNames.filter((item) => item);
		return Math.round((fillingForms.length / count) * 100);
	};
	const [percent, setPercent] = useState(0);
	useEffect(() => {
		setPercent(valueOfFormFill());
	}, [formFieldsNames]);
	return (
		<Grid item sm={props.sm} md={props.md} lg={props.lg}>
			<Typography variant='h5' color='primary' mb={2}>
				Заполните поля резюме
			</Typography>
			<Accordion expanded={expanded === "panel1"} onChange={handleChangeAccord("panel1")} sx={{ marginRight: 2 }}>
				<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
					<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
						<Typography>Основная информация</Typography>
						<Box
							sx={{
								backgroundColor: `${percent > 70 ? "success.main" : "error.main"}`,
								borderRadius: "8px",
								color: "white",
								fontWeight: 700,
								padding: "5px",
							}}>
							{percent}%
						</Box>
					</Box>
				</AccordionSummary>
				<AccordionDetails>
					<FormMainInfo userInfo={props.userInfo} />
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === "panel2"} onChange={handleChangeAccord("panel2")} sx={{ marginRight: 2 }}>
				<AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
					<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
						<Typography>Навыки</Typography>
						<Box
							sx={{
								backgroundColor: `${percent > 70 ? "success.main" : "error.main"}`,
								borderRadius: "8px",
								color: "white",
								fontWeight: 700,
								padding: "5px",
							}}>
							{percent}%
						</Box>
					</Box>
				</AccordionSummary>
				<AccordionDetails>
					{/*<FormSkills />*/}
					<FormBlock>
						<FormSkillsUniversal
							blockName='Ваши профессиональные навыки'
							objName='skills'
							fetchType='FETCH_SKILLS'
							saveType='SAVE_SKILLS'
							deleteType='DELETE_SKILL'
							inputName='skill'
						/>
						<FormSkillsUniversal
							blockName='Ваши социальные навыки'
							objName='langSkills'
							fetchType='FETCH_LANG_SKILLS'
							saveType='SAVE_LANG_SKILLS'
							deleteType='DELETE_LANG_SKILL'
							inputName='skill'
						/>
						<FormSkillsUniversal
							blockName='Языки'
							objName='softSkills'
							fetchType='FETCH_SOFT_SKILLS'
							saveType='SAVE_SOFT_SKILLS'
							deleteType='DELETE_SOFT_SKILL'
							inputName='skill'
						/>
					</FormBlock>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === "panel3"} onChange={handleChangeAccord("panel3")} sx={{ marginRight: 2 }}>
				<AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
					<Typography>Collapsible Group Item #3</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
						leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
						sit amet blandit leo lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</Grid>
	);
}

export default Form;
