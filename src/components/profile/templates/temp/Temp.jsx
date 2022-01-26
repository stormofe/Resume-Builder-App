import React, { useRef } from "react";
import { Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ExpBlock, LinkRow, SidebarItem, Skill, Title } from "../../../styledComponents/ProfileComponents";
import userIcon from "../../../../source/user.png";
import { v4 as uuidv4 } from "uuid";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
function Temp(props) {
	const fullInfo = props.fullInfo;
	const { skills, softSkills, langSkills, edu, exp, custom, socials, mainInfo } = fullInfo;
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
	}

`;
	return (
		<>
			<Paper ref={componentRef} sx={{ minHeight: "877px", flexGrow: 0, flexShrink: 0, flexBasis: "620px" }}>
				<Grid container sx={{ minHeight: "100%", maxWidth: "650px" }} columns={2} wrap='nowrap'>
					<Grid item p={2} sx={{ width: "240px", borderRight: "2px solid #fdfdfd" }}>
						<Grid container sx={{ display: "flex", justifyContent: "center" }}>
							<SidebarItem item>
								<Paper sx={{ width: "180px", height: "230px" }} elevation={3}>
									{mainInfo.photoURL ? (
										<img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={mainInfo.photoURL} alt='' />
									) : (
										<img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={userIcon} alt='' />
									)}
								</Paper>
							</SidebarItem>
							<SidebarItem item>
								<Box>
									{mainInfo.email && <LinkRow name={""} link={mainInfo.email} />}
									{mainInfo.phone && <LinkRow name={""} link={mainInfo.phone} />}

									{socials.length > 0 && socials.map((item) => <LinkRow name='' link={item} key={uuidv4()} />)}
								</Box>
							</SidebarItem>
							<SidebarItem item>
								{skills.length > 0 && <Title>Навыки</Title>}
								{skills.length > 0 && skills.map((item, index) => <Skill key={uuidv4()} item={item}></Skill>)}
							</SidebarItem>
							<SidebarItem item>
								{softSkills.length > 0 && <Title>Мягкие навыки</Title>}
								{softSkills.length > 0 && softSkills.map((item, index) => <Skill key={uuidv4()} item={item}></Skill>)}
							</SidebarItem>
							<SidebarItem item>
								{langSkills.length > 0 && <Title>Языки</Title>}
								{langSkills.length > 0 && langSkills.map((item, index) => <Skill key={uuidv4()} item={item}></Skill>)}
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
			<div className='printButton'>
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
		</>
	);
}

export default Temp;
