import { Box, CircularProgress } from "@mui/material";
import React from "react";

function Preloader() {
	return (
		<Box
			sx={{
				display: "flex",
				width: "100%",
				minHeight: "calc(100vh - 105px)",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<CircularProgress size={70} />
		</Box>
	);
}

export default Preloader;
