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
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (suc) {
			setSuccess(true);
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

				{/*<Alert severity='error'>This is an error message!</Alert>
				<Alert severity='warning'>This is a warning message!</Alert>
				<Alert severity='info'>This is an information message!</Alert>
				<Alert severity='success'>This is a success message!</Alert>*/}
			</Stack>
		</div>
	);
}

export default SnackbarSuccess;
