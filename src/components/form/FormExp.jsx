import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, ButtonGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import FormMainInfoLine from "./FormMain/FormMainInfoLine";
import DatePicker from "react-datepicker";
import AddedObj from "./FormEducation/AddedObj";
function FormExp(props) {
	const dispatch = useDispatch();
	const exp = props.exp;
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
	const [dateEnd, setDateEnd] = useState(null);
	const [dateStart, setDateStart] = useState(null);
	const [obj, setObj] = useState([]);

	const saveData = () => {
		console.log(obj);
		dispatch({ type: "SAVE_EXP", payload: obj });
		setObj([]);
	};
	const addObj = (data) => {
		const obj = {
			...data.mainInfo,
			dateEnd: dateEnd ? `${dateEnd.getMonth() + 1}/${dateEnd.getFullYear()}` : "",
			dateStart: dateStart ? `${dateStart.getMonth() + 1}/${dateStart.getFullYear()}` : "",
		};
		setObj((old) => [...old, obj]);
		setValue("mainInfo", {
			where: "",
			profession: "",
			description: "",
		});
		setDateEnd(null);
	};
	const deleteExp = (index) => {
		const newExp = obj.filter((item, i) => (i !== index ? item : false));
		setObj(newExp);
	};

	const deleteExpFromDB = (index) => {
		const newExp = exp.filter((item, i) => (i !== index ? item : false));
		dispatch({ type: "DELETE_EXP", payload: newExp });
	};

	return (
		<Box>
			<Box
				component='form'
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit(addObj)}
				sx={{ maxWidth: "600px", marginX: "auto" }}>
				<FormMainInfoLine candelete='' control={control} name='profession' label='Должность' check={null} />
				<FormMainInfoLine candelete='' control={control} name='where' label='Место работы' check={null} />
				<DatePicker
					dateFormat='MM/yyyy'
					showMonthYearPicker
					placeholderText='Выберите дату начала'
					selected={dateStart}
					onChange={(date) => setDateStart(date)}
				/>
				<DatePicker
					dateFormat='MM/yyyy'
					showMonthYearPicker
					placeholderText='Выберите дату окончания'
					selected={dateEnd}
					onChange={(date) => setDateEnd(date)}
				/>
				<FormMainInfoLine candelete='' control={control} name='description' label='Обязанности' check={null} />
				<ButtonGroup variant='contained' aria-label='outlined primary button group'>
					<Button type='submit' variant='contained' disabled={!isDirty || !isValid}>
						Добавить опыт
					</Button>
					<Button variant='contained' disabled={!isDirty || !isValid || !obj} onClick={saveData}>
						Сохранить
					</Button>
				</ButtonGroup>
			</Box>
			<AddedObj arr={exp} bgColor='primary.main' handleDelete={deleteExpFromDB} />
			<AddedObj arr={obj} bgColor='grey.400' handleDelete={deleteExp} />
		</Box>
	);
}

export default FormExp;
