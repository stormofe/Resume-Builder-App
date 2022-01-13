import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button, ButtonGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FormMainInfoLine from "./FormMain/FormMainInfoLine";
import DatePicker from "react-datepicker";
import AddedObj from "./FormEducation/AddedObj";
import SmallPreloader from "../UI/SmallPreloader";
function FormCustom(props) {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const loading = useSelector((state) => state.forms.loading.custom);
	useEffect(() => {
		setIsLoading(loading);
	}, [loading]);
	const custom = props.custom;
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
		if (obj.length !== 0) {
			dispatch({ type: "SAVE_CUST_BLOCK", payload: obj });
			setObj([]);
		}
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
		setDateStart(null);
		setDateEnd(null);
	};
	const deleteCustomBlock = (index) => {
		const newCustomBlock = obj.filter((item, i) => (i !== index ? item : false));
		setObj(newCustomBlock);
	};

	const deleteCustomBlockFromDB = (index) => {
		const newCustomBlocks = custom.filter((item, i) => (i !== index ? item : false));
		dispatch({ type: "DELETE_CUST_BLOCK", payload: newCustomBlocks });
	};

	return (
		<Box>
			<Box
				component='form'
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit(addObj)}
				sx={{ maxWidth: "600px", marginX: "auto" }}>
				<FormMainInfoLine candelete='' control={control} name='profession' label='Заголовок' check={null} />
				<FormMainInfoLine candelete='' control={control} name='where' label='Место' check={null} />
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
			<AddedObj arr={custom} bgColor='primary.main' handleDelete={deleteCustomBlockFromDB} />
			<AddedObj arr={obj} bgColor='grey.400' handleDelete={deleteCustomBlock} />
		</Box>
	);
}

export default FormCustom;
