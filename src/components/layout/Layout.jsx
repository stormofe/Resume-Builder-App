import { Box } from "@mui/system";
import React from "react";

function Layout({ children }) {
	return (
		<Box sx={{ display: "flex", width: "100%" }}>
			<Box component='main' sx={{ flexGrow: 1, bgcolor: "whitesmoke", paddingY: 3, paddingX: 1 }}>
				{children}
			</Box>
		</Box>
	);
}

export default Layout;
