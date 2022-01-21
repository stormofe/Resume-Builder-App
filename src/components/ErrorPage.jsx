import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";

function ErrorPage() {
	const history = useHistory();
	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
				minHeight: "calc(100vh - 115px)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}>
			<Typography variant='h5' textAlign='center'>
				Ошибка 404 <br /> Страница не найдена
			</Typography>
			<Button onClick={() => history.push("/")}>Вернуться на главную</Button>
		</Box>
	);
}

export default ErrorPage;
