import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function SmallPreloader() {
	return (
		<Box>
			<CircularProgress size={25} />
		</Box>
	);
}

export default SmallPreloader;
