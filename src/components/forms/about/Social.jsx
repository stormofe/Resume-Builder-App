import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Social() {
	const { register, handleSubmit, setValue } = useForm();

	const [socials, setSocials] = useState([]);
	const [gettingSocials, setGettingSocials] = useState([]);

	const socialsFromState = useSelector((state) => state.forms.socials);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: "FETCH_SOCIALS" });
	}, []);

	useEffect(() => {
		setGettingSocials(socialsFromState);
	}, [socialsFromState]);

	const addSocial = async (data) => {
		const soc = [data.social];
		await setSocials((old) => [...old, soc]);
		setValue("social", "");
	};

	const saveSocials = () => {
		dispatch({ type: "SAVE_SOCIALS", payload: socials });
		setSocials([]);
	};

	const deleteSocialFromState = (socIndex) => {
		const arr = socials.filter((soc, index) => (index !== socIndex ? soc : false));
		setSocials(arr);
	};

	const deleteSocialFromDB = (index) => {
		const newSocials = gettingSocials.filter((soc, i) => (i !== index ? soc : false));
		dispatch({ type: "DELETE_SOCIAL", payload: newSocials });
	};

	return (
		<>
			<div className='skills'>
				{gettingSocials.length !== 0 ? (
					<>
						<h3>Ваши социальные сети:</h3>
						<div className='skills__map'>
							{gettingSocials
								? gettingSocials.map((soc, index) => (
										<p className='skills__item' key={index}>
											{soc}
											<button onClick={() => deleteSocialFromDB(index)}>x</button>
										</p>
								  ))
								: ""}
						</div>
					</>
				) : (
					""
				)}

				<h3>Добавьте социальные сети: </h3>

				<div className='skills__list'>
					{socials
						? socials.map((soc, index) => (
								<p className='skills__list-item' key={index}>
									{soc}
									<button onClick={() => deleteSocialFromState(index)}>x</button>
								</p>
						  ))
						: ""}
				</div>
				<form onSubmit={handleSubmit(addSocial)} className='skills__form'>
					<div className='skills__form-line'>
						<input type='text' placeholder='Введите ссылку' {...register("social", { required: true, minLength: 2 })} />
					</div>

					<button>Добавить</button>
					<button className='skills__form-save' onClick={saveSocials}>
						Сохранить
					</button>
				</form>
			</div>
		</>
	);
}

export default Social;
