import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "./ProfileComponents";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function SnackbarSuccess() {
	const dispatch = useDispatch();
	const [openSuc, setOpenSuc] = useState(false);
	let suc = useSelector((state) => state.forms.success);

	useEffect(() => {
		if (suc) {
			setOpenSuc(true);
			setSuccessFalse();
		}
	}, [suc]);

	const setSuccessFalse = () => {
		dispatch({ type: "SUCCESS_FALSE" });
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSuc(false);
	};
	return (
		<div>
			<Stack spacing={2} sx={{ maxWidth: "350px" }}>
				<Snackbar open={openSuc} autoHideDuration={3000} onClose={handleClose}>
					<Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
						Сохранено успешно
					</Alert>
				</Snackbar>
			</Stack>
		</div>
	);
}

export default SnackbarSuccess;
