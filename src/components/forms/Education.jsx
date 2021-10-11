import { doc } from "@firebase/firestore";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../firebase";
import { AuthContext } from "../auth/Auth";

function Education() {
	const { currentUser } = useContext(AuthContext);
	const user = doc(db, "user", `${currentUser.email}`);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setValue,
	} = useForm();
	return (
		<div className='edu'>
			<h3>Ваше образование, курсы, сертификаты:</h3>
			<div className='edu__form'>
				<label htmlFor='where'>Место</label>
				<input type='text' {...register("where")} />
				<label htmlFor='where'>На кого:</label>
				<input type='text' {...register("profession")} />
				<label htmlFor='where'>Дата окончания:</label>
				<input type='date' {...register("data")} />
				<label htmlFor='where'>Описание:</label>
				<input type='text' {...register("description")} />
			</div>
		</div>
	);
}

export default Education;
