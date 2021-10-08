import React, { useContext } from "react";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../firebase";
import { useForm } from "react-hook-form";
import { AuthContext } from "../auth/Auth";

function Skills() {
	const { currentUser } = useContext(AuthContext);
	const user = doc(db, "user", `${currentUser.email}`);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => await updateDoc(user, data);

	return (
		<div className='about'>
			<form onSubmit={handleSubmit(onSubmit)} className='about__form'>
				<div className='about__form-line'>
					<label>1 :</label>
					<input {...register("skil")} type='text' />
				</div>
				<div className='about__form-line'>
					<label>2 : </label>
					<input {...register("skil2")} type='text' />
				</div>
				<div className='about__form-line'>
					<label>3 :</label>
					<input {...register("skil3")} type='phone' />
				</div>

				<button>Сохранить</button>
			</form>
		</div>
	);
}

export default Skills;
