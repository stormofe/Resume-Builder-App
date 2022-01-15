import { Box, Typography } from "@mui/material";
import React from "react";

function StartPage() {
	return (
		<Box sx={{ maxWidth: "1200px", width: "100%", marginX: "auto", backgroundColor: "white", height: "100vh", p: 3 }}>
			<Typography variant='h4' component='h2' textAlign='center'>
				Привет, дорогой гость!
			</Typography>
		</Box>
	);
}

export default StartPage;
