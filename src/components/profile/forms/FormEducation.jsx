import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button, ButtonGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FormMainInfoLine from "./FormMain/FormMainInfoLine";
import DatePicker from "react-datepicker";
import AddedObj from "./FormEducation/AddedObj";
import SmallPreloader from "../../UI/SmallPreloader";
function FormEducation(props) {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const loading = useSelector((state) => state.forms.loading.edu);
	useEffect(() => {
		setIsLoading(loading);
	}, [loading]);
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
		if (obj.length !== 0) {
			dispatch({ type: "SAVE_EDU", payload: obj });
			setObj([]);
		}
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
	const deleteEdu = (index) => {
		const newEdu = obj.filter((item, i) => (i !== index ? item : false));
		setObj(newEdu);
	};

	const deleteEduFromDB = (index) => {
		const newEdu = education.filter((item, i) => (i !== index ? item : false));
		dispatch({ type: "DELETE_EDU", payload: newEdu });
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

				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<ButtonGroup variant='contained' aria-label='outlined primary button group'>
						<Button type='submit' variant='contained' disabled={!isDirty || !isValid}>
							Добавить образование
						</Button>
						<Button variant='contained' disabled={!isDirty || !isValid || obj.length === 0} onClick={saveData}>
							Сохранить
						</Button>
					</ButtonGroup>
					{isLoading && <SmallPreloader />}
				</Box>
			</Box>
			<AddedObj arr={education} bgColor='primary.main' handleDelete={deleteEduFromDB} />
			<AddedObj arr={obj} bgColor='grey.400' handleDelete={deleteEdu} />
		</Box>
	);
}

export default FormEducation;
