import { Box } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { FormField } from "../../../styledComponents/ProfileComponents";
import WarningIcon from "../../../UI/WarningIcon";
import GreenCheckIcon from "../../../UI/GreenCheckIcon";
import DeleteFromStateIcon from "../../../UI/DeleteFromStateIcon";
import { useDispatch } from "react-redux";
function FormMainInfoLine({ control, candelete, name, label, check, ...props }) {
	const dispatch = useDispatch();
	const deleteLine = () => {
		dispatch({ type: "DELETE_LINE", payload: name });
	};
	return (
		<Box
			sx={{
				position: "relative",
				marginBottom: 2,
			}}>
			<Controller
				name={`mainInfo.${name}`}
				control={control}
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
			{check ? <GreenCheckIcon /> : check !== null ? <WarningIcon /> : ""}
			{candelete ? <DeleteFromStateIcon onClick={deleteLine} /> : ""}
		</Box>
	);
}

export default FormMainInfoLine;
