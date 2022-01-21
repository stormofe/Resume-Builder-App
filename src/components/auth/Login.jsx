import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./Auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SmallPreloader from "../UI/SmallPreloader";
import { useHistory } from "react-router-dom";
function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [inputError, setInputError] = useState(false);
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

	const resetInput = () => {
		setPassword("");
		setEmail("");
	};

	useEffect(() => {
		setLoginError(error);
		setTimeout(() => {
			setLoginError("");
		}, 5000);
	}, [error]);
	const logIn = () => {
		if (email !== "" && password !== "") {
			setInputError(false);
			dispatch({ type: "LOG_IN", email, password });
			resetInput();
			history.push("/");
			return;
		}
		setInputError(true);
	};
	const getLogOut = () => {
		dispatch({ type: "LOG_OUT" });
		resetInput();
	};
	const getRegister = () => {
		dispatch({ type: "REGISTER", email, password });
		resetInput();
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				minHeight: "100vh",
			}}>
			<Box component='form' autoComplete='off' sx={{ maxWidth: "350px", flex: "1 1 auto" }}>
				<Typography component='h2' variant='h6' sx={{ mb: 2, textAlign: "center" }}>
					Войдите или зарегистрируйтесь
				</Typography>
				<TextField
					fullWidth
					required
					error={email === "" && inputError}
					helperText={email === "" && inputError && "Поле не заполнено"}
					type='email'
					value={email}
					label='Логин'
					placeholder='Логин'
					onChange={(e) => setEmail(e.target.value)}
					size='small'
					sx={{ mb: 1 }}
				/>
				<TextField
					fullWidth
					required
					error={password === "" && inputError}
					helperText={password === "" && inputError && "Поле не заполнено"}
					type='password'
					value={password}
					label='Пароль'
					placeholder='Пароль'
					onChange={(e) => setPassword(e.target.value)}
					size='small'
					sx={{ mb: 1 }}
				/>
				<Box sx={{ display: "flex", justifyContent: "center" }}>{isLoading && <SmallPreloader />}</Box>

				{currentUser ? (
					<Button variant='contained' sx={{ width: "100%" }} onClick={getLogOut}>
						Выйти
					</Button>
				) : (
					<Button variant='contained' sx={{ width: "100%" }} onClick={logIn}>
						Войти
					</Button>
				)}

				{loginError && loginError == "EMAIL_EXISTS" ? (
					<Box>
						<Typography sx={{ color: "error.main", mb: 2 }}>Этот эл. адрес уже занят</Typography>
					</Box>
				) : (
					<Box>
						<Typography sx={{ color: "error.main", mb: 2 }}>{loginError}</Typography>
					</Box>
				)}

				{/*<Typography variant='subtitle1' sx={{ marginY: 1, textAlign: "center" }}>
					ИЛИ
				</Typography>*/}
				<Button variant='contained' sx={{ width: "100%" }} onClick={handleClickOpen}>
					Зарегистрироваться
				</Button>
			</Box>

			<Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
				<DialogTitle id='responsive-dialog-title'>
					<Typography component='h2' variant='h6' sx={{ mb: 2, textAlign: "center" }}>
						Зарегистрируйтесь
					</Typography>
				</DialogTitle>
				<DialogContent>
					<Box component='form' autoComplete='off' sx={{ maxWidth: "350px" }}>
						<TextField
							fullWidth
							type='email'
							required
							error={email === "" && inputError}
							helperText={email === "" && inputError && "Поле не заполнено"}
							value={email}
							label='Логин'
							placeholder='Логин'
							onChange={(e) => setEmail(e.target.value)}
							size='small'
							sx={{ marginY: 1 }}
						/>
						<TextField
							fullWidth
							type='password'
							required
							error={password === "" && inputError}
							helperText={password === "" && inputError && "Поле не заполнено"}
							value={password}
							label='Пароль'
							placeholder='Пароль'
							onChange={(e) => setPassword(e.target.value)}
							size='small'
							sx={{ marginY: 1 }}
						/>
						<Box sx={{ display: "flex", justifyContent: "center" }}>{isLoading && <SmallPreloader />}</Box>

						{loginError && loginError == "EMAIL_EXISTS" ? (
							<Box>
								<Typography sx={{ color: "error.main", mb: 2 }}>Этот эл. адрес уже занят</Typography>
							</Box>
						) : (
							<Box>
								<Typography sx={{ color: "error.main", mb: 2 }}>{loginError}</Typography>
							</Box>
						)}

						<Button variant='contained' sx={{ width: "100%" }} onClick={getRegister}>
							Зарегистрироваться
						</Button>
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
