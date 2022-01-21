import { Box } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { FormField } from "../../../styledComponents/ProfileComponents";
function FormSkillsLine({ control, name, label, ...props }) {
	return (
		<Box
			sx={{
				position: "relative",
				flexGrow: 1,
				marginBottom: 2,
			}}>
			<Controller
				name={`${name}`}
				control={control}
				rules={{ required: true }}
				render={({ field: { onChange, onBlur, name, value, ref } }) => (
					<FormField
						onChange={onChange}
						onBlur={onBlur}
						selected={value}
						inputRef={ref}
						id={name}
						label={label}
						value={value}
						{...props}
					/>
				)}
			/>
			{/*<SendButton onClick={handleSubmit(onSubmit)} />*/}
		</Box>
	);
}

export default FormSkillsLine;
