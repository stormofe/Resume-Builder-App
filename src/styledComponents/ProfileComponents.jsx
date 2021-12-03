import { Calculate } from "@mui/icons-material";
import { Grid, Typography, Box, Paper, Link, TextField, Container, IconButton } from "@mui/material";
import { styled } from "@mui/system";

import AddCircleIcon from "@mui/icons-material/AddCircle";

export const SidebarItem = styled(Grid)(({ theme }) => ({
	marginTop: theme.spacing(2),
	paddingTop: theme.spacing(1),
}));

export const FormBlock = styled(Box)(({ theme }) => ({
	padding: theme.spacing(3),
	paddingTop: 0,
	maxWidth: "600px",
}));
export const Title = styled(Typography)(({ theme }) => ({
	marginBottom: theme.spacing(2),
	...theme.typography.h6,
	...theme.palette.getContrastText,
}));

export const Skill = ({ item }) => {
	return (
		<Paper sx={{ p: 1, width: "180px", display: "flex", justifyContent: "space-between", mb: 1 }}>
			<Typography variant='body2' sx={{ marginRight: "5px" }}>
				{item[1][0]}
			</Typography>
			<Typography variant='body2'>{item[1][1]}⭐</Typography>
		</Paper>
	);
};
export const LinkRow = ({ name, link }) => {
	return (
		<Paper sx={{ p: 1, width: "180px", display: "flex", mb: 1 }}>
			{name ? <Typography sx={{ marginRight: "5px", textTransform: "lowercase" }}>{name}</Typography> : ""}
			<Link href={link} underline='hover' color='secondary' variant='body1'>
				{link}
			</Link>
		</Paper>
	);
};
export const ExpBlock = ({ name, dateFrom, dateEnd, description, position }) => {
	console.log(dateFrom);
	return (
		<Paper sx={{ p: 1, mt: 1 }}>
			<Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
				{position}
			</Typography>
			<Typography variant='caption' color='GrayText'>
				{name}
			</Typography>
			<Typography variant='caption' ml={1}>
				{dateFrom ? `${dateFrom} - ` : ""}
				{dateEnd}
			</Typography>
			<Typography variant='body2' color='InfoText'>
				{description}
			</Typography>
		</Paper>
	);
};

export const FormField = (props) => {
	return (
		<TextField
			sx={{ marginBottom: 2, bgcolor: "secondary.main" }}
			variant='outlined'
			fullWidth
			size='small'
			multiline
			{...props}
		/>
	);
};

export const SendButton = (props) => {
	return (
		<IconButton
			{...props}
			aria-label='submit'
			sx={{
				position: "absolute",
				top: 0,
				right: 0,
				width: "fit-content",
				color: "grey.500",
				"&:hover": {
					color: "success.light",
				},
			}}>
			<AddCircleIcon />
		</IconButton>
	);
};
