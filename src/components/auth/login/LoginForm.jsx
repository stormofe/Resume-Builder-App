import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import SmallPreloader from "../../UI/SmallPreloader";

const schema = yup
	.object({
		email: yup
			.string()
			.email('Email должен быть валидным и содержать "@" ')
			.required("Обязательное поле")
			.matches(/[a-zA-Z]/, "Email должен содержать только латинские буквы и римские цифры"),
		password: yup.string().required("Обязательное поле").min(6, "Минимальная длина пароля 6 символов"),
		//.matches(/[a-zA-Z]/, "Пароль должен содержать только латинские буквы"),
	})
	.required();

function LoginForm({
	loading = false,
	loginError,
	currentUser,
	getLogOut,
	auth,
	getLogin = false,
	getRegister = false,
}) {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const [login, setLogin] = useState(false);
	const [registration, setRegistration] = useState(false);
	const onSubmit = ({ email, password }) => {
		if (login) {
			auth(email, password);
			setLogin(false);
		}
		if (registration) {
			auth(email, password);
			setRegistration(false);
		}
		setValue("email", "");
		setValue("password", "");
	};
	return (
		<Box component='form' noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name='email'
				control={control}
				render={({ field }) => (
					<TextField
						fullWidth
						required
						error={Boolean(errors.email?.message)}
						helperText={errors.email?.message}
						size='small'
						sx={{ marginY: 1 }}
						label='Email'
						placeholder='Email'
						{...field}
					/>
				)}
			/>
			<Controller
				name='password'
				control={control}
				render={({ field }) => (
					<TextField
						fullWidth
						required
						type='password'
						error={Boolean(errors.password?.message)}
						helperText={errors.password?.message}
						size='small'
						sx={{ marginY: 1 }}
						label='Пароль'
						placeholder='Пароль'
						{...field}
					/>
				)}
			/>
			{getLogin && currentUser && (
				<Button variant='contained' sx={{ width: "100%" }} onClick={getLogOut}>
					Выйти
				</Button>
			)}
			{getLogin && !currentUser && (
				<Button type='submit' onClick={() => setLogin(true)} variant='contained' sx={{ width: "100%" }}>
					Войти
				</Button>
			)}
			{getRegister && (
				<Button type='submit' variant='contained' sx={{ width: "100%" }} onClick={() => setRegistration(true)}>
					Зарегистрироваться
				</Button>
			)}
			<Box sx={{ display: "flex", justifyContent: "center" }}>{loading && <SmallPreloader />}</Box>
			{(loginError && loginError === "EMAIL_EXISTS") ||
			(loginError && loginError === "Firebase: Error (auth/email-already-in-use).") ? (
				<Box>
					<Typography sx={{ color: "error.main", mb: 2 }}>Этот email адрес уже занят</Typography>
				</Box>
			) : (
				<Box>
					<Typography sx={{ color: "error.main", mb: 2 }}>{loginError}</Typography>
				</Box>
			)}
		</Box>
	);
}

export default LoginForm;
