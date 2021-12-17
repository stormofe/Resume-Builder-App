import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Tooltip } from "@mui/material";
function GreenCheckIcon() {
	return (
		<Tooltip title='Поле заполнено' arrow>
			<CheckIcon
				sx={{ position: "absolute", top: 0, right: "45px", transform: "translateY(30%)", color: "success.main" }}
			/>
		</Tooltip>
	);
}

export default GreenCheckIcon;
