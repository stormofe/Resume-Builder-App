import React, { useRef, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Grid, Button, Typography, ButtonGroup } from "@mui/material";
import { FormBlock, FormField, SendButton } from "../styledComponents/ProfileComponents";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import DoneIcon from "@mui/icons-material/Done";

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	"&:not(:last-child)": {
		borderBottom: 0,
	},
	"&:before": {
		display: "none",
	},
}));

const AccordionSummary = styled((props) => (
	<MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
	flexDirection: "row-reverse",
	"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
		transform: "rotate(90deg)",
	},
	"& .MuiAccordionSummary-content": {
		marginLeft: theme.spacing(1),
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function Form(props) {
	const dispatch = useDispatch();
	const { control, handleSubmit, setValue, formState } = useForm({
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
	const { isDirty, isValid } = formState;
	const formFields = ["firstName", "lastName", "position", "phone"];
	const photoInp = useRef(null);
	const [photo, setPhoto] = useState(null);

	const onSubmit = (data, event) => {
		dispatch({ type: "SAVE_MAIN_INFO", payload: data });
		event.target.reset();
		//setValue("firstName", "", { shouldDirty: true });
		//formFields.map((item) => setValue(item, ""));
	};

	const [expanded, setExpanded] = React.useState("panel1");

	const handleChangeAccord = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
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
	return (
		<Grid item {...props}>
			<Typography variant='h5' color='primary' mb={2}>
				Заполните поля резюме
			</Typography>
			<Accordion expanded={expanded === "panel1"} onChange={handleChangeAccord("panel1")} sx={{ marginRight: 2 }}>
				<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
					<Typography>Основная информация</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Box mb={1}>
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
								<PhotoCamera fontSize='large' />
							</IconButton>
						</label>
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
											<DoneIcon />
										</IconButton>
										<IconButton aria-label='delete' color='error' size='small' onClick={deletePhoto}>
											<DeleteIcon />
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

					<FormBlock>
						<Box
							component='form'
							noValidate
							autoComplete='off'
							onSubmit={handleSubmit(onSubmit)}
							sx={{ maxWidth: "600px", marginX: "auto" }}>
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
									name='email'
									control={control}
									render={({ field: { onChange, onBlur, value, ref } }) => (
										<FormField
											onChange={onChange}
											onBlur={onBlur}
											selected={value}
											inputRef={ref}
											id='email'
											label='E-mail'
										/>
									)}
								/>
								<SendButton onClick={handleSubmit(onSubmit)} />
							</Box>
							<Box sx={{ position: "relative" }}>
								<Controller
									name='phone'
									control={control}
									render={({ field: { onChange, onBlur, value, ref } }) => (
										<FormField
											onChange={onChange}
											onBlur={onBlur}
											selected={value}
											inputRef={ref}
											id='phone'
											label='Номер телефона'
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
									name='area'
									control={control}
									render={({ field: { onChange, onBlur, value, ref } }) => (
										<FormField
											onChange={onChange}
											onBlur={onBlur}
											selected={value}
											inputRef={ref}
											id='area'
											label='Страна / область / город  проживания'
										/>
									)}
								/>
								<SendButton onClick={handleSubmit(onSubmit)} />
							</Box>
							<Box sx={{ position: "relative" }}>
								<Controller
									name='about'
									control={control}
									render={({ field: { onChange, onBlur, value, ref } }) => (
										<FormField
											onChange={onChange}
											onBlur={onBlur}
											selected={value}
											inputRef={ref}
											id='about'
											label='Расскажите о себе'
											rows={2}
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
											label='Ваши хобби'
										/>
									)}
								/>
								<SendButton onClick={handleSubmit(onSubmit)} />
							</Box>

							<Button type='submit' variant='contained' disabled={!isDirty || !isValid}>
								Сохранить
							</Button>
						</Box>
					</FormBlock>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === "panel2"} onChange={handleChangeAccord("panel2")}>
				<AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
					<Typography>Collapsible Group Item #2</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
						leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
						sit amet blandit leo lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === "panel3"} onChange={handleChangeAccord("panel3")}>
				<AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
					<Typography>Collapsible Group Item #3</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
						leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
						sit amet blandit leo lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</Grid>
	);
}

export default Form;
