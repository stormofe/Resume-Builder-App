import React, { useRef, useState } from "react";
import { Box } from "@mui/system";
import { Button, Typography, ButtonGroup, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import WarningIcon from "../UI/WarningIcon";
import GreenCheckIcon from "../UI/GreenCheckIcon";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import FormMainInfoLine from "./FormMain/FormMainInfoLine";
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
	const photoInp = useRef(null);
	const [photo, setPhoto] = useState(null);

	const onSubmit = (data, event) => {
		const info = { ...data.mainInfo };
		console.log(info);
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
		dispatch({ type: "SAVE_MAIN_INFO", payload: info });
	};

	const deletePhoto = () => {
		setPhoto(null);
		photoInp.current.value = "";
	};
	const savePhoto = (e) => {
		e.preventDefault();
		dispatch({ type: "SAVE_PHOTO", payload: photo });
		//setPhoto(null);
		deletePhoto();
	};

	const fullUserInfo = props.userInfo;
	const { firstName, lastName, position, phone, about, area, email, hobbies, photoURL } = fullUserInfo;

	return (
		<div>
			<Box mb={1} sx={{ position: "relative" }}>
				<Typography variant='body1' color='primary' mb={1}>
					Выберите фото
				</Typography>

				<label htmlFor='icon-button-file'>
					<input
						accept='image/*'
						id='icon-button-file'
						type='file'
						style={{ display: "none" }}
						ref={photoInp}
						onChange={(e) => setPhoto(e.target.files[0])}
					/>
					<IconButton color='primary' aria-label='upload picture' component='span'>
						<Tooltip title='Добавить фото' arrow>
							<PhotoCamera fontSize='large' />
						</Tooltip>
					</IconButton>
				</label>
				{photoURL === "" && photoURL === undefined ? <WarningIcon /> : <GreenCheckIcon />}

				{photo ? (
					<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
						<Box sx={{ maxWidth: "200px", maxHeight: "300px", position: "relative" }}>
							<img
								src={photo ? URL.createObjectURL(photo) : null}
								alt=''
								style={{ width: "100%", height: "100%", objectFit: "cover" }}
							/>
							<ButtonGroup
								orientation='vertical'
								aria-label='vertical outlined button group'
								sx={{ position: "absolute", top: 0, right: 0, backgroundColor: "rgba(255, 255, 255, .2)" }}
								variant='contained'>
								<IconButton aria-label='add' color='success' size='small' onClick={savePhoto}>
									<Tooltip title='Сохранить' arrow>
										<DoneIcon />
									</Tooltip>
								</IconButton>
								<IconButton aria-label='delete' color='error' size='small' onClick={deletePhoto}>
									<Tooltip title='Отмена' arrow>
										<DeleteIcon />
									</Tooltip>
								</IconButton>
							</ButtonGroup>
						</Box>
						<Box>
							<Typography>
								Выбран файл: <br /> {photo.name}
							</Typography>
						</Box>
					</Box>
				) : (
					""
				)}
			</Box>

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
		</div>
	);
}

export default FormMainInfo;
