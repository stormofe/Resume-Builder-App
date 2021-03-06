import React from "react";
import { Box, IconButton, Rating, Tooltip, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { v4 as uuidv4 } from "uuid";
function AddedSkillsBlock({ skills, deleteSkill, color }) {
	return (
		<Box sx={{ display: "flex", flexWrap: "wrap" }}>
			{skills.length > 0
				? skills.map((skill, index) => (
						<Paper
							key={uuidv4()}
							sx={{
								display: "flex",
								flexWrap: "nowrap",
								maxWidth: "200px",
								alignItems: "center",
								paddingX: "5px",
								paddingY: "3px",
								backgroundColor: `${color}`,
								color: "white",
								mr: 1,
								mb: 1,
							}}>
							<Tooltip title={skill[0]} arrow>
								<Typography
									variant='body2'
									fontWeight={500}
									sx={{
										letterSpacing: 1.2,
										overflow: "hidden",
										maxWidth: "90px",
										whiteSpace: "nowrap",
										textOverflow: "ellipsis",
										mr: 1,
									}}>
									{skill[0]}
								</Typography>
							</Tooltip>
							{/*<Typography sx={{ pl: 1, display: "flex", alignItems: "center" }}>
								{skill[1]} <StarIcon fontSize='small' color='warning' />
							</Typography>*/}
							<Rating name='read-only' value={Number(skill[1])} readOnly size='small' />
							<IconButton aria-label='delete' size='small' sx={{ color: "white" }} onClick={() => deleteSkill(index)}>
								<ClearIcon fontSize='inherit' />
							</IconButton>
						</Paper>
				  ))
				: ""}
		</Box>
	);
}

export default AddedSkillsBlock;
