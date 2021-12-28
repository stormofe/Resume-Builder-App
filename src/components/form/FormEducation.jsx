import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, Typography, ButtonGroup, Tooltip, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import FormMainInfoLine from "./FormMain/FormMainInfoLine";
import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from "uuid";
function FormEducation(props) {
	const dispatch = useDispatch();
	const education = props.education;
	const { control, handleSubmit, setValue, formState } = useForm({
		mode: "onChange",
		defaultValues: {
			mainInfo: {
				where: "",
				profession: "",
				description: "",
			},
		},
	});
	const { isDirty, isValid } = formState;
	const [obj, setObj] = useState([]);
	const [dateEnd, setDateEnd] = useState(null);

	const saveData = () => {
		console.log(obj);
		//dispatch({ type: "SAVE_EDU", payload: obj });
	};
	const addObj = (data) => {
		const obj = {
			...data.mainInfo,
			date: dateEnd ? `${dateEnd.getMonth() + 1}/${dateEnd.getFullYear()}` : "",
		};
		setObj((old) => [...old, obj]);
		setValue("mainInfo", {
			where: "",
			profession: "",
			description: "",
		});
		setDateEnd(null);
	};

	return (
		<Box>
			<Box
				component='form'
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit(addObj)}
				sx={{ maxWidth: "600px", marginX: "auto" }}>
				<FormMainInfoLine candelete='' control={control} name='profession' label='Профессия' check={null} />
				<FormMainInfoLine
					candelete=''
					control={control}
					name='where'
					label='Учебное заведение / место обучения'
					check={null}
				/>
				<DatePicker
					dateFormat='MM/yyyy'
					showMonthYearPicker
					placeholderText='Выберите дату окончания'
					selected={dateEnd}
					onChange={(date) => setDateEnd(date)}
				/>
				<FormMainInfoLine candelete='' control={control} name='description' label='Описание' check={null} />
				<ButtonGroup variant='contained' aria-label='outlined primary button group'>
					<Button type='submit' variant='contained' disabled={!isDirty || !isValid}>
						Добавить образование
					</Button>
					<Button variant='contained' disabled={!isDirty || !isValid || !obj} onClick={saveData}>
						Сохранить
					</Button>
				</ButtonGroup>
			</Box>
			{education
				? education.map((item) => (
						<Paper key={uuidv4()} elevation={2} sx={{ p: 2, mt: 1, backgroundColor: "primary.main", color: "white" }}>
							<Typography>{item.profession}</Typography>
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Typography variant='caption'>{item.where}</Typography>
								<Typography variant='caption'>{item.date}</Typography>
							</Box>

							<Typography variant='body2'>{item.description}</Typography>
						</Paper>
				  ))
				: ""}
			{obj
				? obj.map((item) => (
						<Paper key={uuidv4()} elevation={2} sx={{ p: 2, mt: 1, backgroundColor: "grey.400", color: "white" }}>
							<Typography>{item.profession}</Typography>
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Typography variant='caption'>{item.where}</Typography>
								<Typography variant='caption'>{item.date}</Typography>
							</Box>

							<Typography variant='body2'>{item.description}</Typography>
						</Paper>
				  ))
				: ""}
		</Box>
	);
}

export default FormEducation;