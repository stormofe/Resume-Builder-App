import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import profile from "./../assets/images/profile.jpg";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import FmdBadIcon from "@mui/icons-material/FmdBad";
function StartPage() {
	return (
		<Paper sx={{ maxWidth: "1200px", width: "100%", marginX: "auto", paddingY: 3 }}>
			<Box sx={{ paddingX: 3 }}>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<Typography variant='h5' sx={{ textAlign: "center", color: "primary.main", fontWeight: "700" }}>
							Привет! <br /> Это приложение разработано для создания твоего идеального резюме. <br /> Давай проведу для
							тебя экскурсию
						</Typography>
					</Grid>

					<Grid item xs={12} md={3}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<LooksOneIcon color='error' />
								<Typography>Это профиль, где</Typography>
							</Grid>
							<Grid item xs={12}>
								<LooksTwoIcon color='error' />
								<Typography> можешь выбрать и заполнить любой понравившийся шаблон.</Typography>
							</Grid>
							<Grid item xs={12}>
								<Looks3Icon color='error' />
								<Typography>
									Здесь предстоит ввести и сохранить необходимые данные. Не забудь пройтись по каждой вкладке.
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Looks4Icon color='error' />
								<Typography>Нажав на эту кнопку сохранишь получившееся резюме себе в формате PDF.</Typography>
							</Grid>
							<Grid item xs={12}>
								<FmdBadIcon color='error' />
								<Typography variant='body2'>
									Не забудь побаловаться с настройками отображения, чтобы шаблон выглядел красиво в формате А4
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} md={9}>
						<Box sx={{ maxWidth: "100%" }}>
							<img
								src={profile}
								alt='screen profile page'
								style={{ objectFit: "contain", width: "100%", height: "100%" }}
							/>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
}

export default StartPage;
