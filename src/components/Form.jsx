import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid, Button, Typography } from "@mui/material";
import { FormBlock, FormField, SendButton } from "../styledComponents/ProfileComponents";
import { Box } from "@mui/system";
function Form(props) {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			position: "",
			phone: "",
			about: "",
			area: "",
			email: "",
			hobbies: "",
		},
	});

	const onSubmit = (data) => console.log(data);
	return (
		<Grid item {...props}>
			<FormBlock>
				<Box
					component='form'
					noValidate
					autoComplete='off'
					onSubmit={handleSubmit(onSubmit)}
					sx={{ maxWidth: "600px", marginX: "auto" }}>
					<Typography variant='h5' color='primary' mb={2}>
						Заполните поля резюме
					</Typography>
					{/*
					<Controller
						name='email'
						control={control}
						render={({ field }) => <FormField {...field} id='email' label='Email' />}
					/>
					<Controller
						name='phone'
						control={control}
						render={({ field }) => <FormField {...field} id='phone' label='Телефон' type='number' />}
					/>
					<Controller
						name='about'
						control={control}
						render={({ field }) => <FormField {...field} id='about' label='Расскажите о себе' multiline rows={4} />}
					/>
					<Controller
						name='area'
						control={control}
						render={({ field }) => <FormField {...field} id='area' label='Ваша страна, город' />}
					/>
					<Controller
						name='hobbies'
						control={control}
						render={({ field, ref }) => <FormField {...field} id='hobbies' label='Ваше хобби' inputRef={ref}/>}
					/>*/}
					<Box sx={{ position: "relative" }}>
						<Controller
							name='firstName'
							control={control}
							render={({ field: { onChange, onBlur, value, ref } }) => (
								<FormField
									onChange={onChange}
									onBlur={onBlur}
									selected={value}
									inputRef={ref}
									id='firstName'
									label='Имя'
								/>
							)}
						/>
						<SendButton onClick={handleSubmit(onSubmit)} />
					</Box>
					<Box sx={{ position: "relative" }}>
						<Controller
							name='lastName'
							control={control}
							render={({ field: { onChange, onBlur, value, ref } }) => (
								<FormField
									onChange={onChange}
									onBlur={onBlur}
									selected={value}
									inputRef={ref}
									id='lastName'
									label='Фамилия'
								/>
							)}
						/>
						<SendButton onClick={handleSubmit(onSubmit)} />
					</Box>
					<Box sx={{ position: "relative" }}>
						<Controller
							name='position'
							control={control}
							render={({ field: { onChange, onBlur, value, ref } }) => (
								<FormField
									onChange={onChange}
									onBlur={onBlur}
									selected={value}
									inputRef={ref}
									id='position'
									label='Профессия'
								/>
							)}
						/>
						<SendButton onClick={handleSubmit(onSubmit)} />
					</Box>
					<Box sx={{ position: "relative" }}>
						<Controller
							name='hobbies'
							control={control}
							render={({ field: { onChange, onBlur, value, ref } }) => (
								<FormField
									onChange={onChange}
									onBlur={onBlur}
									selected={value}
									inputRef={ref}
									id='hobbies'
									label='Ваше хобби'
								/>
							)}
						/>
						<SendButton onClick={handleSubmit(onSubmit)} />
					</Box>

					<Button type='submit' variant='contained'>
						Сохранить
					</Button>
				</Box>
			</FormBlock>
		</Grid>
	);
}

export default Form;
