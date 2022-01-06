import React from "react";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import FormMainInfoLine from "./FormMain/FormMainInfoLine";
import PhotoBlock from "./FormMain/PhotoBlock";
import SocialsBlock from "./FormMain/SocialsBlock";

function FormMainInfo(props) {
	const dispatch = useDispatch();
	const { control, handleSubmit, setValue, formState } = useForm({
		mode: "onChange",
		defaultValues: {
			mainInfo: {
				firstName: "",
				lastName: "",
				position: "",
				phone: "",
				about: "",
				area: "",
				email: "",
				hobbies: "",
			},
		},
	});
	const { isDirty, isValid } = formState;

	const onSubmit = (data, event) => {
		const info = { ...data.mainInfo };
		const arrInfo = Object.entries(info);
		const filteredArrInfo = arrInfo.filter(([key, value]) => value !== "");
		const filteredObjInfo = Object.fromEntries(filteredArrInfo);
		dispatch({ type: "SAVE_MAIN_INFO", payload: filteredObjInfo });
		setValue("mainInfo", {
			firstName: "",
			lastName: "",
			position: "",
			phone: "",
			about: "",
			area: "",
			email: "",
			hobbies: "",
		});
	};

	const { firstName, lastName, position, phone, about, area, email, hobbies, photoURL } = props.mainInfo;

	return (
		<Box>
			<PhotoBlock photoURL={photoURL} />

			<Box
				component='form'
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit(onSubmit)}
				sx={{ maxWidth: "600px", marginX: "auto" }}>
				<FormMainInfoLine control={control} name='lastName' label='Фамилия' candelete check={lastName ? true : false} />
				<FormMainInfoLine control={control} name='firstName' label='Имя' candelete check={firstName ? true : false} />
				<FormMainInfoLine control={control} name='email' label='E-mail' candelete check={email ? true : false} />
				<FormMainInfoLine
					control={control}
					name='phone'
					label='Номер телефона'
					candelete
					check={phone ? true : false}
				/>
				<FormMainInfoLine
					control={control}
					name='position'
					label='Профессия'
					candelete
					check={position ? true : false}
				/>
				<FormMainInfoLine
					control={control}
					name='area'
					label='Страна / область / город  проживания'
					check={area ? true : false}
					candelete
				/>
				<FormMainInfoLine
					control={control}
					name='about'
					label='Расскажите о себе'
					rows={2}
					check={about ? true : false}
					candelete
				/>
				<FormMainInfoLine
					control={control}
					name='hobbies'
					label='Ваши хобби'
					candelete
					check={hobbies ? true : false}
				/>
				<Button type='submit' variant='contained' disabled={!isDirty || !isValid}>
					Сохранить
				</Button>
			</Box>
			<Typography sx={{ mt: 2, color: "primary.main" }}>Ваши соцсети</Typography>
			<SocialsBlock socials={props.socials} />
		</Box>
	);
}

export default FormMainInfo;
