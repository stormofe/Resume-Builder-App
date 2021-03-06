import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import FormMainInfo from "./forms/FormMainInfo";
import FormSkillsUniversal from "./forms/FormSkillsUniversal";
import { FormBlock } from "../styledComponents/ProfileComponents";
import FormEducation from "./forms/FormEducation";
import { useDispatch } from "react-redux";
import FormExp from "./forms/FormExp";
import FormCustom from "./forms/FormCustom";

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

function Forms(props) {
	const [expanded, setExpanded] = React.useState("panel1");
	const handleChangeAccord = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};
	const dispatch = useDispatch();
	const fullInfo = props.fullInfo;
	const { firstName, lastName, position, phone, about, area, email, hobbies, photoURL } = fullInfo.mainInfo;
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
	useEffect(() => {
		dispatch({ type: "GET_EDU_FROM_DB" });
	}, []);
	return (
		<Grid item sm={props.sm} md={props.md} lg={props.lg}>
			<Box
				sx={{
					maxWidth: "635px",
					marginX: { sx: 1, sm: "auto", md: "auto", lg: "auto" },
					marginTop: { lg: 0, md: 5, sm: 2, sx: 1 },
				}}>
				<Typography variant='h5' color='primary' mb={2} sx={{ textAlign: "center", p: 2 }}>
					?????????????????? ???????? ????????????
				</Typography>
				<Accordion expanded={expanded === "panel1"} onChange={handleChangeAccord("panel1")}>
					<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
						<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
							<Typography>???????????????? ????????????????????</Typography>
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
						<FormBlock>
							<FormMainInfo mainInfo={fullInfo.mainInfo} socials={fullInfo.socials} />
						</FormBlock>
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={expanded === "panel2"} onChange={handleChangeAccord("panel2")}>
					<AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
						<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
							<Typography>????????????</Typography>
						</Box>
					</AccordionSummary>
					<AccordionDetails>
						<FormBlock>
							<FormSkillsUniversal
								blockName='???????? ???????????????????????????????? ????????????'
								objName='skills'
								fetchType='FETCH_SKILLS'
								saveType='SAVE_SKILLS'
								deleteType='DELETE_SKILL'
								inputName='skill'
							/>
							<FormSkillsUniversal
								blockName='???????? ???????????????????? ????????????'
								objName='softSkills'
								fetchType='FETCH_SOFT_SKILLS'
								saveType='SAVE_SOFT_SKILLS'
								deleteType='DELETE_SOFT_SKILL'
								inputName='skill'
							/>
							<FormSkillsUniversal
								blockName='??????????'
								objName='langSkills'
								fetchType='FETCH_LANG_SKILLS'
								saveType='SAVE_LANG_SKILLS'
								deleteType='DELETE_LANG_SKILL'
								inputName='skill'
							/>
						</FormBlock>
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={expanded === "panel3"} onChange={handleChangeAccord("panel3")}>
					<AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
						<Typography>??????????????????????</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<FormEducation education={fullInfo.edu} />
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={expanded === "panel4"} onChange={handleChangeAccord("panel4")}>
					<AccordionSummary aria-controls='panel4d-content' id='panel4d-header'>
						<Typography>???????? ????????????</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<FormExp exp={fullInfo.exp} />
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={expanded === "panel5"} onChange={handleChangeAccord("panel5")}>
					<AccordionSummary aria-controls='panel5d-content' id='panel5d-header'>
						<Typography>???????????????????????????? ????????????????????</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<FormCustom custom={fullInfo.custom} />
					</AccordionDetails>
				</Accordion>
			</Box>
		</Grid>
	);
}

export default Forms;
