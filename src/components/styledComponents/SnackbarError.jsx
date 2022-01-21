import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "./ProfileComponents";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function SnackbarError() {
	const dispatch = useDispatch();
	const [openErr, setOpenErr] = useState(false);
	let err = useSelector((state) => state.forms.error);

	const [error, setError] = useState("");
	const setErrorFalse = () => {
		dispatch({ type: "ERROR_FALSE" });
	};

	useEffect(() => {
		if (err) {
			setError(err);
			setOpenErr(true);
			setErrorFalse();
		}
	}, [err]);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenErr(false);
	};
	return (
		<div>
			<Stack spacing={2} sx={{ maxWidth: "350px" }}>
				<Snackbar open={openErr} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity='error' sx={{ width: "100%" }}>
						{error}
					</Alert>
				</Snackbar>
			</Stack>
		</div>
	);
}

export default SnackbarError;
