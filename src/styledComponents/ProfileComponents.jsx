import { Grid, Typography, Box, Paper, Link, TextField, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import MuiAlert from "@mui/material/Alert";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { forwardRef } from "react";

export const SidebarItem = styled(Grid)(({ theme }) => ({
	marginTop: theme.spacing(2),
	paddingTop: theme.spacing(1),
}));

export const FormBlock = styled(Box)(({ theme }) => ({
	padding: theme.spacing(0),
	paddingTop: 0,
	maxWidth: "600px",
	wordBreak: "break-word",
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
				{item[0]}
			</Typography>
			<Typography variant='body2'>{item[1]}⭐</Typography>
		</Paper>
	);
};
export const LinkRow = ({ name, link }) => {
	return (
		<Paper sx={{ p: 1, width: "180px", display: "flex", mb: 1 }}>
			{name ? <Typography sx={{ marginRight: "5px", textTransform: "lowercase" }}>{name}</Typography> : ""}
			{/*<Tooltip title={link} arrow>*/}
			<Link
				target='_blank'
				href={link}
				underline='hover'
				color='primary'
				variant='body1'
				sx={{ maxWidth: "170px", overflow: "hidden", textOverflow: "ellipsis" }}>
				{link}
			</Link>
			{/*</Tooltip>*/}
		</Paper>
	);
};
export const ExpBlock = ({ name, dateFrom, dateEnd, description, position }) => {
	return (
		<Paper sx={{ p: 1, mt: 1, maxWidth: "100%", wordWrap: "break-word", whiteSpace: "break-spaces" }}>
			<Typography variant='subtitle1' sx={{ fontWeight: 500 }} sx={{ wordBreak: "break-word" }}>
				{position}
			</Typography>
			<Typography variant='caption' color='GrayText' sx={{ wordBreak: "break-word" }}>
				{name}
			</Typography>
			<Typography variant='caption' ml={1} sx={{ wordBreak: "break-word" }}>
				{dateFrom ? `${dateFrom} - ` : ""}
				{dateEnd}
			</Typography>
			<Typography variant='body2' color='InfoText' sx={{ wordBreak: "break-word" }}>
				{description}
			</Typography>
		</Paper>
	);
};

export const FormField = (props) => {
	return (
		<TextField sx={{ bgcolor: "secondary.main" }} variant='outlined' fullWidth size='small' multiline {...props} />
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

export const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
