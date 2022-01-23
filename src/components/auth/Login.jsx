import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./Auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useHistory } from "react-router-dom";
import LoginForm from "./login/LoginForm";
function Login() {
	const [loginError, setLoginError] = useState("");
	const [open, setOpen] = React.useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const loading = useSelector((state) => state.forms.loading.login);
	useEffect(() => {
		setIsLoading(loading);
	}, [loading]);
	const { currentUser } = useContext(AuthContext);
	const dispatch = useDispatch();
	const history = useHistory();
	const error = useSelector((store) => store.login.error);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
	const successRegister = useSelector((store) => store.login.register);

	useEffect(() => {
		if (currentUser) {
			history.push("/");
		} else {
			history.push("/login");
		}
	}, []);
	useEffect(() => {
		if (successRegister) {
			history.push("/");
		}
	}, [successRegister]);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		setLoginError(error);
		setTimeout(() => {
			dispatch({ type: "ERROR_LOGIN_FALSE" });
		}, 5000);
	}, [error]);

	const logIn = (email, password) => {
		dispatch({ type: "LOG_IN", email, password });
	};
	const getLogOut = () => {
		dispatch({ type: "LOG_OUT" });
	};
	const getRegister = (email, password) => {
		dispatch({ type: "REGISTER", email, password });
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				minHeight: "calc(100vh - 115px)",
			}}>
			<Box sx={{ maxWidth: "350px", display: "flex", flexDirection: "column" }}>
				<LoginForm
					loading={isLoading}
					loginError={loginError}
					currentUser={currentUser}
					getLogOut={getLogOut}
					auth={logIn}
					getLogin
				/>
				<Button variant='contained' sx={{ width: "100%" }} onClick={handleClickOpen}>
					Зарегистрироваться
				</Button>
			</Box>

			<Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
				<DialogTitle id='responsive-dialog-title'>Регистрация</DialogTitle>
				<DialogContent>
					<Box sx={{ maxWidth: "350px" }}>
						<LoginForm
							loading={isLoading}
							loginError={loginError}
							currentUser={currentUser}
							getLogOut={getLogOut}
							auth={getRegister}
							getRegister
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>
						Отменить
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}

export default Login;
