import { CssBaseline, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Drawer from "@mui/material/Drawer";
import React from "react";

const drawerWidth = 240;
function Layout({ children }) {
	return (
		<Box sx={{ display: "flex", width: "100%" }}>
			{/*<CssBaseline />
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant='permanent'
				anchor='left'>
				<Divider />

				<Divider />
				<Typography>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora id vel sapiente quisquam perspiciatis ut eum
					ea repellat tenetur labore explicabo nostrum inventore animi, odit quo debitis. Officia, perspiciatis animi?
				</Typography>
			</Drawer>*/}

			<Box component='main' sx={{ flexGrow: 1, bgcolor: "whitesmoke", paddingY: 3, paddingX: 1 }}>
				{children}
			</Box>
		</Box>
	);
}

export default Layout;
