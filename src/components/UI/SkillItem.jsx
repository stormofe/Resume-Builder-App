import { IconButton, Paper, Typography } from "@mui/material";
import React from "react";

function SkillItem({ children, color }) {
	return (
		<Paper
			sx={{
				display: "flex",
				width: "fit-content",
				alignItems: "center",
				p: "5px",
				backgroundColor: `${color}`,
				color: "white",
				mr: 1,
				mb: 1,
			}}>
			{children}
		</Paper>
	);
}

export default SkillItem;
