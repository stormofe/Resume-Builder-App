import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, ButtonGroup, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import WarningIcon from "./../../UI/WarningIcon";
import GreenCheckIcon from "./../../UI/GreenCheckIcon";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import SmallPreloader from "../../UI/SmallPreloader";
function PhotoBlock({ photoURL }) {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const loading = useSelector((state) => state.forms.loading.photo);
	useEffect(() => {
		setIsLoading(loading);
	}, [loading]);

	const photoInp = useRef(null);
	const [photo, setPhoto] = useState(null);
	const deletePhoto = () => {
		setPhoto(null);
		photoInp.current.value = "";
	};
	const savePhoto = (e) => {
		e.preventDefault();
		dispatch({ type: "SAVE_PHOTO", payload: photo });
		deletePhoto();
	};
	return (
		<Box mb={1} sx={{ position: "relative" }}>
			<Typography variant='body1' color='primary' mb={1}>
				Выберите фото (до 1MB)
			</Typography>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<label htmlFor='icon-button-file'>
					<input
						accept='image/*'
						id='icon-button-file'
						type='file'
						style={{ display: "none" }}
						ref={photoInp}
						onChange={(e) => setPhoto(e.target.files[0])}
					/>
					<IconButton color='primary' aria-label='upload picture' component='span'>
						<Tooltip title='Добавить фото' arrow>
							<PhotoCamera fontSize='large' />
						</Tooltip>
					</IconButton>
				</label>
				{isLoading && <SmallPreloader />}
			</Box>

			{photoURL === "" || photoURL === null ? <WarningIcon /> : <GreenCheckIcon />}

			{photo ? (
				<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
					<Box sx={{ maxWidth: "200px", maxHeight: "300px", position: "relative" }}>
						<img
							src={photo ? URL.createObjectURL(photo) : null}
							alt=''
							style={{ width: "100%", height: "100%", objectFit: "cover" }}
						/>
						<ButtonGroup
							orientation='vertical'
							aria-label='vertical outlined button group'
							sx={{ position: "absolute", top: 0, right: 0, backgroundColor: "rgba(255, 255, 255, .2)" }}
							variant='contained'>
							<IconButton aria-label='add' color='success' size='small' onClick={savePhoto}>
								<Tooltip title='Сохранить' arrow>
									<DoneIcon />
								</Tooltip>
							</IconButton>
							<IconButton aria-label='delete' color='error' size='small' onClick={deletePhoto}>
								<Tooltip title='Отмена' arrow>
									<DeleteIcon />
								</Tooltip>
							</IconButton>
						</ButtonGroup>
					</Box>
					<Box>
						<Typography>
							Выбран файл: <br /> {photo.name}
						</Typography>
					</Box>
				</Box>
			) : (
				""
			)}
		</Box>
	);
}

export default PhotoBlock;
