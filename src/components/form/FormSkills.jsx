import React, { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Rating, Tooltip } from "@mui/material";
import { FormBlock } from "../../styledComponents/ProfileComponents";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormSkillsLine from "./FormSkills/FormSkillsLine";
import AddedSkillsBlock from "./FormSkills/AddedSkillsBlock";

function FormSkills() {
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

	const skillsFromState = useSelector((state) => state.forms.skills);

	useEffect(() => {
		dispatch({ type: "FETCH_SKILLS" });
	}, []);

	useEffect(() => {
		setGettingSkills(skillsFromState);
	}, [skillsFromState]);
	useEffect(() => {}, [skills]);

	const addSkill = async (data) => {
		const skill = [data.skill, ratingValue];
		await setSkills((old) => [...old, skill]);
		setValue("skill", "");
	};

	const saveSkills = () => {
		dispatch({ type: "SAVE_SKILLS", payload: skills });
		setSkills([]);
	};

	const deleteSkillFromState = (skillIndex) => {
		const arr = skills.filter((skill, index) => (index !== skillIndex ? skill : false));
		setSkills(arr);
	};

	const deleteSkillFromDB = (index) => {
		const newSkills = gettingSkills.filter((skill, i) => (i !== index ? skill : false));
		dispatch({ type: "DELETE_SKILL", payload: newSkills });
	};

	const [ratingValue, setRatingValue] = useState(0);
	return (
		<FormBlock>
			<AddedSkillsBlock skills={gettingSkills} deleteSkill={deleteSkillFromDB} color='primary.main' />
			<AddedSkillsBlock skills={skills} deleteSkill={deleteSkillFromState} color='grey.400' />

			<Box
				component='form'
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit(addSkill)}
				sx={{ maxWidth: "600px", marginX: "auto" }}>
				<Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
					<FormSkillsLine control={control} name='skill' label='Введите навык' />
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
		</FormBlock>
	);
}

export default FormSkills;
