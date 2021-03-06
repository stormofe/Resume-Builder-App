import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Link, Paper, Tooltip } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import FormMainInfoLine from "./FormMainInfoLine";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import SmallPreloader from "../../../UI/SmallPreloader";
function SocialsBlock({ socials }) {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const loading = useSelector((state) => state.forms.loading.socials);
	useEffect(() => {
		setIsLoading(loading);
	}, [loading]);
	const { control, handleSubmit, setValue, formState } = useForm({
		mode: "onChange",
		defaultValues: {
			mainInfo: {
				social: "",
			},
		},
	});
	const { isDirty, isValid } = formState;
	const onSubmit = (data) => {
		console.log(data.mainInfo.social);
		dispatch({ type: "SAVE_SOCIALS", payload: data.mainInfo.social });
		setValue("mainInfo", { social: "" });
	};
	const deleteSocialFromDB = (index) => {
		const newSocials = socials.filter((soc, i) => (i !== index ? soc : false));
		dispatch({ type: "DELETE_SOCIAL", payload: newSocials });
	};
	return (
		<Box sx={{ mt: 2 }}>
			{socials.length > 0
				? socials.map((item, index) => (
						<Paper
							key={uuidv4()}
							sx={{
								display: "inline-flex",
								alignItems: "center",
								backgroundColor: "primary.main",
								paddingX: "5px",
								paddingY: "3px",
								mr: 1,
								mb: 1,
								maxWidth: "200px",
							}}>
							<Tooltip title={item} arrow>
								<Link
									href={item}
									underline='hover'
									color='white'
									target='_blank'
									sx={{
										letterSpacing: 1.2,
										overflow: "hidden",
										maxWidth: "90px",
										whiteSpace: "nowrap",
										textOverflow: "ellipsis",
										mr: 1,
									}}>
									{item}
								</Link>
							</Tooltip>
							<IconButton
								aria-label='delete'
								size='small'
								sx={{ color: "white" }}
								onClick={() => deleteSocialFromDB(index)}>
								<ClearIcon fontSize='inherit' />
							</IconButton>
						</Paper>
				  ))
				: ""}
			<Box
				component='form'
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit(onSubmit)}
				sx={{ maxWidth: "600px", marginX: "auto", mt: 1 }}>
				<FormMainInfoLine
					control={control}
					name='social'
					label='?????????????? ???????????? ???? ??????????????'
					check={null}
					candelete={false}
				/>

				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<Button type='submit' variant='contained' disabled={!isDirty || !isValid}>
						??????????????????
					</Button>
					{isLoading && <SmallPreloader />}
				</Box>
			</Box>
		</Box>
	);
}

export default SocialsBlock;
