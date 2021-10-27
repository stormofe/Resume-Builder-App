import React from "react";
import { useForm } from "react-hook-form";

function FormLine({ classname, labelFor, inputName, registerName, inputType }) {
	const { register } = useForm();

	return (
		<div className={classname}>
			<label htmlFor={labelFor}>{inputName}</label>
			<input {...register(registerName)} type={inputType} />
		</div>
	);
}

export default FormLine;
