import React from "react";
import { v4 as uuidv4 } from "uuid";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, IconButton, Typography, ButtonGroup, Tooltip, Paper } from "@mui/material";
function AddedObj({ arr, bgColor, handleDelete }) {
	return (
		<Box>
			{arr
				? arr.map((item, index) => (
						<Paper
							key={uuidv4()}
							elevation={2}
							sx={{ p: 2, mt: 1, position: "relative", backgroundColor: `${bgColor}`, color: "white" }}>
							<Typography>{item.profession}</Typography>
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Typography variant='caption'>{item.where}</Typography>
								<Typography variant='caption'>{item.date}</Typography>
								<Box>
									{item.dateStart ? <Typography variant='caption'>{item.dateStart} - </Typography> : ""}
									{item.dateEnd ? <Typography variant='caption'>{item.dateEnd}</Typography> : ""}
								</Box>
							</Box>

							<Typography variant='body2'>{item.description}</Typography>
							<IconButton
								aria-label='delete'
								size='small'
								sx={{ color: "white", position: "absolute", top: 1, right: 1 }}
								onClick={() => handleDelete(index)}>
								<ClearIcon fontSize='inherit' />
							</IconButton>
						</Paper>
				  ))
				: ""}
		</Box>
	);
}

export default AddedObj;
