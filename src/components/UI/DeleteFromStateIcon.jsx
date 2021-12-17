import { IconButton } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteFromStateIcon(props) {
	return (
		<IconButton aria-label='delete' sx={{ position: "absolute", top: 0, right: 0 }} {...props}>
			<DeleteIcon />
		</IconButton>
	);
}

export default DeleteFromStateIcon;
