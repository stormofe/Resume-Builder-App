import { Box, CircularProgress } from "@mui/material";
import React from "react";

function Preloader() {
	return (
		<Box sx={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
			<CircularProgress size={55} />
		</Box>
	);
}

export default Preloader;
