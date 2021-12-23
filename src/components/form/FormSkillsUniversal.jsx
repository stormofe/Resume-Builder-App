import React, { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Rating, Tooltip, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormSkillsLine from "./FormSkills/FormSkillsLine";
import AddedSkillsBlock from "./FormSkills/AddedSkillsBlock";

function FormSkillsUniversal({ blockName, objName, inputName, fetchType, saveType, deleteType }) {
	const dispatch = useDispatch();
	const { control, handleSubmit, setValue, formState } = useForm({
		mode: "onChange",
		defaultValues: {
			skill: "",
		},
	});
	const { isDirty, isValid } = formState;
	const [skills, setSkills] = useState([]);
	const [gettingSkills, setGettingSkills] = useState([]);

	const skillsFromState = useSelector((state) => state.forms[objName]);

	useEffect(() => {
		dispatch({ type: fetchType });
	}, []);

	useEffect(() => {
		setGettingSkills(skillsFromState);
		console.log(skillsFromState);
	}, [skillsFromState]);
	useEffect(() => {}, [skills]);

	const addSkill = async (data) => {
		const skill = [data.skill, ratingValue];
		await setSkills((old) => [...old, skill]);
		setValue("skill", "");
	};

	const saveSkills = () => {
		dispatch({ type: saveType, payload: skills });
		setSkills([]);
	};

	const deleteSkillFromState = (skillIndex) => {
		const arr = skills.filter((skill, index) => (index !== skillIndex ? skill : false));
		setSkills(arr);
	};

	const deleteSkillFromDB = (index) => {
		const newSkills = gettingSkills.filter((skill, i) => (i !== index ? skill : false));
		dispatch({ type: deleteType, payload: newSkills });
	};

	const [ratingValue, setRatingValue] = useState(0);
	return (
		<Box sx={{ mb: 3 }}>
			<Typography variant='h6' sx={{ mb: 2, color: "primary.dark" }}>
				{blockName}
			</Typography>
			<AddedSkillsBlock skills={gettingSkills} deleteSkill={deleteSkillFromDB} color='primary.main' />
			<AddedSkillsBlock skills={skills} deleteSkill={deleteSkillFromState} color='grey.400' />

			<Box
				component='form'
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit(addSkill)}
				sx={{ maxWidth: "600px", marginX: "auto" }}>
				<Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
					<FormSkillsLine control={control} name={inputName} label='Введите навык' candelete='' />
					<Tooltip title='Оцените навык' arrow>
						<Rating
							sx={{ mb: 2, pl: 1 }}
							name='simple-controlled'
							value={ratingValue}
							onChange={(event, newValue) => {
								setRatingValue(newValue);
							}}
						/>
					</Tooltip>
				</Box>
				<ButtonGroup variant='contained' aria-label='outlined primary button group'>
					<Button type='submit' variant='contained' disabled={!isDirty || !isValid}>
						Добавить навык
					</Button>
					<Button variant='contained' disabled={!isDirty || !isValid || !skills} onClick={saveSkills}>
						Сохранить
					</Button>
				</ButtonGroup>
			</Box>
		</Box>
	);
}

export default FormSkillsUniversal;
