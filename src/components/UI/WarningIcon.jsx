import React from "react";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Tooltip } from "@mui/material";

function WarningIcon() {
	return (
		<Tooltip title='Поле не заполнено' arrow>
			<PriorityHighIcon
				sx={{ position: "absolute", top: 0, right: "45px", transform: "translateY(30%)", color: "error.main" }}
			/>
		</Tooltip>
	);
}

export default WarningIcon;
