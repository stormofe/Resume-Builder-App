import { doc, updateDoc } from "@firebase/firestore";
import React, { useContext } from "react";
import { db } from "../../firebase";
import { useForm } from "react-hook-form";
import { AuthContext } from "../auth/Auth";
import FormLine from "./about/FormLine";

function About() {
	const { register, handleSubmit } = useForm();

	const { currentUser } = useContext(AuthContext);
	const user = doc(db, "user", `${currentUser.email}`);

	const onSubmit = async (data) => await updateDoc(user, data);

	return (
		<div className='about'>
			<h3>Личная информация: </h3>
			<form onSubmit={handleSubmit(onSubmit)} className='about__form'>
				<FormLine
					classname={"about__form-line"}
					labelFor={"position"}
					inputName={"Должность :"}
					registerName={"position"}
					inputType={"text"}
				/>{" "}
				<FormLine
					classname={"about__form-line"}
					labelFor={"position"}
					inputName={"Должность :"}
					registerName={"position"}
					inputType={"text"}
				/>{" "}
				<FormLine
					classname={"about__form-line"}
					labelFor={"position"}
					inputName={"Должность :"}
					registerName={"position"}
					inputType={"text"}
				/>{" "}
				<FormLine
					classname={"about__form-line"}
					labelFor={"position"}
					inputName={"Должность :"}
					registerName={"position"}
					inputType={"text"}
				/>
				<button>Сохранить</button>
			</form>
		</div>
	);
}

export default About;
